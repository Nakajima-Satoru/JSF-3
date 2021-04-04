jsf3.page("main",{

    group:"app",

    before:function(obj){

        console.log("main page beforer...");
        
        console.log(obj);

        obj.pageObj.find(".open_dialog").on("click",function(){
            console.log("OPEN Dialog");
            jsf3.dialog("dialog01").open();
        });

    },

    after:function(obj){

        console.log("main page after...");

    },
    
});