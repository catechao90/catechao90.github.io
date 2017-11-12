//核心处理数据中心
var MatchDataModel = MatchDataModel||{};
MatchDataModel =(function(){
	var model = {
		_userList : null,//可以参加抽奖的人员列表
        _awardsList : null,//获奖列表
        _currentAwardList : null//当前奖项获奖列表
	}
	
	//初始化抽奖名单
    model.parseUserListData=function(value){
        this._userList = [];
        var len = UserList.length;
        var i=0;
        var obj = null;
        var userObj = null;
        for(i;i<len;i++){
        	obj = UserList[i];
        	userObj = this.parseUserData(obj);
        	this._userList.push(userObj);
        }
    }
    //解析人员数据 
    model.parseUserData=function(value){
		var userObj = new UserObj();
		userObj.name = value.name;
		userObj.lotteryNo = value.lotteryNo;
		userObj.emplyeeNo = value.emplyeeNo;
		return userObj;
	}
	
	model.lottery=function(type,num){
		this._currentAwardList =[]
		var totalNum = this._userList.length;
		while(num>0){
			this.randomLottery(totalNum);
			num--;
			totalNum--;
		}
		
	}
	
	model.randomLottery=function(totalNum){
		var lotteryIndex = Math.floor(Math.random()*totalNum);
		var luckyBoy = this._userList[lotteryIndex];
		this._userList.splice(lotteryIndex,1);
		this._currentAwardList.push(luckyBoy);
		console.log("luckyBoy.name"+luckyBoy.name);
	}
 	return model; 
})();

//人员对象
function UserObj(){
	this.name="",
	this.lotteryNo=0;
	this.emplyeeNo=0;
	this.award=0;
}
