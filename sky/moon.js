export class Moon {
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
}