var button = document.getElementById("theme-switcher");
var html = document.querySelector("html");
var img = document.getElementsByTagName("img");

value = localStorage.getItem("selectedTheme");

function dark() {
    html.setAttribute('data-theme', 'dark');
    for (let i = 0; i < img.length; i++) {
        let new_src = img[i].getAttribute('src').split("-")[0] + "-dark.svg";
        img[i].setAttribute('src', new_src);
    }
    localStorage.setItem('selectedTheme', 'dark');
}

function light() {
    html.setAttribute('data-theme', 'light');
    for (let i = 0; i < img.length; i++) {
        let new_src = img[i].getAttribute('src').split("-")[0] + "-light.svg";
        img[i].setAttribute('src', new_src);
    }
    localStorage.setItem('selectedTheme', 'light');
}

if (value == "dark") {
    dark();
} else if (value == "light") {
    light();
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark();
    } else {
        light();
    }
}

button.addEventListener("click", () => {
    if (html.getAttribute('data-theme') == "dark") {
        light();
    } else {
        dark();
    }
})
