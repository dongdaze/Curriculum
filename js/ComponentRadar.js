//掌握技能页面组件
var ComponentRadar=function(name,cfg){

	var component=new ComponentBase(name,cfg);
//创建画布
	var w=cfg.width;
	var h=cfg.height;

	var canvas=document.createElement("canvas");
	var ctx=canvas.getContext("2d");

	ctx.width=canvas.width=w;
	ctx.height=canvas.height=h;
	component.append(canvas);
	var r=w/2;
	var step=cfg.data.length;

//绘制radar背景（8个五边形和脉络线）
	var colors=false;
	for(var s=8;s>0;s--){

		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var x=r+Math.sin(rad)*r*(s/8);
			var y=r+Math.cos(rad)*r*(s/8);
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fillStyle=(colors =! colors)?"#014d6c":"#c4e2d8";
		ctx.fill();
	}

//脉络线和文字	
	ctx.beginPath();
	for(var i=0;i<step;i++){
		var rad=(2*Math.PI/360)*(360/step)*i;
		var x=r+Math.sin(rad)*r;
		var y=r+Math.cos(rad)*r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);

		var text=$("<div class='text'></div>");
		text.text(cfg.data[i][0]);
		component.append(text);
		text.css("opacity",0);
		text.css("transition","all 1s "+i*.2 +""+"s");  
		//设置文本位置的方法
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

	ctx.strokeStyle="#ccc";
	ctx.stroke();

	//数据结构
	var canvas=document.createElement("canvas");
	var ctx=canvas.getContext("2d");
	ctx.width=canvas.width=w;
	ctx.height=canvas.height=h;
	component.append(canvas);

	var draw=function(per){

		ctx.clearRect(0,0,w,h);
		//画闭合线
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;

			ctx.lineTo(x,y);
		}
			ctx.closePath();
			ctx.lineWidth=3;
			ctx.strokeStyle="#c00";
			ctx.stroke();

		//画闭合线上的圆点
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;
			ctx.beginPath();
			ctx.arc(x,y,6,0,2*Math.PI);
			ctx.fillStyle="#f00";
			ctx.fill();
			ctx.closePath();
		}

		//设置文本动画
		if(per >=1){
			component.find(".text").css("opacity",1);
		}else{
			component.find(".text").css("opacity",0);
		}
			
			
	}

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