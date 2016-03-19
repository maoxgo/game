/**
 *
 * @author
 *
 */
var LevelRequire = (function () {
    function LevelRequire() {
        this.reqElements = [];
    }
    var d = __define,c=LevelRequire,p=c.prototype;
    p.getLevelReqNum = function () {
        return this.reqElements.length;
    };
    p.addElement = function (type, num) {
        var ele = new LevelRequireElement();
        ele.num = num;
        ele.type = type;
        this.reqElements.push(ele);
    };
    p.openChange = function () {
        this.reqElements = [];
    };
    p.changeReqNum = function (type, num) {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqElements[i].type == type) {
                this.reqElements[i].num -= num;
                return;
            }
        }
    };
    p.isClear = function () {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqElements[i].num > 0) {
                return false;
            }
        }
        return true;
    };
    return LevelRequire;
}());
egret.registerClass(LevelRequire,'LevelRequire');
//# sourceMappingURL=LevelRequire.js.map