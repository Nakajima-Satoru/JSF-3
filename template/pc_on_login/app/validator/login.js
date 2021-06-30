javelin.validator("login",{

    rules:{
        username:[
            {
                rule:"required",
                message:"User ID not entered.",
            },
            {
                rule:["maxLength",100],
                message:"Enter within 100 characters.",
            },
        ],
        password:[
            {
                rule:"required",
                message:"Password not entered.",
            },
            {
                rule:["maxLength",100],
                message:"Enter within 100 characters.",
            },
        ],
    },

    ruleLogined:{
        logined:[
            {
                rule:"required",
                message:"The user who entered does not exist or there is no login optometry.",
            },
        ],
    },

});