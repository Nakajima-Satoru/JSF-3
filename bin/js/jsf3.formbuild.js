jsf3.formbuild={

    input:function(name,option){

        var optStr="";
        if(option.type!="submit"){
            optStr+=" name=\""+name+"\"";
        }

        optStr+=this._optionSetting(option);

        var str="<input "+optStr+">";

        return str;

    },

    select:function(name,option){

        var _value=null;
        if(option.value!=undefined){
            var _value=option.value;
        }

        var optStr="";
        optStr+=" name=\""+name+"\"";
        optStr+=this._optionSetting(option,[
            "value",
            "selected",
            "type",
        ]);

        var str="<select "+optStr+">";

        var colum=Object.keys(option.selected);
        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var value=option.selected[field];

            var _select="";
            if(_value !== null){
                if(field.toString() === _value.toString()){
                    _select="selected";
                }    
            }

            str+="<option value=\""+field+"\" "+_select+">"+value+"</option>";
        }

        str+="</select>";

        return str;
    },

    radio:function(name,option){

        var _value=null;
        if(option.value!=undefined){
            var _value=option.value;
        }

        var str="";

        var colum=Object.keys(option.selected);
        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var value=option.selected[field];

            var _check="";
            if(_value !== null){
                if(field.toString() === _value.toString()){
                    _check="checked";
                }    
            }

            str+="<label>";

            var optStr="";
            optStr+=" name=\""+name+"\"";
            optStr+=" value=\""+field+"\"";

            optStr+=this._optionSetting(option,[
                "value",
                "selected",
            ]);
    
            if(field.toString() === _value.toString()){
                optStr+=" checked";
            }

            str+="<input "+optStr+">";
    
            str+=value;

            str+="</label>";
        }

        return str;
    },

    checkbox:function(name,option){

        var _name=name+"[]";

        var _value=null;
        if(option.value!=undefined){
            var _value=option.value;

            if(typeof _value == "string"){
                _value=[_value];
            }
        }

        var str="";

        var colum=Object.keys(option.selected);
        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var value=option.selected[field];

            var _check="";
            if(_value !== null){
                if(field.toString() === _value.toString()){
                    _check="checked";
                }    
            }

            str+="<label>";

            var optStr="";
            optStr+=" name=\""+_name+"\"";
            optStr+=" value=\""+field+"\"";

            optStr+=this._optionSetting(option,[
                "value",
                "selected",
            ]);
    
            for(var n2=0;n2<_value.length;n2++){
                var v_=_value[n2];
                if(field.toString() === v_.toString()){
                    optStr+=" checked";
                }    
            }

            str+="<input "+optStr+">";
    
            str+=value;

            str+="</label>";
        }

        return str;
    },

    textarea:function(name,option){

        var _value="";
        if(option.value!=undefined){
            if(option.value !== null){
                var _value=option.value;
            }
        }

        var optStr="";
        optStr+=" name=\""+name+"\"";
        optStr+=this._optionSetting(option,[
            "value",
        ]);

        var str="<textarea "+optStr+">"+_value+"</textarea>";

        return str;

    },

    _optionSetting:function(option,ignoreFields){

        var str="";

        var colum=Object.keys(option);
        for(var n=0;n<colum.length;n++){
            var field=colum[n];

            var juge=true;

            if(ignoreFields){
                if(ignoreFields.includes(field)){
                    juge=false;
                }
            }

            if(juge){
                var value=option[field];
                str+=" "+field+"=\""+value+"\"";    
            }
        }

        return str;

    },

};