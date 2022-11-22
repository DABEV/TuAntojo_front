const BASE_URL = "http://localhost:8000/api/comment";
const ta_data_static_store_1 = "";


const getAllComments = () => {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  fetch(`${BASE_URL}/index`)
    .then((response) => response.json())
    .then((data) => {
      const comments = data.data;
      comments.forEach((element) => {
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
                        <span class="fw-bold text-dark card-locale_title">${element.description}</span>
                      </div>
                    </div>
                    <span class="card-locale_content">${element.photo}</span>
                  </div>
                `;
        card.addEventListener("click", () => {
          console.log(element.id);

        });
        itemList.appendChild(card);
      });
    });
};
