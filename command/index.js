var cmd=process.argv;
cmd.shift();
cmd.shift();

const path = require("path");

if(cmd[0]=="create"){

    var name=cmd[1];

    var create=require("./create.js");

    create(name);

}
else if(cmd[1]=="build"){
        
}
else if(cmd[1]=="delete"){

}