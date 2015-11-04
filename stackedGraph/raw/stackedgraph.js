
var svg,
    width,
    height;

var n = 20,
    m = 200;

var data = [],
    colors = [
        "rgb(92, 190, 0)", "rgb(200, 44, 0)", 
        "rgb(9, 68, 0)", "rgb(101, 137, 0)", 
        "rgb(86, 4, 0)", "rgb(227, 54, 0)", 
        "rgb(60, 51, 0)", "rgb(83, 43, 0)", 
        "rgb(143, 47, 0)", "rgb(49, 213, 0)", 
        "rgb(145, 117, 0)", "rgb(203, 0, 0)", 
        "rgb(108, 9, 0)", "rgb(177, 190, 0)", 
        "rgb(55, 15, 0)", "rgb(206, 245, 0)", 
        "rgb(106, 48, 0)", "rgb(254, 240, 0)", 
        "rgb(226, 77, 0)", "rgb(78, 115, 0)"
    ];


window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    for(var i = 0; i < n; i++) {
        data.push(bumpLayer(m));
    }

    draw();
}

function draw() {
    for(var j = 0; j < data.length; j++) {
        var pathStr = '<path d="';
        for(var i = 0; i < data[j].length; i++) {
            if (i === 0) {
                pathStr += 'M' + xscale(data[j][i].x) + ' ' + data[j][i].y * 20 + ' ';
                continue;
            }
            pathStr += 'L' + xscale(data[j][i].x) + ' ' + data[j][i].y * 20 + ' ';
        }
        pathStr += 'Z" fill="' + colors[j] + '"/>';
        svg.innerHTML = svg.innerHTML + pathStr;
    }
    
}


function xscale(d) {
    this.widthstep = width / m;
    return d * this.widthstep;
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