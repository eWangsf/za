var listdata = [
        {text: "Helloooo", w: 900},
        {text: "Java", w: 800},
        {text: "intersection", w: 800},
        {text: "expensive", w: 625},
        {text: "particular", w: 625},
        {text: "word", w: 625},
        {text: "shape", w: 625},
        {text: "bottleneck", w: 625},
        {text: "index", w: 529},
        {text: "box", w: 400},
        {text: "position", w: 400},
        {text: "structure", w: 289},
        {text: "create", w: 289},
        {text: "recently", w: 225},
        {text: "C++", w: 121}
    ];

// var listdata = [
//         {
//             text: "Helloooo", 
//             size: 900
//         },
//         {
//             text: "Java", 
//             size: 800
//         },
//         {
//             text: "intersection", 
//             size: 800
//         },
//         {
//             text: "expensive", 
//             size: 625
//         },
//         {
//             text: "particular", 
//             size: 625
//         },
//         {
//             text: "word", 
//             size: 625
//         },
//         {
//             text: "shape", 
//             size: 625
//         },
//         {
//             text: "bottleneck", 
//             size: 625
//         },
//         {
//             text: "index", 
//             size: 400
//         },
//         {
//             text: "box", 
//             size: 400
//         },
//         {
//             text: "position", 
//             size: 400
//         },
//         {
//             text: "structure", 
//             size: 225
//         },
//         {
//             text: "create", 
//             size: 225
//         },
//         {
//             text: "recently", 
//             size: 100
//         },
//         {
//             text: "C++", 
//             size: 49
//         }
//     ];

var option = {
    backgroundColor: '#000',
    align: 'left',
    baseline: 'top',
    fontFamily: 'Impact',
    minRotation: 1.58,
    maxRotation: 1.58,
    rotateRatio: 0.3,

    weightFactor: function (size) {
        // return size / 2;
        return Math.sqrt(size);
    }
}


var colors = d3.scale.category20();

var width = 1200,
    height = 800;

var svg = d3.select("body")
        .append("svg")
        .attr({
            'width': width,
            'height': height
        });

var cloud = d3.layout.cloud()
                .size([width, height])
                .words(listdata)
                .padding(2)
                .rotate(function () {
                    return Math.floor(Math.random() * 180 / 90) * 90;
                })
                .font(option.fontFamily)
                .fontSize(function (d) {
                    return option.weightFactor(d.w);
                })
                .on('end', draw);

cloud.start();

function draw(listdata) {
    svg.append('g')
        .attr("transform", "translate(" + cloud.size()[0] / 2 + "," + cloud.size()[1] / 2 + ")")
        .selectAll('text')
        .data(listdata)
        .enter()
        .append('text')
        .attr({
            'text-anchor': 'middle',
            'transform': function (d) {
                console.log(d);
                return 'translate(' + [d.x, d.y] + ') rotate(' + d.rotate + ')';
            }
        })
        .style({
            'font-size': function (d) {
                return d.size + 'px';
            },
            'font-family': option.fontFamily,
            'fill': function (d, i) {
                return colors(i);
            }
        })
        // .style('font-size', function (d) {
        //         return d.size + 'px';
        // })
        // .style('font-family', option.fontFamily)
        // .style('fill', function (d, i) {
        //         return colors(i);
        // })
        .text(function (d) {
            return d.text;
        });

}



// var fill = d3.scale.category20();

// var layout = d3.layout.cloud()
//     .size([500, 500])
//     .words(listdata)
//     .padding(5)
//     .rotate(function() { return ~~(Math.random() * 2) * 90; })
//     .font(option.fontFamily)
//     .fontSize(function(d) { return Math.sqrt(d.w); })
//     .on("end", draw);

// layout.start();

// function draw(words) {
//   d3.select("body").append("svg")
//       .attr("width", layout.size()[0])
//       .attr("height", layout.size()[1])
//     .append("g")
//       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//     .selectAll("text")
//       .data(words)
//     .enter().append("text")
//       .style("font-size", function(d) { return d.size + "px"; })
//       .style("font-family", option.fontFamily)
//       .style("fill", function(d, i) { return fill(i); })
//       .attr("text-anchor", "middle")
//       .attr("transform", function(d) {
//         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//       })
//       .text(function(d) { return d.text; });
// }