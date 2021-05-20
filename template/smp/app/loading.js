const loading={

    loadingCode:null,
    loadingTiming:null,

    open: function(){
        var cont = this;
        this.loadingTiming = setTimeout(function(){
            cont.loadingCode = jsf3.dialog("loading").open();
        },300);
    },

    close: function(){
        if(!this.loadingCode){
            clearTimeout(this.loadingTiming);
        }
        else{
            jsf3.dialog("loading").close(this.loadingCode);
        }
    },
};
