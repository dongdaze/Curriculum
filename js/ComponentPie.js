//掌握技能页面组件
var ComponentPie=function(name,cfg){

	var component=new ComponentBase(name,cfg);
//创建画布
	var w=cfg.width;
	var h=cfg.height;

	var canvas=document.createElement("canvas");
	var ctx=canvas.getContext("2d");
	ctx.width=canvas.width=w;
	ctx.height=canvas.height=h;
	component.append(canvas);
	$(canvas).css("zIndex",1);

	var r=w/2;
	var step=cfg.data.length;

//画背景层
	var colors=["#f9ccad","#fc9d99","#ff4366","#ce3c4f"];
	var sAngel=1.5*Math.PI;
	var eAngel=0;

	for(var i=0;i<step;i++){

		var color=colors.pop();
		var rate=cfg.data[i][1];
		var eAngel=sAngel +(2*Math.PI)*rate;

		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.lineWidth=0.1;
		ctx.strokeStyle=color;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		sAngel=eAngel;
		ctx.fill();
		ctx.stroke();

		var text=$("<div class='text'>");
		text.text(cfg.data[i][0]);
		component.append(text);	
		var x=r+Math.sin(sAngel)*r;
		var y=r+Math.cos(sAngel)*r;

		if(x>w/2){
			text.css("left",x/2);
		}else{
			text.css("right",(w-x)/2);
		}
		if(y>h/2){
			text.css("top",y/2);
		}else{
			text.css("bottom",(h-y)/2);
		}

		

	}


//圆心
	var canvas=document.createElement("canvas");
	var ctx=canvas.getContext("2d");
	ctx.width=canvas.width=w;
	ctx.height=canvas.height=h;
	component.append(canvas);
	$(canvas).css("zIndex",3);

	ctx.beginPath();
	ctx.fillStyle="#ccf9f2";
	ctx.strokeStyle="#ccf9f2";
	ctx.arc(r,r,15,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

//蒙版
	var canvas=document.createElement("canvas");
	var ctx=canvas.getContext("2d");
	ctx.width=canvas.width=w;
	ctx.height=canvas.height=h;
	component.append(canvas);
	$(canvas).css("zIndex",4);

	ctx.fillStyle="#f3f4f6";
	ctx.strokeStyle="#f3f4f6";
	ctx.lineWidth=1;

	var draw=function(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);

		if(per <=0){
			component.find(".text").css("opacity",0);
			ctx.arc(r,r,r,0,2*Math.PI);
		}else{
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		}

		if(per >=1){
			component.find(".text").css("opacity",1);
		}
		ctx.fill();
		ctx.stroke();
	}

	draw(0);

 	component.on("onLoad",function(){
 		var s=0;
 		for(var i=0;i<100;i++){
 			setTimeout(function(){
 				s+=0.01;
 				draw(s);
 			},i*10+500)
 		}
	})
 	component.on("onLeave",function(){
 		var s=1;
 		for(var i=0;i<100;i++){
 			setTimeout(function(){
 				s-=0.01;
 				draw(s);
 			},i*10+500)
 		}	

 	})

	return component;
}