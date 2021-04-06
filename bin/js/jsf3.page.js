jsf3.page=function(pageName,settings){

    if(settings){

        var colum=Object.keys(settings);

        if(!jsf3.cache.page[pageName]){
            jsf3.cache.page[pageName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.page[pageName][field]=values;
        }

        return;
    }

};
