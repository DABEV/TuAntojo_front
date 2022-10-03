if(navigator.serviceWorker){
    console.log("El navegador soporta el Service Worker");
    navigator.serviceWorker.register('/sw.js');
}

if (window.caches) {
    console.log("El navegador soporta cachés");
}