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
        soundBox[key].addEventListener('canplaythrough', () => {
            loadCount++;
            loadDone();
        });
    }
});


function loadingAnim() {
    $('.loadBg1').css('padding-top', (index, value) => {
        return (parseInt(value) + window.innerHeight / (100 * Config.window.scale)) + 'px';
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
        $('#uiIndex').fadeIn(500);
        // 加载关卡文件
        for(let jsSrc of Config.resources.levelJs) {
            $('body').append(`<script src="${jsSrc}"></script>`)
        }
    }
}

/**
 * 初始化音量播放按钮
 */
$('.volume').html(Config.playSound ? '<i class="fas fa-volume-up">' : '<i class="fas fa-volume-mute"></i>');

/**
 * 初始化画布
 */
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

// 初始等级和星星数量
// 如果是第一次打开则创建这个数据记录
if(localStorage.level == undefined) {
    let level = [];
    for(let i = 0; i < 5; i++) {
        level.push({
            lv: i + 1,
            pass: false,
            star: 0,
            canPlay: i < 2 ? true : false
        })
    }
    localStorage.level = JSON.stringify(level);
}
let levelInfo = JSON.parse(localStorage.level);
for(let lv of levelInfo) {
    if(lv.canPlay) {
        $(`#Level${lv.lv}`).removeClass("cant-play");
    }
    if(lv.pass) {
        for(let i = 0; i < lv.star; i++) {
            $(`#Level${lv.lv} .star img`)[i].src = "assets/img/starFill.png"
        }
    }
    
}

localStorage.level = JSON.stringify(levelInfo);















