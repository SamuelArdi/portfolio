const container = document.getElementById("Container");

const signInBtn = document.getElementById("signInBtn");

const signUpHitbox = document.getElementById("signUpArrowHitbox");
const recoverAccHitbox = document.getElementById("recoverAccArrowHitbox");

const signUpBtn = document.getElementById("signUpBtn");
const recoverAccBtn = document.getElementById("recoverAccBtn");

const stylesheet = document.styleSheets[0];


signUpHitbox.onmouseover = () => {
    stylesheet.insertRule(".Container::after { transform: scalex(.47); }", stylesheet.cssRules.length);
}
signUpHitbox.onmouseout = () => {
    stylesheet.insertRule(".Container::after { transform: scalex(0); }", stylesheet.cssRules.length);
}

recoverAccHitbox.onmouseover = () => {
    stylesheet.insertRule(".Container::before { transform: scalex(.47); }", stylesheet.cssRules.length);
}
recoverAccHitbox.onmouseout = () => {
    stylesheet.insertRule(".Container::before { transform: scalex(0); }", stylesheet.cssRules.length);
}