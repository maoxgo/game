/**
 *
 * @author
 *
 */
var ElementViewManage = (function (_super) {
    __extends(ElementViewManage, _super);
    function ElementViewManage(elementLayer) {
        _super.call(this);
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*==============================焦点相关控制===============================*/
        this._currentTapID = -1;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*=====================================动画播放控制================================*/
        this.removenum = 0;
        this.moveeleNum = 0;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
        /*==========================更新整个地图元素位置========================*/
        this.moveLocElementNum = 0;
        this._layer = elementLayer;
        this.init();
    }
    var d = __define,c=ElementViewManage,p=c.prototype;
    //初始化所有数据变量
    p.init = function () {
        this.elementviews = new Array();
        var l = GameData.MaxColumn * GameData.MaxRow;
        var el;
        for (var i = 0; i < l; i++) {
            el = new ElementView(this._layer);
            el.id = i;
            el.location = GameData.elements[i].location;
            this.elementviews.push(el);
            el.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this);
            el.addEventListener(egret.TouchEvent.TOUCH_TAP, this.elTap, this);
            el.addEventListener(ElementViewManageEvent.UPDATE_MAP, this.updateMap, this);
            el.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER, this.moveNewLocationOver, this);
        }
    };
    //元素被点击响应时间
    //判断当前元素焦点状态，是否需要改变，如果存在两个焦点，则触发TAP_TWO_ELEMENT,通知上层逻辑
    p.elTap = function (evt) {
        if (PropViewManage.proptype == -1) {
            if (evt.currentTarget instanceof ElementView) {
                var ev = evt.currentTarget;
                if (this._currentTapID != -1) {
                    if (ev.id == this._currentTapID) {
                        ev.setFocus(false);
                        this._currentTapID = -1;
                    }
                    else {
                        var event = new ElementViewManageEvent(ElementViewManageEvent.TAP_TWO_ELEMENT);
                        event.ele1 = this._currentTapID;
                        event.ele2 = ev.id;
                        this.dispatchEvent(event);
                    }
                }
                else {
                    ev.setFocus(true);
                    this._currentTapID = ev.id;
                }
            }
        }
        else {
            if (this._currentTapID != -1) {
                this._currentTapID = -1;
            }
            var evts = new ElementViewManageEvent(ElementViewManageEvent.USE_PROP_CLICK);
            evts.propToElementLocation = evt.currentTarget.location;
            this.dispatchEvent(evts);
        }
    };
    //设置焦点，将旧焦点取消，设置新对象焦点
    p.setNewElementFocus = function (location) {
        this.elementviews[this._currentTapID].setFocus(false);
        this.elementviews[location].setFocus(true);
        this._currentTapID = location;
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*=============================播放交互动画，交换后再返回=====================================*/
    //可以交换，但交换后没有发生位置移动
    //移除焦点
    //播放一个交换的动画，然后两个位置再换回来
    p.changeLocationAndBack = function (id1, id2) {
        if (this.elementviews[id1].focus) {
            this.elementviews[id1].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) < this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndBack(this.elementviews[id2].location, true);
            this.elementviews[id2].moveAndBack(this.elementviews[id1].location);
        }
        else {
            this.elementviews[id2].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) > this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndBack(this.elementviews[id2].location);
            this.elementviews[id2].moveAndBack(this.elementviews[id1].location, true);
        }
        this._currentTapID = -1;
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*=============================播放删除动画=====================================*/
    /**
     * 播放删除动画
     */
    p.changeLocationAndScale = function (id1, id2) {
        if (this.elementviews[id1].focus) {
            this.elementviews[id1].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) < this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndScale(this.elementviews[id2].location, true);
            this.elementviews[id2].moveAndScale(this.elementviews[id1].location);
        }
        else {
            this.elementviews[id2].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) > this._layer.getChildIndex(this.elementviews[id2])) {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndScale(this.elementviews[id2].location);
            this.elementviews[id2].moveAndScale(this.elementviews[id1].location, true);
        }
        this._currentTapID = -1;
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*=============================显示所有元素，并播放出场动画=====================================*/
    /**
     * 显示所有元素，并播放出场动画
     * <br>关卡开始时执行
     */
    p.showAllElement = function () {
        this._layer.removeChildren();
        var girdwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
        var ele;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    ele = this.elementviews[GameData.mapData[i][t]];
                    ele.setTexture('e' + GameData.elements[GameData.mapData[i][t]].type + '_png');
                    ele.x = ele.targetX();
                    ele.y = startY - ele.width;
                    //this._layer.addChild(ele);
                    ele.show((50 * GameData.MaxColumn * GameData.MaxRow - 50 * GameData.unmapnum) - (i * GameData.MaxRow + t) * 50);
                }
            }
        }
    };
    /**
     * 消除动画播放结束
     */
    p.removeAniOver = function (evt) {
        this.removenum++;
        if (this.removenum == 2) {
            this.removenum = 0;
            this.dispatchEvent(evt);
        }
    };
    //播放曲线动画，此类型动画用于可消除过关条件的情况
    p.playReqRemoveAn = function (id, tx, ty) {
        this.moveeleNum++;
        var el = this.elementviews[id];
        if (el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playCurveMove(tx, ty);
    };
    //播放放大动画，播放后直接删除，用于可删除元素，但元素类型不是关卡过关条件
    p.playRemoveAni = function (id) {
        this.moveeleNum++;
        var el = this.elementviews[id];
        if (el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playRemoveAni();
    };
    //删除动画完成，现在更新地图元素
    p.updateMap = function (evt) {
        this.moveeleNum--;
        if (this.moveeleNum == 0) {
            this.dispatchEvent(evt);
        }
    };
    p.updateMapData = function () {
        console.log('重新布局');
        var len = this.elementviews.length;
        this.moveLocElementNum = 0;
        for (var i = 0; i < len; i++) {
            this.elementviews[i].location = GameData.elements[i].location;
            this.elementviews[i].setTexture('e' + GameData.elements[i].type + '_png');
            this.elementviews[i].moveNewLocation();
        }
    };
    p.moveNewLocationOver = function (event) {
        this.moveLocElementNum++;
        if (this.moveLocElementNum == (GameData.MaxColumn * GameData.MaxRow)) {
            var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
            this.dispatchEvent(evt);
        }
    };
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    /*======================乱序操作，移动全部元素位置=============================*/
    p.updateOrder = function () {
        //乱序移动指令触发
        var len = this.elementviews.length;
        egret.Tween.removeAllTweens();
        for (var i = 0; i < len; i++) {
            this.elementviews[i].location = GameData.elements[i].location;
            this.elementviews[i].move();
        }
    };
    return ElementViewManage;
}(egret.EventDispatcher));
egret.registerClass(ElementViewManage,'ElementViewManage');
//# sourceMappingURL=ElementViewManage.js.map