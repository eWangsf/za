// about layout
var canvas,
    ctx,
    width,
    height;

// about texts
var paras = [];

// about data
var listdata = [
        {
            key: "Hello", 
            weight: 180
        },
        {
            key: "Java", 
            weight: 120
        },
        {
            key: "intersection", 
            weight: 80
        },
        {
            key: "expensive", 
            weight: 70
        },
        {
            key: "particular", 
            weight: 65
        },
        {
            key: "word", 
            weight: 60
        },
        {
            key: "shape", 
            weight: 60
        },
        {
            key: "bottleneck", 
            weight: 55
        },
        {
            key: "index", 
            weight: 50
        },
        {
            key: "box", 
            weight: 40
        },
        {
            key: "position", 
            weight: 30
        },
        {
            key: "structure", 
            weight: 30
        },
        {
            key: "create", 
            weight: 30
        },
        {
            key: "recently", 
            weight: 25
        },
        {
            key: "C++", 
            weight: 25
        },
    ];


window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    width = canvas.getAttribute('width');
    height = canvas.getAttribute('height');

    // init
    for (var i = 0; i < listdata.length; i++) {
        var key = listdata[i].key,
            weight = listdata[i].weight,
            keywidth = ctx.measureText(key).width,
            degree = (parseInt((Math.random() - 0.5) * 180 / 30) * 30) / 180 * Math.PI,
            position = [parseInt(Math.random() * width * 0.5), parseInt(Math.random() * height * 0.5) + 200];
        paras.push({
            key: key,
            weight: weight,
            width: keywidth,
            degree: degree,
            pos: position
        });
    };

    // update
    var i = -1;
    while (++i < paras.length) {
        putWord(i);
    }

    // draw
    draw(); 
}


function putWord(item) {
    var paraitem = paras[item];
    console.log(paraitem);
    for (var i = 0; i < paras.length; i++) {
        if (i === item) continue;
        var det = ifOverlap(item, i);
        while (det) {
            paras[item].pos = [parseInt(Math.random() * width * 0.5), parseInt(Math.random() * height * 0.5) + 200];
            det = ifOverlap(item, i);
        }

    }
}

// true - overlay; false - no overlay
function ifOverlap(word1, word2) {
    var A = paras[word1],
        B = paras[word2];
        A_width = A.width,
        A_height = A.weight,
        A_degree = A.degree,
        B_width = B.width,
        B_height = B.weight,
        B_degree = B.degree;

    var A1 = A.pos,
        A2 = [A1[0] + A_width * Math.cos(A_degree), A1[1] + A_width * Math.sin(A_degree)],
        A3 = [A2[0] - A_height * Math.sin(A_degree), A2[1] + A_height * Math.cos(A_degree)],
        A4 = [A1[0] - A_height * Math.sin(A_degree), A1[1] + A_height * Math.cos(A_degree)],
        AC = [0.5 * (A1[0] + A3[0]), 0.5 * (A1[1] + A3[1])],
        B1 = B.pos,
        B2 = [B1[0] + B_width * Math.cos(B_degree), B1[1] + B_width * Math.sin(B_degree)],
        B3 = [B2[0] - B_height * Math.sin(B_degree), B2[1] + B_height * Math.cos(B_degree)],
        B4 = [B1[0] - B_height * Math.sin(B_degree), B1[1] + B_height * Math.cos(B_degree)],
        BC = [0.5 * (B1[0] + B3[0]), 0.5 * (B1[1] + B3[1])];

        if (distance(AC, BC) > 0.5 * (Math.sqrt(Math.pow(A_width, 2) + Math.pow(A_height, 2)) + Math.sqrt(Math.pow(B_width, 2) + Math.pow(B_height, 2)))) 
        {
            return false;
        } else if () {
            return false;
        }



    return false;
}


function draw() {
    var i = -1;
    while (++i < paras.length) {
        var key = paras[i].key,
            weight = paras[i].weight,
            position = paras[i].pos,
            degree = paras[i].degree;

        ctx.fillStyle = option.color();
        ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
        ctx.textAlign = option.align;
 
        ctx.save();
        ctx.translate(position[0], position[1]);
        ctx.rotate(degree);
        ctx.fillText(key, 0, 0);
        ctx.restore();
    }
}


var option = {
    backgroundColor: '#000',
    align: 'top',
    fontFamily: '微软雅黑',
    minRotation: 1.58,
    maxRotation: 1.58,
    rotateRatio: 0.3,

    weightFactor: function (size) {
      return size;
    },
    color: function () {
        var color = 'rgb(' + (parseInt(Math.random() * 205) + 50) + ', ' + (parseInt(Math.random() * 205) + 50) + ', ' + (parseInt(Math.random() * 205) + 50) + ')';
        return color;
    }
}




