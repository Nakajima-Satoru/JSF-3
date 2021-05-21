javelin.page("login/logout",{

	group:"app",
	
	before:function(obj){

		javelin.localStorage.delete("auth");

		$("wk").addClass("closed");

		setTimeout(function(){

			$("wk").remove();

			$(".sidemenu").removeClass("open").addClass("closed");
			$("header").removeClass("open").addClass("closed");
			
			setTimeout(function(){
				$(".sidemenu").html("");
				$("header").html("");
			},500);
	
			javelin.redirect.next("login/index",{
				bufferClear:true,
			});
	
		},300);
		
	},

});