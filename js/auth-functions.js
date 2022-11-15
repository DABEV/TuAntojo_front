const BASE_URL = "http://localhost:8000/api";
const localStorage = window.localStorage;

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
      if (token) {
        localStorage.clear();
        localStorage.setItem("token", token);
        console.log("Registro de token");
        // window.location.href = "/porfolio/listaPedido.html"
      } else {
        console.log("No se inició sesión");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", login);
