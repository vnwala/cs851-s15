var userAgent = window.navigator.userAgent.toLowerCase();
var uAgent;
var appVersion = window.navigator.appVersion.toLowerCase();
var aVersion;
	
if (userAgent.indexOf('msie') != -1) {
	uAgent = 'msie';
	if (appVersion.indexOf("msie 6.") != -1) {
		aVersion = 'ie6';
	} else if (appVersion.indexOf("msie 7.") != -1) {
		aVersion = 'ie7';
	} else if (appVersion.indexOf("msie 8.") != -1) {
		aVersion = 'ie8';
	} else if (appVersion.indexOf("msie 9.") != -1) {
		aVersion = 'ie9';
	} else {
		aVersion = 'ie';
	}
}
else {
	uAgent = 'other';
}
function createplayer(theFile, go, image, w, h, type, num ) {
	var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura.swf","playerID", w, h,"7");

    s.addParam("allowfullscreen","true");
    s.addParam("allowscriptaccess","always");
    s.addParam('wmode', 'transparent');

    s.addVariable("file",theFile);
    s.addVariable("width",w);
    s.addVariable("height", h);
    s.addVariable("displayheight",(h-20));
    s.addVariable("bufferlength","2");
    s.addVariable("streamscript", "lighttpd");
//    s.addVariable("streamer", "lighttpd");
    s.addVariable("image", image);
    s.addVariable('type','flv');
    s.addVariable('quality','high');

    if (go) { s.addVariable("autostart","true"); }
    s.addVariable("recommendations", "http://stream.1pondo.tv/projects/hd_streaming/rec_list.xml");
    s.addVariable('member', type);

	if(type < 1)
        	s.addVariable('logo','http://tracking.dtiserv2.com/counter?u=156');
  
	if(num)
		var pholder = "placeholder" + num; 
	else  pholder = "placeholder";

	s.write( pholder  );
}

function createplayer_v2(theFile, go, image, w, h, type, num ) {
	if(type>0){
		  var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura.swf","playerID", w, h,"7");
	} else {
		  var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura_v2.swf","playerID", w, h,"7");
	}
	
    var d2p_fm_flag = getCookie('d2p_free_member');
	
    s.addParam("allowfullscreen","true");
    s.addParam("allowscriptaccess","always");
    s.addParam('wmode', 'transparent');

    s.addVariable("file",theFile);
    s.addVariable("width",w);
    s.addVariable("height", h);
    s.addVariable("displayheight",(h-20));
    s.addVariable("bufferlength","2");
    s.addVariable("streamscript", "lighttpd");
    s.addVariable("image", image);
    s.addVariable('type','flv');
    s.addVariable('quality','high');

    if (go) { s.addVariable("autostart","true"); }

    s.addVariable('member', type);

        if(type < 1){
		s.addVariable("recommendations", "http://www.muramura.tv/flash/reclist_xml.php");
                s.addVariable('logo','http://tracking.dtiserv2.com/counter?u=156');
	}

        if(num)
                var pholder = "placeholder" + num;
        else  pholder = "placeholder";

        s.write( pholder  );
}

function createplayer_v3(theFile, go, image, w, h, type, num, mid ) {
    window.flashvars =
    {
        file              : theFile,
		image             : image,
        width             : w,
        height            : h,
        wmode             : 'opaque',
        allowscriptaccess : 'always',
        allowfullscreen   : 'true',
        stretching        : 'uniform',
        primary           : 'flash',
        startparam        : 'start',
		member          : type,
		mid                  : mid,
		skin            :'/js/jwplayer6/src_s/six.xml'
    }; //var flashvars
    if(go) window.flashvars.autostart = true;
    if(num)
        var pholder = "placeholder" + num;
    else  
        pholder = "placeholder";
		
    if( getCookie('NetiA'))
    {
        pholder = "placeholder2";
		
		if((movie_type_n == '5' && user_type == '5') || (movie_type_n == '3' && user_type >= '3') || (movie_type_n == '1' && user_type >= '1')){
			flashvars.skin = '/js/jwplayer6/src/six.xml';
			if((uAgent == 'msie' && aVersion == 'ie7')){
			document.write('<div id="cloudIcon" style="position:absolute; right:4px; bottom:10px;">'+
			'<a id="cloudLink" href="http://www.cloudhome.com/partner/index/muramura.tv/'+mid+'">'+
			'<img src="http://www.cloudhome.com/images/icons/cloud_icon_player.png"></a></div>' );
			}
			else if((uAgent == 'msie' && aVersion == 'ie6')){
			document.write('<div id="cloudIcon" style="position:absolute; right:4px; top:347px;">'+
            '<a id="cloudLink" href="http://www.cloudhome.com/partner/index/muramura.tv/'+mid+'">'+
            '<img src="http://www.cloudhome.com/images/icons/cloud_icon_player.png"></a></div>' );
			}
			else{
			document.write('<div id="cloudIcon" style="position:absolute; right:4px; bottom:-1px;">'+
			'<a id="cloudLink" href="http://www.cloudhome.com/partner/index/muramura.tv/'+mid+'">'+
			'<img src="http://www.cloudhome.com/images/icons/cloud_icon_player.png"></a></div>' );
			}
		}
    }
    else
    {
        flashvars.skin = '/js/jwplayer6/src_s/six.xml';	
    }
    
    jwplayer(pholder).setup(flashvars); 	
    return; 
}

function createplayer_top(theFile, go, image, w, h, type, num ) {
        if(type>0){
                  var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura.swf","playerID", w, h,"7");
        } else {
                var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura_v2.swf","playerID", w, h,"7");
        }

    s.addParam("allowfullscreen","true");
    s.addParam("allowscriptaccess","always");
    s.addParam('wmode', 'transparent');

    s.addVariable("file",theFile);
    s.addVariable("width",w);
    s.addVariable("height", h);
    s.addVariable("displayheight",(h-20));
    s.addVariable("bufferlength","2");
    s.addVariable("streamscript", "lighttpd");
    s.addVariable("image", image);
    s.addVariable('type','flv');
    s.addVariable('quality','high');

    if (go) { s.addVariable("autostart","true"); }

    s.addVariable('member', type);

        if(type < 1){
                s.addVariable("recommendations", "http://www.muramura.tv/flash/reclist_xml.php");
                s.addVariable('logo','http://tracking.dtiserv2.com/counter?u=156');
        }

        if(num)
                var pholder = "placeholder" + num;
        else  pholder = "placeholder";

        s.write( pholder  );
}

