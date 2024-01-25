const container = document.getElementById("Container");

const signInBtn = document.getElementById("signInBtn");

const signUpHitbox = document.getElementById("signUpArrowHitbox");
const recoverAccHitbox = document.getElementById("recoverAccArrowHitbox");

const signUpBtn = document.getElementById("signUpBtn");
const recoverAccBtn = document.getElementById("recoverAccBtn");

const signUpElements = document.getElementById("signUpElements");

const stylesheet = document.styleSheets[0];

var mouseEnteredText;

async function showSignUpElements(isActive) {

    if (isActive === true) {
        
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                for (let i = 0; i < signUpElements.children.length; i++) {
                    signUpElements.children[i].style.visibility = "visible";
                }
                resolve();
            }, 500);
        })

    }
    else {

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                for (let i = 0; i < signUpElements.children.length; i++) {
                    signUpElements.children[i].style.visibility = "hidden";
                }
                resolve();
            }, 475);
        })

    }

}

async function activateSignUp(isActive) {

    if (isActive === true) {
        stylesheet.insertRule(".Container::after { transform: scalex(.47) }", stylesheet.cssRules.length)
    } else {
        stylesheet.insertRule(".Container::after { transform: scalex(0) }", stylesheet.cssRules.length)
    }

    return isActive;

}

async function checkOnmouseOut() {

    signUpElements.onmouseover = async () => {
        mouseEnteredText = true;
    }

    signUpHitbox.onmouseout = async () => {
        if (mouseEnteredText === true) {
            mouseEnteredText = false;
        } else {
            let isActive = await activateSignUp(false);
            await showSignUpElements(isActive);
        }
    }

}

// Sign up
signUpHitbox.onmouseover = async () => {
    let isActive = await activateSignUp(true);
    await showSignUpElements(isActive);
}
signUpHitbox.onmouseout = async () => {
    await checkOnmouseOut();
}
