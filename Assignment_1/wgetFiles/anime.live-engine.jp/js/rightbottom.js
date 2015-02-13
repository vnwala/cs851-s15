$(function(){
	var window_scroll_top = $( window ).scrollTop();
	var window_height = $( window ).height();
	var sidebar_height = $("#rightWrapInnerBox").height();
	var right_height = $("#rightWrap").height();
	var left_height = $("#leftWrap").height();
	$(window).scroll( function () {
		var window_scroll_top = $( window ).scrollTop();
		var window_height = $( window ).height();
		var sidebar_height = $("#rightWrapInnerBox").height();
		var right_height = $("#rightWrap").height();
		var left_height = $("#leftWrap").height();
		if ( ( ( window_scroll_top + window_height ) > ( sidebar_height + 210 ) ) && ( right_height < left_height ) ) {
			$("#rightWrapInnerBox").addClass( "sidebar_fixed" );
			var bottom_margin = window_height - ( left_height + 210 - window_scroll_top );
			if ( bottom_margin > 10 ) {
				$("#rightWrapInnerBox").css('bottom',bottom_margin+"px");
			} else {
				$("#rightWrapInnerBox").css('bottom','10px');
			}
		} else {
			$("#rightWrapInnerBox").removeClass( "sidebar_fixed" );
		}
	});
});

