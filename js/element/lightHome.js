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
        function make(node1, node2) {
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





