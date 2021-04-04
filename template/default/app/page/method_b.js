jsf3.page("method_b",{

	before:function(obj){

		console.log("method_b");

		jsf3.redirect.next("page1/index");
		
	},

});