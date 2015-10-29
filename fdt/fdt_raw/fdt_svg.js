// svg
var svg = document.getElementsByTagName('svg')[0];
var width = svg.getAttribute('width'),
    height = svg.getAttribute('height'),
    padding = 20;

// circle styles
var radium = 5,
    linkcolor = '#999',
    circlecolor = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
    colors = [],
// link styles
    linkwidth = 1,
    linkopacity = .9;


var maxOffset = 50,
    offset = maxOffset + 1,
    zero = 0.001,
    charge = 3,
    linkDistance = 15,
    linkStrength = .0004;

// dom
var circles,
    links,
    circleNumber,
    linkNumber,
    circledoms,
    linkdoms;


window.onload = function () {
    circles = dataset.nodes;
    links = dataset.links;
    circleNumber = circles.length;
    linkNumber = links.length;

    // for (var i = 0; i < circleNumber; i++) {
    //     var g = parseInt(circles[i].group);
    //     if(colors[g]) {continue;}
    //     colors[g] = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')';
    // }

    // bind
    // for (var i = 0; i < circleNumber; i++) {
    //     circles[i].asSrc = [];
    //     circles[i].asTar = [];
    // }

    // for (var i = 0; i < linkNumber; i++) {
    //     var obj = links[i];
    //     circles[obj.source].asSrc.push(i);
    //     circles[obj.target].asTar.push(i);
    // }


    //init
    var circlePos = [];
    for (var i = 0; i < circleNumber; i++) { 
        var x = (Math.random() - 0.5) * 10 * linkDistance + width / 2;
        var y = (Math.random() - 0.5) * 10 * linkDistance  + height /2;
        circlePos.push([x, y]);
    }

    var linkStr = '';
    for (var i = 0; i < linkNumber; i++) {
        var source = links[i].source;
        var target = links[i].target;
        linkStr += '<line x1="' + circlePos[source][0] + '" y1="' + circlePos[source][1] + '" x2="' 
                + circlePos[target][0] + '" y2="' + circlePos[target][1] 
                + '" style="stroke:' + linkcolor + ';stroke-width: ' 
                + Math.sqrt(links[i].value) + '"/>'
    }
    svg.innerHTML += linkStr;
    linkdoms = document.getElementsByTagName('line');

    var circleStr = '';
    for (var i = 0; i < circleNumber; i++) {
        circleStr += '<circle cx="' + circlePos[i][0] + '" cy="' + circlePos[i][1] + '" r="' + radium + '" fill="' + circlecolor[circles[i].group] + '" />'
        // circleStr += '<circle cx="' + circlePos[i][0] + '" cy="' + circlePos[i][1] + '" r="' + radium + '" fill="' + colors[circles[i].group] + '" />'
    }
    svg.innerHTML += circleStr;
    circledoms = document.getElementsByTagName('circle');
    
    // while (offset >= maxOffset) {
    //     offset = 0;
        toBeBalance();
    // }

}

function toBeBalance() {
    // repulse
    var i = -1;
    while (++i < circleNumber) {
        var j = i;
        while (++j < circleNumber) {
            repulse(i, j);
        }
    }

    // attract
    var j = -1;
    while (++j < linkNumber) {
        attract(j);
    }

    // line 
    for (var i = 0; i < linkNumber; i++) {
        var thislink = linkdoms[i];
        var linkjson = links[i];
        var x1 = circledoms[linkjson.source].getAttribute('cx');
        var y1 = circledoms[linkjson.source].getAttribute('cy');
        var x2 = circledoms[linkjson.target].getAttribute('cx');
        var y2 = circledoms[linkjson.target].getAttribute('cy');
        thislink.setAttribute('x1', x1);
        thislink.setAttribute('y1', y1);
        thislink.setAttribute('x2', x2);
        thislink.setAttribute('y2', y2);
    }

    setTimeout(toBeBalance, 8);

    
}

function repulse(node1, node2) {
    var node1_cx = circledoms[node1].getAttribute('cx');
    var node1_cy = circledoms[node1].getAttribute('cy');

    var node2_cx = circledoms[node2].getAttribute('cx');
    var node2_cy = circledoms[node2].getAttribute('cy');
    var dx = node2_cx - node1_cx, dy = node2_cy - node1_cy, dn = dx * dx + dy * dy;
    var repweight = charge / dn;
    var x = repweight * dx;
    var y = repweight * dy;
    // offset += Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    // console.log(offset);
    // console.log(x);
    if((Math.abs(x) < zero) || (Math.abs(y) < zero)) {
        return;
    }

    circledoms[node1].setAttribute('cx', parseFloat(circledoms[node1].getAttribute('cx')) - x);
    circledoms[node1].setAttribute('cy', parseFloat(circledoms[node1].getAttribute('cy')) - y);
    
    circledoms[node2].setAttribute('cx', parseFloat(circledoms[node2].getAttribute('cx')) + x);
    circledoms[node2].setAttribute('cy', parseFloat(circledoms[node2].getAttribute('cy')) + y);

}

function attract(link) {
    // console.log(links[link]);
    var srcircle = circledoms[links[link].source],
        tarcircle = circledoms[links[link].target],
        sr_x = linkdoms[link].getAttribute('x1') || 0,
        sr_y = linkdoms[link].getAttribute('y1') || 0,
        tar_x = linkdoms[link].getAttribute('x2') || 0,
        tar_y = linkdoms[link].getAttribute('y2') || 0,
        dx = (tar_x - sr_x) - (linkDistance), dy = (tar_y - sr_y) - (linkDistance), dn = dx * dx + dy * dy,
        attractweight = linkStrength * Math.sqrt(dn);

    srcircle.setAttribute('cx', parseFloat(srcircle.getAttribute('cx')) + attractweight * dx);
    srcircle.setAttribute('cy', parseFloat(srcircle.getAttribute('cy')) + attractweight * dy);
    tarcircle.setAttribute('cx', parseFloat(tarcircle.getAttribute('cx')) - attractweight * dx);
    tarcircle.setAttribute('cy', parseFloat(tarcircle.getAttribute('cy')) - attractweight * dy);
    // console.log('dx= ' + dx + '   dy= ' + dy + '   attr_x= ' + attractweight * dx + '   attr_y= ' + attractweight * dy);
        
    // console.log(repweight * Math.sqrt(dx));
}
