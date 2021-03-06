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
var togglename;

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
    this.linkdoms = {};
}

collaTree.prototype.start = function () {
    this.data.x0 = height / 2;
    this.data.y0 = 0;
    this.data.y = this.data.y0;
    this.data.x = this.data.x0;
    this.data.depth = 0;
    this.data.id = 1;
    this.data.num = 0;

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
    obj = this;
    tick = setTimeout(function () {
        obj.tickFunc(obj.data);
        tick = setTimeout(arguments.callee, 40);
    }, 40);
    this.addEvent();
}
g
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
    var th = this;
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
        thisobj.x = source.x + j * tmpinterval;
        j += thisobj.num / 2;
        this.update(thisobj);
    }
}

collaTree.prototype.render = function (source) {
    if(!source.children) {
        return ;
    }
    var children = source.children;

    var thisobj;
    // links
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        var dy = thisobj.y0 - source.y;
        var dstr = 'M' + source.y + ' ' + source.x 
                + ' C' + (source.y + dy / 3) + ' ' + (source.x)
                + ' ' + (source.y + 2 * dy / 3) + ' ' + (thisobj.x) 
                + ' ' +  thisobj.y + ' ' + thisobj.x + '';
        var pathnode = document.createElementNS('http://www.w3.org/2000/svg','path');
        pathnode.setAttribute('class', 'link');
        pathnode.setAttribute('d', dstr);
        this.container.appendChild(pathnode);
        this.linkdoms[thisobj.name] = {
            'dom': pathnode,
            'a_end': source,
            'b_end': thisobj
        };
    }
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
        var th = this;
        var nodedoms = this.nodedoms;
        if(obj.children) {
            togglename = obj.name;
            for(var i = 0; i < obj.children.length; i++) {
                this.clearNode(obj.children[i], obj.x, obj.y);
            }
        } else {
            togglename = undefined;
            obj.num = obj._children.length;
            obj.children = obj._children;
            obj._children = null;
            this.update(this.data);
            this.render(obj);
        }
        this.addEvent();
        return ;
    }
    if (!obj.children) {
        return ;
    }
    for(var i = 0; i < obj.children.length; i++) {
        this.toggle(obj.children[i], name);
    }
}

collaTree.prototype.clearNode = function (obj, basex, basey) {
    obj.x = basex;
    obj.y = basey;
    obj.beDeleted = true;
    if(!obj.children) {
        return ;
    }
    var children = obj.children;
    for(var i = 0; i < children.length; i++) {
        this.clearNode(children[i], basex, basey);
    }
}

collaTree.prototype.tickFunc = function (source) {
    var nodedoms = this.nodedoms,
        linkdoms = this.linkdoms;
    var thisnode = nodedoms[source.name],
        thislink = linkdoms[source.name];
    if(thisnode) {
        thisnode.setAttribute('transform', 'translate(' + (source.y0 += (source.y - source.y0) / 2) + ', ' + (source.x0 += (source.x - source.x0) / 2) + ')');
    }
    if(thislink) {
       var linkdom = thislink.dom;
       var a_end = thislink.a_end;
       var b_end = thislink.b_end;
       var dy = b_end.y0 - a_end.y;
       var dstr = 'M' + a_end.y + ' ' + a_end.x 
                + ' C' + (a_end.y + dy / 3) + ' ' + (a_end.x)
                + ' ' + (a_end.y + 2 * dy / 3) + ' ' + (b_end.x0) 
                + ' ' +  b_end.y0 + ' ' + b_end.x0 + '';
        linkdom.setAttribute('d', dstr);
    }
    
    if(source.beDeleted && (Math.abs(source.y0 - source.y) < 5)) {
        if(!source.children) {
            thisnode.parentNode.removeChild(thisnode);
            thislink['dom'].parentNode.removeChild(thislink['dom']);
            delete nodedoms[source.name];
            delete linkdoms[source.name];
            source.beDeleted = source.x = source.x0 = source.y = source.y0 = source.num = source.id = source.depth = undefined;
        } else {
            var children = source.children,
                flag = true;
            for(var i = 0; i < children.length; i++) {
                if(nodedoms[children[i].name]) {
                    flag = false;
                }
            }
            if(flag) {
                source._children = source.children;
                source.children = null;
                source.num = 1;
            }
        }
    }
    if(!source.children) {
        return ;
    }
    var children = source.children,
        thisobj;
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        this.tickFunc(thisobj);
    }
    if(source.name === togglename) {
        var children = source.children,
            flag = true;
        for(var i = 0; i < children.length; i++) {
            if(nodedoms[children[i].name]) {
                flag = false;
            }
        }
        if(flag) {
            source._children = source.children;
            source.children = null;
            source.num = 1;
            this.update(this.data);
        }
    }  
}