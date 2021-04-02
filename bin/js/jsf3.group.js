jsf3.group=function(groupName,settings){

    if(settings){

        var colum=Object.keys(settings);
        
        if(!jsf3.cache.group[groupName]){
            jsf3.cache.group[groupName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.group[groupName][field]=values;
        }

    }

};