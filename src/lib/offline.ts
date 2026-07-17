const CACHE_KEY = 'ssb_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
const DB_NAME = 'ssb_offline';
const DB_VERSION = 1;
const STORE_CHAPTERS = 'chapters';
const STORE_META = 'meta';

interface CacheEntry {
  data: string[];
  timestamp: number;
}

interface CacheStore {
  [key: string]: CacheEntry;
}

interface OfflineStats {
  totalChapters: number;
  totalTranslations: number;
  translations: Record<string, number>;
  storageUsed: number;
  lastSync: number | null;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_CHAPTERS)) {
        db.createObjectStore(STORE_CHAPTERS, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function chapterKey(livro: string, capitulo: number, traducao: string): string {
  return `${traducao}:${livro}:${capitulo}`;
}

export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

export function onStatusChange(callback: (online: boolean) => void): () => void {
  const handler = () => callback(navigator.onLine);
  window.addEventListener('online', handler);
  window.addEventListener('offline', handler);
  return () => {
    window.removeEventListener('online', handler);
    window.removeEventListener('offline', handler);
  };
}

export function cacheChapter(livro: string, capitulo: number, traducao: string, verses: string[]) {
  try {
    const store: CacheStore = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    store[chapterKey(livro, capitulo, traducao)] = { data: verses, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch {}
  try {
    void saveChapterDB(livro, capitulo, traducao, verses);
  } catch {}
}

export function getCachedChapter(livro: string, capitulo: number, traducao: string): string[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const store: CacheStore = JSON.parse(raw);
      const entry = store[chapterKey(livro, capitulo, traducao)];
      if (entry && Date.now() - entry.timestamp <= CACHE_EXPIRY) {
        return entry.data;
      }
    }
  } catch {}
  return null;
}

export async function getCachedChapterDB(
  livro: string,
  capitulo: number,
  traducao: string
): Promise<string[] | null> {
  try {
    return await getChapterDB(livro, capitulo, traducao);
  } catch {
    return null;
  }
}

export async function hasOfflineData(
  livro: string,
  capitulo: number,
  traducao: string
): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const req = tx.objectStore(STORE_CHAPTERS).get(chapterKey(livro, capitulo, traducao));
      req.onsuccess = () => resolve(!!req.result?.verses?.length);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {}
}

export async function saveChapterDB(
  livro: string,
  capitulo: number,
  traducao: string,
  verses: string[]
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
      tx.objectStore(STORE_CHAPTERS).put({
        key: chapterKey(livro, capitulo, traducao),
        livro,
        capitulo,
        traducao,
        verses,
        timestamp: Date.now(),
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}

export async function getChapterDB(
  livro: string,
  capitulo: number,
  traducao: string
): Promise<string[] | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const req = tx.objectStore(STORE_CHAPTERS).get(chapterKey(livro, capitulo, traducao));
      req.onsuccess = () => resolve(req.result?.verses ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveMeta(key: string, value: unknown): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_META, 'readwrite');
      tx.objectStore(STORE_META).put({ key, value, timestamp: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}

export async function getMeta(key: string): Promise<unknown | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_META, 'readonly');
      const req = tx.objectStore(STORE_META).get(key);
      req.onsuccess = () => resolve(req.result?.value ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export const TRADUCOES_LOCAIS = ['acf', 'ara', 'arc', 'kjv', 'nvi', 'web'] as const;
export type TraducaoLocalId = (typeof TRADUCOES_LOCAIS)[number];

export async function cacheAllTranslations(
  onProgress?: (translation: string, current: number, total: number) => void
): Promise<void> {
  for (const traducao of TRADUCOES_LOCAIS) {
    try {
      const mod = await import(`@/data/biblia/texto/${traducao}/index`);
      const data = mod.default;
      let count = 0;
      const totalBooks = Object.keys(data).length;

      for (const [livro, capitulos] of Object.entries(data)) {
        for (const [capStr, versiculos] of Object.entries(capitulos as Record<number, string[]>)) {
          const capitulo = Number(capStr);
          await saveChapterDB(livro, capitulo, traducao, versiculos);
          count++;
          onProgress?.(traducao, count, totalBooks);
        }
      }

      await saveMeta(`sync:${traducao}`, Date.now());
    } catch {}
  }
  await saveMeta('lastFullSync', Date.now());
}

export async function getOfflineStats(): Promise<OfflineStats> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const req = tx.objectStore(STORE_CHAPTERS).count();
      req.onsuccess = async () => {
        const totalChapters = req.result;
        const txMeta = db.transaction(STORE_META, 'readonly');
        const metaStore = txMeta.objectStore(STORE_META);

        const translations: Record<string, number> = {};
        const countReq = tx.objectStore(STORE_CHAPTERS).openCursor();
        let storageUsed = 0;

        countReq.onsuccess = () => {
          const cursor = countReq.result;
          if (cursor) {
            const d = cursor.value as { traducao: string; verses: string[]; key: string };
            translations[d.traducao] = (translations[d.traducao] || 0) + 1;
            storageUsed += JSON.stringify(d).length * 2;
            cursor.continue();
          } else {
            const lastSyncReq = metaStore.get('lastFullSync');
            lastSyncReq.onsuccess = () => {
              resolve({
                totalChapters,
                totalTranslations: Object.keys(translations).length,
                translations,
                storageUsed,
                lastSync: lastSyncReq.result?.value ?? null,
              });
            };
            lastSyncReq.onerror = () => {
              resolve({
                totalChapters,
                totalTranslations: Object.keys(translations).length,
                translations,
                storageUsed,
                lastSync: null,
              });
            };
          }
        };
      };
      req.onerror = () => {
        resolve({
          totalChapters: 0,
          totalTranslations: 0,
          translations: {},
          storageUsed: 0,
          lastSync: null,
        });
      };
    });
  } catch {
    return {
      totalChapters: 0,
      totalTranslations: 0,
      translations: {},
      storageUsed: 0,
      lastSync: null,
    };
  }
}

export async function clearOfflineCache(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_CHAPTERS, STORE_META], 'readwrite');
      tx.objectStore(STORE_CHAPTERS).clear();
      tx.objectStore(STORE_META).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
  clearCache();
}

export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null);
  }
  return navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => {
      if (reg.active) return reg;
      return reg.installing
        ? new Promise<ServiceWorkerRegistration>((resolve) => {
            reg.installing!.onstatechange = () => {
              if (reg.installing!.state === 'activated') resolve(reg);
            };
          })
        : reg;
    })
    .catch(() => null);
}

export async function queueNoteForSync(note: {
  id: string;
  content: string;
  reference: string;
  timestamp: number;
}): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_META, 'readwrite');
      const store = tx.objectStore(STORE_META);
      const req = store.get('pendingNotes');
      req.onsuccess = () => {
        const notes = (req.result?.value as Array<typeof note>) || [];
        notes.push(note);
        store.put({ key: 'pendingNotes', value: notes, timestamp: Date.now() });
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}

export async function getPendingNotes(): Promise<Array<{
  id: string;
  content: string;
  reference: string;
  timestamp: number;
}>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_META, 'readonly');
      const req = tx.objectStore(STORE_META).get('pendingNotes');
      req.onsuccess = () => resolve((req.result?.value as Array<{
        id: string;
        content: string;
        reference: string;
        timestamp: number;
      }>) || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function clearPendingNotes(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_META, 'readwrite');
      tx.objectStore(STORE_META).delete('pendingNotes');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}
