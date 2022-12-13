const BASE_URL = "https://tuantojoapi-production.up.railway.app/api/store";
var tienda = 0;
var nombre = "";

function isNotAuth() {
  try{
      var token = localStorage.getItem("token");
      if(token != null){
      }else{
        window.location.href = "https://dabev.github.io/TuAntojo_front/login.html";
        window.localStorage.clear();
      }
  }catch(e){
      console.log(e);
  }
}

const getAllStores = () => {
  isNotAuth();
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  const id = localStorage.getItem('user');
  console.log(id);
  fetch(`${BASE_URL}/findByUser/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const shelves = data.data;

      shelves.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("row");
        card.classList.add("item");
        card.classList.add("mb-2");

        card.innerHTML = `
        <div class="row item mb-2 shadow bg-white rounded row-collapse">
            <div class="col-3  col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
            <a href="https://dabev.github.io/TuAntojo_front/porfolio/comentarios.html">
              <img src="../images/puesto-de-comida.png" class="img-fluid px-2 py-2">
            </a>
            </div>
            <div class="col-7 d-flex align-items-center">
              <div>
                  <div class="fw-bold text-truncate">${element.name}</div>
                  <div class="text-trencate">${element.ubication}</b>
                  </div>
              </div>
            </div>
            <div class="col-2 col-lg-1 d-flex align-items-center">
              <a href="https://dabev.github.io/TuAntojo_front/porfolio/productos.html">
              <i class='bx bx-cart ta-c-teal-1 fs-1'></i>
              </a>  
            </div>
             
            </div>
        </div>
    `;
        card.addEventListener("click", () => {
          console.log(element.id);
          localStorage.setItem("store_id", element.id);
          window.location.href = "https://dabev.github.io/TuAntojo_front/porfolio/comentarios.html";
        });
        itemList.appendChild(card);
      });
    });
};

const logout = () => {
  const token = localStorage.getItem("token");
  fetch(`https://tuantojoapi-production.up.railway.app/api/logout`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if(data){
      localStorage.clear();
      window.location.reload();
    }else{
      console.log("Cierre de sesión fallido");
    }
  })
}

const btnLogout = document.getElementById("btnLogout");
if(btnLogout){
  btnLogout.addEventListener("click", logout);
}

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