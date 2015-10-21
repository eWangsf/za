// d3.select("body").style("background-color", "black");

// d3.select("body").append("p").text("New paragraph!");
// d3.csv('csv.csv', function (data) {
//     console.log(data);
// });

d3.select('body').selectAll('div').data([1, 2, 3, 4, 5]).enter().append('div').text(function (d) {
    return d;
});


