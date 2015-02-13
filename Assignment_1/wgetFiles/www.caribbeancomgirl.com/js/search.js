function categoryView(cat, page, usertype) {
	var params = '';
	var all = 'false';
	if (!usertype) {
		var usertype = '';
	}
	//alert(cat);
	global_tab_cat = cat;
	switch (cat) {
	case 'online_performers':
		//params = '&online=1&order_by=random';
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/1online");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/1online");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/1online");
		}
		params = '&online=1';
		all = 'true';
		break;
	case 'global':
		params = '&online=1&order_by=random&en=1';
		all = 'true';
		break;
	case 'vibeuse_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/3toy");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/2toy");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/2toy");
		}
		params = '&category=3406,3411';
		break;
	case 'voice_performers':
		params = '&category=3401';
		break;
	case 'recommended_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/4recommended");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/3recomended");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/3recomended");
		}
		params = '&recommended=1';
		//            params = '&recommended=1&not_new=1';
		break;
/*        case 'has_hires_performers':
            params = '&category=3403';
            break;
*/
	case 'new_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/5newgirl");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/4newgirl");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/4newgirl");
		}
		params = '&active_days=30';
		break;
	case 'housewives_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/6housewife");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/5housewife");
		}
		params = '&category=2003';
		break;
	case 'big_tits_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/2bigbreast");
		}
		params = '&big_breast=1';
		break;
	case 'birthmonth_performers':
		params = '&birth_month=1';
		break;
	case 'free_performers':
		params = '&session_type=110';
		break;
	case 'show_face_performers':
		urchinTracker("/menuclick/guest/7faceok");
		params = '&category=3801';
		break;
	case 'moviethumbs':
		if (isVIP()) {
			urchinTracker("/menuclick/vip/7livepreview");
			params = '&session_type=110&moviethumbs=1';
			params += '&force_limit=1&limit=18&page=' + ((typeof(page) != 'undefined') ? page : '1');
		}
		break;
	case 'couponOK_performers':
		params = '&category=9902&order_by=random&original=1';
		break;
/*        case 'couponOK_performers':
            params = '&category=9902&not_hd=1&order_by=random';
            break;
*/
	case 'cosplay_campaign':
		params = '&category=9003&order_by=random';
		break;
	case 'has_hires_performers':
		params = '&category=3407&hd_chat=1&is_server_type=12&order_by=random';
		break;
	case 'document_order_performers':
		params = '&category=9003';
		break;
	case 'fc_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/guest/8fanclub");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/7fanclub");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/6fanclub");
		}
		params = '&fanclub=1';
		all = 'true';
		break;
	case 'favorite_performers':
		if (usertype == 'guest') {
			urchinTracker("/menuclick/reg/6favorite");
		}
		else if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/6favorite");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/5favorite");
		}
		params = '/favorite?thumbnails=dx';
		all = 'true';
		break;
	case 'dvr_performers':
		params = '&dvr_ok=1';
		all = 'true';
		break;
	case 'mygirl':
		if (usertype == 'reg') {
			urchinTracker("/menuclick/reg/8mygirl");
		}
		else if (usertype == 'vip') {
			urchinTracker("/menuclick/vip/8mygirl");
		}
		params = '&save_search=1';
		break;
	}
	//    params += ( cat == 'global' ) ? '&en=1' : '&not_en=1';
	//    if(all == 'true'){
	//    } else {
	//      params += '&not_en=1';
	//    }
	
	blocking("offlinetitle");
	blocking("offlinehere");

	if (cat == 'exshot_performers') {
		if (isUser() || isVIP()) {
			blocking("thumbstitle");
			blocking("sessiontitle");
			blocking("sessionhere");
			blocking("2shottitle");
			blocking("2shothere");
		}
		xmlHttpGet('/search/faceoff/ex?rand=' + Math.random(), 'thumbshere');
	}
	else if (cat == 'ccg_performers') {
		if (isUser() || isVIP()) {
			blocking("thumbstitle");
			blocking("sessiontitle");
			blocking("sessionhere");
			blocking("2shottitle");
			blocking("2shothere");
		}
		xmlHttpGet('/search/faceoff/ccg?rand=' + Math.random(), 'thumbshere');
	}
	else {
		if (all == 'true') {}
		else {
			if (isAdmin() && location.pathname == '/admin') {
				params += '&not_en=0';
			}
			else {
				params += '&not_en=1';
			}
		}
		if (isFreeUser() && (cat == 'mygirl')) {
			var thumbshere = document.getElementById('thumbshere');
			thumbshere.innerHTML = '<div align="center"><a href="/join.html">' + '<img src="/img/mygirl/msg2.jpg"></a></div>';
			blocking("thumbstitle");
			blocking("sessiontitle");
			blocking("sessionhere");
			blocking("2shottitle");
			blocking("2shothere");
		}
		else if (isUser() || isVIP()) {
			if (usertype != 'guest') {
				blocking("mygirltxt");
			}
			if (cat == 'favorite_performers') {
				//xmlHttpGet(params, 'thumbshere');
				xmlHttpGet('/favorite/online', 'onlinehere');
				xmlHttpGet('/favorite/2shot', '2shothere');
				xmlHttpGet('/favorite/offline', 'offlinehere');
				
				blocking("thumbstitle");
				blocking("thumbshere");
				blocking("sessiontitle");
				blocking("sessionhere");
				//blocking("2shottitle");
				//blocking("2shothere");
				if(isFreeUser()) {
					blocking("offlinetitle");
					blocking("offlinehere");
				} else {
					display("offlinetitle");
					display("offlinehere");
				}
				display("onlinetitle");
				display("onlinehere");
			}
			else if (cat == 'online_performers') {
				blocking("onlinetitle");
				blocking("onlinehere");
				display("thumbstitle");
				display("thumbshere");
				display("sessiontitle");
				display("sessionhere");
				display("2shottitle");
				display("2shothere");
				if (isFreeUser()) {
					//document.thumbs.src = "/img/member/freePerformers_bar.jpg";
					//document.session.src = "/img/member/busyPerformers_bar.jpg";
					xmlHttpGet('/search?online=1&session_type=110&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'thumbshere');
					xmlHttpGet('/search?online=1&session_type=115,120&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'sessionhere');
				}
				else {
					if (isUser()) {
						//document.session.src = "/img/member/busyPerformers_bar.jpg";
						//document.thumbs.src = "/img/member/freePerformers_bar.jpg";
					}
					else {
						//document.session.src = "/img/member/vip/busyPerformers_bar.jpg";
						//document.thumbs.src = "/img/member/vip/freePerformers_bar.jpg";
					}
					xmlHttpGet('/search?online=1&session_type=110&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'thumbshere');
					xmlHttpGet('/search?online=1&session_type=115,120&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'sessionhere');
				}
				xmlHttpGet('/search?online=1&session_type=125,130&order_by=jp_2shot' + params + '&rand=' + Math.random(), '2shothere');
			}
			else if (cat == 'moviethumbs') {
				xmlHttpGet('/search?online=1&gets_hits=0&order_by=login_date' + params + '&rand=' + Math.random(), 'thumbshere');
				blocking("onlinetitle");
				blocking("onlinehere");
				blocking("thumbstitle");
				blocking("thumbshere");
				blocking("sessiontitle");
				blocking("sessionhere");
				blocking("2shottitle");
				blocking("2shothere");
			}
			else {
				//xmlHttpGet('/search?online=1&gets_hits=0&order_by=random'+params+'&rand='+ Math.random(), 'thumbshere');
				blocking("onlinetitle");
				blocking("onlinehere");
				display("thumbstitle");
				display("thumbshere");
				display("sessiontitle");
				display("sessionhere");
				display("2shottitle");
				display("2shothere");
				if (cat == "mygirl") display("mygirltxt");
				if (isFreeUser()) {
					//document.thumbs.src = "/img/member/freePerformers_bar.jpg";
					//document.session.src = "/img/member/busyPerformers_bar.jpg";
					xmlHttpGet('/search?online=1&session_type=110&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'thumbshere');
					xmlHttpGet('/search?online=1&session_type=115,120&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'sessionhere');
				}
				else {
					if (isUser()) {
						//document.session.src = "/img/member/busyPerformers_bar.jpg";
						//document.thumbs.src = "/img/member/freePerformers_bar.jpg";
					}
					else {
						//document.session.src = "/img/member/vip/busyPerformers_bar.jpg";
						//document.thumbs.src = "/img/member/vip/freePerformers_bar.jpg";
					}
					xmlHttpGet('/search?online=1&session_type=110&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'thumbshere');
					xmlHttpGet('/search?online=1&session_type=115,120&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'sessionhere');
				}
				xmlHttpGet('/search?online=1&session_type=125,130&order_by=jp_2shot' + params + '&rand=' + Math.random(), '2shothere');
			}
		}
		else { // for guest
			if (cat == 'mygirl') {
				var thumbshere = document.getElementById('thumbshere');
				thumbshere.innerHTML = '<div align="center"><a href="/join.html">' + '<img src="/img/mygirl/msg1.jpg"></a></div>';
				blocking("thumbstitle");
				blocking("sessiontitle");
				blocking("sessionhere");
				blocking("2shottitle");
				blocking("2shothere");
			}
			else {
				display("thumbstitle");
				display("sessiontitle");
				display("sessionhere");
				display("2shottitle");
				display("2shothere");
				xmlHttpGet('/search?online=1&session_type=110&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'thumbshere');
				xmlHttpGet('/search?online=1&session_type=115,120&order_by=jp_en_then_wait_time' + params + '&rand=' + Math.random(), 'sessionhere');
				xmlHttpGet('/search?online=1&session_type=125,130&order_by=jp_2shot' + params + '&rand=' + Math.random(), '2shothere');
			}
		}
	} //CCG EX check.
}

function blocking(id_name) {
	//console.log(id_name);
	if ($('#' + id_name).length == 1) {
		if (document.layers) {
			document.layers[id_name].display = 'none';
		}
		else if (document.all) {
			document.all[id_name].style.display = 'none';
		}
		else if (document.getElementById) {
			document.getElementById(id_name).style.display = 'none';
		}
	}
}

function display(id_name) {
	//console.log(id_name);
	if ($('#' + id_name).length == 1) {
		if (document.layers) {
			document.layers[id_name].display = 'block';
		}
		else if (document.all) {
			document.all[id_name].style.display = 'block';
		}
		else if (document.getElementById) {
			document.getElementById(id_name).style.display = 'block';
		}
	}
}

function set_cookie(name, value, path, domain, secure) {
	var cookie_string = name + "=" + escape(value);
	var expires = new Date();
	expires.setMonth(expires.getMonth() + 12);
	cookie_string += "; expires=" + expires.toGMTString();
	if (path) cookie_string += "; path=" + escape(path);
	if (domain) cookie_string += "; domain=" + escape(domain);
	if (secure) cookie_string += "; secure";
	document.cookie = cookie_string;
}

function get_cookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	if (results) return (unescape(results[2]));
	else return null;
}

function saveSearch(user_type) {
	var currentSearchParam = get_cookie('currentSearch');
	set_cookie("saveSearch", currentSearchParam);
	// counting RT79621
	//xmlHttpGetRedirect('/search/updateSavedSearchCount/');
	var utm_source = 'girlssearch';
	var utm_medium = 'save' + user_type;
	_userv = 2;
	_ucmd = 'save' + user_type;
	_ucsr = 'girlssearch';
	_page = 'searchSave?';
	urchinTracker();
	window.location = "/member/?utm_source=girlssearch&utm_medium=save" + user_type;
}

function xmlHttpGetRedirect(strURL) {
	var xmlhttp = false;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest(); //Mozilla/Safari/IE7/Chrome/Opera
	}
	else if (window.ActiveXObject) { //IE6/IE5
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	if (!xmlhttp) return;
	strURL += (strURL.indexOf('?') > 0 ? '&t=' : '?t=') + Math.random();
	xmlhttp.open('GET', strURL, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			window.location = "/member";
		}
	}
	xmlhttp.send(null);
	return;
}
