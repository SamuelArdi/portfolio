var newHabitBtn = document.getElementById("addHabit");
var editHabitBtn = document.getElementById("editDetails");
var completeHabitBtn = document.getElementById("completeHabit");
var deleteHabitBtn = document.getElementById("deleteHabit")

var editConfirmBtn = document.getElementById("confirmEdit");
var editCancelBtn = document.getElementById("cancelEdit");

var habits = document.querySelectorAll("div[class='habitTracker_main']");

var habitList = []

var currentHabitStatus;

var currentlySelectedHabit; // Number from the hn{num} string (0, 1, 2, ...)
var fullSelectedHabit; // Name of the currently selected habit (hn0, hn1, hn2, ...)

// Don't know what to do with these functions yet.
// I'll probably use it later for saving and loading habits using cookies.
window.onload = function() {
    let detailsTabParent = document.querySelector("div[class=habitTracker_details]");
    for (let i = 0; i < detailsTabParent.children.length; i++) {
        detailsTabParent.children[i].style.visibility = "hidden";
    }
}

window.closed = function() {
}

function retrieveHn() {
    // Retrieve the hn{num} from the selected habit
    try{
        let selectedHabit = document.querySelector("div[class=habit]:hover");
        let habitNumber = selectedHabit.id;

        return habitNumber;
    }
    catch (err) {
        console.error("No Habit Selected.");
    }
}

var counter = 0;
function hn(){
    let hn = "hn" + counter;
    return hn
}

function addHabit() {
    let id = hn();
    counter += 1
    
    let getClass = document.querySelector("div[class=habitTracker_main]");

    let newHabit = document.createElement("div");
    newHabit.className = "habit";
    newHabit.id = id;

    let habitName = document.createElement("p");
    habitName.className = "habitName";
    habitName.innerHTML = "Habit Name";

    let habitObj = document.createElement("p");
    habitObj.className = "habitDetail";
    habitObj.innerHTML = "";

    let habitStatus = document.createElement("p");
    habitStatus.className = "habitStatus"
    habitStatus.innerHTML = "In Progress";

    getClass.appendChild(newHabit);
    newHabit.appendChild(habitName);
    newHabit.appendChild(habitObj);
    newHabit.appendChild(habitStatus);

    habitList.push({
        [String(id)]: {
            habitName: habitName.innerHTML,
            habitObj: habitObj.innerHTML,
            habitStatus: habitStatus.innerHTML,

            streak: "0",
            // [current streak, longest streak]
            dayStreak: ["0", "0"],
            weekStreak: ["0", "0"],
            monthStreak: ["0", "0"]
        }
    })
}

function completeHabit() {
    let hn = fullSelectedHabit;
    let hnClass = document.getElementById(hn);

    if (hnClass.children[2].innerHTML === "In Progress") {
        hnClass.children[0].style.color = "green";
    
        hnClass.children[2].style.color = "#0C6400";
        hnClass.children[2].style.fontWeight = "bold";
        hnClass.children[2].innerHTML = "Completed ✓";
    
        let d = new Date();
        let date = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    
        let dateAndTime = date + "/" + month + "/" + year + " " + time;
        
        hnClass.children[1].style.color = "green";
        hnClass.children[1].innerHTML = dateAndTime;
    
        completeHabitBtn.innerHTML = "Uncomplete Habit";
        completeHabitBtn.style.color = "#B60000";
        completeHabitBtn.style.borderColor = "#B60000";
    }
}

function removeHabit() {
    let habitSelected = currentlySelectedHabit;

    let allHn = [];
    let newHnValue = [];
    
    // Retrieves index numbers
    // Separates the numbers
    // Replaces the keys
    if (habitSelected === undefined) {
        console.log("A habit has not been chosen");
    }
    else {
        habitList.splice(habitSelected, 1);
        
        for (let i = 0; i < habitList.length; i++) {
            let hn = habitList[i];
            let hnNum = Object.keys(hn)[0];
    
            // These lines of code retrieve the index numbers
            let index = habitList.map(obj => Object.keys(obj)[0]).indexOf(hnNum);
            allHn.push(index);
            //
            
            // These lines of code separates the hn from the numbers
            // And adds them to the list
            let separated = hnNum.slice(0, 2);
            newHnValue.push(separated + allHn[i]);    
            //
    
            // Replaces the keys with the new and updated keys
            habitList[i] = {[newHnValue[i]]: habitList[i][hnNum]}
            //
        }
    }

    // Removes the selected habit from the details tab
    let detailsTabParent = document.querySelector("div[class=habitTracker_details]");
    for (let i = 0; i < detailsTabParent.children.length; i++) {
        detailsTabParent.children[i].style.visibility = "hidden";
    }

    // Removes the selected habit from the main page
    let ele = document.getElementById(fullSelectedHabit);
    ele.parentElement.removeChild(ele);

    let parent = document.querySelector("div[class=habitTracker_main]");
    for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].id = newHnValue[i];
    }

    counter -= 1; // fixes the counter
}

function addToDetailTab(hn, hnNum) {

    // Makes the details tab visible on click
    let detailsTabParent = document.querySelector("div[class=habitTracker_details]");
    for (let i = 0; i < detailsTabParent.children.length; i++) {
        detailsTabParent.children[i].style.visibility = "visible";
    }
    
    // Add habit information to the details tab
    var detailName = document.getElementById("detailName");
    var streak = document.getElementById("streak");

    let dayStreak_current = document.getElementById("dayStreak_current");
    let dayStreak_longest = document.getElementById("dayStreak_longest");

    let weekStreak_current = document.getElementById("weekStreak_current");
    let weekStreak_longest = document.getElementById("weekStreak_longest");
    let monthStreak_current = document.getElementById("monthStreak_current");    
    let monthStreak_longest = document.getElementById("monthStreak_longest");


    detailName.innerHTML = habitList[hnNum][hn].habitName;
    streak.innerHTML = habitList[hnNum][hn].streak;

    dayStreak_current.innerHTML = habitList[hnNum][hn].dayStreak[0];
    dayStreak_longest.innerHTML = habitList[hnNum][hn].dayStreak[1];

    weekStreak_current.innerHTML = habitList[hnNum][hn].weekStreak[0];
    weekStreak_longest.innerHTML = habitList[hnNum][hn].weekStreak[1];

    monthStreak_current.innerHTML = habitList[hnNum][hn].monthStreak[0];
    monthStreak_longest.innerHTML = habitList[hnNum][hn].monthStreak[1];

    currentlySelectedHabit = hnNum; // index
    fullSelectedHabit = hn; // string

    // Checks to see if the buttons on the bottom have overflown
    let detailsParent = document.querySelector("div[class=habitTracker_details]");

    let detailsBottomParent = document.querySelector("div[class=details_Bottom]");
    let detailsBottomMarginTop = window.getComputedStyle(detailsBottomParent).marginTop;
    let marginTop = Number(detailsBottomMarginTop.substring(0, detailsBottomMarginTop.length - 2));

    // current px 145.694\
    if (detailsParent.scrollHeight == detailsParent.clientHeight) {
        marginTop += 20.694;

        detailsBottomParent.style.marginTop = marginTop + "px";
    }

    if (detailsParent.scrollHeight > detailsParent.clientHeight) {
        marginTop -= 20.694;

        detailsBottomParent.style.marginTop = marginTop + "px";
    }

    let habitStatus = document.getElementById(hn).children[2].innerHTML;
    if (habitStatus === "Completed ✓") {
        completeHabitBtn.innerHTML = "Incomplete Habit";
        completeHabitBtn.style.color = "#9C0000";
        completeHabitBtn.style.borderColor = "#9C0000";

        currentHabitStatus = "completed";
    }
    else if (habitStatus === "In Progress") {
        completeHabitBtn.innerHTML = "Complete Habit";
        completeHabitBtn.style.color = "green";
        completeHabitBtn.style.borderColor = "green";

        currentHabitStatus = "incomplete";
    }
}

var previousHabitName;
var previousStreak;

var previousDayStreak_current;
var previousDayStreak_longest;

var previousWeekStreak_current;
var previousWeekStreak_longest;

var previousMonthStreak_current;
var previousMonthStreak_longest;
function editHabit() {

    let hn = fullSelectedHabit;
    let hnNum = currentlySelectedHabit;

    // Makes the edit confirmation buttons visible
    let editConfirmationClass = document.querySelector("div[class=editConfirmation]");
    for (let i = 0; i < editConfirmationClass.children.length; i++) {
        editConfirmationClass.children[i].style.visibility = "visible";
    }

    // Retrieve the id of the old elements in the details tab
    let oldHabitName = document.getElementById("detailName");
    let oldStreak = document.getElementById("streak");

    let oldDayStreak_current = document.getElementById("dayStreak_current");
    let oldDayStreak_longest = document.getElementById("dayStreak_longest");

    let oldWeekStreak_current = document.getElementById("weekStreak_current");
    let oldWeekStreak_longest = document.getElementById("weekStreak_longest");

    let oldMonthStreak_current = document.getElementById("monthStreak_current");
    let oldMonthStreak_longest = document.getElementById("monthStreak_longest");

    previousHabitName = oldHabitName.innerHTML;
    previousStreak = oldStreak.innerHTML;

    previousDayStreak_current = oldDayStreak_current.innerHTML;
    previousDayStreak_longest = oldDayStreak_longest.innerHTML;

    previousWeekStreak_current = oldWeekStreak_current.innerHTML;
    previousWeekStreak_longest = oldWeekStreak_longest.innerHTML;

    previousMonthStreak_current = oldMonthStreak_current.innerHTML;
    previousMonthStreak_longest = oldMonthStreak_longest.innerHTML;

    // Replaces the elements with a textbox to make edits possible
    let newHabitName = document.createElement("input");
    newHabitName.type = "text";
    newHabitName.id = "editHabitName";
    newHabitName.placeholder = habitList[hnNum][hn].habitName;

    let newStreak = document.createElement("input");
    newStreak.type = "text";
    newStreak.id = "editStreak";
    newStreak.placeholder = habitList[hnNum][hn].streak;
    
    let newDayStreak_current = document.createElement("input");
    newDayStreak_current.type = "text";
    newDayStreak_current.id = "editDayStreak_current";
    newDayStreak_current.className = "editDayStreak";
    newDayStreak_current.placeholder = habitList[hnNum][hn].dayStreak[0];

    let newDayStreak_longest = document.createElement("input");
    newDayStreak_longest.type = "text";
    newDayStreak_longest.id = "editDayStreak_longest";
    newDayStreak_longest.className = "editDayStreak";
    newDayStreak_longest.placeholder = habitList[hnNum][hn].dayStreak[1];

    let newWeekStreak_current = document.createElement("input");
    newWeekStreak_current.type = "text";
    newWeekStreak_current.id = "editWeekStreak_current";
    newWeekStreak_current.className = "editWeekStreak";
    newWeekStreak_current.placeholder = habitList[hnNum][hn].weekStreak[0];

    let newWeekStreak_longest = document.createElement("input");
    newWeekStreak_longest.type = "text";
    newWeekStreak_longest.id = "editWeekStreak_longest";
    newWeekStreak_longest.className = "editWeekStreak";
    newWeekStreak_longest.placeholder = habitList[hnNum][hn].weekStreak[1];

    let newMonthStreak_current = document.createElement("input");
    newMonthStreak_current.type = "text";
    newMonthStreak_current.id = "editMonthStreak_current";
    newMonthStreak_current.className = "editMonthStreak";
    newMonthStreak_current.placeholder = habitList[hnNum][hn].monthStreak[0];

    let newMonthStreak_longest = document.createElement("input");
    newMonthStreak_longest.type = "text";
    newMonthStreak_longest.id = "editMonthStreak_longest";
    newMonthStreak_longest.className = "editMonthStreak";
    newMonthStreak_longest.placeholder = habitList[hnNum][hn].monthStreak[1];

    oldHabitName.replaceWith(newHabitName);
    oldStreak.replaceWith(newStreak);

    oldDayStreak_current.replaceWith(newDayStreak_current);
    oldDayStreak_longest.replaceWith(newDayStreak_longest);

    oldWeekStreak_current.replaceWith(newWeekStreak_current);
    oldWeekStreak_longest.replaceWith(newWeekStreak_longest);

    oldMonthStreak_current.replaceWith(newMonthStreak_current);
    oldMonthStreak_longest.replaceWith(newMonthStreak_longest);

    // Fixes the details tab placement of elements
    let detailsMiddleLabels = document.querySelector("div[class=details_Middle_Labels]");
    detailsMiddleLabels.style.marginTop = "10%";

    let detailsBottomParent = document.querySelector("div[class=details_Bottom]");
    detailsBottomParent.style.marginTop = "41.15%";

    let streakIcon = document.getElementById("streakIcon");
    streakIcon.style.marginTop = "5px";
    //
}

function editCancel() {
    let dayStreakClass = document.getElementsByClassName("editDayStreak");
    let weekStreakClass = document.getElementsByClassName("editWeekStreak");
    let monthStreakClass = document.getElementsByClassName("editMonthStreak");

    let editHabitName = document.getElementById("editHabitName");
    let editStreak = document.getElementById("editStreak");

    for (let i = 0; i < dayStreakClass.length; i++) {
        dayStreakClass[i].style.visibility = "hidden";
        dayStreakClass[i].style.display = "none";
        for (let j = 0; j < weekStreakClass.length; j++) {
            weekStreakClass[j].style.visibility = "hidden";
            weekStreakClass[j].style.display = "none";
            for (let k = 0; k < monthStreakClass.length; k++) {
                monthStreakClass[k].style.visibility = "hidden";
                monthStreakClass[k].style.display = "none";
            }
        }
    }

    editHabitName.style.visibility = "hidden";
    editStreak.style.visibility = "hidden";

    editCancelBtn.style.visibility = "hidden";
    editConfirmBtn.style.visibility = "hidden";

    let newHabitName = document.getElementById("editHabitName");
    let newStreak = document.getElementById("editStreak");

    let newDayStreak_current = document.getElementById("editDayStreak_current");
    let newDayStreak_longest = document.getElementById("editDayStreak_longest");

    let newWeekStreak_current = document.getElementById("editWeekStreak_current");
    let newWeekStreak_longest = document.getElementById("editWeekStreak_longest");

    let newMonthStreak_current = document.getElementById("editMonthStreak_current");
    let newMonthStreak_longest = document.getElementById("editMonthStreak_longest");

    // Creates the new elements
    let detailName = document.createElement("h2");
    detailName.id = "detailName";

    let streak = document.createElement("p");
    streak.id = "streak";

    let dayStreak_current = document.createElement("h3");
    dayStreak_current.id = "dayStreak_current";
    dayStreak_current.className = "dayStreak_Stats";

    let dayStreak_longest = document.createElement("h3");
    dayStreak_longest.id = "dayStreak_longest";
    dayStreak_longest.className = "dayStreak_Stats";

    let weekStreak_current = document.createElement("h3");
    weekStreak_current.id = "weekStreak_current";
    weekStreak_current.className = "weekStreak_Stats";

    let weekStreak_longest = document.createElement("h3");
    weekStreak_longest.id = "weekStreak_longest";
    weekStreak_longest.className = "weekStreak_Stats";

    let monthStreak_current = document.createElement("h3");
    monthStreak_current.id = "monthStreak_current";
    monthStreak_current.className = "monthStreak_Stats";

    let monthStreak_longest = document.createElement("h3");
    monthStreak_longest.id = "monthStreak_longest";
    monthStreak_longest.className = "monthStreak_Stats";

    // Assign the previous values to the new elements
    let hn = fullSelectedHabit;
    let hnNum = currentlySelectedHabit

    detailName.innerHTML = habitList[hnNum][hn].habitName;
    streak.innerHTML = habitList[hnNum][hn].streak;

    dayStreak_current.innerHTML = habitList[hnNum][hn].dayStreak[0];
    dayStreak_longest.innerHTML = habitList[hnNum][hn].dayStreak[1];

    weekStreak_current.innerHTML = habitList[hnNum][hn].weekStreak[0];
    weekStreak_longest.innerHTML = habitList[hnNum][hn].weekStreak[1];

    monthStreak_current.innerHTML = habitList[hnNum][hn].monthStreak[0];
    monthStreak_longest.innerHTML = habitList[hnNum][hn].monthStreak[1];
    
    // Replaces the elements with the new ones
    newHabitName.replaceWith(detailName);
    newStreak.replaceWith(streak);

    newDayStreak_current.replaceWith(dayStreak_current);
    newDayStreak_longest.replaceWith(dayStreak_longest);

    newWeekStreak_current.replaceWith(weekStreak_current);
    newWeekStreak_longest.replaceWith(weekStreak_longest);

    newMonthStreak_current.replaceWith(monthStreak_current);
    newMonthStreak_longest.replaceWith(monthStreak_longest);

    // Fixing the placements of the buttons
    let detailsMiddleLabels = document.querySelector("div[class=details_Middle_Labels]");
    detailsMiddleLabels.style.marginTop = "0%";

    let detailsBottomParent = document.querySelector("div[class=details_Bottom]");
    detailsBottomParent.style.marginTop = "40%";

    let streakIcon = document.getElementById("streakIcon");
    streakIcon.style.marginTop = "-5px";

    let detailsParent = document.querySelector("div[class=habitTracker_details]");
    let detailsBottomMarginTop = window.getComputedStyle(detailsBottomParent).marginTop;
    let marginTop = Number(detailsBottomMarginTop.substring(0, detailsBottomMarginTop.length - 2));

    if (detailsParent.scrollHeight == detailsParent.clientHeight) {
        marginTop += 20.694;

        detailsBottomParent.style.marginTop = marginTop + "px";
    }

    if (detailsParent.scrollHeight > detailsParent.clientHeight) {
        marginTop -= 20.694;

        detailsBottomParent.style.marginTop = marginTop + "px";
    }
}

function editConfirm() {
    let addedHabitName = document.getElementById("editHabitName").value;
    let addedStreak = document.getElementById("editStreak").value;

    let addedDayStreak_current = document.getElementById("editDayStreak_current").value;
    let addedDayStreak_longest = document.getElementById("editDayStreak_longest").value;

    let addedWeekStreak_current = document.getElementById("editWeekStreak_current").value;
    let addedWeekStreak_longest = document.getElementById("editWeekStreak_longest").value;

    let addedMonthStreak_current = document.getElementById("editMonthStreak_current").value;
    let addedMonthStreak_longest = document.getElementById("editMonthStreak_longest").value;

    let hn = fullSelectedHabit;
    let hnNum = currentlySelectedHabit;

    // Converts the strings into numbers
    addedStreak = Number(addedStreak);
    
    addedDayStreak_current = Number(addedDayStreak_current);
    addedDayStreak_longest = Number(addedDayStreak_longest);

    addedWeekStreak_current = Number(addedWeekStreak_current);
    addedWeekStreak_longest = Number(addedWeekStreak_longest);

    addedMonthStreak_current = Number(addedMonthStreak_current);
    addedMonthStreak_longest = Number(addedMonthStreak_longest);

    // Checks to see if the new values are valid
    let habitNameIsEmtpy = false;
    let inputIsInvalid = false;

    if (Number.isNaN(addedStreak) === true || Number.isNaN(addedDayStreak_current) === true || Number.isNaN(addedDayStreak_longest) === true || Number.isNaN(addedWeekStreak_current) === true || Number.isNaN(addedWeekStreak_longest) === true || Number.isNaN(addedMonthStreak_current) === true || Number.isNaN(addedMonthStreak_longest) === true) {
        // This addedHabitName variable is here for when the input is invalid
        // As a fail-safe when it does happen
        addedHabitName = previousHabitName;

        addedStreak = previousStreak;

        addedDayStreak_current = previousDayStreak_current;
        addedDayStreak_longest = previousDayStreak_longest;

        addedWeekStreak_current = previousWeekStreak_current;
        addedWeekStreak_longest = previousWeekStreak_longest;

        addedMonthStreak_current = previousMonthStreak_current;
        addedMonthStreak_longest = previousMonthStreak_longest;

        inputIsInvalid = true;
    }
    else if (addedHabitName === "") {
        addedHabitName = previousHabitName;
        habitNameIsEmtpy = true;
    }

    if (inputIsInvalid === true) {
        alert("Invalid input. Please input a number.");
    } 
    else if (habitNameIsEmtpy === false || habitNameIsEmtpy === true) {
        // Updates the values
        habitList[hnNum][hn].habitName = addedHabitName;
        habitList[hnNum][hn].streak = addedStreak;

        habitList[hnNum][hn].dayStreak[0] = addedDayStreak_current;
        habitList[hnNum][hn].dayStreak[1] = addedDayStreak_longest;

        habitList[hnNum][hn].weekStreak[0] = addedWeekStreak_current;
        habitList[hnNum][hn].weekStreak[1] = addedWeekStreak_longest;

        habitList[hnNum][hn].monthStreak[0] = addedMonthStreak_current;
        habitList[hnNum][hn].monthStreak[1] = addedMonthStreak_longest;

        /**
         * Current order of index in the html habit div in ID name:
         * 0. habitName
         * 1. habitDetail
         * 2. habitStatus 
        */
        
        let habitName = document.querySelector(`div[id=${hn}]`);
        habitName.children[0].innerHTML = addedHabitName;

        // This is copied over from the editCancel function
        let dayStreakClass = document.getElementsByClassName("editDayStreak");
        let weekStreakClass = document.getElementsByClassName("editWeekStreak");
        let monthStreakClass = document.getElementsByClassName("editMonthStreak");

        let editHabitName = document.getElementById("editHabitName");
        let editStreak = document.getElementById("editStreak");

        for (let i = 0; i < dayStreakClass.length; i++) {
            dayStreakClass[i].style.visibility = "hidden";
            dayStreakClass[i].style.display = "none";
            for (let j = 0; j < weekStreakClass.length; j++) {
                weekStreakClass[j].style.visibility = "hidden";
                weekStreakClass[j].style.display = "none";
                for (let k = 0; k < monthStreakClass.length; k++) {
                    monthStreakClass[k].style.visibility = "hidden";
                    monthStreakClass[k].style.display = "none";
                }
            }
        }

        editHabitName.style.visibility = "hidden";
        editStreak.style.visibility = "hidden";

        editCancelBtn.style.visibility = "hidden";
        editConfirmBtn.style.visibility = "hidden";

        let newHabitName = document.getElementById("editHabitName");
        let newStreak = document.getElementById("editStreak");

        let newDayStreak_current = document.getElementById("editDayStreak_current");
        let newDayStreak_longest = document.getElementById("editDayStreak_longest");

        let newWeekStreak_current = document.getElementById("editWeekStreak_current");
        let newWeekStreak_longest = document.getElementById("editWeekStreak_longest");

        let newMonthStreak_current = document.getElementById("editMonthStreak_current");
        let newMonthStreak_longest = document.getElementById("editMonthStreak_longest");

        // Creates the new elements
        let detailName = document.createElement("h2");
        detailName.id = "detailName";

        let streak = document.createElement("p");
        streak.id = "streak";

        let dayStreak_current = document.createElement("h3");
        dayStreak_current.id = "dayStreak_current";
        dayStreak_current.className = "dayStreak_Stats";

        let dayStreak_longest = document.createElement("h3");
        dayStreak_longest.id = "dayStreak_longest";
        dayStreak_longest.className = "dayStreak_Stats";

        let weekStreak_current = document.createElement("h3");
        weekStreak_current.id = "weekStreak_current";
        weekStreak_current.className = "weekStreak_Stats";

        let weekStreak_longest = document.createElement("h3");
        weekStreak_longest.id = "weekStreak_longest";
        weekStreak_longest.className = "weekStreak_Stats";

        let monthStreak_current = document.createElement("h3");
        monthStreak_current.id = "monthStreak_current";
        monthStreak_current.className = "monthStreak_Stats";

        let monthStreak_longest = document.createElement("h3");
        monthStreak_longest.id = "monthStreak_longest";
        monthStreak_longest.className = "monthStreak_Stats";

        // Assign the previous values to the new elements
        detailName.innerHTML = habitList[hnNum][hn].habitName;
        streak.innerHTML = habitList[hnNum][hn].streak;

        dayStreak_current.innerHTML = habitList[hnNum][hn].dayStreak[0];
        dayStreak_longest.innerHTML = habitList[hnNum][hn].dayStreak[1];

        weekStreak_current.innerHTML = habitList[hnNum][hn].weekStreak[0];
        weekStreak_longest.innerHTML = habitList[hnNum][hn].weekStreak[1];

        monthStreak_current.innerHTML = habitList[hnNum][hn].monthStreak[0];
        monthStreak_longest.innerHTML = habitList[hnNum][hn].monthStreak[1];

        // Replaces the elements with the new ones
        newHabitName.replaceWith(detailName);
        newStreak.replaceWith(streak);

        newDayStreak_current.replaceWith(dayStreak_current);
        newDayStreak_longest.replaceWith(dayStreak_longest);

        newWeekStreak_current.replaceWith(weekStreak_current);
        newWeekStreak_longest.replaceWith(weekStreak_longest);

        newMonthStreak_current.replaceWith(monthStreak_current);
        newMonthStreak_longest.replaceWith(monthStreak_longest);

        // Fixing the placements of the buttons
        let detailsMiddleLabels = document.querySelector("div[class=details_Middle_Labels]");
        detailsMiddleLabels.style.marginTop = "0%";

        let detailsBottomParent = document.querySelector("div[class=details_Bottom]");
        detailsBottomParent.style.marginTop = "40%";

        let streakIcon = document.getElementById("streakIcon");
        streakIcon.style.marginTop = "-5px";
    }

    // Checks to see if the buttons on the bottom have overflown
    let detailsParent = document.querySelector("div[class=habitTracker_details]");

    let detailsBottomParent = document.querySelector("div[class=details_Bottom]");
    let detailsBottomMarginTop = window.getComputedStyle(detailsBottomParent).marginTop;
    let marginTop = Number(detailsBottomMarginTop.substring(0, detailsBottomMarginTop.length - 2));

    // current px 145.694
    if (detailsParent.scrollHeight == detailsParent.clientHeight) {
        marginTop += 20.694;

        detailsBottomParent.style.marginTop = marginTop + "px";
    }

    if (detailsParent.scrollHeight > detailsParent.clientHeight) {
        marginTop -= 20.694;

        detailsBottomParent.style.marginTop = marginTop + "px";
    }
}



// Adds a new habit
newHabitBtn.onclick = addHabit;

// Shows habit details
habits.forEach(div => {
    div.addEventListener("click", function() {
        try {
            let hn = retrieveHn();
            let hnNum = hn.split("n")[1];
    
            addToDetailTab(hn, hnNum)
        } catch (err) {
            return;
        }
    })
})

// Edit habit details
editHabitBtn.onclick = editHabit;

// Sets the habit status to complete
completeHabitBtn.onclick = function() {
    let hn = fullSelectedHabit;
    let hnClass = document.getElementById(hn);

    if (currentHabitStatus == "completed") {
        completeHabitBtn.innerHTML = "Complete Habit";
        completeHabitBtn.style.color = "green";
        completeHabitBtn.style.borderColor = "green";
    }
    else if (currentHabitStatus == "incomplete") {
        hnClass.children[2].innerHTML = "In Progress";

        completeHabit();
    }
}

// Delete habit
deleteHabitBtn.onclick = removeHabit;

// Edit habit
editCancelBtn.onclick = editCancel;
editConfirmBtn.onclick = editConfirm;