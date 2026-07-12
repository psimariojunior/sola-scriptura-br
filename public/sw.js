const CACHE_NAME = 'sola-scriptura-v2';
const STATIC_CACHE = 'sola-scriptura-static-v2';
const API_CACHE = 'sola-scriptura-api-v2';
const DATA_CACHE = 'sola-scriptura-data-v2';

const APP_SHELL = [
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
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.ico',
];

const STATIC_ASSETS_RE = /\.(css|js|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/i;
const API_RE = /\/api\//;
const BIBLE_DATA_RE = /\/api\/bible|\/api\/verses|\/api\/chapters/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== API_CACHE && key !== DATA_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Network First for API calls
  if (API_RE.test(url.pathname)) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Cache First for Bible data (rarely changes)
  if (BIBLE_DATA_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request, DATA_CACHE));
    return;
  }

  // Cache First for static assets
  if (STATIC_ASSETS_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Stale While Revalidate for navigation & pages
  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request, STATIC_CACHE));
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
    return cached || offlineFallback(request);
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

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached || offlineFallback(request));

  return cached || fetchPromise;
}

function offlineFallback(request) {
  if (request.mode === 'navigate') {
    return caches.match('/') || new Response(
      '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sola Scriptura</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0d0d0d;color:#d4a843;font-family:system-ui;text-align:center;padding:2rem}h1{font-size:1.5rem;margin-bottom:.5rem}p{color:#999;font-size:.9rem}</style></head><body><div><h1>Sola Scriptura BR</h1><p>Você está offline. Conecte-se à internet para acessar o conteúdo completo.</p></div></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  // Cache Bible data sent from the app
  if (event.data && event.data.type === 'CACHE_BIBLE_DATA') {
    const { url, data } = event.data;
    caches.open(DATA_CACHE).then((cache) => {
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      cache.put(url, response);
    });
  }
});
