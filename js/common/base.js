/*
 * 基类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.cvs: Canvas } 画布DOM
 * */
function Base(options) {
    this.ctx = options.ctx;
    this.cvs = options.ctx.canvas;
}

util.extend(Base.prototype, {
    draw: function() {},
    update: function() {}
});
