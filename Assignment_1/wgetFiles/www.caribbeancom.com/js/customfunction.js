//header���֥���ƥ��ɽ�� �ʱ�¦�ˢ����Ĥ��Ƥ��Τ˸�����

$(function(){
	var headerLinkOpenBtn = $('#header a[class="after-arrow-sld-dw"]');
	var allSubContent = headerLinkOpenBtn.next('div');
	allSubContent.hide();
	$(document).click(function(){
		allSubContent.slideUp(70);
		headerLinkOpenBtn.removeClass('selected');
	});
	headerLinkOpenBtn.click(function(ev){
		var SubContent = $(this).next('div');
		if ($(SubContent).is(':hidden')) {
			ev.stopPropagation();
			allSubContent.slideUp(70);
			$(SubContent).slideDown(70);
		}
		if($(SubContent).is(':visible')){
			$(this).addClass('selected');
			headerLinkOpenBtn.not(this).removeClass('selected');
		}
	});
});


/*���С���������Ⱦ���ɽ�� header.html��˵��Ҥ���*/

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

/*$(function(){
	var distanceTop = $('#q1-2').offset().top - $(window).height();
	if($(window).scrollTop() = 0){
		$("#q1-2 + dd").show();
	}
});*/


//�ܺ٥ڡ��� main-content��ȡ����¤ӥ��֤��ڤ��ؤ�
$(function(){
	var tabBtn = $('#detail-nav li, .horizontal-nav li');
	tabBtn.click(function(){
		var num = tabBtn.index(this);
		$('.detail-content, .price-table, .horinav-content').addClass('nodisplay');
		$('.detail-content, .price-table, .horinav-content').eq(num).removeClass('nodisplay');
		tabBtn.removeClass('selected');
		$(this).addClass('selected');
	});
});

//�ܺ٥ڡ��� �̤���꥿�֤��ڤ��ؤ� (ɽ���������ʤ�.nukunav-content��class="nodisplay"��Ĥ���ɬ�פ���)
$(function(){
	$('.nuku-nav li').click(function(){
		var num = $('.nuku-nav li').index(this);
		$('.nukunav-content').addClass('nodisplay');
		$('.nukunav-content').eq(num).removeClass('nodisplay');
		$('.nuku-nav li').removeClass('selected');
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

//DDL ����դΥ��֤��ڤ��ؤ�
$(function(){
	$('.ddl-graph-nav li').click(function(){
		var num = $('.ddl-graph-nav li').index(this);
		$('.ddl-graph table').addClass('nodisplay');
		$('.ddl-graph table').eq(num).removeClass('nodisplay');
		$('.ddl-graph-nav li').removeClass('selected');
		$(this).addClass('selected');
	});
});


//�եå����ѡ����ߤ�ǯ������
function ShowCurrentYear() {
   var now = new Date();
   var year = now.getFullYear();
   document.write(year);
}