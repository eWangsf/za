
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

var btn;

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    btn = document.getElementsByTagName('button')[0];
    // btn click
    btn.onclick = update;

    // compute f
    for(var i = 0; i < n; i++) {
        data.push(bumpLayer(m));
    }

    // compute g
    stack('wiggle');

    // scales
    yscale = new yScale(data);
    yscale.init();
    xscale = new xScale();
    xscale.setdomain([0, m]);
    xscale.setrange([0, width]);

    // render function
    render();

}

function stack(type) {
    switch(type) {
    case 'wiggle': {
        for(var j = 0; j < data[0].length; j++) {
            // data[0][j].y0 = 0;
            var tmp = 0;
            for (var k = 0; k < n; k++) {
                tmp += (n - k + 1) * data[k][j].y;
            }
            tmp *= -1 / (n + 1);
            data[0][j].y0 = tmp;
            data[0][j].y1 = data[0][j].y0 + data[0][j].y;
        }
        console.log(data);
        break;
    }
    }
    


    for(var i = 1; i < data.length; i++) {
        for(var j = 0; j < data[0].length; j++) {
            data[i][j].y0 = data[i - 1][j].y0 + data[i - 1][j].y;
            data[i][j].y1 = data[i][j].y0 + data[i][j].y;
        }
    }
}

function render() {
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

function update() {
    data = [];
    for(var i = 0; i < n; i++) {
        data.push(bumpLayer(m));
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
    this.max = Number.MIN_VALUE;
    this.min = Number.MAX_VALUE;
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
                if(dataset[i][j].y1 < this.min) {
                    this.min = dataset[i][j].y1;
                }
            }
        }
    },
    yscale: function (d) {
        return height - ((d - this.min) / (this.max - this.min)) * height * 0.9;
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