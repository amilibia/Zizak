// Zizak Pro - Controlador UI del Cuaderno de Campo & Backup Sync

import { getAllJournalEntries, saveJournalEntry, deleteJournalEntry } from '../models/journalDb.js';
import { getLang, t } from '../i18n/i18n.js';

export async function renderJournalUI() {
  const container = document.getElementById('journal-entries-list');
  if (!container) return;

  const entries = await getAllJournalEntries();
  if (entries.length === 0) {
    container.innerHTML = `
      <div class="text-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <p class="text-sm text-gray-500 font-medium" data-i18n="journal.empty">${t('journal.empty')}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${entries.map(e => `
        <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-bold text-base text-green-900">${e.location || 'Paraje sin nombre'}</h4>
              <span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">${e.date}</span>
            </div>
            <p class="text-xs text-gray-700 mb-1"><b>🍄 ${t('journal.species')}:</b> ${e.species || '-'}</p>
            <p class="text-xs text-gray-700 mb-2"><b>⚖️ ${t('journal.quantity')}:</b> ${e.quantity || '-'} kg</p>
            ${e.notes ? `<p class="text-xs text-gray-600 italic bg-gray-50 p-2 rounded mb-2">"${e.notes}"</p>` : ''}
            ${e.photo ? `<img src="${e.photo}" class="w-full h-36 object-cover rounded-xl mb-2" alt="Foto captura" />` : ''}
          </div>
          <div class="flex justify-end pt-2 border-t border-gray-100">
            <button class="delete-entry-btn text-xs text-red-600 hover:text-red-800 font-bold" data-id="${e.id}">🗑️ Eliminar</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.delete-entry-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = parseInt(btn.getAttribute('data-id'));
      if (confirm('¿Eliminar esta captura del cuaderno?')) {
        await deleteJournalEntry(id);
        renderJournalUI();
      }
    };
  });
}

export function setupJournalForm(onSuccess) {
  const form = document.getElementById('journal-form');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const date = document.getElementById('j-date').value;
    const location = document.getElementById('j-location').value;
    const species = document.getElementById('j-species').value;
    const quantity = document.getElementById('j-quantity').value;
    const notes = document.getElementById('j-notes').value;
    const photoFile = document.getElementById('j-photo').files[0];

    let photoBase64 = '';
    if (photoFile) {
      photoBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.readAsDataURL(photoFile);
      });
    }

    const entry = { date, location, species, quantity, notes, photo: photoBase64, createdAt: Date.now() };
    await saveJournalEntry(entry);
    form.reset();
    document.getElementById('journal-modal')?.classList.add('hidden');
    renderJournalUI();
    if (onSuccess) onSuccess();
  };
}

export async function exportFullBackupJSON() {
  const entries = await getAllJournalEntries();
  const locations = JSON.parse(localStorage.getItem('zizak_locations') || '[]');
  const settings = JSON.parse(localStorage.getItem('zizak_settings') || 'null');

  const backupData = {
    version: 'ZizakPro_v8',
    exportedAt: new Date().toISOString(),
    locations,
    settings,
    journalEntries: entries
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zizak_pro_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importFullBackupJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.locations) localStorage.setItem('zizak_locations', JSON.stringify(data.locations));
        if (data.settings) localStorage.setItem('zizak_settings', JSON.stringify(data.settings));
        if (Array.isArray(data.journalEntries)) {
          for (const entry of data.journalEntries) {
            delete entry.id;
            await saveJournalEntry(entry);
          }
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
}
