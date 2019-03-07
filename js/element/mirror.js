// 镜子对象
class Mirror extends Element {
    constructor(opts) {
        super(opts);
    }
    // deg1是射线的角度
    canReflect(deg1) {
        let deg2 = this.deg;
        if(deg1 <= 180) {
            if(deg1 < deg2 && deg2 < deg1 + 180) {
                return true;
            }
            return false;
        }else{
            if(deg1 < deg2 || deg2 < deg1 - 180) {
                return true;
            }
            return false;
        }
    }
    makeBricks() {
        let bricks = [];
        let nodes = calNewXY(this)
        let sNode = nodes.start;
        let eNode = nodes.end;
        let dx = eNode.x - sNode.x;
        let dy = eNode.y - sNode.y; 
        let adx = Math.abs(dx);
        let ady = Math.abs(dy);
        let _x = dx == 0 ? 1 : dx / adx; // x轴是否递增
        let _y = dy == 0 ? 1 : dy / ady; // y轴是否递增
        let xOy = adx > ady ? true : false; // 以x或y为尺度（选为尺度的将以1分割，另外一个以尺度分割的个数来确定分割的单位，true为x,false为y）
        let d = xOy ? ady / adx : adx / ady;

        if(xOy) {
            for(let i = 0; i < adx; i++) {
                bricks.push(new Brick({
                    name: this.name + i,
                    x: sNode.x + i * _x,
                    y: sNode.y + d * i * _y,
                    endX: sNode.x + (i + 1) * _x,
                    endY: sNode.y + d * (i + 1) * _y,
                    ori: this
                }));
            }
        }else{
            for(let i = 0; i < ady; i++) {
                bricks.push(new Brick({
                    name: this.name + i,
                    x: sNode.x + d * i * _x,
                    y: sNode.y + i * _y,
                    endX: sNode.x + d * (i + 1) * _x,
                    endY: sNode.y + (i + 1) * _y,
                    ori: this
                }));
            }
        }
        return bricks;
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y);
        GSctx.rotate(this.deg * deg);
        GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        GSctx.restore();
    }
}