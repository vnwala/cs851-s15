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

        var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura.swf","playerID", w, h,"7");
/*
        if(type>0){
                  var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura.swf","playerID", w, h,"7");
        } else {
                  var s = new SWFObject("http://www.muramura.tv/flash/player_mura_v2.swf","playerID", w, h,"7");
	//        var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura_v2sample.swf","playerID", w, h,"7");

        //        var s = new SWFObject("http://www.muramura.tv/flash/mediaplayer_mura_v2.swf","playerID", w, h,"7");
		
        }
*/
    var d2p_fm_flag = 1; //getCookie('d2p_free_member');
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
    s.addVariable('linkfromdisplay', 'true');
    	

    if (go) { s.addVariable("autostart","true"); }

    s.addVariable('member', type);
    s.addVariable('mid' , mid);
    s.addVariable('d2p_fm', d2p_fm_flag);

        if(type < 1){
                s.addVariable("recommendations", "http://www.muramura.tv/flash/reclist_xml.php");
                s.addVariable('logo','http://tracking.dtiserv2.com/counter?u=156');
        }

        if(num)
                var pholder = "placeholder" + num;
        else  pholder = "placeholder";

        s.write( pholder  );
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

