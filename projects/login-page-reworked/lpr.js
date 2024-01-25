const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");

const signUpElements = document.querySelector("div[class=signUpElements]")
const recoverAccElements = document.querySelector("div[class=recoverAccElements]")

const signUpHitbox = document.getElementById("signUpArrowHitbox");
const recoverAccHitbox = document.getElementById("recoverAccArrowHitbox");

signUpHitbox.onmouseover = () => {
    signUpElements.style.transform = "translateX(0%)"; 
    signUpHitbox.style.visibility = "hidden";
}
signUpElements.onmouseleave = () => {
    signUpElements.style.transform = "translateX(100%)"; 
    signUpHitbox.style.visibility = "visible";
}

recoverAccHitbox.onmouseover = () => {
    recoverAccElements.style.transform = "translateX(0%)"; 
    recoverAccHitbox.style.visibility = "hidden";
}

recoverAccElements.onmouseleave = () => {
    recoverAccElements.style.transform = "translateX(-100%)"; 
    recoverAccHitbox.style.visibility = "visible";
}