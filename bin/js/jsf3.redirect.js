
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
            mode:"next",
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
        callObj.pageObj=nextPageObj;

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

                /** set wait function */
                callObj.next=function(){
                    callObj._waited=false;
                    next();
                };
                next();
            },

            function(next){

                /** group before / beforeNext */
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
                        if(_g.beforeNext){
                            var _callback=_g.beforeNext;

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

                /** before */
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

                /** beforNext */
                if(!_pageData.beforeNext){
                    next();
                    return;
                }
                
                var callback=_pageData.beforeNext;
                callback(callObj);
                if(!callObj._waited){
                    next();
                }

            },

            function(next){

                /** option before */
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

                /** page tag class move */
                var pageClose=function(){

                    if(now){
                        if(!option.leavePage){
                            pageArea.find("page#"+now.id).remove();
                        }
                    }
                };


                var pageOpen=function(){
                    var nowPageArea=pageArea.find("page#"+_next.id);
                    nowPageArea.addClass("open");
                };

                if(jsf3.option.animation){
                    setTimeout(function(){
                        pageClose();
                        pageOpen();                        
                        setTimeout(function(){
                            next();
                        },560);
                    },500);
                }
                else{
                    pageClose();
                    pageOpen();  
                    next();
                }

            },

            function(next){

                /** group after / afterNext */
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

                        if(_g.afterNext){
                            var _callback=_g.afterNext;

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

                /** after */
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

                /** afterNext */
                if(!_pageData.afterNext){
                    next();
                    return;
                }

                var callback=_pageData.afterNext;
                callback(callObj);
                if(!callObj._waited){
                    next();
                }

            },

            function(next){

                /** option after */
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

        if(!option){
            option={};
        }

        var now=jsf3.buffer.nowPage;

        if(!jsf3.buffer.pages[jsf3.buffer.pageMoveIndex-1]){
            return;
        }

        var _back=jsf3.buffer.pages[jsf3.buffer.pageMoveIndex-1];
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

        var backPageObj=pageArea.find("#"+_back.id);
        callObj.pageObj=backPageObj;

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

                /** set wait function */
                callObj.next=function(){
                    next();
                };
                next();
            },

            function(next){

                /** group before / baforeBack */
                if(!_backPageData.group){
                    next();
                    return;
                }

                if(typeof _backPageData.group=="string"){
                    _backPageData.group=[_pageData.group];
                }

                var groupCallbackList=[];

                for(var n=0;n<_backPageData.group.length;n++){

                    var groupName=_backPageData.group[n];
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

                        if(_g.beforeBack){
                            var _callback=_g.beforeBack;

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

                /** before */
                if(!_backPageData.before){
                    next();
                    return;
                }

                var callback=_backPageData.before;
                callback(callObj);
                if(!callObj._waited){
                    callObj.next();
                }

            },

            function(next){

                /** option before */
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

                /** beforeBack */
                if(!_backPageData.beforeBack){
                    next();
                    return;
                }

                var callback=_backPageData.beforeBack;
                callback(callObj);
                if(!callObj._waited){
                    callObj.next();
                }
            },

            function(next){
            
                /** page tag class move */
                var pageClose=function(){
                    pageArea.find("page#"+now.id).remove();
                };

                var pageOpen=function(){
                    var nowPageArea=pageArea.find("page#"+_back.id);
                    nowPageArea.addClass("open");
                };
                
                if(jsf3.option.animation){
                    setTimeout(function(){
                        pageClose();
                        pageOpen();
                        next();                            
                        setTimeout(function(){
                            pageArea.removeClass("back");
                        },500);
                    },500);
                }
                else{
                    pageClose();
                    pageOpen();
                    next();
                    pageArea.removeClass("back");
                }

            },
        
            function(next){

                /** group after / afterNext */
                if(!_backPageData.group){
                    next();
                    return;
                }

                var groupCallbackList=[];

                for(var n=0;n<_backPageData.group.length;n++){

                    var groupName=_backPageData.group[n];
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

                        if(_g.afterNext){
                            var _callback=_g.afterNext;

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

                /** after */
                if(!_backPageData.after){
                    next();
                    return;
                }

                var callback=_backPageData.after;
                callback(callObj);
                if(!callObj._waited){
                    next();
                }

            },

            function(next){

                /** afterNext */
                if(!_backPageData.afterNext){
                    next();
                    return;
                }

                var callback=_backPageData.afterNext;
                callback(callObj);
                if(!callObj._waited){
                    next();
                }

            },

            function(next){

                /** option after */
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

    refresh:function(option){



    },
    
};