var canvas,
    ctx,
    positions = [],
    totalDisplacement = 0,
    maxDisplacement = 2;
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for (var i = 0; i < data.nodes; i++) {
        positions.push([500 + 100 * (Math.random() - 0.5), 400 + 100 * (Math.random() - 0.5)]);
    }
    Draw();
}

function Draw() {
    while(1) {
        console.log('!');
        totalDisplacement = 0;
        for (var i = 0; i < data.nodes; i++) {
            var forceTotal = draw(i);
            //移动值
            console.log(forceTotal['weight']);
            totalDisplacement += forceTotal['weight'];
            positions[i][0] = positions[i][0] + forceTotal['weight'] * forceTotal['degree']['x'],
            positions[i][1] = positions[i][1] + forceTotal['weight'] * forceTotal['degree']['y']
        }
        if(totalDisplacement < maxDisplacement) {
            break;
        }

    }

    for(var ind = 0; ind < positions[0].length; ind++) {
        var c = 0;
        for(var i = 0; i < positions.length; i++) {
            c = Math.max(parseInt(positions[i][ind] / 1000), c);
        }
        console.log(c);
        for(var k = 0; k < positions.length; k++) {
            if(positions[k][ind] < 0) {
                positions[k][ind] += 1000 * (c + 1);
            } else {
                positions[k][ind] -= 1000 * c;
            }
            
        }
    }

    console.log(positions);
    for(var j = 0; j < data.nodes; j++) {
        ctx.beginPath();
        ctx.arc(positions[j][0], positions[j][1], 6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'green';
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
            'degree': {'x': 0, 'y': 0}
        },
        repForce = {
            'weight': 0, 
            'degree': {'x': 0, 'y': 0}
        },
        aimPosi = [];
    //计算弹力的合力
    for (var i in data.links) {
        var tmp = CalcAttractionForce(node, data.links[i]["target"]);
        if (data.links[i]["source"] === node) {
            attachForce = computeForce(attachForce, tmp);
        } else if (data.links[i]["target"] === node) {
            tmp = CalcAttractionForce(node, data.links[i]["source"]);
            attachForce = computeForce(attachForce, tmp);
        } else {
            continue;
        }
    }
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        repForce = computeForce(repForce, CalcRepulsionForce(i, node));
    }
    // 计算作用在这个节点上的合力的方向
    var force_total = computeForce(attachForce, repForce);

    return force_total;
}



function CalcRepulsionForce(x, y) {
    var weight = 0;
    var degree = {};
    weight = 10000 / Math.pow(distance(x, y), 2);
    degree = getDegree(x, y);
    var result = {
        'weight': weight,
        'degree': degree
    };
    return result;
}

function CalcAttractionForce(x, y) {
    var weight = 0;
    var degree = {};
    weight = Math.abs(distance(x, y) - 80);
    degree = distance(x, y) < 80 ? getDegree(y, x) : getDegree(x, y);
    var result = {
        'weight': weight,
        'degree': degree
    };
    return result;
}

function computeForce(A, B) { //计算两个力的合力
    var force = {'weight': 0, 'degree': {'x': 0, 'y': 0}};
    var x_force = A['weight'] * A['degree']['x'] + B['weight'] * B['degree']['x'];
    var y_force = A['weight'] * A['degree']['y'] + B['weight'] * B['degree']['y'];
    force['weight'] = Math.sqrt(Math.pow(x_force, 2) + Math.pow(y_force, 2));
    force['degree']['x'] = x_force / force['weight'];
    force['degree']['y'] = y_force / force['weight'];
    return force;
}


function distance(x, y) {
    var distance = Math.sqrt(Math.pow(positions[x][0] - positions[y][0], 2) + Math.pow(positions[x][1] - positions[y][1], 2));
    return distance;
}

function getDegree(x, y) {
    var degree = {'x': 0, 'y': 0};
    var vec = {'x': positions[y][0] - positions[x][0], 'y': positions[y][1] - positions[x][1]};
    var x = {'x': 1, 'y': 0};
    var y = {'x': 0, 'y': 1};
    degree['x'] = (vec['x'] * x['x']) / (Math.sqrt(Math.pow(vec['x'], 2) + Math.pow(vec['y'], 2)));
    degree['y'] = (vec['y'] * y['y']) / (Math.sqrt(Math.pow(vec['x'], 2) + Math.pow(vec['y'], 2)));
    return degree;
}


var data = {
    "nodes": 13,
    "links": [
      // {"source": 0, "target": 1, "value": 1},
      // {"source": 1, "target": 2, "value": 1},
      // {"source": 2, "target": 3, "value": 1},
      // {"source": 3, "target": 4, "value": 1},
      // {"source": 4, "target": 5, "value": 1},

      {"source": 0, "target": 1, "value": 1},
      {"source": 0, "target": 2, "value": 1},
      {"source": 0, "target": 3, "value": 1},
      {"source": 0, "target": 4, "value": 1},
      {"source": 0, "target": 5, "value": 1},
      {"source": 0, "target": 6, "value": 1},
      {"source": 0, "target": 7, "value": 1},
      {"source": 6, "target": 8, "value": 1},
      {"source": 6, "target": 9, "value": 1},
      {"source": 8, "target": 10, "value": 1},
      {"source": 9, "target": 11, "value": 1},
      {"source": 9, "target": 12, "value": 1},

      ]
  };

