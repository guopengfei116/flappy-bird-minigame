/*
 * 管道类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.upImg: Image } 上面的管道，口朝下
 * @param { options.downImg: Image } 下面的管道，口朝上
 * @param { options.x: number } x轴坐标
 * @param { options.upY: number } 上面的管道y轴坐标
 * @param { options.downY: number } 下面的管道y轴坐标
 * @param { options.widthFrame: number } 图像一排有多少帧
 * @param { options.heightFrame: number } 图像一列有多少帧
 * @param { options.w: number } 宽度
 * @param { options.h: number } 高度
 * @param { options.cushionSpace: number } 第一根管道的缓冲距离
 * @param { options.LRSpace: number } 管道左右间距
 * @param { options.TBSpace: number } 管道上下间距
 * @param { options.minHeight: number } 管道最小高度
 * @param { options.maxHeight: number } 管道最大高度
 * @param { options.speed: number } 速度
 * @param { options.a: number } 加速度
 * */
function Pipe(options) {
    E.call(this);

    // 补充img属性，为了让BaseSprite能正确初始化宽高属性
    options.img = options.upImg;
    BaseSprite.call(this, options);

    this.upImg = options.upImg;
    this.downImg = options.downImg;
    this.cushionSpace = options.cushionSpace || 300;
    this.LRSpace = options.LRSpace || 150;
    this.TBSpace = options.TBSpace || 150;
    this.minHeight = options.minHeight || 50;
    this.maxHeight = options.maxHeight || this.cvs.height / 2;

    // 每秒加速度，每120秒，2分钟速度加一倍
    this.a = options.a || this.speed / 120;

    // x和y坐标
    this.x = this.cushionSpace + (this.w + this.LRSpace) * Pipe.total;
    this._initPipeY();
    Pipe.total++;
}

/*
 * @静态成员
 * @property { total } 统计实例数量
 * @method { init } 重置实例数量
 * */
util.extend(Pipe, {
    total: 0,
    init: function() {
        this.total = 0;
    }
});

/*
 * @实例成员
 * @method { _initPipeY } 初始化上下管道的Y轴坐标
 * @method { draw } 绘制
 * @method { update } 更新数据
 * */
util.extend(Pipe.prototype, {

    /*
     * 初始化上下管道的Y轴坐标：
     * 1、先随机生成上管道的高度
     * 2、然后上管道的y轴坐标 = 随机高度 - 管道图像高度
     * 3、下管道的y轴坐标 = 随机高度 + 管道上下间距
     * */
    _initPipeY: function() {
        var randomHeight = util.random(this.minHeight, this.maxHeight);
        this.downY = randomHeight - this.h
        this.upY = randomHeight + this.TBSpace;
    },

    /*
    * 1、绘制管道
    * 2、绘制管道对应的矩形路径
    * */
    draw: function() {
        this.ctx.drawImage(this.upImg, this.x, this.upY);
        this.ctx.drawImage(this.downImg, this.x, this.downY);
        this.ctx.rect(this.x, this.upY, this.w, this.h);
        this.ctx.rect(this.x, this.downY, this.w, this.h);
    },

    // 计算最新的y轴坐标 = 初始速度 * 时间 + 加速度 * 时间^2 / 2
    // 计算最新的下落速度 = 初始速度 + 加速度 * 时间
    update: function(delay) {
        this.x -= this.speed * delay + this.a * delay * delay / 2;
        this.speed = this.speed + this.a * delay;

        // 管道走出画布，重新生成管道的上下y轴坐标，再向右拼接，
        if (this.x < -this.w) {
            this.x += (this.w + this.LRSpace) * Pipe.total;
            this._initPipeY();
        }
    }
});
