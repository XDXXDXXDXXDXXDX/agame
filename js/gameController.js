var gameStage = document.getElementById('gameStage');
gameStage.width = window.innerWidth;
gameStage.height = window.innerHeight;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");



var Game = {
    start: function() {
        let laserA = new laserTransmitter({
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 40,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });
        
        this.laserArr = [];
        
        this.laserArr.push(laserA);
        
        this.update();
        this.bindTouchAction();
    },
    update: function() {
        let self = this;

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
    },
    bindTouchAction: function() {
        let laserArr = this.laserArr;
        gameStage.addEventListener('touchstart', (e) => {
            $('.changeDeg').remove();
            for([i, laser] of laserArr.entries()) {
                let d = Math.sqrt((e.touches[0].clientX - laser.x) ** 2 + (e.touches[0].clientY - laser.y) ** 2);
                if(d < 20) {
                    $('#uiGamming').append(`<div class="changeDeg" style="top:${laser.y + 50}px;left:${laser.x + 50}px"><input type="range" value="${laser.deg}" min="0" max="359" class="deg_range" oninput="Game.changeLDeg(this, ${i})"></div>`);
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


