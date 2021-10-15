export default function changeTheme() {
    var toggleDark = document.querySelector("#toggle-dark")
    var toggleWhite = document.querySelector("#toggle-white")

    function darkMode() {
        toggleDark.style.opacity = 1
        toggleDark.style.transform = "scale(1)"

        toggleWhite.style.opacity = 0
        toggleWhite.style.transform = "scale(0.5)"

        var allSimbol = document.querySelectorAll(".button-simbol")
        var allNumbers = document.querySelectorAll(".button-number")

        document.querySelector("#panel").classList.remove('panel-white')

        for (var c of allSimbol) {
            if (c.classList.contains("delete") === true) {
                c.style.marginTop = "0px"
            }
            c.classList.remove("radius-button")
        }
        for (var button of allNumbers) {
            button.classList.remove("number-white")
        }
        
    }
    
    function whiteMode() {
        toggleDark.style.opacity = 0
        toggleDark.style.transform = "scale(0.5)"

        toggleWhite.style.opacity = 1
        toggleWhite.style.transform = "scale(1)"

        var allSimbol = document.querySelectorAll(".button-simbol")
        var allNumbers = document.querySelectorAll(".button-number")

        document.querySelector("#panel").classList.add('panel-white')

        for (var c of allSimbol) {
            if (c.classList.contains("delete") === true) {
                c.style.marginTop = "15px"
            }
            c.classList.add("radius-button")
        }
        for (var button of allNumbers) {
            button.classList.add("number-white")
        }


    }

    document.querySelector("#toggle-theme").addEventListener("click", () => {

        if (getComputedStyle(toggleDark, null).opacity === "1") {
            whiteMode()
        } else {
            darkMode()
        }
    })
}
