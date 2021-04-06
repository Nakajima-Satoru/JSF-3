jsf3.load=function(loadOption){

    if(location.search){

        var search=location.search;
        if(search[0]=="?"){
            search=search.substring(1);
        }

        var buffer=search.split("&");

        var query={};
        for(var n=0;n<buffer.length;n++){
            var buffer2=buffer[n].split("=");
            query[buffer2[0]]=buffer2[1];
        }

        if(loadOption.queryRouting){
            if(query.path){
                loadOption.topPage=query.path;
            }
        }
    }

    jsf3.option=loadOption;

    $(window).on("load",function(){

        jsf3.sync([

            function(next){

                var pagearea=$("pagearea");

                if(jsf3.option.animation){
                    pagearea.addClass(jsf3.option.animation);
                }

                next();
            },

            function(next){

                if(jsf3.cache.common.start){

                    var callback=jsf3.cache.common.start;

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
                if(!jsf3.option.topPage){
                    jsf3.option.topPage="main";
                }

                var nextOption={};
                if(jsf3.option.firstAnimation){
                    nextOption.animation=jsf3.option.firstAnimation;
                }

                jsf3.redirect.next(jsf3.option.topPage,nextOption);
            },

        ]);

        $("html").on("click","a",function(){

            try{

                if(jsf3.locking.link){
                    return false;
                }

                var href=$(this).attr("href");
                var backto=$(this).attr("backto");

                var leavePage=$(this).attr("data-leave-page");

                var opt={
                    leavePage:leavePage,
                };

                if(backto !== undefined){
                    jsf3.redirect.back();
                }
    
                if(href!="#"){
                    jsf3.redirect.next(href,opt);
                }

                
            }catch(err){
                console.log(err);
            }

            return false;
        });

        window.onpopstate=function(event){

            if(jsf3.locking.back){
                return false;
            }

            try{
                jsf3.redirect.back();
            }catch(err){
                console.log(err);
            }

            return false;
        };

        $("html").on("submit","form",function(){

            try{

                var formId=$(this).attr("id");

                var getData=jsf3.form(formId).getData();

                var callobj={
                    id:formId,
                    form:$(this),
                    data:getData,
                };

                var _form=jsf3.cache.form[formId];

                if(!_form){
                    return false;
                }

                if(!_form.submit){
                    return false;
                }

                var _callback=_form.submit;
                _callback(callobj);
    
            }catch(err){
                console.log(err);
            }

            return false;
        });

        $("html").on("reset","form",function(){

            try{

                var formId=$(this).attr("id");

                var getData=jsf3.form(formId).getData();

                var callobj={
                    id:formId,
                    form:$(this),
                    data:getData,
                };

                var _form=jsf3.cache.form[formId];

                if(!_form){
                    return false;
                }

                if(!_form.reset){
                    return false;
                }

                var _callback=_form.reset;
                _callback(callobj);

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

            jsf3.formFileBuffer[field]=fileBuffers;
        });

    });

};