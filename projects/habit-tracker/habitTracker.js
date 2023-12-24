var newHabitBtn = document.getElementById("addHabit");
var habits = document.querySelectorAll("div[class='habitTracker_main']")


var editHabitBtn = document.getElementById("editDetails");

var habitList = []

window.onload = function() {
}

function retrieveHn() {
    // Retrieve the hn{num} from the selected habit
    try{
        let selectedHabit = document.querySelector("div[class=habit]:hover");
        let habitNumber = selectedHabit.id;

        return habitNumber;
    }
    catch (err) {
        console.error("false error");
    }
}

var counter = 0;
function addHabit() {
    let id = "hn" + counter;
    counter += 1;
    
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

}

newHabitBtn.onclick = addHabit;

habits.forEach(div => {
    div.addEventListener("click", function() {
        let hn = retrieveHn();
        let hnNum = hn.split("n")[1];

        addToDetailTab(hn, hnNum)
    })
})

editHabitBtn.addEventListener("click", function() {

})