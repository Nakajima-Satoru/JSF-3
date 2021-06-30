const loading={

    loadingCode:null,
    loadingTiming:null,

    open: function(){
        var cont = this;
        this.loadingTiming = setTimeout(function(){
            cont.loadingCode = javelin.dialog("loading").open();
        },300);
    },

    close: function(){
        if(!this.loadingCode){
            clearTimeout(this.loadingTiming);
        }
        else{
            javelin.dialog("loading").close(this.loadingCode);
        }
    },
};
