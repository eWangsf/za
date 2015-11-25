
// tips:
//     line 和 circle 画的顺序影响效果


var width = 960,
    height = 500;


var svg = d3.select('body')
            .append('svg')
            .attr({
                'width': width,
                'height': height
            });

var force = d3.layout.force()
                .nodes(dataset.nodes)
                .links(dataset.links)
                .linkDistance(30)
                .charge(-120)
                .size([width, height])
                .start();
var colors = d3.scale.category20();

var edges = svg.selectAll('line')
                .data(dataset.links)
                .enter()
                .append('line')
                .classed('link', true)
                .attr({
                    'stroke-width': function (d, i) {
                        return Math.sqrt(d.value);
                    }
                });

var nodes = svg.selectAll('circle')
                .data(dataset.nodes)
                .enter()
                .append('circle')
                .classed('node', true)
                .attr({
                    'r': 5,
                    'fill': function (d, i) {
                        return colors(d.group);
                    }
                })
                .call(force.drag);



force.on('tick', function () {
    nodes.attr({
        'cx': function (d, i) {
            return d.x;
        },
        'cy': function (d, i) {
            return d.y;
        }
    });

    edges.attr({
        'x1': function (d, i) {
            return d.source.x;
        },
        'y1': function (d, i) {
            return d.source.y;
        },
        'x2': function (d, i) {
            return d.target.x;
        },
        'y2': function (d, i) {
            return d.target.y;
        },
    })

})








