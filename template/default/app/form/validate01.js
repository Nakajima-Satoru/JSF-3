jsf3.form("validate01",{

    tags:{
        required:{
            type:"text",
        },
        required_if:{
            type:"text",
        },
        required_if_2:{
            type:"checkbox",
            selected:"required_ifを必須にする",
            value:[],
        },
        required_with:{
            type:"text",
        },
        required_with_2:{
            type:"text",
        },
        required_with_3:{
            type:"text",
        },
        required_withor:{
            type:"text",
        },
        required_withor_2:{
            type:"text",
        },
        required_withor_3:{
            type:"text",
        },

        confirmed:{
            type:"text",
        },
        confirmed_2:{
            type:"text",
        },

        alpha_numeric:{
            type:"text",
        },

        numeric:{
            type:"text",
        },

        length:{
            typre:"text",
        },
        minLength:{
            typre:"text",
        },
        maxLength:{
            typre:"text",
        },
        betweenLength:{
            type:"text",
        },
        value:{
            type:"text",
        },
        minValue:{
            type:"text",
        },
        maxValue:{
            type:"text",
        },
        betweenValue:{
            type:"text",
        },

        selectedCount:{
            type:"checkbox",
            selected:{
                0:"check0",
                1:"check1",
                2:"check2",
                3:"check3",
                4:"check4",
                5:"check5",
                6:"check6",
            },
        },
        minSelectedCount:{
            type:"checkbox",
            selected:{
                0:"check0",
                1:"check1",
                2:"check2",
                3:"check3",
                4:"check4",
                5:"check5",
                6:"check6",
            },
        },
        maxSelectedCount:{
            type:"checkbox",
            selected:{
                0:"check0",
                1:"check1",
                2:"check2",
                3:"check3",
                4:"check4",
                5:"check5",
                6:"check6",
            },
        },
        betweenSelectedCount:{
            type:"checkbox",
            selected:{
                0:"check0",
                1:"check1",
                2:"check2",
                3:"check3",
                4:"check4",
                5:"check5",
                6:"check6",
            },
        },

        submit:{
            type:"submit",
            value:"Send",
        },
    },

    submit:function(obj){

        var vres=jsf3.validator("validate01").verify(obj.data);
        console.log(vres);

        if(vres){ return ;}

        console.log(obj);

    },

});