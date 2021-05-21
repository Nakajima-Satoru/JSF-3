javelin.localStorage={

    /**
     * get
     * @param {*} name 
     * @returns 
     */
    get:function(name){

        name=this.getName(name);

        var value=localStorage.getItem(name);

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

        localStorage.setItem(name,value);
        return this;
    },

    delete:function(name){
        name=this.getName(name);

        localStorage.removeItem(name);
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