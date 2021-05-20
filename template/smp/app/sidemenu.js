var toggle=false;
$("html").on("click","header .barger",function(){

    if(toggle){
        toggle=false;
        $(".sidemenu").removeClass("open");
    }
    else{
        toggle=true;
        $(".sidemenu").addClass("open");
    }

});

$("html").on("click",".sidemenu a",function(){
    $(".sidemenu").removeClass("open");
});