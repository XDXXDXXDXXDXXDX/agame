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
    Xtoast({
        type: 'confirm',
        message: '选择别的关卡吗？当前关卡游戏记录将不会保存！',
        callback: function(){
            $('.game-menu').hide();
            Game.end();
            $('#uiGamming').fadeOut();
            $('#uiSelectLv').slideDown();
        }
    });
});
// 从游戏中返回首页
$('.back2main-menu').click(() => {
    Xtoast({
        type: 'confirm',
        message: '确认返回主菜单吗？当前关卡游戏记录将不会保存！',
        callback: function(){
            $('.game-menu').hide();
            Game.end();
            $('#uiGamming').fadeOut();
            $('#uiIndex').slideDown();
        }
    });
});
// 重新开始当前关卡
$('.replay').click(() => {
    Xtoast({
        type: 'confirm',
        message: '确认重新开始当前关卡吗？当前记录将不会保存！',
        callback: function(){
            $('.game-menu').hide();
            Game.end();
            Game.start(nowLv); 
        }
    });
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
            nowLv = Level1;
        break;
        case 'Level2': 
            Game.start(Level2);
            nowLv = Level2;
        break;
        case 'Level3': 
            if(!$('#Level3').hasClass("cant-play")) {
                Game.start(Level3);
                nowLv = Level3;
            }
        break;
        case 'Level4': 
            if(!$('#Level4').hasClass("cant-play")) {
                Game.start(Level4);
                nowLv = Level4;    
            }
        break;
        case 'Level5': 
            if(!$('#Level5').hasClass("cant-play")) {
                Game.start(Level5);
                nowLv = Level5;
            }  
        break;
    }
})

