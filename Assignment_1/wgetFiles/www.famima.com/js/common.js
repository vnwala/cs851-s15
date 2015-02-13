var Dom_NN4		= false;
var Dom_NN6		= false;

//Mac or Win判定
var Dom_mac = false;
var Dom_win = false;

Dom_mac=navigator.userAgent.indexOf('Mac')!=-1;
if(!Dom_mac)
{
	Dom_win = true;
}

//NN or IE判定
var Dom_IE = false;
var Dom_NN = false;

Dom_IE= navigator.userAgent.indexOf('MSIE') != -1;
if(!Dom_IE)
{
	Dom_NN= navigator.userAgent.indexOf('Mozilla') != -1;
}

if(Dom_NN)
{
	//NN Version判定
	Dom_NN4= navigator.userAgent.indexOf('Mozilla/4') != -1;
	//Netscape6.2以上の場合Dom_NN6はtrue
	Dom_NN6= navigator.userAgent.indexOf('Netscape6') != -1;
	//NN4.x,6.x以外のNNはNN6として処理
	if(Dom_NN4 != true && Dom_NN6 != true)
	{
		Dom_NN6=true;
	}
}



function openWin(url) {
     window.open(url,"_blank","width=420,height=420,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,favorites=no,resizable=yes");
}

// ダブルクリックの制御
var dblClickControl = false;

function checkDblClick() {
  if(!dblClickControl) {
    dblClickControl = true;
    return true;
  }
  else {
    return false;
  }
}

// ダブルクリック制御をする確認ダイアログ
function checkDblClickConfirm(msg) {
    if(!dblClickControl && window.confirm(msg)) {
        dblClickControl = true;
        return true;
    }
    return false;
}


function getElement(id)
{
	if(document.all) return document.all(id);
	if(document.getElementById) return document.getElementById(id);
}

//各確認チェック
window.onload = function ()
{
	var npwd1 = getElement("npwd1");
	var npwd2 = getElement("npwd2");
	var newid1 = getElement("newid1");
	var newid2 = getElement("newid2");
	var mail = getElement("mail");
	var cmail = getElement("cmail");
	var newmail1 = getElement("newmail1");
	var newmail2 = getElement("newmail2");
	// 会員情報メールアドレスチェック
	if(mail && cmail)
	{
		cmail.form.onsubmit = function() { return checkMail(mail,cmail); }
	}
	// 新パスワードと確認パスワードのチェック
	if(npwd1 && npwd2)
	{
		npwd2.form.onsubmit = function() { return checkpass(npwd1,npwd2); }
	}
	// 新IDと確認IDのチェック
		if(newid1 && newid2)
	{
		newid2.form.onsubmit = function() { return checkid(newid1,newid2); }
	}
	// メールアドレス変更時チェック
	if(newmail1 && newmail2)
	{
		newmail2.form.onsubmit = function() { return checkMail(newmail1,newmail2); }
	}
}


function checkMail(mail, cmail)
{
	if(mail.value != cmail.value)
	{
		alert ("メールアドレスとメールアドレス（確認）が一致しません");
    	dblClickControl = false;
		return false;
	}
	return true;
}

function checkpass(npwd1, npwd2)
{
	if(npwd1.value != npwd2.value)
	{
		alert ("入力されたパスワードと確認用パスワードが一致しません");
		return false;
	}
	return true;
}

function checkid(newid1, newid2)
{
	if(newid1.value != newid2.value)
	{
		alert ("入力されたIDと確認用IDが一致しません");
		return false;
	}
	return true;
}

function checkidpass(arg1,arg2)
{
	var arg1v = document.getElementById(arg1).value;
	var arg2v = document.getElementById(arg2).value;

	if(arg1v != "" && arg2v != "")
		{
		if(arg1v == arg2v)
			{
			alert("お客様IDとパスワードは別々のものを指定してください");
			document.getElementById(arg2).value = "";
			return false;
			}
		}
}

function checkidpass(arg1,arg2,arg3)
{
	var arg1v = document.getElementById(arg1).value;
	var arg2v = document.getElementById(arg2).value;

	if(arg1v != "" && arg2v != "")
		{
		if(arg1v == arg2v)
			{
			alert("お客様IDとパスワードは別々のものを指定してください");
			document.getElementById(arg2).value = "";
			if(arg3){document.getElementById(arg3).value = "";}
			return false;
			}
		}
}


//アンケート用
//ダブルクリック禁止処理
var iPrevTime = null;
function formSubmit() {
	if( iPrevTime == null ) {
		iPrevTime = 1;
		return true;
	} else {
		return false;
	}
}

//半角<->全角変換
function StrConvert(obj, isHanToZen){
	var str = obj.value;
	var conv = "";
	var map = isHanToZen ? convmap.hanMap : convmap.zenMap;

	for (var i = 0; i < str.length; i++) {
		var tmp = "";
		if (i < str.length - 1 ){
			tmp = str.substring(i,i+2);
		}
		if (map[tmp]) {
			conv += map[tmp];
			i++;
			continue;
		} else {
			tmp = str.substring(i, i + 1);
			conv += map[tmp] ? map[tmp] : tmp;
		}
	}
	obj.value = conv;
	return true;
}

//半角<->全角変換マッピングクラス
function ConvertMaps() {
	this.hanMap = {};
	this.zenMap = {};
	this.Init = function(){
		//全角->半角マップ
		this.zenMap = {
			'ａ' : 'a',
			'ｂ' : 'b',
			'ｃ' : 'c',
			'ｄ' : 'd',
			'ｅ' : 'e',
			'ｆ' : 'f',
			'ｇ' : 'g',
			'ｈ' : 'h',
			'ｉ' : 'i',
			'ｊ' : 'j',
			'ｋ' : 'k',
			'ｌ' : 'l',
			'ｍ' : 'm',
			'ｎ' : 'n',
			'ｏ' : 'o',
			'ｐ' : 'p',
			'ｑ' : 'q',
			'ｒ' : 'r',
			'ｓ' : 's',
			'ｔ' : 't',
			'ｕ' : 'u',
			'ｖ' : 'v',
			'ｗ' : 'w',
			'ｘ' : 'x',
			'ｙ' : 'y',
			'ｚ' : 'z',
			'Ａ' : 'A',
			'Ｂ' : 'B',
			'Ｃ' : 'C',
			'Ｄ' : 'D',
			'Ｅ' : 'E',
			'Ｆ' : 'F',
			'Ｇ' : 'G',
			'Ｈ' : 'H',
			'Ｉ' : 'I',
			'Ｊ' : 'J',
			'Ｋ' : 'K',
			'Ｌ' : 'L',
			'Ｍ' : 'M',
			'Ｎ' : 'N',
			'Ｏ' : 'O',
			'Ｐ' : 'P',
			'Ｑ' : 'Q',
			'Ｒ' : 'R',
			'Ｓ' : 'S',
			'Ｔ' : 'T',
			'Ｕ' : 'U',
			'Ｖ' : 'V',
			'Ｗ' : 'W',
			'Ｘ' : 'X',
			'Ｙ' : 'Y',
			'Ｚ' : 'Z',
			'０' : '0',
			'１' : '1',
			'２' : '2',
			'３' : '3',
			'４' : '4',
			'５' : '5',
			'６' : '6',
			'７' : '7',
			'８' : '8',
			'９' : '9',
			'！' : '!',
			'＠' : '@',
			'＃' : '#',
			'＄' : '$',
			'％' : '%',
			'＾' : '^',
			'＆' : '&',
			'＊' : '*',
			'（' : '(',
			'）' : ')',
			'＿' : '_',
			'＋' : '+',
			'｜' : '|',
			'￣' : '~',
			'－' : '-',
			'＝' : '=',
			'￥' : '\\',
			'｀' : '`',
			'｛' : '{',
			'｝' : '}',
			'［' : '[',
			'］' : ']',
			'：' : ':',
			'”' : '"',
			'；' : ';',
			'’' : '\'',
			'＜' : '<',
			'＞' : '>',
			'？' : '?',
			'，' : ',',
			'．' : '.',
			'／' : '/',
			'。' : '｡',
			'「' : '｢',
			'」' : '｣',
			'、' : '､',
			'・' : '･',
			'ヲ' : 'ｦ',
			'ァ' : 'ｧ',
			'ィ' : 'ｨ',
			'ゥ' : 'ｩ',
			'ェ' : 'ｪ',
			'ォ' : 'ｫ',
			'ャ' : 'ｬ',
			'ュ' : 'ｭ',
			'ョ' : 'ｮ',
			'ッ' : 'ｯ',
			'ー' : 'ｰ',
			'ア' : 'ｱ',
			'イ' : 'ｲ',
			'ウ' : 'ｳ',
			'エ' : 'ｴ',
			'オ' : 'ｵ',
			'カ' : 'ｶ',
			'キ' : 'ｷ',
			'ク' : 'ｸ',
			'ケ' : 'ｹ',
			'コ' : 'ｺ',
			'サ' : 'ｻ',
			'シ' : 'ｼ',
			'ス' : 'ｽ',
			'セ' : 'ｾ',
			'ソ' : 'ｿ',
			'タ' : 'ﾀ',
			'チ' : 'ﾁ',
			'ツ' : 'ﾂ',
			'テ' : 'ﾃ',
			'ト' : 'ﾄ',
			'ナ' : 'ﾅ',
			'ニ' : 'ﾆ',
			'ヌ' : 'ﾇ',
			'ネ' : 'ﾈ',
			'ノ' : 'ﾉ',
			'ハ' : 'ﾊ',
			'ヒ' : 'ﾋ',
			'フ' : 'ﾌ',
			'ヘ' : 'ﾍ',
			'ホ' : 'ﾎ',
			'マ' : 'ﾏ',
			'ミ' : 'ﾐ',
			'ム' : 'ﾑ',
			'メ' : 'ﾒ',
			'モ' : 'ﾓ',
			'ヤ' : 'ﾔ',
			'ユ' : 'ﾕ',
			'ヨ' : 'ﾖ',
			'ラ' : 'ﾗ',
			'リ' : 'ﾘ',
			'ル' : 'ﾙ',
			'レ' : 'ﾚ',
			'ロ' : 'ﾛ',
			'ワ' : 'ﾜ',
			'ン' : 'ﾝ',
			'ガ' : 'ｶﾞ',
			'ギ' : 'ｷﾞ',
			'グ' : 'ｸﾞ',
			'ゲ' : 'ｹﾞ',
			'ゴ' : 'ｺﾞ',
			'ザ' : 'ｻﾞ',
			'ジ' : 'ｼﾞ',
			'ズ' : 'ｽﾞ',
			'ゼ' : 'ｾﾞ',
			'ゾ' : 'ｿﾞ',
			'ダ' : 'ﾀﾞ',
			'ヂ' : 'ﾁﾞ',
			'ヅ' : 'ﾂﾞ',
			'デ' : 'ﾃﾞ',
			'ド' : 'ﾄﾞ',
			'バ' : 'ﾊﾞ',
			'パ' : 'ﾊﾟ',
			'ビ' : 'ﾋﾞ',
			'ピ' : 'ﾋﾟ',
			'ブ' : 'ﾌﾞ',
			'プ' : 'ﾌﾟ',
			'ベ' : 'ﾍﾞ',
			'ペ' : 'ﾍﾟ',
			'ボ' : 'ﾎﾞ',
			'ポ' : 'ﾎﾟ',
			'ヴ' : 'ｳﾞ',
			'゛' : 'ﾞ',
			'゜' : 'ﾟ',
			'　' : ' '
		};

		//半角->全角マップ
		for (var key in this.zenMap) {
			if(!this.hanMap[this.zenMap[key]]){
				this.hanMap[this.zenMap[key]] = key;
			}
		}
	}
}
var convmap = new ConvertMaps();
convmap.Init();


function focus_UsePointNum(){
  if( document.getElementById('pointpay_0') != null ){
    if( document.getElementById('pointpay_0').checked ){
      document.getElementById('pointpay_num').blur();
    }
  }
}

function click_UsePointRadio(){
  if( document.getElementById('pointpay_0') != null ){
    if( document.getElementById('pointpay_0').checked ){
      document.getElementById('pointpay_num').style.backgroundColor="#dedede";
      document.getElementById('pointpay_num').readOnly = "readonly";
    }
  }

  if( document.getElementById('pointpay_1') != null ){
    if( document.getElementById('pointpay_1').checked ){
      document.getElementById('pointpay_num').style.backgroundColor="#ffffff";
      document.getElementById('pointpay_num').readOnly = "";
    }
  }

}

//2011.11.26 cyamagishi add start
/*
function click_UsePointRadio2(splitcnt,cnt){
  if( document.getElementById('pointpay_0') != null ){
    if( document.getElementById('pointpay_0').checked ){
      for (var count1 = 1; count1 <= t_splitcnt; count1++) {
        for (var count2 = 1; count2 <= t_cnt; count2++) {
          document.getElementById('point_out' + count1 + '_' + count2).style.backgroundColor="#dedede";
          document.getElementById('point_out' + count1 + '_' + count2).readOnly = "readonly";
        }
      }
    }
  }
  if( document.getElementById('pointpay_1') != null ){
    if( document.getElementById('pointpay_1').checked ){
      for (var count1 = 1; count1 <= t_splitcnt; count1++) {
        for (var count2 = 1; count2 <= t_cnt; count2++) {
          document.getElementById('point_out' + count1 + '_' + count2).style.backgroundColor="#ffffff";
          document.getElementById('point_out' + count1 + '_' + count2).readOnly = "";
        }
      }
    }
  }
}
*/
function click_UsePointRadio2(splitcnt,cnt){
  if( document.getElementById('pointpay_0_' + splitcnt + '_' + cnt) != null ){
    if( document.getElementById('pointpay_0_' + splitcnt + '_' + cnt).checked ){
//       document.getElementById('point_out' + splitcnt + '_' + cnt).style.backgroundColor="#dedede";
//       document.getElementById('point_out' + splitcnt + '_' + cnt).readOnly = "readonly";
       document.getElementById('point_out' + splitcnt + '_' + cnt).disabled = true;
    }
  }
  if( document.getElementById('pointpay_1_' + splitcnt + '_' + cnt) != null ){
    if( document.getElementById('pointpay_1_' + splitcnt + '_' + cnt).checked ){
//       document.getElementById('point_out' + splitcnt + '_' + cnt).style.backgroundColor="#ffffff";
//       document.getElementById('point_out' + splitcnt + '_' + cnt).readOnly = "";
       document.getElementById('point_out' + splitcnt + '_' + cnt).disabled = false;
    }
  }
}
//2011.11.26 cyamagishi add end

//2012.02.03 tainoue add start
function refreshPointOutBox(){

  var $j = jQuery.noConflict();
  var point_out_chks = $j(':input[id^=pointpay_1_]').get();
  var point_out_id;

  for (var i = 0; i < point_out_chks.length; i++) {
    if(point_out_chks[i].checked){
        point_out_id = point_out_chks[i].id.replace("pointpay_1_", "point_out");
        document.getElementById(point_out_id).disabled = false;
    }
  }
}
//2012.02.03 tainoue add end

function htmlspecialchars(str) {
    if (!str || str == "") {return "";}
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
}


//2010.10.19 shorinouchi注文一覧・注文詳細用
function doCancelSales(formName, orderid){
	if(confirm("注文をキャンセルしますがよろしいでしょうか？") == false){
		return false;
	}
	appendHiddenElementGoodsList(formName,'cmdCancel',orderid)
	document.forms[formName].submit();
}

//2010.10.14 shorinouchi add 商品詳細
/*
function doSubmitNameform(formName,radioName,detailform){
	var value;
	for (var count = 0; count < document.forms[detailform].elements[radioName].length; count++) {
		if (document.forms[detailform].elements[radioName][count].checked == true) {
			value = document.forms[detailform].elements[radioName][count].value;
		}
	}
	appendHiddenElementGoodsList(formName,radioName,value)
	document.forms[formName].submit();
}
*/
//2010.10.14 shorinouchi add hidden埋め込み
function appendHiddenElementGoodsList(formName,name,value){
	var obj = document.createElement("INPUT");
	obj.type = "hidden";
	obj.name = name;
	obj.value = value;
	document.forms[formName].appendChild(obj);
}

//■2010.11.09 [knagamori] 有料ラッピング追加 - START -
var timeInterval = 400;

function httpObjGenerateFail() {
return false;
}
function timeoutCheck() {
timeout_sec --;
if(timeout_sec <= 0) {
clearInterval(timerId);
httpObj.abort();
return false;
}
}

//第2引数付き
function httpRequest3(target_url, funcitonReference, val,code) {
	try
		{httpObj = new ActiveXObject("Msxml2.XMLHTTP")}
	catch(e)
		{try
			{httpObj = new ActiveXObject("Microsoft.XMLHTTP")}
		catch(sc)
			{httpObj = null}
		}
	if(!httpObj&&typeof XMLHttpRequest!="undefined")
		{httpObj = new XMLHttpRequest()}
	if(!httpObj)
		{httpObjGenerateFail();}
	timerId = setInterval('timeoutCheck()', timeInterval);
	httpObj.open("GET", target_url, true);
//httpObj.open("GET", target_url, false);
	httpObj.onreadystatechange = function()
	{
		if (httpObj.readyState == 4)
		{
			clearInterval(timerId);
			if(httpObj.status == 200)
				{funcitonReference(httpObj.responseText,val,code);}
				else{return false;}
		}
	}
	httpObj.send('');
}

//■2010.11.09 [knagamori] 有料ラッピング追加 - END -

