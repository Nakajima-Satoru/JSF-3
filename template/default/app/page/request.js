jsf3.page("request",{

	before:function(obj){

		obj.pageObj.find(".request_test1").on("click",function(){

			jsf3.request("test").send({
				url:"abcdefg",
				method:"post",
				always:function(res){
					console.log(res);
				}
			});


		});

	},

});