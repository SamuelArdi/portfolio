let equalPressed = 0;
let buttonInput = document.querySelectorAll("button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("delete");

window.onload = function () {

    input.value = "";

};

buttonInput.forEach(function (button) {
    
    button.addEventListener("click", function() {

        input.placeholder = "0";
        
        if (equalPressed == 0) {

            input.value += button.value;

        }
        else if (equalPressed == 1) {

            //input.value = "";
            equalPressed = 0;

        }

    })

})

equal.addEventListener("click", function() {
    
    equalPressed = 1;
    let inputValue = input.value;
    
    try {
        
        let solution = eval(inputValue);
        
        if (Number.isNaN(solution) || !Number.isFinite(solution)) {
            
            input.value = "";
            input.placeholder = "Syntax Error";

        }

        if (Number.isInteger(solution)) {
            
            input.value = solution;

        } 

        else {

            input.value = solution.toFixed(2);

        }

    }
    catch (error) {

        input.placeholder = "No Value";
        
    }

})

clear.addEventListener("click", function() {

    input.value = "";

})

erase.addEventListener("click", function() {

    input.value = input.value.substr(0, input.value.length - 1);

})