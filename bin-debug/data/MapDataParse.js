/**
 *
 * 创建地图数据
 *
 */
var MapDataParse = (function () {
    function MapDataParse() {
    }
    var d = __define,c=MapDataParse,p=c.prototype;
    /**
     * 创建地图数据
     * <br>输入val：不需要的地图格的一维位置参数数组
     * <br>功能：将存在的地图格的对应的Game.mapData值设为-1
     */
    MapDataParse.createMapData = function (val) {
        var len = val.length;
        GameData.unmapnum = len;
        var index = 0;
        for (var i = 0; i < len; i++) {
            index = val[i];
            var row = Math.floor(index / GameData.MaxColumn);
            var col = index % GameData.MaxRow;
            GameData.mapData[row][col] = -1;
        }
        GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len;
    };
    return MapDataParse;
}());
egret.registerClass(MapDataParse,'MapDataParse');
