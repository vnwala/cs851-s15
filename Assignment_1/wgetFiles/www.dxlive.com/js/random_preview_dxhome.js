//for www.dxlive.com no en.
//needs /json/performer_jp -> jp_performers

random_performers = new Array();
var perfRedirect;
var wait4preview;
var cycle;
var last_perf = null;

function tryPreview () {
	if (jp_performers.list.length) {
		clearTimeout(wait4preview);
		cyclePreview(w, h);
	} else {
		wait4preview = setTimeout(tryPreview, 500);
	}
}

function nextVideo(w,h){
	clearTimeout(cycle);
	cyclePreview(w,h);
}

function no_perf(){
    clearTimeout(wait4preview);
    var perfName = document.getElementById('namehere');
    while (perfName.hasChildNodes()) {
        perfName.removeChild(perfName.firstChild)
    }
    perfName.appendChild(document.createTextNode(''));
    return;
}

function openNewWindow(theURL,winName,features) {
        var w = window.open(theURL,winName,features);
        //w.focus();
}

function openProfile(uname) {
  //openNewWindow('http://www.dxlive.com/profile/'+uname, 'profile'+uname, 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,width=800,height=950');
  window.open('/preview/'+uname, '_blank');
}


function cyclePreviewAff(affid){
  cyclePreview(156,117);
}

function cyclePreview (w, h) {
    var script = document.createElement('script');
    script.src = '/json/performer_jp';
    document.body.appendChild(script);

	//if(!user_arr) {
    if (jp_performers.free.length == 0) {
          no_perf();
	  return;
	}
	var count=jp_performers.free.length;
/*	var arr = new Array();
	for(perf in user_arr) {
		if(user_arr[perf].session_type=='110' && user_arr[perf].test_flag!=1){
			count++;
			if(perf!=last_perf){
			   arr.push(perf);
			} 
		}
	}*/

	var perf = '';
	//if(arr.length > 0) {
    if (jp_performers.free.length > 0 ){
		//var index = Math.floor(Math.random() * arr.length);
		var index = Math.floor(Math.random() * jp_performers.free.length);
		//perf = arr[index];
        perf = jp_performers.free[index];
		/*if(arr.length==1){
			perf = arr[0];
		}*/
        if (jp_performers.free.length == 1){
            perf = jp_performers.free[0];
        }
	}

    if (count == 0) {
        no_perf();
        return;
    }

    /*
	if(count == 1 && arr.length == 0) {
		perf = last_perf;
	}
	if(count == 0 && arr.length == 0) {
         	no_perf();
		return;
	}*/
 


	clearTimeout(wait4preview);
	var perfName = document.getElementById('namehere');
	var copyRight = "(C) 2002-2008 DXLIVE.COM. ALL RIGHTS RESERVED.";
	perfRedirect = perf
	while (perfName.hasChildNodes()) {
        perfName.removeChild(perfName.firstChild)
	}
	perfName.innerHTML = '<a href="javascript:;" onClick=openProfile("'+perf+'") style="text-decoration: none;">'+perf+'</a>';
    var previewTD = document.getElementById('vidPlayerHere');
    last_perf = perf;
    var perf_data = jp_performers.online[perf];
    var uid =  perf_data.user_id;  //user_arr[perf].user_id;
//	var src = 'http://jp.dxlive.com/flash/chat/freePreview20.swf';
	var src = 'http://www.dxlive.com/flash/chat/preview.swf';
	var str = '';
	var as3_str = '';
    if (w == undefined) {
        w = '156';
    }
    if (h == undefined) {
        h = '117';
    }

perf_data.hd = 0;
as3_str += '<object id="video_chat" width="'+w+'" height="'+h+'" align="" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">';
as3_str += '<param value="'+src+'" name="movie">';
as3_str += '<param value="'+perf_data.hd+'" name="hd">';
as3_str += '<param value="from_site=1000048&performer_id='+uid+'&performer_name='+perf+'&session_type=110&vw_count=&lang_id=jp&userSiteID=1000048&user_type=&copyright=(C)2002 DXLIVE.COM ALL RIGHTS RESERVED.&from_site_id=20000607&hd='+perf_data.hd+'&dx_thumb=1" name="FlashVars">'
as3_str += '<param value="LT" name="salign">';
if(perf_data.hd == 1){
  as3_str += '<PARAM name="hd" value="1">';        
}
as3_str += '<param value="high" name="quality">';
as3_str += '<param value="direct" name="wmode">';
as3_str += '<param value="#000000" name="bgcolor">';
as3_str += '<param value="always" name="allowScriptAccess">';
as3_str += '<embed width="'+w+'" height="'+h+'" align="" wmode="direct" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="video_chat" bgcolor="#000000" quality="high" allowscriptaccess="always" flashvars="from_site=1000048&performer_id='+uid+'&performer_name='+perf+'&session_type=110&vw_count=&lang_id=jp&userSiteID=1000048&user_type=&copyright=(C)2002 DXLIVE.COM ALL RIGHTS RESERVED.&from_site_id=20000607&dx_thumb=1&hd='+perf_data.hd+'" salign="LT" src="'+src+'">';
as3_str += '</object>';


	str += '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + w + '" height="' + h + '" id="video_chat" align="">';
  	str += '<param name="allowScriptAccess" value="always" />';
  	str += '<PARAM name="movie" value="'+src+'">';
  	str += '<param name=FlashVars value="channel='+perf+'&performerID='+uid+'&userType=&sessionType=110&langID=jp&userSiteID=1003332&skinName=skin0&ban=0&hd='+perf_data.hd+'" />';
  	str += '<PARAM name="salign" value="LT">';
  	str += '<PARAM name="quality" value="high">';
  	str += '<PARAM name="bgcolor" value="#006666">';
        if(perf_data.hd == 1){
          str += '<PARAM name="hd" value="1">';
        }
    str += '<embed src="'+src+'" salign="LT" FlashVars="channel='+perf+'&performerID='+uid+'&userType=&sessionType=110&langID=jp&webID=A&userSiteID=1000048&skinName=skin0&ban=0&photo=http://imageup.dxlive.com/WebArchive/'+perf+'/flash/LinkedImage.jpg&hd='+perf_data.hd+'" quality="high" bgcolor="#006666" width="' + w + '"  height="' + h + '" name="video_chat" align="" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
  	str += '</OBJECT>';

    fvars = 'channel=' +uid+ '&performerID=' +uid+ '&userType=&sessionType=110&langID=jp&webID=&userSideID=1000048&skinName=skin0'
    str2 = '<script>freePreview(' +w+ ',' +h+ ', "'+fvars+'")</script>';

	global_pf_name = perf;
    previewTD.innerHTML = as3_str;
    cycle = setTimeout('cyclePreview(' + w + ',' + h + ')',30000);

}

function redirect(thiscaller) {
if (thiscaller=='randompreview') {
    var w = window.open('/randpreviewclick.shtml?'+perfRedirect, 'preview', 'resizable=yes,toolbar=yes,scrollbars=yes,personalbar=yes,menubar=yes,location=yes,status=yes,width=860,height=600');
} else {
    //var w = window.open('/preview/'+perfRedirect, 'preview', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,location=no,status=yes,width=860,height=1000');
    //var w = window.open('/preview/'+perfRedirect, 'preview', 'resizable=yes,toolbar=yes,scrollbars=yes,personalbar=yes,menubar=yes,location=yes,status=yes,width=860,height=600');
    var w = window.open('/preview/'+perfRedirect, '_blank');
}
  w.focus();
}

function time_out_link(user_type)
{
    //***NOTE: This is overloaded from common.js and must come after common.js***

    //var joinw = window.open('/preview/'+perfRedirect, 'preview', 'resizable=yes,toolbar=no,scrollbars=yes,personalbar=no,menubar=no,location=no,status=yes,width=860,height=1000');
    var joinw = window.open('/preview/'+perfRedirect, '_blank');
    joinw.focus();
}



