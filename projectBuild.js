const path = require("path");

module.exports={

	build:function(directory){

		var build=require("./command/build.js");
		build(directory);

	},

};
