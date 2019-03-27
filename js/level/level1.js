/**
 * 反射物体需要按照可能性存入数组中
 */
let Level1 = {
    bgMusic: 'bgMusic1',
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 50, // 发射器x坐标，激光开始的x坐标
            y: 50, // 发射器y坐标，激光结束的y坐标
            deg: 208,
            icon: imgBox['moon'], // 发射器图标
            width: Config.objSize.laserTransmitter.width, // 发射器宽度
            height: Config.objSize.laserTransmitter.height // 发射器高度
        }
    ],
    // 终点限制一个
    lightHome: {
        name: 'lightHomeA',
        x: 300, // 发射器x坐标，激光开始的x坐标
        y: 620, // 发射器y坐标，激光结束的y坐标
        deg: 0,
        icon: imgBox['homeDark'], // 发射器图标
        activeIcon: imgBox['homeLight'],
        width: Config.objSize.lightHome.width, // 发射器宽度
        height: Config.objSize.lightHome.height // 发射器高度
    }, 
    cloud: [
        {
            name: 'cloudA',
            x: 270, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['cloud3'], // 发射器图标
            width: Config.objSize.cloud.width * 1.5, // 发射器宽度
            height: Config.objSize.cloud.height, // 发射器高度
            cut: [10, 10, 10, 10],
            move: {
                x: 240,
                y: 400,
                speed: 0.5,
                regular: 'reverse', //reverse动画会反向播放
            }
        },
        {
            name: 'cloudB',
            x: 50, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['cloud3'], // 发射器图标
            width: Config.objSize.cloud.width , // 发射器宽度
            height: Config.objSize.cloud.height, // 发射器高度
            cut: [10, 10, 10, 10],
            move: {
                x: 30,
                y: 200,
                speed: 1,
                regular: 'reverse', //reverse动画会反向播放
            }
        },
        {
            name: 'cloudC',
            x: 170, // 发射器x坐标，激光开始的x坐标
            y: 300, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['cloud3'], // 发射器图标
            width: Config.objSize.cloud.width, // 发射器宽度
            height: Config.objSize.cloud.height, // 发射器高度
            cut: [10, 10, 10, 10],
        },
    ],
    mirror: [  
        {
            name: 'mirrorA',
            x: 155, // 发射器x坐标，激光开始的x坐标
            y: 191, // 发射器y坐标，激光结束的y坐标
            deg: 330,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
        {
            name: 'mirrorB',
            x: 229, // 发射器x坐标，激光开始的x坐标
            y: 188, // 发射器y坐标，激光结束的y坐标
            deg: 180,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },   
        {
            name: 'mirrorC',
            x: 191, // 发射器x坐标，激光开始的x坐标
            y: 185, // 发射器y坐标，激光结束的y坐标
            deg: 10,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
        {
            name: 'mirrorD',
            x: 262, // 发射器x坐标，激光开始的x坐标
            y: 204, // 发射器y坐标，激光结束的y坐标
            deg: 45,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },
        {
            name: 'mirrorE',
            x: 294, // 发射器x坐标，激光开始的x坐标
            y: 210, // 发射器y坐标，激光结束的y坐标
            deg: 330,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },   
        {
            name: 'mirrorF',
            x: 311, // 发射器x坐标，激光开始的x坐标
            y: 181, // 发射器y坐标，激光结束的y坐标
            deg: 270,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
    ],
    init: function() {
        playSound(this.bgMusic, true);

        return true;
    }
}