window.addEventListener("load", () => {

    let loaderClass = document.querySelector(".loader");
    let loaderText = document.querySelector(".loadingText").children[0]

    loaderClass.classList.add("loader-hidden");

    loaderText.classList.remove("locating")
    loaderText.classList.add("located")
    loaderText.innerHTML = "GALAXIES LOCATED"

    setTimeout(() => {
        loaderClass.remove()
    }, 1700);

});

var hamburgerMenuIcon = document.querySelector(".hamburgerMenu");
var backIcon = document.querySelector(".hbs-back");

var menuOverlay = document.querySelector(".hamburgerMenu-overlay");
var menuShelf = document.querySelector(".hamburgerMenu-shelf");

var shelfState = menuShelf.dataset.state;

hamburgerMenuIcon.addEventListener("click", () => {

    menuOverlay.style.transform = "translateX(0)";

    setTimeout(() => {
        menuShelf.style.transform = "translateX(0)";
    }, 500);

    shelfState = "opened"

})

backIcon.addEventListener("click", () => {

    menuShelf.style.transform = "translateX(100%)";

    setTimeout(() => {
        menuOverlay.style.transform = "translateX(100%)";
    }, 800);

    shelfState = "closed"

})