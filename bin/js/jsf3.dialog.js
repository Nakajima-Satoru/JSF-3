jsf3.dialog=function(dialogName,settings){

    if(settings){

        if(settings.open){
            jsf3.callback.set("DIALOG_OPEN_"+dialogName,settings.open);           
        }
        if(settings.close){
            jsf3.callback.set("DIALOG_CLOSE_"+dialogName,settings.close);
        }

        return;
    }

    var _this=function(dialogName){

        this.open=function(option){

            if(!option){
                option={
                    callback:{},
                };
            }

            var dialogNameB64=jsf3.base64.encode(dialogName);
            var content=jsf3.cache.dialogs[dialogNameB64];
            content=jsf3.base64.decode(content);

            var id=jsf3.uniqId();

            var _class="";
            if(option.class){
                _class=option.class;
            }

            if(option.noWindow){
                var dialogHtml='<div class="dialog '+_class+'" data-id="'+id+'"><div class="bg">'+content+'</div></div>';
            }
            else{
                var dialogHtml='<div class="dialog '+_class+'" data-id="'+id+'"><div class="bg"><div class="window">'+content+'</div></div></div>';
            }

            $(".dialogarea").append(dialogHtml);

            var dialog=$(".dialog[data-id=\""+id+"\"]");
            
            var callObj={
                id:id,
                dialog:dialog,
                close:function(){
                
                    jsf3.sync([
                        function(next){
                            
                            callObj._waited=false;
                            callObj.wait=function(){
                                callObj._waited=true;
                            };
                            callObj.next=function(){
                                callObj._waited=false;
                                next();
                            };
        
                            next();

                        },
                        function(next){

                            if(!jsf3.callback.get("DIALOG_CLOSE_"+dialogName)){
                                next;
                                return;
                            }

                            var _callback=jsf3.callback.get("DIALOG_CLOSE_"+dialogName);
                            _callback(callObj);
                                    
                            if(!callObj._waited){
                                next();
                            }
                        },
                        function(next){

                            if(!option.callback){
                                next();
                                return;
                            }
                            
                            if(!option.callback.close){
                                next();
                                return;
                            }
        
                            option.callback.close(callObj);
                            
                            if(!callObj._waited){
                                next();
                            }

                        },
                        function(){

                            dialog.removeClass("open").addClass("closed");

                            setTimeout(function(){
                                dialog.remove();
                            },500);

                        },
                    ]);  

                },
                option:option,
            };
            
            jsf3.sync([
                function(next){

                    callObj._waited=false;
                    callObj.wait=function(){
                        callObj._waited=true;
                    };
                    callObj.next=function(){
                        callObj._waited=false;
                        next();
                    };

                    next();
                },
                function(next){

                    if(!jsf3.callback.get("DIALOG_OPEN_"+dialogName)){
                        next();
                        return;
                    }
                    
                    var _callback=jsf3.callback.get("DIALOG_OPEN_"+dialogName);
                    _callback(callObj);

                    if(!callObj._waited){
                        next();
                    }
        
                },
                function(next){

                    if(!option.callback){
                        next();
                        return;
                    }
                    
                    if(!option.callback.open){
                        next();
                        return;
                    }

                    option.callback.open(callObj);
                    
                    if(!callObj._waited){
                        next();
                    }
        
                },
                function(next){

                    dialog.addClass("open");

                },
            ]);



            dialog.find(".closed").on("click",function(){
                callObj.close();
            });

            return id;
        };

        this.close=function(dialogId,option){

            if(!option){
                option={};
            }

            var dialog=$(".dialog[data-id=\""+dialogId+"\"]");

            var callObj={
                id:dialogId,
                dialog:dialog,
                option:option,
            };

            if(jsf3.callback.get("DIALOG_CLOSE_"+dialogName)){
                var _callback=jsf3.callback.get("DIALOG_CLOSE_"+dialogName);
                _callback(callObj);
            }

            if(option.callback){
                option.callback(callObj);
            }

            dialog.removeClass("open").addClass("closed");

            setTimeout(function(){
                dialog.remove();
            },500);
        };

    };

    return new _this(dialogName);

};