// Zizak Pro - Controlador UI de Predicción & Gráficos Meteorológicos

import { SPECIES_META } from '../data/species.js';
import { getSettings } from '../models/forecastEngine.js';
import { getLang, t } from '../i18n/i18n.js';

const chartInstances = {};

const WEEKDAY_SHORT = { es: ['dom','lun','mar','mié','jue','vie','sáb'], eu: ['ig.','al.','ar.','az.','og.','ol.','lr.'] };
const MONTH_SHORT = { es: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'], eu: ['urt','ots','mar','api','mai','eka','uzt','abu','ira','urr','aza','abe'] };

function fmtWeekdayShort(dLike) {
  const d = new Date(dLike);
  return `${WEEKDAY_SHORT[getLang()][d.getDay()]} ${d.getDate()} ${MONTH_SHORT[getLang()][d.getMonth()]}`;
}

function fmtDayMonthShort(dLike) {
  const d = new Date(dLike);
  return `${d.getDate()} ${MONTH_SHORT[getLang()][d.getMonth()]}`;
}

let showOfficialRef = JSON.parse(localStorage.getItem('zizak_show_official_ref') ?? 'true');

function sortLocationsList(locations, currentSort) {
  return [...locations].sort((a, b) => {
    const scoreA = parseFloat(a.forecast[0]?.score || '0');
    const scoreB = parseFloat(b.forecast[0]?.score || '0');

    if (currentSort === 'chance') {
      if (Math.abs(scoreB - scoreA) > 0.01) {
        return scoreB - scoreA; // Descendente por porcentaje de probabilidad
      }
      return a.name.localeCompare(b.name);
    } else {
      return a.name.localeCompare(b.name); // Alfabético por nombre
    }
  });
}

export function renderForecastGrid(allLocationsData, currentFilter, currentSort, onDeleteLocation, onFocusLocation) {
  const container = document.getElementById('grid');
  if (!container) return;
  container.innerHTML = '';

  // 1. Separar lugares guardados del usuario de las zonas oficiales de referencia
  const userLocsRaw = allLocationsData.filter(l => !l.isOfficialZone);
  const officialLocsRaw = allLocationsData.filter(l => Boolean(l.isOfficialZone));

  // 2. Aplicar filtro de probabilidad
  const filterFn = (l) => {
    if (currentFilter === 'all') return true;
    return (l.forecast[0]?.chance || 'Baja') === currentFilter;
  };

  const userFiltered = sortLocationsList(userLocsRaw.filter(filterFn), currentSort);
  const officialFiltered = sortLocationsList(officialLocsRaw.filter(filterFn), currentSort);

  // 3. Renderizar Estructura de Secciones Separadas
  container.className = 'space-y-8';

  // SECCIÓN 1: MIS LUGARES GUARDADOS (CREADOS POR EL USUARIO)
  const userSec = document.createElement('section');
  userSec.className = 'space-y-4';
  userSec.innerHTML = `
    <div class="flex justify-between items-center pb-2 border-b border-emerald-200">
      <div class="flex items-center gap-2">
        <span class="text-xl">⭐</span>
        <h3 class="text-base font-extrabold text-slate-900">${t('sections.userSaved')}</h3>
        <span class="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">${userFiltered.length} ${t('sections.parajes')}</span>
      </div>
    </div>
    ${userFiltered.length === 0 ? `
      <div class="bg-slate-50/80 p-5 rounded-2xl border border-dashed border-slate-300 text-center">
        <p class="text-xs font-bold text-slate-700">${t('sections.userSavedEmptyTitle')}</p>
        <p class="text-[11px] text-slate-500 mt-1">${t('sections.userSavedEmptyDesc')}</p>
      </div>
    ` : '<div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="__user_grid_inner"></div>'}
  `;
  container.appendChild(userSec);

  if (userFiltered.length > 0) {
    const userGridInner = userSec.querySelector('#__user_grid_inner');
    userFiltered.forEach(loc => renderLocationCard(loc, userGridInner, onDeleteLocation, onFocusLocation));
  }

  // SECCIÓN 2: ZONAS Y PARQUES DE REFERENCIA OFICIALES
  const officialSec = document.createElement('section');
  officialSec.className = 'space-y-4 pt-2';
  officialSec.innerHTML = `
    <div class="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-slate-200">
      <div class="flex items-center gap-2">
        <span class="text-xl">🗺️</span>
        <h3 class="text-base font-extrabold text-slate-900">${t('sections.officialZones')}</h3>
        <span class="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-300">${officialFiltered.length} ${t('sections.zonas')}</span>
      </div>
      <button id="__toggle_official_ref_btn" class="px-3 py-1.5 rounded-xl text-xs font-extrabold border transition shadow-2xs flex items-center gap-1.5 ${showOfficialRef ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'}">
        <span>${showOfficialRef ? t('sections.hideOfficial') : t('sections.showOfficial')}</span>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 ${showOfficialRef ? '' : 'hidden'}" id="__official_grid_inner"></div>
  `;
  container.appendChild(officialSec);

  const officialGridInner = officialSec.querySelector('#__official_grid_inner');
  officialFiltered.forEach(loc => renderLocationCard(loc, officialGridInner, onDeleteLocation, onFocusLocation));

  const toggleBtn = officialSec.querySelector('#__toggle_official_ref_btn');
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      showOfficialRef = !showOfficialRef;
      localStorage.setItem('zizak_show_official_ref', JSON.stringify(showOfficialRef));
      if (showOfficialRef) {
        officialGridInner.classList.remove('hidden');
        toggleBtn.innerHTML = `<span>${t('sections.hideOfficial')}</span>`;
        toggleBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-extrabold border transition shadow-2xs flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200';
      } else {
        officialGridInner.classList.add('hidden');
        toggleBtn.innerHTML = `<span>${t('sections.showOfficial')}</span>`;
        toggleBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-extrabold border transition shadow-2xs flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100';
      }
    };
  }
}

function renderLocationCard(loc, container, onDeleteLocation, onFocusLocation) {
  const SETTINGS = getSettings();
  const todayForecast = loc.forecast[0] || { chance: 'Baja', score: '0%', date: new Date().toISOString().slice(0, 10) };
  const cardChanceClass = `card-chance-${todayForecast.chance}`;
  const slug = loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cid = `chart-${slug}`;
  const speciesCid = `species-${slug}`;

  const card = document.createElement('div');
  card.className = `bg-white shadow-xl rounded-2xl overflow-hidden p-5 transition transform hover:-translate-y-1 ${cardChanceClass}`;

  const lang = getLang();
  const zoneTag = loc.zoneInfo ? (lang === 'eu' ? loc.zoneInfo.nameEU : loc.zoneInfo.nameES) : 'Norte Peninsular';
  const vegDesc = loc.zoneInfo ? (lang === 'eu' ? loc.zoneInfo.vegEU : loc.zoneInfo.vegES) : '';

  const topSpeciesKey = todayForecast.top_species;
  const topMeta = topSpeciesKey ? SPECIES_META[topSpeciesKey] : null;
  const topLabel = topSpeciesKey ? (SETTINGS.species[topSpeciesKey]?.label.split('(')[0] || topSpeciesKey) : 'Variadas';

  const todayBadgeColor = todayForecast.chance === 'Alta' 
    ? 'bg-emerald-600 text-white shadow-sm font-bold' 
    : (todayForecast.chance === 'Media' ? 'bg-amber-500 text-white shadow-sm font-bold' : 'bg-red-500 text-white shadow-sm font-bold');

  const heroBg = todayForecast.chance === 'Alta'
    ? 'from-emerald-50 via-teal-50 to-emerald-100/60 border-emerald-200'
    : (todayForecast.chance === 'Media' ? 'from-amber-50 via-yellow-50 to-amber-100/60 border-amber-200' : 'from-slate-50 via-red-50/40 to-slate-100 border-slate-200');

  card.innerHTML = `
    <!-- Encabezado del Paraje -->
    <div class="flex justify-between items-start mb-3">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <h4 class="text-xl font-bold text-slate-900 cursor-pointer hover:text-emerald-700 transition flex items-center gap-1.5 loc-title-btn" title="📍 Ver mapa en este punto">
            <span>${loc.name}</span>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 hover:bg-emerald-100 transition">📍 Ver en mapa</span>
          </h4>
          <span class="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-full border border-emerald-200 shadow-sm">🌲 ${zoneTag}</span>
        </div>
        <div class="text-xs text-slate-600 font-medium">${Number(loc.lat).toFixed(4)}, ${Number(loc.lon).toFixed(4)} ${loc.altitude ? `· ${Math.round(loc.altitude)}m` : ''} · ${vegDesc}</div>
      </div>
      ${loc.isOfficialZone ? '' : `<button class="remove-loc-btn text-slate-400 hover:text-red-600 p-1 transition" data-name="${loc.name}" title="Eliminar">🗑️</button>`}
    </div>

    <!-- TARJETA DESTACADA DE HOY -->
    <div class="bg-gradient-to-r ${heroBg} p-4 rounded-2xl border shadow-sm mb-4">
      <div class="flex flex-wrap justify-between items-center gap-3 border-b border-slate-200/60 pb-3 mb-3">
        <div>
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">📅 Pronóstico Hoy (${fmtDayMonthShort(todayForecast.date)})</span>
          <div class="flex items-baseline gap-2 mt-0.5">
            <span class="text-3xl font-black text-slate-900">${todayForecast.score}</span>
            <span class="px-2.5 py-1 text-xs rounded-full ${todayBadgeColor}">${t(`chanceMap.${todayForecast.chance}`)}</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-[10px] font-extrabold text-slate-500 uppercase block">Especie Principal Hoy</span>
          <span class="text-sm font-black" style="color: ${topMeta?.color || '#059669'}">🍄 ${topLabel}</span>
        </div>
      </div>

      <!-- MOTIVOS Y CONDICIONES DIRECTAS (VISIBLES SIN DESPLEGABLES) -->
      <div class="space-y-2 text-xs">
        <!-- Condiciones Óptimas (✅) -->
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="font-bold text-emerald-900 text-[11px] mr-1">✅ Favorables:</span>
          ${(todayForecast.score_breakdown?.optimal && todayForecast.score_breakdown.optimal.length > 0) ? todayForecast.score_breakdown.optimal.map(k => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 text-emerald-800 border border-emerald-300 shadow-2xs">
              ${t(k)}
            </span>
          `).join('') : '<span class="text-slate-500 italic text-[11px]">Esperando acumulación de lluvias...</span>'}
        </div>

        <!-- Condiciones Faltantes (⚠️) -->
        ${(todayForecast.score_breakdown?.lacking && todayForecast.score_breakdown.lacking.length > 0) ? `
          <div class="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/50">
            <span class="font-bold text-red-900 text-[11px] mr-1">⚠️ Limitan fructificación:</span>
            ${todayForecast.score_breakdown.lacking.map(k => `
              <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium bg-red-50 text-red-800 border border-red-200">
                ${t(k)}
              </span>
            `).join('')}
          </div>
        ` : `
          <div class="pt-1.5 border-t border-slate-200/50 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
            <span>✨ ¡Excelente! Sin factores limitantes graves hoy.</span>
          </div>
        `}
      </div>
    </div>

    <!-- PRONÓSTICO Y NOVEDADES PRÓXIMOS 6 DÍAS -->
    <div class="mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
      <h5 class="font-extrabold text-xs text-slate-800 mb-2.5 flex items-center justify-between">
        <span>📆 Evolución Próximos 6 Días (Cambios Clave)</span>
      </h5>
      <div class="space-y-1.5 text-xs">
        ${loc.forecast.slice(1, 7).map((day, idx) => {
          const topK = day.top_species;
          const meta = topK ? SPECIES_META[topK] : null;
          const chanceClass = day.chance === 'Alta' ? 'bg-emerald-600 text-white' : (day.chance === 'Media' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white');
          
          const prevDay = loc.forecast[idx]; // idx 0 is loc.forecast[0] (Hoy)
          const scoreDelta = (parseFloat(day.score) - parseFloat(prevDay ? prevDay.score : day.score)).toFixed(1);
          
          let changeBadge = '';
          if (day.rain_for_day >= 5) {
            changeBadge = `<span class="bg-blue-100 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold">🌧️ +${day.rain_for_day.toFixed(1)}mm lluvia</span>`;
          } else if (parseFloat(scoreDelta) >= 5) {
            changeBadge = `<span class="bg-emerald-100 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">📈 +${scoreDelta}% prob.</span>`;
          } else if (parseFloat(scoreDelta) <= -5) {
            changeBadge = `<span class="bg-red-100 text-red-900 border border-red-200 px-2 py-0.5 rounded-full text-[10px] font-bold">📉 ${scoreDelta}% prob.</span>`;
          } else {
            changeBadge = `<span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-semibold">✨ Estable</span>`;
          }

          return `
            <div class="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200/80 hover:border-emerald-300 transition">
              <div class="flex items-center gap-2 flex-wrap min-w-0">
                <span class="font-bold text-slate-800 text-xs w-24">${fmtWeekdayShort(day.date)}</span>
                <span class="text-[11px] font-semibold text-slate-500">${day.temp_min.toFixed(0)}°-${day.temp_max.toFixed(0)}°C</span>
                ${changeBadge}
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="font-black text-xs text-slate-900">${day.score}</span>
                <span class="px-2 py-0.5 font-bold rounded-full text-[10px] ${chanceClass}">${t(`chanceMap.${day.chance}`)}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- SECCIÓN DE GRÁFICOS INTEGRADOS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-slate-50/50 p-3 rounded-2xl border border-slate-200">
        <h6 class="text-[11px] font-extrabold text-slate-700 mb-1.5">📊 Acumulado Meteo (14d) + Pronóstico (7d)</h6>
        <div class="w-full h-36"><canvas id="${cid}"></canvas></div>
      </div>
      <div class="bg-slate-50/50 p-3 rounded-2xl border border-slate-200">
        <h6 class="text-[11px] font-extrabold text-slate-700 mb-1.5">🍄 Top 5 Especies Fructificación Hoy</h6>
        <div class="w-full h-36"><canvas id="${speciesCid}"></canvas></div>
      </div>
    </div>
  `;

  container.appendChild(card);

  // Bind click event for delete button
  const delBtn = card.querySelector('.remove-loc-btn');
  if (delBtn) {
    delBtn.onclick = () => onDeleteLocation(loc.name);
  }

  // Bind click event for location title button (navigate to map)
  const titleBtn = card.querySelector('.loc-title-btn');
  if (titleBtn && onFocusLocation) {
    titleBtn.onclick = () => onFocusLocation(loc);
  }

  // Render Charts using Chart.js
  renderCharts(cid, speciesCid, loc);
}

function renderCharts(cid, speciesCid, loc) {
  if (chartInstances[cid]) chartInstances[cid].destroy();
  if (chartInstances[speciesCid]) chartInstances[speciesCid].destroy();

  const histData = loc.history || loc.forecast;

  // Chart 1: Meteo History & Forecast
  const ctx1 = document.getElementById(cid)?.getContext('2d');
  if (ctx1) {
    chartInstances[cid] = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: histData.map(d => fmtDayMonthShort(d.date)),
        datasets: [
          { type: 'bar', label: 'Lluvia (mm)', data: histData.map(d => d.rain_for_day), backgroundColor: 'rgba(59, 130, 246, 0.4)', yAxisID: 'yRain' },
          { type: 'line', label: 'Temp. (°C)', data: histData.map(d => d.tmed), borderColor: '#ef4444', borderWidth: 2, pointRadius: 1, yAxisID: 'yTemp' },
          { type: 'line', label: 'SMI (%)', data: histData.map(d => d.smi * 100), borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.15)', fill: 'start', pointRadius: 0, yAxisID: 'ySmi' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { boxWidth: 10, font: { size: 10 } } } },
        scales: {
          x: { ticks: { font: { size: 9 } } },
          yRain: { type: 'linear', position: 'left', min: 0, title: { display: false } },
          yTemp: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } },
          ySmi: { display: false, min: 0, max: 100 }
        }
      }
    });
  }

  // Chart 2: Top Species Bar Chart
  const ctx2 = document.getElementById(speciesCid)?.getContext('2d');
  if (ctx2) {
    const todayF = loc.forecast[0] || {};
    const spProbs = todayF.species || {};
    const topKeys = Object.keys(spProbs).sort((a, b) => spProbs[b] - spProbs[a]).slice(0, 5);

    chartInstances[speciesCid] = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: topKeys.map(k => (getSettings().species[k]?.label.split('(')[0] || k).trim()),
        datasets: [{
          data: topKeys.map(k => spProbs[k]),
          backgroundColor: topKeys.map(k => SPECIES_META[k]?.color || '#059669'),
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 100, ticks: { font: { size: 9 } } },
          y: { ticks: { font: { size: 9 } } }
        }
      }
    });
  }
}
