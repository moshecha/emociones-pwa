const CACHE_NAME = "emociones-cache-v1";

const urlsToCache = [

  "/index.html",

  "/manifest.json",

  "/icon-192.png",

  "/icon-512.png",

  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",

  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"

];

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))

  );

  self.skipWaiting(); // Fuerza que este SW tome control inmediatamente

});

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.filter(key => key !== CACHE_NAME)

            .map(key => caches.delete(key))

      );

    })

  );

  self.clients.claim(); // Asegura que todas las pestañas usen la nueva versión

});

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then(response => {

      return response || fetch(event.request);

    })

  );

});