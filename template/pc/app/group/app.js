jsf3.group("app",{

	before:function(obj){

		obj.wait();

		if(!jsf3.data("auth").get()){
			jsf3.redirect.next("login/index");
			obj.exit();
			return;
		}

		obj.next();

	},

});