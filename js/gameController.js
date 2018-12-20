var gameStage = document.getElementById('gameStage');
gameStage.width = window.innerWidth;
gameStage.height = window.innerHeight;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");

let laserA = new laserTransmitter(40, 130, 3, 1);
laserA.emitLaser();

let laserB = new laserTransmitter(50, 230, -3, 1);
laserB.emitLaser();

var laserArr = [];

laserArr.push(laserA);
laserArr.push(laserB);

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

    GSctx.clearRect(0, 0, stageWidth, stageHeight);
    laserArr.map((e, i) => {
        e.emitLaser();
    })
}

// gameStage.addEventListener('touchmove', (e) => {
//     console.log(e);
// })

// gameStage.addEventListener('touchend', (e) => {
//     console.log(e);
// })
