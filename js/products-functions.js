const BASE_URL = "https://tuantojoapi-production.up.railway.app/api/product";
var producto = 0;
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

const getAllProducts = () => {
  isNotAuth();
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  fetch(`${BASE_URL}/index`)
    .then((response) => response.json())
    .then((data) => {
      const products = data.data;

      products.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("row");
        card.classList.add("item");
        card.classList.add("mb-2");

        card.innerHTML = `
        <div class="row item mb-2 shadow bg-white rounded row-collapse">
            <div class="col-3  col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
                <img src="../images/candy3.png" class="img-fluid px-2 py-2">
            </div>
            <div class="col-7 d-flex align-items-center">
                <div>
                    <div class="fw-bold text-truncate">${element.name}</div>
                    <div class="text-truncate">Precio unitario: <b class="badge rounded-pill ta-bg-soft-blue-1">$${element.price} mx</b>
                    </div>
                </div>
            </div>
            <div class="col-2 col-lg-1 d-flex align-items-center">
                <a href="https://dabev.github.io/TuAntojo_front/porfolio/nuevoPedido.html"  class="btn btn-icon">
                    <i class='bx bx-cart-add ta-c-pink-1 fs-1'></i>
                </a>
            </div>
        </div>
        `;
        card.addEventListener("click", () => {
          console.log(element.id);
          let ta_data_static_product = localStorage.setItem("product_id", element.id);
        });
        itemList.appendChild(card);
      });
    });
};