javelin.data=function(dataName){

	var _this=function(dataName){

		this.set=function(value){
			javelin.cache.data[dataName]=value;
		};

		this.get=function(){
			return javelin.cache.data[dataName];
		};

		this.delete=function(){
			delete javelin.cache.data[dataName];
		};

	};

	return new _this(dataName);
};