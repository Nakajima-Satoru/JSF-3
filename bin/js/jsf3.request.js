jsf3.request=function(requestName,settings){

    if(settings){

        var colum=Object.keys(settings);
        
        if(!jsf3.cache.request[requestName]){
            jsf3.cache.request[requestName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.request[requestName][field]=values;
        }

        return;
    }


    var _this=function(requestName){

        this.send=function(option){



        };

    };

    return new _this(requestName);

};