import { saveImageFirestore } from "./firestore/Firestore-functions.js";

const BASE_URL = "http://localhost:8000/api/comment";
const ta_data_static_store_1 = "";

function isNotAuth() {
  try {
    var token = localStorage.getItem("token");
    if (token != null) {
    } else {
      window.location.href = "http://localhost:8080/login.html";
      window.localStorage.clear();
    }
  } catch (e) {
    console.log(e);
  }
}

const getAllComments = () => {
  isNotAuth();
  const id = localStorage.getItem("store_id");
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  fetch(`${BASE_URL}/findById/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const comments = data.data;
      comments.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("col-6");
        card.classList.add("col-md-4");
        card.classList.add("col-lg-3");
        card.classList.add("item");
        card.innerHTML = `
                  <div class="item-icon">
                    <img src="${element.photo}" class="img-fluid px-1 py-1" alt="">
                  </div>
                  <div class="px-2 py-2">
                    <div class="row">
                      <div class="col-1 d-flex align-items-center">
                        <i class="bx bxs-package ta-c-warn"></i>
                      </div>
                      <div class="col d-flex align-items-center">
                        <span class="fw-bold text-dark card-locale_title">${element.created_at.substring(0,10)}</span>
                      </div>
                    </div>
                    <span class="card-locale_content">
                    ${element.description}
                    </span>
                  </div>
                `;
        card.addEventListener("click", () => {
          console.log(element.id);
          console.log(element);
        });
        itemList.appendChild(card);
      });
    });
};

const addComment = async () => {
  const comentario = document.getElementById("comentario");
  const image = document.getElementById("fotografia").files[0];
  await saveImageFirestore(image).then((response) =>{
    console.log(response);
  });
  const comment = {
    description: "",
    photo: "",
    store_id: "",
    user_id: "",
  };
  var commentUrl = localStorage.getItem("imgUrl");
  console.log(commentUrl)
  comment.description = comentario.value;
  comment.photo = commentUrl;
  comment.store_id = localStorage.getItem("store_id");
  comment.user_id = localStorage.getItem("user");

  fetch(`${BASE_URL}/store`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => {
      const comment = data.data;
      if (comment) {
        swal({
          title: "se registró",
          text: "You clicked the button!",
          icon: "success",
        });
        getAllComments();
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

const logout = () => {
  const token = localStorage.getItem("token");
  fetch(`http://localhost:8000/api/logout`, {
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

const paginaComentarios = document.getElementById('paginaComentarios');
paginaComentarios.addEventListener('onload', getAllComments());

const btnAddComent = document.getElementById("agregarComentario");
btnAddComent.addEventListener('click', addComment);