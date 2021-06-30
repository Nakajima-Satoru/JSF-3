javelin.page("page/index2",{

    group:"app",

    before:function(obj){

		setTitle("Page2");

        if(obj.aregment){
            var id=obj.aregment.id;   

            obj.pageObj.find(".aregment").text(id);

            id=parseInt(id)+1;
            $(".link_next").attr("href","page/index2?id="+id);
        }
        else{
            $(".link_next").attr("href","page/index2?id=1");
        }
    
    },

});