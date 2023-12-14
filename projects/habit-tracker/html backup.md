
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Habit Tracker</title>

    <link rel="stylesheet" href="./habitTracker.css">
</head>

<body>
    
    <main>

        <div class="windows">

            <div class="topWindow">
                <p>All Habits</p>
        
                <button id="searchBtn">
                    <img src="./materials/images/top-window/search.png"> <!-- Search icon -->
                    Search
                </button>
                
                <button id="dateBtn">
                    <img src="./materials/images/top-window/calendar.png"> <!-- Calendar icon -->
                    Date
                </button>
                
                <button id="sortBtn">
                    <img src="./materials/images/top-window/sort.png"> <!-- Sort icon -->
                    Sort
                </button>
                
                <button id="addHabitBtn">
                    <img src="./materials/images/top-window/plus.png"> <!-- Habit icon -->
                    Add Habit
                </button>
            </div>
    
            <div class="leftWindow">
                <!-- Some type of navigation bar -->
    
                <a href="#">
    
                    <button id="profileBtn">
                        <img src=""> <!-- Profile image -->
                        Profile
                    </button>
    
                </a>
                <br>
                <a href="#">
    
                    <button id="allHabitsBtn">
                        <img src=""> <!-- Icon -->
                        All Habits
                    </button>
    
                </a>
    
    
                <p>Preferences</p>
                <a href="#">
    
                    <button id="Manage Habits">
                        <img src=""> <!-- Icon -->
                        Manage Habits
                    </button>
    
                </a>
                <br>
                <a href="#">
    
                    <button id="Settings">
                        <img src=""> <!-- Icon -->
                        Settings
                    </button>
    
                </a>
                <br>
                <a href="#">
    
                    <button id="Resources">
                        <img src=""> <!-- Icon -->
                        Resources
                    </button>
    
                </a>
                
            </div>
    
            <div class="mainWindow">
                <!-- Shows the main content -->
                main window
            </div>
    
            <div class="rightWindow">
                <!-- Details on currently selected habit -->
                right window
            </div>
        
        </div>

    </main>

    <script src="./habitTracker.js"></script>
</body>

</html>