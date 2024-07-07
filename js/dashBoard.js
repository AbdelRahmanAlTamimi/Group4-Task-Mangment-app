Swal.fire({
  title: "Login successful",
  icon: "success",
  timer: 1000,
  showConfirmButton: false,
});
const curUserId = new URLSearchParams(window.location.search).get("id");
sessionStorage.setItem("curUserId", curUserId);
getUserName();
renderProjects();

let historyOfTask = [];
const addProjBtn = document.getElementById("add-project-func");
addProjBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createProject();
  
});

const projectBar = document.querySelector(".radio-buttons-container");
let isProjectBarVisible = false;
document.getElementById("show-projects").addEventListener("click", () => {
  if (isProjectBarVisible) {
    // alert("hi")
    isProjectBarVisible = false;
    projectBar.classList.add("hide");
  } else {
    // alert("ih")
    isProjectBarVisible = true;
    projectBar.classList.remove("hide");
  }
});

document.getElementById("edit-project-done").addEventListener("click", (e) => {
  e.preventDefault();
  alert("idk");
  EditProject();
});
const deleteTaskBtn = document.getElementById("delete-task-cta");
deleteTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteTask();
});
const deleteProjectBtn = document.getElementById("delete-project-btn");
deleteProjectBtn.addEventListener("click", () => {
  const radioViewOptions = document.querySelectorAll(
    "input[name='view-option']"
  );
  let ProjectId = 0;
  radioViewOptions.forEach((radio, index) => {
    if (radio.checked) ProjectId = index;
  });
  // if(confirm("Are you sure You want to delete"))
  //   {

  //   }
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      deleteProject(ProjectId);
      renderProjects();
    }
  });
});

async function deleteProject(project_id) {
  const userid = new URLSearchParams(window.location.search).get("id");
  const getlastdata = await fetch(`http://localhost:3000/users/${userid}`);
  const returntojson = await getlastdata.json();
  const ProjectID = project_id; //getfrom dom
  returntojson.Projects = returntojson.Projects.filter(
    (cutproject) => cutproject.id !== ProjectID
  );
  returntojson.Projects.forEach((element, index) => {
    element.id = index;
  });
  await fetch(`http://localhost:3000/users/${userid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(returntojson),
  });
  renderProjects();
}

document.getElementById("edit-task-btn").addEventListener("click", (e) => {
  document.getElementById("task-edit-done").classList.remove("hidden");

  var val = document.getElementById("curTaskTitle").innerText;
  var input = document.createElement("input");
  input.id = "title-selector";
  input.value = val;
  // Empty value and add input to
  document.getElementById("curTaskTitle").innerText = "";
  document.getElementById("curTaskTitle").appendChild(input);
  val = document.getElementById("curTaskDesc").innerText;
  var newinput = document.createElement("textarea");
  newinput.id = "description-selector";
  newinput.value = val;
  document.getElementById("curTaskDesc").innerText = "";
  document.getElementById("curTaskDesc").appendChild(newinput);
  const due_date = document.getElementById("curTaskDueDate");
  val = due_date.innerText;
  let thirdinput = document.createElement("input");
  thirdinput.id = "date-selector";
  thirdinput.type = "date";
  thirdinput.value = val;
  document.getElementById("curTaskDueDate").innerText = "";
  document.getElementById("curTaskDueDate").appendChild(thirdinput);
  let selecter = document.createElement("select");
  selecter.id = "status-selector";
  let statuss = document.getElementById("curTaskStatus");
  let option1 = document.createElement("option");
  option1.value = "to-do";
  option1.innerText = "to-do";
  selecter.appendChild(option1);
  let option2 = document.createElement("option");
  option2.value = "in-progress";
  option2.innerText = "in-progress";
  selecter.appendChild(option2);
  let option3 = document.createElement("option");
  option3.value = "done";
  option3.innerText = "done";
  selecter.appendChild(option3);
  selecter.value = statuss.innerText;
  statuss.innerText = "";
  statuss.appendChild(selecter);
});
document.getElementById("task-edit-done").addEventListener("click", () => {
  document.getElementById("task-edit-done").classList.add("hidden");
  EditTask();
});
async function getUserName() {
  const curUserId = new URLSearchParams(window.location.search).get("id");
  const response = await fetch(`http://localhost:3000/users/${curUserId}`);
  const data = await response.json();
  document.getElementById("greeting").innerText = "Welcome " + data.fname;
}
async function createProject() {
  const response1 = await fetch(`http://localhost:3000/users/${curUserId}`);
  const userData = await response1.json();
  let newProjectId = 0;
  if (userData.Projects.length == 0) newProjectId = 0;
  else {
    newProjectId = userData.Projects[userData.Projects.length - 1].id + 1;
  }
  let newPorject = {
    id: newProjectId,
    title: document.getElementById("ProjectTitle").value, //"Test-title",   //Change to dom controllers
    description: document.getElementById("Projectdescription").value, //Change to dom controllers
    create_date: new Date().toLocaleDateString(),
    tasks: [],
  };
  userData.Projects.push(newPorject);
  const response = await fetch(`http://localhost:3000/users/${curUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  renderProjects();
}

let addTaskBtn = document.getElementById("addTask");
if (addTaskBtn) {
  addTaskBtn.addEventListener("click", function (event) {
    event.preventDefault();
    createTask(1);
  });

  addTaskBtn.addEventListener("click", () => {
    if (activeOverlay) {
      activeOverlay.classList.add("hide");
      activeOverlay = null;
      document.body.classList.remove("overflow-hidden");
    }
  });
}
function handleTaskClick(id, title, desc, due_date, status, history) {
  if (viewTaskOverlay) {
    viewTaskOverlay.classList.remove("hide");
    document.getElementById("curTaskId").textContent = id;
    document.getElementById("curTaskTitle").textContent = title;
    document.getElementById("curTaskDesc").textContent = desc;
    document.getElementById("curTaskDueDate").textContent = due_date;
    document.getElementById("curTaskStatus").textContent = status;
    activeOverlay = viewTaskOverlay;
    document.body.classList.add("overflow-hidden");
    console.log(history);
    historyOfTask = history;
  }
}
document.getElementById("task-history-cta").addEventListener("click", () => {
  const tablee = document.querySelector("table");
  console.log(historyOfTask);
  historyOfTask.forEach((element) => {
    const tablerow = document.createElement("tr");
    tablerow.innerHTML = `<td>${element.status}</td>
    <td>${element.date}</td>`;
    tablee.appendChild(tablerow);
  });
});
async function createTask() {
  const curUserId = sessionStorage.getItem("curUserId");
  if (!curUserId) {
    console.error("User ID is null");
    return;
  }
  const radioViewOptions = document.querySelectorAll(
    "input[name='view-option']"
  );
  let ProjectId = 0;
  radioViewOptions.forEach((radio, index) => {
    if (radio.checked) ProjectId = index;
  });
  let taskTitle = document.getElementById("name").value;
  let taskDesc = document.getElementById("description").value;
  let taskDueDate = document.getElementById("Duedate").value;
  let taskStatus = document.getElementById("drp-li").value;

  try {
    const response = await fetch(`http://localhost:3000/users/${curUserId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userData = await response.json();
    console.log(userData);
    const newTask = {
      id: userData.Projects[ProjectId].tasks.length,
      taskTitle: taskTitle,
      description: taskDesc,
      due_date: taskDueDate,
      status: taskStatus,
      history: [
        {
          status: taskStatus,
          date: new Date().toLocaleDateString(),
        },
      ],
    };

    // console.log(newTask);
    userData.Projects[ProjectId].tasks.push(newTask);

    const updateResponse = await fetch(
      `http://localhost:3000/users/${curUserId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Projects: userData.Projects }),
      }
    );
    if (!updateResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const content = `<li class="task-item">
                <button class="task-button">
                  <p class="task-name">${newTask.taskTitle}</p>
                  <p class="task-due-date">Due on ${newTask.due_date}</p>
                  <iconify-icon icon="material-symbols:arrow-back-ios-rounded" style="color: black" width="18" height="18" class="arrow-icon"></iconify-icon>
                </button>
              </li>`;
    const myNewTask = document.createElement("div");
    myNewTask.innerHTML = content;

    let newTaskElement;
    if (newTask.status == "to-do") {
      const ulTo_do = document.getElementById("ulTo-do");
      newTaskElement = ulTo_do.appendChild(myNewTask.firstElementChild);
    } else if (newTask.status == "in-progress") {
      const ulDoing = document.getElementById("ulDoing");
      newTaskElement = ulDoing.appendChild(myNewTask.firstElementChild);
    } else {
      const ulDone = document.getElementById("ulDone");
      newTaskElement = ulDone.appendChild(myNewTask.firstElementChild);
    }
    if (newTaskElement) {
      newTaskElement
        .querySelector(".task-button")
        .addEventListener("click", () => {
          handleTaskClick(
            newTask.id,
            newTask.taskTitle,
            newTask.description,
            newTask.due_date,
            newTask.status,
            newTask.history
          );
        });
    }

    document.getElementById("addTaskForm").reset();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function EditTask() {
  // const curUserId = new URLSearchParams(window.location.search).get("id");
  const response1 = await fetch(`http://localhost:3000/users/${curUserId}`);
  const userData = await response1.json();
  const radioViewOptions = document.querySelectorAll(
    "input[name='view-option']"
  );
  let curProjectId = 0;
  radioViewOptions.forEach((radio, index) => {
    if (radio.checked) curProjectId = index;
  });
  let ProjectId = curProjectId; //Get it somehow
  let taskId = document.getElementById("curTaskId").innerHTML;
  var currentTask = userData.Projects[ProjectId].tasks[taskId];

  let newTask = {};
  if (document.getElementById("status-selector").value == currentTask.status) {
    newTask = {
      id: currentTask.id,
      taskTitle: document.getElementById("title-selector").value,
      description: document.getElementById("description-selector").value,
      due_date: document.getElementById("date-selector").value,
      status: document.getElementById("status-selector").value,
      history: currentTask.history,
    };
  } else {
    currentTask.history.push({
      status: document.getElementById("status-selector").value,
      date: new Date().toLocaleDateString(),
    });
    newTask = {
      id: currentTask.id,
      taskTitle: document.getElementById("title-selector").value,
      description: document.getElementById("description-selector").value,
      due_date: document.getElementById("date-selector").value,
      status: document.getElementById("status-selector").value,
      history: currentTask.history,
    };
  }

  userData.Projects[ProjectId].tasks[taskId] = newTask;
  // console.log(userData.Projects[id].tasks)
  fetch(`http://localhost:3000/users/${curUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  renderProjects();
}

async function EditProject() {
  let curProjectId = 0;
  const radioViewOptions = document.querySelectorAll(
    "input[name='view-option']"
  );
  radioViewOptions.forEach((radio, index) => {
    if (radio.checked) curProjectId = index;
  });
  // const curUserId = new URLSearchParams(window.location.search).get("id");
  const response1 = await fetch(`http://localhost:3000/users/${curUserId}`);
  const userData = await response1.json();
  let ProjectId = curProjectId; //Get it somehow
  // let newEdit = edited_value; // get this from dom
  // console.log(userData.Projects[ProjectId][editedProperty])
  userData.Projects[ProjectId].title =
    document.getElementById("edit-project-title").value;
  userData.Projects[ProjectId].description = document.getElementById(
    "project-edit-description"
  ).value;
  // console.log(userData.Projects[id].tasks)
  await fetch(`http://localhost:3000/users/${curUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  renderProjects();
}

async function deleteTask() {
  let curProjectId = 0;
  radioViewOptions.forEach((radio, index) => {
    if (radio.checked) curProjectId = index;
  });
  const userid = new URLSearchParams(window.location.search).get("id");
  const getlastdata = await fetch(`http://localhost:3000/users/${userid}`);
  const returntojson = await getlastdata.json();
  const taskesindex = document.getElementById("curTaskId").innerHTML; //get from dom
  const ProjectID = curProjectId; //get from dom
  // console.log(returntojson.Projects[ProjectID].tasks);
  returntojson.Projects[ProjectID].tasks = returntojson.Projects[
    ProjectID
  ].tasks.filter((cutproject) => cutproject.id != taskesindex);
  // console.log(returntojson.Projects[ProjectID].tasks);
  returntojson.Projects[ProjectID].tasks.forEach((element, index) => {
    element.id = index;
  });
  await fetch(`http://localhost:3000/users/${userid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(returntojson),
  });
  renderTasks(curProjectId);
}

async function renderTasks(proj_Id) {
  ProjectId = proj_Id; //To get
  const response = await fetch(`http://localhost:3000/users/${curUserId}`);
  const userData = await response.json();
  document.getElementById("ulTo-do").innerHTML = "";
  document.getElementById("ulDoing").innerHTML = "";
  document.getElementById("ulDone").innerHTML = "";
  userData.Projects[ProjectId].tasks.forEach((element) => {
    const content = `<li class="task-item">
                <button class="task-button">
                  <p class="task-name">${element.taskTitle}</p>
                  <p class="task-due-date">Due on ${element.due_date}</p>
                  <iconify-icon icon="flowbite:dots-horizontal-outline" class="arrow-icon" width="1.5rem" height="1.5rem"></iconify-icon>
                </button>
              </li>`;
    const myNewTask = document.createElement("div");
    myNewTask.innerHTML = content;
    let newTaskElement;
    if (element.status == "to-do") {
      const ulTo_do = document.getElementById("ulTo-do");
      newTaskElement = ulTo_do.appendChild(myNewTask.firstElementChild);
    } else if (element.status == "in-progress") {
      const ulDoing = document.getElementById("ulDoing");
      newTaskElement = ulDoing.appendChild(myNewTask.firstElementChild);
    } else {
      const ulDone = document.getElementById("ulDone");
      newTaskElement = ulDone.appendChild(myNewTask.firstElementChild);
    }
    if (newTaskElement) {
      newTaskElement
        .querySelector(".task-button")
        .addEventListener("click", () => {
          handleTaskClick(
            element.id,
            element.taskTitle,
            element.description,
            element.due_date,
            element.status,
            element.history
          );
        });
    }
  });
  displayProjectDesc();
}

async function renderProjects() {
  const curUserId = new URLSearchParams(window.location.search).get("id");
  const response = await fetch(`http://localhost:3000/users/${curUserId}`);
  const data = await response.json();
  document.getElementById("project-display").innerHTML = " ";
  data.Projects.forEach((project) => {
    let todoCounter = 0;
    let doingCounter = 0;
    let doneCounter = 0;
    project.tasks.forEach((el) => {
      if (el.status == "to-do") {
        todoCounter += 1;
      } else if (el.status == "in-progress") {
        doingCounter += 1;
      } else if (el.status == "done") {
        doneCounter += 1;
      }
    });
    const container = document.createElement("div");
    container.classList.add("radio-container");
    container.innerHTML = `
            <input
              type="radio"
              id="${project.id}"
              name="view-option"
              value= "${project.id}"
              class="radio-input"
              checked
            />
            <label for="${project.id}" class="radio-label">
              <span>${project.title}</span>
            </label>`;
    const projectsContainer = document.getElementById("project-display");
    container.addEventListener("mouseenter", async (e) => {
      // quickview.style.visibility = "visible"
      document.getElementById(
        "to-do-counter"
      ).innerHTML = `<div class="circle pink-background"></div> : ${todoCounter}`;
      document.getElementById(
        "progress-counter"
      ).innerHTML = `<div class="circle blue-background"></div> : ${doingCounter}`;
      document.getElementById(
        "done-counter"
      ).innerHTML = `<div class="circle green-background"></div> : ${doneCounter}`;

      quickview.style.top = e.clientY + 10 + "px";
      quickview.style.left = e.clientX + 4 + "px";
      quickview.style.visibility = "visible";
      setTimeout(() => {
        quickview.style.visibility = "hidden";
      }, 1400);
    });

    projectsContainer.appendChild(container);
  });

  const radioViewOptions = document.querySelectorAll(
    "input[name='view-option']"
  );
  radioViewOptions.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      renderTasks(e.target.id);
    });
  });

  displayProjectDesc();
  const projects = document.querySelectorAll("input[name='view-option']");
  let curProjectId = 0;
  projects.forEach((radio, index) => {
    if (radio.checked) curProjectId = index;
  });
  renderTasks(curProjectId);
}

async function displayProjectDesc() {
  // get the current project id
  const radioViewOptions = document.querySelectorAll(
    "input[name='view-option']"
  );
  let curProjectId = 0;
  radioViewOptions.forEach((radio, index) => {
    if (radio.checked) curProjectId = index;
  });
  const curUserId = new URLSearchParams(window.location.search).get("id");
  const response1 = await fetch(`http://localhost:3000/users/${curUserId}`);
  const userData = await response1.json();
  let project = userData.Projects[curProjectId];
  document.getElementById("project-desc").innerHTML =
    "Project description: " + "<br>" + project.description;
}
document.getElementById("signOut").addEventListener("click", signOut);
function signOut() {
  window.location.href = "login.html";
}

document
  .getElementById("search-bar")
  .addEventListener("keyup", function (event) {
    let input = event.target.value.toLowerCase();
    let cards = document.querySelectorAll(".task-item");
    let cardsname = document.querySelectorAll(".task-name");
    cards.forEach((card, index) => {
      let cardName = cardsname[index].innerText.toLowerCase();
      card.style.display = "none"; // إخفاء جميع الكروت
      if (cardName.includes(input)) {
        card.style.display = "block"; // إظهار الكروت المطابقة فقط
      }
    });
  });
