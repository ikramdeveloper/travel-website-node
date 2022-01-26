const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.loginEmail.value;
  const password = loginForm.loginPassword.value;

  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      const redirectUrl = data.redirectUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl;
        loginForm.reset();
      } else {
        alert("Password and email do not match");
      }
    });
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = registerForm.registerEmail.value;
  const password = registerForm.registerPassword.value;
  const rePassword = registerForm.registerRePassword.value;

  if (password !== rePassword) return;

  fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((resp) => resp.text())
    .then((data) => {
      alert(data);
      registerForm.reset();
    });
});
