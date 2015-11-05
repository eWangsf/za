
var svg,
    width,
    height;

var n = 20,
    m = 200;

var data = [],
    colors = [
        "rgb(74, 73, 93)", "rgb(90, 88, 118)", 
        "rgb(121, 119, 165)", "rgb(99, 98, 132)",
        "rgb(97, 95, 129)", "rgb(88, 86, 115)"
    ];
var yscale,
    xscale;
window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    for(var i = 0; i < n; i++) {
        data.push(bumpLayer(m));
    }

    stack();

    yscale = new yScale(data);
    yscale.init();
    xscale = new xScale();
    xscale.setdomain([0, m]);
    xscale.setrange([0, width]);

    draw();
}

function stack() {
    for(var j = 0; j < data[0].length; j++) {
        data[0][j].y0 = 0;
        data[0][j].y1 = data[0][j].y;
    }
    for(var i = 1; i < data.length; i++) {
        for(var j = 0; j < data[0].length; j++) {
            data[i][j].y0 = data[i - 1][j].y0 + data[i - 1][j].y;
            data[i][j].y1 = data[i][j].y0 + data[i][j].y;
        }
    }
}

function draw() {
    var length = data[0].length;
    for(var i = 0; i < data.length; i++) {

        var pathStr = '<path d="';
        for(var j = 0; j < length; j++) {
            if (j === 0) {
                pathStr += 'M' + xscale.xscale(data[i][j].x) + ', ' + yscale.yscale(data[i][j].y1);
                continue;
            }
            pathStr += 'L' + xscale.xscale(data[i][j].x) + ', ' + yscale.yscale(data[i][j].y1);
        }
        for(var j = length - 1; j >= 0; j--) {
            pathStr += 'L' + xscale.xscale(data[i][j].x) + ', ' + yscale.yscale(data[i][j].y0);
        }

        var color = parseInt(Math.random() * 6);
        pathStr += '" fill="' + colors[color] + '"/>';
        svg.innerHTML = svg.innerHTML + pathStr;
    }
    
}


function xScale() {
    this.domain = [0, 1];
    this.range = [0, 1];
    this.widthstep = 1;
}

xScale.prototype = {
    setdomain: function (arr) {
        this.domain = arr;
    },
    setrange: function (arr) {
        this.range = arr;
    },
    xscale: function (d) {
        this.widthstep = (d - this.domain[0]) / this.domain[1];
        return (this.range[1] - this.range[0]) * this.widthstep;
    }
}

function yScale(dataset) {
    this.max = 0;
    this.data = dataset;
}

yScale.prototype = {
    init: function () {
        var dataset = this.data;
        for(var i = 0; i < dataset.length; i++) {
            for(var j = 0; j < dataset[i].length; j++) {
                if(dataset[i][j].y1 > this.max) {

                    this.max = dataset[i][j].y1;
                }
            }
        }
    },
    yscale: function (d) {
        return height - (d / this.max) * height * 0.8;
    }
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

    var res = a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
    return res;
}