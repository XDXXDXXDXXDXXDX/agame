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
            k: 3, // 发射激光的斜率
            direction: 1, // 方向延Y轴正方向为1, 延Y轴负方向为0
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });
        
        let laserB = new laserTransmitter({
            x: 160, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            k: -3, // 发射激光的斜率
            direction: 0, // 方向延Y轴正方向为1, 延Y轴负方向为0
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        });
        
        var laserArr = [];
        
        laserArr.push(laserA);
        laserArr.push(laserB);
        
        laserArr.map((laser, i ) => {
            laser.draw();
        })
    }
}



gameStage.addEventListener('touchstart', (e) => {
    laserArr.map((laser, i ) => {
        let d = Math.sqrt((e.touches[0].clientX - laser.x) ** 2 + (e.touches[0].clientY - laser.y) ** 2);
        if(d < 20) {
            $('#uiGamming').append(`<div class="laser${i}-k changek" style="top:${laser.y}px;left:${laser.x}px"><input value="${laser.k}" onchange="changeLaserK(${i})"></div>`)
        }
    })
    
});

function changeLaserK(i) {
    laserArr[i].k = $(`.laser${i}-k input`).val();

    // GSctx.clearRect(0, 0, stageWidth, stageHeight);
    // laserArr.map((e, i) => {
    //     e.emitLaser();
    // })
}

// gameStage.addEventListener('touchmove', (e) => {
//     console.log(e);
// })

// gameStage.addEventListener('touchend', (e) => {
//     console.log(e);
// })
