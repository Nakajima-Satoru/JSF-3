jsf3.page("element",{

	before:function(obj){

		$(".element_open").off("click").on("click",function(){

			jsf3.element("sample1").put(".element_put_area")

		});

		$(".element_append").off("click").on("click",function(){

			jsf3.element("sample2").append(".element_append_area")

		});



	},

});