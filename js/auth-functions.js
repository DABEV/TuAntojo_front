const BASE_URL = "https://tuantojoapi-production.up.railway.app/api";
const localStorage = window.localStorage;

function isNotAuth() {
  try {
    var token = localStorage.getItem("token");
    if (token != null) {
    } else {
      window.location.href = "login.html";
    }
  } catch (e) {
    console.log(e);
  }
}

function isAlreadyAuth() {
  try {
    var token = localStorage.getItem("token");
    if (token != null) {
      window.location.href = "https://dabev.github.io/TuAntojo_front/porfolio/listaPedido.html";
    } else {
    }
  } catch (e) {
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
        localStorage.setItem("user", JSON.stringify(user.id));
        console.log("Registro de token");
        window.location.href =
          "https://dabev.github.io/TuAntojo_front/porfolio/listaPedido.html";
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

  if (nameUser.value == "" || emailUser.value == "" || passwordUser.value == "") {
    swal({
      title: "Error",
      text: "Hay campos vacíos",
      icon: "error",
    });
  } else if (passwordUser.value != passwordConfirmation.value) {
    swal({
      title: "Advertencia",
      text: "Favor de confirmar la contraseña",
      icon: "warning",
    });
  } else {
    fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        console.log("Usuario creado");
        swal({
          title: "Éxito",
          text: "Usuario nuevo creado",
          icon: "success",
        });
        setTimeout(function () {
          window.location.replace("https://dabev.github.io/TuAntojo_front/login.html");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

const logout = () => {
  const token = localStorage.getItem("token");
  fetch(`${BASE_URL}/logout`, {
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
      } else {
        console.log("Cierre de sesión fallido");
      }
    });
};

const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
  btnLogin.addEventListener("click", login);
}

const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
  btnRegister.addEventListener("click", register);
}

const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", logout);
}
