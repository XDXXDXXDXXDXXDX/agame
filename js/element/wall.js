// 墙壁对象
class Wall {
    constructor(opts) {
        this.walls = opts; //[{name,line},{},{}] 墙体位置数组，每一个墙都是多条线闭合而成
    }
    makeBricks() {
        let bricks = [];
        for(let wall of this.walls) {
            let line = wall.line;
            for(let [i, path] of line.entries()) {
                let i2 = i + 1 == line.length ? 0 : i + 1;
                let dx = (line[i2].x - path.x) * Config.window.scale;
                let dy = (line[i2].y - path.y) * Config.window.scale;
                let adx = Math.abs(dx);
                let ady = Math.abs(dy);
                let _x = dx == 0 ? 1 : dx / adx; // x轴是否递增
                let _y = dy == 0 ? 1 : dy / ady; // y轴是否递增
                let xOy = adx > ady ? true : false; // 以x或y为尺度（选为尺度的将以1分割，另外一个以尺度分割的个数来确定分割的单位，true为x,false为y）
                let d = xOy ? ady / adx : adx / ady;
    
                if(xOy) {
                    for(let i = 0; i < adx; i++) {
                        bricks.push(new Brick({
                            name: wall.name + i,
                            x: path.x * Config.window.scale + i * _x,
                            y: path.y * Config.window.scale + d * i * _y,
                            endX: path.x * Config.window.scale + (i + 1) * _x,
                            endY: path.y * Config.window.scale + d * (i + 1) * _y,
                            ori: this
                        }));
                    }
                }else{
                    for(let i = 0; i < ady; i++) {
                        bricks.push(new Brick({
                            name: wall.name + i,
                            x: path.x * Config.window.scale + d * i * _x,
                            y: path.y * Config.window.scale + i * _y,
                            endX: path.x * Config.window.scale + d * (i + 1) * _x,
                            endY: path.y * Config.window.scale + (i + 1) * _y,
                            ori: this
                        }));
                    }
                }
            }
        }
        return bricks;
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