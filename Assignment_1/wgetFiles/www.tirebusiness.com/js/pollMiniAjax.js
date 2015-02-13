	var updateInProgress = false;
	var aForm            = null;
	var rootDivs         = null;
	var divIndex         = -1;
	var ajaxReq          = null;
	var ajaxDoc          = null;
	var ajaxDiv          = null;
	var aForumForm       = null;
	var IE;
	var ajaxpollReq      = null;
	var aDivTagToUpdate  = null;

	function newRequest() {
		IE = (navigator.appName=="Microsoft Internet Explorer");
		if (IE) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			return new XMLHttpRequest();
		}
	} // newRequest()

	function processAjax() {
		if ((ajaxReq.readyState == 4) && (ajaxReq.status == 200)) {
			ajaxDoc = ajaxReq.responseText;
			for (var i = 0; i < rootDivs.length; i++) {
				rootDivs[i].innerHTML=ajaxDoc;
			}
			if(jQuery.fn.uniform) {
				$(":radio").uniform();
			}
		}
	} // processAjax()

	function processPollMini(aUrl) {
		if (divIndex < rootDivs.length) {
			try {
				var pollminiURL = aUrl;
				ajaxReq = newRequest();
				ajaxReq.onreadystatechange = processAjax;
				ajaxReq.open("GET", pollminiURL, true);
				ajaxReq.send(null);
			} catch(e) {
				alert(e);
			}
		} else {
			updateInProgress = false;
		}  
	} // processPollMini()

	/* update all pollmini tags*/ 
	function updatePollMini(pollURL) {
		if (!updateInProgress) {
			updateInProgress = true;
			rootDivs = document.getElementsByName("pollMini");
			if (rootDivs.length == 0) {
				rootDivs = new Array;
				var div_attr;
				var divs = document.getElementsByTagName('div');
				for (var i = 0; i < divs.length; i++) {
					div_attr=$(divs[i]).attr("name");
					if (div_attr == "pollMini") {
						rootDivs.push(divs[i]);
					}
				}
			}
			if (rootDivs.length > 0) {
				divIndex = 0;
				processPollMini(pollURL);
			} else {
				updateInProgress = false;
			}
		}
	} // updatePollMini()

	function processAjaxPollResult() {
		//var redirect = $('#PollRedirectID').html();
		if ((ajaxReq.readyState == 4) && (ajaxReq.status == 200)) {
			ajaxDoc = ajaxReq.responseText;
			ajaxDiv.innerHTML = ajaxDoc;
			
		}
	} // processAjaxPollResult()

	function processPollMiniResult(aURL, aDivTag, parameters) {
		try {
			ajaxDiv = aDivTag;
			ajaxReq = newRequest();
			ajaxReq.onreadystatechange = processAjaxPollResult;
			ajaxReq.open("POST", aURL, true);
			ajaxReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxReq.setRequestHeader("Content-length", parameters.length);
			ajaxReq.setRequestHeader("Connection", "close");
			ajaxReq.send(parameters);
		} catch(e) {
			alert(e);
		}
	}  // processPollMiniResult()

	function checkForm(aFormId, aDivTagId) {
		formErrors = true;
		aForm = document.getElementById(aFormId);

		aDivTagToUpdate = document.getElementById(aDivTagId);
		for(t=1; t <= 10; t++) {
			if (document.pollForm["q"+t] != undefined){
				for (i=document.pollForm["q"+t].length-1; i > -1; i--){
					if (document.pollForm["q"+t][i].checked) {
						formErrors = false;
						break;
					}
				}
			}
		}
		if (formErrors) {
			alert(" Please select an option to participate in the poll");
		} else {
			var getstr = '';
			for (i=0; i<aForm.childNodes.length; i++) {
				if (aForm.childNodes[i].tagName == "INPUT") {

					if (aForm.childNodes[i].type == "text") {
						getstr += aForm.childNodes[i].name + "=" + aForm.childNodes[i].value + "&";
					}
					if (aForm.childNodes[i].type == "checkbox") {
						if (aForm.childNodes[i].checked) {
							getstr += aForm.childNodes[i].name + "=" + aForm.childNodes[i].value + "&";
						} else {
							getstr += aForm.childNodes[i].name + "=&";
						}
					}
					if (aForm.childNodes[i].type == "radio") {
						if (aForm.childNodes[i].checked) {
							getstr += aForm.childNodes[i].name + "=" + aForm.childNodes[i].value + "&";
						}
					}
				}
				if (aForm.childNodes[i].tagName == "SELECT") {
					var sel = aForm.childNodes[i];
					getstr += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
				}
				if (aForm.childNodes[i].type == "hidden") {
					getstr += aForm.childNodes[i].name + "=" + aForm.childNodes[i].value + "&";
				}
			}

			processPollMiniResult(aForm.PostUrl.value, aDivTagToUpdate, getstr);
		}
	}
