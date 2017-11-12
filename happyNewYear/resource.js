var res = {
    mainResource_png : "res/img/mainResource.png",
    mainResource_plist : "res/img/mainResource.plist",
    r_bg : "res/img/bg.png",
    r_light : "res/img/light.png",
    r_snow : "res/img/snow.png",
    r_fire : "res/img/fire.png",
    r_star1 : "res/img/stars.png",
    r_snow1 : "res/img/snow/blue_snow.png",
    r_snow2 : "res/img/snow/green_snow.png",
    r_snow3 : "res/img/snow/purple_snow.png",
    r_snow4 : "res/img/snow/red_snow.png",
    r_snow5 : "res/img/snow/sky_snow.png",
    r_snow6 : "res/img/snow/yellow_snow.png",
    r_gift_title : "res/img/giftTypeTitle.png",
    r_gold : "res/img/snow/gold.png",
    r_gift_list_bg : "res/img/giftListBg.png",
 
    //music
    bg_music: "res/music/bg.mp3",
    success_music: "res/music/success.mp3",
};

var g_resources = [];
g_resources.push({
	type:"font",
	name:"icomoon",
	srcs:["res/font/icomoon.ttf"]
});

for (var i in res) {
    g_resources.push(res[i]);
}