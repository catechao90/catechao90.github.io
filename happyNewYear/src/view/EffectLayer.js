BG.EffectLayer = cc.Layer.extend({
	bgSprite:null,
	ctor:function(){
		this._super();
		this.init();
	},
	
	init:function(){

		this.bgSprite = new cc.Sprite();
		this.addChild(this.bgSprite);
		
		this.initSnowList();
	},
	
	initSnowList:function(){
		this.scheduleCallFun();
		this.schedule(this.scheduleCallFun,1,5);
	},
	
	scheduleCallFun:function(){
		var i=0;
		var len = 10;
		var snow = null;
		for(i;i<len;i++){
			snow = new Snow();
			this.bgSprite.addChild(snow);
		}
	}

});

BG.EffectLayer._instance = null;

BG.EffectLayer.getInstance = function(){
	if(!BG.EffectLayer._instance){
		BG.EffectLayer._instance = new BG.EffectLayer();
	}
	return BG.EffectLayer._instance ;
}
