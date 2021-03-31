jsf3.form=function(formName,settings){

    if(settings){

        if(settings.submit){
            jsf3.callback.set("FORM_SUBMIT_"+formName,settings.submit);
        }
        if(settings.reset){
            jsf3.callback.set("FORM_RESET_"+formName,settings.reset);
        }
        if(settings.tags){

            
        }

        return;
    }

    var _this=function(formName){


    };

    return  new _this(formName);

};