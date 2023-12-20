var generatedPassword = document.getElementById("generatedPassword");
var passwordStrength = document.getElementById("passwordStrength");

var generateBtn = document.getElementById("generate");
var copyBtn = document.getElementById("copy");

var lowercaseCheck = document.getElementById("lowercase");
var uppercaseCheck = document.getElementById("uppercase");
var numbersCheck = document.getElementById("numbers");
var symbolsCheck = document.getElementById("symbols");

var charSet = document.querySelectorAll("input[type=checkbox]");

var errorMessage = document.getElementById("errorMessage");

var passwordLength = document.getElementById("passwordLength");
var passwordLengthLabel = document.getElementById("passwordLengthLabel");

window.onload = function() {
    lowercaseCheck.checked = true;
    uppercaseCheck.checked = true;
    numbersCheck.checked = true;

    generatedPassword.value = generatorEngine();
    checkPasswordLength();
}

function checkPasswordLength() {
    if (passwordLength.value > 3) {
        passwordStrength.value = 1.5;
    }
    if (passwordLength.value > 6) {
        passwordStrength.value = 2.3;
    }
    if (passwordLength.value > 10) {
        passwordStrength.value = 3;
    }
    if (passwordLength.value <= 3) {
        passwordStrength.value = 0;
    }
}

function generatorEngine() {
    // The Engine.
    // May add double generation for better passwords.

    /** characters variable index values.
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
    if (uppercaseCheck.checked) {
        dictionary += characters[1];
    }
    if (numbersCheck.checked) {
        dictionary += characters[2];
    }
    if (symbolsCheck.checked) {
        dictionary += characters[3];
    }

    if (lowercaseCheck.checked == false && uppercaseCheck.checked == false && numbersCheck.checked == false && symbolsCheck.checked == false) {
        passwordStrength.value = 0;
        errorMessage.innerHTML = "Please select at least one character type.";
    }
    else {
        errorMessage.innerHTML = "";
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
    generatedPassword.value = generatorEngine();
    checkPasswordLength();
})

charSet.forEach(function(char) {
    char.addEventListener("click", function() {
        generatedPassword.value = generatorEngine();
        checkPasswordLength();
    })
})

generateBtn.addEventListener("click", function() {
    generatedPassword.value = generatorEngine();
    checkPasswordLength();
})

copyBtn.addEventListener("click", function() {
    navigator.clipboard.writeText(generatedPassword.value);
})