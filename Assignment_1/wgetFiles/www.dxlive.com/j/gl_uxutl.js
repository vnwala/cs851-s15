/*
		based on Ads Sidewinder
		by Hamachiya2. http://d.hatena.ne.jp/Hamachiya2/20120820/adsense_sidewinder
		modified by wito2009
*/
(function(window,$,undefined){
var pluginName = 'stickIt',
	document = window.document,
	defaults = {
		si_main:'#gl_mainContentsOuter',
		si_side:'#gl_sideColOuter'
	};
	
//The actual plugin constructor
function stickIt(element, options) {
	this.element = element;
	// jQuery has an extend method which merges the contents of two or 
	// more objects, storing the result in the first object. The first object
	// is generally empty as we don't want to alter the default options for
	// future instances of the plugin
	this.options = $.extend({}, defaults, options);
	this._defaults = defaults;
	this._name = pluginName;
	this.init();
}

stickIt.prototype.init = function () {
	// Place initialization logic here
	// You already have access to the DOM element and the options via the instance, 
	// e.g., this.element and this.options
	
		var main = $(this.options.si_main) // メインカラムのID
		, side = $(this.options.si_side) // サイドバーのID
		, wrapper = $(this.element) // 広告を包む要素のID

		, w = $(window)
		, wrapperHeight = wrapper.outerHeight()
		, wrapperTop = wrapper.offset().top
		, sideLeft = side.offset().left
		, sideMargin = {
			top: side.css('margin-top') ? side.css('margin-top') : 0,
			right: side.css('margin-right') ? side.css('margin-right') : 0,
			bottom: side.css('margin-bottom') ? side.css('margin-bottom') : 0,
			left: side.css('margin-left') ? side.css('margin-left') : 0
		}
		, winLeft
		, pos
		, scrollAdjust = function() {
			sideHeight = side.outerHeight();
			mainHeight = main.outerHeight();
			mainAbs = main.offset().top + mainHeight;
			var winTop = w.scrollTop();
			winLeft = w.scrollLeft();
			var winHeight = w.height();
			var nf = (winTop > wrapperTop) && (mainHeight > sideHeight) ? true : false;
			pos = !nf ? 'static' : (winTop + wrapperHeight) > mainAbs ? 'absolute' : 'fixed';
			if (pos === 'fixed') {
				side.css({
					position: pos,
					top: '',
					bottom: winHeight - wrapperHeight,
					left: sideLeft - winLeft,
					margin: 0
				});

			} else if (pos === 'absolute') {
				side.css({
					position: pos,
					top: mainAbs - sideHeight,
					bottom: '',
					left: sideLeft,
					margin: 0
				});

			} else {
				side.css({
					position: pos,
					marginTop: sideMargin.top,
					marginRight: sideMargin.right,
					marginBottom: sideMargin.bottom,
					marginLeft: sideMargin.left
				});
			}
		};

		var resizeAdjust = function() {
			side.css({
				position:'static',
				marginTop: sideMargin.top,
				marginRight: sideMargin.right,
				marginBottom: sideMargin.bottom,
				marginLeft: sideMargin.left
			});
			sideLeft = side.offset().left;
			winLeft = w.scrollLeft();
			if (pos === 'fixed') {
				side.css({
					position: pos,
					left: sideLeft - winLeft,
					margin: 0
				});

			} else if (pos === 'absolute') {
				side.css({
					position: pos,
					left: sideLeft,
					margin: 0
				});
			}
		};
		w.on('load', scrollAdjust);
		w.on('scroll', scrollAdjust);
		w.on('resize', resizeAdjust);

};	

	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new stickIt(this, options));
			}
		});
	}
	

})(window,jQuery,undefined);


(function(window,document,undefined) {

/*this requires var new_girls, new_girls_profile defined on global scope*/
window.hm_showRecomen = function(trgt,trgt_date){
	if (trgt === undefined) {
		var trgt = 'top_picks_osusume';
	}
	if(trgt_date ===undefined){
		var trgt_date = 'app_top_picks_date';
	}
	var r = '',
	t = document.getElementById(trgt),
	t_date = document.getElementById(trgt_date),
	template_1 = '<div class="top_picks_Thumb2" id="tp_@pfname@"><div class="performerPhotos"><a href="javascript:openProfile(\'@pfname@\');" style="display:block;width:195px;height:146px;background:0 0 url(/img/home/new_girls/@pfname@.jpg) no-repeat;"></a></div><table border="0"><tbody><tr><td width="95" align="left"><div class="pfname_left"><a href="javascript:openProfile(\'@pfname@\');">@pfname@</a></div></td><td align="right" width="100">',
	template_3 = '</td></tr></tbody></table>@pf_text@</div>';
	/*template_2 depends on pf session type. so generated in for block*/
	
	t_date.innerHTML = new_girls_update;
	
	for (var i = 0; i < new_girls.length;i++) {
		var session_type = show_pf_online(new_girls[i]);
		if(session_type >= 120){ //# >= 120 twoshot
					var template_2 = '<a href="javascript:openProfile(\'@pfname@\');"><img src="/img/home/thumbs_icon_2shot_newgirl.gif" width="48" height="15" border="0" /></a>';
		} else if(session_type >= 115){  //# >= 115
					var template_2 = '<a href="javascript:openProfile(\'@pfname@\');"><img src="/img/home/thumbs_icon_session_newgirl.gif" width="48" height="15" border="0" /></a>';
				
		} else if(session_type >= 100){  //# >= 100
					var template_2 = '<a href="javascript:openProfile(\'@pfname@\');"><img src="/img/home/thumbs_icon_standby_newgirl.gif" width="48" height="15" border="0" /></a>';
				  
		} else {
				  var template_2 = '<a href="javascript:openSendMail(\'@pfname@\');"><img src="/img/icons/icon_mail.gif" width="16" height="16" border="0"></a>';
		}
		var template = template_1+template_2+template_3;
		r+=template.replace(/@pfname@/g, new_girls[i]).replace(/@pf_text@/g, new_girls_profile[i]);
	}
	//console.log(t, r);
	t.innerHTML = r;
}

})(window,document,undefined);
