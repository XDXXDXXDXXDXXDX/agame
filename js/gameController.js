var gameStage = document.getElementById('gameStage');
gameStage.width = window.innerWidth;
gameStage.height = window.innerHeight;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");

let aaaa ='';

var Game = {
    start: function() {
        playSound(Level1.bgMusic, true);
        
        if(Level1.laserTransmitter) {
            this.lasers = [];
            for(let opts of Level1.laserTransmitter) {
                this.lasers.push(new LaserTransmitter(opts))
            }
        }
        this.home = new LightHome(Level1.lightHome);
        
        if(Level1.mirror) {
            this.mirrors = [];
            for(let opts of Level1.mirror) {
                this.mirrors.push(new Mirror(opts))
            }
        }
        
        this.update();
        this.bindTouchAction();
    },
    updateElement: function() {
        let self = this;
        let lasers = this.lasers;
        for(laser of lasers) {
            laser.getEndXY();
            for(mirror of this.mirrors) {
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
                        for(laser of lasers) {
                            if(laser.x == light.x && laser.y == light.y && laser.deg == light.deg) {
                                canReflect = false;
                                break;
                            }
                        }
                        if(canReflect) {
                            lasers.push(light);
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

            self.home.status = 'active';
        }else{
            self.home.status = 'inactive';
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

        for(mirror of this.mirrors) {
            mirror.draw();
        }
        for(laser of this.lasers) {
            laser.draw();
        }


        this.lasers.splice(1, this.lasers.length - 1)
    },
    bindTouchAction: function() {
        let lasers = this.lasers;
        let mirrors = this.mirrors;
        let timeOutEvent = '';

        let startX = 0,
            startY = 0,
            endX = 0,
            endY = 0,
            activeMirror = '';

        gameStage.addEventListener('touchstart', (e) => {
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
            e.preventDefault();
            // 每次点击都去除页面中的已存在的控制器
            $('.changeDeg').remove();

            for([i, laser] of lasers.entries()) {
                let d = Math.sqrt((e.touches[0].clientX - laser.x) ** 2 + (e.touches[0].clientY - laser.y) ** 2);
                if(d < 20) {
                    $('#uiGamming').append(`<div class="changeDeg" style="top:${laser.y + 50}px;left:${laser.x + 50}px"><input type="range" value="${laser.deg}" min="0" max="360" class="deg_range" oninput="Game.changeLDeg(this, ${i})"></div>`);
                    $(".changeDeg").click((e) => {
                        e.stopPropagation();    //  阻止事件冒泡
                    });
                    break;
                }
            }

            activeMirror = '';
            timeOutEvent = setTimeout(function(){
                for([i, mirror] of mirrors.entries()) {
                    let d = Math.sqrt((e.touches[0].clientX - mirror.x) ** 2 + (e.touches[0].clientY - mirror.y) ** 2);
                    if(d < mirror.width / 2) {
                        activeMirror = mirror;
                        break;
                    }
                }
            },500);
            
        });     

        gameStage.addEventListener('touchmove', (e) => {
            endX = e.targetTouches[0].pageX;
            endY = e.targetTouches[0].pageY;

            e.preventDefault();
            clearTimeout(timeOutEvent);

            if(activeMirror) {
                activeMirror.x += endX - startX;
                activeMirror.y += endY - startY;
            }

            // 将滑动的位置作为初始值
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
        });     

        gameStage.addEventListener('touchend', (e) => {
            e.preventDefault();
            clearTimeout(timeOutEvent);
        });   

        
    },
    changeLDeg: function(thisInput, i) {
        let lasers = this.lasers;
        lasers[i].deg = Number(thisInput.value);
    },

}


