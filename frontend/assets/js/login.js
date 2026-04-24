async function login() {
  console.log("Dentro da função login");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email:", email);
  console.log("Password:", password);

  // testando se os campos estão vazios
  if (!email && !password) {
    alert("Campos e-mail e senha são obrigatórios");
    return;
  }
  if (!email) {
    alert("Campo de e-mail obrigatório.");
    return;
  }
  if (!password) {
    alert("Campo senha obrigatório.");
    return;
  }

  const response = await fetch("http://localhost:3000/api/login/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log("Resposta do servidor: ", data);

  if (response.status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    alert("Login bem-sucedido!");
    if (data.role === "admin") {
      window.location.href = "dashboard-adm.html";
    } else {
      window.location.href = "dashboard-cli.html";
    }
  } else if (response.status === 401) {
    alert(data.message);
  } else {
    alert("Erro no login", +data.message);
  }
}
