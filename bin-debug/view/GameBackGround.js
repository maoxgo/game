/**
 *
 * 背景图
 *
 */
var GameBackGround = (function (_super) {
    __extends(GameBackGround, _super);
    function GameBackGround() {
        _super.call(this);
    }
    var d = __define,c=GameBackGround,p=c.prototype;
    /**
     * 更新背景图
     * <br>关卡开始时执行
     */
    p.changeBackground = function () {
        this.cacheAsBitmap = false;
        this.removeChildren();
        this.createBackGroundImage();
        this.createMapBg();
        this.createLevelRepBg();
        this.createStepBg();
        this.cacheAsBitmap = true;
    };
    p.createBackGroundImage = function () {
        if (!this.bgImage) {
            this.bgImage = new egret.Bitmap();
        }
        console.log(GameData.levelBackgroundImageName);
        this.bgImage.texture = RES.getRes(GameData.levelBackgroundImageName);
        this.bgImage.width = GameData.stageW;
        this.bgImage.height = GameData.stageH;
        this.addChild(this.bgImage);
        //道具栏
        var propbg = new egret.Bitmap();
        propbg.texture = RES.getRes('propbg_png');
        propbg.width = GameData.stageW;
        propbg.height = GameData.stageW / 5 + 20;
        propbg.y = GameData.stageH - propbg.height;
        this.addChild(propbg);
    };
    //游戏格子
    p.createMapBg = function () {
        if (!this.girdBg) {
            this.girdBg = new Array();
        }
        var gird;
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdWidth * GameData.MaxRow;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (this.girdBg.length <= (i * GameData.MaxColumn + t)) {
                        gird = new egret.Bitmap();
                        this.girdBg.push(gird);
                    }
                    else {
                        gird = this.girdBg[i * GameData.MaxColumn + t];
                    }
                    //console.log(i+":"+t);
                    gird.width = girdWidth;
                    gird.height = girdWidth;
                    gird.x = 20 + girdWidth * t;
                    gird.y = startY + girdWidth * i;
                    if ((i % 2 == 0 && t % 2 == 0) || (i % 2 == 1 && t % 2 == 1)) {
                        gird.texture = RES.getRes('elementbg1');
                    }
                    else {
                        gird.texture = RES.getRes('elementbg2');
                    }
                    this.addChild(gird);
                }
            }
        }
    };
    //关卡需求背景图
    p.createLevelRepBg = function () {
        var girdWidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes('levelreqbg_png');
        bg.width = GameData.levelreq.getLevelReqNum() * (10 + girdWidth) + 20;
        bg.height = girdWidth + 60;
        bg.x = 20;
        bg.y = 50;
        this.addChild(bg);
        var bgtxt = new egret.Bitmap();
        bgtxt.texture = RES.getRes('levelreqtitle_png');
        bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
        bgtxt.y = bg.y - 18;
        this.addChild(bgtxt);
    };
    //剩余步数
    p.createStepBg = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes('levelreqbg_png');
        bg.width = 100;
        bg.height = 100;
        bg.x = GameData.stageW - 110;
        bg.y = 50;
        this.addChild(bg);
        var bgtxt = new egret.Bitmap();
        bgtxt.texture = RES.getRes('sursteptitle_png');
        bgtxt.x = bg.x - (bg.width - bgtxt.width) / 2;
        bgtxt.y = bg.y + 10;
        this.addChild(bgtxt);
    };
    return GameBackGround;
}(egret.Sprite));
egret.registerClass(GameBackGround,'GameBackGround');
