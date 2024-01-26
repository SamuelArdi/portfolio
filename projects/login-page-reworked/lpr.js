// containers
const signInContainer = document.querySelector("div[class=signInContainer]");
const signUpContainer = document.querySelector("div[class=signUpContainer]");
const recoverAccContainer = document.querySelector("div[class=recoverAccContainer]");

// inputs
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const signInFormBtn = document.getElementById("signInFormBtn");
const signUpFormBtn = document.getElementById("signUpFormBtn");

// buttons
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const recoverAccBtn = document.getElementById("recoverAccBtn");

// elements
const signInElements = document.querySelector("div[class=signInElements]");
const signUpElements = document.querySelector("div[class=signUpElements]")
const recoverAccElements = document.querySelector("div[class=recoverAccElements]")

// hitboxes
const signInHitbox = document.getElementById("signInArrowHitbox");
const signUpHitbox = document.getElementById("signUpArrowHitbox");
const recoverAccHitbox = document.getElementById("recoverAccArrowHitbox");

// covers
const covers = document.querySelector("div[class=covers]");
const coverElements = document.querySelectorAll("div[class=cover]");

// sign in
signInHitbox.onmouseover = () => {
    signInElements.style.transform = "translateX(0%)"; 
    signInHitbox.style.visibility = "hidden";
}
signInElements.onmouseleave = () => {
    signInElements.style.transform = "translateX(-100%)"; 
    signInHitbox.style.visibility = "visible";
}

// sign up
signUpHitbox.onmouseover = () => {
    signUpElements.style.transform = "translateX(0%)"; 
    signUpHitbox.style.visibility = "hidden";
}
signUpElements.onmouseleave = () => {
    signUpElements.style.transform = "translateX(100%)"; 
    signUpHitbox.style.visibility = "visible";
}

// recover account
recoverAccHitbox.onmouseover = () => {
    recoverAccElements.style.transform = "translateX(0%)"; 
    recoverAccHitbox.style.visibility = "hidden";
}
recoverAccElements.onmouseleave = () => {
    recoverAccElements.style.transform = "translateX(-100%)"; 
    recoverAccHitbox.style.visibility = "visible";
}

async function changePage(btn) {

    if (btn === "signUp") {

        signUpElements.style.transform = "translateX(100%)"; 
        signUpHitbox.style.visibility = "hidden";
    
        await new Promise((resolve, reject) => {
    
            // Set up covers
            setTimeout(() => {
    
                covers.style["z-index"] = "1";
    
                for (let i = 0; i < covers.children.length; i++) {
                    covers.children[i].style["visibility"] = "visible";
                    covers.children[i].style["transform"] = "scaleX(1.2) scaleY(1)";
                }
    
                resolve();
    
            }, 300);
    
            // Removes the covers
            setTimeout(() => {
    
                for (let i = 0; i < coverElements.length; i++) {
                    coverElements[i].style["transform"] = "scaleX(0) scaleY(1)";
                }
    
            }, 1600);
    
            // Changes the container to the sign up container
            setTimeout(() => {
                signInContainer.style.visibility = "hidden";
                signUpContainer.style.visibility = "visible";
            }, 1700);
        
            setTimeout(() => {
                covers.style["z-index"] = "-1";
            }, 2500);
    
        })

    }
    else if (btn === "recoverAcc") {

        recoverAccElements.style.transform = "translateX(-100%)"; 
        recoverAccHitbox.style.visibility = "hidden";

        await new Promise((resolve, reject) => {

            // Set up covers
            setTimeout(() => {
                
                covers.style["z-index"] = "1";
    
                for (let i = 0; i < covers.children.length; i++) {
                    covers.children[i].style["visibility"] = "visible";
                    covers.children[i].style["transform"] = "scaleX(1.2) scaleY(1)";
                }
    
                resolve();
    
            }, 300);
    
            // Removes the covers
            setTimeout(() => {
    
                for (let i = 0; i < coverElements.length; i++) {
                    coverElements[i].style["transform"] = "scaleX(0) scaleY(1)";
                }
    
            }, 1600);
    
            // Changes the container to the sign up container
            setTimeout(() => {
                // Container changes based on what page the user is currently on
                // Implement this change in the future
                signInContainer.style.visibility = "hidden"; 
                //

                recoverAccContainer.style.visibility = "visible";
            }, 1700);
        
            setTimeout(() => {
                covers.style["z-index"] = "-1";
            }, 2500);
            
        })

    }
    else if (btn === "signIn") {

        signInElements.style.transform = "translateX(-100%)"; 
        signInHitbox.style.visibility = "hidden";

        await new Promise((resolve, reject) => {

            // Set up covers
            setTimeout(() => {
    
                covers.style["z-index"] = "1";
    
                for (let i = 0; i < covers.children.length; i++) {
                    covers.children[i].style["visibility"] = "visible";
                    covers.children[i].style["transform"] = "scaleX(1.2) scaleY(1)";
                }
    
                resolve();
    
            }, 300);
    
            // Removes the covers
            setTimeout(() => {
    
                for (let i = 0; i < coverElements.length; i++) {
                    coverElements[i].style["transform"] = "scaleX(1.2) scaleY(0)";
                }
    
            }, 1600);
    
            // Changes the container to the sign up container
            setTimeout(() => {
                // Container changes based on what page the user is currently on
                // Implement this change in the future
                signUpContainer.style.visibility = "hidden"; 
                //

                signInContainer.style.visibility = "visible";
            }, 1700);
        
            setTimeout(() => {
                covers.style["z-index"] = "-1";
            }, 2500);
            
        })

    }

}

signInBtn.onclick = () => {
    changePage("signIn");
}

signUpBtn.onclick = () => {
    changePage("signUp");
}

recoverAccBtn.onclick = () => {
    changePage("recoverAcc");
}