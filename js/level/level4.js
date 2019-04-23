/**
 * 反射物体需要按照可能性存入数组中
 */
let Level4 = {
    level: 4,
    bgMusic: 'bgMusic4',
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 320, // 发射器x坐标，激光开始的x坐标
            y: 70, // 发射器y坐标，激光结束的y坐标
            deg: 290,
            icon: imgBox['moon'], // 发射器图标
            width: Config.objSize.laserTransmitter.width, // 发射器宽度
            height: Config.objSize.laserTransmitter.height // 发射器高度
        }
    ],
    // 终点限制一个
    lightHome: {
        name: 'lightHomeA',
        x: 186, // 发射器x坐标，激光开始的x坐标
        y: 600, // 发射器y坐标，激光结束的y坐标
        deg: 0,
        icon: imgBox['homeDark4'], // 发射器图标
        activeIcon: imgBox['homeLight1'],
        width: Config.objSize.lightHome.width, // 发射器宽度
        height: Config.objSize.lightHome.height // 发射器高度
    }, 
    mirror: Level1.mirror,/*[  
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
    ],*/
    wolf: [
        {
            name: 'wolfA',
            x: 0, // 发射器x坐标，激光开始的x坐标
            y: 420, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['wolfMove'], // 发射器图标
            width: Config.objSize.wolf.width, // 发射器宽度
            height: Config.objSize.wolf.height, // 发射器高度
            move: {
                x: 186,
                y: 600,
                speed: 0.1,
            }
        },
        {
            name: 'wolfB',
            x: 0, // 发射器x坐标，激光开始的x坐标
            y: 560, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['wolfMove'], // 发射器图标
            width: Config.objSize.wolf.width, // 发射器宽度
            height: Config.objSize.wolf.height, // 发射器高度
            move: {
                x: 186,
                y: 600,
                speed: 0.2,
            }
        },
        {
            name: 'wolfC',
            x: 375, // 发射器x坐标，激光开始的x坐标
            y: 560, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['wolfMove'], // 发射器图标
            width: Config.objSize.wolf.width, // 发射器宽度
            height: Config.objSize.wolf.height, // 发射器高度
            move: {
                x: 186,
                y: 600,
                speed: 0.5,
            }
        },
        {
            name: 'wolfD',
            x: 375, // 发射器x坐标，激光开始的x坐标
            y: 580, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['wolfMove'], // 发射器图标
            width: Config.objSize.wolf.width, // 发射器宽度
            height: Config.objSize.wolf.height, // 发射器高度
            move: {
                x: 186,
                y: 600,
                speed: 0.1,
            }
        },
        {
            name: 'wolfE',
            x: 345, // 发射器x坐标，激光开始的x坐标
            y: 560, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['wolfMove'], // 发射器图标
            width: Config.objSize.wolf.width, // 发射器宽度
            height: Config.objSize.wolf.height, // 发射器高度
            move: {
                x: 186,
                y: 600,
                speed: 0.1,
            }
        }
    ],
    init: function() {
        playSound(this.bgMusic, true);
        // 墙面初始化，墙体数据会在游戏过程中改变，所以每次在初始化函数中进行
        this.cloud = [
            {
                name: 'cloudB',
                x: 100, // 发射器x坐标，激光开始的x坐标
                y: 300, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 1.5, // 发射器宽度
                height: Config.objSize.cloud.height * 1.5, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 120,
                    y: 320,
                    speed: 0.4,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'cloudC',
                x: 310, // 发射器x坐标，激光开始的x坐标
                y: 400, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 270,
                    y: 410,
                    speed: 0.6,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'cloudD',
                x: 150, // 发射器x坐标，激光开始的x坐标
                y: 500, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 1.5, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 170,
                    y: 500,
                    speed: 0.2,
                    regular: 'reverse', //reverse动画会反向播放
                }
            }
        ];
        return 
    },
    win: function({lasersNum, wolfNum}) {
        let starNum = 3;
        if(wolfNum > 1) {
            starNum = 1;
        }else if(wolfNum == 1) {
            starNum = 2;
        }
        updateLvInfo({
            lv: 4,
            pass: true,
            star: starNum
        });
        updateLvInfo({
            lv: 5,
            canPlay: true
        });
        updateStar();

        return starNum;
    }
}