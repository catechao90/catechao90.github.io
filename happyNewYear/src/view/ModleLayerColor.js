var ModelLayerColor = cc.LayerColor.extend({
//	m_touchListener:null,
//	ctor:function(){
//	    this._super();
//	    var touchListener = {
//	      event: cc.EventListener.TOUCH_ONE_BY_ONE,
//	      swallowTouches: true,
//	      onTouchBegan: this.onTouchBegan
//	    };
//	    cc.eventManager.addListener(touchListener, this);
//	    this.m_touchListener = touchListener;
//	},
//	onTouchBegan:function(touch, event) {
//	    var target = event.getCurrentTarget();
//	    if(!target.isVisible()||(!this.isTouch(target,touch))){
//	      return false;
//	    }
//	    return true;
//	},
//	isTouch:function(owner,touch){
//	    if(!owner || !owner.getParent()){
//	      return false;
//	    }
//	    var touchLocation = touch.getLocation(); // Get the touch position
//	    touchLocation = owner.getParent().convertToNodeSpace(touchLocation);
//	    return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation);
//	}
	onEnter: function () {
	    this._super();
	    this.setColor(cc.color.BLACK);
	    this.setOpacity(160);
	    var listener = cc.EventListener.create({
	        event: cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
	        onTouchBegan: function (touch, event) {
	            return true;
	        }
	    });
	    cc.eventManager.addListener(listener, this);
	    this._listener = listener;
	},
	 
	onExit: function () {
	    cc.eventManager.removeListener(this._listener);
	    this._super();
	}
});