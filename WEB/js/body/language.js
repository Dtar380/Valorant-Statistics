const languageSwitch = document.querySelector("#language-selector")

var selectedLang = localStorage.getItem("lang")
var page = String(window.location)

if (page.includes("es-ES")){
  var currentLang = "es-ES"
}else{
  var currentLang = "en-US"
}

if (currentLang != selectedLang){
  changeLang()
}

languageSwitch.addEventListener("click", () => {
  if (page.includes("es-ES")){
    localStorage.setItem("lang", "en-US")
    selectedLang = "en-US"
    changeLang()
  } else{
    localStorage.setItem("lang", "es-ES")
    selectedLang = "es-ES"
    changeLang()
  }

})

function changeLang(){
  page = page.replace(currentLang, selectedLang)
  window.location.replace(page)
}
