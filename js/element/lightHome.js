// 激光发射器对象
class LightHome extends Element {
    constructor(opts) {
        super(opts);
        this.status = 'inactive';
        this.activeIcon = opts.activeIcon;
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y);
        GSctx.rotate(this.deg * deg);
        switch(this.status) {
            case 'active':
                GSctx.drawImage(this.activeIcon, drawX, drawY, this.width, this.height);
                break;
            default:
                GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
                break;
        }
        // GSctx.drawImage(this.icon, drawX, drawY, this.width, this.height);
        GSctx.restore();
    }
}





