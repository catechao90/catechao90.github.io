var SelectItem = cc.Sprite.extend({
	btn:null,
	selectLabel:null,
	obj:null,//奖类别数据
	ctor:function(){
		this._super();
		this.setAnchorPoint(0,0);
		this.init();
	},
	
	init:function(){
		this.btn = new ccui.Button();
        this.btn.setTouchEnabled(true);
        this.btn.loadTextures("res/img/white_bg.png", "res/img/yellow_bg.png", "res/img/yellow_bg.png");
        this.btn.addTouchEventListener(this.touchEvent, this);
        this.addChild(this.btn);
        
        this.selectLabel = new cc.LabelTTF("0", "icomoon", 24, cc.size(0, 0), cc.TEXT_ALIGNMENT_LEFT); 
	   	this.selectLabel.x = 130;
	    this.selectLabel.y = 20;
	    this.selectLabel.setFontFillColor(cc.color(0,0,0));
	    this.btn.addChild(this.selectLabel);
	    this.selectLabel.setString("请选择");
	},
	
	setLabel:function(value){
		this.obj = value;
		this.selectLabel.setString(this.obj.value+"");
	},
	
	touchEvent:function(touch, event){
		if(event == ccui.Widget.TOUCH_ENDED){
			console.log("选择："+this.obj.id + this.obj.value)
		
			BG.MainView.getInstance().selectView.selectGiftType(this.obj);	
	// 		var event = new cc.EventCustom("select_gift_type");
	// 		 event.setUserData(this.obj);
	//  	cc.eventManager.dispatchEvent(event); 			
		}
		this.btn.setSwallowTouches(false);
		return true;
	}
})
