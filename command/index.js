var cmd=process.argv;
cmd.shift();
cmd.shift();

const path = require("path");

if(cmd[0]=="create"){

    var name=cmd[1];

    var create=require("./create.js");

    create(name);

}
else if(cmd[0]=="build"){

    var name=cmd[1];

    var build=require("./build.js");

    build(name);

}
else if(cmd[0]=="delete"){

}