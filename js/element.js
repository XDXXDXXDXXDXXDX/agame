class Element {
    constructor(opts) {
        this.x = opts.x; // 发射器x坐标，激光开始的x坐标
        this.y = opts.y; // 发射器y坐标，激光结束的y坐标
        this.deg = opts.deg; // 角度值，转换成弧度需要 * deg
        this.icon = opts.icon; // 发射器图标
        this.width = opts.width; // 发射器宽度
        this.height= opts.height; // 发射器高度
    }
}





