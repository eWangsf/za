var projects = {
    'Force Directed Tree': {
        'raw': 'fdt/fdt_raw/fdt.html',
        'd3': 'fdt/fdt_d3/fdt_d3.html'
    },
    'word cloud': {
        'raw': 'wordCloud/raw/wordcloud.html',
        'd3': 'wordCloud/with_d3/wordle_d3.html'
    },
    'Stacked Graph': {
        'raw': 'stackedGraph/raw/stackedgraph.html',
        'd3': 'stackedGraph/d3/stackedgraph.html'
    },
    'tree map': {
        'raw': 'treemap/raw/treemap.html',
        'd3': 'treemap/d3/treemap.html'
    },
    'Hierarchical edge bundling': {
        'raw': 'edgeBundle/raw/edgeBundle.html',
        'd3': 'edgeBundle/d3/edgeBundle.html'
    },
    'Collapsible Tree': {
        'raw': 'collaTree/raw/collaTree.html',
        'd3': 'collaTree/d3/collaTree.html'
    },
    'Parallel Coordinates': {
        'raw': 'paraCoordinates/raw/paraCoordinates.html',
        // 'd3': 'paraCoordinates/d3/paraCoordinates.html'
    },
    'Scatterplot Matrix': {
        'raw': 'scatterPlotMatrix/raw/scatterPlotMatrix.html',
    },
    'Epicyclic Gearing': {
        'raw': 'epiGear/raw/epiGear.html',
        'd3': 'epiGear/d3/epiGear.html'
    },
    'EventDrops': {
        'raw': 'eventDrops/raw/eventDrops.html',
        'd3': 'eventDrops/d3/eventDrops.html'
    }
};

var blogs = [
    {
        'title': 'flex_tips',
        'href': 'blogs/flex/flex.html'
    }
];

var projectsdom = d3.select('#projects');
var blogsdom = d3.select('#blogs');

var proStr = '';
for(var key in projects) {
    proStr += '<h4>' + key + '</h4><ul>';
    var value = projects[key];
    for(var k2 in value) {
        proStr += '<li><a href="codingPractice/' + value[k2] + '" target="_blank">' + k2 + '</a></li>';
    }
    proStr += '</ul>';
}
projectsdom.html(proStr);

var blogsStr = '',
    thisobj;
for(var i = 0; i < blogs.length; i++) {
    thisobj = blogs[i];
    blogsStr += '<h4><a href="' + thisobj['href'] + '" target="_blank">' + thisobj['title'] + '</a></h4>';
}
blogsdom.html(blogsStr);





