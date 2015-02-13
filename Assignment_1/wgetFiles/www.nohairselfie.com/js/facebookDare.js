function facebookDare(){
    $('.you:visible').css('background-color', originalColor);

    if ($('.you:visible').val().toLowerCase() != "your name")
    {
        if ($('.dared:visible').val().toLowerCase() == "person dared")
        {
            var title = $('.you:visible').val().toUpperCase() + " IS HAIR DARING SOMEONE TO SHAVE THEIR HEAD #NOHAIRSELFIE FOR CANCER RESEARCH!";
            var desc = "How much are you willing to shave your head for on #WorldCancerDay in support of Canadians fighting cancer?";
        }else
        {
            var title = $('.you:visible').val().toUpperCase() + " HAS HAIR DARED " + $('.dared:visible').val().toUpperCase() + " TO SHAVE THEIR HEAD ON FEBRUARY 4TH #NOHAIRSELFIE FOR CANCER RESEARCH!";
            var desc = $('.dared:visible').val().toUpperCase() + ", how much would it take for you to shave your head on #WorldCancerDay in support of Canadians fighting cancer?";
        }
        
        var url = window.location.href;
        var image = 'http://az681300.vo.msecnd.net/assets/Facebook_OG_Image.jpg';
        var obj = {method: 'feed',link: url, picture: image, name: title, description: desc};
        function callback(response){}
        FB.ui(obj, callback);   
    }
    else
    {
        $('.you:visible').css('background-color', '#ff6666');
    }
            
}

var originalColor = $('.you:visible').css('background-color');
$('.fbDare').click(facebookDare);
