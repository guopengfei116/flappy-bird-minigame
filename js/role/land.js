/*
 * @大地类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 图像资源
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } y轴坐标
 * @param { options.speed: number } 速度
 * */
function Land(options) {
    BaseSprite.call(this, options);
    this.x = this.w * Land.total;
    this.y = this.cvs.height - this.h;
    Land.total++;
}

/*
 * @静态成员
 * @property { total } 统计实例数量
 * @method { init } 重置实例数量
 * */
util.extend(Land, {
    total: 0,
    init: function() {
        this.total = 0;
    }
});

/*
 * @实例成员
 * @method { draw } 绘制
 * @method { update } 更新数据
 * */
util.extend(Land.prototype, {

    draw: function() {
        this.ctx.drawImage(this.img, this.x, this.y);
    },

    /*
     * 匀速运动，走出画布向右拼接
     * */
    update: function(delay) {
        this.x -= this.speed * delay;
        if (this.x < -this.w) {
            this.x += this.w * Land.total;
        }
    }
});
