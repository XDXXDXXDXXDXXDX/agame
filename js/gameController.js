var gameStage = document.getElementById('gameStage');
gameStage.width = window.innerWidth;
gameStage.height = window.innerHeight;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");

let aaaa ='';

var Game = {
    start: function() {
        let laserA = new LaserTransmitter({
            name: 'laserA',
            oriName: 'laserA',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 40,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });

        let lightHomeA = new LightHome({
            name: 'lightHomeA',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 0,
            icon: imgBox['lightHome'], // 发射器图标
            width: Config.lightHomeSize.width, // 发射器宽度
            height: Config.lightHomeSize.height // 发射器高度
        });
        let lightHomeB = new LightHome({
            name: 'lightHomeB',
            x: 250, // 发射器x坐标，激光开始的x坐标
            y: 300, // 发射器y坐标，激光结束的y坐标
            deg: 0,
            icon: imgBox['lightHome'], // 发射器图标
            width: Config.lightHomeSize.width, // 发射器宽度
            height: Config.lightHomeSize.height // 发射器高度
        });
        let lightHomeC = new LightHome({
            name: 'lightHomeC',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 100, // 发射器y坐标，激光结束的y坐标
            deg: 0,
            icon: imgBox['lightHome'], // 发射器图标
            width: Config.lightHomeSize.width, // 发射器宽度
            height: Config.lightHomeSize.height // 发射器高度
        });
        
        this.laserArr = [];
        this.homeArr = [];
        this.laserArr.push(laserA);
        this.homeArr.push(lightHomeA, lightHomeB, lightHomeC);
        
        this.update();
        this.bindTouchAction();
    },
    update: function() {
        let self = this;
        let laserArr = this.laserArr;
        for(laser of laserArr) {
            laser.getEndXY();
            for(home of this.homeArr) {
                if(home.name != laser.oriName) {
                    let node = laser.isIntersect(home)
                    if(node) {
                        laser.endX = node.x;
                        laser.endY = node.y;
                        let light = new LaserTransmitter({
                            name: 'reflect' + Date.now(),
                            oriName: home.name,
                            x: node.x, // 发射器x坐标，激光开始的x坐标
                            y: node.y, // 发射器y坐标，激光结束的y坐标
                            deg: calRefAngle(laser.deg, 360),
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
        // 先清理画布
        GSctx.clearRect(0, 0, stageWidth, stageHeight);

        this.draw();

        requestAnimFrame(function() {
            self.update()
        });
    },
    draw: function() {
        for(laser of this.laserArr) {
            laser.draw();
        }
        for(home of this.homeArr) {
            home.draw();
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
        laserArr[i].deg = thisInput.value;
    },

}


