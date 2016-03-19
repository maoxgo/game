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
            //var l:number=LinkLogic.lines[i].length;            
            ids.push(LinkLogic.lines[i]);
        }
        len = ids.length;
        var colarr = [];
        for (i = 0; i < len; i++) {
            var tempCol = GameData.elements[ids[i]].location % GameData.MaxColumn;
            if (colarr.indexOf(tempCol) == -1) {
                colarr.push(tempCol);
            }
        }
        var colelids;
        len = colarr.length;
        for (i = 0; i < len; i++) {
            var newcolids = [];
            var removeids = [];
            for (var t = GameData.MaxRow - 1; t >= 0; t--) {
                //console.log(ids);
                if (ids.indexOf(GameData.mapData[t][colarr[i]]) >= 0) {
                    removeids.push(GameData.mapData[t][colarr[i]]);
                }
                else {
                    if (GameData.mapData[t][colarr[i]] != -1) {
                        newcolids.push(GameData.mapData[t][colarr[i]]);
                    }
                }
            }
            newcolids = newcolids.concat(removeids);
            //console.log(newcolids);
            for (t = GameData.MaxRow - 1; t >= 0; t--) {
                if (GameData.mapData[t][colarr[i]] != -1) {
                    var newcol = newcolids.shift();
                    GameData.mapData[t][colarr[i]] = newcol;
                    console.log(GameData.elements[newcol].location);
                    GameData.elements[newcol].location = t * GameData.MaxRow + colarr[i];
                    //newcolids.shift();
                    //console.log(newcolids);
                    console.log(GameData.elements[newcol].location);
                }
            }
            for (t = 0; t < removeids.length; t++) {
                this.changeTypeByID(removeids[t]);
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
