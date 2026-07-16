// Service Worker desativado - causava conflitos de cache
// Auto-desregistra e limpa todos os caches
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim().catch(() => {}))
      .then(() => self.registration.unregister())
  );
});
