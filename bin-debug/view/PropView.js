/**
 *
 * @author
 *
 */
var PropView = (function (_super) {
    __extends(PropView, _super);
    function PropView(type) {
        _super.call(this);
        this._type = -1;
        this.id = -1;
        this._num = 0;
        this._type = type;
        this.init();
    }
    var d = __define,c=PropView,p=c.prototype;
    d(p, "proptype"
        ,function () {
            return this._type;
        }
    );
    p.init = function () {
        this.createView();
        this.createNumText();
        this.addChild(this._view_activate);
        this.addChild(this._view_box);
        this.addChild(this._numText);
        this.setActivateState(true);
    };
    p.createNumText = function () {
        this._numText = new egret.BitmapText();
        this._numText.font = RES.getRes('number_fnt');
        this._numText.x = this._view_activate.width - 31;
    };
    p.createView = function () {
        var _interval = 15;
        var _width = (GameData.stageW - _interval * 6) / 5;
        if (!this._view_activate) {
            this._view_activate = new egret.Bitmap();
            this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
            this._view_activate.width = _width;
            this._view_activate.height = _width;
        }
        if (!this._view_box) {
            this._view_box = new egret.Bitmap();
            this._view_box.texture = RES.getRes('propbox_png');
            this._view_box.width = this._view_activate.width + 10;
            this._view_box.height = this._view_activate.height + 10;
            this._view_box.x = -5;
            this._view_box.y = -5;
        }
    };
    d(p, "num"
        ,function () {
            return this._num;
        }
        ,function (val) {
            this._num = val;
            this._numText.text = val.toString();
            if (val <= 0) {
                this.setActivateState(false);
            }
            else {
                this.setActivateState(true);
            }
        }
    );
    p.setActivateState = function (val) {
        this.touchEnabled = val;
        if (val) {
            this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
            this._view_box.texture = RES.getRes('propbox_png');
            this._numText.font = RES.getRes('nubmer_fnt');
        }
        else {
            this._view_activate.texture = RES.getRes(this.getDisableTexture(this._type));
            this._view_box.texture = RES.getRes('propboxdisable_png');
            this._numText.font = RES.getRes('nubmerdisable_fnt');
        }
    };
    p.getActivateTexture = function (type) {
        var texturename = '';
        switch (type) {
            case 0:
                texturename = 'tongse_png';
                break;
            case 1:
                texturename = 'zhadan_png';
                break;
            case 2:
                texturename = 'zhenghang_png';
                break;
            case 3:
                texturename = 'zhenglie_png';
                break;
            case 4:
                texturename = 'chanzi_png';
                break;
        }
        return texturename;
    };
    p.getDisableTexture = function (type) {
        var texturename = '';
        switch (type) {
            case 0:
                texturename = 'tongsedisable_png';
                break;
            case 1:
                texturename = 'zhadandisable_png';
                break;
            case 2:
                texturename = 'zhenghangdisable_png';
                break;
            case 3:
                texturename = 'zhengliedisable_png';
                break;
            case 4:
                texturename = 'chanzidisable_png';
                break;
        }
        return texturename;
    };
    p.setFocus = function (val) {
        if (val) {
            this._view_box.texture = RES.getRes('propboxactive_png');
        }
        else {
            this._view_box.texture = RES.getRes('propbox_png');
        }
    };
    return PropView;
}(egret.Sprite));
egret.registerClass(PropView,'PropView');
//# sourceMappingURL=PropView.js.map