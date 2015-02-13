




/*
     FILE ARCHIVED ON 11:24:24 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:54 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var cssMenuIdentifier = "cssFallback";
var overlay;
var dimmingAvailiable = true;
var IEVersion;

var lastDimmedBy;
var noFade = false;

var allChoices;
var allElements;

var choiceShowing = null;


var linkActOnNextClick;



var config = 
{    
     over: subHoverIn,  
     timeout: 100,    
     out: subHoverOut,
     interval: 80
};


$(document).ready(function()
	{
		initVars();
		initExtendedMinisterHover();
		removeCssFallbackMenu();
		determineDimming();
		initDimming();
		$(window).resize(initDimming);
		initHoverIntent();
		allChoices.children('a').keypress(function (e) {
			var theChoice = $(this).parent();
			
			//Let tabbing through
			if(e.which==0) {
				return true;
			}
			//Ignore all keys except space and enter
			if(!((e.which==32)||(e.which==13))) {
				return false;
			}
			
			if(choiceShowing!=null &&(choiceShowing.attr('id') == theChoice.attr('id'))){
				if(linkActOnNextClick) {
					return true;
				} else {
					hideSub(theChoice);
					return false;
				}
			} else {
				showSub(theChoice);
				linkActOnNextClick = true;
				setTimeout("linkActOnNextClick = false",3000);
				return false;
			}
			
		});
	});
		
	function initVars() {
		allChoices =  $("li#gov, li#respons");
		allElements = $("#menu li.menuItem");
	}
	
	function initHoverIntent()
	{
		allChoices.hoverIntent(config);
	}
	
	function determineDimming() 
	{
		if (jQuery.browser.msie) {
			dimmingAvailiable = 6<parseInt(jQuery.browser.version);
		}
	}
	
	function initDimming()
	{
		recentUndim = false;
		if(dimmingAvailiable) {
			overlay = $("div#overlay");
			overlay.css("height", $(document).height());
			overlay.css("width", $(document).width()+1); 

		} else {
			$("li#gov").addClass("ieSupport");
			$("li#respons").addClass("ieSupport");
		}
	};  
   
	function dim(dimmedBy){
		lastDimmedBy = dimmedBy;
		overlay.addClass("activeDim");
		if(!noFade) {
			overlay.hide();
			overlay.fadeTo(300,0.6);
			noFade = true;
		};
		overlay.offset({ top: 0, left: -1 });
		$("#menu").addClass("droppedDown");
	}
	
	function unDim(unDimmedBy){
		if(lastDimmedBy.attr('id') == unDimmedBy.attr('id')) {
			noFade = false;

			
			overlay.fadeOut(30);
			allElements.each(function(index) {
				$(this).animate({ borderRightColor: "#EAEBEC"},250);

			});
			overlay.removeClass("activeDim");
			$("#menu").removeClass("droppedDown");

		} else {
			noFade = true;
		}
	}
	

	
	function removeCssFallbackMenu() {
		$("."+cssMenuIdentifier).removeClass(cssMenuIdentifier);
	}
	
	
	function subHoverIn() {
		showSub($(this));
	}
	function subHoverOut() {
		hideSub($(this));
	}
		
	function showSub(theChoice)
	{
			
		var theMenu = theChoice.find('.sub');
		choiceShowing = theChoice;
		theMenu.css('left', -theChoice.position().left+1);
		theMenu.show();
		theChoice.addClass("droppedDown");
		allChoices.not(theChoice).removeClass("droppedDown").find(".sub").css('left', -9999);
		
		if(dimmingAvailiable) {
			dim(theChoice);
		}
	}

	function hideSub(theChoice) {
		var theMenu = theChoice.find('.sub');
		choiceShowing = null;
		theMenu.css('left', -9999);
		theMenu.hide();
		theChoice.removeClass("droppedDown");
		if(dimmingAvailiable) {
			unDim(theChoice);
		}
			
	}
	
	
	
	function initExtendedMinisterHover() {

		$("ul.subnav_gallery li").find("span").hover(  
			function () {
				$(this).closest("li").addClass("hover");
			},
			function () {
				$(this).closest("li").removeClass("hover");
			}
		);
	}