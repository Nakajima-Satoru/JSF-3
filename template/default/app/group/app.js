jsf3.group("app",{

    before:function(obj){

        console.log("group before....");
        obj.next();
    },

    after:function(obj){

        console.log("group after....");
        obj.next();

    },

});
