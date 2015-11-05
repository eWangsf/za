
var svg,
    width,
    height;

var n = 20,
    m = 200;

var data = [],
    // colors = [
    //     "rgb(92, 190, 0)", "rgb(200, 44, 0)", 
    //     "rgb(9, 68, 0)", "rgb(101, 137, 0)", 
    //     "rgb(86, 4, 0)", "rgb(227, 54, 0)", 
    //     "rgb(60, 51, 0)", "rgb(83, 43, 0)", 
    //     "rgb(143, 47, 0)", "rgb(49, 213, 0)", 
    //     "rgb(145, 117, 0)", "rgb(203, 0, 0)", 
    //     "rgb(108, 9, 0)", "rgb(177, 190, 0)", 
    //     "rgb(55, 15, 0)", "rgb(206, 245, 0)", 
    //     "rgb(106, 48, 0)", "rgb(254, 240, 0)", 
    //     "rgb(226, 77, 0)", "rgb(78, 115, 0)"
    // ];
    colors = [
        "rgb(74, 73, 93)", "rgb(90, 88, 118)", 
        "rgb(121, 119, 165)", "rgb(99, 98, 132)",
        "rgb(97, 95, 129)", "rgb(88, 86, 115)"
    ];

var baseline = [];

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    for(var i = 0; i < n; i++) {
        data.push(bumpLayer(m));
    }
    for(var i = 0; i < m; i++) {
        baseline.push(height);
    }
    console.log(baseline);

    draw();
}

function draw() {
    var paths = [];
    for(var i = 0; i < data.length; i++) {
        var pathStr = '<path d="';
        for(var j = 0; j < data[i].length; j++) {
            baseline[j] -= data[i][j].y * 20;
            if (j === 0) {
                pathStr += 'M' + xscale(data[i][j].x) + ', ' + baseline[j];
                continue;
            }
            pathStr += 'L' + xscale(data[i][j].x) + ', ' + baseline[j];
        }
        // var color = 'rgb(' + (parseInt(Math.random() * 30) + 150) + ', ' + (parseInt(Math.random() * 30) + 150) + ', ' + (parseInt(Math.random() * 30) + 180) + ')';
        
        var color = parseInt(Math.random() * 6);
        // console.log(color);
        pathStr += ' L1000 500 L0 500" fill="' + colors[color] + '"/>';
        paths.push(pathStr);
    }

    for(var i = data.length; i >= 0; i--) {
        svg.innerHTML = svg.innerHTML + paths[i];
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