// 砖头 组成墙壁/镜子的例子
class Brick {
    constructor(opts) {
        this.name = opts.name;
        this.x = opts.x; 
        this.y = opts.y;
        this.deg = opts.deg; // 用于原型为较复杂图形时确定此点的反射角度,比如矩形四条边角度不同
        this.endX = opts.endX;
        this.endY = opts.endY;
        this.ori = opts.ori; // 源头 从哪里拆分出来
    }
}