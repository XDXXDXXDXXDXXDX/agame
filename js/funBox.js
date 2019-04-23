// requestAnimationFrame 方法
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 60); // 每秒多少帧
};

// 清除requestAnimationFrame 方法
window.cancelAnimFrame  = window.requestAnimationFrame ? cancelAnimationFrame : clearTimeout;

/**
 * 判断两线是否相交
 * 原理参考https://www.2cto.com/kf/201111/112304.html和https://blog.csdn.net/u012260672/article/details/51941262
 * p0p1第一条线段，p2p3第二条线段 p0p1p2p3均为一个坐标{x, y}
 * 相交时返回交点坐标，不相交返回false 
 * */
function isIntersect(p0, p1, p2, p3) {
    if(p2 == undefined || p3 == undefined) {
        return false;
    }
    let p0p1 = {
        x: p1.x - p0.x, 
        y: p1.y - p0.y
    };
    let p0p2 = {
        x: p2.x - p0.x, 
        y: p2.y - p0.y
    };
    let p0p3 = {
        x: p3.x - p0.x, 
        y: p3.y - p0.y
    };
    let p0p2Xp0p1 = p0p2.x * p0p1.y - p0p2.y * p0p1.x;
    let p0p3Xp0p1 = p0p3.x * p0p1.y - p0p3.y * p0p1.x;

    let p2p3 = {
        x: p3.x - p2.x, 
        y: p3.y - p2.y
    };
    let p2p0 = {
        x: p0.x - p2.x, 
        y: p0.y - p2.y
    };
    let p2p1 = {
        x: p1.x - p2.x, 
        y: p1.y - p2.y
    };
    let p2p3Xp2p0 = p2p3.x * p2p0.y - p2p3.y * p2p0.x;
    let p2p3Xp2p1 = p2p3.x * p2p1.y - p2p3.y * p2p1.x;

    // == 0 的情况1、端点在另外一条线上 2、两线段共线（全部都为零）
    // 共线判定为不相交
    if(p0p2Xp0p1 == 0 && p0p3Xp0p1 == 0 && p2p3Xp2p0 == 0 && p2p3Xp2p1 == 0) {
        return false;
    }
    if(p0p2Xp0p1 * p0p3Xp0p1 <= 0 && p2p3Xp2p0 * p2p3Xp2p1 <= 0) {
        // 相交时计算交点
        let denominator = (p1.y - p0.y) * (p3.x - p2.x) - (p0.x - p1.x) * (p2.y - p3.y);
        let x  = ((p1.x - p0.x) * (p3.x - p2.x) * (p2.y - p0.y)
                + (p1.y - p0.y) * (p3.x - p2.x) * p0.x
                - (p3.y - p2.y) * (p1.x - p0.x) * p2.x) / denominator;
        let y  = ((p1.y - p0.y) * (p3.y - p2.y) * (p2.x - p0.x)
                + (p1.x - p0.x) * (p3.y - p2.y) * p0.y
                - (p3.x - p2.x) * (p1.y - p0.y) * p2.y) / denominator * -1;
                
        return {x, y};
    }

    return false;
}

/**
 * 判断线与圆的位置关系 待完成
 * 
 */
// function isIntersect(p0, p1, p2, p3) {
//     // 圆心到直线的距离
//     let d = Math.abs(((this.endY - this.y) * target.x + (this.x - this.endX) * target.y + 
//             (this.endX - this.x) * this.y - (this.endY - this.y) * this.x) /
//             Math.sqrt(((this.endY - this.y) ** 2 + (this.x - this.endX) ** 2)));
    
//     if(d < targrt.width / 2) {

//     }

//     return false;
// }

/**
 * 判断直线与矩形的位置关系
 * p0p1为直线两点，p2p3p4p5为矩形的四个点(矩形逆时针取点)
 */
function isIntersectRec(p0, p1, {p2, p3, p4, p5}) {
    // console.log(p2, p3, p4, p5)
    let node = isIntersect(p0, p1, p2, p3);
    if(node) {
        node.reg = 90;
        return node;
    }else if(node = isIntersect(p0, p1, p3, p4)) {
        node.reg = 0;
        return node;
    }else if(node = isIntersect(p0, p1, p4, p5)) {
        node.reg = 90;
        return node;
    }else if(node = isIntersect(p0, p1, p5, p2)) {
        node.reg = 0;
        return node;
    }

    return false;
}

/**
 * 发出射线
 */
function emitLaser(startX, startY, endX, endY) {
    GSctx.save();
    GSctx.beginPath(); // 开始绘画路径
    GSctx.moveTo(startX, startY); // 将画笔移到发射器所在坐标
    // 创建渐变的激光色
    let gradient = GSctx.createLinearGradient(startX, startY, endX, endY);
    // gradient.addColorStop("0","#ffcfcc");
    // gradient.addColorStop("1","#ff1000");
    gradient.addColorStop("0","#fffcce");
    gradient.addColorStop("1","#ffeb5f");
    GSctx.strokeStyle = gradient;
    GSctx.lineCap = "round";

    GSctx.lineTo(endX, endY); // 激光结束的坐标
    GSctx.lineWidth = 2 * Config.window.scale; // 激光的宽度
    GSctx.stroke(); // 绘画路径
    GSctx.restore();
}

/**
 * 计算反射角
 */
function calRefAngle(deg1, deg2) {
    let refAngle = 0;
    // let extraDeg = deg1 < 180 ? 0 : 180;
    // deg1 = deg1 < 180 ? deg1 : deg1 - 180;
    deg2 = deg2 < 180 ? deg2 : deg2 - 180; 
    // if(deg2 < 90) {
    //     if(deg1 > deg2) {
    //         let delta = 2 * deg2;
    //         if(deg1 == delta) {
    //             refAngle = 0
    //         }else if(deg1 > delta){
    //             refAngle = 360 - deg1 + 2 * deg2;
    //         }else if(deg1 < delta){
    //             refAngle = 2 * deg2 - deg1;
    //         }
    //     }else{
    //         refAngle = 2 * deg2 - deg1;
    //     }
    // }else{
    //     refAngle = 2 * deg2 - deg1;
    // }
    // refAngle = refAngle + extraDeg < 360 ? refAngle + extraDeg : refAngle + extraDeg - 360;
    refAngle = 2 * deg2 - deg1;
    if(refAngle >= 360) {
        refAngle = refAngle - 360;
    }else if(refAngle < 0) {
        refAngle = refAngle + 360;
    }
    
    return refAngle;
}

/**
 * 计算旋转后绘画的起始点和结束点
 */
function calNewXY(target) {
    let halfWidth = target.width / 2
    let tdeg = target.deg;
    let x = target.x;
    let y = target.y;
    if(tdeg > 180) {
        tdeg = tdeg - 180;
    }
    let sx = x - halfWidth * Math.cos(tdeg * deg);
    let sy = y - halfWidth * Math.sin(tdeg * deg);
    let ex = x + halfWidth * Math.cos(tdeg * deg);
    let ey = y + halfWidth * Math.sin(tdeg * deg);

    return {
        start: {
            x: sx,
            y: sy
        },
        end: {
            x: ex,
            y: ey
        },
    }
}

/**
 * 
 * @param {string} name 曲目名
 * @param {boolean} loop 是否循环
 */
function playSound(name, loop) {
    // if(Config.playSound == true) {
    if(localStorage.playSound == "1") {
        if(loop) {
            soundBox[name].loop = 'loop'; 
        }
        soundBox[name].currentTime = 0;  
        soundBox[name].play();
    }
}
function pauseSound(name) {
    soundBox[name].pause();
}

function toggleSound() {
    if(localStorage.playSound == "1") {
        pauseSound(nowLv.bgMusic);
        localStorage.playSound = "0";
        $('.volume').attr('src', './assets/img/index/xsound.png');
    }else{
        localStorage.playSound = "1";
        if(Game.status == 'gaming') {
            playSound(nowLv.bgMusic, true)
        }
        $('.volume').attr('src', './assets/img/index/sound.png');
    }
    // Config.playSound = !Config.playSound;
    // $('.volume').html(Config.playSound ? '<i class="fas fa-volume-up">' : '<i class="fas fa-volume-mute"></i>');
}

/**
 * 两点间距离
 */
function nodesD(p0, p1) {
    return Math.sqrt((p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2);
}

/**
 * 提示工具
 */
function Xtoast({
    type,
    message,
    callback
}) {
    if(type == 'alert') {
        $('body').append(`
            <div class="toast-mask" onclick="$('.toast-mask').remove()">
                <div class="toast" style="display:none">
                    <div class="toast-header"></div>
                    <div class="toast-body">
                        <p>${message}</p>
                    </div>
                    <div class="toast-footer">
                        <button class="toast-btn" onclick="(${callback})();$('.toast-mask').remove();">确定</button>
                    </div>
                </div>
            </div>
        `);
    }else if(type == 'confirm'){
        $('body').append(`
            <div class="toast-mask" onclick="$('.toast-mask').remove()">
                <div class="toast" style="display:none">
                    <div class="toast-header"></div>
                    <div class="toast-body">
                        <p>${message}</p>
                    </div>
                    <div class="toast-footer">
                        <button class="toast-btn" onclick="$('.toast-mask').remove()">取消</button>
                        <button class="toast-btn" onclick="(${callback})();$('.toast-mask').remove();">确定</button>
                    </div>
                </div>
            </div>
        `);
    }
    // 屏幕过大时重新定位
    // if(window.innerWidth > 375) {
    //     $('.toast').css({
    //         left: '50%',
    //         top: '50%',
    //         marginLeft: '-150px',
    //         marginTop: '-135px'
    //     })
    // }
    $('.toast').fadeIn();
    $('.toast').click((e) => {
        e.stopPropagation();  
    });
}

/**
 * 制作砖块 传两个端点值 needZoom是否需要缩放
 */
function bricksFactory(node1, node2, needZoom, deg) {
    let bricks = [];
    let n1 = {
        x: node1.x,
        y: node1.y,
    };
    let n2 = {
        x: node2.x,
        y: node2.y,
    };
    if(needZoom) {
        n1.x *= Config.window.scale;
        n1.y *= Config.window.scale;
        n2.x *= Config.window.scale;
        n2.y *= Config.window.scale;
    }
    let dx = n2.x - n1.x;
    let dy = n2.y - n1.y; 
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let _x = dx == 0 ? 1 : dx / adx; // x轴是否递增 为0的话则为1不影响计算，否则得到1为递增，-1为递减
    let _y = dy == 0 ? 1 : dy / ady; // y轴是否递增
    let xOy = adx > ady ? true : false; // 以x或y为尺度（选为尺度的将以1分割，另外一个以尺度分割的个数来确定分割的单位d，true为x,false为y）
    let d = xOy ? ady / adx : adx / ady; //较小的分度值

    if(xOy) {
        for(let i = 0; i < adx; i++) {
            bricks.push(new Brick({
                name: this.name + i,
                x: node1.x + i * _x,
                y: node1.y + d * i * _y,
                endX: node1.x + (i + 1) * _x,
                endY: node1.y + d * (i + 1) * _y,
                deg: deg,
                ori: this
            }));
        }
    }else{
        for(let i = 0; i < ady; i++) {
            bricks.push(new Brick({
                name: this.name + i,
                x: node1.x + d * i * _x,
                y: node1.y + i * _y,
                endX: node1.x + d * (i + 1) * _x,
                endY: node1.y + (i + 1) * _y,
                ori: this
            }));
        }
    }
    return bricks;
}

// 更行选择关卡的菜单页面
function updateStar() {
    let levelInfo = JSON.parse(localStorage.level);
    for(let lv of levelInfo) {
        if(lv.canPlay) {
            $(`#Level${lv.lv}`).removeClass("cant-play");
        }
        if(lv.pass) {
            for(let i = 0; i < lv.star; i++) {
                $(`#Level${lv.lv} .star-box img`)[i].src = "assets/img/starFill.png";
            }
        }else{
            $(`#Level${lv.lv} .star-box img`).attr('src', 'assets/img/starEmpty.png');
        }
        
    } 
}

// 初始化关卡等级
function initLevel() {
    let level = [];
    for(let i = 0; i < 5; i++) {
        level.push({
            lv: i + 1,
            pass: false,
            star: 0,
            canPlay: i < 2 ? true : false
        })
    }
    localStorage.level = JSON.stringify(level);
}
// 解锁所有关卡
$('.unlock-all').click(() => {
    let levelInfo = JSON.parse(localStorage.level);
    for(let level of levelInfo) {
        level.canPlay = true;
    }

    localStorage.level = JSON.stringify(levelInfo);
    updateStar();
    $('.extra-ctn').fadeOut();
});

// 更新关卡信息
function updateLvInfo({lv, pass, star, canPlay}) {
    let levelInfo = JSON.parse(localStorage.level);
    for(let level of levelInfo) {
        if(level.lv == lv) {
            level.pass = pass ? pass : level.pass;
            level.star = (star != undefined) && (star > level.star) ? star : level.star;
            level.canPlay = canPlay ? canPlay : level.canPlay;
        }
    }

    localStorage.level = JSON.stringify(levelInfo);
}

// 生成n~m的随机数,可以取n,m
function random(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

// 展开游戏菜单
function toggleMenu() {
    if($('.game-fun').css('display') == 'none') {
        $('.game-fun').fadeIn();
        $('.show-game-menu').attr('src', './assets/img/index/close.png');
    }else{
        $('.game-fun').fadeOut();
        $('.show-game-menu').attr('src', './assets/img/index/menu.png');
    }
}

// XDXUI切换效果
function xLeft(s1, s2) { 
    $(s1).css({
        position: 'absolute',
        left: 0,
        top: 0
    });
    $(s2).css({
        position: 'absolute',
        left: '100%',
        top: 0
    });
    $(s2).show();
    $(s1).animate({left:'-100%'}, function() {
        $(s1).hide();
        $(s1).css({
            position: '',
            left: '',
            top: ''
        });
    });
    $(s2).animate({left:0}, function() {
        $(s2).css({
            position: '',
            left: '',
            top: ''
        });
    });
}
function xRight(s1, s2) { 
    $(s1).css({
        position: 'absolute',
        left: 0,
        top: 0
    });
    $(s2).css({
        position: 'absolute',
        left: '-100%',
        top: 0
    });
    $(s2).show();
    $(s1).animate({left:'100%'}, function() {
        $(s1).hide();
        $(s1).css({
            position: '',
            left: '',
            top: ''
        });
    });
    $(s2).animate({left:0}, function() {
        $(s2).css({
            position: '',
            left: '',
            top: ''
        });
    });
}