
function setCookie (name, value)
{
    document.cookie = name + '=' + escape(value) + ";path=/;domain=.caribbeancompr.com"
}

function getCookie(cookieName)
{
        var search = cookieName + '=';
        if (document.cookie.length>0) {
                offset = document.cookie.indexOf(search);
                if (offset != -1){
                        offset += search.length;
                        end             = document.cookie.indexOf(';',offset);
                        if(end == -1)
                                end = document.cookie.length;
                        return unescape(document.cookie.substring(offset,end));
                }
        }
        return null;
}

function setD2passToolbar()
{
 window._d2ptbq = window._d2ptbq || {};


 (function() {
    var d2ptb = document.createElement('script'); d2ptb.type = 'text/javascript'; d2ptb.async = true;
    d2ptb.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'images.d2pass.com/images/d2p_toolbar/min.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(d2ptb, s);
  })();

 //for 2 auth 
 (function() { try{
    if( document.cookie.length > 0 && document.cookie.indexOf("NetiA=") > -1 )
    {
        var n2sa = document.createElement('script'); n2sa.type = 'text/javascript'; n2sa.async = true;
        n2sa.src = "http://www.caribbeancom.com/n2sa/n2sa.js";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(n2sa, s);
    }
  }catch(e){ (console&&console.log) ? console.log(e) : null; } })();

/*
    if( !$ ) return null;

    window.initToolbar = function( )
    {
        if( d2ptb_util.getCookie('NetiA') )
        {
            $('<script language="javascript" src="'+d2ptb_util.src_url+'"></scri'+'pt>' ).appendTo('head');
        }
    }

    $('<script id="d2ptb_util" language="javascript" src="http://www.caribbeancom.com/d2ptoolbar/util.js?login=javascript:loginout()&logout=javascript:loginout()&join=javascript:clickJoin()"></scri'+'pt>').appendTo('head');
*/
}



