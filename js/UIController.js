// 通过修改uiindex的z-index保证动画切换的时候的页面层次

// 点击首页统计按钮
$('.statistic').click(() => {
    $('#uiStatistic').fadeIn(500);
    $('#uiIndex').slideUp();
});
// 点击首页相关信息按钮
$('.related-info').click(() => {
    $('#uiIndex').slideUp();
    $('#uiInfo').fadeIn(500);
});
// 开始游戏按钮
$('.start-game').click(() => {
    if(localStorage.first != undefined && localStorage.first == '1') {
        $('#uiInfo').slideDown();
    }
    $('#uiIndex').slideUp();
    $('#uiSelectLv').fadeIn(500);
});
// 返回到首页按钮
$('.go2index').click(() => {
    $('#uiSelectLv').fadeOut();
    $('#uiStatistic').fadeOut();
    $('#uiInfo').fadeOut();
    $('#loadAssets').fadeOut();
    $('#uiGamming').fadeOut();
    $('#uiIndex').slideDown();
});
// 从游戏中返回关卡选择
$('.back2select-lv').click(() => {
    if(Game.status == 'gaming') {
        Xtoast({
            type: 'confirm',
            message: '确认要退出关卡吗？',
            callback: function(){
                $('.menu').hide();
                Game.end();
                $('#uiGamming').fadeOut();
                $('#uiSelectLv').slideDown();
            }
        });
    }else{
        $('.menu').hide();
        Game.end();
        $('#uiGamming').fadeOut();
        $('#uiSelectLv').slideDown();
    }

    $('.lv-cta').hide();
    $(`#Level${nowLv.level}`).show();
});
// 从游戏中返回首页
$('.back2main-menu').click(() => {
    if(Game.status == 'gaming') {
        Xtoast({
            type: 'confirm',
            message: '确认返回主菜单吗？当前关卡游戏记录将不会保存！',
            callback: function(){
                $('.menu').hide();
                Game.end();
                $('#uiGamming').fadeOut();
                $('#uiIndex').slideDown();
            }
        });
    }else{
        $('.menu').hide();
        Game.end();
        $('#uiGamming').fadeOut();
        $('#uiIndex').slideDown();
    }
});
// 下一关
$('.next-lv').click(() => {
    if(nowLv.level == 1) {
        Game.start(Level2); 
    }else if(nowLv.level == 2) {
        Game.start(Level3); 
    }else if(nowLv.level == 3) {
        Game.start(Level4); 
    }else if(nowLv.level == 4) {
        Game.start(Level5); 
    }else if(nowLv.level == 5) {
        // 如果已经事最后一关要做的处理
        Game.start(Level5); 
    }

    $('.menu').hide();
});
// 重新开始当前关卡
$('.replay').click(() => {
    if(Game.status == 'gaming') {
        Xtoast({
            type: 'confirm',
            message: '确认重新开始当前关卡吗？',
            callback: function(){
                $('.menu').hide();
                Game.end();
                Game.start(nowLv); 
            }
        });
    }else{
        $('.menu').hide();
        Game.end();
        Game.start(nowLv); 
    }
});
// 关卡选择
$('.lv-public').click(() => {
    let lvNum = nowLv.level;
    if(!$(`#Level${lvNum}`).hasClass("cant-play")) {
        $('#uiSelectLv').hide();
        $('#uiGamming').attr('class', `lv${lvNum}`);
        $('#uiGamming').fadeIn(500);
        Game.start(nowLv);
    }
});

// 重置关卡等级
$('.reset-level').click(() => {
    initLevel();
    updateStar();
    $('#Level3').addClass('cant-play');
    $('#Level4').addClass('cant-play');
    $('#Level5').addClass('cant-play');
    $('.extra-ctn').fadeOut();
});

// 进入星星教程
$('.star-tur').click(() => {
    $('#uiSelectLv').slideUp();
    $('#uiStarTur').fadeIn(500);
});

// 返回关卡选择
$('.go2Select').click(() => {
    $('#uiStarTur').slideUp();
    $('#uiSelectLv').fadeIn(500);
    $('.lv-cta').hide();
    $(`#Level${nowLv.level}`).show();
});

// 查看下一关
$('.see-next-lv').click(() => {
    let lvNum = nowLv.level;
    $('.see-pre-lv').show();
    if(lvNum == 1) {
        nowLv = Level2;
    }else if(lvNum == 2){
        nowLv = Level3;
    }else if(lvNum == 3){
        nowLv = Level4;
    }else if(lvNum == 4){
        nowLv = Level5;
        $('.see-next-lv').hide(); //隐藏下一关按钮
    }
    xLeft(`#Level${lvNum}`, `#Level${lvNum + 1}`);
});
// 查看上一关
$('.see-pre-lv').click(() => {
    let lvNum = nowLv.level;
    $('.see-next-lv').show();
    if(lvNum == 2){
        nowLv = Level1;
        $('.see-pre-lv').hide(); //隐藏上一关按钮
    }else if(lvNum == 3){
        nowLv = Level2;
    }else if(lvNum == 4){
        nowLv = Level3;
    }else if(lvNum == 5){
        nowLv = Level4; 
    }
    xRight(`#Level${lvNum}`, `#Level${lvNum - 1}`);
});

// 帮助相关
$('.select-help').click(() => {
    $('.select-help').fadeOut();
}); 
$('.show-help').click(() => {
    $('.select-help').fadeIn();
});
$('.how-to-play').click(() => {
    $('.select-help').hide();
    $('#uiInfo').slideDown();
});
$('.get-3-star').click(() => {
    $('.select-help').hide();
    $('#uiStarTur').slideDown();
});
$('.close-tur').click(() => {
    $('#uiInfo').slideUp();
    $('#uiStarTur').slideUp();
});

// 额外操作
$('.extra-ctn').click(() => {
    $('.extra-ctn').fadeOut();
}); 
$('.lt-moon').click(() => {
    $('.extra-ctn').fadeIn();
});

// 禁止冒泡
let stopProArr = [
    '.fun-btn-box',
    '.see-lv',
    '.help-cta',
    '.extra-cta',
    '.lt-moon'
];
for(let select of stopProArr) {
    $(select).click((e) => {
        e.stopPropagation();
    });
}

