/**
 *
 * @author
 *
 */
var PropLogic = (function () {
    function PropLogic() {
    }
    var d = __define,c=PropLogic,p=c.prototype;
    PropLogic.useProp = function (proptype, ellocation) {
        switch (proptype) {
            case 0:
                PropLogic.tongse(ellocation);
                break;
            case 1:
                PropLogic.zhadan(ellocation);
                break;
            case 2:
                PropLogic.zhenghang(ellocation);
                break;
            case 3:
                PropLogic.zhenglie(ellocation);
                break;
            case 4:
                PropLogic.chanzi(ellocation);
                break;
        }
    };
    PropLogic.tongse = function (loc) {
        LinkLogic.lines = [];
        var arr = [];
        var type = GameData.elements[GameData.mapData[Math.floor(loc / 8)][loc % 8]].type;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == type) {
                    arr.push(GameData.mapData[i][t]);
                }
            }
        }
        LinkLogic.lines.push(arr);
    };
    PropLogic.zhadan = function (loc) {
        LinkLogic.lines = [];
        var i = Math.floor(loc / 8);
        var t = loc % 8;
        var arr = [];
        arr.push(GameData.elements[GameData.mapData[i][t]].id);
        //上
        if (i > 0 && GameData.mapData[i - 1][t] != -1) {
            arr.push(GameData.elements[GameData.mapData[i - 1][t]].id);
        }
        //下
        if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1) {
            arr.push(GameData.elements[GameData.mapData[i + 1][t]].id);
        }
        //左
        if (t > 0 && GameData.mapData[i][t - 1] != -1) {
            arr.push(GameData.elements[GameData.mapData[i][t - 1]].id);
        }
        //右
        if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1) {
            arr.push(GameData.elements[GameData.mapData[i][t + 1]].id);
        }
        LinkLogic.lines.push(arr);
    };
    PropLogic.zhenghang = function (loc) {
        LinkLogic.lines = [];
        var i = Math.floor(loc / 8);
        var arr = [];
        for (var t = 0; t < GameData.MaxColumn - 1; t++) {
            if (GameData.mapData[i][t] != -1)
                arr.push(GameData.elements[GameData.mapData[i][t]].id);
        }
        LinkLogic.lines.push(arr);
    };
    PropLogic.zhenglie = function (loc) {
        LinkLogic.lines = [];
        var t = loc % 8;
        var arr = [];
        for (var i = 0; i < GameData.MaxRow - 1; i++) {
            if (GameData.mapData[i][t] != -1)
                arr.push(GameData.elements[GameData.mapData[i][t]].id);
        }
        LinkLogic.lines.push(arr);
    };
    PropLogic.chanzi = function (loc) {
        LinkLogic.lines = [];
        LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(loc / 8)][loc % 8]].id]);
    };
    return PropLogic;
}());
egret.registerClass(PropLogic,'PropLogic');
//# sourceMappingURL=PropLogic.js.map