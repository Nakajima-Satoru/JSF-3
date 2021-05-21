javelin.page=function(pageName,settings){

    if(settings){

        var colum=Object.keys(settings);

        if(!javelin.cache.page[pageName]){
            javelin.cache.page[pageName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            javelin.cache.page[pageName][field]=values;
        }

        return;
    }

};
