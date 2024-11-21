let url = "http://127.0.0.1:8000/query/";

let selectedLang = localStorage.getItem("lang")

// !! ALL COMMENTED PARTS ARE BECAUSE THEY ARE UNUSED, UNCOMMENT WHEN DYNAMIC FORM IMPLEMENTED
/*
const data = load_json(selectedLang + ".json");
var parameter2_options = data["parameter2"];
var value1_options = data["value1"];
*/

let combinationForm = document.getElementById("combination-form");
// let comparisonForm = document.getElementById("comparison-form");

document.addEventListener("DOMContentLoaded", function() {

    combinationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        var AGE = document.getElementById("age").value;
        var OCCUPATION = document.getElementById("occupation").value;
        var GENDER = document.getElementById("gender").value;
        var PEAK = document.getElementById("peak").value;

        let request = {
            "AGE": AGE,
            "OCCUPATION": OCCUPATION,
            "GENDER": GENDER,
            "PEAK": PEAK
        };

        fetch(url+"combination/graph", {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => draw_chart('combination-graph', data, null))
        .catch(error => console.error('Error al obtener los datos:', error));
    });

    /*
    comparisonForm.addEventListener("submit", (event) => {
        event.preventDefault();

        var parameter1 = document.getElementById("parameter-1").value;
        var parameter2 = document.getElementById("parameter-2").value;
        var value1 = document.getElementById("value-1").value;

        var request = {
            "parameter1": parameter1,
            "parameter2": parameter2,
            "value1": value1
        };

        fetch(url+"comparison/graph", {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => draw_chart('comparison-graph', data, null))
        .catch(error => console.error('Error al obtener los datos:', error));
    });
    */
});

// ADD DYNAMIC FORM CREATOR
function load_json(filename) {

}
