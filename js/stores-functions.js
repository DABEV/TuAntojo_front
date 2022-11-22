const BASE_URL = "http://localhost:8000/api/store";
var tienda = 0;
var nombre = "";

const getAllStores = () => {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  fetch(`${BASE_URL}/index`)
    .then((response) => response.json())
    .then((data) => {
      const shelves = data.data;

      shelves.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("row");
        card.classList.add("item");
        card.classList.add("mb-2");

        card.innerHTML = `
        <div class="row item mb-2">
            <div class="col-3  col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
            <a href="http://localhost:8080/porfolio/comentarios.html">
              <img src="../images/puesto-de-comida.png" class="img-fluid px-2 py-2">
            </a>
            </div>
            <div class="col d-flex align-items-center">
            <div>
                <div class="fw-bold">${element.name}</div>
                <div>${element.ubication}</b>
                </div>
            </div>

            </div>
            <div class="col-2 col-lg-1 d-flex align-items-center">
              <a href="http://localhost:8080/porfolio/productos.html">
              <i class='bx bx-cart ta-c-teal-1 fs-1'></i>
              </a>  
            </div>
             
            </div>
        </div>
    `;
        card.addEventListener("click", () => {
          console.log(element.id);
          let ta_data_static_store = localStorage.setItem("store_id", element.id);
        });
        itemList.appendChild(card);
      });
    });
};

/*

const getAllStores = () => {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  fetch(`${BASE_URL}/index`)
    .then((response) => response.json())
    .then((data) => {
      const stores = data.data;
      stores.forEach((element) => {
        console.log(element);
        const card = document.createElement("div");
        card.classList.add("col-6");
        card.classList.add("col-md-4");
        card.classList.add("col-lg-3");
        card.classList.add("item");
        card.innerHTML = `
          <div class="item-icon">
            <img src="../images/icons/store.png" class="img-fluid px-5 py-3" alt="">
          </div>
          <div class="px-2 py-2">
            <div class="row">
              <div class="col-1 d-flex align-items-center">
                <i class="bx bxs-package ta-c-warn"></i>
              </div>
              <div class="col d-flex align-items-center">
                <span class="fw-bold text-dark card-locale_title">${element.name}</span>
              </div>
            </div>
            <span class="card-locale_content">${element.ubication}</span>
          </div>
        `;
        card.addEventListener("click", () => {
          console.log(element.id);
        });
        itemList.appendChild(card);
      });
    });
};
*/