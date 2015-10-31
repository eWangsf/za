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
            key: "Helloooo", 
            weight: 900
        },
        {
            key: "Java", 
            weight: 800
        },
        {
            key: "intersection", 
            weight: 800
        },
        {
            key: "expensive", 
            weight: 625
        },
        {
            key: "particular", 
            weight: 625
        },
        {
            key: "word", 
            weight: 625
        },
        {
            key: "shape", 
            weight: 625
        },
        {
            key: "bottleneck", 
            weight: 625
        },
        {
            key: "index", 
            weight: 400
        },
        {
            key: "box", 
            weight: 400
        },
        {
            key: "position", 
            weight: 400
        },
        {
            key: "structure", 
            weight: 225
        },
        {
            key: "create", 
            weight: 225
        },
        {
            key: "recently", 
            weight: 100
        },
        {
            key: "C++", 
            weight: 49
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
            keyheight = option.weightFactor(weight),
            degree = (parseInt((Math.random() - 0.5) * 180 / 30) * 30) / 180 * Math.PI,
            position = [parseInt(Math.random() * width * 0.5), parseInt(Math.random() * height * 0.5) + 200];
        paras.push({
            key: key,
            weight: weight,
            width: keywidth,
            height: keyheight,
            degree: degree,
            pos: position
        });
    };

    // console.log(paras);

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
    for (var i = 0; i < item; i++) {
        console.log('-------------' + paras[item].key + "  " + paras[item].width + "      " + paras[i].key + "  " + paras[i].width);
        // console.log('-------------' + item + "   " + i);
        var det = ifOverlap(item, i);
        console.log(det);
        // if(det) {
        //     draw();
        // }
        while (det) {
            console.log('      pos change');
            // console.log(paras[item].pos);
            paras[item].pos[0] = parseInt(Math.random() * width * 0.5);
            paras[item].pos[1] = parseInt(Math.random() * height * 0.5) + 200;
            // console.log(paras[item].pos);
            det = ifOverlap(item, i);
            console.log(det);
        }

    }
}

// true - overlay; false - no overlay
function ifOverlap(word1, word2) {
    var A = paras[word1],
        B = paras[word2];
        A_width = A.width,
        A_height = A.height,
        A_degree = A.degree,
        B_width = B.width,
        B_height = B.height,
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

        if (distance(AC, BC) > 0.5 * Math.sqrt(Math.pow(A_width, 2) + Math.pow(A_height, 2)) + 0.5 * Math.sqrt(Math.pow(B_width, 2) + Math.pow(B_height, 2))) {
            console.log('ok');
            return false;
        } else if (pointInRec(A1, A2, A3, A4, B1, 'A1, A2, A3, A4, B1')) {
            console.log('B1');
            return true;
        } else if (pointInRec(A1, A2, A3, A4, B2, 'A1, A2, A3, A4, B2')) {
            console.log('B2');
            return true;
        } else if (pointInRec(A1, A2, A3, A4, B3, 'A1, A2, A3, A4, B3')) {
            console.log('B3');
            return true;
        } else if (pointInRec(A1, A2, A3, A4, B4, 'A1, A2, A3, A4, B4')) {
            console.log('B4');
            return true;
        } else if (pointInRec(B1, B2, B3, B4, A1, 'B1, B2, B3, B4, A1')) {
            console.log('A1');
            return true;
        } else if (pointInRec(B1, B2, B3, B4, A2, 'B1, B2, B3, B4, A2')) {
            console.log('A2');
            return true;
        } else if (pointInRec(B1, B2, B3, B4, A3, 'B1, B2, B3, B4, A3')) {
            console.log('A3');
            return true;
        } else if (pointInRec(B1, B2, B3, B4, A4, 'B1, B2, B3, B4, A4')) {
            console.log('A4');
            return true;
        } else if (lineAcross(A1, A2, B1, B2)) {
            console.log('A1, A2, B1, B2');
            return true;
        } else if (lineAcross(A1, A2, B2, B3)) {
            console.log('A1, A2, B2, B3');
            return true;
        } else if (lineAcross(A1, A2, B3, B4)) {
            console.log('A1, A2, B3, B4');
            return true;
        } else if (lineAcross(A1, A2, B4, B1)) {
            console.log('A1, A2, B4, B1');
            return true;
        } else if (lineAcross(A2, A3, B1, B2)) {
            console.log('A2, A3, B1, B2');
            return true;
        } else if (lineAcross(A2, A3, B2, B3)) {
            console.log('A2, A3, B2, B3');
            return true;
        } else if (lineAcross(A2, A3, B3, B4)) {
            console.log('A2, A3, B3, B4');
            return true;
        } else if (lineAcross(A2, A3, B4, B1)) {
            console.log('A2, A3, B4, B1');
            return true;
        } else if (lineAcross(A3, A4, B1, B2)) {
            console.log('A3, A4, B1, B2');
            return true;
        } else if (lineAcross(A3, A4, B2, B3)) {
            console.log('A3, A4, B2, B3');
            return true;
        } else if (lineAcross(A3, A4, B3, B4)) {
            console.log('A3, A4, B3, B4');
            return true;
        } else if (lineAcross(A3, A4, B4, B1)) {
            console.log('A3, A4, B4, B1');
            return true;
        } else if (lineAcross(A4, A1, B1, B2)) {
            console.log('A4, A1, B1, B2');
            return true;
        } else if (lineAcross(A4, A1, B2, B3)) {
            console.log('A4, A1, B2, B3');
            return true;
        } else if (lineAcross(A4, A1, B3, B4)) {
            console.log('A4, A1, B3, B4');
            return true;
        } else if (lineAcross(A4, A1, B4, B1)) {
            console.log('A4, A1, B4, B1');
            return true;
        } else {
            return false;
        }

}

// line across: false-not across
function lineAcross(a, b, c, d) {
    var k1,
        b1,
        k2,
        b2,
        acrossPoint = [];

    if ((a[0] === b[0]) && (c[0] === d[0])) {
        console.log('都平行y轴！');
        if(a[0] !== c[0]) {return false;}
        if(((a[1] - c[1]) * (a[1] - d[1]) < 0) || ((b[1] - c[1]) * (b[1] - d[1]) < 0) 
            || ((c[1] - a[1]) * (c[1] - b[1]) < 0) || ((d[1] - a[1]) * (d[1] - b[1]) < 0)) {
            console.log('相交！');
            return true;
        }
        return false;
    } else if (c[0] === d[0]) {
        console.log('cd平行y轴！');
        if((a[0] - c[0]) * (b[0] - c[0]) > 0) {return false;}

        k1 = (b[1] - a[1]) / (b[0] - a[0]);
        b1 = a[1] - k1 * a[0];
        var y = k1 * c[0] + b1; // across point: (c[0],y)
        if((y - c[1]) * (y - d[1]) > 0) {
            return false;
        } else {
            return true;
        }
        
    } else if (a[0] === b[0]) {
        console.log('ab平行y轴！');
        if((c[0] - a[0]) * (d[0] - a[0]) > 0) {return false;}

        k2 = (d[1] - c[1]) / (d[0] - c[0]);
        b2 = c[1] - k2 * c[0];
        var y = k2 * a[0] + b2;
        if((y - a[1]) * (y - b[1]) > 0) {
            return false;
        } else {
            return true;
        }
    }

    k1 = (b[1] - a[1]) / (b[0] - a[0]);
    k2 = (d[1] - c[1]) / (d[0] - c[0]);
    b1 = a[1] - k1 * a[0];
    b2 = c[1] - k2 * c[0];
    if (k1 === k2) {
        if (b1 === b2) {
            return true;
        } else {
            return false;
        }
    }

    acrossPoint[0] = (b2 - b1) / (k2 - k1);
    acrossPoint[1] = k1 * acrossPoint[0] + b1;
    if (((acrossPoint[0] - a[0]) * (acrossPoint[0] - b[0]) > 0) || ((acrossPoint[1] - a[1]) * (acrossPoint[1] - b[1]) > 0)
        || ((acrossPoint[0] - c[0]) * (acrossPoint[0] - d[0]) > 0) || ((acrossPoint[1] - c[1]) * (acrossPoint[1] - d[1]) > 0)) {
        return false;
    } else {
        return true;
    }
}




function pointInRec(a, b, c, d, p, str) {
    // console.log(str);
    // console.log(a[0] + "  " + b[0] + "  " + c[0] + "  " + d[0] + "  " + p[0]);
    if(distance(a, p) * distance(b, p) * distance(c, p) * distance(d, p) === 0) 
    {
        return true;
    }

    var d1 = ((a[0] - p[0]) * (b[0] - p[0]) + (a[1] - p[1]) * (b[1] - p[1])) / (distance(a, p) * distance(b, p));
    var d2 = ((b[0] - p[0]) * (c[0] - p[0]) + (b[1] - p[1]) * (c[1] - p[1])) / (distance(b, p) * distance(c, p));
    var d3 = ((c[0] - p[0]) * (d[0] - p[0]) + (c[1] - p[1]) * (d[1] - p[1])) / (distance(c, p) * distance(d, p));
    var d4 = ((d[0] - p[0]) * (a[0] - p[0]) + (d[1] - p[1]) * (a[1] - p[1])) / (distance(d, p) * distance(a, p));

    // if(Math.abs(d1) > 1) {
    //     console.log(a);
    //     console.log(b);
    //     console.log(p);
    //     console.log(d1);
    // }
    var w1 = Math.acos(d1);
    var w2 = Math.acos(d2);
    var w3 = Math.acos(d3);
    var w4 = Math.acos(d4);
    // console.log('  ' + w1);
    // console.log('  ' + w2);
    // console.log('  ' + w3);
    // console.log('  ' + w4);

    var totaldegree = w1 + w2 + w3 + w4;
    // console.log(totaldegree);
    if (totaldegree == 2 * Math.PI) {
        return true;
    }
    return false;
    // console.log(Math.acos(d1));
}

function distance(a, b) {
    return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}


function draw() {
    var i = -1;
    while (++i < paras.length) {
        var key = paras[i].key,
            weight = paras[i].weight,
            position = paras[i].pos,
            degree = paras[i].degree,
            keywidth = paras[i].width;

        ctx.fillStyle = option.color();
        ctx.textBaseline = option.baseline;
        ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
        ctx.textAlign = option.align;
 
        ctx.save();
        ctx.translate(position[0], position[1]);
        // ctx.translate(0, 0);
        ctx.rotate(degree);
        // ctx.rotate(0);
        ctx.fillText(key, 0, 0, keywidth);
        ctx.restore();
    }
}

var option = {
    backgroundColor: '#000',
    align: 'left',
    baseline: 'top',
    fontFamily: '微软雅黑',
    minRotation: 1.58,
    maxRotation: 1.58,
    rotateRatio: 0.3,

    weightFactor: function (size) {
        // return size / 2;
        return Math.sqrt(size);
    },
    color: function () {
        var color = 'rgb(' + (parseInt(Math.random() * 205) + 50) + ', ' + (parseInt(Math.random() * 205) + 50) + ', ' + (parseInt(Math.random() * 205) + 50) + ')';
        return color;
    }
}




