const CACHE_VERSION = 'v3';
const STATIC_CACHE = `ssb-static-${CACHE_VERSION}`;
const API_CACHE = `ssb-api-${CACHE_VERSION}`;
const BIBLE_CACHE = `ssb-bible-${CACHE_VERSION}`;
const DB_NAME = 'ssb_offline';
const DB_VERSION = 1;
const STORE_CHAPTERS = 'chapters';
const STORE_META = 'meta';

const PRECACHE_URLS = [
  '/',
  '/biblia',
  '/pesquisa',
  '/idiomas',
  '/exegese',
  '/teologia',
  '/historia',
  '/personagens',
  '/cronologia',
  '/ia',
  '/estudos',
  '/ferramentas',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
];

function openDB() {
  return new Promise((resolve, reject) => {
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
            .filter((key) => key !== STATIC_CACHE && key !== API_CACHE && key !== BIBLE_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE));
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
    event.respondWith(cacheFirst(request, BIBLE_CACHE));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(navigationFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
});

async function navigationFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
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

self.addEventListener('message', (event) => {
  const { data } = event;
  if (!data) return;

  if (data.type === 'CACHE_TRANSLATION') {
    event.waitUntil(cacheTranslationFromClient(data));
  }

  if (data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }

  if (data.type === 'SYNC_NOTES') {
    event.waitUntil(syncPendingNotes());
  }

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
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

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(syncPendingNotes());
  }
});

self.addEventListener('push', (event) => {
  if (!event.data) return;
  const payload = event.data.json();
  event.waitUntil(
    self.registration.showNotification(payload.title || 'Sola Scriptura', {
      body: payload.body || 'Nova notificacao',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: payload.data,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
