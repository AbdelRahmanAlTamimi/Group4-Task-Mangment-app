document.getElementById("registrationBtn").addEventListener("click", function (event) {
  event.preventDefault();
  registrationForm();
});

async function registrationForm() {
  let fname = document.getElementById("firstName").value;
  let lname = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let data = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    Projects: []
  };

  let userExists = await validateUser(data);
  if (!userExists) {
    let newUser = await createUser(data);
    console.log("User created:", newUser);
    document.getElementById("registrationForm").reset();
<<<<<<< HEAD

    Swal.fire({
      title: 'The user has been added successfully, you will be redirected to the login page',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "login.html";
    });
=======
    alert("done")
    window.location.href = "login.html";
>>>>>>> 5247d50 (final)
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
        document.getElementById("user-found").style.color = "red";
        document.getElementById("user-found").innerHTML = "The email is already taken";
        return true;
      }
    }

    document.getElementById("user-found").innerHTML = "";
    return false;
  } catch (error) {
    console.error(`Error: ${error}`);
    return false;
  }
}

// document
//   .getElementById("registrationBtn")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     // Swal.fire({
//     //   title:
//     //     "The user has been added successfully, you will be redirected to the login page",
//     //   icon: "success",
//     //   confirmButtonText: "OK",
//     // });
//     setTimeout(function () {
//           Swal.fire(
//             "The user has been added successfully, you will be redirected to the login page"
//           );

//     },3000)
//     console.log("It's working");
//     window.location.href = "../html/login.html";
//   });
