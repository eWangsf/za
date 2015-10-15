var canvas,
    ctx,
    list;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d"); 
    list = option.list;
    
    ctx.font = "60px Courier New";
    //设置字体填充颜色
    ctx.fillStyle = option.color();
    //从坐标点(50,50)开始绘制文字
    ctx.fillText(list[0][0], 200, 200);

}



function putWord(canvas) {

}


var option = {
    list: [
        ["Hello", 8],
        ["intersection", 6],
        ["particular", 6],
        ["word", 3],
        ["shape", 2],
        ["bottleneck", 2],
        ["index", 1],
        ["box", 1],
        ["position", 1],
        ["structure", 1],
    ],
    gridSize: Math.round(16 * parseInt(document.getElementById('canvas').getAttribute("width")) / 1024),
    weightFactor: function (size) {
      return Math.pow(size, 2.3) * $('#canvas').style.width / 1024;
    },
    minRotation: 1.58,
    maxRotation: 1.58,
    rotateRatio: 0.3,
    color: function () {
      return ['blue','rgb(95, 95, 253)','rgb(146, 146, 255)','rgb(169, 169, 226)','rgb(168, 217, 252)'][Math.floor(Math.random()*5)]
    },
    fontFamily: '微软雅黑',
    backgroundColor: '#fff'
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
