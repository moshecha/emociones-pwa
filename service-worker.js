const CACHE_NAME = "emociones-cache-v2";

const urlsToCache = [

  "./index.html",

  "./manifest.json",

  "./icon-192.png",

  "./icon-512.png",

  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",

  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"

];


self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(async cache => {

      for(const url of urlsToCache){

        try{

          await cache.add(url);

        } catch(err){

          console.warn("No se pudo cachear:", url, err);

        }

      }

    })

  );

  self.skipWaiting();

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