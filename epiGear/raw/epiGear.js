var svg,
    width,
    height;

var radius = 80,
    speed = 4,
    x = Math.sin(2 * Math.PI / 3),
    y = Math.cos(2 * Math.PI / 3);

var settings = {
    'sun': {
        num: 1,
        radius: radius,
        teeth: 16,
        rotate_r: -radius
    },
    'planet': {
        num: 3,
        radius: -radius * 2,
        teeth: 32,
        rotate_r: Infinity
    },
    'annulus': {
        num: 1,
        radius: -radius * 5,
        teeth: 80,
        annulus: true,
        rotate_r: radius * 5
    }
};

var start,
    offset = 0;

var epigear;
var timeEvent;


window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    svg.innerHTML = '<g transform="translate(' + (width / 2) + ', ' + (height / 2) + ')scale(0.55)" ></g>';
    var g1 = svg.getElementsByTagName('g')[0];
    g1.innerHTML = '<g transform="rotate(0)"></g>';
    var g2 = g1.getElementsByTagName('g')[0];
    g2.innerHTML = '<g transform="rotate(0)"></g>';
    var g3 = g2.getElementsByTagName('g')[0];

    start = Date.now();

    epigear = new epiGear(settings, g1, g2, g3, speed);
    epigear.start();
}

function epiGear(settings, g1, g2, g3, speed) {
    this.settings = settings;
    this.annulusg = g1;
    this.planetg = g2;
    this.sung = g3;
    this.speed = speed;
    this.now_r = Infinity;
}

epiGear.prototype.start = function () {
    this.renderCircles();
    this.addEvent();
    timeEvent = setInterval(this.rotate(), 20);
}

epiGear.prototype.renderCircles = function () {
    var settings = this.settings;

    var pathstr = '';
    for(var key in settings) {
        if(key === 'planet') {
            pathstr += '<g ' + ('transform="translate(0, ' + (-radius * 3) + ')"') + ' class="' + key + '"><path d="' + this.gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
            pathstr += '<g ' + ('transform="translate(' + (-radius * 3 * x) + ', ' + (-radius * 3 * y) + ')"') + ' class="' + key + '"><path d="' + this.gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
            pathstr += '<g ' + ('transform="translate(' + (radius * 3 * x) + ', ' + (-radius * 3 * y) + ')"') + ' class="' + key + '"><path d="' + this.gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
        } else {
             pathstr += '<g class="' + key + '"><path d="' + this.gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
        }
    }
    this.sung.innerHTML += pathstr;
}

epiGear.prototype.gear = function (d) {
    var n = d.teeth,
        r2 = Math.abs(d.radius),
        r0 = r2 - 8,
        r1 = r2 + 8,
        r3 = d.annulus ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
        a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
        da = Math.PI / n,
        i = -1,
        path = ['M', r0 * Math.cos(a0), ',', r0 * Math.sin(a0)];

    while (++i < n) { 
    // 齿根-径向-斜1/3-1/3大弧-斜1/3-径向
        path.push( 
            'A', r0, ',', r0, ' 0,0,1 ', r0 * Math.cos(a0 += da), ',', r0 * Math.sin(a0),
            'L', r2 * Math.cos(a0), ',', r2 * Math.sin(a0),
            'L', r1 * Math.cos(a0 += da / 3), ',', r1 * Math.sin(a0),
            'A', r1, ',', r1, ' 0,0,1 ', r1 * Math.cos(a0 += da / 3), ',', r1 * Math.sin(a0),
            'L', r2 * Math.cos(a0 += da / 3), ',', r2 * Math.sin(a0),
            'L', r0 * Math.cos(a0), ',', r0 * Math.sin(a0)
        ); 
    }
    // 轴
    path.push('M0,', -r3, 'A', r3, ',', r3, ' 0,1,1,-0.1,', -r3);
    return path.join('');
}

epiGear.prototype.addEvent = function () {
    var radios = document.getElementsByTagName('input');
    var obj = this;
    var sung = this.sung,
        planetg = this.planetg,
        annulusg = this.annulusg,
        speed = this.speed,
        settings = this.settings;

    radios[0].onchange = function () {
        var r0 = obj.now_r,
            r1 = settings['annulus']['rotate_r'],
            angle = (Date.now() - start) * speed;
        planetg.setAttribute('transform', 'rotate(' + (offset += angle / r0 - angle / r1) + ')');
        obj.now_r = r1;
        timeEvent = setTimeout(obj.rotate(), 20);
    }
    radios[1].onchange = function () {
        var r0 = obj.now_r,
            r1 = settings['planet']['rotate_r'],
            angle = (Date.now() - start) * speed;
        planetg.setAttribute('transform', 'rotate(' + (offset += angle / r0 - angle / r1) + ')');
        obj.now_r = r1;
        timeEvent = setInterval(obj.rotate(), 20);
    }
    radios[2].onchange = function () {
        var r0 = obj.now_r,
            r1 = settings['sun']['rotate_r'],
            angle = (Date.now() - start) * speed;
        planetg.setAttribute('transform', 'rotate(' + (offset += angle / r0 - angle / r1) + ')');
        obj.now_r = r1;
        timeEvent = setInterval(obj.rotate(), 20);
    }
}

epiGear.prototype.rotate = function () {
    var sung = this.sung,
        settings = this.settings,
        speed = this.speed;
    var obj = this;

    var angle = (Date.now() - start) * speed;
    var paths = sung.getElementsByTagName('g');
    var thisobj;
    for (var i = 0; i < paths.length; i++) {
        thisobj = paths[i];

        var key = thisobj.getAttribute('class'),
            transform = 'rotate(' + (angle / (settings[key]['radius'])) + ')';
        thisobj.getElementsByTagName('path')[0].setAttribute('transform', transform);
        transform = 'rotate(' + (angle / obj.now_r) + ')';
        sung.setAttribute('transform', transform);
    }

    // clearTimeout(timeEvent);
    timeEvent = setTimeout(function () {
        obj.rotate();
    }, 20);
}



