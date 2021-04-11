jsf3.request("test",{

	url:"http://localhost/",

	header:{
		aaaa:"bbbbbbbbbbbb",
	},

	always:function(res){

		res.wait();

		console.log("wait....");

		setTimeout(function(){
			
			console.log("....OK!");
			res.next();

		},1000);
	},

});