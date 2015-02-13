$(function(){
	
	// ------------------------------------------------------------------------------------
	// jQuery UI elements 
	
	// Sidebar Accordion
	$('.accordion').accordion({ 
		collapsible : true,
		heightStyle: "content"
	});
	
	// Sidebar Accordion - non-collapseable
	$('.accordion-nocollapse').accordion({ 
		collapsible : false,
		heightStyle: "content"
	});
	
	// Add jQuery UI tabs to class
	$('.tabs').tabs({
		fx:	{ opacity: 'toggle' }
	});

	// Add jQuery UI datepicker to class
	$('.datepicker').datepicker({
		dateFormat : "yymmdd"
	});

	// ------------------------------------------------------------------------------------
	// Gallery thumbnail scroller.
	
	if($('#gallery-scroller').length > 0)
	{
		window.onload = function() {
			$("#gallery-scroller").thumbnailScroller({
				scrollerType 		: "clickButtons",
				scrollerOrientation	: "horizontal",
				scrollSpeed 		: 800
	    	});
	    };
	}

	$('.jTscroller a').click(function(e){
	    e.preventDefault();
	    
	    var $this       = $(this);
	    var $container  = $('#now-showing');
	    var $thumbs 	= $this.parent().find('img');

	    var $src        = $this.prop('href');
	    var $img 		= $this.find('img');
	    var $caption	= $img.prop('title');
	    var $byline		= $img.prop('alt');

	    var $m_img 		= $container.find('img');
	    var $m_caption	= $container.find('.credit');
	    var $m_byline	= $container.find('.caption');
	    var $height     = $m_img.height();

	    if( ! $img.hasClass('active') )
	    {
	    	$thumbs.each(function() {
		    	$(this).removeClass('active');
		    });
		    
		    $img.addClass('active');
		    $container.height($height);
		    
		    $m_byline.hide();
		    $m_caption.hide();
		    
		    $m_img.hide().prop('src', $src).load(function() {
		       $(this).fadeIn('slow');
		       $m_byline.text($byline).show();
		       $m_caption.text($caption).show();
		       $container.height('auto');
		    }); 	
	    }

	});

	// ------------------------------------------------------------------------------------
	// Homepage carousel
	$('#slider').anythingSlider({
		enableStartStop	: true,
		autoPlay		: true,
		resizeContents 	: true,
		delay 			: 5000,
		buildArrows		: false,
    	buildNavigation	: true,
    	buildStartStop	: false,
    	hashTags		: false,
    	startPanel		: 1
	});

	// ------------------------------------------------------------------------------------
	// Uniform form styles plugin
	
	$("select, input:checkbox, input:radio, input:file").uniform();
	
	// ------------------------------------------------------------------------------------
	// Article Text Large/Small Toggler

	$('.tools').find('.resize').on('click', function(e){
	
		e.preventDefault();
	
		var paragraphs = $('#article p');
		
		$(this).toggleClass('active');
		
		paragraphs.each(function(){
			$(this).toggleClass('larger');
		});

		$('.credit1, .caption1').toggleClass('larger');
	});
	
	// ------------------------------------------------------------------------------------
	// Adjust height of details rail on events page.
	
	if($('.details').length > 0)
	{
		$('.details').each(function(){
		    $this = $(this);
		    
		    var padTop = parseInt($('.details').css('padding-top').match(/\d+/));
		    var padBot = parseInt($('.details').css('padding-bottom').match(/\d+/));
		    var leftHt = $this.prevAll('.description:first').height();
		   	
		   	if($this.height() < leftHt)
		   	{
		   		$this.height( leftHt - (padTop + padBot) );
		   	}
		      
		});
	}

	// ------------------------------------------------------------------------------------
	// Activate postshare on articles
	
	if ( $('#postshare').length ) {
		$('#postshare').postshare({ 
			swidth: 60, 
			minwidth: 1180,  
			leftOffset: 60
		});
	}

	// ------------------------------------------------------------------------------------
	// Remove the line breaks in the classifieds list in footer

	$('#footer .blocks .last ul').find('br').remove();

	// ------------------------------------------------------------------------------------
	// Try to hide the empty advertisement spots if no ad has been loaded from OAS.

	$('.advertisement').each(function(){
    
	    var $this = $(this);
	    var $img  = $this.find('img').attr('src');
	    
	    if($img)
	    {
	        var is_empty = $img.match(/empty\.gif/);
	        
	        if(is_empty)
	        {
	            // Hide the advertisement container
	            $this.hide();
	        }
	    }
	    
	});

	// ------------------------------------------------------------------------------------
	// Add a few functions to the jQuery library

	if(typeof jQuery.fn.getUrlVars == "undefined" && typeof jQuery.fn.getUrlVar == "undefined")
	{
		jQuery.extend({
		    getUrlVars: function ()
		    {
		        var vars = [],
		            hash;

		        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

		        for(var i = 0; i < hashes.length; i++)
		        {
		            hash = hashes[i].split('=');
		            vars.push(hash[0]);
		            vars[hash[0]] = hash[1];
		        }

		        return vars;
		    },
		    getUrlVar: function (name)
		    {
		        return jQuery.getUrlVars()[name];
		    }
		});
	}

	// ------------------------------------------------------------------------------------
	// Trigger the hover action on click for mobile users.
	
	$('#mainnav > li:contains("Data")').on('click hover', function(){
	    $(this).trigger('hover');
	});

});