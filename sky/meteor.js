export class Meteor {
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