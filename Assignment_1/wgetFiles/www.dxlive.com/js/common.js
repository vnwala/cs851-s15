var livew;

function includeJS(jsPath){
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", jsPath);
  document.getElementsByTagName("head")[0].appendChild(script);
}

includeJS('/include/js/');

function logout(){
    var win = window.opener ? window.opener : window.dialogArguments, c;
    if(win != undefined){
       opener.window.location = "/logout";
       window.close();
    } else {
       window.location = "/logout";
    }
}

function d2p_toolbar_logout(){
       window.location = "/logout";
}

function d2p_toolbar_login(){
       window.location = "/member/pageSelect";
}

function d2p_toolbar_site_join() {
       window.location = "/join.html";
}

function openGuestJoin() {
       window.open('/join.html','JoinPage','width=1200,height=800,location=yes,resizable=yes,scrollbars=yes,status=yes,menubar=yes,toolbar=yes');
       //openNewWindow('/join.html','JoinPage','width=1000,height=800,resizable=yes,scrollbars=yes');
}

function openFiveMinFreechat(){
       window.open('/promo/2013/chat5minFree/index.html','FiveMinFree','width=1200,height=800,location=yes,resizable=yes,scrollbars=yes,status=yes,menubar=yes,toolbar=yes');
       //openNewWindow('/promo/2013/chat5minFree/index.html','FiveMinFree','width=1000,height=800,resizable=yes,scrollbars=yes');
}

function setCookie(name, value, expires, path, cookie_domain, secure) {
  expires = (expires) ? expires.toGMTString() : '';
  path = (path) ? path : '/';
  cookie_domain = (cookie_domain) ? cookie_domain : domain;
  var curCookie = name + "=" + escape(value) +
  ((expires) ? "; expires=" + expires : "") +
  ((path) ? "; path=" + path : "") +
  ((domain) ? "; domain=" + cookie_domain : "") +
  ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function copyright(teston) {
    copyright=new Date();
    update=copyright.getFullYear();
    if( teston ) {
	document.write("<a href=\"#\"onClick=\"MM_openBrWindow('/chat?hd=1&test=1','hd','scrollbars=yes,resizable=yes,width=1273,height=548')\">");
	document.write("&copy; ");
	document.write("</a>");
        document.write("2002-"+ update + " Dxlive.com All rights reserved.");
    }  else  {
        //document.write("&copy; 2002-"+ update + " Dxlive.com All rights reserved.");
	document.write("&copy; 2002 DXLIVE.COM ALL RIGHTS RESERVED.");
    }

}



function getCookie(cookieName){

  var search = cookieName + '=';

  if (document.cookie.length>0) {

    offset = document.cookie.indexOf(search);

    if (offset != -1){

      offset += search.length;

      end     = document.cookie.indexOf(';',offset);

      if(end == -1)

        end = document.cookie.length;

      return unescape(document.cookie.substring(offset,end));

    }

  }

  return null;

}



function openMemo(contact) {

  if (contact==null || contact == 'undefined') {

    var obj = getElementFromName('contact_name');

    if (obj) {

        contact = getElementFromName('contact_name').value;

    } else {

        contact = '';

    }

  }

  if (contact!='') {

    openNewWindow('/contact/memo/' + contact,'contact'+contact,'width=675,height=400,resizable=yes,scrollbars=yes');

  } else {

    openNewWindow('/contact/','contact','width=900,height=600,resizable=yes,scrollbars=yes');

  }

}



function openProfile(uname) {

  //openNewWindow('/preview/'+uname, 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950'); 
  window.open('/preview/'+uname, '_blank');
}



function openProfile1P(uname) {

  //openNewWindow('/preview/'+uname+'?NetiFL=1', 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');
  window.open('/preview/'+uname+'?NetiFL=1', '_blank');
}





function openFcProfile(uname) {

  openNewWindow('/fanclub/'+uname, 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950'); 

}



function openPR(uname) {

  openNewWindow('/video/pr/'+uname, 'pr'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=855,height=605');

}







function showFcUpdateInfo() {

  if (fc_contents) {

    document.getElementById('fc_diary_info').innerHTML= fc_contents.diary;

    document.getElementById('fc_image_info').innerHTML= fc_contents.image;

    document.getElementById('fc_video_info').innerHTML= fc_contents.video;

    last_update = new Array();

    last_update = fc_contents.last_update.split("-");

    document.getElementById('fc_last_update').innerHTML= last_update[0]+'年'+last_update[1]+'月'+last_update[2]+'日';

  }

}



function setChatMode(mode) {
    var xmlhttp = getXmlhttp();
    var url = "";
    url = "/member/setChatMode/" + mode;
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function()
    {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        res = xmlhttp.responseText;
      }
    }

    xmlhttp.send(null);
    setCookie('vm',mode);
    setTimeout("xmlHttpGet('/member/account', 'status');",1500);
}

function setChatMode_vctp(mode) {
    var xmlhttp = getXmlhttp();
    var url = "";
    url = "/member/setChatMode/" + mode;
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function()
    {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        res = xmlhttp.responseText;
      }
    }

    xmlhttp.send(null);
    setCookie('vm',mode);
    //setTimeout("xmlHttpGet('/member/account', 'status');",1500);
}



function setChatType(mode) {
    var xmlhttp = getXmlhttp();
    var url = "";
    url = "/member/setChatLayout/" + mode;
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function()
    {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        res = xmlhttp.responseText;
      }
    }

    xmlhttp.send(null);
    setCookie('ct',mode);
    setTimeout("xmlHttpGet('/member/account', 'status');",1500);
}

//Moved to home so all users can use it without logging in.
function setThumbSize()
{
	var setSize;
	var id_big='thsbtn_on';
	var large=getCookie('thumbsize');

	if(large==1){
		moviethumb=18;
		setSize=0;
	}
	else{
		moviethumb=15;
		setSize=1;
	}

	setCookie('thumbsize',setSize);
	if(setSize==1){
		if(document.layers){
			document.layers[id_big].textContent='大';
		}else if(document.all){
			document.all[id_big].innerText='大';
		}else if(document.getElementById){
			document.getElementById(id_big).textContent='大';
		}
	}else{
		if(document.layers){
			document.layers[id_big].textContent='小';
		}else if(document.all){document.all[id_big].innerText='小';}else

		if(document.getElementById){document.getElementById(id_big).textContent='小';}
	}

	setTimeout("categoryView(global_tab_cat);",100);
}

function setPageMode(mode) {

    var xmlhttp = getXmlhttp();

    var url = "";

    url = "/member/setPageMode/" + mode;

    xmlhttp.open('POST', url, true);

    xmlhttp.onreadystatechange = function()

    {

      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)

      {

        res = xmlhttp.responseText;

      }

    }



    xmlhttp.send(null);

    setCookie('mp',mode);
	$(document).ready(function() {
		//alert(mode);
		//first take away class and uncheck the radio, using a's class
		$('a.pageChecker').parent().removeClass('pageChecked');
		$('a.pageChecker').children('input').attr('checked', false);
		
		//then add class and check the radio by var mode, which corresponds each a's #
		$('a#'+mode).parent().addClass('pageChecked');
		$('a#'+mode).children('input').attr('checked', true);
	});
    //setTimeout("xmlHttpGet('/member/account', 'status');",50);



}



function openPreview(uname) {

  //openNewWindow('/preview/'+uname, 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950'); 
  window.open('/preview/'+uname, '_blank');
}

function openPreviewCCG(uname) {
  window.open('http://www.caribbeancomgirl.com/preview/'+uname, '_blank');
}





function openViewerProfile(uname, origin) {
  if(!origin){
    var origin = 'default';
  }

  var xmlhttp = getXmlhttp();
  var url = "";
  url = "/footprint/"+origin+"/"+uname;
  xmlhttp.open('POST', url, true);
  xmlhttp.onreadystatechange = function()
  {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
      res = xmlhttp.responseText;
    }
  }
  xmlhttp.send(null);
	openNewWindow('/profile/member/'+uname, 'profile', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=355,height=601');
}



function openViewersChatSame(performer, stype, fromSite, replace) {
      if (stype != 115 && stype != 120) {
        var chatmode = getCookie('vm');
        if (chatmode=='ROM') {
            stype = 120;
        } else if(chatmode=='PUBLIC'){
            stype = 115;        
	}
      }
      window.close();
      if(fromSite){
        chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite+'?2ndchat=1&replace=1', performer, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');
      } else {
        chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'?2ndchat=1&replace=1', performer, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');
      }
      chatw.focus();
}



function openViewersChatTrack(performer, stype, fromSite, notMax) {

    //if (isUser() || isVIP()) {

      if (stype != 115 && stype != 120) {

        var chatmode = getCookie('vm');

        if (chatmode=='ROM') {

            stype = 120;

        } else if(chatmode=='PUBLIC'){

            stype = 115;

        }

      }

      if(notMax){

        if(fromSite){

          chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite+'?notMax=1&2ndchat=1', performer, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

        } else {

          chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'?notMax=1&2ndchat=1', performer, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

        }

      } else {

        if(fromSite){

          chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite+'?2ndchat=1', performer, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

        } else {

          chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'?2ndchat=1', performer, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

        }

      }

      chatw.focus();

    //} else {

    //    openProfile(performer);

    //}

}



function openViewersChatHDrom(performer, stype, fromSite) {

      if (stype != 115 && stype != 120) {

        var chatmode = getCookie('vm');

        if (chatmode=='ROM') {

            stype = 120;

        } else if(chatmode=='PUBLIC') {

            stype = 115;

        }

      }

      if(fromSite){

        var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite+'?hdrom2=1', performer, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');

      } else {

        var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'?hdrom2=1', performer, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');

      }

      chatw.focus();

}



//Use stype = 110 in templates if you want to use viewer category choice.

//jchen just changed preview template from 110 to 115. If you want 110 talk to me please.

function openViewersChatHD(performer, stype, fromSite) {
  if (stype != 115 && stype != 120) {
        var chatmode = getCookie('vm');
        if (chatmode=='ROM') {
            stype = 120;
        } else if(chatmode=='PUBLIC'){
            stype = 115;
        }
  }
  if(fromSite){
    var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=720');
  } else {
    var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=720');
  }	  
  chatw.focus();
}



function openViewersChat(performer, stype, fromSite, notMax) {
        if(stype != 115 && stype != 120){
	  var chatmode = getCookie('vm');
          if (chatmode=='ROM') {
            stype = 120;
          } else if(chatmode=='PUBLIC'){
            stype = 115;
          }
	} 
        if(notMax){
          if(fromSite){
            chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite+'?notMax=1', performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=720');
          } else {
            chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'?notMax=1', performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=720');
          }
        } else {
	  if(fromSite){
	    var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype+'/'+fromSite, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=720');
	  } else {
            var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=720');
  	  }
	}
        chatw.focus();
}



function openViewerHelp(vctp_site) {

    var search = getQueryVariable('vctp_site');

    if (search != '' || vctp_site == 1) {

        openNewWindow('/vctp/beginner/index.html', 'help', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

    } else {

      if(isVIP()){

        openNewWindow('/member/howto_chat_new_vip.html','help', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

      } else if(isUser()){

        openNewWindow('/member/howto_chat_new.html','help', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

      }else{

        openNewWindow('/howto_guest01.html','help', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');
      }

    }

}



function openPerformerHelp() {

    if (is910Performer()) {

        openNewWindow('/performer910/first_time_chat_login.html', 'help', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

    } else {

        openNewWindow('/performer/hajimete2.html#1', 'help', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

    }

}



function openViewerVchat (uid, stype) {

  if (stype != 115 && stype != 120)

     stype = 115;

  openNewWindow('/chat/'+uid+'/'+stype, 'Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=540');

}



function openPerformerVchat() {

  openNewWindow('/chat?as2_pf=1','vchat','resizable=yes,width=800,height=500');

}



function checkUncheckAll(theElement) {

  var theForm = theElement.form;

	var z = 0;

	for(z=0; z<theForm.length; z++){

  	if(theForm[z].type == 'checkbox' && theForm[z].name != 'checkall'){

			theForm[z].checked = theElement.checked;

		}

  }

}



function getSessionType(user_name) {

	/*if(user_arr && user_arr!=null) {

		var user = user_arr[user_name];

		if(user!=null) {

			return user.session_type;

		}

	}*/

    var new_var = "performers.online."+user_name;

    var online = eval(new_var);

    if (online != null) {

        return online.session;

    }



	return 0;

}



function xmlHttpGet(strURL, elementId) {

  var xmlhttp = false;

  if (window.XMLHttpRequest) {

    xmlhttp = new XMLHttpRequest(); //Mozilla/Safari/IE7/Chrome/Opera

  } else if (window.ActiveXObject) { //IE6/IE5

    try {

      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");

    } catch(e) {

      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    }

  }

  if(!xmlhttp) return;

	strURL += (strURL.indexOf('?')>0?'&t=':'?t=') + Math.random();  

    xmlhttp.open('GET', strURL, true);

    xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var obj = getElementFromName(elementId);

      if(obj) obj.innerHTML= xmlhttp.responseText;

			fixPNGImages(elementId);
			-1!==strURL.indexOf("moviethumbs")&&void 0!==window.__chrome27issue&&(xmlhttp.onload=function(){__chrome27issue('thumbshere')});

    }
 
  }

  xmlhttp.send(null);

  return;

}



function xmlHttpPost(strURL, params, elementId) {
  var xmlhttp = false;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest(); //Mozilla/Safari
  } else if (window.ActiveXObject) { //IE
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  if(!xmlhttp) return;
        strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();
  xmlhttp.open('POST', strURL, true);
  xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var obj = getElementFromName(elementId);
      if(obj) obj.innerHTML= xmlhttp.responseText;
        if(elementId){
          fixPNGImages(elementId);
        }
    }
  }
  xmlhttp.send(params);
  return;
}



function getXmlhttp(){

  var xmlhttp;

    

  if(window.XMLHttpRequest) {

 		try {

			xmlhttp = new XMLHttpRequest();

  	} catch(e) {

			xmlhttp = false;

  	}

  } else if(window.ActiveXObject) {

    try {

      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");

    } catch(e) {

       try {

       		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

       } catch(e) {

       		xmlhttp = false;

       }

		}

  }

  return xmlhttp;

}



function getElementFromName(nm){

  // IE5+, Mozilla, Opera

  if(document.getElementById) return document.getElementById(nm);

  if(document.all) return eval('document.all.' + nm); // IE4

  if(document.layers){ // NN4

    var s='';

    for(var i=1; i<arguments.length; i++)

      s+='document.layers.'+arguments[i]+'.';

    return eval(s+'document.layers.'+nm);

  }

  return null;

}



function openNewWindow(theURL,winName,features) {

	var w = window.open(theURL,winName,features);

	//w.focus();

}



var userName = '';

var userId = '';

var userType = '';

var c = getCookie('NetiA');

if(c) {

	var arr = c.split(':');

	userName = arr[0];

}

c = getCookie('vauth');

if(c) {

  var arr = c.split(':');

  userName = arr[0];

  userId = arr[1];

  userType = arr[2];

  siteId = arr[3];

  nightFlag = arr[4];

}

function isVIP() {

	return (userType==206 || userType==215 || userType==220)?true:false;

}

function isUser() {

  return (userType==205 || userType==207 || userType==208 || userType==215 || userType==220)?true:false;

}

function isPerformer() {

	return (userType==210)?true:false;

}

function isRegularUser() {

        return (userType==205)?true:false;

}

function isFreeUser() {

        return (userType==207 || userType==208)?true:false;

}

function isAdmin() {

        return (userType==215 || userType==220)?true:false;

}

function is910Performer() {

	return (nightFlag==1)?true:false;

}



function show_pf_online(pfname){



  var session_type = getSessionType(pfname);

  if(session_type > 0)

     return session_type;

  else

     return false;



}



// ---------------------------------------------------------------------------------

// Function for web and flash

// ---------------------------------------------------------------------------------

function change_message(v_message) {
    //commented out for new AS3 chat.
    //var v_message = $('#message').val();
    //alert("v_message is "+v_message);
    //var v_message = unescape(v_message);
    if( !v_message) v_message = $('#message').val();
	if( !v_message) v_message = "";
    //alert("v_message 2 is "+v_message);
    $.ajax({
            type: "POST",
            url: "/performer/thumbnail_message/true",
            data: "message="+v_message,
            dataType: "text",
            success : function(data, dataType){
              if(data == 'success'){
                alert("サムネイルメッセージが更新されました\n"+v_message);
              } else {
                alert(data);
              }
            },
            error: function(){
              alert("Error:");
            }
        });
}

function change_message_as3(v_message) {
    //commented out for new AS3 chat.
    //var v_message = $('#message').val();
        //alert("v_message is "+unescape(v_message));
        var v_message = unescape(v_message);
    if( !v_message) v_message = $('#message').val();
        //alert("v_message is "+v_message);
        if( !v_message) v_message = "";
        //alert("v_message 2 is "+v_message);

    $.ajax({
            type: "POST",
            url: "/performer/thumbnail_message/true",
            data: "message="+v_message,
            dataType: "text",
            success : function(data, dataType){
              if(data == 'success'){
		//Ferdy is gonna control the alerts in flash.
                //alert("サムネイルメッセージが更新されました\n"+v_message);
              } else {
                //alert(data);
              }
            },
            error: function(){
              //alert("Error:");
            }
        });
}


function openSendMail(uname) {

  // openSendMail(pname)

  openNewWindow('/mailbox/compose/?toidlist='+uname , 'mailbox' , '');

}



function openMailbox() {

  // openMailbox()

  openNewWindow('/mailbox/', 'mailbox' , 'resizable=yes, toolbar=yes, scrollbars=yes, menubar=yes, width=800, height=600');

}





function closeCurrentWindow(sec) {

  //case: viewer's connection to flash server has closed via logout button

  //js call: closeCurrentWindow(.1)  (parameter is delay before closing window)

  if(livew){

    livew.close();

  }

  if (sec == '' || sec == null)

  	sec = 0.1;

  window.setTimeout('window.close()',sec*100);

  

}



function setBan(channel) {

  //case: perf has kicked a viewer

  //js call: setBan(channel)  (parameter 'channel' is the performer ID)

}



function setBlock(uid, flag){

    var xmlhttp = getXmlhttp();

    var url = "";



    url = "/contact/setBlock/"+uid+"/"+flag+"/"+Math.random();

    xmlhttp.open('GET', url, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            res = xmlhttp.responseText;

            if(res == "success")

                alert("メール受信を拒否しました");

            else if(res == "no_user")

                alert("連絡先が見つかりません");

            else if(res == "already")

                alert("既に拒否されています");

			else if(res == 'staff')
                  alert("運営側からのメールは受信拒否できませんので、ご了承下さい。");
            else
                alert("拒否できませんでした。");


        }

    }



    xmlhttp.send(null);

}



function addFavorite(uname,reload){
    var xmlhttp = getXmlhttp();
    var url = "";
    url = "/favorite/add/"+uname+"/"+Math.random();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            res = xmlhttp.responseText;
            if (res=='success' || res=='208_success') {
		if(reload==1)
                  jAlert(uname+'ちゃんをお気に入りに追加しました','お気に入りに追加',function(){window.location.reload(true);});
		else
  		  jAlert(uname+'ちゃんをお気に入りに追加しました','お気に入りに追加');
            } else if (res=='208_limit_error') {
                jAlert('お気に入り登録数が上限に達しております。<br> お気に入りリストを編集してから再度お試し下さい。<br>通常会員様なら無制限でご登録頂けます。アップグレードは<a href=http://www.dxlive.com/join.html target=blank>こちら</a>から','お気に入りに追加');
            } else if (res=='limit_error') {
                jAlert('お気に入り登録数が上限に達しております。<br> お気に入りリストを編集してから再度お試し下さい。','お気に入りに追加');
            } else if (res=='already') {
                jAlert(uname+'ちゃんはお気に入りに追加されています','お気に入りに追加');
            } else if (res=='208fail') {
		jAlert('こちらは正規会員様限定の\nサービスとなっております','お気に入りに追加');
	    }else {
                jAlert('追加できませんでした','お気に入りに追加');
            }
        }
    }
    xmlhttp.send(null);
}



function deleteFavorite(uname){

    var xmlhttp = getXmlhttp();

    var url = "";

    url = "/favorite/delete/"+uname+"/"+Math.random();

    xmlhttp.open('GET', url, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            res = xmlhttp.responseText;

            if (res=='success') {

                //alert('削除しました');

            } else {

                alert('削除できませんでした');

            }

            xmlHttpGet('/favorite', 'favoritehere');

        }

    }

    xmlhttp.send(null);

}



function setLoginNoticeFlag(uname,flag){

    var xmlhttp = getXmlhttp();

    var url = "";

    var method = 'loginOn';

    if (flag==false) {

        method = 'loginOff';

    }

    url = "/favorite/"+method+"/"+uname+"/"+Math.random();

    xmlhttp.open('GET', url, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            res = xmlhttp.responseText;

        }

    }

    xmlhttp.send(null);

}

////////////////////////////////////////



function page_reload(){



if(!opener.window.userId)   

   window.opener.location.reload();

      

// if(document.referrer != '' || document.referrer)

//   alert(document.referrer);

// else

//   alert(document.referrer+"no referrer"+userId);   



}



function fixPNGImages(areaID) {

	var arVersion = navigator.appVersion.split("MSIE");

	var version = parseFloat(arVersion[1]);

	if ((version >= 5.5) && (document.body.filters)) {

		var pngAreaObj=document.getElementById(areaID);

		var pnglist=pngAreaObj.getElementsByTagName("img");



		for(var i=0; i<pnglist.length; i++){

			var img = pnglist[i];

			var imgName = img.src.toUpperCase();

			if (imgName.substring(imgName.length-3, imgName.length) == "PNG") {

				var imgID = (img.id) ? "id='" + img.id + "' " : "";

				var imgClass = (img.className) ? "class='" + img.className + "' " : "";

				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";

				var imgStyle = "display:inline-block;" + img.style.cssText;

				if (img.align == "left") imgStyle = "float:left;" + imgStyle;

				if (img.align == "right") imgStyle = "float:right;" + imgStyle;

				if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;

				var strNewHTML = "<span " + imgID + imgClass + imgTitle

					+ " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"

					+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"

					+ "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";

				img.outerHTML = strNewHTML;

				i = i-1;

			}

		}

  }

}



function ajax_request(strURL, tpl) {

  var xmlhttp = false;

  if (window.XMLHttpRequest) {

    xmlhttp = new XMLHttpRequest(); //Mozilla/Safari

  } else if (window.ActiveXObject) { //IE

    try {

      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");

    } catch(e) {

      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    }

  }

  if(!xmlhttp) return;

        strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();

  xmlhttp.open('GET', strURL, true);

  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

       flag = xmlhttp.responseText;

       if(flag=='1'){

          alert("追加されました");

          if(isVIP()){

            xmlHttpGet('/search/performer/favorite/vip/?tpl='+tpl, 'favoritehere');

          } else {

            xmlHttpGet('/search/performer/favorite/viewer/?tpl='+tpl, 'favoritehere');

          }

       }

       else if(flag=='3'){

          alert("削除されました");

          if(isVIP()){

            xmlHttpGet('/search/performer/favorite/vip/?tpl='+tpl, 'favoritehere');

          } else {

            xmlHttpGet('/search/performer/favorite/viewer/?tpl='+tpl, 'favoritehere');

          }

       }else if(flag=='3000'){

          alert('お気に入り登録数が上限に達しております。お気に入りリストを編集してから再度お試し下さい。');

       }

       else

          alert("エラーで追加できませんでした");

    }

  }

  xmlhttp.send(null);

  return;

}





function MM_swapImgRestore() { //v3.0

  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;

}



function MM_preloadImages() { //v3.0

  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();

    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)

    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}

}



function MM_findObj(n, d) { //v4.01

  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {

    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}

  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];

  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);

  if(!x && d.getElementById) x=d.getElementById(n); return x;

}



function MM_nbGroup(event, grpName) { //v6.0

  var i,img,nbArr,args=MM_nbGroup.arguments;

  if (event == "init" && args.length > 2) {

    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {

      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;

      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();

      nbArr[nbArr.length] = img;

      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {

        if (!img.MM_up) img.MM_up = img.src;

        img.src = img.MM_dn = args[i+1];

        nbArr[nbArr.length] = img;

    } }

  } else if (event == "over") {

    document.MM_nbOver = nbArr = new Array();

    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {

      if (!img.MM_up) img.MM_up = img.src;

      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);

      nbArr[nbArr.length] = img;

    }

  } else if (event == "out" ) {

    for (i=0; i < document.MM_nbOver.length; i++) {

      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }

  } else if (event == "down") {

    nbArr = document[grpName];

    if (nbArr)

      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }

    document[grpName] = nbArr = new Array();

    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {

      if (!img.MM_up) img.MM_up = img.src;

      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;

      nbArr[nbArr.length] = img;

  } }

}



function MM_swapImage() { //v3.0

  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)

   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}

}



function MM_openBrWindow(theURL,winName,features) { //v2.0

  window.open(theURL,winName,features);

}



function checkAll(theElement) {



  var theForm = theElement.form;

  for(i=0; i<theForm.length;i++){

    if(theForm[i].type == 'checkbox' && theForm[i].name != 'checkall'){

      theForm[i].checked = theElement.checked;

    }

  }

}



function mailValidation(email) {

  if (!email.match(/.+\@.+\.+/)) {

    alert('メールアドレスを確認してください');

    return false;

  } else {

    return true;

  }

}



/*function openJoinPage(goodsId)
{
    openNewWindow(join_url + "?goods_id=" + goodsId + "&username="+userName,'join',"toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
}

function openD2Pshooter(packageID)
{
    openNewWindow(d2p_url + "shooter?package_id=" + packageID,"d2p","toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
}*/

function openJoinPage(goodsId)
{
    var joinPage_url = join_url + "?goods_id=" + goodsId + "&username="+userName;
    //alert(joinPage_url);
    openNewWindow(joinPage_url,'join',"toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
}

function openD2Pshooter(packageID, NetiFl, oneClick)
{

    if(packageID == '20005467' || packageID == '20005427' || packageID == '20005517'){
      var answer = confirm("$50プランは 100円換算でポイント発行されません。\nこのまま購入を続けますか？");
    } else {
      var answer = 'true';
    }
    if(answer){

	//To filter out office IP & QA robots for GA
	var client_ip;
	$.getJSON('join/gaFilterIP', function(data)
	{
		client_ip = data.ip;
	});
	var sp = 1;
    if(oneClick)
        sp = 24;
	var ga_val = getCookie('_ga');
    //alert('ga val:'+ga_val);
    var ga_len = ga_val.length;
    var ga_cid = ga_val.substr(6,ga_len);
    //alert('ga cid:'+ga_cid);
    var ga_tid = 'UA-41327480-1';
    var dh = 'dxlive.com';
	
    var d2p_url = 'https://secure.d2pass.com';
    if(NetiFl){
      var shooter_url = d2p_url + "/shooter?package_id=" + packageID+"&from_site_id=20000607&source_page="+sp+"&do_confirm=1&netiFl=1";
    } else {
      var shooter_url = d2p_url + "/shooter?package_id=" + packageID+"&from_site_id=20000607&source_page="+sp+"&do_confirm=1";
    }
	var blockedIP = new Array(
        '38.98.23.154',
        '61.213.159.4',
        '61.213.159.5',
        '61.213.159.6',
        '61.213.159.7',
        '61.213.159.8',
        '61.14.184.155'
    );
    var bFlag = true;
    for(var i=0; i<blockedIP.length; i++)
    {
        if( client_ip == blockedIP[i])
            bFlag = false;
    }
    if( bFlag)
		shooter_url = shooter_url + "&ga_tid="+ga_tid+"&ga_cid="+ga_cid+"&dh="+dh;
    // alert(shooter_url);
    openNewWindow(shooter_url,"d2p","toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
  }
}



function joinEvent()

{

        //document.event_form.goods_id.value= goodsId;

    if (userName!='') {

      document.event_form.Name.value= userName;

    }

    document.event_form.submit();

    return false;

}



function onoff(perf) {

    var busy = performers.busy;

    var free = performers.free;

    //alert(performers);



     if (busy.indexOf(perf) != -1){

        document.writeln('<div class="recentWidth onlineBG"><div class="statusBar"><img src="/img/icons/chat.gif"></div>');

    //} else if (girls.perf && girls.perf.session == 110){

    } else if (free.indexOf(perf) != -1){

        document.writeln('<div class="recentWidth sessionBG"><div class="statusBar"><img src="/img/icons/session.gif"></div>');

        return true;

    } else {

        document.writeln('<div class="recentWidth offlineBG"><div class="statusBar"><img src="/img/icons/offline.gif"></div>');

    }



    return false;

}



function getQueryVariable(variable) {

  var query = window.location.search.substring(1);

  var vars = query.split("&");

  for (var i=0;i<vars.length;i++) {

    var pair = vars[i].split("=");

    if (pair[0] == variable) {

      return pair[1];

    }

  }

  return ''; 

}





function liveviewer() {

      livew = window.open('/livesession.html', 'livesession', 'resizable=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,location=no,status=no,width=568,height=273,top=0,left=0');

    //w.focus();

}



function closeLiveviewer(){

  //Doing this so we dont get javascript error when checking for livew.

  if(livew){

    livew.close();

  }

}





function showD2PToolbar() {

  

    netia = getCookie('NetiA');

    ml = '';

        

    if(netia) 

    {

        cForm = netia.split(":");

        check = /.+@.+\..+/;



        if (cForm[0].match(check)) 

        {           

            d2ptoolbar_url = "/d2ptb";

        }

        else

        {

            d2ptoolbar_url = "http://images.d2pass.com/images/toolbar/utf/black.html";

        }

  

        document.write('<center><div class="d2_toolbar"><TABLE cellSpacing=0 cellPadding=0 width="100%" border=0 ><TBODY><TR><TD height=23>');

        document.write('<IFRAME src="' + d2ptoolbar_url );

        document.write('" frameBorder=0 width="100%" scrolling=no height=23></IFRAME></TD></TR></TBODY></TABLE></div></center>');



    }

  

}



var CCGURL = "http://www.caribbeancomgirl.com";

var EXURL = "http://www.kanjukulive.com";



function openProfileCCG(uname) { 

  openNewWindow(CCGURL+'/profile/'+uname+'?fromSite=1000048', 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=910,height=540');

}



function openProfileCCGMember(uname) {

  openNewWindow(CCGURL+'/profile/'+uname+'?action=login&fromSite=1000048', 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=910,height=540');

}





function openViewerVchatCCG(uid, stype) {

  openNewWindow('/redirect/ccgChat/'+uid+'/'+stype, 'Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');

}



function openViewerVchatCCGSame(uid, stype) {

  window.close();

  openNewWindow('/redirect/ccgChat/'+uid+'/'+stype+'/1', 'Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');

}



function openSendMailCCG(uname){

  openNewWindow(CCGURL+'/mailbox/compose/?to='+uname, 'compose'+uname,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=910,height=540');

}



function openPreviewEX(uname) {

  openNewWindow(EXURL+'/preview/'+uname+'.html?fromSite=1000048', 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=740,height=760');

}



//Profile doesnt have fromSite... use preview for EX

function openProfileEX(uname) {

  openNewWindow(EXURL+'/profile/'+uname+'.html?fromSite=1000048', 'profile'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=775,height=700');

}





function openPreviewEXMember(uname) {

  openNewWindow(EXURL+'/preview/'+uname+'.html?fromSite=1000048&fo=WlBsYn362L5a2l5s2k36JjV9GL5TW9x6I6fKIngjGkm', 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=740,height=760');

}



function openProfileEXMember(uname) {

  openNewWindow(EXURL+'/profile/'+uname+'.html?fromSite=1000048&fo=WlBsYn362L5a2l5s2k36JjV9GL5TW9x6I6fKIngjGkm', 'profile'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=775,height=700');

}





function openViewerVchatEX(uid, stype) {

  openNewWindow(EXURL+'/app/member/chat.php?uid='+uid+'&stype='+stype+'&fromsite=1000048', 'Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');

}



function openViewerHDVchatEX(uid, stype) {

  openNewWindow(EXURL+'/app/member/chat.php?hd=1&uid='+uid+'&stype='+stype+'&fromSite=1000048', 'Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');

}



function openViewerVchatEXSame(uid, stype) {

  window.close();

  openNewWindow('/redirect/exChat/'+uid+'/'+stype+'/1', 'Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');

}



function resizeChatWindow(size){

  if(size == 'small'){

    window.resizeTo(780,387);

  } else if(size == 'medium'){

    window.resizeTo(941,553); //945,553

  } else if(size == 'full'){

    window.moveTo(0,0);

    window.resizeTo(screen.width, screen.height);

  }

}



function openCompliance() {

    openNewWindow("/cert.html", 'compliance', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');

}

function openFaq(errorCode){
   if(errorCode == '1044' || errorCode == '1045'){
      openNewWindow("/faq04.html#q6_answer", 'BanKick', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
   }else{
      openNewWindow("/faq04.html#", 'BanKick', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
   }
}

function noDisplay(flag)
{
	var hours = 24;
	var domain = ".dxlive.com";
    var cookies = document.cookie;
	var cname = "noDisplay";
	//alert( "all cookies: " + document.cookie);

	if( flag) { cname = "noDisplay2"; hours = 2160; } //90 days

    var find = cookies.indexOf("vauth=");

    if( find != -1)
    {
		//alert( "finding...");

        var start = find + 6;

        var end  = cookies.indexOf(";", start);

        if( end == -1) end = cookies.length;

        var value = cookies.substring( start, end);

        value = unescape(value);

        //alert("Value is " + value);
		//Get username:userid:usertype

		var vals = value.split(':');

		var uname = vals[0];

		var uid = vals[1];

		var utype = vals[2];

		//alert("name=" + uname + " id=" + uid + " type=" + utype);
		//Set nodisplay cookie
		document.cookie = cname + "=un:" + escape(uname) + "&uid:" + escape(uid) + "&ut:" + escape(utype) + "; expires=" + new Date((new Date()).getTime() + hours*3600000) + "; path=" + "/" + "; domain=" + escape(domain);

		//"; secure=" + false;
		return true;
    }
    else
    {
        //alert("No cookie!");
		return false;
    }
}

function openInquiry(errorCode) {
    if (isUser() || isVIP()) {
        openNewWindow("https://service.d2pass.com/dxmember/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
    } else {
        openNewWindow("https://service.d2pass.com/dxperformer/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
    }
}

function openIdSysHelp() {
  if (is910Performer()) {
        openNewWindow("/PF/event/sp/idcheck/index_910.html", 'sysHelp', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
    } else {
        openNewWindow("/PF/event/sp/idcheck/index_reg.html", 'sysHelp', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
    }
}

function openFavorite() {
   openNewWindow('/member/favorite', 'favorite', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');
}

function get200pfBonus() {
    var xmlhttp = getXmlhttp();
    var url = "";
    url = "/member/promo/200pfs";
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function()
    {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        res = xmlhttp.responseText;
        alert(res);
        window.location.reload(true);
      }
    }

    xmlhttp.send(null);
}

function openFreechat(performer, fromSite) {
  if(fromSite){
    var chatw = window.open(jp_url + '/chat/free/'+performer+'/'+fromSite, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
  } else {
    var chatw = window.open(jp_url + '/chat/free/'+performer, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
  }
  chatw.focus();
}

function openViewersChatPlus(performer, stype) {
        if(stype != 115 && stype != 120){
          var chatmode = getCookie('vm');
          if (chatmode=='ROM') {
            stype = 120;
          } else if(chatmode=='PUBLIC'){
            stype = 115;
          }
        }

        setCookie('paidrequest','1','','/','dxlive.com');
        var chatw = window.open(jp_url + '/chat/'+performer+'/'+stype, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
        chatw.focus();
}

function time_out_link(user_type){
        if(user_type == 208){
          var joinw = window.open('/join.html', 'join208', 'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
        } else {
			previewFlashGuest();
//          var joinw = window.open('https://secure.d2pass.com/shooter?package_id=20010997&from_site_id=20000607', 'join', 'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
          var joinw = window.open('http://www.dxlive.com/promo/FREE/newfreejoin/index.html', 'join', 'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
        }
        joinw.focus();
//20010997
}

function openFlashPlayerURL() {
  openNewWindow("http://get.adobe.com/jp/flashplayer/", 'AdobeFlashPlayer', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
  window.close();
}

function setCommentStatus(user_comment_id, new_status) {
    var xmlhttp = getXmlhttp();
    var url = "";
    url = "/performer/setCommentStatus/"+user_comment_id+"/"+new_status;
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function()
    {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        res = xmlhttp.responseText;
      }
    }
    xmlhttp.send(null);
//    window.location.reload();
}

function openTrial(){
  window.open('http://trial.dxlive.com/trialForm','JoinPage','width=1200,height=800,location=yes,resizable=yes,scrollbars=yes,status=yes,menubar=yes,toolbar=yes');
}

function openDxStudio() {
        openNewWindow("/dxstudio/", 'DXSTUDIO', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
}

function openVideo(){
    var random_number = Math.random();
    window.location = "/video/?t="+random_number;
}            

function openHanamaru(){
    var random_number = Math.random();
    window.location = "/hanamaru?t="+random_number;
}

function openRecommended(){ 
    var random_number = Math.random();
    window.location = "/recommended?t="+random_number;
}



function openRecordingAgreement() {
    openNewWindow("/dxstudio/contract", 'RecCompliance', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
}

function openGiftPage(performername) {
    openNewWindow("/member/present/present_rule.html?giftsendto="+performername, 'giftpage', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
}

/************************************************************/
//oneClick functions
/* oc_ = one click = one click purchase related*/

try {
    if(typeof window.jQuery === 'undefined'){//checking if jQuery is present, and sending ga event to see where it might happen
      throw 'error:no jQuery';
    } else if(typeof window.siteId !== 'undefined' && window.siteId > 20000000 && window.isUser) {//siteId > 20000000 = D2P

      oc_checkOneClickUI();
    }
} catch (e) {
    setTimeout(function(){//wait for ga to be defined
        if(typeof window.ga !== 'undefined'){
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'error',
              'eventAction': 'oneClickPurchase',
              'eventLabel': e,
              'nonInteraction': true
            });
        }
    },1000);//1000ms should be enough?
}

function oc_checkOneClickUI(){
  if(document.getElementById('gl_acct_oc')){//checking if gl_acct_oc already in place,,,and if not, wait, and repeat it..
   // console.log('gl_acct_oc');
    clearTimeout(window.__oneClickUICheck);
    oc_initOneClickUI();
  } else {
   // console.log('else');
    window.__oneClickUICheck = window.setTimeout(window.oc_checkOneClickUI, 100);
  }
}
function oc_initOneClickUI(){//here comes actual code
    /*each panel containing UI, loading, success, and error*/
    window.$gl_acct_oc_panelUI = $('#gl_acct_oc_panelUI');
    window.$gl_acct_oc_panelLoading = $('#gl_acct_oc_panelLoading');
    window.$gl_acct_oc_panelSuccess = $('#gl_acct_oc_panelSuccess');
    window.$gl_acct_oc_panelError = $('#gl_acct_oc_panelError');

    /*ok button*/
    window.$gl_acct_oc_ok = $('.gl_acct_oc_ok');
    window.$gl_acct_oc_ok.on('click',function(){
      oc_resetUI();
    });
    /* option purchase btn related */
    window.$gl_acc_ocOptions = $('#gl_acc_ocOptions');
    window.$gl_acc_ocOptions.on('change',function(){
      if(window.$gl_acc_ocOptions[0].selectedIndex === 0 ){
        oc_hidePurchaseBtn();
      } else {
        oc_showPurchaseBtn();
      }

    });
    window.$gl_acc_ocOptionsHolder = $('#gl_acc_ocOptionsHolder');
    window.$gl_acc_ocPurchaseBtnHolder = $('#gl_acc_ocPurchaseBtnHolder');

    window.$gl_acc_ocPurchaseBtn = $('#gl_acc_ocPurchaseBtn');
    window.$gl_acc_ocPurchaseBtn.on('click',function(){
      //console.log(window.$gl_acc_ocOptions.val());//value of selected option
      //console.log(window.$gl_acc_ocOptions.find(':selected').data('packageId'));//value of selected option

      if(window.$gl_acc_ocChkBox.is(':checked')){//one click purchase on
          //alert('on click is on, value is '+window.$gl_acc_ocOptions.val()+', this is where it should call api...but for now calling design dev function to show concept');
          //oc_testing();
          oneClickPurchase(window.$gl_acc_ocOptions.val());
          //adding purchased point and USD beforehead
          document.getElementById('gl_acct_oc_purchasedPT').innerHTML = window.$gl_acc_ocOptions.val();
          document.getElementById('gl_acct_oc_purchasedUSD').innerHTML =  window.$gl_acc_ocOptions.find(':selected').data('usd');
      } else {//normal purchase
          //alert('on click is off, value is '+window.$gl_acc_ocOptions.find(':selected').data('packageId')+', calling normal openD2Pshooter');
          openD2Pshooter(window.$gl_acc_ocOptions.find(':selected').data('packageId'),'',1);
      }

    });

    /*checkbox related*/
    window.$gl_acc_ocChkBoxCover = $('#gl_acc_ocChkBoxCover');//check box button, covering actual check box
    window.$gl_acc_ocChkBox = $('#gl_acc_ocChkBox');//check box

    window.$gl_acc_ocChkBoxCover.on('mouseenter',function(){
      //console.log(this);
      $(this).parent('.gl_acc_ocChk').css('background-color','#ffff66');
    });
    window.$gl_acc_ocChkBoxCover.on('mouseout',function(){
      $(this).parent('.gl_acc_ocChk').attr('style','');
    });
    window.$gl_acc_ocChkBoxCover.on('click',function(){
        oc_toggleCheckbox();
    });
    /*help text related*/
    window.$gl_acc_ocChkHelp = $('#gl_acc_ocChkHelp');//help (?) icon
    window.$gl_acc_ocChkTxt = $('#gl_acc_ocChkTxt');//help contents

    window._gl_acc_ocChkHelpAnimationLock = false;
    window.$gl_acc_ocChkHelp.on('mouseenter',function(){//hover and show help text
        //console.log('mouseenter');
        clearTimeout(window.__gl_acc_helpTimeout);
        if(window._gl_acc_ocChkHelpAnimationLock === false && window.$gl_acc_ocChkHelp.hasClass('on')===false){
            window._gl_acc_ocChkHelpAnimationLock = true;
            window.$gl_acc_ocChkTxt.css({
              width:'21px',
              height:'16px',
              overflow:'hidden',
              opacity:0
            })
            .animate({
              width:164,
              height:134,
              opacity:1
            },400,function(){
              window.$gl_acc_ocChkHelp.addClass('on');
              window._gl_acc_ocChkHelpAnimationLock = false;
            });
        }
        //window.$gl_acc_ocChkHelp.addClass('on');

    });
    window.$gl_acc_ocChkHelp.on('click',function(){//click and hide help text
      if(window._gl_acc_ocChkHelpAnimationLock === false && window.$gl_acc_ocChkHelp.hasClass('on')){
        oc_hideHelpText();
      }
    });

    window.$gl_acc_ocChkTxt.on('mouseenter',function(){
      clearTimeout(window.__gl_acc_helpTimeout);
    });
    window.$gl_acc_ocChkTxt.children('p').children('a').on('mouseenter',function(){
      clearTimeout(window.__gl_acc_helpTimeout);
    });
    window.$gl_acc_ocChkTxt.on('mouseout',function(){

      if(window._gl_acc_ocChkHelpAnimationLock === false && window.$gl_acc_ocChkHelp.hasClass('on')){
        window.__gl_acc_helpTimeout = setTimeout(oc_hideHelpText,800);
      }
    });
    window.$gl_acc_ocChkHelp.on('mouseout',function(){

      if( window._gl_acc_ocChkHelpAnimationLock === false && window.$gl_acc_ocChkHelp.hasClass('on') &&  window.$gl_acc_ocChkTxt.is(":hover") === false ){
          window.__gl_acc_helpTimeout = setTimeout(oc_hideHelpText,800);
      }

    });
    /*window.$gl_acc_ocChkHelp.on('mouseout',function(){

      if(window._gl_acc_ocChkHelpAnimationLock === false && window.$gl_acc_ocChkHelp.hasClass('on')){
        setTimeout(oc_hideHelpText,500);
      }
    });*/


    /*local(?) functions*/
    function oc_hidePurchaseBtn() {
      window.$gl_acc_ocOptionsHolder.animate({'padding-top':6},300);
      window.$gl_acc_ocPurchaseBtnHolder.animate({'height':0},300);
    }
    function oc_showPurchaseBtn() {
      window.$gl_acc_ocOptionsHolder.animate({'padding-top':0},300);
      window.$gl_acc_ocPurchaseBtnHolder.animate({'height':22},300);
    }
    function oc_toggleCheckbox() {
     if(window.$gl_acc_ocChkBox.is(':checked')) {//on
        window.$gl_acc_ocChkBoxCover.parent('div').removeClass('on');
        window.$gl_acc_ocChkBox.prop('checked', false);
        //alert('dev:checkbox un-checked');
        setOneclick();
     } else {//off
        window.$gl_acc_ocChkBoxCover.parent('div').addClass('on');
        window.$gl_acc_ocChkBox.prop('checked', true);
        //alert('dev:checkbox checked');
        setOneclick('4803');
     }
    }
    function oc_hideHelpText(){

            window._gl_acc_ocChkHelpAnimationLock = true;
            window.$gl_acc_ocChkTxt.animate({
              width:21,
              height:16,
              opacity:0
            },400,function(){
              window.$gl_acc_ocChkHelp.removeClass('on');
              window._gl_acc_ocChkHelpAnimationLock = false;
            });

    }
    function oc_resetOption() {
      window.$gl_acc_ocOptions.prop('selectedIndex',0);
    }
    function oc_showSuccess(){
      $('.gl_acct_ocPanel').removeClass('on');
      window.$gl_acct_oc_panelSuccess.addClass('on');
      //alert('success function might need to receive ammount purchased?:'+window.$gl_acc_ocOptions.val());
      //alert('balance is '+parseFloat(document.getElementById('balance').innerHTML));
      document.getElementById('balance').innerHTML = parseFloat(document.getElementById('balance').innerHTML) + parseFloat(window.$gl_acc_ocOptions.val());
      var nBalance = parseFloat(document.getElementById('balance').innerHTML);
      document.getElementById('balance').innerHTML = nBalance.toFixed(2);
    }
    function oc_showLoading (){
      $('.gl_acct_ocPanel').removeClass('on');
      window.$gl_acct_oc_panelLoading.addClass('on');
    }
    function oc_showError(){
      $('.gl_acct_ocPanel').removeClass('on');
      window.$gl_acct_oc_panelError.addClass('on');
    }
    function oc_resetUI(){
      $('.gl_acct_ocPanel').removeClass('on');
      oc_resetOption();
      oc_hidePurchaseBtn();
      window.$gl_acct_oc_panelUI.addClass('on');

    }
    function oc_testing() {
        oc_showLoading();
        setTimeout(function(){
          if(Math.floor(Math.random() * 1) + 1 === 1) {
            oc_showSuccess();
          } else {
            oc_showError();
          }
        },5000);
    }
    function oneClickPurchase(points)
    {
        //alert('points are '+points);
        oc_showLoading();
        var xmlhttp = getXmlhttp();
        var url = "/member/oneClick/"+points+"/"+Math.random();
        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                res = xmlhttp.responseText;
                //alert('accept res is '+res);
                if (res=='success')
                {
                    oc_showSuccess();
                }
                else
                {
                    oc_showError();
                }
            }
        }
        xmlhttp.send(null);
    }
    function setOneclick(mode)
    {
        //alert('setOneclick mode:'+mode);
        var xmlhttp = getXmlhttp();
        var url = "";
        url = "/member/setOneclick/" + mode;
        xmlhttp.open('POST', url, true);
        xmlhttp.onreadystatechange = function()
        {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                res = xmlhttp.responseText;
                //alert('setOneClick:'+res);
            }
        }
        xmlhttp.send(null);
        //setCookie('mp',mode);
        //setTimeout("xmlHttpGet('/member/account', 'status');",1500);
    }
};

//End oneClick functions
/************************************************************/

