jQuery.fn.postshare = function(options) {

	var defaults = {
		horizontal: true, 
		swidth: 59, 
		minwidth: 1171, 
		position: 'left', 
		leftOffset: 41,
		rightOffset: 10
	};
	var opts = jQuery.extend(defaults, options); 
	var o = jQuery.meta ? jQuery.extend({}, opts, jQuery.data()) : opts;

	var w = jQuery(window).width();
	var postshare = jQuery('#postshare');
	var postsharex = jQuery('#postsharex');
	var parent = jQuery(postshare).parent().width();
	var start = postshare_init();

	function postshare_init(){
	
		// Clean up our IE friendlies
		if (jQuery.browser.msie && jQuery.browser.version < 8) {
			jQuery('.addthis_button_google_plusone').parent().remove();
			jQuery('.addthis_button_expanded').parent().remove();
			jQuery('.addthis_button_tweet').parent().css('margin-right','0');
			//jQuery('.addthis_button_facebook_like').parent().remove();
		}
		
		if (jQuery.browser.msie && jQuery.browser.version < 7) {
			jQuery('#postshare').remove();
			jQuery('#postsharex .addthis_button_tweet').css({
				'width':'80px',
				'overflow':'hidden'
			});
			jQuery('#postsharex').css('display','block');
			return false;
		}
		
		// set the width
		  jQuery(postshare).css('width',o.swidth+'px');
		// set position
		if (o.position == 'left')
			jQuery(postshare).css('marginLeft',(0-o.swidth-o.leftOffset));
		else {
			jQuery(postshare).css('marginLeft',(parent+o.rightOffset));
		}
		
		// set the left-menu's starting position
		jQuery(postshare).css('visibility','visible');
		var startingPos = jQuery(postshare).offset().top;
		
		//decide which to show at page load
		if(w < o.minwidth && o.horizontal) {
			jQuery(postshare).css('display','none');
			jQuery(postsharex).slideDown();
		}
		else {
			//help browser know where we are
			var scrollTop = jQuery(window).scrollTop() + 1;
			jQuery(window).scrollTop(scrollTop);
			//fade in
			jQuery(postshare).fadeIn();
		}
		
		// add window events
		jQuery.event.add(window, "scroll", postshare_scroll);
		jQuery.event.add(window, "resize", postshare_resize);
		
		// Get the INIT position, sends it to 'start' variable
		return startingPos;
	}
	
	function postshare_resize() { 
	//Show appropriate element based on screen size
		var w = jQuery(window).width();
		if(w<o.minwidth){
			jQuery(postshare).fadeOut();
			if(o.horizontal) jQuery(postsharex).slideDown();
		}else{
			//help browser know where we are
			var scrollTop = jQuery(window).scrollTop() + 1;
			jQuery(window).scrollTop(scrollTop);
			// Help Facebook button (ie only)
			jQuery(postshare).fadeIn('', function() {
				jQuery('.connect_widget_number_cloud').css({
					'width':'44px',
					'overflow':'visible',
					'display':'none'
				});
			});
			if(o.horizontal) jQuery(postsharex).slideUp();
		}
	}
	
	function postshare_scroll() {
		var p = jQuery(window).scrollTop();
		var w = jQuery(window).width();
		jQuery(postshare).css('position',((p+14)>start) ? 'fixed' : 'absolute');
		jQuery(postshare).css('top',((p+14)>start) ? '14px' : '');
	}

};
// End post share