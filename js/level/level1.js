/**
 * 反射物体需要按照可能性存入数组中
 */
let Level1 = {
    bgMusic: 'bgMusic1',
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 90,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.objSize.laserTransmitter.width, // 发射器宽度
            height: Config.objSize.laserTransmitter.height // 发射器高度
        }
    ],
    // 终点限制一个
    lightHome: {
            name: 'lightHomeA',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 0,
            icon: imgBox['lightHome'], // 发射器图标
            activeIcon: imgBox['lightInHome'],
            width: Config.objSize.lightHome.width, // 发射器宽度
            height: Config.objSize.lightHome.height // 发射器高度
    },
    mirror: [   
        {
            name: 'mirrorA',
            x: 280, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 45,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },   
        {
            name: 'mirrorAA',
            x: 320, // 发射器x坐标，激光开始的x坐标
            y: 220, // 发射器y坐标，激光结束的y坐标
            deg: 60,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
        {
            name: 'mirrorB',
            x: 280, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 320,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },
        {
            name: 'mirrorC',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 100, // 发射器y坐标，激光结束的y坐标
            deg: 180,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        }
    ]
}