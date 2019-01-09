window.onload = (() => {
    loadingAnim(); // 加载资源时展示动画
})


let loadCount = 0; // 已加载资源个数
let totalCount = 0;

let imgBox = {}; // 图片容器 获取图片的方式：imgBox.imgName
$(() => {
    for(let key in Config.resources.images) {
        totalCount++;
        imgBox[key] = new Image();
        imgBox[key].src = Config.resources.images[key];
        imgBox[key].onload = () => {
            loadCount++;
            loadDone();
        } 
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
        $('#uiIndex').fadeIn(500);
        Game.start();
    }
}

let opts = {
    corpId: req.body.corpId, //String 商家唯一识别id
    userId: req.body.userId,  //String 用户唯一识别id
    userInfo: {
        nickName:'',//	String	用户的名字
        gender:1,//		String	用户的性别，男为1，女为0
        city:'',//		String	用户所在城市
        province:'',//		String	用户所在省份
        country	:'',//	String	用户所在国家
        language:'',//		String	用户使用的语言
        ip:'',//		String	用户的IP地址
    },
    sysInfo: {
        tozSdkType:'HTML',     //String	用于何种系统的sdk，例如“Android“
        tozSdkVersion:'1.0.0',  //	String	sdk版本号
        brand:'',  //		String	设备品牌
        model:'',  //		String	设备型号
        pixelRatio:'',  //		String	设备像素比
        screenWidth:'',  //		String	设备屏幕宽度
        screenHeight:'',  //		String	设备屏幕高度
        system:'',  //		String	设备系统型号
        browser:'',
        browserVersion:'',
    },
    userGender: Number(req.body.userGender), //Int 用户性别
    userHeight: Number(req.body.userHeight), //Int 用户身高
    userWeight: Number(req.body.userWeight),  //Int 用户体重
    frontImgSrc: '',  //String 正面照的base64
    sideImgSrc: '', //String 侧面照的base64
    frontCameraAng: {XAng:0,YAng:0}, // 照片相关
    sideCameraAng: {XAng:0,YAng:0}, // 照片相关
    // measureInfo: ,
    hostname: '', //req.hostname.indexOf('emtailor')>=0? 'emtailor':'tozmodel',

}
















