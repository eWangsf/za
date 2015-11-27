var svg,
    g,
    width = 1000,
    height = 540,
    interval = 80;

var colla;

var r = 4.5,
    count = 1,
    tmpinterval = 0;

var tick;

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('transform', 'translate(50, 0)');
    svg.appendChild(g);

    colla = new collaTree(data, g);
    colla.collapse(this.data);
    colla.start();
}

function collaTree(data, g) {
    this.data = data;
    this.container = g;
    this.nodedoms = {};
    this.dataindex = {};
}

collaTree.prototype.start = function () {
    this.data.x0 = height / 2;
    this.data.y0 = 0;
    this.data.y = this.data.y0;
    this.data.x = this.data.x0;
    this.data.depth = 0;
    this.data.id = 1;
    this.data.num = 0;
    // if(!this.data.children) {
    //     this.data.children = this.data._children;
    //     this.data._children = null;
    // }
    var gnode = document.createElementNS('http://www.w3.org/2000/svg','g');
    gnode.setAttribute('class', 'node');
    gnode.setAttribute('transform', 'translate(' + this.data.y0 + ', ' + this.data.x0 + ')');
    
    var circlenode = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circlenode.setAttribute('r', 4.5);
    circlenode.setAttribute('style', 'fill: ' + (this.data.children || this.data._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';');
    
    var textnode = document.createElementNS('http://www.w3.org/2000/svg','text');
    textnode.setAttribute('x', '-10');
    textnode.setAttribute('dy', '.35em');
    textnode.setAttribute('style', 'fill-opacity: 1;');
    textnode.innerHTML = this.data.name;

    gnode.appendChild(circlenode);
    gnode.appendChild(textnode);
    this.container.appendChild(gnode);
    this.nodedoms[this.data.name] = gnode;

    this.dataindex[this.data.name] = this.data;
    this.addEvent();
}

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
    this.getNum();
    tmpinterval = height / (this.data.num);
    if(!source.children) {
        return;
    }
    var children = source.children;
    var thisobj;

    for(var i = 0, j = - (source.num) / 2; i < children.length; i++) {
        thisobj = children[i];
        thisobj.x0 = thisobj.x || source.x;
        thisobj.y0 = thisobj.y || source.y;
        j += thisobj.num / 2;
        thisobj.depth = source.depth + 1;
        thisobj.y = thisobj.depth * 180;
        if(!thisobj.id) {
            thisobj.id = ++count;
        }
        if(!thisobj.parents) {
            thisobj.parents = [];
        }
        thisobj.parents.push(source);
        thisobj.x = source.x + j * tmpinterval;
        j += thisobj.num / 2;
        this.dataindex[thisobj.name] = thisobj;
        this.update(thisobj);
    }
}

collaTree.prototype.render = function (source) {
    if(!source.children) {
        return ;
    }
    var children = source.children;

    var thisobj;
    // nodes
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        var gnode = document.createElementNS('http://www.w3.org/2000/svg','g');
        gnode.setAttribute('class', 'node');
        gnode.setAttribute('transform', 'translate(' + thisobj.y0 + ', ' + thisobj.x0 + ')');
        
        var circlenode = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circlenode.setAttribute('r', 4.5);
        circlenode.setAttribute('style', 'fill: ' + (thisobj.children || thisobj._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';');
        
        var textnode = document.createElementNS('http://www.w3.org/2000/svg','text');
        textnode.setAttribute('x', '-10');
        textnode.setAttribute('dy', '.35em');
        textnode.setAttribute('style', 'fill-opacity: 1;');
        textnode.innerHTML = thisobj.name;

        gnode.appendChild(circlenode);
        gnode.appendChild(textnode);
        this.container.appendChild(gnode);
        this.nodedoms[thisobj.name] = gnode;
    }

    // links
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        var dy = thisobj.y - source.y;
        var dstr = 'M' + source.y + ' ' + source.x 
                + ' C' + (source.y + dy / 3) + ' ' + (source.x)
                + ' ' + (source.y + 2 * dy / 3) + ' ' + (thisobj.x) 
                + ' ' +  thisobj.y + ' ' + thisobj.x + '';
        var pathnode = document.createElementNS('http://www.w3.org/2000/svg','path');
        pathnode.setAttribute('class', 'link');
        pathnode.setAttribute('d', dstr);
        this.container.appendChild(pathnode);
    }
}

collaTree.prototype.addEvent = function () {
    var nodedoms = this.nodedoms;
    var obj = this;
    for(var key in nodedoms) {
        nodedoms[key].onclick = function () {
            var name = this.getElementsByTagName('text')[0].innerHTML;
            obj.toggle(obj.data, name);
        }
    }
}

collaTree.prototype.toggle = function (obj, name) {
    if(obj.name === name) {
        var nodedoms = this.nodedoms,
            dataindex = this.dataindex;
        if(obj.children) {
            for(var key in dataindex) {
                dataindex[key].y = dataindex[name].y;
                dataindex[key].x = dataindex[name].x;
            }
            tick = setInterval(function() {
                for(var key in nodedoms) {
                    if(dataindex[key].y0 != dataindex[key].y) {
                        nodedoms[key].setAttribute('transform', 'translate(' + (dataindex[key].y += (dataindex[name].y - dataindex[key].y) / 4) + ', ' + (dataindex[key].x += (dataindex[name].x - dataindex[key].x) / 4) + ')')
                        if(Math.abs(dataindex[key].y - dataindex[name].y) < .1) {
                            dataindex[key].y = dataindex[key].y0 = dataindex[name].y;
                            dataindex[key].x = dataindex[key].x0 = dataindex[name].x;
                            nodedoms[key].parentNode.removeChild(nodedoms[key]);
                            delete dataindex[key];
                            delete nodedoms[key];
                        }
                    }
                }
            }, 20);

            obj.num = 1;
            obj._children = obj.children;
            obj.children = null;
            this.update(this.data);
        } else {
            obj.num = obj._children.length;
            obj.children = obj._children;
            obj._children = null;
            this.update(this.data);
            this.render(obj);
            tick = setInterval(function() {
                for(var key in nodedoms) {
                    if(dataindex[key].y0 != dataindex[key].y) {
                        nodedoms[key].setAttribute('transform', 'translate(' + (dataindex[key].y0 += (dataindex[key].y - dataindex[key].y0) / 4) + ', ' + (dataindex[key].x0 += (dataindex[key].x - dataindex[key].x0) / 4) + ')')
                    }
                }
            }, 20);
        }
        this.addEvent();
        console.log(this.data);
        console.log(this.dataindex);
        console.log(this.nodedoms);
        return false;
    }
    if (!obj.children) {
        return ;
    }
    for(var i = 0; i < obj.children.length; i++) {
        this.toggle(obj.children[i], name);
    }
}



