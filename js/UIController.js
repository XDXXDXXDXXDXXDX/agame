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
    $('#uiIndex').slideUp();
    $('#uiSelectLv').fadeIn(500);
});
// 返回到首页按钮
$('.go2index').click(() => {
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
            message: '选择别的关卡吗？当前游戏进度将不会保存！',
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
            message: '确认重新开始当前关卡吗？当前记录将不会保存！',
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
$('.levelBox').bind('click', function(){
    if(!$(`#${this.id}`).hasClass("cant-play")) {
        $('#uiSelectLv').hide();
        $('#uiGamming').fadeIn(500);
    }
    switch(this.id) {
        case 'Level1': 
            Game.start(Level1);
        break;
        case 'Level2': 
            Game.start(Level2);
        break;
        case 'Level3': 
            if(!$('#Level3').hasClass("cant-play")) {
                Game.start(Level3);
            }
        break;
        case 'Level4': 
            if(!$('#Level4').hasClass("cant-play")) {
                Game.start(Level4);
            }
        break;
        case 'Level5': 
            if(!$('#Level5').hasClass("cant-play")) {
                Game.start(Level5);
            }  
        break;
    }
});

// 充值关卡等级
$('.reset-level').click(() => {
    initLevel();
    updateStar();
    $('#Level3').addClass('cant-play');
    $('#Level4').addClass('cant-play');
    $('#Level5').addClass('cant-play');
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
});
