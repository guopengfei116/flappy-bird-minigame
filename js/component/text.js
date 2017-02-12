/*
 * @文本类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.text: string } 文本
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } y轴坐标
 * @param { options.font : string } 字体样式
 * @param { options.textAlign : string } 水平对其方式
 * @param { options.textBaseline : string } 垂直对其方式
 * @param { options.color : string } 字体颜色
 * @param { options.maxWidth : number } 最大占用宽度
 * */
function Text(options) {
    Base.call(this, options);
    this.text = options.text;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.font = options.font || '24px 微软雅黑';
    this.textAlign = options.textAlign || 'center';
    this.textBaseline = options.textBaseline || 'middle';
    this.color = options.color || 'deeppink';
    this.maxWidth = options.maxWidth || undefined;
}

/*
 * @实例成员
 * @method { draw } 绘制
 * */
util.extend(Text.prototype, Base.prototype, {

    draw: function() {
        this.ctx.save();
        this.ctx.font = this.font;
        this.ctx.textAlign = this.textAlign;
        this.ctx.textBaseline = this.textBaseline;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, this.x, this.y, this.maxWidth);
        this.ctx.restore();
    }
});
