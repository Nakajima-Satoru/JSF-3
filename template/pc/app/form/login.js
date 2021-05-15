jsf3.form("login",{

	tags:{
		username:{
			type:"text",
			placeholder:"user",
		},
		password:{
			type:"password",
			placeholder:"12345",
		},
		submit:{
			type:"submit",
			value:"Login",
			class:"btn btn-success",
		},
	},

	submit:function(obj){

		var vres=jsf3.validator("login").verify(obj.data);

		if(vres){
			return;
		}

		setTimeout(function(){

			var logined={};

			if(obj.data.username=="user" && obj.data.password=="12345"){
				logined={
					logined:true,
				};
			}
			
			var vres2=jsf3.validator("login").verify(logined,{
				rule:"ruleLogined",
			});

			if(vres2){
				return;
			}

			jsf3.data("auth").set({
				username:"user",
				name:"山田　太郎",
			});
	
			obj.form.addClass("closed");
	
			setTimeout(function(){
	
				jsf3.element("sidemenu").put(".sidemenu",{
					before:function(obj){
						obj.obj.addClass("open");
					},
				});
		
				jsf3.element("header").put("header",{
					before:function(obj){
						obj.obj.addClass("open");
					},
				});
		
				jsf3.redirect.next("top",{
					bufferClear:true,
				});
	
			},200);
			
		},200);

	},

});