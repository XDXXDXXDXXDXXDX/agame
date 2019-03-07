class Element {
    constructor(opts) {
        this.name = opts.name;  // 发射器名称
        this.oriName = opts.oriName; // 光源名称 
        this.x = opts.x * Config.window.scale; // 发射器x坐标，激光开始的x坐标
        this.y = opts.y * Config.window.scale; // 发射器y坐标，激光结束的y坐标
        this.deg = opts.deg; // 角度值，转换成弧度需要 * deg
        this.icon = opts.icon; // 发射器图标
        this.width = opts.width * Config.window.scale; // 发射器宽度
        this.height= opts.height * Config.window.scale; // 发射器高度
    }
}





