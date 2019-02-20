var Config = {
    laserTransmitterSize: {
        width: 50,
        height: 50
    },
    lightStartSize: {
        width: 10,
        height: 10
    },
    lightHomeSize: {
        width: 30,
        height: 30
    },
    mirrorSize: {
        width: 66,
        height: 8
    },
    resources: {
        // 格式 name : src
        images: {
            'indexBg1': './assets/img/index/loadBg1.png',
            'indexBg2': './assets/img/index/loadBg2.png',
            'laserTransmitter': './assets/img/laserTransmitter.png',
            'lightStart': './assets/img/lightStart.png',
            'lightHome': './assets/img/lightHome.png',
            'mirror': './assets/img/mirror.png',
        },
        levelJs: [
            'js/level/level1.js'
        ]
    }
}

var deg = Math.PI / 180;
