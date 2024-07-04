document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    login();
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[a-zA-Z0-9]{8,}$/;

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let valid = true;

  if (!emailRegex.test(email)) {
    showError("email", "emailError", "Invalid email address.");
    valid = false;
  } else {
    removeError("email", "emailError");
  }

  if (!passwordRegex.test(password)) {
    showError(
      "password",
      "passwordError",
      "Weak password. Password must be at least 8 characters long."
    );
    valid = false;
  } else {
    removeError("password", "passwordError");
  }

  if (!valid) {
    return;
  }

  let data = {
    email: email,
    password: password,
  };

  try {
    let response = await fetch("http://localhost:3000/users");
    let users = await response.json();
    let user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user) {
      document.getElementById("login-status").style.color = "green";
      document.getElementById("login-status").innerText = "Login successful!";
      setTimeout(() => {
        window.location.href = `../html/dashboard.html?id=${encodeURIComponent(
          user.id
        )}`;
      }, 1000);
    } else {
      document.getElementById("login-status").style.color = "red";
      document.getElementById("login-status").innerText =
        "Invalid email or password.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


function showError(inputId, errorId, message) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);
  inputElement.classList.add("input-error");
  errorElement.innerText = message;
}

function removeError(inputId, errorId) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);
  inputElement.classList.remove("input-error");
  errorElement.innerText = "";
}