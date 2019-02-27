var gameStage = document.getElementById('gameStage');
gameStage.width = window.innerWidth;
gameStage.height = window.innerHeight;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");

let aaaa ='';

var Game = {
    start: function() {
        soundBox[Level1.bgMusic].loop = 'loop';
        soundBox[Level1.bgMusic].play();
        
        if(Level1.laserTransmitter) {
            this.laserArr = [];
            for(let opts of Level1.laserTransmitter) {
                this.laserArr.push(new LaserTransmitter(opts))
            }
        }
        this.home = new LightHome(Level1.lightHome);
        
        if(Level1.mirror) {
            this.mirrorArr = [];
            for(let opts of Level1.mirror) {
                this.mirrorArr.push(new Mirror(opts))
            }
        }
        
        this.update();
        this.bindTouchAction();
    },
    updateElement: function() {
        let self = this;
        let laserArr = this.laserArr;
        for(laser of laserArr) {
            laser.getEndXY();
            for(mirror of this.mirrorArr) {
                if(mirror.name != laser.oriName) {
                    let node = laser.isIntersect(mirror, 0)
                    if(node) {
                        laser.endX = node.x;
                        laser.endY = node.y;
                        let light = new LaserTransmitter({
                            name: 'reflect' + Date.now(),
                            oriName: mirror.name,
                            x: node.x, // 发射器x坐标，激光开始的x坐标
                            y: node.y, // 发射器y坐标，激光结束的y坐标
                            deg: calRefAngle(laser.deg, mirror.deg),
                            icon: imgBox['lightStart'], // 发射器图标
                            width: Config.lightStartSize.width, // 发射器宽度
                            height: Config.lightStartSize.height // 发射器高度
                        });
                        
                        // console.log(light)
                        // 剔除重复的反射线
                        let canReflect = true;
                        for(laser of laserArr) {
                            if(laser.x == light.x && laser.y == light.y && laser.deg == light.deg) {
                                canReflect = false;
                                break;
                            }
                        }
                        if(canReflect) {
                            laserArr.push(light);
                        }
                        
                        break;
                    }
                } 
            }
           
        }
    
        let node = laser.isIntersect(this.home, 1)
        if(node) {
            laser.endX = node.x;
            laser.endY = node.y;

            self.home.icon = imgBox['lightInHome'];
        }else{
            self.home.icon = imgBox['lightHome'];
        }
    },
    update: function() {
        let self = this;
        
        // 先清理画布
        GSctx.clearRect(0, 0, stageWidth, stageHeight);

        this.updateElement();

        this.draw();

        requestAnimFrame(function() {
            self.update()
        });
    },
    draw: function() {
        this.home.draw();

        for(mirror of this.mirrorArr) {
            mirror.draw();
        }
        for(laser of this.laserArr) {
            laser.draw();
        }


        this.laserArr.splice(1, this.laserArr.length - 1)
    },
    bindTouchAction: function() {
        let laserArr = this.laserArr;
        gameStage.addEventListener('touchstart', (e) => {
            $('.changeDeg').remove();
            for([i, laser] of laserArr.entries()) {
                let d = Math.sqrt((e.touches[0].clientX - laser.x) ** 2 + (e.touches[0].clientY - laser.y) ** 2);
                if(d < 20) {
                    $('#uiGamming').append(`<div class="changeDeg" style="top:${laser.y + 50}px;left:${laser.x + 50}px"><input type="range" value="${laser.deg}" min="0" max="360" class="deg_range" oninput="Game.changeLDeg(this, ${i})"></div>`);
                    $(".changeDeg").click((e) => {
                        e.stopPropagation();    //  阻止事件冒泡
                    });
                    break;
                }
            }
            
        });     

        
    },
    changeLDeg: function(thisInput, i) {
        let laserArr = this.laserArr;
        laserArr[i].deg = Number(thisInput.value);
    },

}


