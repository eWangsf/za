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
    data = [],
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
    // data initiate
    for (var i = 0; i < names.length; i++) {
        data.push(createEvent(names[i]));
    }

    yAxis = document.getElementById('y_axis').getElementsByTagName('g')[0];
    bodyAxis = document.getElementById('graph_body');
    topAxis = document.getElementById('top');
    bottomAxis = document.getElementById('bottom');
    delimiter = document.getElementById('delimiter');

    eventdrops = new eventDrops(names, data, startTime, endTime);
    eventdrops.start();
    
}

function eventDrops(names, data, startTime, endTime) {
    this.names = names;
    this.data = data;
    this.startTime = startTime;
    this.endTime = endTime;
    this.lineDoms = [];
}

eventDrops.prototype.start = function () {
    this.renderAxis(this.startTime, this.endTime);
    this.renderEvents();
}

eventDrops.prototype.renderAxis = function (startTime, endTime) {
    var names = this.names,
        data = this.data;

    delimiter.getElementsByTagName('text')[0].innerHTML = new Date(startTime).toLocaleDateString();
    delimiter.getElementsByTagName('text')[1].innerHTML = new Date(endTime).toLocaleDateString();

    // line rendering
    var yAxisStr = '',
        bodyStr = '';
    for (var i = 0; i < names.length; i++) {
        yAxisStr += '<g transform="translate(0, ' + (i * line_interval) + ')"><line class="y-tick" x1="' + name_width + '" x2="' + (width - right_padding) + '"></line></g>';
        // bodyStr += '<g class="line" transform="translate(0, ' + (i * line_interval) + ')" style="fill: black;">'
        //         + '<text text-anchor="end" transform="translate(-20)" style="fill: black;">' + names[i] + ' (' + data[i]['dates'].length + ') ' + '</text>'
        //         + '</g>';
        bodyStr += '<g class="line" transform="translate(0, ' + (i * line_interval) + ')" style="fill: black;">'
                + '<g style="filter: url(#metaball);">'
                + '<rect width="40px" height="40px" transform="translate(0,-25)" style="fill: none;"></rect>'
                + '</g>'
                + '<text text-anchor="end" transform="translate(-20)" style="fill: black;">' + names[i] + ' (' + data[i]['dates'].length + ') ' + '</text>'
                + '<g class="circle_container" style="filter: url(#metaball);">'
                + '<rect width="40px" height="40px" transform="translate(0,-25)" style="fill: none;"></rect>'
                + '</g>'
                + '</g>';
    }
    yAxis.innerHTML = yAxisStr;
    bodyAxis.innerHTML += bodyStr;

    var topStr = '',
        bottomStr = '';
    for(var i = 0; i < 7; i++) {
        var thisDate = new Date(startTime + i * (30 * 24 * 60 * 60 * 1000)).toLocaleDateString();
        topStr += '<g class="tick" transform="translate(' + (i * (width - right_padding - name_width) / 6) + ',0)" style="opacity: 1;">'
                + '<line y2="-6" x2="0"></line><text dy="0em" y="-9" x="0" style="text-anchor: middle;">'
                + thisDate + '</text></g>';
        bottomStr += '<g class="tick" transform="translate(' + (i * (width - right_padding - name_width) / 6) + ',0)" style="opacity: 1;">'
                + '<line y2="-6" x2="0"></line><text dy="2.2em" y="-9" x="0" style="text-anchor: middle;">'
                + thisDate + '</text></g>';
    }
    topAxis.innerHTML = topStr + '<path class="domain" d="M0,-6V0H750V-6"></path>';
    bottomAxis.innerHTML = bottomStr + '<path class="domain" d="M0,6V0H750V6"></path>';
}

eventDrops.prototype.renderEvents = function () {
    this.lineDoms = bodyAxis.getElementsByClassName('circle_container');
    var names = this.names,
        data = this.data,
        lineDoms = this.lineDoms;
    var totalLength = width - name_width - right_padding,
        totalTime = this.endTime - this.startTime;

    for(var i = 0; i < names.length; i++) {
        var thisline = lineDoms[i];
        var thisdata = data[i]['dates'];
        var color = colors[i];
        var thisCircleStr = '';
        for(var j = 0; j < thisdata.length; j++) {
            thisCircleStr += '<circle cx="' + (totalLength * thisdata[j] / totalTime) + '" cy="-5" r="5" fill="' + color + '" stroke="none" />';
        }
        thisline.innerHTML += thisCircleStr;
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
        var time = (Math.random() * (endTime - startTime));
        // console.log(time / (30 * 24 * 60 * 60 * 1000));
        event.dates.push(time);
    }
    return event;
}


