////////// initial size //////////
/* channel banner */
var chBannerWidth=1125;
var chBannerHeight=260;
/* left column width */
var leftColumnWidth=250;
/* right column width */
var rightColumnWidth=250;
/* mobile trigger width */
var mobileWidth=640;
var pcWidth=mobileWidth+1;


////////// mobile device check, browser version check and importing css //////////
var date=new Date();
var time=date.getTime() ;

var UA = navigator.userAgent;
var mobile=((UA.indexOf('iPhone') !== -1) || (UA.indexOf('iPad') != -1)  || (UA.indexOf('iPod') != -1) || ((UA.indexOf('Android') !== -1) && (UA.indexOf('Mobile') !== -1)) || (UA.indexOf('Windows Phone') !== -1) || (UA.indexOf('BlackBerry') !== -1))?true:false;
if(mobile){
	var hrefArr=['/css/site_style_mobile.css'];
	for(var i=0; i<hrefArr.length; i++){
		var links=document.createElement('link');
		links.setAttribute('media','only screen');
		links.setAttribute('rel','stylesheet');
		links.setAttribute('href',hrefArr[i]+'?'+time);
		document.getElementsByTagName('head')[0].appendChild(links);
	}
}else{
	var hrefArr=[['narrow','/css/site_style_mobile.css'],['wide','/css/site_style_pc.css']];
	for(var i=0; i<hrefArr.length; i++){
		var links=document.createElement('link');
		switch(hrefArr[i][0]){
			case 'narrow':
				links.setAttribute('media','only screen and (max-width:'+mobileWidth+'px)');
				break;
			case 'wide':
				links.setAttribute('media','screen and (min-width:'+pcWidth+'px)');
				break;
		}
		links.setAttribute('rel','stylesheet');
		links.setAttribute('href',hrefArr[i][1]+'?'+time);
		document.getElementsByTagName('head')[0].appendChild(links);
	}
	////////// IE ver check //////////
	//var IE={msie:(navigator.appName=='Microsoft Internet Explorer')?true:false}
};
function isModern(){
	return typeof history.pushState==='function';
}
function versionCheck(){
	if(!isModern()){
		var versionWarn=document.createElement('div');
		versionWarn.setAttribute('id','versionWarning');
		versionWarn.innerHTML='ご利用のブラウザでは正しい動作・表示を保障いたしかねます。ブラウザをアップデートされるか、Google Chromeをご使用ください。';
		document.getElementsByTagName('body')[0].appendChild(versionWarn);
	}
}
////////// d2p toolbar setting //////////
function setD2tb(){
	var d2tb=document.createElement('div');
	d2tb.setAttribute('id','d2p_toolbarHolder');
	d2tb.innerHTML='d2toolbar';
	document.getElementsByTagName('body')[0].appendChild(d2tb);
}
function initialScroll(){
	if(!mobile){
		var tbHeight=$('#d2p_toolbarHolder').height();
		$('html,body').animate({scrollTop:tbHeight},75);
	}
}
////////// column height adjustment //////////
function adjustColumnSize(){
	//console.log(window.innerWidth,$(window).width(),$(document).width());
	//console.log(window.innerHeight,$(window).height(),$(document).height());
	var windowWidth=Math.max(window.innerWidth,$(window).width(),$(document).width());
	var bannerHeight=($('#chbnImg').width()/chBannerWidth)*chBannerHeight;
	$('#chbnImg').css('height',bannerHeight+'px');
	$('#chBanner').css('height',bannerHeight+20+20+'px');
	columnWidth(windowWidth);
	columnHeight(windowWidth);
	contentTabs();
}
function columnWidth(w){
	if(mobile || w<pcWidth){
		$('#main').css({'width':'100%','margin-right':''});
		$('#subRight').css({'display':'none','width':'100%'});
	}else{
		if($(document).width()<(leftColumnWidth+rightColumnWidth*2)){
			var newWidth=(($(document).width()-leftColumnWidth)/2)+'px';
			$('#main').css('margin-right',newWidth);
			$('#subRight').css('width',newWidth);
		}
	}
}
function columnHeight(w){
	//reset
    $('#main').css('height','');  
    $('#subLeft').css('height','');
    $('#subRight').css('height','');
    //adjust height
	if(mobile || w<pcWidth){
		/*$('#main').css({'top':$('header').height()+$('#subLeft').height()+10*4+'px'});
		$('#subLeft').css({'top':$('header').height()+10*2+'px'});
		$('#subRight').css({'top':$('header').height()+$('#subLeft').height()+$('#main').height()+10*6+'px'});*/
	}else{
    	var newHeight=$(document).height()-$('#d2p_toolbarHolder').height()-$('header').height()-$('footer').height()-10*3+200+'px';
    	$('#main').css('height',newHeight);
    	$('#subLeft').css('height',newHeight);
    	$('#subRight').css('height',newHeight);
	}
}
