
/*! start /app/merrick/themes/default/js/modernizr.js*/
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return x("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.csstransforms=function(){return!!H("transform")},r.csstransforms3d=function(){var a=!!H("perspective");return a&&"webkitPerspective"in g.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},r.csstransitions=function(){return H("transition")},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect};for(var I in r)A(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*! end /app/merrick/themes/default/js/modernizr.js*/

/*! start /lib/jquery.cookie/jquery.cookie.js*/
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};
/*! end /lib/jquery.cookie/jquery.cookie.js*/

/*! start /app/merrick/themes/default/js/gigya.js*/
$(document).ready(function(){gigya.socialize.addEventHandlers({onLogin:onLoginHandler,onLogout:onLogoutHandler,onConnectionAdded:ConnectionAddedHandler,onConnectionRemoved:ConnectionRemovedHandler});});function ConnectionAddedHandler(eventObj){$.post('/reg/user_profile/social_update',eventObj,function(data){});}
function ConnectionRemovedHandler(eventObj){$.post('/reg/user_profile/social_update',eventObj,function(data){});}
function init_social_register(tempUser){$('#reg_header').hide();$('#reg_header').html('<img id="profileImage" style="float:left; margin: 10px;" src="" width="100" /><h1 id="loginName"></h1><h2 id="email"></h2><h4 class="details">You have successfully connected with your <span id="loginProvider"></span> account.<br />Not you? <a href="/reg/logout/submit">Logout</a></h4><div class="clear"></div><h4 class="details">Please fill in the remaining fields below.');$('#profileImage').attr('src',tempUser['photo_url']);$('#email').html(tempUser['email']);$('#loginName').html(tempUser['first_name']+' '+tempUser['last_name']);$('#loginProvider').html(tempUser['provider']);if(typeof(tempUser['photo_url'])=='undefined'||tempUser['photo_url']==""){$('#profileImage').remove();}
$('#reg_header').slideDown(1200);}
function onSiteLoginHandler(event){var referrer=encodeURIComponent(window.location.href);window.location.href='/reg/login/display?referer='+referrer+'#commentsDiv';}
function onLoginHandler(eventObj){var autoLoginRegex=new RegExp('disable_autologin=(.*?)[;|$]');var autoLoginCookie=autoLoginRegex.exec(document.cookie);if(autoLoginCookie==1&&typeof eventObj['source']=='undefined'){return false;}
var user=eventObj['user'];var url='/reg/login/social';var referer=getParameterByName('referer');if(typeof(referer)!='undefined'&&referer!='')url+='?referer='+referer;$.ajax({type:'POST',url:url,data:user,dataType:'json',success:function(results,textStatus){if(results&&results['status']==true){if(typeof(results.data.send_to)!='undefined'){var send_to=results.data.send_to;if(send_to=='redirect_user'){redirect_url=results.data.redirect_user;window.location.replace(redirect_url);}else{redirect_url='/'+results.data.redirect_template+'?referer='+results.data.redirect_user;window.location.replace(redirect_url);}}else if(typeof(results.data.redirect_template)!='undefined'){redirect_url='/'+results.data.redirect_template+'?referer='+results.data.redirect_user;window.location.replace(redirect_url);}else{var action=results.data.action;for(var fields in results.data.social_media_fields){var user_data=results.data.social_media_fields;if(user_data.hasOwnProperty(fields)){var field=fields;if(user_data[fields]||user_data[fields]!=''){$('#field_'+field+'').val(user_data[fields]);if(window.location.href.indexOf(action)>-1){if(field=='email'){var submitData=$('#'+action+'__form').serialize();$.ajax({type:'POST',url:'/reg/'+action+'/validate_field/email',data:submitData,dataType:'json',success:function(results,textStatus){if(results.status==false){var $form=$('#'+action+'__form'),$field=$('#field_email'),$fieldContainer=$field.parent('.field_container'),$fieldFooter=$fieldContainer.find('.field_footer'),$fieldError=$fieldContainer.find('.field_error');var error=results.errors['email'];$fieldContainer.removeClass('success').addClass('invalid required');$fieldError.html(error);$fieldError.show();return results;}else{$('#field_container__remail').remove();$('#field_container__email').hide();$('#field_container__first_name').hide();$('#field_container__last_name').hide();$('#field_container__display_name').hide();}}});}}}
$('#field_container__pwd').remove();$('#field_container__rpwd').remove();}}
init_social_register(results.data.social_media_fields);}}else{errors=results.errors;for(var field in errors){if(errors.hasOwnProperty(field)){var $field=$('#field_'+field+''),$fieldContainer=$field.parent('.field_container'),$fieldFooter=$fieldContainer.find('.field_footer'),$fieldError=$fieldContainer.find('.field_error');$fieldContainer.removeClass('success').addClass('invalid required');$fieldError.html(results.errors[field]);$fieldError.show();}}}},error:function(XMLHttpRequest,textStatus,errorThrown){}});}
function onLogoutHandler(eventObj){window.location.replace($('#logout_link').attr('href'));}
function createSignature(UID,timestamp){encodedUID=encodeURIComponent(UID);return'';}
function verifyTheSignature(UID,timestamp,signature){encodedUID=encodeURIComponent(UID);}
function merrick_social_autologin2(){var user=new Object();var url='/reg/login/social_auto';var referer=getParameterByName('referer');if(typeof(referer)!='undefined'&&referer!='')url+='?referer='+referer;$.ajax({type:'POST',url:url,data:user,dataType:'json',success:function(results,textStatus){},error:function(XMLHttpRequest,textStatus,errorThrown){}});}
function merrick_social_autologin(response){fbl('merrick_social_autologin()');if(response['user']['isSiteUID']==false){}else{var logged_in=document.getElementById("logged_in");if(logged_in==null){var user=response['user'];var userFields=new Object(),encodedUID=encodeURIComponent(user['UID']),userFields={first_name:''+user['firstName']+'',last_name:''+user['lastName']+'',email:''+user['email']+'',display_name:''+user['nickname']+'',address1:''+user['address']+'',city:''+user['city']+'',postal_code:''+user['zip']+'',region:''+user['state']+'',country:''+user['country']+'',dob:''+user['birthYear']+'-'+user['birthMonth']+'-'+user['birthDay']+'',gigya_id:''+encodedUID+'',gender:''+user['gender']+'',timezone:''+user['timezone']+'',origin:user['loginProvider']+'',registered:'true',type:'social',provider:user['loginProvider']+'',age:user['age']+'',loginProvider:user['loginProvider']+'',photo_url:user['photoURL']+''};userFields[''+user['loginProvider']+'_id']=''+user['loginProviderUID']+'';$.post('/reg/login/social',userFields,function(data){if(data.status==true){$.get('/?block=login&action=login_link&context=user&path_override=false',function(data){$('#header .header_items div.primary').remove();$('#header .header_items .site_logo').after(data);$('.logged_in .logged_in_dropdown').parent().hover(function(){$(this).find('.logged_in_dropdown').next('.dropdown_nav').stop(false,false).show().slideDown('fast');$(this).parents('#logged_in').addClass('active');},function(){$(this).find('.logged_in_dropdown').next('.dropdown_nav').hide(0);$(this).parents('#logged_in').removeClass('active');});});}});}}}
function publishAction_callback(response)
{console.log(response);switch(response.errorCode)
{case 0:document.getElementById('status').style.color="green";document.getElementById('status').innerHTML="Sharing is caring!";break;default:console.log(response);}}
var gigya_autologin_params={callback:merrick_social_autologin,context:"autologin"}
var gigya_showloginui_params={showTermsLink:'false',height:20,width:100,containerID:'loginDiv',hideGigyaLink:true,showWhatsThis:true,autoDetectUserProviders:'',facepilePosition:'none',UIConfig:'<config><body><controls><snbuttons buttonsize="20" /></controls></body></config>'}
var gigya_connect_params={showTermsLink:'undefined',showEditLink:'undefined',height:20,width:100,containerID:'logged_in_Div',showTermsLink:false,hideGigyaLink:true,showWhatsThis:true}
var act=new gigya.socialize.UserAction();var category='Content';var content_id=0;function set_share_params(title,desc,image,link,actionlink){act.setTitle(title);act.setLinkBack(link);act.setDescription(desc);if(typeof(image)!='undefined'&&image!=""){act.addMediaItem({type:'image',src:image,href:link});}else{act.addMediaItem({type:'image',src:default_fb_image,href:link});}
if(typeof(actionlink)!='undefined'&&actionlink!=""){act.addActionLink(actionlink,link);}}
/*! end /app/merrick/themes/default/js/gigya.js*/

/*! start /app/merrick/themes/default/js/analytics.js*/
var Analytics=(function()
{var
trackers={};function init(options)
{initEvents();}
function initEvents()
{$(window).on('adUnitLoaded',function(w,elem,data)
{trackInViewAdImpression(elem.data(),data);});$(window).on('activePageChange',function(w,elem,data)
{trackPageView(data.contextId,data.prevContextId);});$(window).on('activeScreenChange',function(w,data){trackScreenChange(data);});$(document).on('click','a.navigation-link',function(){var
nav_context,item_label=$(this).text();if($(this).parents('.navigation-primary').exists())nav_context='Primary';if($(this).parents('.tooltip-submenu').exists())nav_context='Context Menu';if($(this).parents('.navigation-dropdown').exists())nav_context='Sidebar Dropdown';if($(this).parents('.navigation-tertiary').exists())nav_context='Category';if($(this).parents('.secondary-navigation').exists())nav_context='Footer';trackNavigationItemClick(nav_context,item_label)})
$(document).on('click','.related a.link',function(){var
nav_context='Related Content',item_label=$(this).parents('.content-block').data('id');trackNavigationItemClick(nav_context,item_label)})}
function pushCommand(tracker,args)
{initTracker(tracker);trackers[tracker].push(args);}
function initTracker(tracker)
{if(typeof trackers[tracker]==='undefined')trackers[tracker]=[];}
function setTracker(tracker,librarySrc,params)
{initTracker(tracker);for(var i=0;i<params.length;i++)
{pushCommand(tracker,params[i]);}
includeLibrary(tracker,librarySrc);}
function trackOutboundLink(params)
{pushCommand('_gaq',['_trackEvent','Outbound Links','Click',params.targetUrl,undefined,true]);}
function trackInViewAdImpression(containerData,adResponse)
{if(typeof containerData.adId!=='undefined')
{var adRequestData=containerData.requestParams;var includeKeys=['content_type','layout','term_vocab_ids','frequency_by_id'];if(typeof adRequestData.addVariable!=='undefined'){for(var key in adRequestData.addVariable){if(adRequestData.addVariable.hasOwnProperty(key)&&includeKeys.indexOf(key)===-1){delete adRequestData.addVariable[key];}}}
var adRequest={type:'ad_request',clientId:'$hash::'+JSON.stringify(containerData.requestParams),keyValues:containerData.requestParams,};var adUnit={type:'ad_unit',clientId:containerData.requestParams.addAdUnit,};var adEntity={type:'ad',clientId:containerData.adId,keyValues:{width:adResponse.width,height:adResponse.height,creativeType:adResponse.type,}};pushCommand('_olytics',['_trackEvent','view',adEntity,[adRequest,adUnit]]);}}
function trackAdvertisement(params)
{pushCommand('_gaq',['_trackEvent','Advertising','Click',params.adUnit,undefined,true]);}
function trackContentClick(params)
{if(params==undefined)return;pushCommand('_gaq',['_set','page',params.pageUrl]);pushCommand('_gaq',['_set','title',params.contentTitle]);pushCommand('_gaq',['_setReferrerOverride','0']);if(params.contentType!=undefined)
{pushCommand('_gaq',['_setCustomVar',1,'Content Type',params.contentType,3]);}
if(params.contentId!=undefined)
{pushCommand('_gaq',['_setCustomVar',2,'Content ID',params.contentId,3]);}
pushCommand('_gaq',['_trackPageview']);}
function trackScreenChange(data)
{var
screenDirection='Direction: ',screenHeight=(typeof data.screenHeight=='number')?Math.round(data.screenHeight):0;if(data.operator=='increment')
{screenDirection+='Down';}
else if(data.operator=='decrement')
{screenDirection+='Up';}
else
{screenDirection+='Unknown';}
pushCommand('_gaq',['_trackEvent','Screen Change',screenDirection,''+data.activeScreen]);if(typeof data.operator!='undefined')
{}}
function trackPageView(contextId,prevContextId)
{var contextData=Page.getContextData(contextId);if(typeof contextData.tracking=='object')
{if(typeof contextData.tracking.page=='object')
{pageTrackingHandler(contextData.tracking.page,prevContextId);}
if(typeof contextData.tracking.content=='object')
{contentTrackingHandler(contextData.tracking.content);}
if(typeof contextData.tracking.section=='object')
{sectionTrackingHandler(contextData.tracking.section);}
if(typeof contextData.tracking.search=='object')
{searchTrackingHandler(contextData.tracking.search);}}
pushCommand('_gaq',['_trackPageview']);pushCommand('_olytics',['_trackPageview']);}
function searchTrackingHandler(trackingData)
{pushCommand('_gaq',['_setCustomVar',4,'Channel','Search',3]);}
function sectionTrackingHandler(trackingData)
{if(typeof trackingData.id!='undefined')
{pushCommand('_gaq',['_setCustomVar',3,'Section ID',trackingData.id.toString(),3]);}
if(typeof trackingData.name!='undefined')
{pushCommand('_gaq',['_setCustomVar',4,'Channel',trackingData.name,3]);}
else
{pushCommand('_gaq',['_setCustomVar',4,'Channel','Section',3]);}}
function contentTrackingHandler(trackingData)
{if(typeof trackingData.id!='undefined')
{pushCommand('_gaq',['_setCustomVar',2,'Content ID',trackingData.id.toString(),3]);}
if(typeof trackingData.olytics=='object')
{pushCommand('_olytics',['_trackEvent','view',trackingData.olytics]);}
if(typeof trackingData.type!='undefined')
{pushCommand('_gaq',['_setCustomVar',1,'Content Type',trackingData.type,3]);}
var channelName=(typeof trackingData.primary_section_name!='undefined')?'Content: '+trackingData.primary_section_name:'Content: Generic';pushCommand('_gaq',['_setCustomVar',4,'Channel',channelName,3]);}
function pageTrackingHandler(trackingData,prevContextId)
{if(typeof trackingData.title!='undefined')
{pushCommand('_gaq',['_set','title',trackingData.title]);}
if(typeof trackingData.uri!='undefined')
{pushCommand('_gaq',['_set','page',trackingData.uri]);}
if(typeof trackingData.url!='undefined'&&typeof trackingData.title!='undefined')
{pushCommand('_olytics',['_setPage',trackingData.title,trackingData.url]);}
if(typeof trackingData.type!='undefined')
{pushCommand('_olytics',['_setPageType',trackingData.type]);}
if(prevContextId)
{var prevContextData=Page.getContextData(prevContextId);if(typeof prevContextData.tracking.page.url!='undefined')
{pushCommand('_gaq',['_setReferrerOverride','0']);}}}
function trackContinueRead(params){if(params==undefined)return;pushCommand('_gaq',['_set','page',document.URL]);pushCommand('_gaq',['_set','title',document.title]);pushCommand('_gaq',['_setReferrerOverride','0']);if(params.contentType!=undefined)
{pushCommand('_gaq',['_setCustomVar',1,'Content Type',params.contentType,3]);}
pushCommand('_gaq',['_trackEvent','BG Continue Reading','Click',params.contentId,undefined,true]);pushCommand('_baq',['_setPageView']);pushCommand('_gaq',['_trackPageview']);}
function trackContentShare(content_id,provider,source,section_id)
{var
baq_data={provider:provider,source:source},key=content_id;if(typeof section_id!='undefined'){key=key+'_'+section_id;}
var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','share',contentEntity,[],baq_data]);pushCommand('_gaq',['_trackEvent','Content','Share',key,undefined,true]);}
function trackContentComment(content_id){var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','comment',contentEntity]);pushCommand('_gaq',['_trackEvent','Content','Comment',undefined,content_id,true]);}
function trackContentRating(content_id,rating){var
baq_data={rating:rating};var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','rating',contentEntity,[],baq_data]);pushCommand('_gaq',['_trackEvent','Content','Rating',undefined,content_id,true]);}
function trackContentContinueReading(content_id,action){action=action||'Clicked';var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','continueReading',contentEntity]);pushCommand('_gaq',['_trackEvent','Content','Continue Reading','Continue Reading '+action,content_id,true]);}
function trackContentAccess(content_id,accessType){accessType=accessType||'Gated Impression';pushCommand('_gaq',['_trackEvent','Content','Content Access',accessType,content_id,true]);}
function trackContentCarouselChange(content_id,direction){var
baq_data={media_id:$('.swiper-slide-active .container').data('id'),direction:direction},key=content_id;var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','carouselChange',contentEntity,[],baq_data]);pushCommand('_gaq',['_trackEvent','Content','Carousel Change',undefined,content_id,true]);}
function trackContentPlay(content_id){var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','play',contentEntity]);pushCommand('_gaq',['_trackEvent','Content','Play',undefined,content_id,true]);}
function trackContentPause(content_id){var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','pause',contentEntity]);pushCommand('_gaq',['_trackEvent','Content','Pause',undefined,content_id,true]);}
function trackContentDownload(content_id){var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','download',contentEntity]);pushCommand('_gaq',['_trackEvent','Content','Download',undefined,content_id,true]);}
function trackContentRMIButtonClick(content_id){pushCommand('_gaq',['_trackEvent','Content','RMI Button Click',undefined,content_id,true]);}
function trackContentRMISubmission(content_id,baq_data){var contentEntity={type:'content',clientId:content_id};pushCommand('_olytics',['_trackEvent','rmiSubmit',contentEntity,[],baq_data]);pushCommand('_gaq',['_trackEvent','Content','RMI Submission',undefined,content_id,true]);}
function trackNavigationItemClick(nav_context,item_label){var baq_context=nav_context.replace(' ','_').toLowerCase();var
baq_data={item:item_label}
var navKeyValues={context:baq_context,item:item_label};var navEntity={type:'navigation',clientId:'$hash::'+JSON.stringify(navKeyValues),keyValues:navKeyValues};pushCommand('_olytics',['_trackEvent','click',navEntity]);pushCommand('_gaq',['_trackEvent','Navigation',nav_context,item_label,undefined,true]);}
function trackRmi(params){pushCommand('_gaq',['_trackEvent','RMI','Click',params.contentId,undefined,true]);}
function includeLibrary(tracker,librarySrc){var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.type='text/javascript';g.defer=true;g.async=true;g.src=librarySrc;var done=false;g.onload=g.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;if(typeof tracker==='string'){var trackerObject=eval(tracker);}else{return;}
for(x=0;x<trackers[tracker].length;x++){var thisCommand=trackers[tracker][x];trackerObject.push(thisCommand);}
trackers[tracker]=trackerObject;}}
s.parentNode.insertBefore(g,s);}
return{init:init,setTracker:setTracker,trackPageView:trackPageView,trackAdvertisement:trackAdvertisement,trackContentShare:trackContentShare,trackContentComment:trackContentComment,trackContentRating:trackContentRating,trackContentContinueReading:trackContentContinueReading,trackContentAccess:trackContentAccess,trackContentCarouselChange:trackContentCarouselChange,trackContentPlay:trackContentPlay,trackContentPause:trackContentPause,trackContentDownload:trackContentDownload,trackContentRMIButtonClick:trackContentRMIButtonClick,trackContentRMISubmission:trackContentRMISubmission,trackNavigationItemClick:trackNavigationItemClick}})();Analytics.init();
/*! end /app/merrick/themes/default/js/analytics.js*/

/*! start /app/merrick/themes/default/js/advertisement.js*/
var timer=false;var profile=false;var Advertisement=(function()
{var
defaults={};var ads=[];var deliveredFrequency={all:0,adUnitId:{},adUnitContainerId:{}};var enableDebug=false;var debug={};var userKeyValues=[];var instanceCalls={};var requestMethod='ARJ';var adSenseCounter=0;var adUnitGroupUnits=[];var groupAdCache=[];function init(options)
{if(profile)console.profile('Advertisement.init');if(timer)timerStart('Advertisement.init',timer);var options=$.extend(defaults,options);initEvents();if(profile)console.profileEnd();if(timer)timerEnd('Advertisement.init',timer);}
function initEvents()
{$(window).on('activeScreenChange',function(w,data){if(typeof data.activeContext=='string')
{refreshAds(data.activeContext);}});$(window).on('load scroll resize',function(){var adUnitContainers=getInViewTriggeredAdUnitContainers();showInViewAds(adUnitContainers);resetLoadedAds();});$(window).on('load',function(){var adUnitContainers=getOnLoadTriggeredAdUnitContainers();showOnLoadAds(adUnitContainers);});$(window).on('ready',function(){setUserKeyValues();if(Cygnus.advertisement.useAdUnitGroups){var adUnitContainers=getOnLoadTriggeredAdUnitContainers();getAdUnitGroups($(adUnitContainers[0]));}});}
function getAdUnitGroups(adUnitContainer)
{if(profile)console.profile('Advertisement.getAdUnitGroups');if(timer)timerStart('Advertisement.getAdUnitGroups',timer);setDebug(adUnitContainer,'notice','getAdUnitGroups() executed');var columns=Cygnus.columns;if(Cygnus.advertisement.adUnitGroups.hasOwnProperty('COL'+columns)){var adGroupConfig=Cygnus.advertisement.adUnitGroups['COL'+columns],adGroupId=adGroupConfig.adUnitGroupId;for(var i in adGroupConfig.adUnits){adUnitGroupUnits.push(getAdUnitIdFromAlias(adGroupConfig.adUnits[i]));};var adRequestUrl=prepareGroupRequest(adGroupId,adUnitContainer);if(adRequestUrl)
{requestAd(adRequestUrl,adUnitContainer,true);}
else
{setDebug(adUnitContainer,'error','Unable to generate ad group request url');}}
if(profile)console.profileEnd();if(timer)timerEnd('Advertisement.getAdUnitGroups',timer);}
function prepareGroupRequest(adGroupId,adUnitContainer)
{setDebug(adUnitContainer,'notice','prepareGroupRequest() executed');var adRequestUrl=prepareRequest(adUnitContainer,adGroupId);if(adRequestUrl){return adRequestUrl;}else{setDebug(adUnitContainer,'error','Unable to generate ad group request url');return false;}}
function setUserKeyValues()
{var userCookieRegex=new RegExp('udata=(.*?)[;|$]');var userDataCookie=userCookieRegex.exec(document.cookie);if(userDataCookie==null){return;}
var userData=decodeURIComponent(userDataCookie[1]);var keyValuePairs=userData.split('&');for(var i=0;i<keyValuePairs.length;i++){kv=keyValuePairs[i].split('=');userKeyValues.push(kv);};}
function showInViewAds(adUnitContainers)
{adUnitContainers.each(function(){var adUnitContainer=$(this);if(isAdViewable(adUnitContainer)&&!isAdLoading(adUnitContainer)){Advertisement.showAd(adUnitContainer);}});}
function showOnLoadAds(adUnitContainers)
{adUnitContainers.each(function(){var adUnitContainer=$(this);if(!isAdLoading(adUnitContainer)){Advertisement.showAd(adUnitContainer);}});}
function resetLoadedAds()
{var loadedAdUnitContainers=getLoadedInViewTriggeredAdUnitContainers();loadedAdUnitContainers.each(function(){var adUnitContainer=$(this);if(adUnitContainer.is(':offScreen'))
{adUnitContainer.removeClass('ad-loaded');}});}
function setInstanceCalls(instanceId,calls)
{instanceCalls[instanceId]=calls;}
function getInstanceCalls(instanceId)
{var contextData=Page.getContextData(instanceId);if(typeof contextData.ad_server!=='undefined')
{return contextData.ad_server;}
return[];}
function apply()
{var i,f,parameterArray;for(i=0;i<arguments.length;i+=1)
{parameterArray=arguments[i];f=parameterArray.shift();Advertisement.requestClientInstance[f].apply(Advertisement.requestClientInstance,parameterArray);}}
function prepareInstanceCalls(instanceId)
{var requestCalls=new Array;var globalInstanceCalls=getInstanceCalls(instanceId);for(var i=0;i<globalInstanceCalls.length;i++)
{if(globalInstanceCalls[i])
{var thisGlobalInstanceCall=globalInstanceCalls[i].slice(0);requestCalls.push(thisGlobalInstanceCall)}}
return requestCalls;}
function isArray(variable)
{var toString=Object.prototype.toString;return(toString.call(variable)=='[object Array]');}
function setRequestValues(params,key,value)
{if(isArray(value))
{if(value.length==1)
{value=value[0];}}
if(typeof params[key]==='undefined')
{params[key]=value;}
else if(isArray(params[key]))
{if(isArray(value))
{for(var i=0;i<value.length;i++)
{params[key].push(value[i]);}}
else
{params[key].push(value);}}
else
{var oldValue=params[key];params[key]=new Array;params[key].push(oldValue);if(isArray(value))
{for(var i=0;i<value.length;i++)
{params[key].push(value[i]);}}
else
{params[key].push(value);}}}
function setContainerRequestParams(adUnitContainer,calls)
{var requestParams={};for(var i=0;i<calls.length;i++)
{var thisCall=calls[i].slice(0);var method=thisCall[0];var values=thisCall.slice(1);if(method==='addVariable')
{if(typeof requestParams.addVariable==='undefined')
{requestParams.addVariable={};}
if(typeof values[0]!=='undefined'&&typeof values[1]!=='undefined')
{var key=values[0];var value=values[1];if(typeof value==='string')
{var splitValue=value.split(',');if(splitValue.length>1)
{value=splitValue;}
else
{value=splitValue[0]}}
setRequestValues(requestParams.addVariable,key,value);}}
else
{setRequestValues(requestParams,method,values);}}
adUnitContainer.data('requestParams',requestParams);}
function getClientInstance(calls)
{Advertisement.requestClientInstance=new OX();for(var i=0;i<calls.length;i++)
{if(calls[i])
{apply(calls[i])}}
return Advertisement.requestClientInstance;}
function prepareRequest(adUnitContainer,adGroupId)
{setDebug(adUnitContainer,'notice','prepareRequest() executed');var
adUnitId,instanceId,instanceCalls,instanceClient;adUnitId=getAdUnitId(adUnitContainer);if(adUnitId)
{setDebug(adUnitContainer,'notice',['adUnitId found',adUnitId]);instanceId=getAdUnitInstanceId(adUnitContainer);instanceCalls=prepareInstanceCalls(instanceId);setDebug(adUnitContainer,'notice',['Using instanceId',instanceId]);if(typeof adGroupId!='undefined'){instanceCalls.push(['addPage',adGroupId]);}else{instanceCalls.push(['addAdUnit',adUnitId]);}
if(isAdSponsored(adUnitContainer))
{instanceCalls.push(['addContentTopic',Cygnus.advertisement.sponsorTopicId]);}
var requestFrequencies={allAdUnits:getAdFrequncyAll()+1,thisAdUnit:getAdUnitFrequency(adUnitId)+1,thisAdContainer:getAdUnitContainerFrequency(adUnitContainer)+1}
instanceCalls.push(['addVariable','frequency',requestFrequencies.allAdUnits]);instanceCalls.push(['addVariable','frequency_by_id',requestFrequencies.thisAdUnit]);instanceCalls.push(['addVariable','frequency_by_container',requestFrequencies.thisAdContainer]);adUnitContainer.data('ad-request-frequencies',requestFrequencies);if(adSenseCounter>=3){instanceCalls.push(['addVariable','block_adsense','true']);}
for(var i=0;i<userKeyValues.length;i++){instanceCalls.push(['addVariable',userKeyValues[i][0],userKeyValues[i][1]]);setDebug(adUnitContainer,'notice','Blocking further adSense calls');};instanceCalls.push(['addVariable','layout',Cygnus.columns+'col']);instanceCalls.push(['addVariable','refreshable',isAdRefreshable(adUnitContainer)]);setContainerRequestParams(adUnitContainer,instanceCalls);instanceClient=getClientInstance(instanceCalls);incrementAdFrequency(adUnitId,adUnitContainer);setDebug(adUnitContainer,'notice','Incrementing ad frequency');return createAdRequestURL(instanceClient,instanceCalls);}
else
{setDebug(adUnitContainer,'error','adUnitId not found');return false;}}
function createAdRequestURL(instanceClient,instanceCalls){if(typeof instanceClient.createAdRequestURL=='function'){var adRequestURL=instanceClient.createAdRequestURL();var matchedRequestMethod=adRequestURL.match(/\/([a-z0-9]{1,})\?/i)[1];requestMethod=matchedRequestMethod.toUpperCase();return adRequestURL;}else{return createManualAdRequestURL(instanceCalls);}}
function createManualAdRequestURL(instanceCalls){var adRequestURL='',host_array=window.location.host.split('.'),url_parts=[];for(var i=host_array.length-1;i>=host_array.length-2;i--){url_parts.push(host_array[i])}
requestMethod='ARJ';adRequestURL="http://ox-d."+url_parts.reverse().join('.')+'/w/1.0/arj?';for(var i=instanceCalls.length-1;i>=0;i--){};return adRequestURL;}
function getFallbackCreative(adUnitContainer){var
adUnitId=adUnitContainer.data('ad-unit-id'),adUnitAlias=getAdAlias(adUnitId);if(adUnitAlias!='null'){if(Cygnus.advertisement.fallbackHtml.hasOwnProperty(adUnitAlias)){return Cygnus.advertisement.fallbackHtml[adUnitAlias];}else{setDebug(adUnitContainer,'warning','Unable to find a fallback for '+adUnitAlias);return'';}}else{setDebug(adUnitContainer,'warning','Unable to find alias for id '+adUnitId);}}
function requestAd(adRequestUrl,adUnitContainer,adGroup)
{setDebug(adUnitContainer,'notice','requestAd() executed');var
regex=new RegExp("[\\?&]callback=([^&#]*)"),callback=regex.exec(adRequestUrl)[1];if(typeof callback=='null'){setDebug(adUnitContainer,'error',['no callback method present in adRequestURL']);failAdResponse(adUnitContainer);return;}
if(Cygnus.advertisement.useAdUnitGroups){var adUnitId=parseInt(adUnitContainer.data('adUnitId'));if(groupAdCache[adUnitId]){setDebug(adUnitContainer,'notice','found cached version for adunit '+adUnitId);var creative=groupAdCache[adUnitId].creative,width=groupAdCache[adUnitId].width,height=groupAdCache[adUnitId].height,adid=groupAdCache[adUnitId].adid,pageid=groupAdCache[adUnitId].pageid,ad=groupAdCache[adUnitId];adUnitContainer.data('ad-id',parseInt(adid)).data('page-id',parseInt(pageid));processAlternateAdSize(adUnitContainer,width,height);writeAd(adUnitContainer,creative);setAdLoaded(adUnitContainer,ad);delete groupAdCache[adUnitId];return;}}
$.ajax({url:adRequestUrl,type:'GET',async:true,contentType:'application/json',dataType:'jsonp',jsonpCallback:callback}).done(function(response){if(adGroup){handleAdGroupResponse(response,adUnitContainer);}else{handleAdResponse(response,adUnitContainer);}}).fail(function(){failAdResponse(adUnitContainer);});}
function failAdResponse(adUnitContainer)
{setDebug(adUnitContainer,'error','Ad response failed.');if(!shouldAdSkipFallback(adUnitContainer))
{var creative=getFallbackCreative(adUnitContainer);if(creative!=''){writeAd(adUnitContainer,creative);}else{setDebug(adUnitContainer,'error','Fallback creative unavailable.');}}
setAdFailed(adUnitContainer);}
function updateAdSenseCounter(adUnitContainer){var searchString='(page_ad\.js|adsbygoogle\.js)';if(adUnitContainer.html().match(searchString)){adSenseCounter=adSenseCounter+1;}}
function handleAdResponse(response,adUnitContainer)
{setDebug(adUnitContainer,'notice',['handleAdResponse() fired.',response]);switch(requestMethod){case"ACJ":handleAdResponseACJ(response,adUnitContainer);break;case"ARJ":handleAdResponseARJ(response,adUnitContainer);break;default:setDebug(adUnitContainer,'error',['No valid requestMethod found: '+requestMethod,response]);break;}
updateAdSenseCounter(adUnitContainer);}
function handleAdGroupResponse(response,adUnitContainer)
{setDebug(adUnitContainer,'notice',['handleAdGroupResponse() fired.',response]);switch(requestMethod){case"ACJ":handleAdGroupResponseACJ(response,adUnitContainer);break;case"ARJ":handleAdGroupResponseARJ(response,adUnitContainer);break;default:setDebug(adUnitContainer,'error',['No valid requestMethod found: '+requestMethod,response]);break;}
updateAdSenseCounter(adUnitContainer);}
function handleAdResponseARJ(response,adUnitContainer)
{setDebug(adUnitContainer,'notice',['handleAdResponseARJ() fired.',response]);if(response.ads.count>0)
{var ad=response.ads.ad[0];writeAd(adUnitContainer,ad);setAdLoaded(adUnitContainer,ad);}
else
{setDebug(adUnitContainer,'warning','No ad creatives returned with the response.');failAdResponse(adUnitContainer);}}
function handleAdResponseACJ(response,adUnitContainer)
{setDebug(adUnitContainer,'notice',['handleAdResponseACJ() fired.',response]);if(response.ads.adunits.length>0&&response.ads.adunits[0].chain.length>0)
{var ad=response.ads.adunits[0].chain[0];var creative=ad.html;adUnitContainer.data('ad-id',parseInt(ad.ad_id));processAlternateAdSize(adUnitContainer,ad.width,ad.height);creative=appendImpressionBeaconACJ(response,ad);writeAd(adUnitContainer,creative);setAdLoaded(adUnitContainer,ad);}
else
{setDebug(adUnitContainer,'warning','No ad creatives returned with the response.');failAdResponse(adUnitContainer);}}
function handleAdGroupResponseARJ(response,adUnitContainer)
{setDebug(adUnitContainer,'notice',['handleAdGroupResponseARJ() fired.',response]);if(response.ads.count>1)
{var ad=response.ads.ad[0];for(var i=0;i<response.ads.ad.length;i++){var ad=response.ads.ad[i],adunitid=ad.adunitid,adid=ad.adid,width=ad.creative.width,height=ad.creative.height,creative=ad.html,pageid=ad.adunitgroup;storeGroupAdResponse(pageid,adunitid,adid,width,height,creative);};}
else
{setDebug(adUnitContainer,'warning','No ad creatives returned with the group response.');failAdResponse(adUnitContainer);}}
function handleAdGroupResponseACJ(response,adUnitContainer)
{setDebug(adUnitContainer,'notice',['handleAdGroupResponseACJ() fired.',response]);if(response.ads.adunits.length>0&&response.ads.adunits[0].chain.length>0)
{for(var i=0;i<response.ads.adunits.length;i++){var adunit=response.ads.adunits[i],adunitid=adunit.auid,ad=adunit.chain[0],creative=ad.html,adid=ad.ad_id,width=ad.width,height=ad.height,pageid=adunit.pgid;creative=appendImpressionBeaconACJ(response,ad);storeGroupAdResponse(pageid,adunitid,adid,width,height,creative);};}
else
{setDebug(adUnitContainer,'warning','No ad creatives returned with the group response.');failAdResponse(adUnitContainer);}}
function storeGroupAdResponse(pageid,adunitid,adid,width,height,creative)
{var adunitid=parseInt(adunitid);groupAdCache[adunitid]={adid:adid,pageid:pageid,width:width,height:height,creative:creative};}
function appendImpressionBeaconACJ(adServerResponse,adCallResponse)
{var
beaconTemplate=adServerResponse.ads.record_tmpl,beaconMedium=adServerResponse.ads.medium,beaconResponseType='ri',beaconWrapper='<div style="position:absolute;left:0px;top:0px;visibility:hidden;"><img src="{beacon_template}"></div>',impressionBeacon='',beaconUri=adCallResponse.ts,adCreative=adCallResponse.html;beaconTemplate=beaconTemplate.replace('{medium}',beaconMedium);beaconTemplate=beaconTemplate.replace('{rtype}',beaconResponseType);beaconTemplate=beaconTemplate.replace('{txn_state}',beaconUri);impressionBeacon=beaconWrapper.replace('{beacon_template}',beaconTemplate);return impressionBeacon+adCreative;}
function initAdUnitFrequency(adUnitId)
{if(typeof deliveredFrequency.adUnitId[adUnitId]=='undefined')
{deliveredFrequency.adUnitId[adUnitId]=0;}}
function initAdUnitContainerFrequency(adUnitContainer)
{var adUnitContainerId=getAdUnitContainerId(adUnitContainer);if(typeof deliveredFrequency.adUnitContainerId[adUnitContainerId]=='undefined')
{deliveredFrequency.adUnitContainerId[adUnitContainerId]=0;}}
function getAdUnitContainerFrequency(adUnitContainer)
{initAdUnitContainerFrequency(adUnitContainer);var adUnitContainerId=getAdUnitContainerId(adUnitContainer);return deliveredFrequency.adUnitContainerId[adUnitContainerId];}
function getAdUnitFrequency(adUnitId)
{initAdUnitFrequency(adUnitId);return deliveredFrequency.adUnitId[adUnitId]}
function getAdFrequncyAll()
{return deliveredFrequency.all;}
function getAdFrequency()
{return deliveredFrequency;}
function incrementAdUnitContainerFrequency(adUnitContainer)
{initAdUnitContainerFrequency(adUnitContainer);var adUnitContainerId=getAdUnitContainerId(adUnitContainer);deliveredFrequency.adUnitContainerId[adUnitContainerId]++;}
function incrementAdFrequency(adUnitId,adUnitContainer)
{initAdUnitFrequency(adUnitId);incrementAdUnitContainerFrequency(adUnitContainer);deliveredFrequency.adUnitId[adUnitId]++;deliveredFrequency.all++;}
function writeAd(adUnitContainer,creative)
{setDebug(adUnitContainer,'notice','writeAd() executed');adUnitContainer.html('');postscribe(document.getElementById(getAdUnitContainerId(adUnitContainer)),creative);}
function processAlternateAdSize(adUnitContainer,width,height)
{setDebug(adUnitContainer,'notice','processAlternateAdSize() executed');var
creativeSize=width+'x'+height,matchString=new RegExp("^ad-([0-9]{1,})x([0-9]{1,})$");if(!adUnitContainer.hasClass('ad-'+creativeSize))
{var containerClasses=adUnitContainer.attr('class').split(' ');if(typeof containerClasses==='object')
{for(var i=0;i<containerClasses.length;i++)
{var adClassMatch=matchString.exec(containerClasses[i]);if(adClassMatch!=null)
{adUnitContainer.removeClass(containerClasses[i]);setDebug(adUnitContainer,'notice',['Removing ad size class',containerClasses[i]]);}}
adUnitContainer.addClass('ad-'+creativeSize);setDebug(adUnitContainer,'notice',['Adding ad size class','ad-'+creativeSize]);}}}
function showAd(adUnitContainer)
{if(profile)console.profile('Advertisement.showAd');if(timer)timerStart('Advertisement.showAd',timer);setDebug(adUnitContainer,'notice','showAd() executed');if(isAdRequestable(adUnitContainer))
{setAdLoading(adUnitContainer);var adRequestUrl=prepareRequest(adUnitContainer);if(adRequestUrl)
{requestAd(adRequestUrl,adUnitContainer);}
else
{setDebug(adUnitContainer,'error','Unable to generate ad request url');}}
else
{}
if(profile)console.profileEnd();if(timer)timerEnd('Advertisement.showAd',timer);}
function refreshAds(contextId)
{var adUnitContainers=getRefreshableAdUnitContainers();adUnitContainers.each(function(){var adUnitContainer=$(this);setContainerInstanceId(adUnitContainer,contextId);if(!isAdLoading(adUnitContainer)){Advertisement.showAd(adUnitContainer);}})}
function getInViewTriggeredAdUnitContainers()
{return $('.ad[data-ad-unit-trigger="inview"]:not(.ad-loaded):not(.ad-failed):visible');}
function getOnLoadTriggeredAdUnitContainers()
{return $('.ad[data-ad-unit-trigger="onload"]:not(.ad-loaded):not(.ad-failed)');}
function getRefreshableAdUnitContainers()
{return $('.ad[data-ad-unit-refresh="true"]:visible');}
function getLoadedInViewTriggeredAdUnitContainers()
{return $('.ad-loaded[data-ad-unit-trigger="inview"]');}
function getUnloadedAdUnitContainers()
{return $('.ad:not(.ad-loaded)')}
function getAllAdUnitContainers()
{return $('.ad');}
function isAdRequestable(adUnitContainer)
{var adUnitId=getAdUnitId(adUnitContainer);if(adUnitId)
{var adAlias=getAdAlias(adUnitId);if(adAlias!=null)
{return(isAdLayoutSupported(adAlias)&&isAdPageAllowed(adUnitContainer,adAlias));}}
return false;}
function isAdLayoutSupported(adAlias)
{var
currentLayout=Cygnus.columns+'col',layoutRestrictions=getAdLayoutRestrictions(adAlias);if(layoutRestrictions==null)return true;for(var i=0;i<layoutRestrictions.length;i++)
{if(layoutRestrictions[i]==currentLayout)return false;}
return true;}
function isAdPageAllowed(adUnitContainer,adAlias)
{var
currentPage=window.location.pathname,adAliasRestrictions=Cygnus.advertisement.denyAds.aliases,adPageRegexes=Cygnus.advertisement.denyAds.regEx;if(jQuery.inArray(adAlias,adAliasRestrictions)>-1){for(var i=adPageRegexes.length-1;i>=0;i--){var testRegex=new RegExp(adPageRegexes[i]);var aliasDenied=testRegex.exec(currentPage);if(aliasDenied!=null){return false;}};}
return true;}
function isAdLoaded(adUnitContainer)
{return(adUnitContainer.hasClass('ad-loaded'));}
function isAdLoading(adUnitContainer)
{return(adUnitContainer.hasClass('ad-loading'));}
function isAdViewable(adUnitContainer)
{if(isAdStrictView(adUnitContainer)){return(adUnitContainer.is(':inView'));}else{return(adUnitContainer.is(':viewable'));}}
function isAdStrictView(adUnitContainer)
{var adUnitData=adUnitContainer.data('ad-strict-view');return(adUnitData=='true'||adUnitData==true);}
function shouldAdSkipFallback(adUnitContainer)
{var adUnitData=adUnitContainer.data('ad-skip-fallback');return(adUnitData=='true'||adUnitData==true);}
function isAdVisible(adUnitContainer)
{return(adUnitContainer.is(':visible'));}
function isAdRefreshable(adUnitContainer)
{var adUnitData=adUnitContainer.data('ad-unit-refresh');return(adUnitData=='true'||adUnitData==true);}
function isAdSponsored(adUnitContainer)
{var
adUnitId=getAdUnitId(adUnitContainer),frequency=Cygnus.advertisement.frequencies.sponsor,skip=getFrequencySkip(adUnitContainer,'sponsor');if(adUnitId)
{var adUnitDelFreq=getAdUnitFrequency(adUnitId);var remainder=(skip+adUnitDelFreq)%frequency;return(remainder==0);}
return false;}
function setAdLoading(adUnitContainer)
{adUnitContainer.addClass('ad-loading');}
function setAdLoaded(adUnitContainer,ad)
{adUnitContainer.addClass('ad-loaded').removeClass('ad-loading');adUnitContainer.trigger('adLoaded',ad);$(window).trigger('adUnitLoaded',[adUnitContainer,ad]);}
function setAdFailed(adUnitContainer)
{adUnitContainer.addClass('ad-failed').removeClass('ad-loading');}
function getFrequencySkip(adUnitContainer,skipType)
{var
skipAttribute='ad-'+skipType+'-skip',adUnitData=adUnitContainer.data(skipAttribute);if(typeof adUnitData==='number')
{return adUnitData;}
return 0;}
function getAdLayoutRestrictions(adAlias)
{try
{if(typeof Cygnus.advertisement.meta.data[adAlias].excludeLayout==='object')
{return Cygnus.advertisement.meta.data[adAlias].excludeLayout;}
else
{return null;}}
catch(e)
{return null;}}
function getAdUnitContainerId(adUnitContainer)
{return adUnitContainer.attr('id');}
function getAdAlias(adUnitId)
{try
{if(typeof Cygnus.advertisement.meta.aliases[adUnitId]!=='undefined')
{return Cygnus.advertisement.meta.aliases[adUnitId];}
else
{return null;}}
catch(e)
{return null;}}
function getAdUnitIdFromAlias(alias)
{if(Cygnus.advertisement.meta.adUnits.hasOwnProperty(alias)){return Cygnus.advertisement.meta.adUnits[alias];}}
function getAdUnitId(adUnitContainer)
{var adUnitData=adUnitContainer.data('ad-unit-id');if(typeof adUnitData=='undefined'||typeof adUnitData=='null')
{return false;}
else
{return adUnitData;}}
function getDebug()
{return debug;}
function setContainerInstanceId(adUnitContainer,instanceId)
{adUnitContainer.data('instance-id',instanceId);}
function setDebug(adUnitContainer,messageType,data)
{if(enableDebug==false)return;var containerId=getAdUnitContainerId(adUnitContainer);initDebug(adUnitContainer);if(messageType=='notice'||messageType=='warning'||messageType=='error')
{debug[containerId][messageType].push(data);}}
function initDebug(adUnitContainer)
{var containerId=getAdUnitContainerId(adUnitContainer);if(typeof debug[containerId]==='undefined')
{debug[containerId]={data:adUnitContainer.data(),state:{isAdSponsored:isAdSponsored(adUnitContainer),isAdRefreshable:isAdRefreshable(adUnitContainer),isAdViewable:isAdViewable(adUnitContainer),isAdVisible:isAdVisible(adUnitContainer),isAdRequestable:isAdRequestable(adUnitContainer),},notice:[],warning:[],error:[]};}}
function getAdUnitInstanceId(adUnitContainer)
{var instanceData=adUnitContainer.data('instance-id');if(typeof instanceData=='undefined'||typeof instanceData=='null')
{return'default';}
else
{return instanceData;}}
return{init:init,refreshAds:refreshAds,showAd:showAd,getDebug:getDebug,setInstanceCalls:setInstanceCalls}})();Advertisement.init();
/*! end /app/merrick/themes/default/js/advertisement.js*/

/*! start /lib/postscribe/htmlParser/htmlParser.js*/
(function(){var supports=(function(){var supports={};var html;var work=this.document.createElement('div');html="<P><I></P></I>";work.innerHTML=html;supports.tagSoup=work.innerHTML!==html;work.innerHTML="<P><i><P></P></i></P>";supports.selfClose=work.childNodes.length===2;return supports;})();var startTag=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;var endTag=/^<\/([\-A-Za-z0-9_]+)[^>]*>/;var attr=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;var fillAttr=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;var DEBUG=false;function htmlParser(stream,options){stream=stream||'';options=options||{};for(var key in supports){if(supports.hasOwnProperty(key)){if(options.autoFix){options['fix_'+key]=true;}
options.fix=options.fix||options['fix_'+key];}}
var stack=[];var append=function(str){stream+=str;};var prepend=function(str){stream=str+stream;};var detect={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s>]/i,startTag:/^</,chars:/^[^<]/};var reader={comment:function(){var index=stream.indexOf("-->");if(index>=0){return{content:stream.substr(4,index),length:index+3};}},endTag:function(){var match=stream.match(endTag);if(match){return{tagName:match[1],length:match[0].length};}},atomicTag:function(){var start=reader.startTag();if(start){var rest=stream.slice(start.length);if(rest.match(new RegExp("<\/\\s*"+start.tagName+"\\s*>","i"))){var match=rest.match(new RegExp("([\\s\\S]*?)<\/\\s*"+start.tagName+"\\s*>","i"));if(match){return{tagName:start.tagName,attrs:start.attrs,content:match[1],length:match[0].length+start.length};}}}},startTag:function(){var match=stream.match(startTag);if(match){var attrs={};match[2].replace(attr,function(match,name){var value=arguments[2]||arguments[3]||arguments[4]||fillAttr.test(name)&&name||null;attrs[name]=value;});return{tagName:match[1],attrs:attrs,unary:!!match[3],length:match[0].length};}},chars:function(){var index=stream.indexOf("<");return{length:index>=0?index:stream.length};}};var readToken=function(){for(var type in detect){if(detect[type].test(stream)){if(DEBUG){console.log('suspected '+type);}
var token=reader[type]();if(token){if(DEBUG){console.log('parsed '+type,token);}
token.type=token.type||type;token.text=stream.substr(0,token.length);stream=stream.slice(token.length);return token;}
return null;}}};var readTokens=function(handlers){var tok;while(tok=readToken()){if(handlers[tok.type]&&handlers[tok.type](tok)===false){return;}}};var clear=function(){var rest=stream;stream='';return rest;};var rest=function(){return stream;};if(options.fix){(function(){var EMPTY=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;var CLOSESELF=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;var stack=[];stack.last=function(){return this[this.length-1];};stack.lastTagNameEq=function(tagName){var last=this.last();return last&&last.tagName&&last.tagName.toUpperCase()===tagName.toUpperCase();};stack.containsTagName=function(tagName){for(var i=0,tok;tok=this[i];i++){if(tok.tagName===tagName){return true;}}
return false;};var correct=function(tok){if(tok&&tok.type==='startTag'){tok.unary=EMPTY.test(tok.tagName)||tok.unary;}
return tok;};var readTokenImpl=readToken;var peekToken=function(){var tmp=stream;var tok=correct(readTokenImpl());stream=tmp;return tok;};var closeLast=function(){var tok=stack.pop();prepend('</'+tok.tagName+'>');};var handlers={startTag:function(tok){var tagName=tok.tagName;if(tagName.toUpperCase()==='TR'&&stack.lastTagNameEq('TABLE')){prepend('<TBODY>');prepareNextToken();}else if(options.fix_selfClose&&CLOSESELF.test(tagName)&&stack.containsTagName(tagName)){if(stack.lastTagNameEq(tagName)){closeLast();}else{prepend('</'+tok.tagName+'>');prepareNextToken();}}else if(!tok.unary){stack.push(tok);}},endTag:function(tok){var last=stack.last();if(last){if(options.fix_tagSoup&&!stack.lastTagNameEq(tok.tagName)){closeLast();}else{stack.pop();}}else if(options.fix_tagSoup){skipToken();}}};var skipToken=function(){readTokenImpl();prepareNextToken();};var prepareNextToken=function(){var tok=peekToken();if(tok&&handlers[tok.type]){handlers[tok.type](tok);}};readToken=function(){prepareNextToken();return correct(readTokenImpl());};})();}
return{append:append,readToken:readToken,readTokens:readTokens,clear:clear,rest:rest,stack:stack};}
htmlParser.supports=supports;htmlParser.tokenToString=function(tok){var handler={comment:function(tok){return'<--'+tok.content+'-->';},endTag:function(tok){return'</'+tok.tagName+'>';},atomicTag:function(tok){console.log(tok);return handler.startTag(tok)+
tok.content+
handler.endTag(tok);},startTag:function(tok){var str='<'+tok.tagName;for(var key in tok.attrs){var val=tok.attrs[key];str+=' '+key+'="'+(val?val.replace(/(^|[^\\])"/g,'$1\\\"'):'')+'"';}
return str+(tok.unary?'/>':'>');},chars:function(tok){return tok.text;}};return handler[tok.type](tok);};htmlParser.escapeAttributes=function(attrs){var escapedAttrs={};for(var name in attrs){var value=attrs[name];escapedAttrs[name]=value&&value.replace(/(^|[^\\])"/g,'$1\\\"');}
return escapedAttrs;};for(var key in supports){htmlParser.browserHasFlaw=htmlParser.browserHasFlaw||(!supports[key])&&key;}
this.htmlParser=htmlParser;})();
/*! end /lib/postscribe/htmlParser/htmlParser.js*/

/*! start /lib/postscribe/postscribe.js*/
(function(){var global=this;if(global.postscribe){return;}
var DEBUG=true;var DEBUG_CHUNK=false;var slice=Array.prototype.slice;function doNothing(){}
function isFunction(x){return"function"===typeof x;}
function each(arr,fn,_this){var i,len=(arr&&arr.length)||0;for(i=0;i<len;i++){fn.call(_this,arr[i],i);}}
function eachKey(obj,fn,_this){var key;for(key in obj){if(obj.hasOwnProperty(key)){fn.call(_this,key,obj[key]);}}}
function set(obj,props){eachKey(props,function(key,value){obj[key]=value;});return obj;}
function defaults(options,_defaults){options=options||{};eachKey(_defaults,function(key,val){if(options[key]==null){options[key]=val;}});return options;}
function toArray(obj){try{return slice.call(obj);}catch(e){var ret=[];each(obj,function(val){ret.push(val);});return ret;}}
function isScript(tok){return(/^script$/i).test(tok.tagName);}
var WriteStream=(function(){var BASEATTR='data-ps-';function data(el,name,value){var attr=BASEATTR+name;if(arguments.length===2){var val=el.getAttribute(attr);return val==null?val:String(val);}else if(value!=null&&value!==''){el.setAttribute(attr,value);}else{el.removeAttribute(attr);}}
function WriteStream(root,options){var doc=root.ownerDocument;set(this,{root:root,options:options,win:doc.defaultView||doc.parentWindow,doc:doc,parser:global.htmlParser('',{autoFix:true}),actuals:[root],proxyHistory:'',proxyRoot:doc.createElement(root.nodeName),scriptStack:[],writeQueue:[]});data(this.proxyRoot,'proxyof',0);}
WriteStream.prototype.write=function(){[].push.apply(this.writeQueue,arguments);var arg;while(!this.deferredRemote&&this.writeQueue.length){arg=this.writeQueue.shift();if(isFunction(arg)){this.callFunction(arg);}else{this.writeImpl(arg);}}};WriteStream.prototype.callFunction=function(fn){var tok={type:"function",value:fn.name||fn.toString()};this.onScriptStart(tok);fn.call(this.win,this.doc);this.onScriptDone(tok);};WriteStream.prototype.writeImpl=function(html){this.parser.append(html);var tok,tokens=[];while((tok=this.parser.readToken())&&!isScript(tok)){tokens.push(tok);}
this.writeStaticTokens(tokens);if(tok){this.handleScriptToken(tok);}};WriteStream.prototype.writeStaticTokens=function(tokens){var chunk=this.buildChunk(tokens);if(!chunk.actual){return;}
chunk.html=this.proxyHistory+chunk.actual;this.proxyHistory+=chunk.proxy;this.proxyRoot.innerHTML=chunk.html;if(DEBUG_CHUNK){chunk.proxyInnerHTML=this.proxyRoot.innerHTML;}
this.walkChunk();if(DEBUG_CHUNK){chunk.actualInnerHTML=this.root.innerHTML;}
return chunk;};WriteStream.prototype.buildChunk=function(tokens){var nextId=this.actuals.length,raw=[],actual=[],proxy=[];each(tokens,function(tok){raw.push(tok.text);if(tok.attrs){if(!(/^noscript$/i).test(tok.tagName)){var id=nextId++;actual.push(tok.text.replace(/(\/?>)/,' '+BASEATTR+'id='+id+' $1'));if(tok.attrs.id!=="ps-script"){proxy.push(tok.type==='atomicTag'?'':'<'+tok.tagName+' '+BASEATTR+'proxyof='+id+(tok.unary?'/>':'>'));}}}else{actual.push(tok.text);proxy.push(tok.type==='endTag'?tok.text:'');}});return{tokens:tokens,raw:raw.join(''),actual:actual.join(''),proxy:proxy.join('')};};WriteStream.prototype.walkChunk=function(){var node,stack=[this.proxyRoot];while((node=stack.shift())!=null){var isElement=node.nodeType===1;var isProxy=isElement&&data(node,'proxyof');if(!isProxy){if(isElement){this.actuals[data(node,'id')]=node;data(node,'id',null);}
var parentIsProxyOf=node.parentNode&&data(node.parentNode,'proxyof');if(parentIsProxyOf){this.actuals[parentIsProxyOf].appendChild(node);}}
stack.unshift.apply(stack,toArray(node.childNodes));}};WriteStream.prototype.handleScriptToken=function(tok){var remainder=this.parser.clear();if(remainder){this.writeQueue.unshift(remainder);}
tok.src=tok.attrs.src||tok.attrs.SRC;if(tok.src&&this.scriptStack.length){this.deferredRemote=tok;}else{this.onScriptStart(tok);}
var _this=this;this.writeScriptToken(tok,function(){_this.onScriptDone(tok);});};WriteStream.prototype.onScriptStart=function(tok){tok.outerWrites=this.writeQueue;this.writeQueue=[];this.scriptStack.unshift(tok);};WriteStream.prototype.onScriptDone=function(tok){if(tok!==this.scriptStack[0]){this.options.error({message:"Bad script nesting or script finished twice"});return;}
this.scriptStack.shift();this.write.apply(this,tok.outerWrites);if(!this.scriptStack.length&&this.deferredRemote){this.onScriptStart(this.deferredRemote);this.deferredRemote=null;}};WriteStream.prototype.writeScriptToken=function(tok,done){var el=this.buildScript(tok);if(tok.src){el.src=tok.src;this.scriptLoadHandler(el,done);}
try{this.insertScript(el);if(!tok.src){done();}}catch(e){this.options.error(e);done();}};WriteStream.prototype.buildScript=function(tok){var el=this.doc.createElement(tok.tagName);eachKey(tok.attrs,function(name,value){el.setAttribute(name,value);});if(tok.content){el.text=tok.content;}
return el;};WriteStream.prototype.insertScript=function(el){this.writeImpl('<span id="ps-script"/>');var cursor=this.doc.getElementById("ps-script");cursor.parentNode.replaceChild(el,cursor);};WriteStream.prototype.scriptLoadHandler=function(el,done){function cleanup(){el=el.onload=el.onreadystatechange=el.onerror=null;done();}
var error=this.options.error;set(el,{onload:function(){cleanup();},onreadystatechange:function(){if(/^(loaded|complete)$/.test(el.readyState)){cleanup();}},onerror:function(){error({message:'remote script failed '+el.src});cleanup();}});};return WriteStream;}());var postscribe=(function(){var nextId=0;var queue=[];var active=null;function nextStream(){var args=queue.shift();if(args){args.stream=runStream.apply(null,args);}}
function runStream(el,html,options){active=new WriteStream(el,options);active.id=nextId++;active.name=options.name||active.id;postscribe.streams[active.name]=active;var doc=el.ownerDocument;var stash={write:doc.write,writeln:doc.writeln};function write(str){str=options.beforeWrite(str);active.write(str);options.afterWrite(str);}
set(doc,{write:function(){return write(toArray(arguments).join(''));},writeln:function(str){return write(toArray(arguments).join('')+'\n');}});var oldOnError=active.win.onerror||doNothing;active.win.onerror=function(msg,url,line){options.error({msg:msg+' - '+url+':'+line});oldOnError.apply(active.win,arguments);};active.write(html,function streamDone(){set(doc,stash);active.win.onerror=oldOnError;options.done();active=null;nextStream();});return active;}
function postscribe(el,html,options){if(isFunction(options)){options={done:options};}
options=defaults(options,{done:doNothing,error:function(e){throw e;},beforeWrite:function(str){return str;},afterWrite:doNothing});el=(/^#/).test(el)?global.document.getElementById(el.substr(1)):el.jquery?el[0]:el;var args=[el,html,options];el.postscribe={cancel:function(){if(args.stream){args.stream.abort();}else{args[1]=doNothing;}}};queue.push(args);if(!active){nextStream();}
return el.postscribe;}
return set(postscribe,{streams:{},queue:queue,WriteStream:WriteStream});}());global.postscribe=postscribe;}());
/*! end /lib/postscribe/postscribe.js*/

/*! start app/merrick/themes/beta/js/page.js*/
var timer=false;var profile=false;var Page=(function()
{var
defaults={},animating,loadingDisplayed=false,overlayDisplayed=false,screenMultiplier=1.35,screenMaxHeight=(888-50-90)*screenMultiplier,contexts={},pages=[],contextData={},eventTriggerCounts={},activeScreen=1,activeContext=null,activePage=null;function init(options)
{if(profile)console.profile('Page.init');if(timer)timerStart('Page.init',timer);var options=$.extend(defaults,options);initEvents();if(profile)console.profileEnd();if(timer)timerEnd('Page.init',timer);}
function initEvents()
{$(window).on('activeContextChange activePageChange',function(w,elem,data)
{});$(window).on('activeScreenChange',function(w,data){});$(window).on('touchmove',function(ev){$(this).trigger('scroll');})
$(window).on('orientationchange',function(){$(this).trigger('resize');})
$(window).on('scroll resize',function()
{setDetectContext();})
$(function()
{setDetectContext();setColumns();})
$(window).on('resize',function()
{setColumns();})
$(window).on('scroll',function(){if($(window).scrollTop()>350&&!$('.page-footer').hasClass('fixed-bottom'))
{$('.page-footer').addClass('fixed-bottom');updateFooterOffset();}
else
if($(window).scrollTop()<=350&&$('.page-footer').hasClass('fixed-bottom'))
{$('.page-footer').removeClass('fixed-bottom');updateFooterOffset();}})
if(("standalone"in window.navigator)&&window.navigator.standalone)
{$(document).on("click","a",function(event){event.preventDefault();location.href=$(event.currentTarget).attr('href');});}}
function getScreenHeight()
{return Math.round(((Cygnus.view.available*screenMultiplier)>screenMaxHeight)?screenMaxHeight:(Cygnus.view.available*screenMultiplier));}
function setDetectScreen()
{var
scrollTop=(document.documentElement.scrollTop||document.body.scrollTop),screenHeight=Page.getScreenHeight();if(scrollTop>(screenHeight*activeScreen))
{activeScreen++;var data={operator:'increment',screenHeight:screenHeight,pixels:scrollTop,activeScreen:activeScreen,activePage:Page.activePage,activeContext:Page.activeContext};triggerScreenEvent('activeScreenChange',data);}
if(activeScreen>1)
{if(scrollTop<=(screenHeight*(activeScreen-2)))
{activeScreen--;var data={operator:'decrement',screenHeight:screenHeight,pixels:scrollTop,activeScreen:activeScreen,activePage:Page.activePage,activeContext:Page.activeContext};triggerScreenEvent('activeScreenChange',data);}}}
function setContextData(instanceId,data)
{contextData[instanceId]=data;}
function getContextData(instanceId)
{if(typeof contextData[instanceId]!=='undefined')
{return contextData[instanceId];}
return[];}
function setDetectContext()
{var contextContainers=$('.page-context');contextContainers.each(function(){var
contextContainer=$(this),contextId=getContainerContextId(contextContainer),viewContext={above:contextContainer.is(':aboveView'),inView:contextContainer.is(':inView'),below:contextContainer.is(':belowView')},newViewContext={};if(!contextLoadedFromContainer(contextContainer))
{if(contextExists(contextId))
{contextContainer.remove();}
else
{loadContext(contextContainer);setViewContext(viewContext,contextContainer);if(isFirstLoadedContext())
{setActiveContext(contextContainer,{action:'firstload',from:null});setActivePage(contextContainer,{action:'firstload',from:null});}
else if(viewContext.above==true)
{setActiveContext(contextContainer,{action:'onload',from:'above'});setActivePage(contextContainer,{action:'onload',from:'above'});}
else if(viewContext.inView==true)
{setActiveContext(contextContainer,{action:'onload',from:'in'});}}}
setDetectContextFromViewState(contextContainer,viewContext);});setDetectScreen();}
function setDetectContextFromViewState(contextContainer,viewContext)
{var
contextId=getContainerContextId(contextContainer),containerViewState=getContainerViewState(contextContainer,viewContext);if(containerViewState.action=='in'&&containerViewState.from=='above')
{newViewContext={above:false,inView:true,below:false};setViewContext(newViewContext,contextContainer);if(!containerIsActivePage(contextContainer))
{setActivePage(contextContainer,containerViewState);}}
else if(containerViewState.action=='in'&&containerViewState.from=='below')
{newViewContext={above:false,inView:true,below:false};setViewContext(newViewContext,contextContainer);if(!containerIsActiveContext(contextContainer))
{setActiveContext(contextContainer,containerViewState);}}
else if(containerViewState.action=='out'&&containerViewState.from=='above')
{newViewContext={above:true,inView:false,below:false};setViewContext(newViewContext,contextContainer);if(!containerIsActivePage(contextContainer))
{setActivePage(contextContainer,containerViewState);}
else
{}}
else if(containerViewState.action=='out'&&containerViewState.from=='below')
{newViewContext={above:false,inView:false,below:true};setViewContext(newViewContext,contextContainer);if(!containerIsActiveContext(contextContainer))
{}
else
{var prevContainer=getPreviousContext(contextId);if(prevContainer.element)
{setActiveContext(prevContainer.element,containerViewState);}}}}
function getContainerViewState(contextContainer,viewContext)
{var containerViewState={};if(contextContainer.data('above')&&viewContext.inView&&!contextContainer.data('in'))
{containerViewState={action:'in',from:'above'};}
else if(contextContainer.data('below')&&viewContext.inView&&!contextContainer.data('in'))
{containerViewState={action:'in',from:'below'};}
else if(viewContext.above&&!contextContainer.data('above'))
{containerViewState={action:'out',from:'above'};}
else if(viewContext.below&&!contextContainer.data('below'))
{containerViewState={action:'out',from:'below'};}
return containerViewState;}
function contextLoadedFromContainer(contextContainer)
{var loaded=contextContainer.data('loaded');return(loaded=='true'||loaded==true);}
function setContextContainerLoaded(contextContainer)
{contextContainer.data('loaded',true);}
function setContainerContextActive(contextContainer)
{contextContainer.data('active-context',true);}
function unsetContainerContextActive(contextContainer)
{contextContainer.data('active-context',false);}
function setContainerPageActive(contextContainer)
{contextContainer.data('active-page',true);}
function unsetContainerPageActive(contextContainer)
{contextContainer.data('active-page',false);}
function containerIsActiveContext(contextContainer)
{var active=contextContainer.data('active-context');return(active=='true'||active==true);}
function containerIsActivePage(contextContainer)
{var active=contextContainer.data('active-page');return(active=='true'||active==true);}
function setViewContext(viewContext,contextContainer)
{contextContainer.data(viewContext);}
function contextExists(contextId)
{return(Page.contexts.hasOwnProperty(contextId));}
function loadContext(contextContainer)
{var
contextId=getContainerContextId(contextContainer),i=getContextCount();Page.contexts[contextId]={index:i,element:contextContainer}
Page.pages[i]=contextId;setContextContainerLoaded(contextContainer);}
function getContextCount()
{var count=0;for(var k in Page.contexts){if(Page.contexts.hasOwnProperty(k)){count++;}}
return count;}
function isFirstLoadedContext()
{return(!hasLoadedContexts());}
function hasLoadedContexts()
{return(getContextCount()>1);}
function setActiveContext(contextContainer,data)
{var contextId=getContainerContextId(contextContainer);if(Page.activeContext!=contextId)
{if(Page.activeContext)
{var prevActiveContainer=Page.contexts[Page.activeContext].element;unsetContainerContextActive(prevActiveContainer);}
Page.activeContext=contextId;setContainerContextActive(contextContainer);triggerContextEvent('activeContextChange',contextContainer,data);}}
function setActivePage(contextContainer,data)
{var contextId=getContainerContextId(contextContainer);if(Page.activePage!=contextId)
{if(Page.activePage)
{var prevActiveContainer=Page.contexts[Page.activePage].element;unsetContainerPageActive(prevActiveContainer);}
Page.activePage=contextId;setContainerPageActive(contextContainer);triggerContextEvent('activePageChange',contextContainer,data);}}
function triggerScreenEvent(eventName,data)
{$(window).trigger(eventName,[data]);}
function triggerContextEvent(eventName,contextContainer,data)
{if(typeof data=='undefined')data={};var
contextId=getContainerContextId(contextContainer),prevContextId=getPreviousContextId(contextId);data.contextId=contextId;data.prevContextId=prevContextId;data.activeContextId=Page.activeContext;if(typeof Page.eventTriggerCounts[eventName]=='undefined')
{Page.eventTriggerCounts[eventName]=0;}
Page.eventTriggerCounts[eventName]++;data.eventCount=Page.eventTriggerCounts[eventName];$(window).trigger(eventName,[contextContainer,data]);}
function getContextIndex(contextId)
{if(typeof Page.contexts[contextId]=='undefined')return 0;return Page.contexts[contextId].index;}
function getPreviousContextId(contextId)
{var
prevIndex=getContextIndex(contextId)-1;if(typeof Page.pages[prevIndex]!='undefined')
{return Page.pages[prevIndex];}
return false;}
function getPreviousContext(contextId)
{var
prevContextId=getPreviousContextId(contextId);if(prevContextId)
{try
{return Page.contexts[prevContextId];}
catch(e)
{return false;}}
return false;}
function getContainerContextId(contextContainer)
{return contextContainer.data('id');}
function updateFooterOffset()
{$('.footer').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e){var viewOffsets={bottom:$('.fixed-bottom').height()?$('.fixed-bottom').height():0}
Cygnus.updateViewOffset(viewOffsets);Content.setSidebarHeight();$('.footer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend')});}
function setColumns()
{if(profile)console.profile('Page.setColumns');if(timer)timerStart('Page.setColumns',timer);var columns=Math.floor((Cygnus.display.width-20)/Cygnus.columnWidth);if(columns<Cygnus.columnMin)columns=Cygnus.columnMin;if(columns>Cygnus.columnMax)columns=Cygnus.columnMax;var width=columns>1?columns*Cygnus.columnWidth:320;$('.grid-wrapper').css({width:width})
Cygnus.columns=columns;Navigation.closeMenus();Navigation.togglePrimaryDropdown(columns);if(columns==3)
{$('body').removeClass('four-col two-col one-col');$('body').addClass('three-col');}
else if(columns==2)
{$('body').removeClass('four-col three-col one-col');$('body').addClass('two-col');}
else
{$('body').removeClass('four-col three-col two-col');$('body').addClass('one-col');}
$('.grid-wrapper').waitForImages(function()
{var grid=new Grid();grid.build();})
if(profile)console.profileEnd();if(timer)timerEnd('Page.setColumns',timer);return columns;}
function offsetContent($container)
{if(profile)console.profile('Page.offsetContent');if(timer)timerStart('Page.offsetContent',timer);$('.grid-wrapper').css({marginBottom:Cygnus.view.offsetBottom});if(profile)console.profileEnd();if(timer)timerEnd('Page.offsetContent',timer);}
function hideLoading()
{if(profile)console.profile('Page.hideLoading');if(timer)timerStart('Page.hideLoading',timer);loading=new Loading();loading.hide();if(profile)console.profileEnd();if(timer)timerEnd('Page.hideLoading',timer);}
function showLoading()
{if(profile)console.profile('Page.showLoading');if(timer)timerStart('Page.showLoading',timer);loading=new Loading();loading.show();if(profile)console.profileEnd();if(timer)timerEnd('Page.showLoading',timer);}
function hideOverlay()
{if(profile)console.profile('Page.hideOverlay');if(timer)timerStart('Page.hideOverlay',timer);overlay=new Overlay();overlay.hide();if(profile)console.profileEnd();if(timer)timerEnd('Page.hideOverlay',timer);}
function showOverlay()
{if(profile)console.profile('Page.showOverlay');if(timer)timerStart('Page.showOverlay',timer);overlay=new Overlay();overlay.show();if(profile)console.profileEnd();if(timer)timerEnd('Page.showOverlay',timer);}
function reloadGrid()
{var container=document.querySelector('.grid-wrapper');if($(container).data('isoriginleft')===true)Cygnus.masonryParams.isOriginLeft=true;if($(container).data('masonry')===false)return;var msnry=new Masonry(container,Cygnus.masonryParams);msnry.layout();}
function appendItems(items)
{var container=document.querySelector('.grid-wrapper');if($(container).data('isoriginleft')===true)Cygnus.masonryParams.isOriginLeft=true;var msnry=new Masonry(container,Cygnus.masonryParams);msnry.appended(items);msnry.layout();}
function Grid(el,params)
{}
Grid.prototype={build:function(el,params)
{var container=document.querySelector('.grid-wrapper');if($(container).data('isoriginleft')===true)Cygnus.masonryParams.isOriginLeft=true;if($(container).data('masonry')===false)return;var msnry=new Masonry(container,Cygnus.masonryParams);},refresh:function(el,params)
{},append:function(el,params)
{}}
function Loading()
{if(this.isAnimating)return'animation in process';}
Loading.prototype={show:function()
{if(loadingDisplayed)return'Loading overlay is already visible';animating=true;$('.page-overlay, .page-loading').removeClass('ghost').addClass('displayed').css({zIndex:''}).promise().done(function()
{$('.grid-wrapper').removeClass('ghost').addClass('displayed');animating=false;});loadingDisplayed=this.isDisplayed();return loadingDisplayed;},hide:function()
{if(!loadingDisplayed)return'Loading overlay is already hidden';animating=true;$('.page-overlay, .page-loading').removeClass('displayed').addClass('ghost').css({zIndex:-1}).promise().done(function()
{$('.grid-wrapper').removeClass('displayed').addClass('displayed');animating=false;});loadingDisplayed=this.isDisplayed();return loadingDisplayed;},toggle:function()
{if(loadingDisplayed)
{this.hide();}
else
{this.show();}},isDisplayed:function()
{return $('.page-overlay, .page-loading').hasClass('displayed');}}
function Overlay()
{if(this.isAnimating)return'animation in process';}
Overlay.prototype={show:function()
{if(overlayDisplayed)return'Overlay is already visible';animating=true;$('.page-overlay').removeClass('ghost').addClass('displayed').css({zIndex:''}).promise().done(function()
{$('.grid-wrapper').removeClass('ghost').addClass('displayed');animating=false;});overlayDisplayed=this.isDisplayed();return overlayDisplayed;},hide:function()
{if(!overlayDisplayed)return'Overlay is already hidden';animating=true;$('.page-overlay').removeClass('displayed').addClass('ghost').css({zIndex:-1}).promise().done(function()
{$('.grid-wrapper').removeClass('displayed').addClass('displayed');animating=false;});overlayDisplayed=this.isDisplayed();return overlayDisplayed;},toggle:function()
{if(overlayDisplayed)
{this.hide();}
else
{this.show();}},isDisplayed:function()
{return $('.page-overlay').hasClass('displayed');}}
return{init:init,initEvents:initEvents,reloadGrid:reloadGrid,appendItems:appendItems,setColumns:setColumns,offsetContent:offsetContent,hideLoading:hideLoading,showLoading:showLoading,hideOverlay:hideOverlay,showOverlay:showOverlay,setDetectContext:setDetectContext,contexts:contexts,pages:pages,activeContext:activeContext,activePage:activePage,eventTriggerCounts:eventTriggerCounts,contextData:contextData,setContextData:setContextData,getContextData:getContextData,getScreenHeight:getScreenHeight}})();Page.init();
/*! end app/merrick/themes/beta/js/page.js*/
