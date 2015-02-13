$(window).load(function() {
	"use strict";
    /* ==============================================
    PRELOADER
    =============================================== */
    var preloaderDelay = 800;
    var preloaderFadeOutTime = 1000;

    function hidePreloader() {
        var loadingAnimation = $('#loading-animation');
        var preloader = $('.main');

        loadingAnimation.fadeOut();
        preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
    }

    hidePreloader();

});

/* DOCUMENT READY  ----------- */
jQuery(document).ready(function() {
		
"use strict";
	
	/* ==============================================
    DIV's POSITION
    =============================================== */
	
	var windowHeight = $(window).height();
	var homePageHeight = $('#homepage').height();
	
	if (windowHeight >= homePageHeight){
		$('#homepage').css("padding-top", ((windowHeight-homePageHeight)/2));
		$('#homepage').css("padding-bottom", ((windowHeight-homePageHeight)/2));
	}

	$(window).resize(function() {		
		var windowHeight = $(window).height();
		var homePageHeight = $('#homepage').height();

		if (windowHeight >= homePageHeight){
			$('#homepage').css("padding-top", ((windowHeight-homePageHeight)/2));
			$('#homepage').css("padding-bottom", ((windowHeight-homePageHeight)/2));
		}
	});
	
	/* ==============================================
    /* TESTIMONIALS CAROUSEL
	================================================== */
	$('.carousel').carousel();		

}); /* END DOCUMENT READY  ----------- */

/* FUNCTIONS  ----------- */