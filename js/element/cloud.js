// 镜子对象
class Cloud extends Element {
    constructor(opts) {
        super(opts);
        this.cut = opts.cut.map((val) => {
            return val * Config.window.scale;
        });
    }
    makeBricks() {
        let bricks = [];
        let A = {
            x: this.x - this.width / 2 + this.cut[0],
            y: this.y - this.height / 2 + this.cut[0]
        }
        let B = {
            x: this.x - this.width / 2 + this.cut[1],
            y: this.y + this.height / 2 - this.cut[1]
        }
        let C = {
            x: this.x + this.width / 2 - this.cut[2],
            y: this.y + this.height / 2 - this.cut[2]
        }
        let D = {
            x: this.x + this.width / 2 - this.cut[3],
            y: this.y - this.height / 2 + this.cut[3]
        }
        bricks = bricksFactory.call(this, A, B, false, 90);
        bricks = bricks.concat(bricksFactory.call(this, B, C, false, 180));
        bricks = bricks.concat(bricksFactory.call(this, C, D, false, 90));
        bricks = bricks.concat(bricksFactory.call(this, D, A, false, 180));
        return bricks;
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y);
        GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        GSctx.restore();
    }
}