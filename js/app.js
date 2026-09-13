// Zizak Pro - Bootstrap Principal de la Aplicación (app.js)

import { applyStaticI18N, setLang, getLang, t } from './i18n/i18n.js';
import { DEFAULT_LOCATIONS } from './data/defaultLocations.js';
import { fetchAltitude, fetchWeather, processDailyData } from './models/weatherApi.js';
import { computeBaseProbabilities, computeSpeciesForLocation } from './models/forecastEngine.js';
import { initJournalDB } from './models/journalDb.js';
import { initMap, updateMapMarkers, focusOnLocation } from './ui/mapController.js';
import { renderForecastGrid } from './ui/forecastUI.js';
import { renderGuideAndRecipes } from './ui/speciesUI.js';
import { renderJournalUI, setupJournalForm, exportFullBackupJSON, importFullBackupJSON } from './ui/journalUI.js';
import { setupSettingsUI } from './ui/settingsUI.js';

let savedLocs = JSON.parse(localStorage.getItem('zizak_locations') || 'null');
if (!savedLocs || savedLocs.length < 15) {
  savedLocs = DEFAULT_LOCATIONS.map(d => ({ ...d, isOfficialZone: true, isUserSaved: false }));
} else {
  const defaultNamesSet = new Set(DEFAULT_LOCATIONS.map(d => d.name));
  DEFAULT_LOCATIONS.forEach(defLoc => {
    const match = savedLocs.find(l => l.name === defLoc.name);
    if (!match) {
      savedLocs.push({ ...defLoc, isOfficialZone: true, isUserSaved: false });
    } else {
      match.isOfficialZone = true;
      match.isUserSaved = false;
      if (defLoc.zoneCode) match.zoneCode = defLoc.zoneCode;
    }
  });

  savedLocs.forEach(loc => {
    if (defaultNamesSet.has(loc.name) || loc.isOfficialZone) {
      loc.isOfficialZone = true;
      loc.isUserSaved = false;
    } else {
      loc.isOfficialZone = false;
      loc.isUserSaved = true;
    }
  });
}
localStorage.setItem('zizak_locations', JSON.stringify(savedLocs));

let LOCATIONS = savedLocs;
let allForecastData = [];
let currentFilter = 'all';
let currentSort = 'chance';

async function updateLocationData(loc) {
  try {
    const weatherData = await fetchWeather(loc.lat, loc.lon);
    const altitude = await fetchAltitude(loc.lat, loc.lon);
    const dailyData = processDailyData(weatherData);
    loc.altitude = altitude;
    const base = computeBaseProbabilities(dailyData, loc);
    return computeSpeciesForLocation(loc, base);
  } catch (err) {
    console.error('Error loc:', loc.name, err);
    return null;
  }
}

async function loadAllLocations() {
  const loadingEl = document.getElementById('loading-message');
  if (loadingEl) loadingEl.classList.remove('hidden');

  const res = await Promise.all(LOCATIONS.map(updateLocationData));
  allForecastData = res.filter(l => l !== null);

  if (loadingEl) loadingEl.classList.add('hidden');
  refreshGrid();
  updateMapMarkers(allForecastData);
}

function handleFocusLocationOnMap(loc) {
  switchTab('map');
  setTimeout(() => {
    focusOnLocation(loc.lat, loc.lon, 12.5);
  }, 150);
}

function refreshGrid() {
  renderForecastGrid(allForecastData, currentFilter, currentSort, deleteLocation, handleFocusLocationOnMap);
}

function deleteLocation(locName) {
  const target = LOCATIONS.find(l => l.name === locName);
  if (target && target.isOfficialZone) return; // Zonas micológicas y parques de referencia fijos
  LOCATIONS = LOCATIONS.filter(l => l.name !== locName);
  localStorage.setItem('zizak_locations', JSON.stringify(LOCATIONS));
  loadAllLocations();
}

async function addLocation(name, lat, lon, altitude, habitat = 'hayedo', canopy = 'claro_trasmocho', ageClass = 'maduro', soilAcidity = 'acidofilo') {
  const existing = LOCATIONS.find(l => Math.abs(l.lat - lat) < 0.001 && Math.abs(l.lon - lon) < 0.001);
  if (existing) {
    if (!existing.isOfficialZone) {
      existing.isUserSaved = true;
    }
    return existing;
  }

  const newLoc = { name, lat, lon, altitude, habitat, canopy, ageClass, soilAcidity, isUserSaved: true, isOfficialZone: false };
  LOCATIONS.push(newLoc);
  localStorage.setItem('zizak_locations', JSON.stringify(LOCATIONS));
  await loadAllLocations();
  return newLoc;
}

function switchTab(targetId) {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  tabBtns.forEach(b => {
    b.classList.remove('border-emerald-600', 'text-emerald-800', 'font-bold');
    b.classList.add('border-transparent', 'text-slate-600');
    if (b.getAttribute('data-tab') === targetId) {
      b.classList.remove('border-transparent', 'text-slate-600');
      b.classList.add('border-emerald-600', 'text-emerald-800', 'font-bold');
    }
  });

  sections.forEach(s => s.classList.remove('active'));
  const activeSec = document.getElementById(`section-${targetId}`);
  if (activeSec) activeSec.classList.add('active');

  if (targetId === 'map') {
    setTimeout(() => {
      initMap(handleNavigateFromMap);
    }, 100);
  } else if (targetId === 'guide') {
    renderGuideAndRecipes();
  } else if (targetId === 'journal') {
    renderJournalUI();
  } else if (targetId === 'settings') {
    setupSettingsUI(() => loadAllLocations());
  }
}

async function handleNavigateFromMap(tempLoc) {
  // Guardar ubicación si es nueva
  await addLocation(tempLoc.name, tempLoc.lat, tempLoc.lon, tempLoc.altitude, tempLoc.habitat, tempLoc.canopy, tempLoc.ageClass, tempLoc.soilAcidity);
  
  // Cambiar a la pestaña de Predicción & Lugares
  switchTab('forecast');

  // Desplazar al paraje enfocado
  setTimeout(() => {
    const slug = tempLoc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const chartEl = document.getElementById(`chart-${slug}`);
    if (chartEl) {
      chartEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 200);
}

function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      const targetId = btn.getAttribute('data-tab');
      switchTab(targetId);
    };
  });
}

function setupForecastControls() {
  const filterSel = document.getElementById('filter-chance');
  const sortSel = document.getElementById('sort-by');
  const searchInput = document.getElementById('search-input');
  const addBtn = document.getElementById('add-location-btn');

  if (filterSel) {
    filterSel.onchange = (e) => {
      currentFilter = e.target.value;
      refreshGrid();
    };
  }

  if (sortSel) {
    sortSel.onchange = (e) => {
      currentSort = e.target.value;
      refreshGrid();
    };
  }

  if (addBtn && searchInput) {
    addBtn.onclick = async () => {
      const q = searchInput.value.trim();
      if (!q) return;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ' Spain')}`);
        const data = await res.json();
        if (data && data.length > 0) {
          const item = data[0];
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);
          const name = item.display_name.split(',')[0];
          const alt = await fetchAltitude(lat, lon);
          await addLocation(name, lat, lon, alt);
          searchInput.value = '';
        } else {
          alert('Ubicación no encontrada');
        }
      } catch (err) {
        alert('Error al buscar la ubicación');
      }
    };
  }
}

function setupLanguageSwitcher() {
  const langBtn = document.getElementById('__langBtn');
  if (langBtn) {
    langBtn.onclick = () => {
      const newLang = getLang() === 'eu' ? 'es' : 'eu';
      setLang(newLang);
      applyStaticI18N();
      refreshGrid();
      renderGuideAndRecipes();
      renderJournalUI();
      updateMapMarkers(allForecastData);
    };
  }
}

function setupBackupSync() {
  const exportBtn = document.getElementById('export-backup-btn');
  const importInput = document.getElementById('import-backup-file');

  if (exportBtn) {
    exportBtn.onclick = () => exportFullBackupJSON();
  }

  if (importInput) {
    importInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          await importFullBackupJSON(file);
          alert('Copia de seguridad importada con éxito');
          location.reload();
        } catch (err) {
          alert('Error al importar la copia de seguridad');
        }
      }
    };
  }
}

function setupGuideFilters() {
  const searchInput = document.getElementById('guide-search');
  const edibleSelect = document.getElementById('filter-edible');
  const seasonSelect = document.getElementById('filter-season');

  if (searchInput) searchInput.oninput = () => renderGuideAndRecipes();
  if (edibleSelect) edibleSelect.onchange = () => renderGuideAndRecipes();
  if (seasonSelect) seasonSelect.onchange = () => renderGuideAndRecipes();
}

// Inicialización General al Cargar el DOM
document.addEventListener('DOMContentLoaded', async () => {
  applyStaticI18N();
  initTabNavigation();
  setupForecastControls();
  setupLanguageSwitcher();
  setupBackupSync();
  setupGuideFilters();

  await initJournalDB();
  setupJournalForm();

  // Inicializar mapa de inicio por defecto
  initMap(handleNavigateFromMap);

  // Cargar datos micológicos de ubicaciones
  await loadAllLocations();
});
