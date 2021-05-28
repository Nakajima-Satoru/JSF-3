javelin.request=function(requestName,settings){

    if(settings){

        var colum=Object.keys(settings);
        
        if(!javelin.cache.request[requestName]){
            javelin.cache.request[requestName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            javelin.cache.request[requestName][field]=values;
        }

        return;
    }


    var javelinRequestObject=function(requestName){

        var _cache={};
        if(requestName){
            var _cache=javelin.cache.request[requestName];
        }

        if(!_cache){
            _cache={};
        }

        this.send=function(option){

            var _opt={};

            var _cacheColum=Object.keys(_cache);
            for(var n=0;n<_cacheColum.length;n++){
                var field=_cacheColum[n];
                var value=_cache[field];

                if(!(
                    field == "done" ||
                    field == "fail" ||
                    field == "always" || 
                    field == "beforeSend"
                )){
                    _opt[field]=value;
                }
            }

            var _optionColum=Object.keys(option);
            for(var n=0;n<_optionColum.length;n++){
                var field=_cacheColum[n];
                var value=option[field];

                if(field=="url"){
                    if(_opt.url){
                        _opt.url+=value;
                    }
                    else{
                        _opt.url=value;
                    } 
                }
                else{
                    if(!(
                        field == "done" ||
                        field == "fail" ||
                        field == "always" ||
                        field == "beforeSend"
                    )){
                        _opt[field]=value;
                    }
                }
            }

            var ajax=$.ajax(_opt);

            ajax.done(function(data, textStatus, jqXHR){
                
                var callObj=new javelinRequestResponseObject({
                    data:data,
                    textStatus:textStatus,
                    jqXHR:jqXHR,
                });

                javelin.sync([
                    function(next){
                        callObj.next=function(){
                            this._waited=false;
                            next();
                        }
                        next();
                    },
                    function(next){

                        if(_cache.success){
                            _cache.done=_cache.success;
                        }

                        if(!_cache.done){
                            next();
                            return;
                        }

                        _cache.done(callObj);

                        if(!callObj._waited){
                            next();
                        }
    
                    },
                    function(next){

                        if(option.success){
                            option.done=option.success;
                        }

                        if(!option.done){
                            next();
                            return;
                        }

                        option.done(callObj);

                        if(!callObj._waited){
                            next();
                        }
                    },
                ]);

            });

            ajax.fail(function(jqXHR, textStatus, errorThrown){
                
                var callObj=new javelinRequestResponseObject({
                    jqXHR:jqXHR,
                    textStatus:textStatus,
                    errorThrown:errorThrown,
                });

                javelin.sync([
                    function(next){
                        callObj.next=function(){
                            this._waited=false;
                            next();
                        }
                        next();
                    },
                    function(next){
                        
                        if(_cache.error){
                            _cache.fail=_cache.error;
                        }

                        if(!_cache.fail){
                            next();
                            return;
                        }

                        _cache.fail(callObj);

                        if(!callObj._waited){
                            next();
                        }
                    },
                    function(next){

                        if(option.error){
                            option.fail=option.error;
                        }

                        if(!option.fail){
                            next();
                            return;
                        }

                        option.fail(callObj);

                        if(!callObj._waited){
                            next();
                        }
                    },
                ]);

            });

            ajax.always(function(arg1,textStatus,arg3){

                if(textStatus=="error"){
                    var _o={
                        jqXHR:arg1,
                        textStatus:textStatus,
                        errorThrown:arg3,
                    };
                }
                else{
                    var _o={
                        data:arg1,
                        textStatus:textStatus,
                        jqXHR:arg3,
                    };
                }

                var callObj=new javelinRequestResponseObject(_o);
                
                javelin.sync([
                    function(next){
                        callObj.next=function(){
                            this._waited=false;
                            next();
                        }
                        next();
                    },
                    function(next){

                        if(_cache.complete){
                            _cache.always=_cache.complete;
                        }

                        if(!_cache.always){
                            next();
                            return;
                        }

                        _cache.always(callObj);

                        if(!callObj._waited){
                            next();
                        }
                    },
                    function(next){

                        if(option.complete){
                            option.always=option.complete;
                        }

                        if(!option.always){
                            next();
                            return;
                        }

                        option.always(callObj);

                        if(!callObj._waited){
                            next();
                        }
                    },
                ]);

            });

            return ajax;

        };

    };

    return new javelinRequestObject(requestName);

};

var javelinRequestResponseObject=function(params){

    this._waited=false;

    var colum=Object.keys(params);
    for(var n=0;n<colum.length;n++){
        var field=colum[n];
        var value=params[field];
        this[field]=value;
    }

    this.wait=function(){
        this._waited=true;
    };

};