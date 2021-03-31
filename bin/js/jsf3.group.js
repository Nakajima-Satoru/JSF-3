jsf3.group=function(groupName,settings){

    if(settings.before){
        jsf3.callback.set("GROUP_BEFORE_"+groupName,settings.before);
    }
 
    if(settings.after){
        jsf3.callback.set("GROUP_AFTER_"+groupName,settings.after);
    }

};