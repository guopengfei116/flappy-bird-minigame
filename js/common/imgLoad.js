/*
* 接口文档：
* load: 只有调用load方法后，才会去加载图像资源
* on: 监听图片加载完毕的事件
* on -- imgLoaded: 这个事件在每一个图片加载完毕时，都会触发；触发时会把图片的名字和img对象传递给回调。
* on -- imgAllLoaded: 当所有图片加载完毕时，才会触发该事件；；触发时会把所有的图片资源传递过去。
* */

/*
* @图片加载器类
* @param { srcObj: Object } 以图片名为key，src为值的对象
* */
function ImgLoad(srcObj) {
    E.call(this);
    this.srcObj = srcObj;
    this.imgObj = {};
}

util.extend(ImgLoad.prototype, E.prototype, {
    load: function() {
        /*
         * 1、遍历得到每一个图像的src
         * 2、一个src创建一个img对象
         * 3、把创建的img对象存储起来
         * 4、统计要加载图片的数量
         * 5、然后给每一个img添加load事件，事件触发时，
         * 让一个已加载图片数量的变量累加，
         * 然后当这个变量的值大于等于要加载的图片总数，
         * 那么就可以触发imgAllLoaded事件了，触发时把所有加载好的图片传递过去。
         * */

        var that = this, key,
            imgLength = 0, img,
            imgLoadedTotal = 0;

        // 遍历得到每一个图像的src
        for( key in this.srcObj ) {

            // 统计要加载图片的总数
            imgLength++;

            // 根据src创建对应的img对象，然后存储起来
            img = new Image();
            img.src = this.srcObj[key];
            this.imgObj[key] = img;

            // 监听每一个img的load事件，当所有img都load完毕后，触发imgAllLoaded事件
            (function(key, img) {
                img.onload = function() {

                    // 一张图片加载完毕，触发imgLoaded事件
                    that.trigger('imgLoaded', { name: key, img: img });

                    // 当已加载图片的数量大于等于要加载的图片总数，那么触发imgAllLoaded事件
                    if (++imgLoadedTotal >= imgLength) {
                        that.trigger('imgAllLoaded', that.imgObj);
                    }
                };
            })(key, img);
        }
    }
});
