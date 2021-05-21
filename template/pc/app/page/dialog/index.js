javelin.page("dialog/index",{

    group:"app",

    before:(obj)=>{

        obj.pageObj.find(".dialog_1").on("click",()=>{
            javelin.dialog("dialog_1").open();
        });

        obj.pageObj.find(".dialog_2").on("click",()=>{
            javelin.dialog("dialog_2").open({
                callback:{
                    open:(d)=>{

                        d.dialog.find(".text").text("Sample Text Text....");

                        d.dialog.find(".ok").on("click",function(){
                            alert("OK");
                            d.close();
                        });

                    },    
                },
            });
        });

        obj.pageObj.find(".dialog_3").on("click",()=>{
            javelin.dialog("dialog_3").open({
                callback:{
                    open:(d)=>{
                        d.dialog.find(".dialog_3a").on("click",()=>{
                            javelin.dialog("dialog_3a").open({
                                class:"my_dialog",
                            });
                        });
                    },
                },
            });
        });


    },

});