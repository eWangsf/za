import {Moon} from 'moon'
import {Stars} from 'stars'
import {Meteor} from 'meteor'

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    moon = new Moon(ctx, width, height),
    stars = new Stars(ctx, width, height, 200),
    count = 0,
    meteors = [];

canvas.width = width;
canvas.height = height;

let meteorUpdate =  () => {
    let x = Math.random() * canvas.width + 600,
        y = 0;
    if(meteors.length < 5) {
        meteors.push(new Meteor(ctx, x, y, width, height));
    }

    setTimeout(function () {
        meteorUpdate();
    }, Math.random() * 2000);
}

let frame = () => {
    if(count++ % 10 == 0) {
        stars.update();
    }
    ctx.clearRect(0, 0, width, height);
    moon.draw();
    stars.draw();
    meteorUpdate();

    meteors.forEach((meteor, index, arr) => {
        if(meteor.flow()) {
            arr.splice(index, 1);
        } else {
            meteor.draw();
        }
    });

    requestAnimationFrame(frame);
}

frame();









