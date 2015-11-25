// time duration: 6 months
var endTime = Date.now(),
    startTime = endTime - 6 * (30 * 24 * 60 * 60 * 1000),
    color = d3.scale.category20();

// create dataset
var names = [
        "Lorem", "Ipsum", 
        "Dolor", "Sit", 
        "Amet", "Consectetur", 
        "Adipisicing", "elit", 
        "Eiusmod tempor", "Incididunt"
    ],
    data = [];

for (var i = 0; i < names.length; i++) {
    data.push(createEvent(names[i]));
}

// create chart function
var eventDropsChart = d3.chart.eventDrops()
    .eventLineColor(function (datum, index) {
        return color(index);
    })
    .start(new Date(startTime))
    .end(new Date(endTime));

var element = d3.select('body').append('div').datum(data);

eventDropsChart(element);


function createEvent (name) {
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
