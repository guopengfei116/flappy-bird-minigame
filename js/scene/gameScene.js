/*
 * @游戏开始场景类
 * @param { options: Object } 参数配置
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.imgObj: Object } 图像资源
 * @param { options.pipeLRSpace: number } 管道左右间接
 * */
function GameScene(options) {
    E.call(this);
    this.ctx = options.ctx;
    this.cvs = this.ctx.canvas;
    this.imgObj = options.imgObj;
    this.pipeLRSpace = options.pipeLRSpace || 100;
    this.initRole();
}

/*
 * @实例成员
 * @method { _calculateRoleNumber } 计算角色所需数量
 * @method { initRole } 创建角色
 * @method { isBirdDie } 判断小鸟是否死亡
 * @method { draw } 绘制角色，更新数据
 * @method { on } 监听事件
 * @method { trigger } 触发事件
 * */
util.extend(GameScene.prototype, E.prototype, {

    /*
    * 计算角色所需数量
    * */
    _calculateRoleNumber: function(roleWidth) {
        return Math.ceil(this.ctx.canvas.width / roleWidth) + 1;
    },

    /*
     * 用来创建所需角色对象
     * */
    initRole: function() {
        this.roles = {
            sky: [],
            pipe: [],
            land: [],
            timer: [],
            bird: []
        };
        var i, len;

        // 重新统计实例总数
        Sky.init();
        Land.init();
        Pipe.init();

        // 天空
        len = this._calculateRoleNumber(this.imgObj.sky.width);
        for(i = 0; i < len; i++) {
            this.roles.sky.push(
                new Sky({
                    ctx: this.ctx,
                    img: this.imgObj.sky
                })
            );
        }

        // 管道
        len = this._calculateRoleNumber(this.imgObj.pipeUp.width + this.pipeLRSpace);
        for(i = 0; i < len; i++) {
            this.roles.pipe.push(
                new Pipe({
                    ctx: this.ctx,
                    downImg: this.imgObj.pipeDown,
                    upImg: this.imgObj.pipeUp,
                })
            );
        }

        // 大地
        len = this._calculateRoleNumber(this.imgObj.land.width);
        for(i = 0; i < len; i++) {
            this.roles.land.push(
                new Land({
                    ctx: this.ctx,
                    img: this.imgObj.land
                })
            );
        }

        // 计时器
        this.roles.timer.push(
            new Timer({
                ctx: this.ctx,
            })
        );

        // 小鸟
        this.roles.bird.push(
            new Bird({
                ctx: this.ctx,
                img: this.imgObj.bird,
                widthFrame: 3
            })
        );
    },

    /*
    * 判断小鸟是否死亡
    * */
    isBirdDie: function() {
        var bird = this.roles.bird[0];
        var landH = this.roles.land[0].h;

        // 撞向大地，传播死亡消息
        if (bird.y > this.cvs.height - landH - bird.h) {
            this.trigger('gameOver', {msg: '坠落大地'});
            return true;
        }
        // 飞出天空，传播死亡消息
        else if (bird.y < 0) {
            this.trigger('gameOver', {msg: '飞向上帝'});
            return true;
        }
        // 撞向管道，传播死亡消息
        else if(this.ctx.isPointInPath(bird.x + bird.w / 2, bird.y + bird.h / 2)) {
            this.trigger('gameOver', {msg: '撞击管道'});
            return true;
        }

        return false;
    },

    /*
    * 绘制游戏场景&更新数据
    * */
    draw: function(delay) {
        var self = this;
        var roleNames = Object.keys(this.roles);
        roleNames.forEach(function(roleName) {
            self.roles[roleName].forEach(function(role) {
                role.draw();
                self.isBirdDie();
                role.update(delay);
            });
        });
    },

    /*
     * 点击小鸟上飞
     * */
    click: function() {
        this.roles.bird[0].flyup();
    }
});
