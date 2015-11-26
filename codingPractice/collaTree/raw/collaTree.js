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
    colla.addEvent();
}

function collaTree(data, g) {
    this.data = data;
    this.container = g;
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
    if(!root.children) {
        this.data.children = this.data._children;
        this.data._children = null;
    }
    this.update(this.data);
    this.render(this.data);
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
    console.log(this.data);
    tmpinterval = height / (this.data.num);
    var children = source.children;
    var thisobj;

    for(var i = 0, j = - (source.num) / 2; i < children.length; i++) {
        thisobj = children[i];
        j += thisobj.num / 2;
        thisobj.depth = source.depth + 1;
        thisobj.y = thisobj.depth * 180;
        if(!thisobj.id) {
            thisobj.id = ++count;
        }
        thisobj.x0 = source.x0;
        thisobj.y0 = source.y0;
        if(!thisobj.parents) {
            thisobj.parents = [];
        }
        thisobj.parents.push(source);
        thisobj.x = source.x + j * tmpinterval;
        j += thisobj.num / 2;
        if(thisobj.children) {
            this.update(thisobj);
        }
    }
    
}

collaTree.prototype.render = function (source) {
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
            + '<circle r="4.5" style="fill: ' + (source.children || source._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + source.name + '</text>'
            + '</g>';
    var thisobj;
    for(var i = children.length - 1; i >= 0; i--) {
        thisobj = children[i];
        nodesStr += '<g class="node" transform="translate(' + thisobj.y + ', ' + thisobj.x + ')">'
            + '<circle r="4.5" style="fill: ' + (thisobj.children || thisobj._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + thisobj.name + '</text>'
            + '</g>';
    }
    this.container.innerHTML += nodesStr;

    for(var i = 0; i < source.children.length; i++) {
        this.render(source.children[i]);
    }

    this.addEvent();
}

collaTree.prototype.toggle = function (obj, name) {
    if(obj.name === name) {
        if(obj.children) {
            for(var i = 0; i < obj.children.length; i++) {
                this.clearNode(obj.children[i]);
            }
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

collaTree.prototype.clearNode = function (obj) {
    if(!obj.children) {
        return;
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
            obj.toggle(obj.data, name);
            obj.start();
        }
    }
}

