// Zizak Pro - Gestor de Base de Datos IndexedDB (Cuaderno de Campo Micológico)

const DB_NAME = 'ZizakJournalDB_v2';
const DB_VERSION = 1;
let dbInstance = null;

export function initJournalDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('entries')) {
        db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };
    req.onerror = (e) => reject(e);
  });
}

export function getAllJournalEntries() {
  return new Promise((resolve, reject) => {
    if (!dbInstance) return resolve([]);
    const tx = dbInstance.transaction('entries', 'readonly');
    const store = tx.objectStore('entries');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = (e) => reject(e);
  });
}

export function saveJournalEntry(entry) {
  return new Promise((resolve, reject) => {
    if (!dbInstance) return reject(new Error('IndexedDB not initialized'));
    const tx = dbInstance.transaction('entries', 'readwrite');
    const store = tx.objectStore('entries');
    const req = store.put(entry);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e);
  });
}

export function deleteJournalEntry(id) {
  return new Promise((resolve, reject) => {
    if (!dbInstance) return reject(new Error('IndexedDB not initialized'));
    const tx = dbInstance.transaction('entries', 'readwrite');
    const store = tx.objectStore('entries');
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e);
  });
}
