var Dom_NN4		= false;
var Dom_NN6		= false;

//Mac or Win����
var Dom_mac = false;
var Dom_win = false;

Dom_mac=navigator.userAgent.indexOf('Mac')!=-1;
if(!Dom_mac)
{
	Dom_win = true;
}

//NN or IE����
var Dom_IE = false;
var Dom_NN = false;

Dom_IE= navigator.userAgent.indexOf('MSIE') != -1;
if(!Dom_IE)
{
	Dom_NN= navigator.userAgent.indexOf('Mozilla') != -1;
}

if(Dom_NN)
{
	//NN Version����
	Dom_NN4= navigator.userAgent.indexOf('Mozilla/4') != -1;
	//Netscape6.2�ȏ�̏ꍇDom_NN6��true
	Dom_NN6= navigator.userAgent.indexOf('Netscape6') != -1;
	//NN4.x,6.x�ȊO��NN��NN6�Ƃ��ď���
	if(Dom_NN4 != true && Dom_NN6 != true)
	{
		Dom_NN6=true;
	}
}



function openWin(url) {
     window.open(url,"_blank","width=420,height=420,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,favorites=no,resizable=yes");
}

// �_�u���N���b�N�̐���
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

// �_�u���N���b�N���������m�F�_�C�A���O
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

//�e�m�F�`�F�b�N
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
	// �����񃁁[���A�h���X�`�F�b�N
	if(mail && cmail)
	{
		cmail.form.onsubmit = function() { return checkMail(mail,cmail); }
	}
	// �V�p�X���[�h�Ɗm�F�p�X���[�h�̃`�F�b�N
	if(npwd1 && npwd2)
	{
		npwd2.form.onsubmit = function() { return checkpass(npwd1,npwd2); }
	}
	// �VID�Ɗm�FID�̃`�F�b�N
		if(newid1 && newid2)
	{
		newid2.form.onsubmit = function() { return checkid(newid1,newid2); }
	}
	// ���[���A�h���X�ύX���`�F�b�N
	if(newmail1 && newmail2)
	{
		newmail2.form.onsubmit = function() { return checkMail(newmail1,newmail2); }
	}
}


function checkMail(mail, cmail)
{
	if(mail.value != cmail.value)
	{
		alert ("���[���A�h���X�ƃ��[���A�h���X�i�m�F�j����v���܂���");
    	dblClickControl = false;
		return false;
	}
	return true;
}

function checkpass(npwd1, npwd2)
{
	if(npwd1.value != npwd2.value)
	{
		alert ("���͂��ꂽ�p�X���[�h�Ɗm�F�p�p�X���[�h����v���܂���");
		return false;
	}
	return true;
}

function checkid(newid1, newid2)
{
	if(newid1.value != newid2.value)
	{
		alert ("���͂��ꂽID�Ɗm�F�pID����v���܂���");
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
			alert("���q�lID�ƃp�X���[�h�͕ʁX�̂��̂��w�肵�Ă�������");
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
			alert("���q�lID�ƃp�X���[�h�͕ʁX�̂��̂��w�肵�Ă�������");
			document.getElementById(arg2).value = "";
			if(arg3){document.getElementById(arg3).value = "";}
			return false;
			}
		}
}


//�A���P�[�g�p
//�_�u���N���b�N�֎~����
var iPrevTime = null;
function formSubmit() {
	if( iPrevTime == null ) {
		iPrevTime = 1;
		return true;
	} else {
		return false;
	}
}

//���p<->�S�p�ϊ�
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

//���p<->�S�p�ϊ��}�b�s���O�N���X
function ConvertMaps() {
	this.hanMap = {};
	this.zenMap = {};
	this.Init = function(){
		//�S�p->���p�}�b�v
		this.zenMap = {
			'��' : 'a',
			'��' : 'b',
			'��' : 'c',
			'��' : 'd',
			'��' : 'e',
			'��' : 'f',
			'��' : 'g',
			'��' : 'h',
			'��' : 'i',
			'��' : 'j',
			'��' : 'k',
			'��' : 'l',
			'��' : 'm',
			'��' : 'n',
			'��' : 'o',
			'��' : 'p',
			'��' : 'q',
			'��' : 'r',
			'��' : 's',
			'��' : 't',
			'��' : 'u',
			'��' : 'v',
			'��' : 'w',
			'��' : 'x',
			'��' : 'y',
			'��' : 'z',
			'�`' : 'A',
			'�a' : 'B',
			'�b' : 'C',
			'�c' : 'D',
			'�d' : 'E',
			'�e' : 'F',
			'�f' : 'G',
			'�g' : 'H',
			'�h' : 'I',
			'�i' : 'J',
			'�j' : 'K',
			'�k' : 'L',
			'�l' : 'M',
			'�m' : 'N',
			'�n' : 'O',
			'�o' : 'P',
			'�p' : 'Q',
			'�q' : 'R',
			'�r' : 'S',
			'�s' : 'T',
			'�t' : 'U',
			'�u' : 'V',
			'�v' : 'W',
			'�w' : 'X',
			'�x' : 'Y',
			'�y' : 'Z',
			'�O' : '0',
			'�P' : '1',
			'�Q' : '2',
			'�R' : '3',
			'�S' : '4',
			'�T' : '5',
			'�U' : '6',
			'�V' : '7',
			'�W' : '8',
			'�X' : '9',
			'�I' : '!',
			'��' : '@',
			'��' : '#',
			'��' : '$',
			'��' : '%',
			'�O' : '^',
			'��' : '&',
			'��' : '*',
			'�i' : '(',
			'�j' : ')',
			'�Q' : '_',
			'�{' : '+',
			'�b' : '|',
			'�P' : '~',
			'�|' : '-',
			'��' : '=',
			'��' : '\\',
			'�M' : '`',
			'�o' : '{',
			'�p' : '}',
			'�m' : '[',
			'�n' : ']',
			'�F' : ':',
			'�h' : '"',
			'�G' : ';',
			'�f' : '\'',
			'��' : '<',
			'��' : '>',
			'�H' : '?',
			'�C' : ',',
			'�D' : '.',
			'�^' : '/',
			'�B' : '�',
			'�u' : '�',
			'�v' : '�',
			'�A' : '�',
			'�E' : '�',
			'��' : '�',
			'�@' : '�',
			'�B' : '�',
			'�D' : '�',
			'�F' : '�',
			'�H' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'�b' : '�',
			'�[' : '�',
			'�A' : '�',
			'�C' : '�',
			'�E' : '�',
			'�G' : '�',
			'�I' : '�',
			'�J' : '�',
			'�L' : '�',
			'�N' : '�',
			'�P' : '�',
			'�R' : '�',
			'�T' : '�',
			'�V' : '�',
			'�X' : '�',
			'�Z' : '�',
			'�\' : '�',
			'�^' : '�',
			'�`' : '�',
			'�c' : '�',
			'�e' : '�',
			'�g' : '�',
			'�i' : '�',
			'�j' : '�',
			'�k' : '�',
			'�l' : '�',
			'�m' : '�',
			'�n' : '�',
			'�q' : '�',
			'�t' : '�',
			'�w' : '�',
			'�z' : '�',
			'�}' : '�',
			'�~' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'�K' : '��',
			'�M' : '��',
			'�O' : '��',
			'�Q' : '��',
			'�S' : '��',
			'�U' : '��',
			'�W' : '��',
			'�Y' : '��',
			'�[' : '��',
			'�]' : '��',
			'�_' : '��',
			'�a' : '��',
			'�d' : '��',
			'�f' : '��',
			'�h' : '��',
			'�o' : '��',
			'�p' : '��',
			'�r' : '��',
			'�s' : '��',
			'�u' : '��',
			'�v' : '��',
			'�x' : '��',
			'�y' : '��',
			'�{' : '��',
			'�|' : '��',
			'��' : '��',
			'�J' : '�',
			'�K' : '�',
			'�@' : ' '
		};

		//���p->�S�p�}�b�v
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


//2010.10.19 shorinouchi�����ꗗ�E�����ڍחp
function doCancelSales(formName, orderid){
	if(confirm("�������L�����Z�����܂�����낵���ł��傤���H") == false){
		return false;
	}
	appendHiddenElementGoodsList(formName,'cmdCancel',orderid)
	document.forms[formName].submit();
}

//2010.10.14 shorinouchi add ���i�ڍ�
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
//2010.10.14 shorinouchi add hidden���ߍ���
function appendHiddenElementGoodsList(formName,name,value){
	var obj = document.createElement("INPUT");
	obj.type = "hidden";
	obj.name = name;
	obj.value = value;
	document.forms[formName].appendChild(obj);
}

//��2010.11.09 [knagamori] �L�����b�s���O�ǉ� - START -
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

//��2�����t��
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

//��2010.11.09 [knagamori] �L�����b�s���O�ǉ� - END -

