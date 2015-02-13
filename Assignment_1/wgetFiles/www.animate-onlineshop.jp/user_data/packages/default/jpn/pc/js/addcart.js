$(document).ready(function(){

    var width  = 180; // 画像の横幅
    var height = 70; // 画像の高さ

    var url = location.pathname;
    var directory = url.split("/");
    if(directory[2]=='html') {
        // テスト環境
        var currentDirectory = "/animate/html/";
    } else if(-1 != location.hostname.indexOf("wahtcomu",0)) {
        // テスト環境
        var currentDirectory = "/animate/html/";
    } else {
        // 本番環境
        var currentDirectory = "/";
    }
    var image  = currentDirectory + "user_data/packages/animate/images/img_popup.gif"; // 画像ファイル

    var element = '<img class="popup" src="' + image + '" width="'+width+'" height="'+height+'" alt="" />';

    $(".animate_addcart").click( function(){
        var position = $(this).position();
        var buttonWidth = $(this).width();

        var popupPosition = {
            top : position.top - height -5,
            left: position.left
        };

        $(this).parent().prepend(element);
        var popup = $(this).parent().children(".popup");
        popup.css("top", popupPosition.top+"px");

        var t = setTimeout(
            function() {
                $(".popup").fadeOut("slow");
                clearTimeout(t);
            }, 1000
        );

        return true;

    });

});
