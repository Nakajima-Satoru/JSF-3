jsf3.validator=function(validateName,settings){

    if(settings){

        if(!jsf3.cache.validator[validateName]){
            jsf3.cache.validator[validateName]={};
        }

        var colum=Object.keys(settings);

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.validator[validateName][field]=values;
        }
    
        return;
    }

	var _this=function(validateName){

		this._value=null;

		this.value=function(name){
			if(this._value[name]){
				return this._value[name];
			}
		};
        
		this.verify=function(post,option){

            if(!option){
                option={};
            }

			this._value=post;
			jsf3.validateRule._value=post;

            if(!option.rule){
                option.rule="rules";
            }

			var _validator=jsf3.cache.validator[validateName];
			if(!_validator){
				return;
			}

			var validates=_validator[option.rule];
			if(!validates){
				return;
			}

			var response=null;
        
			var colum=Object.keys(validates);
			var length=colum.length;
			for(var n=0;n<length;n++){
				var name=colum[n];
				var vrules=validates[name];

                if(Array.isArray(vrules)){
                    var vrulesLength=vrules.length;
                }
                else{
                    var vrulesLength=vrulesColum.length;
                    var vrulesColum=Object.keys(vrules);
                }

				for(var n2=0;n2<vrulesLength;n2++){

                    if(Array.isArray(vrules)){
                        var vrule=vrules[n2];
                    }
                    else{
                        var vrule=vrules[vrulesColum[n2]];
                    }

                    var rule=vrule.rule;

					if(typeof rule =="string"){
						rule=[rule];
					}

					var sendRule=[];
					var ruleLength=rule.length;
					for(var rn_=0;rn_<ruleLength;rn_++){
						if(rule[rn_][0]=="@"){
							var bufferName=rule[rn_].substring(1);
							var bufferValue=this.value(bufferName);
							sendRule[rn_]=bufferValue;
						}
						else{
							sendRule[rn_]=rule[rn_];
						}
					}

					var jugement=true;
					if(jsf3.validateRule[sendRule[0]]){
						jugement=jsf3.validateRule[rule[0]](post[name],sendRule[1],sendRule[2],sendRule[3]);
					}
					else if(jsf3.cache.data.validator[validateName][sendRule[0]]){
						jugement=jsf3.cache.data.validator[validateName][sendRule[0]](post[name],sendRule[1],sendRule[2],sendRule[3]);
					}

					if(vrule.message){
						var message=vrule.message;
					}
					else{
						var message="validate error [field="+name+", rule="+sendRule[0];
						if(sendRule[1]){
							message+=", aregument1="+sendRule[1];
						}
						if(sendRule[2]){
							message+=", aregument1="+sendRule[2];
						}
						if(sendRule[3]){
							message+=", aregument1="+sendRule[3];
						}
						message+="]";
					}

					if(!jugement){
						if(!response){
							response={};
						}
						response[name]=message;
					}
				}

			}

			if(!option.noOrrorOutputed){
				this.outputError(response);
			}

			return response;

		};
		this.set=function(validates){
			rd2._data.validates[validateName]=validates;
			return this;
		};
		this.addRule=function(){

			var field=arguments[0];

			if(!rd2._data.validates[validateName]){
				rd2._data.validates[validateName]={};
			}
			if(!rd2._data.validates[validateName][field]){
				rd2._data.validates[validateName][field]=[];
			}

			if(arguments.length==2){
				var rule=arguments[1];
				rd2._data.validates[validateName][field].push(rule);
			}
			else if(areguments.length>=3){
				var section=arguments[1];
				var rule=arguments[2];
				rd2._data.validates[validateName][field][section]=rule;
			}

			return this;
		};
		this.deleteRule=function(){

			var field=arguments[0];

			if(arguments.length>=2){
				var section=arguments[1];
				delete rd2._data.validates[validateName][field][section];
			}
			else{
				delete rd2._data.validates[validateName][field];
			}

			return this;
		};
		this.addCustom=function(ruleName,callback){
			rd2._data.callbacks["VALIDATE_CUSTOM_"+ruleName]=callback;
			return this;
		};
		this.outputError=function(validateErrorData){

			var obj=$("#"+validateName);
			obj.find("[error]").html("");

			if(!validateErrorData){
				return;
			}

			var vedColum=Object.keys(validateErrorData);
			var vedLength=vedColum.length;

			if(!validateErrorData){
				return;
			}

			for(var n=0;n<vedLength;n++){
				var name=vedColum[n];
				var message=validateErrorData[name];
				var errorObj=obj.find("[error="+name+"]");
				errorObj.html('<div class="error">'+message+'</div>');
			}
		
		};

	};

	return new _this(validateName);

};