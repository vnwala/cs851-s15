//サブコンテンツ表示 (plugin)

/*
(function($){
	$.fn.openSubContent =function(){
		//ボタンの隣に中身のサブコンテンツdivを設置すること
		var allSubContent = $(this).next('div');
		allSubContent.hide();
		$(document).click(function(){
			allSubContent.slideUp(70);
			allSubContent.prevAll('a').removeClass('selected');
		});
		$(this).click(function(ev){
			var SubContent = $(this).next('div');
			if ($(SubContent).is(':hidden')) {
				ev.stopPropagation();
				allSubContent.slideUp(70);
				$(SubContent).slideDown(70);
			}
			if($(SubContent).is(':visible')){
				allSubContent.prev('a').removeClass('selected');
				$(this).addClass('selected');
			}
		});
	};
	$(function(){
		$('a[class="after-arrow-sld-dw"]').openSubContent();
		//header内で右側に▼がついてるaに効く
	});
})(jQuery);
*/

$(function(){
	$(".sub-content").hide();
	$("#nav ul li").hover(function(){
			$(".sub-content:not(:animated)",this).slideDown(70)
		},
		 function(){
			$(".sub-content",this).slideUp(70);
	})
})

/*メンバーアカウント情報表示 header.html内に記述ありなのであとで消す*/

$(function(){
	$(document).click(function(){
			$('#account-popup').slideUp(70);
			$('.icon-user').removeClass('btn-on');
	});
	$('.icon-user').click(function(ev){
			ev.stopPropagation();
			$(this).toggleClass('btn-on');
			$('#account-popup').slideToggle(70);
	});
});

//ツールチップ
//（ボタンとなる要素にposition:relativeをつけ、その中に.tipanswerと、ツールチップの位置を表すクラス（.tip-top/.tip-btm/.tip-right/.tip-leftのどれか）をつけた要素を入れる）
(function($){
	$.fn.tooltip = function(){
		//8px = tooltip先端の長さ / 40px = tooptipのpadding
			var tipAnswer = $(this).find(".tipanswer");
			var tipHeight = tipAnswer.height();
			var tipMarginTop = "-" + ((tipHeight + 40)/2) + "px";
			var tipTop= "-" + (tipHeight + 40 + 8*2 )+ "px";
			var tipBtm= ($(this).height() + 8*2)+ "px";
			var tipRightAndLeft = ($(this).width() + 8*2)+ "px";

			function measureTip(){
				if((tipAnswer.hasClass("tip-right"))||(tipAnswer.hasClass("tip-left"))){
					tipAnswer.css({
						"margin-left": "0",
						"margin-top": tipMarginTop
					});
				} else if (tipAnswer.hasClass("tip-top")){
					tipAnswer.css({
						"top": tipTop
					});
				} else if (tipAnswer.hasClass("tip-btm")){
					tipAnswer.css({
						"top": tipBtm
					});
				}
				if(tipAnswer.hasClass("tip-right")) {
					tipAnswer.css({
						"left": tipRightAndLeft
					});
				} else if (tipAnswer.hasClass("tip-left")){
					tipAnswer.css({
						"right": tipRightAndLeft
					});
				}
			}

		$(this).hover(function(){
			measureTip();
			tipAnswer.fadeTo(150, 1);
		}, function(){
			tipAnswer.fadeTo(150, 0).hide();
		});

	};
	$(function(){
		//ツールチップのボタンとなる要素
		$(".icon-hatena").tooltip(); //詳細ページ左ナビのはてなマーク
		//$(".slider-outer li").tooltip(); トップページのリスト画像
	});
})(jQuery);



//トップページ 画像をhoverでタイトルと女優名をかぶせて表示

$(function(){
	var listImgLink = '.main-top li a';
	$('.hover-desc').hide();
	$(listImgLink).hover(function(){
		$('> .hover-desc',this).slideToggle(70);
		$('> img',this).stop(true,true).toggleClass('top-hover-img', 70);
	});
});


//Sidebar 動画検索のトグル部分
$(function(){
    $('.sidebar-sub-menu').hide();
    $('.sidebar-main-menu h3').click(function(){
        $('+ul.sidebar-sub-menu',this).slideToggle(40);
        $(this).toggleClass('after-nega');
    });
});

//FAQ トグル部分
$(function(){
    $('.faq dd').hide();
    $('.faq dt').click(function(){
        $('+dd',this).slideToggle(40);
        $(this).toggleClass('after-nega');
    });
});

$(function(){
	$('.faq-close').hide();
    $('.faq-open').click(function(){
        $(this).parent().next().find('dd').show(40);
        $(this).parent().next().find('dt').addClass('after-nega');
        $(this).nextAll('.faq-close').show();
        $(this).hide();
    });
    $('.faq-close').click(function(){
        $(this).parent().next().find('dd').hide(40);
        $(this).parent().next().find('dt').removeClass('after-nega');
        $(this).prevAll('.faq-open').show();
        $(this).hide();
    });
});



//詳細ページ main-content内と、横並びタブの切り替え
$(function(){
	var tabBtn = $('#detail-nav li, .horizontal-nav li');
	tabBtn.click(function(){
		var num = tabBtn.index(this);
		$('.detail-content, .horinav-content').addClass('nodisplay');
		$('.detail-content, .horinav-content').eq(num).removeClass('nodisplay');
		tabBtn.removeClass('selected');
		$(this).addClass('selected');
	});
});

//詳細ページ ぬくもりタブの切り替え (表示したくない.sub-contentにclass="nodisplay"をつける必要あり)
$(function(){
	$('.addtnl-nav li').click(function(){
		var num = $('.addtnl-nav li').index(this);
		$('.addtnl-content').addClass('nodisplay');
		$('.addtnl-content').eq(num).removeClass('nodisplay');
		$('.addtnl-nav li').removeClass('selected');
		$(this).addClass('selected');
	});
});

//詳細ページ メンバー レビューのレーティング
 $(function(){
    var rater = $('.review-input label');
    rater.click(function(){
        $(this).addClass('cc-yellow')
               .prevAll('.review-input label').addClass('cc-yellow')
               .end().nextAll('.review-input label').removeClass('cc-yellow');
    });
});


//フッター用・現在の年数取得
function ShowCurrentYear() {
   var now = new Date();
   var year = now.getFullYear();
   document.write(year);
}





