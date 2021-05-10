jsf3.page("login/logout",{

	group:"app",
	
	before:function(obj){

		jsf3.data("auth").delete();

		$("wk").addClass("closed");

		setTimeout(function(){

			$("wk").remove();

			$(".sidemenu").removeClass("open").addClass("closed");
			$("header").removeClass("open").addClass("closed");
			
			setTimeout(function(){
				$(".sidemenu").html("");
				$("header").html("");
			},500);
	
			jsf3.redirect.next("login/index",{
				bufferClear:true,
			});
	
		},300);
		
	},

});