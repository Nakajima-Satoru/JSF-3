javelin.validator("test2",{

    rules:{
        required:[
            {
                rule:"required",
                message:"Not entered.",
            },
        ],
        alphaNumeric:[
            {
                rule:["alphaNumeric","-_"],
                message:"Enter only half-width alphanumeric characters and permitted characters.",
            },
        ],
        numeric:[
            {
                rule:["numeric","-_"],
                message:"Enter only half-width numeric characters and permitted characters.",
            },
        ],
        minLength:[
            {
                rule:["minLength",6],
                message:"Enter at least 6 characters.",
            },
        ],
        maxLength:[
            {
                rule:["maxLength",20],
                message:"Enter within 20 characters.",
            },
        ],
        betweenLength:[
            {
                rule:["betweenLength",6,20],
                message:"Enter within the range of 6 to 20 characters.",
            },
        ],
    },

});