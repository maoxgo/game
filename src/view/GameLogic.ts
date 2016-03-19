/**
 *
 * @author 
 *
 */
class GameLogic {
    private _gameStage:egret.Sprite;
	public constructor(gameStage:egret.Sprite) {
    	this._gameStage=gameStage;
    	this.init();
	}
	
	
	/*========================初始化数据，创建各种控制器=============================*/
	private evm:ElementViewManage;
	private levm:LevelReqViewManage;
	private mapc:MapControl;
	private pvm:PropViewManage;
	private init(){
	    GameData.initData();//初始化数据
	    
	    var leveldata =RES.getRes('l1');//初始化GameData数据
	    MapDataParse.createMapData(leveldata.map);//创建地图数据
	    LevelGameDataParse.parseLevelGameData(leveldata);//解析游戏关卡数据
	    
	    this.mapc = new MapControl();
	    this.mapc.createElementAllMap();
	    
	    var gbg:GameBackGround = new GameBackGround();
	    this._gameStage.addChild(gbg);
	    gbg.changeBackground();
	    
	    var lec:egret.Sprite = new egret.Sprite();
	    this._gameStage.addChild(lec);
	    this.levm = new LevelReqViewManage(lec);
	    this.levm.createCurrentLevelReq();
	    
	    var pvmc:egret.Sprite = new egret.Sprite();
	    this._gameStage.addChild(pvmc);
	    this.pvm = new PropViewManage(pvmc);
	    
	    var  cc:egret.Sprite = new egret.Sprite();
	    this._gameStage.addChild(cc);
	    this.evm=new ElementViewManage(cc);
	    this.evm.showAllElement();
	    
	    this.evm.addEventListener(ElementViewManageEvent.TAP_TWO_ELEMENT,this.viewTouchTap,this);
	    this.evm.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER,this.removeAniOver,this);
	    this.evm.addEventListener(ElementViewManageEvent.UPDATE_MAP,this.createNewElement,this);
	    this.evm.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER,this.checkOtherElementLink,this);
	    this.evm.addEventListener(ElementViewManageEvent.USE_PROP_CLICK,this.usePropClick,this);
	    
	    
	    
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*=====================视图管理器中存在两个被点击的元素，进行判断======================*/
	private viewTouchTap(evt:ElementViewManageEvent){
	    var rel:boolean=LinkLogic.canMove(evt.ele1,evt.ele2);//从二维地图中判断，两个元素是否可交换位置
	    console.log('位置上是否可交换'+rel,evt.ele1,evt.ele2);
	    if(rel){
	        //判断两个位置移动后是否可以消除
    	      var linerel:boolean = LinkLogic.isHaveLineByIndex(GameData.elements[evt.ele1].location,GameData.elements[evt.ele2].location);
    	      
    	      console.log('移动后是否可消除'+linerel);
    	      //执行移动
    	      if(linerel){
    	          //移动，然后消除
        	      console.log('消除动画');
        	      this.evm.changeLocationAndScale(evt.ele1,evt.ele2);
        	      //更新步数
        	      GameData.stepNum--;
        	      this.levm.updateStep();
    	      }else{
    	          this.evm.changeLocationAndBack(evt.ele1,evt.ele2);
    	      }
	    }else{
	        this.evm.setNewElementFocus(evt.ele2);//两个元素从空间位置上不可交换，设置新焦点
	    }
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*=============================元素置换动画播放结束，数据操作，并播放删除动画=========================*/
	//即将删除的元素移动结束
	//开始搜索删除数据，并且播放删除动画
	//更新地图数据
	//更新其他数据
	private removeAniOver(evt:ElementViewManageEvent){
	    console.log('需要消除'+LinkLogic.lines);
	    var len:number=LinkLogic.lines.length;
	    var rel:boolean;
	    for(var i:number=0;i<len;i++){
	        var etype:string='';
	        var l:number=LinkLogic.lines[i].length;
	        for(var t:number=0;t<l;t++){
	            etype=GameData.elements[LinkLogic.lines[i][t]].type;
	            rel=this.levm.haveReqType(etype);
                if(rel) {//有相同关卡类型，运动到指定位置
	                var p:egret.Point=this.levm.getPointByType(etype);
	                GameData.levelreq.changeReqNum(etype,1);
	                this.levm.update();
	                this.evm.playReqRemoveAn(LinkLogic.lines[i][t],p.x,p.y);
	            }else{
	                this.evm.playRemoveAni(LinkLogic.lines[i][t]);
	            }
    	            
	        }
	    }
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*================================所以元素都删除完毕后，创建新元素，并刷新地图========================*/
	private createNewElement(evt:ElementViewManageEvent){
	    console.log('刷新地图数据！！！！！！！！！！！！');
	    this.mapc.updateMapLocation();
	    this.evm.updateMapData();
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	/*=========================删除动画完成后，检测地图中是否存在剩余可消除元素==========================*/
	private checkOtherElementLink(evt:ElementViewManageEvent){
	    if(LinkLogic.isHaveLine()){
	        this.removeAniOver(null);
	    }else{
	        if(!LinkLogic.isNextHaveLine()){
	            var rel:boolean=false;
	            //没有可消除的元素了，检查是否存在移动一步可消除的项目
	            var next:boolean=true;
	            while(next){
	                console.log('执行乱序');
	                LinkLogic.changeOrder();
	                if(!LinkLogic.isHaveLine()){
	                    if(LinkLogic.isNextHaveLine()){
	                        next=false;
	                        rel=true;
	                    }
	                }
	            }
	            if(rel){
	                this.evm.updateOrder();
	            }
	        }
	    }
	    console.log('所以动画逻辑结束');
	    
	    this.isGameOver();
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	
	
	/*==========================检测当前游戏是否结束=============================*/
	private gameoverpanel:GameOverPanel;
	private isGameOver(){
	    console.log('道具是否清空',GameData.levelreq.isClear());
	    if(!this.gameoverpanel){
	        if(GameData.stepNum==0){
	            this.gameoverpanel = new GameOverPanel();
	            this._gameStage.addChild(this.gameoverpanel);
	            if(GameData.levelreq.isClear()){
	                this.gameoverpanel.show(true);
	            }else{
	                this.gameoverpanel.show(false);
	            }
	        }else{
	            if(GameData.levelreq.isClear()){
	                this.gameoverpanel = new GameOverPanel();
	                this._gameStage.addChild(this.gameoverpanel);
	                this.gameoverpanel.show(true);
	            }
	        }
	    }
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	
	/*==========================道具被点击================================*/
	private usePropClick(evt:ElementViewManageEvent){
	    PropLogic.useProp(PropViewManage.proptype,evt.propToElementLocation);
	    this.pvm.useProp();
	    this.removeAniOver(null);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
}
