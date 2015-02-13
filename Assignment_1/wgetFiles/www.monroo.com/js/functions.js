////////// window open //////////
function windowOpen(url,w,h){
	var date=new Date();
	var name=date.getTime();
	window.open(url,name,'width='+w+',height='+h+',resizable=yes,scrollbars=yes');
}
////////// content tabs //////////
function contentTabs(){
	var tabNum=$('#contentTabs ul *').length;
	var totalWidth=$('#contentTabs').width()-tabNum;
	var width=Math.floor(totalWidth/tabNum)+'px';
	$('#contentTabs ul li').css('width',width);
}
////////// hilight clicked object //////////
function tabSelect(){
	$('li').click(function(event){
		var target=$(event.target);
		if(target.closest('ul').hasClass('selectNav')){
			target.closest('ul').children().removeClass('on');
			if(target.get(0).tagName=='li'){
				target.addClass('on');
			}else{
				target.closest('li').addClass('on');
			}		
		}
	});
}
