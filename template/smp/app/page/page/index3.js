jsf3.page("page/index3",{

    group:"app",

    before:function(obj){

        loading.open();

        obj.wait();

        setTimeout(function(){

            loading.close();
            
            jsf3.redirect.next("page/index2");
            
        },3000);

    },

});