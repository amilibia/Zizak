// Zizak Pro - Controlador UI de Guía de Especies & Recetario

import { SPECIES_GUIDE } from '../data/species.js';
import { RECIPES_DATA } from '../data/recipes.js';
import { getLang, t } from '../i18n/i18n.js';

export function renderGuideAndRecipes() {
  const gGrid = document.getElementById('guide-grid');
  const rGrid = document.getElementById('recipes-grid');
  if (!gGrid || !rGrid) return;

  const searchVal = (document.getElementById('guide-search')?.value || '').toLowerCase();
  const edibleFilter = document.getElementById('filter-edible')?.value || 'all';
  const seasonFilter = document.getElementById('filter-season')?.value || 'all';

  const lang = getLang();

  // Filtrar Especies
  const filteredSpecies = SPECIES_GUIDE.filter(s => {
    const name = (lang === 'eu' ? s.nameEU : s.nameES).toLowerCase();
    const matchesSearch = !searchVal || name.includes(searchVal) || s.key.includes(searchVal);
    const matchesEdible = edibleFilter === 'all' || s.edible === edibleFilter;
    
    let matchesSeason = true;
    if (seasonFilter !== 'all') {
      const monthIdx = parseInt(seasonFilter);
      matchesSeason = (s.months[monthIdx] || 0) > 0;
    }

    return matchesSearch && matchesEdible && matchesSeason;
  });

  const monthShorts = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  gGrid.innerHTML = filteredSpecies.map(s => {
    const name = lang === 'eu' ? s.nameEU : s.nameES;
    const traits = lang === 'eu' ? s.traitsEU : s.traitsES;
    const habitat = lang === 'eu' ? s.habitatEU : s.habitatES;
    const conf = lang === 'eu' ? s.confEU : s.confES;
    const tip = lang === 'eu' ? s.mycosilvaEU : s.mycosilvaES;

    const badge = s.navarraFreq ? 
      `<span class="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full mb-3 mr-2">📌 ${lang === 'eu' ? 'Nafarroan maizagoak' : 'Más frecuentes en Navarra'}</span>` : 
      `<span class="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-full mb-3 mr-2">🍄 ${lang === 'eu' ? 'Gida Orokorra' : 'Guía General (Cesta y Setas)'}</span>`;

    const calendarHtml = `
      <div class="mt-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase mb-1">${t('guide.fruitingSeason')}</p>
        <div class="fruiting-calendar-grid">
          ${s.months.map((lvl, mIdx) => `
            <div class="fruiting-month-cell fruiting-level-${lvl}" title="${monthShorts[mIdx]}: Nivel ${lvl}">
              <span>${monthShorts[mIdx]}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const tipHtml = tip ? `
      <div class="bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200 mt-3 text-[11px]">
        <p class="font-bold text-emerald-900">🌲 MYCOSILVA Manejo:</p>
        <p class="text-emerald-800 leading-tight">${tip}</p>
      </div>
    ` : '';

    return `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden group">
        <!-- FOTO DE LA ESPECIE -->
        <div class="relative w-full h-48 overflow-hidden bg-slate-100">
          <img src="${s.image || `assets/img/species/${s.key}.jpg`}" alt="${name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="if(this.src!=='${s.imgUrl}'){this.src='${s.imgUrl}';}else{this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-200 text-5xl\\'>${s.icon || '🍄'}</div>';}" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent flex items-end p-4">
            <div>
              <span class="inline-block px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-md mb-1 uppercase tracking-wider shadow-sm">${s.edible}</span>
              <h4 class="font-extrabold text-base text-white leading-tight flex items-center gap-1.5">${s.icon || '🍄'} ${name}</h4>
            </div>
          </div>
        </div>

        <div class="p-5">
          <div class="flex flex-wrap items-center mb-3">
            ${badge}
          </div>
          <div class="space-y-2 text-xs text-slate-700">
            <p><b>${t('guide.traits')}:</b></p>
            <ul class="list-disc list-inside space-y-0.5 pl-1">${traits.map(tr => `<li>${tr}</li>`).join('')}</ul>
            <p><b>${t('guide.habitat')}:</b> ${habitat}</p>
            <p class="text-red-700"><b>${t('guide.confusions')}:</b> ${conf}</p>
          </div>
          ${tipHtml}
          ${calendarHtml}
        </div>
      </div>
    `;
  }).join('');

  // Render Recetario
  rGrid.innerHTML = RECIPES_DATA.map(r => {
    const title = lang === 'eu' ? r.titleEU : r.titleES;
    const prep = lang === 'eu' ? r.prepEU : r.prepES;
    const pres = lang === 'eu' ? r.presEU : r.presES;
    return `
      <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 shadow-sm">
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-bold text-base text-amber-900">${title}</h4>
          <span class="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">${r.time}</span>
        </div>
        <p class="text-xs font-semibold text-amber-800 mb-3">🍄 ${r.species}</p>
        <div class="space-y-2 text-xs text-gray-700">
          <p><b>${t('recipes.prep')}:</b> ${prep}</p>
          <p class="text-emerald-800 font-medium"><b>${t('recipes.preservation')}:</b> ${pres}</p>
        </div>
      </div>
    `;
  }).join('');
}
