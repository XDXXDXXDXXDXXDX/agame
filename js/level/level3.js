/**
 * 反射物体需要按照可能性存入数组中
 */
let Level3 = {
    level: 3,
    bgMusic: 'bgMusic3',
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 250, // 发射器x坐标，激光开始的x坐标
            y: 150, // 发射器y坐标，激光结束的y坐标
            deg: 208,
            icon: imgBox['moon'], // 发射器图标
            width: Config.objSize.laserTransmitter.width, // 发射器宽度
            height: Config.objSize.laserTransmitter.height // 发射器高度
        }
    ],
    // 终点限制一个
    lightHome: {
        name: 'lightHomeA',
        x: 330, // 发射器x坐标，激光开始的x坐标
        y: 560, // 发射器y坐标，激光结束的y坐标
        deg: 0,
        icon: imgBox['homeDark3'], // 发射器图标
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
            x: -50, // 发射器x坐标，激光开始的x坐标
            y: 420, // 发射器y坐标，激光结束的y坐标
            icon: imgBox['wolfMove'], // 发射器图标
            width: Config.objSize.wolf.width, // 发射器宽度
            height: Config.objSize.wolf.height, // 发射器高度
            move: {
                x: 330,
                y: 560,
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
                x: 330,
                y: 560,
                speed: 0.2,
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
                y: 100, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 2, // 发射器宽度
                height: Config.objSize.cloud.height * 1.5, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 150,
                    y: 130,
                    speed: 0.4,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'cloudC',
                x: 350, // 发射器x坐标，激光开始的x坐标
                y: 300, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 2, // 发射器宽度
                height: Config.objSize.cloud.height * 1.5, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 360,
                    y: 300,
                    speed: 0.2,
                    regular: 'reverse', //reverse动画会反向播放
                }
            }
        ];
        
        this.wall = [
            // 闪电
            {
                name: 'wallA',
                line: [{x:575, y:390}, {x:600, y:370}, {x:585, y:370}, {x:630, y:340}, {x:620, y:340}, {x:610, y:340}, {x:650, y:310}, {x:630, y:310}, {x:700, y:260}, {x:670, y:260}, {x:760, y:220}, {x:760, y:240}, {x:650, y:320}, {x:680, y:320}],
                move: {
                    x: -380,
                    y: 100,
                    speed: 3.5,
                    regular: 'repeat', //reverse动画会反向播放
                }
            }
   
        ];
        return 
    },
    win: function({lasersNum, wolfNum}) {
        let starNum = 3;
        if(wolfNum == 1) {
            starNum = 2;
        }else if(wolfNum == 2) {
            starNum = 1;
        }
        updateLvInfo({
            lv: 3,
            pass: true,
            star: starNum
        });
        updateLvInfo({
            lv: 4,
            canPlay: true
        });
        updateStar();

        return starNum;
    }
}