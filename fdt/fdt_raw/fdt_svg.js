var svg = document.getElementsByTagName('svg')[0];
var width = svg.getAttribute('width');
var height = svg.getAttribute('height');

var radium = 8,
    linkcolor = '#999',
    linkwidth = 1,
    linkopacity = .9,
    circlecolor = 'black',
    padding = 20;

var circles,
    links,
    circleNumber,
    linkNumber,
    circledoms,
    linkdoms;

var maxOffset = 50,
    zero = 0.001,
    charge = 120;


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
    // console.log(circledoms.length);
    // console.log(linkdoms.length);
    toBeBalance();

}

function toBeBalance() {
    //斥力更新
    var i = -1;
    while (++i < circleNumber) {
        repulse(i);
    }

    //弹力更新
    var j = -1;
    while (++j < linkNumber) {
        console.log(links[j]);
    }

    //重力更新
    // console.log('move');
    setTimeout(toBeBalance, 500);
    
}

function repulse(node) {
    var node_cx = circledoms[node].getAttribute('cx');
    var node_cy = circledoms[node].getAttribute('cy');

    // console.log("    " + node);
    var i = -1;
    while (++i < circleNumber) {
        if (node === i) {continue;}
        var i_cx = circledoms[i].getAttribute('cx');
        var i_cy = circledoms[i].getAttribute('cy');
        var dx = i_cx - node_cx, dy = i_cy - node_cy, dn = dx * dx + dy * dy;
        var repweight = charge / dn;
        circledoms[node].setAttribute('cx', parseFloat(circledoms[node].getAttribute('cx')) - repweight * dx);
        circledoms[node].setAttribute('cy', parseFloat(circledoms[node].getAttribute('cy')) - repweight * dy);
        // console.log(repweight);
    }
}




function circlemoveFunc() {
    alert("Hh");
}