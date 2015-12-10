// svg
var svg;
var width,
    height,
    padding = 20;

// circle styles
var radium = 5,
    circlecolor = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
    colors = [],
// link styles
    linkwidth = 1,
    linkopacity = .9;


var maxOffset = 50,
    offset = maxOffset + 1,
    zero = .001,
    charge = 10,
    linkDistance = 15,
    linkStrength = .0004;

// dom
var circles,
    links,
    circleNumber,
    linkNumber,
    circledoms = {},
    linkdoms = {};


window.onload = function () {
    var svg = document.getElementsByTagName('svg')[0];
    var width = svg.getAttribute('width'),
        height = svg.getAttribute('height'),
        padding = 20;
    circles = dataset.nodes;
    links = dataset.links;
    circleNumber = circles.length;
    linkNumber = links.length;

    for (var i = 0; i < linkNumber; i++) {
        var linkele = document.createElementNS('http://www.w3.org/2000/svg','line');
        circles[links[i].source].x = circles[links[i].source].x || ((Math.random() - 0.5) * 5 * linkDistance + width / 2);
        circles[links[i].source].y = circles[links[i].source].y || ((Math.random() - 0.5) * 5 * linkDistance  + height / 2);

        circles[links[i].target].x = circles[links[i].target].x || ((Math.random() - 0.5) * 5 * linkDistance + width / 2);
        circles[links[i].target].y = circles[links[i].target].y || ((Math.random() - 0.5) * 5 * linkDistance  + height / 2);
        linkele.setAttribute('x1', circles[links[i].source].x);
        linkele.setAttribute('y1', circles[links[i].source].y);
        linkele.setAttribute('x2', circles[links[i].target].x);
        linkele.setAttribute('y2', circles[links[i].target].y);
        linkele.setAttribute('style', 'stroke-width: ' + Math.sqrt(links[i].value));
        svg.appendChild(linkele);
        linkdoms[i] = linkele;
    }

    for (var i = 0; i < circleNumber; i++) {
        var circleele = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleele.setAttribute('cx', circles[i].x);
        circleele.setAttribute('cy', circles[i].y);
        circleele.setAttribute('r', radium);
        circleele.setAttribute('fill', circlecolor[circles[i].group]);
        svg.appendChild(circleele);
        circledoms[i] = circleele;
    }

    
    var clock = setTimeout(toBeBalance, 0);
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

    // attract
    var j = -1;
    while (++j < linkNumber) {
        attract(j);
    }

    clock = setTimeout(toBeBalance, 0);
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
    if((Math.abs(x) < zero) || (Math.abs(y) < zero)) {
        return;
    }

    circledoms[node1].setAttribute('cx', parseFloat(circledoms[node1].getAttribute('cx')) - x);
    circledoms[node1].setAttribute('cy', parseFloat(circledoms[node1].getAttribute('cy')) - y);
    circledoms[node2].setAttribute('cx', parseFloat(circledoms[node2].getAttribute('cx')) + x);
    circledoms[node2].setAttribute('cy', parseFloat(circledoms[node2].getAttribute('cy')) + y);
}

function attract(link) {
    var srcircle = circledoms[links[link].source],
        tarcircle = circledoms[links[link].target],
        sr_x = linkdoms[link].getAttribute('x1') || 0,
        sr_y = linkdoms[link].getAttribute('y1') || 0,
        tar_x = linkdoms[link].getAttribute('x2') || 0,
        tar_y = linkdoms[link].getAttribute('y2') || 0,
        dx = (tar_x - sr_x) - (linkDistance), dy = (tar_y - sr_y) - (linkDistance), dn = dx * dx + dy * dy,
        attractweight = linkStrength * Math.sqrt(dn);

    if((Math.abs(attractweight) < zero)) {
        return;
    }

    srcircle.setAttribute('cx', parseFloat(srcircle.getAttribute('cx')) + attractweight * dx);
    srcircle.setAttribute('cy', parseFloat(srcircle.getAttribute('cy')) + attractweight * dy);
    tarcircle.setAttribute('cx', parseFloat(tarcircle.getAttribute('cx')) - attractweight * dx);
    tarcircle.setAttribute('cy', parseFloat(tarcircle.getAttribute('cy')) - attractweight * dy);
}
