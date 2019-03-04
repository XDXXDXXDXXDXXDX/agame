// 墙壁对象
class Wall extends Element {
    constructor(opts) {
        super(opts);
        this.lines = opts.lines; // [{x:111,y:111}] 绘画的墙体路径 同时也是n+1个线段（闭合的时候还有一条）
    }
    draw() {
        GSctx.save();
        GSctx.drawImage(imgBox['wall2'], 0, 0, stageWidth, stageHeight);
        GSctx.globalCompositeOperation = 'destination-in'; //新老重合，显示老的部分，以达到显示墙壁纹理
        GSctx.lineWidth ="2";
        GSctx.lineJoin = 'round';
        GSctx.beginPath();
        GSctx.moveTo(this.lines[0].x, this.lines[0].y);
        for(let line of this.lines) {
            GSctx.lineTo(line.x, line.y);
        }
        GSctx.moveTo(150, 200);
        GSctx.fill()
        GSctx.restore();
    }
}