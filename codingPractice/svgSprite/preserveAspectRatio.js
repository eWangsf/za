window.onload = function () {
    var svg = document.getElementById("svg");
    svg && [].slice.call(document.querySelectorAll("input[type=radio]")).forEach(function(radio) {
        radio.addEventListener("click", function() {
            var value = this.value;
            if (value == "") {
                svg.removeAttribute("preserveAspectRatio");
                return;
            }
            if (value != "none") {
                value = "xMinYMin " + value;
            }
            svg.setAttribute("preserveAspectRatio", value);            
        });
    });
}




