// requestAnimationFrame 方法
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};

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
    let node = isIntersect(p0, p1, p2, p3);
    if(node) {
        return node;
    }else if(node = isIntersect(p0, p1, p3, p4)) {
        return node;
    }else if(node = isIntersect(p0, p1, p4, p5)) {
        return node;
    }else if(node = isIntersect(p0, p1, p5, p2)) {
        console.log(66666666)
        return node;
    }

    return false;
}

