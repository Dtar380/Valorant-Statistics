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
}

function static_charts(column) {
    fetch('http://127.0.0.1:8000/statics/' + column + '/graph', {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })  // Ruta de la API en FastAPI
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(data => {
            if (column == "PEAK") {
                let colors = ["#4285F4","#535354","#885C09","#C0C3C4","#E8BC46","#3FAABC","#9861BB","#1E854F","#A52634","#F2F3E1"];
                draw_chart(column.toLowerCase()+"-chart", data, colors)
            } else {
                draw_chart(column.toLowerCase()+"-chart", data, null)
            }
        })
        .catch(error => console.error('Error al obtener los datos:', error));  // Manejar errores
}

top_combination();

google.charts.load('current', { 'packages': ['corechart'] });

google.charts.setOnLoadCallback(load_charts);
