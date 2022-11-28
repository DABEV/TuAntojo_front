const BASE_URL = "http://localhost:8000/api/comment";
const ta_data_static_store_1 = "";

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
          console.log(element)
        });
        itemList.appendChild(card);
      });
    });
};
const addComment = () => {
  const comment = {
    description: "",
    photo: "",
    store_id: "",
    user_id: "",
  };
  const comentario = document.getElementById("comentario");
  comment.description = comentario.value;
  comment.photo = "esto será una foto";
  comment.store_id = localStorage.getItem('store_id');
  comment.user_id = localStorage.getItem('user');


  fetch(`${BASE_URL}/store`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
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
