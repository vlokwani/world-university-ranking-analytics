function highlightBar(data, index) {
    // console.log(data, index);
    changeBarDimensions(d3.select(this), 'orange', data, -5, -15, 10, 15);

    d3.select('.label' + index)
        .transition()
        .duration(400)
        .attr('class', 'show label' + index);
}
function revertHighlight(data, index) {
    // console.log(data, index);
    changeBarDimensions(d3.select(this), 'steelblue', data);

    d3.select('.label' + index)
        .transition()
        .duration(400)
        .attr('class', 'hide label' + index);
}

function changeBarDimensions(cbar, color, data, nx =0, ny =0, nwidth =0, nheight =0) {
    /*
        :input types:
            cbar -> variable referencing to the bar on which event was called
            nx -> new value of x for the bar
            ny -> new value of y for the bar
            nwidth -> new value of width for the bar
            nheight -> new value of height for the bar
            color -> color to fill in the bar
            data -> bar data received by the event
     */
    // let x = +cbar.attr('x'),
    //     y = +cbar.attr('y'),
    //     height = +cbar.attr('height'),
    //     width = +cbar.attr('width');

    cbar.transition()
        .duration(200)
        .style('fill', color)
        .attr('x', xScale(data.bin) + nx)
        .attr('y', yScale(data.freq) + ny)
        .attr('width', xScale.bandwidth() + nwidth)
        .attr('height', height - yScale(data.freq) + nheight);

    return cbar;
}