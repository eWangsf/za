var listdata = [
        {
            key: "Helloooo", 
            weight: 900
        },
        {
            key: "Java", 
            weight: 800
        },
        {
            key: "intersection", 
            weight: 800
        },
        {
            key: "expensive", 
            weight: 625
        },
        {
            key: "particular", 
            weight: 625
        },
        {
            key: "word", 
            weight: 625
        },
        {
            key: "shape", 
            weight: 625
        },
        {
            key: "bottleneck", 
            weight: 625
        },
        {
            key: "index", 
            weight: 400
        },
        {
            key: "box", 
            weight: 400
        },
        {
            key: "position", 
            weight: 400
        },
        {
            key: "structure", 
            weight: 225
        },
        {
            key: "create", 
            weight: 225
        },
        {
            key: "recently", 
            weight: 100
        },
        {
            key: "C++", 
            weight: 49
        }
    ];

var option = {
    backgroundColor: '#000',
    align: 'left',
    baseline: 'top',
    fontFamily: '微软雅黑',
    minRotation: 1.58,
    maxRotation: 1.58,
    rotateRatio: 0.3,

    weightFactor: function (size) {
        // return size / 2;
        return Math.sqrt(size);
    }
}


// var colors = d3.scale.category20();

// var width = 1200,
//     height = 800;

// var svg = d3.select("body")
//         .append("svg")
//         .attr({
//             'width': width,
//             'height': height
//         });

// var cloud = d3.layout.cloud()
//                 .size([width, height])
//                 .words(listdata)
//                 .padding(2)
//                 .rotate(function () {
//                     return (Math.random() - 0.5) * 180;
//                 })
//                 .font(option.fontFamily)
//                 .fontSize(function (d) {
//                     return option.weightFactor(d.weight);
//                 })
//                 .on('end', draw);

// cloud.start();

// function draw(listdata) {
//     svg.append('g')
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
//         .selectAll('text')
//         .data(listdata)
//         .enter()
//         .append('text')
//         .attr({
//             'text-anchor': 'middle',
//             'transform': function (d) {
//                 return 'translate(' + [d.x, d.y] + ') rotate(' + d.rotate + ')';
//             }
//         })
//         .style({
//             'font-size': function (d) {
//                 return d.weight + 'px';
//             },
//             'fill': function (d, i) {
//                 return colors(i);
//             }
//         })
//         .text(function (d) {
//             return d.key;
//         });

// }


var colors = d3.scale.category20(),
    width = 1000,
    height = 400;

var layout = d3.layout.cloud()
    .size([width, height])
    // .words([
    //   "Hello", "world", "normally", "you", "want", "more", "words",
    //   "than", "this"].map(function(d) {
    //   return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    // }))
.words(listdata)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return option.weightFactor(d.weight); })
    .on("end", draw);

layout.start();

function draw(listdata) {
    d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .selectAll("text")
      .data(listdata)
    .enter().append("text")
      .style("font-size", function(d) { return option.weightFactor(d.weight) + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return colors(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.key; });
}