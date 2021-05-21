javelin.group=function(groupName,settings){

    if(settings){

        var colum=Object.keys(settings);
        
        if(!javelin.cache.group[groupName]){
            javelin.cache.group[groupName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            javelin.cache.group[groupName][field]=values;
        }

    }

};