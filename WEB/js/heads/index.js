var userLang = navigator.language // The default language of the user

var selectedLang = localStorage.getItem("lang") // The language selected by the user

// If language is not selected
if (selectedLang == null){

    // If language is spanish
    if (userLang.includes('es')){
        window.location.replace("html/es-ES/main.html")
        localStorage.setItem("lang", "es-ES")
    }

    // Else
    else {
        // The language will be english
        window.location.replace("html/en-US/main.html")
        localStorage.setItem("lang", "en-US")
    }

} else{
    page = "html/" + selectedLang + "/main.html"
    window.location.replace(page)
}
