loadingAnim(); // 加载资源时展示动画

let loadCount = 0; // 已加载资源个数
let totalCount = 0;

let imgBox = {}; // 图片容器 获取图片的方式：imgBox.imgName
$(() => {
    for(let key in imgSrc) {
        totalCount++;
        imgBox[key] = new Image();
        imgBox[key].src = imgSrc[key];
        imgBox[key].onload = () => {
            loadCount++;
            loadDone();
        } 
    }
});


function loadingAnim() {
    $('.loadBg2').css('padding-top', (index, value) => {
        return (parseInt(value) + window.innerHeight / 150) + 'px';
    });
    $('.load-percent').html(Math.floor(parseInt($('.loadBg2').css('padding-top')) / window.innerHeight * 100) + '%');
    loadDone();

    if(parseInt($('.loadBg2').css('padding-top')) < window.innerHeight) {
        requestAnimFrame(loadingAnim);
    }
}

// 判断资源是否加载完成
function loadDone() {
    if(parseInt($('.loadBg2').css('padding-top')) >= window.innerHeight && loadCount == totalCount) {
        $('#loadAssets').slideUp();
        // $('#uiIndex').fadeIn(500);
    }
}
















