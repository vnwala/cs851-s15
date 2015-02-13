function check_browser_version(){
  var isIE = navigator.appName.indexOf("Microsoft") != -1;
  if(isIE){
     var arVersion = navigator.appVersion.split("MSIE");
     var version = parseFloat(arVersion[1]);
     return version;
  }
  return 7;
}
function refresh_d2pbar(){
   var version = check_browser_version();
   if(version <= 6 ) return true;
   var url = "/d2ptb";
   var xmlhttp = getXmlhttp();
   xmlhttp.open('GET', url, true);
   xmlhttp.onreadystatechange = function(){
     if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
         var str = xmlhttp.responseText;
         var obj = document.getElementById("d2ptoolbar");
         if(obj) obj.innerHTML= str;
     }else{return;}
   }
  xmlhttp.send(null);
}