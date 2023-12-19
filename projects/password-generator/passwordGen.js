var generatedPassword = document.getElementById("generatedPassword");

var generateBtn = document.getElementById("generate");
var copyBtn = document.getElementById("copy");

var lowercaseCheck = document.getElementById("lowercase");
var upperaseCheck = document.getElementById("uppercase");
var numbersCheck = document.getElementById("numbers");
var symbolsCheck = document.getElementById("symbols");

var charSet = document.getElementsByClassName("passwordGen_charSet");

var passwordLength = document.getElementById("passwordLength");
var passwordLengthLabel = document.getElementById("passwordLengthLabel");

window.onload = function() {
    lowercaseCheck.checked = true;
    upperaseCheck.checked = true;
    numbersCheck.checked = true;
}

function generatorEngine() {
    // The Engine.
    // May add double generation for better passwords.

    /**
     * index 0: lowercase
     * index 1: uppercase
     * index 2: numbers
     * index 3: symbols
     */

    let characters = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!@#$%^&*()_+={}[]|;:<>?,./|`~'];
    let dictionary = '';
    let password = '';

    if (lowercaseCheck.checked) {
        dictionary += characters[0];
    }
    if (upperaseCheck.checked) {
        dictionary += characters[1];
    }
    if (numbersCheck.checked) {
        dictionary += characters[2];
    }
    if (symbolsCheck.checked) {
        dictionary += characters[3];
    }

    let counter = 0;
    while (counter < passwordLength.value) {
        password += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
        counter += 1;
    }

    return password;
}

passwordLength.addEventListener("input", function() {
    passwordLengthLabel.innerHTML = passwordLength.value;
})

generateBtn.addEventListener("click", function() {
    generatedPassword.value = generatorEngine();
})

copyBtn.addEventListener("click", function() {
    navigator.clipboard.writeText(generatedPassword.value);
})