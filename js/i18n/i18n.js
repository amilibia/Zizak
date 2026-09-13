// Zizak Pro - Motor I18N
import { es } from './es.js';
import { eu } from './eu.js';

const dictionaries = { es, eu };

export function getLang() {
  return localStorage.getItem('zizak_lang') || 'es';
}

export function setLang(lang) {
  const target = lang === 'eu' ? 'eu' : 'es';
  localStorage.setItem('zizak_lang', target);
  return target;
}

export function isEU() {
  return getLang() === 'eu';
}

export function t(path) {
  const lang = getLang();
  const parts = path.split('.');
  let node = dictionaries[lang];
  for (const p of parts) {
    node = node?.[p];
    if (node === undefined) return path;
  }
  return node;
}

export function applyStaticI18N() {
  const lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    const v = t(k);
    if (v != null) el.textContent = v;
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const k = el.getAttribute('data-i18n-ph');
    const v = t(k);
    if (v != null) el.setAttribute('placeholder', v);
  });

  const langBtn = document.getElementById('__langBtn');
  if (langBtn) {
    langBtn.querySelector('span').textContent = lang === 'eu' ? 'Castellano' : 'Euskara';
  }
}
