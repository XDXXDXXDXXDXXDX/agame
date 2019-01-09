var gameStage = document.getElementById('gameStage');
gameStage.width = window.innerWidth;
gameStage.height = window.innerHeight;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");



var Game = {
    start: function() {
        let laserA = new laserTransmitter({
            x: 60, // 发射器x坐标，激光开始的x坐标
            y: 100, // 发射器y坐标，激光结束的y坐标
            deg: 40,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });
        
        let laserB = new laserTransmitter({
            x: 260, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 100,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });

        let laserC = new laserTransmitter({
            x: 160, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 290,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });

        let laserD = new laserTransmitter({
            x: 260, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 200,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });
        
        this.laserArr = [];
        
        this.laserArr.push(laserA);
        this.laserArr.push(laserB);
        this.laserArr.push(laserC);
        this.laserArr.push(laserD);
        
        this.laserArr.map((laser, i ) => {
            laser.draw();
        });

        this.bindTouchAction();
    },
    bindTouchAction: function() {
        let laserArr = this.laserArr;
        gameStage.addEventListener('touchstart', (e) => {
            laserArr.map((laser, i) => {
                let d = Math.sqrt((e.touches[0].clientX - laser.x) ** 2 + (e.touches[0].clientY - laser.y) ** 2);
                if(d < 20) {
                    $('#uiGamming').append(`<div class="changeDeg" style="top:${laser.y}px;left:${laser.x}px"><input type="range" value="${laser.deg}" min="0" max="359" class="rangeX" oninput="Game.changeLDeg(${i})"></div>`)
                }
            }); 
            $('.rangeX').change(function () {
                console.log(this.value);
            });
        });     
    },
    changeLDeg: function(i) {
        let laserArr = this.laserArr;
        laserArr[i]

    },

}


