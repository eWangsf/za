
var width = 960,
    radius = width / 2,
    innerRadius = radius - 120;

var svg = d3.select('body')
            .append('svg')
            .attr({
                'width': width,
                'height': width
            })
            .append('g')
            .attr({
                'transform': 'translate(' + radius + ', ' + radius + ')'
            });

var links = svg.append('g')
            .selectAll('.link'),
    nodes = svg.append('g')
            .selectAll('.node');

var cluster = d3.layout.cluster()
                .size([360, radius])
                .value(function (d) {
                    return d.size;
                });

var bundle = d3.layout.bundle();




