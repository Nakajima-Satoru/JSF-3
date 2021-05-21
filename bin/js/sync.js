
javelin.sync=function(callbackList){

    var _this=function(){

        var _callbacks=[];
        var _threadIndex=0;
    
        var next=function(result){
            _threadIndex++;
            if(_callbacks[_threadIndex]){
                _callbacks[_threadIndex](next, result);
            }
        };
    
        this.then=function(callbacks){
            _callbacks.push(callbacks);
            return this;
        };
    
        this.run=function(result){
            _callbacks[_threadIndex](next,result);
        };        

    };


    if(callbackList){
        var _obj = new _this();
        for(var u=0;u<callbackList.length;u++){
            _obj.then(callbackList[u]);
        }
        _obj.run();
    }
    else{
        return new _this();
    }

};

javelin.syncFor=function(startIndex,endIndex,callbacks){

    var _o=javelin.sync();
    for(let n=startIndex;n<endIndex;n++){
        _o.then(function(next){
            callbacks(next,n); 
        });
    }
    _o.run();

};

javelin.syncEach=function(arrays,callbacks){

    var _o=javelin.sync();
    for(let n=0;n<arrays.length;n++){

        let a_=arrays[n];

        _o.then(function(next){
            callbacks(next,a_,n); 
        });
    }
    _o.run();

};