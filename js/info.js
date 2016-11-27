//基本页面组件
var Info=function(){

	this.el=$("<div class='info'>").hide();
	$("body").append(this.el);
	this.page=[];

	this.addPage=function(name,text){
		var page=$("<div class='info_page section'>");

		if(name != undefined){
			page.addClass("info_page_"+name);
		}
		if(text !=undefined){
			page.text(text);
		}	
		this.page.push(page);
		this.el.append(page);
		return this;
	}

	this.addComponent=function(name,cfg){
		var cfg=cfg || {};
		var component;
		var page=this.page.slice(-1)[0];

		cfg=$.extend({
			type:"base",
		},cfg)

		switch(cfg.type){
			case "base":
				component=new ComponentBase(name,cfg);
				break;
			case "bar":
				component=new ComponentBar(name,cfg);
				break;
			case "radar":
				component=new ComponentRadar(name,cfg);
				break;
			case "pie":
				component=new ComponentPie(name,cfg);
				break;					
			default:
		}

		page.append(component);
		return this;

	}

	this.loader=function(firstPage){
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction){
				$(this).find(".con_compoent").trigger("onLeave");
			},
			afterLoad:function(anchorLink,index){
				$(this).find(".con_compoent").trigger("onLoad");
			}
		});
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	}
	return this;
}


