javelin.load=function(loadOption){

    const getQuery = function(){

        var search=location.search;

        if(!search[0]){
            return {};
        }

        if(search[0]=="?"){
            search=search.substring(1);
        }

        var buffer=search.split("&");

        var query={};
        for(var n=0;n<buffer.length;n++){
            var buffer2=buffer[n].split("=");
            query[buffer2[0]]=buffer2[1];
        }

        return query;
    };

    var query = getQuery();
    
    if(loadOption.queryRouting){

        if(query._path){
            loadOption.topPage=query._path;
        }

        if(query != {}){


            var colum=Object.keys(query);
            
            for(var n=0;n<colum.length;n++){
                var field = colum[n];
                if(field != "_path"){
                    if(n==0){
                        loadOption.topPage+="?";
                    }
                    if(n>0){
                        loadOption.topPage+="&";
                    }
                    var value = query[field];
                    loadOption.topPage+=field+"="+value;
                }
            }

        }
        
        loadOption.aregment=query;
    }

    javelin.option=loadOption;

    $(window).on("load",function(){

        javelin.sync([

            function(next){

                var pagearea=$(".pagearea");

                if(javelin.option.animation){
                    pagearea.addClass(javelin.option.animation);
                }

                next();
            },

            function(next){

                if(javelin.cache.common.start){

                    var callback=javelin.cache.common.start;

                    var callObj={
                        _waited:false,
                        next:function(){
                            next();
                        },
                        wait:function(){
                            this._waited=true;
                        },
                    };

                    callback(callObj);

                    if(!callObj._waited){
                        callObj.next();
                    }
                }
                else{
                    next();
                }

            },

            function(){

                if(!javelin.redirect.exists(javelin.option.topPage)){
                    javelin.throw("Page Not Found. \""+javelin.option.topPage+"\"");
                    return;
                }

                if(!javelin.option.topPage){
                    javelin.option.topPage="main";
                }

                var nextOption={};
                if(javelin.option.firstAnimation){
                    nextOption.animation=javelin.option.firstAnimation;
                }

                javelin.redirect.next(javelin.option.topPage,nextOption);
            },

        ]);

        $("html").on("click","a",function(){

            try{

                if(javelin.locking.link){
                    return false;
                }

                var href=$(this).attr("href");
                var backto=$(this).attr("backto");

                var leavePage=$(this).attr("data-leave-page");

                var opt={
                    leavePage:leavePage,
                };

                if(backto !== undefined){
                    javelin.redirect.back();
                }
    
                if(href!="#"){
                    javelin.redirect.next(href,opt);
                }

                
            }catch(err){
                console.log(err);
            }

            return false;
        });

        window.onpopstate=function(event){

            if(javelin.locking.back){
                return false;
            }

            try{
                javelin.redirect.back();
            }catch(err){
                console.log(err);
            }

            return false;
        };

        $("html").on("submit","form",function(){

            try{

                var formId=$(this).attr("id");

                var getData=javelin.form(formId).getData();

                var _form=javelin.cache.form[formId];

                if(!_form){
                    return false;
                }

                if(!_form.submit){
                    return false;
                }

                var callObj=new formCallbackObject({
                    id:formId,
                    form:$(this),
                    data:getData,
                });

                var _callback=_form.submit;
                if(_callback){
                    _callback(callObj);
                }
    
            }catch(err){
                console.log(err);
            }

            return false;
        });

        $("html").on("reset","form",function(){

            try{

                var formId=$(this).attr("id");

                var getData=javelin.form(formId).getData();

                var _form=javelin.cache.form[formId];

                if(!_form){
                    return false;
                }

                if(!_form.reset){
                    return false;
                }

                var callObj=new formCallbackObject({
                    id:formId,
                    form:$(this),
                    data:getData,
                });

                var _callback=_form.reset;
                if(_callback){
                    _callback(callObj);
                }

            }catch(err){
                console.log(err);
            }

            return false;


        });

        $("html").on("change","input[type=file]",function(e){

            var fileBuffers=[];
            var field=$(this).attr("name");

            var files=$(this).prop("files");

            for(var n=0;n<files.length;n++){
                var file=files[n];

                var fr=new FileReader();
                fr.onload=function(evt) {
                    fileBuffers.push({
                        name:file.name,
                        size:file.size,
                        type:file.type,
                        lastModifiedDate:file.lastModifiedDate,
                        result:evt.target.result,
                    });
                };
                fr.readAsDataURL(file);    
            }

            javelin.formFileBuffer[field]=fileBuffers;
        });

    });

};

var formCallbackObject=function(params){

    var paramsColum=Object.keys(params);
    for(var n=0;n<paramsColum.length;n++){
        var field=paramsColum[n];
        var value=params[field];
        this[field]=value;
    }

};