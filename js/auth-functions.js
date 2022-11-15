const BASE_URL = "http://localhost:8000/api";

const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    "email": email,
    "password": password
  }

  console.log("puro texto");

  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: user
  })
    .then((response) => response.json())
    .then((data) => {
      const token = data.token;

      console.log(data);
      if (token) {
        sessionStorage("token", token);
        console.log(data);
      }else{
        console.log("No se inició sesión");
      }
    }).catch((e)=>{
        console.log(e);
    });
};

const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener('click', login);
