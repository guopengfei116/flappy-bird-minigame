/*
 * 基类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 图像资源
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } y轴坐标
 * @param { options.widthFrame: number } 图像一排有多少帧
 * @param { options.heightFrame: number } 图像一列有多少帧
 * @param { options.w: number } 单角色宽
 * @param { options.h: number } 单角色高
 * @param { options.currentFrame: number } 第几帧
 * @param { options.speed: number } 每秒速度
 * @param { options.a: number } 每秒加速度
 * */
function BaseSprite(options) {
    this.ctx = options.ctx;
    this.cvs = options.ctx.canvas;
    this.img = options.img;
    this.widthFrame = options.widthFrame || 1;
    this.heightFrame = options.heightFrame || 1;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.w = options.img.width / this.widthFrame;
    this.h = options.img.height / this.heightFrame;
    this.currentFrame = options.currentFrame || 0;
    this.speed = options.speed || 80;
    this.a = options.a || 0;
}
