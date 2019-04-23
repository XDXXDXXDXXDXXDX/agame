var Config = {
    window: {
        width: 375,
        height: 667,
        scale: 1,
        offectX: 0,
        offectY: 0
    },
    winTime: 100,
    playSound: true,
    objSize: {
        laserTransmitter: {
            width: 50,
            height: 50
        },
        lightStart: {
            width: 10,
            height: 10
        },
        lightHome: {
            width: 50,
            height: 50
        },
        // mirror: {
        //     width: 44,
        //     height: 5
        // },
        mirror: {
            width: 66,
            height: 16
        },
        cloud: {
            width: 96,
            height: 55
        },
        // 单只狼的尺寸
        wolf: {
            width: 44,
            height: 35
        },
        boom: {
            width: 16,
            height: 25
        },
        break: {
            width: 25,
            height: 25
        }
    },
    resources: {
        // 格式 name : src
        images: {
            'indexBg1': './assets/img/index/loadBg1.png',
            'indexBg2': './assets/img/index/loadBg2.png',
            'moon': './assets/img/moon.png',
            'boom': './assets/img/boom.png',
            'break': './assets/img/break.png',
            'lv1bg': './assets/img/lv1bg.png',
            'laserTransmitter': './assets/img/laserTransmitter.png',
            'lightStart': './assets/img/lightStart.png',
            'lightHome': './assets/img/lightHome.png',
            // 'homeDark': './assets/img/homeDark.png',
            'homeDark1': './assets/img/homeDark1.png',
            'homeDark2': './assets/img/homeDark2.png',
            'homeDark3': './assets/img/homeDark3.png',
            'homeDark4': './assets/img/homeDark4.png',
            'homeDark5': './assets/img/homeDark5.png',
            // 'homeLight': './assets/img/homeLight.png',
            'homeLight1': './assets/img/homeLight1.png',
            'lightInHome': './assets/img/lightInHome.png',
            'mirror': './assets/img/mirror.png',
            'wall': './assets/img/wallCut.jpg',
            'wall2': './assets/img/wallCut2.jpg',
            'wall3': './assets/img/wallCut3.png',
            'cloud': './assets/img/cloud.png',
            'cloud2': './assets/img/cloud2.png',
            'cloud3': './assets/img/cloud3.png',
            'wolf': './assets/img/wolf.gif',
            'wolfMove': './assets/img/wolfMove.png',
        },
        musics: {
            'bgMusic1': './assets/sound/bgMusic1.mp3',
            'bgMusic2': './assets/sound/bgMusic2.mp3',
            'bgMusic3': './assets/sound/bgMusic3.mp3',
            'bgMusic4': './assets/sound/bgMusic4.mp3',
            'bgMusic5': './assets/sound/bgMusic5.mp3',
        },
        levelJs: [
            'js/level/level1.js',
            'js/level/level2.js',
            'js/level/level3.js',
            'js/level/level4.js',
            'js/level/level5.js'
        ]
    }
}

var deg = Math.PI / 180;
