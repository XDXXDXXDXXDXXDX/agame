/**
 * 反射物体需要按照可能性存入数组中
 */
let Level1 = {
    level: 1,
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
        y: 600, // 发射器y坐标，激光结束的y坐标
        deg: 0,
        icon: imgBox['homeDark1'], // 发射器图标
        activeIcon: imgBox['homeLight1'],
        width: Config.objSize.lightHome.width, // 发射器宽度
        height: Config.objSize.lightHome.height // 发射器高度
    }, 
    mirror: [  
        {
            name: 'mirrorA',
            x: 115, // 发射器x坐标，激光开始的x坐标
            y: 191, // 发射器y坐标，激光结束的y坐标
            deg: 330,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
        {
            name: 'mirrorB',
            x: 210, // 发射器x坐标，激光开始的x坐标
            y: 188, // 发射器y坐标，激光结束的y坐标
            deg: 180,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },   
        {
            name: 'mirrorC',
            x: 160, // 发射器x坐标，激光开始的x坐标
            y: 184, // 发射器y坐标，激光结束的y坐标
            deg: 10,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
        {
            name: 'mirrorD',
            x: 253, // 发射器x坐标，激光开始的x坐标
            y: 206, // 发射器y坐标，激光结束的y坐标
            deg: 45,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },
        {
            name: 'mirrorE',
            x: 292, // 发射器x坐标，激光开始的x坐标
            y: 212, // 发射器y坐标，激光结束的y坐标
            deg: 330,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },   
        {
            name: 'mirrorF',
            x: 314, // 发射器x坐标，激光开始的x坐标
            y: 174, // 发射器y坐标，激光结束的y坐标
            deg: 270,
            icon: imgBox['mirror'], // 发射器图标
            width: Config.objSize.mirror.width, // 发射器宽度
            height: Config.objSize.mirror.height // 发射器高度
        },    
    ],
    init: function() {
        playSound(this.bgMusic, true);
        this.cloud = [
            {
                name: 'cloudA',
                x: 270, // 发射器x坐标，激光开始的x坐标
                y: 400, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 1.5, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [5, 5, 5, 5],
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
                cut: [5, 5, 5, 5],
            },
        ];

        return true;
    },
    win: function({lasersNum}) {
        let starNum = 1;
        if(lasersNum <= 3) {
            starNum = 3;
        }else if(lasersNum <= 5) {
            starNum = 2;
        }
        updateLvInfo({
            lv: 1,
            pass: true,
            star: starNum
        });
        updateLvInfo({
            lv: 3,
            canPlay: true
        });
        updateStar();

        return starNum;
    }
}

nowLv = Level1; //默认为第一关