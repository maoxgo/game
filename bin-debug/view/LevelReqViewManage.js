/**
 *
 * @author
 *
 */
var LevelReqViewManage = (function () {
    function LevelReqViewManage(layer) {
        this._layer = layer;
        this.init();
    }
    var d = __define,c=LevelReqViewManage,p=c.prototype;
    p.init = function () {
        this.elements = new Array();
    };
    /**
     * 创建当前关卡的过关条件
     */
    p.createCurrentLevelReq = function () {
        var len = GameData.levelreq.getLevelReqNum();
        var el;
        for (var i = 0; i < len; i++) {
            if (this.elements.length <= i) {
                el = new LevelElementView();
                this.elements.push(el);
            }
            else {
                el = this.elements[i];
            }
            el.eltype = GameData.levelreq.reqElements[i].type;
            el.setTexture('e' + el.eltype + '_png');
            el.x = 43 + (5 + el.width) * i;
            el.y = 95;
            el.num = GameData.levelreq.reqElements[i].num;
            this._layer.addChild(el);
        }
        if (!this.stepNumText) {
            this.stepNumText = new egret.BitmapText();
            this.stepNumText.font = RES.getRes('number_fnt');
            this.stepNumText.x = GameData.stageW - 95;
            this.stepNumText.y = 90;
            this.stepNumText.scaleX = 1.5;
            this.stepNumText.scaleY = 1.5;
            this._layer.addChild(this.stepNumText);
            this.stepNumText.text = GameData.stepNum.toString();
        }
    };
    /**
     * 判断是否有指定类型
     */
    p.haveReqType = function (type) {
        var l = this.elements.length;
        for (var i = 0; i < l; i++) {
            if (this.elements[i].eltype == type) {
                return true;
            }
        }
        return false;
    };
    //通过类型，获取当前元素在视图中的位置信息
    p.getPointByType = function (type) {
        var p = new egret.Point();
        var l = this.elements.length;
        for (var i = 0; i < l; i++) {
            if (this.elements[i].eltype == type) {
                p.x = this.elements[i].x + this.elements[i].width / 2;
                p.y = this.elements[i].y + this.elements[i].height / 2;
            }
        }
        return p;
    };
    //更新数据
    p.update = function () {
        console.log('更新关卡数量数据');
        var len = GameData.levelreq.getLevelReqNum();
        for (var i = 0; i < len; i++) {
            this.elements[i].num = GameData.levelreq.reqElements[i].num;
        }
    };
    //更新步数信息
    p.updateStep = function () {
        this.stepNumText.text = GameData.stepNum.toString();
    };
    return LevelReqViewManage;
}());
egret.registerClass(LevelReqViewManage,'LevelReqViewManage');
