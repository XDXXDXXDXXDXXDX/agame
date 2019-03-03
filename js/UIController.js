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
    $('#uiGamming').fadeIn(500);
})
// 返回到首页按钮
$('.go2index').click(() => {
    $('#uiStatistic').fadeOut();
    $('#uiInfo').fadeOut();
    $('#loadAssets').fadeOut();
    $('#uiGamming').fadeOut();
    $('#uiIndex').slideDown();
})

$('.levelBox').bind('click', function(){
    $('.selectLevel').slideUp();
    $('#Game').fadeIn(500);
    switch(this.id) {
        case 'Level1': 
            Game.start(Level1);
        break;
        case 'Level2': 
            Game.start(Level2);
        break;
        case 'Level3': 
            Game.start(Level3);
        break;
        case 'Level4': 
            Game.start(Level4);
        break;
        case 'Level5': 
            Game.start(Level5);
        break;
    }
})

