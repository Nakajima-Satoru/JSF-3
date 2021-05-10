jsf3.group("app",{

	before:function(obj){
		
		if(obj.mode!="next"){
			return;
		}

		var pageName=obj.nextPage.pageNameFull;

		if(jsf3.data("auth").get()){
			$("header").addClass("open");
			obj.next();
		}
		else{
			if(pageName!="login/index"){
				jsf3.redirect.next("login/index");
				$("header").removeClass("open");
				obj.exit();
				return;
			}
		}

	},

});