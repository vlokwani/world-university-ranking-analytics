$(function() {
    const svg = d3.select('svg');

    const margin = 60;
    const height = parseInt(svg.attr('height')) - 2*margin;
    const weight = parseInt(svg.attr('weight')) - 2*margin;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin},${margin})`);

    // this is the starting point of the construction for the chart.


});