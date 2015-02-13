$(function(){
	$('#ViewHistoryContainer').on('click','.clear-history',clearHistory);
	$('#ViewHistoryContainer').on('mouseenter touchstart','.recently-viewed-container.bar li', moveDetail);
	$('#ViewHistoryContainer').on('click', '.thumb', thumbClick );
});

var thumbClick = function(e) {
	
	if ($(this).closest('li').hasClass('tapped')) {
		$(this).closest('li').removeClass('tapped');
		e.preventDefault();
		return false;
	}
}

var preventHoverClick = function() {
	$('a.prevent-hover-click').click(function(e) {
		e.preventDefault();
		return false;
	});
}

var clearHistory = function(event) {
	$.get(this.href, { RPC : true }, function(data) {
		if (data == '1') {
			$('.recently-viewed-container').slideFadeOut();
		}
	});

	return false;
}

var moveDetail = function(event) {
	if (event.type == 'touchstart') {
		$(this).addClass('tapped');
	} 
	
	var panel = $('.detail-panel', $(this));
	
	var height = panel.height() + 30;
	var top = $(this).offset().top - $(window).scrollTop();
	var bottom = ($(window).scrollTop() + $(window).height()) - $(this).offset().top;
	
	if (top > bottom) {
		panel.css('top', '-'+height+'px');
		
	} else {
		panel.css('top', '75px');	
	}		
}

$.fn.slideFadeOut  = function(speed, easing, callback) {
    return this.animate({opacity: '0', height: '0'}, speed, easing, callback);
}; 
