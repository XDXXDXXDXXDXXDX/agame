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
        // let bricks = [];
        let nodes = calNewXY(this)
        let sNode = nodes.start;
        let eNode = nodes.end;
        let bricks = bricksFactory.call(this, sNode, eNode);
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