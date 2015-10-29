// // d3.select("body").style("background-color", "black");

// // d3.select("body").append("p").text("New paragraph!");
// // d3.csv('csv.csv', function (data) {
// //     console.log(data);
// // });






// //-------------------Drawing with data--------------------
// // var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
// //                 14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
// //                 24, 18, 25, 9, 3 ];

// // var dataset2 = [];
// // for(var i = 0; i < 30; i++) {
// //     dataset2.push(Math.floor(Math.random() * 30));
// // }

// // d3.select('body')
// //     .selectAll('div')
// //     .data(dataset2)
// //     .enter()
// //     .append('div')
// //     .classed('bar', true)
// //     .style('height', function(d) {
// //         return d * 3 + "px";
// //     });



// // var width = 500,
// //     height = 300;
// // var dataset2 = [1, 2, 3, 4, 5];
// // var svg = d3.select('body')
// //     .append('svg')
// //     .attr('width', width)
// //     .attr('height', height);

// // svg.selectAll('circle')
// //     .data(dataset2)
// //     .enter()
// //     .append('circle')
// //     .attr({
// //         cx: function (d) {
// //             return d * 60;
// //         },
// //         cy: function (d) {
// //             return 100;
// //         },
// //         r: function (d) {
// //             return d * 5;
// //         },
// //         'fill': "yellow",
// //         'stroke': "green",
// //         'stroke-width': function (d) {
// //             return d * 2;
// //         }
// //     });



// // var width = 500,
// //     height = 300,
// //     padding = 2;
// // var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
// //                 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// // var svg = d3.select('body')
// //     .append('svg')
// //     .attr('width', width)
// //     .attr('height', height);

// // svg.selectAll('rect')
// //     .data(dataset)
// //     .enter()
// //     .append('rect')
// //     .attr({
// //         'x': function (d, i) {
// //             return i * width / dataset.length;
// //         },
// //         'y': function (d) {
// //             return height - d * 4;
// //         },
// //         'width': function (d) {
// //             return width / dataset.length - padding;
// //         },
// //         'height': function (d) {
// //             return d * 4;
// //         },
// //         'fill': function (d) {
// //             return 'rgb(0, ' + d * 10 + ', 0)';
// //         }
// //     })

// // svg.selectAll('text')
// //     .data(dataset)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d, i) {
// //             return i * width / dataset.length + 0.5 * (width / dataset.length - padding);
// //         },
// //         'y': function (d) {
// //             return height - d * 4 + 18;
// //         },
// //         'fill': 'white',
// //         'text-anchor': 'middle'
// //     })
// //     .text(function (d) {
// //         return d;
// //     });


// //-------------------Scales--------------------
// // var width = 500,
// //     height = 300,
// //     dataset = [
// //                   [ 5,     20 ],
// //                   [ 480,   90 ],
// //                   [ 250,   50 ],
// //                   [ 100,   33 ],
// //                   [ 330,   95 ],
// //                   [ 410,   12 ],
// //                   [ 475,   44 ],
// //                   [ 25,    67 ],
// //                   [ 85,    21 ],
// //                   [ 220,   88 ]
// //               ];

// // var svg = d3.select('body')
// //     .append('svg')
// //     .attr('width', width)
// //     .attr('height', height);

// // svg.selectAll('circle')
// //     .data(dataset)
// //     .enter()
// //     .append('circle')
// //     .attr({
// //         'cx': function (d) {
// //             return d[0];
// //         },
// //         'cy': function (d) {
// //             return d[1];
// //         },
// //         'r': 6

// //     })

// // svg.selectAll('text')
// //     .data(dataset)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d) {
// //             return d[0];
// //         },
// //         'y': function (d) {
// //             return d[1];
// //         },
// //         'fill': 'red',
// //         // 'text-anchor': 'middle'
// //     })
// //     .text(function (d) {
// //         return d[0] + ', ' + d[1];
// //     });






// //-------------------Axes--------------------
// // var width = 500,
// //     height = 300,
// //     padding = 50,
// //     // dataset = [
// //     //               [ 5,     20 ],
// //     //               [ 480,   90 ],
// //     //               [ 250,   50 ],
// //     //               [ 100,   33 ],
// //     //               [ 330,   95 ],
// //     //               [ 410,   12 ],
// //     //               [ 475,   44 ],
// //     //               [ 25,    67 ],
// //     //               [ 85,    21 ],
// //     //               [ 220,   88 ]
// //     //           ];
// //     dataset = [
// //                 [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
// //                 [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
// //                 [600, 150]
// //               ];

// // var svg = d3.select('body')
// //     .append('svg')
// //     .attr('width', width)
// //     .attr('height', height);

// // var xscale = d3.scale.linear()
// //                     .domain([0, d3.max(dataset, function (d) {return d[0];})])
// //                     .range([padding, width - padding]);

// // var yscale = d3.scale.linear()
// //                     .domain([0, d3.max(dataset, function (d) {return d[1];})])
// //                     .range([height - padding, padding]);
// // svg.selectAll('circle')
// //     .data(dataset)
// //     .enter()
// //     .append('circle')
// //     .attr({
// //         'cx': function (d) {
// //             return xscale(d[0]);
// //         },
// //         'cy': function (d) {
// //             return yscale(d[1]);
// //         },
// //         'r': 3

// //     })

// // svg.selectAll('text')
// //     .data(dataset)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d) {
// //             return xscale(d[0]);
// //         },
// //         'y': function (d) {
// //             return yscale(d[1]);
// //         },
// //         'fill': 'red',
// //         'style': 'font-size: 11px;'
// //     })
// //     .text(function (d) {
// //         return d[0] + ', ' + d[1];
// //     });

// // var xAxis = d3.svg.axis()
// //                     .scale(xscale)
// //                     .orient('bottom')
// //                     .ticks(5);
// // var yAxis = d3.svg.axis()
// //                     .scale(yscale)
// //                     .orient('left')
// //                     .ticks(5);

// // svg.append('g')
// //     .attr('class', 'xs')
// //     .attr("transform", "translate(0, " + (height - padding) + ")")
// //     .call(xAxis);

// // svg.append('g')
// //     .attr('class', 'xs')
// //     .attr("transform", "translate(" + padding + ",0)")
// //     .call(yAxis);






// //-------------------Update, transition, motion(--------------------
// // var width = 600,
// //     height = 300,
// //     padding = 2,
// //     dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
// //                 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 width: width,
// //                 height: height
// //             });

// // svg.selectAll('rect')
// //     .data(dataset)
// //     .enter()
// //     .append('rect')
// //     .attr({
// //         'x': function (d, i) {
// //             return i * width / dataset.length;
// //         },
// //         'y': function (d, i) {
// //             return height - d * (height / d3.max(dataset));
// //         },
// //         'width': function (d, i) {
// //             return width / dataset.length - padding;
// //         },
// //         'height': function (d, i) {
// //             return d * (height / d3.max(dataset));
// //         },
// //         'fill': function (d, i) {
// //             return 'rgb(0, ' + (d * 10) + ', 0)';
// //         }
// //     });

// // svg.selectAll('text')
// //     .data(dataset)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d, i) {
// //             return i * width / dataset.length + 0.5 * (width / dataset.length - padding);
// //         },
// //         'y': function (d) {
// //             return height - d * (height / d3.max(dataset)) + 15;
// //         },
// //         'text-anchor': 'middle',
// //         'fill': 'white'
// //     })
// //     .text(function (d) {
// //         return d;
// //     });

// // var xscale = d3.scale.ordinal()
// //                 .domain(d3.range(dataset.length))
// //                 .rangeBands([0, width], 0.05, 0);
// //                 // console.log(xscale);
// // var yscale = d3.scale.linear()
// //                 .domain([0, d3.max(dataset)])
// //                 .range([0, height])
// // svg.selectAll("rect")
// //    .data(dataset)
// //    .enter()
// //    .append("rect")
// //    .attr({
// //         "x": function(d, i) {
// //           return xscale(i);         // <-- Set x values
// //        },
// //        "y": function (d, i) {
// //             return height - yscale(d);
// //         },
// //         "width": function (d, i) {
// //             return xscale.rangeBand();
// //         },
// //         "height": function (d, i) {
// //             return yscale(d);
// //         },
// //         "fill": function (d, i) {
// //             return 'rgb(0, ' + (d * 10) + ', 0)';
// //         }  

// //     })

// // svg.selectAll('text')
// //     .data(dataset)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d, i) {
// //             return xscale(i) + 0.5 * (width / dataset.length - padding);
// //         },
// //         'y': function (d) {
// //             return height - yscale(d) + 15;
// //         },
// //         'text-anchor': 'middle',
// //         'fill': 'white'
// //     })
// //     .text(function (d) {
// //         return d;
// //     });



// // d3.select('p')
// //     .on('click', function () {
// //         // var dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
// //         //             5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
// //         var numValues = dataset.length;               
// //         dataset = [];                                       
// //         for (var i = 0; i < numValues; i++) {               
// //             var newNumber = Math.floor(Math.random() * 100); 
// //             dataset.push(newNumber);                       
// //         }
// //         yscale.domain([0, d3.max(dataset)]);
// //         svg.selectAll("rect")
// //            .data(dataset)
// //            .transition()
// //            .delay(function(d, i) {
// //                return i / dataset.length * 1000;   // <-- Where the magic happens
// //            })
// //            .duration(500)
// //            // .ease('bounce')
// //            .attr("y", function(d) {
// //                 return height - yscale(d);
// //            })
// //            .attr("height", function(d) {
// //                 return yscale(d);
// //            })
// //            .attr("fill", function (d, i) {
// //                 return 'rgb(0, ' + (d * 10) + ', 0)';
// //             })

// //         svg.selectAll('text')
// //             .data(dataset)
// //             .transition()
// //             .delay(function(d, i) {
// //                 return i / dataset.length * 1000;   // <-- Where the magic happens
// //             })
// //             .duration(500)
// //             // .ease('bounce')
// //             .attr({
// //                 'x': function (d, i) {
// //                     return xscale(i) + 0.5 * (width / dataset.length - padding);
// //                 },
// //                 'y': function (d) {
// //                     return height - yscale(d) + 15;
// //                 },
// //                 'text-anchor': 'middle',
// //                 'fill': 'white'
// //             })
// //             .text(function (d) {
// //                 return d;
// //             });
// //         });







// //-------------------Update, transition, motion(axis)--------------------
// // var width = 800,
// //     height = 500,
// //     padding = 30,
// //     dataset = [];                                           //Initialize empty array

// // var numDataPoints = 50;                                     //Number of dummy data points to create
// // var maxRange1 = Math.random() * width;                        //Max range of new values
// // var maxRange2 = Math.random() * height;                        //Max range of new values
// // console.log(maxRange1);
// // console.log(maxRange2);
// // for (var i = 0; i < numDataPoints; i++) {                   //Loop numDataPoints times
// //     var newNumber1 = Math.floor(Math.random() * maxRange1);  //New random integer
// //     var newNumber2 = Math.floor(Math.random() * maxRange2);  //New random integer
// //     dataset.push([newNumber1, newNumber2]);                 //Add new number to array
// // }
// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 width: width,
// //                 height: height
// //             });

// // var xscale = d3.scale.linear()
// //                 .domain([0, d3.max(dataset, function(d) {
// //                         return d[0];
// //                     })
// //                 ])
// //                 .range([padding, width - padding]);
// // var yscale = d3.scale.linear()
// //                 .domain([0, d3.max(dataset, function (d) {
// //                         return d[1];
// //                     })
// //                 ])
// //                 .range([height - padding, padding]);


// // var xAxis = d3.svg.axis()
// //                 .scale(xscale)
// //                 .orient('bottom');
// // var yAxis = d3.svg.axis()
// //                 .scale(yscale)
// //                 .orient('left');

// // svg.append('g')
// //     .classed('x xs', true)
// //     .attr("transform", "translate(0," + (height - padding) + ")")
// //     .call(xAxis);
// // svg.append('g')
// //     .classed('y xs', true)
// //     .attr("transform", "translate(" + padding + ", 0)")
// //     .call(yAxis);

// // svg.selectAll('circle')
// //     .data(dataset)
// //     .enter()
// //     .append('circle')
// //     .attr({
// //         'cx': function (d, i) {
// //             return xscale(d[0]);
// //         },
// //         'cy': function (d, i) {
// //             return yscale(d[1]);
// //         },
// //         'r': 2
// //     });


// // d3.select('p')
// //     .on('click', function () {
// //         var numDataPoints = 50;                                     //Number of dummy data points to create
// //         var maxRange1 = Math.random() * width;                        //Max range of new values
// //         var maxRange2 = Math.random() * height; 
// //         dataset = [];
// //         for (var i = 0; i < numDataPoints; i++) {                   
// //             var newNumber1 = Math.floor(Math.random() * maxRange1);  
// //             var newNumber2 = Math.floor(Math.random() * maxRange2);  
// //             dataset.push([newNumber1, newNumber2]);                 
// //         }
// //         xscale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
// //         yscale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);
// //         svg.selectAll('circle')
// //             .data(dataset)
// //             .transition()
// //             .duration(1000)
// //             .each("start", function() {
// //                d3.select(this)
// //                  .attr("r", 7);
// //             })
// //             .attr({
// //                 'cx': function (d, i) {
// //                     return xscale(d[0]);
// //                 },
// //                 'cy': function (d, i) {
// //                     return yscale(d[1]);
// //                 },
// //                 'r': 2
// //             });
// //         svg.select('.x.xs')
// //             .transition()
// //             .duration(1000)
// //             .call(xAxis);
// //         svg.select('.y.xs')
// //             .transition()
// //             .duration(1000)
// //             .call(yAxis);
// //     })





// //-------------------Update, transition, motion(add, delete)--------------------
// // var width = 600,
// //     height = 300,
// //     padding = 2,
// //     dataset = [ { key: 0, value: 5 },
// //                 { key: 1, value: 10 },
// //                 { key: 2, value: 13 },
// //                 { key: 3, value: 19 },
// //                 { key: 4, value: 21 },
// //                 { key: 5, value: 25 },
// //                 { key: 6, value: 22 },
// //                 { key: 7, value: 18 },
// //                 { key: 8, value: 15 },
// //                 { key: 9, value: 13 },
// //                 { key: 10, value: 11 },
// //                 { key: 11, value: 12 },
// //                 { key: 12, value: 15 },
// //                 { key: 13, value: 20 },
// //                 { key: 14, value: 18 },
// //                 { key: 15, value: 17 },
// //                 { key: 16, value: 16 },
// //                 { key: 17, value: 18 },
// //                 { key: 18, value: 23 },
// //                 { key: 19, value: 25 } ];

// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 width: width,
// //                 height: height
// //             });

// // var xscale = d3.scale.ordinal()
// //                 .domain(d3.range(dataset.length))
// //                 .rangeRoundBands([0, width], 0.05);
// // var yscale = d3.scale.linear()
// //                 .domain([0, d3.max(dataset, function (d) {
// //                     return d.value;
// //                 })])
// //                 .range([0, height]);

// // var key = function (d) {
// //     return d.key;
// // }

// // svg.selectAll('rect')
// //     .data(dataset, key)
// //     .enter()
// //     .append('rect')
// //     .attr({
// //         'x': function (d, i) {
// //             return xscale(i);
// //         },
// //         'y': function (d, i) {
// //             return height - yscale(d.value);
// //         },
// //         'width': function (d, i) {
// //             return xscale.rangeBand();
// //         },
// //         'height': function (d, i) {
// //             return yscale(d.value);
// //         },
// //         'fill': function (d, i) {
// //             return 'rgb(0, ' + (d.value * 10) + ', 0)';
// //         }
// //     });

// // svg.selectAll('text')
// //     .data(dataset, key)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d, i) {
// //             return xscale(i) + 0.5 * xscale.rangeBand();
// //         },
// //         'y': function (d) {
// //             return height - yscale(d.value) + 15;
// //         },
// //         'text-anchor': 'middle',
// //         'fill': 'white'
// //     })
// //     .text(function (d) {
// //         return d.value;
// //     });

// // d3.select('#add')
// //     .on('click', function () {
// //         var newVal = Math.floor(Math.random() * d3.max(dataset, function (d) {
// //             return d.value;
// //         }));
        
// //         dataset.push({
// //             key: dataset[dataset.length - 1].key + 1,
// //             value: newVal
// //         });

// //         xscale.domain(d3.range(dataset.length));
// //         yscale.domain([0, d3.max(dataset, function (d) {
// //             return d.value;
// //         })]);

// //         var bars = svg.selectAll('rect').data(dataset, key);
// //         var texts = svg.selectAll('text').data(dataset, key);
// //         bars.enter()
// //             .append('rect')
// //             .attr({
// //                 'x': width,
// //                 'y': function (d, i) {
// //                     return height - yscale(d.value);
// //                 },
// //                 'width': function (d, i) {
// //                     return xscale.rangeBand();
// //                 },
// //                 'height': function (d, i) {
// //                     return yscale(d.value);
// //                 },
// //                 'fill': function (d, i) {
// //                     return 'rgb(0, ' + (d.value * 10) + ', 0)';
// //                 }
// //             });

// //         bars.transition()
// //             .duration(500)
// //             .attr({
// //                 'x': function (d, i) {
// //                     return xscale(i);
// //                 },
// //                 'y': function (d, i) {
// //                     return height - yscale(d.value);
// //                 },
// //                 'width': function (d, i) {
// //                     return xscale.rangeBand();
// //                 },
// //                 'height': function (d, i) {
// //                     return yscale(d.value);
// //                 },
// //                 'fill': function (d) {
// //                     return 'rgb(0, ' + (d.value * 10) + ', 0)';
// //                 }
// //             });

// //         texts.enter()
// //             .append('text')
// //             .attr({
// //                 'x': width,
// //                 'y': function (d, i) {
// //                     return height - yscale(d.value);
// //                 },
// //                 'width': function (d, i) {
// //                     return xscale.rangeBand();
// //                 },
// //                 'height': function (d, i) {
// //                     return yscale(d.value);
// //                 },
// //                 'fill': function (d, i) {
// //                     return 'rgb(0, ' + (d.value * 10) + ', 0)';
// //                 }
// //             });

// //         texts.transition()
// //             .duration(500)
// //             .attr({
// //                 'x': function (d, i) {
// //                     return xscale(i) + 0.5 * xscale.rangeBand();
// //                 },
// //                 'y': function (d) {
// //                     return height - yscale(d.value) + 15;
// //                 },
// //                 'text-anchor': 'middle',
// //                 'fill': 'white'
// //             })
// //             .text(function (d) {
// //                 return d.value;
// //             });

// //     });

// // console.log(dataset);
// // d3.select('#remove')
// //     .on('click', function () {
// //         dataset.shift();
// //         xscale.domain(d3.range(dataset.length));
// //         yscale.domain([0, d3.max(dataset, function (d) {
// //                 return d.value;
// //             })
// //         ]);

// //         var bars = svg.selectAll('rect').data(dataset, key);
// //         var texts = svg.selectAll('text').data(dataset, key);

// //         bars.transition()
// //                     .duration(500)
// //                     .attr("x", function (d, i) {
// //                         return xscale(i);
// //                     })
// //                     .attr("y", function (d) {
// //                         return height - yscale(d.value);
// //                     })
// //                     .attr("width", xscale.rangeBand())
// //                     .attr("height", function (d) {
// //                         return yscale(d.value);
// //                     });

// //         bars.exit()
// //             .transition()
// //             .duration(500)
// //             .attr({
// //                 'x': -xscale.rangeBand()
// //             })
// //             .remove();

// //         texts.transition()
// //             .duration(500)
// //             .attr({
// //                 'x': function (d, i) {
// //                     return xscale(i) + 0.5 * xscale.rangeBand();
// //                 },
// //                 'y': function (d) {
// //                     return height - yscale(d.value) + 15;
// //                 },
// //                 'text-anchor': 'middle',
// //                 'fill': 'white'
// //             })
// //             .text(function (d) {
// //                 return d.value;
// //             });

// //         texts.exit()
// //             .transition()
// //             .duration(500)
// //             .attr({
// //                 'x': function (d, i) {
// //                     return -xscale.rangeBand();
// //                 }
// //             })
// //             .remove();

        

// //     });







// //-------------------interaction--------------------
// // var width = 600,
// //     height = 300,
// //     padding = 2,
// //     // dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
// //     dataset = [ { key: 0, value: 5 },
// //                 { key: 1, value: 10 },
// //                 { key: 2, value: 13 },
// //                 { key: 3, value: 19 },
// //                 { key: 4, value: 21 },
// //                 { key: 5, value: 25 },
// //                 { key: 6, value: 22 },
// //                 { key: 7, value: 18 },
// //                 { key: 8, value: 15 },
// //                 { key: 9, value: 13 },
// //                 { key: 10, value: 11 },
// //                 { key: 11, value: 12 },
// //                 { key: 12, value: 15 },
// //                 { key: 13, value: 20 },
// //                 { key: 14, value: 18 },
// //                 { key: 15, value: 17 },
// //                 { key: 16, value: 16 },
// //                 { key: 17, value: 18 },
// //                 { key: 18, value: 23 },
// //                 { key: 19, value: 25 } ];

// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 width: width,
// //                 height: height
// //             });

// // var key = function (d) {
// //     return d.key;
// // }

// // var xscale = d3.scale.ordinal()
// //                 .domain(d3.range(dataset.length))
// //                 .rangeRoundBands([0, width], 0.05);
// // var yscale = d3.scale.linear()
// //                 .domain([0, d3.max(dataset, function (d) {
// //                     return d.value;
// //                 })])
// //                 .range([0, height]);

// // var sortorder = true;
// // var sortBars = function () {
// //     sortorder = !sortorder;
// //     svg.selectAll('rect')
// //         .sort(function (a, b) {
// //             if (sortorder) {
// //                 return d3.ascending(a.value, b.value);
// //             } else {
// //                 return d3.descending(a.value, b.value);
// //             }
// //         })
// //         .transition()
// //         .duration(1000)
// //         .delay(function (d, i) {
// //             return 30 * i;
// //         })
// //         .attr({
// //             'x': function (d, i) {
// //                 return xscale(i);
// //             }
// //         });


//     // svg.selectAll('text')
//     //     .transition()
//     //     .duration(1000)
//     //     .delay(function (d, i) {
//     //         return 30 * i;
//     //     })
//     //     .attr({
//     //             'x': function (d, i) {
//     //                 return xscale(i) + 0.5 * xscale.rangeBand();
//     //             },
//     //             'y': function (d) {
//     //                 return height - yscale(d.value) + 15;
//     //             },
//     //             'text-anchor': 'middle',
//     //             'fill': 'white'
//     //         })
//     //         .text(function (d) {
//     //             return d.value;
//     //         });
    
// // }

// // svg.selectAll('rect')
// //     .data(dataset, key)
// //     .enter()
// //     .append('rect')
// //     .attr({
// //         'x': function (d, i) {
// //             return xscale(i);
// //         },
// //         'y': function (d, i) {
// //             return height - yscale(d.value);
// //         },
// //         'width': function (d, i) {
// //             return xscale.rangeBand();
// //         },
// //         'height': function (d, i) {
// //             return yscale(d.value);
// //         },
// //         'fill': function (d, i) {
// //             return 'rgb(0, ' + (d.value * 10) + ', 0)';
// //         }
// //     })
// //     .on('click', function () {
// //         sortBars();
// //     })
//     // .on('mouseover', function () {
//     //     d3.select(this)
//     //         .transition()
//     //         .duration(300)
//     //         .attr({
//     //         'fill': 'orange'
//     //     });
//     // })
//     // .on('mouseout', function () {
//     //     d3.select(this)
//     //         .transition()
//     //         .duration(300)
//     //         .attr({
//     //         'fill': function (d) {
//     //             return 'rgb(0, ' + (d.value * 10) + ', 0)';
//     //         }
//     //     });
//     // });

// // svg.selectAll('text')
// //     .data(dataset, key)
// //     .enter()
// //     .append('text')
// //     .attr({
// //         'x': function (d, i) {
// //             return xscale(i) + 0.5 * xscale.rangeBand();
// //         },
// //         'y': function (d) {
// //             return height - yscale(d.value) + 15;
// //         },
// //         'text-anchor': 'middle',
// //         'fill': 'white'
// //     })
// //     .text(function (d) {
// //         return d.value;
// //     });



// // d3.select('#sort')
// //     .on('click', sortBars);



// //-------------------tooltip--------------------
// // var width = 600,
// //     height = 300,
// //     padding = 2,
// //     // dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
// //     dataset = [ { key: 0, value: 5 },
// //                 { key: 1, value: 10 },
// //                 { key: 2, value: 13 },
// //                 { key: 3, value: 19 },
// //                 { key: 4, value: 21 },
// //                 { key: 5, value: 25 },
// //                 { key: 6, value: 22 },
// //                 { key: 7, value: 18 },
// //                 { key: 8, value: 15 },
// //                 { key: 9, value: 13 },
// //                 { key: 10, value: 11 },
// //                 { key: 11, value: 12 },
// //                 { key: 12, value: 15 },
// //                 { key: 13, value: 20 },
// //                 { key: 14, value: 18 },
// //                 { key: 15, value: 17 },
// //                 { key: 16, value: 16 },
// //                 { key: 17, value: 18 },
// //                 { key: 18, value: 23 },
// //                 { key: 19, value: 25 } ];

// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 width: width,
// //                 height: height
// //             });

// // var key = function (d) {
// //     return d.key;
// // }

// // var xscale = d3.scale.ordinal()
// //                 .domain(d3.range(dataset.length))
// //                 .rangeRoundBands([0, width], 0.05);
// // var yscale = d3.scale.linear()
// //                 .domain([0, d3.max(dataset, function (d) {
// //                     return d.value;
// //                 })])
// //                 .range([0, height]);

// // var sortorder = true;
// // // var getTitle = function () {
// // //     svg.selectAll('rect')
// // //         // .transition()
// // //         // .duration(300)
// // //         .attr({
// // //             'title': function (d, i) {
// // //                 return d.value;
// // //             }
// // //         });

// // // }

// // svg.selectAll('rect')
// //     .data(dataset, key)
// //     .enter()
// //     .append('rect')
// //     .attr({
// //         'x': function (d, i) {
// //             return xscale(i);
// //         },
// //         'y': function (d, i) {
// //             return height - yscale(d.value);
// //         },
// //         'width': function (d, i) {
// //             return xscale.rangeBand();
// //         },
// //         'height': function (d, i) {
// //             return yscale(d.value);
// //         },
// //         'fill': function (d, i) {
// //             return 'rgb(0, ' + (d.value * 10) + ', 0)';
// //         }
// //     })
// //     // .append('title')
// //     // .text(function (d) {
// //     //     return "this value is " + d.value;
// //     // });

// //     // .on('mouseover', function (d, i) {
// //     //     svg.append('text')
// //     //         .attr({
// //     //             'id': 'tooltip',
// //     //             'x': xscale(i) + 0.5 * xscale.rangeBand(),
// //     //             'y': height - yscale(d.value) + 15,
// //     //             'text-anchor': 'middle'
// //     //         })
// //     //         .text(d.value);
// //     // })
// //     // .on('mouseout', function (d, i) {
// //     //     d3.select('#tooltip').remove();
// //     // })

// //     .on('mouseover', function (d, i) {
// //         var xPosition = parseFloat(d3.select(this).attr("x")) + xscale.rangeBand() / 2;
// //         var yPosition = height - d3.select(this).attr("height") / 2;
    
// //         d3.select('#tooltip')
// //             .style({
// //                 'left': xPosition + 'px',
// //                 'top': yPosition + 'px'
// //             })
// //             .select('#value')
// //             .text(d.value);

// //         d3.select('#tooltip')
// //             .classed('hidden', false);
                
// //         // svg.append('text')
// //         //     .attr({
// //         //         'id': 'tooltip',
// //         //         'x': xscale(i) + 0.5 * xscale.rangeBand(),
// //         //         'y': height - yscale(d.value) + 15,
// //         //         'text-anchor': 'middle'
// //         //     })
// //         //     .text(d.value);
// //     })
// //     .on('mouseout', function (d, i) {
// //         d3.select('#tooltip')
// //             .classed('hidden', true)
// //     })



// //-------------------layout-pie--------------------
// // var width = 400,
// //     height = 400,
// //     outr = height / 2,
// //     inr = width / 3,
// //     // dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
// //     dataset = [ 5, 10, 20, 45, 6, 25 ];
// //     // dataset = [ { key: 0, value: 5 },
// //     //             { key: 1, value: 10 },
// //     //             { key: 2, value: 13 },
// //     //             { key: 3, value: 19 },
// //     //             { key: 4, value: 21 },
// //     //             { key: 5, value: 25 },
// //     //             { key: 6, value: 22 },
// //     //             { key: 7, value: 18 },
// //     //             { key: 8, value: 15 },
// //     //             { key: 9, value: 13 },
// //     //             { key: 10, value: 11 },
// //     //             { key: 11, value: 12 },
// //     //             { key: 12, value: 15 },
// //     //             { key: 13, value: 20 },
// //     //             { key: 14, value: 18 },
// //     //             { key: 15, value: 17 },
// //     //             { key: 16, value: 16 },
// //     //             { key: 17, value: 18 },
// //     //             { key: 18, value: 23 },
// //     //             { key: 19, value: 25 } ];

// // var colors = d3.scale.category10();
// // var arc = d3.svg.arc()
// //                 .innerRadius(inr)
// //                 .outerRadius(outr);
// // var pie = d3.layout.pie();

// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 width: width,
// //                 height: height
// //             });

// // var arcs = svg.selectAll('g.arc')
// //             .data(pie(dataset))
// //             .enter()
// //             .append('g')
// //             .classed('arc', true)
// //             .attr({
// //                 'transform': 'translate(' + outr + ', ' + outr + ')'
// //             });

// // arcs.append('path')
// //     .attr({
// //         'fill': function (d, i) {
// //             return colors(i);
// //         },
// //         'd': arc
// //     });

// // arcs.append('text')
// //     .attr({
// //         'transform': function (d) {
// //             return 'translate(' + arc.centroid(d) + ')';
// //         },
// //         'text-anchor': 'middle',
// //         'fill': 'white'
// //     })
// //     .style({
// //         'font-size': '14px',
// //         'font-weight': 900
// //     })
// //     .text(function (d, i) {
// //         return d.value;
// //     });






// //-------------------layout-stack--------------------
// // var width = 500,
// //     height = 300,
// //     dataset = [
// //         [
// //                 { x: 0, y: 5 },
// //                 { x: 1, y: 4 },
// //                 { x: 2, y: 2 },
// //                 { x: 3, y: 7 },
// //                 { x: 4, y: 23 }
// //         ],
// //         [
// //                 { x: 0, y: 10 },
// //                 { x: 1, y: 12 },
// //                 { x: 2, y: 19 },
// //                 { x: 3, y: 23 },
// //                 { x: 4, y: 17 }
// //         ],
// //         [
// //                 { x: 0, y: 22 },
// //                 { x: 1, y: 28 },
// //                 { x: 2, y: 32 },
// //                 { x: 3, y: 35 },
// //                 { x: 4, y: 43 }
// //         ]
// // ];

// // var svg = d3.select('body')
// //             .append('svg')
// //             .attr({
// //                 'width': width,
// //                 'height': height
// //    




// //-------------------layout-force--------------------
// var width = 500,
//     height = 300,
//     dataset = {
//         nodes: [
//                 { name: "Adam" },
//                 { name: "Bob" },
//                 { name: "Carrie" },
//                 { name: "Donovan" },
//                 { name: "Edward" },
//                 { name: "Felicity" },
//                 { name: "George" },
//                 { name: "Hannah" },
//                 { name: "Iris" },
//                 { name: "Jerry" }
//         ],
//         edges: [
//                 { source: 0, target: 1 },
//                 { source: 0, target: 2 },
//                 { source: 0, target: 3 },
//                 { source: 0, target: 4 },
//                 { source: 1, target: 5 },
//                 { source: 2, target: 5 },
//                 { source: 2, target: 5 },
//                 { source: 3, target: 4 },
//                 { source: 5, target: 8 },
//                 { source: 5, target: 9 },
//                 { source: 6, target: 7 },
//                 { source: 7, target: 8 },
//                 { source: 8, target: 9 }
//         ]
// };

// var svg = d3.select('body')
//             .append('svg')
//             .attr({
//                 'width': width,
//                 'height': height
//             });
// var colors = d3.scale.category10();

// var force = d3.layout.force()
//                     .nodes(dataset.nodes)
//                     .links(dataset.edges)
//                     .size([width, height])
//                     .linkDistance([50])
//                     .charge([-100])
//                     .start();

// var edges = svg.selectAll('line')
//                 .data(dataset.edges)
//                 .enter()
//                 .append('line')
//                 .style({
//                     'stroke': '#ccc',
//                     'stroke-width': 1
//                 });

// var nodes = svg.selectAll('circle')
//                 .data(dataset.nodes)
//                 .enter()
//                 .append('circle')
//                 .attr({
//                     'r': 10
//                 })
//                 .style({
//                     'fill': function (d, i) {
//                         return colors(i);
//                     }
//                 })
//                 .call(force.drag);

// force.on("tick", function() {

// edges.attr("x1", function(d) { return d.source.x; })
//      .attr("y1", function(d) { return d.source.y; })
//      .attr("x2", function(d) { return d.target.x; })
//      .attr("y2", function(d) { return d.target.y; });

// nodes.attr("cx", function(d) { return d.x; })
//      .attr("cy", function(d) { return d.y; });

// });



var colors = d3.scale.category20();
var str = [];
for(var i = 0; i < 20; i++) {
    str.push(colors(i));
}
console.log(str);








