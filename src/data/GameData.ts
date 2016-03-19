/**
 *
 * @author 
 *
 */
class GameData {
    /**未激活的地图格数*/
    public static unmapnum:number=0;
    /**存放地图元素id的二维数组*/
    public static mapData:number[][];
    /**当前步数*/
    public static stepNum:number=0;
    /**关卡需求步数*/
    public static levelStepNum:number=0;
    /**可使用的元素类型*/
    public static elementsTypes:number[];
    /**关卡需求*/
    public static levelreq:LevelRequire;
    /**元素数组*/
    public static elements:GameElement[];
    /**未使用元素的id数组*/
    public static unusedElements:number[];
    /**关卡背景图*/
    public static levelBackgroundImageName:string='';
    /**最大行数*/
    public static MaxRow:number=8;
    /**最大列数*/
    public static MaxColumn:number=8;
    /**激活的地图格数*/
    public static currentElementNum:number=0;
    
	public static initData(){
    	  GameData.mapData=[];
	    for(var i=0;i<GameData.MaxRow;i++){
	        var arr:number[]=[];
	        for(var t=0;t<GameData.MaxColumn;t++){
	            arr.push(-2);
	        }
	        GameData.mapData.push(arr);
	    }
	    
	    GameData.levelreq = new LevelRequire();
	    GameData.elements=[];
	    GameData.unusedElements=[];
	    var len:number=GameData.MaxRow*GameData.MaxColumn;
	    for(var q=0;q<len;q++){
	        var ele:GameElement = new GameElement();
	        ele.id=q;
	        GameData.elements.push(ele);
	        GameData.unusedElements.push(q);
	    }
	    
	    GameData.stageW= egret.MainContext.instance.stage.stageWidth;
	    GameData.stageH = egret.MainContext.instance.stage.stageHeight;
	}
	
	public static stageW:number = 0;
	public static stageH:number =0;
}
