(function($)
{
	$.Popup =
	{
		overlay:		'',
		trigger:		'',
		inputSelector:	'',
		opts:			{}
	};
		
	// Popup			Define the plugin
	$.fn.Popup = function(options)
	{		
		// build main options before element iteration
		$.Popup.opts = $.extend({}, $.fn.Popup.defaults, options);
		
		// Check for the overlay
		if ($($.Popup.opts.overlay).length)
		{
			$.Popup.overlay = $($.Popup.opts.overlay);
		}
		else
		{
			$.Popup.overlay = $(jQuery('<div '+ ($.Popup.opts.overlay.match(/\./) === null ? 'id' : 'class') +'="'+ $.Popup.opts.overlay.replace(/[\.#]/ig, '') +'" />'));
			$('body').append($.Popup.overlay);
		}
		
		$.Popup.trigger = this;
		
		// Check for load trigger
		if (!$.Popup.opts.showOnLoad && $.Popup.trigger.length === 1 && $.Popup.trigger.is('body'))
		{
			$.Popup.opts.showOnLoad = true;
		}
		
		// Iterate over our elements
		return this.each(function()
		{
			var trigger = $(this),
				popup;
			
			// Store a reference to our popup
			if ($.Popup.opts.popup)
			{
				popup = $($.Popup.opts.popup);
			}
			else if ($('.js_popup').length === 1)
			{
				popup = $('.js_popup');
			}
			else
			{
				popup = $(jQuery('<div class="js_popup popup iframe'+ ' '+trigger.attr("class") +'"><div class="wrap"><iframe /><a class="close" href="#"><span class="icon"></span><span class="text">Close</span></a></div></div>'));
				$('body').append(popup);
			}
			
			// Setup events
			popup.bind('click', function(e)
			{
				e.stopPropagation();
			});
			
			$('html').bind('click', function(e)
			{
				$.fn.Popup.closePopup(popup);
			});
			
			$($.Popup.opts.closeButton, popup).bind('click', function()
			{
				$.fn.Popup.closePopup(popup);
				return false;
			});
			
			if ($.Popup.opts.triggerOnLoad)
			{
				$.fn.Popup.showPopup(popup);
			}
			else
			{
				trigger.bind('click', function(e)
				{
					if ($(this).attr('rel') === 'window')
					{
						newwindow = window.open($(this).attr('href'), $(this).text(), 'height=580, width=990, scrollbars=1, resizable=1');
						if (window.focus)
						{
							newwindow.focus();
						}
					}
					else
					{
						$.fn.Popup.showPopup(popup, e);
					}
					return false;
				});
			}
		});
	};
	
	$.fn.Popup.closePopup = function(popup, e)
	{
		$($.Popup.opts.closeButton, popup).css('display','none');
		popup.fadeOut('fast', function()
		{
			$.Popup.overlay.fadeOut('fast');
			$($.Popup.opts.hideEls).css('visibility', 'visible');
			
			if (typeof $.Popup.opts.onClose === 'function')
			{
				$.Popup.opts.onClose();
			}
		});
	};
	
	$.fn.Popup.showPopup = function(popup, e)
	{
		if (typeof $.Popup.opts.onOpen === 'function')
		{
			$.Popup.opts.onOpen();
		}
		
		// Get the window dimensions
		var wheight = $(window).height(),
			wwidth = $(window).width(),
			closeButton = $($.Popup.opts.closeButton, popup),
			ptop,
			etarget = $(e.target);

		if (etarget.is("a"))
		{
			e.preventDefault();
		}
		else
		{
			etarget = etarget.closest("a");
		}

		// set the starting point for the CSS of the overlay
		$.Popup.overlay.css(
			{
				height: $(document).height()+'px',
				width: '100%',
				top: 0,
				left: 0,
				opacity: 0,
				display: 'block'
			}
		);
		
		// Calculate lightbox top position
		ptop = ($(window).height() <= popup.outerHeight() ? 15 : (wheight / 2) - (popup.outerHeight() / 2));
		popup.css(
			{
				top: parseInt(ptop + $(window).scrollTop()) + 'px',
				left: '50%',
				'margin-left': '-' + (popup.outerWidth() / 2) + 'px'
			}
		);
		
		// If loading via iframe, do that now
		if ($('iframe', popup).length !== 0)
		{
			$('iframe',popup).attr('src',etarget.attr('href')).load(function()
		    {
				// Open the popup
				$.Popup.overlay.fadeTo('normal', 0.7, function()
				{
					$($.Popup.opts.hideEls).css('visiblity', 'hidden');
					popup.fadeIn("normal", function()
					{
						closeButton.css('display','');
					});
				});
		    });
		}
		else
		{
			// Open the popup
			$.Popup.overlay.fadeTo('normal', 0.7, function()
			{
				$($.Popup.opts.hideEls).css('visiblity', 'hidden');
				popup.fadeIn("normal", function()
				{
					closeButton.css('display','');
				});
			});
		}
	};
	
	// defaults				Plugin Defaults
	$.fn.Popup.defaults =
	{
		showOnLoad:				false,		// Boolean. Load the popup on page load
		popup:					false,		// The popup window
		closeButton:			'.close',	// Selector.
		overlay:				'#overlay',	// Selector. If element does not exist, one is created.
		hideEls:				'select',	// Selector. Elements to hide (such as select fields) when loading the popup.
		onOpen:					false,		// A function to run on open
		onClose:				false		// A Function to run on close
	};
})(jQuery);