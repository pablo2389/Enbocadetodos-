const CACHE_NAME = 'enbocadetodos-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'images/imagen body.jpg',
  'images/chesseburguer.jpg',
  'images/cono-papas.jpg',
  'images/fugazzeta.jpg',
  'images/Hamburgesamediana-guarnicion.jpg',
  'images/hamburguesacompleta.jpg',
  'images/panchoconponcho.jpg',
  'images/panchoslluviapapas.jpg',
  'images/papas-chicas.jpg',
  'images/papasacaballo.jpg',
  'images/papasgrandes.jpg',
  'images/pizza-especial.jpg',
  'images/favicon-32x32.png',
  'images/favicon-192x192.png'
  // Agrega aquí otros archivos CSS, JS o imágenes que uses
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devuelve archivo cacheado
        }
        return fetch(event.request); // Si no está en cache, lo descarga normal
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
