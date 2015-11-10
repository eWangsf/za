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
    this.maxdepth = 1;
    this.layerwidth = 100;
    this.hier = {};
    this.indexedData = {};

}

edgeBundle.prototype.start = function () {
    this.init();
    this.renderLeafNodes();
    this.getHier();
    this.renderMiddleNodes();
    this.renderPaths();
    // this.test();
}

edgeBundle.prototype.init = function () {
    var thisobj;
    var maxdepth = this.maxdepth;
    var id = 0;
    for (var i = 0; i < this.data.length; i++) {
        id++;
        thisobj = this.data[i];
        thisobj.layers = thisobj.name.split('.');
        thisobj.depth = thisobj.layers.length;
        if((i > 0) && thisobj.layers[thisobj.depth - 2] != this.data[i - 1].layers[this.data[i - 1].depth - 2]) {
            id++;
        }
        thisobj.id = id;
        thisobj.pre = {};
        var tmp = thisobj.name.split('.');
        for(var k = tmp.length - 1; k > 0; k--) {
            tmp.pop();
            thisobj.pre[k] = tmp.join('.');
        }
        maxdepth = maxdepth > thisobj.depth ? maxdepth : thisobj.depth;
        this.data[i] = thisobj;
        if(!this.indexedData[thisobj.name]) {
            this.indexedData[thisobj.name] = thisobj;
        }
    }
    id += 2;
    this.perDegree = 360 / id;
    this.maxdepth = maxdepth;
    this.layerwidth = width / 2 / maxdepth;
}

edgeBundle.prototype.renderLeafNodes = function () {
    var thisobj;
    var txtstr = '';
    for (var i = 0; i < this.data.length; i++) {
        thisobj = this.data[i];
        thisobj.degree = (thisobj.id) * this.perDegree - 90;
        thisobj.x = width / 2 - this.layerwidth;
        thisobj.y = 0;
        thisobj.txt = thisobj.layers[thisobj.depth - 1];
        this.data[i] = thisobj;
        txtstr += '<text class="node" transform="rotate(' + thisobj.degree + ')translate(' + thisobj.x + ',' + thisobj.y + ')' + (thisobj.degree < 90 ? '' : 'rotate(180)') + '" style="text-anchor: ' + (thisobj.degree < 90 ? 'start' : 'end') + ';">' + thisobj.txt + '</text>';
    }
    node.innerHTML += txtstr;
}

edgeBundle.prototype.renderMiddleNodes = function () {
    var txtstr = '';
    for(var key in this.hier) {
        var thispre;
        // var x = ( (width / 2 - 128) / (this.maxdepth - 1) ) * (key - 1);
        // console.log(width / 2 / this.maxdepth);
        var x = this.layerwidth * (key - 1);
        var y = 0;
        for(var j = 0; j < this.hier[key].length; j++) {
            thispre = this.hier[key][j];
            var degree = thispre.id * this.perDegree - 90;
            var txt = thispre.pre.split('.').pop();
            txtstr += '<text class="node" transform="rotate(' + degree  + ')translate(' + x + ',' + y + ')' + (degree < 90 ? '' : 'rotate(180)') + '" style="text-anchor: ' + (degree < 90 ? 'start' : 'end') + ';">' + txt + '</text>';
        }
    }
    node.innerHTML += txtstr;
}

edgeBundle.prototype.getHier = function () {
    var hier = {},
        data = this.data,
        maxdepth = this.maxdepth;
    for (var i = 1; i < maxdepth; i++) {
        hier[i] = [];
    }

    // json: {
    //     1: arr, //第一个层级可能的pre
    //     2: arr, //第二个层级可能的pre
    //     3: arr, //第三个层级可能的pre
    //     4: arr  //第四个层级可能的pre
    // }
    for(var i = maxdepth - 1; i > 0; i--) {
        var thisobj;
        var json = {};
        for(var j = 0; j < data.length; j++) {
            thisobj = data[j];
            var layers = thisobj.layers,
                pre = '';
            if(layers.length <= i) {
                continue;
            }
            for(var k = 0; k < i; k++) {
                pre += layers[k];
                if (k < i - 1) {
                    pre += '.';
                }
            }
            if(!json[pre]) {
                json[pre] = {
                    pre: pre,
                    depth: i,
                    start: 0,
                    end: 0
                }
            }
        }
        for (var key in json) {
            hier[i].push(json[key]);
        }
    }
    var thisarr;
    for(var key in hier) {
        thisarr = hier[key];
        var thispre;
        var res;
        for(var j = 0; j < thisarr.length; j++) {
            thispre = thisarr[j];
            res = [];
            for(var k = 0; k < data.length; k++) {
                if(key > data[k].depth) {
                    continue;
                }
                if(data[k].pre[key] === thispre.pre) {
                    res.push(data[k]);
                }
            }
            hier[key][j].start = res[0].id;
            hier[key][j].end = res.pop().id;
            hier[key][j].id = 0.5 * (hier[key][j].start + hier[key][j].end);
        }
    }

    this.hier = hier;
}

edgeBundle.prototype.renderPaths = function () {
    var paths = [];
    var data = this.data;
    // get
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].imports.length; j++) {
            paths.push(this.getPath(data[i].name, data[i].imports[j]));
            // paths.push(this.getPath("flare.analytics.cluster.AgglomerativeCluster", "flare.analytics.cluster.CommunityStructure"));
        }
    }
    this.paths = paths;

    // render
    for (var i = 0; i < paths.length; i++) {
        this.renderThisPath(paths[i]);
    }
}

edgeBundle.prototype.getPath = function (name1, name2) {
    // console.log('getPath...');
    var path = [];
    var indexedData = this.indexedData,
        hier = this.hier,
        obj1 = indexedData[name1],
        obj2 = indexedData[name2],
        layers1 = obj1.layers,
        layers2 = obj2.layers,
        less = obj1.depth < obj2.depth ? obj1.depth : obj2.depth;
    // console.log(obj1);
    // console.log(obj2);
    
    var lca = '';
    var parentdepth;
    for(var i = less - 1; i >= 0; i--) {
        if(obj1.pre[i] === obj2.pre[i]) {
            lca = obj1.pre[i];
            parentdepth = i;
            break;
        }
    }
    var r = this.layerwidth * (layers1.length - 1);
    var pos = {
        x: width / 2 + r * Math.cos((this.perDegree * obj1.id - 90) / 180 * Math.PI),
        y: width / 2 - r * Math.sin((this.perDegree * obj1.id - 90) / 180 * Math.PI)
    };
    path.push(pos);
    var pre = '';
    for(var i = obj1.depth - 1; i > parentdepth; i--) {
        pre = obj1.pre[i];
        var r = this.layerwidth * (i - 1);
        var id = 0;
        for(var j = 0; j < hier[i].length; j++) {
            if(pre === hier[i][j].pre) {
                id = hier[i][j].id;
            }
        }
        var pos = {
            x: width / 2 + r * Math.cos((this.perDegree * id - 90) / 180 * Math.PI),
            y: width / 2 - r * Math.sin((this.perDegree * id - 90) / 180 * Math.PI)
        };
        path.push(pos);
    }
    var r = this.layerwidth * (lca.split('.').length - 1);
    var id = 0;
    for(var j = 0; j < hier[i].length; j++) {
        if(pre === hier[i][j].pre) {
            id = hier[i][j].id;
        }
    }
    var pos = {
        x: width / 2 + r * Math.cos((this.perDegree * id - 90) / 180 * Math.PI),
        y: width / 2 - r * Math.sin((this.perDegree * id - 90) / 180 * Math.PI)
    };
    path.push(pos);
    for(var i = parentdepth + 1; i < obj2.depth; i++) {
        pre = obj2.pre[i];
        var r = this.layerwidth * (i - 1);
        var id = 0;
        for(var j = 0; j < hier[i].length; j++) {
            if(pre === hier[i][j].pre) {
                id = hier[i][j].id;
            }
        }
        var pos = {
            x: width / 2 + r * Math.cos((this.perDegree * id - 90) / 180 * Math.PI),
            y: width / 2 - r * Math.sin((this.perDegree * id - 90) / 180 * Math.PI)
        };
        path.push(pos);
    }
    var r = this.layerwidth * (layers2.length - 1);
    var pos = {
        x: width / 2 + r * Math.cos((this.perDegree * obj2.id - 90) / 180 * Math.PI),
        y: width / 2 - r * Math.sin((this.perDegree * obj2.id - 90) / 180 * Math.PI)
    };
    path.push(pos);



    // console.log(path);
    return path;
}

edgeBundle.prototype.renderThisPath = function (path) {
    // console.log('renderThisPath...');



}

edgeBundle.prototype.test = function () {
    var sum = 0;
    for(var i = 0; i < data.length; i++) {
        sum += data[i].imports.length;
    }
    console.log(sum);
}








