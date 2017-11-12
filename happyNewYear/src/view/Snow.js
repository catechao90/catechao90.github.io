var Snow = cc.Sprite.extend({
	sprite:null,
	speedX:0,
	speedY:0,
	ctor:function(){
		this._super();
		this.init();
	},
	
	init:function(){
		this.initSnow();
	},
	
	initSnow:function(){

		var type = 1+Math.floor(Math.random()*6);
		var rotate = Math.random()*360;
		var scale = Math.floor(Math.random()*2)+1;
//		var scale = Math.random()*0.5+0.3;
		this.speedX = -3 + Math.ceil(Math.random()*6);
		this.speedY = 4 + Math.ceil(Math.random()*3);
		this.sprite = new cc.Sprite("res/img/snow/snow_"+type+".png");
//		this.sprite = new cc.Sprite(res.r_gold);
		this.sprite.x = -BG.winSize.width*0.5 + Math.floor(BG.winSize.width*Math.random());
		this.sprite.y = BG.winSize.height + Math.floor(100*Math.random());;
		this.addChild(this.sprite);
		this.sprite.rotation = rotate;
		this.sprite.scale = scale;
		this.startMove();
		var rotate = cc.rotateBy(2,(Math.random()*180));
      	this.sprite.runAction(cc.repeatForever(rotate));
	},
	
	startMove:function(){
		this.schedule(this.fly,0.05);
	},
	
	fly:function(){
		this.sprite.y-=this.speedY;
		this.sprite.x+=this.speedX;
		
		if(this.sprite.x<-BG.winSize.width*0.5||this.sprite.x>BG.winSize.width || this.sprite.y<0){
			this.sprite.x = -BG.winSize.width*0.5+Math.floor(BG.winSize.width*Math.random());
			this.sprite.y = BG.winSize.height+Math.floor(20*Math.random());
		}
	}
})
