jsf3.dialog("message",{

    open:function(obj){
        
        var message=obj.option.message;

        obj.dialog.find(".message").text(message);

    },

});