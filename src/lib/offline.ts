const CACHE_KEY = 'ssb_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
const DB_NAME = 'ssb_offline';
const DB_VERSION = 2;
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

export async function cacheTranslation(
  traducao: string,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  try {
    const mod = await import(`@/data/biblia/texto/${traducao}/index`);
    const data = mod.default;
    let count = 0;
    const totalChapters = Object.values(data as Record<string, Record<number, string[]>>).reduce(
      (acc: number, capitulos: Record<number, string[]>) => acc + Object.keys(capitulos).length, 0
    );

    for (const [livro, capitulos] of Object.entries(data)) {
      for (const [capStr, versiculos] of Object.entries(capitulos as Record<number, string[]>)) {
        const capitulo = Number(capStr);
        await saveChapterDB(livro, capitulo, traducao, versiculos);
        count++;
        onProgress?.(count, totalChapters);
      }
    }

    await saveMeta(`sync:${traducao}`, Date.now());
  } catch {}
}

export async function isTranslationDownloaded(traducao: string): Promise<boolean> {
  try {
    const stats = await getOfflineStats();
    return (stats.translations[traducao] || 0) > 0;
  } catch { return false; }
}

export async function removeTranslation(traducao: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          if (cursor.value.traducao === traducao) cursor.delete();
          cursor.continue();
        }
      };
      tx.oncomplete = async () => {
        await saveMeta(`sync:${traducao}`, null);
        resolve();
      };
    });
  } catch {}
}

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

const MIDVASH_API = 'https://api.midvash.com/v1';

const LIVROS_COMPLETOS: Array<{ abrev: string; midvash: string; capitulos: number }> = [
  { abrev: 'gn', midvash: 'genesis', capitulos: 50 },
  { abrev: 'ex', midvash: 'exodo', capitulos: 40 },
  { abrev: 'lv', midvash: 'levitico', capitulos: 27 },
  { abrev: 'nm', midvash: 'numeros', capitulos: 36 },
  { abrev: 'dt', midvash: 'deuteronomio', capitulos: 34 },
  { abrev: 'js', midvash: 'josue', capitulos: 24 },
  { abrev: 'jz', midvash: 'juizes', capitulos: 21 },
  { abrev: 'rt', midvash: 'rute', capitulos: 4 },
  { abrev: '1sm', midvash: '1-samuel', capitulos: 31 },
  { abrev: '2sm', midvash: '2-samuel', capitulos: 24 },
  { abrev: '1rs', midvash: '1-reis', capitulos: 22 },
  { abrev: '2rs', midvash: '2-reis', capitulos: 25 },
  { abrev: '1cr', midvash: '1-cronicas', capitulos: 29 },
  { abrev: '2cr', midvash: '2-cronicas', capitulos: 36 },
  { abrev: 'ed', midvash: 'esdras', capitulos: 10 },
  { abrev: 'ne', midvash: 'neemias', capitulos: 13 },
  { abrev: 'et', midvash: 'ester', capitulos: 10 },
  { abrev: 'jó', midvash: 'jo', capitulos: 42 },
  { abrev: 'sl', midvash: 'salmos', capitulos: 150 },
  { abrev: 'pv', midvash: 'proverbios', capitulos: 31 },
  { abrev: 'ec', midvash: 'eclesiastes', capitulos: 12 },
  { abrev: 'ct', midvash: 'canticos', capitulos: 8 },
  { abrev: 'is', midvash: 'isaias', capitulos: 66 },
  { abrev: 'jr', midvash: 'jeremias', capitulos: 52 },
  { abrev: 'lm', midvash: 'lamentacoes', capitulos: 5 },
  { abrev: 'ez', midvash: 'ezequiel', capitulos: 48 },
  { abrev: 'dn', midvash: 'daniel', capitulos: 12 },
  { abrev: 'os', midvash: 'oseias', capitulos: 14 },
  { abrev: 'jl', midvash: 'joel', capitulos: 3 },
  { abrev: 'am', midvash: 'amos', capitulos: 9 },
  { abrev: 'ob', midvash: 'obadias', capitulos: 1 },
  { abrev: 'jn', midvash: 'jonas', capitulos: 4 },
  { abrev: 'mq', midvash: 'miqueias', capitulos: 7 },
  { abrev: 'na', midvash: 'naum', capitulos: 3 },
  { abrev: 'hc', midvash: 'habacuque', capitulos: 3 },
  { abrev: 'sf', midvash: 'sofonias', capitulos: 3 },
  { abrev: 'ag', midvash: 'ageu', capitulos: 2 },
  { abrev: 'zc', midvash: 'zacarias', capitulos: 14 },
  { abrev: 'ml', midvash: 'malaquias', capitulos: 4 },
  { abrev: 'mt', midvash: 'mateus', capitulos: 28 },
  { abrev: 'mc', midvash: 'marcos', capitulos: 16 },
  { abrev: 'lc', midvash: 'lucas', capitulos: 24 },
  { abrev: 'jo', midvash: 'joao', capitulos: 21 },
  { abrev: 'at', midvash: 'atos', capitulos: 28 },
  { abrev: 'rm', midvash: 'romanos', capitulos: 16 },
  { abrev: '1co', midvash: '1-corintios', capitulos: 16 },
  { abrev: '2co', midvash: '2-corintios', capitulos: 13 },
  { abrev: 'gl', midvash: 'galatas', capitulos: 6 },
  { abrev: 'ef', midvash: 'efesios', capitulos: 6 },
  { abrev: 'fp', midvash: 'filipenses', capitulos: 4 },
  { abrev: 'cl', midvash: 'colossenses', capitulos: 4 },
  { abrev: '1ts', midvash: '1-tessalonicenses', capitulos: 5 },
  { abrev: '2ts', midvash: '2-tessalonicenses', capitulos: 3 },
  { abrev: '1tm', midvash: '1-timoteo', capitulos: 6 },
  { abrev: '2tm', midvash: '2-timoteo', capitulos: 4 },
  { abrev: 'tt', midvash: 'tito', capitulos: 3 },
  { abrev: 'fm', midvash: 'filemom', capitulos: 1 },
  { abrev: 'hb', midvash: 'hebreus', capitulos: 13 },
  { abrev: 'tg', midvash: 'tiago', capitulos: 5 },
  { abrev: '1pe', midvash: '1-pedro', capitulos: 5 },
  { abrev: '2pe', midvash: '2-pedro', capitulos: 3 },
  { abrev: '1jo', midvash: '1-joao', capitulos: 5 },
  { abrev: '2jo', midvash: '2-joao', capitulos: 1 },
  { abrev: '3jo', midvash: '3-joao', capitulos: 1 },
  { abrev: 'jd', midvash: 'judas', capitulos: 1 },
  { abrev: 'ap', midvash: 'apocalipse', capitulos: 22 },
];

import { fetchWithRetry } from './fetchWithRetry';

async function fetchMidvashChapter(traducao: string, slug: string, capitulo: number): Promise<string[] | null> {
  try {
    const res = await fetchWithRetry(`${MIDVASH_API}/${traducao}/${slug}/${capitulo}`, {
      timeoutMs: 10_000,
      maxRetries: 2,
    });
    if (!res.ok) return null;
    const json = await res.json();
    const raw = json?.data?.verses;
    if (!Array.isArray(raw)) return null;
    const out: string[] = [];
    for (const v of raw) {
      const texto = typeof v === 'string' ? v : v?.text;
      if (texto?.trim()) out.push(texto.trim());
    }
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

export async function downloadApiTranslation(
  traducao: string,
  onProgress?: (book: string, chapter: number, total: number) => void,
  signal?: AbortSignal
): Promise<number> {
  const totalCapitulos = LIVROS_COMPLETOS.reduce((acc, l) => acc + l.capitulos, 0);
  let downloaded = 0;
  let batch: Array<{ key: string; livro: string; capitulo: number; traducao: string; verses: string[] }> = [];

  for (const livro of LIVROS_COMPLETOS) {
    for (let cap = 1; cap <= livro.capitulos; cap++) {
      if (signal?.aborted) return downloaded;

      const verses = await fetchMidvashChapter(traducao, livro.midvash, cap);
      if (verses) {
        batch.push({
          key: `${traducao}:${livro.abrev}:${cap}`,
          livro: livro.abrev,
          capitulo: cap,
          traducao,
          verses,
        });
      }

      downloaded++;
      onProgress?.(livro.abrev, cap, totalCapitulos);

      if (batch.length >= 20) {
        await flushBatch(batch);
        batch = [];
      }

      // Stagger para evitar rate limit na API
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  if (batch.length > 0) await flushBatch(batch);
  await saveMeta(`sync:${traducao}`, Date.now());
  return downloaded;
}

async function flushBatch(batch: Array<{ key: string; livro: string; capitulo: number; traducao: string; verses: string[] }>) {
  try {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
      const store = tx.objectStore(STORE_CHAPTERS);
      for (const item of batch) {
        store.put(item);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}

export async function cancelDownload(): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve) => {
    const tx = db.transaction(STORE_META, 'readwrite');
    tx.objectStore(STORE_META).put({ key: 'downloadAborted', value: true, timestamp: Date.now() });
    tx.oncomplete = () => resolve();
  });
}

// ── Per-book download (YouVersion-style) ──────────────────────────

import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';

export const ALL_BOOKS: LivroInfo[] = [...LIVROS_AT, ...LIVROS_NT];

export async function cacheBook(
  traducao: string,
  bookAbrev: string,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const book = ALL_BOOKS.find(b => b.abreviacao === bookAbrev);
  if (!book) return;

  const mod = await import(`@/data/biblia/texto/${traducao}/index`);
  const data = mod.default as Record<string, Record<number, string[]>>;
  const bookData = data[bookAbrev];
  if (!bookData) return;

  const chapters = Object.entries(bookData);
  let count = 0;
  for (const [capStr, verses] of chapters) {
    await saveChapterDB(bookAbrev, Number(capStr), traducao, verses);
    count++;
    onProgress?.(count, chapters.length);
  }
}

export async function cacheTestament(
  traducao: string,
  testamento: 'AT' | 'NT',
  onProgress?: (book: string, current: number, total: number) => void
): Promise<void> {
  const books = testamento === 'AT' ? LIVROS_AT : LIVROS_NT;
  let globalCount = 0;
  const totalChapters = books.reduce((acc, b) => acc + b.totalCapitulos, 0);

  const mod = await import(`@/data/biblia/texto/${traducao}/index`);
  const data = mod.default as Record<string, Record<number, string[]>>;

  for (const book of books) {
    const bookData = data[book.abreviacao];
    if (!bookData) continue;
    for (const [capStr, verses] of Object.entries(bookData)) {
      await saveChapterDB(book.abreviacao, Number(capStr), traducao, verses);
      globalCount++;
      onProgress?.(book.nome, globalCount, totalChapters);
    }
  }
}

export type BookDownloadStatus = {
  abreviacao: string;
  nome: string;
  totalCapitulos: number;
  downloadedChapters: number;
  isComplete: boolean;
};

export async function getBookDownloadStatus(
  traducao: string
): Promise<BookDownloadStatus[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const req = tx.objectStore(STORE_CHAPTERS).openCursor();
      const chapterCounts: Record<string, number> = {};

      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const val = cursor.value as { traducao: string; livro: string };
          if (val.traducao === traducao) {
            chapterCounts[val.livro] = (chapterCounts[val.livro] || 0) + 1;
          }
          cursor.continue();
        } else {
          resolve(
            ALL_BOOKS.map(book => ({
              abreviacao: book.abreviacao,
              nome: book.nome,
              totalCapitulos: book.totalCapitulos,
              downloadedChapters: chapterCounts[book.abreviacao] || 0,
              isComplete: (chapterCounts[book.abreviacao] || 0) >= book.totalCapitulos,
            }))
          );
        }
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function removeBook(traducao: string, bookAbrev: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const val = cursor.value as { traducao: string; livro: string };
          if (val.traducao === traducao && val.livro === bookAbrev) {
            cursor.delete();
          }
          cursor.continue();
        }
      };
      tx.oncomplete = () => resolve();
    });
  } catch {}
}

export async function getDownloadedBooks(traducao: string): Promise<Set<string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const req = tx.objectStore(STORE_CHAPTERS).openCursor();
      const downloaded = new Set<string>();

      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const val = cursor.value as { traducao: string; livro: string };
          if (val.traducao === traducao) {
            downloaded.add(val.livro);
          }
          cursor.continue();
        } else {
          resolve(downloaded);
        }
      };
      req.onerror = () => resolve(new Set());
    });
  } catch {
    return new Set();
  }
}
