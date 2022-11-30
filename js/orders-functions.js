const BASE_URL = "http://localhost:8000/api/order";
var precioProducto =0;
function isNotAuth() {
  try{
      var token = localStorage.getItem("token");
      if(token != null){
      }else{
        window.location.href = "http://localhost:8080/login.html";
        window.localStorage.clear();
      }
  }catch(e){
      console.log(e);
  }
}

const getOrdersPendings = () => {

  isNotAuth();

  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  const id = localStorage.getItem('user');
  fetch(`${BASE_URL}/findByUserId/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const orders = data.data;
      var estado =""
      orders.forEach((element) => {
        if (element.status == 0){
          const card = document.createElement("div");
          card.classList.add("row");
          card.classList.add("item");
          card.classList.add("mb-2");
          card.innerHTML = `
              <div class="row item mb-2">
              <div class="col-3  col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
                  <img src="../images/ticket.png" class="img-fluid px-2 py-2">
              </div>
              <div class="col d-flex align-items-center">
                  <div>
                      <div class="fw-bold">${element.store.name}</div>
                      <div class="">${element.store.ubication}</div>
                      <div class="row">
                          <div class="col text-end">
                              <b class="badge-custom rounded-pill ta-c-danger">Pendiente</b>
                          </div>
                          <div class="col">
                              <span>$${element.payment}</span>
                          </div>

                      </div>
                  </div>
              </div>
              <div class="col-2 col-lg-1 d-flex align-items-center">
                  <button type="button" class="btn btn-icon">
                      <i class='bx bx-check-circle ta-c-success'></i>
                  </button>
              </div>
          </div>
          `;
          card.addEventListener("click", () => {
            console.log(element.id);
          });
          itemList.appendChild(card);
        }
      });
    });
};

const getOrdersdelivered = () => {
 console.log("entre");
  isNotAuth();

  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  const id = localStorage.getItem('user');
  fetch(`${BASE_URL}/findByUserId/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const orders = data.data;
      console.log(data.data);
      var estado =""
      orders.forEach((element) => {
        if (element.status == 1){
          const card = document.createElement("div");
          card.classList.add("row");
          card.classList.add("item");
          card.classList.add("mb-2");
          card.innerHTML = `
              <div class="row item mb-2">
              <div class="col-3  col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
                  <img src="../images/ticket.png" class="img-fluid px-2 py-2">
              </div>
              <div class="col d-flex align-items-center">
                  <div>
                      <div class="fw-bold">${element.store.name}</div>
                      <div class="">${element.store.ubication}</div>
                      <div class="row">
                          <div class="col text-end">
                              <b class="badge-custom rounded-pill ta-c-danger">Entregado</b>
                          </div>
                          <div class="col">
                              <span>$${element.payment}</span>
                          </div>

                      </div>
                  </div>
              </div>
              <div class="col-2 col-lg-1 d-flex align-items-center">
                  <button type="button" class="btn btn-icon">
                      <i class='bx bx-check-circle ta-c-success'></i>
                  </button>
              </div>
          </div>
          `;
          card.addEventListener("click", () => {
            console.log(element.id);
          });
          itemList.appendChild(card);
        }
      });
    });
};

const addOrder = () => {
    
    const order = {
        amount: "",
        status: "",
        product_id: "",
        store_id: "",
        user_id: "",
      };
    const cant = document.getElementById("numUnidades");
    order.amount = cant.value;
    order.payment = cant.value * precioProducto;
    order.status = 0;
    order.store_id = localStorage.getItem('store_id');
    order.product_id = localStorage.getItem('product_id');
    order.user_id = localStorage.getItem('user');
    fetch(`${BASE_URL}/store`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          const order = data.data;
          if (order) {
            swal({
              title: "se registro tu orden",
            })
            setTimeout(function(){
              window.location.replace("http://localhost:8080/porfolio/listapedido.html");
          }, 2000); 
          } else {
            swal({
                title: "no se registro",
                text: "You clicked the button!",
                icon: "error",
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

const getOneProduct = () =>{
  const producto = localStorage.getItem('product_id');
  fetch(`http://localhost:8000/api/product/show/${producto}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    precioProducto = data.data.price;
    const datos = document.getElementById("datosProducto");
    datos.innerHTML = `
    <strong>${data.data.name}</strong>
    <div>Precio unitario: $${data.data.price}</div>
    `
  })
}

const logout = () => {
  const token = localStorage.getItem("token");
  fetch(`http://localhost:8000/api/logout`, {
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
    