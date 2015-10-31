// var circles,
//     lines;
var canvas,
    ctx;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    var keywidth = ctx.measureText("key").width * 2;

    ctx.fillStyle = 'red';
    ctx.textBaseline = 'top';
    ctx.font = 20 + "px " + "san serif";
    ctx.textAlign = 'left';

    // ctx.save();
    // ctx.translate(0, position[1]);
    // ctx.translate(0, 0);
    // ctx.rotate(degree);
    // ctx.rotate(0);
    ctx.fillText("center", 0, 0, keywidth);
    // ctx.restore();
    // circles = document.getElementsByTagName('circle');
    // lines = document.getElementsByTagName('line');
    // console.log(circles.length);
    // console.log(lines.length);
    // // for (var i = circles.length - 1; i >= 0; i--) {
    // //     circles[i].
    // // };
    // setTimeout(function () {
    //     circles[0].setAttribute('cx', 300);
    // }, 2000);
}

function testFunc() {
    alert('haha');
}