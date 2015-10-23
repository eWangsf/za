// d3.select("body").style("background-color", "black");

// d3.select("body").append("p").text("New paragraph!");
// d3.csv('csv.csv', function (data) {
//     console.log(data);
// });


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







var width = 500,
    height = 300,
    dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);






