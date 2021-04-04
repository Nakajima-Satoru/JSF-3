jsf3.page("main",{

    group:"app",

    before:function(obj){

        console.log("main page beforer...");

        console.log(obj);

        obj.pageObj.find(".open_dialog").on("click",function(){
            console.log("OPEN Dialog");
            jsf3.dialog("dialog01").open();
        });
    
        obj.pageObj.find(".refresh_btn").on("click",function(){

            jsf3.redirect.refresh();
        });

    },

    beforeNext:function(){

        console.log("main page beforeNext....");
    },

    beforeBack:function(){

        console.log("main page beforBack....");
    },

    after:function(obj){

        console.log("main page after...");

    },

    refresh:function(obj){

        console.log("main refesh.....");
    },
});