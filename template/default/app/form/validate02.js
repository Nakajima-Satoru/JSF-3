jsf3.form("validate02",{

    tags:{
        like:{
            type:"text",
        },
        any:{
            type:"text",
        },
        date:{
            type:"text",
        },
        minDate:{
            type:"text",
        },
        maxDate:{
            type:"text",
        },
        betweenDate:{
            type:"text",
        },
        isInt:{
            type:"text",
        },
        isBool:{
            type:"text",
        },
        isEmail:{
            type:"text",
        },
        isTel:{
            type:"text",
        },
        isIp:{
            type:"text",
        },
        isUrl:{
            type:"text",
        },
        isZipJP:{
            type:"text",
        },
        isKatakana:{
            type:"text",
        },
        isHiragana:{
            type:"text",
        },
        
        submit:{
            type:"submit",
            value:"Send",
        },
        
    },


    submit:function(obj){

        var vres=jsf3.validator("validate02").verify(obj.data);

        if(vres){ 
            console.log(vres);
            return;
        }

        console.log(obj);

    },


});