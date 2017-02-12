/*
* @基类
* */
function E() {
    this.event = {};
}

E.prototype = {

    // 以事件名为key，值为数组，把fn存储到这个数组中
    on: function(type, fn) {
        (this.event[type] || (this.event[type] = [])).push(fn);
    },

    //  以事件名为key，取出对应的事件数组，依次执行里面的方法
    trigger: function(type, data) {
        (this.event[type] || []).forEach(function(fn) {
            fn(data || {});
        });
    }
}
