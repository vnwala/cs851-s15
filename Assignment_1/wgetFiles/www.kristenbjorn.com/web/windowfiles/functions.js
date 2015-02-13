function clickOption(){var i;var op;for(i=0;i<document.paymethod.method.length;i++){if(document.paymethod.method[i].checked){op=document.paymethod.method[i].value;}}
  
  var lang = document.paymethod.language.value;
  var langURL = "English";
  if(lang == "es"){
    langURL = "Spanish";  
  }else if(lang == "fr"){
    langURL = "French";
  }else if(lang == "pt"){
    langURL = "Portuguese_br";
  }else{
    langURL = "English";
  }  
  
  
  var username="";
  if(document.paymethod.username)
    username=document.paymethod.username.value;
  
  var email="";
  if(document.paymethod.email)
    email=document.paymethod.email.value;var password="";
  
  var password="";  
  if(document.paymethod.password)
    password=document.paymethod.password.value;

  var dayb="";
  if(document.paymethod.dayb)
    dayb=document.paymethod.dayb.value;   
  var monthb="";
  if(document.paymethod.monthb)
    monthb=document.paymethod.monthb.value;     
  var yearb="";  
  if(document.paymethod.yearb)
    yearb=document.paymethod.yearb.value;      


  if(op==1){ 
    if(document.paymethod.selectp.value=='CCBill'){
    window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=3cc&language='+langURL+'&allowedTypes=0000000042:840&subscriptionTypeId=0000000042:840&sku_id=6601&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13748&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv12p101156&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }else if(op==2){
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&sku_id=6601&formName=3cc&language='+langURL+'&allowedTypes=0000000038:840&subscriptionTypeId=0000000038:840&cascadeId=8759&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13429&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
       window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv37t3p39705JB2g8&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }else if(op==3){
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=3cc&language='+langURL+'&allowedTypes=0000000231:840&subscriptionTypeId=0000000231:840&sku_id=6601&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://sales.epochstats.com/signup/pre-join.php?s=1627&p=12971&c=0&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv10p96477&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }else if(op==8){
    //The most expensive   
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&language='+langURL+'&clientSubacc=0000&cascadeId=13691&sku_id=6601&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13690&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv22p523199&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }    
  }else if(op==5){
    //Trial option deleted
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=3cc&language='+langURL+'&allowedTypes=0000001618:840&subscriptionTypeId=0000001618:840&sku_id=6601&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13428&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv21p500841&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }else if(op==6){
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=3cc&language='+langURL+'&allowedTypes=0000000015:840&subscriptionTypeId=0000000015:840&sku_id=6601&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13426&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv23p640649&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }else if(op==7){
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=3cc&language='+langURL+'&allowedTypes=0000000785:840&subscriptionTypeId=0000000785:840&sku_id=6601&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13427&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv20p277533&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }else{
    if(document.paymethod.selectp.value=='CCBill'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&formName=3cc&language='+langURL+'&allowedTypes=0000004163:840&subscriptionTypeId=0000004163:840&sku_id=6601&cascadeId=8760&email='+email+'&username='+username+'&password='+password+'&yearb='+yearb+'&monthb='+monthb+'&dayb='+dayb,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(document.paymethod.selectp.value=='Epoch'){
      window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=13430&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
      window.open('https://wnu.com/secure/services/?api=join&pi_code=cavviv11p96496&reseller=a&selected_type=PP&email='+email+'&username='+username+'&password='+password+'&x_yearb='+yearb+'&x_monthb='+monthb+'&x_dayb='+dayb,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
  }

}
function clickOptionNoCard(){
  var i;var op;
  alert(document.paymethodnocard.methodnc);
    for(i=0;i<document.paymethodnocard.methodnc.length;i++){
      if(document.paymethodnocard.methodnc[i].checked){op=document.paymethodnocard.methodnc[i].value;}
    }
    if(op==1){
        window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&sku_id=6601&formName=51ck&language=English','CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else if(op==4){
        window.open('http://www.gxplugin.com/loader/index.php?id=2821-aff&site=krb','GXBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }else{
        window.open('https://sales.epochstats.com/signup/pre-join.php?s=1627&p=7694&c=0&selected_type=UK','Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes','Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes','Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
    }
}
function clickOptionNoCardNew(){
  var i;var op;
  for(i=0;i<document.paymethod.methodnc.length;i++){
    if(document.paymethod.methodnc[i].checked){
      op=document.paymethod.methodnc[i].value;
    }
  }
  var username="";
  if(document.paymethod.username)
    username=document.paymethod.username.value;var email="";
  if(document.paymethod.email)
    email=document.paymethod.email.value;var password="";
  if(document.paymethod.email)
    password=document.paymethod.password.value;
  if(op==9){
    window.open('https://bill.ccbill.com/jpost/billingCascade.cgi?clientAccnum=934718&clientSubacc=0000&cascadeId=12886&email='+email+'&username='+username+'&password='+password,'CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
  }else if(op==8){
    window.open('http://www.gxplugin.com/loader/index.php?id=2821-aff&site=krb','GXBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');
  }else{
    window.open('https://sales.epochstats.com/signup/pre-join.php?s=1627&p=7694&c=0&selected_type=UK&email='+email+'&username='+username+'&password='+password,'Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes','Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes','Epoch','toolbar=yes,location=yes,status=yes,scrollbars=yes');
  }
}
function clickOptionVodLatinAmerica(){var i;var op;for(i=0;i<document.paymethod2.method2.length;i++){if(document.paymethod2.method2[i].checked){op=document.paymethod2.method2[i].value;}}
if(op==1){window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=105lb&language=English&allowedTypes=0000000038:840&subscriptionTypeId=0000000038:840&sku_id=6601','CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');}else if(op==2){window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=105lb&language=English&allowedTypes=0000001178:840&subscriptionTypeId=0000001178:840&sku_id=6601','CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');}else if(op==3){window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=105lb&language=English&allowedTypes=0000000232:840&subscriptionTypeId=0000000232:840&sku_id=6601','CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');}else{window.open('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0000&formName=105lb&language=English&allowedTypes=0000000038:840&subscriptionTypeId=0000000038:840&sku_id=6601','CCBill','width=800,toolbar=yes,location=yes,status=yes,scrollbars=yes');}}
function mainMenuOnChange(link){window.location=link;}
function orderbystars(value){if(document.getElementById('oc').checked){if(window.location.href.indexOf("oc=0")!=-1){window.location=window.location.href.replace("&oc=0","&oc=1");}else{window.location=window.location.href+"&oc=1";}}else{if(window.location.href.indexOf("oc=1")!=-1){window.location=window.location.href.replace("&oc=1","&oc=0");}else{window.location=window.location.href+"&oc=0";}}}
function MM_preloadImages(){var d=document;if(d.images){if(!d.MM_p)d.MM_p=new Array();var i,j=d.MM_p.length,a=MM_preloadImages.arguments;for(i=0;i<a.length;i++)
if(a[i].indexOf("#")!=0){d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];}}}
function MM_swapImgRestore(){var i,x,a=document.MM_sr;for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)x.src=x.oSrc;}
function MM_findObj(n,d){var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);if(!x&&d.getElementById)x=d.getElementById(n);return x;}
function MM_swapImage(){var i,j=0,x,a=MM_swapImage.arguments;document.MM_sr=new Array;for(i=0;i<(a.length-2);i+=3)
if((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x;if(!x.oSrc)x.oSrc=x.src;x.src=a[i+2];}}
function goToPageSoloGallery(id){var node=document.getElementById(id);if(node&&node.tagName=="SELECT"){window.location.href=node.options[node.selectedIndex].value;}}

function selectWindowPaymentWV(paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod){
  if(paymmethod=='Epoch'){
    ventanaEmergente('https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file=WV');
  }else if(paymmethod=='CCBill'){
    ventanaEmergente('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0002&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file=WV');
  }else{
    ventanaEmergente('https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file=WV');
  }
}
function selectWindowPaymentWVQu(paymmethod,quality,pricepermdown,md5_hash,moviden,base64enc,epochidprod){
  if(paymmethod=='Epoch'){
    ventanaEmergente('https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file=WV&x_qu='+quality);
  }else if(paymmethod=='CCBill'){
    ventanaEmergente('https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc=0002&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file=WV&qu='+quality);
  }else{
    ventanaEmergente('https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file=WV&x_qu='+quality);
  }
}
function ventanaEmergente2(URL,id){var musicon=document.getElementById('allowmusic'+id).checked;if(musicon){URL=URL+'&x_music_on=Y';}else{URL=URL+'&x_music_on=N';}
window.open(URL,"ventanaE","width=750,height=500,scrollbars=yes");}
function ventanaEmergente(URL){window.open(URL,"ventanaE","width=780,height=500,scrollbars=yes");}

function ventanaEmergenteTH2(acc,id,paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod,type){

  if(paymmethod=='Epoch'){
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type;
  }else if(paymmethod=='CCBill'){
    URL='https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc='+acc+'&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file='+type;
  }else{
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type;
  }
  var musicon=document.getElementById('allowmusic'+id).checked;
  if(musicon){
    URL=URL+'&x_music_on=Y';
  }else{
    URL=URL+'&x_music_on=N';
  }
ventanaEmergente(URL);
}

function ventanaEmergenteTH(acc,id,paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod,type){

  if(paymmethod=='Epoch'){
    //URL='https://wnu.com/secure/services/?api=join&reseller=a&pi_code=ccawar37t1p52244&amount='+pricepermdown+'&epoch_digest='+epochidprod;
    //alert(URL);
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type;
  }else if(paymmethod=='CCBill'){
    URL='https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc='+acc+'&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file='+type;
  }else{
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type;
  }
  ventanaEmergente(URL);
}

function ventanaEmergenteHD(acc,id,paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod,type){
  if(paymmethod=='Epoch'){
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y';
  }else if(paymmethod=='CCBill'){
    URL='https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc='+acc+'&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file='+type+'&x_hd_on=Y';
  }else{
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y';
  }
  ventanaEmergente(URL);
  
}

function ventanaEmergenteHD2(acc,id,paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod,type){
  if(paymmethod=='Epoch'){
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y';
  }else if(paymmethod=='CCBill'){
    URL='https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc='+acc+'&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file='+type+'&x_hd_on=Y';
  }else{
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y';
  }
  var musicon=document.getElementById('allowmusichd'+id).checked;
  if(musicon){
    URL=URL+'&x_music_on=Y';
  }else{
    URL=URL+'&x_music_on=N';
  }
  ventanaEmergente(URL);
  
}

function ventanaEmergenteQuHD(acc,quality, id,paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod,type){
  if(paymmethod=='Epoch'){   
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y&x_qu='+quality;
  }else if(paymmethod=='CCBill'){
    URL='https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc='+acc+'&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file='+type+'&x_hd_on=Y&qu='+quality;
  }else{
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y&x_qu='+quality;
  }
  ventanaEmergente(URL);
  
}

function ventanaEmergenteQuHD2(acc,quality, id,paymmethod,pricepermdown,md5_hash,moviden,base64enc,epochidprod,type){
  if(paymmethod=='Epoch'){
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y&x_qu='+quality;
  }else if(paymmethod=='CCBill'){
    URL='https://bill.ccbill.com/jpost/signup.cgi?clientAccnum=934718&clientSubacc='+acc+'&formName=12cc&formPrice='+pricepermdown+'&formPeriod=10&currencyCode=840&formDigest='+md5_hash+'&movie_iden='+moviden+'&movie_id='+base64enc+'&file='+type+'&x_hd_on=Y&qu='+quality;
  }else{
    URL='https://wnu.com/secure/fpost.cgi?pi_code='+epochidprod+'&reseller=a&selected_type=PP&no_userpass=Y&pi_returnurl=http://www.kristenbjorn.com/web/model/theater/epochapproved.php&x_movie_iden='+moviden+'&x_movie_id='+base64enc+'&x_file='+type+'&x_hd_on=Y&x_qu='+quality;
  }
  var musicon=document.getElementById('allowmusichd'+id).checked;
  if(musicon){
    URL=URL+'&x_music_on=Y';
  }else{
    URL=URL+'&x_music_on=N';
  }
  ventanaEmergente(URL);
  
}

