function animeengine_signin() {
    var current_url = location.href;
//    var signin_url = ANIMEENGINE_CGIURL + '/twitter_signin.cgi?cmd=delete&ret_url=' + ANIMEENGINE_HTMLURL + '/';
    var signin_url = ANIMEENGINE_CGIURL + '/twitter_signin.cgi?cmd=request&signback=' + current_url +'';
    location.href = signin_url;
    return ;
}
function animeengine_signout() {
    var current_url = location.href;
//    var signout_url = ANIMEENGINE_CGIURL + '/twitter_signin.cgi?cmd=delete&ret_url=' + ANIMEENGINE_HTMLURL + '/';
    var signout_url = ANIMEENGINE_CGIURL + '/twitter_signin.cgi?cmd=delete&ret_url=' + current_url +'';
    location.href = signout_url;
    return ;
}
