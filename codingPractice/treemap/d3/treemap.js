var style = {
        width: 960,
        height: 500,
        background: "#e5e5e5"
    },
    width = style.width,
    height = style.height;
    colors = d3.scale.category20();

var parent = d3.select('body') 
                .append('div')
                .attr({
                    'id': 'parent'
                })
                .style({
                    'width': width + 'px',
                    'height': height + 'px',
                    'background': style.background
                });

var treemap = d3.layout.treemap()
                    .size([width, height])
                    .sticky(true)
                    .value(function(d) { return d.size; });
// console.log(data);


var node = parent.datum(data).selectAll(".node")
        .data(treemap.nodes)
        .enter()
        .append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) { return d.children ? colors(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });

d3.selectAll("input").on("change", function change() {
    var value = this.value === "count" 
        ? function() { return 1; } 
        : function(d) { return d.size; };

    node.data(treemap.value(value).nodes)
        .transition()
        .duration(1500)
        .call(position);
});

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}


