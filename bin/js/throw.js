javelin.throw=function(errorCode){

    if(!javelin.option.error){
        throw new Error(errorCode);
    }

    javelin.redirect.next(javelin.option.error,{
        error:errorCode,
    });

};