/**
 *
 * @author
 *
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.initData = function () {
        GameData.mapData = [];
        for (var i = 0; i < GameData.MaxRow; i++) {
            var arr = [];
            for (var t = 0; t < GameData.MaxColumn; t++) {
                arr.push(-2);
            }
            GameData.mapData.push(arr);
        }
        GameData.levelreq = new LevelRequire();
        GameData.elements = [];
        GameData.unusedElements = [];
        var len = GameData.MaxRow * GameData.MaxColumn;
        for (var q = 0; q < len; q++) {
            var ele = new GameElement();
            ele.id = q;
            GameData.elements.push(ele);
            GameData.unusedElements.push(q);
        }
        GameData.stageW = egret.MainContext.instance.stage.stageWidth;
        GameData.stageH = egret.MainContext.instance.stage.stageHeight;
    };
    /**未激活的地图格数*/
    GameData.unmapnum = 0;
    /**当前步数*/
    GameData.stepNum = 0;
    /**关卡需求步数*/
    GameData.levelStepNum = 0;
    /**关卡背景图*/
    GameData.levelBackgroundImageName = '';
    /**最大行数*/
    GameData.MaxRow = 8;
    /**最大列数*/
    GameData.MaxColumn = 8;
    /**激活的地图格数*/
    GameData.currentElementNum = 0;
    GameData.stageW = 0;
    GameData.stageH = 0;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map