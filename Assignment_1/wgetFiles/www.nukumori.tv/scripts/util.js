var Countdown =
{
    calcage : function(secs, num1, num2)
    {
         var s = ( ( Math.floor( secs / num1 ) ) %num2 ).toString();

         if ( s.length < 2 && num2 < 100000 ) s = "0" + s;

         return s;
    },

    CountBack : function(params)
    {
        if (params.secs < 0)
        {
            return;
        }

        var Days = parseInt( Countdown.calcage( params.secs,86400,100000 ) );
        var Hours = Countdown.calcage(params.secs,3600,24);
        var Mins = Countdown.calcage(params.secs,60,60);
        var Sec = Countdown.calcage(params.secs,1,60);

        document.getElementById(params.id).innerHTML = ( ( Days > 0 ) ? ( Days + ( ( params.lang == "en" ) ? "days" : "日 " ) ) : "" ) + Hours + ":" + Mins + ":" + Sec;

        setTimeout( function(){ Countdown.CountBack({secs:(params.secs-1),id:params.id,lang:params.lang}) }, 1000);
    },


    start : function( params )
    {
        var secs = Math.ceil( params.end ) -  Math.ceil( params.curr );
        if( secs <= 0 ) secs = 0;

        var lang = ( params.en ) ? "en" : "jp";

        this.CountBack({secs:secs,id:params.id,lang:lang});
    }

}

var Util =
{
    "$" : function( n )
    {
        return document.getElementById( n );
    },

    "makeRequest" : function( params )
    {
        var r = null;

        if (window.XMLHttpRequest)
        {
            r = new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if( r )
        {
            r.onreadystatechange =
            function()
            {
                params.callback( this, params );
            };

            r.open( params.method, params.url, true );
            r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            if( typeof( params.qt ) != "undefined" && params.qt != null )
            {
                r.send( params.qt );
            }
            else
            {
                r.send(null);
            }

        }
    },

    "queryLength" : function( )
    {
        return ((this.$(this.id).src.split("?",2))[1]).length;
    },

    "queryStRaw" :  function(ji, l)
    {
        hu = ( l ) ? l.split("?",2)[1] : window.location.search.substring(1);

        if( !hu ) return [null,null,null];

        gy = hu.split("&");
        pos = 0;

        for (i=0;i<gy.length;i++) {
            ft = gy[i].split("=");
            if (ft[0] == ji) {
                return [ft[1], ( pos + (ft[0]).length + 1 ), hu.length];
            }

            pos+=gy[i].length + 1;
        }

        return [null,null,null];
    },

    "getCookie" :function(cookieName)
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
    },

    "querySt" : function( n )
    {
        if( !this.$(this.id) || 0 >= this.$(this.id).src.length ||
            null == this.queryStRaw( n, this.$(this.id).src ) )
        {
            return null;
        }
        else
        {
            return this.queryStRaw( n, this.$(this.id).src )[0];
        }
    },

    "queryPos" : function( n )
    {
        if( !this.$(this.id) || 0 >= this.$(this.id).src.length ||
            null == this.queryStRaw( n, this.$(this.id).src ) )
        {
            return 0;
        }
        else
        {
            return this.queryStRaw( n, this.$(this.id).src )[1];
        }
    },

    "querySubstr" : function( n, l )
    {
        if( !this.$(this.id) || 0 >= this.$(this.id).src.length ||
            null == this.queryStRaw( n, this.$(this.id).src ) )
        {
            return null;
        }
        else
        {
            var length = ( !l ) ? this.queryLength( ) : l;
            var pos = this.queryStRaw( n, this.$(this.id).src )[1];

            return ((this.$(this.id).src.split("?",2))[1]).substr( pos, length - pos );
        }

    },

    "base64list" : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    "base64encode" : function(s)
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
        t += this.base64list.charAt( ( v > 0 )? (a>>p)&63 : 64 )
        p -= 6;
        v -= 6;
      }
      return t;
    },

    "base64decode" : function(s)
    {
      var t = '', p = -8, a = 0, c, d;

      for( var i = 0; i < s.length; i++ ) {
        if ( ( c = this.base64list.indexOf(s.charAt(i)) ) < 0 )
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

};


function cancel_bid( id )
{
    if(window.confirm('自動入札をキャンセルする場合は「はい」を選択してください'))
    {
        Util.makeRequest
        ({
            url      : "/cancel_bid.php?id=" + id,
            method   : 'get',
            callback :
            function( o, params )
            {
                if( o.readyState == 4 && o.status == 200 )
                {
                    if( o.responseText.split(':')[0] == '1' )
                    {
                        location.reload();
                    }
                    else
                    {
                        alert( o.responseText.split(':')[1] );
                    }
                }
            }
        });
    }
}

function gradient(id, level)
{
	var formbox = document.getElementById(id);
	formbox.style.opacity = level;
	formbox.style.MozOpacity = level;
	formbox.style.KhtmlOpacity = level;
	formbox.style.filter = "alpha(opacity=" + level * 100 + ")";
	formbox.style.display="block";
	return;
}


function fadein(id) 
{
	var level = 0;
	while(level <= 1)
	{
		setTimeout( "gradient('" + id + "'," + level + ")", (level* 1000) + 10);
		level += 0.01;
	}
}


function openbox(formtitle, fadin)
{
  var formbox = document.getElementById('formbox'); 
  document.getElementById('shadowing').style.display='block';

  var btitle = document.getElementById('boxtitle');
  btitle.innerHTML = formtitle + '<a href="javascript:closebox()">閉じる<\/a>';
  
  if(fadin)
  {
	 gradient("formbox", 0);
	 fadein("formbox");
  }
  else
  { 	
    formbox.style.display='block';
  }  	
}


// Close the lightbox

function closebox()
{
   document.getElementById('formbox').style.display='none';
   document.getElementById('shadowing').style.display='none';
}

