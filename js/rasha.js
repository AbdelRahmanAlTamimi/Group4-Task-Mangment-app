async function getprojects() {
    try{
        const proj = await fetch("http://localhost:3000/users/1");
        const data = await proj.json();
        const put = document.getElementById('cont');
        let y="";
        data.Projects.forEach(element => {
     y+=`<div>
     <h1>${element.title}</h1>
     <p>${element.description}</p>
     <p>${element.content}</p>
     <p>${element.create_date}</p>
     </div>`
    
    });
    put.innerHTML=y
    }
    catch (error){
        console.error(error)
    }
}
getprojects();



async function gettaskes() {
    try{
        const userID = 1; //edit later
        const ProjectID = 1; //edit later
        const task = await fetch(`http://localhost:3000/users/${userID}`);
        const datataske = await task.json();
        const putdom = document.getElementById('taske');
        let x="";
        datataske.Projects[ProjectID].tasks.forEach(taskeselement => {
     x+=`<div>
     <h1>${taskeselement.taskTitle}</h1>
     <p>${taskeselement.description}</p>
     <p>${taskeselement.due_date}</p>
     <p>${taskeselement.status}</p>
     <p>${taskeselement.create_date}</p>
     <div>`
    
    });
    putdom.innerHTML=x
    }
    catch (error){
        console.error(error)
    }
}
gettaskes();




