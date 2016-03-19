class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    
    private onAddToStage(evt:egret.EventDispatcher){
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig('resource/default.res.json','resource/')
    }
    
    private onConfigComplete(evt:RES.ResourceEvent){
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadGroup('game');
    }
    
    private onResourceLoadComplete(evt:RES.ResourceEvent){
        this.createGame();
    }
    
    private _gl:GameLogic;
    
    private createGame(){
        var gameLayer:egret.Sprite=new egret.Sprite();
        this.addChild(gameLayer);
        this._gl = new GameLogic(gameLayer);
    }
}