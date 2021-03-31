

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

        $("html").on("click","a[batkto]",function(){

            jsf3.redirect.back();

            return false;
        });

        $("html").on("click","a[href]",function(){

            var pageName=$(this).attr("href");

            jsf3.redirect.next(pageName);

            return false;
        });

        window.onpopstate=function(event){
            jsf3.redirect.back();

            return false;
        };

    });

};