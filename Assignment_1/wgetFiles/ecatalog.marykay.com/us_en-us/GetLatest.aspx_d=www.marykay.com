
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head2">
<!--begin old cod -->
    <link href="http://pub.epageview.com/aglaia/Styles/DigitalFlip.css" rel="stylesheet" type="text/css" /><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><meta name="title" content="Mary Kay® eCatalog!" /><meta name="description" content="Check out the fabulous things I found in the Mary Kay® eCatalog!" /><link id="Link1" rel="image_src" href="http://ecatalog.marykay.com/Documents/MaryKay/MaryKay/946D80335EBE4DC7AA7778D267A42E27/Thumbnail_1.jpg" /><title>
	Mary Kay eCatalog
</title>
    <script type="text/javascript" src="http://res.epageview.com/scriptslib/swfobject-2.2/swfobject.js"></script>
    <script src="http://pub.epageview.com/aglaia/Scripts/General.js" language="JavaScript" type="text/javascript"></script>
    <script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>
    <script src="Scripts/Statistics.js" language="JavaScript" type="text/javascript"></script>
<!-- end old code -->
<script type="text/javascript">var addthis_config = {     username: "marykayecat",data_track_clickback:true}</script>
<script type="text/javascript">
var flashvars = {};
flashvars.docid = "946D80335EBE4DC7AA7778D267A42E27";
flashvars.applicationUrl = "http://pub.epageview.com/Aglaia/";
flashvars.serverURL ="http://mkpages.epageview.com";
flashvars.mailUrl ="http://pub.epageview.com/MaryKay/ServerMK2011/";
flashvars.langid ="en-us";
flashvars.isusa = "1";
var params = {};
params.swliveconnect = "true";
params.allowscriptaccess = "always";
params.allowFullscreen = "true";
params.menu = "false";
params.loop = "false";
params.scale = "showall";
params.quality = "high";
params.wmode   = "opaque";


var attributes = {};
attributes.id = "flashobj";
attributes.name = "flashobj";
swfobject.embedSWF("http://mkpages.epageview.com/MaryKay/MaryKayUSEN.swf?c=57", "flashcontent", "100%", "100%", "9.0.0","http://res.epageview.com/scriptslib/swf/expressInstall.swf",flashvars, params, attributes);
</script>
 <script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js"></script>
        <script type="text/javascript">
		var addthis_share = 
		{
		  templates: { twitter: 'Check out the new Mary Kay ® electronic catalog: '+unescape(getURLParamsForLink(1))+'' } 
		}
		function ChangeAddthisValue(pPageNumber){
			addthis_share = 
			{
			  templates: { twitter: 'Check out the new Mary Kay ® electronic catalog: '+unescape(getURLParamsForLink(pPageNumber))+'' } 
			}
		}
		 
        var addthis_pub="MaryKay";
      // var addthis_brand = "MaryKay"; 
        var addthis_header_color = "#ffffff"; 
		//var addthis_options ="pinterest, favorites, digg, delicious, myspace, google, facebook, live,stumbleupon,twitter,  more";
        var addthis_exclude="email, print";
        var addthis_header_background = "#020e34";
  </script>
<script language="JavaScript" type="text/javascript">
    var addthis_offset_top=0;
    var addthis_offset_left = 0;
    //var clientScrollWidth=document.body.parentNode.scrollWidth<=document.body.scrollWidth ? document.body.scrollWidth : document.body.parentNode.scrollWidth; 
    function  linkonmouseover(pageNo,xPosition,yPosition)
    { 
		//debugger;
		position = 'absolute';
		var actualHeight  =document.body.offsetHeight; 
        addthis_offset_top=actualHeight - 31;
        addthis_offset_left=0;
        var bookmarkURL=location.href;//window.location.pathname;
        if (bookmarkURL.indexOf('&page') > -1)
        {
           bookmarkURL = replaceQueryString(bookmarkURL, '&page', pageNo);
        }
        else if(bookmarkURL.indexOf('?') > -1)
        {
            bookmarkURL =location.href+ '&page='+pageNo;//window.location.pathname + '&page='+pageNo;
        }
        else
        {
            bookmarkURL =location.href+ '?page='+pageNo;//window.location.pathname + '&page='+pageNo;
        }
       
	    var e = document.getElementById("addThisLink");	     
	    return addthis_open(e, '', bookmarkURL, 'MaryKay');

    }
    function  linkonmouseout()
    {
	  //addthis_close();
    }

    function  linkClicked()
    {      	
	    return addthis_sendto()
    }
    
     function replaceQueryString(url, param, value) {
     preURL = "";
     postURL = "";
     newURL = "";

      start = url.indexOf(param+"=");
      if(start > -1){
       end = url.indexOf("=", start);
       preURL=url.substring(0,end) +"="+value;

       startRest = url.indexOf("&",start);
       postURL="";
       if(startRest > -1){
                  postURL=url.substring(startRest);
       }

      }else{
        preURL=url;
        postURL="&"+param+"="+value;
      }
      newURL = preURL+postURL;

      return newURL;

  }  
	function load()
    {
        var nIndex = location.href.indexOf("#");
        if(nIndex > 0){
           window.location =  location.href.substr(0,nIndex );
        }
    }
    </script>
<style type="text/css">
	html 
	{
		height: 100%;
		overflow: hidden;
	}
	#flashcontent { 
		height: 100%;
	}
	body {
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #ffffff;
	}
</style>
</head>
<body onload="load()">
<div ><a id="addThisLink" href="http://www.addthis.com/bookmark.php?v=300&amp;pubid=marykayecat" onmouseout="addthis_close();"></a></div>
<noscript>
</noscript>
<div id="flashcontent"></div>	
<noscript>
    <pre>For optimal viewing of this digital publication, please enable JavaScript and then refresh the page.</pre>
</noscript>
</body>
</html>