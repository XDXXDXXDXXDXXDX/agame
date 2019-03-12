var Config = {
    window: {
        width: 375,
        height: 667,
        scale: 1,
        offectX: 0,
        offectY: 0
    },
    winTime: 100,
    playSound: false,
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
            width: 30,
            height: 30
        },
        mirror: {
            width: 66,
            height: 8
        }
    },
    resources: {
        // 格式 name : src
        images: {
            'indexBg1': './assets/img/index/loadBg1.png',
            'indexBg2': './assets/img/index/loadBg2.png',
            'moon': './assets/img/moon.png',
            'lv1bg': './assets/img/lv1bg.png',
            'laserTransmitter': './assets/img/laserTransmitter.png',
            'lightStart': './assets/img/lightStart.png',
            'lightHome': './assets/img/lightHome.png',
            'homeDark': './assets/img/homeDark.png',
            'homeLight': './assets/img/homeLight.png',
            'lightInHome': './assets/img/lightInHome.png',
            'mirror': './assets/img/mirror.png',
            'wall': './assets/img/wallCut.jpg',
            'wall2': './assets/img/wallCut2.jpg',
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
