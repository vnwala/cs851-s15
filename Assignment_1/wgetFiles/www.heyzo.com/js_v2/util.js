var historyName
var cookieName = "page_history"   
var cookieInfo
var arr = new Array()
var historyURL = document.URL
var stop_toolbar; //=1 when to stop the d2p toolbar
var d2p_url = 'http://www.d2pass.com/';

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
		document.write('<li>' + user_status_name + '</a></li><li><a href="/logoff.php"><img src="/images/header/button_logout.gif" width="87" height="19" border="0" /></a></li><li class="spacer"><a href="/logoff.php?id=1">別名でログインする</a></li>');
	} else {
		document.write('<li><a href="/member/login.php?url=' + document.URL + '"><img src="/images/header/login.gif" border="0" ALT="ログイン" /></a></li><li class="spacer"><a href="https://pw.allbrightinformation.com" target="blank">ID/パスワードを忘れた方</a></li>');
	}
}

function showD2PToolbar(site_tagname) {

    var d2ptb_match = document.URL.match(/\/monthly\/([0-9a-zA-Z]+)\//);
    var d2ptb_q;

    if( site_tagname || d2ptb_match )
    {
        if( !site_tagname && d2ptb_match )
        {
            site_tagname = d2ptb_match[1];
        }

        //d2ptb_q = "join=/monthly/"+site_tagname+"/join.html&login=/monthly/"+site_tagname+"/member/php/login.php&logouturl=1&logouthasparams=1&logout=/app/logout/?hard=1";
		d2ptb_q = "join=/join.html&login=/monthly/"+site_tagname+"/member/php/login.php&logouturl=1&logouthasparams=1&logout=/app/logout/?hard=1";
    }
    else
    {
        d2ptb_q = "nojoin=1&login=/member/php/login.php&logout=/app/logout/?hard=1";
    }

    document.write('<script id="d2ptb_util" type="text/javascript" src="/d2ptoolbar/util.js?'+d2ptb_q+'"></script>');

/*
if(getCookie('NetiA'))
{
    document.write('<iframe src="/d2ptb?NEtiFL=1" frameBorder=0 width="100%" scrolling=no height=23></iframe>');
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
function checkHistory(arrLocal){
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
   historyName = (document.title).replace("カリビアンコム　プレミアム　", "")
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

function MM_showFlash(path, width, height, title) {
  document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+width+'" height="'+height+'" tabindex="2" title="'+title+'"><param name="movie" value="'+path+'" /><param name="quality" value="high" /><embed src="'+path+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'"></embed></object>');
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function delete_confirm() 
{
    var len = document.forms.delForm.delid.length;
    var count_checked = 0;
    var del_id = "";
  	
    for( i = 0; i < len; i++ ) 
    {
        if ( document.forms.delForm.delid[i].checked == 1 ) 
        {
            if (del_id != "") del_id = del_id + ',';
		
            del_id = del_id + document.forms.delForm.delid[i].value;

            count_checked++;
        }
    }
      
    if( count_checked ) 
    {
        document.forms.delForm.id.value = del_id;
        	
        var flag = confirm(count_checked + " 商品をカートから削除しますか？");
        	
        if (flag) return true; else return false;
    } 
    else 
    {
        if (!document.forms.delForm.delid.checked) 
        {
            alert('カートから削除する商品を選択してください\n');
            return false;
        } 
        else 
        {
            document.forms.delForm.id.value = document.forms.delForm.delid.value;
            var flag = confirm("1 商品をカートから削除しますか？");
            if (flag) return true; else return false;
        }
    }
}

function makeRequest(url, callback)
{
    httpReady = 0;

    var xmlHttpReq = false, self = this;

    // Mozilla/Safari
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    self.xmlHttpReq.open('GET', url, true);
//    self.xmlHttpReq.open('GET', url, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
            //alert(self.xmlHttpReq.responseText);
            httpReady = 1;
            return callback(self.xmlHttpReq.responseText);

        }
    }
    self.xmlHttpReq.send(url);
}

var netiA = getCookie("NetiA");


function querySt(ji) {

    hu = window.location.search.substring(1);
    gy = hu.split("&");

    for (i=0;i<gy.length;i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }

    return null;
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

