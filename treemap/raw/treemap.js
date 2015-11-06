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

    treemap = new treeMap(data, parent, width, height);
    treemap.start();
    // console.log(treemap.data);
}

function treeMap(d, div, width, height) {
    this.data = d;
    this.totalSize = 0;

    this.dom = div;
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
        width = json.dx,
        height = json.dy;

    console.log(json);
    console.log(width);
    console.log(height);
    var small = width < height ? width : height;
    

    
    for (var i = 0; i < children.length - 1; i++) {
        var total = 0,
            anotherside = 0,
            side = 0,
            oldratio = 1,
            newratio = 0;

        if(i === 0) {
            total += children[0].sum;
            anotherside = total / small;
            side = children[0].sum / anotherside;
            oldratio = anotherside > side ? (anotherside / side) : (side / anotherside);
            children[0].x = 0;
            children[0].y = 0;
            children[0].dx = json.x + anotherside;
            children[0].dy = json.y + side;
        }
        //  newratio <= oldratio 一直靠着短边压缩
        var all = false;
        while((i < children.length - 1)) {
            total += children[i + 1].sum;
            anotherside = total / small;
            side = children[i + 1].sum / anotherside;
            newratio = anotherside > side ? (anotherside / side) : (side / anotherside);
            if (i === children.length - 2) {
                all = true;
                break;
            } else if (newratio > oldratio) {
                break;
            } 
        }

        // 全部矩形计算完成
        if(all) {

        } else {

        }




    }


    
}

treeMap.prototype.render = function () {
    this.data.x = 0;
    this.data.y = 0;
    this.data.dx = this.width;
    this.data.dy = this.height;

    this.data.children.sort(function (a, b) {
        return a.sum <= b.sum ? 1 : -1;
    });

    this.pos(this.data);

    return;
}

