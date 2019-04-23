/**
 * 反射物体需要按照可能性存入数组中
 */
let Level5 = {
    level: 5,
    bgMusic: 'bgMusic5',
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 186, // 发射器x坐标，激光开始的x坐标
            y: 120, // 发射器y坐标，激光结束的y坐标
            deg: 90,
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
        icon: imgBox['homeDark5'], // 发射器图标
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
        this.wall = [
            // 左边的利爪
            {
                name: 'wallA',
                line: [{x:0, y:390}, {x:50, y:370}, {x:100, y:370}, {x:60, y:375}, {x:0, y:410}],
                move: {
                    x: -10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'wallB',
                line: [{x:0, y:420}, {x:70, y:400}, {x:100, y:395}, {x:130, y:400}, {x:70, y:410}, {x:0, y:440}],
                move: {
                    x: -10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'wallC',
                line: [{x:0, y:450}, {x:70, y:440}, {x:110, y:435}, {x:140, y:440}, {x:70, y:450}, {x:0, y:470}],
                move: {
                    x: -10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'wallD',
                line: [{x:0, y:490}, {x:50, y:500}, {x:90, y:470}, {x:50, y:510}, {x:0, y:520}],
                move: {
                    x: -10,
                    y: -10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },

            // 右边的利爪
            {
                name: 'rA',
                line: [{x:375, y:390}, {x:325, y:370}, {x:275, y:370}, {x:315, y:375}, {x:375, y:410}],
                move: {
                    x: 10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'rB',
                line: [{x:375, y:420}, {x:305, y:400}, {x:275, y:395}, {x:245, y:400}, {x:305, y:410}, {x:375, y:440}],
                move: {
                    x: 10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'rC',
                line: [{x:375, y:450}, {x:305, y:440}, {x:265, y:435}, {x:235, y:440}, {x:305, y:450}, {x:375, y:470}],
                move: {
                    x: 10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'rD',
                line: [{x:375, y:490}, {x:325, y:500}, {x:265, y:470}, {x:325, y:510}, {x:375, y:520}],
                move: {
                    x: 10,
                    y: -10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },

            // 闪电右
            {
                name: 'lightA',
                line: [{x:575, y:190}, {x:600, y:170}, {x:585, y:170}, {x:630, y:140}, {x:620, y:140}, {x:610, y:140}, {x:650, y:110}, {x:630, y:110}, {x:700, y:60}, {x:670, y:60}, {x:760, y:20}, {x:760, y:40}, {x:650, y:120}, {x:680, y:120}],
                move: {
                    x: -324,
                    y: 100,
                    speed: 5,
                    regular: 'repeat', //reverse动画会反向播放
                }
            },
            // 闪电左
            {
                name: 'lightB',
                line: [{x:-200, y:90}, {x:-225, y:70}, {x:-210, y:70}, {x:-255, y:40}, {x:-245, y:40}, {x:-235, y:40}, {x:-275, y:10}, {x:-255, y:10}, {x:-325, y:-40}, {x:-295, y:-40}, {x:-385, y:-80}, {x:-385, y:-60}, {x:-275, y:20}, {x:-305, y:20}],
                move: {
                    x: 380,
                    y: 100,
                    speed: 6,
                    regular: 'repeat', //reverse动画会反向播放
                }
            }
        ];
        this.cloud = [
            {
                name: 'cloudB',
                x: 168, // 发射器x坐标，激光开始的x坐标
                y: 300, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 208,
                    y: 300,
                    speed: 0.6,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'cloudC',
                x: 0, // 发射器x坐标，激光开始的x坐标
                y: 30, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 1.5, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 50,
                    y: 40,
                    speed: 0.2,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'cloudD',
                x: 375, // 发射器x坐标，激光开始的x坐标
                y: 100, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 1.5, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 365,
                    y: 110,
                    speed: 0.2,
                    regular: 'reverse', //reverse动画会反向播放
                }
            }
        ];
        return 
    },
    win: function({lasersNum, wolfNum}) {
        let starNum = 3;
        if(wolfNum > 0 || lasersNum > 1) {
            starNum = 2;
        }
        updateLvInfo({
            lv: 5,
            pass: true,
            star: starNum
        });

        updateStar();

        return starNum;
    }
}