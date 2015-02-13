history.navigationMode = 'compatible';

// Header Customer Service Link Change...
var tertNav = document.getElementById("tertiaryNavigation"),
	tertNavLink = tertNav.children[2].children[0];

tertNavLink.href = '/customer-service/ordertracking/?cm_re=Home-_-Header-_-wheres-my-order';
tertNavLink.innerHTML = 'Where\'s my order?';

jQuery( document ).ready(function( $ ) {

	// test for touch
	function isTouchDevice(){
		return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
	}

	// Set HTML Data Attributes for easy touch/cross-browser styling
	document.documentElement.setAttribute('data-ua', navigator.userAgent);
   	if (isTouchDevice()) document.documentElement.setAttribute('data-touch', '');

   	// Legacy touch support styling
	$('body').addClass('no-touch');
	if (isTouchDevice()) {
		$('body').removeClass('no-touch');
	}

	// Newsletter Signup Form (attach SZ_to ETSubscriberKey)
	$("#subscribeForm").submit(function () {
	    var emailValue = $(" input[name='Email Address']").val();
	    $('#subscribeForm input[name="ETSubscriberKey"]').val("SZ_" + emailValue);
	    $('#subscribeForm').submit();
	    return false;
	});

	//Fix product page recently viewed sale items. moved the "was" price so "Now" sits in right place.
	$('#carousel3 h3').after($('#carousel3 .was'));

	// Brands tagging
	$items = $('#brandsMenuItems li a');

	$items.each(function(){
	  $text = $(this).text().replace(/ /g,"-");
	  $string = 'Header-_-brands-_-dd-'+$text;
	  $(this).attr('manual_cm_re', $string);
	});

	// Blog Bar
	var $blogBar = $('#blog-bar'),
		$blogExcerpt = $('.blog-excerpt');

	$.ajax({
		type: "GET",
		url: "http://sizestores.co.uk/hq/tag/featured/feed/",
		dataType: "xml",
		success: function(xml) {

			var contain = $("#blog-excerpt");
			var limit = 1;

			$(xml).find('item').each(function(index){
			if( index < limit ){
				var title = $(this).find('title').text();
				var url = $(this).find('link').text();
				var pubDate = $(this).find('pubDate').text();
				var excerpt = $(this).find('description').text();
				var featured = $(this).find('featured').text();
				var content = $(this).find('content\\:encoded, encoded').text();
				$('<a class="article" href="'+url+'" manual_cm_re="home-_-TEST-_-blog-featured"></a>').html(featured+'<h3 class="blog-title">'+title+'</h3><p>'+excerpt+'</p><span class="more-link">Read More</span>').prependTo(contain);
				return;
			}

			});//end each
		}
	});

	$('.blog-bar-header h3, .blog-bar-header img').click(function(){
		if (!$blogBar.hasClass('blog-open')) {
			$blogBar.toggleClass('blog-open');
			$blogExcerpt.delay(500).slideToggle();
		}
	});
	$('.blog-open .blog-bar-close').live('click touchstart', function(){
		$blogExcerpt.slideToggle('fast', function(){
			$blogBar.toggleClass('blog-open');
		});
	});




	// var mypos = $(window).scrollTop(),
	// 	up = false,
	// 	newscroll;

	// if ($('#blog-bar').is(':visible')) {
	// 	 $('#blog-bar').addClass('on-show')
	// };

	// $(window).scroll(function () {
	//     newscroll = $(window).scrollTop();
	//     if (newscroll > mypos && !up) {
	//         $('#blog-bar.on-show').stop().toggleClass('move-up');
	//         up = !up;
	//     } else if(newscroll < mypos && up) {
	//         $('#blog-bar.on-show').stop().toggleClass('move-up');
	//         up = !up;
	//     }
	//     mypos = newscroll;
	// });



	// Overlay test
	// var $exposer = $('.exposer'),
	// 	$overlayer = $('#overlayer');

	// $exposer.hover(function() {
	//     $(this).css({
	//     	'z-index' : '99999',
	//     	'position' : 'relative'
	//     });
	//     $overlayer.fadeTo(300, 0.5);
	// }, function() {
	//     $overlayer.fadeOut(300, function(){
	//         $exposer.attr('style','');
	//     });
	// });


});


if (!document.getElementById('scene7wrapper')) {
	// QUICKVIEW

	plu = ''; 																				// We need to assign the plu so the viewer-lite.js script can

	jQuery(document).ready(function($) {

	    $(document).on('click', '#addToBag', function() {
	        AddItem('ShoppingCart');														// If add to bag is clicked, run the add to bag function...
	    });

	    $(document).on('click', '.quickview-more-images', function(e) {
	    	e.preventDefault();
	        $(this).toggleClass('more-images-active');
	        $('#thumbs').toggleClass('more-images-active');										// open more images, start animation
	    });

	    $(".product-size li").live("click", function() {									// function from jdfilterparent.js to work sizes
			$(".product-size li").removeClass("selected");
			$(this).addClass("selected");
	        $('div#errorMessages').html('');
		});

		$(document).on('click', '.quickview', function(e) {									// When a .quickview link is clicked
			e.preventDefault();


			var href = $(this).attr('href').replace('http://size.co.uk', ''); 				// Get the url and remove the domain, not needed on live site.

			plu = href.substr(href.length-7, 6);											// Get the plu, because of above comment

			$('#overlayer').fadeTo('fast',0.8,function(){									// Fade in the overlay
				$('body').append('<div class="quickview-modal modal-loading"><span class="close-modal"></span></div>');		// Add in a modal window
				loadQuickView(href);														// load the product
				$('html').addClass('overflow-hidden');										// Stop scrolling whilst overlay is open
			});
		});
		$('#overlayer').on('click', function(){												// when the overlay is clicked
			$(this).fadeOut('fast', function(){												// Fade it out

				$('.quickview-modal').remove();								// Remove the modal element from dom

				$('html').removeClass('overflow-hidden');
								// alow the page to be scrolled again
			});
		});
		$(document).on('click', '.close-modal', function(){
			$('#overlayer').click();
		});

		if ($('body').attr('id') == 'product-list') {										// if we're on the product list page, build quickview links
			buildQuickView();
		};

		$(document).ajaxComplete(buildQuickView);											// If pagination is clicked, we'll need to build more links
	});

	function AddItem(type) {

	    var ischecked = false;
	    var attrValueArr = document.OrderItemAddForm.attrValue;
	    if (attrValueArr.length == null) {
	        if (attrValueArr.checked) ischecked = true;
	    } else {
	        for (var i = 0; i < attrValueArr.length; i++) {
	            if (attrValueArr[i].checked) {
	                ischecked = true;
	                break;
	            }
	        }
	    }
	    if (ischecked) {
	        if (type == 'ShoppingCart') {
	            var action = "/webapp/wcs/stores/servlet/OrderItemAdd";
	            var invokeCommandType = getinvokeCommandType();
	            // set action as OrderItemUpdate command
	            if (invokeCommandType == 1) {
	                action = "/webapp/wcs/stores/servlet/OrderItemUpdate";
	            }
	            // sets action as OrderItemAdd command and remove orderItemId, which is not required to invoke OrderItemAdd command
	            if (invokeCommandType == 2) {
	                //document.forms["OrderItemAddForm"].removeChild(document.OrderItemAddForm.orderItemId);
	                document.OrderItemAddForm.orderItemId.value = "";
	            }
	            // invoke command if max quantity doesn't exceed 2
	            if (invokeCommandType != 0) {
	                if (document.getElementById("defaultAddressId") != null) {
	                    document.OrderItemAddForm.addressId.value = document.getElementById("defaultAddressId").value
	                    document.OrderItemAddForm.shipModeId.value = document.getElementById("defaultShipModeId").value
	                }
	                document.OrderItemAddForm.addonly.value = 'true';
	                Add2ShopCart(document.OrderItemAddForm, action);
	            }
	        } else {
	            Add2WishList(document.OrderItemAddForm);
	        }
	    } else
	        document.getElementById("errorMessages").innerHTML = '<font color="red" size="8em">Please select Size.</font>';															 // function to add bag, from page source. Yes, source...
	};

	function getinvokeCommandType() {
	    // List of current order item ids in the shopping cart in the format <sku id>:<orderitem id>:<quantity>
	    var currentOrderItemIds = document.getElementById('currentOrderItemIds').value;

	    // value of selected sku, which is set during selection of size attribute
	    var curretItemId = document.getElementById('selectedSkuId').value;
	    if (curretItemId == '') {
	        if (document.OrderItemAddForm.attrValue.length == null) // only one size
	        {
	            document.OrderItemAddForm.attrValue.click();
	            curretItemId = document.getElementById('selectedSkuId').value;
	        }
	    }

	    // if shop cart is not empty
	    if (currentOrderItemIds != '') {
	        // substring to remove an extra comma(,) from the string
	        currentOrderItemIds = currentOrderItemIds.substring(0, currentOrderItemIds.length - 1);
	        // split the string based on the comma character into an array
	        var currentOrderItemsArray = currentOrderItemIds.split(',');

	        // for each item in the array check for valid sku for invoking OrderItemUpdate
	        // return 1 if valid to invoke OrderItemUpdate, 0 if shopcart has item but exceeds max quantity
	        for (var i = 0; i < currentOrderItemsArray.length; i++) {

	            // split <sku id>:<orderitem id>:<quantity> based on colon(:) into an array
	            var itemIdForShopCartOrderItem = currentOrderItemsArray[i].split(':');

	            // check if selected sku id is same as the one in shopcart
	            if (curretItemId == itemIdForShopCartOrderItem[0]) {
	                // Assign the orderItemId from shopcart, required while invoking OrderItemUpdate command
	                document.OrderItemAddForm.orderItemId.value = itemIdForShopCartOrderItem[1]; //currentOrderItemsArray[i].substring(currentOrderItemsArray[i].indexOf(':')+1,currentOrderItemsArray[i].length);
	                // qualifiedQuantity needs to be computed so that OrderItemUpdate shouldn't update the shopcart with more than allowed quantity
	                var qualifiedQuantity = parseInt(itemIdForShopCartOrderItem[2]) + eval(document.OrderItemAddForm.quantity.value);
	                // check if the quantity is qualified
	                if (qualifiedQuantity <= 2) {
	                    document.OrderItemAddForm.quantity.selectedIndex = document.OrderItemAddForm.quantity.selectedIndex + 1;
	                } else {
	                    // alert with an error message and return 0, which means no command is invoked
	                    document.getElementById("errorMessages").innerHTML = '<font color="red" size="8em">Maximum quantity you can order is 2.</font>';
	                    return 0;
	                }
	                // Invoke OrderItemUpdate command since selected sku is same as the one in shop cart
	                return 1;
	            }
	        }
	    }
	    // Invoke OrderItemAdd command since selected sku is not in shop cart
	    return 2;													 // as above
	};



	function buildQuickView(){
		jQuery('.product-list .product').each(function(index, el) {							// for each .product
			if (!jQuery(this).find('.quickview').length) {									// if it doesn't already have a quickview button...
				var href = $(this).find('a').attr('href');
				var qlink = '<a class="quickview" href="'+href+'">Quickview</a>';			// create one with the products href
				jQuery(this).find('.product-image').after(qlink);													// append it to the product

			};
		});
	};

	function loadQuickView(href){															// pass in the url to load from quickview link
		jQuery.ajax({
			type: 'GET',
			url: href,			   											// we only want the main content container
			dataType: 'html',
			success: function(data){
				var $data = jQuery(data);													// create a jquery object from the response

				if (document.getElementById('product-list')) {
					var container = jQuery(data).find('#pdp-content');    						// make sure we're targeting the container
				} else {
					var container = jQuery(data).filter('#page');    						// make sure we're targeting the container

					if (container.find('script[src*="site-scripts.js"]')) {
						container.find('script[src*="site-scripts.js"]').remove();
					}
					if (container.find('script[src*="viewer.js"]')) {
						container.find('script[src*="viewer.js"]').remove();
					}
					// this was hella annoying. Roll on size v2...
				}
				var category = container.find('#breadCrumbTrail a:eq(1)').text().toUpperCase();

																							// remove anything we're not using from the object
				container.find('#breadCrumbTrail, .product-colour, #sizechartTab, .tab-container, .newsletter-sub, .footer').remove();
																							// add a more info button
				container.find('#buyButton').append('<a class="primary more-info" href="'+href+'">More Info</a>');

				container.find('#main').append('<a class="quickview-more-images" href=""></a>'); // add a more images button

				if (category == 'FOOTWEAR') {
					container.find('.product-size h3').text('Please note these are UK sizes'); 	// Change text
				} else {
					container.find('.product-size h3').text('');
				}

				jQuery('.quickview-modal').append(jQuery(container));						// append the modified response to the modal
				jQuery('.quickview-modal').removeClass('modal-loading');					// get rid of loading spinner
				jQuery('#pdp-content').addClass('js-fadein');								// fade in the content - defined in CSS



				// Create Product View Tracking
				var pName = jQuery('.quickview-modal .product-name').html().split('&nbsp;'),
					pName = pName[1].trim(),
					pName2 = 'Buy '+pName+' - Mens Fashion Online at Size?',
					catID = jQuery('[name="categoryId"]').val(),
					sku = jQuery('#productId').val();

					cmCreateProductviewTag(null, sku, pName, catID, "10701", "N", "11739", "", "quickview-_--_--_--_-"+plu+"-_-");
			},
			error: function(xhr, status, error) {
			  var err = eval("(" + xhr.responseText + ")");
			  console.log(err.Message);
			}
		});
	};
};
