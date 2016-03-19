/**
 *
 * @author 
 *
 */
class LevelRequire {
    
    public reqElements:LevelRequireElement[];
    
	public constructor() {
    	this.reqElements=[];
	}
	
	public getLevelReqNum():number{
	    return this.reqElements.length;
	}
	
	public addElement(type:string,num:number){
	    var ele:LevelRequireElement = new LevelRequireElement();
	    ele.num=num;
	    ele.type = type;
	    this.reqElements.push(ele);
	}
	
	public openChange(){
	    this.reqElements=[]
	}
	
	public changeReqNum(type:string,num:number){
	    var l:number=this.getLevelReqNum();
	    for(var i=0;i<l;i++){
	        if(this.reqElements[i].type==type){
	            this.reqElements[i].num-=num;
	            return;
	        }
	    }
	}
	
	public isClear():boolean{
	    var l:number = this.getLevelReqNum();
	    for(var i=0;i<l;i++){
	        if(this.reqElements[i].num >0){
	            return false;
	        }
	    }
	    return true;
	}
}
