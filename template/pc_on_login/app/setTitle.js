const setTitle = function(title){

    var defaultTitle = "Javelin Web Sample(PC)";

    if(title){
        title = title + " | " + defaultTitle;
    }
    else{
        title = defaultTitle;
    }

    $("title").text(title);

};