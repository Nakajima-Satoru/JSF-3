jsf3.page("login/logout",{

	before:function(obj){

		jsf3.data("auth").delete();

		$(".sidemenu").removeClass("open").addClass("closed");
		setTimeout(function(){
			$(".sidemenu").html("");
		},500);
		

		jsf3.redirect.next("login/index",{
			bufferClear:true,
		});
	},

});