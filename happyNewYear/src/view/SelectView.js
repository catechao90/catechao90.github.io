//抽奖类别选择界面
var SelectView = cc.Layer.extend({
	selectView:null,
	diyBtn:null,
	goOnBtn:null,
	
	selectBg:null,
	selectLabel:null,
	scrollView:null,
	sureBtn:null,
	
	currentList:null,
	selectObj:null,//被确定选中的类别
	ctor:function(){
		this._super();
		this.init();
	},
	
	init:function(){
		var modelLayer = new ModelLayerColor();
	    modelLayer.opacity = 100;
	    this.addChild(modelLayer);
	        	
	    var title = new cc.Sprite(res.r_gift_title);
	    console.log("titleW::"+title.getContentSize().width)
	    title.x = BG.winSize.width*0.5;
	    title.y = BG.winSize.height*0.5 + 200;
	    title.scale = 1.5;
	    this.addChild(title);
	        	
	    this.selectView = new GameSelect();
	    this.selectView.scale = 1.5;
	    this.selectView.x = title.x - title.getContentSize().width*0.5; 
	    this.selectView.y = title.y - title.getContentSize().height - 80;
	    this.addChild(this.selectView);
	    
		
	},
	
	selectGiftType:function(obj){
		if(obj){
			this.selectView.selectGiftType(obj);
		}
	},
	
	//刷新列表
	updateUI:function(){
		this.selectView.initScrollView();
	}
	
})
