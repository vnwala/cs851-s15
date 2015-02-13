




/*
     FILE ARCHIVED ON 18:07:24 Jun 12, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:19:28 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
$(document).ready(function() {
	// get settings cookie, parse it and put values inside body class attribute
	var cookieData = $.cookie('settings');
	
	if(cookieData != null){	
	    var dataPairs = cookieData.split('&');
	    $.each(dataPairs, function(key, dataPair) {
		    var parts = dataPair.split('=');
		    $('body').addClass(parts[1]);
		});
	}
});
