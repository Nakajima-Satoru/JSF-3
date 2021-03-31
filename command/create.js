/**
 * Create
 */
var sync=require("../sync.js");
var fsa=require("../fsa.js");
var base64=require("../base64.js");

module.exports=function(name,templateName){

    console.log("# Project Create Start...");
    console.log("#");

    if(!templateName){
        templateName="default";
    }

    var templatePath=__dirname+"/../template/"+templateName;

    if(!fsa.existsSync(templatePath)){
        console.log("ERR: Not found template \""+templateName+"\",");
        return;
    }

    console.log("# Use Template \""+templateName+"\"");

    sync.list([
        function(obj){

            try{
                fsa.mkdirSync(name);
            }catch(err){}
            
            console.log("# mkkdir "+name);
    
            obj.next();

        },

        function(obj){

            // copy from template source

            var sourceList=fsa.deepSearch(templatePath);

            for(var n=0;n<sourceList.dir.length;n++){
                var dir=sourceList.dir[n];
                dir=dir.replace(templatePath,"");
                try{
                    fsa.mkdirSync(name+"/"+dir);
                    console.log("# mkdir "+name+"/"+dir);
                }catch(err){}
            }


            for(var n=0;n<sourceList.file.length;n++){
                var filePath0=sourceList.file[n];
                var filePath=filePath0.replace(templatePath,"");
                fsa.copyFileSync(filePath0,name+"/"+filePath);
                console.log("# filecopy "+filePath0+" "+name+"/"+filePath);
            }

            obj.next();
        },
        function(obj){

            console.log("#");
            console.log("# Project Create Complete!");
            console.log("#");
            console.log("#");

            // build
            var build=require("./build.js");
            build(name);
        },
    ]);

};