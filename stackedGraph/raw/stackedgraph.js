
var svg,
    width,
    height;

var btn,
    graph;

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    btn = document.getElementsByTagName('button')[0];
    
    // btn click
    btn.onclick = update;

    graph = new stackedGraph('wiggle');
    graph.start();
    graph.render(svg);

}

function stackedGraph(type) {
    this.data = [];
    this.layerNum = 20;
    this.layerPoints = 200;
    this.colors = [
        "rgb(74, 73, 93)", "rgb(90, 88, 118)", 
        "rgb(121, 119, 165)", "rgb(99, 98, 132)",
        "rgb(97, 95, 129)", "rgb(88, 86, 115)"
    ];
    this.type = type;
    this.xscale = new xScale();
    this.yscale = new yScale([]);
}

stackedGraph.prototype = {
    start: function () {
        this.data = [];
        for(var i = 0; i < this.layerNum; i++) {
            this.data.push(bumpLayer(this.layerPoints));
        }
        switch(this.type) {
        case 'wiggle': {
            for(var j = 0; j < this.layerPoints; j++) {
                // data[0][j].y0 = 0;
                var tmp = 0;
                for (var k = 0; k < this.layerNum; k++) {
                    tmp += (this.layerNum - k + 1) * this.data[k][j].y;
                }
                tmp *= -1 / (this.layerNum + 1);
                this.data[0][j].y0 = tmp;
                this.data[0][j].y1 = this.data[0][j].y0 + this.data[0][j].y;
            }
            break;
        }
        }
        
        for(var i = 1; i < this.layerNum; i++) {
            for(var j = 0; j < this.layerPoints; j++) {
                this.data[i][j].y0 = this.data[i - 1][j].y0 + this.data[i - 1][j].y;
                this.data[i][j].y1 = this.data[i][j].y0 + this.data[i][j].y;
            }
        }

        // scales
        this.yscale = new yScale(this.data);
        this.yscale.init();
        this.xscale.setdomain([0, this.layerPoints]);
        this.xscale.setrange([0, width]);

    },
    getData: function () {
        return this.data;
    },
    render: function (svg) {
        svg.innerHTML = "";
        var length = this.layerPoints,
            data = this.data;
        for(var i = 0; i < this.layerNum; i++) {

            var pathStr = '<path d="';
            for(var j = 0; j < length; j++) {
                if (j === 0) {
                    pathStr += 'M' + this.xscale.xscale(data[i][j].x) + ', ' + this.yscale.yscale(data[i][j].y1);
                    continue;
                }
                pathStr += 'L' + this.xscale.xscale(data[i][j].x) + ', ' + this.yscale.yscale(data[i][j].y1);
            }
            for(var j = length - 1; j >= 0; j--) {
                pathStr += 'L' + this.xscale.xscale(data[i][j].x) + ', ' + this.yscale.yscale(data[i][j].y0);
            }

            var color = parseInt(Math.random() * 6);
            pathStr += '" fill="' + this.colors[color] + '"/>';
            svg.innerHTML = svg.innerHTML + pathStr;
        }
    }
}

function update() {
    graph = new stackedGraph('wiggle');
    graph.start();
    
    graph.render(svg);

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