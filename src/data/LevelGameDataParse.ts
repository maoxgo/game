/**
 *
 * @author 
 *
 */
class LevelGameDataParse {
	/**
	 * 解析关卡数据
	 */ 
    public static parseLevelGameData(val:any){
        GameData.stepNum = val.step;
        GameData.levelStepNum = val.step;
        GameData.elementsTypes = val.element;
        GameData.levelBackgroundImageName = val.levelbgimg;
        LevelGameDataParse.parseLevelReq(val.levelreq);
    }
    
    /**
     * 解析关卡需求
     */  
    private static parseLevelReq(val:any){
        GameData.levelreq.openChange();
        var len:number=val.length;
        for(var i=0;i<len;i++){
            GameData.levelreq.addElement(val[i].type,val[i].num);
        }
    }
}
