importScripts("https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js");
importScripts("/js/sw-db.js");

const INIT_MSG = "SW:";
const INIT_BASE = "https://dabev.github.io/TuAntojo_front/";

const STATI_CACHE_NAME = "static-cache-v1.1";
const INMUTABLE_CACHE_NAME = "inmutable-cache-v1.1";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1.1";

function cleanCache(cacheName, numberItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numberItems) {
        cache.delete(keys[0]).then(() => {
          cleanCache(cacheName, numberItems);
        });
      }
    });
  });
}

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "install");

  const promiseCache = caches.open(STATI_CACHE_NAME).then((cache) => {
    return cache.addAll([
      `/`,
      `${INIT_BASE}`,
      `${INIT_BASE}index.html`,
      `${INIT_BASE}login.html`,
      `${INIT_BASE}registro.html`,
      `${INIT_BASE}manifest.json`,
      `${INIT_BASE}css/cards.css`,
      `${INIT_BASE}css/colors.css`,
      `${INIT_BASE}css/overideBootstarp.css`,
      `${INIT_BASE}css/style.css`,
      `${INIT_BASE}porfolio/carrito.html`,
      `${INIT_BASE}porfolio/sucursales.html`,
      `${INIT_BASE}porfolio/comentarios.html`,
      `${INIT_BASE}porfolio/listaPedido.html`,
      `${INIT_BASE}porfolio/nuevoPedido.html`,
      `${INIT_BASE}porfolio/pedidosEntregados.html`,
      `${INIT_BASE}porfolio/productos.html`,
      `${INIT_BASE}porfolio/estantes.html`,
      `${INIT_BASE}porfolio/listaTiendas.html`,
      `${INIT_BASE}images/icons/store.png`,
      `${INIT_BASE}images/icons/android-launchericon-96-96.png`,
      `${INIT_BASE}images/icons/android-launchericon-144-144.png`,
      `${INIT_BASE}images/icons/android-launchericon-192-192.png`,
      `${INIT_BASE}images/icons/android-launchericon-512-512.png`,
      `${INIT_BASE}images/icons/android-launchericon-72-72.png`,
      `${INIT_BASE}images/candy1.png`,
      `${INIT_BASE}images/candy2.png`,
      `${INIT_BASE}images/candy3.png`,
      `${INIT_BASE}images/delivery.png`,
      `${INIT_BASE}images/footer.png`,
      `${INIT_BASE}images/head.png`,
      `${INIT_BASE}images/headR.png`,
      `${INIT_BASE}images/person.png`,
      `${INIT_BASE}images/candy-group.png`,
      `${INIT_BASE}images/ticket.png`,
      `${INIT_BASE}images/puesto-de-comida.png`,
      `${INIT_BASE}js/app.js`,
      `${INIT_BASE}js/auth-functions.js`,
      `${INIT_BASE}js/products-functions.js`,
      `${INIT_BASE}js/shelves-functions.js`,
      `${INIT_BASE}js/orders-functions.js`,
      `${INIT_BASE}js/stores-functions.js`,
      `${INIT_BASE}js/comments-functions.js`,
      `${INIT_BASE}js/firestore/Firestore.js`,
      `${INIT_BASE}js/firestore/Firestore-functions.js`,
      `${INIT_BASE}js/sw-db.js`,
    ]);
  });

  const promiseCacheInmutable = caches
    .open(INMUTABLE_CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        "https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&display=swap",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js",
        "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
        "https://unpkg.com/boxicons@2.1.4/fonts/boxicons.woff2",
        "https://unpkg.com/boxicons@2.1.4/fonts/boxicons.woff",
        "https://unpkg.com/boxicons@2.1.4/fonts/boxicons.eot",
        "https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js",
        "https://unpkg.com/sweetalert/dist/sweetalert.min.js",
        "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2",
      ]);
    });

  event.waitUntil(Promise.all([promiseCache, promiseCacheInmutable]));
});

self.addEventListener("install", (event) => {
  console.log(INIT_MSG, "activated");
  const prom = caches.keys().then((cachesItems) => {
    cachesItems.forEach((element) => {
      if (element != STATI_CACHE_NAME && element.includes("static")) {
        return caches.delete(element);
      }
    });
  });

  event.waitUntil(prom);
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.clone().method);
  if (event.request.clone().method === "POST") {
    const respuesta = fetch(event.request.clone())
      .then((respWeb) => {
        return respWeb;
      })
      .catch(() => {
        if (self.registration.sync) {
          return event.request.json().then((body) => {
            if (body.payment != null) {
              const respOffline = saveOrder(body);
              return respOffline;
            } else {
              return null;
            }
          });
        } else {
          //crear response que no tiene sync
          return null;
        }
      });
    event.respondWith(respuesta);
  } else if (event.request.clone().method === "PUT") {
  } else {
    const resp = fetch(event.request)
      .then((respWeb) => {
        if (!respWeb) {
          return caches.match(event.request);
        }
        caches.open(DYNAMIC_CACHE_NAME).then((chacheDynamic) => {
          chacheDynamic.put(event.request, respWeb);
          cleanCache(DYNAMIC_CACHE_NAME, 30);
        });
        return respWeb.clone();
      })
      .catch(() => {
        return caches.match(event.request);
      });
    /*const resp = caches
      .match(event.request)
      .then((respCache) => {
        if (respCache) {
          return respCache;
        }
        return fetch(event.request).then((respWeb) => {
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, respWeb);
            cleanCache(DYNAMIC_CACHE_NAME, 20);
          });
          return respWeb.clone();
        });
      })
      .catch((err) => {
        if (event.request.headers.get("accept").includes("image/png")) {
          return caches.match("images/icons/store.png");
        }
        if (event.request.headers.get("accept").includes("image/jpg")) {
          return caches.match("images/icons/store.png");
        }
        if (event.request.headers.get("accept").includes("image/webp")) {
          return caches.match("images/icons/store.png");
        }
      });*/
    event.respondWith(resp);
  }
  /*
  
  const resp = caches.match(event.request).then((respCache) => {
    if (respCache) {
      return respCache;
    }
    return fetch(event.request).then((respWeb) => {
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        cache.put(event.request, respWeb);
        cleanCache(DYNAMIC_CACHE_NAME, 10);
      });
      return respWeb.clone();
    });
  }).catch((err)=>{
    if(event.request.headers.get('accept').includes('image/png')){
      return caches.match('images/icons/store.png');
    }
    if(event.request.headers.get('accept').includes('image/jpg')){
      return caches.match('images/icons/store.png');
    }
    if(event.request.headers.get('accept').includes('image/webp')){
      return caches.match('images/icons/store.png');
    }
  });
  event.respondWith(resp);*/
});

self.addEventListener("sync", (event) => {
  console.log("sw:sync");
  if (event.tag === "new-order") {
    const resPromSync = sendPostOrders();
    event.waitUntil(resPromSync);
  }
});
