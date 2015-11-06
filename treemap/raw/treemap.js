var style = {
        width: 960,
        height: 500,
        background: "#e5e5e5"
    },
    width = style.width,
    height = style.height;

var parent,
    nodes,
    treemap;


window.onload = function () {
    parent = document.getElementById('parent');
    var style = 'width: ' + width + 'px;height: ' + height + 'px;background: #e5e5e5; ';
    parent.setAttribute('style', style);

    treemap = new treeMap(data, width, height);
    treemap.start();
    // console.log(treemap.data);
}

function treeMap(d, width, height) {
    this.data = d;
    this.totalSize = 0;

    this.rect = {
        'x': 0,
        'y': 0,
        'dx': width,
        'dy': height
    };
    this.width = width;
    this.height = height;
    this.area = this.width * this.height;
}

treeMap.prototype.start = function() {
    this.totalSize += this.compute(this.data);
    this.resize(this.data);
    this.render();
}

treeMap.prototype.compute = function (o) {
    // console.log('treemap compute...');
    if(!o.children) {
        o.sum = o.size;
        return o.size;
    }

    var total = 0;
    for (var i = 0; i < o.children.length; i++) {
        total += this.compute(o.children[i]);
    }
    o.sum = total;
    return total;
}

treeMap.prototype.resize = function (o) {
    // console.log('treemap resize...');
    if (!o.children) {
        o.sum = o.sum / this.totalSize * this.area;
        return;
    }

    for (var i = 0; i < o.children.length; i++) {
        this.resize(o.children[i]);
    }
    o.sum = o.sum / this.totalSize * this.area;
    return;
}

treeMap.prototype.pos = function (obj, rect) {
    var json = obj,
        children = json.children,
        rect = rect,
        color = 'rgb(' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ')';

    
    var total = 0,
        anotherside = width,
        side = 0,
        oldratio = Number.MAX_VALUE,
        newratio = 0,


    
    for (var i = -1; i < children.length - 1; i++) {
        // update vars
        width = rect.dx,
        height = rect.dy,
        small = width < height ? width : height,

        // newratio < oldration 循环
        while((i < children.length - 1)) {
            total += children[i+1].sum;
            anotherside = total / small;
            side = children[i + 1].sum / anotherside;
            newratio = anotherside > side ? (anotherside / side) : (side / anotherside);
            // if (i === children.length - 2) {
            //     all = true;
            //     break;
            // } else if (newratio > oldratio) {
            //     break;
            // } 
            if (newratio < oldration) {
                i++;
            } else {
                break;
            }
        }
        var all = false;
        if (i >= children.length - 1) {
            all = true;
        }

        // compute new computed rects
        

        // compute new rect and continue


    }


    
}

treeMap.prototype.render = function () {
    this.data.x = this.rect.x;
    this.data.y = this.rect.y;
    this.data.dx = this.rect.dx;
    this.data.dy = this.rect.dy;


    this.data.children.sort(function (a, b) {
        return a.sum <= b.sum ? 1 : -1;
    });

    this.pos(this.data, this.rect);

    return;
}

