//基本页面组件
var ComponentBase=function(name,cfg){

	var cfg=cfg || {};

	var cls=" con_compoent"+cfg.type;
	var component=$("<div class='con_compoent"+cls+" con_compoent_name_"+name+"'>");
//设置基本样式
	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css("backgroundImage","url("+cfg.bg+")");

	if(cfg.center===true){
		component.css({
			marginLeft:(cfg.width/4)*-1+"px",
			left:"50%"
		})
	}
	if(typeof cfg.onclick === "function"){
		component.on("click",cfg.onclick)
	}

//为新增的组件增加动画函数，onload和onleave,以及自定义的动画（css的变换）
	component.on("onLoad",function(){
		setTimeout(function(){
			component.addClass(cls+"_load").removeClass(cls+"_leave");
			cfg.animateIn && component.animate(cfg.animateIn);		
		},cfg.delay || 0);
		
		return false;
	});
	component.on("onLeave",function(){
		setTimeout(function(){
			component.addClass(cls+"_leave").removeClass(cls+"_load");
			cfg.animateOut && component.animate(cfg.animateOut);
		},cfg.delay || 0);
		return false;
	});

	return component;
}
