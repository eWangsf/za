var circles,
    lines;
window.onload = function () {
    circles = document.getElementsByTagName('circle');
    lines = document.getElementsByTagName('line');
    console.log(circles.length);
    console.log(lines.length);
    // for (var i = circles.length - 1; i >= 0; i--) {
    //     circles[i].
    // };
    setTimeout(function () {
        circles[0].setAttribute('cx', 300);
    }, 2000);
}

function testFunc() {
    alert('haha');
}