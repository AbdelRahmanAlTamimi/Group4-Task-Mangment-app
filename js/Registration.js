document
  .getElementById("registrationBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    registrationForm();
  });

const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^[a-zA-Z0-9]{8,}$/;

async function registrationForm() {
  let fname = document.getElementById("firstName").value;
  let lname = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let valid = true;

  if (!nameRegex.test(fname)) {
    showError(
      "firstName",
      "firstNameError",
      "Invalid first name. Only letters and allowed characters (' -) are allowed."
    );
    valid = false;
  } else {
    removeError("firstName", "firstNameError");
  }

  if (!nameRegex.test(lname)) {
    showError(
      "lastName",
      "lastNameError",
      "Invalid last name. Only letters and allowed characters (' -) are allowed."
    );
    valid = false;
  } else {
    removeError("lastName", "lastNameError");
  }

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
  if (password !== confirmPassword) {
    showError(
      "confirmPassword",
      "confirmPasswordError",
      "Passwords do not match."
    );
    valid = false;
  } else {
    removeError("confirmPassword", "confirmPasswordError");
  }
  if (!valid) {
    return;
  }

  let data = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    Projects: [],
  };

  let userExists = await validateUser(data);
  if (!userExists) {
    let newUser = await createUser(data);
    if (newUser) {
      document.getElementById("registrationForm").reset();
      Swal.fire({
        title: "User Created Successfully",
        text: "The user has been added successfully, you will be redirected to the login page.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "login.html";
        }
      });
    }
  }
}

async function createUser(data) {
  try {
    let response = await fetch("http://localhost:3000/users");
    let users = await response.json();
    data.id = String(users.length);

    const myReq = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return myReq.json();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function validateUser(data) {
  try {
    let myRequest = await fetch("http://localhost:3000/users");
    let myResponse = await myRequest.json();

    for (let element of myResponse) {
      if (element.email === data.email) {
        showError("email", "user-found", "The email is already taken.");
        return true;
      }
    }

    removeError("email", "user-found");
    return false;
  } catch (error) {
    console.error(`Error: ${error}`);
    return false;
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
