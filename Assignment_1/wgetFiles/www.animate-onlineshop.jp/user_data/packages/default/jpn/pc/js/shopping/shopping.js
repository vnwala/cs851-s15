(function ($) {var self = $.animate.shopping = {	init: function () {		self.slideshow('#slideshow, #slideshow2');	},	slideshow: function (selector) {		$(selector).each(function() {			var feature = $(this);			var ul      = feature.find('ul');			var li      = ul.find('li');			var count     = li.length;			var move      = parseInt(li.width());			feature.find('div.ctrl a').click(function () {				if (li.length < 5)					return false;				if (self.lock) return false;				self.lock = true;				var action = $(this).attr('class') == 'next' ? true : false;				var el     = ul.find('li:' + (action ? 'first' : 'last')).clone(true);				ul[action ? 'append' : 'prepend'](el).css(action ? '' : {marginLeft:move * -1});				ul.animate({marginLeft: (action ? '-=' : '+=') + move}, 500, function () {					ul.find('li:' + (action ? 'first' : 'last')).remove();					ul.css({marginLeft: 0});					self.lock = false;				});				return false;			});		});	}}$(function () { self.init(); });})(jQuery);