jsf3.page("logic",{

    before:function(obj){


        $(".logic_test1").off("click").on("click",function(){

            alert(jsf3.logic("test").method());
    
        });

    },


})