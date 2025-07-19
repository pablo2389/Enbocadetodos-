const CACHE_NAME = 'enbocadetodos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css', // Si tienes css externo, si no podés sacarlo
  'images/imagen%20body.jpg',  // recomendado URL encode espacios
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
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
