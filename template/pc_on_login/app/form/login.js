javelin.form("login",{

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

		var vres=javelin.validator("login").verify(obj.data);

		if(vres){
			return;
		}

		loading.open();

		setTimeout(function(){

			var logined={};
			if(obj.data.username=="user" && obj.data.password=="12345"){
				logined={
					logined:true,
				};
			}
			
			var vres2=javelin.validator("login").verify(logined,{
				rule:"ruleLogined",
			});

			if(vres2){
				loading.close();
				return;
			}

			javelin.localStorage.set("auth",{
				userName:"user",
				name:"山田　太郎",
				token:"**************************************************",
			});

			obj.form.addClass("closed");
	
			setTimeout(function(){
		
				loading.close();
				
				javelin.redirect.next("top",{
					bufferClear:true,
				});
	
			},200);
			
		},1200);

	},

});