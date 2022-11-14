const BASE_URL = "http://localhost:8000/api/shelve";

const getAllShelves = () => {
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
            <img src="../images/puesto-de-comida.png" class="img-fluid px-2 py-2">
            </div>
            <div class="col d-flex align-items-center">
            <div>
                <div class="fw-bold">${element.name}</div>
                <div>No. de productos: <b class="badge rounded-pill ta-bg-soft-blue-1">12</b>
                </div>
            </div>
            </div>
            <div class="col-2 col-lg-1 d-flex align-items-center">
            <button type="button" class="btn btn-icon">
                <i class='bx bx-message-dots ta-c-teal-1 fs-1'></i>
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
