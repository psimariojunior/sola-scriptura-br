const CACHE_KEY = 'ssb_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

interface CacheEntry {
  data: string[];
  timestamp: number;
}

interface CacheStore {
  [key: string]: CacheEntry;
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

function cacheKey(livro: string, capitulo: number, traducao: string): string {
  return `${traducao}:${livro}:${capitulo}`;
}

export function cacheChapter(livro: string, capitulo: number, traducao: string, verses: string[]) {
  try {
    const store: CacheStore = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    store[cacheKey(livro, capitulo, traducao)] = { data: verses, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch {}
}

export function getCachedChapter(livro: string, capitulo: number, traducao: string): string[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const store: CacheStore = JSON.parse(raw);
    const entry = store[cacheKey(livro, capitulo, traducao)];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
      delete store[cacheKey(livro, capitulo, traducao)];
      localStorage.setItem(CACHE_KEY, JSON.stringify(store));
      return null;
    }
    return entry.data;
  } catch { return null; }
}

export function clearCache() {
  try { localStorage.removeItem(CACHE_KEY); } catch {}
}
