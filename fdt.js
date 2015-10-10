


function Node() {
    this.location = "";
    this.size = 8;
    this.neighbors = [];
    this.draw = function () {
        alert('begin draw');
    }
}

function CalcRepulsionForce() {
    var weight = 0;
    var degree = 0;
    for(var i in data.links) {
        weight = 1;
        degree = 2;
        console.log(i + " - " + data.links[i]);
    }
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



window.onload = function () {
    var c = document.getElementById('container');
    console.log(data);
    for(var i = 0; i < data.nodes; i++) {
        var thisnode = new Node();
        thisnode.draw();
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

