jsf3.page=function(pageName,settings){

    if(settings.before){
        var _pageName="PAGE_BEFORE_"+jsf3.base64.encode(pageName);
        jsf3.callback.set(_pageName,settings.before);
    }

    if(settings.after){
        var _pageName="PAGE_AFTER_"+jsf3.base64.encode(pageName);
        jsf3.callback.set(_pageName,settings.after);
    }

    if(settings.leave){
        var _pageName="PAGE_LEAVE_"+jsf3.base64.encode(pageName);
        jsf3.callback.set(_pageName,settings.leave);
    }

};
