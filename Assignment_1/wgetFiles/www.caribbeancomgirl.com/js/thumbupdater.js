// Auto Thumbnail Updater

var global_tab_cat		=	"online_performers";
var global_tab_interval	=	10000;		// Default Interval : 10sec.
var global_min_interval	=	10000;		// Minimum Interval : 10sec.
var global_cookiname	=	"refreshflag";
var global_frompage		=	"home";
var global_prevpage		=	"home";
var global_timeotid;

function setCookie (name, value){
  document.cookie = name + '=' + escape(value) + ";path=/;"
}

function getCookie(cookieName){
  var search = cookieName + '=';
  if (document.cookie.length>0) {
    offset = document.cookie.indexOf(search);
    if (offset != -1){
      offset += search.length;
      end     = document.cookie.indexOf(';',offset);
      if(end == -1)
        end = document.cookie.length;
      return unescape(document.cookie.substring(offset,end));
    }
  }
  return null;
}

function autoupdate() {
		tab = 1;
		tab = 10;
	cflag	=	getCookie(global_cookiname);
	if(cflag == 1)	{
		if(global_tab_interval < global_min_interval) {
			global_tab_interval = global_min_interval;
		}
		//setTimeout('autoupdate("'+frompage+'")',global_tab_interval, frompage);
		
		switch(global_frompage) {
			case	'favorite':
				updthumbfav();
				break;
			case	'mypage':
				updthumbmyp();
				break;
			default:
				global_frompage	=	"home";
				tabcat	=	global_tab_cat;
				page	=	"";
				usertype=	"guest";
				//alert("AUTO");
				categoryView(tabcat, page, usertype);
				xmlHttpGet('/search?tpl=bakuhatsu_new&limit=4&force_limit=1&online=1&session_type=115,120&order_by=popular','bk_bakuhatsuHolder');
		}
		if(global_prevpage	==	global_frompage)	{
			clearTimeout(global_timeotid);
			global_prevpage	=	global_frompage;
		}
		//console.log("autoupdate LINE 60 frompage="+global_frompage);
		global_timeotid	=	setTimeout('autoupdate()',global_tab_interval);

	} else if(cflag == 0) {
	} else {
		setCookie(global_cookiname, '0');
	}
}

function onoffswitch(flg) {
	var id_on		=	'thumbtn_on';
	//var id_off		=	'thumbtn_off';
	var myClassName	=	" hmar_selected"; //must keep a space before class name
	var d_on;
	//var d_off;
	d_on	=	document.getElementById(id_on);
	//d_off	=	document.getElementById(id_off);

	cflag	=	getCookie(global_cookiname);

	if(flg == 9) {
		if(cflag == 1) {
			cflag = 0;
		} else {
			cflag = 1;
		}
	}

	if(cflag == 1) {
		//$('#thumbtn_on').addClass('hmar_selected');
		//$('#thumbtn_off').removeClass('hmar_selected');
		
		d_on.className	=	d_on.className.replace(myClassName,"");
		//alert(d_on.textContent);
		//d_on.className	=	d_on.className + myClassName;
		//d_off.className	=	d_off.className.replace(myClassName,"");
		
		d_on.textContent	=	"オフ";
		setCookie(global_cookiname, '0');
		//autoupdate('home');
	} else {
		//$('#thumbtn_on').removeClass('hmar_selected');
		//$('#thumbtn_off').addClass('hmar_selected');

		//d_off.className	=	d_off.className.replace(myClassName,"");
		//d_off.className	=	d_off.className + myClassName;
		d_on.className	=	d_on.className.replace(myClassName,"");
		d_on.className	=	d_on.className + myClassName;
		d_on.textContent	=	"オン";
		setCookie(global_cookiname, '1');
		autoupdate('home');
	}
}

function init_onoffswitch() {
	//cflag	=	getCookie(global_cookiname);
	//if(cflag == 1)	{
		onoffswitch(9);	// Initialize the class name.
	//} else {
	//	onoffswitch(0);
	//}
}



