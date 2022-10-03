const INIT_MSG = "SW:";

self.addEventListener('install', (event) => {
    console.log(INIT_MSG, "install");

    const promiseCache = caches.open('cache-v1.1').then((cache) => {
        return cache.addAll(
            [
                '/',
                '/index.html',
                '/pages/estantes.html',
                '/pages/sucursales.html',
                '/css/style.css',
                '/js/app.js',
                '/js/fillData.js',
                '/images/sucursal.png',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css'
            ]
        );
    })
    event.waitUntil(promiseCache)
})

self.addEventListener('fetch', (event) => {
    const respCache = caches.match(event.request);
    event.respondWith(respCache);
})