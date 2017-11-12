BG.LoadingLayer = cc.LayerColor.extend({
	a:0,
	ctor:function(){
		this.initSize();
		this._super(cc.color(135,216,252));
		var size = BG.winSize;
		var progressTF = new cc.LabelTTF("current percent:0%","Arial",38);
		progressTF.x = size.width *0.5;
		progressTF.y = size.height *0.5;
		this.addChild(progressTF,11,12);
		
//		cc.textureCache.addImage("res/img/sky.png",this.loadCall,this);  
//		cc.textureCache.addImage("res/img/yellow_btn_up.png",this.loadCall,this); 
//		cc.textureCache.addImage("res/img/yellow_btn_over.png",this.loadCall,this); 
//		cc.textureCache.addImage("res/img/yellow_btn_down.png",this.loadCall,this); 
		var i=0;
		var len=g_resources.length;
		var resUrl = "";
		for(i;i<len;i++){
			resUrl = g_resources[i];
			cc.loader.load(resUrl,this.loadCall,this);
		}
	},
	
    initSize:function(){
        	var designWidth =1920//750;
        	var designHeight = 1080//1221;

        	//framesize，设备的分辩率
        	var deviceWidth = cc.view.getFrameSize().width;//cc.visibleRect.width;
        	var deviceHeight = cc.view.getFrameSize().height;//cc.visibleRect.height;

        	var k=1,x=0,y=0;
        	k = deviceWidth/designWidth;
        	var scaleH = designHeight*k;
        	if(scaleH<=deviceHeight){
        		y = deviceHeight - scaleH;
        	}else{
        		k = deviceHeight/designHeight;
        		var scaleW = designWidth*k;
        		if(scaleW <= deviceWidth){
        			x = (deviceWidth - scaleW);
        		}
        	};

        	// print out parameters
        	cc.log("device width:" + deviceWidth);
        	cc.log("device height:" + deviceHeight);
        	cc.log("k:" + k + " x:" + x + " y:" + y);

        	//重要：：：：y是缩放后需要加的高度，如果还原到初始大小，则要/掉缩放值。才是在原始高度上需要增加的量~^O^ ^O^ ^O^ ^O^ ^O^ ^O^ 
        	//setDesignResolutionSize(width, height, resolutionPolicy)
        	// 设置设计视图点大小的分辨率策略
        	cc.view.adjustViewPort(true);
        	cc.view.setDesignResolutionSize(
        			designWidth+ x / k, designHeight + y / k,
        			cc.ResolutionPolicy.SHOW_ALL);
        	cc.view.resizeWithBrowserSize(true);

    	 //getDesignResolutionSize()
    	 // 返回视图的设计大小 默认分辨率的大小同“getFrameSize”一样，但是设置后不一样哦。
    	 BG.winSize = cc.view.getDesignResolutionSize();
        },
	loadCall:function(){
		//每次调用进行计数
		this.a ++;
		//以tag的形式获取文本框对象
		var subTile = this.getChildByTag(12);
		//toFixed(2)意思是取小数点后两位，小数点后第三位为四舍五入
		subTile.setString("current percent :" + Math.round(this.a / g_resources.length)*100 + "%");
		//加载完毕，貌似好多教程都是用百分比判断( >= 1 )
		if (this.a == g_resources.length) {
			//带翻页动画的场景跳转，第一个参数为动画的执行时间，第二个为跳到的场景，第三个为false时从右下角往左边翻页，true时左边往右边翻页
//			var trans = new cc.TransitionTurnOffTiles(0.5, new HelloScene(), false);
//			var trans = new cc.TransitionRotoZoom(3,new BG.MainScene());
//			var trans = new cc.TransitionMoveInL(1,new BG.MainScene());
//			cc.director.runScene(trans);
			cc.director.runScene(new BG.MainScene());
		}
	}
});

BG.LoadingScene = cc.Scene.extend({
	onEnter:function () {
        this._super();
		var loadLayer = new BG.LoadingLayer();
		this.addChild(loadLayer);
	}
});
