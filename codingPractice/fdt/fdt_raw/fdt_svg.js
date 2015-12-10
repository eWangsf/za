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

var zero = .01,
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
    // sourcedoms = {},
    // targetdoms = {};

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
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
        circleele.setAttribute('id', i);
        circleele.setAttribute('fill', circlecolor[circles[i].group]);
        svg.appendChild(circleele);
        circledoms[i] = circleele;
    }

    var clock = setTimeout(toBeBalance, zero);
    addEvent();
}

function toBeBalance() {
    // attract
    var j = -1;
    while (++j < linkNumber) {
        attract(j);
    }

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

    clock = setTimeout(toBeBalance, zero);
}

function repulse(node1, node2) {
    var node1_cx = circledoms[node1].getAttribute('cx');
    var node1_cy = circledoms[node1].getAttribute('cy');

    var node2_cx = circledoms[node2].getAttribute('cx');
    var node2_cy = circledoms[node2].getAttribute('cy');
    var dx = node2_cx - node1_cx, dy = node2_cy - node1_cy, dn = dx * dx + dy * dy;
    var repweight = charge / dn;
    var x = repweight * dx * .8;
    var y = repweight * dy * .8;
    if((Math.abs(x) >= zero)) {
        circledoms[node1].setAttribute('cx', parseFloat(circledoms[node1].getAttribute('cx')) - x);
        circledoms[node2].setAttribute('cx', parseFloat(circledoms[node2].getAttribute('cx')) + x);
    }
    if((Math.abs(y) >= zero)) {
        circledoms[node1].setAttribute('cy', parseFloat(circledoms[node1].getAttribute('cy')) - y);
        circledoms[node2].setAttribute('cy', parseFloat(circledoms[node2].getAttribute('cy')) + y);
    }
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

    var x = attractweight * dx * .8,
        y = attractweight * dy * .8;
    if((Math.abs(attractweight) < zero)) {
        return;
    }

    srcircle.setAttribute('cx', parseFloat(srcircle.getAttribute('cx')) + x);
    srcircle.setAttribute('cy', parseFloat(srcircle.getAttribute('cy')) + y);
    tarcircle.setAttribute('cx', parseFloat(tarcircle.getAttribute('cx')) - x);
    tarcircle.setAttribute('cy', parseFloat(tarcircle.getAttribute('cy')) - y);
}

function addEvent() {
    var down = false;
    var thisnode,
        thisnodeid,
        thislinks;
    for(var key in circledoms) {
        circledoms[key].onmousedown = function (e) {
            thisnode = this;
            thisnodeid = thisnode.getAttribute('id');
            thislinks = {
                'source': [],
                'target': []
            };
            down = true;
        }     
    }

    svg.onmouseup = function (e) {
        thisnode = undefined;
        thisnodeid = undefined;
        thislinks = undefined;
        down = false;
        // clock = setTimeout(toBeBalance, zero);
    }
    svg.onmousemove = function (e) {
        if(down) {
            var x = e.pageX,
                y = e.pageY;
            thisnode.setAttribute('cx', x);
            thisnode.setAttribute('cy', y);
            for(var i = 0; i < thislinks['source'].length; i++) {
                thislinks['source'].setAttribute('x1', x);
                thislinks['source'].setAttribute('y1', y);
            }
            for(var i = 0; i < thislinks['target'].length; i++) {
                thislinks['target'].setAttribute('x2', x);
                thislinks['target'].setAttribute('y2', y);
            }
        }
    }




}
