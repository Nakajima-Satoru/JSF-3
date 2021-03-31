jsf3.page("main",{

    before:function(obj){

        console.log("main page beforer...");

    },

    after:function(obj){

        console.log("main page after...");

    },
    
    leave:function(obj){

        console.log("main page leave...");

    },

});