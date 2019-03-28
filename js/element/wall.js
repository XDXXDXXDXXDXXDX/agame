// 墙壁对象
class Wall {
    constructor(opts) {
        this.walls = opts; //[{name,line},{},{}] 墙体位置数组，每一个墙都是多条线闭合而成
        this.start = []; //每条线的起始位置
        for(let wall of this.walls) {
            let lines = wall.line;
            for(let line of lines) {
                line.x *= Config.window.scale;
                line.y *= Config.window.scale;
            }    
            if(wall.move) {
                let m = wall.move;
                m.x *= Config.window.scale; //墙移动的x距离
                m.y *= Config.window.scale; //墙移动的y距离
                m.speed *= Config.window.scale;
                let amx = Math.abs(m.x);
                let amy = Math.abs(m.y);
                m.dx = amx > amy ? 1 : amx / amy;
                m.dy = m.dx == 1 ? amy / amx :  1;
                m._x = m.x >= 0 ? 1 : -1;
                m._y = m.y >= 0 ? 1 : -1;   
            }  
            // 保存每个墙壁的起始位置
            this.start.push({
                x: lines[0].x,
                y: lines[0].y
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
                bricks = bricks.concat(bricksFactory.call(this, path, line[i2]));
            }
        }
        return bricks;
    }
    move() {
        for(let [i, wall] of this.walls.entries()) {
            if(wall.move) {
                let m = wall.move;
                let xChange = Math.abs(wall.line[0].x - this.start[i].x);
                if(xChange < Math.abs(m.x)) {
                    for(let dot of wall.line) {
                        dot.x += m.dx * m.speed * m._x;
                        dot.y += m.dy * m.speed * m._y;
                    }
                }else if(m.regular == 'reverse') {
                    this.start[i].x = wall.line[0].x;
                    m._x *= -1;
                    m._y *= -1;
                }else if(m.regular == 'repeat') {
                    for(let dot of wall.line) {
                        dot.x -= m.x;
                        dot.y -= m.y;
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
            GSctx.moveTo(line[0].x, line[0].y);
            for(let path of line) {
                GSctx.lineTo(path.x, path.y);
            }
            GSctx.fill();
        }
        GSctx.globalCompositeOperation = 'source-in'; //显示新老重叠的新的部分，以达到显示墙壁纹理
        GSctx.drawImage(imgBox['wall3'], 0, 0, stageWidth, stageHeight);
        GSctx.restore();
    }
}