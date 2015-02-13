




/*
     FILE ARCHIVED ON 11:41:08 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:56 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
$(document).ready(function() {
	initFormDefaultBehaviour();
});


function initFormDefaultBehaviour() {
	$('.default-value').each(function() {
		var default_value = this.value;
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).addClass("has-user-content");
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				this.value = default_value;
				$(this).removeClass("has-user-content");
			}
		});
	});
}
