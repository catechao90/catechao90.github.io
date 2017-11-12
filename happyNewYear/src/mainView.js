BG.MainView = cc.LayerColor.extend({
	sky:null,
	machine:null,
	light:null,
	_emitter:null,//特效
	
	selectView:null,//选择抽奖等级列表
	selectObj:null,//抽奖对象
	giftLayer:null,
    ctor:function () {
            this._super(cc.color(135,216,252));
            this.init();
            
        },
        
        init:function(){
        	this.countDown = this.GAME_TIME;
        	this.bgSprite = new cc.Sprite.create();
        	this.contentSprite = new cc.Sprite.create();
        	this.topSprite = new cc.Sprite.create();
        	this.popSprite = new cc.Sprite.create();
        	
        	this.addChild(this.bgSprite);
        	this.addChild(this.contentSprite);
        	this.addChild(this.topSprite);
        	this.addChild(this.popSprite);
        	this.initBg();
			this.initGameContent();
        	this.initTop();
        	this.initMusic(); 	
        	this.initGiftType();
        	this.initData();
        },
        initData:function(){
			MatchDataModel.parseUserListData();
		},
        //设置抽奖类别
        initGiftType:function(){
//      	var modelLayer = new ModelLayerColor();
//      	modelLayer.opacity = 150;
//      	this.popSprite.addChild(modelLayer);
//      	
////      	var bgColor = new cc.LayerColor(cc.color(0,0,0),BG.winSize.width,BG.winSize.height);
////      	bgColor.opacity = 150;
////      	bgColor.setPosition((BG.winSize.width - bgColor.getContentSize().width)*0.5,(BG.winSize.height - bgColor.getContentSize().height)*0.5)
////      	this.popSprite.addChild(bgColor);
//      	
//      	var title = new cc.Sprite(res.r_gift_title);
//      	console.log("titleW::"+title.getContentSize().width)
//      	title.x = BG.winSize.width*0.5;
//      	title.y = BG.winSize.height*0.5 + 200;
//      	title.scale = 1.5;
//      	this.popSprite.addChild(title);
        	
        	this.selectView = new SelectView();
//      	this.selectView.scale = 1.5;
        	this.selectView.x = (BG.winSize.width - this.selectView.getContentSize().width)*0.5 ;
        	this.selectView.y = (BG.winSize.height - this.selectView.getContentSize().height)*0.5 ;
        	this.popSprite.addChild(this.selectView);
        	

        },
   
        initStartBg:function(){
        	var bgColor = new cc.LayerColor(cc.color(223,165,56),BG.winSize.width,BG.winSize.height);
        	this.popSprite.addChild(bgColor);
        	
        	this.startView = new cc.Sprite("#bg.png");
        	this.popSprite.addChild(this.startView);
        	this.startView.setAnchorPoint(cc.p(0,0));
        	
        	
        	var scale = BG.winSize.height/BG.winSize.width;
        	var scaleW = this.startView.getContentSize().height/this.startView.getContentSize().width;
        	if(scale<scaleW){
        		this.startView.setScale(BG.winSize.width/this.startView.getContentSize().width);
        		this.startView.x = 0;
        	    this.startView.y = (BG.winSize.height -this.startView.getContentSize().height*BG.winSize.width/this.startView.getContentSize().width)*0.5;;
        	}else{
        		this.startView.setScale(BG.winSize.height/this.startView.getContentSize().height);
        		this.startView.y = 0;
        	    this.startView.x = (BG.winSize.width -this.startView.getContentSize().width*BG.winSize.height/this.startView.getContentSize().height)*0.5;
        	}
//      	this.startView.setScaleY(scale);
//      	this.startView.setScaleX(BG.winSize.width/this.startView.getContentSize().width);
        	
        	var imgMenu = new cc.MenuItemImage(
       			"#startBtn.png",
       			"#startBtn.png",
       			"#startBtn.png",
       			function(){
       				this.startMove();
       			}, this
       		);
       		
       		this.startBtn = new cc.Menu.create(imgMenu);
       		var size = BG.winSize;
       		var imgSize = imgMenu.getContentSize();
       		this.startBtn.setPosition(size.width*0.5,(imgSize.height+100));
       		this.popSprite.addChild(this.startBtn);
        },
        
        //让背景与可视区域匹配
        initBg:function(){
        	cc.spriteFrameCache.addSpriteFrames(res.mainResource_plist);
		    this.spriteSheet= cc.SpriteBatchNode.create(res.mainResource_png);
		    cc.textureCache.addImage(res.mainResource_png);
		    
        	 this.sky =  new cc.Sprite(res.r_bg);
        	 this.sky.setAnchorPoint(cc.p(0.5,0.5));
	    	 this.bgSprite.addChild(this.sky);
	    	 
	    	 var scaleW = BG.winSize.height/BG.winSize.width;
	    	 var scaleS = this.sky.getContentSize().height/this.sky.getContentSize().width;
	    	 var scale = BG.winSize.height/this.sky.getContentSize().height;
	    	this.sky.setScale(scale,scale);
	    	this.sky.x = (BG.winSize.width)/2;
	    	this.sky.y = BG.winSize.height/2;
	        BG.gameSize = cc.rect(this.sky.x,0,this.sky.getContentSize().width*scale,this.sky.getContentSize().height*scale);
	        
	        if(this.sky.getContentSize().width<BG.winSize.width){
	        	var n = Math.ceil(BG.winSize.width/this.sky.getContentSize().width);
	        	for(var i=0;i<n;i++){
	        		var bg = new cc.Sprite(res.r_bg);
	        		bg.setAnchorPoint(cc.p(0.5,0.5));
	    	 		this.bgSprite.addChild(bg);
	    	 		bg.setScale(scale,scale);
	    	 		bg.x = i*bg.getContentSize().width;
	    	 		bg.y = BG.winSize.height/2;
	        	}
	        }
     
        },
       
       //初始比赛内容
       initGameContent:function(){
//    	 	this.contentSprite.x = BG.winSize.width*0.5;
      	 	this.machine = BG.GameMachine.getInstance();
      	 	this.contentSprite.addChild(this.machine);
      	 	var size = BG.winSize;
      	 	this.machine.setPosition((size.width-this.machine.getContentSize().width)*0.5,(size.height-this.machine.getContentSize().height)*0.5-100);
       },
       

       //初始比赛UI
       initTop:function(){
       	 this._emitter = BG.EffectLayer.getInstance();
//     	 this._emitter.width = BG.winSize.width;
//     	 this._emitter.height = BG.winSize.height;
       	 this._emitter.setContentSize(BG.winSize);
       	 this.topSprite.addChild(this._emitter);
       	 this._emitter.x = BG.winSize.width*0.5;
       },
       
       //播放背景音乐
       initMusic:function(){
       	if(!cc.audioEngine.isMusicPlaying()){
	       	  cc.audioEngine.playMusic(res.bg_music,true);	
	       	  cc.audioEngine.setMusicVolume(0.3) ;
       	 }
       },
       
   		//开始抽奖
   		startGame:function(obj){
   			this.selectObj = obj;
   			this.popSprite.removeChild(this.selectView);
			cc.eventManager.resumeTarget(this.machine, true);    
   		},
   		
   		openGift:function(){
   			if(!this.giftLayer){
   				this.giftLayer = BG.ResultLayer.getInstance();  				
   			}
   			this.topSprite.addChild(this.giftLayer);
   			this.giftLayer.initNameList(this.selectObj.value,this.selectObj.num);
   			this.giftLayer.x = BG.winSize.width*0.5-this.giftLayer.getContentSize().width*0.5;
	        this.giftLayer.y = -this.giftLayer.getContentSize().height;
   			this.giftLayer.runAction(cc.moveBy(0.2,0, (BG.winSize.height-this.giftLayer.getContentSize().height)*0.5+ this.giftLayer.getContentSize().height));
   		},
   		
   		restartGame:function(){
   			this.topSprite.removeChild(this.giftLayer);
   			this.popSprite.addChild(this.selectView);
   			this.selectView.updateUI();
   		}
   		 
});

BG.MainView._instance = null;

BG.MainView.getInstance = function(){
	if(!BG.MainView._instance){
		BG.MainView._instance = new BG.MainView();
	}
	return BG.MainView._instance ;
}

BG.MainScene = cc.Scene.extend({
	onEnter:function () {
	    this._super();
		var view  = BG.MainView.getInstance();
		this.addChild(view);
	}
});


