/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
$(document).ready(function() {
	$box = $('#superGallery .box');
	$superGallery = $('#superGallery');
	$superGallerySec1 = $('#superGallery-sec1');
	$btnSuperGallery = $('#btnSuperGallery');
	var slideSpeed = 200;
	var sdxOpen = 0;
	$("img.lazy").lazyload({
		event : "sporty"
	});
		$('#btnSuperGallery').click(function(){
			var timeout = setTimeout(function() {
				$("img.lazy").trigger("sporty")
			}, 200);
			if(sdxOpen == 0){
				$superGallery.slideDown(0, function() {
					var $superGallerySec1 = $('#superGallery-sec1').imagesLoaded( function() {
						$superGallerySec1.isotope({
							itemSelector : '.box',
							animationOptions: {
								duration: 0,
								easing: 'linear',
								queue: false
							},
							//layoutMode : 'masonry'
							layoutMode: 'cellsByRow',
							cellsByRow: {
								columnWidth: 64,
								rowHeight: 64
							},
							onLayout: function() {
								sdxOpen = 1;
								console.log('sdxOpen = '+ sdxOpen);
							}
						})
					});
				});
			}else if(sdxOpen == 1){
				$superGallery.slideUp(slideSpeed, function() {
					sdxOpen = 2;
					console.log('sdxOpen = '+ sdxOpen);
				});
			}else if(sdxOpen == 2){
				$superGallery.slideDown(slideSpeed, function() {
					sdxOpen = 1;
					console.log('sdxOpen = '+ sdxOpen);
				});
			}
		});



});