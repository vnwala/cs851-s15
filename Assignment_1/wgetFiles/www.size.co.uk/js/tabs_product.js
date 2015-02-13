/* 
 * Advanced Module pattern (public and private members within a namespace)
 * Creates chassis.tab namespace
 * Note: ; before parenthesis is deliberate
 */

(function ( container, $, document ) { // add in more parameters for context e.g. ( container, jQuery, document, undefined )

	function createModule()  { // Revealing Module Pattern with execution context passed in arguments

		var tabClass = ".tab-container", // please add a new generic tab name .tab-container to the main div

		    init = function() {

			$(function(){
				hideContent();
				addEvents();
			});

		}();

		function addEvents() {
			$(tabClass).find(" .product-tabs li").bind("click", function(event) {
				var tabClass = $(this).attr("class"),
					tabNo = tabClass.split(" ")[0].split("-")[1];
					parentContainer = $(this).parent().parent().parent();

				// hide all tab contents
				$(parentContainer).find(".tab-content").hide();
				// show current tab
				$(parentContainer).find("#content-" + tabNo).show();

				$(this).parent().parent().attr("class", "product-tabs tab-selected-"+tabNo);
			})
			.find("a").bind("click", function(event) {
				event.preventDefault();
			});
		}

		function hideContent() {
			$(".product-up-sells-tabs .tab-content, .product-info-tabs .tab-content").hide(); // hide all
			$(".product-up-sells-tabs #content-5, .product-info-tabs #content-1").show(); // show first tab
		}

		var contract = {

		};

		// Public interface (properties and methods)
		return contract;

	} // end module

	// Public API (assigns to my namespace)
	container.Tabs = createModule();

})( this.chassis || (this.chassis = {}), jQuery, document, undefined ); // end chassis.Tabs (create namespace and context)
// end chassis.Tabs
