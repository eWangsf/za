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
    console.log('function start...');
    this.init();

    // for (var i = 0; i < this.data.length; i++) {
    //     console.log(this.data[i]);

    // }
    // console.log(this.perDegree);
    this.renderNodes();

}

edgeBundle.prototype.init = function () {
    // console.log('function init...');
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
    // console.log(id);
    this.perDegree = 360 / id;
}

edgeBundle.prototype.renderNodes = function () {
    var thisobj;
    var txtstr = '';
    for (var i = 0; i < this.data.length; i++) {
        console.log(i);
        thisobj = this.data[i];
        txtstr += '<text class="node" transform="rotate(' + ((thisobj.id - 1) * this.perDegree) + ')translate(' + (width / 2 - 120) + ',0)" style="text-anchor: start;">' + thisobj.layers[thisobj.depth] + '</text>';
        // console.log('<text class="node" transform="rotate(' + ((thisobj.id - 1) * this.perDegree) + ')translate(' + (width / 2 - 120) + ',0)" style="text-anchor: start;">AgglomerativeCluster</text>');
    }
    node.innerHTML += txtstr;
}   

edgeBundle.prototype.getHier = function (o) {
    console.log('function getHier...');
    console.log(o);



}




