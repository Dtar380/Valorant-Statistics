export function drawChart(data, chart_colors) {

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

    if (chart_colors) {
        options.colors = chart_colors
    }

    // Crear la gráfica y dibujarla
    let chart = new google.visualization.PieChart(document.getElementById('combination-graph'));
    chart.draw(dataTable, options);
}
