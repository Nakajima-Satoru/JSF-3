jsf3.group("app",{

	before:function(obj){

		console.log(obj);
		
		if(obj.mode!="next"){
			return;
		}

		obj.wait();

		if(jsf3.data("auth").get()){
			console.log("login!");
			$("header").addClass("open");
			obj.next();
		}
		else{
			jsf3.redirect.next("login/index");
			$("header").removeClass("open");
			obj.exit();
			return;
		}

	},

});