var nowLv = {}; // 当前运行中的关卡
var Game = {
    start: function(level) {
        this.status = 'gaming'; // 游戏进行中
        GSctx.clearRect(0, 0, stageWidth, stageHeight); // 先清理画布
        nowLv = level;
        this.init(); //初始化
        
        this.update(); // 更新画面
        this.bindTouchAction(); // 绑定触摸操作
        this.bindClickAction(); // 绑定鼠标事件
    },
    init: function() {
        let level = nowLv;
        level.init(); //关卡文件初始化
        // 激光初始化
        if(level.laserTransmitter) {
            this.lasers = [];
            for(let opts of level.laserTransmitter) {
                this.lasers.push(new LaserTransmitter(opts))
            }
        }
        // 目标点初始化
        if(level.lightHome) {
            this.home = new LightHome(level.lightHome);
        }
        // 狼初始化
        if(level.wolf) {
            this.wolves = [];
            for(let opts of level.wolf) {
                let newWolf = new Wolf(opts);
                this.wolves.push(newWolf);
            }
        }
        // 墙体初始化
        if(level.wall) {
            this.walls = new Wall(level.wall);
        }
        if(level.mirror) {
            this.mirrors = [];
            for(let opts of level.mirror) {
                let newMirror = new Mirror(opts);
                this.mirrors.push(newMirror);
            }
        }
        if(level.cloud) {
            this.clouds = [];
            for(let opts of level.cloud) {
                let newMirror = new Cloud(opts);
                this.clouds.push(newMirror);
            }
        }
        // 制作碎块
        this.makeBricks();
    },
    makeBricks() {
        this.bricks = [];
        if(this.walls) {
            this.bricks = this.bricks.concat(this.walls.makeBricks());
        }
        if(this.mirrors) {
            for(let mirror of this.mirrors) {
                this.bricks = this.bricks.concat(mirror.makeBricks());
            }
        }
        if(this.home) {
            this.bricks = this.bricks.concat(this.home.makeBricks());
        }
        if(this.clouds) {
            for(let cloud of this.clouds) {
                this.bricks = this.bricks.concat(cloud.makeBricks());
            }
        }
    },
    move() {
        if(this.walls) {
            this.walls.move();
        }
        if(this.wolves) {
            for(let wolf of this.wolves) {
                wolf.move();
            }
        }   
        if(this.clouds) {
            for(let cloud of this.clouds) {
                cloud.move();
            }
        }  

    },
    updateElement: function() {
        if(this.home.status == 'done') {
            this.win();
            return false;
        }
        let self = this;
        let lasers = this.lasers;
        this.move(); // 运动的物体更新位置
  
        this.makeBricks(); // 重新计算碎片

        for(laser of lasers) {
            let aims = this.crashOrder(laser, this.bricks); // 将碎片依照射线中心重新排序
            laser.getEndXY();
            crashAims:
            for(aim of aims) {
                let oriAim = aim.ori;
                let oriAimClass = oriAim.constructor; //到原型中查这个属性
                let oriAimName = oriAim.name;
                if(oriAimName != laser.oriName) {
                    // 不同目标反射规则不同
                    if(oriAimClass == Mirror) {
                        let node = laser.isIntersect(aim, 0)
                        if(node) {
                            laser.endX = node.x;
                            laser.endY = node.y;
                            // console.log(oriAim)
                            if(oriAim.canReflect(laser.deg)) {
                                let light = new LaserTransmitter({
                                    name: 'reflect' + Date.now(),
                                    oriName: oriAimName,
                                    x: node.x / Config.window.scale, // 发射器x坐标，激光开始的x坐标
                                    y: node.y / Config.window.scale, // 发射器y坐标，激光结束的y坐标
                                    deg: calRefAngle(laser.deg, oriAim.deg),
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
                    }else if(oriAimClass == Wall) {
                        let node = laser.isIntersect(aim, 0)
                        if(node) {
                            laser.endX = node.x;
                            laser.endY = node.y;
                
                            break crashAims;
                        }
                    }else if(oriAimClass == LightHome) {
                        let node = laser.isIntersect(aim, 0);
                        if(node) {
                            laser.endX = node.x;
                            laser.endY = node.y;
                            self.home.status = 'active';
                            break crashAims;
                        }
                    }else if(oriAimClass == Cloud) {
                        let node = laser.isIntersect(aim, 0)
                        if(node) {
                            laser.endX = node.x;
                            laser.endY = node.y;
                
                            break crashAims;
                        }
                    }
                } 
            }
           
        }

        return true;
    },
    update: function() {
        let self = this;
        let gameFlag = this.updateElement(); // 更新元素状态，gameFlag如果为false的话说明游戏应该结束了

        if(gameFlag) {
            GSctx.clearRect(0, 0, stageWidth, stageHeight); //先清理画布
            this.draw();
            this.lasersLength =  this.lasers.length; //记录当前反射线的数量
            this.lasers.splice(1, this.lasers.length - 1); //绘画结束后删除所有的反射光线
            this.updateAnim = requestAnimFrame(function() {
                self.update();
            });
        }
    },
    draw: function() {
        if(this.walls) {
            this.walls.draw();
        }
        if(this.home) {
            this.home.draw();
        }
        if(this.mirrors) {
            for(let mirror of this.mirrors) {
                mirror.draw();
            }
        }
        if(this.lasers) {
            for(let laser of this.lasers) {
                laser.draw();
            }
        }
        if(this.clouds) {
            for(let cloud of this.clouds) {
                cloud.draw();
            }
        }
        if(this.wolves) {
            for(let wolf of this.wolves) {
                wolf.draw();
            }
        }     
    },
    bindTouchAction: function() {
        let lasers = this.lasers;
        let mirrors = this.mirrors;
        let home = this.home;
        let timeOutEvent = '';

        let startX = 0,
            startY = 0,
            endX = 0,
            endY = 0,
            activeMirror = '';

        // 绑定滑块
        $(".changeDeg input").attr({
            value: this.lasers[0].deg,
            // onInput: `Game.changeLDeg(this, 0)`
        });

        gameStage.addEventListener('touchstart', (e) => {
            startX = e.targetTouches[0].pageX - Config.window.offectX;
            startY = e.targetTouches[0].pageY - Config.window.offectY;
            e.preventDefault();
            // 每次点击都去除页面中的已存在的控制器
            // $('.changeDeg').remove();

            // for([i, laser] of lasers.entries()) {
            //     let d = nodesD({x:startX, y: startY}, {x: laser.x, y: laser.y});   
            //     if(d < laser.width / 2) {
            //         // $('#uiGamming').append(`<div class="changeDeg" style="top:${laser.y + 50}px;left:${laser.x + 50}px"><input type="range" value="${laser.deg}" min="0" max="360" class="deg_range" oninput="Game.changeLDeg(this, ${i})"></div>`);
            //         $('#uiGamming').append(`<div class="changeDeg" style="bottom:100px;left:30%"><input type="range" value="${laser.deg}" min="0" max="360" class="deg_range" oninput="Game.changeLDeg(this, ${i})"></div>`);
            //         $(".changeDeg").click((e) => {
            //             e.stopPropagation();    //  阻止事件冒泡
            //         });
            //         break;
            //     }
            // }

            activeMirror = '';
            // timeOutEvent = setTimeout(function(){
                for([i, mirror] of mirrors.entries()) {
                    let d = nodesD({x:startX, y: startY}, {x: mirror.x, y: mirror.y});
                    if(d < mirror.width / 2) {
                        activeMirror = mirror;
                        break;
                    }
                }
            // },500);
            
            // 如果是狼的话，第四关可以通关点击杀掉
            if(nowLv.level == 4) {
                for(let wolf of this.wolves) {
                    if(wolf.alive) {
                        let d = nodesD({x:startX, y: startY}, {x: wolf.x, y: wolf.y});
                        if(d < wolf.width / 2) {
                            wolf.alive = false;
                            break;
                        }
                    }
     
                }
            }

            // 第五关长按可以移动房子
            if(nowLv.level == 5) {
                timeOutEvent = setTimeout(function(){
                    // console.log(this.home)
                    let d = nodesD({x:startX, y: startY}, {x: home.x, y: home.y});
                    if(d < home.width / 2) {
                        activeMirror = home;
                    }
                },500);
            }
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
    bindClickAction: function() {
        let lasers = this.lasers;
        let mirrors = this.mirrors;
        let home = this.home;
        let timeOutEvent = '';

        let startX = 0,
            startY = 0,
            endX = 0,
            endY = 0,
            activeMirror = '';

        // 绑定滑块
        $(".changeDeg input").attr({
            value: this.lasers[0].deg,
            // onInput: `Game.changeLDeg(this, 0)`
        });

        gameStage.addEventListener('mousedown', (e) => {
            startX = e.pageX - Config.window.offectX;
            startY = e.pageY - Config.window.offectY;
            e.preventDefault();

            activeMirror = '';
            // timeOutEvent = setTimeout(function(){
                for([i, mirror] of mirrors.entries()) {
                    let d = nodesD({x:startX, y: startY}, {x: mirror.x, y: mirror.y});
                    if(d < mirror.width / 2) {
                        activeMirror = mirror;
                        break;
                    }
                }
            // },500);
            
            // 如果是狼的话，第四关可以通关点击杀掉
            if(nowLv.level == 4) {
                for(let wolf of this.wolves) {
                    if(wolf.alive) {
                        let d = nodesD({x:startX, y: startY}, {x: wolf.x, y: wolf.y});
                        if(d < wolf.width / 2) {
                            wolf.alive = false;
                            break;
                        }
                    }
     
                }
            }

            // 第五关长按可以移动房子
            if(nowLv.level == 5) {
                timeOutEvent = setTimeout(function(){
                    // console.log(this.home)
                    let d = nodesD({x:startX, y: startY}, {x: home.x, y: home.y});
                    if(d < home.width / 2) {
                        activeMirror = home;
                    }
                },500);
            }
        });     

        gameStage.addEventListener('mousemove', (e) => {
            endX = e.pageX - Config.window.offectX;
            endY = e.pageY - Config.window.offectY;

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

        gameStage.addEventListener('mouseup', (e) => {
            activeMirror = '';
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
    win() {
        let wolfNum = 0;
        if(this.wolves) {
            for(let wolf of this.wolves) {
                if(wolf.arrive) {
                    wolfNum++;
                }
            }
        }
        let starNum = nowLv.win({
            lasersNum: this.lasersLength,
            wolfNum: wolfNum
        });
        $(`.win-level .star img`).attr('src', 'assets/img/starEmpty.png');
        for(let i = 0; i < starNum; i++) {
            $('.win-level .star img')[i].src = "assets/img/starFill.png";
        }
        if(nowLv.level == 5) {
            $('.next-lv').hide();
        }else{
            $('.next-lv').show();
        }
        $('.win-level').slideDown();

        this.end(); //结束游戏
        return true;
    },
    end: function() {
        this.status = 'end'; // 游戏结束
        cancelAnimFrame(this.updateAnim); // 清除动画更新
        pauseSound(nowLv.bgMusic);  // 清除声音
        //清空使用过的变量
        this.lasers = undefined;
        this.home = undefined;
        this.wolves = undefined;
        this.walls = undefined;
        this.mirrors = undefined;
        this.bricks = undefined;
        this.clouds = undefined;

        return true;
    }

}


