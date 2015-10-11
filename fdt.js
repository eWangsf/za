var canvas,
    ctx,
    positions = [],
    flag = false, //是否存在节点移动：false-无
    ATTACH_FACTOR = 0.1,
    CULUN_FACTOR = 600000 / (4 * Math.PI);
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for (var i = 0; i < data.nodes; i++) {
        positions.push([400 + 200 * (Math.random() - 0.5), 300 + 200 * (Math.random() - 0.5), 200 * (Math.random() - 0.5)]);
    }
    console.log(positions);
    Draw();
}

function Draw() {
    for (var i = 0; i < data.nodes; i++) {
        draw(i);
    }
    while(flag) {
        for (var i = 0; i < data.nodes; i++) {
            draw(i);
        }
    }
    alert('finished');
}

function draw(node) {
    console.log('node: ' + node + '  position: (' + positions[node][0] + ', ' + positions[node][1] + ', ' + positions[node][2] + ')');
    var attachForce = {
            'weight': 0, 
            'degree': {'x': 0, 'y': 0, 'z': 0}
        },
        repForce = {
            'weight': 0, 
            'degree': {'x': 0, 'y': 0, 'z': 0}
        },
        aimPosi = [];

    if(node === 0) {
        ctx.beginPath();
        ctx.arc(positions[node][0], positions[node][1], 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'green';
        ctx.fill();
        return ;
    }
    //计算弹力的合力
    for (var i in data.links) {
        if (data.links[i]["source"] === node) {
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["target"]));
        } else if (data.links[i]["target"] === node) {
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["source"]));
        }
    }
    // console.log(attachForce);
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        repForce = computeForce(repForce, CalcRepulsionForce(node, i));
    }
    // console.log(repForce);
    //计算作用在这个节点上的合力的方向
    var force_total = computeForce(attachForce, repForce);
    // console.log(force_total);
    var beforePos = positions[node];
    var pos_x = beforePos[0];
        pos_y = beforePos[1],
        pos_z = beforePos[2]; 
    positions[node] = [
        pos_x + force_total['weight'] * force_total['degree']['x'],
        pos_y + force_total['weight'] * force_total['degree']['y'],
        pos_z + force_total['weight'] * force_total['degree']['z'],
    ];
    var nowPos = positions[node];
    // console.log('position change : ' + beforePos + ' to ' + nowPos);
    ctx.beginPath();
    ctx.arc(positions[node][0], positions[node][1], 4, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'green';
    ctx.fill();

    // 置flag
    if ((nowPos[0] != beforePos[0]) || (nowPos[1] != beforePos[1])) {
        flag = true;
        console.log(node);
    }
    
}



function CalcRepulsionForce(x, y) {
    var weight = 0;
    var degree = {};
    weight = (CULUN_FACTOR * data.links[x]['value'] * data.links[y]['value']) / Math.pow(distance(x, y), 2);
    degree = getDegree(x, y);

    return {
        'weight': weight,
        'degree': degree
    }
}

function CalcAttractionForce(x, y) {
    var weight = 0;
    var degree = {};
    weight = ATTACH_FACTOR * distance(x, y);
    degree = getDegree(x, y);

    return {
        'weight': weight,
        'degree': degree
    };
}

function computeForce(A, B) { //计算两个力的合力
    var force = {'weight': 0, 'degree': {'x': 0, 'y': 0, 'z': 0}};
    var x_force = A['weight'] * A['degree']['x'] + B['weight'] * B['degree']['x'];
    var y_force = A['weight'] * A['degree']['y'] + B['weight'] * B['degree']['y'];
    var z_force = A['weight'] * A['degree']['z'] + B['weight'] * B['degree']['z'];
    force['weight'] = Math.sqrt(Math.pow(x_force, 2) + Math.pow(y_force, 2) + Math.pow(z_force, 2));
    force['degree']['x'] = x_force /force['weight'];
    force['degree']['y'] = y_force /force['weight'];
    force['degree']['z'] = z_force /force['weight'];
    return force;
}


function distance(x, y) {
    var distance = Math.sqrt(Math.pow(positions[x][0] - positions[y][0], 2) + Math.pow(positions[x][1] - positions[y][1], 2) + Math.pow(positions[x][2] - positions[y][2], 2));
    return distance;
}

function getDegree(x, y) {
    var degree = {'x': 0, 'y': 0, 'z': 0};
    var vec = {'x': positions[y][0] - positions[x][0], 'y': positions[y][1] - positions[x][1], 'z': positions[y][2] - positions[x][2]};
    var x = {'x': 1, 'y': 0, 'z': 0};
    var y = {'x': 0, 'y': 1, 'z': 0};
    var z = {'x': 0, 'y': 0, 'z': 1};
    degree['x'] = (vec['x'] * x['x']) / (Math.sqrt(Math.pow(vec['x'], 2) + Math.pow(vec['y'], 2) + Math.pow(vec['z'], 2)));
    degree['y'] = (vec['y'] * y['y']) / (Math.sqrt(Math.pow(vec['x'], 2) + Math.pow(vec['y'], 2) + Math.pow(vec['z'], 2)));
    degree['z'] = (vec['z'] * z['z']) / (Math.sqrt(Math.pow(vec['x'], 2) + Math.pow(vec['y'], 2) + Math.pow(vec['z'], 2)));
    return degree;
}


var data = {
  "nodes": 5,
  "links": [
    {"source": 0, "target": 1, "value": 1},
    {"source": 1, "target": 2, "value": 1},
    {"source": 0, "target": 2, "value": 1},
    {"source": 1, "target": 3, "value": 1},
    {"source": 2, "target": 4, "value": 1}
  ]
}

