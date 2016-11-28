//掌握技能页面组件
var ComponentBar=function(name,cfg){

	var component=new ComponentBase(name,cfg);

	$.each(cfg.data,function(idx,item){

		var line=$("<div class='line'>");
		var name=$("<div class='name'>");
		var rate=$("<div class='rate'>");
		var bgStyle="";
		if(item[2]){
			bgStyle="style='background-color:"+item[2]+"'";
		}

		name.text(item[0]);

		var width=item[1]*100+"%";

		rate.css("width",width);

		rate.html("<div class='bg' "+bgStyle+"></div>")

		line.append(name).append(rate);

		component.append(line);

	})

	return component;

}