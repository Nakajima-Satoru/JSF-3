javelin.page("page/index3",{

    group:"app",

    before:function(obj){

		setTitle("Wait...");

        loading.open();

        obj.wait();

        setTimeout(function(){

            loading.close();
            
            javelin.redirect.next("page/index2");
            
        },3000);

    },

});