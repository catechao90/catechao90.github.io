var Egg = cc.Sprite.extend({
	ball:null,
	speed:null,//随机生的速度
	angle:null,//角度
	gravity:0.5,//向下的重力加速度
	speedX:null,
	speedY:null,
	initX:null,
	initY:null,
	lastX:0,
	lastY:0,
	ctor:function(){
		this._super();
		this.setAnchorPoint(0.5,0.5);
	},
	setInitPosition:function(x,y){
		this.initX = x;
		this.initY = y;
		this.setPosition(x,y)
	},
	
	setType:function(value){
		this.ball = new cc.Sprite("#egg_"+value+".png");
		this.addChild(this.ball);
		this.init();
		this.scale = 0.4;
	},
	
	init:function(){
		var rotate = cc.rotateBy(2,(Math.random()+1)*180);
//    	this.ball.runAction(cc.repeatForever(rotate));
	},
	
	startMove:function(){
		this.speed = 15;
		this.angle = (30+Math.random()*120)*Math.PI/180;//(-180+Math.random()*360)* Math.PI/180  ;
		this.schedule(this.eggJump,0.05);
//		var rotate = cc.rotateBy(2,(Math.random()+1)*180);
//    	this.ball.runAction(cc.repeatForever(rotate));
	},
	
	
	eggJump:function(){
		this.speedX = this.speed*Math.cos(this.angle);
		this.speedY = this.speed*Math.sin(this.angle);

		this.x +=this.speedX;
		this.y +=this.speedY;

//		判断圆形区域
		var distance = Math.sqrt((this.x+10)*(this.x+10)+(this.y-35)*(this.y-35));
		if(distance>95){
			this.speed =-this.speed;
		}
	},
	
	stopMove:function(){
		this.unscheduleAllCallbacks();
		console.log("stop");
		this.schedule(this.goBack,0.05);
		this.speedY = 3+5*Math.random();
	},
//  小球的回落运动
	goBack:function(){
		var distance = Math.sqrt((this.x+10)*(this.x+10)+(this.y-35)*(this.y-35));
		if(distance<95){
			if(this.y>-40){
				this.y -=this.speedY;
				this.x*=0.95;
			}else{
				BG.GameMachine.getInstance().showResult();
				this.unscheduleAllCallbacks();
			}
		}else{
			if(this.y>-40){
				this.x*=0.95;
				this.y -=this.speedY;
			}else{
				this.y +=this.speedY*0.5;
			}
		}
	}
	
})
