//<!-
var userName = '';
var userId = '';
var gender = '';
var NuserName = '';
var userType = '';
var profile_id = '';
var profile_name = '';
var direct_buy = false;
var nightWork = 0;
var secure_url = 'https://secure.monroo.com';
var guestId = '';

net = getCookie('NetiA');
if(net){
	var narr = net.split(':');
	var NetiName = narr[0];
	NuserName = NetiName.toLowerCase();
}

c = getCookie('vauth');
if(c && net) {
	var arr = c.split(':');
	var vauthName = arr[0];
	userName = vauthName.toLowerCase();
	userId = arr[1];
	userType = arr[2];
	nightWork = arr[5];  
	if(arr[2] == 210 || arr[2] == 211)
		gender = 'f';
	else
		gender = 'm';
}

p  = getCookie('vauth_profile');
if(p){
    var p_arr = p.split(':');
    profile_id = p_arr[0];
    profile_name = decodeURIComponent(p_arr[1]);
}

if(getCookie('direct_buy') == 1){
    direct_buy = true;
}

g = getCookie('realtimeauth');
if(g){
    guestId = g;
}

var user_arr = new Array();
var cr_arr = new Array();
var tc_arr = new Array();
var du_arr = new Array();

function setCookie(name, value){
	document.cookie = name + '=' + escape(value) + ";path=/;"
}

function Logout(){
    var strURL = '/dial/isOnline';
    var xmlhttp = getXmlhttp();
    if(!xmlhttp){  
        return;
    }
    strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();
    xmlhttp.open('GET', strURL, true);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText == '100' || xmlhttp.responseText == 100){
                var re = confirm("モンローダイヤルに待受け中です。\n待受け中のままログアウトしますか？");
                if(re){
                    location.href = '/login/logout';
                }
            }else if(xmlhttp.responseText == '101' || xmlhttp.responseText == 101){
                var re = confirm("モンローダイヤルに呼び出し中です。\n待受け中のままログアウトしますか？");
                if(re){
                    location.href = '/login/logout';
                }
            }else if(xmlhttp.responseText == '102' || xmlhttp.responseText == 102){
                var re = confirm("モンローダイヤルで会話中です。\n会話中のままログアウトしますか？");
                if(re){
                    location.href = '/login/logout';
                }
            }else{
                location.href = '/login/logout';
            }
        }
    }
	xmlhttp.send(null);
	return;
}

function getCookie(cookieName){
	var search = cookieName + '=';
	if (document.cookie.length>0){
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

function xmlHttpGet(strURL, elementId){
	var xmlhttp = false;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest(); //Mozilla/Safari
	}else if(window.ActiveXObject){ //IE
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	if(!xmlhttp) return;
	if(strURL != '/d2ptb'){
		strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();
	}
	xmlhttp.open('GET', strURL, true);
	xmlhttp.onreadystatechange = function(){
		var obj = getElementFromName(elementId);
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(obj) obj.innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.send(null);
	return;
}

function xmlHttpGetWithLoader(strURL, elementId){
    var xmlhttp = getXmlhttp();
    if(!xmlhttp){
        return; 
    }
    if(strURL != '/d2ptb'){
        strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();
    }
    xmlhttp.open('GET', strURL, true);
    xmlhttp.onreadystatechange = function() {
        var obj = getElementFromName(elementId);
        if(xmlhttp.readyState == 1){
            showLoader(obj);
        }
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(obj) obj.innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.send(null);
    return;
}

function xmlHttpPost(strURL, params, elementId){
	var xmlhttp = false;
 	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest(); //Mozilla/Safari
	}else if(window.ActiveXObject){ //IE
		try{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	if(!xmlhttp) return;
	strURL += (strURL.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();
	xmlhttp.open('POST', strURL, true);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function(){
		var obj = getElementFromName(elementId);
		if(xmlhttp.readyState == 1){
			//showLoader(obj);
		}
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(obj) obj.innerHTML= xmlhttp.responseText;
		}
	}
	xmlhttp.send(params);
	return;
}

function getXmlhttp(){
	var xmlhttp = null;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest(); //Mozilla/Safari
	}else if(window.ActiveXObject){ //IE
		try{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlhttp;
}

function ajaxRequest(method, url, data, async, callback){
	var xmlhttp = getXmlhttp();
	if(!xmlhttp){
		return;
	}
	url +=  (url.indexOf('?')>0?'&_rand=':'?_rand') + Math.random();
	xmlhttp.open(method, url, async);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			callback(xmlhttp);
		}
	}
	xmlhttp.send(data);
}

function showLoader(obj){
    if(obj){
        obj.innerHTML = '';
        obj.innerHTML = '<img src="/img/colorbox/loading.gif">';
    }
}

function getElementFromName(nm){
	// IE5+, Mozilla, Opera
	if(document.getElementById) return document.getElementById(nm);
	if(document.all) return eval('document.all.' + nm); // IE4
	if(document.layers){ // NN4
		var s='';
		for(var i=1; i<arguments.length; i++)
			s+='document.layers.'+arguments[i]+'.';
		return eval(s+'document.layers.'+nm);
	}
	return null;
}

function fixPNGImages(areaID){
	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);
	if((version >= 5.5) && (document.body.filters)){
		var pngAreaObj=document.getElementById(areaID);
		var pnglist=pngAreaObj.getElementsByTagName("img");
		for(var i=0; i<pnglist.length; i++){
			var img = pnglist[i];
			var imgName = img.src.toUpperCase();
			if(imgName.substring(imgName.length-3, imgName.length) == "PNG"){
				var imgID = (img.id) ? "id='" + img.id + "' " : "";
				var imgClass = (img.className) ? "class='" + img.className + "' " : "";
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
				var imgStyle = "display:inline-block;" + img.style.cssText;
				if(img.align == "left") imgStyle = "float:left;" + imgStyle;
				if(img.align == "right") imgStyle = "float:right;" + imgStyle;
				if(img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
				var strNewHTML = "<span " + imgID + imgClass + imgTitle
					+ " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
					+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
					+ "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
				img.outerHTML = strNewHTML;
				i = i-1;
			}
		}
	}
}

function isLogin(){
    if(net && c){
	    return (userName == NuserName)?true:false;
    }
    return false;
}

function isVIP(){
	return (userType==206)?true:false;
}

function isMale(){
    return (gender=='m')?true:false;
}

function isFemale(){
    return (gender=='f')?true:false;
}

function isUser(){
	return (userType==205 || userType==207 || userType==208 || userType==215 || userType==220)?true:false;
}

function isPerformer(){
	return (userType==210)?true:false;
}

function isRegularUser(){
	return (userType==205)?true:false;
}

function isFreeUser(){
	return (userType==207 || userType==208)?true:false;
}

function isAdmin() {
	return (userType==215 || userType==220)?true:false;
}

function getSessionType(profile_id){
    if(user_arr && user_arr!=null){
        var user = user_arr[profile_id];
        if(user!=null){
            return user.session_type;
        }
    }
    return 0;
}

function getComponentBit(profile_id){
    if(user_arr && user_arr!=null){
        var user = user_arr[profile_id];
        if(user!=null){
            return user.component_bit;
        }
    }
    return 0;
}

function getChatType(profile_id){
    if(user_arr && user_arr!=null){
        var user = user_arr[profile_id];
        if(user!=null){
            return user.chat_type;
        }
    }
    return 0;
}

function isOnline(profile_id){
    if(profile_id == '' || profile_id == null)
        return false;
    var session_type = getSessionType(profile_id);
    var chat_type = getChatType(profile_id);
    if(session_type > 0)
        return chat_type; 
    else
        return false;
}

function isInChatroom(profile_id){
    if(profile_id == '' || profile_id == null)
        return false;
    if(cr_arr && cr_arr!=null){
        var cr = cr_arr[profile_id];
        if(cr != null){
            return cr.chatroom_id;
        }
    }
    return false;
}

function isInTextChat(profile_id){
    if(profile_id == '' || profile_id == null)
        return false;
    if(tc_arr && tc_arr!=null){
        var tc = tc_arr[profile_id];
        if(tc != null){
            return tc.profile_id;
        }
    }   
    return false;
}

function onlineStatus(profile_id){
    if(isOnline(profile_id)){
        if(getChatType(profile_id) == 1){
            document.write('<span class="blackBtn"><a href="javascript:void(0)" class="onlines" onclick="viewerChat('+profile_id+')" title="２ショットチャットする">2ショット</a></span>');
            return 1;
        }else if(getChatType(profile_id) == 2){
            document.write('<span class="blackBtn"><a href="javascript:void(0)" class="onlines" onclick="viewerPeep('+profile_id+')" title="覗いてみる">覗く</a></span>');
            return 1;
        }
    }
    if(isInChatroom(profile_id) > 0){
        document.write('<span class="blackBtn"><a href="/chatroom?on_profile_id='+profile_id+'" class="onlines" title="只今チャットルームにいます">チャットルーム</a></span>');
        return 2;
    }
    return false;
}   

function homeChatStatus(profile_id){
    if(isOnline(profile_id)){
        if(getChatType(profile_id) == 1){
            return 1;
        }else if(getChatType(profile_id) == 2){
            return 2;
        }
    }
    return false;
}

function homeOnlineStatus(profile_id){
    if(isOnline(profile_id)){
        if(getChatType(profile_id) == 1){
            document.write('<dd class="twoshot">');
            return 1;
        }else if(getChatType(profile_id) == 2){
            document.write('<dd class="peep">');
            return 1;
        }
    }
    if(isInChatroom(profile_id) > 0){
        document.write('<dd class="room">');
        return 2;
    }
    document.write('<dd>');
    return;
}

function checkAll(theElement){
	var theForm = theElement.form;
	for(i=0; i<theForm.length;i++){
		if(theForm[i].type == 'checkbox' && theForm[i].name != 'checkall'){
			theForm[i].checked = theElement.checked;
		}
	}
}

function updateUserPoints(no_cache, elem){
    if(isLogin() && isMale()){
		xmlHttpGet('/user/updateUserPoints/'+no_cache, elem);
    }
}

function updateUserLevel(no_cache){
    if(isLogin() && isMale()){
		xmlHttpGet('/user/updateUserLevel/'+no_cache,'user_level');
    }
}

function updateUserMileage(no_cache){
    if(isLogin() && isMale()){
		xmlHttpGet('/user/updateUserMileage/'+no_cache,'user_mileage');
    }
}

function updatePerformerMileage(no_cache){
    if(isLogin() && isFemale()){
		xmlHttpGet('/user/updateUserMileage/'+no_cache,'performer_mileage');
    }
}

function updateUserStamprally(){
    if(isLogin() && isFemale()){
		xmlHttpGet('/user/updateUserStamprally','stamprally_date');
    }
}

function performerEarningPoints(elm){
    if(isLogin() && isFemale()){
       xmlHttpGet('/user/performerEarningPoints',elm);
    }
}

function onlineTotalCount(){
    xmlHttpGet('/user/onlineTotalCount','onlinetotalcount');
}

function registerTotalCount(){
    xmlHttpGet('/user/registerTotalCount','registertotalcount');
}

function updateDelayPoint(){
    setTimeout('updateUserPoints(1)',3000);
}

function updateUnreadMail(elm){
    if(isLogin()){
		xmlHttpGet('/mail/countUnread', elm);
    }
}

function getUnreadIne(elm){
    if(isLogin()){
		xmlHttpGet('/ine/getUnreadIne', elm);
    }
}

function updateBulkUnreadMail(){
    if(isLogin()){
		xmlHttpGet('/mail/countBulkUnread', 'bulk_mail_num');
    }
}

function updateUnreadFolderMail(id){
    if(isLogin()){
		xmlHttpGet('/mail/countUnread/'+id, id);
    }
}

function updateUserBD(){
    if(isLogin()){
		xmlHttpGet('/profile/birthday','bday');
    }
}

function updateUserStatistics(){
	xmlHttpGet('/userStatistics/stamprallyrecommend','userstatistics');
}

function hideMiniAction(id){
    if(!id || !isLogin())
        return;
    if(id != profile_id)
        return;
    if($("#mini_action"))
        $("#mini_action").hide(); 
}

/*
function composeMail(pid){
    if(isLogin()){
        var height = 900;
        if(gender == 'f'){
            var height = 800;
        }            
        windowOpen('/mail/compose/'+pid+'?popup=1',700, height);
    }else{
        alert("会員様専用機能です。");
    }
}
*/

function composeMail(pid){
    if(!isLogin()){
        alert("会員様専用機能です。");
    }else if(userType==204){
        alert("こちらは正規会員限定の機能となります。");
    }else{
        var height = 900;
        if(gender == 'f'){
            var height = 800;
        }
        windowOpen('/mail/compose/'+pid+'?popup=1',700, height);
    }
}

function commentMail(prod_id, pid){
    var height = 900;
    if(gender == 'f'){
        var height = 800;
    }
    windowOpen('/mail/comment/'+prod_id+'/'+pid,700, height);
}

function pointPurchase(a){
    if(isLogin()){
		if(a){			
			windowOpen('/goods#'+a,1040,800);
		}else{
            location.href="/goods?type=add";
		}
    }else{
        windowOpen('/goods?type=join',1040,800);
    }
}

function pointPurchaseBank(){
    if(isLogin()){
        windowOpen('/goods/bank?type=add',840,800);
    }else{
        windowOpen('/goods/bank?type=join',840,800);
    }
}

function pointAdd(){
    windowOpen('/goods?type=add',1240,900);
}

function addFavorite(pid){
    windowOpen('/favorite/add/'+pid,700,450);
}

function editBlockFavorite(pid){
    windowOpen('/favorite/edit_block/'+pid,800,500);
}

function editFavorite(pid){
    windowOpen('/favorite/edit/'+pid,800,500);
} 

function viewerChat(pid){
    if(isLogin()){
        windowOpen('/chat/'+pid+'/115',600,550);
        deleteEle();
    }else{
        windowOpen('/guest?next=/chat/'+pid+'/115',900,850);
    }
}

function viewerPeep(pid){
    if(isLogin()){
        windowOpen('/peep/'+pid, 'peep'+pid,602,560);
        deleteEle();
    }else{
        windowOpen('/guest?next=/peep/'+pid,900,850);
    }
}

function maleOnline(){
    if(isLogin()){
        windowOpen('/chat/male',600,550);
    }else{
        windowOpen('/guest?next=/chat/male',900,850);
    }
}

function productClaim(id){
    windowOpen('/productClaim/'+id,650,340);
}

function productRecommend(id){
    windowOpen('/productClaim/'+id+'?recommend=1',650,340);
}

function productRatingClaim(id){
    windowOpen('/productClaim/ratingClaim/'+id,650,340);
}

function profileClaim(id){
    windowOpen('/profileClaim/'+id,650,340);
}

function bbsClaim(id){
    windowOpen('/bbs/bbsClaim/'+id,650,340);
}

function bbsDelete(id){
    windowOpen('/bbs/delete/'+id+'?type=favorite',650,340);
}

function chat(){
    var check = windowOpen('/chat',650,580);
}

function peep(){
    var check = windowOpen('/peep',602,510);
}

function forceTwoChat(){
    var check = windowOpen('/chat?force_2shot=1',600,500);
    deleteEle();
}

function videoUpload(){
    if(isLogin()){
        windowOpen('/video/upload',750,600);
    }else{
        alert('女の子専用の機能です。');
    }
}

function videoHowto(){
    windowOpen('/video/howto',900,850);
}

function videoPlayer(vid){
    windowOpen('/video/player/'+vid,540,405);
}

function openProfile(uid){
    windowOpen('/user/'+uid,900,850);
}

function openSendMail(uid){
    windowOpen('/user/sendMail/'+uid,700,450);
}

function openGuest(){
    var next = location.href;
    windowOpen('/guest?next='+next,900,850);
}

function openChatroom(id){
    if(!isLogin()){
        alert('会員専用機能です。');
        return false;
    }else if(userType==211){
        location.href = "/report/idissue";
        return false;
    }else{
        if(id == undefined)
            id = 1;
        windowOpen('/chatroom/join/'+id,920,723);
    }
}

/*
function openChatroom(id){
    if(id == undefined)
        id = 1;
    windowOpen('/chatroom/join/'+id,920,723);
}
*/
function createChatroom(){
    windowOpen('/chatroom/create',920,723);
}

function chatHowto(){
    windowOpen('/askUs/howtochat',800,850);
}

function chatroomHowto(){
    windowOpen('/askUs/howtochat/chatroom',800,850);
}

function openMonrooAV(){
    windowOpen('/chatroom/av',750,580);
}

function nozokiHowto(){
    windowOpen('/askUs/howtochat/nozoki',800,850);
}

function eventHowto(){
    windowOpen('/askUs/event',830,850);
}

function openPromo(name){
    windowOpen('/promo/'+name,820,627);
}

function openHashtag(){
    windowOpen('/askUs/hashtag',600,880);
}

function openLevel(){
    windowOpen('/askUs/level',805,800);
}

function openStamprally(){
    windowOpen('/askUs/stamprally',970,800);
}

function openHowtoTxtChat(){
    windowOpen('/askUs/txtchat',768,680);
}

function openHowtoCampaign(){
    windowOpen('/askUs/campaign',860,815);
}

function closeCurrentWindow(){
    window.close();
}

function refresh(){
    window.location.reload();
}

function reloadSec(sec){
    if(sec){
        setTimeout(function(){window.location.reload(1);}, sec);
    }else{
        window.location.reload();
    }
}

function getWink(pid){
    if(!isFemale()){
        xmlHttpGet('/wink/get/'+pid, 'wink');
    }
}

function submitWink(pid){
    if(document.getElementById('wink_message').value == "メッセージを添えたい時は、このボックスに入力しボタンを押して下さい。"){
        var w_message = '';
    }else{
        var w_message = document.getElementById("wink_message").value;
    }
    var params = 'message='+w_message;
    xmlHttpPost('/wink/save/'+pid, params, 'wink');
}

function clearTextBox(){
    if(document.getElementById('wink_message').value == "メッセージを添えたい時は、このボックスに入力しボタンを押して下さい。"){
        document.getElementById('wink_message').value = '';
    }
}

function check_browser_version(){
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	if(isIE){
		var arVersion = navigator.appVersion.split("MSIE");
 		var version = parseFloat(arVersion[1]);
		return version;
	}
	return 7;
}

function show_d2ptb(){
    var version = check_browser_version();
    if(isLogin() && version >= 7){ 
        var url = "/d2ptb";
        var xmlhttp = getXmlhttp();
        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var str = xmlhttp.responseText;
                if(str){
                    document.getElementById("d2ptoolbar").style.display = 'block';
                    var iFrameBody = document.getElementById("d2ptoolbar").contentWindow.document.body;
                    if (iFrameBody) {
                        iFrameBody.innerHTML = str;
                        document.getElementById("d2ptoolbar").style.height = 23;
                    }
                }else{
                    document.getElementById("d2ptoolbar").style.display = 'none';
                }
            }else{
                return;
            }
        }
        xmlhttp.send(null);
    }
}

function redirect(uid,uid2,session_type){
    if(isLogin()){
        if(session_type == 120){
            windowOpen('/user/peep/'+uid2,600,500);
        }else{
            windowOpen('/user/chat/'+uid+'/115',600,500);
        }
    }else{
        windowOpen('/guest?next=/user/chat/'+uid+'/115',900,850);
    }
}

function animationLog(cs_id){
    var xrequest = getXmlhttp();
    xrequest.multipart = true;
    xrequest.open("GET","/chatroom/pushLog?cs_id="+cs_id,true);
    xrequest.onreadystatechange = function(){
        var obj = document.getElementById('animation');
        if (xrequest.readyState == 4 && xrequest.status == 200){
            if(obj) obj.innerHTML = xrequest.responseText;
        }
    }
    xrequest.send(null);
}

function open2shotFemale(){
    alert('チャットを開始します');
    var ele = document.getElementById('chatStart');
    ele.style.display = 'block';
    ele.innerHTML = '<a href="javascript:;" onClick="forceTwoChat();"><img src="/images/chatroom/popup/2shot_startbt.jpg"></a>';
    chat();
}

function open2shotMale(pid){
    alert('チャットを開始します');
    var ele = document.getElementById('chatStart');
    ele.style.display = 'block';
    ele.innerHTML = '<a href="javascript:;" onClick="viewerChat('+pid+');"><img src="/images/chatroom/popup/2shot_startbt.jpg"></a>';
}

function deleteEle(){
    var ele = document.getElementById('chatStart');
    ele.style.display = 'none';
}

function toOpenURL(toUrl){
    if(window.opener){
        window.opener.location = toUrl;
    }else{
        window.location = toUrl;
    }
}

function likeIt(ch_id,chl_id,id){
    if(!isLogin()){
        $('#likeIt'+id).html('会員専用機能です。');
    }else{
        var strURL = '/chatroom/addLikeIt/'+ch_id+'/'+chl_id;
        xmlHttpGet(strURL,'likeIt'+id);
    }
}

function showProfilePic(type){
    if(profile_id != ''){
        var fourProfileIdFirst = profile_id.substring(0,4);
        var fourProfileIdLast = profile_id.substring(4);
        document.write('<img src="http://images.monroo.com/'+fourProfileIdFirst+'/'+fourProfileIdLast+'/'+type+'profile.jpg">');
    }
}

function openViewerRegister(){
    windowOpen(secure_url+'/viewerRegister',980,800);
}

function realTime(place_type){
    xmlHttpGet('/realTime/set/'+place_type,'guest_elm');
}

function getGuestName(){
    xmlHttpGet('/realTime/getGuestName','guest_name');
}
//function realTimeGuest(place_type){
//    xmlHttpGet('/guest/set/'+place_type,'guest_elm');
//}
function closeChat(){
	$('.textchatbox').css('display','none');
}