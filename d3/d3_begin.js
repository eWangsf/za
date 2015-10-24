// d3.select("body").style("background-color", "black");

// d3.select("body").append("p").text("New paragraph!");
// d3.csv('csv.csv', function (data) {
//     console.log(data);
// });






//-------------------Drawing with data--------------------
// var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
//                 14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
//                 24, 18, 25, 9, 3 ];

// var dataset2 = [];
// for(var i = 0; i < 30; i++) {
//     dataset2.push(Math.floor(Math.random() * 30));
// }

// d3.select('body')
//     .selectAll('div')
//     .data(dataset2)
//     .enter()
//     .append('div')
//     .classed('bar', true)
//     .style('height', function(d) {
//         return d * 3 + "px";
//     });



// var width = 500,
//     height = 300;
// var dataset2 = [1, 2, 3, 4, 5];
// var svg = d3.select('body')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

// svg.selectAll('circle')
//     .data(dataset2)
//     .enter()
//     .append('circle')
//     .attr({
//         cx: function (d) {
//             return d * 60;
//         },
//         cy: function (d) {
//             return 100;
//         },
//         r: function (d) {
//             return d * 5;
//         },
//         'fill': "yellow",
//         'stroke': "green",
//         'stroke-width': function (d) {
//             return d * 2;
//         }
//     });



// var width = 500,
//     height = 300,
//     padding = 2;
// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//                 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// var svg = d3.select('body')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

// svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr({
//         'x': function (d, i) {
//             return i * width / dataset.length;
//         },
//         'y': function (d) {
//             return height - d * 4;
//         },
//         'width': function (d) {
//             return width / dataset.length - padding;
//         },
//         'height': function (d) {
//             return d * 4;
//         },
//         'fill': function (d) {
//             return 'rgb(0, ' + d * 10 + ', 0)';
//         }
//     })

// svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .attr({
//         'x': function (d, i) {
//             return i * width / dataset.length + 0.5 * (width / dataset.length - padding);
//         },
//         'y': function (d) {
//             return height - d * 4 + 18;
//         },
//         'fill': 'white',
//         'text-anchor': 'middle'
//     })
//     .text(function (d) {
//         return d;
//     });


//-------------------Scales--------------------
// var width = 500,
//     height = 300,
//     dataset = [
//                   [ 5,     20 ],
//                   [ 480,   90 ],
//                   [ 250,   50 ],
//                   [ 100,   33 ],
//                   [ 330,   95 ],
//                   [ 410,   12 ],
//                   [ 475,   44 ],
//                   [ 25,    67 ],
//                   [ 85,    21 ],
//                   [ 220,   88 ]
//               ];

// var svg = d3.select('body')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

// svg.selectAll('circle')
//     .data(dataset)
//     .enter()
//     .append('circle')
//     .attr({
//         'cx': function (d) {
//             return d[0];
//         },
//         'cy': function (d) {
//             return d[1];
//         },
//         'r': 6

//     })

// svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .attr({
//         'x': function (d) {
//             return d[0];
//         },
//         'y': function (d) {
//             return d[1];
//         },
//         'fill': 'red',
//         // 'text-anchor': 'middle'
//     })
//     .text(function (d) {
//         return d[0] + ', ' + d[1];
//     });






//-------------------Axes--------------------
// var width = 500,
//     height = 300,
//     padding = 50,
//     // dataset = [
//     //               [ 5,     20 ],
//     //               [ 480,   90 ],
//     //               [ 250,   50 ],
//     //               [ 100,   33 ],
//     //               [ 330,   95 ],
//     //               [ 410,   12 ],
//     //               [ 475,   44 ],
//     //               [ 25,    67 ],
//     //               [ 85,    21 ],
//     //               [ 220,   88 ]
//     //           ];
//     dataset = [
//                 [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
//                 [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
//                 [600, 150]
//               ];

// var svg = d3.select('body')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

// var xscale = d3.scale.linear()
//                     .domain([0, d3.max(dataset, function (d) {return d[0];})])
//                     .range([padding, width - padding]);

// var yscale = d3.scale.linear()
//                     .domain([0, d3.max(dataset, function (d) {return d[1];})])
//                     .range([height - padding, padding]);
// svg.selectAll('circle')
//     .data(dataset)
//     .enter()
//     .append('circle')
//     .attr({
//         'cx': function (d) {
//             return xscale(d[0]);
//         },
//         'cy': function (d) {
//             return yscale(d[1]);
//         },
//         'r': 3

//     })

// svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .attr({
//         'x': function (d) {
//             return xscale(d[0]);
//         },
//         'y': function (d) {
//             return yscale(d[1]);
//         },
//         'fill': 'red',
//         'style': 'font-size: 11px;'
//     })
//     .text(function (d) {
//         return d[0] + ', ' + d[1];
//     });

// var xAxis = d3.svg.axis()
//                     .scale(xscale)
//                     .orient('bottom')
//                     .ticks(5);
// var yAxis = d3.svg.axis()
//                     .scale(yscale)
//                     .orient('left')
//                     .ticks(5);

// svg.append('g')
//     .attr('class', 'xs')
//     .attr("transform", "translate(0, " + (height - padding) + ")")
//     .call(xAxis);

// svg.append('g')
//     .attr('class', 'xs')
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(yAxis);






//-------------------Update, transition, motion(--------------------
// var width = 600,
//     height = 300,
//     padding = 2,
//     dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//                 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// var svg = d3.select('body')
//             .append('svg')
//             .attr({
//                 width: width,
//                 height: height
//             });

// svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr({
//         'x': function (d, i) {
//             return i * width / dataset.length;
//         },
//         'y': function (d, i) {
//             return height - d * (height / d3.max(dataset));
//         },
//         'width': function (d, i) {
//             return width / dataset.length - padding;
//         },
//         'height': function (d, i) {
//             return d * (height / d3.max(dataset));
//         },
//         'fill': function (d, i) {
//             return 'rgb(0, ' + (d * 10) + ', 0)';
//         }
//     });

// svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .attr({
//         'x': function (d, i) {
//             return i * width / dataset.length + 0.5 * (width / dataset.length - padding);
//         },
//         'y': function (d) {
//             return height - d * (height / d3.max(dataset)) + 15;
//         },
//         'text-anchor': 'middle',
//         'fill': 'white'
//     })
//     .text(function (d) {
//         return d;
//     });

// var xscale = d3.scale.ordinal()
//                 .domain(d3.range(dataset.length))
//                 .rangeBands([0, width], 0.05, 0);
//                 // console.log(xscale);
// var yscale = d3.scale.linear()
//                 .domain([0, d3.max(dataset)])
//                 .range([0, height])
// svg.selectAll("rect")
//    .data(dataset)
//    .enter()
//    .append("rect")
//    .attr({
//         "x": function(d, i) {
//           return xscale(i);         // <-- Set x values
//        },
//        "y": function (d, i) {
//             return height - yscale(d);
//         },
//         "width": function (d, i) {
//             return xscale.rangeBand();
//         },
//         "height": function (d, i) {
//             return yscale(d);
//         },
//         "fill": function (d, i) {
//             return 'rgb(0, ' + (d * 10) + ', 0)';
//         }  

//     })

// svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .attr({
//         'x': function (d, i) {
//             return xscale(i) + 0.5 * (width / dataset.length - padding);
//         },
//         'y': function (d) {
//             return height - yscale(d) + 15;
//         },
//         'text-anchor': 'middle',
//         'fill': 'white'
//     })
//     .text(function (d) {
//         return d;
//     });



// d3.select('p')
//     .on('click', function () {
//         // var dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
//         //             5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
//         var numValues = dataset.length;               
//         dataset = [];                                       
//         for (var i = 0; i < numValues; i++) {               
//             var newNumber = Math.floor(Math.random() * 100); 
//             dataset.push(newNumber);                       
//         }
//         yscale.domain([0, d3.max(dataset)]);
//         svg.selectAll("rect")
//            .data(dataset)
//            .transition()
//            .delay(function(d, i) {
//                return i / dataset.length * 1000;   // <-- Where the magic happens
//            })
//            .duration(500)
//            // .ease('bounce')
//            .attr("y", function(d) {
//                 return height - yscale(d);
//            })
//            .attr("height", function(d) {
//                 return yscale(d);
//            })
//            .attr("fill", function (d, i) {
//                 return 'rgb(0, ' + (d * 10) + ', 0)';
//             })

//         svg.selectAll('text')
//             .data(dataset)
//             .transition()
//             .delay(function(d, i) {
//                 return i / dataset.length * 1000;   // <-- Where the magic happens
//             })
//             .duration(500)
//             // .ease('bounce')
//             .attr({
//                 'x': function (d, i) {
//                     return xscale(i) + 0.5 * (width / dataset.length - padding);
//                 },
//                 'y': function (d) {
//                     return height - yscale(d) + 15;
//                 },
//                 'text-anchor': 'middle',
//                 'fill': 'white'
//             })
//             .text(function (d) {
//                 return d;
//             });
//         });







//-------------------Update, transition, motion(axis)--------------------
var width = 600,
    height = 300,
    padding = 2,
    dataset = [];                                           //Initialize empty array

var numDataPoints = 50;                                     //Number of dummy data points to create
var maxRange = Math.random() * 1000;                        //Max range of new values
for (var i = 0; i < numDataPoints; i++) {                   //Loop numDataPoints times
    var newNumber1 = Math.floor(Math.random() * maxRange);  //New random integer
    var newNumber2 = Math.floor(Math.random() * maxRange);  //New random integer
    dataset.push([newNumber1, newNumber2]);                 //Add new number to array
}
var svg = d3.select('body')
            .append('svg')
            .attr({
                width: width,
                height: height
            });






