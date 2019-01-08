// 坐标轴以canvas为准，向下为Y，向右为X
// 激光发射器对象
class laserTransmitter {
    constructor(opts) {
        this.x = opts.x; // 发射器x坐标，激光开始的x坐标
        this.y = opts.y; // 发射器y坐标，激光结束的y坐标
        this.deg = opts.deg; // 角度值，转换成弧度需要 * deg
        this.endX = opts.endX; // 激光结束的x坐标
        this.endY = opts.endY; // 激光结束的y坐标
        this.icon = opts.icon; // 发射器图标
        this.width = opts.width; // 发射器宽度
        this.height= opts.height; // 发射器高度
    }
    getEndXY() {
        // 根据角度确定射线的方向
        if(0 <= this.deg && this.deg < 90) {
            let lx = stageWidth - this.x; // x2 - x1
            let ly = this.y - lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly > 0) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = 0;
                this.endX = this.x + this.y / Math.tan(this.deg * deg);
            }
        }else if(90 <= this.deg && this.deg < 180) {
            let lx = this.x; // x2 - x1
            let ly = this.y + lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly > 0) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = 0;
                this.endX = this.x + this.y / Math.tan(this.deg * deg);
            }
        }else if(180 <= this.deg && this.deg < 270) {
            let lx = this.x; // x2 - x1
            let ly = this.y + lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x - this.y / Math.tan(this.deg * deg);
            }
        }else if(270 <= this.deg && this.deg < 360) {
            let lx = this.x; // x2 - x1
            let ly = this.y - lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x - this.y / Math.tan(this.deg * deg);
            }
        }
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y);
        GSctx.rotate(90 * deg);
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





