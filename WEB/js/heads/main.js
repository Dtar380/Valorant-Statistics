function static_charts(column) {
    fetch('http://127.0.0.1:8000/statics/' + column + '/graph', {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })  // Ruta de la API en FastAPI
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(data => {
        let colors;
        if (column == "PEAK") {
            colors = ["#4285F4","#535354","#885C09","#C0C3C4","#E8BC46","#3FAABC","#9861BB","#1E854F","#A52634","#F2F3E1"];
        } else{
            colors = ["#0067AC","#197BBD","#328FCD","#4AA3DE","#63B7EE","#7CCBFF"]
        }
        draw_chart(column.toLowerCase()+"-chart", data, colors)
    })
    .catch(error => console.error('Error al obtener los datos:', error));  // Manejar errores
}

function query_charts() {
    fetch('http://127.0.0.1:8000/statics/data_amount', {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })  // Ruta de la API en FastAPI
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(data => {
        draw_chart('combination-graph', [["TOTAL", data],["REST", 0]], ["#0067AC","#197BBD"])
        draw_chart('comparison-graph', [["TOTAL", data],["REST", 0]], ["#0067AC","#197BBD"])
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

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
        static_charts(charts[i])
    }

    query_charts();
}

top_combination();

google.charts.load('current', { 'packages': ['corechart'] });

google.charts.setOnLoadCallback(load_charts);
