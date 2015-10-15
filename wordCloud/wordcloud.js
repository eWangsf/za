var canvas,
    ctx,
    list;

window.onload = function () {
    // console.log(document.getElementById('canvas').getAttribute('width'));
    canvas = document.getElementById("canvas");
    canvas.style.backgroundColor = option.backgroundColor;
    ctx = canvas.getContext("2d"); 
    list = option.list;
    for(var i = 0; i < list.length; i++) {
        putWord(list[i][0], list[i][1]);
    }
}



function putWord(key, weight) {

    ctx.beginPath();
 
ctx.fillStyle = option.color();
ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
ctx.textAlign = option.align;

var position = [Math.random() * 1000, Math.random() * 400];
ctx.fillText(key, position[0], position[1]);
 
ctx.save();
ctx.translate(position[0], position[1]);
ctx.rotate(Math.PI / 6);
ctx.fillText(key, 0, 0);
ctx.restore();
    // ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
    // ctx.fillStyle = option.color();
    // ctx.textBaseline = option.align;
    // var position = [Math.random() * 1000, Math.random() * 400];
    // ctx.fillText(key, position[0], position[1]);
    // var degree = (Math.random() - 0.5) * 2 * Math.PI;
    // ctx.rotate(degree);
    // ctx.save();
    
    // ctx.restore();
    // ctx.strokeText(list[1][0], 500, 300);
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
        ["intersection", 80],
        ["particular", 80],
        ["word", 70],
        ["shape", 65],
        ["bottleneck", 55],
        ["index", 50],
        ["box", 50],
        ["position", 30],
        ["structure", 25],
    ],

    weightFactor: function (size) {
      // return Math.pow(size, 2.3) * $('#canvas').style.width / 1024;
      return size;
    },
    color: function () {
        var color = 'rgb(' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ')';
        // console.log(color);
        return color;
    },
    gridSize: Math.round(16 * parseInt(document.getElementById('canvas').getAttribute("width")) / 1024)
}



// function renderPic() {
//     pic = new Image();
//     pic.src="http://pic1.nipic.com/2008-11-13/2008111384358912_2.jpg";
//     pic.onload = renderPic;
//     var redTexture = ctx.createPattern(pic, "repeat");   
//     ctx.strokeStyle = redTexture; 
//     ctx.moveTo(80,10);
//     ctx.lineTo(10,90);
//     ctx.lineWidth = 500;    //定义线段粗度为8像素
//     ctx.stroke();
// }
