/*
 * @鸟类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 图像资源
 * @param { options.widthFrame: number } 图像一排有多少帧
 * @param { options.heightFrame: number } 图像一列有多少帧
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } y轴坐标
 * @param { options.currentFrame: number } 第几帧
 * @param { options.speed: number } 速度
 * @param { options.a: number } 加速度
 * @param { options.flyupSpeed: number } 向上飞行初始速度
 * @param { options.baseRotateRadian: number } 单位速度旋转多少弧度
 * @param { options.maxRotateRadian: number } 最大旋转弧度
 * @param { options.minRotateRadian: number } 最小旋转弧度
 * */
function Bird(options) {
    E.call(this);
    BaseSprite.call(this, options);

    // 单位下降速度旋转0.1度 & 最大旋转45度 & 最小旋转-45度
    this.baseRotateRadian = options.baseRotateRadian || Math.PI / 1800
    this.maxRotateRadian = options.maxRotateRadian || Math.PI / 4;
    this.minRotateRadian = options.minRotateRadian || -Math.PI / 4;

    // 每秒加速度 & 向上飞行初始速度
    this.a = options.a || 240;
    this.flyupSpeed = options.flyupSpeed || -160;
}

/*
 * @实例成员
 * @method { draw } 绘制
 * @method { update } 更新数据
 * @method { flyup } 向上飞行一次
 * @method { on } 监听事件
 * @method { trigger } 触发事件
 * */
util.extend(Bird.prototype, {

    // 绘制小鸟
    draw: function() {

        // 根据速度计算小鸟旋转多少弧度，同时限制最大和最小弧度
        var rotateRadian = this.speed * this.baseRotateRadian;
        if ( rotateRadian > this.maxRotateRadian ) {
            rotateRadian = this.maxRotateRadian;
        }else if( rotateRadian < this.minRotateRadian ){
            rotateRadian = this.minRotateRadian;
        }

        /*
         * 绘制旋转小鸟：
         * 1、平移坐标系到小鸟的中心点
         * 2、旋转指定的弧度
         * 3、绘制小鸟，但是x和y为负的宽高各一半
         * */
        this.ctx.save();
        this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        this.ctx.rotate(rotateRadian);
        this.ctx.drawImage(this.img,
            this.w * this.currentFrame, 0, this.w, this.h,
            -this.w/2, -this.h/2, this.w, this.h);
        this.ctx.restore();
    },

    // 计算最新的y轴坐标 = 初始速度 * 时间 + 加速度 * 时间^2 / 2
    // 计算最新的下落速度 = 初始速度 + 加速度 * 时间
    update: function(delay) {
        this.y += this.speed * delay + this.a * delay * delay / 2;
        this.speed = this.speed + this.a * delay;

        // 刷新帧
        this.currentFrame = ++this.currentFrame % this.widthFrame;
    },

    // 小鸟上飞
    flyup: function() {
        this.speed = this.flyupSpeed;
    }
});
