const CACHE_VERSION = 'v4';
const STATIC_CACHE = `ssb-static-${CACHE_VERSION}`;
const API_CACHE = `ssb-api-${CACHE_VERSION}`;
const BIBLE_CACHE = `ssb-bible-${CACHE_VERSION}`;
const PAGES_CACHE = `ssb-pages-${CACHE_VERSION}`;
const DB_NAME = 'ssb_offline';
const DB_VERSION = 2;
const STORE_CHAPTERS = 'chapters';
const STORE_META = 'meta';
const STORE_FAVORITES = 'favorites';
const STORE_NOTES = 'notes';

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
  '/favoritos',
  '/notas',
  '/colecoes',
  '/atlas',
  '/harmonia',
  '/planos',
  '/compartilhar',
  '/quiz',
  '/flashcards',
  '/devocional',
  '/comunidade',
  '/relacoes',
  '/mapas',
  '/palavras',
  '/referencias',
  '/memorizacao',
  '/desafios',
  '/comparar-comentarios',
  '/dashboard',
  '/estudo-split',
  '/galeria',
  '/status',
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
      if (!db.objectStoreNames.contains(STORE_FAVORITES)) {
        db.createObjectStore(STORE_FAVORITES, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORE_NOTES)) {
        db.createObjectStore(STORE_NOTES, { keyPath: 'key' });
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
            .filter((key) => key !== STATIC_CACHE && key !== API_CACHE && key !== BIBLE_CACHE && key !== PAGES_CACHE)
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
    event.respondWith(pageCacheFirst(request));
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

async function pageCacheFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PAGES_CACHE);
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

  if (data.type === 'STORE_FAVORITE_OFFLINE') {
    event.waitUntil(storeFavoriteOffline(data));
  }

  if (data.type === 'STORE_NOTE_OFFLINE') {
    event.waitUntil(storeNoteOffline(data));
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
  } catch {}
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(syncPendingNotes());
  }
});

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

  const url = event.notification.data?.url || '/biblia';

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
