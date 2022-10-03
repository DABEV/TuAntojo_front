const url = "";
var dataList = [
  { id: 1, nombre: "Bodega Aurrera", direccion: "Av. 17 de Abril, Azteca" },
  { id: 2, nombre: "Doña Dolores", direccion: "Calle Rosales, Las flores" },
  { id: 3, nombre: "Tres hermanos", direccion: "5 de Mayo, Santa Ursula" },
  { id: 4, nombre: "La conchita", direccion: "Av. 17 de Abril, Azteca" },
];

function getList() {
  var img =
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80";
  var itemList = document.querySelector("#itemList");
  itemList.innerHTML = "";

  for (let data of dataList) {
    itemList.innerHTML += `
        <div class="col-lg-4">
            <div class="card mb-4 col-mt-4">
                <img src="${img}" class="card-img-top" alt="...">
                <div class="card-img-overlay text-end">
                    <button class="btn btn-primary"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-warning"><i class="bi bi-pencil"></i></button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${data.nombre}</h5>
                    <p class="text-gray">${data.direccion}</p>
                </div>
            </div>
        </div>
        `;
  }
}
