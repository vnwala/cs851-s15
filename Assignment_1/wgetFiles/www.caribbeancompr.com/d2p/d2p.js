
if( typeof TrimPath == 'undefined' )
{
    document.write('<script src="/js/trimpath-template.js" type="text/javascript"><\/script>');
}

var d2p_util =
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

if( d2p_util.getCookie('NetiA') && typeof bm_list1100 == 'undefined' )
{
    document.write( '<script src="http://www.caribbeancom.com/d2p/bookmark_list1100.js"><\/script>' );
}

if( d2p_util.getCookie('NetiA') && typeof bm_list1700 == 'undefined' )
{
    document.write( '<script src="http://www.caribbeancom.com/d2p/bookmark_list1700.js"><\/script>' );
}

var d2p_bookmark = 
{
    site_id : 20000557,
    url_get : '/snstb/api/bookmark?site_id=',
    url_add : 'https://sns.d2pass.com/mylist/siteSide/create',

    add : function( params )
    {
        var url = this.url_add 
                + '?NetiFL=1' 
                + '&m_id=' + params.movie_id 
                + '&s_id=20000557'
                + '&m_seq=' + params.movie_seq 
                + '&key=' + params.key;
        if( !d2p_util.getCookie( 'NetiA' ) )
        {
            alert( '当機能をご利用いただくにはログインが必要です' ); 
            return;
        }

        if( !( d2p_util.getCookie("NetiA").split(':')[0] ).match( /.+@.+\..+/ ) )
        {
            alert( 'D2Pass会員限定の機能となりますので、DTI会員のかたはマイグレーションしてからご利用ください。' );
            location.href = "https://www.d2pass.com/about_migration/";
            return;
        }

        newwindow = window.open( url,'name','height=300,width=500, menubar=0, resizable=0, location=0, status=0' );

        if( window.focus ) 
        {
            newwindow.focus()
        }
        
        //return false; 
    },

    get : function( _return, settings )
    {
        _site_id = this.site_id;

        if( typeof settings != 'undefined' &&
            typeof settings.site_id != 'undefined' )
        {
            _site_id = settings.site_id;
        }

        var params =
        {
            url      : this.url_get + _site_id,
            method   : 'get',
            callback : this.get_callback,
            _return  : _return,
            settings : settings
        }

        d2p_util.makeRequest( params );
    },

    get_callback : function( o, params )
    {
        if( o.readyState == 4 && o.status == 200 ) 
        {
            var r = {};
            r.bm_lists = [];
            r.settings = params.settings;
 
            try
            {
                eval( 'var list_s = ' + o.responseText );
                if( typeof params.settings.bm_list_varname != 'undefined' )
                {
                    eval( 'var _bm_list = ' + params.settings.bm_list_varname );
                }
            }
            catch(e){ params._return( r ); return r; }

            if( !list_s || 0 >= list_s.length ) 
            {
                params._return( r );
                return r;
            }

            //bm_list -- from /d2p/bookmark_list.php
            for( i = 0; i < list_s.length; i++ )
            {
                if( typeof r.settings.is_vchat != 'undefined' )
                {
                    r.bm_lists[ i ] = list_s[i];
                }
                else if( typeof _bm_list[ list_s[i]['dl_movie_seq'] ] != 'undefined' )
                {
                    l = r.bm_lists.length;
                    r.bm_lists[ l ] = _bm_list[ list_s[i]['dl_movie_seq'] ];
                }
            }

            params._return( r );
        } 
    }

};


var d2p_playlist =
{
    site_id : 20000557,
    url_get : '/snstb/api/bookmark?site_id=20000557',
    url_add : 'https://sns.d2pass.com/mylist/siteSide/create',

    add : function( params )
    {
        var url = this.url_add
                + '?NetiFL=1'
                + '&m_id=' + params.movie_id
                + '&s_id=' + this.site_id
                + '&m_seq=' + params.movie_seq
                + '&key=' + params.key
                + '&st=1';

        if( !d2p_util.getCookie( 'NetiA' ) )
        {
            alert( '当機能をご利用いただくにはログインが必要です' );
            return;
        }

        newwindow = window.open( url,'name','height=300,width=500, menubar=0, resizable=0, location=0, status=0' );

        if( window.focus )
        {
            newwindow.focus()
        }
       
        //return false; 
    }
};

var d2p_review =
{
    site_id : 20000557,
    url_get : '/d2ptb/api/bookmark?site_id=20000557',
    url_add : 'https://sns.d2pass.com/mylist/siteSide/review',

    write : function( params )
    {
        var url = this.url_add
                + '?NetiFL=1'
                + '&m_id=' + params.movie_id
                + '&s_id=' + this.site_id
                + '&m_seq=' + params.movie_seq
                + '&key=' + params.key;
        if( !d2p_util.getCookie( 'NetiA' ) )
        {
            alert( '当機能をご利用いただくにはログインが必要です' );
            return;
        }

        if( typeof window._active_movie_ != 'undefined' && window._active_movie_ == 0 )
        {
            alert( '作品をご購入いただくとレビューが投稿できます' );
            return;
        }

        if( !(d2p_util.getCookie('NetiA')).match(/^(.*)\@(.*)$/) )
        {
            alert('レビューの書き込みは D2Pass のサービスとなっております。 '
                  + 'DTI 会員のお客様は、 D2Pass 会員へのマイグレーションが必要です。');

            location.href = 'http://www.d2pass.com/help/faq/?q=21';
            return;
        }

        newwindow = window.open( url,'name','height=470,width=500, menubar=0, resizable=0, location=0, status=0' );

        if( window.focus )
        {
            newwindow.focus()
        }

        //return false; 
    },
    
    
    url_like : 'https://sns.d2pass.com/ajax/addLike', 
  
    addLike : function(review_id) 
    { 
        if( !d2p_util.getCookie( 'NetiA' ) )
        {
            alert( '当機能をご利用いただくにはログインが必要です' );
            return;
        }
        
        var url = this.url_like 
        + '/' 
        + review_id 
        + '?callback=d2p_review.isLike'; 
    
        var scr = document.createElement("script"); 
    
        scr.setAttribute("type", "text/javascript"); 
        scr.setAttribute("language", "javascript"); 
        scr.setAttribute("src", url); 
    
        document.getElementsByTagName("head")[0].appendChild(scr); 
    }, 
    
    isLike : function(data) 
    { 
        if(data.result == 'success') 
        { 
            var prev = document.getElementById("like"+data.review_id).innerHTML; 
            var curr = parseInt(prev) + 1; 
    
            document.getElementById("like"+data.review_id).innerHTML = curr; 
            document.getElementById("like_count"+data.review_id).style.display = 'block'; 
        } 
        else if(data.result == 'multiple') 
        { 
            alert("１つのレビューに対し、1回まで有効です"); 
        } 
        else if(data.result == 'yours') 
        { 
            alert("ご自分で投稿されたレビューには適用されません"); 
        } 
        else if(data.result == 'login') 
        { 
            alert("ログインして下さい。"); 
        } 
    } 

};
