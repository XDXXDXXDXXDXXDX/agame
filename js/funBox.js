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

// 判断两线是否相交
// 原理参考https://www.2cto.com/kf/201111/112304.html和https://blog.csdn.net/u012260672/article/details/51941262
// p0p1第一条线段，p2p3第二条线段 p0p1p2p3均为一个坐标{x, y}
// 相交时返回交点坐标，不相交返回false
function isIntersect(p0, p1, p2, p3) {
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

