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

		var data=obj.data;

		$(".login_error").removeClass("error").text("");

		if(!(
			data.username=="user" && 
			data.password=="12345"
		)){
			$(".login_error").addClass("error").text("入力いただいたユーザーは存在しないか、ログイン検眼がありません");
			return;
		}

		jsf3.data("auth").set({
			username:"user",
			name:"山田　太郎",
		});

		jsf3.element("sidemenu").put(".sidemenu",{
			before:function(obj){
				obj.obj.addClass("open");
			},
		});

		jsf3.redirect.next("top",{
			bufferClear:true,
		});

	},

});