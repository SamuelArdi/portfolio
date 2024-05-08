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