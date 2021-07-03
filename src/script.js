var toggle = document.querySelector("#togle")
var isOn = true
var darkBg = document.querySelector("#result")
var darkBtn = document.querySelectorAll(".buttons")
var btnOper = document.querySelectorAll(".buttons-operator")
var apagar = document.querySelector(".apagar")
var automaticResult = document.querySelector("#ResultValue")
var smallResult = document.querySelector("span")
if (isOn) { //mode dark
    darkBg.classList.add("dark-bg")
    darkBg.classList.remove("noDark-bg")
    apagar.style.backgroundImage = `url(${require('./images/dark-delete.png').default})`
    for (let c=0; c < darkBtn.length; c++) {
        darkBtn[c].classList.add("dark-btn")
        darkBtn[c].classList.remove("noDark-btn")
    }
    for (let c=0; c < btnOper.length; c++) {
        btnOper[c].classList.add("dark-btn-Oper")
        btnOper[c].classList.remove("noDark-btn-Oper")
    }
}
toggle.addEventListener("click", () => {
  var on = document.querySelector("#on")
  var off = document.querySelector("#off")
  if (on.classList.contains("turnOn") == true) {
      on.classList.remove("turnOn")
      on.classList.add("turnOff")
      off.classList.remove("turnOff")
      off.classList.add("turnOn")
    isOn = false
  } else {
      on.classList.remove("turnOff")
      on.classList.add("turnOn")
      off.classList.remove("turnOn")
      off.classList.add("turnOff")
      isOn = true
  }
  if (isOn) { //mode dark
      darkBg.classList.add("dark-bg")
      darkBg.classList.remove("noDark-bg")
      apagar.style.backgroundImage = `url(${require('./images/dark-delete.png').default})`
      automaticResult.style.color = "white"
      smallResult.style.color = "rgba(255, 254, 254, 0.3)"
      for (let c=0; c < darkBtn.length; c++) {
          darkBtn[c].classList.add("dark-btn")
          darkBtn[c].classList.remove("noDark-btn")
      }
      for (let c=0; c < btnOper.length; c++) {
          btnOper[c].classList.add("dark-btn-Oper")
          btnOper[c].classList.remove("noDark-btn-Oper")
      }
  } else { //mode white
      darkBg.classList.remove("dark-bg")
      darkBg.classList.add("noDark-bg")
      apagar.style.backgroundImage = `url(${require('./images/excluir-white.png').default})`
      automaticResult.style.color = "black"
      smallResult.style.color = "rgba(0, 0, 0, 0.3)"
      for (let c=0; c < darkBtn.length; c++) {
          darkBtn[c].classList.remove("dark-btn")
          darkBtn[c].classList.add("noDark-btn")
      }
      for (let c=0; c < btnOper.length; c++) {
          btnOper[c].classList.remove("dark-btn-Oper")
          btnOper[c].classList.add("noDark-btn-Oper")
      }
  }
})
