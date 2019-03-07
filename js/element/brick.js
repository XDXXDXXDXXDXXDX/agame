// 砖头 组成墙壁/镜子的例子
class Brick {
    constructor(opts) {
        this.name = opts.name;
        this.x = opts.x; 
        this.y = opts.y;
        this.endX = opts.endX;
        this.endY = opts.endY;
        this.ori = opts.ori; // 源头 从哪里拆分出来
    }
    // draw() {
    //     GSctx.save();
    //     GSctx.lineWidth ="1";
    //     for(let wall of this.walls) {
    //         let line = wall.line;
    //         GSctx.beginPath();
    //         GSctx.moveTo(line[0].x * Config.window.scale, line[0].y * Config.window.scale);
    //         for(let path of line) {
    //             GSctx.lineTo(path.x * Config.window.scale, path.y * Config.window.scale);
    //         }
    //         GSctx.fill();
    //     }
    //     GSctx.globalCompositeOperation = 'source-in'; //显示新老重叠的新的部分，以达到显示墙壁纹理
    //     GSctx.drawImage(imgBox['wall2'], 0, 0, stageWidth, stageHeight);
    //     GSctx.restore();
    // }
}