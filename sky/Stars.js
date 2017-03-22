export class Stars {
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


}