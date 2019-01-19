// 镜子对象
class Mirror {
    constructor(opts) {
        this.endX = opts.endX; // 激光结束的x坐标
        this.endY = opts.endY; // 激光结束的y坐标
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y);
        GSctx.rotate(this.deg * deg);
        GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        GSctx.restore();
        this.emitLaser(); 
    }
    emitLaser() {
        // console.log(this.endX)
        this.getEndXY();
        GSctx.beginPath(); // 开始绘画路径
        GSctx.moveTo(this.x, this.y); // 将画笔移到发射器所在坐标
        // 创建渐变的激光色
        let gradient = GSctx.createLinearGradient(this.x, this.y, this.endX, this.endY);
        gradient.addColorStop("0","#ffcfcc");
        gradient.addColorStop("1","#ff1000");
        GSctx.strokeStyle = gradient;

        GSctx.lineTo(this.endX, this.endY); // 激光结束的坐标
        GSctx.lineWidth = 2; // 激光的宽度
        GSctx.stroke(); // 绘画路径
    }
}