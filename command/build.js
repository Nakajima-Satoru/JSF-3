/**
 * Build
 */
const https=require("https");
const sync=require("./sync.js");
const fsa=require("./fsa.js");
const base64=require("./base64.js");

module.exports=function(name){

    console.log("# Project Build Start...");
    console.log("#");

    if(!fsa.existsSync(name)){
        console.log("ERR: Not found project directory \""+name+"\",");
        return;
    }

    if(!fsa.existsSync(name+"/manifest.json")){
        console.log("ERR: Not found Manifest File.");
        return;
    }
    
    var manifest=fsa.readFileSync(name+"/manifest.json").toString();
    manifest=JSON.parse(manifest);

    if(!manifest){
        console.log("ERR: The manifest file is corrupted and cannot be read.");
        return;
    }

    if(!manifest.option){
        manifest.option={};
    }
    if(!manifest.option.jquery){
        manifest.option.jquery="3.6.0";
    }

    if(!manifest.option.buildDirectory){
        manifest.option.buildDirectory="_build";
    }

    var buildPath=name+"/"+manifest.option.buildDirectory;
    var jqueryCacheDir=__dirname+"/../__jquerycache";
    var jqueryCache=jqueryCacheDir+"/"+manifest.option.jquery+".js";
    var jqueryUrl="https://code.jquery.com/jquery-"+manifest.option.jquery+".min.js";

    if(!fsa.existsSync(jqueryCacheDir)){
        fsa.mkdirSync(jqueryCacheDir);
    }

    sync.list([
        function(obj){

            // create build directory

            if(!fsa.existsSync(buildPath)){
                fsa.mkdirSync(buildPath);
            }

            console.log("# mkkdir "+buildPath);

            if(!fsa.existsSync(buildPath+"/bin")){
                fsa.mkdirSync(buildPath+"/bin");
            }
            
            console.log("# mkkdir "+buildPath+"/bin");
    
            obj.next();
        },
        function(obj){

            // copy template index.html
            if(!manifest.option.buildIndexFile){
                manifest.option.buildIndexFile="index.html";
            }

            fsa.copyFileSync(name+"/index.html",buildPath+"/"+manifest.option.buildIndexFile);

            console.log("# fileset "+buildPath+"/"+manifest.option.buildIndexFile);
    
            obj.next();

        },
        function(obj){

            // core script convert

            var getJson=fsa.readFileSync(__dirname+"/../bin/js/load.json").toString();
            getJson=JSON.parse(getJson);
    
            var jscoreStr="";
            for(var n=0;n<getJson.length;n++){
                var content=fsa.readFileSync(__dirname+"/../bin/js/"+getJson[n]).toString();

                jscoreStr+=content+"\n";
                console.log("# read "+__dirname+"/../bin/js/"+getJson[n]);
            }

            if(manifest.option.libCompressionMode){
                jscoreStr=jscoreStr.split("    ").join("");
                jscoreStr=jscoreStr.split("\r").join("");
                jscoreStr=jscoreStr.split("\n").join("");    
                jscoreStr=jscoreStr.split("\t").join("");
                console.log("# code Compression....");
            }
    
            fsa.writeFileSync(buildPath+"/bin/core.js",jscoreStr);
            console.log("# fileset "+buildPath+"/bin/core.js");

            obj.next();

        },
        function(obj){
    
            // set stylesheet

            var getJson=fsa.readFileSync(__dirname+"/../bin/css/load.json").toString();
            getJson=JSON.parse(getJson);

            var csscoreStr="";
            for(var n=0;n<getJson.length;n++){
                var content=fsa.readFileSync(__dirname+"/../bin/css/"+getJson[n]).toString();

                csscoreStr+=content+"\n";
                console.log("# read "+__dirname+"/../bin/css/"+getJson[n]);
            }

            if(manifest.option.libCompressionMode){
                csscoreStr=csscoreStr.split("    ").join("");
                csscoreStr=csscoreStr.split("\r").join(" ");
                csscoreStr=csscoreStr.split("\n").join(""); 
                csscoreStr=csscoreStr.split("\t").join("");
                console.log("# code Compression....");
            }
    
            fsa.writeFileSync(buildPath+"/bin/jsf3.css",csscoreStr);
            console.log("# fileset "+buildPath+"/bin/jsf3.css");

            obj.next();
        },
        function(obj){
            
            // convert cache html
            var htmlCacheStr="";

            // page cache...
            var htmlPageLIst = fsa.deepSearch(name+"/render/page");    

            htmlCacheStr+="jsf3.cache.pages = { \n";
            for(var n=0;n<htmlPageLIst.file.length;n++){
                var filepath=htmlPageLIst.file[n];

                var fileName=filepath.replace(name+"/render/page/","");
                fileName=fileName.replace(".html","");
                
                var content=fsa.readFileSync(filepath).toString();
                var contentB64=base64.encode(content);

                htmlCacheStr+="\""+fileName+"\":\""+contentB64+"\",\n";

                console.log("# read "+filepath);
            }
            htmlCacheStr+=" };\n";

            // dialog cache

            if(fsa.existsSync(name+"/render/dialog")){

                var HtmlDialogList = fsa.deepSearch(name+"/render/dialog");    

                htmlCacheStr+="jsf3.cache.dialogs = { \n";
                for(var n=0;n<HtmlDialogList.file.length;n++){
                    var filepath=HtmlDialogList.file[n];
    
                    var fileName=filepath.replace(name+"/render/dialog/","");
                    fileName=fileName.replace(".html","");
    
                    var content=fsa.readFileSync(filepath).toString();
    
                    var contentB64=base64.encode(content);
    
                    htmlCacheStr+="\""+fileName+"\":\""+contentB64+"\",\n";
    
                    console.log("# read "+filepath);
                }
                htmlCacheStr+="};\n";
    
            }

            // element cache
            if(fsa.existsSync(name+"/render/element")){
                var HtmlElementList = fsa.deepSearch(name+"/render/element");    

                htmlCacheStr+="jsf3.cache.elements = {\n";
                for(var n=0;n<HtmlElementList.file.length;n++){
                    var filepath=HtmlElementList.file[n];

                    var fileName=filepath.replace(name+"/render/element/","");
                    fileName=fileName.replace(".html","");

                    var content=fsa.readFileSync(filepath).toString();

                    var contentB64=base64.encode(content);

                    htmlCacheStr+="\""+fileName+"\":\""+contentB64+"\",\n";

                    console.log("# read "+filepath);

                }
                htmlCacheStr+="};\n";

            }

            if(manifest.option.libCompressionMode){
                htmlCacheStr=htmlCacheStr.split("\r").join("");
                htmlCacheStr=htmlCacheStr.split("\n").join(""); 
                htmlCacheStr=htmlCacheStr.split("\t").join("");
                console.log("# code Compression....");
            }

            fsa.writeFileSync(buildPath+"/bin/cache.js",htmlCacheStr);
            console.log("# fileset "+buildPath+"/bin/cache.js");

            obj.next();

        },
        function(obj){

            // convert app script
            var pageFileList = fsa.deepSearch(name+"/app");
            
            var pageCacheStr="";
            for(var n=0;n<pageFileList.file.length;n++){
                var content=fsa.readFileSync(pageFileList.file[n]).toString();


                if(manifest.option.libCompressionMode){
                    content=content.split("    ").join("");
                    content=content.split("\r").join(" ");
                    content=content.split("\n").join("");
                }

                pageCacheStr+=" "+content+"\n";
                console.log("# read "+pageFileList.file[n]);
            }
            
            pageCacheStr+=" jsf3.load("+JSON.stringify(manifest.option)+");"

            fsa.writeFileSync(buildPath+"/bin/app.js",pageCacheStr);
            console.log("# fileset "+buildPath+"/bin/app.js");
            
            obj.next();  
        },
        function(obj){

            // asset file copy
            var assetList = fsa.deepSearch(name+"/render/assets");

            if(!fsa.existsSync(buildPath+"/assets")){
                fsa.mkdirSync(buildPath+"/assets");
                console.log("# mkdir "+buildPath+"/assets");    
            }

            for(var n=0;n<assetList.dir.length;n++){
                var path=assetList.dir[n];
                var copyPath=path.replace(name+"/render/assets/","");
                fsa.mkdirSync(buildPath+"/assets/"+copyPath);
            }

            for(var n=0;n<assetList.file.length;n++){
                var path=assetList.file[n];
                var copyPath=path.replace(name+"/render/assets/","");
                fsa.copyFileSync(path,buildPath+"/assets/"+copyPath);
                console.log("# copy "+path+" "+buildPath+"/assets/"+copyPath);
            }

            obj.next();

        },
        function(obj){

            // get JQuery (Download or cachecheck)
            
            // buffer jquery check
    
            if(fsa.existsSync(jqueryCache)){
                console.log("# existed jquery cache [Version]: "+manifest.option.jquery)
                obj.next();
                return;
            }
                    
            var jqueryStr="";
            https.get(jqueryUrl,function(res){
                    
                console.log("# jquery download [URL]: "+jqueryUrl);
                        
                res.setEncoding('utf8');
                    
                res.on('data',function(xml) {
                    jqueryStr+=xml;
                });
        
                res.on('end', function () {
                    fsa.writeFileSync(jqueryCache,jqueryStr);
                    console.log("# jquery loading finish.");           
                    obj.next();
                }); 
        
            });

        },
        function(obj){

            // set jquery
            
            fsa.copyFileSync(jqueryCache,buildPath+"/bin/jquery.js");
    
            console.log("# filecopy "+buildPath+"/bin/jquery.js");

            obj.next();
        },
        function(){

            console.log("#");
            console.log("# build Complete!");

        },
    ]);

};