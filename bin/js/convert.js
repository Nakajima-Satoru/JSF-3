javelin.base64={
    encode:function(str){
        return btoa(encodeURIComponent(str));
    },

    decode:function(b64str){
        return decodeURIComponent(atob(b64str));
    },
};

javelin.uniqId=function(length){

    if(!length){
        length=40;
    }

    var libon="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var str="";
    for(var n=0;n<length;n++){
        var m = parseInt(Math.random()*100000);
        var word=libon[m % libon.length];

        str+=word;
    }

    return str;

};

javelin.date=function(formatStr,dateTimeStr){

    if(!formatStr){
        formatStr="Y-m-d";
    }

    if(dateTimeStr){
        var d_=new Date(dateTimeStr);
    }
    else{
        var d_=new Date();
    }

    var str=formatStr;
    var weeks=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var weeksJ=["日","月","火","水","木","金","土"];

    str=str.replace("Y",d_.getFullYear());
    str=str.replace("m",("0"+(d_.getMonth()+1)).slice(-2));
    str=str.replace("d",("0"+d_.getDate()).slice(-2));
    str=str.replace("H",("0"+d_.getHours()).slice(-2));
    str=str.replace("i",("0"+d_.getMinutes()).slice(-2));
    str=str.replace("s",("0"+d_.getSeconds()).slice(-2));

    str=str.replace("ww",weeks[d_.getDay()]);
    str=str.replace("wj",weeksJ[d_.getDay()]);
    str=str.replace("w",d_.getDay());

    str=str.replace("U",d_.getTime());

    return str;

};