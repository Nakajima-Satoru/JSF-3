var sync=require("../sync.js");
var fs=require("fs");

module.exports=function(name){

    sync.then(function(obj){
        createDirectory(name);
        obj.next();
    }).then(function(obj){
        
        obj.next();

    }).then(function(obj){

    });

    var createDirectory=function(name){

        try{
            fs.mkdirSync(name);
        }catch(err){}
        
    };

    sync.run();
};