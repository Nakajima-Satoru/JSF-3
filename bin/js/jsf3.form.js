jsf3.formFileBuffer={};

jsf3.form=function(formName,settings){

    if(settings){

        var colum=Object.keys(settings);
        
        if(!jsf3.cache.form[formName]){
            jsf3.cache.form[formName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.form[formName][field]=values;
        }

        return;
    }

    var _this=function(formName){

        this.tagOpen=function(option){

            jsf3.formFileBuffer={};

            if(!jsf3.cache.form[formName]){
                return;
            }

            var _form=jsf3.cache.form[formName];

            if(!_form.tags){
                return;
            }

            if(_form.tags=={}){
                return;
            }

            var formObj=$("form#"+formName);

            var colums=Object.keys(_form.tags);
            for(var n=0;n<colums.length;n++){
                var field=colums[n];
                var values=_form.tags[field];

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

            if(option){
                if(option.setData){
                    this.setData(option.setData);
                }
                if(option.ignore){
                    this.tagIgnore(option.ignore);
                }
            }

            return this;
        };

        this.tagIgnore=function(ignores){

            var formObj=$("form#"+formName);

            for(var n=0;n<ignores.length;n++){
                var field=ignores[n];
                formObj.find("[field=\""+field+"\"]").html("");
            }

        };

        /**
         * getData
         * @returns 
         */
        this.getData=function(){

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
                        if(jsf3.formFileBuffer[field]){
                            value=jsf3.formFileBuffer[field];
                        }
                    }
                    else{
                        value=_obj.val();
                    }
                }

                data[field]=value;

            }

            return data;

        };

        /**
         * setData
         * @param {} data 
         */
        this.setData=function(data){

            var formObj=$("form#"+formName);
            var colum=Object.keys(data);

            for(var n=0;n<colum.length;n++){
                var field=colum[n];
                var value=data[field];

                var _obj=formObj.find("[name=\""+field+"\"]");
                var _objCheck=formObj.find("[name=\""+field+"[]\"]");
                var tagName=_obj.prop("tagName");

                if(tagName=="SELECT"){
                    _obj.val(value);
                }
                else if(tagName=="TEXTAREA"){
                    _obj.val(value);
                }
                else{

                    var type=_obj.attr("type");

                    if(type=="radio"){
                        var __o=formObj.find("[name=\""+field+"\"][value=\""+value+"\"]");
                        __o.prop("checked",true);
                    }
                    else if(_objCheck.length){

                        var _f=field+"[]";

                        if(typeof value=="string"){
                            value=[value];
                        }

                        var __o=formObj.find("[name=\""+_f+"\"]");
                        __o.prop("checked",false);

                        for(var n2=0;n2<value.length;n2++){
                             var __o=formObj.find("[name=\""+_f+"\"][value=\""+value[n2]+"\"]");
                            __o.prop("checked",true);
                        }

                    }
                    else{
                        _obj.val(value);
                    }

                }
            }

        };

        this.submit=function(){
            $("form#"+formName).submit();
        };
        
        this.reset=function(){
            $("form#"+formName).reset();
        };

    };

    return  new _this(formName);

};