var endTime = Date.now(),
    startTime = endTime - 6 * (30 * 24 * 60 * 60 * 1000);

var names = [
        "Lorem", "Ipsum", 
        "Dolor", "Sit", 
        "Amet", "Consectetur", 
        "Adipisicing", "elit", 
        "Eiusmod tempor", "Incididunt"
    ],
    data = [];

var eventdrops;



window.onload = function () {
    for (var i = 0; i < names.length; i++) {
        data.push(createEvent(names[i]));
    }

    eventdrops = new eventDrops(names, data);
    eventdrops.start();
    
}

function eventDrops(names, data) {
    this.names = names;
    this.data = data;
}

eventDrops.prototype.start = function () {
    console.log(this.data.length);
    console.log(this.names);
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


