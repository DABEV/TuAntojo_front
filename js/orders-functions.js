const BASE_URL = "http://localhost:8000/api/order";

const getAllOrders = () => {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  const id = localStorage.getItem('user');
  fetch(`${BASE_URL}/findByUser/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const orders = data.data;

      orders.forEach((element) => {
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
                    <div class="fw-bold">${element.store_id}</div>
                    <div class="">${element.product_id}</div>
                    <div class="row">
                        <div class="col text-end">
                            <b class="badge-custom rounded-pill ta-c-danger">${element.status}</b>
                        </div>
                        <div class="col">
                             <span>${element.amount}</span>
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
                title: "se registro",
                text: "You clicked the button!",
                icon: "success",
              });
            
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
    
