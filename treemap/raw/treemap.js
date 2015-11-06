var style = {
        width: 960,
        height: 500,
        background: "#e5e5e5"
    },
    width = style.width,
    height = style.height;

var parent,
    nodes,
    treemap;


window.onload = function () {
    parent = document.getElementById('parent');
    var style = 'width: ' + width + 'px;height: ' + height + 'px;background: #e5e5e5; ';
    parent.setAttribute('style', style);

    treemap = new treeMap(data, parent, width, height);
    treemap.start();
    console.log(treemap.data);
    treemap.render(treemap.data);


}

function treeMap(d, div, width, height) {
    this.data = d;
    this.totalSize = 0;

    this.dom = div;
    this.width = width;
    this.height = height;
    this.area = this.width * this.height;
}

treeMap.prototype.start = function() {
    // console.log('treemap start...');
    this.totalSize += this.compute(this.data);
    this.resize(this.data);
    this.pos(this.data);
}

treeMap.prototype.compute = function (o) {
    // console.log('treemap compute...');
    if(!o.children) {
        o.sum = o.size;
        return o.size;
    }

    var total = 0;
    for (var i = 0; i < o.children.length; i++) {
        total += this.compute(o.children[i]);
    }
    o.sum = total;
    return total;
}

treeMap.prototype.resize = function (o) {
    // console.log('treemap resize...');
    if (!o.children) {
        o.sum = o.sum / this.totalSize * this.area;
        return;
    }

    for (var i = 0; i < o.children.length; i++) {
        this.resize(o.children[i]);
    }
    o.sum = o.sum / this.totalSize * this.area;
    return;
}

treeMap.prototype.pos = function (o) {
    // console.log('treemap pos...');
    // console.log(o);
    if(o.name === "flare") {
        o.x = 0;
        o.y = 0;
        o.dx = this.width;
        o.dy = o.height;
    }

    if (!o.children) {
        return;
    }

    for (var i = 0; i < o.children.length; i++) {
        this.pos(o.children[i]);
    }
    // o.sum = o.sum / this.totalSize * this.area;
    // return;
}

treeMap.prototype.render = function (o) {
    // console.log('treemap render...');

    // if (!o.children) {
        // o.dx = 300;
        // o.dy = 100;
        // o.x = 200;
        // o.y = 300;
        var htmlstr = '<div class="node" style="width: ' + (o.dx - 2) + 'px; height: ' + (o.dy - 2) + 'px; left: ' + (o.x + 1) + 'px; top: ' + (o.y + 1) + 'px; background: green;"></div>';
        this.dom.innerHTML += htmlstr;
        // return;
    // }
    o.children.sort(function (a, b) {
        return a.sum <= b.sum ? 1 : -1;
    });

    this.pos(o);

    // for(var i = 0; i < o.children.length; i++) {
    //     this.render(o.children[i]);
    // }
    return;
}

