jsf3.page("page1/index2",{

    group:"app",

    before:function(obj){

        console.log(obj.aregment);

        if(obj.aregment){
            var id=obj.aregment.id;   

            obj.pageObj.find(".aregment").text(id);

            id=parseInt(id)+1;
            $(".link_next").attr("href","page1/index2?id="+id);
        }
        else{
            $(".link_next").attr("href","page1/index2?id=1");
        }
    
    },

});