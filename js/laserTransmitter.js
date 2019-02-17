// 激光发射器对象
class LaserTransmitter extends Element {
    constructor(opts) {
        super(opts);
        this.endX = opts.endX; // 激光结束的x坐标
        this.endY = opts.endY; // 激光结束的y坐标
    }
    getEndXY() {
        // 根据角度确定射线的方向
        if(0 <= this.deg && this.deg <= 90) {
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
        }else if(90 < this.deg && this.deg < 180) {
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
        }else if(180 <= this.deg && this.deg <= 270) {
            let lx = this.x; // x2 - x1
            let ly = this.y + lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x - (stageHeight - this.y) / Math.tan(this.deg * deg);
            }
        }else if(270 < this.deg && this.deg <= 360) {
            let lx = stageWidth - this.x; // x2 - x1
            let ly = this.y - lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x - (stageHeight - this.y) / Math.tan(this.deg * deg);
            }
        }
    }
    isIntersect(target) {
        let A = {
            x: target.x - target.width / 2,
            y: target.y - target.height / 2
        }
        let B = {
            x: target.x - target.width / 2,
            y: target.y + target.height / 2
        }
        let C = {
            x: target.x + target.width / 2,
            y: target.y + target.height / 2
        }
        let D = {
            x: target.x + target.width / 2,
            y: target.y - target.height / 2
        }
        let usefulNode = {};
        if(this.x <= C.x && this.y >= C.y) {
            usefulNode = {
                p2: A, p3: B, p5: D
            }
        }else if(this.x <= D.x && this.y < D.y) {
            usefulNode = {
                p2: A, p3: B, p4: C
            }
        }else if(this.x <= D.x && this.y < D.y) {
            usefulNode = {
                p2: A, p3: B, p4: C
            }
        }else if(this.x >= A.x && this.y >= A.y) {
            usefulNode = {
                p3: B, p4: C, p5: D
            }
        }else if(this.x >= B.x && this.y > B.y) {
            usefulNode = {
                p2: A, p4: C, p5: D
            }
        }
        return isIntersectRec(
            {x:this.x, y:this.y}, 
            {x:this.endX, y:this.endY}, 
            usefulNode
        )
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y); //移动坐标原点
        GSctx.rotate(- this.deg * deg);
        GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        GSctx.restore();
        // this.getEndXY();
        this.emitLaser(); 
    }
    emitLaser() {
        // console.log(this.endX)
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
    // 判断与圆形的位置关系
    shotCircle(target) {

        
    }

}





