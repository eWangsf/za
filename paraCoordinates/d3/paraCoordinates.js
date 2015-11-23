var width = 960,
    height = 600;


var svg = d3.select('body')
            .append('svg')
            .attr({
                'width': width,
                'height': height
            });

var texts = svg.selectAll('text');

svg.append('text')
    .attr({
        'x': 100,
        'y': 200,
        'fill': 'red'
    })
    .text(data.length);


