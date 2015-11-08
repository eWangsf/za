var svg,
    width,
    height,
    link,
    node,
    links,
    nodes;

var bundle,
    beta = .85;


window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    node = svg.getElementsByTagName('g')[0].getElementsByTagName('g')[0];
    link = svg.getElementsByTagName('g')[0].getElementsByTagName('g')[1];

    bundle = new edgeBundle(data, beta);
    bundle.start();

}

function edgeBundle(data, beta) {
    this.data = data;
    this.beta = beta;
    this.nodes = [];
    this.links = [];
    this.perDegree = 0;
}


edgeBundle.prototype.start = function () {
    console.log('start...');
    this.init();

    // console.log(this.perDegree);
    this.renderNodes();
    this.getPaths();
    // this.renderPaths();
    // for (var i = 0; i < this.data.length; i++) {
    //     console.log(this.data[i]);
    // }

}

edgeBundle.prototype.init = function () {
    console.log('init...');
    var thisobj;
    var maxdepth = 1;
    var id = 0;
    for (var i = 0; i < this.data.length; i++) {
        id++;
        thisobj = this.data[i];
        thisobj.layers = thisobj.name.split('.');
        thisobj.depth = thisobj.layers.length - 1;
        if((i > 0) && thisobj.layers[thisobj.depth - 1] != this.data[i - 1].layers[this.data[i - 1].depth - 1]) {
            id++;
        }
        thisobj.id = id;
        maxdepth = maxdepth > thisobj.depth ? maxdepth : thisobj.depth;
        this.data[i] = thisobj;
    }
    id += 2;
    this.perDegree = 360 / id;
}

edgeBundle.prototype.renderNodes = function () {
    console.log('renderNodes...');
    var thisobj;
    var txtstr = '';
    for (var i = 0; i < this.data.length; i++) {
        thisobj = this.data[i];
        thisobj.degree = (thisobj.id) * this.perDegree - 90;
        thisobj.x = width / 2 - 128;
        thisobj.y = 0;
        thisobj.txt = thisobj.layers[thisobj.depth];
        this.data[i] = thisobj;
        txtstr += '<text class="node" transform="rotate(' + thisobj.degree + ')translate(' + thisobj.x + ',' + thisobj.y + ')' + (thisobj.degree < 90 ? '' : 'rotate(180)') + '" style="text-anchor: ' + (thisobj.degree < 90 ? 'start' : 'end') + ';">' + thisobj.txt + '</text>';
    }
    node.innerHTML += txtstr;
}

edgeBundle.prototype.getPaths = function () {
    console.log('getPaths...')
    var paths = [];
    var data = this.data;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].imports.length; j++) {
            paths.push(this.getPath(data[i].name, data[i].imports[j]));
        }
    }

    console.log(paths);



    this.paths = paths;
}

edgeBundle.prototype.getPath = function (name1, name2) {
    console.log('getPath...');
    var path = [];
    console.log(name1 + '  ' + name2);
    return path;
}

edgeBundle.prototype.getHier = function (o) {
    console.log('getHier...');
    console.log(o);



}




