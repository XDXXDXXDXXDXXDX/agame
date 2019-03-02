var Config = {
    window: {
        width: 375,
        height: 667,
        scale: 1
    },
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
            'laserTransmitter': './assets/img/laserTransmitter.png',
            'lightStart': './assets/img/lightStart.png',
            'lightHome': './assets/img/lightHome.png',
            'lightInHome': './assets/img/lightInHome.png',
            'mirror': './assets/img/mirror.png',
        },
        musics: {
            'bgMusic1': './assets/sound/bgMusic1.mp3',
        },
        levelJs: [
            'js/level/level1.js'
        ]
    }
}

var deg = Math.PI / 180;
