const BASE_URL = "https://tuantojoapi-production.up.railway.app/api/order";
const BASE_URL_PRODUCT="https://tuantojoapi-production.up.railway.app/api/product"
var precioProducto = 0;
function isNotAuth() {
  try {
    var token = localStorage.getItem("token");
    if (token != null) {
    } else {
      window.location.href = "https://dabev.github.io/TuAntojo_front/login.html";
      window.localStorage.clear();
    }
  } catch (e) {
    console.log(e);
  }
}

const getOrdersPendings = () => {
  isNotAuth();

  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  const id = localStorage.getItem("user");
  fetch(`${BASE_URL}/findByUserId/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const orders = data.data;
      var estado = "";
      orders.forEach((element) => {
        if (element.status == 0) {
          const card = document.createElement("div");
          card.classList.add("row");
          card.classList.add("item");
          card.classList.add("mb-2");
          card.innerHTML = `
              <div class="row item mb-2 shadow bg-white rounded row-collapse">
              <div class="col-3 col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
                  <img src="../images/ticket.png" class="img-fluid px-2 py-2">
              </div>
              <div class="col-7 d-flex align-items-center">
                  <div>
                      <div class="fw-bold text-truncate">${element.store.name}</div>
                      <div class="text-truncate">${element.store.ubication}</div>
                      <div class="row">
                          <div class="col">
                              <span class="text-truncate">$${element.payment}</span>
                          </div>
                          <div class="col text-end text-truncate">
                              <span class="badge-custom rounded-pill ta-c-danger">Pendiente</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-2 col-lg-1 d-flex align-items-center">
                  <button type="button" class="btn btn-icon">
                      <i class='bx bx-check-circle ta-c-success fs-1'></i>
                  </button>
              </div>
          </div>
          `;
          card.addEventListener("click", () => {
            swal({
              title: "Estás seguro?",
              text: "El estado cambiará ha entregado",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((changeStatus) => {
              if (changeStatus) {
                const order = {
                  amount: element.amount,
                  payment: element.payment,
                  status: 1,
                  product_id: element.product_id,
                  store_id: element.store_id,
                  user_id: element.user_id,
                };
                updateStatus(order, element.id);
              } else {
              }
            });
          });
          itemList.appendChild(card);
        }
      });
    });
};

const updateStatus = (order, id) => {
  fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      const order = data.data;
      if (order) {
        swal({
          title: "El producto ha sido entregado",
          icon: "success",
        });
        getOrdersPendings();
      } else {
        swal({
          title: "Ha ocurrido un error",
          text: "No se ha podido marcar el pedido como entregado",
          icon: "error",
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const getOrdersdelivered = () => {
  console.log("entre");
  isNotAuth();

  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  const id = localStorage.getItem("user");
  fetch(`${BASE_URL}/findByUserId/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const orders = data.data;
      console.log(data.data);
      var estado = "";
      orders.forEach((element) => {
        if (element.status == 1) {
          const card = document.createElement("div");
          card.classList.add("row");
          card.classList.add("item");
          card.classList.add("mb-2");
          card.innerHTML = `
              <div class="row item mb-2 shadow bg-white rounded row-collapse">
              <div class="col-3  col-lg-1 item-icon d-flex justify-content-center pt-2 mb-2">
                  <img src="../images/ticket.png" class="img-fluid px-2 py-2">
              </div>
              <div class="col-9 d-flex align-items-center">
                  <div>
                      <div class="fw-bold text-truncate">${element.store.name}</div>
                      <div class="text-truncate">${element.store.ubication}</div>
                      <div class="row">
                          <div class="col text-end">
                              <b class="badge-custom rounded-pill ta-c-success text-truncate">Entregado</b>
                          </div>
                          <div class="col text-truncate">
                              <span>$${element.payment}</span>
                          </div>

                      </div>
                  </div>
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
  order.store_id = localStorage.getItem("store_id");
  order.product_id = localStorage.getItem("product_id");
  order.user_id = localStorage.getItem("user");
  fetch(`${BASE_URL}/store`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      const order = data.data;
      if (order) {
        swal({
          title: "Se registró tu orden",
        });
        setTimeout(function () {
          window.location.replace(
            "https://dabev.github.io/TuAntojo_front/porfolio/listapedido.html"
          );
        }, 2000);
      } else {
        swal({
          title: "Información",
          text: "Tu pedido se ha guardado, tus cambios se reflejarán cuando vuelvas a conectarte a la red",
          icon: "info",
        }).then(()=>{
          window.location.replace(
            "https://dabev.github.io/TuAntojo_front/porfolio/productos.html"
          );
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const getOneProduct = () => {
  isNotAuth();
  const producto = localStorage.getItem("product_id");
  fetch(`${BASE_URL_PRODUCT}/show/${producto}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      precioProducto = data.data.price;
      const datos = document.getElementById("datosProducto");
      datos.innerHTML = `
    <strong>${data.data.name}</strong>
    <div>Precio unitario: $${data.data.price}</div>
    `;
    });
};

const logout = () => {
  const token = localStorage.getItem("token");
  fetch(`https://tuantojoapi-production.up.railway.app/api/logout`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log("Cierre de sesión fallido");
      }
    });
};

const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", logout);
}
