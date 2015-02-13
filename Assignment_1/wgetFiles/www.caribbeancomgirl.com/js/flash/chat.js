function freePreview (w, h, FlashVars, url, hd){
    if(!hd){
      var hd=0;
    }
    var swf = '/flash/chat/limitedFreePreview20.swf';
    if(!member){
      var member=0;
    }
    if ((member == '1') || isRegularUser() || isVIP()){
        swf = '/flash/chat/freePreview20.swf';
    }else{
        FlashVars = FlashVars + '&timeLimit=30000';
    }
    document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width='+w+' height='+h+' id="video_chat" align="">');
    document.writeln('<PARAM name="movie" value="'+url+swf+'">');
    if(hd){
      document.writeln('<param name="hd" value="1" />');
      FlashVars = FlashVars +'&hd=1';
    }else{
      document.writeln('<param name="hd" value="0" />');
      FlashVars = FlashVars +'&hd=0';
    }
    document.writeln('<param name=FlashVars value="'+FlashVars+'" />');
    document.writeln('<PARAM name="salign" value="LT">');
    document.writeln('<PARAM name="quality" value="high">');
    document.writeln('<PARAM name="bgcolor" value="#006666">');
    document.writeln('<param name="allowScriptAccess" value="always">');
    document.writeln('<param name="wmode" value="transparent">');
    document.writeln('<embed src="'+url+swf+'" salign="LT" FlashVars="'+FlashVars+'" allowScriptAccess="always quality="high" bgcolor="#006666" width='+w+' height='+h+' name="video_chat" align="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"/>');
    document.writeln('</OBJECT>'); 
}
function writeViewerChat(w,h,Fid,swfFile,FlashVars,quality,bgcolor,wmode){
  FlashVars = encodeURI(FlashVars);
  var wmodeTmp = '';
    document.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width='+w+' height='+h+' id='+Fid+' align="">');
    document.writeln('<PARAM name="movie" value='+swfFile+'>');
    document.writeln('<param name=FlashVars value='+FlashVars+' />');
    document.writeln('<PARAM name="salign" value="LT">');
    document.writeln('<PARAM name="quality" value='+quality+'>');
    document.writeln('<PARAM name="bgcolor" value='+bgcolor+'>');
    if(wmode != null && wmode != ''){
      document.writeln('<param name="wmode" value="'+wmode+'" />');
      wmodeTmp = 'wmode="'+wmode+'"';
    }
    document.writeln('<embed src='+swfFile+' salign="LT" FlashVars='+FlashVars+' quality='+quality+' bgcolor='+bgcolor+' '+wmodeTmp+' width='+w+' height='+h+' name='+Fid+' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
    document.writeln('</OBJECT>');  
} 
function setViewerMode(mode){document.cookie = "vm=" + mode + "; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;";}
function openRegularJoin(){openNewWindow('/join.html', 'join', '');}
function openVIPJoin(){openNewWindow('/join.html', 'join', '');}
function openJoin(site_id){openNewWindow("/join/" + site_id, 'join', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');}   
function openJoinVCTP(site_id) {openNewWindow("/redirect/" + site_id + "/viewers", 'vctp', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');}
function openInquiry(errorCode){openNewWindow("https://service.d2pass.com/VCTP/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');}
function openVctpInquiry(errorCode){openNewWindow("https://service.d2pass.com/VCTP/inquiry/?error_num="+errorCode, 'inquiry', 'toolbar=1,location=1,status=1,scrollbars=1,menubar=1,resizable=1');}
var HDPublisherWindow;
function openHDPublisher(){
    var HDPublisherDiv;
    var HDPublisherIframe;
    if( null !== ( HDPublisherDiv = document.getElementById("HDPublisherDiv") ) ){   
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
function IsHDPublisherClosed(){return ( typeof( HDPublisherWindow ) == 'object' && HDPublisherWindow.closed ) ? 1 : 0;}