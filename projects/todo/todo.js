const addTaskBtn = document.querySelectorAll(".addTask")

const todoTasksMorning = document.querySelector("div[id=js-todoTasks-morning]");
const todoTasksNoon = document.querySelector("div[id=js-todoTasks-noon]");
const todoTasksAfternoon = document.querySelector("div[id=js-todoTasks-afternoon]");
const todoTasksEvening = document.querySelector("div[id=js-todoTasks-evening]");

var morningTasks = 0;
var noonTasks = 0;
var afternoonTasks = 0;
var eveningTasks = 0;

const addTask = {

    morning() {

        // new label
        let createLabel = document.createElement("label");
        createLabel.className = "morningTasks";
        createLabel.setAttribute("for", "morningTask-" + morningTasks);

        // new input
        let createInput = document.createElement("input");
        createInput.type = "checkbox";
        createInput.id = "morningTask-" + morningTasks;

        // new span
        let createSpan = document.createElement("span");

        // append
        todoTasksMorning.appendChild(createLabel);
        createLabel.appendChild(createInput);
        createLabel.appendChild(createSpan);

        morningTasks++

    },

    noon() {

        // new label
        let createLabel = document.createElement("label");
        createLabel.className = "noonTasks";
        createLabel.setAttribute("for", "noonTask-" + noonTasks);

        // new input
        let createInput = document.createElement("input");
        createInput.type = "checkbox";
        createInput.id = "noonTask-" + noonTasks;

        // new span
        let createSpan = document.createElement("span");

        // append
        todoTasksNoon.appendChild(createLabel);
        createLabel.appendChild(createInput);
        createLabel.appendChild(createSpan);

        noonTasks++;

    },

    afternoon() {

        // new label
        let createLabel = document.createElement("label");
        createLabel.className = "afternoonTasks";
        createLabel.setAttribute("for", "afternoonTask-" + afternoonTasks);

        // new input
        let createInput = document.createElement("input");
        createInput.type = "checkbox";
        createInput.id = "afternoonTask-" + afternoonTasks;

        // new span
        let createSpan = document.createElement("span");

        // append
        todoTasksAfternoon.appendChild(createLabel);
        createLabel.appendChild(createInput);
        createLabel.appendChild(createSpan);

        afternoonTasks++;

    },

    evening() {

        // new label
        let createLabel = document.createElement("label");
        createLabel.className = "eveningTasks";
        createLabel.setAttribute("for", "eveningTask-" + eveningTasks);

        // new input
        let createInput = document.createElement("input");
        createInput.type = "checkbox";
        createInput.id = "eveningTask-" + eveningTasks;

        // new span
        let createSpan = document.createElement("span");

        // append
        todoTasksEvening.appendChild(createLabel);
        createLabel.appendChild(createInput);
        createLabel.appendChild(createSpan);

        eveningTasks++;

    },

}

function selectCategory(category) {

    switch(category) {

        case 'addTask-morning':
            addTask.morning();
            break;
        case 'addTask-noon':
            addTask.noon();
            break;
        case 'addTask-afternoon':
            addTask.afternoon();
            break;
        case 'addTask-evening':
            addTask.evening();
            break;

    }

}

addTaskBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        selectCategory(btn.id);
    })
})