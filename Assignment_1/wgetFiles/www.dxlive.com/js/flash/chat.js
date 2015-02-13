function freePreview (w, h, FlashVars, url, hd, member) {
//    if(!hd){
      var hd=0;
//    }
    //var swf = '/flash/chat/limitedFreePreview20.swf';
    var swf = '/flash/chat/blur_preview.swf';
    if(!member){
      var member=0;
    }
    if((member=='1') || isRegularUser() || isVIP()) {
        swf = '/flash/chat/freePreview20.swf';
    } else {
        FlashVars = FlashVars + '&timeLimit=30000';
    }

    document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width='+w+' height='+h+' id="video_chat" align="">');
    document.writeln('<PARAM name="movie" value="'+url+swf+'">');
    if(hd){
      document.writeln('<param name="hd" value="1" />');
      FlashVars = FlashVars +'&hd=1';
    } else {
      document.writeln('<param name="hd" value="0" />');
      FlashVars = FlashVars +'&hd=0';
    }
    document.writeln('<param name=FlashVars value="'+FlashVars+'" />');
    document.writeln('<PARAM name="salign" value="LT">');
    document.writeln('<PARAM name="quality" value="high">');
    document.writeln('<param name="wmode" value="transparent">');
    document.writeln('<PARAM name="bgcolor" value="#006666">');
    document.writeln('<param name="allowScriptAccess" value="always">');
    document.writeln('<embed src="'+url+swf+'" salign="LT" FlashVars="'+FlashVars+'" allowScriptAccess="always" quality="high" bgcolor="#006666" width='+w+' height='+h+' name="video_chat" align="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"/>');
    document.writeln('</OBJECT>'); 
}

function freePreviewNormal (w, h, FlashVars, url, hd, member) {
//    if(!hd){
      var hd=0;
//    }
    var swf = '/flash/chat/limitedFreePreview20.swf';
    if(!member){
      var member=0;
    }
    if((member=='1') || isRegularUser() || isVIP()) {
        swf = '/flash/chat/freePreview20.swf';
    } else {
        FlashVars = FlashVars + '&timeLimit=30000';
    }

    document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width='+w+' height='+h+' id="video_chat" align="">');
    document.writeln('<PARAM name="movie" value="'+url+swf+'">');
    if(hd){
      document.writeln('<param name="hd" value="1" />');
      FlashVars = FlashVars +'&hd=1';
    } else {
      document.writeln('<param name="hd" value="0" />');
      FlashVars = FlashVars +'&hd=0';
    }
    document.writeln('<param name=FlashVars value="'+FlashVars+'" />');
    document.writeln('<PARAM name="salign" value="LT">');
    document.writeln('<PARAM name="quality" value="high">');
    document.writeln('<param name="wmode" value="transparent">');
    document.writeln('<PARAM name="bgcolor" value="#006666">');
    document.writeln('<param name="allowScriptAccess" value="always">');
    document.writeln('<embed src="'+url+swf+'" salign="LT" FlashVars="'+FlashVars+'" allowScriptAccess="always" quality="high" bgcolor="#006666" width='+w+' height='+h+' name="video_chat" align="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"/>');
    document.writeln('</OBJECT>');
}


function getFlashVersion(){ 
	// ie 
	try { 
		try { 
			// avoid fp6 minor version lookup issues 
			// see: deconcept » GetVariable/SetVariable crashes Internet Explorer with Flash Player 6 
			var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6'); 
			try { axo.AllowScriptAccess = 'always'; } 
				catch(e) { return '6,0,0,0'; } 
		} catch(e) {} 
			return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1]; 
	// other browsers 
	} catch(e) { 
		try { 
			if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
				//alert(navigator.plugins["Shockwave Flash"].description);
				return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]; 
			}
		} catch(e) {} 
	} 
	return '0,0,0,0'; 
}

function writeViewerChat(w,h,Fid,swfFile,FlashVars,quality,bgcolor,wmode){
	var params = FlashVars.split("&");
	for( i=0; i<params.length; i++)
	{
		var nv = params[i].split("=");
		if( nv[0] == "user_type" || nv[0] == "userType")
		{
			var userType = nv[1];
			//break;
		}
		if( nv[0] == "hd")
		{
			var HD = 1;
		}
	}
	FlashVars = encodeURI(FlashVars);
	var wmodeTmp = '';
	var checkSwf = swfFile.indexOf("video_chat_app_pf");
	//var playerVersion = swfobject.getFlashPlayerVersion();
	//var output = "You have Flash player " + playerVersion.major + "." + playerVersion.minor + "." + playerVersion.release + " installed";
	//var pversion = getFlashVersion(); //.split(',').shift();
	//alert("version is "+pversion);
	//alert("type is "+checkSwf+" hd is "+HD+" user is "+userType+" : ");
	if( userType == 210 && checkSwf > 0)
	{
		var pVersion = getFlashVersion(); //.split(',').shift();
		//alert("version is "+pVersion);
		var arV = pVersion.split(',');
		//if( arV[0] == '12')
        //    var cmpVer = 120000;
        //else
		//	var cmpVer = pVersion.match(/(^\d+,\d+,\d+),?\d*/)[1].replace(/\D+/g, "");
		var cmpVerNum = parseInt(arV[0],10);
		var cmpVerNum1 = parseInt(arV[1],10);
		//alert("version is "+pVersion+" and cmp is "+cmpVerNum);
		//if( cmpVerNum < 111000)
		if( cmpVerNum < 11)
		{
			//alert('AS3 does not support Flash player version '+pVersion+'!\nPlease upgrade!');
			alert('新しいチャットウィンドウでオンラインいただくには\nご利用のフラッシュプレーヤーをアップグレードして下さい。');
			window.close();
			//window.opener.location="http://get.adobe.com/flashplayer/";
			//window.open('http://get.adobe.com/jp/flashplayer/','_blank','width=1026','height=660');
			//window.close();
		}
		else if(cmpVerNum == 11 && cmpVerNum1 == 0)
        {
			alert('新しいチャットウィンドウでオンラインいただくには\nご利用のフラッシュプレーヤ>ー>をアップグレードして下さい。');
            window.close();
        }
		else
		{
			document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,1,0,0" width='+w+' height='+h+' id='+Fid+' align="">');
		}
	}
	else if( userType != 210)
	{
		//var vVersion = getFlashVersion();
		//var cmpVer = vVersion.match(/(^\d+,\d+,\d+),?\d*/)[1].replace(/\D+/g, "");
        //var cmpVerNum = parseInt(cmpVer,10);
        //alert("version is "+vVersion+" and cmp is "+cmpVerNum+" and userType is "+userType);
		//if( cmpVerNum < 110000)
		//{
		//	alert('チャットにご入室頂くには、フラッシュプレイヤーのアップグレードが必要です\nhttp://get.adobe.com/jp/flashplayer/');
		//	window.close();
		//}
		//else
		//{
			document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width='+w+' height='+h+' id='+Fid+' align="">');
		//}
	}
	else
	{
		//alert("else type is "+checkSwf+" hd is "+HD+" user is "+userType);
		document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width='+w+' height='+h+' id='+Fid+' align="">');
	}

    var random_number = Math.random();

    document.writeln('<PARAM name="movie" value='+swfFile+'>');
    document.writeln('<param name=FlashVars value='+FlashVars+' />');
    document.writeln('<PARAM name="salign" value="LT">');
    document.writeln('<PARAM name="quality" value='+quality+'>');
    document.writeln('<PARAM name="bgcolor" value='+bgcolor+'>');
    if(wmode != null && wmode != '') {
      document.writeln('<param name="wmode" value="'+wmode+'"/>');
      wmodeTmp = 'wmode="'+wmode+'"';
    }
    document.writeln('<embed src='+swfFile+' salign="LT" FlashVars='+FlashVars+' quality='+quality+' bgcolor='+bgcolor+' '+wmodeTmp+' width='+w+' height='+h+' name='+Fid+' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
    document.writeln('</OBJECT>');  
} 

function setViewerMode(mode) {
    document.cookie = "vm=" + mode + "; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;";
}

function openRegularJoin() {
  openNewWindow('/join.html', 'join', '');
}

function openVIPJoin() {
  openNewWindow('/join.html', 'join', '');
}

function openJoin(site_id) {
    openNewWindow("/join/" + site_id, 'join', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
}   


function openJoinVCTP(site_id) {
    openNewWindow("/redirect/" + site_id + "/viewers", 'vctp', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
}

function openInquiry(errorCode) {
    if (isUser() || isVIP()) {
        openNewWindow("https://service.d2pass.com/dxmember/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
    } else {
        openNewWindow("https://service.d2pass.com/dxperformer/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
    }
}

function openVctpInquiry(errorCode) {
    openNewWindow("https://service.d2pass.com/VCTP/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');
}

function openHDPublisher()
{
    var HDPublisherDiv;
    var HDPublisherIframe;

    if( null !== ( HDPublisherDiv = document.getElementById("HDPublisherDiv") ) )
    {
        HDPublisherDiv.innerHTML = "";
        HDPublisherIframe = document.createElement("iframe");
        HDPublisherIframe.setAttribute("frameBorder", "0");
        HDPublisherIframe.setAttribute("scrolling", "no");
        HDPublisherIframe.style.position = "relative";
        HDPublisherIframe.style.width = "440px";
        HDPublisherIframe.style.height = "540px";
        HDPublisherIframe.src = "/chat/hd_index";

        HDPublisherDiv.appendChild( HDPublisherIframe );
    }

}

  
function set_sound(volume){
        var xmlhttp = getXmlhttp();
        var url = "";

        url = "/performer/chat_volume?action=save&chat_volume="+volume;
        xmlhttp.open('POST', url, true);
        xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                        res = xmlhttp.responseText;
        //                alert(res);
                }
        }

        xmlhttp.send(null);
}
 
