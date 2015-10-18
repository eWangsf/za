var canvas,
    ctx,
    list;
var paras = [];

window.onload = function () {
    canvas = document.getElementById("canvas");
    var canvasWidth = canvas.getAttribute('width');
    var canvasHeight = canvas.getAttribute('height');
    ctx = canvas.getContext("2d"); 
    list = option.list;
    canvas.style.backgroundColor = option.backgroundColor;
    for(var i = 0; i < list.length; i++) {
        putWord(list[i][0], list[i][1]);
    }
    // console.log(option.gridSize);
    console.log(paras);
}



function putWord(key, weight) {
    //获取绘制参数
    var position = [parseInt(Math.random() * 600) + 200, parseInt(Math.random() * 400) + 200];
    var degree = (Math.random() - 0.5) * Math.PI;
    paras.push([position[0], position[1], degree]);

    
    // for(var i = 0; i < paras.length; i++) {
    //     ctx.beginPath();
    //     ctx.fillStyle = option.color();
    //     ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
    //     ctx.textAlign = option.align;
    //     ctx.save();
    //     ctx.translate(paras[i][0], paras[i][1]);
    //     ctx.rotate(paras[i][2]);
    //     ctx.fillText(key, 0, 0);
    //     ctx.restore();
    //     if(ctx.isPointInPath(300, 400)) {
    //         alert('hh');
    //     }
    //     // ctx.closePath();

    // }
        ctx.fillStyle = option.color();
        ctx.font = option.weightFactor(weight) + "px " + option.fontFamily;
        ctx.textAlign = option.align;
        ctx.save();
        ctx.translate(position[0], position[1]);
        ctx.rotate(degree);
        ctx.fillText(key, 0, 0);
        ctx.restore();
        if (ctx.isPointInPath(position[0], position[1])) {
            alert('p');
        }
    
    
    
    // var thisTextWidth = ctx.measureText(key).width;
    

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
