var svg,
    g,
    width,
    height,
    interval = 80;

var colla;

var r = 4.5,
    count = 1,
    tmpinterval = 0;

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    g = svg.getElementsByTagName('g')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    colla = new collaTree(data, g);
    colla.collapse(this.data);
    colla.start();
}

function collaTree(data, g) {
    this.data = data;
    this.container = g;
    this.nodedoms = {};
}

collaTree.prototype.start = function () {
    this.container.innerHTML = '';
    var root = this.data;
    this.data.x0 = height / 2;
    this.data.y0 = 0;
    this.data.y = this.data.y0;
    this.data.x = this.data.x0;
    this.data.depth = 0;
    this.data.id = 1;
    this.data.num = 0;

    this.container.innerHTML = '<g class="node" transform="translate(' + this.data.y + ', ' + this.data.x + ')">'
            + '<animateTransform attributeName="transform" begin="0;circle.click" dur="0.5s" type="translate" from="' + this.data.y0 + ', ' + this.data.x0 + '" to="' + this.data.y + ', ' + this.data.x + '" repeatCount="1"></animateTransform>'
            + '<circle class="circle" id="circle" r="4.5" style="fill: ' + (this.data.children || this.data._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + this.data.name + '</text>'
            + '</g>';
    this.nodedoms['flare'] = this.container.getElementsByTagName('g')[0];
    var test = this.nodedoms['flare'];
    console.log(this.nodedoms);
    this.addEvent();
};

collaTree.prototype.collapse = function (o) {
    if (o.children) {
      o._children = o.children;
      for(var i = 0; i < o._children.length; i++) {
        this.collapse(o._children[i]);
      }
      o.children = null;
    }
}

collaTree.prototype.getNum = function (source) {
    if((!source.children)) {
        source.num = 1;
        return 1;
    }

    var children = source.children;
    source.num = 0;
    for(var i = 0; i < children.length; i++) {
        source.num += this.getNum(children[i]);
    }
    return source.num;
}

collaTree.prototype.update = function (source) {
    this.getNum(this.data);
    tmpinterval = height / (this.data.num);
    if(!source.children) {
        return;
    }
    var children = source.children;
    var thisobj;

    for(var i = 0, j = - (source.num) / 2; i < children.length; i++) {
        thisobj = children[i];
        thisobj.x0 = thisobj.x || source.x0;
        thisobj.y0 = thisobj.y || source.y0;
        j += thisobj.num / 2;
        thisobj.depth = source.depth + 1;
        thisobj.y = thisobj.depth * 180;
        if(!thisobj.id) {
            thisobj.id = ++count;
        }
        
        thisobj.x = source.x + j * tmpinterval;
        j += thisobj.num / 2;
        if(thisobj.children) {
            this.update(thisobj);
        }
    }
    
}

collaTree.prototype.render = function (source) {
    // console.log('render');
    // console.log(source);
    // nodes
    var nodesStr = '';
    var nodedoms = this.nodedoms;
    if(nodedoms[source.name]) {
        var thisnode = nodedoms[source.name];
        var animate = thisnode.getElementsByTagName('animateTransform')[0];
        animate.setAttribute('from', animate.getAttribute('to'));
        animate.setAttribute('to', source.y + ', ' + source.x);
        thisnode.setAttribute('transform', 'translate(' + source.y + ', ' + source.x + ')');
    } else {
        nodesStr += '<g class="node" transform="translate(' + source.y + ', ' + source.x + ')">'
            + '<animateTransform attributeName="transform" begin="0;circle.click" dur="0.5s" type="translate" from="' + source.y0 + ', ' + source.x0 + '" to="' + source.y + ', ' + source.x + '" repeatCount="1"></animateTransform>'
            + '<circle class="circle" id="circle" r="4.5" style="fill: ' + (source.children || source._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + source.name + '</text>'
            + '</g>';
    }
    source.x0 = source.x;
    source.y0 = source.y;

    if(!source.children) {
        this.container.innerHTML += nodesStr;
        var gnodes = this.container.getElementsByTagName('g');
        for(var i = 0; i < gnodes.length; i++) {
            var index = gnodes[i].getElementsByTagName('text')[0].innerHTML;
            if(!nodedoms[index]) {
                nodedoms[index] = gnodes[i];
            }
        }
        return ;
    }
    var children = source.children;

    var thisobj;
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        if(nodedoms[thisobj.name]) {
            var thisnode = nodedoms[thisobj.name];
            var animate = thisnode.getElementsByTagName('animateTransform')[0];
            animate.setAttribute('from', animate.getAttribute('to'));
            animate.setAttribute('to', thisobj.y + ', ' + thisobj.x);
            thisnode.setAttribute('transform', 'translate(' + thisobj.y + ', ' + thisobj.x + ')');
        } else {
            nodesStr += '<g class="node" transform="translate(' + thisobj.y + ', ' + thisobj.x + ')">'
                + '<animateTransform attributeName="transform" begin="0;circle.click" dur="0.5s" type="translate" from="' + thisobj.y0 + ', ' + thisobj.x0 + '" to="' + thisobj.y + ', ' + thisobj.x + '" repeatCount="1"></animateTransform>'
                + '<circle class="circle" id="circle" r="4.5" style="fill: ' + (thisobj.children || thisobj._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
                + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + thisobj.name + '</text>'
                + '</g>';
        }
        // thisobj.x0 = thisobj.x;
        // thisobj.y0 = thisobj.y;
        this.render(thisobj);
    }
    this.container.innerHTML += nodesStr;

    var gnodes = this.container.getElementsByTagName('g');
    for(var i = 0; i < gnodes.length; i++) {
        var index = gnodes[i].getElementsByTagName('text')[0].innerHTML;
        if(!nodedoms[index]) {
            nodedoms[index] = gnodes[i];
        }
    }

    this.addEvent();
}

collaTree.prototype.toggle = function (obj, name) {
    if(obj.name === name) {
        if(obj.children) {
            console.log(this.nodedoms);
            console.log('clear...');
            for(var i = 0; i < obj.children.length; i++) {
                this.clearNode(obj.children[i]);
            }
            obj.num = 1;
            obj._children = obj.children;
            obj.children = null;
            this.update(this.data);
        } else {
            console.log('render...');
            obj.num = obj._children.length;
            obj.children = obj._children;
            obj._children = null;
            this.update(this.data);
            this.render(obj);
        }
        return false;
    }
    if (!obj.children) {
        return ;
    }
    for(var i = 0; i < obj.children.length; i++) {
        this.toggle(obj.children[i], name);
    }
}

collaTree.prototype.clearNode = function (obj) {
    console.log(this.nodedoms);
    if(!obj.children) {
        var thisnode = this.nodedoms[obj.name];
        var par = thisnode.parentNode;
        console.log(par);
        
        return false;
    }
    for(var i = 0; i < obj.children.length; i++) {
        this.clearNode(obj.children[i]);
    }

    obj._children = obj.children;
    obj.children = null;
    obj.sum = 1;

}

collaTree.prototype.addEvent = function () {
    var nodes = this.container.getElementsByTagName('g');
    var obj = this;
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function () {
            var name = this.getElementsByTagName('text')[0].innerHTML;
            console.log(name);
            obj.toggle(obj.data, name);
        }
    }
}

