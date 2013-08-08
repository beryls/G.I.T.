function renderGraphs() {
  $('<div>').css('height', 300)
    .css('width', 910)
    .attr('id', 'graphs_container')
    .appendTo('body');

  renderBarGraph();
  renderPieChart();
}

function renderBarGraphCanvas() {

  $('<div>').css('height', 250)
    .css('width', 440)
    .attr('id', 'bar_graph_container')
    .appendTo('#graphs_container');

  var svg = d3.select('#bar_graph_container')
    .append('svg')
    .attr('height', 300)
    .attr('width', 440);

  return svg;
}

function renderBarGraph() {
  svg = renderBarGraphCanvas();

  svg.selectAll('rect')
}

function renderPieChartCanvas() {

  $('<div>').css('height', 250)
    .css('width', 440)
    .attr('id', 'pie_chart_container')
    .appendTo('#graphs_container');

  var svg = d3.select('#pie_chart_container')
    .append('svg')
    .attr('height', 300)
    .attr('width', 440);

  return svg;
}

function renderPieChart() {
  svg = renderPieChartCanvas();

  svg.selectAll('rect')
}