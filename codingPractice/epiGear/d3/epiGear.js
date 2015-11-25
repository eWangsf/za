
var width = 960,
    height = 500,
    radius = 80,
    x = Math.sin(2 * Math.PI / 3),
    y = Math.cos(2 * Math.PI / 3);

var offset = 0,
    speed = 4,
    start = Date.now();


var svg = d3.select('body').append('svg')
    .attr({
        'width': width,
        'height': height
    })
    .append('g')
    .attr({
        'transform': 'translate(' + width / 2 + ', ' + height / 2 + ')scale(.55)'
    })
    .append('g');

var frame = svg.append('g')
    .datum({radius: Infinity});

frame.append('g')
    .attr({
        'class': 'annulus'
    })
    .datum({
        teeth: 80, 
        radius: -radius * 5, 
        annulus: true
    })
    .append('path')
    .attr({
        'd': gear
    });

frame.append('g')
    .attr({
        'class': 'sun'
    })
    .datum({
        teeth: 16, 
        radius: radius
    })
    .append('path')
    .attr({
        'd': gear
    });

frame.append('g')
    .attr({
        'class': 'planet',
        'transform': 'translate(0,-' + radius * 3 + ')'
    })
    .datum({
        teeth: 32, 
        radius: -radius * 2
    })
    .append('path')
    .attr({
        'd': gear
    });

frame.append('g')
    .attr({
        'class': 'planet',
        'transform': 'translate(' + -radius * 3 * x + ',' + -radius * 3 * y + ')'
    })
    .datum({
        teeth: 32, 
        radius: -radius * 2
    })
    .append('path')
    .attr({
        'd': gear
    });

frame.append('g')
    .attr({
        'class': 'planet',
        'transform': 'translate(' + radius * 3 * x + ',' + -radius * 3 * y + ')'
    })
    .datum({
        teeth: 32, 
        radius: -radius * 2
    })
    .append('path')
    .attr({
        'd': gear
    });
    
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
        path.push(
            'A', r0, ',', r0, ' 0,0,1 ', r0 * Math.cos(a0 += da), ',', r0 * Math.sin(a0),
            'L', r2 * Math.cos(a0), ',', r2 * Math.sin(a0),
            'L', r1 * Math.cos(a0 += da / 3), ',', r1 * Math.sin(a0),
            'A', r1, ',', r1, ' 0,0,1 ', r1 * Math.cos(a0 += da / 3), ',', r1 * Math.sin(a0),
            'L', r2 * Math.cos(a0 += da / 3), ',', r2 * Math.sin(a0),
            'L', r0 * Math.cos(a0), ',', r0 * Math.sin(a0)); 
    }
    //画内纹，中1线0线1/3内（外）1/3线1/3线0中1
    path.push('M0,', -r3, 'A', r3, ',', r3, ' 0,1,1,-0.1,', -r3);//画外圆
    return path.join('');//得到一个path
}


d3.selectAll('input[name=reference]')//选择三个radio元素
    .data([radius * 5,Infinity, -radius])//对应radio元素绑定数组中每一项
    .on('change',                     
        function(radius1) {
            var radius0 = frame.datum().radius, 
            angle = (Date.now() - start) * speed;
            // console.log(radius0);
            // console.log(radius1);
            svg.attr('transform', 'rotate(' + (offset += angle / radius0 - angle / radius1) + ")");//画布转，每换一个模式的时候转动,这里svg可以改成frame
            frame.datum({radius: radius1});//每换一个模式变动整体转的半径率
        }
    );
    
d3.timer(function(){
    var angle = (Date.now() - start) * speed,
        transform = function (d) { return 'rotate(' + angle / d.radius + ')'; };
        // transform = function (d) {console.log(d.radius); return 'rotate(' + angle / d.radius + ')'; };
    frame.selectAll('path').attr('transform', transform);//每个元素转
    frame.attr('transform',transform);//整体转
});





