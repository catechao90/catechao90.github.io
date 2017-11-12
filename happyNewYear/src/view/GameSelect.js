var GameSelect = cc.Sprite.extend({
	selectBg:null,
	selectLabel:null,
	scrollView:null,
	sureBtn:null,
	
	currentList:null,
	selectObj:null,//被确定选中的类别
	ctor:function(){
		this._super();
		this.setAnchorPoint(0.5,0);
		this.init();
	},
	
	init:function(){
//		this.selectBg = new cc.Sprite("#ui/select_bg.png");
//		this.addChild(this.selectBg);
		currentList = giftType;
		this.selectBg = new ccui.Button();
        this.selectBg.setTouchEnabled(true);
        this.selectBg.loadTextures("res/img/select_bg.png", "res/img/select_bg.png", "res/img/select_bg.png");
        this.selectBg.addTouchEventListener(this.touchEvent, this);
        this.addChild(this.selectBg);

		
		var sureBtnImg = new cc.MenuItemImage(
       			"#ui/sure_btn.png",
       			"#ui/sure_btn.png",
       			"#ui/sure_btn.png",
       			function(){
       				this.sureSelect();
       			}, this
       		);
       		
       	this.sureBtn = new cc.Menu.create(sureBtnImg);
       	this.addChild(this.sureBtn);
       	this.sureBtn.x = 300;
       	this.sureBtn.y = this.selectBg.y;
       	
       	this.selectLabel = new cc.LabelTTF("0", "icomoon", 24, cc.size(0, 0), cc.TEXT_ALIGNMENT_LEFT); 
	   	this.selectLabel.x = 130;
	    this.selectLabel.y = 25;
	    this.selectLabel.setFontFillColor(cc.color(151,121,58));
	    this.selectBg.addChild(this.selectLabel);
	    
		this.initScrollView();
	},
	
	initScrollView:function(){
		if(this.scrollView){
			this.removeChild(this.scrollView);
			this.scrollView = null;
		}
		this.selectLabel.setString("请选择");
		this.scrollView = new ccui.ScrollView();
		this.scrollView.setVisible(false);
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setBounceEnabled(true);
        this.scrollView.setPropagateTouchEvents(false);
        this.scrollView.setContentSize(cc.size(285, 280));
        this.scrollView.setAnchorPoint(0.5,0);
        this.addChild(this.scrollView);
        var scrollViewRect = this.scrollView.getContentSize(); 
        this.scrollView.y = -scrollViewRect.height-28;
        var list = currentList;
        var i=0;
        var len = list.length;
        var item = null;
        var typeObj = null;
         var innerWidth = scrollViewRect.width;
        var innerHeight = len*46+10;
        this.scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        
        var initY = this.scrollView.getInnerContainerSize().height-28;
        for(i;i<len;i++){
        	typeObj = list[i];
        	item = new SelectItem();
        	item.setLabel(typeObj);
        	item.width = 285;
	        item.height = 48;
        	item.x = scrollViewRect.width*0.5;
        	item.y = initY;
        	initY-=46;
        	this.scrollView.addChild(item);
        }
        
            
	},
	
	
	sureSelect:function(){
		if(this.selectObj){
			for(var i=0;i<currentList.length;i++){
				var giftType = currentList[i];
				if(this.selectObj.id == giftType.id){
					currentList.splice(i,1);
					break;
				}
			}
			BG.MainView.getInstance().startGame(this.selectObj);
		}
	},
	
	touchEvent:function(touch, event){
		if(event == ccui.Widget.TOUCH_ENDED){
			if(this.scrollView){
				if(this.scrollView.visible){
					this.scrollView.setVisible(false);
				}else{
					this.scrollView.setVisible(true);
				}
			}
		}
		
	},
	
	selectGiftType:function(obj){
		if(obj){
			this.selectObj = obj;
			this.selectLabel.setString(obj.value);
		}
	}
	    
})
