
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
        
        if(jsf3.cache.pages[pageName]==undefined){
            return;
        }

        var _content=jsf3.base64.decode(jsf3.cache.pages[pageName]);

        var _next={
            id:jsf3.uniqId(),
            pageName:pageName,
            option:option,
        };

        var callObj={
            _waited:false,
            now:now,
            next:_next,
            wait:function(){
                this._waited=true;
            },
        };

        var pageArea=$("pagearea");

        var nextPage='<page id="'+_next.id+'"><wk>'+_content+'</wk></page>';
        pageArea.append(nextPage);

        var nextPageObj=pageArea.find("#"+_next.id);

        if(now){
            now.content=pageArea.find("#"+now.id).html();
            jsf3.buffer.pages.push(now);
            jsf3.buffer.pageMoveIndex++;    
        }

        jsf3.buffer.nowPage=_next;

        if(now){
            pageArea.find("page#"+now.id).removeClass("open").addClass("closed");
        }

        var _pageData={};
        if(jsf3.cache.page[pageName]){
            _pageData=jsf3.cache.page[pageName];
        }

        if(_pageData.class){
            nextPageObj.addClass(_pageData.class);
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

                if(!_pageData.group){
                    next();
                    return;
                }

                if(typeof _pageData.group=="string"){
                    _pageData.group=[_pageData.group];
                }

                var groupCallbackList=[];

                for(var n=0;n<_pageData.group.length;n++){

                    var groupName=_pageData.group[n];
                    var _g=jsf3.cache.group[groupName];

                    if(_g){
                        if(_g.before){
                            var _callback=_g.before;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj);
                                if(!callObj._waited){
                                    next2();
                                }
                            });
                        }
                    }
                   
                }

                if(groupCallbackList.length){
                    jsf3.sync(groupCallbackList);
                }

            },

            function(next){

                if(!_pageData.before){
                    next();
                    return;
                }
                
                var callback=_pageData.before;
                callback(callObj);
                if(!callObj._waited){
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
                        if(!option.leavePage){
                            pageArea.find("page#"+now.id).remove();
                        }
                    }

                    var nowPageArea=pageArea.find("page#"+_next.id);
                    nowPageArea.addClass("open");

                    setTimeout(function(){
                        next();
                    },560);

                },500);

            },

            function(next){

                if(!_pageData.group){
                    next();
                    return;
                }

                var groupCallbackList=[];

                for(var n=0;n<_pageData.group.length;n++){

                    var groupName=_pageData.group[n];
                    var _g=jsf3.cache.group[groupName];

                    if(_g){
                        if(_g.after){

                            var _callback=_g.after;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj);
                                if(!callObj._waited){
                                    next2();
                                }
                            });

                        }
                    }
                }

                if(groupCallbackList.length){
                    jsf3.sync(groupCallbackList);
                }

            },

            function(next){

                if(!_pageData.after){
                    next();
                    return;
                }

                var callback=_pageData.after;
                callback(callObj);
                if(!callObj._waited){
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

        if(!jsf3.buffer.pages[jsf3.buffer.pageMoveIndex-1]){
            return;
        }

        var _back=jsf3.buffer.pages[jsf3.buffer.pageMoveIndex-1];
        jsf3.buffer.pageMoveIndex--;

        var callObj={
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
        if(_back.option){
            if(pageArea.find("#"+_back.id).length){
                pageArea.find("#"+_back.id).removeClass("closed");
            }
            else{
                pageArea.append(backpage);                
            }
        }
        else{
            pageArea.append(backpage);
        }

        jsf3.buffer.nowPage=_back;

        if(now){
            $("pagearea page#"+now.id).removeClass("open").addClass("closed");
        }

        var _backPageData={};
        if(jsf3.cache.page[_back.pageName]){
            _backPageData=jsf3.cache.page[_back.pageName];
        }

        jsf3.sync([

            function(next){
                callObj.next=function(){
                    next();
                };
                next();
            },

            function(next){
/*
                if(!_backPageData.before){
                    next();
                    return;
                }

                var callback=_backPageData.before;
                callback(callObj);
                if(!callObj._waited){
                    callObj.next();
                }
*/
                next();

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
    
                },500);

            },

        ]);

    },

};