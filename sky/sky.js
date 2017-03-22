(function() {
    "use strict";
    class moon$$Moon {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
        }

        draw() {
            let ctx = this.ctx,
                grd = ctx.createRadialGradient(200, 200, 80, 200, 200, 800);
            grd.addColorStop(0, 'rgb(255,255,255)');
            grd.addColorStop(0.01, 'rgb(70,70,80)');
            grd.addColorStop(0.2, 'rgb(40,40,50)');
            grd.addColorStop(0.4, 'rgb(20,20,30)');
            grd.addColorStop(1, 'rgb(0,0,10)');
            ctx.save();
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }
    }class stars$$Stars {
        constructor(ctx, width, height, num) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.stars = this.getStars(num);
        }

        draw() {
            let ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = "white";
            this.stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();
        }

        getStars(amount) {
            let stars = [];
            for(let i = 0; i < amount; i++) {
                stars.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    r: Math.random() + 0.2,
                })
            }
            return stars;
        }

        update() {
            this.stars = this.stars.map((star) => {
                // star.r = Math.random();
                // return star;
                let sign = Math.random() > 0.5 ? 1 : -1;
                star.r += sign * 0.2;
                if(star.r < 0) {
                    star.r = -star.r;
                } else if (star.r > 1) {
                    star.r -= 0.2;
                }
                return star;
            });
        }


    }class meteor$$Meteor {
        constructor(ctx, x, y, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.dx = -(Math.random() * 4 + 4);
            this.dy = -this.dx;
            this.len = Math.random() * 200 + 300;
        }

        flow() {
            let tx = this.x + this.len,
                ty = this.y - this.len;
            if(ty > this.height) {
                return true;
            }
            this.x += this.dx;
            this.y += this.dy;
            return false;
        }

        draw() {
            let ctx = this.ctx,
                graColor = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.len);
            graColor.addColorStop(0, 'rgba(255, 255, 255, 1)');
            graColor.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.save();
            ctx.fillStyle = graColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1, 0.25 * Math.PI, 1.25 * Math.PI);
            ctx.lineTo(this.x + this.len, this.y - this.len);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    let main$$canvas = document.getElementById('canvas'),
        main$$ctx = main$$canvas.getContext('2d'),
        main$$width = window.innerWidth,
        main$$height = window.innerHeight,
        main$$moon = new moon$$Moon(main$$ctx, main$$width, main$$height),
        main$$stars = new stars$$Stars(main$$ctx, main$$width, main$$height, 200),
        main$$count = 0,
        main$$meteors = [];

    main$$canvas.width = main$$width;
    main$$canvas.height = main$$height;

    let main$$meteorUpdate =  () => {
        let x = Math.random() * main$$canvas.width + 600,
            y = 0;
        if(main$$meteors.length < 5) {
            main$$meteors.push(new meteor$$Meteor(main$$ctx, x, y, main$$width, main$$height));
        }

        setTimeout(function () {
            main$$meteorUpdate();
        }, Math.random() * 2000);
    }

    let main$$frame = () => {
        if(main$$count++ % 10 == 0) {
            main$$stars.update();
        }
        main$$ctx.clearRect(0, 0, main$$width, main$$height);
        main$$moon.draw();
        main$$stars.draw();
        main$$meteorUpdate();

        main$$meteors.forEach((meteor, index, arr) => {
            if(meteor.flow()) {
                arr.splice(index, 1);
            } else {
                meteor.draw();
            }
        });

        requestAnimationFrame(main$$frame);
    }

    main$$frame();
}).call(this);

//# sourceMappingURL=sky.js.map