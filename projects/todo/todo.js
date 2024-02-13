// Notes:
// The recurrence of the edit button being mentioned a couple of times is because without it being mentioned the button will not work.

const addTask = document.querySelectorAll(".addTask");
const todoTasks = document.querySelectorAll(".todo-tasks");

const undoChangesClass = document.querySelector(".undoChanges");
const undoChanges = document.querySelectorAll(".undo");

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
    task.style.visibility = "visible";

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
    cancelEditSvg.className = "fa-solid fa-xmark";

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

    // decreases the counter
    // reminder for future me:
    //   If this method doesn't work out that well,
    //   you can also reset the counter instead of decreasing it,
    //   and set it to 0 whenever there are not tasks.

    let index = id.indexOf("-");
    let category = id.slice(0, index);

    switch (category) {
        
        case "morningTask":
            morningTask_counter -= 1;
            break;
        case "noonTask":
            noonTask_counter -= 1;
            break;
        case "afternoonTask":
            afternoonTask_counter -= 1;
            break;
        case "eveningTask":
            eveningTask_counter -= 1;
            break;

    }

    const task = document.getElementById(id);
    let backupTask = task;
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

    undoConfirmation(id, backupTask);

}

async function undoConfirmation(id, backupTask) {

    const undoClass = document.createElement("div");
    undoClass.className = "undo";
    undoClass.dataset.removedTask = id;

    const textReminder = document.createElement("p");
    textReminder.innerHTML = "You have removed a task";
    
    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = "undo?";

    const cancelUndo = document.createElement("span");
    cancelUndo.className = "cancelUndo";

    const cancelUndoSvg = document.createElement("i");
    cancelUndoSvg.className = "fa-solid fa-xmark";

    undoChangesClass.appendChild(undoClass);
    undoClass.appendChild(textReminder);
    undoClass.appendChild(undoBtn);
    undoClass.appendChild(cancelUndo);
    cancelUndo.appendChild(cancelUndoSvg);

    undoBtn.addEventListener("click", () => {
        Undos.undoChange(backupTask, undoClass.dataset.removedTask, undoClass);
    })

    cancelUndo.addEventListener("click", () => {
        Undos.cancelUndo(undoClass);
    })

    await new Promise((resolve, reject) => {

        setTimeout(() => {
           undoClass.remove(); 
        }, 5500);

    })

}

const Undos = {

    cancelUndo(undoClass) {


        undoClass.remove();

    },

    undoChange(backupTask, dataset, undoClass) {

        let index = dataset.indexOf("-");
        let category = dataset.slice(0, index);

        switch (category) {

            case "morningTask":
                morning.appendChild(backupTask);
                undoClass.remove();
                if (morning.children.length >= 0) {morning.style.visibility = "visible"};
                break;
            case "noonTask":
                noon.appendChild(backupTask);
                undoClass.remove();
                if(noon.children.length >= 0)  {noon.style.visibility = "visible"};
                break;
            case "afternoonTask":
                afternoon.appendChild(backupTask);
                undoClass.remove();
                if(afternoon.children.length >= 0)  {afternoon.style.visibility = "visible"};
                break;
            case "eveningTask":
                evening.appendChild(backupTask);
                undoClass.remove();
                if(evening.children.length >= 0)  {evening.style.visibility = "visible"};
                break;

        }

    }

}

addTask.forEach((task) => {

    task.addEventListener("click", () => {

        createTask(task.id.split("-")[1]);

    })

})
