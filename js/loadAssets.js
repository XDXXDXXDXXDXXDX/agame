/**
 * 页面初始化的各种操作
 */
window.onload = (() => {
    loadingAnim(); // 加载资源时展示动画
})


let loadCount = 0; // 已加载资源个数
let totalCount = 0;

let imgBox = {}; // 图片容器 获取图片的方式：imgBox.imgName
let soundBox = {};
$(() => {
    for(let key in Config.resources.images) {
        totalCount++;
        imgBox[key] = new Image();
        imgBox[key].src = Config.resources.images[key];
        imgBox[key].onload = () => {
            loadCount++;
            loadDone();
        }; 
    }

    for(let key in Config.resources.musics) {
        totalCount++;
        soundBox[key] =  new Audio();
        soundBox[key].src = Config.resources.musics[key];
        soundBox[key].onload = () => {
            loadCount++;
            loadDone();
        }; 
    }

    for(let jsSrc of Config.resources.levelJs) {
        totalCount++;
        let script = document.createElement('script')
        script.src = jsSrc;
        script.onload = () => {
            loadCount++;
            loadDone();
        };
        $('body').append(script);
    }
});


function loadingAnim() {
    $('.loadBg1').css('padding-top', (index, value) => {
        return (parseInt(value) + window.innerHeight / 150) + 'px';
    });
    $('.load-percent').html(Math.floor(parseInt($('.loadBg1').css('padding-top')) / window.innerHeight * 100) + '%');
    loadDone();

    if(parseInt($('.loadBg1').css('padding-top')) < window.innerHeight) {
        requestAnimFrame(loadingAnim);
    }
}

// 判断资源是否加载完成
function loadDone() {
    if(parseInt($('.loadBg1').css('padding-top')) >= window.innerHeight && loadCount == totalCount) {
        $('#loadAssets').slideUp();
        // $('#uiIndex').fadeIn(500);
    }
}

var gameStage = document.getElementById('gameStage');
let xScale = window.innerWidth / Config.window.width;
let yScale = window.innerHeight / Config.window.height
Config.window.scale = xScale >= yScale ? yScale : xScale;
// 按照缩放比设置游戏画布的宽高
gameStage.width = Config.window.width * Config.window.scale;
gameStage.height = Config.window.height * Config.window.scale;
// 画布偏移
Config.window.offectX = window.innerWidth / 2 - gameStage.width / 2;
Config.window.offectY = window.innerHeight / 2 - gameStage.height / 2;
// 将画布居中
gameStage.style.marginLeft = `-${gameStage.width / 2}px`;
gameStage.style.marginTop = `-${gameStage.height / 2}px`;

var stageWidth = gameStage.width;
var stageHeight = gameStage.height;

var GSctx = gameStage.getContext("2d");

// 按照缩放比调整物体的尺寸
for(let obj of Object.values(Config.objSize)) {
    obj.width *= Config.window.scale;
    obj.height *= Config.window.scale;
}

















