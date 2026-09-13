// Zizak Pro - Cliente de API Meteorológica (Open-Meteo & Altitud)

const OPENMETEO_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchAltitude(lat, lon) {
  const key = `alt:${Number(lat).toFixed(4)},${Number(lon).toFixed(4)}`;
  const cached = localStorage.getItem(key);
  if (cached) return Number(cached);
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`);
    const j = await r.json();
    const h = j?.elevation?.[0];
    if (Number.isFinite(h)) {
      localStorage.setItem(key, String(h));
      return h;
    }
  } catch (_) {}
  return 600;
}

// Base de datos de persistencia IndexedDB para registros meteorológicos pasados
let meteoDB = null;

function initMeteoDB() {
  if (meteoDB) return Promise.resolve(meteoDB);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open('zizak_meteo_archive_db', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('daily_records')) {
          db.createObjectStore('daily_records', { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => {
        meteoDB = e.target.result;
        resolve(meteoDB);
      };
      req.onerror = () => resolve(null);
    } catch (_) {
      resolve(null);
    }
  });
}

async function saveDailyRecordsToDB(locKey, dailyList) {
  const db = await initMeteoDB();
  if (!db) return;
  const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
  try {
    const tx = db.transaction('daily_records', 'readwrite');
    const store = tx.objectStore('daily_records');
    dailyList.forEach(item => {
      // Guardar días pasados de forma permanente
      if (item.date < todayStr) {
        const recordId = `${locKey}_${item.date}`;
        store.put({ id: recordId, locKey, date: item.date, record: item });
      }
    });
  } catch (_) {}
}

export async function fetchWeather(lat, lon) {
  const locKey = `${Number(lat).toFixed(3)}_${Number(lon).toFixed(3)}`;
  const cacheKey = `weather_${locKey}`;
  const cached = localStorage.getItem(cacheKey);
  const time = localStorage.getItem(`${cacheKey}_time`);

  // Usar caché de la sesión si tiene menos de 4 horas
  if (cached && time && (Date.now() - parseInt(time)) < 4 * 3600 * 1000) {
    return JSON.parse(cached);
  }

  const url = `${OPENMETEO_URL}?latitude=${lat}&longitude=${lon}&past_days=14&forecast_days=7&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,et0_fao_evapotranspiration&timezone=Europe%2FMadrid`;
  
  try {
    const r = await fetch(url);
    if (r.ok) {
      const data = await r.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

      // Archivar en IndexedDB los días pasados para persistencia ilimitada y reducir peticiones
      const dailyList = processDailyData(data);
      saveDailyRecordsToDB(locKey, dailyList);

      return data;
    }
  } catch (err) {
    console.warn('Conexión meteorológica en segundo plano, recuperando de caché...', err);
  }

  if (cached) return JSON.parse(cached);
  throw new Error('Error al conectar con servidor meteorológico');
}

export function processDailyData(data) {
  const days = {};
  data.hourly.time.forEach((timeStr, i) => {
    const date = timeStr.split('T')[0];
    if (!days[date]) days[date] = { temps: [], rain: 0, rh: [], wind: [], et0: [] };
    days[date].temps.push(data.hourly.temperature_2m[i]);
    days[date].rh.push(data.hourly.relative_humidity_2m[i]);
    days[date].rain += (data.hourly.precipitation[i] || 0);
    days[date].wind.push(data.hourly.wind_speed_10m[i]);
    days[date].et0.push(data.hourly.et0_fao_evapotranspiration[i] || 0);
  });
  return Object.entries(days).map(([date, v]) => ({
    date,
    rain_for_day: v.rain,
    temp_min: Math.min(...v.temps),
    temp_max: Math.max(...v.temps),
    avg_temp: v.temps.reduce((a, b) => a + b, 0) / v.temps.length,
    avg_humidity: v.rh.reduce((a, b) => a + b, 0) / v.rh.length,
    avg_wind: v.wind.reduce((a, b) => a + b, 0) / v.wind.length,
    avg_et0: v.et0.reduce((a, b) => a + b, 0) / v.et0.length
  }));
}
