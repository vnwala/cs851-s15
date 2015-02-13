var n=0;
var m=0;
var gackgroundStatus = 0;
var embed_tag;
var playCheck;
var freeCommercialBoolean = false;
var qualityLowBoolean = false;
var qualityHeighBoolean = true;
var screenStatu = false;
var thePositon;
var pageType ='';
var en;
var is_preview;
var joinBtnBoolen;
var subNavAjust=46;
var windowWidht;
var browser = navigator.userAgent;

var heyzo = function(){};

if(getCookie("user_rank") == 'mobile_jp'){location.href="http://s.heyzo.com/index1.html";}

heyzo.appexApply = function(){
	if(isLogin() && got_appex == 0){
		if(document.getElementById('appexApply')){
			var appexApply = document.getElementById('appexApply');
			appexApply.setAttribute('class','appexApply');
			appexApply.innerHTML = '<a target="_blank" href="https://secure.d2pass.com/shooter?enc_info=1ec28f35e3dacea0fcd927fa9d3a175f78ee016e2bace4af3009e1a6dcd6996e4c9321e0475784547b518a13b51d4db3aebadb748bc5a4c41b97d4872591a9d3" id="hsdoller"><img src="/highspeed/images/hsdoller-btn.png" /></a><a target="_blank" href="https://secure.d2pass.com/shooter?enc_info=1ec28f35e3dacea0fcd927fa9d3a175f78ee016e2bace4af3009e1a6dcd6996e8303c87fc8f115dccc87cdbe00be2c9d35deefd488e5158f4d5d07a78ad8a085" id="hsyen"><img src="/highspeed/images/hsyen-btn.png" /></a><a href="/highspeed/bunki.html" target="_blank"><img src="/highspeed/images/speedtest.png" id="speedtest" /></a>';
			}
		}
}


heyzo.addRankingBanner = function(){
	$('.righ-column').append('<div class="yearRanking"><a href="http://www.heyzo.com/listpages/annual_ranking_2013.html">2013年ランキング >></a><a href="http://www.heyzo.com/listpages/annual_ranking_2014.html">2014年ランキング >></a></div>');
}

heyzo.setCookie = function(name,value,expir){
	var exptime = new Date(); exptime.setTime(new Date().getTime() + (expir * 24 * 3600 * 1000));
	document.cookie = name + '=' + escape(value) + ";path=/;domain="+window.location.hostname.replace('www','')+";expires=" + exptime.toGMTString(); 
}

heyzo.smartPhone = false;
heyzo.switchPhone = function(){
	if(heyzo.smartPhone){
		location.href="http://s.heyzo.com/index1.html";
	}
}
heyzo.appexBunki = function(){
var bunkiBtn = '<a id="bunki" href="http://www.heyzo.com/highspeed/bunki.html"></a>';
var w = 1100;
var h = 1350;

if(getCookie("appex_bunki") == "show" || (typeof user_jp_hzo_mbl ===  "string" && user_jp_hzo_mbl == "1") && (typeof user_jp_hzo_nml ===  "string" && user_jp_hzo_nml == "1" || typeof user_jp_hzo_dlx ===  "string" && user_jp_hzo_dlx == "1" || typeof user_jp_hzo_sdlx ===  "string" && user_jp_hzo_sdlx == "1")){

if(user_jp_hzo_mbl == "1"){if(getCookie("user_rank") != 'choose'){return;} bunkiBtn = '<a id="bunki" href="http://www.heyzo.com/smartphone.html"></a>';w=500;h=130;} 
document.write(bunkiBtn);
$(document).ready(function(e) {
$("a#bunki").fancybox({
//'transitionIn' :'elastic',
//'transitionOut' :'elastic',
'type' :'iframe',
'width' :w,
'height' :h,
'autoScale' :false,
'scrolling':'no',
'onClosed':heyzo.switchPhone
});
$('#bunki').trigger('click');
$('#fancybox-close').click(function(){
heyzo.setCookie ("appex_bunki", 'shown',7);
});
$('#fancybox-overlay').click(function(){
heyzo.setCookie ("appex_bunki", 'shown',7);
});
});
}
};

heyzo.moviethubm = function(o,num,time,pos){
	var t = (document.domain == "en.heyzo.com")?"Time：":"時間："; 
	var ml = (pos == "0")?"136px":pos; 
	var sp =  time.full.split(':');
	var s = (Number(sp[0])*60*60)+(Number(sp[1])*60)+Number(sp[2]);
	var id =num;
	var div = document.createElement('div');
	div.style.margin = "-79px 0 0 "+ml;
	div.id = "movieseans";
	var p = document.createElement('p');
	p.innerHTML = t+time.full;
	var sean = new Image();

	var imgNum = 20;
	var imgsrc = '/contents/3000/'+id+'/auto_captures5/'+imgNum+'.jpg';
	sean.src = imgsrc;
	sean.style.margin = "0 0 0 0";
	div.appendChild(sean);
	div.appendChild(p);
	//o.parentNode.insertBefore(div,o.parentNode.firstChild);
	o.appendChild(div);
	heyzo.interval = setInterval(function(){imgNum += 40; if(imgNum*5>s) imgNum=20; sean.src = '/contents/3000/'+id+'/auto_captures5/'+imgNum+'.jpg';},500);
};



function isLogin(en){
    if(typeof user_jp_hzo_nml === "undefined" || typeof user_en_hzo_nml === "undefined" ){return false;}
    if(!en && user_jp_hzo_nml === "1"){return true;}
    else if(en && user_en_hzo_nml === "1") {return true;}
    return false;
}

if(getCookie('NetiA')) subNavAjust = subNavAjust+48+4;
else subNavAjust = 98;

$(window).load(function() {
windowWidht = $(document).width();
if(!document.domain.match(/en.heyzo.com/)){heyzo.addRankingBanner();}
/*if (document.cookie) {
	var cookies = document.cookie.split("; ");
	for (var i = 0; i < cookies.length; i++) {
		var str = cookies[i].split("=");
		console.log("cookies[i] "+cookies[i]);
		}
	}
*/

if(user_device != "pc"){	
		$(".sampleMovie").each(function(index, element) {
            var t = $(element).attr('href');
			$(element).replaceWith('<a href="http://m.heyzo.com'+t+'" class="sampleMovie" >サンプル</a>');
        });
	}

showNavImg();
if(browser.match(/iPad/)){
	$('.info-bg p.memo').css('line-height','14px');
}
$('.withInfo').hover(function(e){
$(this).children('span').stop(false,true).fadeIn(300);
},
function(e){
$(this).children('span').stop(false,true).fadeOut(300);
});
$('a.sample-download').mousedown(function(event) {
    switch (event.which) {
        case 1:
            alert('右クリックして”対象をファイルに保存”を選んで下さい。');
            break;
        case 2:
			/* alert('Middle mouse button pressed');*/
            break;
        case 3:
			var url = $(this).attr('url');
			$(this).attr('href', url);
            break;
        default:
            /*alert('You have a strange mouse');*/
    }
});

});

$(window).scroll(function () {
var d2pheaderAdjust = ($('.gh-row-2').css('display') == "block")?42:0;
subNavAjust = 98;
if(document.domain.match(/en./)){d2pheaderAdjust = 0; subNavAjust = 52;}

var wsctop = $(window).scrollTop();
  if(d2pheaderAdjust+wsctop > subNavAjust) {
    $("#mainNav").addClass('fixed');
	subNavAjust = 0;
	$('#heyzo-categorys-nav').css('top','0');
  } else {
    $("#mainNav").removeClass('fixed');
	var clearGap = subNavAjust+d2pheaderAdjust+wsctop*-1
	$('#heyzo-categorys-nav').css('top',clearGap+'px');
  }
});

function playListMovies(e){/*top banner autoplaye*/
$('.movielist').each(function(index, element) {
    if(e == index) $(this).attr('id','onplay');
	else $(this).attr('id','');
});
}
function categoryListSlider(e){
	$('#sample-movie span').css('display','none');
	$('#sample-movie p').css('display','none');
	$('#sample-movie h2').css('display','none');
	$('h2.autoPlayTitle'+e+'').css('display','block');
	$('p.name'+e+'').css('display','block');
	$('span.release'+e+'').css('display','block');
	$('p.memo'+e+'').css('display','block');
	$('p.memo'+e+' span.coment'+e+'').css('display','block');
	$('#other-movies div.movie img').css('border-color','whiteSmoke');
	$('#other-movies div.movie img.img'+e+'').css('border-color','#ff0066');
}

function resize(status) {
	if(status) {
		screenStatu = true;
		$('#main-player_wrapper object').css('width','1100px').css('height','650px');
		jwplayer().resize(1100, 650);
		$('#playerContainer').css('height','800px').css('padding-left','0');
		$('#quality-btns').css('width','1080px');
		$('.info-bgWide').removeClass("info-bg");
		$('.captureWide').removeClass("capture");
		$('.preliminary').css('margin-left','936px').css('margin-top','-775px');
		$('.relateMoviesList').css('width','1100px');
	}
	else {
		screenStatu = false;
		$('#main-player_wrapper object').css('width','800px').css('height','480px');
		jwplayer().resize(800, 480);
		$('#playerContainer').css('height','625px').css('padding-left','4px');
		$('#quality-btns').css('width','780px');
		$('.info-bgWide').addClass('info-bg');
		$('.captureWide').addClass("capture");
		$('.preliminary').css('margin-left','638px').css('margin-top','-603px');
		$('.relateMoviesList').css('width','800px');
	}
}

function swfTarget(str) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
			return window[str];
		} else {
			return document[str];
	}
}

function wideHide(b){
	swfTarget('main-player').asWideBtnHide(b);
	if(b == false){
		if(playCheck){
		jwplayer().play();
		}else{
			jwplayer().pause();
		} 
	}
}

function showActorImg(id,o){
/*moviepage paginate*/

var a = o;
var li = $(a).parent();
if(getCookie('NetiA')) member='/member';
else member='';
var _url = member+"/contents/3000/"+id+"/images/ss_"+id+"_98.jpg";
/* set up the node / element*/
var _im =$("<img>");

/* hide and bind to the load event*/
_im.hide();
_im.bind("load",function(){ $(this).fadeIn(); });
_im.addClass('showActorImg');

/* append to target node / element*/
$(li).append(_im);
_im.attr('src',_url);
_im.attr('id','actor'+id);

li.mouseout(function(){
$('#actor'+id).remove();
});
}

function showNavImg(){
var num = $('#slider').children('a').size();
$('#slider').children('img').each(function(index, element) {
    $(this).children('img').attr('src','/images/common/banners/top_banner0'+ index +'.jpg');
});
/*images/common/banners/top-banner1.jpg*/
}

function playFreeMovie(videoUrl, videoThumb, videoTitle) {

        var playlist = jwplayer().getPlaylist();
        var newItem = {
            file: videoUrl,
            image: videoThumb,
            title: videoTitle
        };
        playlist.push(newItem);
        jwplayer().load(playlist);
		jwplayer().playlistNext();
}



heyzo.setStorage = function(storageName,value){
	if(typeof localStorage === "object"){
		var storage = localStorage.setItem(storageName,value);
	}
}

heyzo.getStorage = function(storageName){
	if(typeof localStorage === "object"){
		var storage = localStorage.getItem(storageName);
		return storage;
	}else{
		return 0;
	}
};


heyzo.moviename = function(){
		var name = (status == 'sample')?"heyzo-s":"heyzo-m";
		return name;
	};


function setUpPlayer( id, status, siteId, movieId, duration, width, height, skinPlugin, q, key ){
	var free_movie_page = document.URL;
	var thumbnail_b = '';
	if(free_movie_page.match('free_movie')){
		thumbnail_b = '_b'; 
	}
	
	var statu	='';
	var www		= '';
	var html5file = '';
	var playerName = "/assets/player.swf";
	var playerSkin	= '/assets/'+skinPlugin+'.zip';
	var streamerValue = "";
	var fileName = "";
	var user = "";
	var forBeginner = "";

	/* FMS user key*/
	if( typeof key === "undefined" ){
		key = '';
	}
	
	if( status == 'svip' ){
		/* SVIP whole movie */
		(q == 'low') ? fileName = 'heyzo_mb_'+movieId+'_full.mp4' : fileName = 'heyzo_lt_'+movieId+'_full.mp4';
		streamerValue = "rtmp://fms.heyzo.com/heyzo/member/contents/"+siteId+"/super/"+movieId;
		html5file = "http://m.heyzo.com/members/contents/"+siteId+"/super/"+movieId+"/"+fileName+"?u="+key;
	} else if( status == 'vip' ){
		/* VIP whole movie */
		/*(q == 'low') ? fileName = 'whole_mobile.mp4' : fileName = 'heyzo_lt_'+movieId+'_full.mp4';//20121107 miyoshi del*/
		(q == 'low') ? fileName = 'heyzo_mb_'+movieId+'_full.mp4' : fileName = 'heyzo_lt_'+movieId+'_full.mp4';
		streamerValue = "rtmp://fms.heyzo.com/heyzo/member/contents/"+siteId+"/deluxe/"+movieId;
		html5file = "http://m.heyzo.com/members/contents/"+siteId+"/deluxe/"+movieId+"/"+fileName+"?u="+key;
	} else if( status == 'basic' ){
		/* whole movie */
		/*(q == 'low') ? fileName = 'whole_mobile.mp4' : fileName = 'heyzo_lt_'+movieId+'_full.mp4';//20121107 miyoshi del*/
		(q == 'low') ? fileName = 'heyzo_mb_'+movieId+'_full.mp4' : fileName = 'heyzo_lt_'+movieId+'_full.mp4';
		streamerValue = "rtmp://fms.heyzo.com/heyzo/member/contents/"+siteId+"/"+movieId;
		html5file = "http://m.heyzo.com/members/contents/"+siteId+"/"+movieId+"/"+fileName+"?u="+key;
	} else if( status == 'limited' ){
		/* limited movie(split movie) */
		(q == 'low') ? fileName = 'mobile_1.mp4' : fileName = 'heyzo_lt_'+movieId+'_1.mp4';
		streamerValue = "rtmp://fms.heyzo.com/heyzo/member/contents/"+siteId+"/"+movieId;
		html5file = "http://m.heyzo.com/members/contents/"+siteId+"/"+movieId+"/"+fileName+"?u="+key;
	}else if( status == 'sample' ){
		/* sample movie */
		(q == 'low') ? fileName = 'sample_low.mp4': fileName = 'sample.mp4';
		streamerValue = "rtmp://fms.heyzo.com/heyzo/sample/contents/"+siteId+"/"+movieId;
		html5file = "http://m.heyzo.com/contents/"+siteId+"/"+movieId+"/"+fileName;
		duration = '0';
	}
	if(getCookie('NetiA')){member='?member=1';user = user_email}else{member='';forBeginner=",http://www.heyzo.com/assets/forBeginner.swf";}
	if(typeof _eng !== "string"){_eng = "";}

      jwplayer(id).setup({
		'flashplayer': playerName,
        'file': 'mp4:' + fileName,
		'plugins': playerName,
        'image':((status != 'sample')?'/member':'')+'/contents/'+siteId+'/'+movieId+'/images/player_thumbnail'+thumbnail_b+_eng+'.jpg',
       	'provider':'rtmp',
		'bufferlength': '0',
        'controlbar': 'bottom',
        'stretching':'exactfit',
		'streamer' : streamerValue,
        'width': width,
        'height': height,
		'largescreen':screenStatu,
		'duration':duration,
		'movieType':status,
		'movieId':movieId,
		'movieSeq':movie_seq,
		'user':user,
		'plugins':'http://www.heyzo.com/assets/recommend.swf,http://www.heyzo.com/assets/highlight.swf'+forBeginner,
		'recommendations':'http://www.heyzo.com/recommendation/'+movieId+'/'+member,
		'beginner':'http://www.heyzo.com/for_beginner.html',
		'beginnerImg':'http://www.heyzo.com/projects/player-forBeginner/forBeginner.png',
		'u': key,					/* FMS user key*/
		modes: [{
		type: 'flash',
		src: playerName,
		config: {skin: playerSkin}
		},
		{
		type: 'html5',
		config: { 
		 'file': html5file, 'provider': 'http'}
		}],
		events: {
		onPlay:function(event){
		backGround(true);
		deletIcon();
		},
		onPause:function(event){
		backGround(false);
		showIcon();
		},
		onComplete:function(event){
		backGround(false);
		showIcon();
		thePositon=0;
		heyzo.setStorage(heyzo.moviename()+movieId,thePositon);
		},
		onTime:function(event){
			heyzo.setStorage(heyzo.moviename()+movieId,event.position);
		}
		}
       });
       
	if(screenStatu) resize(true);
}

function backGround(b){
if(b){

if (document.cookie) {
	var cookies = document.cookie.split("; ");
	for (var i = 0; i < cookies.length; i++) {
		var str = cookies[i].split("=");
		if (str[0] == 'playerBackground') {
			gackgroundStatus = str[1];
			break;
		}
	}
}	
if(gackgroundStatus == 0){
backgroundSwitch(gackgroundStatus);
}else{
		backgroundSwitch('');
	}
$('#backgroundSwitch').css('display','block');
}else{
backgroundSwitch('');
backgroundOff();
$('#backgroundSwitch').css('display','none');
}
}

function backgroundSwitch(num){
gackgroundStatus = Number(gackgroundStatus)+num;
document.cookie = 'playerBackground=';
document.cookie = 'playerBackground='+gackgroundStatus; 
if(gackgroundStatus%2 == 0){$('.background-switch').css('margin-top','0px'); backgroundOn();}
else{$('.background-switch').css('margin-top','-30px'); backgroundOff();}
}
function backgroundOn(){
var windowWidht = $(document).width();
var windowHeight = $(document).height();
$('.blackBackGround').css('width',windowWidht+'px').css('height',windowHeight+'px').css('display','block').animate({opacity: 0.9});
}
function backgroundOff(){
$('.blackBackGround').animate({opacity: 0},'',function(){$(this).css('display','none');});
}
function showIcon(){
$('.special_movie_icon').fadeIn('slow');
$('.preliminary').fadeIn('slow');
$('.relateMoviesList').fadeIn('slow');
}
function deletIcon(){
$('.special_movie_icon').fadeOut('slow');
$('.preliminary').fadeOut('slow');
$('.relateMoviesList').fadeOut('slow');
}

$(document).ready(function () {
$('.quality-low').mouseover(function(){$(this).css('background-position','0 -30px');});
$('.quality-low').mouseout(function(){if(!qualityLowBoolean) $(this).css('background-position','0 0');});
$('.quality-heigh').mouseover(function(){$(this).css('background-position','-112px 0');});
$('.quality-heigh').mouseout(function(){if(!qualityHeighBoolean) $(this).css('background-position','-112px -30px');});
$('.quality-low-en').mouseover(function(){$(this).css('background-position','0 -30px');});
$('.quality-low-en').mouseout(function(){if(!qualityLowBoolean) $(this).css('background-position','0 0');});
$('.quality-heigh-en').mouseover(function(){$(this).css('background-position','-112px 0');});
$('.quality-heigh-en').mouseout(function(){if(!qualityHeighBoolean) $(this).css('background-position','-112px -30px');});

      $('.sample-capture').click(function () {
			$.msgBox({
			type:'ws',
			content:"",
			autoClose:true,
			timeOut:1500
			});    
      });
      $('#divReviewformV3').click(function () {
		if(voteBoolean){
			$.msgBox({
			type:'review',
			content:""
			});
		}else{
			$.msgBox({
			type:'join',
			content:"",
			autoClose:true,
			timeOut:1500
			}); 
		}    
      });
	  
	  $('.download-btns').click(function () {
		  if(isLogin(en) == false){
			$.msgBox({
			type:'join',
			content:"",
			autoClose:true,
			timeOut:1500
			});
		  }
      });
	  
	   $('.download-btn').click(function () {
		 if(isLogin(en) == false){
			$.msgBox({
			type:'join',
			content:"",
			autoClose:true,
			timeOut:1500
			});
		  }
      });
	 
	  $('.download-gallery-btn').click(function () {
		  if(!isLogin()){
			$.msgBox({
			type:'join',
			content:"",
			autoClose:true,
			timeOut:1500
			});
		  }
      });

});

function upgrade(s){
$.msgBox({type:'upgrade',title:s,content:"",showButtons:true});
}

function addBookmark(title,url) {
if (window.sidebar) {
window.sidebar.addPanel(title, url,"");
} else if( document.all ) {
window.external.AddFavorite( url, title);
} else if( window.opera && window.print ) {
return true;
}
else{
alert('現在お使いのブラウザーでは、手動でブックマークをしてください。');
}
}
//function login(o){var loginURL = String(document.URL);document.location = 'http://www.heyzo.com/monthly/heyzo/member/trial/login.php?url='+loginURL;}
function login(o){var loginURL = String(document.URL);document.location = 'http://www.heyzo.com/login/login.php?url='+loginURL;}

function loginEng(){var loginURL = String(document.URL);document.location = 'http://en.heyzo.com/monthly/heyzo/member/php/login.php?url='+loginURL;}
/********************************************
*	無料メール登録フォーム
*********************************************/
function resister(){$.msgBox({type:'resister',showButtons:false,content:""});}
/********************************************
*	Switch movie quality (High/Low)
*********************************************/
function qualityMovie(divId, q, duration, b, w, h, s){
	var thePlayer = document.getElementById(divId);
    thePositon = jwplayer(thePlayer).getPosition();
    
    (q =="low") ? qualityLowBoolean=true : qualityLowBoolean=false;
    (qualityLowBoolean) ? qualityHeighBoolean=false : qualityHeighBoolean=true;
    
    if(qualityLowBoolean){
        $('.quality-low'+lang).css('background-position','0 -30px');
        $('.quality-heigh'+lang).css('background-position','-112px -30px');
    }else{
        $('.quality-low'+lang).css('background-position','0 0');
        $('.quality-heigh'+lang).css('background-position','-112px 0');
    }
    jwplayer().remove();
    setUpPlayer( divId, s, siteID, movieId, duration, w, h, 'heyzo_new', q, window.userkey );
    jwplayer(thePlayer).seek(thePositon);
}



function removeElem(target, login_flg){for(var i = 0 ; i < login_flg.length ; i++){target.splice(login_flg[i], 1);}}
function galleryImg(num){if(isLogin()){var m = "member/"}else{var m = ""} document.location.href ="http://www.heyzo.com/"+m+"contents/3000/"+num+"/gallery/gallery_"+num+".zip";}
function userAgent(){var agent = navigator.userAgent;return agent;}
function viewPC(){
	var xDay = new Date;
	xDay.setHours(xDay.getHours() + 24);
	xDay = xDay.toGMTString();
	document.cookie = 'viewPC=1; domain=heyzo.com; expires=' + xDay;
}
function unviewPC(){document.cookie = 'viewPC=0; domain=heyzo.com;'}
$(window).resize(function(){
	windowWidht = $(document).width();
    $('.blackBackGround').css('width',windowWidht+'px');
	var forIE = (browser.match(/MSIE/))?10:0;
	var skipHeaderingLeft = windowWidht- $('#skipHeadering').width()-10-forIE;
	$('#skipHeadering').css('left',skipHeaderingLeft+"px");
	var showValue = ((windowWidht-1100)/2)+1100 + $('#skipHeadering').width()+10;
	/*10 = #skipHeadering padding*/
	if(windowWidht<showValue) $('#skipHeadering').css('display','none');
	else $('#skipHeadering').css('display','block');
});

function reviewTop(){var reviewtop = $('#movie-comment').offset().top-200;$(document).scrollTop(reviewtop);}
/*
navドロップダウン
*********************************************/
var timeout;
var show = 0;
function subCategory(o,target){

var d2pheaderAdjust = ($('.gh-row-2').css('display') == "block" && $(window).scrollTop() == 0 )?42:0;
if(document.domain.match(/en./)){d2pheaderAdjust = 0; subNavAjust = ($(window).scrollTop() == 0)?52:0;}
clearTimeout(timeout);
if(!document.getElementById(target)){
$('body').append(subnav);
var heyzoCategorysNav = document.getElementById(target);
$(heyzoCategorysNav).css('top',subNavAjust+d2pheaderAdjust+'px');
$(heyzoCategorysNav).css('margin-left',$('#wrapper').offset().left+'px');

$(o).hover(function(){show = 1;}, function(){timeout=setTimeout(closeMenu,700);show=0;});
$(heyzoCategorysNav).hover(function(){show=1;clearTimeout(timeout);},function(){timeout=setTimeout(closeMenu,700);show=0;});
}
}
function closeMenu(){if(show==0){$('#heyzo-categorys-nav').remove();}}
function linktoDetail(n){document.location.href ="/moviepages/"+n+"/index.html";}

/*
非メンバー共通ヘッダー
*********************************************/
function setTopheader(){

}
