jsf3.form("form01",{

    tags:{
        name:{
            type:"text",
            placeholder:"山田 太郎",
        },
        email:{
            type:"text",
        },
        gender:{
            type:"select",
            selected:{
                2:"なし",
                0:"男性",
                1:"女性",
            },
            value:0,
        },
        radio:{
            type:"radio",
            selected:{
                0:"Radio Text 0",
                1:"Radio Text 1",
                2:"Radio Text 2",
                3:"Radio Text 3",
            },
            value:2,
        },
        checkbox:{
            type:"checkbox",
            selected:{
                0:"Checkbox Text 0",
                1:"Checkbox Text 1",
                2:"Checkbox Text 2",
                3:"Checkbox Text 3",
                4:"Checkbox Text 4",
                5:"Checkbox Text 5",
                6:"Checkbox Text 6",
                7:"Checkbox Text 7",
            },
            value:[2,3,6],
        },
        message:{
            type:"textarea",
            style:"height:300px;",
            value:"あああああああああ\nえええええええええええ",
        },
        file:{
            type:"file",
            multiple:true,
        },
        submit:{
            type:"submit",
            value:"送信する",
        },
    },

    submit:function(obj){

        console.log(obj);

    },


});