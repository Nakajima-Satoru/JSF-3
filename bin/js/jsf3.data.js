jsf3.data=function(dataName){

	var _this=function(dataName){

		this.set=function(value){
			jsf3.cache.data[dataName]=value;
		};

		this.get=function(){
			return jsf3.cache.data[dataName];
		};

		this.delete=function(){
			delete jsf3.cache.data[dataName];
		};

	};

	return new _this(dataName);
};