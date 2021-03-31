jsf3.page=function(pageName,settings){

    if(settings.group){
        var _pageName=jsf3.base64.encode(pageName);
        if(!jsf3.cache.data.page[_pageName]){
            jsf3.cache.data.page[_pageName]={};
        }

        if(typeof settings.group=="string"){
            settings.group=[settings.group];
        }

        jsf3.cache.data.page[_pageName].group=settings.group;
    }
    if(settings.render){
        var _pageName=jsf3.base64.encode(pageName);
        if(!jsf3.cache.data.page[_pageName]){
            jsf3.cache.data.page[_pageName]={};
        }

        jsf3.cache.data.page[_pageName].render=settings.render;
    }

    if(settings.before){
        var _pageName="PAGE_BEFORE_"+jsf3.base64.encode(pageName);
        jsf3.callback.set(_pageName,settings.before);
    }

    if(settings.after){
        var _pageName="PAGE_AFTER_"+jsf3.base64.encode(pageName);
        jsf3.callback.set(_pageName,settings.after);
    }

};
