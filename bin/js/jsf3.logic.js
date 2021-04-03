jsf3.logic=function(logicName,settings){

    if(settings){

        var colum=Object.keys(settings);

        if(!jsf3.cache.logic[logicName]){
            jsf3.cache.logic[logicName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.logic[logicName][field]=values;
        }

        return;
    }

    var _this=function(logicName){

        if(!jsf3.cache.logic[logicName]){
            return;
        }

        var _logic=jsf3.cache.logic[logicName];

        var _lcolum=Object.keys(_logic);

        for(var n=0;n<_lcolum.length;n++){
            var methodName=_lcolum[n];
            var functions=_logic[methodName];

            this[methodName]=functions;

        }

    };

    return new _this(logicName);

};