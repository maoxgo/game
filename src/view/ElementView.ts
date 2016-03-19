/**
 *
 * @author 
 *
 */
class ElementView extends egret.Sprite {
    private thisparent:egret.Sprite;
	public constructor(tparent:egret.Sprite) {
    	  super();
        this.thisparent=tparent;
    	  this.init();
    	
	}
	
	public location:number=0;//位置编号，用于提供移动使用
	
	public _id:number=-1;
	public get id():number{
	    return this._id;
	}
	public set id(val:number){
	    this._id=val;
	}
	
	
	/*-----------------------元素位置 初始化相关功能-----------------------------*/
	private bitmap:egret.Bitmap;
	
	//初始化所有数据
	private init(){
	    this.touchEnabled=true;
	    this.touchChildren=false;
	    this.bitmap=new egret.Bitmap();
	    var bitwidth:number = (GameData.stageW-40)/GameData.MaxColumn;
	    this.bitmap.width=bitwidth-10;
	    this.bitmap.height=bitwidth-10;
	    this.bitmap.x = -1*bitwidth/2;
	    this.bitmap.y=-1*bitwidth/2;
	    this.addChild(this.bitmap);
	}
	
	//设置贴图
	public setTexture(val:string){
	    this.bitmap.texture = RES.getRes(val);
	}
	/*-------------------------------------------------------------------------------*/
	
	
	/*------------------------焦点管理相关---------------------------------------------*/
	private _focus:boolean=false;
	public get focus():boolean{
	    return this._focus;
	}
	private _focusMc:egret.MovieClip;
	//设置选中状态的焦点模式
	public setFocus(val:boolean){
	    if(val !=this._focus){
	        this._focus=val;
	        if(!this._focusMc){
	            var tex = RES.getRes('foucsmc_png');
	            var data = RES.getRes('foucsmc_json');
	            var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
	            this._focusMc = new egret.MovieClip(mcf.generateMovieClipData('foucsmc'));
	            this._focusMc.x = this._focusMc.width/-2;
	            this._focusMc.y = this._focusMc.height/-2;
	            this._focusMc.width = this.bitmap.width;
	            this._focusMc.height=this.bitmap.height;
	        }
	        if(val){
	            this.addChild(this._focusMc);
	            this._focusMc.play(-1);
	        }else{
	            if(this._focusMc.parent){
	                this._focusMc.stop();
	                this.removeChild(this._focusMc);
	            }
	        }
	    }
	}
	
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	
	/*------------------------------移动到新位置，乱序操作使用-----------------------*/
	public speed:number=700;
	//移动到新位置，使用cubicInOut算法移动，直线运动
	public move(){
	    var tw:egret.Tween = egret.Tween.get(this);
	    tw.to({x:this.targetX(),y:this.targetY()},this.speed,egret.Ease.cubicInOut);
	}
	
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	/*------------------------------显示元素，从上方掉落-----------------------------*/
	/*-------------------------掉落后添加到父级别显示列表-----------------------------*/
	public show(wait:number){
	    var tw:egret.Tween = egret.Tween.get(this);
	    tw.wait(wait,false);
	    tw.call(this.addThisToParent,this);
	    tw.to({x:this.targetX(),y:this.targetY()},this.speed,egret.Ease.bounceOut);
	}
	
	private addThisToParent(){
	    if(!this.parent){
	        this.thisparent.addChild(this);
	    }
	}
	
	public targetX():number{
	    var girdwidth:number = (GameData.stageW-40)/GameData.MaxColumn;
	    var xx:number=20+girdwidth*(this.location%GameData.MaxColumn)+girdwidth/2+5;
	    return xx;
	}
	
	public targetY():number{
	    var girdwidth:number=(GameData.stageW-40)/GameData.MaxColumn;
	    var startY:number = (GameData.stageH-(GameData.stageW-30)/6-60)-girdwidth*GameData.MaxColumn;
	    var yy:number = startY+girdwidth*(Math.floor(this.location/8))+girdwidth/2+5;
	    return yy;
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*-------------------------------移动并返回--------------------------------*/
	/*-----------------------------用于用户交换两个对象，但未找到能够连续消除的时候使用-------------------*/
	//移动到另外一个位置，然后再移动回来
	public moveAndBack(location:number,isscale:boolean=false){
	    var girdwidth:number=(GameData.stageW-40)/GameData.MaxColumn;
	    var xx:number = 20+girdwidth*(location%GameData.MaxColumn)+girdwidth/2+5;
	    var startY:number = (GameData.stageH-(GameData.stageW-30)/6-60)-girdwidth*GameData.MaxColumn;
	    var yy:number=startY+girdwidth*(Math.floor(location/8))+girdwidth/2+5;
	    //移动时候，不仅会移动位置，还会放大会缩小，移动回来时，scale都设置为1
	    var tw:egret.Tween = egret.Tween.get(this);
	    if(isscale){
	        tw.to({x:xx,y:yy,scaleX:1.2,scaleY:1.2},300,egret.Ease.cubicOut).call(this.back,this);
	    }else{
	        tw.to({x:xx,y:yy,scaleX:0.8,scaleY:0.8},300,egret.Ease.cubicOut).call(this.back,this);
	    }
	}
	private back(){
	    var tw:egret.Tween = egret.Tween.get(this);
	    tw.to({x:this.targetX(),y:this.targetY(),scaleX:1,scaleY:1},300,egret.Ease.cubicOut);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*-----------------------------此动画用于移动元素，然后消除-----------------------------------*/
	//移动到另外一个位置，然后再返回原始的scale
	public moveAndScale(location:number,isscale:boolean=false){
	    var girdwidth:number= (GameData.stageW-40)/GameData.MaxColumn;
        var xx: number = 20 + girdwidth * (location % GameData.MaxColumn) + girdwidth / 2 + 5;
        var startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;
        var yy: number = startY + girdwidth * (Math.floor(location / 8)) + girdwidth / 2 + 5;
        
        var tw:egret.Tween = egret.Tween.get(this);
        if(isscale) {
            tw.to({ x: xx,y: yy,scaleX: 1.4,scaleY: 1.4 },300,egret.Ease.cubicOut).call(this.backScale,this);
        } else {
            tw.to({ x: xx,y: yy,scaleX: 0.6,scaleY: 0.6 },300,egret.Ease.cubicOut).call(this.backScale,this);
        }
	}
	private backScale(){
	    var tw:egret.Tween = egret.Tween.get(this);
	    tw.to({scaleX:1,scaleY:1},300,egret.Ease.backOut).call(this.canRemove,this);
	}
	private canRemove(){
	    var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.REMOVE_ANIMATION_OVER);
	    this.dispatchEvent(evt);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	/*----------------此动画用于将元素移动到关卡积分位置，然后移除显示列表-----------------------------------*/
	//播放曲线动画
	public playCurveMove(tx:number,ty:number){
	    var tw:egret.Tween= egret.Tween.get(this);
	    tw.to({x:tx,y:ty},700,egret.Ease.quadOut).call(this.overCurveMove,this);
	}
	private overCurveMove(){
	    if(this.parent){
	        this.parent.removeChild(this);
	    }
	    var evt:ElementViewManageEvent=new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
	    this.dispatchEvent(evt);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*-----------------------------删除元素，当元素不属于关卡条件时，执行此动画--------------------------*/
	//播放直接消除动画，自己放大，然后缩回到原有大小，然后删除
	public playRemoveAni(){
	    var tw:egret.Tween = egret.Tween.get(this);
	    tw.to({scaleX:1.4,scaleY:1.4},300,egret.Ease.cubicInOut).to({scaleX:0.1,scaleY:0.1},300,egret.Ease.cubicInOut).call(this.removeAniCall,this);
	}
	private removeAniCall(){
	    if(this.parent){
	        this.parent.removeChild(this);
	    }
	    var evt:ElementViewManageEvent= new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
	    this.dispatchEvent(evt);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	/*-------------------------------移动到新位置，方块被消除后重新生成下落使用---------------------------*/
	//根据列编号，重新计算元素X轴位置，从起始Y轴开始播放下落动画
	public moveNewLocation(){
	    if(!this.parent){
	        var girdwidth:number =(GameData.stageW-40)/GameData.MaxColumn;
	        var startY:number=(GameData.stageH-(GameData.stageW-30)/6-60)-girdwidth*GameData.MaxColumn;
	        this.y = startY-this.width;
	        this.scaleX=1;
	        this.scaleY=1;
	        this.x = this.targetX();
	        this.thisparent.addChild(this);
	    }
	    
	    egret.Tween.get(this).to({x:this.targetX(),y:this.targetY()},this.speed,egret.Ease.bounceOut).call(this.moveNewLocationOver,this);
	}
	private moveNewLocationOver(){
	    var evt:ElementViewManageEvent=new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
	    this.dispatchEvent(evt);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
}
