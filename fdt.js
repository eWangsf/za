


// function Node() {
//     this.location = "";
//     this.size = 8;
//     this.neighbors = [];
//     this.draw = function () {
//         for(var i in  data.links) {
//             if(data.links[i].source === i)
//         }
//     }
// }

function CalcRepulsionForce(x, y) {
    var weight = 0;
    var degree = 0;


    return {
        'weight': weight,
        'degree': degree
    }
}

function CalcAttractionForce(x, y) {
    var weight = "w";
    var degree = "d";


    return {
        'weight': weight,
        'degree': degree
    };
}

function computeForce(A, B) { //计算两个力的合力
    alert('计算  ' + A + '  和  ' + B + '  的合力');
}

function draw(node) {
    var attachForce = {'weight': 0, 'degree': 0},
        repForce = {'weight': 0, 'degree': 0};

    if(node === 0) {
        ctx.beginPath();
        ctx.arc(400, 300, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'green';
        ctx.fill();
        positions.push([400, 300]);
        return ;
    }
    //计算弹力的合力
    for (var i in data.links) {
        if (data.links[i]["source"] === node) {
            attachForce = computeForce(attachForce, CalcAttractionForce(node, data.links[i]["target"]));
        } else if (data.links[i]["target"] === node) {
            attachForce = computeForce(attachForce, CalcAttractionForce(data.links[i]["source"], node));
        }
        // if ((data.links[i]["source"] === node) || (data.links[i]["target"] === node)) {
        // }
    }
    //计算斥力的合力
    for (var i = 0; i < data.nodes; i++) {
        if (i === node) {
            continue;
        }
        repForce = computeForce(repForce, CalcRepulsionForce(node, i));
    }
    
    //计算作用在这个节点上的合力的方向

}

var canvas,
    ctx,
    positions = [];

window.onload = function () {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    for(var i = 0; i < data.nodes; i++) {
        draw(i);
    }
}


var data = {
  "nodes": 3,
  "links": [
    {"source": 0, "target": 1, "value": 1},
    {"source": 1, "target": 2, "value": 1},
    {"source": 0, "target": 2, "value": 1}
  ]
}

