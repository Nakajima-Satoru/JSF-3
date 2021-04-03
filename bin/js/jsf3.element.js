jsf3.element=function(elementName,settings){

	if(settings){

        var colum=Object.keys(settings);
        
        if(!jsf3.cache.element[elementName]){
            jsf3.cache.element[elementName]={};
        }

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var values=settings[field];

            jsf3.cache.element[elementName][field]=values;
        }

		return;
	}


	var _context=this;

	var _this=function(elementName){

		this.load=function(){

			if(!jsf3.cache.elements[elementName]){
				return;
			}

			var content=jsf3.base64.decode(jsf3.cache.elements[elementName]);

			return content;

		};

		this.put=function(tagName,option){

			if(!option){
				option={};
			}

			var obj=$(tagName);

			var content=this.load();
			
			if(option.append){
				var id=jsf3.uniqId();
				obj.append("<div data-element_id=\""+id+"\">"+content+"</div>");
			}
			else{
				obj.html(content);
			}

			var _element={}
			if(jsf3.cache.element[elementName]){
				_element=jsf3.cache.element[elementName];
			}

			var callObj={
				_waited:false,
				obj:obj,
				wait:function(){
					callobj._waited=true;
				},
			};

			if(option.append){
				callObj.id=id;
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

					if(!_element.before){
						next();
						return;
					}

					_element.before(callObj);

					if(callObj._waited){
						next();
					}
				},
				function(next){

					if(!option.before){
						next();
						return;
					}

					option.before(callObj);

					if(callObj._waited){
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

}