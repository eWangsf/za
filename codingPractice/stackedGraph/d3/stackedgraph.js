var width = 1000,
    height = 500;

var svg = d3.select('body')
            .append('svg')
            .attr({
                'width': width,
                'height': height
            });

var n = 20,
    m = 200;

var arr = [];

var stack = d3.layout.stack().offset('wiggle'),
    data1 = d3.range(n).map(function() { return bumpLayer(m); });

console.log(data1);
    
var layers0 = stack(data1);
    
var layers1 = stack(d3.range(n).map(function() { return bumpLayer(m); }));

var xscale = d3.scale.linear()
                    .domain([0, m - 1])
                    .range([0, width]);

var yscale = d3.scale.linear()
                    .domain([0, d3.max(layers0.concat(layers1), function (layer) {
                        return d3.max(layer, function (d) {return d.y0 + d.y;});
                    })])
                    .range([height, 0]);

var colors = d3.scale.linear()
            .range(["#aad", "#556"]);

var area = d3.svg.area()
                .x(function(d) { return xscale(d.x); })
                .y0(function(d) { return yscale(d.y0); })
                .y1(function(d) { return yscale(d.y0 + d.y); });

svg.selectAll("path")
    .data(layers0)
    .enter()
    .append("path")
    .attr("d", area)
    .style("fill", function() { return colors(Math.random()); });

d3.select('button')
    .on('click', transition);

function transition() {
  d3.selectAll("path")
    .data(function() {
        var d = layers1;
        layers1 = layers0;
        return layers0 = d;
    })
    .transition()
    .duration(2500)
    .attr("d", area);
}


function bumpLayer(n) {
    function bump(a) {
        var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
        
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);

    // console.log(a);
    var res = a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
    // console.log(res);
    return res;
    // return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}

