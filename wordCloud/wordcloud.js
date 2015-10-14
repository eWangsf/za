window.onload = function () {
    var container = document.getElementById('container');
    container.innerHTML = 'ready<br/>';
    for (var keyword in data) {
        container.innerHTML = container.innerHTML + data[keyword] + "<br/>";
    }

}


var data = {
    "Hello": 300,
    "intersection": 230,
    "particular": 220,
    "word": 100,
    "shape": 100,
    "bottleneck": 50,
    "index": 30,
    "box": 25,
    "position": 23,
    "structure": 15
}