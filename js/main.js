let bin_count = def_bincount,
    plotChart = plotBarChart,
    current_property = properties[0].property,
    cache_data = {'domainX': [], 'domainY': [], 'bins': [], 'raw': []};

$(function() {

    let chart = d3.select('svg')
        .append('g')
        .attr('id', 'chart')
        .attr('transform', `translate(${margin},${margin})`);

    // Load data and plot chart
    loadData(current_property);

    // constructing the navigation menu
    makeMenu($('nav'));

    $('nav a').on('click', {canvas: chart}, function(e) {
        e.data.canvas.selectAll('*').remove(); // prep for new chart
        current_property = $(this).data('property');
        loadData(current_property);
    });

    $('svg').on('click', {canvas: chart}, function(e) {
        e.data.canvas.selectAll('*').remove(); // prep for new chart

        if( plotChart === plotBarChart) {
            plotChart = plotPieChart;
        } else {
            plotChart = plotBarChart;
        }

        plotChart(cache_data.domainX, cache_data.domainY, cache_data.bins);

    });

    $('input.slider').on('input', {canvas: chart}, function(e) {
        e.data.canvas.selectAll('*').remove();
        bin_count = $(this).val();

        formatData();
        plotChart(cache_data.domainX, cache_data.domainY, cache_data.bins)
    })

});

function makeMenu(nav) {
    let parent = nav.find('ul');
    let template = getMenuTemplate();
    template.forEach(function(item) {
        parent.append(item);
    });

    // Adding a slider
    let inline_form = $("<form class=\"form-inline\"></form>");
    inline_form.append("<input class=\"form-control mr-sm-2 slider\" type=\"range\" min=\"3\" max=\"15\" default=\"10\">");

    nav.append(inline_form);
}

function formatData() {

    let list = cache_data.raw,
        min =  +d3.min(list),
        max = +d3.max(list),
        bin_size = (max + max/100 - min)/(bin_count);

    cache_data.bins = [];
    for(let i=0; i< bin_count; ++i) {
        cache_data.bins.push(Object.create({'bin': '', 'freq': 0}));
    }

    for(let i =0; i< list.length; ++i) { // dividing data into bins
        let d = list[i], bin_id = Math.floor((d - min) / bin_size);
        cache_data.bins[bin_id]['freq']++;
    }

    cache_data.domainX = [];
    for(let i =0; i< cache_data.bins.length; ++i) {
        bin = cache_data.bins[i];
        let rhs = (+min + +bin_size).toFixed(0);
        bin['bin'] = `[${min}-${rhs}]`;
        min = rhs;
        cache_data.domainX.push(bin.bin);
    }

    cache_data['domainY'] = [0, +d3.max(cache_data.bins.map(bin => bin.freq)) * 1.1];
}

function loadData(property ='') {
    d3.csv(data_file, function(data) {
        let list = [];                  // house property data list

        data.forEach((d) => {
            if (!isNaN(+d[property])) {
                list.push(+d[property]);
            }
        });

        cache_data['raw'] = list;
        formatData();
        plotChart(cache_data.domainX, cache_data.domainY, cache_data.bins);
    });
}

function plotBarChart(domainX, domainY, bins) {
        /*
            :input:         bins, domainX, domainY
            :input type:    bin: array of objects, each object has two attributes/keys
                            value to be plotted against x axis(the 'bins') and y axis
                            (the 'freq')
                            domainX: array defining the domain to which X-axis will
                            translate
                            domainY: array defining the domain to which y-axis will
                            translate
         */
        let chart = d3.select('#chart');
        yScale.range([height, 0]).domain(domainY);
        xScale.range([0, width]).domain(domainX).padding(0.2);

        let y = chart.append('g')
            .call(d3.axisLeft(yScale));

        let x = chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        x.selectAll('text')
            .attr('transform', `translate(0, 10) rotate(15)`);

        var bars = chart.selectAll()
            .data(bins)
            .enter()
            .append('rect')
            .attr('x', s => xScale(s.bin))
            .attr('y', s => yScale(s.freq))
            .attr('height', (s) => height - yScale(s.freq))
            .attr('width', xScale.bandwidth())
            .style('fill', 'steelblue');

        bars.select('text')
            .data(bins)
            .enter()
            .append('text')
            .attr('x', s => xScale(s.bin))
            .attr('y', s => yScale(s.freq) - 15)
            .attr('class', (d, i) => {return `hide label${i}`})
            .text(s => s.freq);

        chart.selectAll('rect')
            .on('mouseover', highlightBar)
            .on('mouseout', revertHighlight);
}

function plotPieChart(domainX, domainY, bins) {

    let radius = Math.min(width, height) /2, // radius
        piechart = d3.select('#chart')
                    .append('g')
                    .attr('transform', `translate(${width/2},${height/2})`);

    let color = d3.scaleOrdinal(d3.schemeCategory20),
        pie = d3.pie()
                .value(bin => bin.freq),
        arc_skeleton = d3.arc()
                .innerRadius(0)
                .outerRadius(radius - 20),
        highlight = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius),
        label = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius);


    let arcs = piechart.selectAll()
        .data(pie(bins))
        .enter()
        .append('g');

    arcs.append('path')
        .attr('d', arc_skeleton)
        .attr('fill', (d, i) => { return color(i) })
        .on('mouseover', function(d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('d', highlight);

            d3.select('.label' + i)
                .style('visibility', 'visible');
        })
        .on('mouseout', function(d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('d', arc_skeleton);

            d3.select('.label' + i)
                .style('visibility', 'hidden');

        });

    arcs.append('text')
        .style('visibility', 'hidden')
        .attr('class',(d, i) => { return 'label' + i; })
        .attr('transform', d => {
            // `translate(${label.centroid(d)})`
            let c = label.centroid(d);
            return `translate(${c[0]}, ${c[1]})`;
        })
        .text( d => d.data.freq );



    var legendG = d3.select('#chart').selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
        .data(pie(bins))
        .enter()
        .append("g")
        .attr("transform", function(d, i){
            return "translate(" + (width - 150) + "," + (i * 16 + 25) + ")"; // place each legend on the right and bump each one down 15 pixels
        })
        .attr("class", "legend");

    legendG.append("rect") // make a matching color rect
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function(d, i) {
            return color(i);
        });

    legendG.append("text") // add the text
        .text(function(bin){
            return `${bin.data.bin}`;
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);
}