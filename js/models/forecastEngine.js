// Zizak Pro - Motor de Predicción Bioclimática Micológica

import { getRegionalZoneInfo } from '../data/zones.js';

export const DEFAULT_SETTINGS = {
  base: {
    alt: { ref: 600, lapse: 0.0065 },
    temp: { optMin: 10, optMax: 20, optPts: 2.0, heatThresh: 26, heatPenalty: -2.0 },
    vpd: { lowThresh: 0.4, highThresh: 1.2 }
  },
  smi: {
    smax: { acid: 120, basic: 80, default: 100 }
  },
  triggers: {
    mm15: { th: 15, lagMin: 7, lagMax: 14 },
    mm20: { th: 20, lagMin: 10, lagMax: 18 },
    mm25: { th: 25, lagMin: 12, lagMax: 21 },
    weights: {
      boletus_edulis: { w15: 0.2, w20: 0.5, w25: 0.3 },
      boletus_aereus: { w15: 0.1, w20: 0.4, w25: 0.5 },
      boletus_aestivalis: { w15: 0.4, w20: 0.4, w25: 0.2 },
      lactarius: { w15: 0.3, w20: 0.5, w25: 0.2 },
      calocybe_gambosa: { w15: 0.5, w20: 0.3, w25: 0.2 }
    }
  },
  species: {
    boletus_aestivalis: { label: 'Boletus aestivalis (Hongo de verano)', temp: { min: 14, max: 24 }, smi: { lo: 0.50, hi: 0.75 }, season: { mu: 215, sigma: 25 } },
    boletus_aereus: { label: 'Boletus aereus (Hongo negro / Onddo beltza)', temp: { min: 12, max: 22 }, smi: { lo: 0.50, hi: 0.75 }, season: { mu: 250, sigma: 25 } },
    boletus_edulis: { label: 'Boletus edulis (Hongo blanco / Onddo zuri)', temp: { min: 8, max: 18 }, smi: { lo: 0.55, hi: 0.80 }, season: { mu: 275, sigma: 25, mu2: 140, sigma2: 15 } },
    boletus_pinophilus: { label: 'Boletus pinophilus (Hongo de pino)', temp: { min: 6, max: 16 }, smi: { lo: 0.55, hi: 0.80 }, season: { mu: 275, sigma: 25 } },
    cantharellus: { label: 'Cantharellus cibarius (Rebozuelo / Ziza hori)', temp: { min: 8, max: 20 }, smi: { lo: 0.60, hi: 0.85 }, season: { mu: 240, sigma: 35 } },
    lactarius: { label: 'Lactarius deliciosus (Níscalo / Niskaloa)', temp: { min: 9, max: 16 }, smi: { lo: 0.50, hi: 0.70 }, season: { mu: 295, sigma: 20 } },
    lepista_nuda: { label: 'Lepista nuda (Pie azul / Oinezko urdina)', temp: { min: 4, max: 12 }, smi: { lo: 0.60, hi: 0.80 }, season: { mu: 320, sigma: 25 } },
    hydnum_repandum: { label: 'Hydnum repandum (Gamuza / Lengua de vaca)', temp: { min: 6, max: 15 }, smi: { lo: 0.60, hi: 0.80 }, season: { mu: 295, sigma: 20 } },
    amanita_caesarea: { label: 'Amanita caesarea (Seta de los Césares / Kuleto)', temp: { min: 14, max: 25 }, smi: { lo: 0.45, hi: 0.70 }, season: { mu: 245, sigma: 25 } },
    hygrophorus_marzuolus: { label: 'Hygrophorus marzuolus (Seta de marzo / Marzoko ziza)', temp: { min: 2, max: 12 }, smi: { lo: 0.65, hi: 0.90 }, season: { mu: 75, sigma: 20 } },
    neoboletus_erythropus: { label: 'Neoboletus erythropus (Boleto de pie rojo / Onddo hankagorria)', temp: { min: 10, max: 20 }, smi: { lo: 0.55, hi: 0.80 }, season: { mu: 270, sigma: 25 } },
    leccinum_quercinum: { label: 'Leccinum quercinum (Hongo de roble / Kuku-perretxikoa)', temp: { min: 10, max: 20 }, smi: { lo: 0.50, hi: 0.75 }, season: { mu: 270, sigma: 25 } },
    tricholoma_columbetta: { label: 'Tricholoma columbetta (Palometa / Ziza zuria)', temp: { min: 8, max: 16 }, smi: { lo: 0.60, hi: 0.85 }, season: { mu: 275, sigma: 20 } },
    clitocybe_nebularis: { label: 'Clitocybe nebularis (Pardilla / Ilarraka)', temp: { min: 6, max: 14 }, smi: { lo: 0.55, hi: 0.80 }, season: { mu: 290, sigma: 25 } },
    cortinarius_caperatus: { label: 'Cortinarius caperatus (Rozites / Cortinario arrugado)', temp: { min: 8, max: 16 }, smi: { lo: 0.60, hi: 0.85 }, season: { mu: 285, sigma: 20 } },
    amanita_rubescens: { label: 'Amanita rubescens (Amanita enrojeciente / Gibelgorri kuleto gorri)', temp: { min: 10, max: 22 }, smi: { lo: 0.50, hi: 0.75 }, season: { mu: 260, sigma: 25 } },
    pleurotus_eryngii: { label: 'Pleurotus eryngii (Seta de cardo / Eringio-ziza)', temp: { min: 10, max: 20 }, smi: { lo: 0.40, hi: 0.70 }, season: { mu: 285, sigma: 25, mu2: 110, sigma2: 20 } },
    tricholoma_portentosum: { label: 'Tricholoma portentosum (Capuchina / Ziza kotiola)', temp: { min: 4, max: 12 }, smi: { lo: 0.55, hi: 0.80 }, season: { mu: 315, sigma: 20 } },
    tricholoma_terreum: { label: 'Tricholoma terreum (Negrilla / Fredolic / Ziza beltza)', temp: { min: 4, max: 13 }, smi: { lo: 0.50, hi: 0.75 }, season: { mu: 310, sigma: 25 } },
    marasmius_oreades: { label: 'Marasmius oreades (Senderuela / Karratxila)', temp: { min: 12, max: 22 }, smi: { lo: 0.50, hi: 0.80 }, season: { mu: 150, sigma: 40, mu2: 275, sigma2: 25 } },
    morchella_conica: { label: 'Morchella conica (Colmenilla / Kuku-ziza)', temp: { min: 8, max: 16 }, smi: { lo: 0.60, hi: 0.85 }, season: { mu: 105, sigma: 20 } },
    craterellus_lutescens: { label: 'Craterellus lutescens (Angula de monte / Camagroc / Mendi-angula)', temp: { min: 6, max: 14 }, smi: { lo: 0.65, hi: 0.90 }, season: { mu: 310, sigma: 25 } },
    lactarius_sanguifluus: { label: 'Lactarius sanguifluus (Níscalo de sangre / Odol-niskaloa)', temp: { min: 10, max: 18 }, smi: { lo: 0.45, hi: 0.70 }, season: { mu: 290, sigma: 20 } },
    calocybe_gambosa: { label: 'Calocybe gambosa (Seta de San Juan / Perretxikoa)', temp: { min: 10, max: 18 }, smi: { lo: 0.55, hi: 0.80 }, season: { mu: 125, sigma: 20 } }
  }
};

export const getSettings = () => JSON.parse(localStorage.getItem('zizak_settings') || 'null') || DEFAULT_SETTINGS;

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
function doy(dateStr) { const d = new Date(dateStr); const start = new Date(d.getFullYear(), 0, 0); return Math.floor((d - start) / 86400000); }
function gauss(x, mu, s) { const z = (x - mu) / s; return Math.exp(-0.5 * z * z); }
function triangleSuitability(x, [min, max]) { if (x <= min || x >= max) return 0; const mid = (min + max) / 2; return x <= mid ? (x - min) / (mid - min) : (max - x) / (max - mid); }
function smiSuitability(s, [lo, hi]) { if (s <= lo) return (s / lo) * 0.6; if (s >= hi) return 1; return 0.6 + 0.4 * ((s - lo) / (hi - lo)); }
function vpdFromTempRH(T, RH) { const es = 0.6108 * Math.exp((17.27 * T) / (T + 237.3)); return es * (1 - (RH || 0) / 100); }
function movingAvg(a, k = 3) { return a.map((_, i) => { let s = 0, c = 0; for (let j = 0; j < k; j++) { if (i - j >= 0) { s += a[i - j]; c++; } } return s / Math.max(1, c); }); }

function computePulseGaussian(rain, dailyData, windowDays, threshold, lagMin, lagMax) {
  const n = rain.length, trig = new Array(n).fill(0), interruptions = new Array(n).fill(false);
  let last = -Infinity;
  for (let i = 0; i < n; i++) {
    const sum = rain.slice(Math.max(0, i - windowDays + 1), i + 1).reduce((a, b) => a + (b || 0), 0);
    if (sum >= threshold) last = i;
    const d = i - last;
    if (d >= lagMin && d <= lagMax) {
      const mid = (lagMin + lagMax) / 2, sigma = (lagMax - lagMin) / 4;
      let rawVal = Math.exp(-0.5 * Math.pow((d - mid) / sigma, 2));

      // Verificar si durante los días de incubación (entre last e i) hubo 3+ días de calor o viento secante
      let hotDays = 0;
      for (let k = last; k <= i; k++) {
        if (k >= 0 && dailyData[k]) {
          const t = (dailyData[k].temp_min + dailyData[k].temp_max) / 2;
          const v = vpdFromTempRH(t, dailyData[k].avg_humidity || 0);
          if (t >= 26 || v >= 1.2) hotDays++;
        }
      }

      if (hotDays >= 3) {
        rawVal *= 0.2; // Aborto / penalización del 80% por racha calurosa secante
        interruptions[i] = true;
      }
      trig[i] = rawVal;
    }
  }
  return { trig, interruptions };
}

export function computeBaseProbabilities(dailyData, loc) {
  const SETTINGS = getSettings();
  const smax = loc.soilAcidity === 'acidofilo' ? SETTINGS.smi.smax.acid : (loc.soilAcidity === 'basofilo' ? SETTINGS.smi.smax.basic : SETTINGS.smi.smax.default);
  const rain = dailyData.map(d => d.rain_for_day || 0);
  const et0 = dailyData.map(d => d.avg_et0 || 0);
  const tmed = dailyData.map(d => (d.temp_min + d.temp_max) / 2);
  const rh = dailyData.map(d => d.avg_humidity || 0);
  const alt = Number.isFinite(loc.altitude) ? loc.altitude : SETTINGS.base.alt.ref;

  const tCorr = tmed.map(T => T - SETTINGS.base.alt.lapse * (alt - SETTINGS.base.alt.ref));
  const tCorr3 = movingAvg(tCorr, 3);
  const vpd = tCorr.map((T, i) => vpdFromTempRH(T, rh[i]));

  // Lluvia efectiva: Lluvias < 5mm en días con calor (>22°C) o aire seco (VPD > 1.0) se evaporan al 100%
  const effRain = rain.map((r, i) => {
    if (r < 5 && (tCorr3[i] > 22 || vpd[i] > 1.0)) {
      return 0;
    }
    return Math.min(r, 25) * 0.8;
  });

  let S = smax * 0.5;
  const smi = effRain.map((eff, i) => {
    S = clamp(S + eff - Math.max(et0[i], 0), 0, smax);
    return S / smax;
  });

  const p15 = computePulseGaussian(rain, dailyData, 2, SETTINGS.triggers.mm15.th, SETTINGS.triggers.mm15.lagMin, SETTINGS.triggers.mm15.lagMax);
  const p20 = computePulseGaussian(rain, dailyData, 2, SETTINGS.triggers.mm20.th, SETTINGS.triggers.mm20.lagMin, SETTINGS.triggers.mm20.lagMax);
  const p25 = computePulseGaussian(rain, dailyData, 2, SETTINGS.triggers.mm25.th, SETTINGS.triggers.mm25.lagMin, SETTINGS.triggers.mm25.lagMax);

  const trig15 = p15.trig, trig20 = p20.trig, trig25 = p25.trig;

  const results = dailyData.map((d, i) => {
    let sc = 0;
    const lackingKeys = [];
    const optimalKeys = [];

    if (smi[i] >= 0.7) { sc += 2.5; optimalKeys.push('breakdown.soil_wet'); }
    else if (smi[i] >= 0.5) { sc += 1.5; optimalKeys.push('breakdown.soil_mid'); }
    else if (smi[i] > 0.3) { sc += 0.5; lackingKeys.push('breakdown.soil_dry'); }
    else { lackingKeys.push('breakdown.soil_dry_severe'); }

    if (trig20[i] > 0) { sc += 0.8 * trig20[i]; optimalKeys.push('breakdown.pulse_rain'); }
    else { lackingKeys.push('breakdown.no_rain_pulse'); }

    if (p15.interruptions[i] || p20.interruptions[i] || p25.interruptions[i]) {
      sc -= 1.5;
      lackingKeys.push('breakdown.heat_interruption');
    }

    if (d.rain_for_day > 0 && d.rain_for_day < 5 && (tCorr3[i] > 22 || vpd[i] > 1.0)) {
      lackingKeys.push('breakdown.rain_evaporated');
    }

    const T = tCorr3[i];
    if (T >= SETTINGS.base.temp.optMin && T <= SETTINGS.base.temp.optMax) { sc += SETTINGS.base.temp.optPts; optimalKeys.push('breakdown.temp_opt'); }
    else if (T > SETTINGS.base.temp.heatThresh) { sc += SETTINGS.base.temp.heatPenalty; lackingKeys.push('breakdown.heat_penalty'); }
    else if (T < 5) { lackingKeys.push('breakdown.temp_cold'); }

    const v = vpd[i];
    if (v <= SETTINGS.base.vpd.lowThresh) { sc += 1.0; optimalKeys.push('breakdown.vpd_low'); }
    else if (v > SETTINGS.base.vpd.highThresh) { sc -= 0.8; lackingKeys.push('breakdown.vpd_high'); }

    let m = 1.0;
    if (loc.soilAcidity === 'acidofilo') m *= 1.25;
    if (loc.canopy === 'claro_trasmocho') m *= 1.20;
    if (loc.canopy === 'sombrio_denso') m *= 0.70;
    if (loc.ageClass === 'joven') m *= 0.40;
    if (m > 1.0) optimalKeys.push('breakdown.habitat_mult');

    let p = 1 / (1 + Math.exp(-(sc - 5.0))) * 100;
    
    // Si la humedad del suelo no es sostenida (SMI < 0.5), limitar la probabilidad máxima al 55%
    if (p > 55 && smi[i] < 0.5) {
      p = 55;
    }

    const chance = p >= 70 ? 'Alta' : (p >= 45 ? 'Media' : 'Baja');
    return {
      ...d,
      smi: smi[i],
      vpd: v,
      tmed: T,
      baseProb: clamp(p, 0, 100),
      chance,
      score: `${p.toFixed(1)}%`,
      score_breakdown: { lacking: lackingKeys, optimal: optimalKeys }
    };
  });

  return { series: { tCorr3, smi, vpd, trig15, trig20, trig25, rain }, daily: results };
}

export function computeSpeciesForLocation(loc, baseCtx) {
  const SETTINGS = getSettings();
  const zoneInfo = getRegionalZoneInfo(loc.lat, loc.lon);
  loc.zone = zoneInfo.code;
  loc.zoneInfo = zoneInfo;

  const dd = baseCtx.daily;
  const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });

  const allDaysProcessed = dd.map((d, i) => {
    const out = { ...d };
    const spProbs = {};
    let sum = 0;
    for (const key of Object.keys(SETTINGS.species)) {
      const spS = SETTINGS.species[key];
      const wT = Math.pow(triangleSuitability(d.tmed, [spS.temp.min, spS.temp.max]), 1.15);
      const wSmi = Math.pow(smiSuitability(d.smi, [spS.smi.lo, spS.smi.hi]), 1.1);
      const W = SETTINGS.triggers.weights[key] || { w15: 0.5, w20: 0.5, w25: 0.5 };
      const wPulse = clamp(W.w15 * baseCtx.series.trig15[i] + W.w20 * baseCtx.series.trig20[i] + W.w25 * baseCtx.series.trig25[i], 0, 1);
      
      const xDOY = doy(d.date);
      const wSeason1 = gauss(xDOY, spS.season.mu, spS.season.sigma);
      const wSeason2 = (spS.season.mu2 && spS.season.sigma2) ? gauss(xDOY, spS.season.mu2, spS.season.sigma2) : 0;
      const wSeason = Math.max(0.2, Math.max(wSeason1, wSeason2));

      let wZone = 1.0;
      if (zoneInfo.favSpecies && zoneInfo.favSpecies.includes(key)) {
        wZone = 1.35;
      }

      const raw = wT * wSmi * (0.5 + 0.5 * wPulse) * wSeason * wZone;
      spProbs[key] = raw;
      sum += raw;
    }
    if (sum <= 0) sum = 1e-6;
    const scaled = {};
    for (const k of Object.keys(spProbs)) { scaled[k] = (spProbs[k] / sum) * d.baseProb; }
    out.species = scaled;
    out.top_species = Object.keys(scaled).sort((a, b) => scaled[b] - scaled[a])[0] || null;
    return out;
  });

  loc.history = allDaysProcessed; // 21 días (14 pasados + hoy + 6 futuros) para gráficos

  let todayIndex = allDaysProcessed.findIndex(d => d.date >= todayStr);
  if (todayIndex === -1) {
    todayIndex = Math.max(0, allDaysProcessed.length - 7);
  }

  loc.forecast = allDaysProcessed.slice(todayIndex, todayIndex + 7); // 7 días (Hoy + 6 próximos)
  return loc;
}
