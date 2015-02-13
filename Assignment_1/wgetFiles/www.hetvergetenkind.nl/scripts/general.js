// +------------------------------------------------------------------+
// | JavaScript version 1.0                                           |
// +------------------------------------------------------------------+
// | general.js – Some standard functions used in the CMS cleint      |
// |              side. Script is loaded in template by parser.       |
// +------------------------------------------------------------------+
// | Copyright (c) 2008 MultiMove                                     |
// +------------------------------------------------------------------+
// | Authors: S.F.Beck <sander@multimove.nl>     					  |
// +------------------------------------------------------------------+

/**
 * The load function
 * 
 * @return void
 */
function doLoad(){}

$(document).ready(function() {
	
	/*Enable rel="external" as a replacement for target="_blank" attributes*/
	$("a[rel*='external']").attr('target','_blank');
	
	$('#top-nav li:has(ul)').hover(function() {
		$height = $(this).find('ul').outerHeight();		
		$('#header-nav').height($height+5);
		$('#header-nav').show();
	},
	function() {
		$('#header-nav').hide();
	});
	
	$('#slideshow').cycle({
	    caption:            '#slideshow-caption',
	    captionTemplate:    '{{cap}}',
	    log: 				false,
        pager:              '#slideshow-pager',
        pagerTemplate:      '<span></span>',
        pauseOnHover:       true,
        slides:				'>img,>div.cycle-slide',
        speed:              800, // Fade snelheid
        timeout:            5000 // Next slide snelheid
    });
    $('#slideshow').on('cycle-before', function(event, options, outgoing, incoming) {
        $(this).find(options.caption).fadeOut();
		
        if($(incoming).hasClass('liedje')) {
        	$("#header-infofields .page-1").css('display','none');
        	$("#header-infofields .page-2").css('display','block');
        }
        //if($(outgoing).hasClass('liedje')) {
        else {
        	$("#header-infofields .page-1").css('display','block');
        	$("#header-infofields .page-2").css('display','none');
        }
    });
    
    $('#slideshow').on('cycle-after', function(event, options, outgoing, incoming) {
        $(this).find(options.caption).fadeIn();
    });
    
    /*$('.slideshow-video > a').on('click touchend', function(e) {
    	e.preventDefault();
		var vid = $(this).attr('href');
		
		$('#slideshow').cycle('pause');
		$('#header-inner').addClass('hide');
		setTimeout(function(){
			$('#header-inner').css('display','none');
		}, 600);
    	
    	jwplayer("videoplayer").setup({
	        file: vid,
	        height: 397,
	        skin: BASE_URL+'flash/jwplayer/bekle.xml',
	        width: 1300
	    });
	    
	    jwplayer().onReady(function() {
	    	jwplayer().play();
	    });
	    
	    jwplayer().onComplete(function() {
	    	$('#slideshow').cycle('next');
	    	$('#header-inner').css('display','block').removeClass('hide');
			$('#header-inner').removeClass('hide');
			jwplayer().remove();
			$('#slideshow').cycle('resume');
	    });
    });*/
    
	$browser = $.browser;
	
	// Check if browser is IE
	if($browser.msie) {
		$version = $browser.version;
		// Check if browser is IE 8 or IE 7
		if($version == '7.0' || $version == '8.0') {
			$('#content-twitter .tweet:first-of-type .tweet-divider').hide();
		}
	}
	
	if (navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/)) { $('html').addClass('apple'); }
	
	if($browser.mozilla) { $('html').addClass('mozilla'); }
	if($browser.webkit) { $('html').addClass('webkit'); }
	if($browser.opera) { $('html').addClass('opera'); }
	
	$('#content-content .caption').each(function() {
		$this = $(this);
		$parent = $(this).parent();
		$alt = $(this).attr('alt');
		
		if ($parent.is('p')) {
			$this.unwrap();
			$this.wrap("<div class='caption'></div>");		
			if(typeof $alt != 'undefined' && $alt.length > 0) {
				$this.parent().append('<span>'+$alt+'</span>');
			}
		}
		else {
			$this.wrap("<div class='caption'></div>");
			if(typeof $alt != 'undefined' && $alt.length > 0) {
				$this.parent().append('<span>'+$alt+'</span>');
			}
		}
	});
	
	$("a.fancybox").fancybox({
		padding 	: 10,
		closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none',
        prevEffect  : 'none',
        nextEffect  : 'none',
        beforeShow : function() {
	        var sharebtns = '<div class="addthis addthis_default_style "><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_facebook"><img src="'+BASE_URL+'/images/icons/like.png" /></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_twitter"><img src="'+BASE_URL+'images/icons/share.png" /></a></div>';
	    	$(sharebtns).appendTo('.fancybox-skin')
	    },
	    afterShow : function() {
	         addthis.toolbox(
	            $(".addthis").get()
	        );
	    },
        helpers: {
        	title: null,
        	overlay : {
				closeClick : false
			},
        	buttons: {}
        }
    });
    
    $("a.videofile").fancybox({
    	padding 	: 10,
        maxWidth    : 599,
        maxHeight   : 450,
        fitToView   : false,
        width       : '599px',
        height      : '450px',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none',
        beforeShow : function() {
	        var sharebtns = '<div class="addthis addthis_default_style "><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_facebook"><img src="'+BASE_URL+'/images/icons/like.png" /></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_twitter"><img src="'+BASE_URL+'images/icons/share.png" /></a></div>';
	    	$(sharebtns).appendTo('.fancybox-skin')
	    },
	    afterShow : function() {
			addthis.toolbox(
	            $(".addthis").get()
    		);
	    },
        helpers: {
        	overlay : {
				closeClick : false
			},
        	buttons: {}
        }
    });
    
});

/**
 * Make pop-up windows
 * 
 * @return void
 */
function popup( url, width, height )
{
	var iLeft = (screen.width - width) / 2 ;
	var iTop  = (screen.height - height) / 2 ;

	var sOptions = "resizable=yes,dependent=yes,scrollbars=yes," ;
	sOptions += ",width=" + width ;
	sOptions += ",height=" + height ;
	sOptions += ",left=" + iLeft ;
	sOptions += ",top=" + iTop ;

	window.open( url, "FCKBrowseWindow", sOptions ) ;
}


/**
 * Clear textfields preset text and turn to black
 * 
 * @return void
 */
function clearText(thefield, onfocus)
{
	if(onfocus && thefield.value == thefield.defaultValue)
	{
		thefield.value = '';
		thefield.style.color = '#000000';
	}
	if(!onfocus && thefield.value == '')
	{
		thefield.value = thefield.defaultValue;
		thefield.style.color = '#000000';
	}
}


/**
 * Detect the browser
 */
var browserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || 'default';
	},
	searchString: function(data) {
		for(var i = 0; i < data.length; i++) {
			var dataString = navigator.userAgent;
			if (dataString) {
				if(dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
		}
	},
	dataBrowser: [
		{
			subString: 'Chrome',
			identity: 'Chrome'
		},
		{
			subString: 'MSIE',
			identity: 'Explorer'
		},
		{
			subString: 'Firefox',
			identity: 'Firefox'
		},
		{
			subString: 'Safari',
			identity: 'Safari'
		}
	]
}


/**
 *
 */
function popImage(imageURL, imageTitle)
{
	browserDetect.init();
	
	var AutoClose			= true;
	var PositionX			= 0;
	var PositionY			= 0;
	var defaultWidth		= 250;
	var defaultHeight		= 75;
	
	var optFF = 'scrollbars=no,status=yes,width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
	var optIE = 'scrollbars=no,status=yes,width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
	var optChrome = 'scrollbars=no,status=yes,width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
	var optSafari = 'scrollbars=no,status=yes,width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
	
	switch(browserDetect.browser)
	{
		case 'Explorer': default: var isIE = true; break;
		case 'Firefox': var isFF = true; break;
		case 'Chrome': var isChrome = true; break;
		case 'Safari': var isSafari = true; break;
	}
	
	if(isFF) { imgWin = window.open('about:blank', '', optFF); }
	if(isIE) { imgWin = window.open('about:blank', '', optIE); }
	if(isChrome) { imgWin = window.open('about:blank', '', optChrome); }
	if(isSafari) { imgWin = window.open('about:blank', '', optSafari); }
	
	with(imgWin.document)
	{
		var image = new Image();
			image.onload = function() {
				
				switch(browserDetect.browser)
				{
					case 'Explorer': var width = this.width + 10; var height = this.height + 55; break;
					case 'Firefox': var width = this.width + 16; var height = this.height + 87; break;
					case 'Chrome': var width = this.width + 16; var height = this.height + 64; break;
					case 'Safari': var width = this.width; var height = this.height + 39; break;
				}
				
				if(width < 200) { width = 200; }
				if(height < 200) { height = 200; }
				
				getElementById('loading').style.display = 'none';
				
				getElementById('image').src = this.src;
				getElementById('image').style.width = this.width;
				getElementById('image').style.height = this.height;
				
				imgWin.resizeTo(width, height);
				imgWin.moveTo((screen.availWidth / 2) - (width / 2), (screen.availHeight / 2) - (height / 2));
				imgWin.document.title = imageTitle;
			};
			image.src = imageURL;
		
		writeln('<html><head><title>Loading..</title><style>body{margin: 0px; padding: 0px; font-family: Arial; font-size: 12px; color: #ffffff;}</style>');
		
		writeln('</head>');
		
		if(!AutoClose) writeln('<body bgcolor=000000 scroll="no" onload="resizeImage(); self.focus()">')
		else writeln('<body bgcolor=000000 scroll="no" onload="self.focus()" onblur="self.close()">');
		
		writeln('<div id="loading">Loading..</div>');
		writeln('<img id="image" onclick="window.close();" style="display: block; width: 0px; height: 0px; cursor: pointer;">');
		
		writeln('</body></html>');
		
		close();
	}
}


/**
 *
 */
function popupGalleryImage(galleryTitle, imageBrowserUrl, imageDesc)
{
	var PositionX = 0;
	var PositionY = 0;
	var defaultWidth  = 250;
	var defaultHeight = 250;
	
	if (parseInt(navigator.appVersion.charAt(0))>=4)
	{
		var isNN=(navigator.appName=="Netscape")?1:0;
		var isIE=(navigator.appName.indexOf("Microsoft")!=-1)?1:0;
	}
	
	var optNN='scrollbars=no, status=yes, width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
	var optIE='scrollbars=no, status=yes, width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
	
	if (isNN){imgWin=window.open(imageBrowserUrl,'gallery',optNN);}
	if (isIE){imgWin=window.open(imageBrowserUrl,'gallery',optIE);}
}


/**
 *
 */
function mailinglistXmlhttpPost(url, query)
{
    var xmlHttpReq = false;
    var self = this;
    
    // Mozilla/Safari
    if (window.XMLHttpRequest)
    {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject)
    {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    self.xmlHttpReq.open('POST', url, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.onreadystatechange = function()
    {
      if(self.xmlHttpReq.readyState == 4)
      {
        var type = self.xmlHttpReq.responseText.split('|');
        
        switch(type[0])
        {
          default:
            alert(type[1]);
            break;
          
          case 'succes=2':
            alert(type[1]);
            document.getElementById('mailinglist_unsubscribe').style.display = 'none';
            document.getElementById('mailinglist_content').style.display = 'block';
            break;
          
          case 'succes=1':
            document.getElementById('mailinglist_content').style.display = 'none';
            document.getElementById('mailinglist_succes').style.display = 'block';

            document.getElementById('mailinglist_content_pagina').style.display = 'none';
            document.getElementById('mailinglist_succes_pagina').style.display = 'block';
            break;
          
          case 'error=3':
          case 'error=2':
            alert(type[1]);
            break;
          
          case 'error=1':
            document.getElementById('mailinglist_content').style.display = 'none';
            document.getElementById('mailinglist_error').style.display = 'block';
            document.getElementById('error_text').innerHTML = type[1];
            break;
        }
      }
    }
    
    self.xmlHttpReq.send(query);
}

/**
 *
 */
function strpos(haystack, needle, offset)
{
    var i = (haystack+'').indexOf(needle, (offset ? offset : 0));
    return i === -1 ? false : i;
}

function checkEmailFormRequired(e)
{
	var errmsg = "Het formulier is niet volledig ingevuld!";
	var is_valid = true;
	
	$(e).find('.requiredInput').each(function() {
		$(this).css("border-color","");
		
		if (!$(this).val()) {
			is_valid = false;
			$(this).css("border-color","#FF0000");
		}
	});
	
	$(e).find('.requiredCheckbox').each(function() {
		$(this).parent().css("color","");
		
		if (!$(this).is(":checked")) {
			is_valid = false;
			$(this).parent().css("color","#FF0000");
		}
	});
	
	if (is_valid == false) {
		alert(errmsg);
	}
	
	return is_valid;
}

function AanvraagVersturen(){

	$school = $("#aanvraag_school").val();
	$naam = $("#aanvraag_naam").val();
	$adres = $("#aanvraag_adres").val();
	$postcode = $("#aanvraag_postcode").val();
	$plaats = $("#aanvraag_plaats").val();
	$email = $("#aanvraag_email").val();
	$vlaggen = $("#aanvraag_aantal_vlaggen").val();

	$.ajax({
		url: BASE_URL+'nl/flashquotes/flashquotes/sub,1',   
		type: 'POST',
		data: {
			school: $school,
			naam: $naam,
			adres: $adres,
			postcode: $postcode,
			plaats: $plaats,
			email: $email,
			vlaggen: $vlaggen
		},
		success: function(response) {
			showbedankt();
		}
	});
}


function showbedankt(){
	$('#scholenpakketvragen').hide();
  	$('#bedankt').show();
	$('#slideshow').hide();
}

function PetitieTekenen(){

	$petitie_naam = $("#petitie_naam").val();
	$petitie_adres = $("#petitie_adres").val();
	$petitie_postcode = $("#petitie_postcode").val();
	$petitie_plaats = $("#petitie_plaats").val();
	$petitie_email = $("#petitie_email").val();
	//$petitie_ja = $("#petitie_ja").val();


	if($("#petitie_ja").is(':checked'))
    	$petitie_ja = 'ja'; 
	else
    	$petitie_ja = 'nee'; 


	$.ajax({
		url: BASE_URL+'nl/flashquotes/flashquotes/sub,2',   
		type: 'POST',
		data: {
			petitie_naam: $petitie_naam,
			petitie_adres: $petitie_adres,
			petitie_postcode: $petitie_postcode,
			petitie_plaats: $petitie_plaats,
			petitie_email: $petitie_email,
			petitie_ja: $petitie_ja
		},
		success: function(response) {
			setSlide(7);
		}
	});
}


function setSlide(index) {
    $('#slideshow').cycle(index);

}