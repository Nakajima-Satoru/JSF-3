javelin.group("app",{

	before:function(obj){

		setTitle();

		if(obj.mode!="next"){
			return;
		}


		javelin.element("sidemenu").put(".sidemenu",{
			before:function(obj){
				obj.obj.addClass("open");
			},
		});
	
		javelin.element("header").put("header",{
			before:function(obj){
				obj.obj.addClass("open");
			},
		});
	
	},

});