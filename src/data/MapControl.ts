/**
 *
 * 地图控制器
 *
 */
class MapControl {
	public constructor() {
	}
	
	/**
	 * 配置所有地图元素类型
	 * <br>每盘游戏开始时执行一次
	 */ 
	public createElementAllMap(){
	    this.createAllMap();
	}
	
	public createElements(num:number):string[]{
	    var types:string[]=[];
	    for(var i=0;i<num;i++){
	        types.push(this.createType());
	    }
	    return types;
	}
	
	public changeTypeByID(id:number){
	    GameData.elements[id].type=this.createType();
	}
	
	public updateMapLocation(){
	    var ids:number[]=[];
	    var len:number=LinkLogic.lines.length;
	    for(var i=0;i<len;i++){
	        //var l:number=LinkLogic.lines[i].length;            
            ids.push(LinkLogic.lines[i]);            	   
	    }
	    
	    len = ids.length;
	    var colarr:number[]=[];
	    for(i=0;i<len;i++){
    	      
            var tempCol: number = GameData.elements[ids[i]].location % GameData.MaxColumn;
            if(colarr.indexOf(tempCol)==-1){
                colarr.push(tempCol);
            }
	    }
	    
	    var colelids:number[];
	    len = colarr.length;
	    for(i=0;i<len;i++){
	        var newcolids:number[]=[];
	        var removeids:number[]=[];
	        for(var t=GameData.MaxRow-1;t>=0;t--){
	            //console.log(ids);
	            if(ids.indexOf(GameData.mapData[t][colarr[i]])>=0){
                    removeids.push(GameData.mapData[t][colarr[i]]);
                    
	            }else{
                    if(GameData.mapData[t][colarr[i]] != -1) {
                        newcolids.push(GameData.mapData[t][colarr[i]]);
                    }
	            }
	        }
	        newcolids=newcolids.concat(removeids);
	        //console.log(newcolids);
	        for(t=GameData.MaxRow-1;t>=0;t--){
	            if(GameData.mapData[t][colarr[i]]!=-1){
    	              var newcol:number = newcolids.shift();
	                GameData.mapData[t][colarr[i]]=newcol;
                    console.log(GameData.elements[newcol].location);
                    GameData.elements[newcol].location=t*GameData.MaxRow+colarr[i];
	                //newcolids.shift();
	                //console.log(newcolids);
                    console.log(GameData.elements[newcol].location);
	            }
	        }
	        
	        for(t=0;t<removeids.length;t++){
	            this.changeTypeByID(removeids[t]);
	        }
    	       
	        
	    }
	}
	/**配置所有地图元素类型*/
	private createAllMap(){
	    var len:number=GameData.MaxRow*GameData.MaxColumn;
	    var type:string ='';
	    var havelink:boolean=true;
	    var ztype:string ='';
	    var htype:string ='';
	    var id:number=0;
	    for(var i=0;i<GameData.MaxColumn;i++){
	        for(var t=0;t<GameData.MaxRow;t++){
    	        while(havelink){
                    type = this.createType();
                    //确保纵向不存在可消除元素
                    if(i > 1 && GameData.mapData[i - 1][t] != -1 && GameData.mapData[i - 2][t] != -1) {
                        if(GameData.elements[GameData.mapData[i - 1][t]].type == GameData.elements[GameData.mapData[i - 2][t]].type) {
                            ztype = GameData.elements[GameData.mapData[i - 1][t]].type;
                        }
                    }
                    if(t > 1 && GameData.mapData[i][t - 1] != -1 && GameData.mapData[i][t - 2] != -1) {
                        if(GameData.elements[GameData.mapData[i][t - 1]].type == GameData.elements[GameData.mapData[i][t - 2]].type) {
                            htype = GameData.elements[GameData.mapData[i][t - 1]].type;
                        }
                    }
                    if(type != ztype && type != htype) {
                        havelink = false;
                    }
    	        }
    	        id=GameData.unusedElements[0];
    	        GameData.elements[id].type=type;
    	        GameData.elements[id].location=i*GameData.MaxRow+t;
    	        GameData.mapData[i][t]=id;
    	        GameData.unusedElements.shift();
    	        havelink=true;
    	        ztype='';
    	        htype='';
	            
	        }
	    }
	}
	
	/**创建随机类型*/
	private createType():string{
	    return GameData.elementsTypes[Math.floor(Math.random()*GameData.elementsTypes.length)].toString();
	}
}
