const CACHE_VERSION = 'v3';
const STATIC_CACHE = `sola-scriptura-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `sola-scriptura-dynamic-${CACHE_VERSION}`;
const API_CACHE = `sola-scriptura-api-${CACHE_VERSION}`;
const DATA_CACHE = `sola-scriptura-data-${CACHE_VERSION}`;
const IMAGE_CACHE = `sola-scriptura-images-${CACHE_VERSION}`;
const FONT_CACHE = `sola-scriptura-fonts-${CACHE_VERSION}`;

const ALL_CACHES = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE, DATA_CACHE, IMAGE_CACHE, FONT_CACHE];

const APP_SHELL = [
  '/',
  '/offline.html',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.ico',
];

const PRECACHE_ROUTES = [
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
  '/devocional',
];

const STATIC_ASSETS_RE = /\.(css|js|woff2?|ttf|eot|ico)$/i;
const IMAGE_RE = /\.(png|jpg|jpeg|gif|webp|svg|avif)$/i;
const FONT_RE = /\.(woff2?|ttf|eot)$/i;
const API_RE = /\/api\//;
const BIBLE_DATA_RE = /\/api\/(bible|verses|chapters|lexicon|cross-refs)/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(APP_SHELL).catch((err) => {
          console.warn('SW: Some app shell assets failed to cache:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => !ALL_CACHES.includes(key))
            .map((key) => {
              console.log('SW: Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .then(() => {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ type: 'SW_ACTIVATED', version: CACHE_VERSION });
          });
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  if (API_RE.test(url.pathname)) {
    if (BIBLE_DATA_RE.test(url.pathname)) {
      event.respondWith(cacheFirst(request, DATA_CACHE));
    } else {
      event.respondWith(networkFirst(request, API_CACHE));
    }
    return;
  }

  if (IMAGE_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  if (FONT_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  if (STATIC_ASSETS_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

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
    return offlineFallback(request);
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
    return offlineFallback(request);
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => {
      return cached || offlineFallback(request);
    });

  if (cached) {
    fetchPromise.catch(() => {});
    return cached;
  }

  return fetchPromise;
}

async function cacheOnly(request) {
  const cached = await caches.match(request);
  return cached || offlineFallback(request);
}

function offlineFallback(request) {
  if (request.mode === 'navigate') {
    return caches.match('/offline.html').then((offlinePage) => {
      if (offlinePage) return offlinePage;
      return new Response(offlineHTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    });
  }

  return new Response(JSON.stringify({ error: 'Offline', message: 'Você está offline.' }), {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'application/json' },
  });
}

const offlineHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Offline - Sola Scriptura</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0a;color:#d4a843;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem}
    .container{text-align:center;max-width:480px}
    .icon{font-size:4rem;margin-bottom:1.5rem;animation:pulse 3s ease-in-out infinite}
    h1{font-size:1.8rem;margin-bottom:0.75rem;font-weight:300;letter-spacing:-0.02em}
    .verse{font-family:Georgia,serif;font-style:italic;color:#999;font-size:0.95rem;line-height:1.6;margin:1.5rem 0;padding:1.25rem;border-left:2px solid #d4a843;text-align:left}
    .features{margin:2rem 0;text-align:left}
    .features h3{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:#666;margin-bottom:0.75rem}
    .features ul{list-style:none;padding:0}
    .features li{padding:0.5rem 0;color:#888;font-size:0.85rem;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:0.5rem}
    .features li::before{content:"✓";color:#d4a843;font-weight:bold}
    .retry-btn{display:inline-flex;align-items:center;gap:0.5rem;margin-top:1.5rem;padding:0.75rem 2rem;background:#d4a843;color:#0a0a0a;border:none;border-radius:8px;font-size:0.9rem;font-weight:600;cursor:pointer;transition:all 0.3s}
    .retry-btn:hover{background:#c49938;transform:translateY(-1px)}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">📖</div>
    <h1>Você está offline</h1>
    <div class="verse">
      "A Palavra do Senhor permanece para sempre." — 1 Pedro 1:25
    </div>
    <div class="features">
      <h3>Disponível offline</h3>
      <ul>
        <li>Versículos salvos para leitura</li>
        <li>Anotações pessoais</li>
        <li>Favoritos e marcadores</li>
        <li>Estudos baixados</li>
      </ul>
    </div>
    <button class="retry-btn" onclick="window.location.reload()">
      Tentar novamente
    </button>
  </div>
</body>
</html>`;

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_BIBLE_DATA') {
    const { url, data } = event.data;
    caches.open(DATA_CACHE).then((cache) => {
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      cache.put(url, response);
    });
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const { urls } = event.data;
    caches.open(DYNAMIC_CACHE).then((cache) => {
      return Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((response) => {
              if (response.ok) return cache.put(url, response);
            })
            .catch(() => {})
        )
      );
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      });
    });
  }
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Sola Scriptura';
  const options = {
    body: data.body || 'Hora de estudar a Palavra!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: data.url || '/',
    actions: [
      { action: 'open', title: 'Abrir', icon: '/icon-192.png' },
      { action: 'dismiss', title: 'Dispensar' },
    ],
    tag: 'reading-reminder',
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-studies') {
    event.waitUntil(syncSavedStudies());
  }
});

async function syncSavedStudies() {
  try {
    const db = await openDB();
    const tx = db.transaction('pending-sync', 'readonly');
    const store = tx.objectStore('pending-sync');
    const request = store.getAll();

    request.onsuccess = async () => {
      const pending = request.result;
      for (const item of pending) {
        try {
          await fetch('/api/studies/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          const deleteTx = db.transaction('pending-sync', 'readwrite');
          deleteTx.objectStore('pending-sync').delete(item.id);
        } catch {
          break;
        }
      }
    };
  } catch {
    // IndexedDB not available
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('sola-scriptura-sync', 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('pending-sync')) {
        db.createObjectStore('pending-sync', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
