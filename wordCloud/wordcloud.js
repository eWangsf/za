var svg,
    list;

window.onload = function () {
    svg = document.getElementById("svg");
    // var canvasWidth = canvas.getAttribute('width');
    // var canvasHeight = canvas.getAttribute('height');
    list = option.list;

    for(var i = 0; i < list.length; i++) {
        putWord(list[i][0], list[i][1]);
    }

}



function putWord(key, weight) {
    var txthtml = "";
    var position = [parseInt(Math.random() * 600) + 200, parseInt(Math.random() * 400) + 200];
    // var degree = (Math.random() - 0.5) * Math.PI;
    var degree = ((Math.random() - 0.5) * 180).toFixed(2);
    txthtml = "<text x='" + position[0] + "' y='" + position[1] + "' style='fill: " + option.color() + "; font-size: " + option.weightFactor(weight) + "px;' transform='rotate(" + degree + " "+ position[0] +", "+ position[1] +")'>" + key + "</text>";
    // console.log(txthtml);
    var now = svg.innerHTML;
    svg.innerHTML = now + txthtml;
    // console.log(now);
    

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



