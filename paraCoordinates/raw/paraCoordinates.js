var svg,
    width,
    height;

var paracoor;

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');

    paracoor = new paraCoor(data, svg);
    paracoor.start();
}


function paraCoor(data, svg) {
    this.data = data;
    this.container = svg;
    this.ranges = {};
    this.axnum = 0;
    this.interval = 0;
    this.padding = {top: 60, bottom: 30};
    this.linedom = {};
}

paraCoor.prototype.start = function () {
    var data = this.data,
        ranges = this.ranges;
    for(var key in data[0]) {
        if(key === "name") {
            continue;
        }
        ranges[key] = [data[0][key], data[0][key]];
        this.axnum ++;
    }
    this.interval = width / this.axnum;
    var thisobj;
    for(var i = 1; i < data.length; i++) {
        thisobj = data[i];
        for(var key in thisobj) {
            if((key === "name") || (!thisobj[key])) {
                continue;
            }
            if(thisobj[key] < ranges[key][0]) {
                ranges[key][0] = thisobj[key];
            }
            if(thisobj[key] > ranges[key][1]) {
                ranges[key][1] = thisobj[key];
            }
        }
    }
    this.ranges = ranges;

    this.renderAxis();
    this.renderLines();
    this.addEvent();
}

paraCoor.prototype.renderAxis = function () {
    var ranges = this.ranges;
    var interval = this.interval;
    var axisStr = '';
    var i = 0;
    for(var key in ranges) {
        axisStr += '<line id="' + i + '" class="axis" x1="' + ((i + 0.5) * interval)  + '" y1="' + this.padding.top + '" x2="' + ((i + 0.5) * interval) + '" y2="' + (height - this.padding.bottom) + '" />';
        i++;
    }
    this.container.innerHTML += axisStr;
}

paraCoor.prototype.renderLines = function () {
    var data = this.data,
        ranges = this.ranges,
        axnum = this.axnum,
        interval = this.interval;
    var axHeight = height - this.padding.top - this.padding.bottom,
        top = this.padding.top;

    var linesStr = '';
    var thisobj,
        color = '';
    for(var i = 0; i < data.length; i++) {
        thisobj = data[i];
        if(ranges['mpg'][1] === ranges['mpg'][0]) {
            color = 'rgb(120, 120, 120)';
        } else {
            var inter = 1 / (ranges['mpg'][1] - ranges['mpg'][0]);
            color = 'rgb(' + parseInt(255 - 230 * (thisobj['mpg'] - ranges['mpg'][0]) * inter) + ', ' 
                    + parseInt(177 - 80 * (thisobj['mpg'] - ranges['mpg'][0]) * inter) + ', ' 
                    + parseInt(36 + 200 * (thisobj['mpg'] - ranges['mpg'][0]) * inter) + ')';
        }
        linesStr += '<polyline class="link" points="';
        var j = 0;

        for(var key in thisobj) {
            if(key === "name") {
                continue;
            }
            if (ranges[key][1] === ranges[key][0]) {
                linesStr += ((j + 0.5) * interval) + ',' + (axHeight * 0.5 + top) + ' ';
            } else if (!thisobj[key]) {
                linesStr += '" stroke="' + color + '" /><polyline class="link" points="';
            } else {
                linesStr += ((j + 0.5) * interval) + ',' + (axHeight * (thisobj[key] - ranges[key][0]) / (ranges[key][1] - ranges[key][0]) + top) + ' ';
            }
            j++;
        }
        linesStr += '" stroke="' + color + '" />';
    }
    this.container.innerHTML += linesStr;
}

paraCoor.prototype.addEvent = function () {
    var nodes = this.container.getElementsByTagName('line');
    for(var i = 0; i < nodes.length; i++) {
        var obj = nodes[i];
        nodes[i].onmousedown = function () {
            console.log(this.getAttribute('id'));
        }
        nodes[i].onmouseup = function () {
            console.log(this.getAttribute('id') + ' up');
        }
        nodes[i].onmousemove = function () {
            console.log('move');
        }

    }
}




