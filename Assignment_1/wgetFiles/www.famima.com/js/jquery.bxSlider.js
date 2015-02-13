/**
*
*
* bxSlider: Content slider / fade / ticker using the jQuery javascript library.
*
* Author: Steven Wanderski
* Email: wandoledzep@gmail.com
* URL: http://bxslider.com
* 
*
**/

jQuery.fn.bxSlider = function(options){
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Declare variables and functions
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var defaults = {
		mode: 'slide',
		speed: 500,
		auto: false,
		auto_direction: 'left',
		pause: 2500,
		controls: true,
		prev_text: 'prev',
		next_text: 'next',
		width: j$(this).children().width(),
		prev_img: '',
		next_img: '',
		ticker_direction: 'left',
		wrapper_class: 'container'
	};
	
	options = j$.extend(defaults, options);
	
	if(options.mode == 'ticker'){
		options.auto = true;
	}
	
	var j$this = j$(this);

	var j$parent_width = options.width;	
	var current = 0;
	var is_working = false;
	var child_count = j$this.children().size();
	var i = 0;
	var j = 0;
	var k = 0;
		
	function animate_next(){
		
		is_working = true;
		
		j$this.animate({'left':'-' + j$parent_width * 2 + 'px'}, options.speed, function(){
			
			j$this.css({'left':'-' + j$parent_width + 'px'}).children(':first').appendTo(j$this);
			
			is_working = false;
			
		});		
		
	}
	
	function animate_prev(){
		
		is_working = true;
		
		j$this.animate({'left': 0}, options.speed, function(){
			
			j$this.css({'left':'-' + j$parent_width + 'px'}).children(':last').insertBefore(j$this.children(':first'));
			
			is_working = false;
			
		});				
		
	}
	
	function fade(direction){
				
		if(direction == 'next'){
		
			var last_before_switch = child_count - 1;
			var start_over = 0;
			var incr = k + 1;
			
		}else if(direction == 'prev'){
			
			var last_before_switch = 0;
			var start_over = child_count -1;
			var incr = k - 1;
			
		}		
		
		is_working = true;
		
		if(k == last_before_switch){
			
			j$this.children().eq(k).fadeTo(options.speed, 0, function(){j$(this).hide();});
			//j$this.children().eq(k).css({'left':'-9999px'});
			j$this.children().eq(start_over).show().fadeTo(options.speed, 1, function(){
				
			is_working = false;
	
			k = start_over;
			
			});
			
		}else{
		
			j$this.children().eq(k).fadeTo(options.speed, 0, function(){j$(this).hide();});
			//j$this.children().eq(k).css({'left':'-9999px'});
			j$this.children().eq(incr).show().fadeTo(options.speed, 1, function(){
			
			is_working = false;
			
			k = incr;
			
			});
				
		}		
		
	}
	
	function add_controls(){
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Check if user selected images to use for next / prev
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		if(options.prev_img != '' || options.next_img != ''){
			
			j$this.parent().append('<a class="slider_prev" href=""><img src="' + options.prev_img + '" alt=""/></a><a class="new_slider_next" href=""><img src="' + options.next_img + '" alt="" /></a>');
			
		}else{
		
			j$this.parent().append('<a class="slider_prev" href="">' + options.prev_text + '</a><a class="new_slider_next" href="">' + options.next_text + '</a>');
		
		}
		
		j$this.parent().find('.slider_prev').css({'float':'left', 'outline':'0'});
		j$this.parent().find('.new_slider_next').css({'float':'right', 'outline':'0'});
		
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Accomodate padding-top for controls when elements are absolutely positioned (only in fade mode)
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if(options.mode == 'fade'){
			
			j$this.parent().find('.slider_prev').css({'paddingTop' : 30})
			j$this.parent().find('.new_slider_next').css({'paddingTop' : 30})
			
		}		
		                                                       
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Actions when user clicks next / prev buttons        
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		                                                       
		j$this.parent().find('.new_slider_next').click(function(){		
			
			if(!is_working){
				
				if(options.mode == 'slide'){
										 
					animate_next();
					
					if(options.auto){
						
						clearInterval(j$.t);
						
						j$.t = setInterval(function(){animate_next();}, options.pause);
						
					}
				
				}else if(options.mode == 'fade'){
					
					fade('next');
					
					if(options.auto){
						
						clearInterval(j$.t);
						
						j$.t = setInterval(function(){fade('next');}, options.pause);
						
					}

					
				}
				
			}
								
			return false;
					
		});	
		
		j$this.parent().find('.slider_prev').click(function(){	
			
			if(!is_working){
				
				if(options.mode == 'slide'){
										 
					animate_prev();
					
					if(options.auto){
						
						clearInterval(j$.t);
						
						j$.t = setInterval(function(){animate_prev();}, options.pause);
						
					}
						
				}else if(options.mode == 'fade'){
					
					fade('prev');
					
					if(options.auto){
					
						clearInterval(j$.t);
					
						j$.t = setInterval(function(){fade('prev');}, options.pause);
					
					}
					
				}
				
			}
					
			return false;
					
		});	
	
	}
	
	
	function ticker() {
		
		if(options.ticker_direction == 'left'){
				
			j$this.animate({'left':'-' + j$parent_width * 2 + 'px'}, options.speed, 'linear', function(){
			
				j$this.css({'left':'-' + j$parent_width + 'px'}).children(':first').appendTo(j$this);
			
				ticker();
			
			});		
		
		}else if(options.ticker_direction == 'right'){
			
			j$this.animate({'left': 0}, options.speed, 'linear', function(){

				j$this.css({'left':'-' + j$parent_width + 'px'}).children(':last').insertBefore(j$this.children(':first'));

				ticker();

			});				
			
		}		
		
	}
		
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Create content wrapper and set CSS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	j$this.wrap('<div class="' + options.wrapper_class + '"></div>');
	
	//console.log(j$this.parent().css('paddingTop'));
			
	if(options.mode == 'slide' || options.mode == 'ticker'){
		
		j$this.parent().css({
			'overflow' : 'hidden',
			'position' : 'relative',
			'width' : options.width + 'px'
		});
			
		j$this.css({		
			'width' : '999999px',
			'position' : 'relative',
			'left' : '-' + j$parent_width + 'px'		
		});
			
		j$this.children().css({		
			'float' : 'left',
			'width' : j$parent_width
		});
		 	
		j$this.children(':last').insertBefore(j$this.children(':first'));
	
	}else if(options.mode == 'fade'){
		
		j$this.parent().css({
			'overflow' : 'hidden',
			'position' : 'relative',
			'width' : options.width + 'px'
			//'height' : j$this.children().height()
		});
		
		if(!options.controls){		
			j$this.parent().css({'height' : j$this.children().height()});		
		}
		
		j$this.children().css({		
			'position' : 'absolute',
			'width' : j$parent_width,
			'listStyle' : 'none',
			'opacity' : 0,
			'display' : 'none'	
		});
		
		j$this.children(':first').css({
			'opacity' : 1,
			'display' : 'block'
		});
				
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Check if user selected "auto"
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
	if(!options.auto){
				
		add_controls();
				
	}else{
		
		if(options.mode == 'ticker'){
			
			ticker();
			
		}else{
		
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Set a timed interval 
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			if(options.mode == 'slide'){
				
				if(options.auto_direction == 'left'){
							
					j$.t = setInterval(function(){animate_next();}, options.pause);		
				
				}else if(options.auto_direction == 'right'){
				
					j$.t = setInterval(function(){animate_prev();}, options.pause);
				
				}
		
			}else if(options.mode == 'fade'){
				
				if(options.auto_direction == 'left'){
			
					j$.t = setInterval(function(){fade('next');}, options.pause);
				
				}else if(options.auto_direction == 'right'){
				
					j$.t = setInterval(function(){fade('prev');}, options.pause);
				
				}
			
			}
			
			if(options.controls){
			
				add_controls();
			
			}
		
		}
	
	}
		
}
















