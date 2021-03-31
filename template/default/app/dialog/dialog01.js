jsf3.dialog("dialog01",{

    open:function(obj){

        var loading=jsf3.dialog("loading").open({
            class:"loadings",
        });
        
        obj.wait();
        setTimeout(function(){

            jsf3.dialog("laoding").close(loading);
            obj.next();

        },2000);

        obj.dialog.find(".message_btn").on("click",function(){

            jsf3.dialog("message").open({
                message:"メッセージを表示しました",
            });

        });

    },

    close:function(obj){

   
    },

});