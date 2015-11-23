var endTime = Date.now(),
    startTime = endTime - 6 * (30 * 24 * 60 * 60 * 1000);

var line_interval = 40,
    name_width = 200;

var names = [
        "Lorem", "Ipsum", 
        "Dolor", "Sit", 
        "Amet", "Consectetur", 
        "Adipisicing", "elit", 
        "Eiusmod tempor", "Incididunt"
    ],
    data = [];

var eventdrops;

var yAxis,
    bodyAxis,
    topAxis,
    bottomAxis,
    delimiter;




window.onload = function () {
    // data initiate
    for (var i = 0; i < names.length; i++) {
        data.push(createEvent(names[i]));
    }

    yAxis = document.getElementById('axis').getElementsByTagName('g')[0];
    bodyAxis = document.getElementById('axis').getElementsByTagName('g')[3];
    topAxis = document.getElementById('axis').getElementsByTagName('g')[1];
    bottomAxis = document.getElementById('axis').getElementsByTagName('g')[2];
    delimiter = document.getElementById('delimiter');
    delimiter.getElementsByTagName('text')[0].innerHTML = new Date(startTime).toLocaleDateString();
    delimiter.getElementsByTagName('text')[1].innerHTML = new Date(endTime).toLocaleDateString();

    // line rendering
    var yAxisStr = '',
        bodyStr = '';
    for (var i = 0; i < names.length; i++) {
        yAxisStr += '<g transform="translate(0, ' + (i * line_interval) + ')"><line class="y-tick" x1="200" x2="950"></line></g>';
        bodyStr += '<g class="line" transform="translate(0, ' + (i * line_interval) + ')" style="fill: black;">'
                + '<text text-anchor="end" transform="translate(-20)" style="fill: black;">' + names[i] + ' (' + data[i]['dates'].length + ') ' + '</text>'
                + '</g>';
    }
    yAxis.innerHTML = yAxisStr;
    bodyAxis.innerHTML += bodyStr;

    eventdrops = new eventDrops(names, data, startTime, endTime);
    eventdrops.start();
    
}

function eventDrops(names, data, startTime, endTime) {
    this.names = names;
    this.data = data;
    this.startTime = startTime;
    this.endTime = endTime;
}

eventDrops.prototype.start = function () {
    this.renderAxis(this.startTime, this.endTime);
    this.renderEvents();
}

eventDrops.prototype.renderAxis = function (startTime, endTime) {
    var topStr = '',
        bottomStr = '';
    for(var i = 0; i < 6; i++) {
        var thisDate = new Date(startTime + i * (30 * 24 * 60 * 60 * 1000)).toLocaleDateString();
        topStr += '<g class="tick" transform="translate(' + (i * (950 - name_width) / 6) + ',0)" style="opacity: 1;">'
                + '<line y2="-6" x2="0"></line><text dy="0em" y="-9" x="0" style="text-anchor: start;">'
                + thisDate + '</text></g>';
        bottomStr += '<g class="tick" transform="translate(' + (i * (950 - name_width) / 6) + ',0)" style="opacity: 1;">'
                + '<line y2="-6" x2="0"></line><text dy="2em" y="-9" x="0" style="text-anchor: start;">'
                + thisDate + '</text></g>';
    }
    topAxis.innerHTML = topStr + '<path class="domain" d="M0,-6V0H750V-6"></path>';
    bottomAxis.innerHTML = bottomStr + '<path class="domain" d="M0,6V0H750V6"></path>';
}

eventDrops.prototype.renderEvents = function () {
    var names = this.names,
        data = this.data;

    console.log(names);
    console.log(data);
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
        var time = (Math.random() * (endTime - startTime)) + startTime;
        event.dates.push(new Date(time));
    }
    return event;
}


