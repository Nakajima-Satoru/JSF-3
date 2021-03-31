

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

            var href=$(this).attr("href");
            var backto=$(this).attr("backto");

            if(backto !== undefined){
                jsf3.redirect.back();
            }

            if(href!="#"){
                jsf3.redirect.next(href);
            }

            return false;
        });

        window.onpopstate=function(event){
            jsf3.redirect.back();
            return false;
        };

    });

};