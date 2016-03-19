/**
 *
 * @author
 *
 */
var PropViewManage = (function () {
    function PropViewManage(layer) {
        this._currentID = -1;
        this._layer = layer;
        this.init();
    }
    var d = __define,c=PropViewManage,p=c.prototype;
    p.init = function () {
        this._props = new Array();
        this.createData();
    };
    p.createData = function () {
        for (var i = 0; i < 5; i++) {
            var prop = new PropView(i);
            prop.x = 15 + (5 + prop.width) * i;
            console.log('道具宽度', prop.width);
            prop.y = GameData.stageH - prop.height - 10; //-15
            this._layer.addChild(prop);
            this._props.push(prop);
            prop.num = Math.floor(Math.random() * 5);
            prop.id = i;
            prop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        }
    };
    p.click = function (evt) {
        if (this._currentID != -1) {
            this._props[this._currentID].setFocus(false);
            if (this._currentID == evt.currentTarget.id) {
                this._currentID = -1;
                PropViewManage.proptype = -1;
            }
            else {
                this._currentID = evt.currentTarget.id;
                this._props[this._currentID].setFocus(true);
                PropViewManage.proptype = this._props[this._currentID].proptype;
            }
        }
        else {
            this._currentID = evt.currentTarget.id;
            this._props[this._currentID].setFocus(true);
            PropViewManage.proptype = this._props[this._currentID].proptype;
        }
    };
    p.useProp = function () {
        console.log('当前焦点ID', this._currentID);
        this._props[this._currentID].num--;
        this._props[this._currentID].setFocus(false);
        this._currentID = -1;
        PropViewManage.proptype = -1;
    };
    PropViewManage.proptype = -1; //道具类型
    return PropViewManage;
}());
egret.registerClass(PropViewManage,'PropViewManage');
//# sourceMappingURL=PropViewManage.js.map