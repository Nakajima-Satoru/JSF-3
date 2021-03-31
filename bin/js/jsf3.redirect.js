
jsf3.redirect={

    /**
     * next
     * @param {*} pageName 
     * @param {*} option 
     * @returns 
     */
    next:function(pageName,option){

        if(!option){
            option={};
        }

        history.pushState(pageName, null, null);

        var now=jsf3.buffer.nowPage;
        
        if(!jsf3.cache.pages[jsf3.base64.encode(pageName)]){
            return;
        }

        var _content=jsf3.cache.pages[jsf3.base64.encode(pageName)];

        _content=jsf3.base64.decode(_content);

        var _next={
            id:jsf3.uniqId(),
            pageName:pageName,
            option:option,
            content:_content,
        };

        var callObj={
            mode:"next",
            _waited:false,
            now:now,
            next:_next,
            wait:function(){
                this._waited=true;
            },
        };

        var pageArea=$("pagearea");
        
        var nextPage='<page id="'+_next.id+'"><wk>'+_next.content+'</wk></page>';
        pageArea.append(nextPage);

        jsf3.buffer.nowPage=_next;

        jsf3.buffer.pages.push(_next);
        jsf3.buffer.pageMoveIndex++;

        if(now){
            pageArea.find("page#"+now.id).removeClass("open").addClass("closed");
        }

        jsf3.sync([

            function(next){

                callObj.next=function(){
                    callObj._waited=false;
                    next();
                };
                next();
            },

            function(next){

                var callName="PAGE_BEFORE_"+jsf3.base64.encode(pageName);

                if(jsf3.callback.get(callName)){
                    var callback=jsf3.callback.get(callName);
                    callback(callObj);
                    if(!callObj._waited){
                        next();
                    }
                }
                else{
                    next();
                }

            },

            function(next){

                if(!option.callback){
                    next();
                    return;
                }

                if(!option.callback.before){
                    next();
                    return;
                }

                option.callback.before(callObj);

                if(!callObj._waited){
                    next();
                }
            },

            function(next){

                setTimeout(function(){

                    if(now){
                        pageArea.find("page#"+now.id).remove();
                    }

                    var nowPageArea=pageArea.find("page#"+_next.id);
                    nowPageArea.addClass("open");

                    setTimeout(function(){
                        next();
                    },560);

                },500);

            },

            function(next){

                var callName="PAGE_AFTER_"+jsf3.base64.encode(pageName);
                if(jsf3.callback.get(callName)){
                    var callback=jsf3.callback.get(callName);
                    callback(callObj);

                    if(!callObj._waited){
                        next();
                    }
                }
                else{
                    next();
                }
            },

            function(next){

                if(!option.callback){
                    next();
                    return;
                }

                if(!option.callback.after){
                    next();
                    return;
                }

                option.callback.after(callObj);

                if(!callObj._waited){
                    next();
                }

            },

        ]);
        
    },

    /**
     * back
     * @param {} option 
     */
    back:function(option){
        
        var now=jsf3.buffer.nowPage;

        if(!jsf3.buffer.pages[jsf3.buffer.pageMoveIndex-2]){
            return;
        }

        var _back=jsf3.buffer.pages[jsf3.buffer.pageMoveIndex-2];
        jsf3.buffer.pageMoveIndex--;

        var callObj={
            mode:"back",
            _waited:false,
            now:now,
            back:_back,
            wait:function(){
                this._waited=true;
            },
        };

        var pageArea=$("pagearea");
        pageArea.addClass("back");
        
        var backpage='<page id="'+_back.id+'"><wk>'+_back.content+'</wk></page>';
        pageArea.append(backpage);

        jsf3.buffer.nowPage=_back;

        if(now){
            $("pagearea page#"+now.id).removeClass("open").addClass("closed");
        }


        jsf3.sync([

            function(next){
                callObj.next=function(){
                    next();
                };
                next();
            },

            function(){

                var callName="PAGE_BEFORE_"+jsf3.base64.encode(_back.pageName);
                if(jsf3.callback.get(callName)){
                    var callback=jsf3.callback.get(callName);
                    callback(callObj);
                    if(!callObj._waited){
                        callObj.next();
                    }
                }
                else{
                    callObj.next();
                }

            },

            function(next){

                setTimeout(function(){

                    pageArea.find("page#"+now.id).remove();

                    var nowPageArea=pageArea.find("page#"+_back.id);
                    nowPageArea.addClass("open");

                    next();

                },500);

            },

            function(){

                setTimeout(function(){

                    pageArea.removeClass("back");

                    var callName="PAGE_AFTER_"+jsf3.base64.encode(_back.pageName);
                    if(jsf3.callback.get(callName)){
                        var callback=jsf3.callback.get(callName);
                        callback(callObj);
                    }
    
                },500);

            },

        ]);

    },

};