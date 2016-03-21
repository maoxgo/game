/**
 *
 * @author 
 *
 */
class PropLogic {
	
    public static useProp(proptype:number,ellocation:number){
        switch(proptype){
            case 0:
                PropLogic.tongse(ellocation);
                break;
            case 1:
                PropLogic.zhadan(ellocation);
                break;
            case 2:
                PropLogic.zhenghang(ellocation);
                break;
            case 3:
                PropLogic.zhenglie(ellocation);
                break;
            case 4: 
                PropLogic.chanzi(ellocation);
                break;
                
        }
    }
    
    private static tongse(loc:number){
        LinkLogic.lines =[];
        var type:string=GameData.elements[GameData.mapData[Math.floor(loc/8)][loc%8]].type;
        for(var i=0;i<GameData.MaxRow;i++){
            for(var t=0;t<GameData.MaxColumn;t++){
                if(GameData.mapData[i][t] !=-1 && GameData.elements[GameData.mapData[i][t]].type ==type){
                    LinkLogic.pushLines(GameData.mapData[i][t]);
                }
            }
        }
        //LinkLogic.lines.push(arr);
    }
    
    private static zhadan(loc:number){
        LinkLogic.lines =[];
        var i:number = Math.floor(loc/8);
        var t:number = loc%8;
        LinkLogic.pushLines(GameData.elements[GameData.mapData[i][t]].id);
        //上
        if(i>0&&GameData.mapData[i-1][t] !=-1){
            LinkLogic.pushLines(GameData.elements[GameData.mapData[i-1][t]].id);
        }
        //下
        if(i <(GameData.MaxRow-1) && GameData.mapData[i + 1][t] != -1) {
            LinkLogic.pushLines(GameData.elements[GameData.mapData[i + 1][t]].id);
        }
        //左
        if(t > 0 && GameData.mapData[i][t-1] != -1) {
            LinkLogic.pushLines(GameData.elements[GameData.mapData[i][t-1]].id);
        }
        //右
        if(t<(GameData.MaxColumn-1) && GameData.mapData[i][t+1] != -1) {
            LinkLogic.pushLines(GameData.elements[GameData.mapData[i][t+1]].id);
        }
        
        //LinkLogic.lines.push(arr);
    }
    
    private static zhenghang(loc:number){
        LinkLogic.lines = [];
        var i: number = Math.floor(loc / 8);
        //var arr: number[] = [];
        for(var t:number=0;t<GameData.MaxColumn-1;t++){
            if(GameData.mapData[i][t] !=-1)
                LinkLogic.pushLines(GameData.elements[GameData.mapData[i][t]].id);
        }
        //LinkLogic.lines.push(arr);
    }
    
    private static zhenglie(loc:number){
        LinkLogic.lines = [];
        var t: number = loc%8;
        //var arr: number[] = [];
        for(var i: number = 0;i < GameData.MaxRow - 1;i++) {
            if(GameData.mapData[i][t] != -1)
                LinkLogic.pushLines(GameData.elements[GameData.mapData[i][t]].id);
        }
        //LinkLogic.lines.push(arr);
    }
    
    private static chanzi(loc:number){
        LinkLogic.lines = [];
        LinkLogic.pushLines(GameData.elements[GameData.mapData[Math.floor(loc/8)][loc%8]].id);
    }
}
