javelin.page("page/othererror",{

    before:()=>{
        javelin.throw("Original Error...");
    },

});