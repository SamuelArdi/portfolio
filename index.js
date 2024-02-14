const backgroundEffects = document.querySelector(".backgroundEffects");
const rotatingColor = document.querySelector(".backgroundEffects_rotatingColors");

const projects = document.querySelectorAll(".projectBubble");

function findElementPos() {
    projects.forEach(project => {
        project.addEventListener("mouseenter", () => {
            let x = project.getBoundingClientRect().x;
            let y = project.getBoundingClientRect().y;
    
            addsEffects(x, y);
        });
        project.addEventListener("mouseover", () => {
            let x = project.getBoundingClientRect().x;
            let y = project.getBoundingClientRect().y;

            addsEffects(x, y);
        })
    })
}

function addsEffects(x, y) {
    rotatingColor.style.visibility = "visible";
    rotatingColor.style.width = "18%";
    rotatingColor.style.height = "35%";

    rotatingColor.style.position = "sticky";    
    rotatingColor.style.top = y + "px";
    rotatingColor.style.left = x + "px";
}

function removeEffects() {
    rotatingColor.style.width = "0";
    rotatingColor.style.height = "0";
    rotatingColor.style.visibility = "hidden";
}

projects.forEach(project => {
    project.addEventListener("mouseenter", () => {
        findElementPos();
    });

    project.addEventListener("mouseleave", () => {
        removeEffects();
    })
})