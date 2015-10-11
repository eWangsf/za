var canvas,
    ctx,
    positions = [],
    flag = false, //是否存在节点移动：false-无
    ATTACH_FACTOR = 10,
    CULUN_FACTOR = 1 / (4 * Math.PI);
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for (var i = 0; i < data.nodes; i++) {
        positions.push([400 + 10 * i, 300 + 10 * i]);
    }
    Draw();
}

function Draw() {
    for (var i = 0; i < data.nodes; i++) {
        draw(i);
    }
}

function draw(node) {
    console.log('this id node: ' + node);
    var attachForce = {'weight': 0, 'degree': 0},
        repForce = {'weight': 0, 'degree': 0},
        aimPosi = [];

    if(node === 0) {
        ctx.beginPath();
        ctx.arc(positions[0][0], positions[0][1], 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'green';
        ctx.fill();
        return ;
    }
    //计算弹力的合力
    for (var i in data.links) {
        if (data.links[i]["source"] === node) {
            // console.log('source === node, ' + 'target = ' + data.links[i]['target']);
            // console.log(attachForce);
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["target"]));
        } else if (data.links[i]["target"] === node) {
            // console.log('target === node, ' + 'source = ' + data.links[i]['source']);
            // console.log(attachForce);
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["source"]));
        }
    }
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        repForce = computeForce(repForce, CalcRepulsionForce(node, i));
    }
    //计算作用在这个节点上的合力的方向

    //置flag
    // if ((aimPosi[0] != positions[node][0]) || (aimPosi[1] != positions[node][1])) {
    //     flag = true;
    // }
}



function CalcRepulsionForce(x, y) {
    // console.log(x + " - " + y);
    var weight = 0;
    var degree = {};
    weight = CULUN_FACTOR * data.links[x]['value'] * data.links[y]['value'] / Math.pow(distance(x, y), 2);
    degree = getDegree(x, y);

    return {
        'weight': weight,
        'degree': degree
    }
}

function CalcAttractionForce(x, y) {
    var weight = 0;
    var degree = {};
    weight = - ATTACH_FACTOR * distance(x, y);
    degree = getDegree(x, y);

    return {
        'weight': weight,
        'degree': degree
    };
}

function computeForce(A, B) { //计算两个力的合力
    var force = {'weight': 0, 'degree': 0};
    console.log('计算  ' + A + '  和  ' + B + '  的合力');
    return force;
}


function distance(x, y) {
    var distance = Math.sqrt(Math.pow(positions[x][0] - positions[y][0]) + Math.pow(positions[x][1] - positions[y][1]) + Math.pow(positions[x][2] - positions[y][2]));
    return distance;
}

function getDegree(x, y) {
    var degree = {'x': 0, 'y': 0, 'z': 0};
    var vec = {'x': positions[x][0] - positions[y][0], 'y': positions[x][1] - positions[y][1], 'z': positions[x][2] - positions[y][2]};
    var x = {'x': 1, 'y': 0, 'z': 0};
    var y = {'x': 0, 'y': 1, 'z': 0};
    var z = {'x': 0, 'y': 0, 'z': 1};
    degree['x'] = vec['x'] * x['x'] / (Math.sqrt(Math.pow(vec['x']) + Math.pow(vec['y']) + Math.pow(vec['z'])));
    degree['y'] = vec['y'] * y['y'] / (Math.sqrt(Math.pow(vec['x']) + Math.pow(vec['y']) + Math.pow(vec['z'])));
    degree['z'] = vec['z'] * z['z'] / (Math.sqrt(Math.pow(vec['x']) + Math.pow(vec['y']) + Math.pow(vec['z'])));
    // console.log('~~~~~~~' + degree['x']);
    return degree;
}


var data = {
  "nodes": 3,
  "links": [
    {"source": 0, "target": 1, "value": 1},
    {"source": 1, "target": 2, "value": 1},
    {"source": 0, "target": 2, "value": 1}
  ]
}

