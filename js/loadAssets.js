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

















