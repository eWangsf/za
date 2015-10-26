var canvas,
    ctx,
    positions = [],
    totalDisplacement = 100,
    maxDisplacement = 2;
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    var nodelength = data.nodes;
    for (var i = 0; i < nodelength; i++) {
        positions.push([50 * (Math.random() - 0.5), 50 * (Math.random() - 0.5)]);
    }
    Draw();
    // console.log('before');
    // console.log(positions);

    transForm();

    // console.log('after');
    // console.log(positions);
    for(var j = 0; j < nodelength; j++) {
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
}

function Draw() {
    var count = 1;
    while(totalDisplacement >= maxDisplacement) {
        // console.log('!');
        totalDisplacement = 0;
        for (var i = 0; i < data.nodes; i++) {
            draw(i);
        }
    }

}

function draw(node) {
    var force_total = {
            'weight': 0, 
            'degree': {'x': 0, 'y': 0}
        };
        
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        force_total = computeForce(force_total, CalcRepulsionForce(i, node));
    }

    //计算弹力的合力
    for (var i in data.links) {
        var tmp = CalcAttractionForce(node, data.links[i]["target"]);
        if (data.links[i]["source"] === node) {
            force_total = computeForce(force_total, tmp);
        } else if (data.links[i]["target"] === node) {
            tmp = CalcAttractionForce(node, data.links[i]["source"]);
            force_total = computeForce(force_total, tmp);
        } else {
            continue;
        }
    }

    totalDisplacement += force_total['weight'];
    positions[node][0] = positions[node][0] + force_total['weight'] * force_total['degree']['x'];
    positions[node][1] = positions[node][1] + force_total['weight'] * force_total['degree']['y'];
    // return force_total;

}

function CalcRepulsionForce(x, y) {
    var weight = 0;
    var degree = {};
    var distanceinstance = Math.pow(distance(x, y), 2);
    if(distanceinstance > 0) {
        weight = 10000 / distanceinstance;
    }
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
    if(force['weight'] > 0) {
        force['degree']['x'] = x_force / force['weight'];
        force['degree']['y'] = y_force / force['weight'];
    }
    return force;
}


function distance(x, y) {
    var distance = Math.sqrt(Math.pow(positions[x][0] - positions[y][0], 2) + Math.pow(positions[x][1] - positions[y][1], 2));
    return distance;
}

function getDegree(x, y) {
    var degree = {'x': 0, 'y': 0};
    var vec = {'x': positions[y][0] - positions[x][0], 'y': positions[y][1] - positions[x][1]};    verctorlength = Math.sqrt(Math.pow(vec['x'], 2) + Math.pow(vec['y'], 2));
    if(verctorlength > 0) {
        degree['x'] = vec['x'] / verctorlength;
        degree['y'] = vec['y'] / verctorlength;
    }
    return degree;
}

function transForm() {
    var nodenumber = positions.length;
    var dimennumber = positions[0].length;
    for(var j = 0; j < dimennumber; j++) {
        var c = positions[0][j];
        for (var i = 1; i < nodenumber; i++) {
            var pos = positions[i][j];
            if(parseInt(c) === parseInt(pos)) {
                break;
            }
            c = ((c - pos) >= 1) ? pos : c;
        }
        for (var i = 0; i < nodenumber; i++) {
            positions[i][j] -= c;
            positions[i][j] += 200;
        }
    }

}


var data = {
    "nodes": 17,
    "links": [
      {"source": 0, "target": 1, "value": 1},
      {"source": 0, "target": 2, "value": 1},
      {"source": 0, "target": 3, "value": 1},
      {"source": 0, "target": 4, "value": 1},
      {"source": 0, "target": 5, "value": 1},
      {"source": 0, "target": 6, "value": 1},
      {"source": 0, "target": 7, "value": 1},
      {"source": 0, "target": 8, "value": 1},
      {"source": 0, "target": 9, "value": 1},
      {"source": 8, "target": 10, "value": 1},
      {"source": 9, "target": 11, "value": 1},
      {"source": 9, "target": 12, "value": 1},
      // {"source": 9, "target": 13, "value": 1},
      {"source": 10, "target": 13, "value": 1},

      {"source": 13, "target": 14, "value": 1},
      {"source": 13, "target": 15, "value": 1},
      {"source": 13, "target": 16, "value": 1},
      // {"source": 13, "target": 17, "value": 1},
      // {"source": 13, "target": 18, "value": 1},
      // {"source": 13, "target": 19, "value": 1},
      // {"source": 16, "target": 17, "value": 1},
      // {"source": 14, "target": 18, "value": 1},



      // {"source":1,"target":0,"value":1},
      // {"source":2,"target":0,"value":8},
      // {"source":3,"target":0,"value":10},
      // // {"source":3,"target":2,"value":6},
      // {"source":4,"target":0,"value":1},
      // {"source":5,"target":0,"value":1},
      // {"source":6,"target":0,"value":1},
      // {"source":7,"target":0,"value":1},
      // {"source":8,"target":0,"value":2},
      // {"source":9,"target":0,"value":1},
      // {"source":11,"target":10,"value":1},
      // {"source":11,"target":3,"value":3},
      // {"source":11,"target":2,"value":3},
      // {"source":11,"target":0,"value":5},
      // {"source":12,"target":11,"value":1},
      // {"source":13,"target":11,"value":1},
      // {"source":14,"target":11,"value":1},
      // {"source":15,"target":11,"value":1},
      // {"source":17,"target":16,"value":4},
      // {"source":18,"target":16,"value":4},
      // {"source":18,"target":17,"value":4},
      // {"source":19,"target":16,"value":4},
      // {"source":19,"target":17,"value":4},
      // {"source":19,"target":18,"value":4},
      // {"source":20,"target":16,"value":3},
      // {"source":20,"target":17,"value":3},
      // {"source":20,"target":18,"value":3},
      // {"source":20,"target":19,"value":4},
      // {"source":21,"target":16,"value":3},

      ]
  };

