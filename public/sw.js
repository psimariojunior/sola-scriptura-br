const CACHE_VERSION = 'v14';
const STATIC_CACHE = `ssb-static-${CACHE_VERSION}`;
const API_CACHE = `ssb-api-${CACHE_VERSION}`;
const BIBLE_CACHE = `ssb-bible-${CACHE_VERSION}`;
const PAGES_CACHE = `ssb-pages-${CACHE_VERSION}`;
const VISITED_PAGES_CACHE = `ssb-visited-pages-${CACHE_VERSION}`;
const STUDIES_CACHE = `ssb-studies-${CACHE_VERSION}`;
const DATA_CACHE = `ssb-data-${CACHE_VERSION}`;
const LEXICON_CACHE = `ssb-lexicon-${CACHE_VERSION}`;
const OFFLINE_QUEUE = 'ssb-offline-queue';
const API_TTL = 5 * 60 * 1000;

const CACHE_LIMITS = {
  [PAGES_CACHE]: { maxEntries: 50 },
  [STUDIES_CACHE]: { maxBytes: 20 * 1024 * 1024 },
  [BIBLE_CACHE]: { maxBytes: 50 * 1024 * 1024 },
  [LEXICON_CACHE]: { maxBytes: 10 * 1024 * 1024 },
  [API_CACHE]: { maxEntries: 100 },
};
const DB_NAME = 'sola-scriptura-offline';
const DB_VERSION = 2;
const STORE_CHAPTERS = 'chapters';
const STORE_META = 'meta';
const STORE_FAVORITES = 'favorites';
const STORE_NOTES = 'notes';
const STORE_LEXICON = 'lexicon';
const STORE_PLANS = 'plans';
const STORE_SETTINGS = 'settings';
const STORE_COLLECTIONS = 'collections';
const STORE_FLASHCARDS = 'flashcards';
const STORE_GAMIFICATION = 'gamification';
const STORE_MARCAS = 'marcas';

// Precache completo: todas as paginas essenciais
const PRECACHE_URLS = [
  '/',
  '/biblia',
  '/pesquisa',
  '/idiomas',
  '/palavras',
  '/teologia',
  '/historia',
  '/ia',
  '/estudos',
  '/exegese',
  '/personagens',
  '/cronologia',
  '/atlas',
  '/referencias',
  '/harmonia',
  '/favoritos',
  '/notas',
  '/colecoes',
  '/planos',
  '/devocional',
  '/flashcards',
  '/memorizacao',
  '/quiz',
  '/comparar',
  '/comparar-comentarios',
  '/parabolas',
  '/milagres',
  '/topicos',
  '/estatisticas',
  '/imersao',
  '/sermon-builder',
  '/relatorio-exegese',
  '/textos-extrabiblicos',
  '/mapa-ocorrencias',
  '/explorador',
  '/relacoes',
  '/word-study',
  '/cursos',
  '/cursos/joao',
  '/cursos/romanos',
  '/seminario',
  '/comunidade',
  '/desafios',
  '/dashboard',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
];

async function limitCacheEntries(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const toDelete = keys.length - maxEntries;
  for (let i = 0; i < toDelete; i++) {
    await cache.delete(keys[i]);
  }
}

async function limitCacheSize(cacheName, maxBytes) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  let totalSize = 0;
  const entries = [];
  for (const req of keys) {
    const res = await cache.match(req);
    if (res) {
      const blob = await res.blob();
      const size = blob.size;
      totalSize += size;
      entries.push({ req, size });
    }
  }
  if (totalSize <= maxBytes) return;
  entries.sort((a, b) => a.size - b.size);
  for (const entry of entries) {
    if (totalSize <= maxBytes) break;
    await cache.delete(entry.req);
    totalSize -= entry.size;
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      const allStores = [
        STORE_CHAPTERS, STORE_META, STORE_FAVORITES, STORE_NOTES,
        STORE_LEXICON, STORE_PLANS, STORE_SETTINGS, STORE_COLLECTIONS,
        STORE_FLASHCARDS, STORE_GAMIFICATION, STORE_MARCAS, OFFLINE_QUEUE,
      ];
      for (const store of allStores) {
        if (!db.objectStoreNames.contains(store)) {
          if (store === OFFLINE_QUEUE) {
            db.createObjectStore(store, { keyPath: 'key' });
          } else {
            db.createObjectStore(store, { keyPath: 'key' });
          }
        }
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      for (const url of PRECACHE_URLS) {
        try {
          await cache.add(url);
        } catch (e) {
          console.warn('[SW] Failed to precache:', url, e);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) =>
              key !== STATIC_CACHE &&
              key !== API_CACHE &&
              key !== BIBLE_CACHE &&
              key !== PAGES_CACHE &&
              key !== VISITED_PAGES_CACHE &&
              key !== STUDIES_CACHE &&
              key !== DATA_CACHE &&
              key !== LEXICON_CACHE
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(async () => {
        const limits = Object.entries(CACHE_LIMITS);
        for (const [cacheName, limit] of limits) {
          if (limit.maxEntries) {
            await limitCacheEntries(cacheName, limit.maxEntries);
          }
          if (limit.maxBytes) {
            await limitCacheSize(cacheName, limit.maxBytes);
          }
        }
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(apiWithTTL(request));
    return;
  }

  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname.startsWith('/_next/static/')
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (url.pathname.startsWith('/api/v1/biblia') || url.pathname.includes('/texto/')) {
    event.respondWith(cacheBibleChapter(request));
    return;
  }

  if (
    url.pathname.includes('/lexicon') ||
    url.pathname.includes('/hebraico') ||
    url.pathname.includes('/grego')
  ) {
    event.respondWith(cacheFirst(request, LEXICON_CACHE));
    return;
  }

  if (
    url.pathname.includes('/estudos') ||
    url.pathname.includes('/comentarios') ||
    url.pathname.includes('/crossRef') ||
    url.pathname.includes('/estudosGerados') ||
    url.pathname.includes('/estudosTeologicos')
  ) {
    event.respondWith(cacheFirst(request, STUDIES_CACHE));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(pageCacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
});

async function pageCacheFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PAGES_CACHE);
      cache.put(request, response.clone());

      const visitedCache = await caches.open(VISITED_PAGES_CACHE);
      visitedCache.put(response.url, response.clone());

      const keys = await visitedCache.keys();
      if (keys.length > 50) {
        await visitedCache.delete(keys[0]);
      }
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match('/offline.html');
    return offline || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/html' } });
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return cached || new Response('Offline', { status: 503 });
  }
}

async function cacheBibleChapter(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(BIBLE_CACHE);
      cache.put(request, response.clone());
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      const livro = pathParts[pathParts.length - 2];
      const cap = pathParts[pathParts.length - 1];
      if (livro && cap) {
        try {
          const data = await response.clone().json();
          const verses = data?.data?.verses || data?.verses || [];
          if (verses.length > 0) {
            const db = await openDB();
            const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
            tx.objectStore(STORE_CHAPTERS).put({
              key: `auto:${livro}:${cap}`,
              livro,
              capitulo: Number(cap),
              traducao: 'auto',
              verses,
              timestamp: Date.now(),
            });
            await new Promise((resolve, reject) => {
              tx.oncomplete = () => resolve();
              tx.onerror = () => reject(tx.error);
            });
            db.close();
          }
        } catch {}
      }
    }
    return response;
  } catch {
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function apiWithTTL(request) {
  const cache = await caches.open(API_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    const dateHeader = cached.headers.get('sw-cached-at');
    if (dateHeader) {
      const cachedAt = Number(dateHeader);
      if (Date.now() - cachedAt < API_TTL) {
        return cached;
      }
    }
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      const headers = new Headers(response.headers);
      headers.set('sw-cached-at', String(Date.now()));
      const timedResponse = new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      cache.put(request, timedResponse.clone());
    }
    return response;
  } catch {
    if (cached) return cached;
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function queueOfflineAction(action) {
  const db = await openDB();
  const tx = db.transaction(OFFLINE_QUEUE, 'readwrite');
  const store = tx.objectStore(OFFLINE_QUEUE);
  store.put({
    key: `action-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...action,
    timestamp: Date.now(),
    synced: false,
  });
  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function processOfflineQueue() {
  const db = await openDB();
  const tx = db.transaction(OFFLINE_QUEUE, 'readonly');
  const store = tx.objectStore(OFFLINE_QUEUE);
  const all = await new Promise((resolve) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => resolve([]);
  });
  db.close();

  const unsynced = all.filter((item) => !item.synced);
  if (!unsynced.length) return;

  const grouped = {};
  for (const item of unsynced) {
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type].push(item);
  }

  for (const [type, items] of Object.entries(grouped)) {
    const endpoint = type === 'favorite' ? '/api/v1/favoritos' :
                     type === 'note' ? '/api/v1/notas' :
                     type === 'collection' ? '/api/v1/colecoes' : null;
    if (!endpoint) continue;

    for (const item of items) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.payload),
        });
        const db2 = await openDB();
        const tx2 = db2.transaction(OFFLINE_QUEUE, 'readwrite');
        tx2.objectStore(OFFLINE_QUEUE).put({ ...item, synced: true });
        await new Promise((r) => { tx2.oncomplete = () => r(); });
        db2.close();
      } catch {
        break;
      }
    }
  }

  const clients = await self.clients.matchAll();
  for (const client of clients) {
    client.postMessage({ type: 'SYNC_COMPLETE' });
  }
}

self.addEventListener('message', (event) => {
  const { data } = event;
  if (!data) return;

  const message = typeof data === 'string' ? data : data.type;

  if (message === 'CACHE_TRANSLATION') {
    event.waitUntil(cacheTranslationFromClient(data));
  }

  if (message === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }

  if (message === 'SYNC_NOTES') {
    event.waitUntil(syncPendingNotes());
  }

  if (message === 'STORE_FAVORITE_OFFLINE') {
    event.waitUntil(storeFavoriteOffline(data));
  }

  if (message === 'STORE_NOTE_OFFLINE') {
    event.waitUntil(storeNoteOffline(data));
  }

  if (message === 'QUEUE_OFFLINE_ACTION') {
    event.waitUntil(queueOfflineAction(data.action));
  }

  if (message === 'PROCESS_OFFLINE_QUEUE') {
    event.waitUntil(processOfflineQueue());
  }

  if (message === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (message === 'DOWNLOAD_BIBLE_CHAPTER') {
    event.waitUntil(downloadBibleChapter(data));
  }

  if (message === 'GET_OFFLINE_STATS') {
    event.waitUntil(getOfflineStats(event));
  }

  if (message === 'GET_RECENT_CHAPTERS') {
    event.waitUntil(getRecentChapters(event));
  }

  if (message === 'PRELOAD_STUDIES') {
    event.waitUntil(preloadStudies(data));
  }

  if (message === 'PRELOAD_LEXICON') {
    event.waitUntil(preloadLexicon(data));
  }

  if (message === 'SCHEDULE_NOTIFICATION') {
    const notif = data.notification;
    if (notif && self.registration) {
      self.registration.showNotification(notif.title || 'Sola Scriptura', {
        body: notif.body || '',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: notif.tag || 'ssb-scheduled',
        data: { url: notif.url || '/biblia' },
        actions: [
          { action: 'open-bible', title: 'Abrir Bíblia' },
          { action: 'dismiss', title: 'Dispensar' },
        ],
        vibrate: [200, 100, 200],
      });
    }
  }

  if (message === 'CLIENTS_READY') {
    const clients = self.clients.matchAll();
    clients.then((all) => {
      for (const client of all) {
        client.postMessage({ type: 'UPDATE_AVAILABLE' });
      }
    });
  }
});

async function cacheTranslationFromClient(data) {
  const { chapters } = data;
  if (!chapters || !Array.isArray(chapters)) return;

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
    const store = tx.objectStore(STORE_CHAPTERS);
    for (const ch of chapters) {
      store.put({
        key: `${ch.traducao}:${ch.livro}:${ch.capitulo}`,
        livro: ch.livro,
        capitulo: ch.capitulo,
        traducao: ch.traducao,
        verses: ch.verses,
        timestamp: Date.now(),
      });
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch {}
}

async function downloadBibleChapter(data) {
  const { livro, capitulo, traducao, verses } = data;
  if (!livro || !capitulo || !traducao || !verses) return;

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
    tx.objectStore(STORE_CHAPTERS).put({
      key: `${traducao}:${livro}:${capitulo}`,
      livro,
      capitulo,
      traducao,
      verses,
      timestamp: Date.now(),
    });
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {}
}

async function getOfflineStats(event) {
  try {
    const db = await openDB();
    const count = await new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const req = tx.objectStore(STORE_CHAPTERS).count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(0);
    });
    db.close();
    const client = event.source;
    if (client) {
      client.postMessage({ type: 'OFFLINE_STATS', chaptersCount: count });
    }
  } catch {}
}

async function getRecentChapters(event) {
  try {
    const db = await openDB();
    const chapters = await new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.getAll();
      req.onsuccess = () => {
        const all = req.result || [];
        all.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        resolve(all.slice(0, 10));
      };
      req.onerror = () => resolve([]);
    });
    db.close();
    const client = event.source;
    if (client) {
      client.postMessage({ type: 'RECENT_CHAPTERS', chapters });
    }
  } catch {}
}

async function preloadStudies(data) {
  const { urls } = data;
  if (!urls || !Array.isArray(urls)) return;

  try {
    const cache = await caches.open(STUDIES_CACHE);
    const results = [];
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
          results.push({ url, ok: true });
        } else {
          results.push({ url, ok: false, status: response.status });
        }
      } catch (e) {
        results.push({ url, ok: false, error: e.message });
      }
    }
    const client = event.source;
    if (client) {
      client.postMessage({ type: 'PRELOAD_STUDIES_DONE', results });
    }
  } catch {}
}

async function preloadLexicon(data) {
  const { language } = data;
  const urls = language === 'hebrew'
    ? ['/data/lexicon/hebraico.js']
    : language === 'greek'
    ? ['/data/lexicon/grego.js']
    : ['/data/lexicon/hebraico.js', '/data/lexicon/grego.js'];

  try {
    const cache = await caches.open(LEXICON_CACHE);
    const results = [];
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
          results.push({ url, ok: true });
        } else {
          results.push({ url, ok: false, status: response.status });
        }
      } catch (e) {
        results.push({ url, ok: false, error: e.message });
      }
    }

    const db = await openDB();
    const tx = db.transaction(STORE_LEXICON, 'readwrite');
    const store = tx.objectStore(STORE_LEXICON);
    store.put({
      key: `lexicon:${language || 'all'}`,
      data: results,
      timestamp: Date.now(),
    });

    const client = event.source;
    if (client) {
      client.postMessage({ type: 'PRELOAD_LEXICON_DONE', results });
    }
  } catch {}
}

async function syncPendingNotes() {
  try {
    const db = await openDB();
    const notes = await new Promise((resolve) => {
      const tx = db.transaction(STORE_META, 'readonly');
      const req = tx.objectStore(STORE_META).get('pendingNotes');
      req.onsuccess = () => resolve(req.result?.value || []);
      req.onerror = () => resolve([]);
    });

    if (!notes.length) return;

    for (const note of notes) {
      try {
        await fetch('/api/v1/notas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });
      } catch {}
    }

    const clearTx = db.transaction(STORE_META, 'readwrite');
    clearTx.objectStore(STORE_META).delete('pendingNotes');
    await new Promise((resolve, reject) => {
      clearTx.oncomplete = () => resolve();
      clearTx.onerror = () => reject(clearTx.error);
    });

    db.close();

    const clients = await self.clients.matchAll();
    for (const client of clients) {
      client.postMessage({ type: 'NOTES_SYNCED' });
    }
  } catch {}
}

async function storeFavoriteOffline(data) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_FAVORITES, 'readwrite');
    tx.objectStore(STORE_FAVORITES).put({
      key: `${data.traducao}:${data.livro}:${data.capitulo}:${data.versiculo}`,
      ...data,
      timestamp: Date.now(),
      synced: false,
    });
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();

    await queueOfflineAction({
      type: 'favorite',
      payload: data,
    });

    if ('sync' in self.registration) {
      await self.registration.sync.register('sync-offline-queue');
    }
  } catch {}
}

async function storeNoteOffline(data) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NOTES, 'readwrite');
    tx.objectStore(STORE_NOTES).put({
      key: `${data.traducao}:${data.livro}:${data.capitulo}:${data.versiculo}`,
      ...data,
      timestamp: Date.now(),
      synced: false,
    });
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();

    await queueOfflineAction({
      type: 'note',
      payload: data,
    });

    if ('sync' in self.registration) {
      await self.registration.sync.register('sync-offline-queue');
    }
  } catch {}
}

async function syncAllData() {
  const db = await openDB();

  try {
    const pendingFavorites = await new Promise((resolve) => {
      const tx = db.transaction(STORE_META, 'readonly');
      const req = tx.objectStore(STORE_META).get('pendingFavorites');
      req.onsuccess = () => resolve(req.result?.value || []);
      req.onerror = () => resolve([]);
    });

    for (const fav of pendingFavorites) {
      try {
        await fetch('/api/v1/favoritos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fav),
        });
      } catch {}
    }

    if (pendingFavorites.length) {
      const clearTx = db.transaction(STORE_META, 'readwrite');
      clearTx.objectStore(STORE_META).delete('pendingFavorites');
      await new Promise((resolve, reject) => {
        clearTx.oncomplete = () => resolve();
        clearTx.onerror = () => reject(clearTx.error);
      });
    }
  } catch {}

  try {
    const pendingNotes = await new Promise((resolve) => {
      const tx = db.transaction(STORE_META, 'readonly');
      const req = tx.objectStore(STORE_META).get('pendingNotes');
      req.onsuccess = () => resolve(req.result?.value || []);
      req.onerror = () => resolve([]);
    });

    for (const note of pendingNotes) {
      try {
        await fetch('/api/v1/notas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });
      } catch {}
    }

    if (pendingNotes.length) {
      const clearTx = db.transaction(STORE_META, 'readwrite');
      clearTx.objectStore(STORE_META).delete('pendingNotes');
      await new Promise((resolve, reject) => {
        clearTx.oncomplete = () => resolve();
        clearTx.onerror = () => reject(clearTx.error);
      });
    }
  } catch {}

  try {
    const pendingChapters = await new Promise((resolve) => {
      const tx = db.transaction(STORE_META, 'readonly');
      const req = tx.objectStore(STORE_META).get('pendingChapters');
      req.onsuccess = () => resolve(req.result?.value || []);
      req.onerror = () => resolve([]);
    });

    for (const ch of pendingChapters) {
      try {
        await fetch('/api/v1/biblia/capitulos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ch),
        });
      } catch {}
    }

    if (pendingChapters.length) {
      const clearTx = db.transaction(STORE_META, 'readwrite');
      clearTx.objectStore(STORE_META).delete('pendingChapters');
      await new Promise((resolve, reject) => {
        clearTx.oncomplete = () => resolve();
        clearTx.onerror = () => reject(clearTx.error);
      });
    }
  } catch {}

  db.close();

  const clients = await self.clients.matchAll();
  for (const client of clients) {
    client.postMessage({ type: 'SYNC_COMPLETE' });
  }
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(syncPendingNotes());
  }
  if (event.tag === 'sync-all-data') {
    event.waitUntil(syncAllData());
  }
  if (event.tag === 'sync-chapters') {
    event.waitUntil(syncDownloadedChapters());
  }
  if (event.tag === 'sync-offline-queue') {
    event.waitUntil(processOfflineQueue());
  }
});

async function syncDownloadedChapters() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_CHAPTERS, 'readonly');
    const store = tx.objectStore(STORE_CHAPTERS);
    const req = store.openCursor();
    const staleKeys = [];

    await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const age = Date.now() - (cursor.value.timestamp || 0);
          if (age > 7 * 24 * 60 * 60 * 1000) {
            staleKeys.push(cursor.value.key);
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });

    db.close();

    for (const key of staleKeys.slice(0, 5)) {
      const [, livro, cap] = key.split(':');
      try {
        const res = await fetch(`/api/v1/biblia/versos/${livro}/${cap}`);
        if (res.ok) {
          const data = await res.json();
          const verses = data?.data?.verses || data?.verses || [];
          if (verses.length > 0) {
            const db2 = await openDB();
            const tx2 = db2.transaction(STORE_CHAPTERS, 'readwrite');
            tx2.objectStore(STORE_CHAPTERS).put({
              key,
              livro,
              capitulo: Number(cap),
              traducao: key.split(':')[0],
              verses,
              timestamp: Date.now(),
            });
            await new Promise((r) => { tx2.oncomplete = () => r(); });
            db2.close();
          }
        }
      } catch {}
    }
  } catch {}
}

const DAILY_VERSES = [
  { ref: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { ref: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
  { ref: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: 'Romanos 8:28', text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.' },
  { ref: 'Jeremias 29:11', text: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' },
  { ref: 'Isaías 40:31', text: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias.' },
  { ref: 'Provérbios 3:5-6', text: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { ref: 'Mateus 11:28', text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { ref: '2 Timóteo 1:7', text: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.' },
  { ref: 'Hebreus 11:1', text: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Efésios 2:8-9', text: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { ref: 'Salmos 91:1', text: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { ref: 'Josué 1:9', text: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
  { ref: 'Salmos 119:105', text: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
  { ref: 'Mateus 6:33', text: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
];

function getSWRandomVerse() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

self.addEventListener('push', (event) => {
  let payload;
  if (event.data) {
    try {
      payload = event.data.json();
    } catch {
      payload = { title: 'Sola Scriptura', body: event.data.text() };
    }
  } else {
    const verse = getSWRandomVerse();
    payload = {
      title: `📖 ${verse.ref}`,
      body: verse.text,
      data: { url: '/biblia' },
    };
  }

  if (payload.type === 'plan-reminder') {
    event.waitUntil(
      self.registration.showNotification(payload.title || 'Plano de Leitura', {
        body: payload.body || 'Você está atrasado no seu plano de leitura.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'plan-reminder',
        data: { url: payload.url || '/planos' },
        actions: [
          { action: 'open-plan', title: 'Abrir Plano' },
          { action: 'dismiss', title: 'Dispensar' },
        ],
        vibrate: [200, 100, 200],
      })
    );
    return;
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || 'Sola Scriptura', {
      body: payload.body || 'Nova notificação',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: payload.tag || 'ssb-push',
      data: payload.data || { url: '/biblia' },
      actions: [
        { action: 'open-bible', title: 'Abrir Bíblia' },
        { action: 'dismiss', title: 'Dispensar' },
      ],
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  if (action === 'dismiss') return;

  let url = event.notification.data?.url || '/biblia';
  if (action === 'open-plan') {
    url = '/planos';
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_CLICKED', url });
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});

self.addEventListener('widget', (event) => {
  if (event.tag === 'ssb-daily-verse') {
    event.waitUntil(
      (async () => {
        try {
          const cache = await caches.open(BIBLE_CACHE);
          const cachedResponse = await cache.match('/api/v1/biblia/versiculo-do-dia');
          if (cachedResponse) {
            const data = await cachedResponse.json();
            return new Response(JSON.stringify(data), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        } catch {}

        const verse = getSWRandomVerse();
        return new Response(
          JSON.stringify({
            tag: 'ssb-daily-verse',
            title: verse.ref,
            description: verse.text,
            url: '/biblia',
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })()
    );
  }
});
