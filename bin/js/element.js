javelin.element=function(elementName,settings){

	if(settings){

        var colum=Object.keys(settings);
        
        if(!javelin.cache.element[elementName]){
            javelin.cache.element[elementName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            javelin.cache.element[elementName][field]=values;
        }

		return;
	}

	var _this=function(elementName){

		this.load=function(){

			if(!javelin.cache.elements[elementName]){
				return;
			}

			var content=javelin.base64.decode(javelin.cache.elements[elementName]);

			return content;

		};

		this.put=function(tagName,option){

			if(!option){
				option={};
			}

			var obj=$(tagName);

			var content=this.load();
			
			var id=null;
			if(option.append){
				id=javelin.uniqId();
				obj.append("<div data-element_id=\""+id+"\">"+content+"</div>");
			}
			else{
				obj.html(content);
			}

			var _element={};
			if(javelin.cache.element[elementName]){
				_element=javelin.cache.element[elementName];
			}

			var callObj=new elementCallbackObject({
				obj:obj,
				id:id,
			});

			javelin.sync([
				function(next){
					callObj._next=next;
					next();
				},
				function(next){

					if(!_element.before){
						next();
						return;
					}

					_element.before(callObj);
					if(!callObj._waited){
						next();
					}
				},
				function(next){

					if(!option.before){
						next();
						return;
					}

					option.before(callObj);
					if(!callObj._waited){
						next();
					}

				},
			]);

			return callObj;
		};

		this.append=function(tagName,option){

			if(!option){
				option={};
			}
			option.append=true;
			var res=this.put(tagName,option);

			$(tagName).find("[data-element_id=\""+res.id+"\"] .deleted").off("click").on("click",function(){
				$(tagName).find("[data-element_id=\""+res.id+"\"]").remove();

				return false;
			});

		};
	
	};



	return new _this(elementName);

};

var elementCallbackObject=function(params){

    var paramsColum=Object.keys(params);
    for(var n=0;n<paramsColum.length;n++){
        var field=paramsColum[n];
        var value=params[field];
        this[field]=value;
    }

	this._waited=false;

	this.wait=function(){
		this._waited=true;
	};

	this.next=function(){
		this._waited=false;
		this._next();
	};

};