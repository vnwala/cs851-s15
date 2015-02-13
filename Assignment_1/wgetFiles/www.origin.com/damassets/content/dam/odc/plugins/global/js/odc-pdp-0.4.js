/* This script detects if the pdp is a odc-pdp page and replaces the href of the CTA button with the buy href of the my-offers plugin */

// Check for /store/odc-pdp/ in the url
if (window.location.pathname.indexOf("/store/odc-pdp/") != -1)
{
	var plugin_url = "https://www.origin.com/damassets/content/dam/odc/plugins/my-offers/0.3/js/jquery.odc.my-offers-0.3.min.js";
	
	// Get the CTA button
	var $cta_btn = $("#main > .main-mod-right > .legal > div > .btn-large");
	
	// Inject the plugin <div>
	$cta_btn.after('<div id="my-offers"></div>')
	
	// This will get load the script without the cb
	getOdcMyOffersPlugin = function( url, options )
	{
		options = $.extend(options || {}, 
		{
			dataType: "script",
			cache: true,
			url: url
		});
		return jQuery.ajax(options);
	};

	// load the my-offers pluggin js
	getOdcMyOffersPlugin(plugin_url).done(function(script, textStatus)
	{
		if (textStatus == 'success')
		{
			// Get the master_title, platform, type and edition from the uri
			var path_parts = window.location.pathname.split('/');
			
			// initialize the plugin in the #my-offers <div>
			var my_odc_offer = $("#my-offers").odcMyOffers(
			{
				masterTitle: path_parts[4],
				platform: path_parts[5],
				type: path_parts[6],
				edition: path_parts[7],
				profile: "odc-pdp",
				modTemplate: '<div class="offers" style="display: none;">#|#OFFER-ITEMS#|#</div>',
				offerItemTemplate: '' +
				'<div class="offer item-#|#INDEX#|# ">' + 
					'<a href="" class="btn-large btn-warning add-to-cart buy-btn" id="odc-pdp-cta-link">' + $cta_btn.text().trim() + '</a>' +
				'</div>',
				ready: function()
				{
					// Get the new href from the plugin html
					var href= $("#odc-pdp-cta-link").attr("href");
				
					// unbind "add to (mini) cart" 
					$cta_btn.unbind("click");
				
					// replace href with the new one.
					$cta_btn.attr("href", href);
				
					// Hide Compare table CTAs
					$(".editions.module .info-column > a.btn-warning").hide();
				
					// Binds a GA Event to the CTA Click
					$cta_btn.on('click', function()
					{
						my_odc_offer.fireGaEvent("odc.plugin.button", "click", "cta.origin");
					});
				}
			});
		}
	});
}