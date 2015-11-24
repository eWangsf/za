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
    colla.collapse();
    colla.start();
    colla.addEvent();
}

function collaTree(data, g) {
    this.data = data;
    this.container = g;
}

collaTree.prototype.start = function () {
    this.data.x0 = height / 2;
    this.data.y0 = 0;
    this.data.x = this.data.x0;
    this.data.y = this.data.y0;
    this.data.depth = 0;
    this.data.id = 1;
    this.data.num = 0;

    this.toggle(this.data, 'flare');
    this.getNum();
    this.update();
    this.render();
};

collaTree.prototype.collapse = function (o) {
    o = o || this.data;
    if (o.children) {
      o._children = o.children;
      for(var i = 0; i < o._children.length; i++) {
        this.collapse(o._children[i]);
      }
      o.children = null;
    }
}

collaTree.prototype.getNum = function (source) {
    source = source || this.data;
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
    source = source || this.data;
    tmpinterval = height / (this.data.num);

    // update source's children
    var children = source.children;
    var thisobj;
    for(var i = 0, j = - (source.num) / 2; i < children.length; i++) {
        thisobj = children[i];
        thisobj.depth = source.depth + 1;
        thisobj.x0 = source.x;
        thisobj.y0 = source.y;

        thisobj.y = thisobj.depth * 180;
        if(!thisobj.id) {
            thisobj.id = ++count;
        }
        if(!thisobj.parents) {
            thisobj.parents = [];
        }
        thisobj.parents.push(source);

        j += thisobj.num / 2;
        thisobj.x = source.x + j * tmpinterval;
        j += thisobj.num / 2;

        if(thisobj.children) {
            this.update(thisobj);
        }
    }
    
}


collaTree.prototype.render = function (source) {
    if(!source) {
        source = source || this.data;
        this.container.innerHTML = '';
    }
    if(!source.children) {
        return ;
    }
    var children = source.children;
    
    // links
    var linksStr = '';
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        var dy = thisobj.y - source.y;
        linksStr += '<path class="link" d="M' + source.y + ' ' + source.x 
                + ' C' + (source.y + dy / 3) + ' ' + (source.x)
                + ' ' + (source.y + 2 * dy / 3) + ' ' + (thisobj.x) 
                + ' ' +  thisobj.y + ' ' + thisobj.x + ' " />';
    }
    this.container.innerHTML += linksStr;

    // nodes
    var nodesStr = '';
    nodesStr += '<g class="node" transform="translate(' + source.y + ', ' + source.x + ')">'
            + '<animateTransform attributeName="transform" begin="0s" dur="0.5s"  type="translate" from="' + source.y0 + ', ' + source.x0 + '" to="' + source.y + ', ' + source.x + '" repeatCount="1"/>'
            + '<circle r="4.5" style="fill: ' + (source.children || source._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';">'
            + '</circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' 
            + source.name 
            + '</text>'
            + '</g>';

    var thisobj;
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        nodesStr += '<g class="node" transform="translate(' + thisobj.y + ', ' + thisobj.x + ')">'
            + '<animateTransform attributeName="transform" begin="0s" dur="0.5s"  type="translate" from="' + thisobj.y0 + ', ' + thisobj.x0 + '" to="' + thisobj.y + ', ' + thisobj.x + '" repeatCount="1"/>'
            + '<circle r="4.5" style="fill: ' + (thisobj.children || thisobj._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';">'
            + '</circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' 
            + thisobj.name 
            + '</text>'
            + '</g>';
        thisobj.x0 = thisobj.x;
        thisobj.y0 = thisobj.y;
        this.render(thisobj);
    }
    this.container.innerHTML += nodesStr;
    this.addEvent();
}

collaTree.prototype.toggle = function (obj, name) {
    if(obj.name === name) {
        if(obj.children) {
            obj.num = 1;
            obj._children = obj.children;
            obj.children = null;
        } else {
            obj.num = obj._children.length;
            obj.children = obj._children;
            obj._children = null;
        }
        return ;
    }
    if (!obj.children) {
        return ;
    }
    for(var i = 0; i < obj.children.length; i++) {
        this.toggle(obj.children[i], name);
    }
}

collaTree.prototype.addEvent = function () {
    var nodes = this.container.getElementsByTagName('g');
    var obj = this;
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function () {
            var name = this.getElementsByTagName('text')[0].innerHTML;
            obj.toggle(obj.data, name);
            obj.getNum();
            obj.update();
            obj.render();        
        }
    }
}

