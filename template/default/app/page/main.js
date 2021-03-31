jsf3.page("main",{

    before:function(obj){

        console.log("main page beforer...");

        $(".open_dialog").off("click").on("click",function(){
            jsf3.dialog("dialog01").open();
        });

    },

    after:function(obj){

        console.log("main page after...");

    },
    
});