

jsf3.load=function(){

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

                if(jsf3.callback.get("START")){

                    var callback=jsf3.callback.get("START");

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
                jsf3.redirect.next("main");
            },

        ]);

        $("html").on("click","a",function(){

            try{

                var href=$(this).attr("href");
                var backto=$(this).attr("backto");
    
                if(backto !== undefined){
                    jsf3.redirect.back();
                }
    
                if(href!="#"){
                    jsf3.redirect.next(href);
                }

                
            }catch(err){
                console.log(err);
            }

            return false;
        });

        window.onpopstate=function(event){

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

                if(jsf3.callback.get("FORM_SUBMIT_"+formId)){
                    var _callback=jsf3.callback.get("FORM_SUBMIT_"+formId);
                    _callback(callobj);
                }
    
            }catch(err){
                console.log(err);
            }

            return false;
        });

        $("html").on("reset","form",function(){

            try{

                var formId=$(this).attr("id");

                var getData=jsf3.form(formId).getData();




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
                }
                fr.readAsDataURL(file);    
            }

            jsf3.formFileBuffer[field]=fileBuffers;
        });

    });

};