




/*
     FILE ARCHIVED ON 11:52:29 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:51 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/* POPUPS */
function popUpFS(url) {
 	params  = 'width='+screen.width;
 	params += ', height='+screen.height;
 	params += ', top=0, left=0'
 	params += ', fullscreen=yes';
 	params += ', scrollbars=yes';
 	params += ', location=yes';
 	params += ', toolbar=yes';
 	params += ', resizable=yes';
 	params += ', menubar=yes';
 	params += ', status=yes';
 	params += ', directories=no';

 	newwin=window.open(url,'windowname4', params);
 	if (window.focus) {
 		newwin.focus();
 	}
 	return false;
}



function popUp(url, w, h, scroll) {
	var useScrollbars = "no";
	if (scroll) {
	   	useScrollbars = "yes";
	}
	var newWin = window.open(url, "popup", "width=" + w + ",height="+  h + ",top=30,left=30,scrollbars=" + useScrollbars + ",location=no,directories=no,status=yes,menubar=no,toolbar=no,resizable=yes");
	newWin.focus();
}

function emailPopUp(myPage) {
    popUp(myPage, 460, 540, true);
}

function legislationPopUp(myPage) {
    popUp(myPage, 460, 540, true);
}

function loadInParent(url) {
    var opener = window.opener;
    if (!opener.closed) {
        opener.location.href = url;
    } else {
        window.open(url);
    }
    window.self.close();
}

function addPrintFunction(linkText) {
    var tools = document.getElementById("tools");
    if (tools) {
        tools.innerHTML = "<li><a href=\"javascript:print();\" id=\"print\">" + linkText + "</a></li>" + tools.innerHTML;
    }
}

function addCloseFunction(linkText) {
    var footer = document.getElementById("footer");
    if (footer) {
        var list;
        for (var i = 0; i < footer.childNodes.length; i++) {
            if (footer.childNodes[i].nodeName.toLowerCase() == "ul") {
                list = footer.childNodes[i];
            }
        }
        if (!list) {
            list = document.createElement("ul");
            footer.appendChild(list);
        }
        list.innerHTML += "<li><a href=\"javascript:window.close();\">" + linkText + "</a></li>";
    }
}