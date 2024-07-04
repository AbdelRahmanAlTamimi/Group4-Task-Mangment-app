// elements
const radioViewOptions = document.querySelectorAll("input[name='view-option']");
// const listView = document.getElementById("list-view");
// const boardView = document.getElementById("board-view");
const projects = document.getElementsByClassName("project-container");
const addTaskCTA = document.getElementById("add-task-cta");
const addProjectCTA = document.getElementById("add-project-cta");
const setTaskOverlay = document.getElementById("set-task-overlay");
const setProjectOverlay = document.getElementById("set-project-overlay");
const closeButtons = document.querySelectorAll(".close-button");
const statusSelect = document.getElementById("status-select");
const statusDropdown = document.getElementById("status-dropdown");
const statusDropdown2 = document.getElementById("status-dropdown-for-taskview");
const taskItems = document.querySelectorAll(".task-item");
const viewTaskOverlay = document.getElementById("view-task-overlay");
const deleteTaskCTA = document.getElementById("delete-task-cta");
const notification = document.getElementById("notification");
const quickview = document.getElementById("project-quickview");
const taskStatusBtn = document.getElementById("status-dropdown-task-overview");
const EditProjectOverlay = document.getElementById("edit-project-overlay")
const EditProjectBtn = document.getElementById("edit-project-btn");
const TaskHistoryOverlay = document.getElementById("Task-history-overlay");

// the current active overlay
let activeOverlay = null;
let activeProject = projects[0];
//** event listeners **//
// radio buttons for view option
radioViewOptions.forEach((radioButton) => {
  radioButton.parentNode.addEventListener("mouseenter",async (e) =>
    { 
      // quickview.style.visibility = "visible"
      setTimeout(() => {
        quickview.style.visibility = "visible"
      },1000);
      quickview.style.top = (e.clientY + 10) + "px"
      quickview.style.left = e.clientX + "px" 
      await setTimeout(() => {
        quickview.style.visibility = "hidden"
      },5000);

    })

  // radioButton.addEventListener("change", (event) => {
  //   const eventTarget = event.target;
  //   const viewOption = eventTarget.value;
  //   // console.log(eventTarget)
  //       document.getElementById("ulTo-do").innerHTML = "";
  //       activeProject = projects[viewOption]
  //       activeProject.classList.remove("hide");
  //       renderTasks(viewOption);
  // });
});

// add task
addTaskCTA.addEventListener("click", () => {
  setTaskOverlay.classList.remove("hide");
  activeOverlay = setTaskOverlay;
  // disable scrolling for content behind the overlay
  document.body.classList.add("overflow-hidden");
});

// add project 
addProjectCTA.addEventListener("click", () => {
  setProjectOverlay.classList.remove("hide");
  activeOverlay = setProjectOverlay;
  // disable scrolling for content behind the overlay
  document.body.classList.add("overflow-hidden");
});

// edit project 
EditProjectBtn.addEventListener("click", () => {
  document.getElementById("edit-project-title").value = "";
  document.getElementById("project-edit-description").value = "";
  EditProjectOverlay.classList.remove("hide");
  activeOverlay = EditProjectOverlay;
  // disable scrolling for content behind the overlay
  document.body.classList.add("overflow-hidden");
})
// close buttons inside overlays
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeOverlay.classList.add("hide");
    activeOverlay = null;
    document.body.classList.remove("overflow-hidden");
    // reenable scrolling
  });
});
document.getElementById("task-history-cta").addEventListener("click", () => {
  activeOverlay.classList.add("hide");
  TaskHistoryOverlay.classList.remove("hide");
  activeOverlay = TaskHistoryOverlay;
  document.body.classList.add("overflow-hidden");
})

// click a task
taskItems.forEach((task) => {
  task.addEventListener("click", () => {
    viewTaskOverlay.classList.remove("hide");
    activeOverlay = viewTaskOverlay;
    // disable scrolling for content behind the overlay
    document.body.classList.add("overflow-hidden");
  });
});

// delete a task
deleteTaskCTA.addEventListener("click", () => {
  activeOverlay.classList.add("hide");
    activeOverlay = null;
    document.body.classList.remove("overflow-hidden");
});

document.getElementById("task-edit-done").addEventListener("click", () =>
{
  activeOverlay.classList.add("hide");
  activeOverlay = null;
  document.body.classList.remove("overflow-hidden");
} )
document.getElementById("add-project-func").addEventListener("click", () => {
  activeOverlay.classList.add("hide");
  activeOverlay = null;
  document.body.classList.remove("overflow-hidden");
})
//status drop down 
// taskStatusBtn.addEventListener("click", (e) =>
// {
//   statusDropdown2.classList.toggle("hide");
// })