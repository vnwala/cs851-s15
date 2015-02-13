function setCookie (name, value)
{ 
    document.cookie = name + '=' + escape(value) + ";path=/;domain=.nyoshin.com" 
}
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCookie(cookieName)
{
    var search = cookieName + '=';

    if (document.cookie.length>0) 
    {
        offset = document.cookie.indexOf(search);
		
        if( offset != -1 )
        {
            offset += search.length;
            end = document.cookie.indexOf(';',offset);
			
            if(end == -1)
                end = document.cookie.length;

            return unescape(document.cookie.substring(offset,end));
        }
    }
	
    return null; 
}

function loginout()
{
    var url = base64encode( ( document.URL ) ) .replace(/=/g, "_" );

    if( document.domain == 'members.nyoshin.com' )
    {
        location.href = 'http://members.nyoshin.com/logout.php?url=' + url;
    }
    else
    {
        location.href = 'http://members.nyoshin.com/login.php?url=' + url;
    }

}

var base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function base64encode(s)
{
  var t = '', p = -6, a = 0, i = 0, v = 0, c;

  while ( (i < s.length) || (p > -6) ) {
    if ( p < 0 ) {
      if ( i < s.length ) {
        c = s.charCodeAt(i++);
        v += 8;
      } else {
        c = 0;
      }
      a = ((a&255)<<8)|(c&255);
      p += 8;
    }
    t += base64list.charAt( ( v > 0 )? (a>>p)&63 : 64 )
    p -= 6;
    v -= 6;
  }
  return t;
}

function base64decode(s)
{
  var t = '', p = -8, a = 0, c, d;

  for( var i = 0; i < s.length; i++ ) {
    if ( ( c = base64list.indexOf(s.charAt(i)) ) < 0 )
      continue;
    a = (a<<6)|(c&63);
    if ( ( p += 6 ) >= 0 ) {
      d = (a>>p)&255;
      if ( c != 64 )
        t += String.fromCharCode(d);
      a &= 63;
      p -= 8;
    }
  }
  return t;
}

