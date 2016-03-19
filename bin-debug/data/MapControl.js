/**
 *
 * 地图控制器
 *
 */
var MapControl = (function () {
    function MapControl() {
    }
    var d = __define,c=MapControl,p=c.prototype;
    /**
     * 配置所有地图元素类型
     * <br>每盘游戏开始时执行一次
     */
    p.createElementAllMap = function () {
        this.createAllMap();
    };
    p.createElements = function (num) {
        var types = [];
        for (var i = 0; i < num; i++) {
            types.push(this.createType());
        }
        return types;
    };
    p.changeTypeByID = function (id) {
        GameData.elements[id].type = this.createType();
    };
    p.updateMapLocation = function () {
        var ids = [];
        var len = LinkLogic.lines.length;
        for (var i = 0; i < len; i++) {
            var l = LinkLogic.lines[i].length;
            for (var t = 0; t < l; t++) {
                var rel = false;
                var ll = ids.length;
                for (var r = 0; r < ll; r++) {
                    if (ids[r] == LinkLogic.lines[i][t]) {
                        rel = true;
                    }
                }
                if (!rel) {
                    this.changeTypeByID(LinkLogic.lines[i][t]);
                    ids.push(LinkLogic.lines[i][t]);
                }
            }
        }
        len = ids.length;
        var colarr = [];
        for (i = 0; i < len; i++) {
            rel = false;
            for (t = 0; t < colarr.length; t++) {
                if (colarr[t] == GameData.elements[ids[i]].location % GameData.MaxColumn) {
                    return true;
                }
            }
            if (!rel) {
                colarr.push(GameData.elements[ids[i]].location % GameData.MaxColumn);
            }
        }
        var colelids;
        len = colarr.length;
        for (i = 0; i < len; i++) {
            var newcolids = [];
            var removeids = [];
            for (t = GameData.MaxRow - 1; t >= 0; t--) {
                rel = false;
                for (var q = 0; q < ids.length; q++) {
                    removeids.push(ids[q]);
                    rel = true;
                }
                if (!rel) {
                    if (GameData.mapData[t][colarr[i]] != -1) {
                        newcolids.push(GameData[t][colarr[i]]);
                    }
                }
            }
            newcolids = newcolids.concat(removeids);
            for (t = GameData.MaxRow - 1; t > -0; t--) {
                if (GameData.mapData[t][colarr[i]] != -1) {
                    GameData.mapData[t][colarr[i]] = newcolids[0];
                    GameData.elements[newcolids[0]].location = t * GameData.MaxRow + colarr[i];
                    newcolids.shift();
                }
            }
        }
    };
    /**配置所有地图元素类型*/
    p.createAllMap = function () {
        var len = GameData.MaxRow * GameData.MaxColumn;
        var type = '';
        var havelink = true;
        var ztype = '';
        var htype = '';
        var id = 0;
        for (var i = 0; i < GameData.MaxColumn; i++) {
            for (var t = 0; t < GameData.MaxRow; t++) {
                while (havelink) {
                    type = this.createType();
                    //确保纵向不存在可消除元素
                    if (i > 1 && GameData.mapData[i - 1][t] != -1 && GameData.mapData[i - 2][t] != -1) {
                        if (GameData.elements[GameData.mapData[i - 1][t]].type == GameData.elements[GameData.mapData[i - 2][t]].type) {
                            ztype = GameData.elements[GameData.mapData[i - 1][t]].type;
                        }
                    }
                    if (t > 1 && GameData.mapData[i][t - 1] != -1 && GameData.mapData[i][t - 2] != -1) {
                        if (GameData.elements[GameData.mapData[i][t - 1]].type == GameData.elements[GameData.mapData[i][t - 2]].type) {
                            htype = GameData.elements[GameData.mapData[i][t - 1]].type;
                        }
                    }
                    if (type != ztype && type != htype) {
                        havelink = false;
                    }
                }
                id = GameData.unusedElements[0];
                GameData.elements[id].type = type;
                GameData.elements[id].location = i * GameData.MaxRow + t;
                GameData.mapData[i][t] = id;
                GameData.unusedElements.shift();
                havelink = true;
                ztype = '';
                htype = '';
            }
        }
    };
    /**创建随机类型*/
    p.createType = function () {
        return GameData.elementsTypes[Math.floor(Math.random() * GameData.elementsTypes.length)].toString();
    };
    return MapControl;
}());
egret.registerClass(MapControl,'MapControl');
//# sourceMappingURL=MapControl.js.map