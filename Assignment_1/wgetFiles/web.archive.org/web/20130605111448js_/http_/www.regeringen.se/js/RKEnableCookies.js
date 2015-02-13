




/*
     FILE ARCHIVED ON 11:38:44 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:59 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var cookieName = "enableCookies";

function isCookiesEnabled() {
	return $.cookie(cookieName)!=null;
}


function enableCookies() {
	
	var checked = $("#enableCookieCheckBox").attr('checked');
	
	if(checked) {

		$.cookie(cookieName, Math.round((new Date()).getTime() / 1000), { expires: 3650, path: '/' });
		window.location.search = "setEnableCookies=true";		
		//location.reload();
	}
	
}

function unconditionalEnableCookies() {
	if(!isCookiesEnabled()){
		$.cookie(cookieName, Math.round((new Date()).getTime() / 1000), { expires: 3650, path: '/' });
		window.location.search = "setEnableCookies=true";		
	}
}