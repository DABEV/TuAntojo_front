const BASE_URL = "http://localhost:8000/api";
const localStorage = window.localStorage;

function isNotAuth() {
  try{
      var token = localStorage.getItem("token");
      if(token != null){
      }else{
        window.location.href = "http://localhost:8080/login.html"
      }
  }catch(e){
      console.log(e);
  }
}

function isAlreadyAuth() {
  try{
      var token = localStorage.getItem("token");
      if(token != null){
        window.location.href =
          "http://localhost:8080/porfolio/listaPedido.html";
      }else{
      }
  }catch(e){
      console.log(e);
  }
}

const login = () => {
  const user = {
    email: "",
    password: "",
  };

  const emailUser = document.getElementById("email");
  user.email = emailUser.value;

  const passwordUser = document.getElementById("password");
  user.password = passwordUser.value;

  console.log(user);

  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const token = data.token;
      const user = data.data;
      if (token) {
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user.id))
        console.log("Registro de token");
        window.location.href =
          "http://localhost:8080/porfolio/listaPedido.html";
      } else {
        console.log("No se inició sesión");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const register = () => {
  const user = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const nameUser = document.getElementById("name");
  user.name = nameUser.value;

  const emailUser = document.getElementById("email");
  user.email = emailUser.value;

  const passwordUser = document.getElementById("password");
  user.password = passwordUser.value;

  const passwordConfirmation = document.getElementById("passwordConfirm");
  user.password_confirmation = passwordConfirmation.value;

  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        localStorage.clear();
        console.log("Usuario creado");
        window.location.href =
          "http://localhost:8080/login.html";
      } else {
        console.log("Registro de usuario fallido");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const btnLogin = document.getElementById("btnLogin");
if(btnLogin){
  btnLogin.addEventListener("click", login);
}


const btnRegister = document.getElementById("btnRegister");
if(btnRegister){
  btnRegister.addEventListener("click", register);
}

