javelin.form("test2",{

	tags:{
		required:{
			type:"text",
		},
		alphaNumeric:{
			type:"text",
		},
        numeric:{
            type:"text",
        },
        minLength:{
            type:"text",
        },
        maxLength:{
            type:"text",
        },
        betweenLength:{
            type:"text",
        },
		submit:{
			type:"submit",
			value:"Submit",
			class:"btn btn-success",
		},
	},

	submit:function(obj){

        var vres = javelin.validator("test2").verify(obj.data);

        if(vres){
            return;
        }

        console.log(obj.data);
        
	},
});