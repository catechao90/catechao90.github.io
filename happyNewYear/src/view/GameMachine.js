BG.GameMachine = cc.Sprite.extend({
	machine:null,
	topSprite:null,
	contentSprite:null,
	bgSprite:null,
	contentBg:null,
	
	eggList:null,
	
	moveRange:null,
	startBtn:null,
	starting:false,
	redLight:null,
	yellowLight:null,
	lightOpen:false,
	isWaiting:false,//是否要等球停下来
	EggNum:25,
	positionList:[{x:0,y:-20},{x:-10,y:-35},{x:-60,y:-40},{x:60,y:-30},{x:30,y:-10}],
	
	resultEgg:null,
	lock:false,//操作是否被锁住
	overEggNum:0,//运动结束完的小球数
	ctor:function(){
		this._super();
		this.setAnchorPoint(0.5,0.5);
		this.scale=1.7;
		this.init();
	},
	init:function(){
		this.bgSprite = new cc.Sprite();
		this.contentSprite = new cc.Sprite();
		this.topSprite = new cc.Sprite();
		this.addChild(this.bgSprite);
		this.addChild(this.contentSprite);
		this.addChild(this.topSprite);
		
		this.initBg();
		this.initContent();
		this.initTop();
	},

	
	initBg:function(){
		
	},
	
	initContent:function(){
		this.contentBg = new cc.Sprite("#container.png");
//		this.contentBg.scale = 2;
		this.contentBg.setPosition(-5,48);
		this.contentSprite.addChild(this.contentBg);
		moveRange = new cc.Sprite()
		this.eggList =[];
		var i=0;
		var len=this.EggNum;
		var egg = null;
		var positionX =0;
		var positionY = 0;
		var distance = 0;
		for(i;i<len;i++){
			egg = new Egg();
			egg.setType(i%5+1);
			this.contentSprite.addChild(egg);
			var positionEgg = this.positionList[i-1];
//			egg.setPosition(positionEgg.x,positionEgg.y);
			do{
				positionX = -50+Math.random()*100;
				positionY = -20-Math.random()*30;
				distance = Math.sqrt((this.x+10)*(this.x+10)+(this.y-40)*(this.y-40));
			}while(distance>80)
			egg.setInitPosition(positionX,positionY);
//			egg.setInitPosition(-60+Math.random()*120,-20-Math.random()*30);
			this.eggList.push(egg);
		}
		
		this.initEggMove();
	},
	
	initTop:function(){
		this.machine = new cc.Sprite("#machine.png");
      	this.topSprite.addChild(this.machine);
//    	this.machine.scale = 2;
//    	this.machine.scaleY = 3;
        
//      this.startBtn = new cc.Sprite("#start_btn.png")
		var startBtnImg = new cc.MenuItemImage(
       			"#start_btn.png",
       			"#start_btn.png",
       			"#start_btn.png",
       			function(){
       				this.startMove();
       			}, this
       		);
       	this.startBtn = new cc.Menu.create(startBtnImg);
       	this.startBtn.setAnchorPoint(0,0);
		this.topSprite.addChild(this.startBtn);
		this.startBtn.x = -63;
		this.startBtn.y = -112;
		
		this.redLight = new cc.Sprite("#red_light.png");
		this.redLight.setPosition(-145,121);
		this.redLight.setVisible(false);
		this.topSprite.addChild(this.redLight);
		
		this.yellowLight = new cc.Sprite("#yellow_light.png");
		this.yellowLight.setPosition(145,121);
		this.yellowLight.setVisible(false);
		this.topSprite.addChild(this.yellowLight);
		
		
	},
	
	initEggMove:function(){
//		this.schedule(this.eggJump, 1);
	},
	
	startMove:function(){
		if(this.isWaiting||this.lock){
			return;
		}
		this.overEggNum = 0;
		if(this.starting){
			this.starting = false;
			this.isWaiting = true;
			this.unscheduleAllCallbacks();
			var rotate = cc.rotateTo(1,-30);
			this.startBtn.runAction(cc.RotateTo.create(10,-1));	
			this.redLight.setVisible(false);
			this.yellowLight.setVisible(false);
		}else{
			this.starting = true;
			this.lock = true;
			this.schedule(this.lighter,0.5);
			this.scheduleOnce(this.openLock,1);

		}
		var i=0;
		var len=this.EggNum;
		var egg = null;
		for(i;i<len;i++){
			egg = this.eggList[i];
			if(!this.starting){
				egg.stopMove();
			}else{
				egg.startMove();
			}
		}
	},
	
	 openLock:function(){
	 	this.lock = false;
	 },

	lighter:function(){
		if(this.lightOpen){
			this.lightOpen = false;
			this.redLight.setVisible(true);
			this.yellowLight.setVisible(true);
		}else{
			this.lightOpen = true;
			this.redLight.setVisible(false);
			this.yellowLight.setVisible(false);
		}
	},
	
	showResult:function(){
		this.overEggNum++;
		if(this.overEggNum>=this.eggList.length){
			this.isWaiting = false;
			this.openGift();
//			var type = Math.floor(Math.random()*5)+1;
//			var imgName = "#egg_"+type+".png";
//			var resultEggImg = new cc.MenuItemImage(
//     			imgName,
//     			imgName,
//     			imgName,
//     			function(){
//     				this.openGift();
//     			}, this
//     		);
//     	    this.resultEgg = new cc.Menu.create(resultEggImg);
//     	    this.resultEgg.setAnchorPoint(0,0);
//     	    this.resultEgg.scale =0.4;
//		    this.resultEgg.x = 130;
//		    this.resultEgg.y = -160;
//     	    this.topSprite.addChild(this.resultEgg);	
//     	    this.resultEgg.runAction(cc.repeatForever(cc.rotateBy(0.5, 90)));
		}
	},
	//要开奖后才能继续抽奖
	openGift:function(){
//		this.isWaiting = false;
		MatchDataModel.lottery(BG.MainView.getInstance().selectObj.id,BG.MainView.getInstance().selectObj.num);
		BG.MainView.getInstance().openGift();
//		this.topSprite.removeChild(this.resultEgg);		
	}
});

BG.GameMachine._instance = null;

BG.GameMachine.getInstance = function(){
	if(!BG.GameMachine._instance){
		BG.GameMachine._instance = new BG.GameMachine();
	}
	return BG.GameMachine._instance ;
}

