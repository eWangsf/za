var canvas,
    ctx,
    positions = [],
    totalDisplacement = 0,
    ATTACH_FACTOR = 0.5,
    CULUN_FACTOR = 6,
    colors = ['red', 'orange', 'yellow', 'green', 'pink', 'blue'];
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for (var i = 0; i < data.nodes; i++) {
        positions.push([400 + 100 * (Math.random() - 0.5), 300 + 100 * (Math.random() - 0.5)]);
    }
    // console.log(positions);
    Draw();
}

function Draw() {
    while(1) {
        console.log('!');
        totalDisplacement = 0;
        for (var i = 0; i < data.nodes; i++) {
            draw(i);
        }
        if(totalDisplacement < 0.05) {
            break;
        }

    }
    for(var j = 0; j < data.nodes; j++) {
        ctx.beginPath();
        ctx.arc(positions[j][0], positions[j][1], 6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = colors[j];
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
    console.log("this is node:  " + node);
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
        // console.log("this attach force:  " + tmp);
        // console.log("after:  " + attachForce);
    }
    // console.log("attach:  ");
    // console.log(attachForce);
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        repForce = computeForce(repForce, CalcRepulsionForce(i, node));
        // console.log('after!!:  ');
        // console.log(repForce);
    }
    console.log("repul:  ");
    console.log(repForce);
    // //计算作用在这个节点上的合力的方向
    var force_total = computeForce(attachForce, repForce);

    // //置flag
    totalDisplacement += Math.sqrt(Math.pow(force_total['weight'] * force_total['degree']['x'], 2) + Math.pow(force_total['weight'] * force_total['degree']['y'], 2));
    var beforePos = positions[node];
    var pos_x = beforePos[0];
        pos_y = beforePos[1],
    positions[node] = [
        pos_x + force_total['weight'] * force_total['degree']['x'],
        pos_y + force_total['weight'] * force_total['degree']['y']
    ];

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
    // console.log(colors[x] + " - " + colors[y]);
    // console.log(result);
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
    // console.log(colors[x] + " - " + colors[y]);
    // console.log(result);
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
    "charges": [1000, 1, 1, 1, 1, 1, 1, 1],
    "nodes": 6,
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
      // {"source": 0, "target": 6, "value": 1},
      // {"source": 0, "target": 7, "value": 1},
      // {"source": 0, "target": 8, "value": 1},
      // {"source": 0, "target": 9, "value": 1},
      // {"source": 0, "target": 10, "value": 1},
      // {"source": 10, "target": 11, "value": 1},
      // {"source": 1, "target": 2, "value": 1},
      // {"source": 1, "target": 3, "value": 1},
      // {"source": 1, "target": 4, "value": 1},
      // {"source": 2, "target": 3, "value": 1},
      // {"source": 4, "target": 2, "value": 1},
      // {"source": 4, "target": 3, "value": 1},
      // {"source": 0, "target": 4, "value": 1},
      // {"source": 0, "target": 5, "value": 1},
      // {"source": 0, "target": 6, "value": 1},
      // {"source": 0, "target": 7, "value": 1},
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
    // "links":[
      //   {"source":1,"target":0,"value":1},
      //   {"source":2,"target":0,"value":8},
      //   {"source":3,"target":0,"value":10},
      //   {"source":3,"target":2,"value":6},
      //   {"source":4,"target":0,"value":1},
      //   {"source":5,"target":0,"value":1},
      //   {"source":6,"target":0,"value":1},
      //   {"source":7,"target":0,"value":1},
      //   {"source":8,"target":0,"value":2},
      //   {"source":9,"target":0,"value":1},
      //   {"source":11,"target":10,"value":1},
      //   {"source":11,"target":3,"value":3},
      //   {"source":11,"target":2,"value":3},
      //   {"source":11,"target":0,"value":5},
      //   {"source":12,"target":11,"value":1},
      //   {"source":13,"target":11,"value":1},
      //   {"source":14,"target":11,"value":1},
      //   {"source":15,"target":11,"value":1},
      //   {"source":17,"target":16,"value":4},
      //   {"source":18,"target":16,"value":4},
      //   {"source":18,"target":17,"value":4},
      //   {"source":19,"target":16,"value":4},
      //   {"source":19,"target":17,"value":4},
      //   {"source":19,"target":18,"value":4},
      //   {"source":20,"target":16,"value":3},
      //   {"source":20,"target":17,"value":3},
      //   {"source":20,"target":18,"value":3},
      //   {"source":20,"target":19,"value":4},
      //   {"source":21,"target":16,"value":3},
      //   {"source":21,"target":17,"value":3},
      //   {"source":21,"target":18,"value":3},
      //   {"source":21,"target":19,"value":3},
      //   {"source":21,"target":20,"value":5},
      //   {"source":22,"target":16,"value":3},
      //   {"source":22,"target":17,"value":3},
      //   {"source":22,"target":18,"value":3},
      //   {"source":22,"target":19,"value":3},
      //   {"source":22,"target":20,"value":4},
      //   {"source":22,"target":21,"value":4},
      //   {"source":23,"target":16,"value":3},
      //   {"source":23,"target":17,"value":3},
      //   {"source":23,"target":18,"value":3},
      //   {"source":23,"target":19,"value":3},
      //   {"source":23,"target":20,"value":4},
      //   {"source":23,"target":21,"value":4},
      //   {"source":23,"target":22,"value":4},
      //   {"source":23,"target":12,"value":2},
      //   {"source":23,"target":11,"value":9},
      //   {"source":24,"target":23,"value":2},
      //   {"source":24,"target":11,"value":7},
      //   {"source":25,"target":24,"value":13},
      //   {"source":25,"target":23,"value":1},
      //   {"source":25,"target":11,"value":12},
      //   {"source":26,"target":24,"value":4},
      //   {"source":26,"target":11,"value":31},
      //   {"source":26,"target":16,"value":1},
      //   {"source":26,"target":25,"value":1},
      //   {"source":27,"target":11,"value":17},
      //   {"source":27,"target":23,"value":5},
      //   {"source":27,"target":25,"value":5},
      //   {"source":27,"target":24,"value":1},
      //   {"source":27,"target":26,"value":1},
      //   {"source":28,"target":11,"value":8},
      //   {"source":28,"target":27,"value":1},
      //   {"source":29,"target":23,"value":1},
      //   {"source":29,"target":27,"value":1},
      //   {"source":29,"target":11,"value":2},
      //   {"source":30,"target":23,"value":1},
      //   {"source":31,"target":30,"value":2},
      //   {"source":31,"target":11,"value":3},
      //   {"source":31,"target":23,"value":2},
      //   {"source":31,"target":27,"value":1},
      //   {"source":32,"target":11,"value":1},
      //   {"source":33,"target":11,"value":2},
      //   {"source":33,"target":27,"value":1},
      //   {"source":34,"target":11,"value":3},
      //   {"source":34,"target":29,"value":2},
      //   {"source":35,"target":11,"value":3},
      //   {"source":35,"target":34,"value":3},
      //   {"source":35,"target":29,"value":2},
      //   {"source":36,"target":34,"value":2},
      //   {"source":36,"target":35,"value":2},
      //   {"source":36,"target":11,"value":2},
      //   {"source":36,"target":29,"value":1},
      //   {"source":37,"target":34,"value":2},
      //   {"source":37,"target":35,"value":2},
      //   {"source":37,"target":36,"value":2},
      //   {"source":37,"target":11,"value":2},
      //   {"source":37,"target":29,"value":1},
      //   {"source":38,"target":34,"value":2},
      //   {"source":38,"target":35,"value":2},
      //   {"source":38,"target":36,"value":2},
      //   {"source":38,"target":37,"value":2},
      //   {"source":38,"target":11,"value":2},
      //   {"source":38,"target":29,"value":1},
      //   {"source":39,"target":25,"value":1},
      //   {"source":40,"target":25,"value":1},
      //   {"source":41,"target":24,"value":2},
      //   {"source":41,"target":25,"value":3},
      //   {"source":42,"target":41,"value":2},
      //   {"source":42,"target":25,"value":2},
      //   {"source":42,"target":24,"value":1},
      //   {"source":43,"target":11,"value":3},
      //   {"source":43,"target":26,"value":1},
      //   {"source":43,"target":27,"value":1},
      //   {"source":44,"target":28,"value":3},
      //   {"source":44,"target":11,"value":1},
      //   {"source":45,"target":28,"value":2},
      //   {"source":47,"target":46,"value":1},
      //   {"source":48,"target":47,"value":2},
      //   {"source":48,"target":25,"value":1},
      //   {"source":48,"target":27,"value":1},
      //   {"source":48,"target":11,"value":1},
      //   {"source":49,"target":26,"value":3},
      //   {"source":49,"target":11,"value":2},
      //   {"source":50,"target":49,"value":1},
      //   {"source":50,"target":24,"value":1},
      //   {"source":51,"target":49,"value":9},
      //   {"source":51,"target":26,"value":2},
      //   {"source":51,"target":11,"value":2},
      //   {"source":52,"target":51,"value":1},
      //   {"source":52,"target":39,"value":1},
      //   {"source":53,"target":51,"value":1},
      //   {"source":54,"target":51,"value":2},
      //   {"source":54,"target":49,"value":1},
      //   {"source":54,"target":26,"value":1},
      //   {"source":55,"target":51,"value":6},
      //   {"source":55,"target":49,"value":12},
      //   {"source":55,"target":39,"value":1},
      //   {"source":55,"target":54,"value":1},
      //   {"source":55,"target":26,"value":21},
      //   {"source":55,"target":11,"value":19},
      //   {"source":55,"target":16,"value":1},
      //   {"source":55,"target":25,"value":2},
      //   {"source":55,"target":41,"value":5},
      //   {"source":55,"target":48,"value":4},
      //   {"source":56,"target":49,"value":1},
      //   {"source":56,"target":55,"value":1},
      //   {"source":57,"target":55,"value":1},
      //   {"source":57,"target":41,"value":1},
      //   {"source":57,"target":48,"value":1},
      //   {"source":58,"target":55,"value":7},
      //   {"source":58,"target":48,"value":7},
      //   {"source":58,"target":27,"value":6},
      //   {"source":58,"target":57,"value":1},
      //   {"source":58,"target":11,"value":4},
      //   {"source":59,"target":58,"value":15},
      //   {"source":59,"target":55,"value":5},
      //   {"source":59,"target":48,"value":6},
      //   {"source":59,"target":57,"value":2},
      //   {"source":60,"target":48,"value":1},
      //   {"source":60,"target":58,"value":4},
      //   {"source":60,"target":59,"value":2},
      //   {"source":61,"target":48,"value":2},
      //   {"source":61,"target":58,"value":6},
      //   {"source":61,"target":60,"value":2},
      //   {"source":61,"target":59,"value":5},
      //   {"source":61,"target":57,"value":1},
      //   {"source":61,"target":55,"value":1},
      //   {"source":62,"target":55,"value":9},
      //   {"source":62,"target":58,"value":17},
      //   {"source":62,"target":59,"value":13},
      //   {"source":62,"target":48,"value":7},
      //   {"source":62,"target":57,"value":2},
      //   {"source":62,"target":41,"value":1},
      //   {"source":62,"target":61,"value":6},
      //   {"source":62,"target":60,"value":3},
      //   {"source":63,"target":59,"value":5},
      //   {"source":63,"target":48,"value":5},
      //   {"source":63,"target":62,"value":6},
      //   {"source":63,"target":57,"value":2},
      //   {"source":63,"target":58,"value":4},
      //   {"source":63,"target":61,"value":3},
      //   {"source":63,"target":60,"value":2},
      //   {"source":63,"target":55,"value":1},
      //   {"source":64,"target":55,"value":5},
      //   {"source":64,"target":62,"value":12},
      //   {"source":64,"target":48,"value":5},
      //   {"source":64,"target":63,"value":4},
      //   {"source":64,"target":58,"value":10},
      //   {"source":64,"target":61,"value":6},
      //   {"source":64,"target":60,"value":2},
      //   {"source":64,"target":59,"value":9},
      //   {"source":64,"target":57,"value":1},
      //   {"source":64,"target":11,"value":1},
      //   {"source":65,"target":63,"value":5},
      //   {"source":65,"target":64,"value":7},
      //   {"source":65,"target":48,"value":3},
      //   {"source":65,"target":62,"value":5},
      //   {"source":65,"target":58,"value":5},
      //   {"source":65,"target":61,"value":5},
      //   {"source":65,"target":60,"value":2},
      //   {"source":65,"target":59,"value":5},
      //   {"source":65,"target":57,"value":1},
      //   {"source":65,"target":55,"value":2},
      //   {"source":66,"target":64,"value":3},
      //   {"source":66,"target":58,"value":3},
      //   {"source":66,"target":59,"value":1},
      //   {"source":66,"target":62,"value":2},
      //   {"source":66,"target":65,"value":2},
      //   {"source":66,"target":48,"value":1},
      //   {"source":66,"target":63,"value":1},
      //   {"source":66,"target":61,"value":1},
      //   {"source":66,"target":60,"value":1},
      //   {"source":67,"target":57,"value":3},
      //   {"source":68,"target":25,"value":5},
      //   {"source":68,"target":11,"value":1},
      //   {"source":68,"target":24,"value":1},
      //   {"source":68,"target":27,"value":1},
      //   {"source":68,"target":48,"value":1},
      //   {"source":68,"target":41,"value":1},
      //   {"source":69,"target":25,"value":6},
      //   {"source":69,"target":68,"value":6},
      //   {"source":69,"target":11,"value":1},
      //   {"source":69,"target":24,"value":1},
      //   {"source":69,"target":27,"value":2},
      //   {"source":69,"target":48,"value":1},
      //   {"source":69,"target":41,"value":1},
      //   {"source":70,"target":25,"value":4},
      //   {"source":70,"target":69,"value":4},
      //   {"source":70,"target":68,"value":4},
      //   {"source":70,"target":11,"value":1},
      //   {"source":70,"target":24,"value":1},
      //   {"source":70,"target":27,"value":1},
      //   {"source":70,"target":41,"value":1},
      //   {"source":70,"target":58,"value":1},
      //   {"source":71,"target":27,"value":1},
      //   {"source":71,"target":69,"value":2},
      //   {"source":71,"target":68,"value":2},
      //   {"source":71,"target":70,"value":2},
      //   {"source":71,"target":11,"value":1},
      //   {"source":71,"target":48,"value":1},
      //   {"source":71,"target":41,"value":1},
      //   {"source":71,"target":25,"value":1},
      //   {"source":72,"target":26,"value":2},
      //   {"source":72,"target":27,"value":1},
      //   {"source":72,"target":11,"value":1},
      //   {"source":73,"target":48,"value":2},
      //   {"source":74,"target":48,"value":2},
      //   {"source":74,"target":73,"value":3},
      //   {"source":75,"target":69,"value":3},
      //   {"source":75,"target":68,"value":3},
      //   {"source":75,"target":25,"value":3},
      //   {"source":75,"target":48,"value":1},
      //   {"source":75,"target":41,"value":1},
      //   {"source":75,"target":70,"value":1},
      //   {"source":75,"target":71,"value":1},
      //   {"source":76,"target":64,"value":1},
      //   {"source":76,"target":65,"value":1},
      //   {"source":76,"target":66,"value":1},
      //   {"source":76,"target":63,"value":1},
      //   {"source":76,"target":62,"value":1},
      //   {"source":76,"target":48,"value":1},
      //   {"source":76,"target":58,"value":1}
      // ]
}

