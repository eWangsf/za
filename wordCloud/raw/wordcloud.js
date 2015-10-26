var svg,
    list,
    paras = [];

window.onload = function () {
    svg = document.getElementById("svg");
    list = option.list;
    for (var i = 0; i < list.length; i++) {
        putWord(i);
    }
}

function putWord(i) {
    var position = [parseInt(Math.random() * 1000) + 50, parseInt(Math.random() * 500) + 200];
    var degree = ((Math.random() - 0.5) * 180);

    var textStr = "<text x='" + position[0] + "' y='" + position[1] 
                + "' style='fill: " + option.color() 
                + "; font-size: " + option.weightFactor(list[i][1]) + "px;text-anchor: start;dominant-baseline: middle;' " 
                + "transform= 'rotate(" + degree + " " + position[0] + ", " + position[1] + ")'" 
                + ">" + list[i][0] + "</text>";    
    svg.innerHTML = svg.innerHTML + textStr;
    console.log(list[i][0] + "  " + position[0] + "  " + position[1]);

    paras.push([position, degree]);

    var result = fitPosition();
    while(result) {
        // console.log("    this:  " + list[i][0]);
        var x = parseInt(Math.random() * 1000) + 50;
        var y = parseInt(Math.random() * 500) + 200;
        var last = paras.length - 1;
        paras[last][0][0] = x;
        paras[last][0][1] = y;

        var texts = document.getElementsByTagName('text');
        
        texts[last].setAttribute('x', x);
        texts[last].setAttribute('y', y);
        texts[last].setAttribute('transform', 'rotate(' + degree + ' ' + x + ', ' + y + ')');
        console.log(x + "  " + y);
        result = fitPosition(); //result： true-覆盖单词  false-未覆盖
    }

}

function fitPosition() {
    var texts = document.getElementsByTagName('text');

    var lastIndex = texts.length - 1;
    var lastWidth = texts[lastIndex].offsetWidth;
    var lastHeight = texts[lastIndex].offsetHeight;
    var positionXLast = paras[lastIndex][0][0];
    var positionYLast = paras[lastIndex][0][1];
    var textDegreeLast = ((Math.PI * paras[lastIndex][1]) / 180);

    var textcenterLast = [positionXLast + 0.5 * lastWidth * Math.cos(textDegreeLast) - 0.5 * lastHeight * Math.sin(textDegreeLast), 
                        positionYLast + 0.5 * lastWidth * Math.sin(textDegreeLast) + 0.5 * lastHeight * Math.cos(textDegreeLast)];
    var a1 = [positionXLast, positionYLast];
    var a2 = [positionXLast + lastWidth * Math.cos(textDegreeLast), positionYLast + Math.sin(textDegreeLast)];
    var a3 = [a2[0] - lastHeight * Math.sin(textDegreeLast), a2[1] + lastHeight * Math.cos(textDegreeLast)];
    var a4 = [positionXLast - lastHeight * Math.sin(textDegreeLast), positionYLast + lastHeight * Math.cos(textDegreeLast)];

    for(var i = 0; i < lastIndex; i++) {
        console.log(list[i][0]);
        var textWidth = texts[i].offsetWidth;
        var textHeight = texts[i].offsetHeight;
        var positionX = paras[i][0][0];
        var positionY = paras[i][0][1];
        var textDegree = ((Math.PI * paras[i][1]) / 180);

        var textcenter = [positionX + 0.5 * textWidth * Math.cos(textDegree) - 0.5 * textHeight * Math.sin(textDegree), 
                        positionY + 0.5 * textWidth * Math.sin(textDegree) + 0.5 * textHeight * Math.cos(textDegree)];
        var b1 = [positionX, positionY];
        var b2 = [positionX + textWidth * Math.cos(textDegree), positionY + Math.sin(textDegree)];
        var b3 = [b2[0] - textHeight * Math.sin(textDegree), b2[1] + textHeight * Math.cos(textDegree)];
        var b4 = [positionX - textHeight * Math.sin(textDegree), positionY + textHeight * Math.cos(textDegree)];
        
        if(ifCover(a1, a2, a3, a4, b1, b2, b3, b4)) {
            //相交
            return true;
        } else {
            continue;
        }
        // if ((Math.abs(textcenter[0] - textcenterLast[0]) > (0.5 * (textWidth + lastWidth))) || (Math.abs(textcenter[1] - textcenterLast[1]) > (0.5 * (textHeight + lastHeight)))) {
        //     //第i个word和新加入的word不相交
        //     continue;
        // } else {
        //     //检测到相交
        //     return false;
        // }
    }
    return false;

}

function ifCover(a1, a2, a3, a4, b1, b2, b3, b4) {//true-相交
    // console.log(a1);
    //任意两条线不相交
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(checkLine(arguments[i], arguments[(i + 1) % 4], arguments[j + 4], arguments[((j + 1) % 4) + 4])) {
                return true;
            }
        }
    }
    //B的任一顶点不在A中
    for(var i = 4; i < 8; i++) {
        if(pointInRec(a1, a2, a3, a4, arguments[i])) {
            return true;
        }
    }
    //A的任一顶点不在B中
    for(var i = 0; i < 4; i++) {
        if(pointInRec(b1, b2, b3, b4, arguments[i])) {
            return true;
        }
    }

    return false;
}

function checkLine(p1, p2, p3, p4) {
    var k1, b1, k2, b2;
    if(p2[0] === p1[0]) {
        if((p3[0] - p2[0]) * (p4[0] - p2[0]) <= 0) {
            return true; 
        }
    } else if(p4[0] === p3[0]) {
        if((p2[0] - p4[0]) * (p1[0] - p4[0]) <= 0) {
            return true; 
        }
    }
    k1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    b1 = (p2[0] * p1[1] - p1[0] * p2[1]) / (p2[0] - p1[0]);
    k2 = (p4[1] - p3[1]) / (p4[0] - p3[0]);
    b2 = (p4[0] * p3[1] - p3[0] * p4[1]) / (p4[0] - p3[0]);
    if(k1 === k2) {
        return false;
    }
    var x = (b2 - b1) / (k1 - k2);
    if((x - p1[0]) * (x - p2[0]) < 0) {
        return true;
    } else {
        return false;
    }
}

function pointInRec(a, b, c, d, e) {
    if(getDegree(e, a, b) + getDegree(e, b, c) + getDegree(e, c, d) + getDegree(e, d, a) == 2 * Math.PI) {
        return true;
    } else {
        return false;
    }
}

function getDegree(p1, p2, p3) {
    var v1 = [p2[0] - p1[0], p2[1] - p1[1]];
    var v2 = [p3[0] - p1[0], p3[1] - p1[1]];
    var length1 = Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2));
    var length2 = Math.sqrt(Math.pow(v2[0], 2) + Math.pow(v2[1], 2));
    var d = (v1[0] * v2[0] + v1[1] * v2[1]) / length2 * length1;
    return Math.acos(d);
}


var option = {
    backgroundColor: '#000',
    align: 'top',
    fontFamily: '微软雅黑',
    minRotation: 1.58,
    maxRotation: 1.58,
    rotateRatio: 0.3,

    list: [
        ["Hello", 180],
        ["Java", 120],
        ["intersection", 80],
        ["expensive", 70],
        ["particular", 65],
        ["word", 60],
        ["shape", 60],
        ["bottleneck", 55],
        ["index", 50],
        ["box", 40],
        ["position", 30],
        ["structure", 30],
        ["create", 30],
        ["recently", 25],
        ["C++", 25],
    ],

    weightFactor: function (size) {
      // return Math.pow(size, 2.3) * $('#canvas').style.width / 1024;
      return size;
    },
    color: function () {
        var color = 'rgb(' + (parseInt(Math.random() * 205) + 50) + ', ' + (parseInt(Math.random() * 205) + 50) + ', ' + (parseInt(Math.random() * 205) + 50) + ')';
        return color;
    },
    // gridSize: Math.round(16 * parseInt(document.getElementById('canvas').getAttribute("width")) / 1024)
}



