//svg
var svg = document.getElementsByTagName('svg')[0];
var width = svg.getAttribute('width'),
    height = svg.getAttribute('height'),
    padding = 20;

//circle样式
var radium = 8,
    linkcolor = '#999',
    circlecolor = 'black',
//link样式
    linkwidth = 1,
    linkopacity = .9;


var maxOffset = 50,
    zero = 0.001,
    charge = 30,
    linkDistance = 20,
    linkStrength = .0002,
    gravity = 0.1;

//dom变量
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

    //初始化元素位置
    var circleStr = '';
    for (var i = 0; i < circleNumber; i++) { 
        var x = Math.random() * (width - 2 * padding) + padding;
        var y = Math.random() * (height - 2 * padding) + padding;
        circleStr += '<circle cx="' + x + '" cy="' + y + '" r="' + radium + '" fill="' + circlecolor + '" onclick="circlemoveFunc(this)"/>'
    }
    svg.innerHTML = circleStr;

    circledoms = document.getElementsByTagName('circle');

    var linkStr = '';
    for (var i = 0; i < linkNumber; i++) {
        var source = links[i].source;
        var target = links[i].target;
        linkStr += '<line x1="' + circledoms[source].getAttribute('cx') + '" y1="' + circledoms[source].getAttribute('cy') + '" x2="' + circledoms[target].getAttribute('cx') + '" y2="' + circledoms[target].getAttribute('cy') + '" style="stroke:' + linkcolor + ';stroke-width: ' + linkwidth + '"/>'
    }
    svg.innerHTML += linkStr;
    linkdoms = document.getElementsByTagName('line');

    //layout algorithm
    toBeBalance();

}

function toBeBalance() {
    //斥力更新
    var i = -1;
    while (++i < circleNumber) {
        var j = i;
        while (++j < circleNumber) {
            repulse(i, j);
        }
    }

    //弹力更新
    // var j = -1;
    // while (++j < linkNumber) {
    //     attract(j);
    // }

    //重力更新

    setTimeout(toBeBalance, 50);
}

function repulse(node1, node2) {
    var node1_cx = circledoms[node1].getAttribute('cx');
    var node1_cy = circledoms[node1].getAttribute('cy');

    // console.log("    " + node);
    // var i = -1;
    // while (++i < circleNumber) {
    //     if (node1 === i) {continue;}
        var node2_cx = circledoms[node2].getAttribute('cx');
        var node2_cy = circledoms[node2].getAttribute('cy');
        // var i_cx = circledoms[i].getAttribute('cx');
        // var i_cy = circledoms[i].getAttribute('cy');
        var dx = node2_cx - node1_cx, dy = node2_cy - node1_cy, dn = dx * dx + dy * dy;
        var repweight = charge / dn;
        circledoms[node1].setAttribute('cx', parseFloat(circledoms[node1].getAttribute('cx')) - repweight * dx);
        circledoms[node1].setAttribute('cy', parseFloat(circledoms[node1].getAttribute('cy')) - repweight * dy);
        circledoms[node2].setAttribute('cx', parseFloat(circledoms[node2].getAttribute('cx')) + repweight * dx);
        circledoms[node2].setAttribute('cy', parseFloat(circledoms[node2].getAttribute('cy')) + repweight * dy);
        console.log("x: " + repweight * dx + "  y: " + repweight * dy);
    // }

    return true;
}

function attract(link) {
    console.log(links[link]);
    var srcircle = circledoms[links[link].source],
        tarcircle = circledoms[links[link].target],
        sr_x = linkdoms[link].getAttribute('x1') || 0,
        sr_y = linkdoms[link].getAttribute('y1') || 0,
        tar_x = linkdoms[link].getAttribute('x2') || 0,
        tar_y = linkdoms[link].getAttribute('y2') || 0,
        dx = Math.abs(tar_x - sr_x) - Math.sqrt(linkDistance), dy = Math.abs(tar_y - sr_y) - Math.sqrt(linkDistance), dn = dx * dx + dy * dy,
        attractweight = linkStrength * Math.sqrt(dn);

    srcircle.setAttribute('cx', parseFloat(srcircle.getAttribute('cx')) + attractweight * dx);
    srcircle.setAttribute('cy', parseFloat(srcircle.getAttribute('cy')) + attractweight * dy);
    tarcircle.setAttribute('cx', parseFloat(tarcircle.getAttribute('cx')) - attractweight * dx);
    tarcircle.setAttribute('cy', parseFloat(tarcircle.getAttribute('cy')) - attractweight * dy);
    console.log('dx= ' + dx + '   dy= ' + dy + '   attr_x= ' + attractweight * dx + '   attr_y= ' + attractweight * dy);
    // console.log('sr: x= ' + sr_x + '  y= ' + sr_y);
    // console.log('tar: x= ' + tar_x + '  y= ' + tar_y);
    // srcircle.setAttribute('cx', parseFloat(srcircle.getAttribute('cx')) + attractweight * Math.sqrt(dx));
    // srcircle.setAttribute('cy', parseFloat(srcircle.getAttribute('cy')) + repweight * Math.sqrt(dy));
        
    // console.log(repweight * Math.sqrt(dx));
}




function circlemoveFunc() {
    alert("Hh");
}