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
    this.hier = {};
}


edgeBundle.prototype.start = function () {
    console.log('start...');
    this.init();

    this.renderNodes();

    // this.test();
    this.getHier();
    // this.getPaths();

}

edgeBundle.prototype.init = function () {
    console.log('init...');
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
        maxdepth = maxdepth > thisobj.depth ? maxdepth : thisobj.depth;
        this.data[i] = thisobj;
    }
    id += 2;
    this.perDegree = 360 / id;
    this.maxdepth = maxdepth;
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
        thisobj.txt = thisobj.layers[thisobj.depth - 1];
        this.data[i] = thisobj;
        txtstr += '<text class="node" transform="rotate(' + thisobj.degree + ')translate(' + thisobj.x + ',' + thisobj.y + ')' + (thisobj.degree < 90 ? '' : 'rotate(180)') + '" style="text-anchor: ' + (thisobj.degree < 90 ? 'start' : 'end') + ';">' + thisobj.txt + '</text>';
    }
    node.innerHTML += txtstr;
}

edgeBundle.prototype.getHier = function () {
    console.log('getHier...');
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
                json[pre] = pre;
            }
        }

        for (var key in json) {
            hier[i].push(json[key]);
        }

    }

    this.hier = hier;
    console.log(hier);




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

edgeBundle.prototype.test = function () {
    // var arr = {},
    //     data = this.data,
    //     maxdepth = this.maxdepth;

    // for (var i = 1; i < maxdepth; i++) {
    //     arr[i] = [];
    // }
    // console.log(arr);
    // console.log(maxdepth);

    // for (var i = 0; i < data.length; i++) {
    //     var thisobj = data[i];
    //     var prelayer = thisobj.layers;
    //     prelayer.pop();
    //     thisobj.pre = thisobj.layers.join('.');
    //     arr[thisobj.depth - 1].push(thisobj);
    // }

    // console.log(arr);

    // // unique
    // for(var i = 1; i < maxdepth; i++) {
    //     var thisarr = arr[i];
    //     var aim = {};
    //     for(var j = 0; j < thisarr.length; j++) {
    //         if(!aim[thisarr[j].pre]) {
    //             aim[thisarr[j].pre] = thisarr[j];
    //         }
    //     }
    //     arr[i] = [];
    //     for(var key in aim) {
    //         arr[i].push(aim[key]);
    //     }

    // }

    // console.log(arr);
}






