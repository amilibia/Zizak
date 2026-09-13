import { t, getLang } from '../i18n/i18n.js';

let map = null;
let mapMarkersGroup = null;
let mapRainLayerGroup = null;
let gridVisible = true;
let storedNavigateCallback = null;
let activeRainDayIndex = -1; // -1: Off, 0: Hoy, 1: Mañana, 2: Pasado
let latestLocationsCache = [];

export function initMap(onNavigateToLocationCallback) {
  if (onNavigateToLocationCallback) {
    storedNavigateCallback = onNavigateToLocationCallback;
  }
  if (map) return;

  // Centro encuadrando holgadamente País Vasco, Navarra, Costa Cantábrica y Pirineos (Huesca)
  map = L.map('map').setView([43.00, -2.00], 8.5);

  mapRainLayerGroup = L.layerGroup().addTo(map);
  mapMarkersGroup = L.layerGroup().addTo(map);

  // Capas de Mapa Base (Satélite ESRI y Topográfico)
  const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
  });

  const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: © OpenStreetMap, SRTM | Map style: © OpenTopoMap'
  });

  satelliteLayer.addTo(map); // Default satellite view for tree cover inspection

  const baseMaps = {
    "🛰️ Satélite ESRI": satelliteLayer,
    "⛰️ Topográfico": topoLayer
  };

  L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

  // Botón de alternancia de Malla Semáforo (ON / OFF)
  const toggleBtn = document.getElementById('toggle-grid-btn');
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      gridVisible = !gridVisible;
      if (gridVisible) {
        map.addLayer(mapMarkersGroup);
        toggleBtn.innerHTML = '🚦 <span>Malla Semáforo: Visible</span>';
        toggleBtn.classList.remove('bg-slate-100', 'text-slate-700', 'border-slate-300');
        toggleBtn.classList.add('bg-emerald-100', 'text-emerald-900', 'border-emerald-300');
      } else {
        map.removeLayer(mapMarkersGroup);
        toggleBtn.innerHTML = '🚦 <span>Malla Semáforo: Oculta</span>';
        toggleBtn.classList.remove('bg-emerald-100', 'text-emerald-900', 'border-emerald-300');
        toggleBtn.classList.add('bg-slate-100', 'text-slate-700', 'border-slate-300');
      }
    };
  }

  // Configurar botones de Capa de Lluvia TV (Off, Hoy, Mañana, Pasado)
  const rainBtns = document.querySelectorAll('.rain-tab-btn');
  rainBtns.forEach(btn => {
    btn.onclick = () => {
      rainBtns.forEach(b => {
        b.classList.remove('bg-white', 'text-slate-900', 'shadow-2xs');
        b.classList.add('text-slate-600');
      });
      btn.classList.remove('text-slate-600');
      btn.classList.add('bg-white', 'text-slate-900', 'shadow-2xs');

      const dayIdx = parseInt(btn.getAttribute('data-rain-day'));
      activeRainDayIndex = Number.isFinite(dayIdx) ? dayIdx : -1;
      updateRainLayer(latestLocationsCache, activeRainDayIndex);
    };
  });

  // Click en cualquier punto del mapa
  map.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    const zoneInfo = getRegionalZoneInfo(lat, lng);
    const pop = L.popup().setLatLng(e.latlng).setContent(`
      <div class="p-3 text-xs font-bold text-slate-700 flex items-center gap-2">
        <span class="animate-spin inline-block">🌀</span>
        <span>Analizando punto y calculando Top 5 especies...</span>
      </div>
    `).openOn(map);

    try {
      const altitude = await fetchAltitude(lat, lng);
      const tempLoc = {
        name: `Paraje (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
        lat, lon: lng,
        altitude,
        habitat: zoneInfo.defaultHabitat || 'hayedo',
        canopy: 'claro_trasmocho',
        ageClass: 'maduro',
        soilAcidity: zoneInfo.defaultSoil || 'acidofilo'
      };

      const weatherData = await fetchWeather(lat, lng);
      const dailyData = processDailyData(weatherData);
      const base = computeBaseProbabilities(dailyData, tempLoc);
      const res = computeSpeciesForLocation(tempLoc, base);

      const todayF = res.forecast[0];
      const spProbs = todayF.species || {};
      const SETTINGS = getSettings();
      const lang = getLang();
      const zName = lang === 'eu' ? zoneInfo.nameEU : zoneInfo.nameES;
      const zVeg = lang === 'eu' ? zoneInfo.vegEU : zoneInfo.vegES;

      // Obtener Top 5 especies de mayor probabilidad
      const top5Keys = Object.keys(spProbs).sort((a, b) => spProbs[b] - spProbs[a]).slice(0, 5);

      const top5Html = top5Keys.map(k => {
        const scoreVal = spProbs[k].toFixed(1);
        const spLabel = SETTINGS.species[k]?.label.split('(')[0] || k;
        const color = SPECIES_META[k]?.color || '#059669';
        return `
          <div class="flex items-center justify-between text-[11px] gap-1">
            <span class="font-bold truncate text-slate-800" style="color:${color}">● ${spLabel}</span>
            <span class="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">${scoreVal}%</span>
          </div>
        `;
      }).join('');

      pop.setContent(`
        <div class="p-3 space-y-2.5 text-xs max-w-[275px]">
          <div class="border-b border-slate-100 pb-1.5">
            <h4 class="font-bold text-sm text-emerald-900 leading-tight">${res.name}</h4>
            <span class="text-[10px] text-slate-500 font-semibold">${Math.round(altitude)}m altitud · ${Number(lat).toFixed(3)}, ${Number(lng).toFixed(3)}</span>
          </div>

          <div class="bg-emerald-50/90 p-2 rounded-xl border border-emerald-200 text-[11px] space-y-0.5">
            <p class="font-bold text-emerald-900">🌲 ${zName}</p>
            <p class="text-emerald-800 leading-tight text-[10px]">${zVeg}</p>
          </div>

          <div class="space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <p class="font-extrabold text-[11px] text-slate-800 border-b border-slate-200 pb-1 mb-1">🍄 Top 5 Especies Fructificación:</p>
            ${top5Html}
          </div>

          <div class="pt-1">
            <button id="__goToLocBtn" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-1.5">
              🚀 <span>Ir a Predicción Detallada</span>
            </button>
          </div>
        </div>
      `);

      setTimeout(() => {
        const btn = document.getElementById('__goToLocBtn');
        if (btn && onNavigateToLocationCallback) {
          btn.onclick = () => onNavigateToLocationCallback(tempLoc);
        }
      }, 100);

    } catch (err) {
      console.error(err);
      pop.setContent(`<div class="p-2 text-xs text-red-600 font-semibold">Error al obtener datos meteorológicos del punto.</div>`);
    }
  });
}

export function updateMapMarkers(forecastLocations) {
  if (!map || !mapMarkersGroup) return;
  latestLocationsCache = forecastLocations || [];
  mapMarkersGroup.clearLayers();

  latestLocationsCache.forEach(loc => {
    const todayF = loc.forecast[0] || { chance: 'Baja', score: '0%' };
    const isUserSaved = Boolean(loc.isUserSaved) && !loc.isOfficialZone;
    const todayScoreNum = parseFloat(todayF.score || '0');

    // Analizar la serie de pronóstico a 6 días para detectar mejoría futura (brote previsto)
    let bestFutureDay = null;
    let maxFutureScore = todayScoreNum;

    if (loc.forecast && loc.forecast.length > 1) {
      loc.forecast.slice(1, 7).forEach((day, idx) => {
        const sc = parseFloat(day.score || '0');
        if (sc > maxFutureScore) {
          maxFutureScore = sc;
          bestFutureDay = { ...day, dayOffset: idx + 1 };
        }
      });
    }

    const isImproving = bestFutureDay && (
      (maxFutureScore - todayScoreNum >= 15) || 
      (todayF.chance === 'Baja' && (bestFutureDay.chance === 'Media' || bestFutureDay.chance === 'Alta')) ||
      (todayF.chance === 'Media' && bestFutureDay.chance === 'Alta')
    );

    const radius = isUserSaved ? 7 : 5;

    // Halo/Anillo visual de mejoría a la vista (si la predicción hoy es baja/media pero sube en los próximos días)
    if (isImproving) {
      const haloColor = bestFutureDay.chance === 'Alta' ? '#059669' : '#0284c7';
      const haloMarker = L.circleMarker([loc.lat, loc.lon], {
        radius: radius + 6,
        fillColor: haloColor,
        color: haloColor,
        weight: 2,
        fillOpacity: 0.25,
        dashArray: '3, 3'
      });

      haloMarker.bindTooltip(`📈 ¡Brote a la vista en ${bestFutureDay.dayOffset}d! (${bestFutureDay.score})`, {
        permanent: false,
        direction: 'bottom',
        className: 'text-[10px] font-extrabold text-blue-900 bg-blue-50 border border-blue-200'
      });

      mapMarkersGroup.addLayer(haloMarker);
    }

    // INSIGNIA DE PORCENTAJE % DIRECTA SOBRE EL MAPA (DIVICON)
    const scoreNum = Math.round(todayScoreNum);
    const badgeBgClass = todayF.chance === 'Alta' 
      ? 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-900/40' 
      : (todayF.chance === 'Media' ? 'bg-amber-500 border-amber-200 text-white shadow-amber-900/40' : 'bg-red-500 border-red-200 text-white shadow-red-900/40');

    const badgeHtml = `
      <div class="flex items-center justify-center">
        <div class="px-1.5 py-0.5 rounded-full text-[10px] font-black ${badgeBgClass} border shadow-md flex items-center gap-0.5 whitespace-nowrap transition transform hover:scale-110">
          ${isUserSaved ? '⭐ ' : ''}<span>${scoreNum}%</span>
        </div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: badgeHtml,
      className: 'zizak-percent-badge',
      iconSize: [42, 20],
      iconAnchor: [21, 10]
    });

    const marker = L.marker([loc.lat, loc.lon], { icon: customIcon });

    // Tooltip al pasar el ratón (hover)
    let hoverText = isUserSaved ? `⭐ ${loc.name}: ${todayF.score} (${t(`chanceMap.${todayF.chance}`)})` : `${loc.name}: ${todayF.score}`;
    if (isImproving) {
      hoverText += ` ${t('sections.broteIn')} ${bestFutureDay.dayOffset}${t('sections.broteInDays')}`;
    }

    marker.bindTooltip(hoverText, {
      permanent: false,
      direction: 'top',
      className: 'text-xs font-bold font-sans'
    });

    // Popup detallado al hacer clic
    const trendBadgeHtml = isImproving ? `
      <div class="bg-gradient-to-r from-blue-50 to-emerald-50 p-2 rounded-xl border border-blue-200 text-[11px] text-blue-950 space-y-0.5 shadow-2xs">
        <div class="font-extrabold flex items-center gap-1">
          <span>${t('sections.broteIn')} ${bestFutureDay.dayOffset} ${t('sections.broteInDays')}</span>
        </div>
        <p class="text-[10px] font-semibold text-slate-700 leading-tight">
          Subirá a <span class="font-black text-emerald-800">${bestFutureDay.score}</span> (${t(`chanceMap.${bestFutureDay.chance}`)})
        </p>
      </div>
    ` : '';

    marker.bindPopup(`
      <div class="p-2.5 text-xs space-y-1.5 max-w-[230px]">
        <h4 class="font-bold text-sm text-emerald-900 leading-tight">${isUserSaved ? '⭐ ' : ''}${loc.name}</h4>
        <p class="text-slate-600 text-[11px] font-medium">${Math.round(loc.altitude || 600)}m ${t('sections.altitude')}</p>
        <p class="text-slate-800 text-[11px] font-bold">${t('sections.todayChance')} <span class="text-emerald-700">${todayF.score}</span></p>
        <div>
          <span class="inline-block px-2 py-0.5 font-bold rounded-full text-[10px] ${todayF.chance === 'Alta' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : (todayF.chance === 'Media' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-red-100 text-red-900 border border-red-300')}">${t(`chanceMap.${todayF.chance}`)}</span>
        </div>
        ${trendBadgeHtml}
        <div class="pt-1">
          <button class="btn-go-to-loc w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 px-2 rounded-lg transition text-[11px] flex items-center justify-center gap-1 shadow-sm">
            ${t('sections.goToDetail')}
          </button>
        </div>
      </div>
    `);

    let isPopupOpen = false;
    marker.on('popupopen', (e) => {
      isPopupOpen = true;
      setTimeout(() => {
        const btn = e.popup.getElement()?.querySelector('.btn-go-to-loc');
        if (btn && storedNavigateCallback) {
          btn.onclick = (evt) => {
            evt.stopPropagation();
            storedNavigateCallback(loc);
          };
        }
      }, 50);
    });

    marker.on('popupclose', () => {
      isPopupOpen = false;
    });

    marker.on('click', () => {
      if (isPopupOpen && storedNavigateCallback) {
        storedNavigateCallback(loc);
      }
    });

    mapMarkersGroup.addLayer(marker);
  });

  // Actualizar capa meteorológica TV de lluvia si está activa
  updateRainLayer(latestLocationsCache, activeRainDayIndex);
}

function updateRainLayer(locations, dayIndex) {
  if (!map || !mapRainLayerGroup) return;
  mapRainLayerGroup.clearLayers();

  const legendBar = document.getElementById('rain-legend-bar');
  const legendTitle = document.getElementById('rain-legend-title');

  if (dayIndex < 0 || !locations || locations.length === 0) {
    if (legendBar) legendBar.classList.add('hidden');
    return;
  }

  const dayLabels = ['HOY', 'MAÑANA', 'PASADO MAÑANA'];
  if (legendBar) {
    legendBar.classList.remove('hidden');
    if (legendTitle) {
      legendTitle.innerHTML = `<span>🌧️ Mapa de Lluvias TV — <strong>${dayLabels[dayIndex] || 'PRÓXIMOS DÍAS'}</strong></span>`;
    }
  }

  locations.forEach(loc => {
    const dayForecast = loc.forecast ? loc.forecast[dayIndex] : null;
    const rainMm = dayForecast ? (dayForecast.rain_for_day || 0) : 0;

    if (rainMm >= 1.0) {
      let color = '#3b82f6'; // <5mm
      let radiusMeters = 18000;
      let opacity = 0.30;

      if (rainMm >= 25) {
        color = '#9333ea'; // >25mm (frente muy fuerte)
        radiusMeters = 36000;
        opacity = 0.45;
      } else if (rainMm >= 15) {
        color = '#059669'; // 15-25mm
        radiusMeters = 28000;
        opacity = 0.40;
      } else if (rainMm >= 5) {
        color = '#0284c7'; // 5-15mm
        radiusMeters = 22000;
        opacity = 0.35;
      }

      // Dibujar capa de masa de lluvia suavizada (efecto mapa del tiempo TV)
      const rainCircle = L.circle([loc.lat, loc.lon], {
        radius: radiusMeters,
        fillColor: color,
        color: color,
        weight: 1.5,
        fillOpacity: opacity,
        stroke: true
      });

      // Badge de mm en el mapa
      const rainBadgeIcon = L.divIcon({
        html: `<div class="bg-slate-900/90 text-white font-black text-[10px] px-1.5 py-0.5 rounded border border-slate-600 shadow-md whitespace-nowrap">🌧️ +${rainMm.toFixed(1)}mm</div>`,
        className: 'zizak-rain-mm-badge',
        iconSize: [46, 18],
        iconAnchor: [23, -12]
      });

      const badgeMarker = L.marker([loc.lat, loc.lon], { icon: rainBadgeIcon, interactive: false });

      mapRainLayerGroup.addLayer(rainCircle);
      mapRainLayerGroup.addLayer(badgeMarker);
    }
  });
}

export function focusOnLocation(lat, lon, zoom = 12.5) {
  if (!map) return;
  map.setView([lat, lon], zoom, { animate: true });
  if (mapMarkersGroup) {
    mapMarkersGroup.eachLayer(layer => {
      if (layer.getLatLng && Math.abs(layer.getLatLng().lat - lat) < 0.005 && Math.abs(layer.getLatLng().lng - lon) < 0.005) {
        layer.openPopup();
      }
    });
  }
}
