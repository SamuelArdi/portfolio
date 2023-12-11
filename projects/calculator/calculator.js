let equalPressed = 0;
let clearPressed = 0;
let error = false;

let buttonInput = document.querySelectorAll("button");
let display = document.getElementsByClassName("display")

let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("delete");

let currentInputSize = 72;
currentInputSize = Number(currentInputSize);

window.onload = function () {

    input.value = "";
    input.style.fontSize = "72px";

};

buttonInput.forEach(function (button) {
    
    button.addEventListener("click", function() {

        input.placeholder = "0";
        error = false;

        if (error == false) {
        
            input.style.fontSize = `${currentInputSize}px`;

        }

        input.value += button.value;
        
        if (input.scrollWidth > input.clientWidth) {
            
            currentInputSize -= 6;
            
            input.style.fontSize = `${currentInputSize}px`;
            
            console.log("decreased: " + currentInputSize);
            
        }
        
        if (currentInputSize <= 36) {

            currentInputSize = 36;

            input.style.fontSize = "36px";

        }

        if (clearPressed == 1) {

            clearPressed = 0;
            currentInputSize = 72;

            input.style.fontSize = "72px";

        }

        if (currentInputSize <= 36 && equalPressed == 0) {
            
            input.value = input.value.substr(0, input.value.length - 1);

        }
        
        if (equalPressed == 1) {
        
            equalPressed = 0;
        
        }

    })

})

equal.addEventListener("click", function() {
    
    equalPressed = 1;
    
    try {

        let result = eval(input.value);

        if (!Number.isFinite(result)) {
            
            input.value = "";
            input.placeholder = "Invalid Expression";

        }
        
        if (typeof result === "number") {
        
            input.value = result;

        }
        else {

            input.value = "";
            input.placeholder = "Syntax Error";

        }

    }
    catch (error) {
        
        error = true;

        if (input.value === "77.77(77.77)") {

            input.style.fontSize = "24.3px";
            
            input.value = "";
            input.placeholder = "How the fuck did you manage to find this";
    
        }
        else{

            input.value = "";
            input.placeholder = "Syntax Error";

        }
        
    }


})

clear.addEventListener("click", function() {

    clearPressed = 1;

    input.style.fontSize = "72px";
    input.value = "";

})

erase.addEventListener("click", function() {

    if (input.scrollWidth == input.clientWidth) {
    
        currentInputSize += 6;

        input.style.fontSize = `${currentInputSize}px`;

        console.log("increased: " + currentInputSize)

    }

    if (currentInputSize > 72) {

        currentInputSize = 72;
        input.style.fontSize = `${currentInputSize}px`;

    }

    input.value = input.value.substr(0, input.value.length - 1);

})