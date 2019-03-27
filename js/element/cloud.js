// 镜子对象
class Cloud extends Element {
    constructor(opts) {
        super(opts);
        // 四周需要切掉的距离
        this.cut = opts.cut.map((val) => {
            return val * Config.window.scale;
        });
        this.mv = opts.move;
        if(this.mv) {
            let m = this.mv;
            m.x = m.x * Config.window.scale - this.x; //云移动的x距离
            m.y = m.y * Config.window.scale - this.y; //云移动的y距离
            m.speed *= Config.window.scale;
            let amx = Math.abs(m.x);
            let amy = Math.abs(m.y);
            m.dx = amx > amy ? 1 : amx / amy;
            m.dy = m.dx == 1 ? amy / amx :  1;
            m._x = m.x >= 0 ? 1 : -1;
            m._y = m.y >= 0 ? 1 : -1;   
        }  
        this.start = {
            x: this.x,
            y: this.y
        }
    }
    move() {
        if(this.mv) {
            let m = this.mv;
            let xChange = Math.abs(this.x - this.start.x);
            if(xChange < Math.abs(m.x)) {
                this.x += m.dx * m.speed * m._x;
                this.y += m.dy * m.speed * m._y;
            }else if(m.regular == 'reverse') {
                this.start.x = this.x;
                m._x *= -1;
                m._y *= -1;
            }
        }
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