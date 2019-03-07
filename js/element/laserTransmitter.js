// 激光发射器对象
class LaserTransmitter extends Element {
    constructor(opts) {
        super(opts);
        this.endX = opts.endX; // 激光结束的x坐标
        this.endY = opts.endY; // 激光结束的y坐标
    }
    getEndXY() {
        // 根据角度确定射线的方向
        if(0 <= this.deg && this.deg <= 90 ) {
            let lx = this.x; // x2 - x1
            let ly = this.y - lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly > 0) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = 0;
                this.endX = this.x - this.y / Math.tan(this.deg * deg);
            }  
        }else if(90 < this.deg && this.deg < 180) {
            let lx = stageWidth - this.x; // x2 - x1
            let ly = this.y - Math.abs(lx * Math.tan(this.deg * deg));
            // 不能超出边界
            if(ly > 0) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = 0;
                this.endX = this.x + Math.abs(this.y / Math.tan(this.deg * deg));
            }
        }else if(180 <= this.deg && this.deg <= 270) {
            let lx = stageWidth - this.x; // x2 - x1
            let ly = this.y + lx * Math.tan(this.deg * deg);
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = stageWidth;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x + (stageHeight - this.y) / Math.tan(this.deg * deg);
            } 
        }else if(270 < this.deg && this.deg <= 360) {
            let lx = this.x; // x2 - x1
            let ly = this.y + Math.abs(lx * Math.tan(this.deg * deg));
            // 不能超出边界
            if(ly < stageHeight) {
                this.endX = 0;
                this.endY = ly;
            }else{
                this.endY = stageHeight;
                this.endX = this.x - Math.abs((stageHeight - this.y) / Math.tan(this.deg * deg));
            }
        }
    }
    // 相交对象的类型type 0:line(线) 1:rec(矩形) 2:cir(圆形) 3:line2(需要重新计算端点值的对象)
    isIntersect(target, type) {
        if(type == 0) {
            let node = isIntersect({x:this.x, y:this.y}, {x:this.endX, y:this.endY}, {x:target.x, y:target.y}, {x:target.endX, y:target.endY});
            return node;
        }else if(type == 1) {
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
            let usefulNode = {
                p2: A, p3: B, p4:C, p5: D
            };
            if(this.x <= C.x && this.y <= C.y) {
                delete usefulNode.p4;
            }else if(this.x <= D.x && this.y > D.y) {
                delete usefulNode.p5;
            }else if(this.x >= A.x && this.y >= A.y) {
                delete usefulNode.p2;
            }else if(this.x >= B.x && this.y < B.y) {
                delete usefulNode.p3;
            }
            return isIntersectRec(
                {x:this.x, y:this.y}, 
                {x:this.endX, y:this.endY}, 
                usefulNode
            )
        }else if(type == 3) {
            let nodes = calNewXY(target);
            let node = isIntersect({x:this.x, y:this.y}, {x:this.endX, y:this.endY}, nodes.start, nodes.end);
            return node;
        }  
        
        return false;
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y); //移动坐标原点
        GSctx.rotate(this.deg * deg);
        GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        GSctx.restore();
        // this.getEndXY();
        // this.emitLaser(); 
        emitLaser(this.x, this.y, this.endX, this.endY);
    }
}





