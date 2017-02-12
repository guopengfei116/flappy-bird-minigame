var util = {
    extend: function() {
        var arg = arguments, argLen = arg.length;
        var target = arg[0], tmpObj = null;
        var i = 1, key;
        for(; i < argLen; i++) {
            tmpObj = arg[i];
            for(key in tmpObj) {
                if(tmpObj.hasOwnProperty(key)) {
                    target[key] = tmpObj[key];
                }
            }
        }
    },

    angleToRadian: function(angle) {
        return Math.PI / 180 * angle;
    },

    // 在指定范围内生成一个随机数
    random: function(min, max) {
        min = min || 0;
        max = max || 1;
        return Math.random() * (max - min) + min;
    }
}
