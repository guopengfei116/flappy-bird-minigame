/*
 * @游戏开始场景类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
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
function EntryScene(options) {
    E.call(this);
    BaseScene.call(this, options);
}

/*
 * @实例成员
 * @method { _initCoord } 计算文字和按钮坐标
 * @method { _initRole } 创建对象
 * @method { drawBackground } 绘制背景，draw依赖该方法
 * @method { draw } 绘制背景&角色
 * @method { isClickBox } 判断是否点到按钮，click依赖该方法
 * @method { click } 如果点到按钮触发gameRestart事件
 * @method { on } 监听事件
 * @method { trigger } 触发事件
 * */
util.extend(EntryScene.prototype, E.prototype, BaseScene.prototype, {

    /*
     * 对外暴露的点击操作，
     * 点击后判断是否点到按钮，
     * 如果点到触发gameStart事件
     * */
    click: function(e) {
        this.isClickBox(e) && this.trigger('gameStart');
    }
});
