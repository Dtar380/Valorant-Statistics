const url = "http://127.0.0.1:8000/query/";
const selectedLang = localStorage.getItem("lang");
const json_location = `../../languages/${selectedLang}.json`;

// Synchronously load the JSON data
function loadJSONSync(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false); // false makes it synchronous
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    } else {
        throw new Error(`Failed to load JSON: ${request.status}`);
    }
}

const data = loadJSONSync(json_location);
const { parameters, values } = data;

const combinationForm = document.getElementById("combination-form");
const comparisonForm = document.getElementById("comparison-form");
const parameter1 = document.getElementById("parameter-1");
const parameter2 = document.getElementById("parameter-2");
const value1 = document.getElementById("value-1");

function fetchDataAndDrawChart(endpoint, requestData, chartId, colors) {
    fetch(url + endpoint, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => draw_chart(chartId, data, colors))
    .catch(error => console.error('Error fetching data:', error));
}

function fetchDataForStaticCharts() {
    fetch('http://127.0.0.1:8000/statics/data_amount', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        draw_chart('combination-graph', [["TOTAL", data], ["REST", 0]], ["#0067AC", "#197BBD"]);
        draw_chart('comparison-graph', [["TOTAL", data], ["REST", 0]], ["#0067AC", "#197BBD"]);
    })
    .catch(error => console.error('Error fetching static data:', error));
}

function combinationForm_on_change() {
    const AGE = document.getElementById("age").value;
    const OCCUPATION = document.getElementById("occupation").value;
    const GENDER = document.getElementById("gender").value;
    const PEAK = document.getElementById("peak").value;

    const request = { AGE, OCCUPATION, GENDER, PEAK };
    fetchDataAndDrawChart("combination/graph", request, 'combination-graph', ["#197BBD", "#0067AC"]);
}

document.addEventListener("DOMContentLoaded", () => {
    combinationForm.addEventListener("change", combinationForm_on_change);
    combinationForm.addEventListener("input", combinationForm_on_change);

    comparisonForm.addEventListener("input", (event) => {
        event.preventDefault();

        // Delay the validation logic slightly to allow the form state to update
        setTimeout(() => {
            // Get all form select elements
            const inputs = document.querySelectorAll('#comparison-form select');

            // Check if all select inputs are filled (no "Empty" value or empty string)
            const allFilled = Array.from(inputs).every(input => input.value !== "Empty" && input.value.trim() !== '');

            if (allFilled) {
                // All fields are filled, gather the values to make the request
                const parameter1_value = parameter1.value;
                const parameter2_value = parameter2.value;
                const value1_value = value1.value;

                const request = {
                    parameter1: parameter1_value,
                    parameter2: parameter2_value,
                    value: value1_value
                };

                // Set colors based on the value of parameter1
                const colors = parameter1_value === "PEAK"
                    ? ["#4285F4", "#535354", "#885C09", "#C0C3C4", "#E8BC46", "#3FAABC", "#9861BB", "#1E854F", "#A52634", "#F2F3E1"]
                    : ["#0067AC", "#197BBD", "#328FCD", "#4AA3DE", "#63B7EE", "#7CCBFF"];

                // Call the function to fetch data and draw the chart
                fetchDataAndDrawChart("comparison/graph", request, 'comparison-graph', colors);
            } else {
                // If any select is in the "Empty" state or empty, fetch static charts
                fetchDataForStaticCharts();
            }
        }, 0); // Delay the execution just until the next event loop cycle
    });

    $(parameter1).on('change', function() {
        const parameter1_value = parameter1.value;
        const $options = $('#parameter-2');
        $options.empty().append($("<option></option>").attr("value", "Empty").text(""));

        const availableOptions = { ...parameters };
        delete availableOptions[parameter1_value];

        $.each(availableOptions, (key, value) => {
            $options.append($("<option></option>").attr({ "value": key, "id": key }).text(value));
        });
    });

    $(parameter2).on('change', function() {
        const parameter2_value = parameter2.value;
        const $options = $('#value-1');
        $options.empty().append($("<option></option>").attr("value", "Empty").text(""));

        const values1_options = values[parameter2_value] || [];
        $.each(values1_options, (key, value) => {
            $options.append($("<option></option>").attr({ "value": key, "id": key }).text(value));
        });
    });
});
