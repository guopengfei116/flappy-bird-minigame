/*
 * @飞翔的小鸟类
 * @param { gameContainer: string } 游戏容器的选择器
 * */
function FlappyBird(gameContainer) {
    /*
     * 1、先获取容器
     * 2、创建canvas画布，获取上下文，设置画布大小，然后把canvas添加到容器中
     * 3、定义一个记录当前场景对象的属性
     * 4、定义一个存储所需资源的属性
     * */
    this.gameContainer = document.querySelector(gameContainer);

    // 游戏画面的宽高
    this.width = 800;
    this.height = 600;

    // 画布&绘图上下文
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = this.width;
    this.cvs.height = this.height;
    this.cvs.style.border = '1px solid red';

    // 游戏所需资源
    this.srcObj = {
        flappyBird: './imgs/flappy_bird.png',
        bird: './imgs/bird.png',
        land: './imgs/land.png',
        pipeDown: './imgs/pipe_down.png',
        pipeUp: './imgs/pipe_up.png',
        sky: './imgs/sky.png'
    };

    // 当前绘制的场景
    this.currentScene = null;

    // 暂停控制
    this.isPause = false;
}

FlappyBird.prototype = {
    constructor: FlappyBird,

    /*
     * @对外暴露的开始游戏接口
     * 把画布添加到容器中，
     * 初始化游戏所需资源和对象，
     * 设置当前场景为开始场景，
     * 然后调用render方法开始绘制
     * */
    /*
     * @入口方法
     * 1、调用initImg方法加载游戏的所需资源，通过回调的形式获取已加载好的资源
     * 2、资源加载完毕后调用initScene方法初始化所需的场景对象，然后监听每一个场景的事件
     * 3、修改this.currentScene属性为入场场景，然后调用render方法不断的绘制该场景画面
     * */
    run: function() {
        var self = this;
        this.gameContainer.appendChild(this.cvs);
        var imgLoad = new ImgLoad(this.srcObj);
        imgLoad.load();
        imgLoad.on('imgAllLoaded', function(imgObj) {
            self._initScene(imgObj);
            self.currentScene = self.entryScene;
            self._render();
            self._bind();
        });
    },

    /*
     * @负责加载游戏所需资源
     * 1、创建一个图片加载器对象
     * 2、然后调用load加载方法
     * 3、监听imgAllLoaded事件，当事件发生时执行传入的回调
     * */
    initImg: function(fn) {
        var imgLoad = new ImgLoad(this.srcObj);
        imgLoad.load();
        imgLoad.on('imgAllLoaded', fn);
    },

    /*
     * @负责计算两次绘制之间的间隔时间，然后不断调用当前场景的绘制方法
     * 1、定义currentTime、lastTime、delay变量用来计算间隔时间
     * 2、使用帧动画函数不断调用当前场景的绘制方法
     * */
    _render: function() {
        var self = this;
        var currentTime = Date.now(),
            lastTime = Date.now(),
            delay = 0;

        // 未暂停，计算延迟时间，绘制新画面，更新下一帧数据
        (function loop(){
            if ( !self.isPause ) {
                currentTime = Date.now();
                delay = (currentTime - lastTime) / 1000;
                lastTime = currentTime;
                self.ctx.clearRect(0, 0, self.cvs.width, self.cvs.height);
                self.ctx.beginPath();
                self.currentScene.draw(delay);
            }
            requestAnimationFrame( loop );
        }());
    },

    /*
     * @负责场景游戏所需的场景对象
     * 1、创建开始场景对象，然后监听该场景的gameStart事件，事件发生时调用start方法
     * 2、创建游戏场景对象，然后监听该场景的gameOver事件，事件发生时调用end方法
     * 3、创建结束场景对象，然后监听该场景的gameRestart事件，事件发生时调用restart方法
     * */
    _initScene: function(imgObj) {
        var self = this;

        /*
        * 开始场景，监听'开始游戏'事件
        * */
        this.entryScene = new EntryScene({
            ctx: this.ctx,
            img: imgObj.flappyBird,
            title: 'Flappy Bird',
            btnText: '开始游戏'
        });
        this.entryScene.on('gameStart', function() {
            self.start();
        });

        /*
         * 游戏场景，监听'游戏结束'事件
         * */
        this.gameScene = new GameScene({
            ctx: this.ctx,
            imgObj: imgObj
        });
        this.gameScene.on('gameOver', function() {
            var cvs = document.createElement('canvas');
            var ctx = cvs.getContext('2d');
            cvs.width = self.width;
            cvs.height = self.height;
            ctx.drawImage(self.cvs, 0, 0);
            self.overScene.img = cvs;
            self.end();
        });

        /*
         * 结束场景，监听'重新开始'事件
         * */
        this.overScene = new OverScene({
            ctx: this.ctx,
            title: 'Game Over',
            btnText: '重新开始'
        });
        this.overScene.on('gameRestart', function() {
            self.restart();
        });
    },

    /*
    * 浏览器点击事件监听，
    * 触发后调用场景对象的点击方法
    * */
    _bind: function() {
        var self = this;
        this.cvs.addEventListener('click', function(e) {
            self.currentScene.click(e);
        });
    },

    /*
     * @开始游戏
     * 1、把当前场景切换游戏场景
     * */
    start: function() {
        this.currentScene = this.gameScene;
    },

    /*
     * @重新开始游戏
     * 1、调用游戏场景的初始化角色方法initRole（让角色重新归为，让计时器清零）
     * 2、把当前场景切换游戏场景
     * */
    restart: function() {
        this.gameScene.initRole();
        this.currentScene = this.gameScene;
    },

    /*
     * @暂停游戏
     * 1、把isPause属性取反赋值
     * */
    pause: function() {
        this.isPause = !this.isPause;
    },

    /*
     * @结束游戏
     * 1、把当前场景切换结束场景
     * */
    end: function() {
        this.currentScene = this.overScene;
    }
};
