(function($)
{
	$.Scroller =
	{
		ios:		false,
		touchid:	false,
		startpos:	0,
		action:		{
						start:	'mousedown',
						end:	'mouseup'
					},
		opts:		{}
	};

	// Scroller				Define the plugin
	$.fn.Scroller = function(options)
	{		
		// build main options before element iteration
		$.Scroller.opts = $.extend({}, $.fn.Scroller.defaults, options);		
		
		// Check for iOS devices
		if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
		{
			$('body').addClass('ios');
			if (!$.fn.Scroller.isPropertySupported('-webkit-overflow-scrolling'))
			{
				$('body').addClass('noscroll');
			}
			return false;
		}
				
		// iterate and reformat each matched element
		return this.each(function()
		{
			var myels = {};
			myels.scroller = $(this);
			myels.scroller.data('scrolling', false);
			myels.track = $('.' + $.Scroller.opts.track, myels.scroller);
			myels.mask = $('.' + $.Scroller.opts.mask, myels.scroller);
						
			if (myels.track.outerHeight() <= parseInt(myels.mask.css('max-height'),10))
			{
				return;
			}
			
			if ($.Scroller.opts.minProducts >= $('li', myels.scroller).length)
			{
				myels.mask.css({ height:'auto', 'max-height':'none', overflow:'visible' });
				return false;
			}
			
			myels.mask.css('overflow','hidden');
			myels.scroller.addClass('scroller');
											
			myels.contentFade = $(jQuery('<span class="'+ $.Scroller.opts.contentFade +'" '+ ($.fn.Scroller.scrolledToBottom(myels) ? ' style="display:none"' : '') +' />'))
			myels.alley = $(jQuery('<span class="'+ $.Scroller.opts.alley +'" />'));
			myels.scrollbar = $(jQuery('<span class="'+ $.Scroller.opts.scrollbar +'" />'));
						
			setTimeout(function()
			{
				// Calculate Heights
				var maskHeight = myels.mask.outerHeight() - 8;
				var trackHeight = myels.track.outerHeight() - 8;
				var ratio = maskHeight / trackHeight;
				myels.scrollbar.data('scrollRatio',ratio);
				
				// Modify elements
				myels.scrollbar.css(
					{
						height: maskHeight * ratio + 'px',
						top: (myels.mask.scrollTop() * ratio) + 'px'
					}
				);
				myels.alley.css({ height: maskHeight + 'px' }).append(myels.scrollbar);
				
				$('.' + $.Scroller.opts.wrap, myels.scroller).append(myels.contentFade);
							
				var eventdata = { myels:myels };
				
				// Add events
				//myels.alley.css('opacity',0.4);
				myels.scroller
					.mouseenter(eventdata, $.fn.Scroller.toggleHover)
					.mouseleave(eventdata, $.fn.Scroller.toggleHover)
					.mousewheel(
						function(e,delta,deltaX,deltaY)
						{
							$.fn.Scroller.scrollMousewheel(e,delta,deltaX,deltaY,myels);
						}
					);
				myels.alley.mousedown(eventdata, $.fn.Scroller.scrollOnClick);
				myels.scrollbar.mousedown(eventdata, $.fn.Scroller.scrollStart);
				$('html').mouseup(eventdata, $.fn.Scroller.scrollStop).mousemove(eventdata, $.fn.Scroller.scrollDrag);
				$('.' + $.Scroller.opts.wrap, myels.scroller).append(myels.alley);
			},40);
		});
	};
	
	$.fn.Scroller.isPropertySupported = function(property)
	{
		return property in document.body.style;
	};
	
	// scrolledToBottom		Detect if the end of the scrollable content has been reached
	$.fn.Scroller.scrolledToBottom = function(myels)
	{
		return myels.mask.scrollTop() + myels.mask.outerHeight() >= myels.track.outerHeight() - (myels.track.children().last().outerHeight() * 0.9);
	};
	
	// scrollDrag			Scroll the content when the scrollbar is grabbed
	$.fn.Scroller.scrollDrag = function(e)
	{
		var myels = e.data.myels;
		if (!myels.scroller.data('scrolling')) return;
		var movePos = 0;		
		var mousepos = e.pageY - myels.alley.offset().top;
		movePos = mousepos - myels.scrollbar.data('clickpos');
		$.fn.Scroller.scrollTo(movePos,myels);
		return false;
	};
	
	// scrollMousewheel		Scroll the slider via mousewheel
	$.fn.Scroller.scrollMousewheel = function(e,delta,deltaX,deltaY,myels)
	{
		e.preventDefault();
		myels.mask[0].scrollTop -= (delta * 30);
		myels.scrollbar.css('top', (myels.mask[0].scrollTop * myels.scrollbar.data('scrollRatio')) + 'px');
		$.fn.Scroller.toggleContentFade(myels);					
		return false;
	};
	
	// scrollOnClick		Scroll the content to the clicked position in the alley
	$.fn.Scroller.scrollOnClick = function(e)
	{
		var myels = e.data.myels;
		var mousepos = e.pageY - myels.alley.offset().top;
		movePos = mousepos - myels.scrollbar.outerHeight() / 2;
		$.fn.Scroller.scrollTo(movePos,myels);
	};
	
	// scrollStart			Begin moving the scrollable content
	$.fn.Scroller.scrollStart = function(e)
	{
		var myels = e.data.myels;
		myels.scrollbar.data('clickpos', e.pageY - myels.scrollbar.offset().top);
		myels.scroller.data('scrolling', true).addClass('scrolling');
		return false;
	};
	
	// scrollStop			Stop moving the scrollable content
	$.fn.Scroller.scrollStop = function(e)
	{
		var myels = e.data.myels;
		$.Scroller.startPos = false;
		myels.scroller.data('scrolling', false).removeClass('scrolling');
	};
	
	// scrollTo				Move the content
	$.fn.Scroller.scrollTo = function(movePos,myels)
	{
		if (movePos < 0)
		{
			movePos = 0;
		}
		else if (movePos + myels.scrollbar.outerHeight() > myels.alley.height())
		{
			movePos = myels.alley.height() - myels.scrollbar.outerHeight();
		}
		myels.scrollbar.css('top', movePos + 'px');
		myels.mask[0].scrollTop = movePos / myels.scrollbar.data('scrollRatio');
		$.fn.Scroller.toggleContentFade(myels);
		return false;
	};

	// toggleContentFade	Toggle the content fade visible/hidden
	$.fn.Scroller.toggleContentFade = function(myels)
	{
		if ($.fn.Scroller.scrolledToBottom(myels))
		{
			myels.contentFade.css('display','none');
		}
		else
		{
			if (myels.contentFade.css('display') === 'none')
			{
				myels.contentFade.css('display','block');
			}
		}
	};
	
	// toggleHover			Toggle the hover state for the scrollable content
	$.fn.Scroller.toggleHover = function(e)
	{
		var myels = e.data.myels;
		var hovered = $(this);
		
		if (hovered.hasClass('hover'))
		{
			//myels.alley.fadeTo(200,0.4);
			hovered.removeClass('hover');
		}
		else
		{
			//myels.alley.fadeTo(200,1);
			hovered.addClass('hover');
		}
	};
	
	// defaults				Plugin Defaults
	$.fn.Scroller.defaults =
	{
		minProducts:	0,						// (int) Defaults to 0, or no minimum
		wrap:			'scrollerWrap',
		mask:			'scrollerMask',
		track:			'scrollerTrack',
		contentFade:	'scrollerContentFade',
		alley:			'scrollerAlley',
		scrollbar:		'scrollbar'
	};
})(jQuery);