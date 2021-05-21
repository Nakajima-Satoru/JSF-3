javelin.group("app",{

	before:function(obj){
		
		if(obj.mode!="next"){
			return;
		}

		if(javelin.localStorage.get("auth")){

			javelin.element("sidemenu").put(".sidemenu");
	
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
				javelin.redirect.next("login/index");
				obj.exit();
				return;
			}
		}

	},

});