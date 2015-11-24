var endTime = Date.now(),
    startTime = endTime - 6 * (30 * 24 * 60 * 60 * 1000);

var width,
    height,
    line_interval = 40,
    right_padding = 50,
    name_width = 200;

var names = [
        "Lorem", "Ipsum", 
        "Dolor", "Sit", 
        "Amet", "Consectetur", 
        "Adipisicing", "elit", 
        "Eiusmod tempor", "Incididunt"
    ],
    colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5"];

var eventdrops;

// doms
var yAxis,
    bodyAxis,
    topAxis,
    bottomAxis,
    delimiter;

window.onload = function () {
    width = document.getElementsByTagName('svg')[0].getAttribute('width');
    height = document.getElementsByTagName('svg')[0].getAttribute('height');

    yAxis = document.getElementById('y_axis').getElementsByTagName('g')[0];
    bodyAxis = document.getElementById('graph_body');
    topAxis = document.getElementById('top');
    bottomAxis = document.getElementById('bottom');
    delimiter = document.getElementById('delimiter');

    eventdrops = new eventDrops(names, startTime, endTime);
    eventdrops.start();    
}

function eventDrops(names, startTime, endTime) {
    this.names = names;
    this.data = [];
    this.startTime = startTime;
    this.endTime = endTime;
    this.valid_data = [];
    this.valid_start = this.startTime;
    this.valid_end = this.endTime;
    this.lineDoms = [];
}

eventDrops.prototype.start = function () {
    var names = this.names;
    for (var i = 0; i < names.length; i++) {
        var ret = createEvent(names[i]);
        this.data.push(ret);
        this.valid_data.push(ret);
    }
    this.renderAxis();
    this.renderEvents();
    this.addEvents();
}

eventDrops.prototype.renderAxis = function () {
    var names = this.names,
        data = this.data,
        startTime = this.valid_start,
        endTime = this.valid_end;

    //更新有效数据
    for(var i = 0; i < names.length; i++) {
        var thisarr = data[i]['dates'];
        var temparr = [];
        for(var j = 0; j < thisarr.length; j++) {
            if(thisarr[j] < startTime || thisarr[j] > endTime) {
               continue;
            }
            temparr.push(thisarr[j]);
        }
        this.valid_data[i] = {
            'name': data[i]['name'],
            'dates': temparr
        };
    }

    // 上下的时间刻度
    delimiter.getElementsByTagName('text')[0].innerHTML = new Date(startTime).toLocaleDateString();
    delimiter.getElementsByTagName('text')[1].innerHTML = new Date(endTime).toLocaleDateString();
    var topStr = '',
        bottomStr = '';
    for(var i = 0; i < 7; i++) {
        var thisDate = new Date(startTime + i * ((endTime - startTime) / 6)).toLocaleDateString();
        topStr += '<g class="tick" transform="translate(' + (i * (width - right_padding - name_width) / 6) + ',0)" style="opacity: 1;">'
                + '<line y2="-6" x2="0"></line><text dy="0em" y="-9" x="0" style="text-anchor: middle;">'
                + thisDate + '</text></g>';
        bottomStr += '<g class="tick" transform="translate(' + (i * (width - right_padding - name_width) / 6) + ',0)" style="opacity: 1;">'
                + '<line y2="-6" x2="0"></line><text dy="2.2em" y="-9" x="0" style="text-anchor: middle;">'
                + thisDate + '</text></g>';
    }
    topAxis.innerHTML = topStr + '<path class="domain" d="M0,-6V0H750V-6"></path>';
    bottomAxis.innerHTML = bottomStr + '<path class="domain" d="M0,6V0H750V6"></path>';

     // y轴(刻度+横线)
    var yAxisStr = '',
        bodyStr = '';
    for (var i = 0; i < names.length; i++) {
        yAxisStr += '<g transform="translate(0, ' + (i * line_interval) + ')"><line class="y-tick" x1="' + name_width + '" x2="' + (width - right_padding) + '"></line></g>';
        bodyStr += '<g class="line" transform="translate(0, ' + (i * line_interval) + ')" style="fill: black;">'
                + '<g style="filter: url(#metaball);">'
                + '<rect width="40px" height="40px" transform="translate(0,-25)" style="fill: none;"></rect>'
                + '</g>'
                + '<text text-anchor="end" transform="translate(-20)" style="fill: black;">' + names[i] + ' (' + this.valid_data[i]['dates'].length + ') ' + '</text>'
                + '<g class="circle_container" style="filter: url(#metaball);">'
                + '<rect width="40px" height="40px" transform="translate(0,-25)" style="fill: none;"></rect>'
                + '</g>'
                + '</g>';
    }
    yAxis.innerHTML = yAxisStr;
    bodyAxis.innerHTML = bodyStr;
}

eventDrops.prototype.renderEvents = function () {
    this.lineDoms = bodyAxis.getElementsByClassName('circle_container');
    var names = this.names,
        data = this.valid_data,
        lineDoms = this.lineDoms;
    var totalLength = width - name_width - right_padding,
        startTime = this.valid_start,
        endTime = this.valid_end,
        totalTime = endTime - startTime;

    for(var i = 0; i < names.length; i++) {
        var thisline = lineDoms[i],
            thisdata = data[i]['dates'],
            color = colors[i];
        var thisCircleStr = '<rect width="40px" height="40px" transform="translate(0,-25)" style="fill: none;"></rect>';
        var thisobj;
        for(var j = 0; j < thisdata.length; j++) {
            thisobj = thisdata[j];
            thisCircleStr += '<circle cx="' + (totalLength * (thisobj - startTime) / totalTime) + '" cy="-5" r="5" fill="' + color + '" stroke="none" />';
        }
        thisline.innerHTML = thisCircleStr;
    }
}

eventDrops.prototype.addEvents = function () {
    var svg = document.getElementsByTagName('svg')[0];
    var obj = this;
    svg.onmousewheel = function (event) {
        if(event.wheelDelta < 0) {
            var totalTime = obj.valid_end - obj.valid_start;
            obj.valid_start += totalTime * .1;
            obj.valid_end -= totalTime * .1;
        } else {
            obj.valid_start -= (obj.valid_start - obj.startTime) * .2;
            obj.valid_end +=  (obj.endTime - obj.valid_end) * .2;
        }
        obj.renderAxis();
        obj.renderEvents();
    }
    var down = false;
    var pre = {};
    svg.onmousedown = function (event) {
        down = true;
        pre.x = event.x;
        pre.y = event.y;
    }
    svg.onmouseup = function (event) {
        down = false;
        pre = {};
    }
    svg.onmousemove = function (event) {
        if (down) {
            var dx = event.x - pre.x;
            obj.valid_start -= (obj.valid_start - obj.startTime) * (10 * dx / width);
            obj.valid_end -= (obj.endTime - obj.valid_end) * (10 * dx / width);
            obj.renderAxis();
            obj.renderEvents();
            pre.x = event.x;
            pre.y = event.y;
        }
    }
}


function createEvent(name) {
    var maxNbEvents = 200;
    var event = {
        name: name,
        dates: []
    };
    // add up to 200 events
    var max =  Math.floor(Math.random() * maxNbEvents);
    for (var j = 0; j < max; j++) {
        // var time = (Math.random() * (endTime - startTime)) + startTime;
        // time = new Date(time);
        var time = (Math.random() * (endTime - startTime)) + startTime;
        // console.log(time / (30 * 24 * 60 * 60 * 1000));
        event.dates.push(time);
    }
    return event;
}


