

let tasks = [{
  id:crypto.randomUUID(),
  task: "go to gym",
  completed: false,
}
];


function printTasks() {
  const tasksList = document.getElementById("tasksList");

  tasksList.innerHTML = "";
let filteredTasks = tasks;
if (currentFilter === "active"){
  filteredTasks = tasks.filter ((t) => !t.completed);
}
if (currentFilter === "completed"){
  filteredTasks = tasks.filter ((t)=> t.completed)
}
const activeTaskd = tasks.filter((t)=>
!t.completed )
const activeCount = activeTaskd.length
const finishTasks = tasks.filter((t)=> 
t.completed)
const finishCount = finishTasks.length
const counter = document.getElementById("taskCount")
counter.innerText = "active " + activeCount + " | Done " + finishCount

const allBtn = document.getElementById("allBtn")
const activeBtn = document.getElementById("activeBtn")
const completedBtn = document.getElementById("completedBtn")

//מנקה את כולם
allBtn.classList.remove("active")
activeBtn.classList.remove("active")
completedBtn.classList.remove("active")
//מדגיש לפי בחירה
if (currentFilter === "all"){
  allBtn.classList.add ("active")
}
if (currentFilter === "active"){
  activeBtn.classList.add("active")
}
if(currentFilter === "completed"){
  completedBtn.classList.add("active")
}
  filteredTasks.forEach((t) => {
    const div = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.onclick = function () {
  deleteTask(t.id);
  printTasks();
};
    const editButton = document.createElement("button");
    editButton.onclick = function () {
  editTask(t.id);
};
    const p = document.createElement("p");
    const li = document.createElement("li");
    const cheakBox = document.createElement("input")
    cheakBox.type = "checkbox"
    cheakBox.checked = t.completed
    cheakBox.onchange = function (){
      toggleTask(t.id)
    }
    //insert to the div
   
    div.appendChild(deleteButton);
    div.appendChild(editButton);
        div.appendChild(p);
         div.appendChild(cheakBox);
    li.appendChild(div);
    tasksList.appendChild(li);
   


div.style.display = "flex"
div.style.justifyContent = "flex-start";
div.style.gap = "10px"
div.style.alignItems = "center"
    //handle the buttons
    deleteButton.innerText = "DELETE";
    editButton.innerText = "EDIT";
    deleteButton.classList.add ("delete-btn")
      editButton.classList.add("edit-btn")
    
    p.innerText = t.task;

    if (t.completed === true){
       p.style.textDecoration = "line-through"
    }
  });

}

function addNewTask(taskName) {
  tasks.push({
    id: crypto.randomUUID(),
    task: taskName,
    completed: false
  });
 saveTasksInLocalStorage()
}


function deleteTask(taskId){
tasks = tasks.filter((t) => t.id !== taskId)
 saveTasksInLocalStorage()
}

function editTask(taskId){
 const taskToEdit = tasks.find((t)=> t.id === taskId)
  deleteTask(taskId)
   saveTasksInLocalStorage()
  const input = document.getElementById("taskInput")
  input.value = taskToEdit.task;
}

const addButton = document.getElementById("addButton")
    const input = document.getElementById("taskInput")

    function handleAddTask (){
      if (input.value === ""){
  return
}  
   addNewTask(input.value)
     currentFilter = "all"
     input.value = "";
     printTasks()

    }
input.addEventListener("keydown", (event)=> {
  if (event.key === "Enter"){
handleAddTask()
  }
})
  addButton.addEventListener("click" , handleAddTask
  
  )

function saveTasksInLocalStorage(){
    localStorage.setItem("storedTask" , JSON.stringify(tasks))
}

function restoreTasksFromLocalStorge (){
    const storedTask = localStorage.getItem("storedTask")
    if(storedTask){
    tasks = JSON.parse(storedTask)
    }
    printTasks()

}
function toggleTask (taskId){
let task = tasks.find((t)=> 
   t.id === taskId)
if (!task) return
  task.completed = !task.completed
   saveTasksInLocalStorage()
  printTasks()
}

let currentFilter ="all"

function setFilter (filter){
  currentFilter = filter
  printTasks()
}

function clearCompletedTasks(){
tasks = tasks.filter((t) => !t.completed)
saveTasksInLocalStorage()
  printTasks()
}
const clearBtn = document.getElementById("clearCompleted")
clearBtn.addEventListener("click", ()=>{
  clearCompletedTasks()
})


printTasks()
restoreTasksFromLocalStorge()