async function createProject()
{
    const curUserId = new URLSearchParams(window.location.search).get('id');
    const response1 = await fetch(`http://localhost:3000/users/1`)
    const userData = await response1.json()
    let newPorject = {
        id : userData.Projects.length,
        title: "Test-title",   //Change to dom controllers
        description: "testsdfgsdgdfdesc", //Change to dom controllers
        content: "test-content", //Change to dom controllers
        create_date: "10/2", //Change to dom controllers
        tasks: []
      }
      userData.Projects.push(newPorject) 
    let edit = {
        Projects : userData.Projects
    }
    const response = await fetch(`http://localhost:3000/users/${curUserId}`, {
        method : 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify(edit)
    })
}
async function createTask()
{
    const curUserId = new URLSearchParams(window.location.search).get('id');
    const response1 = await fetch(`http://localhost:3000/users/${curUserId}`)
    const userData = await response1.json()
    let id = 1 //Get it somehow
    let newTask = {
            id: userData.Projects[id].tasks.length,
            taskTitle: "testt",
            description: "testd",
            due_date: "test22",
            status: "testok",
            content: "testcont",
            create_date: "testcreate"
    }
    userData.Projects[id].tasks.push(newTask)
    // console.log(userData.Projects[id].tasks)
    let edit = {
        Projects: userData.Projects
    }
    fetch(`http://localhost:3000/users/${curUserId}`, {
        method : 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify(edit)       
    })
}

async function EditTask()
{
    const curUserId = new URLSearchParams(window.location.search).get('id');
    const response1 = await fetch(`http://localhost:3000/users/${curUserId}`)
    const userData = await response1.json()
    let ProjectId = 1 //Get it somehow
    let taskId = 1 //Get it somehow
    let editedProperty = "taskTitle" //get it from poperty selected
    let newEdit = "edited-Title"  // get this from dom
    userData.Projects[ProjectId].tasks[taskId][editedProperty] = newEdit
    // console.log(userData.Projects[id].tasks)
    fetch(`http://localhost:3000/users/${curUserId}`, {
        method : 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify(userData)       
    })
}

async function EditProject()
{
    const curUserId = new URLSearchParams(window.location.search).get('id');
    const response1 = await fetch(`http://localhost:3000/users/${curUserId}`)
    const userData = await response1.json()
    let ProjectId = 1 //Get it somehow
    let editedProperty = "title" //get it from poperty selected
    let newEdit = "edited-Title"  // get this from dom
    // console.log(userData.Projects[ProjectId][editedProperty])
    userData.Projects[ProjectId][editedProperty] = newEdit
    // console.log(userData.Projects[id].tasks) 
    fetch(`http://localhost:3000/users/${curUserId}`, {
        method : 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify(userData)       
    })
}

// Rasha's work: 

// async function getData() {
//     try{
//         console.log("a");
//         const proj = await fetch("http://localhost:3000/users/1");
//         const data = await proj.json();
//         const put = document.getElementById('cont');
//         let y="";
//         data.Projects.forEach(element => {
//      y+=`<div>
//      <h1>${element.title}</h1>
//      <p>${element.description}</p>
//      <p>${element.content}</p>
//      <p>${element.create_date}</p>`
//      console.log("hh")
//     });
//     put.innerHTML=y
//     }
//     catch (error){
//         console.error(error)
//     }
// }

// async function gettaskes() {
//     try{
//         const userID = 1; //edit later
//         const ProjectID = 1; //edit later
//         const task = await fetch(`http://localhost:3000/users/${userID}`);
//         const datataske = await task.json();
//         const putdom = document.getElementById('taske');
//         let x="";
//         datataske.Projects[ProjectID].tasks.forEach(taskeselement => {
//      x+=`<div>
//      <h1>${taskeselement.taskTitle}</h1>
//      <p>${taskeselement.description}</p>
//      <p>${taskeselement.due_date}</p>
//      <p>${taskeselement.status}</p>
//      <p>${taskeselement.create_date}</p> </div>`
    
//     });
//     putdom.innerHTML=x
//     }
//     catch (error){
//         console.error(error)
//     }
// }