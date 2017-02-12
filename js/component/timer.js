/*
 * @计时器类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.durationTime : number } 运行总时长,单位秒
 * @param { options.text: string } 默认文本描述
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } y轴坐标
 * @param { options.font : string } 字体样式
 * @param { options.textAlign : string } 水平对其方式
 * @param { options.textBaseline : string } 垂直对其方式
 * @param { options.color : string } 字体颜色
 * */
function Timer(options) {
    Text.call(this, options);
    this.durationTime = options.durationTime || 0;
    this.text = options.text || '您已坚持0小时0分钟0秒！';
    this.x = options.x || this.cvs.width;
    this.y = options.y || 0;
    this.textAlign = options.textAlign || 'right';
    this.textBaseline = options.textBaseline || 'top';
}

/*
 * @实例成员
 * @method { draw } 绘制
 * @method { update } 更新数据
 * */
util.extend(Timer.prototype, Text.prototype, {
    
    update: function(delay) {

        // 更新游戏总时长
        this.durationTime += delay;

        // 格式转换：durationTime = 3800 ==> 1小时，3分钟，20秒
        // 小时 = 3800 / (60 * 60) = Math.floor(1.xx) = 1
        // 分钟 = 3800 % (60 * 60) / 60 = Math.floor(3.xx) = 3
        // 秒 = 3800 % 60 = 20
        var hours = Math.floor( this.durationTime / (60 * 60) );
        var minutes = Math.floor( this.durationTime % (60 * 60) / 60 );
        var seconds = Math.floor( this.durationTime % 60 );
        this.text = '您已坚持' + hours + '小时' + minutes + '分钟' + seconds + '秒!!!';
    }
});
