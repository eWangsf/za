var svg,
    width,
    height;

var paracoor;

var selectArea = {};

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

    this.renderLines({});
    this.addEvent();
}

paraCoor.prototype.renderAxis = function () {
    var ranges = this.ranges;
    var interval = this.interval;
    var axisStr = '';
    var txtStr = '';
    var i = 0;
    for(var key in ranges) {
        axisStr += '<line id="' + i + '" class="axis" x1="' + ((i + 0.5) * interval)  + '" y1="' + this.padding.top + '" x2="' + ((i + 0.5) * interval) + '" y2="' + (height - this.padding.bottom) + '" />';
        txtStr += '<text x="' + ((i + 0.5) * interval - 15) + '" y="30" fill="black">' + key + '(' + ranges[key][0] + ', ' + ranges[key][1] + ')' + '</text>';
        i++;
    }
    this.container.innerHTML += axisStr + txtStr;

}

paraCoor.prototype.renderLines = function (opt) {
    // console.log(opt);
    this.container.innerHTML = '';
    this.renderAxis();

    var data = this.data,
        ranges = this.ranges,
        axnum = this.axnum,
        interval = this.interval;
    var axHeight = height - this.padding.top - this.padding.bottom,
        top = this.padding.top;

    var validData = [],
        thisobj;
    for(var i = 0; i < data.length; i++) {
        thisobj = data[i];
        var flag = true;
        for(var key in opt) {
            if ( (thisobj[key] < opt[key][0]) || (thisobj[key] > opt[key][1]) ) {
                flag = false;
                break;
            }
        }
        if(flag) {
            validData.push(thisobj);
        }
    }

    var linesStr = '';
    for(var i = 0; i < validData.length; i++) {
        thisobj = validData[i];
        var thisstr = '<polyline class="link" points="',
            j = 0,
            color = '';
        if(ranges['mpg'][1] === ranges['mpg'][0]) {
            color = 'rgb(120, 120, 120)';
        } else {
            var inter = 1 / (ranges['mpg'][1] - ranges['mpg'][0]);
            color = 'rgb(' + parseInt(255 - 230 * (thisobj['mpg'] - ranges['mpg'][0]) * inter) + ', ' 
                    + parseInt(177 - 80 * (thisobj['mpg'] - ranges['mpg'][0]) * inter) + ', ' 
                    + parseInt(36 + 200 * (thisobj['mpg'] - ranges['mpg'][0]) * inter) + ')';
        }

        for(var key in thisobj) {
            if(key === 'name') {
                continue;
            }
            if(!thisobj[key]) {
                thisstr += '" stroke="' + color + '" /><polyline class="link" points="';
            } else if (ranges[key][1] === ranges[key][0]) {
                thisstr += ((j + 0.5) * interval) + ',' + (axHeight * 0.5 + top) + ' ';
            } else {
                thisstr += ((j + 0.5) * interval) + ',' + (axHeight * (thisobj[key] - ranges[key][0]) / (ranges[key][1] - ranges[key][0]) + top) + ' ';
            }
            j++;
        }
        thisstr += '" stroke="' + color + '" />'
        linesStr += thisstr;
    }

    this.container.innerHTML += linesStr;
}

paraCoor.prototype.addEvent = function () {
    selectArea = {};
    var thisSelect = {};
    var obj = this;

    this.container.onmousedown = function (event) {
        thisSelect.x1 = event.clientX + document.body.scrollLeft;
        thisSelect.y1 = event.clientY + document.body.scrollTop;
        obj.container.style.cursor = 'crosshair';
    }
    this.container.onmouseup = function (event) {
        thisSelect.x2 = event.clientX + document.body.scrollLeft;
        thisSelect.y2 = event.clientY + document.body.scrollTop;
        obj.container.style.cursor = 'default';
        if(thisSelect.x1 && thisSelect.y1 && thisSelect.x2 && thisSelect.y2) {
            obj.compute(thisSelect);
        }
    }
}

paraCoor.prototype.compute = function (thisSelect) {
    var indexes = [];
    var interval = this.interval,
        axnum = this.axnum,
        padding = this.padding,
        ranges = this.ranges;
    for(var i = 0; i < axnum; i++) {
        if(((thisSelect.x2 - (i + 0.5) * interval) * (thisSelect.x1 - (i + 0.5) * interval) < 0) ) {
            indexes.push(i);
            break;
        }
    }
    var i = 0;
    var j = 0;

    var opt = {};
    for(var key in selectArea) {
        opt[key] = selectArea[key];
    }
    for(var key in ranges) {
        if(i === indexes[j]) {
            selectArea[key] = [];
            opt[key] = [];
            selectArea[key][0] = opt[key][0] = (ranges[key][1] - ranges[key][0]) * (thisSelect.y1 - padding.top) / (height - padding.top - padding.bottom) + ranges[key][0];
            selectArea[key][1] = opt[key][1] = (ranges[key][1] - ranges[key][0]) * (thisSelect.y2 - padding.top) / (height - padding.top - padding.bottom) + ranges[key][0];
            j++;
        }
        i++;
    }
    this.renderLines(opt);
}




