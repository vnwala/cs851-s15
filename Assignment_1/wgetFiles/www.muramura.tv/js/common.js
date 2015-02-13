var historyName
var cookieName = "page_history"   
var cookieInfo
var arr = new Array()
var historyURL = document.URL
var stop_toolbar; //=1 when to stop the d2p toolbar
var d2p_url = 'http://www.d2pass.com/';

function gaLoaded()
{
    var url = "http://gat.muramura.tv/gat/";
    var method = "GET";
    var xhr = new XMLHttpRequest();
    if ( "withCredentials" in xhr ) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
      xhr.withCredentials = true;
      xhr.onload = function() {};
      xhr.send();
    } else if ( typeof XDomainRequest != "undefined" ) {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
      xhr.onload = function() {};
      xhr.send();
    }
}

function setScriptLoaded(e, f)
{
    if(typeof(e.addEventListener) != 'undefined')
    {
        e.addEventListener("load", f, false);
    }
    else if( e.attachEvent )
    {
        e.attachEvent('onreadystatechange', f);
    }
}

function escapeHtml(unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function showUserStatus() {
	user_status = getCookie('user_status');
	netia = getCookie('NetiA');
	user_status_name = '';
	if(netia) {
		if(user_status=='1') { 
			user_status_name = '非会員';
		} else if(user_status=='2') {
			user_status_name = '会員';
		} else if(user_status=='3') {
			user_status_name = 'VIP会員';
		}
	}

	if(user_status_name!='') {
		document.write('<li>' + user_status_name + '</a></li><li><a href="javascript:logout();"><img src="/images/header/button_logout.gif" width="87" height="19" border="0" /></a></li><li class="spacer"><a href="/logoff.php?id=1">別名でログインする</a></li>');
	} else {
		document.write('<li><a href="/member/login.php?url=' + document.URL + '"><img src="/images/header/login.gif" border="0" ALT="ログイン" /></a></li><li class="spacer"><a href="https://pw.allbrightinformation.com" target="blank">ID/パスワードを忘れた方</a></li>');
	}
}

function showD2PToolbar() {
 if( typeof window._d2ptbq == 'object' ) return;

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

//document.write('<script type="text/javascript" src="http://www.caribbeancom.com/d2ptoolbar/muramura.tv/util.js"><\/script>');
//netia = getCookie('NetiA');
//document.write('<script language="javascript" src="/js/d2ptar.js"><\/script>');
/*
  if (stop_toolbar != 1) {
        netia = getCookie('NetiA');
        ml = '';
        if(netia) {
            cForm = netia.split(":");
            check = /.+@.+\..+/;

            if (cForm[0].match(check))
            {
           //     d2ptoolbar_url = "/d2ptb?NetiFL=1";
		d2ptoolbar_url = "/d2ptb";  
          }
            else
            {
                d2ptoolbar_url = "https://images.d2pass.com/images/toolbar/sjis/black_dti.html";
            }

           document.write('<TABLE cellSpacing=0 cellPadding=0 width="990" border=0 style="margin:0 auto; line-height:.6em;" ><TBODY><TR><TD height=23>');
           document.write('<IFRAME src="' + d2ptoolbar_url );
           document.write('" frameBorder=0 width="100%" scrolling=no height=23></IFRAME></TD></TR></TBODY></TABLE>');

        }
  }
*/
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function check_password() {
  if(document.orderForm.password.value=="") {
    alert("パスワードを入力してください。");
    document.orderForm.password.focus();
    return false;
  } else {
    document.orderForm.submit();
  }
}

if(historyURL.indexOf('#')>-1){
   historyURL = historyURL.substring(0,historyURL.indexOf('#'))

}


function setCookie (name, value){ 
    document.cookie = name + '=' + escape(value) + ";path=/;" 
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCookie(cookieName){
	  
      var search = cookieName + '=';
	  if (document.cookie.length>0) {
	    offset = document.cookie.indexOf(search)
	    if (offset != -1){
	      offset += search.length;
	      end     = document.cookie.indexOf(';',offset)
	      if(end == -1)
	        end = document.cookie.length;
	      return unescape(document.cookie.substring(offset,end))
	    }
	  }
	  return null; 
}

var cookieInfo = getCookie("page_history")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showHistory(){
          document.write(" <table cellspacing=0 cellpadding=0 width=\"100%\" border=0><tr><td height=\"26\" bgcolor=\"#000000\"><font color=\"#000000\">.</font>")
	  if(cookieInfo){
               	arr = cookieInfo .split("|") 
		for(var i=0; i < arr.length; i++){
			if ( (arr[i].split("::"))[1].indexOf("vote.php", 0) == -1 ){
				if(i+1 == arr.length)
					document.write("<a href="+(arr[i].split("::"))[1]+">"+(arr[i].split("::"))[0]+"</a>") 
				else if((arr[i].split("::"))[0] != "")
					document.write("<a href="+(arr[i].split("::"))[1]+">"+(arr[i].split("::"))[0]+"</a>&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;")
			}
		}
                
          }
          document.write("</td></tr></table>")
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*function checkHistory(arrLocal){
  for(i=0; i<arrLocal.length; i++){
    strHistory = arrLocal[i]
    strHistoryName = (strHistory.split("::"))[0]
    strHistoryURL = (strHistory.split("::"))[1]
    if(strHistoryURL.indexOf(historyURL) > -1 || ( strHistoryName.indexOf(historyName) > -1 && strHistoryName.length == historyName.length)) return false
  }
   
  return true

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(!historyName){
   historyName = (document.title).replace("muramura.tv  ", "")
   if(historyName.indexOf('#') > -1){
       historyName = historyName.substring(0,historyName.indexOf('#'))
   }
}
if(historyName && historyName != ""){   
    if(cookieInfo){
        arr = cookieInfo .split("|")
        if(checkHistory(arr)){
    		if(arr.length >= 5) 
		        arr = (arr.slice(1,5)).concat(new Array(historyName+"::"+historyURL))
		else 
		    	arr = arr.concat(new Array(historyName+"::"+historyURL))
		    
		    setCookie(cookieName,  (cookieInfo = arr.join("|")))
        }
    
    }    
    else
        setCookie(cookieName, historyName+"::"+historyURL)
}

*/

function MM_showFlash(path, width, height, title) {
  document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+width+'" height="'+height+'" tabindex="2" title="'+title+'"><param name="movie" value="'+path+'" /><param name="quality" value="high" /><embed src="'+path+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'"></embed></object>');
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function delete_confirm() {
	var len = document.forms[0].delid.length;
  	var count_checked = 0;
	var del_id = "";
  	for (i=0; i < len; i++ ) {
    	if ( document.forms[0].delid[i].checked == 1 ) {
		if (del_id != "") del_id = del_id + ',';
		del_id = del_id + document.forms[0].delid[i].value;
                count_checked++;
        }
      }
      if (count_checked) {
		document.forms[0].id.value = del_id;
        	var flag = confirm(count_checked + " 商品をカートから削除しますか？");
        	if (flag) return true; else return false;
      } else {
		if (!document.forms[0].delid.checked) {
        		alert('カートから削除する商品を選択してください\n');
          		return false;
		} else {
			document.forms[0].id.value = document.forms[0].delid.value;
        		var flag = confirm("1 商品をカートから削除しますか？");
        		if (flag) return true; else return false;
		}
      }
}

var netiA = getCookie("NetiA");


function common_makeRequest(url, callback) {
  http_request = null;
  if (window.XMLHttpRequest) {
    http_request = new XMLHttpRequest();
    http_request.onreadystatechange = callback;
    http_request.open("GET", url, true);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http_request.send(null);
    // branch for IE/Windows ActiveX version
  } else if (window.ActiveXObject) {
    isIE = true;
    http_request = new ActiveXObject("Microsoft.XMLHTTP");
    if (http_request) {
      http_request.onreadystatechange = callback;
      http_request.open("GET", url, true);
      http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      http_request.send(null);
    }
  }
  return;
}



function common_do_it() {
  // (0:uninitialized, 1:loading, 2:loaded, 3:interactive, 4: complete)
  if (http_request.readyState == 4) {
    // (200:ok)
    if (http_request.status == 200) {
      var server_response = http_request.responseText;

  //alert("response: " + server_response );

     if (server_response.indexOf('1') != -1) {
          var res = http_request.responseText.split("\n");
          var stop_flag;
          if (res[3]) { stop_flag = res[3]; }
                is_d2p = res[2];
          if (stop_flag == 99) {
                show_popup = 0;
          } else {
                var expiration = res[3];
                site_name_dx = res[4];
                user_type_dx = res[5];

                // re-define "$" 
                $ = function () {
                      var elements = new Array();

                      for (var i = 0; i < arguments.length; i++) {
                          var element = arguments[i];
                          if (typeof element == 'string')
                          element = document.getElementById(element);

                          if (arguments.length == 1)
                              return element;

                          elements.push(element);
                      }

                      return elements;
                }

                myLightbox = new Lightbox();
                myLightbox.start(null);

                return;
          }
      }
    }

    location.href = '/logoff.php?action=logout';

  }


}

// changed 022309 by Yuka
// logout with coupon for d2pass user
/*function logout_old()  
{
//    myLightbox = new Lightbox();
//    myLightbox.start(null);

    if( (((getCookie('NetiA')).split(":"))[0]).match(/.+@.+\..+/) )
    {
        // d2pass  with coupon
        common_makeRequest("/member/cgi-bin/coupon2_dx.cgi", common_do_it);
    }
    else
    {
        // dti
        location.href = '/logoff.php?action=logout&url=' + document.URL;
    }
}*/


// changed 022309 by Yuka 
// logout without coupon for d2pass user
function logout()
{
//    myLightbox = new Lightbox();
//    myLightbox.start(null);

  if( (((getCookie('NetiA')).split(":"))[0]).match(/.+@.+\..+/) )
    {
        // d2pass  without coupon
        location.href = '/logoff.php?action=logout';
    }
    else
    {
        // dti
        location.href = '/logoff.php?action=logout&url=' + document.URL;
    }
}	

function loginbtn() {
    user_status = getCookie('user_status');
    netia = getCookie('NetiA');

   if( netia && ( document.URL ).search( /^http:\/\/(\w*)(.*)muramura.tv\/member\//i ) >= 0 ) {
                        document.write('<li><a target="_top" href="javascript:logout();">ログアウト</a></li>');
   } else if(netia && document.URL == 'http://www.muramura.tv/join.html'){
//         document.write('<li><a target="_top" href="javascript:logout();">ログアウト</a></li>');
	   document.write('<li><a target="_top" href="/logout.php">ログアウト</a></li>');	
    } else {
         document.write('<li><a target="_top" href="javascript:login();">メンバーログイン</a></li>');
    }
}


function footer()
{
    document.write('<script type="text/JavaScript" src="http://tar1.d2pass.com/js/mura.js"><\/script>');
}


function showrandomtop()
{
    var movies = new mura_movies();
    var m = movies.data.movieinfo[ Math.floor( Math.random() * 100 ) ].data;
   
    var is_member = document.URL.match(/\/member\//) ? 1 : 0;
 
    var out = '<dl class="fin">'
        + '<dt><a href="'+(is_member?"/member":"")+'/moviepages/'+m.movie_id+'/index.html"><img src="/moviepages/'+m.movie_id+'/images/list_s.jpg" width="308" height="170">'
        + '</a></dt>'
        + '<dd class="title">'
        + '<a href="/moviepages/'+m.movie_id+'/index.html">'
        + m.m_title + '</a></dd><dd>'
        + m.m_memo.substring(0,70) + "..."
        + '</dd><dd class="name">'+m.start_date.replace(/-/g, "/")+'</dd></dl>';

    document.write( out );

}
