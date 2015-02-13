/**
 *
 * CHASSIS 2.0
 *
 * Copyright 2011 Rozario Chivers
 *
 * Dual licensed under the MIT or GPL Version 2 licenses 
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 *
 */

// Product Details Attribute Selector
;(function ( container, $, doc ) { // add in more parameters for context e.g. ( container, document, jQuery, utils )

  function createModule()  { // Revealing Module Pattern with execution context passed in arguments

    // All methods and properties (variables) are private unless within return statement
    var init = function() {
      $(function() { // Private DOM ready
        // display();
		 addSizeEvent();
      }); 
	}(); // end init()
		
    function create() { // Private method

    } // end create()

    function enable() { // Private method

    } // end enable()

    function disable() { // Private method

    } // end disable()

	function addSizeEvent() { // Private method
		// this adds a selected class to the product attribute
		$(".product-size li").live("click", function() {
			$(".product-size li").removeClass("selected");
			$(this).addClass("selected");
                     $('div#errorMessages').html('');
		});
      
    } // end addEvents()

	/*
    function display() { // Private method
		$(".size-table input, .size input, .colourways input").hide();
    } // end display()
    */

    function saveData() { // Private method
       /* persistence management */

    } // end saveData()

    function destroy() { // Public method
       /* clean up namespace for garbage collection */
    	chassis.example = null;
    } // end destroy()

    function destroyOnUnload() { // Private method
       $(window).unload(function() {
         chassis.example.destroy();
       });
    } // destroyOnUnload()
	    
	// public interface
  	var contract = {
  		destroy : destroy // public method
  	}

  		// Public interface (properties and methods)
  		return contract;

    } // end module

	// Public API (assigns to my namespace)
	container.AttributeSelector = createModule();

})( this.chassis || (this.chassis = {}), jQuery, document, undefined ); // create namespace and context
// end chassis.AttributeSelector
