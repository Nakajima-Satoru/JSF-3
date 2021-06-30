javelin.group("app",{

	before:function(obj){

		setTitle();

		if(obj.mode!="next"){
			return;
		}

		if(javelin.localStorage.get("auth")){

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

			obj.next();
		}
		else{

			var pageName=obj.nextPage.pageNameFull;

			if(pageName!="login/index"){
				obj.pageObj.css("display","none");
				javelin.redirect.next("login/index");
				obj.exit();
			}
		}

	},

});