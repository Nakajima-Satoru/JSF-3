javelin.sessionStorage={

    /**
     * get
     * @param {*} name 
     * @returns 
     */
    get:function(name){

        name=this.getName(name);

        var value=sessionStorage.getItem(name);

        if(!value){
            return null;
        }

        value=JSON.parse(value);
        return value;
    },

    /**
     * set
     * @param {*} name 
     * @param {*} value 
     */
    set:function(name,value){
        name=this.getName(name);

        value=JSON.stringify(value);

        sessionStorage.setItem(name,value);
        return this;
    },

    delete:function(name){
        name=this.getName(name);

        sessionStorage.removeItem(name);
        return this;
    },

    /**
     * getName
     * @param {*} name 
     * @returns 
     */
    getName:function(name){
        if(javelin.option.webStoragePrefix){
            name = javelin.option.webStoragePrefix+name;
        }
        return name;
    },
};