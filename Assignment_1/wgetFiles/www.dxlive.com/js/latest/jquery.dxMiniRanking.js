/*
 * jQuery DXlive Mini Ranking for Left Column 0.1.3 BETA!
 * Copyright (c) 2012 wito2009 :D , DTI Services, INC
 * Version: 0.1.3 (03-MAY-2012)
 * Requires: jQuery v1.4.4 or later
 * this is open souce for the use of DTI hosted web site.
 */
/*TO DO >:D
 * height -> done!
 * a tag disable -> done!
 * navigation button -> done!
 * diffirentiate hover and on  ->done!
 * set the height of the holder only onece
 */
(function($){ 
	window._dxMiniRanking_lock = false;
	window._dxMiniRanking_firstTimeFlag = true;
	$.fn.dxMiniRanking = function(options) {   
		var defaults = {
			rkgURLs: ['/temp/minirank_dev/ranking_general.html','/temp/minirank_dev/ranking_toys.html','/temp/minirank_dev/ranking_newbie.html','/temp/minirank_dev/ranking_vip.html'],
			duration: 5000,
			fadeInDuration:300,
			fadeOutDuration:0
		},
		options = $.extend(defaults, options),
		holder = $(this),
		fadein_d = options.fadeInDuration,
		fadeout_d = options.fadeOutDuration;

		
////////////////////////bottom navigation part initilization////////////////////////

		var r_ua = options.rkgURLs,
		r_ul = $('<ul/>', {
		  'id': 'rkg_ul',
		  html: ''
		});
		
		for (var idx in r_ua) {
			c = parseInt(idx) + 1; 
        	$('<li/>', {
				'id': 'rkg_'+c+'_li',
		  		html: '<a href="javascript:;">'+c+'</a>'
			}).appendTo(r_ul);
   		}
			
		var r_d = $('<div/>', {
		  'id': 'rkg_nav',
		  html: r_ul
		}).insertAfter(holder);
		
		$(r_d).children('ul').children('li:first').children('a').addClass('on');
		
////////////////////////bottom navigation part	functionlity ////////////////////////		
		$('ul#rkg_ul li a.on').live('click', function(e) {
				e.preventDefault();
		});	
					
		$('ul#rkg_ul li a[class!="on"]').live('click', function(e) {
				if(window._dxMiniRanking_lock == false){
					var currentRank = new String($('div.rkg_category_box:visible').attr('id'));
					currentRank = currentRank.replace('rkg_','');
					var thisRank = this.innerHTML;
					//clearTimeout(timerID);
					advancethis(currentRank, thisRank);
				}
				//alert('7th attempt  visible box is: ' + currentRank + '    next box is: ' + thisRank);
		});				
		
////////////////////////functions////////////////////////	
		var chkIfAlreadyLoaded = function (rank_id) {
			if ($('#'+rank_id).length > 0){
				return true;// do something here
			} else {
				return false;
			}
		}
	
		
		
		//ajaxload
		var loadRank = function (rank_id, rank_url) {
			
			var r = $.ajax({
						url: rank_url,
						cache: true,
						dataType: 'text',
						success: function(html, status, xhr) {
							$(html).attr('id', rank_id).css({'display':'none'}).appendTo(holder).fadeIn(fadein_d,function(){
								window._dxMiniRanking_lock = false;
								if(window._dxMiniRanking_firstTimeFlag){
									window._dxMiniRanking_firstTimeFlag = false;
									holder.css('background-image','none');
								}
							});
	
							
						}
					});
			
		}
		
		
		
	
		var hideCurrentNShowNext = function(current_rank_id, next_rank_id, next_rank_url) {
			window._dxMiniRanking_lock = true;
			$('div#'+current_rank_id).fadeOut(fadeout_d,function (){
				
				if (!chkIfAlreadyLoaded(next_rank_id)) {
					loadRank(next_rank_id, next_rank_url);
				} else if (chkIfAlreadyLoaded(next_rank_id)){
					$('#'+next_rank_id).fadeIn(fadein_d,function(){
						window._dxMiniRanking_lock = false;
					});
					
				}
				
				$('li#'+current_rank_id+'_li a').removeClass('on');
				$('li#'+next_rank_id+'_li a').addClass('on');
				
			});
		}
		
		//current_num = the category or rankbox you want to FADEOUT
		//next_num = the category or rankbox you want to FADEIN (can be blank)
		var advancethis = function (current_num,next_num) {
			window.clearTimeout(timerID);
			//we do not need to set this up each time...later, I will move this elsewhere
			$(holder).height($(holder).children('div:visible').height());
			
			
			var nowat = parseInt(current_num);
			var nextNum;
			
			if(next_num) {
				nextNum = parseInt(next_num);
			} else {
				nextNum =parseInt(current_num) + 1;
			}
			
			var maxNum = r_ua.length;
			if (maxNum<nextNum){
				nextNum = 1;
			}
			var current_id = 'rkg_'+current_num;
			var next_id = 'rkg_'+nextNum;
			
			hideCurrentNShowNext(current_id, next_id, r_ua[nextNum-1]);
			timerID = 1;
			//console.log(nextNum);
			
			timerID = window.setTimeout(function(){advancethis(nextNum)},options.duration);
			//console.log('timerID: ' + timerID );
		}
		loadRank( 'rkg_1', r_ua[0]);
		timerID = 0;
		timerID = window.setTimeout(function(){advancethis(1)},options.duration);
	};  
})(jQuery); 
