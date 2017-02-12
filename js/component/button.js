/*
 * @按钮类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } y轴坐标
 * @param { options.w: number } 宽度
 * @param { options.h: number } 高度
 * @param { options.borderWidth : number } 边框宽度
 * @param { options.borderRadius : number } 圆角半径
 * @param { options.borderColor : string } 边框颜色
 * @param { options.text: string } 文本
 * @param { options.font : string } 字体样式
 * @param { options.textAlign : string } 水平对其方式
 * @param { options.textBaseline : string } 垂直对其方式
 * @param { options.textColor : string } 字体颜色
 * @param { options.maxWidth : number } 最大占用宽度
 * */
function Button(options) {
    E.call(this);
    Base.call(this, options);

    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.borderWidth = options.borderWidth || 4;
    this.borderRadius = options.borderRadius || 10;
    this.borderColor = options.borderColor || 'purple';

    this.text = options.text || '按钮';
    this.font = options.font || '400 20px 微软雅黑';
    this.textAlign = options.textAlign || 'center';
    this.textBaseline = options.textBaseline || 'middle';
    this.textColor = options.textColor || 'purple';
    this.maxWidth = options.maxWidth || this.w - 10;

    // 初始化文本对象
    this._initText();
}

/*
 * @实例成员
 * @method { draw } 绘制完整按钮
 * @method { drawBorder } 绘制按钮边框
 * */
util.extend(Button.prototype, E.prototype, Base.prototype, {

    // 初始化文本对象
    _initText: function() {
        this.textObj = new Text({
            ctx: this.ctx,
            x: this.x + this.w / 2,
            y: this.y + this.h / 2,
            text: this.text,
            font: this.font,
            color: this.textColor,
            maxWidth: this.maxWidth,
        });
    },

    // 绘制按钮和文本
    draw: function() {

        // 文本绘制
        this.textObj.draw();

        // 按钮绘制
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeStyle = this.borderColor;
        this._drawSide();
        this._drawCorner();
        this.ctx.stroke();
    },

    // 绘制按钮4条边
    _drawSide: function() {
        // 上边
        this.ctx.moveTo( this.x + this.borderRadius, this.y );
        this.ctx.lineTo( this.x + this.w - this.borderRadius, this.y );
        // 右边
        this.ctx.moveTo( this.x + this.w, this.y + this.borderRadius );
        this.ctx.lineTo( this.x + this.w, this.y + this.h - this.borderRadius );
        // 下边
        this.ctx.moveTo( this.x + this.w - this.borderRadius, this.y + this.h );
        this.ctx.lineTo( this.x + this.borderRadius, this.y + this.h );
        // 左边
        this.ctx.moveTo( this.x, this.y + this.h - this.borderRadius );
        this.ctx.lineTo( this.x, this.y + this.borderRadius );
        this.ctx.stroke();
    },

    // 绘制按钮4个圆角角落
    _drawCorner: function() {
        // 左上角
        this.ctx.moveTo( this.x, this.y + this.borderRadius );
        this.ctx.arcTo( this.x, this.y,
            this.x + this.borderRadius, this.y, this.borderRadius );
        // 右上角
        this.ctx.moveTo( this.x + this.w - this.borderRadius, this.y );
        this.ctx.arcTo( this.x + this.w, this.y,
            this.x + this.w, this.y + this.borderRadius, this.borderRadius );
        // 右下角
        this.ctx.moveTo( this.x + this.w, this.y + this.h - this.borderRadius );
        this.ctx.arcTo( this.x + this.w, this.y + this.h,
            this.x + this.w - this.borderRadius, this.y + this.h, this.borderRadius );
        // 左下角
        this.ctx.moveTo( this.x + this.borderRadius, this.y + this.h );
        this.ctx.arcTo( this.x, this.y + this.h,
            this.x, this.y + this.h - this.borderRadius, this.borderRadius );
    }
});
