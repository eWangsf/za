
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

var link = svg.append('g')
            .selectAll('.link'),
    node = svg.append('g')
            .selectAll('.node');

var cluster = d3.layout.cluster()
                .size([360, innerRadius])
                .value(function (d) {
                    return d.size;
                });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate('bundle')
    .tension(.85)
    .radius(function (d) {
        return d.y; 
    })
    .angle(function (d) {
        return d.x / 180 * Math.PI; 
    });

var nodes = cluster.nodes(packageHierarchy(data));
    links = packageImports(nodes);

console.log(bundle(links)[0]);


var link = link
        .data(bundle(links))
        .enter()
        .append('path')
        .each(function (d) {
            d.source = d[0];
            d.target = d[d.length - 1]; 
        })
        .attr({
            'class': 'link',
            'd': line
        }),
    node = node
        .data(nodes.filter(function(n) { return !n.children; }))
        .enter()
        .append('text')
        .attr({
            'class': 'node',
            'dy': '.31em',
            'transform': function(d) { 
                return 'rotate(' + (d.x - 90) + ')translate(' + (d.y + 8) + ',0)' + (d.x < 180 ? '' : 'rotate(180)'); 
            }
        })
        .style('text-anchor', function (d) {
            return d.x < 180 ? 'start' : 'end'; 
        })
        .text(function (d) {
            return d.key; 
        });


function packageHierarchy(classes) {
  var map = {};

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function(d) {
    find(d.name, d);
  });

  return map[""];
}


function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.imports) d.imports.forEach(function(i) {
      imports.push({source: map[d.name], target: map[i]});
    });
  });

  return imports;
}




