jsf3.page("form2",{

    group:"app",

    before:function(obj){

        jsf3.form("form01").tagOpen({
            setData:{
                name:"ぶてねこ　太郎",
                email:"buteneko@email.jp",
                gender:2,
                radio:3,
                checkbox:[0,5],
                message:"ああああああああああああああ!",    
            },
            ignore:[
                "file",
            ],
        });

    },

});