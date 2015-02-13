(function ($) {

var self = $.animate = {

	init: function () {
		self.resize();
		self.searchbar();
		self.producttitle();

		self.feature();

		// self.bnr();
		self.pagetop();
		self.current();
	},

	resize: function () {
		$(window).resize(self.searchbar);
		$(window).resize(self.producttitle);
	},

	searchbar: function () {
		var header_main = $('.wide #header_main');

		var img_w = parseInt(header_main.find('> div > img').width()) + parseInt(header_main.find('> div > img').css('marginRight'));
		var a_w   = parseInt(header_main.find('> div > a').width()) + parseInt(header_main.find('> div > a').css('marginRight'));
		var ul_w  = -15;
		if (header_main.find('> div > ul').length)
			ul_w = parseInt(header_main.find('> div > ul').width());

		var init_w   = img_w + a_w + ul_w + parseInt(header_main.css('marginLeft')) + parseInt(header_main.css('marginRight')) + 20;
		var header_w = $('#header').width();

		// header_main.find('#header_form').width(header_w - init_w);
		// header_main.find('input[type=text]').width(header_w - init_w - 10 - 29 - 130);

		// header_main.find('#header_copy').width(header_w - init_w + 90);
	},

	producttitle: function () {
		var product_main = $('.wide #note');

		var title_w = $('#note').width();
		product_main.find('#note_inner').width(title_w - 10);

	},

	feature: function () {
		var feature = $('#feature');
		var ul      = feature.find('ul');
		var li      = ul.find('li');
		var frame   = feature.find('.scroll_frame');
		var count   = li.length;
		var move    = parseInt(li.width());

		// 要素をランダムに並び替え
		var content = ul.find("> *");
		var total = content.size();
		content.each(function() {
			content.eq(Math.floor(Math.random()*total)).prependTo(ul);
		});
		ul.show();

		frame.hover(
			function () { feature.find('div.ctrl, p').show();return false; },
			function () { feature.find('div.ctrl, p').hide();return false; }
		);

		feature.find('div.ctrl a').click(function () {
			if (li.length < 3)
				return false;

			if (self.lock) return false;
			self.lock = true;

			clearInterval(self.feature_timer);

			var action = $(this).attr('class') == 'next' ? true : false;
			var el     = ul.find('li:' + (action ? 'first' : 'last')).clone(true);

			ul[action ? 'append' : 'prepend'](el).css(action ? '' : {left:move * -1});

			ul.animate({left: (action ? '-=' : '+=') + move}, 500, function () {
				ul.find('li:' + (action ? 'first' : 'last')).remove();
				ul.css({left: 0});
				self.lock = false;

				self.feature_timer = setInterval(function () {
					feature.find('div.ctrl a.next').click();
				}, 5000);
			});

			return false;
		});

		self.feature_timer = setInterval(function () {
			feature.find('div.ctrl a.next').click();
		}, 5000);
	},

	pagetop: function () {
		$('.pagetop').click(function () {
			$('html,body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});
	},

	// bnr: function () {
	// 	var sidebar   = $('#sidebar');
	// 	var layouts   = $('#layouts');

	// 	while(sidebar.height() > layouts.height()) {
	// 		var bnr = sidebar.find('div.bnr:last');

	// 		if (!bnr.length) break;
	// 		if (!bnr.find('li').length) {
	// 			bnr.remove();
	// 			bnr = sidebar.find('div.bnr:last');
	// 		}

	// 		var li = bnr.find('li').get().reverse();

	// 		$(li[0]).remove();
	// 	}

	// 	if (!sidebar.find('div.bnr:last li').length)
	// 		sidebar.find('div.bnr:last').remove();
	// },

	current: function () {
		var dir   = location.href.split('/');
		var dir_1 = dir[ dir.length - 2 ];
		var dir_2 = dir[ dir.length - 1 ];
			dir_2 = dir_2 == "index.php" ? "" : dir_2;
			dir   = "/" + dir_1 + "/" + dir_2;
		var btn   = $("#header_category a[href = '" + dir + "'], #header_nav a[href = '" + dir + "']").closest("a")

		btn.attr('class', 'current');
	}
}

$(function () { self.init(); });

})(jQuery);
