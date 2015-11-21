var svg,
    width,
    height,
    margin = {
        top: 20,
        left: 200
    };

var scattermatrix;

var r = 5;


window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');

    scattermatrix = new scatterMatrix(data, dims, svg);
    scattermatrix.start();
}


function scatterMatrix(data, dims, svg) {
    this.data = data;
    this.dims = dims;
    this.container = svg;
}


scatterMatrix.prototype.start = function () {


}





