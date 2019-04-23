// 狼
class Wolf extends Element {
    constructor(opts) {
        super(opts);
        this.count = 0; // 开始绘画的位置
        this.total = 4; // 帧数
        this.v = 0; // 当前所运动到的帧数
        this.time = 10; //运动动画的快慢（值越大越慢）
        this.arrive = false;
        this.alive = true;
        this.start = {
           x:  this.x,
           y: this.y
        };
        this.mv = {
            x: opts.move.x * Config.window.scale,
            y: opts.move.y * Config.window.scale,
            speed: opts.move.speed * Config.window.scale,
            dir: opts.move.dir
        };
        if(this.mv.x > this.x) {
            this.mv.dir = true // 默认为false，向左运动 true为向右运动
        }
        let m = this.mv;
        let dx = m.x - this.x;
        let dy = m.y - this.y;
        let adx = Math.abs(dx);
        let ady = Math.abs(dy);
        this._x = dx == 0 ? 1 : dx / adx; // x轴是否递增 为0的话则为1不影响计算，否则得到1为递增，-1为递减
        this._y = dy == 0 ? 1 : dy / ady; // y轴是否递增
        this.xOy = adx > ady ? true : false; // 以x或y为尺度（选为尺度的将以1分割，另外一个以尺度分割的个数来确定分割的单位d，true为x,false为y）
        this.d = this.xOy ? ady / adx : adx / ady; //较小的分度值

        this.r = random(0, 10);
        if(Math.random() > 0.5) {
            this.r = - this.r;
        }
    }
    move() {
        if(this.alive) {
            if(Math.abs(this.x - this.mv.x) > 0.01) {
                if(this.xOy) {
                    this.x = this.x + this._x * this.mv.speed;
                    this.y = this.y + this.d * this._y * this.mv.speed;
                }else{
                    this.x = this.x + this.d * this._x * this.mv.speed;
                    this.y = this.y + this._y * this.mv.speed;
                }
            }else{
                this.arrive = true; 
            }
        } 
    }
    draw() {
        let drawX = 0 - this.width / 2;
        let drawY = 0 - this.height / 2;
        GSctx.save();
        GSctx.translate(this.x, this.y);
        if(this.mv.dir) {
            GSctx.scale(-1, 1);
        }
        if(this.arrive) {
            GSctx.drawImage(imgBox['boom'], drawX + this.r, drawY + this.r, Config.objSize.boom.width, Config.objSize.boom.height);
        }else if(!this.alive) {
            GSctx.drawImage(imgBox['break'], drawX + this.r, drawY + this.r, Config.objSize.break.width, Config.objSize.break.height);
        }else{
            GSctx.drawImage(this.icon, this.icon.width * (this.count / this.total), 0, this.icon.width / this.total, this.icon.height, drawX, drawY, this.width, this.height);
        }
        if(this.v < this.time * (this.count + 1)) {
            this.v++;
        }else{
            if(this.count < this.total - 1) {
                this.count++;
            }else{
                this.v = 0;
                this.count = 0;
            }
        }
        GSctx.restore();
    }
}