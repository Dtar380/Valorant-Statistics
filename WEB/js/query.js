let url = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", function() {

    let combinationForm = document.getElementById("combination-form");

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

        var response;

        fetch(url+"/query/combination/graph", {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => {
            response = data
        })
        .then(() => drawChart(response))
        .catch(error => console.error('Error al obtener los datos:', error));
    });
});
