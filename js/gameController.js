var nowLv = {};
var Game = {
    start: function(level) {
        // 先清理画布
        GSctx.clearRect(0, 0, stageWidth, stageHeight);
        
        this.level = level;
        level.init();
        
        if(level.laserTransmitter) {
            this.lasers = [];
            for(let opts of level.laserTransmitter) {
                this.lasers.push(new LaserTransmitter(opts))
            }
        }

        this.home = new LightHome(level.lightHome);

        this.walls = new Wall(level.wall);

        this.bricks = this.walls.makeBricks();
        
        if(level.mirror) {
            this.mirrors = [];
            for(let opts of level.mirror) {
                this.mirrors.push(new Mirror(opts))
            }
        }
        
        this.update();
        this.bindTouchAction();
    },
    updateElement: function() {
        let self = this;
        let lasers = this.lasers;
         
        // 将所有可能反射的目标汇成一个数组
        let aims = this.crashOrder(lasers[0], this.mirrors);
        for(laser of lasers) {
            laser.getEndXY();

            crashAims:
            for(aim of aims) {
                if(aim.name != laser.oriName) {
                    // 不同目标反射规则不同
                    switch(aim.constructor.name) {
                        case 'Mirror':
                            let node = laser.isIntersect(aim, 0)
                            if(node) {
                                laser.endX = node.x;
                                laser.endY = node.y;
                                if(aim.canReflect(laser.deg)) {
                                    let light = new LaserTransmitter({
                                        name: 'reflect' + Date.now(),
                                        oriName: aim.name,
                                        x: node.x / Config.window.scale, // 发射器x坐标，激光开始的x坐标
                                        y: node.y / Config.window.scale, // 发射器y坐标，激光结束的y坐标
                                        deg: calRefAngle(laser.deg, aim.deg),
                                        icon: imgBox['lightStart'], // 发射器图标
                                        width: Config.objSize.lightStart.width, // 发射器宽度
                                        height: Config.objSize.lightStart.height // 发射器高度
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
                                }
                    
                                break crashAims;
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
        this.walls.draw()

        this.home.draw();

        for(let mirror of this.mirrors) {
            mirror.draw();
        }
        for(let laser of this.lasers) {
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
            startX = e.targetTouches[0].pageX - Config.window.offectX;
            startY = e.targetTouches[0].pageY - Config.window.offectY;
            e.preventDefault();
            // 每次点击都去除页面中的已存在的控制器
            $('.changeDeg').remove();

            for([i, laser] of lasers.entries()) {
                let d = nodesD({x:startX, y: startY}, {x: laser.x, y: laser.y});   
                if(d < laser.width / 2) {
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
                    let d = nodesD({x:startX, y: startY}, {x: mirror.x, y: mirror.y});
                    if(d < mirror.width / 2) {
                        activeMirror = mirror;
                        break;
                    }
                }
            },500);
            
        });     

        gameStage.addEventListener('touchmove', (e) => {
            endX = e.targetTouches[0].pageX - Config.window.offectX;
            endY = e.targetTouches[0].pageY - Config.window.offectY;

            e.preventDefault();
            clearTimeout(timeOutEvent);

            if(activeMirror) {
                activeMirror.x += endX - startX;
                activeMirror.y += endY - startY;
            }

            // 将滑动的位置作为初始值
            startX = endX;
            startY = endY;
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
    crashOrder: function(main, items) {
        // 根据目标到中心目标的距离来判断碰撞的先后顺序
        let sortItems = [];
        let mainX = main.x;
        let mainY = main.y;
        for(let item of items) {
            item.d = nodesD({x: item.x, y: item.y}, {x: mainX, y: mainY});
            sortItems.push(item);
        }

        sortItems.sort((item1, item2) => {
            return item1.d - item2.d;
        });

        for(let item of sortItems) {
            delete item.d
        }

        return sortItems;
    },
    end: function() {
        // 先清理画布
        GSctx.clearRect(0, 0, stageWidth, stageHeight);
        // 清除声音
        pauseSound(this.level.bgMusic);
    }

}


