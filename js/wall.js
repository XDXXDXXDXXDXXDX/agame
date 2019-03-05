// 墙壁对象
class Wall {
    constructor(opts) {
        this.walls = opts; //[{name,line},{},{}] 墙体位置数组，每一个墙都是多条线闭合而成
    }
    draw() {
        GSctx.save();
        GSctx.lineWidth ="1";
        for(let wall of this.walls) {
            let line = wall.line;
            GSctx.beginPath();
            GSctx.moveTo(line[0].x * Config.window.scale, line[0].y * Config.window.scale);
            for(let path of line) {
                GSctx.lineTo(path.x * Config.window.scale, path.y * Config.window.scale);
            }
            GSctx.fill();
        }
        GSctx.globalCompositeOperation = 'source-in'; //显示新老重叠的新的部分，以达到显示墙壁纹理
        GSctx.drawImage(imgBox['wall2'], 0, 0, stageWidth, stageHeight);
        GSctx.restore();
    }
}