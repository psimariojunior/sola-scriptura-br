const VERSAO = 'sola-scriptura-v1';
const CACHE_ESTATICO = `${VERSAAO}-estatico`;
const CACHE_API = `${VERSAO}-api`;
const CACHE_ASSETS = `${VERSAAO}-assets`;

const PAGINAS_ESTATICAS = ['/', '/biblia', '/manifest.json', '/offline'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_ESTATICO)
      .then((cache) => cache.addAll(PAGINAS_ESTATICAS))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(
          chaves
            .filter((c) => !c.startsWith(VERSAO))
            .map((c) => caches.delete(c)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const requisicao = event.request;
  const url = new URL(requisicao.url);

  if (requisicao.method !== 'GET') return;

  if (url.origin === self.location.origin) {
    if (
      url.pathname.startsWith('/_next/static') ||
      /\.(?:png|jpe?g|gif|svg|webp|ico|css|js|woff2?)$/i.test(url.pathname)
    ) {
      event.respondWith(cacheFirst(requisicao, CACHE_ASSETS));
      return;
    }
  }

  if (url.pathname.includes('/api/')) {
    event.respondWith(networkFirstApi(requisicao));
    return;
  }

  if (requisicao.mode === 'navigate') {
    event.respondWith(networkFirstPages(requisicao));
    return;
  }

  event.respondWith(cacheFirst(requisicao, CACHE_ESTATICO));
});

async function cacheFirst(requisicao, cacheName) {
  const cache = await caches.open(cacheName);
  const emCache = await cache.match(requisicao);
  if (emCache) return emCache;
  try {
    const resp = await fetch(requisicao);
    if (resp && resp.ok) cache.put(requisicao, resp.clone());
    return resp;
  } catch {
    return emCache || Response.error();
  }
}

async function networkFirstPages(requisicao) {
  const cache = await caches.open(CACHE_ESTATICO);
  try {
    const resp = await fetch(requisicao);
    if (resp && resp.ok) cache.put(requisicao, resp.clone());
    return resp;
  } catch {
    const emCache = await cache.match(requisicao);
    if (emCache) return emCache;
    const offline = await cache.match('/offline');
    return offline || caches.match('/biblia') || Response.error();
  }
}

async function networkFirstApi(requisicao) {
  const cache = await caches.open(CACHE_API);
  try {
    const resp = await fetch(requisicao);
    if (resp && resp.ok && requisicao.url.includes('/biblia/')) {
      cache.put(requisicao, resp.clone());
    }
    return resp;
  } catch {
    const emCache = await cache.match(requisicao);
    if (emCache) return emCache;
    return new Response(
      JSON.stringify({ mensagem: 'Você está offline.' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
