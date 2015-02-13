/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function deepLinkingloadUrl(myrl, redirectUrl) {
  var redirectUrlHref = redirectUrl.href;
  if (redirectUrlHref.indexOf('?') >= 0) {
    redirectUrlHref = redirectUrlHref + "&noredirect=1";
  } else {
    redirectUrlHref = redirectUrlHref + "?noredirect=1";
  }
  var iframe = createIFrame();
  document.body.appendChild(iframe);
  var usrAgent = navigator.userAgent.toLowerCase();

  if ((usrAgent.indexOf("iphone") > -1 || usrAgent.indexOf("(ipod") > -1)) {

    setTimeout(function () {
      document.body.removeChild(iframe);
      window.location = redirectUrlHref;
    }, 45);
    iframe.contentWindow.location = 'plndr://' + myrl;
  }
  else if ((usrAgent.indexOf("android") > -1)) {
    var start = (new Date()).valueOf();
    setTimeout(function () {
      var end = (new Date()).valueOf();
      if (end - start > 1000) return;
      document.body.removeChild(iframe);
      window.location = redirectUrlHref;
    }, 45);
    iframe.contentWindow.location = 'plndr://' + myrl;

  }
  else {
    window.location = redirectUrlHref;
  }

  iframe.onload = function () {
    document.body.removeChild(iframe);
  };
}

function createIFrame() {
  var iframe = document.createElement('iframe');
  iframe.style.visibility = 'hidden';
  iframe.style.position = 'absolute';
  iframe.style.left = '-999px';
  iframe.style.height = '100px';
  iframe.style.width = '100px';
  return iframe;
}