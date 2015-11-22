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
        teeth: 16
    },
    'planet': {
        num: 3,
        radius: -radius * 2,
        teeth: 32
    },
    'annulus': {
        num: 1,
        radius: -radius * 5,
        teeth: 80,
        annulus: true
    }
};

var epigear;


window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    svg.innerHTML = '<g transform="translate(' + (width / 2) + ', ' + (height / 2) + ')scale(0.55)" ></g>';
    var g = svg.getElementsByTagName('g')[0];
    g.innerHTML = '<g></g>';
    g = g.getElementsByTagName('g')[0];
    g.innerHTML = '<g transform="rotate(0)"></g>';
    var g1 = g.getElementsByTagName('g')[0];


    epigear = new epiGear(settings, g1, speed);
    epigear.start();

}

function epiGear(settings, container, speed) {
    this.settings = settings;
    this.container = container;
    this.speed = speed;
}

epiGear.prototype.start = function () {
    this.renderCircles();
}

epiGear.prototype.renderCircles = function () {
    var settings = this.settings;

    var pathstr = '';
    for(var key in settings) {
        if(key === 'planet') {
            pathstr += '<g ' + ('transform="translate(0, ' + (-radius * 3) + ')"') + ' class="' + key + '"><path d="' + gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
            pathstr += '<g ' + ('transform="translate(' + (-radius * 3 * x) + ', ' + (-radius * 3 * y) + ')"') + ' class="' + key + '"><path d="' + gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
            pathstr += '<g ' + ('transform="translate(' + (radius * 3 * x) + ', ' + (-radius * 3 * y) + ')"') + ' class="' + key + '"><path d="' + gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
        } else {
             pathstr += '<g class="' + key + '"><path d="' + gear(settings[key]) + 'Z" transform="rotate(0)"></path></g>';
        }
    }
    this.container.innerHTML += pathstr;
}

function gear(d) {
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


