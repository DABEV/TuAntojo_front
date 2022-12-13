if (navigator.serviceWorker) {
  navigator.serviceWorker.register("../sw.js");
}

window.addEventListener(
  "online",
  function (e) {
    swal({
        title: "Información",
        text: "Conexión restablecida, tus cambias se guradarán a la brevedad",
        icon: "info",
      });
  },
  false
);
