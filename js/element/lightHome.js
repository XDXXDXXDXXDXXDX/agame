// 激光发射器对象
class LightHome extends Element {
    constructor(opts) {
        super(opts);
        this.keep = 0;
        this.status = 'inactive';
        this.activeIcon = opts.activeIcon;
    }
    makeBricks() {
        let bricks = [];
        let A = {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2
        }
        let B = {
            x: this.x - this.width / 2,
            y: this.y + this.height / 2
        }
        let C = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
        let D = {
            x: this.x + this.width / 2,
            y: this.y - this.height / 2
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
        GSctx.rotate(this.deg * deg);
        GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        if(this.status == 'active') {
            let oriH = this.activeIcon.height;
            let oriW = this.activeIcon.width;
            let rate = oriW / this.width;
            let dy =  this.keep * rate;
            GSctx.drawImage(this.activeIcon, 0, oriH - dy, this.activeIcon.width, dy, drawX, -drawY - this.keep, this.width, this.keep);
            this.keep += this.height / Config.winTime;
            this.status = 'inactive'; //将状态充值为未激活，等待下一次更新元素
            if(this.keep >= this.height) {
                this.status = 'done'; // 小屋充电完成
            }
        }else{
            this.keep = 0;
        }
        GSctx.restore();
    }
}





