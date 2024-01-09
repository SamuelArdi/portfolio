var newHabitBtn = document.getElementById("addHabit");
var editHabitBtn = document.getElementById("editDetails");
var deleteHabitBtn = document.getElementById("deleteHabit")

var habits = document.querySelectorAll("div[class='habitTracker_main']");

var habitList = []

var currentlySelectedHabit; // Index of the currently selected habit in the list

// Don't know what to do with these on load and closed functions yet,
// I'll probably use it later for saving and loading habits using cookies.
window.onload = function() {
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

    let moreVert = document.createElement("span");
    moreVert.className = "material-symbols-outlined moreVert";
    moreVert.innerHTML = "more_vert";

    getClass.appendChild(newHabit);
    newHabit.appendChild(habitName);
    newHabit.appendChild(habitObj);
    newHabit.appendChild(habitStatus);
    newHabit.appendChild(moreVert);

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

function removeHabit() {
    // to-do:
    // [X] remove the habit from the list
    // [] remove the habit from the details tab
    // [] remove the habit from the main page

    habitList.splice(currentlySelectedHabit, 1);

    // Removing the value/item from the habitList
        // retrieve the index numbers from the list of habitlist
        // separate the number from the hn
        // convert the number into an integer
        // var num;
        // replace the num variables with the index numbers from the habitList 

    let allHn = [];
    let newHnValue = [];

    // Retrieves index numbers
    // Separates the numbers
    // Replaces the keys
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

    // Removes the selected habit from the details tab
        // This will be added later when all of the other features of deletion is implemented
    //

    // Removes the selected habit from the main page
        
        // retrieve the class id from the selected habit
        // remove the selected habit from the main page
        // remove all of it's children and remove the div from the main page if the step above doesn't work

     
}

function addToDetailTab(hn, hnNum) {
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

    currentlySelectedHabit = hnNum;
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
editHabitBtn.addEventListener("click", function() {
    console.log(habitList)
})

// Delete habit
deleteHabitBtn.onclick = removeHabit;