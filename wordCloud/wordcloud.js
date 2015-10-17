var canvas,
    ctx,
    list;
var paras = [];
var testx;
var testy;

window.onload = function () {
    canvas = document.getElementById("canvas");
    var canvasWidth = canvas.getAttribute('width');
    var canvasHeight = canvas.getAttribute('height');
    ctx = canvas.getContext("2d"); 
    list = option.list;
    canvas.style.backgroundColor = option.backgroundColor;

    for(var i = 0; i < list.length; i++) {
        var position = [300, 400];
        var degree = (Math.random() - 0.5) * Math.PI;
        var color = option.color();
        var weight = option.weightFactor(list[i][1]);
        paras.push([position[0], position[1], degree, color, list[i][0], weight]);
    }

    console.log(paras);
    for(var i = 0; i < list.length; i++) {
        putWord(i);
    }
    // console.log(paras);
}



function putWord(ind) {
//     //获取绘制参数
//     // var position = [parseInt(Math.random() * 600) + 200, parseInt(Math.random() * 400) + 200];
        
    
    for(var i = 0; i < ind; i++) {
        var set = paras[i];
        // ctx.beginPath();
        ctx.save();
        ctx.fillStyle = set[3];
        ctx.font = set[5] + "px " + option.fontFamily;
        ctx.textAlign = option.align;
        ctx.translate(set[0], set[1]);
        ctx.rotate(set[2]);
        ctx.fillText(set[4], 0, 0);
        ctx.restore();
        if(ctx.isPointInPath(310, 410)) {
            console.log('h');
        } else {
            console.log('g');
        }
    }
    
//         // ctx.fillStyle = option.color();
//         // ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
//         // ctx.textAlign = option.align;
//         // ctx.save();
//         // ctx.translate(position[0], position[1]);
//         // ctx.rotate(degree);
//         // ctx.fillText(key, 0, 0);
//         // ctx.restore();
//         // if (ctx.isPointInPath(position[0], position[1])) {
//         //     alert('p');
//         // }
    
    
    
//     // var thisTextWidth = ctx.measureText(key).width;
    

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
    gridSize: Math.round(16 * parseInt(document.getElementById('canvas').getAttribute("width")) / 1024)
}



