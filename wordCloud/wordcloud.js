var svg,
    list;

var paras = [];

window.onload = function () {
    svg = document.getElementById("svg");
    list = option.list;
    // putWord(0);
    for(var i = 0; i < list.length; i++) {
        putWord(i);
    }
}



function putWord(i) {
    var position = [parseInt(Math.random() * 1000) + 50, parseInt(Math.random() * 400) + 200];
    var degree = ((Math.random() - 0.5) * 180).toFixed(2);

    var textStr = "<text x='" + position[0] + "' y='" + position[1] 
                + "' style='fill: " + option.color() 
                + "; font-size: " + option.weightFactor(list[i][1]) + "px;text-anchor: start;dominant-baseline: middle;' " 
                + "transform= 'rotate(" + degree + ", "+ position[0] + ", " + position[1] + ")'" 
                + ">" + list[i][0] + "</text>";    
    svg.innerHTML = svg.innerHTML + textStr;

    paras.push([position, degree]);
    var result;
    do{
        var x = parseInt(Math.random() * 1000) + 50;
        var y = parseInt(Math.random() * 400) + 200;
        paras[paras.length - 1][0][0] = x;
        paras[paras.length - 1][0][1] = y;

        var texts = document.getElementsByTagName('text');
        var last = texts.length - 1;
        texts[last].setAttribute('x', x);
        texts[last].setAttribute('y', y);
        texts[last].setAttribute('transform', 'rotate(' + degree + ' ' + x + ', ' + y + ')');
        // console.log(list[paras.length - 1][0] + " changes ");
        result = fitPosition();
    } while(!result);

}

function fitPosition() {
    var texts = document.getElementsByTagName('text');

    var lastIndex = texts.length - 1;
    var lastWidth = texts[lastIndex].offsetWidth;
    var lastHeight = texts[lastIndex].offsetHeight;
    var positionXLast = paras[lastIndex][0][0];
    var positionYLast = paras[lastIndex][0][1];
    var textDegreeLast = ((Math.PI * paras[lastIndex][1]) / 180);

    var textcenterLast = [positionXLast + 0.5 * (lastWidth*Math.cos(textDegreeLast) - lastHeight*Math.sin(textDegreeLast)), 
                        positionYLast + 0.5 * (lastWidth*Math.sin(textDegreeLast) + lastHeight*Math.cos(textDegreeLast))];

    for(var i = 0; i < paras.length - 1; i++) {
        var textWidth = texts[i].offsetWidth;
        var textHeight = texts[i].offsetHeight;
        var positionX = paras[i][0][0];
        var positionY = paras[i][0][1];
        var textDegree = ((Math.PI * paras[i][1]) / 180);

        var textcenter = [positionX + 0.5 * (textWidth*Math.cos(textDegree) - textHeight*Math.sin(textDegree)), 
                        positionY + 0.5 * (textWidth*Math.sin(textDegree) + textHeight*Math.cos(textDegree))];

        if((Math.abs(textcenter[0] - textcenterLast[0]) > (0.5 * (textWidth + lastWidth))) || (Math.abs(textcenter[1] - textcenterLast[1]) > (0.5 * (textHeight + lastHeight)))) {
            continue;
        } else {
            //检测到相交
            return false;
        }
        // var point1 = [positionX, positionY];
        // var point2 = [positionX + textWidth * Math.cos(textDegree), positionY + textWidth * Math.sin(textDegree)];
        // var point3 = [point2[0] - textHeight * Math.sin(textDegree), point2[1] + textHeight * Math.cos(textDegree)];
        // var point4 = [positionX - textHeight * Math.sin(textDegree), positionY + textHeight * Math.cos(textDegree)];
    }
    return true;

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



