 BG.ResultLayer = cc.Layer.extend({
	bgSprite:null,
	contentSprite:null,
	topSprite:null,
	closeBtn:null,
	bg:null,
	titleLabel:null,//奖品级别
	nameSprite:null,
	ctor:function(){
		this._super();
//		 this.setAnchorPoint(0,0);
		this.init();
	},
	
	init:function(){
		this.topSprite = new cc.Sprite();
		this.contentSprite = new cc.Sprite();
		this.bgSprite = new cc.Sprite();
		
		this.addChild(this.bgSprite);
		this.addChild(this.contentSprite);
		this.addChild(this.topSprite);
		var modelLayer = new ModelLayerColor();
	    modelLayer.opacity = 150;
	    modelLayer.setAnchorPoint(0.5,0.5);
	    this.bgSprite.addChild(modelLayer);
	    
	    this.bg = new cc.Sprite(res.r_gift_list_bg);
//	    bg.setAnchorPoint(0.5,0.5);
	    if(this.bg.getContentSize().height>BG.winSize.height){
	    	this.bg.scale = BG.winSize.height/this.bg.getContentSize().height;
	    }
	    this.bg.x = BG.winSize.width*0.5;
	    this.bg.y = BG.winSize.height*0.5;
	    this.bgSprite.addChild(this.bg);

        this.setContentSize(modelLayer.getContentSize());
        
        this.closeBtn = new ccui.Button();
        this.closeBtn.setTouchEnabled(true);
        this.closeBtn.scale=1.2;
        this.closeBtn.loadTextures("res/img/closeBtn.png", "res/img/closeBtn.png", "res/img/closeBtn.png");
        this.closeBtn.addTouchEventListener(this.closePopView, this);
        this.closeBtn.x = this.bg.x+this.bg.getContentSize().width*this.bg.scale*0.5;
        this.closeBtn.y = this.bg.y+this.bg.getContentSize().height*this.bg.scale*0.5-200;
        this.topSprite.addChild(this.closeBtn);
        
        
        this.titleLabel = new cc.LabelTTF("0", "icomoon", 40, cc.size(0, 0), cc.TEXT_ALIGNMENT_LEFT); 
	   	this.titleLabel.x = this.bg.x;
	    this.titleLabel.y = this.bg.y+this.bg.getContentSize().height*this.bg.scale*0.5-340;
	    this.titleLabel.setFontFillColor(cc.color(255,255,255));
	    this.contentSprite.addChild(this.titleLabel);	
	    
	    this.nameSprite = new cc.Sprite();
	    this.nameSprite.x = this.bg.x;
	    this.nameSprite.y = this.bg.y+this.bg.getContentSize().height*this.bg.scale*0.5-440;
	    this.contentSprite.addChild(this.nameSprite);
	},
	
	initNameList:function(title,num){
		this.nameSprite.removeAllChildrenWithCleanup();
		this.titleLabel.setString(title);
		var currentList = MatchDataModel._currentAwardList;
		var i=0;
		var len = currentList.length;
		var label=null;
		var userObj = null;
		var initY =0;
		var initX = -450;//-400;//- this.bg.getContentSize().width*this.bg.scale*0.5+300;
		var offsetX = initX;
		var offsetH = 30;
		for(i;i<len;i++){
			userObj = currentList[i];
			label = new cc.LabelTTF("0", "icomoon", 30, cc.size(0, 0), cc.TEXT_ALIGNMENT_LEFT); 
			label.setFontFillColor(cc.color(234,68,0));
			label.setString("工号:"+userObj.emplyeeNo+" 姓名："+userObj.name);

			
			if(len<50){
				if(len<=2){
					label.fontSize =60;
					offsetH = 70;
					initY = this.bg.y;
				}else if(len<15){
					label.fontSize =40;
					offsetH = 55;
				}else if(len==15){
					offsetH = 40;
				}
				label.y =initY;
				initY-=offsetH;
				
			}else{
				label.x = offsetX;
				label.y =initY;
				label.width = 250;
				label.textAlign = cc.TEXT_ALIGNMENT_LEFT;
				label.setAnchorPoint(0,0.5);
				label.setString("工号:"+userObj.emplyeeNo+" 姓名："+userObj.name);
				label.fontSize =20;
				if((i+1)%3==0){
					offsetX = initX;
					initY-=25;
				}else{
					offsetX += 300;		
				}
			}
			
			this.nameSprite.addChild(label);
		}
	},
	
	closePopView:function(touch, event){
		if(event == ccui.Widget.TOUCH_ENDED){
			BG.MainView.getInstance().restartGame();
		}
	}
	
});

BG.ResultLayer._instance = null;

BG.ResultLayer.getInstance = function(){
	if(!BG.ResultLayer._instance){
		BG.ResultLayer._instance = new BG.ResultLayer();
	}
	return BG.ResultLayer._instance;
};
