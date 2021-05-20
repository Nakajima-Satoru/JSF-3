jsf3.form("test1",{

	tags:{
		name:{
			type:"text",
		},
		email:{
			type:"text",
		},
		gender:{
			type:"radio",
			selected:{
				0:"男性",
				1:"女性",
			},
			value:0,
		},
		location:{
			type:"select",
			selected:jsf3.data("location").get(),
		},
		message:{
			type:"textarea",
			style:"height:100px;width:400px",
		},
		submit:{
			type:"submit",
			value:"Submit",
			class:"btn btn-success",
		},
	},

});