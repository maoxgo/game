/**
 *
 * @author
 *
 */
var LevelGameDataParse = (function () {
    function LevelGameDataParse() {
    }
    var d = __define,c=LevelGameDataParse,p=c.prototype;
    /**
     * 解析关卡数据
     */
    LevelGameDataParse.parseLevelGameData = function (val) {
        GameData.stepNum = val.step;
        GameData.levelStepNum = val.step;
        GameData.elementsTypes = val.element;
        GameData.levelBackgroundImageName = val.levelbgimg;
        LevelGameDataParse.parseLevelReq(val.levelreq);
    };
    /**
     * 解析关卡需求
     */
    LevelGameDataParse.parseLevelReq = function (val) {
        GameData.levelreq.openChange();
        var len = val.length;
        for (var i = 0; i < len; i++) {
            GameData.levelreq.addElement(val[i].type, val[i].num);
        }
    };
    return LevelGameDataParse;
}());
egret.registerClass(LevelGameDataParse,'LevelGameDataParse');
//# sourceMappingURL=LevelGameDataParse.js.map