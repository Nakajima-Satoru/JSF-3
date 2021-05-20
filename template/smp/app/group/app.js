jsf3.group("app",{

	before:function(obj){
		
		if(obj.mode!="next"){
			return;
		}

		if(jsf3.localStorage.get("auth")){

			jsf3.element("sidemenu").put(".sidemenu");
	
			jsf3.element("header").put("header",{
				before:function(obj){
					obj.obj.addClass("open");
				},
			});

			obj.next();
		}
		else{

			var pageName=obj.nextPage.pageNameFull;

			if(pageName!="login/index"){
				jsf3.redirect.next("login/index");
				obj.exit();
				return;
			}
		}

	},

});