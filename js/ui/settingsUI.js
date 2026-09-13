// Zizak Pro - Controlador UI de Calibración de Ajustes del Modelo Bioclimático

import { DEFAULT_SETTINGS, getSettings } from '../models/forecastEngine.js';

export function setupSettingsUI(onSaveCallback) {
  const form = document.getElementById('settings-form');
  if (!form) return;

  const current = getSettings();

  // Pre-rellenar campos si existen
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };

  setVal('cfg-smax-acid', current.smi.smax.acid);
  setVal('cfg-smax-basic', current.smi.smax.basic);
  setVal('cfg-topt-min', current.base.temp.optMin);
  setVal('cfg-topt-max', current.base.temp.optMax);
  setVal('cfg-theat-th', current.base.temp.heatThresh);

  form.onsubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...current,
      smi: {
        ...current.smi,
        smax: {
          ...current.smi.smax,
          acid: parseFloat(document.getElementById('cfg-smax-acid').value),
          basic: parseFloat(document.getElementById('cfg-smax-basic').value)
        }
      },
      base: {
        ...current.base,
        temp: {
          ...current.base.temp,
          optMin: parseFloat(document.getElementById('cfg-topt-min').value),
          optMax: parseFloat(document.getElementById('cfg-topt-max').value),
          heatThresh: parseFloat(document.getElementById('cfg-theat-th').value)
        }
      }
    };

    localStorage.setItem('zizak_settings', JSON.stringify(updated));
    if (onSaveCallback) onSaveCallback();
  };

  const resetBtn = document.getElementById('reset-settings-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      localStorage.removeItem('zizak_settings');
      setupSettingsUI(onSaveCallback);
      if (onSaveCallback) onSaveCallback();
    };
  }
}
