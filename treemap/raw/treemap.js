var style = {
        width: 1000,
        height: 600,
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

    this.data.x = this.rect.x;
    this.data.y = this.rect.y;
    this.data.dx = this.rect.dx;
    this.data.dy = this.rect.dy;
    this.pos(this.data);
    // console.log(this.data);

    this.render(this.data);
}

treeMap.prototype.compute = function (o) {
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

treeMap.prototype.pos = function (obj) {
    if(!obj.children) {
        return;
    }

    // o.children -> o.color
    obj.color = 'rgb(' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ')';

    var children = obj.children,
        rect = {
            'x': obj.x,
            'y': obj.y,
            'dx': obj.dx,
            'dy': obj.dy
        };
    
    // sort array desc
    children.sort(function (a, b) {
        return a.sum <= b.sum ? 1 : -1;
    });

    for (var i = -1; i < children.length - 1;) {
        var small = rect.dx < rect.dy ? rect.dx : rect.dy,
            total = 0,
            anotherside = 0,
            side = 0,
            oldratio = Number.MAX_VALUE,
            newratio = 0;

        // newratio < oldratio 循环
        // k record last threshhold
        var k = i + 1;
        while((i < children.length - 1)) {
            total += children[i + 1].sum;
            anotherside = total / small;
            side = children[i + 1].sum / anotherside;
            newratio = anotherside > side ? (anotherside / side) : (side / anotherside);

            if (newratio < oldratio) {
                oldratio = newratio;
                i++;
            } else {
                total -= children[i + 1].sum;
                anotherside = total / small;
                break;
            }
        }

        // render new computed rects and update rect para
        if(small === rect.dy) {
            var tempy = rect.y;
            for(var j = i; j >= k; j--) {
                // console.log(k + '~' + i);
                obj.children[j].x = rect.x;
                obj.children[j].y = tempy;
                obj.children[j].dx = anotherside;
                obj.children[j].dy = (children[j].sum / anotherside);
                // var divstr = '<div class="node" style="width: ' + anotherside + 'px; height: ' + (children[j].sum / anotherside) + 'px; left: ' + rect.x + 'px; top: ' + tempy + 'px; background: ' + color + ';"></div>';
                // parent.innerHTML += divstr;
                tempy += (children[j].sum / anotherside);
            }
            rect.x += anotherside;
            rect.dx -= anotherside;
        } else {
            var tempx = rect.x;
            for(var j = k; j <= i; j++) {
                // console.log(k + '~' + i);
                obj.children[j].x = tempx;
                obj.children[j].y = rect.y;
                obj.children[j].dx = (children[j].sum / anotherside);
                obj.children[j].dy = anotherside;
                // var divstr = '<div class="node" style="width: ' + (children[j].sum / anotherside) + 'px; height: ' + anotherside + 'px; left: ' + tempx + 'px; top: ' + rect.y + 'px; background: ' + color + ';"></div>';
                // parent.innerHTML += divstr;
                tempx += (children[j].sum / anotherside);
            }
            rect.y += anotherside;
            rect.dy -= anotherside;
        }
    }

    for(var i = 0; i < children.length; i++) {
        this.pos(obj.children[i]);
    }

}

treeMap.prototype.render = function (o) {
    if(!o.children) {
        return;
    }
    for(var i = 0; i < o.children.length; i++) {
        var txt = '';
        if(!o.children[i].children) {
            txt = o.children[i].name;
        }
        var divstr = '<div class="node" style="width: ' + o.children[i].dx + 'px; height: ' + o.children[i].dy + 'px; left: ' + o.children[i].x + 'px; top: ' + o.children[i].y + 'px; background: ' + o.color + ';">' + txt + '</div>';
        parent.innerHTML += divstr;
    }

    for (var i = 0; i < o.children.length; i++) {
        this.render(o.children[i]);
    }

    return;
}

