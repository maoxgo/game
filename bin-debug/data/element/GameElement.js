/**
 *
 * @author
 *
 */
var GameElement = (function (_super) {
    __extends(GameElement, _super);
    function GameElement() {
        _super.apply(this, arguments);
        this.id = 0;
        this.location = 0;
    }
    var d = __define,c=GameElement,p=c.prototype;
    return GameElement;
}(BaseElement));
egret.registerClass(GameElement,'GameElement');
