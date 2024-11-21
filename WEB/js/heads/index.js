var userLang = navigator.language // The default language of the user

var selectedLang = localStorage.getItem("lang") // The language selected by the user

// If language is not selected
if (selectedLang == null){

    // If language is spanish
    if (userLang.includes('es')){
        window.location.replace("html/es-ES/main.html")
        localStorage.setItem("lang", "es-ES")
    }

    // If language is french
    else if (userLang.includes('fr')) {
        window.location.replace("html/fr-FR/main.html")
        localStorage.setItem("lang", "fr-FR")
    }

    // If language is portuguese
    else if (userLang.includes('pt')) {
        window.location.replace("html/pt-BR/main.html")
        localStorage.setItem("lang", "pt-PT")
    }

    // If language is german
    else if (userLang.includes('de')) {
        window.location.replace("html/de-DE/main.html")
        localStorage.setItem("lang", "de-DE")
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
