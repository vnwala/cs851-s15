var livew;
function includeJS(jsPath){

  var script=document.createElement("script");

  script.setAttribute("type","text/javascript");

  script.setAttribute("src",jsPath);

  document.getElementsByTagName("head")[0].appendChild(script);

}

includeJS('/include/js/');

function logout(){

    var win=window.opener ? window.opener : window.dialogArguments, c;

    if(win != undefined){

       opener.window.location="/logout";

       window.close();

    }else{window.location="/logout";}

}

function d2p_toolbar_logout(){window.location="/logout";}

function d2p_toolbar_login(){window.location="/member";}

function d2p_toolbar_site_join(){window.location="/join.html";}

function setCookie(name,value,expires,path,cookie_domain,secure){

  expires=(expires)?expires.toGMTString():'';

  path=(path)?path:'/';

  cookie_domain=(cookie_domain)?cookie_domain:domain;

  var curCookie=name+"="+escape(value)+

  ((expires)?";expires="+expires:"")+

  ((path)?";path="+path:"")+

  ((domain)?";domain="+cookie_domain:"")+

  ((secure)?";secure":"");

  document.cookie=curCookie;

}

function copyright(teston){

    copyright=new Date();

    update=copyright.getFullYear();

    if(teston){

	  document.write("<a href=\"#\"onClick=\"MM_openBrWindow('/chat?hd=1&test=1','hd','scrollbars=yes,resizable=yes,width=1273,height=548')\">");

	  document.write("&copy; ");

	  document.write("</a>");

      document.write("2002-"+update+" Dxlive.com All rights reserved.");

    }else{document.write("&copy; 2002-"+update+" Dxlive.com All rights reserved.");}

}

function getCookie(cookieName){

  var search=cookieName+'=';

  if(document.cookie.length>0){

    offset=document.cookie.indexOf(search);

    if(offset != -1){

      offset += search.length;

      end=document.cookie.indexOf(';',offset);

      if(end == -1) end=document.cookie.length;

      return unescape(document.cookie.substring(offset,end));

    }

  }

  return null;

}

function openMemo(contact){

  if(contact==null || contact=='undefined'){

    var obj=getElementFromName('contact_name');

    if(obj){contact=getElementFromName('contact_name').value;

    }else{contact='';}

  }

  if(contact!=''){openNewWindow('/contact/memo/'+contact,'contact'+contact,'width=675,height=400,resizable=yes,scrollbars=yes');

  }else{openNewWindow('/contact/','contact','width=900,height=600,resizable=yes,scrollbars=yes');}

}

function openProfile(uname){openNewWindow('/preview/'+uname,'preview'+uname,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');}

function openProfile1P(uname){openNewWindow('/preview/'+uname+'?NetiFL=1','preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');}

function openFcProfile(uname){openNewWindow('/fanclub/'+uname,'preview'+uname,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');}

function openPR(uname){openNewWindow('/video/pr/'+uname,'pr'+uname,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=855,height=605');}

function showFcUpdateInfo(){

  if(fc_contents){

    document.getElementById('fc_diary_info').innerHTML=fc_contents.diary;

    document.getElementById('fc_image_info').innerHTML=fc_contents.image;

    document.getElementById('fc_video_info').innerHTML=fc_contents.video;

    last_update=new Array();

    last_update=fc_contents.last_update.split("-");

    document.getElementById('fc_last_update').innerHTML=last_update[0]+'年'+last_update[1]+'月'+last_update[2]+'日';

  }

}

function setChatMode(mode){

    var xmlhttp=getXmlhttp();

    var url="";

    url="/member/setChatMode/"+mode;

    xmlhttp.open('POST',url,true);

    xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4 && xmlhttp.status==200){res=xmlhttp.responseText;}}

    xmlhttp.send(null);

    setCookie('vm',mode);

    setTimeout("xmlHttpGet('/member/account','status');",1500);

}

function setChatMode_vctp(mode){

    var xmlhttp=getXmlhttp();

    var url="";

    url="/member/setChatMode/"+mode;

    xmlhttp.open('POST',url,true);

    xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4 && xmlhttp.status==200){res=xmlhttp.responseText}}

    xmlhttp.send(null);

    setCookie('vm',mode);

}

function setChatType(mode){

    var xmlhttp=getXmlhttp();

    var url="";

    url="/member/setChatLayout/"+mode;

    xmlhttp.open('POST',url,true);

    xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4 && xmlhttp.statu ==200){res=xmlhttp.responseText;}}

    xmlhttp.send(null);

    setCookie('ct',mode);

    setTimeout("xmlHttpGet('/member/account','status');",1500);

}

function setPageMode(mode) {

    var xmlhttp=getXmlhttp();

    var url="";

    url="/member/setPageMode/"+mode;

    xmlhttp.open('POST',url,true);

    xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4 && xmlhttp.status==200){res=xmlhttp.responseText;}}

    xmlhttp.send(null);

    setCookie('mp',mode);

	$(document).ready(function(){

		$('a.pageChecker').parent().removeClass('pageChecked');

		$('a.pageChecker').children('input').attr('checked', false);

		$('a#'+mode).parent().addClass('pageChecked');

		$('a#'+mode).children('input').attr('checked', true);

	});

}



function openPreview(uname){window.open('/preview/'+uname,'preview'+uname);}
function openPreviewCC(uname){openNewWindow('http://www.caribbeancomgirl.com/preview/'+uname,'preview'+uname,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');}
function openPreviewDX(uname) {openNewWindow('http://bn.dxlive.com/homepreview/'+uname+'?utm_source=cc_guest&utm_medium=online_thumbnail&utm_campaign=homepreview', 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1050,height=950'); }
function openPreviewCCG(uname){openNewWindow('http://www.caribbeancomgirl.com/preview/'+uname,'preview'+uname,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');}
function openHomePreviewDX(uname) {openNewWindow('http://click.dtiserv2.com/goa.fcgi?rd=6&b=14103&link=http://www.dxlive.com/homepreview/'+uname, 'preview'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1050,height=950'); }

function openViewerProfile(uname,origin){

  if(!origin){var origin='default';}

  var xmlhttp=getXmlhttp();

  var url="";

  url="/footprint/"+origin+"/"+uname;

  xmlhttp.open('POST',url,true);

  xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4 && xmlhttp.status==200){res=xmlhttp.responseText;}}

  xmlhttp.send(null);

  openNewWindow('/profile/member/'+uname,'profile','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=855,height=605');

}

function openViewersChatSame(performer,stype,fromSite,replace){

      if(stype != 115 && stype != 120){

        var chatmode=getCookie('vm');

        if(chatmode=='ROM'){stype=120;

        }else if(chatmode=='PUBLIC'){stype=115;}

      }

      window.close();

      if(fromSite){chat=window.open(jp_url+'/chat/'+performer+'/'+stype+'/'+fromSite+'?2ndchat=1&replace=1',performer,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

      }else{chatw=window.open(jp_url+'/chat/'+performer+'/'+stype+'?2ndchat=1&replace=1',performer,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

      }

      chatw.focus();

}

function openViewersChatTrack(performer,stype,fromSite,notMax){

      if(stype != 115 && stype != 120){

        var chatmode=getCookie('vm');

        if(chatmode=='ROM'){stype=120;

        }else if(chatmode=='PUBLIC'){stype=115;}

      }

      if(notMax){

        if(fromSite){chatw=window.open(jp_url+'/chat/'+performer+'/'+stype+'/'+fromSite+'?notMax=1&2ndchat=1',performer,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

        }else{ chatw=window.open(jp_url + '/chat/'+performer+'/'+stype+'?notMax=1&2ndchat=1',performer,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');}

      }else{

        if(fromSite){chatw=window.open(jp_url+'/chat/'+performer+'/'+stype+'/'+fromSite+'?2ndchat=1',performer,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');

        }else{chatw=window.open(jp_url+'/chat/'+performer+'/'+stype+'?2ndchat=1',performer,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=780,height=700');}

      }

      chatw.focus();

}

function openViewersChatHDrom(performer,stype,fromSite) {

      if (stype != 115 && stype != 120){

        var chatmode=getCookie('vm');

        if(chatmode=='ROM'){stype=120;}else if(chatmode=='PUBLIC'){stype=115;}

      }

      if(fromSite){var chatw=window.open(jp_url+'/chat/'+performer+'/'+stype+'/'+fromSite+'?hdrom2=1',performer,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');

      }else{var chatw=window.open(jp_url+'/chat/'+performer+'/'+stype+'?hdrom2=1',performer,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');}

      chatw.focus();

}

function openViewersChatHD(performer,stype,fromSite) {

  if(stype != 115 && stype != 120){

        var chatmode=getCookie('vm');

        if(chatmode=='ROM'){stype=120;}else if(chatmode=='PUBLIC'){stype=115;}

  }

  //if(fromSite){var chatw=window.open('/chat/'+performer+'/'+stype+'/'+fromSite,performer+'?utm_source=cc_member_home&utm_medium=online_thumbnail&utm_campaign=sesion','resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');

  if(fromSite){var chatw=window.open('/chat/'+performer+'/'+stype+'/'+fromSite+'?utm_source=cc_member_home&utm_medium=online_thumbnail&utm_campaign=sesion', performer ,'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');

  }else{var chatw=window.open('/chat/'+performer+'/'+stype,performer,'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');}	  

  chatw.focus();

} 

function openViewersChatHDdx(performer, stype, fromSite) {
	if (stype != 115 && stype != 120) {
        var chatmode = getCookie('vm');
        if (chatmode=='ROM'){stype = 120;}else if(chatmode=='PUBLIC'){stype = 115;}
 	}
	if(fromSite){
		var chatw = window.open('http://www.dxlive.com/chat/'+performer+'/'+stype+'/'+fromSite+'?hdrom2=1', performer, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
	} else {
		var chatw = window.open('http://www.dxlive.com/chat/'+performer+'/'+stype+'?hdrom2=1', performer, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
	}
	chatw.focus();
}


function openViewersChat(performer,stype,fromSite,notMax) {
        if(stype != 115 && stype != 120){
		  var chatmode=getCookie('vm');
          if(chatmode=='ROM'){stype=120;}else if(chatmode=='PUBLIC'){stype = 115;}
		} 
        if(notMax){
          if(fromSite){chatw=window.open('/chat/'+performer+'/'+stype+'/'+fromSite+'?notMax=1',performer,'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=700');
          }else{chatw=window.open('/chat/'+performer+'/'+stype+'?notMax=1',performer,'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=700');}
        }else{
	  	  if(fromSite){var chatw=window.open('/chat/'+performer+'/'+stype+'/'+fromSite,performer+'?utm_source=cc_member_details&utm_medium=online_thumbnail&utm_campaign=sesion','resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');
	  	  }else{var chatw=window.open('/chat/'+performer+'/'+stype,performer,'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');}
		}
        chatw.focus();
}

function openViewersChatdx(performer, stype, fromSite, notMax) {
	if(stype != 115 && stype != 120){
		var chatmode = getCookie('vm');
		if(chatmode=='ROM'){stype = 120;}else if(chatmode=='PUBLIC'){stype = 115;}
	} 
	if(notMax){
		if(fromSite){
            chatw = window.open('http://www.dxlive.com/c/chat/'+performer+'/'+stype+'/'+fromSite+'?notMax=1', performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=700');
		} else {
            chatw = window.open('http://www.dxlive.com/c/chat/'+performer+'/'+stype+'?notMax=1', performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=700');
		}
	} else {
		if(fromSite){
	    	var chatw = window.open('http://www.dxlive.com/c/chat/'+performer+'/'+stype+'/'+fromSite, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=700');
		} else {
            var chatw = window.open('http://www.dxlive.com/c/chat/'+performer+'/'+stype, performer, 'resizable=yes,status=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=1010,height=700');
		}
	}
	chatw.focus();
}

function openViewerHelp(vctp_site) {

    var search=getQueryVariable('vctp_site');

    if(search != '' || vctp_site==1){ openNewWindow('/vctp/beginner/index.html','help','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

    }else{

      if(isVIP()){openNewWindow('/member/howto_member.html','help','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

      }else{openNewWindow('/member/howto_member.html','help','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');}

    }

}

function openPerformerHelp(){

    if(is910Performer()){openNewWindow('/performer910/first_time_chat_login.html','help','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');

    }else{openNewWindow('/performer/hajimete2.html#1','help','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');}

}

function openViewerVchat (uid,stype){

  if (stype != 115 && stype != 120)

     stype = 115;

	 openNewWindow('/chat/'+uid+'/'+stype,'Chat'+uid,'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=540');

}

function openPerformerVchat(){openNewWindow('/chat','vchat','resizable=yes,width=800,height=500');}

function checkUncheckAll(theElement){

  var theForm=theElement.form;

	var z=0;

	for(z=0;z<theForm.length;z++){if(theForm[z].typ =='checkbox' && theForm[z].name != 'checkall'){theForm[z].checked=theElement.checked;}}

}

function getSessionType(user_name){

    var new_var="performers.online."+user_name;

    var online=eval(new_var);

    if(online != null){return online.session;}

	return 0;

}

function xmlHttpGet(strURL,elementId){

  var xmlhttp = false;

  if(window.XMLHttpRequest){xmlhttp = new XMLHttpRequest();//Mozilla/Safari/IE7/Chrome/Opera

  }else if(window.ActiveXObject){//IE6/IE5

    try{xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}catch(e){xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}

  }

  if(!xmlhttp) return;

	strURL += (strURL.indexOf('?')>0?'&t=':'?t=')+Math.random();  

    xmlhttp.open('GET', strURL, true);

    xmlhttp.onreadystatechange=function(){

    if(xmlhttp.readyState==4 && xmlhttp.status==200){

      var obj=getElementFromName(elementId);

      if(obj) obj.innerHTML=xmlhttp.responseText;

	  fixPNGImages(elementId);

    }

  }

  xmlhttp.send(null);

  return;

}

function xmlHttpPost(strURL,params,elementId){

  var xmlhttp = false;

  if(window.XMLHttpRequest){ xmlhttp = new XMLHttpRequest(); //Mozilla/Safari

  }else if(window.ActiveXObject){ //IE

    try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}catch(e){xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}

  }

  if(!xmlhttp) return;

  strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand')+Math.random();

  xmlhttp.open('POST',strURL,true);

  xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

  xmlhttp.onreadystatechange=function(){

    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

      var obj=getElementFromName(elementId);

      if(obj) obj.innerHTML= xmlhttp.responseText;

	  if(elementId){fixPNGImages(elementId);}

  	}

  }

  xmlhttp.send(params);

  return;

}

function getXmlhttp(){

  var xmlhttp;

  if(window.XMLHttpRequest){

  	try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}

  }else if(window.ActiveXObject){

    try {xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){xmlhttp = false;}}

  }

  return xmlhttp;

}

function getElementFromName(nm){

  if(document.getElementById) return document.getElementById(nm);// IE5+, Mozilla, Opera

  if(document.all) return eval('document.all.'+nm);// IE4

  if(document.layers){ // NN4

    var s='';

    for(var i=1;i<arguments.length;i++) s+='document.layers.'+arguments[i]+'.';

    return eval(s+'document.layers.'+nm);

  }

  return null;

}

function openNewWindow(theURL,winName,features) {var w=window.open(theURL,winName,features);}



var userName='';

var userId='';

var userType='';

var c=getCookie('NetiA');

if(c){var arr=c.split(':');userName=arr[0];}

c=getCookie('vauth');

if(c){

  var arr=c.split(':');

  userName=arr[0];

  userId=arr[1];

  userType=arr[2];

  siteId=arr[3];

  nightFlag=arr[4];

}

function isVIP(){return (userType==206 || userType==215 || userType==220)?true:false;}

function isUser(){return (userType==205 || userType==207 || userType==208 || userType==215 || userType==220)?true:false;}

function isPerformer(){return (userType==210)?true:false;}

function isRegularUser(){return (userType==205)?true:false;}

function isFreeUser(){return (userType==207 || userType==208)?true:false;}

function isAdmin(){return (userType==215 || userType==220)?true:false;}

function is910Performer(){return (nightFlag==1)?true:false;}

function show_pf_online(pfname){

  var session_type = getSessionType(pfname);

  if(session_type > 0) return session_type;

  else return false;

}

// ---------------------------------------------------------------------------------



// Function for web and flash



// ---------------------------------------------------------------------------------



function openSendMail(uname){openNewWindow('/mailbox/compose/?toidlist='+uname,'mailbox','');}

function openMailbox(){openNewWindow('/mailbox/','mailbox','resizable=yes,toolbar=yes,scrollbars=yes,menubar=yes,width=800,height=600');}

function closeCurrentWindow(sec){

  //case: viewer's connection to flash server has closed via logout button

  //js call: closeCurrentWindow(.1)  (parameter is delay before closing window)

  if(livew){livew.close();}

  if (sec=='' || sec==null) sec=0.1;

  window.setTimeout('window.close()',sec*100);

}

function setBan(channel){

  //case: perf has kicked a viewer

  //js call: setBan(channel)  (parameter 'channel' is the performer ID)

}

function setBlock(uid, flag){

    var xmlhttp=getXmlhttp();

    var url="";

    url="/contact/setBlock/"+uid+"/"+flag+"/"+Math.random();

    xmlhttp.open('GET',url,true);

    xmlhttp.onreadystatechange=function(){

        if(xmlhttp.readyState==4 && xmlhttp.status==200){

            res=xmlhttp.responseText;

            if(res=="success") alert("メール受信を拒否しました");

            else if(res=="no_user") alert("連絡先が見つかりません");

            else if(res=="already") alert("既に拒否されています");

            else alert("拒否できませんでした。");

        }

    }

    xmlhttp.send(null);

}

function addFavorite(uname,reload){

    var xmlhttp=getXmlhttp();

    var url="";

    url="/favorite/add/"+uname+"/"+Math.random();

    xmlhttp.open('GET',url,true);

    xmlhttp.onreadystatechange=function(){

        if(xmlhttp.readyState==4 && xmlhttp.status==200){

            res=xmlhttp.responseText;

            if(res=='success'){

				if(reload==1){alert(uname+'ちゃんをお気に入りに追加しました','お気に入りに追加',function(){window.location.reload(true);});

				}else{alert(uname+'ちゃんをお気に入りに追加しました','お気に入りに追加');}

            }else if(res=='limit_error'){ alert('お気に入り登録数が上限に達しております。\nお気に入りリストを編集してから再度お試し下さい。','お気に入りに追加');

            }else if(res=='already'){alert(uname+'ちゃんはお気に入りに追加されています','お気に入りに追加');

            }else if(res=='208fail'){alert('こちらは正規会員様限定の\nサービスとなっております','お気に入りに追加');

	    	}else{alert('追加できませんでした','お気に入りに追加');}            

	    	xmlHttpGet('/myPage/mypageFavs', 'favs_here');

        }

    }

    xmlhttp.send(null);

}

function deleteFavorite(uname){
    var xmlhttp=getXmlhttp();
    var url="";
    url="/favorite/delete/"+uname+"/"+Math.random();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
			res = xmlhttp.responseText;
			if(res=='success'){alert('削除しました');}else{alert('削除できませんでした');}
			xmlHttpGet('/myPage/mypageFavs', 'favs_here');
        }
    }
    xmlhttp.send(null);
}

function setLoginNoticeFlag(uname,flag){

    var xmlhttp=getXmlhttp();

    var url="";

    var method='loginOn';

    if(flag==false){method='loginOff';}

    url="/favorite/"+method+"/"+uname+"/"+Math.random();

    xmlhttp.open('GET', url, true);

    xmlhttp.onreadystatechange=function(){

        if(xmlhttp.readyState==4 && xmlhttp.status==200){res=xmlhttp.responseText;}

    }

    xmlhttp.send(null);

}

////////////////////////////////////////

function page_reload(){

if(!opener.window.userId) window.opener.location.reload(); 

}

function fixPNGImages(areaID){

	var arVersion=navigator.appVersion.split("MSIE");

	var version=parseFloat(arVersion[1]);

	if((version>=5.5)&&(document.body.filters)){var pngAreaObj=document.getElementById(areaID);}

}

function ajax_request(strURL,tpl){

  var xmlhttp=false;

  if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();//Mozilla/Safari

  }else if(window.ActiveXObject){//IE

    try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}

  }

  if(!xmlhttp) return;

  strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand')+Math.random();

  xmlhttp.open('GET', strURL, true);

  xmlhttp.onreadystatechange=function(){

  	if(xmlhttp.readyState==4&&xmlhttp.status==200){

       flag=xmlhttp.responseText;

       if(flag=='1'){

          alert("追加されました");

          if(isVIP()){xmlHttpGet('/search/performer/favorite/vip/?tpl='+tpl,'favoritehere');

          }else{xmlHttpGet('/search/performer/favorite/viewer/?tpl='+tpl,'favoritehere');}

       }else if(flag=='3'){

          alert("削除されました");

          if(isVIP()){xmlHttpGet('/search/performer/favorite/vip/?tpl='+tpl,'favoritehere');

          }else{xmlHttpGet('/search/performer/favorite/viewer/?tpl='+tpl,'favoritehere');}

       }else if(flag=='3000'){alert('お気に入り登録数が上限に達しております。お気に入りリストを編集してから再度お試し下さい。');

       }else{alert("エラーで追加できませんでした");}

  	}

  }

  xmlhttp.send(null);

  return;

}

function MM_swapImgRestore(){var i,x,a=document.MM_sr;for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;}//v3.0

function MM_preloadImages() {var d=document;if(d.images){if(!d.MM_p){d.MM_p=new Array();} var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++) if(a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}}//v3.0

function MM_findObj(n,d){ //v4.01

  var p,i,x; if(!d) d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}

  if(!(x=d[n])&&d.all) x=d.all[n];for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];

  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);

  if(!x && d.getElementById) x=d.getElementById(n);return x;

}

function MM_nbGroup(event, grpName){ //v6.0

  var i,img,nbArr,args=MM_nbGroup.arguments;

  if(event=="init"&& args.length>2){

    if((img=MM_findObj(args[2])) != null && !img.MM_init){

      img.MM_init=true;img.MM_up=args[3];img.MM_dn=img.src;

      if((nbArr=document[grpName])==null) nbArr=document[grpName]=new Array();

      nbArr[nbArr.length]=img;

      for(i=4;i<args.length-1;i+=2) if((img=MM_findObj(args[i])) != null){

        if(!img.MM_up) img.MM_up=img.src;

        img.src=img.MM_dn=args[i+1];

        nbArr[nbArr.length]=img;

    }}

  }else if(event=="over"){

    document.MM_nbOver=nbArr=new Array();

    for(i=1;i<args.length-1;i+=3) if((img=MM_findObj(args[i])) != null){

      if(!img.MM_up) img.MM_up=img.src;

      img.src=(img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);

      nbArr[nbArr.length]=img;

    }

  }else if(event == "out" ){

    for (i=0;i<document.MM_nbOver.length;i++){

      img=document.MM_nbOver[i];img.src = (img.MM_dn) ? img.MM_dn : img.MM_up;}

  }else if(event=="down"){

    nbArr=document[grpName];

    if(nbArr) for(i=0; i < nbArr.length; i++){img=nbArr[i];img.src=img.MM_up;img.MM_dn=0;}

    document[grpName]=nbArr=new Array();

    for(i=2;i< args.length-1;i+=2) if((img=MM_findObj(args[i])) != null){

      if(!img.MM_up) img.MM_up=img.src;

      img.src=img.MM_dn=(args[i+1])? args[i+1] : img.MM_up;

      nbArr[nbArr.length]=img;

  }}

}

function MM_swapImage(){ //v3.0

  var i,j=0,x,a=MM_swapImage.arguments;document.MM_sr=new Array;for(i=0;i<(a.length-2);i+=3)

   if((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x;if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}

}

function MM_openBrWindow(theURL,winName,features){window.open(theURL,winName,features);}//v2.0

function checkAll(theElement){

  var theForm=theElement.form;

  for(i=0;i<theForm.length;i++){if(theForm[i].type=='checkbox'&&theForm[i].name != 'checkall'){ theForm[i].checked=theElement.checked;}}

}

function mailValidation(email){if(!email.match(/.+\@.+\.+/)){alert('メールアドレスを確認してください');return false; }else{return true;}}

function openJoinPage(goodsId){
	openNewWindow(join_url+"?goods_id="+goodsId+"&username="+userName,'join',"toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
}

function openD2Pshooter(packageID,NetiFl){
	var ga_val = getCookie('_ga');
    //alert('D2P ga val:'+ga_val);
    var ga_len = ga_val.length;
    var ga_cid = ga_val.substr(6,ga_len);
    //alert('D2P ga cid:'+ga_cid);
    var ga_tid = 'UA-41327480-5';
    var dh = 'caribbeancomgirl.com';
	
	if(NetiFl){
		openNewWindow(d2p_url+"/shooter?package_id="+packageID+"&do_confirm=1&NetiFl=1&ga_tid="+ga_tid+"&ga_cid="+ga_cid+"&dh="+dh,"d2p","toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
	}else{
		openNewWindow(d2p_url+"/shooter?package_id="+packageID+"&do_confirm=1&ga_tid="+ga_tid+"&ga_cid="+ga_cid+"&dh="+dh,"d2p","toolbar=yes,scrollbars=yes,location=yes,menubar=yes,resizable=yes");
	}
}

function joinEvent(){

    if(userName!=''){document.event_form.Name.value=userName;}

    document.event_form.submit();

    return false;

}

function onoff(perf){

    var busy=performers.busy;

    var free=performers.free;

    if(busy.indexOf(perf) != -1){

        document.writeln('<div class="recentWidth onlineBG"><div class="statusBar"><img src="/img/icons/chat.gif"></div>');

    }else if(free.indexOf(perf) != -1){

        document.writeln('<div class="recentWidth sessionBG"><div class="statusBar"><img src="/img/icons/session.gif"></div>');

        return true;

    }else{

        document.writeln('<div class="recentWidth offlineBG"><div class="statusBar"><img src="/img/icons/offline.gif"></div>');}

    return false;

}

function getQueryVariable(variable){

  var query=window.location.search.substring(1);

  var vars=query.split("&");

  for(var i=0;i<vars.length;i++){

    var pair=vars[i].split("=");

    if(pair[0]==variable){return pair[1];}

  }

  return ''; 

}

function liveviewer(){ livew=window.open('/livesession.html', 'livesession', 'resizable=no,toolbar=no,scrollbars=no,personalbar=no,menubar=no,location=no,status=no,width=568,height=273,top=0,left=0');}

function closeLiveviewer(){

  //Doing this so we dont get javascript error when checking for livew.

  if(livew){livew.close();}

}

function showD2PToolbar(){

    netia=getCookie('NetiA');

    ml='';

	if(netia){

        cForm=netia.split(":");

        check=/.+@.+\..+/;

        if(cForm[0].match(check)){d2ptoolbar_url="/d2ptb";}else{d2ptoolbar_url="http://images.d2pass.com/images/toolbar/utf/black.html";}

        document.write('<center><div class="d2_toolbar"><TABLE cellSpacing=0 cellPadding=0 width="100%" border=0 ><TBODY><TR><TD height=23>');

        document.write('<IFRAME src="'+d2ptoolbar_url);

        document.write('" frameBorder=0 width="100%" scrolling=no height=23></IFRAME></TD></TR></TBODY></TABLE></div></center>');

    }

}

var CCGURL="http://www.caribbeancomgirl.com";

var EXURL="http://www.kanjukulive.com";

function openProfileCCG(uname){ openNewWindow(CCGURL+'/profile/'+uname+'?fromSite=1000048','preview'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=910,height=540');}

function openProfileCCGMember(uname){openNewWindow(CCGURL+'/profile/'+uname+'?action=login&fromSite=1000048','preview'+uname, 'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=910,height=540');}

function openViewerVchatCCG(performer, stype){openNewWindow('/chat/'+performer+'/'+stype, performer,'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');}

function openViewerVchatCCGSame(performer,stype){window.close();openNewWindow('/chat/'+performer+'/'+stype,performer,'resizable=yes,status=no,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=1010,height=700');}

function openSendMailCCG(uname){openNewWindow(CCGURL+'/mailbox/compose/?to='+uname, 'compose'+uname,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=910,height=540');}

function openPreviewEX(uname){openNewWindow(EXURL+'/preview/'+uname+'.html?fromSite=1000048','preview'+uname,'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=740,height=760');}

//Profile doesnt have fromSite... use preview for EX

function openProfileEX(uname){openNewWindow(EXURL+'/profile/'+uname+'.html?fromSite=1000048', 'profile'+uname,'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=775,height=700');}

function openPreviewEXMember(uname){openNewWindow(EXURL+'/preview/'+uname+'.html?fromSite=1000048&fo=WlBsYn362L5a2l5s2k36JjV9GL5TW9x6I6fKIngjGkm','preview'+uname,'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=740,height=760');}

function openProfileEXMember(uname){openNewWindow(EXURL+'/profile/'+uname+'.html?fromSite=1000048&fo=WlBsYn362L5a2l5s2k36JjV9GL5TW9x6I6fKIngjGkm','profile'+uname,'resizable=yes,toolbar=no,scrollbars=1,personalbar=no,menubar=no,width=775,height=700');}

function openViewerVchatEX(uid,stype){openNewWindow(EXURL+'/app/member/chat.php?uid='+uid+'&stype='+stype+'&fromsite=1000048','Chat'+uid,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');}

function openViewerHDVchatEX(uid,stype){openNewWindow(EXURL+'/app/member/chat.php?hd=1&uid='+uid+'&stype='+stype+'&fromSite=1000048','Chat'+uid, 'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');}

function openViewerVchatEXSame(uid,stype){window.close();openNewWindow('/redirect/exChat/'+uid+'/'+stype+'/1','Chat'+uid,'resizable=yes,toolbar=no,scrollbars=no,personalbar=no,menubar=no,width=820,height=640');}

function resizeChatWindow(size){

  if(size=='small'){window.resizeTo(780,387);

  }else if(size=='medium'){window.resizeTo(940,507);

  }else if(size=='full'){window.moveTo(0,0);window.resizeTo(screen.width, screen.height);}

}

function openCompliance(){openNewWindow("/title.html",'compliance','toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');}

function openFaq(errorCode){

    if(errorCode=='1044' || errorCode=='1045'){openNewWindow("/faq.html#q4_12",'banKickFaq','toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');

    }else{openNewWindow("/faq.html",'banKickFaq','toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');}

}

function noDisplay(flag){

	var hours=24;

	var domain=".dxlive.com";

    var cookies=document.cookie;

	var cname="noDisplay";//alert( "all cookies: " + document.cookie);

	if(flag){cname="noDisplay2"; hours = 2160;} //90 days

    var find=cookies.indexOf("vauth=");

    if(find != -1){

		var start=find+6;

        var end=cookies.indexOf(";", start);

        if(end==-1) end=cookies.length;

        var value=cookies.substring( start, end);

        value=unescape(value);

        var vals=value.split(':');

		var uname=vals[0];

		var uid=vals[1];

		var utype=vals[2];

		document.cookie=cname+"=un:"+escape(uname)+"&uid:"+escape(uid)+"&ut:"+escape(utype)+

						  "; expires="+new Date((new Date()).getTime()+hours*3600000)+

						  "; path="+"/"+

						  "; domain="+escape(domain);

		return true;

    }else{return false; }

}

function openFavorite(){openNewWindow('/MyPage#favorite','favorite','resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no');}  

