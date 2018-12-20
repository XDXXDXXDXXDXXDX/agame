// 坐标轴以canvas为准，向下为Y，向右为X
// 激光发射器对象
class laserTransmitter {
    constructor(x, y, k, direction, endX, endY) {
        this.x = x; // 发射器x坐标，激光开始的x坐标
        this.y = y; // 发射器y坐标，激光结束的y坐标
        this.k = k; // 发射激光的斜率
        this.direction = direction; // 方向延Y轴正方向为1, 延Y轴负方向为0
        this.endX = endX; // 激光结束的x坐标
        this.endY = endY; // 激光结束的y坐标
    }
    getEndXY() {
        if(this.k > 0 && this.direction) { // 右下方向
            let lx = stageWidth - this.x; // x2 - x1
            let ly = this.y + lx * this.k; // y1 + k * lx
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x + (stageHeight - this.y) / this.k;
            }
        }else if(this.k > 0 && !this.direction){ // 左上方向
            let lx = this.x - 0; // x2 - x1
            let ly = this.y - lx * this.k; // y1 + k * lx
            if(ly > 0) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = 0;
                this.endX = this.x - this.y / this.k;
            }
        }else if(this.k < 0 && this.direction){ // 左下方向
            let lx = this.x - 0; // x2 - x1
            let ly = this.y + lx * Math.abs(this.k); // y1 + k * lx
            if(ly < stageHeight) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x - (stageHeight - this.y) / Math.abs(this.k);
            }
        }else{ // 右上方向
            let lx = stageWidth - this.x; // x2 - x1
            let ly = this.y - lx * Math.abs(this.k); // y1 + k * lx
            if(ly > 0) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x + this.y / Math.abs(this.k);
            }
        }   
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





