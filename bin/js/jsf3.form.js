jsf3.form=function(formName,settings){

    if(settings){

        if(settings.submit){
            jsf3.callback.set("FORM_SUBMIT_"+formName,settings.submit);
        }
        if(settings.reset){
            jsf3.callback.set("FORM_RESET_"+formName,settings.reset);
        }
        if(settings.tags){
            if(!jsf3.cache.data.form[formName]){
                jsf3.cache.data.form[formName]={};
            }

            jsf3.cache.data.form[formName].tags=settings.tags;           
        }

        return;
    }

    var _this=function(formName){

        this.tagOpen=function(){

            if(!jsf3.cache.data.form[formName]){
                return;
            }

            var data=jsf3.cache.data.form[formName];

            if(!data.tags){
                return;
            }

            if(data.tags=={}){
                return;
            }

            var formObj=$("form#"+formName);

            var colums=Object.keys(data.tags);
            for(var n=0;n<colums.length;n++){
                var field=colums[n];
                var values=data.tags[field];

                if(values.type=="select"){
                    var tagStr=jsf3.formbuild.select(field,values);
                }
                else if(values.type=="radio"){
                    var tagStr=jsf3.formbuild.radio(field,values);
                }
                else if(values.type=="checkbox"){
                    var tagStr=jsf3.formbuild.checkbox(field,values);
                }
                else if(values.type=="textarea"){
                    var tagStr=jsf3.formbuild.textarea(field,values);
                }
                else{
                    var tagStr=jsf3.formbuild.input(field,values);
                }
                
                formObj.find("[field="+field+"]").html(tagStr);
            }

        };

        this.getFormData=function(field){

            var formObj=$("form#"+formName);
            var length=formObj.find("[name]").length;

            var fields=[];

            for(var n=0;n<length;n++){

                var _obj=formObj.find("[name]").eq(n);

                var field=_obj.attr("name");

                if(!fields.includes(field)){
                    fields.push(field);
                }
            }

            var data={};
            for(var n=0;n<fields.length;n++){

                var field=fields[n];

                var _obj=formObj.find("[name=\""+field+"\"]");

                var tagName=_obj.prop("tagName");

                var value=null;

                if(tagName=="SELECT"){
                    value=_obj.val();
                }
                else if(tagName=="TEXTAREA"){
                    value=_obj.val();
                }
                else{
                    var type=_obj.attr("type");

                    if(type=="radio"){
                        value=formObj.find("[name=\""+field+"\"]:checked").val();
                    }
                    else if(type=="checkbox"){
                        var __o=formObj.find("[name=\""+field+"\"]:checked");
                        var _length=__o.length;

                        var _values=[];
                        for(var n2=0;n2<_length;n2++){
                            var _v=__o.eq(n2).val();
                            _values.push(_v);
                        }

                        value=_values;

                        field=field.replace("[]","",field);
                    }
                    else if(type=="file"){
                        value=_obj.val();
                    }
                    else{
                        value=_obj.val();
                    }
                }

                data[field]=value;

            }

            return data;

        };

    };

    return  new _this(formName);

};