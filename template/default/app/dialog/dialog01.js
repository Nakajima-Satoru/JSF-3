jsf3.dialog("dialog01",{

    open:function(obj){

        obj.dialog.find(".message_btn").on("click",function(){

            jsf3.dialog("message").open({
                message:"メッセージを表示しました",
            });

        });

    },

});