// Notes:
// The recurrence of the edit button being mentioned a couple of times is because without it being mentioned the button will not work.

const addTask = document.querySelectorAll(".addTask");
const todoTasks = document.querySelectorAll(".todo-tasks");

const morning = document.getElementById("js-todoTasks-morning");
const noon = document.getElementById("js-todoTasks-noon");
const afternoon = document.getElementById("js-todoTasks-afternoon");
const evening = document.getElementById("js-todoTasks-evening");

var morningTask_counter = 0;
var noonTask_counter = 0;
var afternoonTask_counter = 0;
var eveningTask_counter = 0;

function createTask(category) {

    // houses all of the individual tasks
    const task = document.createElement("div");
    task.className = "task";

    switch (category) {
        
        case "morning":

            morningTask_counter += 1;
            task.id = `morningTask-${morningTask_counter}`;
            morning.style.visibility = "visible";
            break;
        
        case "noon":

            noonTask_counter += 1;
            task.id = `noonTask-${noonTask_counter}`;
            noon.style.visibility = "visible";
            break;

        case "afternoon":

            afternoonTask_counter += 1;
            task.id = `afternoonTask-${afternoonTask_counter}`;
            afternoon.style.visibility = "visible";
            break;

        case "evening":

            eveningTask_counter += 1;
            task.id = `eveningTask-${eveningTask_counter}`;
            evening.style.visibility = "visible";
            break;

    }

    const taskLabel = document.createElement("label");
    taskLabel.className = "taskLabel";

    const taskInput = document.createElement("input");
    taskInput.type = "checkbox";
    taskInput.className = "taskInput";

    const taskText = document.createElement("span");
    taskText.className = "taskText";

    switch (category) {

        case "morning":

            taskText.innerHTML = "Morning Task";
            break;
        case "noon":

            taskText.innerHTML = "Noon Task";
            break;

        case "afternoon":

            taskText.innerHTML = "Afternoon Task";
            break;

        case "evening":

            taskText.innerHTML = "Evening Task";
            break;

    }

    // buttons

    const taskEditBtns = document.createElement("div");
    taskEditBtns.className = "taskEditBtns";

    const taskEdit = document.createElement("span");
    taskEdit.className = "taskEdit modifyTask";

    switch (category) {
        
        case "morning":
            taskEdit.id = "morningTask-" + morningTask_counter;
            break;

        case "noon":
            taskEdit.id = "noonTask-" + noonTask_counter;
            break;
        
        case "afternoon":
            taskEdit.id = "afternoonTask-" + afternoonTask_counter;
            break;

        case "evening":
            taskEdit.id = "eveningTask-" + eveningTask_counter;
            break;

    }

    const taskEditSvg = document.createElement("i");
    taskEditSvg.className = "fa-regular fa-pen-to-square";

    const taskDelete = document.createElement("span");
    taskDelete.className = "taskDelete modifyTask";

    const taskDeleteSvg = document.createElement("i");
    taskDeleteSvg.className = "fa-regular fa-trash-can";

    switch (category) {
        
        case "morning":

            morning.appendChild(task);
            break;

        case "noon":

            noon.appendChild(task);
            break;

        case "afternoon":

            afternoon.appendChild(task);
            break;

        case "evening":

            evening.appendChild(task);
            break;

    }

    task.appendChild(taskLabel);
    task.appendChild(taskEditBtns);

    taskEditBtns.appendChild(taskEdit);
    taskEditBtns.appendChild(taskDelete);
    
    taskDelete.appendChild(taskDeleteSvg);
    taskEdit.appendChild(taskEditSvg);

    taskLabel.appendChild(taskInput);
    taskLabel.appendChild(taskText);

    // This will pop up a couple of times on this code
    taskEdit.addEventListener("click", () => {
        editTask(taskEdit.id);
    })

    taskDelete.addEventListener("click", () => {
        deleteTask(task.id);
    })

}

function editTask(id) {

    const task = document.getElementById(id);
    const taskText = task.children[0].children[1];

    const previousText = taskText.innerHTML;
    const taskEditBtn = task.children[1];

    // Creates replacements and appends them
    let editTaskInput = document.createElement("input");
    editTaskInput.className = "taskEditInput";
    editTaskInput.type = "text";

    let cancelEdit = document.createElement("span");
    cancelEdit.className = "cancelEdit";

    let cancelEditSvg = document.createElement("i");
    cancelEditSvg.className = "fa-regular fa-circle-xmark";

    cancelEdit.appendChild(cancelEditSvg);
    // 

    taskText.innerHTML = "";
    editTaskInput.value = previousText;
    taskText.replaceWith(editTaskInput);
    taskEditBtn.replaceWith(cancelEdit);

    // Disables the checkbox
    task.children[0].children[0].disabled = true;

    cancelEdit.addEventListener("click", () => {
        completeTaskEdit(id, previousText, editTaskInput, cancelEdit, "cancel");
    })

    editTaskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            completeTaskEdit(id, previousText, editTaskInput, cancelEdit, "save");
        }
    })

}

function completeTaskEdit(id, previousText, editTaskInput, cancelEdit, taskEditMode) {

    const task = document.getElementById(id);

    // Revert back to default
    let revertText = document.createElement("span");
    revertText.className = "taskText";

    if (taskEditMode === "save") {
        revertText.innerHTML = editTaskInput.value;
    }
    else if (taskEditMode === "cancel") {
        revertText.innerHTML = previousText;
    }
    else {
        revertText.innerHTML = previousText;
    }

    let revertDiv = document.createElement("div");
    revertDiv.className = "taskEditBtns";

    let revertDeleteBtn = document.createElement("span");
    revertDeleteBtn.className = "taskDelete modifyTask";

    let revertDeleteBtnSvg = document.createElement("i");
    revertDeleteBtnSvg.className = "fa-regular fa-trash-can";

    let revertBtn = document.createElement("span");
    revertBtn.className = "taskEdit modifyTask";

    let revertBtnSvg = document.createElement("i");
    revertBtnSvg.className = "fa-regular fa-pen-to-square";

    // Revert back to default
    editTaskInput.replaceWith(revertText);
    cancelEdit.replaceWith(revertBtn);

    // Enables the checkbox
    task.children[0].children[0].disabled = false;

    task.appendChild(revertDiv);
    
    revertDiv.appendChild(revertBtn);
    revertBtn.appendChild(revertBtnSvg);
    
    revertDiv.appendChild(revertDeleteBtn);
    revertDeleteBtn.appendChild(revertDeleteBtnSvg);

    revertBtn.addEventListener("click", () => {
        editTask(id);
    })

    revertDeleteBtn.addEventListener("click", () => {
        deleteTask(id);
    })

}

function deleteTask(id) {

    const task = document.getElementById(id);
    task.remove();

    // hide the tasks box if all of them are deleted
    if (morning.children.length === 0) {
        morning.style.visibility = "hidden";
    }
    if (noon.children.length === 0) {

        noon.style.visibility = "hidden"; 
    }
    if (afternoon.children.length === 0) {
        afternoon.style.visibility = "hidden";
    }
    if (evening.children.length === 0) {
        evening.style.visibility =  "hidden";
    }

}

addTask.forEach((task) => {

    task.addEventListener("click", () => {

        createTask(task.id.split("-")[1]);

    })

})
