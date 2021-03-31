module.exports={

    encode:function(str){
        return Buffer.from(str).toString('base64');
    },

    decode:function(str){
        return Buffer.from(str, 'base64').toString();
    },

};