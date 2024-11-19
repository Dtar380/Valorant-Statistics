function top_combination() {
    fetch('http://127.0.0.1:8000/statics/ROW VALUE/mode')  // Ruta de la API en FastAPI
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(data => {
        document.getElementById("top-combination-name").innerHTML = data[0];
        document.getElementById("top-combination-number").innerHTML = data[2];
    })
    .catch(error => console.error('Error al obtener los datos:', error));  // Manejar errores
}

function load_charts() {
    const charts = ["AGE", "OCCUPATION", "GENDER", "PEAK"]

    for (let i = 0; i < charts.length; i++) {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart(charts[i]));
    }
}

function drawChart(column) {
    console.log("La función drawChart() se está ejecutando");

    fetch('http://127.0.0.1:8000/statics/' + column + '/graph', {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })  // Ruta de la API en FastAPI
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(data => {
            console.log(data);

            // Preparar los datos para la gráfica de Google Charts
            let chartData = [['Categoría', 'Valor']];
            data.forEach(item => {
                chartData.push(item);  // Añadir cada elemento al array
            });

            // Crear la DataTable para Google Charts
            let dataTable = google.visualization.arrayToDataTable(chartData);

            // Opciones para la gráfica (sin 3D)
            let options = {
                width: 400,
                height: 400,
                pieSliceText: "none",
                legend: {position: 'none'}
            };

            if (column === "PEAK") {
                options.colors = ["#4285F4","#535354","#885C09","#C0C3C4","#E8BC46","#3FAABC","#9861BB","#1E854F","#A52634","#F2F3E1"];
            }

            // Crear la gráfica y dibujarla
            let chart = new google.visualization.PieChart(document.getElementById(column.toLowerCase()+"-chart"));
            chart.draw(dataTable, options);
        })
        .catch(error => console.error('Error al obtener los datos:', error));  // Manejar errores
}

window.onload = function() {
    top_combination();
    load_charts();
}
