javelin.page("error",{

    group:"app",

    before:function(obj){

		setTitle("[ERROR] "+obj.error);

        obj.pageObj.find(".text").text(obj.error);
    },

});