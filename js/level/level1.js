/**
 * 反射物体需要按照可能性存入数组中
 */
let Level1 = {
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 90,
            icon: imgBox['laserTransmitter'], // 发射器图标
            width: Config.laserTransmitterSize.width, // 发射器宽度
            height: Config.laserTransmitterSize.height // 发射器高度
        }
    ],
    lightHome: [
        {
            name: 'lightHomeA',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 0,
            icon: imgBox['lightHome'], // 发射器图标
            width: Config.lightHomeSize.width, // 发射器宽度
            height: Config.lightHomeSize.height // 发射器高度
        },
        {
            name: 'lightHomeB',
            x: 250, // 发射器x坐标，激光开始的x坐标
            y: 300, // 发射器y坐标，激光结束的y坐标
            deg: 0,
            icon: imgBox['lightHome'], // 发射器图标
            width: Config.lightHomeSize.width, // 发射器宽度
            height: Config.lightHomeSize.height // 发射器高度
        }
    ],
    mirror: [
        {
            name: 'mirrorAA',
            x: 320, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 45,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.mirrorSize.width, // 发射器宽度
            height: Config.mirrorSize.height // 发射器高度
        },
        {
            name: 'mirrorA',
            x: 280, // 发射器x坐标，激光开始的x坐标
            y: 200, // 发射器y坐标，激光结束的y坐标
            deg: 45,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.mirrorSize.width, // 发射器宽度
            height: Config.mirrorSize.height // 发射器高度
        },       
        {
            name: 'mirrorB',
            x: 180, // 发射器x坐标，激光开始的x坐标
            y: 400, // 发射器y坐标，激光结束的y坐标
            deg: 320,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.mirrorSize.width, // 发射器宽度
            height: Config.mirrorSize.height // 发射器高度
        },
        {
            name: 'mirrorC',
            x: 150, // 发射器x坐标，激光开始的x坐标
            y: 100, // 发射器y坐标，激光结束的y坐标
            deg: 180,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.mirrorSize.width, // 发射器宽度
            height: Config.mirrorSize.height // 发射器高度
        }
    ]
}