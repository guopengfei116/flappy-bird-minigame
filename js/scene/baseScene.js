/*
 * @场景基类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 背景图
 * @param { options.title: string } 标题
 * @param { options.titleX: number } 标题x轴坐标
 * @param { options.titleY: number } 标题y轴坐标
 * @param { options.titleFont: string } 标题文本样式
 * @param { options.titleColor: string } 标题颜色
 * @param { options.btnX: string } 按钮x轴坐标
 * @param { options.btnY: string } 按钮y轴坐标
 * @param { options.btnW: string } 按钮宽度
 * @param { options.btnH: string } 按钮高度
 * @param { options.btnText: string } 按钮文本
 * @param { options.btnFont: string } 按钮文本样式
 * @param { options.btnTextColor: string } 按钮文本颜色
 * @param { options.btnBorderColor: string } 按钮边框颜色
 * */
function BaseScene(options) {
    this.ctx = options.ctx;
    this.cvs = this.ctx.canvas;
    this.img = options.img;
    this.title = options.title || 'Title';
    this.titleFont = options.titleFont || '900 30px 微软雅黑';
    this.titleColor = options.titleColor || 'red';

    this.btnW= options.btnW || 400;
    this.btnH = options.btnH || 100;
    this.btnText = options.btnText || 'button';
    this.btnFont = options.btnFont || '900 40px 微软雅黑';
    this.btnTextColor = options.btnTextColor || 'gold';
    this.btnBorderColor = options.btnBorderColor || 'gold';

    this._initCoord();
    this._initRole();
}

/*
 * @实例成员
 * @method { _initCoord } 计算文字和按钮坐标
 * @method { _initRole } 创建对象
 * @method { draw } 绘制
 * @method { isClickBox } 判断是否点到按钮
 * */
util.extend(BaseScene.prototype, {

    // 计算文字和按钮坐标
    _initCoord: function() {

        // 画布中心
        var centerX = this.cvs.width / 2,
            centerY = this.cvs.height / 2;

        // 按钮绘制在画布正中间
        this.btnX = centerX - this.btnW / 2;
        this.btnY = centerY - this.btnH / 2;

        // 标题绘制在按钮上面
        this.titleX = centerX;
        this.titleY = this.btnY - 50;
    },

    /*
     * @创建该场景所需对象
     * 1、创建文本对象和按钮对象，添加到this.roles里
     * */
    _initRole: function() {
        this.roles = {
            text: [],
            button: []
        };

        // 文字
        this.roles.text.push(
            new Text({
                ctx: this.ctx,
                text: this.title,
                x: this.titleX,
                y: this.titleY,
                font: this.titleFont,
                textBaseline: 'bottom',
                color: this.textColor
            })
        );

        // 按钮
        this.roles.button.push(
            new Button({
                ctx: this.ctx,
                x: this.btnX,
                y: this.btnY,
                w: this.btnW,
                h: this.btnH,
                text: this.btnText,
                font: this.btnFont,
                textColor: this.btnTextColor,
                borderColor: this.btnBorderColor,
            })
        );
    },

    // 如果有背景图，则绘制它
    drawBackground: function() {
        if (this.img) {
            this.ctx.save();
            this.ctx.drawImage(this.img, 0, 0);
            this.ctx.fillStyle = 'rgba( 100, 100, 100, 0.8 )';
            this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
            this.ctx.restore();
        }
    },

    /*
     * @负责调度该场景所有的角色
     * 1、遍历this.roles，得到里面所有的角色对象
     * 2、依次调用每一个对象的draw方法和update方法
     * */
    draw: function(delay) {
        var that = this;
        this.drawBackground();
        var roleNames = Object.keys(this.roles);
        roleNames.forEach(function(roleName) {
            that.roles[roleName].forEach(function(role) {
                role.draw();
                role.update(delay);
            });
        });
    },

    // 判断是否点到按钮
    isClickBox: function(e) {
        var clickX = e.pageX - this.cvs.offsetLeft,
            clickY = e.pageY - this.cvs.offsetTop;

        return clickX > this.btnX && clickX < this.btnX + this.btnW
                && clickY > this.btnY && clickY < this.btnY + this.btnH;
    }
});
