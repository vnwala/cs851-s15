//���֥���ƥ��ɽ�� (plugin)

/*
(function($){
	$.fn.openSubContent =function(){
		//�ܥ�����٤���ȤΥ��֥���ƥ��div�����֤��뤳��
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
		//header��Ǳ�¦�ˢ����Ĥ��Ƥ�a�˸���
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

/*���С���������Ⱦ���ɽ�� header.html��˵��Ҥ���ʤΤǤ��ȤǾä�*/

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

//�ġ�����å�
//�ʥܥ���Ȥʤ����Ǥ�position:relative��Ĥ����������.tipanswer�ȡ��ġ�����åפΰ��֤�ɽ�����饹��.tip-top/.tip-btm/.tip-right/.tip-left�Τɤ줫�ˤ�Ĥ������Ǥ�������
(function($){
	$.fn.tooltip = function(){
		//8px = tooltip��ü��Ĺ�� / 40px = tooptip��padding
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
		//�ġ�����åפΥܥ���Ȥʤ�����
		$(".icon-hatena").tooltip(); //�ܺ٥ڡ������ʥӤΤϤƤʥޡ���
		//$(".slider-outer li").tooltip(); �ȥåץڡ����Υꥹ�Ȳ���
	});
})(jQuery);



//�ȥåץڡ��� ������hover�ǥ����ȥ�Ƚ�ͥ̾�򤫤֤���ɽ��

$(function(){
	var listImgLink = '.main-top li a';
	$('.hover-desc').hide();
	$(listImgLink).hover(function(){
		$('> .hover-desc',this).slideToggle(70);
		$('> img',this).stop(true,true).toggleClass('top-hover-img', 70);
	});
});


//Sidebar ư�踡���Υȥ�����ʬ
$(function(){
    $('.sidebar-sub-menu').hide();
    $('.sidebar-main-menu h3').click(function(){
        $('+ul.sidebar-sub-menu',this).slideToggle(40);
        $(this).toggleClass('after-nega');
    });
});

//FAQ �ȥ�����ʬ
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



//�ܺ٥ڡ��� main-content��ȡ����¤ӥ��֤��ڤ��ؤ�
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

//�ܺ٥ڡ��� �̤���꥿�֤��ڤ��ؤ� (ɽ���������ʤ�.sub-content��class="nodisplay"��Ĥ���ɬ�פ���)
$(function(){
	$('.addtnl-nav li').click(function(){
		var num = $('.addtnl-nav li').index(this);
		$('.addtnl-content').addClass('nodisplay');
		$('.addtnl-content').eq(num).removeClass('nodisplay');
		$('.addtnl-nav li').removeClass('selected');
		$(this).addClass('selected');
	});
});

//�ܺ٥ڡ��� ���С� ��ӥ塼�Υ졼�ƥ���
 $(function(){
    var rater = $('.review-input label');
    rater.click(function(){
        $(this).addClass('cc-yellow')
               .prevAll('.review-input label').addClass('cc-yellow')
               .end().nextAll('.review-input label').removeClass('cc-yellow');
    });
});


//�եå����ѡ����ߤ�ǯ������
function ShowCurrentYear() {
   var now = new Date();
   var year = now.getFullYear();
   document.write(year);
}





