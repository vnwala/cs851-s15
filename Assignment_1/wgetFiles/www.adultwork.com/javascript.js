//window.onerror = stopError
function stopError() { return true; }
function checkLogin(loggedIn) {	if(parent.frames['header'].loggedIn != loggedIn) { parent.frames['header'].locationReload(); }}
function setFormFocus(f, e) { if(e) { f.elements[e].focus(); }}
function highlightErrors(f, s) { if(s.length > 0) { a = s.split(','); if(a.length > 0) { for(i = 0; i < (a.length -1); i++) { if(a[i].toString().length > 0) { f.elements[a[i]].style.backgroundColor = 'pink'; } }; setFormFocus(f, a[0])}}}
function lockFormControls(f, hasLock) { for(i = 0; i < f.elements.length; i++) { f.elements[i].disabled = !hasLock}}
function unhighlightErrors(f, s) {a = s.split(',');	if(a.length > 0) { for(i = 0; i < (a.length -1); i++) { if(a[i].toString().length > 0) { f.elements[a[i]].style.backgroundColor = ''; }}}}
function chkdate(objName) {
	//var strDatestyle = "US"; //United States date style
	var strDatestyle = "EU";  //European date style
	var strDate, strDateArray, strDay, strMonth, strYear, intday, intMonth, intYear, intElementNr
	varbooFound = false;
	var datefield = objName; var strSeparatorArray = new Array("-"," ","/","."); var err = 0; var strMonthArray = new Array(12);
	strMonthArray[0] = "Jan";strMonthArray[1] = "Feb";strMonthArray[2] = "Mar";strMonthArray[3] = "Apr";strMonthArray[4] = "May";strMonthArray[5] = "Jun";strMonthArray[6] = "Jul";strMonthArray[7] = "Aug";strMonthArray[8] = "Sep";strMonthArray[9] = "Oct";strMonthArray[10] = "Nov";strMonthArray[11] = "Dec"
	strDate = datefield.value;
/*	if (strDate.length < 1) {
		return true;
	} */
	if (strDate.length < 8) {
		return false;
	} 
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
			strDateArray = strDate.split(strSeparatorArray[intElementNr]);
			if (strDateArray.length != 3) {
				err = 1;
				return false;
			}
		else {
			strDay = strDateArray[0];
			strMonth = strDateArray[1];
			strYear = strDateArray[2];
		}
		booFound = true;
	}
	}
	if (booFound == false) {
		if (strDate.length>5) {
			strDay = strDate.substr(0, 2);
			strMonth = strDate.substr(2, 2);
		strYear = strDate.substr(4);
	   }
	}
	// US style
	if (strDatestyle == "US") {
		strTemp = strDay;
		strDay = strMonth;
		strMonth = strTemp;
	}
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) {
		err = 2;
		return false;
	}
	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) {
		for (i = 0;i<12;i++) {
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
			}
		}
	if (isNaN(intMonth)) {
		err = 3;
		return false;
	}
	}
	intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) {
		err = 4;
		return false;
	} 
	if (intYear > 49 && intYear < 100) {
		intYear += 1900
	}
	else if(intYear <=49) {
		intYear += 2000
	}

	if (intMonth>12 || intMonth<1) {
		err = 5;
		return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
		err = 6;
		return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
		err = 7;
		return false;
	}
	if (intMonth == 2) {
		if (intday < 1) {
			err = 8;
			return false;
		}
		if (LeapYear(intYear) == true) {
			if (intday > 29) {
				err = 9;
				return false;
			}
		}
		else {
			if (intday > 28) {
				err = 10;
				return false;
			}
		}
	}
	if (strDatestyle == "US") {
		datefield.value = strMonthArray[intMonth-1] + " " + intday+" " + strYear;
	}
	else {
		//datefield.value = intday + " " + strMonthArray[intMonth-1] + " " + strYear;
		datefield.value = strDay + "/" + strMonth + "/" + intYear;
	}
	return true;
}
function LeapYear(intYear) {
	if (intYear % 100 == 0) { if (intYear % 400 == 0) { return true; }}
	else { if ((intYear % 4) == 0) { return true; }}
	return false;
}
function doDateCheck(from, to) {
	if (Date.parse(from.value) <= Date.parse(to.value)) { alert("The dates are valid.");}
	else {
		if (from.value == "" || to.value == "") 
			alert("Both dates must be entered.");
		else 
			alert("To date must occur after the from date.");
	}
}
function emailCheck (emailStr) {
	var checkTLD=0;
	var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
	var emailPat=/^(.+)@(.+)$/;
	var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	var validChars="\[^\\s" + specialChars + "\]";
	var quotedUser="(\"[^\"]*\")";
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom=validChars + '+';
	var word="(" + atom + "|" + quotedUser + ")";
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
	var matchArray=emailStr.match(emailPat);
	if (matchArray==null) { return false; }
	var user=matchArray[1];
	var domain=matchArray[2];
	for (i=0; i<user.length; i++) {if (user.charCodeAt(i)>127) { return false }}
	for (i=0; i<domain.length; i++) {if (domain.charCodeAt(i)>127) { return false }}
	if (user.match(userPat)==null) { return false }
	var IPArray=domain.match(ipDomainPat);
	if (IPArray!=null) {
		for (var i=1;i<=4;i++) {
			if (IPArray[i]>255) {
				//alert("Destination IP address is invalid!");
				return false;
			}
		}
		return true;
	}
	var atomPat=new RegExp("^" + atom + "$");
	var domArr=domain.split(".");
	var len=domArr.length;
	for (i=0;i<len;i++) {
		if (domArr[i].search(atomPat)==-1) {
			return false;
	   }
	}
	if (checkTLD && domArr[domArr.length-1].length!=2 && domArr[domArr.length-1].search(knownDomsPat)==-1) { return false }
	if (len<2) { return false }
	return true;
}
function clickIE4(){ if (event.button==2) { return false }}
function clickNS4(e){ if (document.layers||document.getElementById&&!document.all) { if (e.which==2||e.which==3) { return false } }}
if (document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown=clickNS4 }
else if (document.all&&!document.getElementById) { document.onmousedown=clickIE4 }
function viewRating(UserID) { var ratingsWin = window.open('dlgViewRatings.asp?UserID=' + UserID, 'ratingsWin', 'width=500,height=450,resizable=1,scrollbars=1')}
function doMR(UserID) { var memberReportWin = window.open('dlgMemberReport.asp?SelUserID=' + UserID, 'memberReportWin', 'width=400,height=370,resizable=1,scrollbars=1')}
function doSTF(UserID) { var memberReportWin = window.open('dlgEmailProfile.asp?SelUserID=' + UserID, 'emailProfileWin', 'width=400,height=420,resizable=1,scrollbars=1')}
function g_eB(u) { self.location.href = 'MakeBooking.asp?SelUserID=' + u + '&SearchTargetURL=' + jsURLEnc(self.location.href); }
function g_wB(u) { window.open('WebcamBasket.asp?SelUserID=' + u, 'webcamBooking', 'width=600,height=325,scrollbars=1') }
function g_pB(u) { self.location.href = 'PhoneChatBooking.asp?SelUserID=' + u; }
function g_sB(u) { window.open('dlgStartSMSChat.asp?SelUserID=' + u, 'smsChat', 'width=550,height=510,scrollbars=1') }
function jsURLEnc(url) { var s = escape(url).replace('.', '%2E').replace('+', '%2B').replace('//', '%2F%2F').replace('/', '%2F'); if(s.indexOf('+') > -1) { while(s.indexOf('+') > -1) { s = s.replace('+', '%2B') }}; if(s.indexOf('.') > -1) { while(s.indexOf('.') > -1) { s = s.replace('.', '%2E') }}; if(s.indexOf('/') > -1) { while(s.indexOf('/') > -1) { s = s.replace('/', '%2F') }}; return s }


sfHover = function() { 
	var sfEls = document.getElementById("nav").getElementsByTagName("LI"); 
	for (var i=0; i<sfEls.length; i++) { 
		sfEls[i].onmouseover=function() { 
			this.className+=" sfhover";
			this.style.zIndex=8200;
		}; 
		sfEls[i].onmouseout=function() { 
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "")
		}
	}
}


function expandMessageBox() {
	var size = 20; var maxLength = 25
	if((document.frmHeaderSendSMS.strMessage.value == null ) || (document.frmHeaderSendSMS.strMessage.value == "" )) document.frmHeaderSendSMS.strMessage.size = size;
	if((document.frmHeaderSendSMS.strMessage.value.length >= size)&&(document.frmHeaderSendSMS.strMessage.value.length <= maxLength)) document.frmHeaderSendSMS.strMessage.size = document.frmHeaderSendSMS.strMessage.value.length + 1;
}
function g_getHTTPObject() {
	var xmlhttp;
	/*@cc_on
	@if (@_jscript_version >= 5)
		try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch (E) { xmlhttp = false; } }
	@else
		xmlhttp = false;
	@end @*/
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') { try { xmlhttp = new XMLHttpRequest(); } catch (e) { xmlhttp = false; } }
	return xmlhttp;
}
function g_isValidMobile(mobileNumber) {
	var mN = ''; var validChars = '0123456789';
	for(var i = 0; i < mobileNumber.length; i++) {if(validChars.indexOf(mobileNumber.substr(i, 1)) > -1) { mN += mobileNumber.substr(i, 1) } }
	if(mN.length > 0) {
		if(mN.substr(0, 1) == '0') { mN = '44' + mN.substr(1) }
		else if(mN.substr(0, 3) == '440') { mN = '44' + mN.substr(3) }
	}
	else {
		alert('You did not specify a mobile number or it only contained ignored characters.\n\nPlease re-enter it without any formatting or spaces.\n\nPlease ensure it starts with your country code (UK: 44, USA: 1)')
		if(arguments[1]) { arguments[1].value = mN; arguments[1].select(); arguments[1].focus() }
		return false
	}
	if(mN.length < 9) { 
		if(mN.length > 7) {
			if(confirm('Please confirm that the mobile number you have\nentered is correct and in international format:.\n\n                      ' + mN + '\n\nIf it is correct click \'OK\', otherwise click \'Cancel\'.')) {
				if(arguments[1]) { arguments[1].value = mN; arguments[1].select(); arguments[1].focus() }; return true
			}
			else { if(arguments[1]) { arguments[1].value = mN; arguments[1].select(); arguments[1].focus() }; return false }
		}
		else { alert('Sorry but the mobile number you have supplied is too short to be valid.'); if(arguments[1]) { arguments[1].value = mN; arguments[1].select(); arguments[1].focus() }; return false }
	}
	if(arguments[1]) { arguments[1].value = mN }
	return true
}
function sendHeaderSMS(msgField, numberField, price) {
	var msg = msgField.value
	var number = numberField.value
	var mR = false
	var r = 1
	if(msg.length == 0 || msg.length > 160) { alert('Messages must be between 1 and 160 characters in length.'); msgField.focus(); msgField.select(); return }
	if(number.indexOf(',') > -1 && number.indexOf(';') > -1) { alert('Please only use one separator in your recipient list.'); numberField.focus(); numberField.select(); return }
	if(number.indexOf(',') > -1) { var aNumbers = number.split(','); mR = true } 
	else if(number.indexOf(';') > -1) { var aNumbers = numbers.split(';'); mR = true }
	if(mR) {
		for(var i = 0; i < aNumbers.length; i++) { if(!g_isValidMobile(aNumbers[i])) { alert('Sending failed due to the previous error being true for one or more of the numbers you\'ve supplied.\n\nCarefully check each number starts with the relevant country code and contains no formatting characters or spaces.'); return } }
		r = aNumbers.length; price *= r
	}
	else {
		if(!g_isValidMobile(number, numberField)) { return }
	}
	var shown = false; var errormsg
	var url = 'XMLDataSources/SendHeaderSMS.asp?Message=' + escape(msg) + '&Number=' + escape(number)
	var req = g_getHTTPObject()
	if(mR) {
		if(!confirm('Your message will be sent to ' + r + ' recipients and you will be debited ' + (Math.round(price * 100)/100) + ' Credits.\n\nTo send the message click \'OK\', to return click \'Cancel\'.')) { return }
	}
	else {
		if(!confirm('Your message will be sent to ' + number + '\nand you will be debited ' + price + ' Credits.\n\nTo send the message click \'OK\', to return click \'Cancel\'.')) { return }
	}
	if (req) { req.open("GET", url, false); req.send(null);
		if (req.status == 200) { 
			var values = req.responseXML.getElementsByTagName("VALUE")
			if(values.length > 0) { 
				shown = true; 
				switch (parseInt(values.item(0).childNodes.item(0).nodeValue, 10)) {
					case -2:
						if(confirm('You must verify your mobile number with us first.\n\nTo do now click \'OK\', otherwise click \'Cancel\'.')) { self.location.href = 'MobileActivation.asp' }; 
						break;
					case -1:
						if(confirm('You must be logged in to use this feature.\n\nTo login now click \'OK\', otherwise click \'Cancel\'.')) { var sURL = self.location.href; sURL += (sURL.indexOf('?') > 0 ? '&' : '?') + 'SMSMessage=' + URLEncode(msg) + '&SMSNumber=' + URLEncode(number); self.location.href = 'Login.asp?TargetURL=' + URLEncode(sURL) }
						break;
					case 1:
						alert('Your message has been sent successfully.')
						break;
					default:
						alert(values.item(0).attributes.item(0).value)
				}
			}
		}
		return
	}
	if(!shown) window.open('dlgSendHeaderSMS.asp?Message=' + URLEncode(msg) + '&Number=' + URLEncode(number), 'sendHeaderSMS', 'width=10,height=10,scrollbars=0,resizable=0,status=1')
}
function URLEncode (clearString) {
	var output = ''; var x = 0; clearString = clearString.toString(); var regex = /(^[a-zA-Z0-9_.]*)/; while (x < clearString.length) {  var match = regex.exec(clearString.substr(x))
		if (match != null && match.length > 1 && match[1] != '') { output += match[1]; x += match[1].length;}
		else { if (clearString[x] == ' ') {output += '+' } else { var charCode = clearString.charCodeAt(x); var hexVal = charCode.toString(16); output += '%' + hexVal.toUpperCase()}
		x++;}} return output;
}
function g_SMSHelp() { window.open('dlgHeaderSMSHow.asp', 'winSMSHelp', 'width=350,height=380,scrollbars=1') }
function g_SMSShow() { var obj = document.getElementById('smsNoShow'); obj.style.display='inline'; obj = document.getElementById('smsShow'); obj.style.display='none' }
function g_showFAQLink() {
	if(document.all) {var dToggle = document.all('nav_faq'); doIt = true} 
	else if(document.getElementById) {var dToggle = document.getElementById('nav_faq');	doIt = true}
	if(doIt) { dToggle.className = 'Visable'; }
}
function g_displayFAQs(PageName) { window.open('dlgFAQPages.asp?PageName=' + PageName, '_blank', 'width=512,height=384') }
var cancelHotList = false, doHotlistExpansion = true, cancelSavedSearches = false, doSavedSearchesExpansion = true, cancelCheckForMessages = false, doCheckForMessagesExpansion = true
function g_getHotListsNow() { if(!cancelHotList && doHotlistExpansion){ req=new g_getHTTPObject(); req.open('GET','XMLDataSources/GetHotLists.asp',false); req.send(null); if (req.status == 200) { var values = req.responseXML.getElementsByTagName("VALUE"); if(values.length > 0) { switch (parseInt(values.item(0).childNodes.item(0).nodeValue, 10)) { case -1: break; case -2: break; default: var doIt = false;if(document.all) { var ul = document.all('ulHotlists'); doIt = true } else if(document.getElementById) { var ul = document.getElementById('ulHotlists'); doIt = true } if(doIt) { for (var i = 0; i < values.length; i++) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="Search.asp?CommandID=1&amp;HotListSearch=1&amp;intHotListID=' + values.item(i).attributes.item(0).value + '">' + values.item(i).childNodes.item(0).nodeValue + '</a></li>'; ul.appendChild(li) }; doHotlistExpansion = false }} }}} }
function g_getSavedSearchesNow() { if(!cancelSavedSearches && doSavedSearchesExpansion){ req=new g_getHTTPObject(); req.open('GET','XMLDataSources/GetSavedSearches.asp',false); req.send(null); if (req.status == 200) { var values = req.responseXML.getElementsByTagName("VALUE"); if(values.length > 0) { var doIt = false; if(document.all) { var ul = document.all('ulSavedSearches'); doIt = true } else if(document.getElementById) { var ul = document.getElementById('ulSavedSearches'); doIt = true }; if(doIt) { for (var i = 0; i < values.length; i++) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="' + values.item(i).attributes.item(0).value + '">' + values.item(i).childNodes.item(0).nodeValue + '</a></li>'; ul.appendChild(li)}; ul.removeChild(ul.childNodes[0]); doSavedSearchesExpansion = false  }}} } }
function g_checkForMessagesNow(u, isOS, dC) {
	if(!cancelCheckForMessages && doCheckForMessagesExpansion){
		var doIt = false; if(document.all) { var ul = document.all('ulCheckForMessages'); doIt = true } else if(document.getElementById) { var ul = document.getElementById('ulCheckForMessages'); doIt = true }; if(!doIt) { return }
		var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="#"><i>Please wait...</a></li>'; for(var i = ul.childNodes.length -1; i >= 0; i--) { ul.removeChild(ul.childNodes[i]) }; ul.appendChild(li)
		var req=new g_getHTTPObject(); req.open('GET','XMLDataSources/Messages.asp?UIDNH=1&U=' + u + '&OS=' + isOS + '&DC=' + encodeURIComponent(dC), true); 
		req.onreadystatechange = function () {
		    if (req.readyState == 4 && req.status == 200) {
		        var values = req.responseXML.getElementsByTagName("VALUE");
		        if (values.length > 0) {
		            //var atts = values.item(0).attributes;
		            //var e = atts.item(0).value, ie = atts.item(1).value, wc = atts.item(2).value, pc = atts.item(3).value, v = atts.item(4).value, fl = atts.item(5).value;
		            var e = values.item(0).getAttribute('EMAILS'), ie = values.item(0).getAttribute('ESCORT'), wc = values.item(0).getAttribute('WEBCAM'), pc = values.item(0).getAttribute('PHONE'), v = values.item(0).getAttribute('VOICEMAILS'), fl = values.item(0).getAttribute('FLIRTS');
		            if (e > 0 || ie > 0 || wc > 0 || pc > 0 || v > 0 || fl > 0) { if (e > 0) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="Emails.asp" title="Opens in new window" target="_blank">' + e + ' Email' + (e > 1 ? 's' : '') + '</a></li>'; ul.appendChild(li) }; if (v > 0) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="Voicemails.asp" title="Opens in new window" target="_blank">' + v + ' Voicemail' + (v > 1 ? 's' : '') + '</a></li>'; ul.appendChild(li) }; if (fl > 0) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="FlirtsReceived.asp" title="Flirts Received">' + fl + ' Flirt' + (fl > 1 ? 's' : '') + '</a></li>'; ul.appendChild(li) }; if (ie > 0) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="Bookings.asp" title="Opens in new window" target="_blank">' + ie + ' Escort Booking' + (ie > 1 ? 's' : '') + '</a></li>'; ul.appendChild(li) }; if (wc > 0) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="WebcamBookings.asp" title="Opens in new window" target="_blank">' + wc + ' Webcam Booking' + (wc > 1 ? 's' : '') + '</a></li>'; ul.appendChild(li) }; if (pc > 0) { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="PhoneChatBookings.asp" title="Opens in new window" target="_blank">' + pc + ' Phone Chat Booking' + (pc > 1 ? 's' : '') + '</a></li>'; ul.appendChild(li) } } else { var li = ul.childNodes[0].cloneNode(true); li.innerHTML = '<a href="Messages.asp" title="Opens in new window" target="_blank"><i>No unread messages</a></li>'; ul.appendChild(li) }; ul.removeChild(ul.childNodes[0])
		        }; doCheckForMessagesExpansion = false; window.setTimeout('doCheckForMessagesExpansion = true', 30000)
		    }
		}
		req.send(null)
	}
}
function g_getHotLists() { window.setTimeout('g_getHotListsNow()', 500); cancelHotList = false }
function g_getHotListsCancel() { cancelHotList = true }
function g_buyCredits() { var buyCreditsWin = window.open('dlgBuyCredits.asp', 'buyCreditsWin', 'width=400,height=410,scrollbars=1,resizable=1,status=1') }
function g_getSavedSearches() { window.setTimeout('g_getSavedSearchesNow()', 500); cancelSavedSearches = false }
function g_getSavedSearchesCancel() { cancelSavedSearches = true } 
function g_checkForMessages(u, isOS, dC) { window.setTimeout('g_checkForMessagesNow(' + u + ', ' + isOS + ', ' + dC + ')', 1000); cancelCheckForMessages = false }
function g_checkForMessagesCancel() { cancelCheckForMessages = true } 
function g_$() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}
function getElementPosition(elemID){
	var offsetTrail = document.getElementById(elemID), offsetLeft = 0, offsetTop = 0
	while (offsetTrail){ offsetLeft += offsetTrail.offsetLeft; offsetTop += offsetTrail.offsetTop; offsetTrail = offsetTrail.offsetParent }
	if (navigator.userAgent.indexOf('Mac') != -1 && typeof document.body.leftMargin != 'undefined'){offsetLeft += document.body.leftMargin;offsetTop += document.body.topMargin}
	return {left:offsetLeft,top:offsetTop};
}
function g_OpenClientNotes(f, b, ge) { window.open('dlgClientNotes.asp?ForUserID=' + f + '&ByUserID=' + b + '&GE=' + (ge == true ? 1 : 0), '_new', 'width=470,height=380,scrollbars=1') }
function g_AVCheck(u, l) {
    if(l == 0 || l == 1 && document.cookie.indexOf('AVPrompt=1') >= 0) { return true }
    var shown = false, url = 'XMLDataSources/AVCheck.asp?UserID=' + encodeURIComponent(u) + '&R=' + encodeURIComponent(new Date), req = new g_getHTTPObject(); req.open('GET', url, false); req.send()
    if (req.status == 200) { var values = req.responseXML.getElementsByTagName("VALUE")
        if (values.length > 0) {
            switch (parseInt(values.item(0).childNodes.item(0).nodeValue, 10)) {
                case 0: return true
                case 1: if (confirm('Age verification is currently optional, would you like to verify now (opens in new window)?')) { window.open('AgeVerification.asp', '_blank') }; return true; break
                case 2: //continue
                case 3: if (confirm('Age verification is required, would you like to verify now?')) { window.open('AgeVerification.asp', '_blank') }; return false; break
            }
        }
    }
    if (l < 2) { return true } else { alert('It was not possible to ascertain whether age verification is required.'); return false }
}
