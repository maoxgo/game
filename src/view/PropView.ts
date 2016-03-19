/**
 *
 * @author 
 *
 */
class PropView extends egret.Sprite{
	public constructor(type:number) {
    	super();
    	this._type=type;
    	this.init();
	}
	
	//道具元素界面
	private _view_box:egret.Bitmap;
	private _view_activate:egret.Bitmap;
	private _numText:egret.BitmapText;
	private _type:number=-1;
	public id:number=-1;
	
	public get proptype():number{
	    return this._type;
	}
	
	private init(){
	    this.createView();
	    this.createNumText();
	    this.addChild(this._view_activate);
	    this.addChild(this._view_box);
	    this.addChild(this._numText);
	    this.setActivateState(true);
	}
	
	private createNumText(){
	    this._numText=new egret.BitmapText();
	    this._numText.font = RES.getRes('number_fnt');
	    this._numText.x = this._view_activate.width-31;
	}
	private createView(){
	    var _interval:number=15;
	    var _width:number=(GameData.stageW-_interval*6)/5;
	    if(!this._view_activate){
	        this._view_activate = new egret.Bitmap();
	        this._view_activate.texture=RES.getRes(this.getActivateTexture(this._type));
	        this._view_activate.width=_width;
	        this._view_activate.height=_width;
	    }
	    if(!this._view_box){
	        this._view_box = new egret.Bitmap();
	        this._view_box.texture=RES.getRes('propbox_png');
	        this._view_box.width=this._view_activate.width+10;
	        this._view_box.height=this._view_activate.height+10;
	        this._view_box.x=-5;
	        this._view_box.y=-5;
	    }
	}
	private _num:number=0;
	public get num():number{
	    return this._num;
	}
	public set num(val:number){
	    this._num =val;
	    this._numText.text=val.toString();
	    if(val<=0){
	        this.setActivateState(false);
	    }else{
	        this.setActivateState(true);
	    }
	}
	
	private setActivateState(val:boolean){
	    this.touchEnabled=val;
	    if(val){
	        this._view_activate.texture=RES.getRes(this.getActivateTexture(this._type));
	        this._view_box.texture=RES.getRes('propbox_png');
	        this._numText.font=RES.getRes('nubmer_fnt');
	    }else{
            this._view_activate.texture = RES.getRes(this.getDisableTexture(this._type));
            this._view_box.texture = RES.getRes('propboxdisable_png');
            this._numText.font = RES.getRes('nubmerdisable_fnt');
	    }
	}
	
	private getActivateTexture(type:number):string{
	    var texturename:string='';
	    switch(type){
	        case 0:
	            texturename='tongse_png';
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
	}
	
	private getDisableTexture(type:number):string{
	    var texturename:string='';
        switch(type) {
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
	}
	
	public setFocus(val:boolean){
	    if(val){
	        this._view_box.texture=RES.getRes('propboxactive_png');
	    }else{
	        this._view_box.texture=RES.getRes('propbox_png');
	    }
	}
}
