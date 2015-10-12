var canvas,
    ctx,
    positions = [],
    flag = false, //是否存在节点移动：false-无
    ATTACH_FACTOR = 0.5,
    CULUN_FACTOR = 6;
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for (var i = 0; i < data.nodes; i++) {
        positions.push([400 + 200 * (Math.random() - 0.5), 300 + 200 * (Math.random() - 0.5), 200 * (Math.random() - 0.5)]);
    }
    // console.log(positions);
    Draw();

    // for (var i = 0; i < data.nodes; i++) {
    //     positions.push([800 + 200 * (Math.random() - 0.5), 700 + 200 * (Math.random() - 0.5), 200 * (Math.random() - 0.5)]);
    // }
    // Draw();
}

function Draw() {
    while(1) {
        console.log('!');
        flag = false;

        for (var i = 0; i < data.nodes; i++) {
            draw(i);
        }
        if(!flag) {
            break;
        }

    }
    for(var j = 0; j < data.nodes; j++) {
        ctx.beginPath();
        ctx.arc(positions[j][0], positions[j][1], 6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = j === 0 ? 'red' : 'green';
        ctx.fill();
    }
    for (var k = 0; k < data.links.length; k++) {
        ctx.moveTo(positions[data.links[k]['source']][0], positions[data.links[k]['source']][1]);
        ctx.lineTo(positions[data.links[k]['target']][0], positions[data.links[k]['target']][1]);
        ctx.stroke();
    }
    console.log('finished');
}

function draw(node) {
    var attachForce = {
            'weight': 0, 
            'degree': {'x': 0, 'y': 0, 'z': 0}
        },
        repForce = {
            'weight': 0, 
            'degree': {'x': 0, 'y': 0, 'z': 0}
        },
        aimPosi = [];
    //计算弹力的合力
    for (var i in data.links) {
        if (data.links[i]["source"] === node) {
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["target"]));
        } else if (data.links[i]["target"] === node) {
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["source"]));
        }
        console.log("this attach force:  " + attachForce['weight']);
    }
    // console.log("attach:  " + attachForce['weight']);
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        repForce = computeForce(repForce, CalcRepulsionForce(i, node));
        console.log(' --- ' + repForce['weight']);
        
    }
    // console.log("repul:  " + repForce['weight']);
    //计算作用在这个节点上的合力的方向
    var force_total = computeForce(attachForce, repForce);

    //置flag
    if (force_total['weight'].toFixed(2) != 0) {
        flag = true;
    }
    var beforePos = positions[node];
    var pos_x = beforePos[0];
        pos_y = beforePos[1],
        pos_z = beforePos[2];
    positions[node] = [
        pos_x + force_total['weight'] * force_total['degree']['x'],
        pos_y + force_total['weight'] * force_total['degree']['y'],
        pos_z + force_total['weight'] * force_total['degree']['z']
    ];
}



function CalcRepulsionForce(x, y) {
    var weight = 0;
    var degree = {};
    // weight = (CULUN_FACTOR * data.links[x]['value'] * data.links[y]['value']) / Math.pow(distance(x, y), 2);
    weight = (CULUN_FACTOR * data['charges'][x] * data['charges'][y]) / Math.pow(distance(x, y), 2);
    degree = getDegree(x, y);

    return {
        'weight': weight,
        'degree': degree
    }
}

function CalcAttractionForce(x, y) {
    var weight = 0;
    var degree = {};
    weight = ATTACH_FACTOR * Math.abs(distance(x, y) - 100);
    degree = distance(x, y) < 100 ? getDegree(y, x) : getDegree(x, y);

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
    force['degree']['x'] = x_force / force['weight'];
    force['degree']['y'] = y_force / force['weight'];
    force['degree']['z'] = z_force / force['weight'];
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
    "charges": [1000, 1, 1, 1, 1, 1, 1, 1],
    "nodes": 8,
    "links": [
      {"source": 0, "target": 1, "value": 1},
      {"source": 0, "target": 2, "value": 1},
      {"source": 0, "target": 3, "value": 1},
      {"source": 0, "target": 4, "value": 1},
      {"source": 0, "target": 5, "value": 1},
      {"source": 0, "target": 6, "value": 1},
      {"source": 0, "target": 7, "value": 1},
      // {"source": 1, "target": 2, "value": 1},
      // {"source": 1, "target": 3, "value": 1},
      // {"source": 1, "target": 4, "value": 1},
      // {"source": 1, "target": 5, "value": 1},
      // {"source": 1, "target": 6, "value": 1},
      // {"source": 2, "target": 3, "value": 1},
      // {"source": 2, "target": 4, "value": 1},
      // {"source": 2, "target": 5, "value": 1},
      // {"source": 2, "target": 6, "value": 1},
      // {"source": 3, "target": 4, "value": 1},
      // {"source": 3, "target": 5, "value": 1},
      // {"source": 3, "target": 6, "value": 1},
      // {"source": 4, "target": 5, "value": 1},
      // {"source": 4, "target": 6, "value": 1},
      // {"source": 5, "target": 6, "value": 1},

      // {"source": 7, "target": 8, "value": 1},
      // {"source": 7, "target": 9, "value": 1},
      // {"source": 7, "target": 10, "value": 1},
      // {"source": 7, "target": 11, "value": 1},
      // {"source": 7, "target": 12, "value": 1},


      // {"source": 0, "target": 7, "value": 1},
    ]
}

