/**
 * 反射物体需要按照可能性存入数组中
 */
let Level2 = {
    level: 2,
    bgMusic: 'bgMusic2',
    laserTransmitter: [
        {
            name: 'laserA',
            oriName: 'laserA',
            x: 150, // 发射器x坐标，激光开始的x坐标
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
        x: 30, // 发射器x坐标，激光开始的x坐标
        y: 560, // 发射器y坐标，激光结束的y坐标
        deg: 0,
        icon: imgBox['homeDark2'], // 发射器图标
        activeIcon: imgBox['homeLight1'],
        width: Config.objSize.lightHome.width, // 发射器宽度
        height: Config.objSize.lightHome.height // 发射器高度
    }, 
    mirror: Level1.mirror,
    /*[  
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
    init: function() {
        playSound(this.bgMusic, true);
        this.cloud = [
            {
                name: 'cloudB',
                x: 200, // 发射器x坐标，激光开始的x坐标
                y: 200, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width , // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 150,
                    y: 200,
                    speed: 0.5,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'cloudC',
                x: 250, // 发射器x坐标，激光开始的x坐标
                y: 300, // 发射器y坐标，激光结束的y坐标
                icon: imgBox['cloud3'], // 发射器图标
                width: Config.objSize.cloud.width * 1.2, // 发射器宽度
                height: Config.objSize.cloud.height, // 发射器高度
                cut: [10, 10, 10, 10],
                move: {
                    x: 200,
                    y: 300,
                    speed: 0.8,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
        ];
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
            // 下面的利爪
            {
                name: 'wallE',
                line: [{x:230, y:667}, {x:220, y:620}, {x:200, y:600}, {x:230, y:610}, {x:250, y:667}],
                move: {
                    x: -10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'wallF',
                line: [{x:200, y:667}, {x:190, y:620}, {x:160, y:560}, {x:200, y:610}, {x:220, y:667}],
                move: {
                    x: -10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'wallG',
                line: [{x:170, y:667}, {x:160, y:620}, {x:130, y:570}, {x:170, y:610}, {x:190, y:667}],
                move: {
                    x: -10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
            {
                name: 'wallH',
                line: [{x:120, y:667}, {x:110, y:650}, {x:120, y:620}, {x:130, y:650}, {x:150, y:667}],
                move: {
                    x: 10,
                    y: 10,
                    speed: 0.3,
                    regular: 'reverse', //reverse动画会反向播放
                }
            },
        ];
        return 
    },
    win: function({lasersNum}) {
        let starNum = 1;
        if(lasersNum <= 3) {
            starNum = 3;
        }else if(lasersNum <= 5) {
            starNum = 2;
        }
        updateLvInfo({
            lv: 2,
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