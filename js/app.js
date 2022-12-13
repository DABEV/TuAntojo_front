if (navigator.serviceWorker) {
  navigator.serviceWorker.register("../sw.js");
}

navigator.serviceWorker.addEventListener('controllerchange', function() {
  window.location.reload(true);
});

window.addEventListener(
  "online",
  function (e) {
    swal({
        title: "Información",
        text: "Conexión restablecida, tus cambios se guradarán a la brevedad",
        icon: "info",
      });
  },
  false
);
