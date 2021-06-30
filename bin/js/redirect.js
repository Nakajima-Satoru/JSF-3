
javelin.redirect={

    /**
     * next
     * @param {*} pageName 
     * @param {*} option 
     * @returns 
     */
    next:function(pageNameFull,option){

        if(!option){
            option={};
        }

        if(!pageNameFull){
            return;
        }

        var _pbuff=this._getAregment(pageNameFull);

        var pageName=_pbuff.pageName;
        var aregment=_pbuff.aregment;

        var now=javelin.buffer.nowPage;

        if(
            now && 
            now.pageNameFull == pageNameFull && 
            now.option.error == option.error
        ){
            return;
        }

        javelin.locking.link=true;

        history.pushState(pageName, null, null);
        
        if(javelin.cache.pages[pageName]==undefined && javelin.cache.page[pageName]==undefined){
            javelin.locking.link=false;
            if(javelin.option.error){
                javelin.throw("Page Not Found.\""+pageName+"\"");
                return;
            }
            else{
                throw new Error("The redirected page or method information cannot be found.\""+pageName+"\"");
            }
        }

        var _content="";
        if(javelin.cache.pages[pageName]){
            _content=javelin.base64.decode(javelin.cache.pages[pageName]);
        }

        var _pageData={};
        if(javelin.cache.page[pageName]){
            _pageData=javelin.cache.page[pageName];
        }

        var _nextdata={
            id:javelin.uniqId(),
            pageNameFull:pageNameFull,
            pageName:pageName,
            option:option,
            aregment:aregment,
        };

        var pageArea=$(".pagearea");
        var nextPageObj=null;

        if(_content){

            var nextPage='<div class="page" id="'+_nextdata.id+'"><div class="wk">'+_content+'</div></div>';
            pageArea.append(nextPage);
            var nextPageObj=pageArea.find("#"+_nextdata.id);
            if(_pageData.class){
                nextPageObj.addClass(_pageData.class);
            }
            
            javelin.buffer.nowPage=_nextdata;
        }

        var callObj=new redirectCallbackObject({
            mode:"next",
            nowPage:now,
            nextPage:_nextdata,
            aregment:aregment,
            pageObj:nextPageObj,
        });

        if(option.error){
            callObj.error=option.error;
        }

        javelin.sync([

            function(next){
                callObj._next=next;
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

                var callObj2={
    
                    wait:function(){
                        callObj2._waited=true;
                    },
                    exit:function(){
                        if(nextPageObj){                                
                            nextPageObj.remove();
                        }
                        callObj2._waited=true;        
                        javelin.locking.link=false;
                    },
                };

                var callObj2=new redirectCallbackObject({
                    _exit:false,
                    mode:"next",
                    nowPage:callObj.nowPage,
                    nextPage:callObj.nextPage,
                    aregment:aregment,            
                    pageObj:nextPageObj,
                    exit:function(){
                        this._exit=true;
                    },
                });

                groupCallbackList.push(function(next2){
                    callObj2._next=next2;
                    next2();
                });

                for(var n=0;n<_pageData.group.length;n++){

                    var groupName=_pageData.group[n];
                    var _g=javelin.cache.group[groupName];

                    if(_g){
                        if(_g.before){
                            var _callback=_g.before;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });
                        }
                        if(_g.beforeNext){
                            var _callback=_g.beforeNext;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });
                        }
                    }
                   
                }

                groupCallbackList.push(function(){
                    next();
                });

                javelin.sync(groupCallbackList);

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

                if(javelin.option.queryReplase){
                    
                    var setUrl="index.html?_path="+pageName;

                    if(callObj.aregment){
                        var colum=Object.keys(callObj.aregment);
                        for(var n=0;n<colum.length;n++){
                            var field=colum[n];
                            if(field){
                                var value=callObj.aregment[field];
                                setUrl+="&"+field+"="+value;    
                            }
                        }
                    }

                    history.replaceState("","",setUrl);
                }

                /** page tag class move */

                var pageOpen=function(){

                    if(_content){

                        if(javelin.buffer.pageMoveIndex<(javelin.buffer.pages.length-1)){
                            for(var n=javelin.buffer.pageMoveIndex;n<javelin.buffer.pages.length;n++){
                                delete javelin.buffer.pages[n];
                            }
                            javelin.buffer.pages.sort();
                        }
            
                        if(now){
                            if(javelin.buffer.pages[javelin.buffer.pageMoveIndex-1]){
                                javelin.buffer.pages[javelin.buffer.pageMoveIndex-1].content=pageArea.find("#"+now.id).html();
                            }
                        }
            
                        if(option.bufferClear){
                            javelin.redirect.clear();
                        }
            
                        javelin.buffer.pages[javelin.buffer.pageMoveIndex]=_nextdata;
                        javelin.buffer.pageMoveIndex++;  

                        if(javelin.option.animation){
                            pageArea.addClass("open");
                            if(option.animation!=undefined){
                                var __beforeAnimation=pageArea.attr("class");
                                pageArea.removeClass(__beforeAnimation).addClass(option.animation);
                            }
                        }

                        if(now){
                            pageArea.find(".page#"+now.id).removeClass("open").addClass("closed"); 
                        }
            
                        var nowPageArea=pageArea.find(".page#"+_nextdata.id);
                        nowPageArea.addClass("open");    
                    }
                };

                var pageClose=function(){
                    if(now && _content && !option.leavePage){
                        pageArea.find(".page#"+now.id).remove();
                    }
                };
               

                if(javelin.option.animation){
                    pageOpen();
                    setTimeout(function(){
                        pageClose();                        
                        setTimeout(function(){   
                            
                            if(option.animation){
                                pageArea.addClass(__beforeAnimation).removeClass(option.animation);
                            }               
                            
                            pageArea.removeClass("open");
                            next();
                        },500);
                    },500);
                }
                else{
                    pageOpen();  
                    pageClose();
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

                var callObj2=new redirectCallbackObject({
                    mode:"next",
                    nowPage:callObj.now,
                    nextPage:callObj.next,
                    aregment:aregment,            
                    pageObj:nextPageObj,
                });

                groupCallbackList.push(function(next2){
                    callObj2._next=next;
                    next2();
                });

                for(var n=0;n<_pageData.group.length;n++){

                    var groupName=_pageData.group[n];
                    var _g=javelin.cache.group[groupName];

                    if(_g){
                        if(_g.after){
                            var _callback=_g.after;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });

                        }

                        if(_g.afterNext){
                            var _callback=_g.afterNext;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });
                        }
                    }
                }

                groupCallbackList.push(function(){
                    next();
                });

                javelin.sync(groupCallbackList);
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
            function(next){
                javelin.locking.link=false;
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

        var now=javelin.buffer.nowPage;

        if(!javelin.buffer.pages[javelin.buffer.pageMoveIndex-2]){
            if(javelin.cache.common.exit){
                var callback=javelin.cache.common.exit;
                callback();
            }
            return;
        }

        var pageArea=$(".pagearea");

        var _back=javelin.buffer.pages[javelin.buffer.pageMoveIndex-2];
        javelin.buffer.pageMoveIndex--;

        pageArea.addClass("back");
       
        var backpage='<div class="page" id="'+_back.id+'"><div class="wk">'+_back.content+'</div></div>';
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


        var callObj=new redirectCallbackObject({
            mode:"back",
            nowPage:now,
            backPage:_back,
            pageObj:backPageObj,
        });

        javelin.buffer.nowPage=_back;

        if(now){
            $(".pagearea .page#"+now.id).removeClass("open").addClass("closed");
        }

        var _backPageData={};
        if(javelin.cache.page[_back.pageName]){
            _backPageData=javelin.cache.page[_back.pageName];
        }

        if(_backPageData.class){
            backPageObj.addClass(_backPageData.class);
        }

        javelin.sync([

            function(next){

                /** set wait function */
                callObj._next=next;
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

                var callObj2=new redirectCallbackObject({
                    mode:"back",
                    nowPage:callObj.now,
                    backPage:callObj.back,
                    pageObj:backPageObj,
                });

                groupCallbackList.push(function(next2){
                    callObj2._next=next2;
                    next2();
                });

                for(var n=0;n<_backPageData.group.length;n++){

                    var groupName=_backPageData.group[n];
                    var _g=javelin.cache.group[groupName];

                    if(_g){
                        if(_g.before){
                            var _callback=_g.before;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });
                        }

                        if(_g.beforeBack){
                            var _callback=_g.beforeBack;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });   
                        }
                    }
                   
                }

                groupCallbackList.push(function(){
                    next();
                });

                javelin.sync(groupCallbackList);
 
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
                    pageArea.find(".page#"+now.id).remove();
                };

                var pageOpen=function(){
                    var nowPageArea=pageArea.find(".page#"+_back.id);
                    nowPageArea.addClass("open");
                };
                
                if(javelin.option.animation){
                    pageOpen();
                    setTimeout(function(){
                        pageClose();
                        next();                            
                        setTimeout(function(){
                            pageArea.removeClass("back");
                        },500);
                    },500);
                }
                else{
                    pageOpen();
                    pageClose();
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

                var callObj2=new redirectCallbackObject({
                    mode:"back",
                    nowPage:callObj.nowPage,
                    backPage:callObj.backPage,
                    pageObj:backPageObj,
                });

                groupCallbackList.push(function(next2){
                    callObj2._next=next2;
                    next2();
                });

                for(var n=0;n<_backPageData.group.length;n++){

                    var groupName=_backPageData.group[n];
                    var _g=javelin.cache.group[groupName];

                    if(_g){
                        if(_g.after){
                            var _callback=_g.after;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });

                        }

                        if(_g.afterNext){
                            var _callback=_g.afterNext;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });
                        }
                    }
                }

                groupCallbackList.push(function(){
                    next();
                });

                javelin.sync(groupCallbackList);
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
        
        if(!option){
            option={};
        }

        var now=javelin.buffer.nowPage;

        var pageObj=$(".pagearea").find("#"+now.id);
        
        var callObj=new redirectCallbackObject({
            nowPage:now,
            pageObj:pageObj,
        });

        var _pageData={};
        if(javelin.cache.page[now.pageName]){
            _pageData=javelin.cache.page[now.pageName];
        }

        javelin.sync([

            function(next){

                /** set wait function */
                callObj._next=next;
                next();
            },

            function(next){

                /** group refresh */
                if(!_pageData.group){
                    next();
                    return;
                }

                if(typeof _pageData.group=="string"){
                    _pageData.group=[_pageData.group];
                }

                var groupCallbackList=[];

                var callObj2=new redirectCallbackObject({
                    nowPage:now,
                    pageObj:pageObj,
                });

                groupCallbackList.push(function(next2){
                    callObj2._next=next2;
                    next2();
                });

                for(var n=0;n<_pageData.group.length;n++){

                    var groupName=_pageData.group[n];
                    var _g=javelin.cache.group[groupName];

                    if(_g){
                        if(_g.refresh){
                            var _callback=_g.refresh;

                            groupCallbackList.push(function(next2){   
                                _callback(callObj2);
                                if(!callObj2._waited){
                                    next2();
                                }
                            });
                        }
                    }
                   
                }

                groupCallbackList.push(function(){
                    next();
                });

                javelin.sync(groupCallbackList);
            },
            function(next){
                
                /** refresh */
                if(!_pageData.refresh){
                    next();
                    return;
                }
                
                var callback=_pageData.refresh;
                callback(callObj);
                if(!callObj._waited){
                    next();
                }

            },
            function(next){
                
                /** option refresh */
                if(!option.callback){
                    next();
                    return;
                }

                if(!option.callback.refresh){
                    next();
                    return;
                }

                option.callback.refresh(callObj);

                if(!callObj._waited){
                    next();
                }

            },

        ]);

    },

    clear:function(){
        javelin.buffer.pages=[];
        javelin.buffer.pageMoveIndex=0;
    },

    _getAregment:function(pageName){


        var pageNames=pageName.split("?");
        
        pageName=pageNames[0];

        var aregment=null;
        if(pageNames[1]){

            aregment={};
            var _arg=pageNames[1];

            _arg=_arg.split("&");

            for(var n=0;n<_arg.length;n++){
                var args=_arg[n];
                args=args.split("=");

                aregment[args[0]]=args[1];
            }
        }

        return {
            pageName:pageName,
            aregment:aregment,
        };

    },

    exists:function(pageName){

        if(
            javelin.cache.pages[pageName] ||
            javelin.cache.page[pageName]
        ){
            return true;
        }

        return false;
    },

};

var redirectCallbackObject=function(params){

    this._waited=false;

    var paramsColum=Object.keys(params);
    for(var n=0;n<paramsColum.length;n++){
        var field=paramsColum[n];
        var value=params[field];
        this[field]=value;
    }

    this.wait=function(){
        this._waited=true;
    };

    this.exit=function(){
        if(this.nextPageObj){
            this.nextPageObj.remove();
        }
        this._waited=true;        
        javelin.locking.link=false;

    };

    this.next=function(){
        this._waited=false;
        this._next();
    };

};