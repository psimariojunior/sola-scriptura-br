'use client';

const DB_NAME = 'sola-scriptura-offline';
const DB_VERSION = 2;

const STORES = {
  chapters: 'chapters',
  favorites: 'favorites',
  notes: 'notes',
  plans: 'plans',
  settings: 'settings',
  collections: 'collections',
  flashcards: 'flashcards',
  gamification: 'gamification',
  marcas: 'marcas',
  meta: 'meta',
  lexicon: 'lexicon',
} as const;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      Object.values(STORES).forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'key' });
        }
      });
    };
  });
}

async function getItem<T>(storeName: string, key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.data ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch { return null; }
}

async function setItem<T>(storeName: string, key: string, data: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put({ key, data, timestamp: Date.now() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) { console.error('[offline-storage:set-item]', e); }
}

async function removeItem(storeName: string, key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) { console.error('[offline-storage:remove-item]', e); }
}

async function getAllKeys(storeName: string): Promise<string[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAllKeys();
      request.onsuccess = () => resolve(request.result as string[]);
      request.onerror = () => reject(request.error);
    });
  } catch { return []; }
}

// Chapters
export async function saveChapterOffline(book: string, chapter: number, translation: string, data: unknown): Promise<void> {
  const key = `${book}:${chapter}:${translation}`;
  await setItem(STORES.chapters, key, data);
}

export async function getChapterOffline(book: string, chapter: number, translation: string): Promise<unknown | null> {
  const key = `${book}:${chapter}:${translation}`;
  return getItem(STORES.chapters, key);
}

export async function isChapterSavedOffline(book: string, chapter: number, translation: string): Promise<boolean> {
  const key = `${book}:${chapter}:${translation}`;
  const data = await getItem(STORES.chapters, key);
  return data !== null;
}

export async function getOfflineChapterCount(): Promise<number> {
  const keys = await getAllKeys(STORES.chapters);
  return keys.length;
}

export async function getCachedChaptersForBook(abreviacao: string, translation: string): Promise<Set<number>> {
  const keys = await getAllKeys(STORES.chapters);
  const prefix = `${abreviacao}:`;
  const suffix = `:${translation}`;
  const chapters = new Set<number>();
  for (const key of keys) {
    if (key.startsWith(prefix) && key.endsWith(suffix)) {
      const chapterStr = key.slice(prefix.length, key.length - suffix.length);
      const num = parseInt(chapterStr, 10);
      if (!isNaN(num)) chapters.add(num);
    }
  }
  return chapters;
}

export async function clearOfflineChapters(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.chapters, 'readwrite');
    tx.objectStore(STORES.chapters).clear();
  } catch (e) { console.error('[offline-storage:clear-chapters]', e); }
}

// Favorites
export async function saveFavoritesOffline(favorites: unknown[]): Promise<void> {
  await setItem(STORES.favorites, 'all', favorites);
}

export async function getFavoritesOffline(): Promise<unknown[]> {
  return (await getItem<unknown[]>(STORES.favorites, 'all')) || [];
}

// Notes
export async function saveNotesOffline(notes: unknown[]): Promise<void> {
  await setItem(STORES.notes, 'all', notes);
}

export async function getNotesOffline(): Promise<unknown[]> {
  return (await getItem<unknown[]>(STORES.notes, 'all')) || [];
}

// Plans
export async function savePlanProgressOffline(planId: string, progress: unknown): Promise<void> {
  await setItem(STORES.plans, planId, progress);
}

export async function getPlanProgressOffline(planId: string): Promise<unknown | null> {
  return getItem(STORES.plans, planId);
}

// Settings
export async function saveSettingOffline(key: string, value: unknown): Promise<void> {
  await setItem(STORES.settings, key, value);
}

export async function getSettingOffline<T>(key: string): Promise<T | null> {
  return getItem(STORES.settings, key);
}

// Collections
export async function saveCollectionsOffline(collections: unknown[]): Promise<void> {
  await setItem(STORES.collections, 'all', collections);
}

export async function getCollectionsOffline(): Promise<unknown[]> {
  return (await getItem<unknown[]>(STORES.collections, 'all')) || [];
}

// Flashcards
export async function saveFlashcardsOffline(flashcards: unknown[]): Promise<void> {
  await setItem(STORES.flashcards, 'all', flashcards);
}

export async function getFlashcardsOffline(): Promise<unknown[]> {
  return (await getItem<unknown[]>(STORES.flashcards, 'all')) || [];
}

// Gamification
export async function saveGamificationOffline(events: unknown[]): Promise<void> {
  await setItem(STORES.gamification, 'all', events);
}

export async function getGamificationOffline(): Promise<unknown[]> {
  return (await getItem<unknown[]>(STORES.gamification, 'all')) || [];
}

// Marcas de estudo (highlights, notes, etc.)
export async function saveMarcasOffline(marcas: unknown[]): Promise<void> {
  await setItem(STORES.marcas, 'all', marcas);
}

export async function getMarcasOffline(): Promise<unknown[]> {
  return (await getItem<unknown[]>(STORES.marcas, 'all')) || [];
}

// Check if offline
export function isOffline(): boolean {
  if (typeof navigator === 'undefined') return false;
  return !navigator.onLine;
}

// Listen for online/offline events
export function onOfflineStatusChange(callback: (offline: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => callback(false);
  const handleOffline = () => callback(true);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

// Helper to wrap IndexedDB operations
