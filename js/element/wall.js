// 墙壁对象
class Wall {
    constructor(opts) {
        this.walls = opts; //[{name,line},{},{}] 墙体位置数组，每一个墙都是多条线闭合而成
        this.start = []; //每条线的起始位置
        for(let wall of this.walls) {
            let line = wall.line;
            this.start.push({
                x: line[0].x,
                y: line[0].y
            });
        }
    }
    makeBricks() {
        let bricks = [];
        for(let wall of this.walls) {
            this.name = wall.name;
            let line = wall.line;
            for(let [i, path] of line.entries()) {
                let i2 = i + 1 == line.length ? 0 : i + 1;
                bricks = bricks.concat(bricksFactory.call(this, path, line[i2], true));
            }
        }
        return bricks;
    }
    move() {
        for(let [i, wall] of this.walls.entries()) {
            if(wall.move ) {
                let m = wall.move;
                let dx = m.x > m.y ? 1 : m.x / m.y;
                let dy = dx == 1 ? m.y / m.x :  1;
                if(m.dir && wall.line[0].x < this.start[0].x + wall.move.x) {
                    for(let dot of wall.line) {
                        dot.x += dx * m.speed;
                        dot.y += dy * m.speed;
                    }

                    if(wall.line[0].x >= this.start[0].x + wall.move.x) {
                        m.dir = !m.dir; // 到尽头时反转方向
                    }
                }else if(m.regular == 'reverse' && !m.dir) {
                    for(let dot of wall.line) {
                        dot.x -= dx * m.speed;
                        dot.y -= dy * m.speed;
                    }

                    if(wall.line[0].x <= this.start[0].x) {
                        m.dir = !m.dir; // 到尽头时反转方向
                    }
                }
            }
        }
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