var svg,
    width,
    height,
    margin = {
        top: 0,
        left: 200
    };

var scattermatrix;

var r = 3;

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
    this.ranges = {};
}


scatterMatrix.prototype.start = function () {
    var dims = this.dims,
        data = this.data,
        ranges = {};
    for(var i = 1; i < dims.length; i++) {
        ranges[dims[i]] = [data[0][i], data[0][i]];
    }
    
    var thisobj;
    for(var i = 0; i < data.length; i++) {
        thisobj = data[i];
        var j = 1;
        for(var key in ranges) {
            if(thisobj[j] < ranges[key][0]) {
                ranges[key][0] = thisobj[j];
            }
            if(thisobj[j] > ranges[key][1]) {
                ranges[key][1] = thisobj[j];
            }
            j++;
        }
    }
    this.ranges = ranges;

    this.renderRects();
    this.renderCircles();

}

scatterMatrix.prototype.renderRects = function () {
    var dims = this.dims,
        ranges = this.ranges;
    var rectStr = '',
        txtStr = '',
        rulerStr = '';

    for(var i = 0; i < dims.length - 1; i++) {
        for(var j = 0; j < dims.length - 1; j++) {
            rectStr += '<rect x="' + (i * 160) + '" y="' + (j * 160) + '" width="150" height="150" />';
            if(i === j) {
                txtStr += '<text class="name" x="' + (i * 160) + '" y="' + (j * 160) + '" dy="1em">' + dims[i + 1] + '</text>';
            }
            rulerStr += '<text class="ruler" x="' + (i * 160) + '" y="630" dy="1.2em" >' + ranges[dims[i + 1]][0] + '</text>';
            rulerStr += '<text class="ruler" x="' + (i * 160 + 150) + '" y="630" dx="-1em" dy="1.2em" >' + ranges[dims[i + 1]][1] + '</text>';
            rulerStr += '<text class="ruler" x="630" y="' + (i * 160 + 150) + '" dx=".2em" >' + ranges[dims[i + 1]][0] + '</text>';
            rulerStr += '<text class="ruler" x="630" y="' + (i * 160) + '" dx=".2em" dy="1em" >' + ranges[dims[i + 1]][1] + '</text>';
        }

    }
    this.container.innerHTML += rectStr + txtStr + rulerStr; 
}

scatterMatrix.prototype.renderCircles = function () {
    var dims = this.dims,
        data = this.data,
        ranges = this.ranges;

    var thisobj;
    var recordStr = '';
    for(var i = 0; i < data.length; i++) {
        thisobj = data[i];
        // render a record 
        for(var j = 0; j < dims.length - 1; j++) {
            var x_key = dims[j+1],
                x_range = ranges[x_key],
                x_offset = 150 * ((thisobj[j + 1] - ranges[x_key][0]) / (ranges[x_key][1] - ranges[x_key][0]));

            for(var k = 0; k < dims.length - 1; k++) {
                var y_key = dims[k+1],
                    y_range = ranges[y_key],
                    y_offset = 150 * ((thisobj[k + 1] - ranges[y_key][0]) / (ranges[y_key][1] - ranges[y_key][0]));
                recordStr += '<circle class="' + thisobj[0] + '" cx="' + (160 * j + x_offset) + '" cy="' + (160 * k + 150 - y_offset) + '" r="3" />';

            }
        }
        // record render finish
    }
    this.container.innerHTML += recordStr;

}





