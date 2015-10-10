var canvas,
    ctx,
    positions = [],
    flag = false; //是否存在节点移动：false-无
    
window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for (var i = 0; i < data.nodes; i++) {
        positions.push([400, 300]);
    }
    console.log(positions);
    Draw();
}

function Draw() {
    console.log('Draw() called');
    for (var i = 0; i < data.nodes; i++) {
        draw(i);
    }
    // while(!flag) {
    //     flag = false;
    //     for (var i = 0; i < data.nodes; i++) {
    //         draw(i);
    //     }
    // }
}

function draw(node) {
    console.log('this id node: ' + node);
    var attachForce = {'weight': 0, 'degree': 0},
        repForce = {'weight': 0, 'degree': 0},
        aimPosi = [];

    if(node === 0) {
        ctx.beginPath();
        ctx.arc(400, 300, 4, 0, Math.PI * 2, true);
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
        // if ((data.links[i]["source"] === node) || (data.links[i]["target"] === node)) {
        //     attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["target"]));
        // }
    }
    console.log('------');
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
    var weight = 0;
    var degree = 0;

    return {
        'weight': weight,
        'degree': degree
    }
}

function CalcAttractionForce(x, y) {
    // if (x <= y) {
    //     return;
    // }
    var weight = "w";
    var degree = "d";

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







var data = {
  "nodes": 3,
  "links": [
    {"source": 0, "target": 1, "value": 1},
    {"source": 1, "target": 2, "value": 1},
    {"source": 0, "target": 2, "value": 1}
  ]
}

