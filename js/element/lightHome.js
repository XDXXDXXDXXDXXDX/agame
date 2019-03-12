// 激光发射器对象
class LightHome extends Element {
    constructor(opts) {
        super(opts);
        this.keep = 0;
        this.status = 'inactive';
        this.activeIcon = opts.activeIcon;
    }
    activing() {

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
            if(this.keep >= this.height) {
                console.log('恭喜你照亮了明天！');
            }
        }else{
            this.keep = 0;
        }
        GSctx.restore();
    }
}





