/**
 * 页面初始化的各种操作
 */
// window.onload = (() => {
//     loadingAnim(); // 加载资源时展示动画
// });
// let oriBottom, bottom38, moonDy, loadSpeed = 2;//用于计算月亮位置参数的初始化
// $(() => {
//     oriBottom = parseInt($('.rise-moon').css('bottom'));
//     bottom38 = window.innerHeight * 0.38; // 计算bottom38%时的高度值
//     moonDy = bottom38 + Math.abs(oriBottom);
//     loadingAnim(); // 加载资源时展示动画
// });

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
            // loadCount++;
            // loadDone();
        });
        loadCount++; //苹果不支持canplaythrough
        loadDone();
    }

     // 加载关卡文件
     for(let jsSrc of Config.resources.levelJs) {
        $('body').append(`<script src="${jsSrc}"></script>`)
    }
});

// let oriBottom = parseInt($('.rise-moon').css('bottom'));
// let bottom38 = window.innerHeight * 0.38; // 计算bottom38%时的高度值
// let moonDy = bottom38 + Math.abs(oriBottom);
// function loadingAnim() {
//     // $('.loadBg1').css('padding-top', (index, value) => {
//     //     return (parseInt(value) + window.innerHeight / (100 * Config.window.scale)) + 'px';
//     // });
//     $('.rise-moon').css('bottom', (index, value) => {
//         return (parseInt(value) + loadSpeed * Config.window.scale) + 'px';
//     });
   
//     // $('.load-percent').html(Math.floor(parseInt($('.loadBg1').css('padding-top')) / window.innerHeight * 100) + '%');
//     // loadDone();
//     let loadPer = Math.floor((parseInt($('.rise-moon').css('bottom')) - oriBottom) / moonDy * 100);
//     loadPer = loadPer == 100 ? 99 : loadPer;
//     $('.load-percent').html(loadPer + '%'); // bottom:38%为月亮目标位置
//     loadDone();

//     // if(parseInt($('.loadBg1').css('padding-top')) < window.innerHeight) {
//     //     requestAnimFrame(loadingAnim);
//     // }
//     if(parseInt($('.rise-moon').css('bottom')) < bottom38) {
//         requestAnimFrame(loadingAnim);
//     }
// }

// 判断资源是否加载完成
function loadDone() {
    if(loadCount == totalCount) {
        loadSpeed = 8;
        loadAll = true;
    }
    // if(parseInt($('.loadBg1').css('padding-top')) >= window.innerHeight && loadCount == totalCount) {
    if(parseInt($('.load-percent').html()) >= 99 && loadCount == totalCount) {
        $('.load-percent').html('100%');
        $('.load-percent').fadeOut(1000);
        $('.rise-moon img').addClass("scale-05");
        $('.rise-moon img').click(() => {
            $('#uiIndex').slideUp();
            $('#uiSelectLv').fadeIn(500);
        });
        // $('#loadAssets').slideUp();
        // $('#uiIndex').fadeIn(500);
        // if(localStorage.firstTime == undefined) {
        //     Xtoast({
        //         type: 'alert',
        //         message: '初次进行游戏请点击右下角的小书本查看教程！',
        //         callback: function(){
        //             localStorage.firstTime = 1;
        //         }
        //     });
        // }
    }
}

/**
 * 初始化音量播放按钮
 */
if(localStorage.playSound == "1") {
    $('.volume').attr('src', './assets/img/index/sound.png');
}else{
    $('.volume').attr('src', './assets/img/index/xsound.png');
}

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
if(localStorage.level == undefined || localStorage.level == null || localStorage.level == '') {
    initLevel();
    localStorage.playSound = 1; // 1为播放 0为不播放
    localStorage.first = '1';
}else{
    localStorage.first = '0';
}

updateStar();

// 初始化窗口大小
$('body').css({
    width: `${gameStage.width}px`,
    height: `${gameStage.height}px`,
});