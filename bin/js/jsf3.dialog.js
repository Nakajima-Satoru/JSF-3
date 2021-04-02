jsf3.dialog=function(dialogName,settings){

    if(settings){

        var colum=Object.keys(settings);

        if(!jsf3.cache.dialog[dialogName]){
            jsf3.cache.dialog[dialogName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.dialog[dialogName][field]=values;
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

            if(!jsf3.cache.dialog[dialogName]){
                return;
            }

            var _dialogData=jsf3.cache.dialog[dialogName];

            var content=jsf3.cache.dialogs[dialogName];
            content=jsf3.base64.decode(content);

            if(content==undefined){
                return;
            }

            var id=jsf3.uniqId();

            var _class="";
            if(option.class){
                _class=option.class;
            }

            if(option.noWindow){
                var dialogHtml='<div class="dialog '+_class+'" data-dialog_type="'+dialogName+'" data-id="'+id+'"><div class="bg">'+content+'</div></div>';
            }
            else{
                var dialogHtml='<div class="dialog '+_class+'" data-dialog_type="'+dialogName+'" data-id="'+id+'"><div class="bg"><div class="window">'+content+'</div></div></div>';
            }

            $(".dialogarea").append(dialogHtml);

            var dialog=$(".dialog[data-id=\""+id+"\"]");
            
            var callObj={
                _waited:false,
                id:id,
                dialog:dialog,
                wait:function(){
                    callObj._waited=true;
                },
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

                            if(!_dialogData.close){
                                next();
                                return;
                            }

                            var _callback=_dialogData.close;
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
             
                    callObj.next=function(){
                        callObj._waited=false;
                        next();
                    };

                    next();
                },
                function(next){

                    if(!_dialogData.open){
                        next();
                        return;
                    }
                    
                    var _callback=_dialogData.open;
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
                function(){

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
            var dialogName=dialog.attr("data-dialog_type");

            var _dialogData=jsf3.cache.dialog[dialogName];

            if(!_dialogData){
                return;
            }

            var callObj={
                _waited:false,
                id:dialogId,
                dialog:dialog,
                option:option,
                wait:function(){
                    callObj._waited=true;
                },
            };

            jsf3.sync([
                function(next){
                    callObj.next=function(){
                        callObj._waited=false;
                        next();
                    };

                    next();
                },
                function(next){

                    if(!_dialogData.close){
                        next();
                        return;
                    }

                    var _callback=_dialogData.close;
                    _callback(callObj);
                    
                    if(!callObj._waited){
                        next();
                    }
                },
                function(){

                    if(!option.callback){
                        next();
                        return;
                    }


                    option.callback(callObj);
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
            ])

        };

    };

    return new _this(dialogName);

};