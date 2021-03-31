jsf3.callback={

    set:function(name, callbacks){
        jsf3.cache.callbacks[name]=callbacks;
    },

    get:function(name){
        if(jsf3.cache.callbacks[name]){
            return jsf3.cache.callbacks[name];
        }
    },

};

jsf3.start=function(callbacks){
    jsf3.callback.set("START",callbacks);
};