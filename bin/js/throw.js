javelin.throw=function(errorCode,option){

    if(!option){
        option={};
    }

    if(!javelin.option.error){
        throw new Error(errorCode);
    }

    var opt={
        renderingOnly:true,
        error:errorCode,
    };

    if(option.redirectToPage){
        opt.renderingOnly=false;
        opt.redirectToPage=option.redirectToPage;
    }

    javelin.redirect.next(javelin.option.error,opt);

};