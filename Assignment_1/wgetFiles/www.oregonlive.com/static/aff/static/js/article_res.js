/**
 * adv_article.js
 *
 * Requires jquery-1.7.1.js to be loaded first.
 * Copyright (c) Advance Internet. All rights reserved.
 */



function variableDefined (name) {
  return typeof this[name] !== 'undefined';
}
function storyPackageConfig() {
  
    if (variableDefined('storyPackage') == true){
     $("#series").append('<h3>' + storyPackage.package_title +'</h3>');
     
     if (storyPackage.package_image_url != "") {
      $("#series").append('<img src="' + storyPackage.package_image_url + '" class="storyPackageImage" alt="' + storyPackage.package_title + '">');
      $("#series h3").hide();
     }
     
     $("#series").append('<ul id="series_feed"></ul><div class="Links"></div>');
     
     if (storyPackage.package_type == "package_type_manual") {
      $.each(storyPackage.package_entries, function() {
        $("#series_feed").append('<li><a href="'+ this.url +'#incart_story_package">' + this.text + '</a></li>'); 
      });
     }
     
     if (storyPackage.package_type == "package_type_tag") {
      var feedURL = storyPackage.package_entries_tag_url;
      $.ajax({
			 type: "GET",
			 url: feedURL,
			 dataType: "xml",
			 success: function(xml) {
			  $(xml).find('entry').each(function(){
					  $("#series_feed").append('<li><a href="'+ $(this).find('link').attr('href') +'#incart_story_package">' + $(this).find('title').text() + '</a></li>');
					 });
					},
					error: function(xml) {
					}
				 });
     }
     
     if ((storyPackage.package_post_tag_url != "") && (storyPackage.package_post_tag_url.substr(0,7).toUpperCase() == 'HTTP://')) {
       $("#series .Links").append('<a href="' + storyPackage.package_post_tag_url + '">All Stories</a> <span>|</span> ')
     }
     
     if ((storyPackage.package_photo_tag_url != "") && (storyPackage.package_photo_tag_url.substr(0,7).toUpperCase() == 'HTTP://')) {
       $("#series .Links").append('<a href="' + storyPackage.package_photo_tag_url + '">All Photos</a> <span>|</span> ')
     }
     
     if ((storyPackage.package_video_tag_url != "") && (storyPackage.package_video_tag_url.substr(0,7).toUpperCase() == 'HTTP://')) {
       $("#series .Links").append('<a href="' + storyPackage.package_video_tag_url + '">All Videos</a>')
     }     
    }
    if ((variableDefined('storyPackage') == false) && (RegExp(/Spacer/).exec($('#story-package img').attr('src')) != null)){ 
     $("#story-package").addClass('noPackage');
    }
  if (document.documentElement.clientWidth < 950) {
    $("#social_bottom").before($("#story-package"));
  }
}

$(function() {
        
        // Gigyabar positioning
        var offsetTop = $("#Byline").offset(),
            offsetBottom = $("#rtb-comments").offset(),
            gigya = $("#social_top");
        $(window).scroll($.throttle( 50, function(){
             var winPos = $(window).scrollTop();
                if(offsetTop && offsetBottom)
                  if(offsetBottom.top <= winPos || winPos <= 350){
                      gigya.css({"position":"static"});
                  }else if(offsetBottom.top > winPos || winPos > 350){
                      gigya.css({"position":"fixed","top":"150px"});
                  };
             })
            );
         // end Gigyabar positioning
    
    if  ($(".PullQuote").length == 1) {
     var PullQuoteLocation = $(".PullQuote").attr("data-position");
     var PlaceElementAll = $("#article_container .entry-content > p").length;
     if ((PlaceElementAll < PullQuoteLocation) || (PullQuoteLocation == 0) || (PullQuoteLocation == null)) {
      PullQuoteLocation = Math.floor(PlaceElementAll / 2);
     }
     PullQuoteLocation = PullQuoteLocation - 1;
     $("#article_container .entry-content > p:eq(" + PullQuoteLocation + ")").addClass("PullQuoteAfter");
     $(".PullQuoteAfter").after($(".PullQuote"));
     $(".PullQuote").show();
    }
    
    if  ($("#stats-article-scoreboard").length == 1) {
     if (typeof $("#stats-article-scoreboard").attr("data-position") !== typeof undefined && $("#stats-article-scoreboard").attr("data-position") !== false) {
      ScoreboardLocation = $("#stats-article-scoreboard").attr("data-position");
     } else {
      ScoreboardLocation = 0;
     }
     if (ScoreboardLocation != 0) {
      $("#article_container .entry-content > p:eq(" + (ScoreboardLocation - 1) + ")").addClass("ScoreboardAfter");
      $(".ScoreboardAfter").after($("#stats-article-scoreboard"));
      
     }
    }
    
    
     storyPackageConfig();
    
    // Building Most Read
    
    today = new Date();
    dateToday = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    jsonFileRelated = "https://api.parsely.com/v2/related?apikey=" + ARCS.cookie_domain.substring(1)
	      + "&callback=buildRelated"
	      + "&pub_date_start=2012-01-01"
	      + "&exclude=tags:\"@exclude\"&exclude=tags:\"@photo-perm\""
              + "&pub_date_end=" + dateToday
	      + "&url=" + window.location.href;
   if ($("#related.newrelated").length > 0) {
    $.ajax({
     url: jsonFileRelated,
     dataType: 'jsonp',
     jsonp: true,
     jsonpCallback: "buildRelated"
    }).done(function(jsonData) {
     totalStories = 0;
     for (i=0; i < jsonData['data'].length; i++) {
      if ((totalStories < 2) && (jsonData['data'][i]['url'].indexOf("www-dev") == -1)
	  && (jsonData['data'][i]['url'].indexOf("www-uat") == -1)
	  && (jsonData['data'][i]['url'].indexOf("www-stage") == -1)
	  && (jsonData['data'][i]['url'].indexOf("mt-preview-") == -1)
	  && (jsonData['data'][i]['url'].indexOf("photos.") == -1)){
       var jsonMetaData = [];
       if ((typeof jsonData['data'][i]['metadata'] != "undefined") && (jsonData['data'][i]['metadata'] != null) && (jsonData['data'][i]['metadata'].length != 0)) {
	jsonMetaData = JSON.parse(jsonData['data'][i]['metadata']);
	console.log(jsonMetaData);
       }	
       relatedHTML ='<div class="RelatedColumn'
       if (totalStories == 1) {
        relatedHTML += ' last';
       }
       relatedHTML += '"><a href="' + jsonData['data'][i]['url'] + '#incart_related_stories">';
       if (jsonData['data'][i]['image_url'] != null){
        relatedHTML += '<img src="' + jsonData['data'][i]['image_url'] + '">';
        relatedHTML = relatedHTML.replace('<li','<li class="mostReadHasPhoto"');
       }
       relatedHTML += '<div>';
       if (jsonMetaData['sponsored_content'] == "1") {
	relatedHTML += '<div class="PremiumBlog"><span>SPONSORED CONTENT</span></div>';
       }
       relatedHTML += jsonData['data'][i]['title'] + '</div></a></div>';
       $("#related").append(relatedHTML);
       totalStories++;
      } 
     }
    });
   }
     
    
});;/**
 * adv_right_rail.js
 *
 * Contains common right rail scripts for advance pages.
 * Requires jquery-1.7.1.js to be loaded first.
 *
 * Copyright (c) Advance Internet. All rights reserved.
 */
(function($) {

	$(function() {
		// right rail actually. juggling this into here until I determine whether we need a separate file
	
		$('.module-tabs a').click(function(){
			var $this = $(this),
				whichBlock = $this.attr('href');

			$this.parents('ul').find('a').removeClass('active');
			$this.parents('section').find('.module-block').removeClass('active');
			$this.addClass('active');
			$(whichBlock).addClass('active');
			return false;
		});
		
		
		
	   if(typeof Modernizr != 'undefined' && !Modernizr.touch && $('#stickyad').length>0) { // mobile devices get position:fixed wrong, so skip them
		  // cache selector queries
		  var stickyad = $('#stickyad'),
		  stickyadWrap = $('#stickyad-wrap'),
		  moreBoxes = $('#more-in'),
		  view = $( window ),
		  stickyadHeight = stickyad.outerHeight(true);

		  function horizontalScrollCheck() {
			// update stickyad left position when horizontal scrollbar exists and is scrolled
			if (view.scrollLeft() > 0) {
				stickyad.css('left', (-1 * view.scrollLeft() + 8));
			} else if (stickyad.css('left') != stickyadWrapperOffset.left) {
				stickyad.css('left', stickyadWrapperOffset.left);
			}
		  }

		  function stickyAdCheck() {
			// apply fixed positioning when stickyad scrolls to the top of the browser and is smaller than viewport height
			moreBoxesOffset = moreBoxes.offset();
			stickyadWrapperOffset = stickyadWrap.offset();

			/*if ($(this).scrollTop() > stickyadWrapperOffset.top - 130 && view.height() > stickyadHeight && $(this).scrollTop() < moreBoxesOffset.top - 455){*/
			if ($(this).scrollTop() > stickyadWrapperOffset.top - 130 && view.height() > stickyadHeight && (moreBoxes.length < 1 || $(this).scrollTop() < moreBoxesOffset.top - 390 )) {
				if (!stickyad.hasClass('stickyad-fixed') ) {
				   stickyad.addClass('stickyad-fixed');
				   // fill visual space of static positioned stickyad
				   stickyadWrap.css('margin-bottom', stickyadHeight);
				} else {
				   horizontalScrollCheck();
				}

			} else {
				if (stickyad.hasClass('stickyad-fixed') ) {
				   stickyad.removeClass('stickyad-fixed');
				   stickyadWrap.css('margin-bottom', 0);
				}
			}
		  }
		  try {
			//using Cowboy's jQuery throttle/debounce plugin to throttle the scroll event
			view.bind("scroll resize", $.throttle( 100, stickyAdCheck ) );
	
			//update offset and left position of stickyad on resize event
			view.bind("resize", $.throttle( 100, function() {
			  stickyadWrapperOffset = stickyadWrap.offset();
			  if (stickyad.hasClass('stickyad-fixed') )horizontalScrollCheck();
			}));
		  } catch(err){
			if (typeof console != 'undefined') console.log('Unable to run the stickyad stuff');
		  }
		}
	});
	
	
})(jQuery);



;/*
 *  Sugar Library v1.4.1
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2014 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
(function(){function aa(a){return function(){return a}}
var m=Object,p=Array,q=RegExp,r=Date,s=String,t=Number,u=Math,ba="undefined"!==typeof global?global:this,v=m.prototype.toString,da=m.prototype.hasOwnProperty,ea=m.defineProperty&&m.defineProperties,fa="function"===typeof q(),ga=!("0"in new s("a")),ia={},ja=/^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/,w="Boolean Number String Array Date RegExp Function".split(" "),la=ka("boolean",w[0]),y=ka("number",w[1]),z=ka("string",w[2]),A=ma(w[3]),C=ma(w[4]),D=ma(w[5]),F=ma(w[6]);
function ma(a){var b="Array"===a&&p.isArray||function(b,d){return(d||v.call(b))==="[object "+a+"]"};return ia[a]=b}function ka(a,b){function c(c){return G(c)?v.call(c)==="[object "+b+"]":typeof c===a}return ia[b]=c}
function na(a){a.SugarMethods||(oa(a,"SugarMethods",{}),H(a,!1,!0,{extend:function(b,c,d){H(a,!1!==d,c,b)},sugarRestore:function(){return pa(this,a,arguments,function(a,c,d){oa(a,c,d.method)})},sugarRevert:function(){return pa(this,a,arguments,function(a,c,d){d.existed?oa(a,c,d.original):delete a[c]})}}))}function H(a,b,c,d){var e=b?a.prototype:a;na(a);I(d,function(d,f){var h=e[d],l=J(e,d);F(c)&&h&&(f=qa(h,f,c));!1===c&&h||oa(e,d,f);a.SugarMethods[d]={method:f,existed:l,original:h,instance:b}})}
function K(a,b,c,d,e){var g={};d=z(d)?d.split(","):d;d.forEach(function(a,b){e(g,a,b)});H(a,b,c,g)}function pa(a,b,c,d){var e=0===c.length,g=L(c),f=!1;I(b.SugarMethods,function(b,c){if(e||-1!==g.indexOf(b))f=!0,d(c.instance?a.prototype:a,b,c)});return f}function qa(a,b,c){return function(d){return c.apply(this,arguments)?b.apply(this,arguments):a.apply(this,arguments)}}function oa(a,b,c){ea?m.defineProperty(a,b,{value:c,configurable:!0,enumerable:!1,writable:!0}):a[b]=c}
function L(a,b,c){var d=[];c=c||0;var e;for(e=a.length;c<e;c++)d.push(a[c]),b&&b.call(a,a[c],c);return d}function sa(a,b,c){var d=a[c||0];A(d)&&(a=d,c=0);L(a,b,c)}function ta(a){if(!a||!a.call)throw new TypeError("Callback is not callable");}function M(a){return void 0!==a}function N(a){return void 0===a}function J(a,b){return!!a&&da.call(a,b)}function G(a){return!!a&&("object"===typeof a||fa&&D(a))}function ua(a){var b=typeof a;return null==a||"string"===b||"number"===b||"boolean"===b}
function va(a,b){b=b||v.call(a);try{if(a&&a.constructor&&!J(a,"constructor")&&!J(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}return!!a&&"[object Object]"===b&&"hasOwnProperty"in a}function I(a,b){for(var c in a)if(J(a,c)&&!1===b.call(a,c,a[c],a))break}function wa(a,b){for(var c=0;c<a;c++)b(c)}function xa(a,b){I(b,function(c){a[c]=b[c]});return a}function ya(a){ua(a)&&(a=m(a));if(ga&&z(a))for(var b=a,c=0,d;d=b.charAt(c);)b[c++]=d;return a}function O(a){xa(this,ya(a))}
O.prototype.constructor=m;var P=u.abs,za=u.pow,Aa=u.ceil,Q=u.floor,R=u.round,Ca=u.min,S=u.max;function Da(a,b,c){var d=za(10,P(b||0));c=c||R;0>b&&(d=1/d);return c(a*d)/d}var Ea=48,Fa=57,Ga=65296,Ha=65305,Ia=".",Ja="",Ka={},La;function Ma(){return"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff"}function Na(a,b){var c="";for(a=a.toString();0<b;)if(b&1&&(c+=a),b>>=1)a+=a;return c}
function Oa(a,b){var c,d;c=a.replace(La,function(a){a=Ka[a];a===Ia&&(d=!0);return a});return d?parseFloat(c):parseInt(c,b||10)}function T(a,b,c,d){d=P(a).toString(d||10);d=Na("0",b-d.replace(/\.\d+/,"").length)+d;if(c||0>a)d=(0>a?"-":"+")+d;return d}function Pa(a){if(11<=a&&13>=a)return"th";switch(a%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}
function Qa(a,b){function c(a,c){if(a||-1<b.indexOf(c))d+=c}var d="";b=b||"";c(a.multiline,"m");c(a.ignoreCase,"i");c(a.global,"g");c(a.u,"y");return d}function Ra(a){z(a)||(a=s(a));return a.replace(/([\\/\'*+?|()\[\]{}.^$])/g,"\\$1")}function U(a,b){return a["get"+(a._utc?"UTC":"")+b]()}function Sa(a,b,c){return a["set"+(a._utc&&"ISOWeek"!=b?"UTC":"")+b](c)}
function Ta(a,b){var c=typeof a,d,e,g,f,h,l,n;if("string"===c)return a;g=v.call(a);d=va(a,g);e=A(a,g);if(null!=a&&d||e){b||(b=[]);if(1<b.length)for(l=b.length;l--;)if(b[l]===a)return"CYC";b.push(a);d=a.valueOf()+s(a.constructor);f=e?a:m.keys(a).sort();l=0;for(n=f.length;l<n;l++)h=e?l:f[l],d+=h+Ta(a[h],b);b.pop()}else d=-Infinity===1/a?"-0":s(a&&a.valueOf?a.valueOf():a);return c+g+d}function Ua(a,b){return a===b?0!==a||1/a===1/b:Va(a)&&Va(b)?Ta(a)===Ta(b):!1}
function Va(a){var b=v.call(a);return ja.test(b)||va(a,b)}function Wa(a,b,c){var d,e=a.length,g=b.length,f=!1!==b[g-1];if(!(g>(f?1:2)))return Xa(a,e,b[0],f,c);d=[];L(b,function(b){if(la(b))return!1;d.push(Xa(a,e,b,f,c))});return d}function Xa(a,b,c,d,e){d&&(c%=b,0>c&&(c=b+c));return e?a.charAt(c):a[c]}function Ya(a,b){K(b,!0,!1,a,function(a,b){a[b+("equal"===b?"s":"")]=function(){return m[b].apply(null,[this].concat(L(arguments)))}})}na(m);I(w,function(a,b){na(ba[b])});var Za,$a;
for($a=0;9>=$a;$a++)Za=s.fromCharCode($a+Ga),Ja+=Za,Ka[Za]=s.fromCharCode($a+Ea);Ka[","]="";Ka["\uff0e"]=Ia;Ka[Ia]=Ia;La=q("["+Ja+"\uff0e,"+Ia+"]","g");
"use strict";H(m,!1,!1,{keys:function(a){var b=[];if(!G(a)&&!D(a)&&!F(a))throw new TypeError("Object required");I(a,function(a){b.push(a)});return b}});
function ab(a,b,c,d){var e=a.length,g=-1==d,f=g?e-1:0;c=isNaN(c)?f:parseInt(c>>0);0>c&&(c=e+c);if(!g&&0>c||g&&c>=e)c=f;for(;g&&0<=c||!g&&c<e;){if(a[c]===b)return c;c+=d}return-1}function bb(a,b,c,d){var e=a.length,g=0,f=M(c);ta(b);if(0!=e||f)f||(c=a[d?e-1:g],g++);else throw new TypeError("Reduce called on empty array with no initial value");for(;g<e;)f=d?e-g-1:g,f in a&&(c=b(c,a[f],f,a)),g++;return c}function cb(a){if(0===a.length)throw new TypeError("First argument must be defined");}H(p,!1,!1,{isArray:function(a){return A(a)}});
H(p,!0,!1,{every:function(a,b){var c=this.length,d=0;for(cb(arguments);d<c;){if(d in this&&!a.call(b,this[d],d,this))return!1;d++}return!0},some:function(a,b){var c=this.length,d=0;for(cb(arguments);d<c;){if(d in this&&a.call(b,this[d],d,this))return!0;d++}return!1},map:function(a,b){b=arguments[1];var c=this.length,d=0,e=Array(c);for(cb(arguments);d<c;)d in this&&(e[d]=a.call(b,this[d],d,this)),d++;return e},filter:function(a){var b=arguments[1],c=this.length,d=0,e=[];for(cb(arguments);d<c;)d in
this&&a.call(b,this[d],d,this)&&e.push(this[d]),d++;return e},indexOf:function(a,b){return z(this)?this.indexOf(a,b):ab(this,a,b,1)},lastIndexOf:function(a,b){return z(this)?this.lastIndexOf(a,b):ab(this,a,b,-1)},forEach:function(a,b){var c=this.length,d=0;for(ta(a);d<c;)d in this&&a.call(b,this[d],d,this),d++},reduce:function(a,b){return bb(this,a,b)},reduceRight:function(a,b){return bb(this,a,b,!0)}});
H(Function,!0,!1,{bind:function(a){var b=this,c=L(arguments,null,1),d;if(!F(this))throw new TypeError("Function.prototype.bind called on a non-function");d=function(){return b.apply(b.prototype&&this instanceof b?this:a,c.concat(L(arguments)))};d.prototype=this.prototype;return d}});H(r,!1,!1,{now:function(){return(new r).getTime()}});
(function(){var a=Ma().match(/^\s+$/);try{s.prototype.trim.call([1])}catch(b){a=!1}H(s,!0,!a,{trim:function(){return this.toString().trimLeft().trimRight()},trimLeft:function(){return this.replace(q("^["+Ma()+"]+"),"")},trimRight:function(){return this.replace(q("["+Ma()+"]+$"),"")}})})();
(function(){var a=new r(r.UTC(1999,11,31)),a=a.toISOString&&"1999-12-31T00:00:00.000Z"===a.toISOString();K(r,!0,!a,"toISOString,toJSON",function(a,c){a[c]=function(){return T(this.getUTCFullYear(),4)+"-"+T(this.getUTCMonth()+1,2)+"-"+T(this.getUTCDate(),2)+"T"+T(this.getUTCHours(),2)+":"+T(this.getUTCMinutes(),2)+":"+T(this.getUTCSeconds(),2)+"."+T(this.getUTCMilliseconds(),3)+"Z"}})})();
"use strict";function db(a){a=q(a);return function(b){return a.test(b)}}
function eb(a){var b=a.getTime();return function(a){return!(!a||!a.getTime)&&a.getTime()===b}}function fb(a){return function(b,c,d){return b===a||a.call(this,b,c,d)}}function gb(a){return function(b,c,d){return b===a||a.call(d,c,b,d)}}function hb(a,b){var c={};return function(d,e,g){var f;if(!G(d))return!1;for(f in a)if(c[f]=c[f]||ib(a[f],b),!1===c[f].call(g,d[f],e,g))return!1;return!0}}function jb(a){return function(b){return b===a||Ua(b,a)}}
function ib(a,b){if(!ua(a)){if(D(a))return db(a);if(C(a))return eb(a);if(F(a))return b?gb(a):fb(a);if(va(a))return hb(a,b)}return jb(a)}function kb(a,b,c,d){return b?b.apply?b.apply(c,d||[]):F(a[b])?a[b].call(a):a[b]:a}function V(a,b,c,d){var e=+a.length;0>c&&(c=a.length+c);c=isNaN(c)?0:c;for(!0===d&&(e+=c);c<e;){d=c%a.length;if(!(d in a)){lb(a,b,c);break}if(!1===b.call(a,a[d],d,a))break;c++}}
function lb(a,b,c){var d=[],e;for(e in a)e in a&&(e>>>0==e&&4294967295!=e)&&e>=c&&d.push(parseInt(e));d.sort().each(function(c){return b.call(a,a[c],c,a)})}function mb(a,b,c,d,e,g){var f,h,l;0<a.length&&(l=ib(b),V(a,function(b,c){if(l.call(g,b,c,a))return f=b,h=c,!1},c,d));return e?h:f}function nb(a,b){var c=[],d={},e;V(a,function(g,f){e=b?kb(g,b,a,[g,f,a]):g;ob(d,e)||c.push(g)});return c}
function pb(a,b,c){var d=[],e={};b.each(function(a){ob(e,a)});a.each(function(a){var b=Ta(a),h=!Va(a);if(qb(e,b,a,h)!==c){var l=0;if(h)for(b=e[b];l<b.length;)b[l]===a?b.splice(l,1):l+=1;else delete e[b];d.push(a)}});return d}function rb(a,b,c){b=b||Infinity;c=c||0;var d=[];V(a,function(a){A(a)&&c<b?d=d.concat(rb(a,b,c+1)):d.push(a)});return d}function sb(a){var b=[];L(a,function(a){b=b.concat(a)});return b}function qb(a,b,c,d){var e=b in a;d&&(a[b]||(a[b]=[]),e=-1!==a[b].indexOf(c));return e}
function ob(a,b){var c=Ta(b),d=!Va(b),e=qb(a,c,b,d);d?a[c].push(b):a[c]=b;return e}function tb(a,b,c,d){var e,g,f,h=[],l="max"===c,n="min"===c,x=p.isArray(a);for(e in a)if(a.hasOwnProperty(e)){c=a[e];f=kb(c,b,a,x?[c,parseInt(e),a]:[]);if(N(f))throw new TypeError("Cannot compare with undefined");if(f===g)h.push(c);else if(N(g)||l&&f>g||n&&f<g)h=[c],g=f}x||(h=rb(h,1));return d?h:h[0]}
function ub(a,b){var c,d,e,g,f=0,h=0;c=p[xb];d=p[yb];var l=p[zb],n=p[Ab],x=p[Bb];a=Cb(a,c,d);b=Cb(b,c,d);do c=a.charAt(f),e=l[c]||c,c=b.charAt(f),g=l[c]||c,c=e?n.indexOf(e):null,d=g?n.indexOf(g):null,-1===c||-1===d?(c=a.charCodeAt(f)||null,d=b.charCodeAt(f)||null,x&&((c>=Ea&&c<=Fa||c>=Ga&&c<=Ha)&&(d>=Ea&&d<=Fa||d>=Ga&&d<=Ha))&&(c=Oa(a.slice(f)),d=Oa(b.slice(f)))):(e=e!==a.charAt(f),g=g!==b.charAt(f),e!==g&&0===h&&(h=e-g)),f+=1;while(null!=c&&null!=d&&c===d);return c===d?h:c-d}
function Cb(a,b,c){z(a)||(a=s(a));c&&(a=a.toLowerCase());b&&(a=a.replace(b,""));return a}var Ab="AlphanumericSortOrder",xb="AlphanumericSortIgnore",yb="AlphanumericSortIgnoreCase",zb="AlphanumericSortEquivalents",Bb="AlphanumericSortNatural";H(p,!1,!0,{create:function(){var a=[];L(arguments,function(b){if(!ua(b)&&"length"in b&&("[object Arguments]"===v.call(b)||b.callee)||!ua(b)&&"length"in b&&!z(b)&&!va(b))b=p.prototype.slice.call(b,0);a=a.concat(b)});return a}});
H(p,!0,!1,{find:function(a,b){ta(a);return mb(this,a,0,!1,!1,b)},findIndex:function(a,b){var c;ta(a);c=mb(this,a,0,!1,!0,b);return N(c)?-1:c}});
H(p,!0,!0,{findFrom:function(a,b,c){return mb(this,a,b,c)},findIndexFrom:function(a,b,c){b=mb(this,a,b,c,!0);return N(b)?-1:b},findAll:function(a,b,c){var d=[],e;0<this.length&&(e=ib(a),V(this,function(a,b,c){e(a,b,c)&&d.push(a)},b,c));return d},count:function(a){return N(a)?this.length:this.findAll(a).length},removeAt:function(a,b){if(N(a))return this;N(b)&&(b=a);this.splice(a,b-a+1);return this},include:function(a,b){return this.clone().add(a,b)},exclude:function(){return p.prototype.remove.apply(this.clone(),
arguments)},clone:function(){return xa([],this)},unique:function(a){return nb(this,a)},flatten:function(a){return rb(this,a)},union:function(){return nb(this.concat(sb(arguments)))},intersect:function(){return pb(this,sb(arguments),!1)},subtract:function(a){return pb(this,sb(arguments),!0)},at:function(){return Wa(this,arguments)},first:function(a){if(N(a))return this[0];0>a&&(a=0);return this.slice(0,a)},last:function(a){return N(a)?this[this.length-1]:this.slice(0>this.length-a?0:this.length-a)},
from:function(a){return this.slice(a)},to:function(a){N(a)&&(a=this.length);return this.slice(0,a)},min:function(a,b){return tb(this,a,"min",b)},max:function(a,b){return tb(this,a,"max",b)},least:function(a,b){return tb(this.groupBy.apply(this,[a]),"length","min",b)},most:function(a,b){return tb(this.groupBy.apply(this,[a]),"length","max",b)},sum:function(a){a=a?this.map(a):this;return 0<a.length?a.reduce(function(a,c){return a+c}):0},average:function(a){a=a?this.map(a):this;return 0<a.length?a.sum()/
a.length:0},inGroups:function(a,b){var c=1<arguments.length,d=this,e=[],g=Aa(this.length/a);wa(a,function(a){a*=g;var h=d.slice(a,a+g);c&&h.length<g&&wa(g-h.length,function(){h=h.add(b)});e.push(h)});return e},inGroupsOf:function(a,b){var c=[],d=this.length,e=this,g;if(0===d||0===a)return e;N(a)&&(a=1);N(b)&&(b=null);wa(Aa(d/a),function(d){for(g=e.slice(a*d,a*d+a);g.length<a;)g.push(b);c.push(g)});return c},isEmpty:function(){return 0==this.compact().length},sortBy:function(a,b){var c=this.clone();
c.sort(function(d,e){var g,f;g=kb(d,a,c,[d]);f=kb(e,a,c,[e]);return(z(g)&&z(f)?ub(g,f):g<f?-1:g>f?1:0)*(b?-1:1)});return c},randomize:function(){for(var a=this.concat(),b=a.length,c,d;b;)c=u.random()*b|0,d=a[--b],a[b]=a[c],a[c]=d;return a},zip:function(){var a=L(arguments);return this.map(function(b,c){return[b].concat(a.map(function(a){return c in a?a[c]:null}))})},sample:function(a){var b=this.randomize();return 0<arguments.length?b.slice(0,a):b[0]},each:function(a,b,c){V(this,a,b,c);return this},
add:function(a,b){if(!y(t(b))||isNaN(b))b=this.length;p.prototype.splice.apply(this,[b,0].concat(a));return this},remove:function(){var a=this;L(arguments,function(b){var c=0;for(b=ib(b);c<a.length;)b(a[c],c,a)?a.splice(c,1):c++});return a},compact:function(a){var b=[];V(this,function(c){A(c)?b.push(c.compact()):a&&c?b.push(c):a||(null==c||c.valueOf()!==c.valueOf())||b.push(c)});return b},groupBy:function(a,b){var c=this,d={},e;V(c,function(b,f){e=kb(b,a,c,[b,f,c]);d[e]||(d[e]=[]);d[e].push(b)});
b&&I(d,b);return d},none:function(){return!this.any.apply(this,arguments)}});H(p,!0,!0,{all:p.prototype.every,any:p.prototype.some,insert:p.prototype.add});function Db(a,b){K(m,!1,!0,a,function(a,d){a[d]=function(a,c,f){var h=m.keys(ya(a)),l;b||(l=ib(c,!0));f=p.prototype[d].call(h,function(d){var f=a[d];return b?kb(f,c,a,[d,f,a]):l(f,d,a)},f);A(f)&&(f=f.reduce(function(b,c){b[c]=a[c];return b},{}));return f}});Ya(a,O)}
H(m,!1,!0,{map:function(a,b){var c={},d,e;for(d in a)J(a,d)&&(e=a[d],c[d]=kb(e,b,a,[d,e,a]));return c},reduce:function(a){var b=m.keys(ya(a)).map(function(b){return a[b]});return b.reduce.apply(b,L(arguments,null,1))},each:function(a,b){ta(b);I(a,b);return a},size:function(a){return m.keys(ya(a)).length}});var Eb="any all none count find findAll isEmpty".split(" "),Fb="sum average min max least most".split(" "),Gb=["map","reduce","size"],Hb=Eb.concat(Fb).concat(Gb);
(function(){function a(){var a=arguments;return 0<a.length&&!F(a[0])}var b=p.prototype.map;K(p,!0,a,"every,all,some,filter,any,none,find,findIndex",function(a,b){var e=p.prototype[b];a[b]=function(a){var b=ib(a);return e.call(this,function(a,c){return b(a,c,this)})}});H(p,!0,a,{map:function(a){return b.call(this,function(b,e){return kb(b,a,this,[b,e,this])})}})})();
(function(){p[Ab]="A\u00c1\u00c0\u00c2\u00c3\u0104BC\u0106\u010c\u00c7D\u010e\u00d0E\u00c9\u00c8\u011a\u00ca\u00cb\u0118FG\u011eH\u0131I\u00cd\u00cc\u0130\u00ce\u00cfJKL\u0141MN\u0143\u0147\u00d1O\u00d3\u00d2\u00d4PQR\u0158S\u015a\u0160\u015eT\u0164U\u00da\u00d9\u016e\u00db\u00dcVWXY\u00ddZ\u0179\u017b\u017d\u00de\u00c6\u0152\u00d8\u00d5\u00c5\u00c4\u00d6".split("").map(function(a){return a+a.toLowerCase()}).join("");var a={};V("A\u00c1\u00c0\u00c2\u00c3\u00c4 C\u00c7 E\u00c9\u00c8\u00ca\u00cb I\u00cd\u00cc\u0130\u00ce\u00cf O\u00d3\u00d2\u00d4\u00d5\u00d6 S\u00df U\u00da\u00d9\u00db\u00dc".split(" "),
function(b){var c=b.charAt(0);V(b.slice(1).split(""),function(b){a[b]=c;a[b.toLowerCase()]=c.toLowerCase()})});p[Bb]=!0;p[yb]=!0;p[zb]=a})();Db(Eb);Db(Fb,!0);Ya(Gb,O);p.AlphanumericSort=ub;
"use strict";
var W,Ib,Jb="ampm hour minute second ampm utc offset_sign offset_hours offset_minutes ampm".split(" "),Kb="({t})?\\s*(\\d{1,2}(?:[,.]\\d+)?)(?:{h}([0-5]\\d(?:[,.]\\d+)?)?{m}(?::?([0-5]\\d(?:[,.]\\d+)?){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))",Lb={},Mb,Nb,Ob,Pb=[],Qb={},X={yyyy:function(a){return U(a,"FullYear")},yy:function(a){return U(a,"FullYear")%100},ord:function(a){a=U(a,"Date");return a+Pa(a)},tz:function(a){return a.getUTCOffset()},isotz:function(a){return a.getUTCOffset(!0)},
Z:function(a){return a.getUTCOffset()},ZZ:function(a){return a.getUTCOffset().replace(/(\d{2})$/,":$1")}},Rb=[{name:"year",method:"FullYear",k:!0,b:function(a){return 864E5*(365+(a?a.isLeapYear()?1:0:0.25))}},{name:"month",error:0.919,method:"Month",k:!0,b:function(a,b){var c=30.4375,d;a&&(d=a.daysInMonth(),b<=d.days()&&(c=d));return 864E5*c}},{name:"week",method:"ISOWeek",b:aa(6048E5)},{name:"day",error:0.958,method:"Date",k:!0,b:aa(864E5)},{name:"hour",method:"Hours",b:aa(36E5)},{name:"minute",
method:"Minutes",b:aa(6E4)},{name:"second",method:"Seconds",b:aa(1E3)},{name:"millisecond",method:"Milliseconds",b:aa(1)}],Sb={};function Tb(a){xa(this,a);this.g=Pb.concat()}
Tb.prototype={getMonth:function(a){return y(a)?a-1:this.months.indexOf(a)%12},getWeekday:function(a){return this.weekdays.indexOf(a)%7},addFormat:function(a,b,c,d,e){var g=c||[],f=this,h;a=a.replace(/\s+/g,"[,. ]*");a=a.replace(/\{([^,]+?)\}/g,function(a,b){var d,e,h,B=b.match(/\?$/);h=b.match(/^(\d+)\??$/);var k=b.match(/(\d)(?:-(\d))?/),E=b.replace(/[^a-z]+$/,"");h?d=f.tokens[h[1]]:f[E]?d=f[E]:f[E+"s"]&&(d=f[E+"s"],k&&(e=[],d.forEach(function(a,b){var c=b%(f.units?8:d.length);c>=k[1]&&c<=(k[2]||
k[1])&&e.push(a)}),d=e),d=Ub(d));h?h="(?:"+d+")":(c||g.push(E),h="("+d+")");B&&(h+="?");return h});b?(b=Vb(f,e),e=["t","[\\s\\u3000]"].concat(f.timeMarker),h=a.match(/\\d\{\d,\d\}\)+\??$/),Wb(f,"(?:"+b+")[,\\s\\u3000]+?"+a,Jb.concat(g),d),Wb(f,a+"(?:[,\\s]*(?:"+e.join("|")+(h?"+":"*")+")"+b+")?",g.concat(Jb),d)):Wb(f,a,g,d)}};
function Xb(a,b,c){var d,e,g=b[0],f=b[1],h=b[2];b=a[c]||a.relative;if(F(b))return b.call(a,g,f,h,c);e=a.units[8*(a.plural&&1<g?1:0)+f]||a.units[f];a.capitalizeUnit&&(e=Yb(e));d=a.modifiers.filter(function(a){return"sign"==a.name&&a.value==(0<h?1:-1)})[0];return b.replace(/\{(.*?)\}/g,function(a,b){switch(b){case "num":return g;case "unit":return e;case "sign":return d.src}})}function Zb(a,b){b=b||a.code;return"en"===b||"en-US"===b?!0:a.variant}
function $b(a,b){return b.replace(q(a.num,"g"),function(b){return ac(a,b)||""})}function ac(a,b){var c;return y(b)?b:b&&-1!==(c=a.numbers.indexOf(b))?(c+1)%10:1}function Y(a,b){var c;z(a)||(a="");c=Sb[a]||Sb[a.slice(0,2)];if(!1===b&&!c)throw new TypeError("Invalid locale.");return c||Ib}
function bc(a,b){function c(a){var b=h[a];z(b)?h[a]=b.split(","):b||(h[a]=[])}function d(a,b){a=a.split("+").map(function(a){return a.replace(/(.+):(.+)$/,function(a,b,c){return c.split("|").map(function(a){return b+a}).join("|")})}).join("|");a.split("|").forEach(b)}function e(a,b,c){var e=[];h[a].forEach(function(a,f){b&&(a+="+"+a.slice(0,3));d(a,function(a,b){e[b*c+f]=a.toLowerCase()})});h[a]=e}function g(a,b,c){a="\\d{"+a+","+b+"}";c&&(a+="|(?:"+Ub(h.numbers)+")+");return a}function f(a,b){h[a]=
h[a]||b}var h,l;h=new Tb(b);c("modifiers");"months weekdays units numbers articles tokens timeMarker ampm timeSuffixes dateParse timeParse".split(" ").forEach(c);l=!h.monthSuffix;e("months",l,12);e("weekdays",l,7);e("units",!1,8);e("numbers",!1,10);f("code",a);f("date",g(1,2,h.digitDate));f("year","'\\d{2}|"+g(4,4));f("num",function(){var a=["-?\\d+"].concat(h.articles);h.numbers&&(a=a.concat(h.numbers));return Ub(a)}());(function(){var a=[];h.i={};h.modifiers.push({name:"day",src:"yesterday",value:-1});
h.modifiers.push({name:"day",src:"today",value:0});h.modifiers.push({name:"day",src:"tomorrow",value:1});h.modifiers.forEach(function(b){var c=b.name;d(b.src,function(d){var e=h[c];h.i[d]=b;a.push({name:c,src:d,value:b.value});h[c]=e?e+"|"+d:d})});h.day+="|"+Ub(h.weekdays);h.modifiers=a})();h.monthSuffix&&(h.month=g(1,2),h.months="1 2 3 4 5 6 7 8 9 10 11 12".split(" ").map(function(a){return a+h.monthSuffix}));h.full_month=g(1,2)+"|"+Ub(h.months);0<h.timeSuffixes.length&&h.addFormat(Vb(h),!1,Jb);
h.addFormat("{day}",!0);h.addFormat("{month}"+(h.monthSuffix||""));h.addFormat("{year}"+(h.yearSuffix||""));h.timeParse.forEach(function(a){h.addFormat(a,!0)});h.dateParse.forEach(function(a){h.addFormat(a)});return Sb[a]=h}function Wb(a,b,c,d){a.g.unshift({r:d,locale:a,q:q("^"+b+"$","i"),to:c})}function Yb(a){return a.slice(0,1).toUpperCase()+a.slice(1)}function Ub(a){return a.filter(function(a){return!!a}).join("|")}function cc(){var a=r.SugarNewDate;return a?a():new r}
function dc(a,b){var c;if(G(a[0]))return a;if(y(a[0])&&!y(a[1]))return[a[0]];if(z(a[0])&&b)return[ec(a[0]),a[1]];c={};Nb.forEach(function(b,e){c[b.name]=a[e]});return[c]}function ec(a){var b,c={};if(a=a.match(/^(\d+)?\s?(\w+?)s?$/i))N(b)&&(b=parseInt(a[1])||1),c[a[2].toLowerCase()]=b;return c}function fc(a,b,c){var d;N(c)&&(c=Ob.length);for(b=b||0;b<c&&(d=Ob[b],!1!==a(d.name,d,b));b++);}
function gc(a,b){var c={},d,e;b.forEach(function(b,f){d=a[f+1];N(d)||""===d||("year"===b&&(c.t=d.replace(/'/,"")),e=parseFloat(d.replace(/'/,"").replace(/,/,".")),c[b]=isNaN(e)?d.toLowerCase():e)});return c}function hc(a){a=a.trim().replace(/^just (?=now)|\.+$/i,"");return ic(a)}
function ic(a){return a.replace(Mb,function(a,c,d){var e=0,g=1,f,h;if(c)return a;d.split("").reverse().forEach(function(a){a=Lb[a];var b=9<a;b?(f&&(e+=g),g*=a/(h||1),h=a):(!1===f&&(g*=10),e+=g*a);f=b});f&&(e+=g);return e})}
function jc(a,b,c,d){function e(a){vb.push(a)}function g(){vb.forEach(function(a){a.call()})}function f(){var a=n.getWeekday();n.setWeekday(7*(k.num-1)+(a>Ba?Ba+7:Ba))}function h(){var a=B.i[k.edge];fc(function(a){if(M(k[a]))return E=a,!1},4);if("year"===E)k.e="month";else if("month"===E||"week"===E)k.e="day";n[(0>a.value?"endOf":"beginningOf")+Yb(E)]();-2===a.value&&n.reset()}function l(){var a;fc(function(b,c,d){"day"===b&&(b="date");if(M(k[b])){if(d>=wb)return n.setTime(NaN),!1;a=a||{};a[b]=k[b];
delete k[b]}});a&&e(function(){n.set(a,!0)})}var n,x,ha,vb,B,k,E,wb,Ba,ra,ca;n=cc();vb=[];n.utc(d);C(a)?n.utc(a.isUTC()).setTime(a.getTime()):y(a)?n.setTime(a):G(a)?(n.set(a,!0),k=a):z(a)&&(ha=Y(b),a=hc(a),ha&&I(ha.o?[ha.o].concat(ha.g):ha.g,function(c,d){var g=a.match(d.q);if(g){B=d.locale;k=gc(g,d.to);B.o=d;k.utc&&n.utc();if(k.timestamp)return k=k.timestamp,!1;d.r&&(!z(k.month)&&(z(k.date)||Zb(ha,b)))&&(ca=k.month,k.month=k.date,k.date=ca);k.year&&2===k.t.length&&(k.year=100*R(U(cc(),"FullYear")/
100)-100*R(k.year/100)+k.year);k.month&&(k.month=B.getMonth(k.month),k.shift&&!k.unit&&(k.unit=B.units[7]));k.weekday&&k.date?delete k.weekday:k.weekday&&(k.weekday=B.getWeekday(k.weekday),k.shift&&!k.unit&&(k.unit=B.units[5]));k.day&&(ca=B.i[k.day])?(k.day=ca.value,n.reset(),x=!0):k.day&&-1<(Ba=B.getWeekday(k.day))&&(delete k.day,k.num&&k.month?(e(f),k.day=1):k.weekday=Ba);k.date&&!y(k.date)&&(k.date=$b(B,k.date));k.ampm&&k.ampm===B.ampm[1]&&12>k.hour?k.hour+=12:k.ampm===B.ampm[0]&&12===k.hour&&
(k.hour=0);if("offset_hours"in k||"offset_minutes"in k)n.utc(),k.offset_minutes=k.offset_minutes||0,k.offset_minutes+=60*k.offset_hours,"-"===k.offset_sign&&(k.offset_minutes*=-1),k.minute-=k.offset_minutes;k.unit&&(x=!0,ra=ac(B,k.num),wb=B.units.indexOf(k.unit)%8,E=W.units[wb],l(),k.shift&&(ra*=(ca=B.i[k.shift])?ca.value:0),k.sign&&(ca=B.i[k.sign])&&(ra*=ca.value),M(k.weekday)&&(n.set({weekday:k.weekday},!0),delete k.weekday),k[E]=(k[E]||0)+ra);k.edge&&e(h);"-"===k.year_sign&&(k.year*=-1);fc(function(a,
b,c){b=k[a];var d=b%1;d&&(k[Ob[c-1].name]=R(d*("second"===a?1E3:60)),k[a]=Q(b))},1,4);return!1}}),k?x?n.advance(k):(n._utc&&n.reset(),kc(n,k,!0,!1,c)):("now"!==a&&(n=new r(a)),d&&n.addMinutes(-n.getTimezoneOffset())),g(),n.utc(!1));return{c:n,set:k}}function lc(a){var b,c=P(a),d=c,e=0;fc(function(a,f,h){b=Q(Da(c/f.b(),1));1<=b&&(d=b,e=h)},1);return[d,e,a]}
function mc(a){var b=lc(a.millisecondsFromNow());if(6===b[1]||5===b[1]&&4===b[0]&&a.daysFromNow()>=cc().daysInMonth())b[0]=P(a.monthsFromNow()),b[1]=6;return b}function nc(a,b,c){function d(a,c){var d=U(a,"Month");return Y(c).months[d+12*b]}Z(a,d,c);Z(Yb(a),d,c,1)}function Z(a,b,c,d){X[a]=function(a,g){var f=b(a,g);c&&(f=f.slice(0,c));d&&(f=f.slice(0,d).toUpperCase()+f.slice(d));return f}}
function oc(a,b,c){X[a]=b;X[a+a]=function(a,c){return T(b(a,c),2)};c&&(X[a+a+a]=function(a,c){return T(b(a,c),3)},X[a+a+a+a]=function(a,c){return T(b(a,c),4)})}function pc(a){var b=a.match(/(\{\w+\})|[^{}]+/g);Qb[a]=b.map(function(a){a.replace(/\{(\w+)\}/,function(b,e){a=X[e]||e;return e});return a})}
function qc(a,b,c,d){var e;if(!a.isValid())return"Invalid Date";Date[b]?b=Date[b]:F(b)&&(e=mc(a),b=b.apply(a,e.concat(Y(d))));if(!b&&c)return e=e||mc(a),0===e[1]&&(e[1]=1,e[0]=1),a=Y(d),Xb(a,e,0<e[2]?"future":"past");b=b||"long";if("short"===b||"long"===b||"full"===b)b=Y(d)[b];Qb[b]||pc(b);var g,f;e="";b=Qb[b];g=0;for(c=b.length;g<c;g++)f=b[g],e+=F(f)?f(a,d):f;return e}
function rc(a,b,c,d,e){var g,f,h,l=0,n=0,x=0;g=jc(b,c,null,e);0<d&&(n=x=d,f=!0);if(!g.c.isValid())return!1;if(g.set&&g.set.e){Rb.forEach(function(b){b.name===g.set.e&&(l=b.b(g.c,a-g.c)-1)});b=Yb(g.set.e);if(g.set.edge||g.set.shift)g.c["beginningOf"+b]();"month"===g.set.e&&(h=g.c.clone()["endOf"+b]().getTime());!f&&(g.set.sign&&"millisecond"!=g.set.e)&&(n=50,x=-50)}f=a.getTime();b=g.c.getTime();h=sc(a,b,h||b+l);return f>=b-n&&f<=h+x}
function sc(a,b,c){b=new r(b);a=(new r(c)).utc(a.isUTC());23!==U(a,"Hours")&&(b=b.getTimezoneOffset(),a=a.getTimezoneOffset(),b!==a&&(c+=(a-b).minutes()));return c}
function kc(a,b,c,d,e){function g(a){return M(b[a])?b[a]:b[a+"s"]}function f(a){return M(g(a))}var h;if(y(b)&&d)b={milliseconds:b};else if(y(b))return a.setTime(b),a;M(b.date)&&(b.day=b.date);fc(function(d,e,g){var l="day"===d;if(f(d)||l&&f("weekday"))return b.e=d,h=+g,!1;!c||("week"===d||l&&f("week"))||Sa(a,e.method,l?1:0)});Rb.forEach(function(c){var e=c.name;c=c.method;var h;h=g(e);N(h)||(d?("week"===e&&(h=(b.day||0)+7*h,c="Date"),h=h*d+U(a,c)):"month"===e&&f("day")&&Sa(a,"Date",15),Sa(a,c,h),
d&&"month"===e&&(e=h,0>e&&(e=e%12+12),e%12!=U(a,"Month")&&Sa(a,"Date",0)))});d||(f("day")||!f("weekday"))||a.setWeekday(g("weekday"));var l;a:{switch(e){case -1:l=a>cc();break a;case 1:l=a<cc();break a}l=void 0}l&&fc(function(b,c){if((c.k||"week"===b&&f("weekday"))&&!(f(b)||"day"===b&&f("weekday")))return a[c.j](e),!1},h+1);return a}
function Vb(a,b){var c=Kb,d={h:0,m:1,s:2},e;a=a||W;return c.replace(/{([a-z])}/g,function(c,f){var h=[],l="h"===f,n=l&&!b;if("t"===f)return a.ampm.join("|");l&&h.push(":");(e=a.timeSuffixes[d[f]])&&h.push(e+"\\s*");return 0===h.length?"":"(?:"+h.join("|")+")"+(n?"":"?")})}function tc(a,b,c){var d,e;y(a[1])?d=dc(a)[0]:(d=a[0],e=a[1]);return jc(d,e,b,c).c}
H(r,!1,!0,{create:function(){return tc(arguments)},past:function(){return tc(arguments,-1)},future:function(){return tc(arguments,1)},addLocale:function(a,b){return bc(a,b)},setLocale:function(a){var b=Y(a,!1);Ib=b;a&&a!=b.code&&(b.code=a);return b},getLocale:function(a){return a?Y(a,!1):Ib},addFormat:function(a,b,c){Wb(Y(c),a,b)}});
H(r,!0,!0,{set:function(){var a=dc(arguments);return kc(this,a[0],a[1])},setWeekday:function(a){if(!N(a))return Sa(this,"Date",U(this,"Date")+a-U(this,"Day"))},setISOWeek:function(a){var b=U(this,"Day")||7;if(!N(a))return this.set({month:0,date:4}),this.set({weekday:1}),1<a&&this.addWeeks(a-1),1!==b&&this.advance({days:b-1}),this.getTime()},getISOWeek:function(){var a;a=this.clone();var b=U(a,"Day")||7;a.addDays(4-b).reset();return 1+Q(a.daysSince(a.clone().beginningOfYear())/7)},beginningOfISOWeek:function(){var a=
this.getDay();0===a?a=-6:1!==a&&(a=1);this.setWeekday(a);return this.reset()},endOfISOWeek:function(){0!==this.getDay()&&this.setWeekday(7);return this.endOfDay()},getUTCOffset:function(a){var b=this._utc?0:this.getTimezoneOffset(),c=!0===a?":":"";return!b&&a?"Z":T(Q(-b/60),2,!0)+c+T(P(b%60),2)},utc:function(a){oa(this,"_utc",!0===a||0===arguments.length);return this},isUTC:function(){return!!this._utc||0===this.getTimezoneOffset()},advance:function(){var a=dc(arguments,!0);return kc(this,a[0],a[1],
1)},rewind:function(){var a=dc(arguments,!0);return kc(this,a[0],a[1],-1)},isValid:function(){return!isNaN(this.getTime())},isAfter:function(a,b){return this.getTime()>r.create(a).getTime()-(b||0)},isBefore:function(a,b){return this.getTime()<r.create(a).getTime()+(b||0)},isBetween:function(a,b,c){var d=this.getTime();a=r.create(a).getTime();var e=r.create(b).getTime();b=Ca(a,e);a=S(a,e);c=c||0;return b-c<d&&a+c>d},isLeapYear:function(){var a=U(this,"FullYear");return 0===a%4&&0!==a%100||0===a%400},
daysInMonth:function(){return 32-U(new r(U(this,"FullYear"),U(this,"Month"),32),"Date")},format:function(a,b){return qc(this,a,!1,b)},relative:function(a,b){z(a)&&(b=a,a=null);return qc(this,a,!0,b)},is:function(a,b,c){var d,e;if(this.isValid()){if(z(a))switch(a=a.trim().toLowerCase(),e=this.clone().utc(c),!0){case "future"===a:return this.getTime()>cc().getTime();case "past"===a:return this.getTime()<cc().getTime();case "weekday"===a:return 0<U(e,"Day")&&6>U(e,"Day");case "weekend"===a:return 0===
U(e,"Day")||6===U(e,"Day");case -1<(d=W.weekdays.indexOf(a)%7):return U(e,"Day")===d;case -1<(d=W.months.indexOf(a)%12):return U(e,"Month")===d}return rc(this,a,null,b,c)}},reset:function(a){var b={},c;a=a||"hours";"date"===a&&(a="days");c=Rb.some(function(b){return a===b.name||a===b.name+"s"});b[a]=a.match(/^days?/)?1:0;return c?this.set(b,!0):this},clone:function(){var a=new r(this.getTime());a.utc(!!this._utc);return a}});
H(r,!0,!0,{iso:function(){return this.toISOString()},getWeekday:r.prototype.getDay,getUTCWeekday:r.prototype.getUTCDay});function uc(a,b){function c(){return R(this*b)}function d(){return tc(arguments)[a.j](this)}function e(){return tc(arguments)[a.j](-this)}var g=a.name,f={};f[g]=c;f[g+"s"]=c;f[g+"Before"]=e;f[g+"sBefore"]=e;f[g+"Ago"]=e;f[g+"sAgo"]=e;f[g+"After"]=d;f[g+"sAfter"]=d;f[g+"FromNow"]=d;f[g+"sFromNow"]=d;t.extend(f)}H(t,!0,!0,{duration:function(a){a=Y(a);return Xb(a,lc(this),"duration")}});
W=Ib=r.addLocale("en",{plural:!0,timeMarker:"at",ampm:"am,pm",months:"January,February,March,April,May,June,July,August,September,October,November,December",weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",units:"millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",numbers:"one,two,three,four,five,six,seven,eight,nine,ten",articles:"a,an,the",tokens:"the,st|nd|rd|th,of","short":"{Month} {d}, {yyyy}","long":"{Month} {d}, {yyyy} {h}:{mm}{tt}",full:"{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}",
past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",modifiers:[{name:"sign",src:"ago|before",value:-1},{name:"sign",src:"from now|after|from|in|later",value:1},{name:"edge",src:"last day",value:-2},{name:"edge",src:"end",value:-1},{name:"edge",src:"first day|beginning",value:1},{name:"shift",src:"last",value:-1},{name:"shift",src:"the|this",value:0},{name:"shift",src:"next",value:1}],dateParse:["{month} {year}","{shift} {unit=5-7}","{0?} {date}{1}","{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}"],
timeParse:"{num} {unit} {sign};{sign} {num} {unit};{0} {num}{1} {day} of {month} {year?};{weekday?} {month} {date}{1?} {year?};{date} {month} {year};{date} {month};{shift} {weekday};{shift} week {weekday};{weekday} {2?} {shift} week;{num} {unit=4-5} {sign} {day};{0?} {date}{1} of {month};{0?}{month?} {date?}{1?} of {shift} {unit=6-7}".split(";")});Ob=Rb.concat().reverse();Nb=Rb.concat();Nb.splice(2,1);
K(r,!0,!0,Rb,function(a,b,c){function d(a){a/=f;var c=a%1,d=b.error||0.999;c&&P(c%1)>d&&(a=R(a));return 0>a?Aa(a):Q(a)}var e=b.name,g=Yb(e),f=b.b(),h,l;b.j="add"+g+"s";h=function(a,b){return d(this.getTime()-r.create(a,b).getTime())};l=function(a,b){return d(r.create(a,b).getTime()-this.getTime())};a[e+"sAgo"]=l;a[e+"sUntil"]=l;a[e+"sSince"]=h;a[e+"sFromNow"]=h;a[b.j]=function(a,b){var c={};c[e]=a;return this.advance(c,b)};uc(b,f);3>c&&["Last","This","Next"].forEach(function(b){a["is"+b+g]=function(){return rc(this,
b+" "+e,"en")}});4>c&&(a["beginningOf"+g]=function(){var a={};switch(e){case "year":a.year=U(this,"FullYear");break;case "month":a.month=U(this,"Month");break;case "day":a.day=U(this,"Date");break;case "week":a.weekday=0}return this.set(a,!0)},a["endOf"+g]=function(){var a={hours:23,minutes:59,seconds:59,milliseconds:999};switch(e){case "year":a.month=11;a.day=31;break;case "month":a.day=this.daysInMonth();break;case "week":a.weekday=6}return this.set(a,!0)})});
W.addFormat("([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?",!0,["year_sign","year","month","date"],!1,!0);W.addFormat("(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?",!0,["date","month","year"],!0);W.addFormat("{full_month}[-.](\\d{4,4})",!1,["month","year"]);W.addFormat("\\/Date\\((\\d+(?:[+-]\\d{4,4})?)\\)\\/",!1,["timestamp"]);W.addFormat(Vb(W),!1,Jb);Pb=W.g.slice(0,7).reverse();W.g=W.g.slice(7).concat(Pb);oc("f",function(a){return U(a,"Milliseconds")},!0);
oc("s",function(a){return U(a,"Seconds")});oc("m",function(a){return U(a,"Minutes")});oc("h",function(a){return U(a,"Hours")%12||12});oc("H",function(a){return U(a,"Hours")});oc("d",function(a){return U(a,"Date")});oc("M",function(a){return U(a,"Month")+1});(function(){function a(a,c){var d=U(a,"Hours");return Y(c).ampm[Q(d/12)]||""}Z("t",a,1);Z("tt",a);Z("T",a,1,1);Z("TT",a,null,2)})();
(function(){function a(a,c){var d=U(a,"Day");return Y(c).weekdays[d]}Z("dow",a,3);Z("Dow",a,3,1);Z("weekday",a);Z("Weekday",a,null,1)})();nc("mon",0,3);nc("month",0);nc("month2",1);nc("month3",2);X.ms=X.f;X.milliseconds=X.f;X.seconds=X.s;X.minutes=X.m;X.hours=X.h;X["24hr"]=X.H;X["12hr"]=X.h;X.date=X.d;X.day=X.d;X.year=X.yyyy;K(r,!0,!0,"short,long,full",function(a,b){a[b]=function(a){return qc(this,b,!1,a)}});
"\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07".split("").forEach(function(a,b){9<b&&(b=za(10,b-9));Lb[a]=b});xa(Lb,Ka);Mb=q("([\u671f\u9031\u5468])?([\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07"+Ja+"]+)(?!\u6628)","g");
(function(){var a=W.weekdays.slice(0,7),b=W.months.slice(0,12);K(r,!0,!0,"today yesterday tomorrow weekday weekend future past".split(" ").concat(a).concat(b),function(a,b){a["is"+Yb(b)]=function(a){return this.is(b,0,a)}})})();r.utc||(r.utc={create:function(){return tc(arguments,0,!0)},past:function(){return tc(arguments,-1,!0)},future:function(){return tc(arguments,1,!0)}});
H(r,!1,!0,{RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}",RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}",ISO8601_DATE:"{yyyy}-{MM}-{dd}",ISO8601_DATETIME:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"});
Date.addLocale("da",{plural:!0,months:"januar,februar,marts,april,maj,juni,juli,august,september,oktober,november,december",weekdays:"s\u00f8ndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,l\u00f8rdag|lordag",units:"millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,m\u00e5ned:|er|en+maaned:|er|en,\u00e5r:||et+aar:||et",numbers:"en|et,to,tre,fire,fem,seks,syv,otte,ni,ti",tokens:"den,for",articles:"den","short":"d. {d}. {month} {yyyy}","long":"den {d}. {month} {yyyy} {H}:{mm}",full:"{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}",
past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",ampm:"am,pm",modifiers:[{name:"day",src:"forg\u00e5rs|i forg\u00e5rs|forgaars|i forgaars",value:-2},{name:"day",src:"i g\u00e5r|ig\u00e5r|i gaar|igaar",value:-1},{name:"day",src:"i dag|idag",value:0},{name:"day",src:"i morgen|imorgen",value:1},{name:"day",src:"over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen",value:2},{name:"sign",src:"siden",value:-1},{name:"sign",src:"om",value:1},{name:"shift",src:"i sidste|sidste",
value:-1},{name:"shift",src:"denne",value:0},{name:"shift",src:"n\u00e6ste|naeste",value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{1?} {num} {unit} {sign}","{shift} {unit=5-7}"],timeParse:["{0?} {weekday?} {date?} {month} {year}","{date} {month}","{shift} {weekday}"]});
Date.addLocale("de",{plural:!0,capitalizeUnit:!0,months:"Januar,Februar,M\u00e4rz|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember",weekdays:"Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag",units:"Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en",numbers:"ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn",tokens:"der","short":"{d}. {Month} {yyyy}","long":"{d}. {Month} {yyyy} {H}:{mm}",full:"{Weekday} {d}. {Month} {yyyy} {H}:{mm}:{ss}",
past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarker:"um",ampm:"am,pm",modifiers:[{name:"day",src:"vorgestern",value:-2},{name:"day",src:"gestern",value:-1},{name:"day",src:"heute",value:0},{name:"day",src:"morgen",value:1},{name:"day",src:"\u00fcbermorgen|ubermorgen|uebermorgen",value:2},{name:"sign",src:"vor:|her",value:-1},{name:"sign",src:"in",value:1},{name:"shift",src:"letzte:|r|n|s",value:-1},{name:"shift",src:"n\u00e4chste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r",
value:1}],dateParse:["{sign} {num} {unit}","{num} {unit} {sign}","{shift} {unit=5-7}"],timeParse:["{weekday?} {date?} {month} {year?}","{shift} {weekday}"]});
Date.addLocale("es",{plural:!0,months:"enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre",weekdays:"domingo,lunes,martes,mi\u00e9rcoles|miercoles,jueves,viernes,s\u00e1bado|sabado",units:"milisegundo:|s,segundo:|s,minuto:|s,hora:|s,d\u00eda|d\u00edas|dia|dias,semana:|s,mes:|es,a\u00f1o|a\u00f1os|ano|anos",numbers:"uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez",tokens:"el,la,de","short":"{d} {month} {yyyy}","long":"{d} {month} {yyyy} {H}:{mm}",full:"{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}",
past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarker:"a las",ampm:"am,pm",modifiers:[{name:"day",src:"anteayer",value:-2},{name:"day",src:"ayer",value:-1},{name:"day",src:"hoy",value:0},{name:"day",src:"ma\u00f1ana|manana",value:1},{name:"sign",src:"hace",value:-1},{name:"sign",src:"dentro de",value:1},{name:"shift",src:"pasad:o|a",value:-1},{name:"shift",src:"pr\u00f3ximo|pr\u00f3xima|proximo|proxima",value:1}],dateParse:["{sign} {num} {unit}","{num} {unit} {sign}",
"{0?}{1?} {unit=5-7} {shift}","{0?}{1?} {shift} {unit=5-7}"],timeParse:["{shift} {weekday}","{weekday} {shift}","{date?} {2?} {month} {2?} {year?}"]});
Date.addLocale("fi",{plural:!0,timeMarker:"kello",ampm:",",months:"tammikuu,helmikuu,maaliskuu,huhtikuu,toukokuu,kes\u00e4kuu,hein\u00e4kuu,elokuu,syyskuu,lokakuu,marraskuu,joulukuu",weekdays:"sunnuntai,maanantai,tiistai,keskiviikko,torstai,perjantai,lauantai",units:"millisekun:ti|tia|teja|tina|nin,sekun:ti|tia|teja|tina|nin,minuut:ti|tia|teja|tina|in,tun:ti|tia|teja|tina|nin,p\u00e4iv:\u00e4|\u00e4\u00e4|i\u00e4|\u00e4n\u00e4|\u00e4n,viik:ko|koa|koja|on|kona,kuukau:si|sia|tta|den|tena,vuo:si|sia|tta|den|tena",numbers:"yksi|ensimm\u00e4inen,kaksi|toinen,kolm:e|as,nelj\u00e4:s,vii:si|des,kuu:si|des,seitsem\u00e4:n|s,kahdeksa:n|s,yhdeks\u00e4:n|s,kymmene:n|s",
articles:"",optionals:"","short":"{d}. {month}ta {yyyy}","long":"{d}. {month}ta {yyyy} kello {H}.{mm}",full:"{Weekday}na {d}. {month}ta {yyyy} kello {H}.{mm}",relative:function(a,b,c,d){function e(c){return(1===a?"":a+" ")+g[8*c+b]}var g=this.units;switch(d){case "duration":return e(0);case "past":return e(1<a?1:0)+" sitten";case "future":return e(4)+" p\u00e4\u00e4st\u00e4"}},modifiers:[{name:"day",src:"toissa p\u00e4iv\u00e4n\u00e4|toissa p\u00e4iv\u00e4ist\u00e4",value:-2},{name:"day",src:"eilen|eilist\u00e4",
value:-1},{name:"day",src:"t\u00e4n\u00e4\u00e4n",value:0},{name:"day",src:"huomenna|huomista",value:1},{name:"day",src:"ylihuomenna|ylihuomista",value:2},{name:"sign",src:"sitten|aiemmin",value:-1},{name:"sign",src:"p\u00e4\u00e4st\u00e4|kuluttua|my\u00f6hemmin",value:1},{name:"edge",src:"viimeinen|viimeisen\u00e4",value:-2},{name:"edge",src:"lopussa",value:-1},{name:"edge",src:"ensimm\u00e4inen|ensimm\u00e4isen\u00e4",value:1},{name:"shift",src:"edellinen|edellisen\u00e4|edelt\u00e4v\u00e4|edelt\u00e4v\u00e4n\u00e4|viime|toissa",
value:-1},{name:"shift",src:"t\u00e4n\u00e4|t\u00e4m\u00e4n",value:0},{name:"shift",src:"seuraava|seuraavana|tuleva|tulevana|ensi",value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{num} {unit=4-5} {sign} {day}","{month} {year}","{shift} {unit=5-7}"],timeParse:"{0} {num}{1} {day} of {month} {year?};{weekday?} {month} {date}{1} {year?};{date} {month} {year};{shift} {weekday};{shift} week {weekday};{weekday} {2} {shift} week;{0} {date}{1} of {month};{0}{month?} {date?}{1} of {shift} {unit=6-7}".split(";")});
Date.addLocale("fr",{plural:!0,months:"janvier,f\u00e9vrier|fevrier,mars,avril,mai,juin,juillet,ao\u00fbt,septembre,octobre,novembre,d\u00e9cembre|decembre",weekdays:"dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi",units:"milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|n\u00e9e|nee",numbers:"un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix",tokens:"l'|la|le","short":"{d} {month} {yyyy}","long":"{d} {month} {yyyy} {H}:{mm}",full:"{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}",
past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarker:"\u00e0",ampm:"am,pm",modifiers:[{name:"day",src:"hier",value:-1},{name:"day",src:"aujourd'hui",value:0},{name:"day",src:"demain",value:1},{name:"sign",src:"il y a",value:-1},{name:"sign",src:"dans|d'ici",value:1},{name:"shift",src:"derni:\u00e8r|er|\u00e8re|ere",value:-1},{name:"shift",src:"prochain:|e",value:1}],dateParse:["{sign} {num} {unit}","{sign} {num} {unit}","{0?} {unit=5-7} {shift}"],timeParse:["{weekday?} {0?} {date?} {month} {year?}",
"{0?} {weekday} {shift}"]});
Date.addLocale("it",{plural:!0,months:"Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre",weekdays:"Domenica,Luned:\u00ec|i,Marted:\u00ec|i,Mercoled:\u00ec|i,Gioved:\u00ec|i,Venerd:\u00ec|i,Sabato",units:"millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i",numbers:"un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",tokens:"l'|la|il","short":"{d} {Month} {yyyy}","long":"{d} {Month} {yyyy} {H}:{mm}",full:"{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}",
past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",timeMarker:"alle",ampm:"am,pm",modifiers:[{name:"day",src:"ieri",value:-1},{name:"day",src:"oggi",value:0},{name:"day",src:"domani",value:1},{name:"day",src:"dopodomani",value:2},{name:"sign",src:"fa",value:-1},{name:"sign",src:"da adesso",value:1},{name:"shift",src:"scors:o|a",value:-1},{name:"shift",src:"prossim:o|a",value:1}],dateParse:["{num} {unit} {sign}","{0?} {unit=5-7} {shift}","{0?} {shift} {unit=5-7}"],timeParse:["{weekday?} {date?} {month} {year?}",
"{shift} {weekday}"]});
Date.addLocale("ja",{monthSuffix:"\u6708",weekdays:"\u65e5\u66dc\u65e5,\u6708\u66dc\u65e5,\u706b\u66dc\u65e5,\u6c34\u66dc\u65e5,\u6728\u66dc\u65e5,\u91d1\u66dc\u65e5,\u571f\u66dc\u65e5",units:"\u30df\u30ea\u79d2,\u79d2,\u5206,\u6642\u9593,\u65e5,\u9031\u9593|\u9031,\u30f6\u6708|\u30f5\u6708|\u6708,\u5e74","short":"{yyyy}\u5e74{M}\u6708{d}\u65e5","long":"{yyyy}\u5e74{M}\u6708{d}\u65e5 {H}\u6642{mm}\u5206",full:"{yyyy}\u5e74{M}\u6708{d}\u65e5 {Weekday} {H}\u6642{mm}\u5206{ss}\u79d2",past:"{num}{unit}{sign}",
future:"{num}{unit}{sign}",duration:"{num}{unit}",timeSuffixes:"\u6642,\u5206,\u79d2",ampm:"\u5348\u524d,\u5348\u5f8c",modifiers:[{name:"day",src:"\u4e00\u6628\u65e5",value:-2},{name:"day",src:"\u6628\u65e5",value:-1},{name:"day",src:"\u4eca\u65e5",value:0},{name:"day",src:"\u660e\u65e5",value:1},{name:"day",src:"\u660e\u5f8c\u65e5",value:2},{name:"sign",src:"\u524d",value:-1},{name:"sign",src:"\u5f8c",value:1},{name:"shift",src:"\u53bb|\u5148",value:-1},{name:"shift",src:"\u6765",value:1}],dateParse:["{num}{unit}{sign}"],
timeParse:["{shift}{unit=5-7}{weekday?}","{year}\u5e74{month?}\u6708?{date?}\u65e5?","{month}\u6708{date?}\u65e5?","{date}\u65e5"]});
Date.addLocale("ko",{digitDate:!0,monthSuffix:"\uc6d4",weekdays:"\uc77c\uc694\uc77c,\uc6d4\uc694\uc77c,\ud654\uc694\uc77c,\uc218\uc694\uc77c,\ubaa9\uc694\uc77c,\uae08\uc694\uc77c,\ud1a0\uc694\uc77c",units:"\ubc00\ub9ac\ucd08,\ucd08,\ubd84,\uc2dc\uac04,\uc77c,\uc8fc,\uac1c\uc6d4|\ub2ec,\ub144",numbers:"\uc77c|\ud55c,\uc774,\uc0bc,\uc0ac,\uc624,\uc721,\uce60,\ud314,\uad6c,\uc2ed","short":"{yyyy}\ub144{M}\uc6d4{d}\uc77c","long":"{yyyy}\ub144{M}\uc6d4{d}\uc77c {H}\uc2dc{mm}\ubd84",full:"{yyyy}\ub144{M}\uc6d4{d}\uc77c {Weekday} {H}\uc2dc{mm}\ubd84{ss}\ucd08",
past:"{num}{unit} {sign}",future:"{num}{unit} {sign}",duration:"{num}{unit}",timeSuffixes:"\uc2dc,\ubd84,\ucd08",ampm:"\uc624\uc804,\uc624\ud6c4",modifiers:[{name:"day",src:"\uadf8\uc800\uaed8",value:-2},{name:"day",src:"\uc5b4\uc81c",value:-1},{name:"day",src:"\uc624\ub298",value:0},{name:"day",src:"\ub0b4\uc77c",value:1},{name:"day",src:"\ubaa8\ub808",value:2},{name:"sign",src:"\uc804",value:-1},{name:"sign",src:"\ud6c4",value:1},{name:"shift",src:"\uc9c0\ub09c|\uc791",value:-1},{name:"shift",src:"\uc774\ubc88",
value:0},{name:"shift",src:"\ub2e4\uc74c|\ub0b4",value:1}],dateParse:["{num}{unit} {sign}","{shift?} {unit=5-7}"],timeParse:["{shift} {unit=5?} {weekday}","{year}\ub144{month?}\uc6d4?{date?}\uc77c?","{month}\uc6d4{date?}\uc77c?","{date}\uc77c"]});
Date.addLocale("nl",{plural:!0,months:"januari,februari,maart,april,mei,juni,juli,augustus,september,oktober,november,december",weekdays:"zondag|zo,maandag|ma,dinsdag|di,woensdag|woe|wo,donderdag|do,vrijdag|vrij|vr,zaterdag|za",units:"milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar",numbers:"een,twee,drie,vier,vijf,zes,zeven,acht,negen",tokens:"","short":"{d} {Month} {yyyy}","long":"{d} {Month} {yyyy} {H}:{mm}",full:"{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}",past:"{num} {unit} {sign}",
future:"{num} {unit} {sign}",duration:"{num} {unit}",timeMarker:"'s|om",modifiers:[{name:"day",src:"gisteren",value:-1},{name:"day",src:"vandaag",value:0},{name:"day",src:"morgen",value:1},{name:"day",src:"overmorgen",value:2},{name:"sign",src:"geleden",value:-1},{name:"sign",src:"vanaf nu",value:1},{name:"shift",src:"laatste|vorige|afgelopen",value:-1},{name:"shift",src:"volgend:|e",value:1}],dateParse:["{num} {unit} {sign}","{0?} {unit=5-7} {shift}","{0?} {shift} {unit=5-7}"],timeParse:["{weekday?} {date?} {month} {year?}",
"{shift} {weekday}"]});
Date.addLocale("pl",{plural:!0,months:"Stycze\u0144|Stycznia,Luty|Lutego,Marzec|Marca,Kwiecie\u0144|Kwietnia,Maj|Maja,Czerwiec|Czerwca,Lipiec|Lipca,Sierpie\u0144|Sierpnia,Wrzesie\u0144|Wrze\u015bnia,Pa\u017adziernik|Pa\u017adziernika,Listopad|Listopada,Grudzie\u0144|Grudnia",weekdays:"Niedziela|Niedziel\u0119,Poniedzia\u0142ek,Wtorek,\u015arod:a|\u0119,Czwartek,Pi\u0105tek,Sobota|Sobot\u0119",units:"milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzie\u0144|dni,tydzie\u0144|tygodnie|tygodni,miesi\u0105ce|miesi\u0105ce|miesi\u0119cy,rok|lata|lat",numbers:"jeden|jedn\u0105,dwa|dwie,trzy,cztery,pi\u0119\u0107,sze\u015b\u0107,siedem,osiem,dziewi\u0119\u0107,dziesi\u0119\u0107",
optionals:"w|we,roku","short":"{d} {Month} {yyyy}","long":"{d} {Month} {yyyy} {H}:{mm}",full:"{Weekday}, {d} {Month} {yyyy} {H}:{mm}:{ss}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarker:"o",ampm:"am,pm",modifiers:[{name:"day",src:"przedwczoraj",value:-2},{name:"day",src:"wczoraj",value:-1},{name:"day",src:"dzisiaj|dzi\u015b",value:0},{name:"day",src:"jutro",value:1},{name:"day",src:"pojutrze",value:2},{name:"sign",src:"temu|przed",value:-1},{name:"sign",
src:"za",value:1},{name:"shift",src:"zesz\u0142y|zesz\u0142a|ostatni|ostatnia",value:-1},{name:"shift",src:"nast\u0119pny|nast\u0119pna|nast\u0119pnego|przysz\u0142y|przysz\u0142a|przysz\u0142ego",value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{month} {year}","{shift} {unit=5-7}","{0} {shift?} {weekday}"],timeParse:["{date} {month} {year?} {1}","{0} {shift?} {weekday}"]});
Date.addLocale("pt",{plural:!0,months:"janeiro,fevereiro,mar\u00e7o,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro",weekdays:"domingo,segunda-feira,ter\u00e7a-feira,quarta-feira,quinta-feira,sexta-feira,s\u00e1bado|sabado",units:"milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,m\u00eas|m\u00eases|mes|meses,ano:|s",numbers:"um,dois,tr\u00eas|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas",tokens:"a,de","short":"{d} de {month} de {yyyy}","long":"{d} de {month} de {yyyy} {H}:{mm}",
full:"{Weekday}, {d} de {month} de {yyyy} {H}:{mm}:{ss}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarker:"\u00e0s",ampm:"am,pm",modifiers:[{name:"day",src:"anteontem",value:-2},{name:"day",src:"ontem",value:-1},{name:"day",src:"hoje",value:0},{name:"day",src:"amanh:\u00e3|a",value:1},{name:"sign",src:"atr\u00e1s|atras|h\u00e1|ha",value:-1},{name:"sign",src:"daqui a",value:1},{name:"shift",src:"passad:o|a",value:-1},{name:"shift",src:"pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{0?} {unit=5-7} {shift}","{0?} {shift} {unit=5-7}"],timeParse:["{date?} {1?} {month} {1?} {year?}","{0?} {shift} {weekday}"]});
Date.addLocale("ru",{months:"\u042f\u043d\u0432\u0430\u0440:\u044f|\u044c,\u0424\u0435\u0432\u0440\u0430\u043b:\u044f|\u044c,\u041c\u0430\u0440\u0442:\u0430|,\u0410\u043f\u0440\u0435\u043b:\u044f|\u044c,\u041c\u0430:\u044f|\u0439,\u0418\u044e\u043d:\u044f|\u044c,\u0418\u044e\u043b:\u044f|\u044c,\u0410\u0432\u0433\u0443\u0441\u0442:\u0430|,\u0421\u0435\u043d\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041e\u043a\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041d\u043e\u044f\u0431\u0440:\u044f|\u044c,\u0414\u0435\u043a\u0430\u0431\u0440:\u044f|\u044c",weekdays:"\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430",
units:"\u043c\u0438\u043b\u043b\u0438\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u043c\u0438\u043d\u0443\u0442:\u0430|\u0443|\u044b|,\u0447\u0430\u0441:||\u0430|\u043e\u0432,\u0434\u0435\u043d\u044c|\u0434\u0435\u043d\u044c|\u0434\u043d\u044f|\u0434\u043d\u0435\u0439,\u043d\u0435\u0434\u0435\u043b:\u044f|\u044e|\u0438|\u044c|\u0435,\u043c\u0435\u0441\u044f\u0446:||\u0430|\u0435\u0432|\u0435,\u0433\u043e\u0434|\u0433\u043e\u0434|\u0433\u043e\u0434\u0430|\u043b\u0435\u0442|\u0433\u043e\u0434\u0443",
numbers:"\u043e\u0434:\u0438\u043d|\u043d\u0443,\u0434\u0432:\u0430|\u0435,\u0442\u0440\u0438,\u0447\u0435\u0442\u044b\u0440\u0435,\u043f\u044f\u0442\u044c,\u0448\u0435\u0441\u0442\u044c,\u0441\u0435\u043c\u044c,\u0432\u043e\u0441\u0435\u043c\u044c,\u0434\u0435\u0432\u044f\u0442\u044c,\u0434\u0435\u0441\u044f\u0442\u044c",tokens:"\u0432|\u043d\u0430,\u0433\u043e\u0434\u0430","short":"{d} {month} {yyyy} \u0433\u043e\u0434\u0430","long":"{d} {month} {yyyy} \u0433\u043e\u0434\u0430 {H}:{mm}",full:"{Weekday} {d} {month} {yyyy} \u0433\u043e\u0434\u0430 {H}:{mm}:{ss}",
relative:function(a,b,c,d){c=a.toString().slice(-1);switch(!0){case 11<=a&&15>=a:c=3;break;case 1==c:c=1;break;case 2<=c&&4>=c:c=2;break;default:c=3}a=a+" "+this.units[8*c+b];switch(d){case "duration":return a;case "past":return a+" \u043d\u0430\u0437\u0430\u0434";case "future":return"\u0447\u0435\u0440\u0435\u0437 "+a}},timeMarker:"\u0432",ampm:" \u0443\u0442\u0440\u0430, \u0432\u0435\u0447\u0435\u0440\u0430",modifiers:[{name:"day",src:"\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430",value:-2},
{name:"day",src:"\u0432\u0447\u0435\u0440\u0430",value:-1},{name:"day",src:"\u0441\u0435\u0433\u043e\u0434\u043d\u044f",value:0},{name:"day",src:"\u0437\u0430\u0432\u0442\u0440\u0430",value:1},{name:"day",src:"\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430",value:2},{name:"sign",src:"\u043d\u0430\u0437\u0430\u0434",value:-1},{name:"sign",src:"\u0447\u0435\u0440\u0435\u0437",value:1},{name:"shift",src:"\u043f\u0440\u043e\u0448\u043b:\u044b\u0439|\u043e\u0439|\u043e\u043c",value:-1},
{name:"shift",src:"\u0441\u043b\u0435\u0434\u0443\u044e\u0449:\u0438\u0439|\u0435\u0439|\u0435\u043c",value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{month} {year}","{0?} {shift} {unit=5-7}"],timeParse:["{date} {month} {year?} {1?}","{0?} {shift} {weekday}"]});
Date.addLocale("sv",{plural:!0,months:"januari,februari,mars,april,maj,juni,juli,augusti,september,oktober,november,december",weekdays:"s\u00f6ndag|sondag,m\u00e5ndag:|en+mandag:|en,tisdag,onsdag,torsdag,fredag,l\u00f6rdag|lordag",units:"millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,m\u00e5nad:|er|en+manad:|er|en,\u00e5r:||et+ar:||et",numbers:"en|ett,tv\u00e5|tva,tre,fyra,fem,sex,sju,\u00e5tta|atta,nio,tio",tokens:"den,f\u00f6r|for",articles:"den","short":"den {d} {month} {yyyy}",
"long":"den {d} {month} {yyyy} {H}:{mm}",full:"{Weekday} den {d} {month} {yyyy} {H}:{mm}:{ss}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",ampm:"am,pm",modifiers:[{name:"day",src:"f\u00f6rrg\u00e5r|i f\u00f6rrg\u00e5r|if\u00f6rrg\u00e5r|forrgar|i forrgar|iforrgar",value:-2},{name:"day",src:"g\u00e5r|i g\u00e5r|ig\u00e5r|gar|i gar|igar",value:-1},{name:"day",src:"dag|i dag|idag",value:0},{name:"day",src:"morgon|i morgon|imorgon",value:1},{name:"day",src:"\u00f6ver morgon|\u00f6vermorgon|i \u00f6ver morgon|i \u00f6vermorgon|i\u00f6vermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon",
value:2},{name:"sign",src:"sedan|sen",value:-1},{name:"sign",src:"om",value:1},{name:"shift",src:"i f\u00f6rra|f\u00f6rra|i forra|forra",value:-1},{name:"shift",src:"denna",value:0},{name:"shift",src:"n\u00e4sta|nasta",value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{1?} {num} {unit} {sign}","{shift} {unit=5-7}"],timeParse:["{0?} {weekday?} {date?} {month} {year}","{date} {month}","{shift} {weekday}"]});
Date.addLocale("zh-CN",{variant:!0,monthSuffix:"\u6708",weekdays:"\u661f\u671f\u65e5|\u5468\u65e5,\u661f\u671f\u4e00|\u5468\u4e00,\u661f\u671f\u4e8c|\u5468\u4e8c,\u661f\u671f\u4e09|\u5468\u4e09,\u661f\u671f\u56db|\u5468\u56db,\u661f\u671f\u4e94|\u5468\u4e94,\u661f\u671f\u516d|\u5468\u516d",units:"\u6beb\u79d2,\u79d2\u949f,\u5206\u949f,\u5c0f\u65f6,\u5929,\u4e2a\u661f\u671f|\u5468,\u4e2a\u6708,\u5e74",tokens:"\u65e5|\u53f7","short":"{yyyy}\u5e74{M}\u6708{d}\u65e5","long":"{yyyy}\u5e74{M}\u6708{d}\u65e5 {tt}{h}:{mm}",
full:"{yyyy}\u5e74{M}\u6708{d}\u65e5 {weekday} {tt}{h}:{mm}:{ss}",past:"{num}{unit}{sign}",future:"{num}{unit}{sign}",duration:"{num}{unit}",timeSuffixes:"\u70b9|\u65f6,\u5206\u949f?,\u79d2",ampm:"\u4e0a\u5348,\u4e0b\u5348",modifiers:[{name:"day",src:"\u524d\u5929",value:-2},{name:"day",src:"\u6628\u5929",value:-1},{name:"day",src:"\u4eca\u5929",value:0},{name:"day",src:"\u660e\u5929",value:1},{name:"day",src:"\u540e\u5929",value:2},{name:"sign",src:"\u524d",value:-1},{name:"sign",src:"\u540e",value:1},
{name:"shift",src:"\u4e0a|\u53bb",value:-1},{name:"shift",src:"\u8fd9",value:0},{name:"shift",src:"\u4e0b|\u660e",value:1}],dateParse:["{num}{unit}{sign}","{shift}{unit=5-7}"],timeParse:["{shift}{weekday}","{year}\u5e74{month?}\u6708?{date?}{0?}","{month}\u6708{date?}{0?}","{date}[\u65e5\u53f7]"]});
Date.addLocale("zh-TW",{monthSuffix:"\u6708",weekdays:"\u661f\u671f\u65e5|\u9031\u65e5,\u661f\u671f\u4e00|\u9031\u4e00,\u661f\u671f\u4e8c|\u9031\u4e8c,\u661f\u671f\u4e09|\u9031\u4e09,\u661f\u671f\u56db|\u9031\u56db,\u661f\u671f\u4e94|\u9031\u4e94,\u661f\u671f\u516d|\u9031\u516d",units:"\u6beb\u79d2,\u79d2\u9418,\u5206\u9418,\u5c0f\u6642,\u5929,\u500b\u661f\u671f|\u9031,\u500b\u6708,\u5e74",tokens:"\u65e5|\u865f","short":"{yyyy}\u5e74{M}\u6708{d}\u65e5","long":"{yyyy}\u5e74{M}\u6708{d}\u65e5 {tt}{h}:{mm}",
full:"{yyyy}\u5e74{M}\u6708{d}\u65e5 {Weekday} {tt}{h}:{mm}:{ss}",past:"{num}{unit}{sign}",future:"{num}{unit}{sign}",duration:"{num}{unit}",timeSuffixes:"\u9ede|\u6642,\u5206\u9418?,\u79d2",ampm:"\u4e0a\u5348,\u4e0b\u5348",modifiers:[{name:"day",src:"\u524d\u5929",value:-2},{name:"day",src:"\u6628\u5929",value:-1},{name:"day",src:"\u4eca\u5929",value:0},{name:"day",src:"\u660e\u5929",value:1},{name:"day",src:"\u5f8c\u5929",value:2},{name:"sign",src:"\u524d",value:-1},{name:"sign",src:"\u5f8c",value:1},
{name:"shift",src:"\u4e0a|\u53bb",value:-1},{name:"shift",src:"\u9019",value:0},{name:"shift",src:"\u4e0b|\u660e",value:1}],dateParse:["{num}{unit}{sign}","{shift}{unit=5-7}"],timeParse:["{shift}{weekday}","{year}\u5e74{month?}\u6708?{date?}{0?}","{month}\u6708{date?}{0?}","{date}[\u65e5\u865f]"]});
"use strict";function Ac(a,b,c,d,e){Infinity!==b&&(a.timers||(a.timers=[]),y(b)||(b=1),a.n=!1,a.timers.push(setTimeout(function(){a.n||c.apply(d,e||[])},b)))}
H(Function,!0,!0,{lazy:function(a,b,c){function d(){g.length<c-(f&&b?1:0)&&g.push([this,arguments]);f||(f=!0,b?h():Ac(d,l,h));return x}var e=this,g=[],f=!1,h,l,n,x;a=a||1;c=c||Infinity;l=Aa(a);n=R(l/a)||1;h=function(){var a=g.length,b;if(0!=a){for(b=S(a-n,0);a>b;)x=Function.prototype.apply.apply(e,g.shift()),a--;Ac(d,l,function(){f=!1;h()})}};return d},throttle:function(a){return this.lazy(a,!0,1)},debounce:function(a){function b(){b.cancel();Ac(b,a,c,this,arguments)}var c=this;return b},delay:function(a){var b=
L(arguments,null,1);Ac(this,a,this,this,b);return this},every:function(a){function b(){c.apply(c,d);Ac(c,a,b)}var c=this,d=arguments,d=1<d.length?L(d,null,1):[];Ac(c,a,b);return c},cancel:function(){var a=this.timers,b;if(A(a))for(;b=a.shift();)clearTimeout(b);this.n=!0;return this},after:function(a){var b=this,c=0,d=[];if(!y(a))a=1;else if(0===a)return b.call(),b;return function(){var e;d.push(L(arguments));c++;if(c==a)return e=b.call(this,d),c=0,d=[],e}},once:function(){return this.throttle(Infinity,
!0)},fill:function(){var a=this,b=L(arguments);return function(){var c=L(arguments);b.forEach(function(a,b){(null!=a||b>=c.length)&&c.splice(b,0,a)});return a.apply(this,c)}}});
"use strict";function Bc(a,b,c,d,e,g){var f=a.toFixed(20),h=f.search(/\./),f=f.search(/[1-9]/),h=h-f;0<h&&(h-=1);e=S(Ca(Q(h/3),!1===e?c.length:e),-d);d=c.charAt(e+d-1);-9>h&&(e=-3,b=P(h)-9,d=c.slice(0,1));c=g?za(2,10*e):za(10,3*e);return Da(a/c,b||0).format()+d.trim()}
H(t,!1,!0,{random:function(a,b){var c,d;1==arguments.length&&(b=a,a=0);c=Ca(a||0,N(b)?1:b);d=S(a||0,N(b)?1:b)+1;return Q(u.random()*(d-c)+c)}});
H(t,!0,!0,{log:function(a){return u.log(this)/(a?u.log(a):1)},abbr:function(a){return Bc(this,a,"kmbt",0,4)},metric:function(a,b){return Bc(this,a,"n\u03bcm kMGTPE",4,N(b)?1:b)},bytes:function(a,b){return Bc(this,a,"kMGTPE",0,N(b)?4:b,!0)+"B"},isInteger:function(){return 0==this%1},isOdd:function(){return!isNaN(this)&&!this.isMultipleOf(2)},isEven:function(){return this.isMultipleOf(2)},isMultipleOf:function(a){return 0===this%a},format:function(a,b,c){var d,e,g,f="";N(b)&&(b=",");N(c)&&(c=".");d=
(y(a)?Da(this,a||0).toFixed(S(a,0)):this.toString()).replace(/^-/,"").split(".");e=d[0];g=d[1];for(d=e.length;0<d;d-=3)d<e.length&&(f=b+f),f=e.slice(S(0,d-3),d)+f;g&&(f+=c+Na("0",(a||0)-g.length)+g);return(0>this?"-":"")+f},hex:function(a){return this.pad(a||1,!1,16)},times:function(a){if(a)for(var b=0;b<this;b++)a.call(this,b);return this.toNumber()},chr:function(){return s.fromCharCode(this)},pad:function(a,b,c){return T(this,a,b,c)},ordinalize:function(){var a=P(this),a=parseInt(a.toString().slice(-2));
return this+Pa(a)},toNumber:function(){return parseFloat(this,10)}});(function(){function a(a){return function(c){return c?Da(this,c,a):a(this)}}H(t,!0,!0,{ceil:a(Aa),round:a(R),floor:a(Q)});K(t,!0,!0,"abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt",function(a,c){a[c]=function(a,b){return u[c](this,a,b)}})})();
"use strict";var Cc=["isObject","isNaN"],Dc="keys values select reject each merge clone equal watch tap has toQueryString".split(" ");
function Ec(a,b,c,d){var e,g,f;(g=b.match(/^(.+?)(\[.*\])$/))?(f=g[1],b=g[2].replace(/^\[|\]$/g,"").split("]["),b.forEach(function(b){e=!b||b.match(/^\d+$/);!f&&A(a)&&(f=a.length);J(a,f)||(a[f]=e?[]:{});a=a[f];f=b}),!f&&e&&(f=a.length.toString()),Ec(a,f,c,d)):a[b]=d&&"true"===c?!0:d&&"false"===c?!1:c}function Fc(a,b){var c;return A(b)||G(b)&&b.toString===v?(c=[],I(b,function(b,e){a&&(b=a+"["+b+"]");c.push(Fc(b,e))}),c.join("&")):a?Gc(a)+"="+(C(b)?b.getTime():Gc(b)):""}
function Gc(a){return a||!1===a||0===a?encodeURIComponent(a).replace(/%20/g,"+"):""}function Hc(a,b,c){var d,e=a instanceof O?new O:{};I(a,function(a,f){d=!1;sa(b,function(b){(D(b)?b.test(a):G(b)?b[a]===f:a===s(b))&&(d=!0)},1);d===c&&(e[a]=f)});return e}H(m,!1,!0,{watch:function(a,b,c){if(ea){var d=a[b];m.defineProperty(a,b,{enumerable:!0,configurable:!0,get:function(){return d},set:function(e){d=c.call(a,b,d,e)}})}}});
H(m,!1,function(){return 1<arguments.length},{keys:function(a,b){var c=m.keys(a);c.forEach(function(c){b.call(a,c,a[c])});return c}});
H(m,!1,!0,{isObject:function(a){return va(a)},isNaN:function(a){return y(a)&&a.valueOf()!==a.valueOf()},equal:function(a,b){return Ua(a,b)},extended:function(a){return new O(a)},merge:function(a,b,c,d){var e,g,f,h,l,n,x;if(a&&"string"!==typeof b)for(e in b)if(J(b,e)&&a){h=b[e];l=a[e];n=M(l);g=G(h);f=G(l);x=n&&!1===d?l:h;n&&F(d)&&(x=d.call(b,e,l,h));if(c&&(g||f))if(C(h))x=new r(h.getTime());else if(D(h))x=new q(h.source,Qa(h));else{f||(a[e]=p.isArray(h)?[]:{});m.merge(a[e],h,c,d);continue}a[e]=x}return a},
values:function(a,b){var c=[];I(a,function(d,e){c.push(e);b&&b.call(a,e)});return c},clone:function(a,b){var c;if(!G(a))return a;c=v.call(a);if(C(a,c)&&a.clone)return a.clone();if(C(a,c)||D(a,c))return new a.constructor(a);if(a instanceof O)c=new O;else if(A(a,c))c=[];else if(va(a,c))c={};else throw new TypeError("Clone must be a basic data type.");return m.merge(c,a,b)},fromQueryString:function(a,b){var c=m.extended();a=a&&a.toString?a.toString():"";a.replace(/^.*?\?/,"").split("&").forEach(function(a){a=
a.split("=");2===a.length&&Ec(c,a[0],decodeURIComponent(a[1]),b)});return c},toQueryString:function(a,b){return Fc(b,a)},tap:function(a,b){var c=b;F(b)||(c=function(){if(b)a[b]()});c.call(a,a);return a},has:function(a,b){return J(a,b)},select:function(a){return Hc(a,arguments,!0)},reject:function(a){return Hc(a,arguments,!1)}});K(m,!1,!0,w,function(a,b){var c="is"+b;Cc.push(c);a[c]=ia[b]});
H(m,!1,function(){return 0===arguments.length},{extend:function(){var a=Cc.concat(Dc);"undefined"!==typeof Hb&&(a=a.concat(Hb));Ya(a,m)}});Ya(Dc,O);
"use strict";function Range(a,b){this.start=vc(a);this.end=vc(b)}function vc(a){return C(a)?new r(a.getTime()):null==a?a:C(a)?a.getTime():a.valueOf()}function wc(a){a=null==a?a:C(a)?a.getTime():a.valueOf();return!!a||0===a}
function xc(a,b){var c,d,e,g;if(y(b))return new r(a.getTime()+b);c=b[0];d=b[1];e=U(a,d);g=new r(a.getTime());Sa(g,d,e+c);return g}function yc(a,b){return s.fromCharCode(a.charCodeAt(0)+b)}function zc(a,b){return a+b}Range.prototype.toString=function(){return this.isValid()?this.start+".."+this.end:"Invalid Range"};
H(Range,!0,!0,{isValid:function(){return wc(this.start)&&wc(this.end)&&typeof this.start===typeof this.end},span:function(){return this.isValid()?P((z(this.end)?this.end.charCodeAt(0):this.end)-(z(this.start)?this.start.charCodeAt(0):this.start))+1:NaN},contains:function(a){return null==a?!1:a.start&&a.end?a.start>=this.start&&a.start<=this.end&&a.end>=this.start&&a.end<=this.end:a>=this.start&&a<=this.end},every:function(a,b){var c,d=this.start,e=this.end,g=e<d,f=d,h=0,l=[];F(a)&&(b=a,a=null);a=
a||1;y(d)?c=zc:z(d)?c=yc:C(d)&&(c=a,y(c)?a=c:(d=c.toLowerCase().match(/^(\d+)?\s?(\w+?)s?$/i),c=parseInt(d[1])||1,d=d[2].slice(0,1).toUpperCase()+d[2].slice(1),d.match(/hour|minute|second/i)?d+="s":"Year"===d?d="FullYear":"Day"===d&&(d="Date"),a=[c,d]),c=xc);for(g&&0<a&&(a*=-1);g?f>=e:f<=e;)l.push(f),b&&b(f,h),f=c(f,a),h++;return l},union:function(a){return new Range(this.start<a.start?this.start:a.start,this.end>a.end?this.end:a.end)},intersect:function(a){return a.start>this.end||a.end<this.start?
new Range(NaN,NaN):new Range(this.start>a.start?this.start:a.start,this.end<a.end?this.end:a.end)},clone:function(){return new Range(this.start,this.end)},clamp:function(a){var b=this.start,c=this.end,d=c<b?c:b,b=b>c?b:c;return vc(a<d?d:a>b?b:a)}});[t,s,r].forEach(function(a){H(a,!1,!0,{range:function(b,c){a.create&&(b=a.create(b),c=a.create(c));return new Range(b,c)}})});
H(t,!0,!0,{upto:function(a,b,c){return t.range(this,a).every(c,b)},clamp:function(a,b){return(new Range(a,b)).clamp(this)},cap:function(a){return this.clamp(void 0,a)}});H(t,!0,!0,{downto:t.prototype.upto});H(p,!1,function(a){return a instanceof Range},{create:function(a){return a.every()}});
"use strict";H(q,!1,!0,{escape:function(a){return Ra(a)}});H(q,!0,!0,{getFlags:function(){return Qa(this)},setFlags:function(a){return q(this.source,a)},addFlag:function(a){return this.setFlags(Qa(this,a))},removeFlag:function(a){return this.setFlags(Qa(this).replace(a,""))}});
"use strict";
function Ic(a){a=+a;if(0>a||Infinity===a)throw new RangeError("Invalid number");return a}function Jc(a,b){return Na(M(b)?b:" ",a)}function Kc(a,b,c,d,e){var g;if(a.length<=b)return a.toString();d=N(d)?"...":d;switch(c){case "left":return a=e?Lc(a,b,!0):a.slice(a.length-b),d+a;case "middle":return c=Aa(b/2),g=Q(b/2),b=e?Lc(a,c):a.slice(0,c),a=e?Lc(a,g,!0):a.slice(a.length-g),b+d+a;default:return b=e?Lc(a,b):a.slice(0,b),b+d}}
function Lc(a,b,c){if(c)return Lc(a.reverse(),b).reverse();c=q("(?=["+Ma()+"])");var d=0;return a.split(c).filter(function(a){d+=a.length;return d<=b}).join("")}function Mc(a,b,c){z(b)&&(b=a.indexOf(b),-1===b&&(b=c?a.length:0));return b}var Nc,Oc;H(s,!0,!1,{repeat:function(a){a=Ic(a);return Na(this,a)}});
H(s,!0,function(a){return D(a)||2<arguments.length},{startsWith:function(a){var b=arguments,c=b[1],b=b[2],d=this;c&&(d=d.slice(c));N(b)&&(b=!0);c=D(a)?a.source.replace("^",""):Ra(a);return q("^"+c,b?"":"i").test(d)},endsWith:function(a){var b=arguments,c=b[1],b=b[2],d=this;M(c)&&(d=d.slice(0,c));N(b)&&(b=!0);c=D(a)?a.source.replace("$",""):Ra(a);return q(c+"$",b?"":"i").test(d)}});
H(s,!0,!0,{escapeRegExp:function(){return Ra(this)},escapeURL:function(a){return a?encodeURIComponent(this):encodeURI(this)},unescapeURL:function(a){return a?decodeURI(this):decodeURIComponent(this)},escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/\//g,"&#x2f;")},unescapeHTML:function(){return this.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&#x2f;/g,
"/").replace(/&amp;/g,"&")},encodeBase64:function(){return Nc(unescape(encodeURIComponent(this)))},decodeBase64:function(){return decodeURIComponent(escape(Oc(this)))},each:function(a,b){var c,d,e;F(a)?(b=a,a=/[\s\S]/g):a?z(a)?a=q(Ra(a),"gi"):D(a)&&(a=q(a.source,Qa(a,"g"))):a=/[\s\S]/g;c=this.match(a)||[];if(b)for(d=0,e=c.length;d<e;d++)c[d]=b.call(this,c[d],d,c)||c[d];return c},shift:function(a){var b="";a=a||0;this.codes(function(c){b+=s.fromCharCode(c+a)});return b},codes:function(a){var b=[],
c,d;c=0;for(d=this.length;c<d;c++){var e=this.charCodeAt(c);b.push(e);a&&a.call(this,e,c)}return b},chars:function(a){return this.each(a)},words:function(a){return this.trim().each(/\S+/g,a)},lines:function(a){return this.trim().each(/^.*$/gm,a)},paragraphs:function(a){var b=this.trim().split(/[\r\n]{2,}/);return b=b.map(function(b){if(a)var d=a.call(b);return d?d:b})},isBlank:function(){return 0===this.trim().length},has:function(a){return-1!==this.search(D(a)?a:Ra(a))},add:function(a,b){b=N(b)?
this.length:b;return this.slice(0,b)+a+this.slice(b)},remove:function(a){return this.replace(a,"")},reverse:function(){return this.split("").reverse().join("")},compact:function(){return this.trim().replace(/([\r\n\s\u3000])+/g,function(a,b){return"\u3000"===b?b:" "})},at:function(){return Wa(this,arguments,!0)},from:function(a){return this.slice(Mc(this,a,!0))},to:function(a){N(a)&&(a=this.length);return this.slice(0,Mc(this,a))},dasherize:function(){return this.underscore().replace(/_/g,"-")},underscore:function(){return this.replace(/[-\s]+/g,
"_").replace(s.Inflector&&s.Inflector.acronymRegExp,function(a,b){return(0<b?"_":"")+a.toLowerCase()}).replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase()},camelize:function(a){return this.underscore().replace(/(^|_)([^_]+)/g,function(b,c,d,e){b=(b=s.Inflector)&&b.acronyms[d];b=z(b)?b:void 0;e=!1!==a||0<e;return b?e?b:b.toLowerCase():e?d.capitalize():d})},spacify:function(){return this.underscore().replace(/_/g," ")},stripTags:function(){var a=this;sa(0<arguments.length?
arguments:[""],function(b){a=a.replace(q("</?"+Ra(b)+"[^<>]*>","gi"),"")});return a},removeTags:function(){var a=this;sa(0<arguments.length?arguments:["\\S+"],function(b){b=q("<("+b+")[^<>]*(?:\\/>|>.*?<\\/\\1>)","gi");a=a.replace(b,"")});return a},truncate:function(a,b,c){return Kc(this,a,b,c)},truncateOnWord:function(a,b,c){return Kc(this,a,b,c,!0)},pad:function(a,b){var c,d;a=Ic(a);c=S(0,a-this.length)/2;d=Q(c);c=Aa(c);return Jc(d,b)+this+Jc(c,b)},padLeft:function(a,b){a=Ic(a);return Jc(S(0,a-
this.length),b)+this},padRight:function(a,b){a=Ic(a);return this+Jc(S(0,a-this.length),b)},first:function(a){N(a)&&(a=1);return this.substr(0,a)},last:function(a){N(a)&&(a=1);return this.substr(0>this.length-a?0:this.length-a)},toNumber:function(a){return Oa(this,a)},capitalize:function(a){var b;return this.toLowerCase().replace(a?/[^']/g:/^\S/,function(a){var d=a.toUpperCase(),e;e=b?a:d;b=d!==a;return e})},assign:function(){var a={};sa(arguments,function(b,c){G(b)?xa(a,b):a[c+1]=b});return this.replace(/\{([^{]+?)\}/g,
function(b,c){return J(a,c)?a[c]:b})}});H(s,!0,!0,{insert:s.prototype.add});
(function(a){if(ba.btoa)Nc=ba.btoa,Oc=ba.atob;else{var b=/[^A-Za-z0-9\+\/\=]/g;Nc=function(b){var d="",e,g,f,h,l,n,x=0;do e=b.charCodeAt(x++),g=b.charCodeAt(x++),f=b.charCodeAt(x++),h=e>>2,e=(e&3)<<4|g>>4,l=(g&15)<<2|f>>6,n=f&63,isNaN(g)?l=n=64:isNaN(f)&&(n=64),d=d+a.charAt(h)+a.charAt(e)+a.charAt(l)+a.charAt(n);while(x<b.length);return d};Oc=function(c){var d="",e,g,f,h,l,n=0;if(c.match(b))throw Error("String contains invalid base64 characters");c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");do e=a.indexOf(c.charAt(n++)),
g=a.indexOf(c.charAt(n++)),h=a.indexOf(c.charAt(n++)),l=a.indexOf(c.charAt(n++)),e=e<<2|g>>4,g=(g&15)<<4|h>>2,f=(h&3)<<6|l,d+=s.fromCharCode(e),64!=h&&(d+=s.fromCharCode(g)),64!=l&&(d+=s.fromCharCode(f));while(n<c.length);return d}}})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
"use strict";var Pc=[],Qc=[],Rc=[],Sc=[],Tc={},Uc,$;function Vc(a){var b=Rc;a=b.indexOf(a);-1<a&&b.splice(a,1)}
function Wc(a,b,c){z(b)&&Vc(b);Vc(c);a.unshift({l:b,p:c})}function Xc(a,b){return a==b||"all"==a||!a}function Yc(a){return Rc.some(function(b){return(new q("\\b"+b+"$","i")).test(a)})}function Zc(a,b){a=z(a)?a.toString():"";return a.isBlank()||Yc(a)?a:$c(a,b?Pc:Qc)}function $c(a,b){I(b,function(b,d){if(a.match(d.l))return a=a.replace(d.l,d.p),!1});return a}function ad(a){return a.replace(/^\W*[a-z]/,function(a){return a.toUpperCase()})}
$={acronym:function(a){Tc[a.toLowerCase()]=a;a=m.keys(Tc).map(function(a){return Tc[a]});$.acronymRegExp=q(a.join("|"),"g")},plural:function(a,b){Wc(Pc,a,b)},singular:function(a,b){Wc(Qc,a,b)},irregular:function(a,b){var c=a.first(),d=a.from(1),e=b.first(),g=b.from(1),f=e.toUpperCase(),h=e.toLowerCase(),l=c.toUpperCase(),n=c.toLowerCase();Vc(a);Vc(b);l==f?($.plural(new q("({1}){2}$".assign(c,d),"i"),"$1"+g),$.plural(new q("({1}){2}$".assign(e,g),"i"),"$1"+g),$.singular(new q("({1}){2}$".assign(e,
g),"i"),"$1"+d)):($.plural(new q("{1}{2}$".assign(l,d)),f+g),$.plural(new q("{1}{2}$".assign(n,d)),h+g),$.plural(new q("{1}{2}$".assign(f,g)),f+g),$.plural(new q("{1}{2}$".assign(h,g)),h+g),$.singular(new q("{1}{2}$".assign(f,g)),l+d),$.singular(new q("{1}{2}$".assign(h,g)),n+d))},uncountable:function(a){var b=p.isArray(a)?a:L(arguments);Rc=Rc.concat(b)},human:function(a,b){Sc.unshift({l:a,p:b})},clear:function(a){Xc(a,"singulars")&&(Qc=[]);Xc(a,"plurals")&&(Pc=[]);Xc(a,"uncountables")&&(Rc=[]);Xc(a,
"humans")&&(Sc=[]);Xc(a,"acronyms")&&(Tc={})}};Uc="and or nor a an the so but to of at by from into on onto off out in over with for".split(" ");$.plural(/$/,"s");$.plural(/s$/gi,"s");$.plural(/(ax|test)is$/gi,"$1es");$.plural(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi,"$1i");$.plural(/(census|alias|status)$/gi,"$1es");$.plural(/(bu)s$/gi,"$1ses");$.plural(/(buffal|tomat)o$/gi,"$1oes");$.plural(/([ti])um$/gi,"$1a");$.plural(/([ti])a$/gi,"$1a");$.plural(/sis$/gi,"ses");$.plural(/f+e?$/gi,"ves");
$.plural(/(cuff|roof)$/gi,"$1s");$.plural(/([ht]ive)$/gi,"$1s");$.plural(/([^aeiouy]o)$/gi,"$1es");$.plural(/([^aeiouy]|qu)y$/gi,"$1ies");$.plural(/(x|ch|ss|sh)$/gi,"$1es");$.plural(/(matr|vert|ind)(?:ix|ex)$/gi,"$1ices");$.plural(/([ml])ouse$/gi,"$1ice");$.plural(/([ml])ice$/gi,"$1ice");$.plural(/^(ox)$/gi,"$1en");$.plural(/^(oxen)$/gi,"$1");$.plural(/(quiz)$/gi,"$1zes");$.plural(/(phot|cant|hom|zer|pian|portic|pr|quart|kimon)o$/gi,"$1os");$.plural(/(craft)$/gi,"$1");
$.plural(/([ft])[eo]{2}(th?)$/gi,"$1ee$2");$.singular(/s$/gi,"");$.singular(/([pst][aiu]s)$/gi,"$1");$.singular(/([aeiouy])ss$/gi,"$1ss");$.singular(/(n)ews$/gi,"$1ews");$.singular(/([ti])a$/gi,"$1um");$.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi,"$1$2sis");$.singular(/(^analy)ses$/gi,"$1sis");$.singular(/(i)(f|ves)$/i,"$1fe");$.singular(/([aeolr]f?)(f|ves)$/i,"$1f");$.singular(/([ht]ive)s$/gi,"$1");$.singular(/([^aeiouy]|qu)ies$/gi,"$1y");
$.singular(/(s)eries$/gi,"$1eries");$.singular(/(m)ovies$/gi,"$1ovie");$.singular(/(x|ch|ss|sh)es$/gi,"$1");$.singular(/([ml])(ous|ic)e$/gi,"$1ouse");$.singular(/(bus)(es)?$/gi,"$1");$.singular(/(o)es$/gi,"$1");$.singular(/(shoe)s?$/gi,"$1");$.singular(/(cris|ax|test)[ie]s$/gi,"$1is");$.singular(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi,"$1us");$.singular(/(census|alias|status)(es)?$/gi,"$1");$.singular(/^(ox)(en)?/gi,"$1");$.singular(/(vert|ind)(ex|ices)$/gi,"$1ex");
$.singular(/(matr)(ix|ices)$/gi,"$1ix");$.singular(/(quiz)(zes)?$/gi,"$1");$.singular(/(database)s?$/gi,"$1");$.singular(/ee(th?)$/gi,"oo$1");$.irregular("person","people");$.irregular("man","men");$.irregular("child","children");$.irregular("sex","sexes");$.irregular("move","moves");$.irregular("save","saves");$.irregular("cow","kine");$.irregular("goose","geese");$.irregular("zombie","zombies");$.uncountable("equipment information rice money species series fish sheep jeans".split(" "));
H(s,!0,!0,{pluralize:function(){return Zc(this,!0)},singularize:function(){return Zc(this,!1)},humanize:function(){var a=$c(this,Sc),b,a=a.replace(/_id$/g,""),a=a.replace(/(_)?([a-z\d]*)/gi,function(a,d,e){b=J(Tc,e)?Tc[e]:null;return(d?" ":"")+(b||e.toLowerCase())});return ad(a)},titleize:function(){var a=/[.:;!]$/,b,c,d;return this.spacify().humanize().words(function(e,g,f){b=a.test(e);d=0==g||g==f.length-1||b||c;c=b;return d||-1===Uc.indexOf(e)?ad(e):e}).join(" ")},parameterize:function(a){var b=
this;void 0===a&&(a="-");b.normalize&&(b=b.normalize());b=b.replace(/[^a-z0-9\-_]+/gi,a);a&&(b=b.replace(new q("^{sep}+|{sep}+$|({sep}){sep}+".assign({sep:Ra(a)}),"g"),"$1"));return encodeURI(b.toLowerCase())}});s.Inflector=$;s.Inflector.acronyms=Tc;
"use strict";
var bd=65248,cd=[{type:"a",start:65,end:90},{type:"a",start:97,end:122},{type:"n",start:48,end:57},{type:"p",start:33,end:47},{type:"p",start:58,end:64},{type:"p",start:91,end:96},{type:"p",start:123,end:126}],dd,ed=/[\u0020-\u00A5]|[\uFF61-\uFF9F][\uff9e\uff9f]?/g,fd=/[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g,gd="\uff61\uff64\uff62\uff63\u00a5\u00a2\u00a3",hd="\u3002\u3001\u300c\u300d\uffe5\uffe0\uffe1",id=/[\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30cf\u30d2\u30d5\u30d8\u30db]/,
jd=/[\u30cf\u30d2\u30d5\u30d8\u30db\u30f2]/,kd="\uff71\uff72\uff73\uff74\uff75\uff67\uff68\uff69\uff6a\uff6b\uff76\uff77\uff78\uff79\uff7a\uff7b\uff7c\uff7d\uff7e\uff7f\uff80\uff81\uff82\uff6f\uff83\uff84\uff85\uff86\uff87\uff88\uff89\uff8a\uff8b\uff8c\uff8d\uff8e\uff8f\uff90\uff91\uff92\uff93\uff94\uff6c\uff95\uff6d\uff96\uff6e\uff97\uff98\uff99\uff9a\uff9b\uff9c\uff66\uff9d\uff70\uff65",ld="\u30a2\u30a4\u30a6\u30a8\u30aa\u30a1\u30a3\u30a5\u30a7\u30a9\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c3\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e3\u30e6\u30e5\u30e8\u30e7\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30fc\u30fb";
function md(a,b,c,d){dd||nd();var e=L(b).join(""),g=dd[d],e=e.replace(/all/,"").replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g,"$1");return a.replace(c,function(a){return!g[a]||e&&!e.has(g[a].type)?a:g[a].to})}
function nd(){var a;dd={zenkaku:{},hankaku:{}};cd.forEach(function(a){wa(a.end-a.start+1,function(c){c+=a.start;od(a.type,s.fromCharCode(c),s.fromCharCode(c+bd))})});ld.each(function(b,c){a=kd.charAt(c);od("k",a,b);b.match(id)&&od("k",a+"\uff9e",b.shift(1));b.match(jd)&&od("k",a+"\uff9f",b.shift(2))});hd.each(function(a,c){od("p",gd.charAt(c),a)});od("k","\uff73\uff9e","\u30f4");od("k","\uff66\uff9e","\u30fa");od("s"," ","\u3000")}
function od(a,b,c){dd.zenkaku[b]={type:a,to:c};dd.hankaku[c]={type:a,to:b}}H(s,!0,!0,{hankaku:function(){return md(this,arguments,fd,"hankaku")},zenkaku:function(){return md(this,arguments,ed,"zenkaku")},hiragana:function(a){var b=this;!1!==a&&(b=b.zenkaku("k"));return b.replace(/[\u30A1-\u30F6]/g,function(a){return a.shift(-96)})},katakana:function(){return this.replace(/[\u3041-\u3096]/g,function(a){return a.shift(96)})}});
[{a:["Arabic"],source:"\u0600-\u06ff"},{a:["Cyrillic"],source:"\u0400-\u04ff"},{a:["Devanagari"],source:"\u0900-\u097f"},{a:["Greek"],source:"\u0370-\u03ff"},{a:["Hangul"],source:"\uac00-\ud7af\u1100-\u11ff"},{a:["Han","Kanji"],source:"\u4e00-\u9fff\uf900-\ufaff"},{a:["Hebrew"],source:"\u0590-\u05ff"},{a:["Hiragana"],source:"\u3040-\u309f\u30fb-\u30fc"},{a:["Kana"],source:"\u3040-\u30ff\uff61-\uff9f"},{a:["Katakana"],source:"\u30a0-\u30ff\uff61-\uff9f"},{a:["Latin"],source:"\u0001-\u007f\u0080-\u00ff\u0100-\u017f\u0180-\u024f"},
{a:["Thai"],source:"\u0e00-\u0e7f"}].forEach(function(a){var b=q("^["+a.source+"\\s]+$"),c=q("["+a.source+"]");a.a.forEach(function(a){oa(s.prototype,"is"+a,function(){return b.test(this.trim())});oa(s.prototype,"has"+a,function(){return c.test(this)})})});})();
/********************** END - plugins.js **************************/;//stats.js
function DataBinder( container, object_id ) {
  // Use a jQuery object as simple PubSub
	  var pubSub = $('<b/>');

	  // We expect a `data` element specifying the binding
	  // in the form: data-bind-<object_id>="<property_name>"
	  var data_attr = "bind-" + object_id,
	      message = object_id + ":change";
	  
	  // Listen to change events on elements with the data-binding attribute and proxy
	  // them to the PubSub, so that the change is "broadcasted" to all connected objects
	  $( document ).on( "change", "[data-" + data_attr + "]", function( evt ) {
	    var $input = jQuery( this );
	    pubSub.trigger( message, [ $input.data( data_attr ), $input.val() ] );
	  });

	  // PubSub propagates changes to all bound elements, setting value of
	  // input tags or HTML content of other tags
	  pubSub.on( message, function( evt, prop_name, new_val ) {
	    $( "#" + 'stats-main' + " [data-" + data_attr + "=" + prop_name + "]" ).each( function() {
	      var $bound = jQuery( this );
	      if ( $bound.is("input, textarea, select") ) {
	        $bound.val( new_val );
	      } else {
	        $bound.html( new_val );
	      }
	    });
	  });
	  return pubSub;
}
var GameModel = {
	attr: {},
	container: 'game-desc',
	_binder: new DataBinder('game-desc', 'game'),
	binder: this._binder,
	_init: function(){
		this.sub();
	},
	set: function(attr_name, val){
		//only set and or trigger if the value is different
		if(this.attr[ attr_name ] != val){
			this.attr[ attr_name ] = val;
        	this._binder.trigger( "game:change", [ attr_name, val, this ] );
        }
	},
	get: function( attr_name ) {
    	
    	return this.attr[ attr_name ];
    },
    sub: function(attr_name){
    	this._binder.on( "game:change", function( evt, attr_name, new_val, initiator ) {
		    if ( initiator !== GameModel ) {
		      GameModel.set( attr_name, new_val );
		    }
		});
    }
}	
var ScoreModel = {
	attr: {},
	_binder: new DataBinder('gamescore', 'score'),
	binder: this._binder,
	_init: function(){
		this.sub();
	},
	set: function(attr_name, val){
		if(this.attr[ attr_name ] != val){
			this.attr[ attr_name ] = val;
        	this._binder.trigger( "score:change", [ attr_name, this.display(), this ] );
    	}
	},
	get: function( attr_name ) {
    	return this.attributes[ attr_name ];
    },
    total: function(){},
    sub: function(){
    	this._binder.on("score:change", function( evt, attr_name, new_val, initiator ) {
		    if ( initiator !== ScoreModel ) {
		      ScoreModel.set( attr_name, new_val );
		    }
		  });
    },
    display: function(){
    	var html = '',
    		header = '',
    		t = this.attr.scores,
    		scores = [0,0],
    		tbl = $('#score tbody');
    	//create html for table head(period if football, innings if baseball?)
    	//calculate total
    	var s_len = t.home.linescores.length;
    	tbl.html('<tr class="periods"><td></td></tr>');
    	tbl.append('<tr class="away"><td>'+t.away.location + ' '+ t.away.name+'</td></tr>');
    	tbl.append('<tr class="home"><td>'+t.home.location + ' '+ t.home.name+'</td></tr>');
    	if(t.home.linescores.length > 1){
	    	for (var i = 0; i < s_len ; i++) {
	    		//if football/OT after 4 periods
	    		var per = t.home.linescores[i].period || t.home.linescores[i].inning;
	    		tbl.find('.periods').append('<td>'+ per + '</td>');
				tbl.find('.away').append('<td>'+t.away.linescores[i].score+'</td>');
				tbl.find('.home').append('<td>'+t.home.linescores[i].score+'</td>');
	    	};
	    }
    	tbl.find('.periods').append('<td>Total</td>');
    	tbl.find('.away').append('<td>'+t.away.score+'</td>');
    	tbl.find('.home').append('<td>'+t.home.score+'</td>');
    	
    	$('#gamescore > .table-head').html(header);
    	return html;
    }
}
var StatsModel = {
	attr: {},
	_init: function(){
		//this.sub();
	},
	set: function(attr_name){
		if(Object.size(attr_name) > 0){
			var keys = Object.keys(attr_name);
			for (var i = keys.length - 1; i >= 0; i--) {
				if(!Object.equal(this.attr[ keys[i] ], attr_name[keys[i]])){
					this.attr[ keys[i] ] = attr_name[keys[i]];
		        	//this._binder.trigger( "game:change", [ attr_name, val, this ] );
		        	//this.display();
		        }
			};
		}
        this.display();
	},
	get: function( attr_name ) {
    	return this.attr[ attr_name ];
    },
    total: function(){},
    sub: function(){
    	
    },
    display: function(){
    	var html = '',
    		home = $('#team-stats'),
    		away = $('#team-stats2'),
    		phome = $('#player-stats1'),
    		paway = $('#player-stats2'),
    		state = 'closed',
    		team_states  = home.clone(),
    		phome_states = phome.clone(),
    		paway_states = paway.clone();//need a clone that does not have their html removed :(

    	var keys = Object.keys(this.attr.homeTeamStats);
		for (var i = keys.length - 1; i >= 0; i--) {
			state = (team_states.find('.stat-title.'+keys[i]).hasClass('row-open'))? 'open' : 'closed';
			if(keys[i] === keys.length-1){
				home.find('tbody').html('');
			}
			if(this.attr.homeTeamStats[keys[i]] !== 0){
				if(Object.isObject(this.attr.homeTeamStats[keys[i]])){
					home.find('tbody').append('<tr class="stat-title row-'+state+ ' ' +keys[i]+'"><td colspan="3">'+ keys[i].titleize() + '</td></tr>');
					home.find('tbody').append('<tr class="'+keys[i]+'-names '+ state +'"><td></td><td>'+ GameModel.get('home-team-short') + '</td><td>'+ GameModel.get('away-team-short') + '</td></tr>');
					for(var sub_prop in this.attr.homeTeamStats[keys[i]]){
						if(this.attr.homeTeamStats[keys[i]][sub_prop] !== null)						
							home.find('tbody').append('<tr class="'+keys[i]+'-'+sub_prop+' '+state+ ' "><td class="sub-prop"><div>' + sub_prop.titleize().remove(/(Is\s)/g) + '</div></td><td><div>' + this.attr.homeTeamStats[keys[i]][sub_prop].toString().replace(/false/g, "No").replace(/true/g, "Yes") + '</div></td>');
					}
				}else if(Object.isArray(this.attr.homeTeamStats[keys[i]])){
					for (var i = this.attr.homeTeamStats[keys[i]].length - 1; i >= 0; i--) {
						//console.log('STAAAAAAAAAATS', this.attr.homeTeamStats[prop][i]);
					};
				}else if(this.attr.homeTeamStats[prop]!== null) {
					home.find('tbody').append('<tr class="'+keys[i]+' '+state+'"><td colspan="1">'+ keys[i].titleize().remove(/(Is\s)/g) + '</td><td>'+ this.attr.homeTeamStats[keys[i]].toString().replace(/false/g, "No").replace(/true/g, "Yes") +'</td></tr>');
				}
			}			
    	};
    	for (var prop in this.attr.awayTeamStats) {
			if(home.find('tbody .' + prop ).length > 0)
				for(var sub_prop in this.attr.awayTeamStats[prop]){
					if(home.find('tbody .'+prop+'-'+sub_prop).length > 0 && this.attr.awayTeamStats[prop][sub_prop] !== null)
						home.find('tbody .'+prop+'-'+sub_prop).append('<td><div>' + this.attr.awayTeamStats[prop][sub_prop].toString().replace(/false/g, "No").replace(/true/g, "Yes") + '</div></td>');
				}
    		
    	};
    	keys = Object.keys(this.attr.homePlayerStats);
    	for (i = keys.length - 1; i >= 0; i--) {
    		state = (phome_states.find('.stat-title.'+keys[i]+'-control').hasClass('row-open'))? 'open' : 'closed';
			if(keys[i] === keys.length-1) 
    			phome.find('tbody').html('');
    		if(this.attr.homePlayerStats[keys[i]].length > 0){
	    		phome.find('tbody').append('<tr class="'+keys[i]+'-control row-'+state+' stat-title"><td colspan="3">' + keys[i].titleize() + '</td></tr>');
	    		for(var sub_prop in this.attr.homePlayerStats[keys[i]]){
					var player = (this.attr.homePlayerStats[keys[i]][sub_prop].player)? this.attr.homePlayerStats[keys[i]][sub_prop].player : '';				
					if(keys[i] === 'inactives'){
						phome.find('tbody').append('<tr class="stat-player-name player-'+player.playerId+' '+keys[i]+' '+state+'"><td colspan="3">'+ player.firstName + ' '+ player.lastName +'</td>');
					}
					else{
						phome.find('tbody').append('<tr class="stat-player-name player-'+player.playerId+' '+keys[i]+' '+state+'"><td colspan="2">'+ player.firstName + ' '+ player.lastName +'</td>');
					}
					for(var sub_sub_prop in this.attr.homePlayerStats[keys[i]][sub_prop]){
						if(sub_sub_prop != 'player' && !Object.isArray(this.attr.homePlayerStats[keys[i]][sub_prop][sub_sub_prop])){
							phome.find('tbody .stat-player-name.player-'+ player.playerId+'.'+keys[i]).append('<p class="table"><span class="sub-sub-prop cell">'
								+ sub_sub_prop.titleize().remove(/(Is\s)/g) + '</span><span class="cell">'+ this.attr.homePlayerStats[keys[i]][sub_prop][sub_sub_prop].toString().replace(/false/g, "No").replace(/true/g, "Yes").replace(/null/g, "n/a") +'</span></p>');
						}
						
					}
					phome.find('tbody .stat-player-name.player-'+ player.playerId+'.'+keys[i]).append('</tr>').find('td').wrapInner('<div/>');
	    		}
	    	}
    	}
    	keys = Object.keys(this.attr.awayPlayerStats);
    	for (var j = keys.length - 1; j >= 0; j--) {
    		state = (paway_states.find('.stat-title.'+keys[j]+'-control').hasClass('row-open'))? 'open' : 'closed';
			if(keys[j] === keys.length-1) 
    			paway.find('tbody').html('');
    		if(this.attr.awayPlayerStats[keys[j]].length > 0){
	    		paway.find('tbody').append('<tr class="'+keys[j]+'-control row-'+state+' stat-title"><td colspan="3">' + keys[j].titleize() + '</td></tr>');
	    		for(var sub_prop in this.attr.awayPlayerStats[keys[j]]){
					var player = (this.attr.awayPlayerStats[keys[j]][sub_prop].player)? this.attr.awayPlayerStats[keys[j]][sub_prop].player : '';
					if(keys[j] === 'inactives')
						paway.find('tbody').append('<tr class="stat-player-name player-'+player.playerId+' '+keys[j]+' '+state+'"><td colspan="3">'+ player.firstName + ' '+ player.lastName +'</td>');
					else
						paway.find('tbody').append('<tr class="stat-player-name player-'+player.playerId+' '+keys[j]+' '+state+'"><td colspan="2">'+ player.firstName + ' '+ player.lastName +'</td>');

					for(var sub_sub_prop in this.attr.awayPlayerStats[keys[j]][sub_prop]){
						if(sub_sub_prop != 'player' && !Object.isArray(this.attr.awayPlayerStats[keys[j]][sub_prop][sub_sub_prop])){
							paway.find('tbody .stat-player-name.player-'+ player.playerId+'.'+keys[j]).append('<p class="table"><span class="sub-sub-prop cell">'
								+ sub_sub_prop.titleize().remove(/(Is\s)/g) + '</span><span class="cell">'+ this.attr.awayPlayerStats[keys[j]][sub_prop][sub_sub_prop].toString().replace(/false/g, "No").replace(/true/g, "Yes").replace(/null/g, "n/a") +'</span></p>');
						}
					}
					paway.find('tbody .stat-player-name.player-'+ player.playerId+'.'+keys[j]).append('</tr>').find('td').wrapInner('<div/>');;
	    		}
	    	}
    	}
    	
    }
};
var BasketStatsModel ={
	attr: {},
	_init: function(){
		//this.sub();
	},
	set: function(attr_name){
		if(Object.size(attr_name) > 0){
			var keys = Object.keys(attr_name);
			for (var i = keys.length - 1; i >= 0; i--) {
				if(!Object.equal(this.attr[ keys[i] ], attr_name[keys[i]])){
					this.attr[ keys[i] ] = attr_name[keys[i]];
		        	//this._binder.trigger( "game:change", [ attr_name, val, this ] );
		        	//this.display();
		        }
			};
		}
        this.display();
	},
	get: function( attr_name ) {
    	return this.attr[ attr_name ];
    },
    total: function(){},
    sub: function(){
    	
    },
    dict: {
    	'minutesPlayed' : 'MIN',
    	'steals' : 'STL',
    	'turnovers' : 'TO',
    	'blockedShots' : 'BLK',
    	'assists' : 'A',
    	'points' : 'PTS',
    	'personalFouls' : 'PF',
    	'fieldGoals': 'FGM/FGA',
    	'freeThrows': 'FTM/FTA',
    	'rebounds': 'REB',
    	'threePointFieldGoals': '3PM/3PA',
    },
    display: function(){
    	
    	var html = '',
    		home = $('#team-stats'),
    		phome = $('#player-stats1'),
    		paway = $('#player-stats2'),
    		state = 'closed';
    		team_states  = home.clone(),
    		phome_states = phome.clone(),
    		paway_states = paway.clone();//need a clone that does not have their html removed :(


    	//remove unneeded stats
    	
    	var keys = Object.keys(this.attr.homeTeamStats);
		for (var i = keys.length - 1; i >= 0; i--) {
			state = (team_states.find('.stat-title.'+keys[i]).hasClass('row-open'))? 'open' : 'closed';
			if(i === keys.length - 1) 
				home.find('tbody').html('');
			if(this.attr.homeTeamStats[keys[i]] !== 0){
				if(keys[i] === 'freeThrows' || keys[i] === 'threePointFieldGoals' || keys[i] === 'fieldGoals' ){
					goalStat = this.attr.homeTeamStats[keys[i]];
					goalStat = [Object.select(goalStat, 'percentage'), Object.select(goalStat, 'made'), Object.select(goalStat, 'attempted')];
				}else if(keys[i] === 'rebounds'){
					rebStat = this.attr.homeTeamStats[keys[i]];
					rebStat = [Object.select(rebStat, 'offensive'), Object.select(rebStat, 'defensive'), Object.select(rebStat, 'total')];
				}else if(keys[i] === 'turnovers'){
					this.attr.homeTeamStats[keys[i]] = Object.select(this.attr.homeTeamStats[keys[i]], 'total');
					this.attr.awayTeamStats[keys[i]] = Object.select(this.attr.awayTeamStats[keys[i]], 'total');
				}
				if(Object.isObject(this.attr.homeTeamStats[keys[i]]) && Object.size(this.attr.homeTeamStats[keys[i]]) > 0 && keys[i] !== 'ejections' && keys[i] !== 'technicalFouls'){
					home.find('tbody').append('<tr class="stat-title row-'+state+ ' ' +keys[i]+'"><td colspan="3">'+ keys[i].titleize() + '</td></tr>');
					home.find('tbody').append('<tr class="'+keys[i]+'-names '+ state +'"><td></td><td>'+ GameModel.get('home-team-short') + '</td><td>'+ GameModel.get('away-team-short') + '</td></tr>');
					if(keys[i] === 'freeThrows' || keys[i] === 'threePointFieldGoals' || keys[i] === 'fieldGoals' ){
						//console.log(goalStat);
						for (var x = 0; x < goalStat.length; x++) {
							home.find('tbody').append('<tr class="'+keys[i]+'-'+Object.keys(goalStat[x])[0]+' '+state+'"><td class="sub-prop"><div>' + Object.keys(goalStat[x])[0].titleize() + '</div></td><td><div>' + goalStat[x][Object.keys(goalStat[x])[0]] + '</div></td>'); 
						};
					}else if(keys[i] === 'rebounds'){
						for (var x = 0; x < rebStat.length; x++) {
							home.find('tbody').append('<tr class="'+keys[i]+'-'+Object.keys(rebStat[x])[0]+' '+state+'"><td class="sub-prop"><div>' + Object.keys(rebStat[x])[0].titleize() + '</div></td><td><div>' + rebStat[x][Object.keys(rebStat[x])[0]] + '</div></td>'); 
						};
					}else{
						for(var sub_prop in this.attr.homeTeamStats[keys[i]]){
							if(this.attr.homeTeamStats[keys[i]][sub_prop] !== null)	
								home.find('tbody').append('<tr class="'+keys[i]+'-'+sub_prop+' '+state+'"><td class="sub-prop"><div>' + sub_prop.titleize() + '</div></td><td><div>' + this.attr.homeTeamStats[keys[i]][sub_prop] + '</div></td>');
						}
					}
				}else if(Object.isArray(this.attr.homeTeamStats[keys[i]])){
					for (var i = this.attr.homeTeamStats[keys[i]].length - 1; i >= 0; i--) {
						console.log(this.attr.homeTeamStats[keys[i]], '!!!!');
					};
				}else{
					home.find('tbody').append('<tr class="'+keys[i]+' '+state+'"><td colspan="1">'+ keys[i].titleize().remove(/(Is\s)/g) + '</td><td>'+ this.attr.homeTeamStats[keys[i]].toString().replace(/false/g, "No").replace(/true/g, "Yes") +'</td></tr>');
				}
			}
    	};
    	for (var prop in this.attr.awayTeamStats) {
			if(home.find('tbody .' + prop ).length > 0)
				for(var sub_prop in this.attr.awayTeamStats[prop]){
					if(home.find('tbody .'+prop+'-'+sub_prop).length > 0 && this.attr.awayTeamStats[prop][sub_prop] !== null)
						home.find('tbody .'+prop+'-'+sub_prop).append('<td><div>' + this.attr.awayTeamStats[prop][sub_prop].toString().replace(/false/g, "No").replace(/true/g, "Yes") + '</div></td>');
				}
    	};
    	var player = null;
		if(typeof this.attr.homePlayerStats !== 'undefined'){
			for (var i = this.attr.homePlayerStats.length - 1; i >= 0; i--) {
				var firstFlag = true,
					prop = ["personalFouls", "minutesPlayed", "turnovers", "blockedShots", 
					"steals", "freeThrows", "threePointFieldGoals", 
					"fieldGoals", "points", "assists", "rebounds"],
					player = Object.select(this.attr.homePlayerStats[i], 'player'),
					state  = phome_states.find('.player-'+player.player.playerId+'-control').hasClass('row-open')? 'open' : 'closed',
					statsTitlesString = [],
					statsString = [],
					mark = [],
					n = 0,
					l = 0
					f = 0;

				mark[l++] = '<tr class="stats-';
				mark[l++] = player.player.playerId;
				mark[l++] = ' player-'+player.player.playerId+'"><td>';
				mark[l++] = player.player.firstName[0] + '. '+ player.player.lastName+'</td></tr>';			

				for (var x = prop.length - 1; x >= 0; x--) {
					if( i === this.attr.homePlayerStats.length - 1){
						phome.find('tbody').html('');
					}
			    	if(!Object.isObject(this.attr.homePlayerStats[i][prop[x]]) && this.dict[prop[x]]){
						statsTitlesString[n++] = '<td>';
						statsTitlesString[n++] = this.dict[prop[x]];	 			   		
						statsTitlesString[n++] = '</td>';
						statsString[f++] = 	'<td>';
						statsString[f++] = 	this.attr.homePlayerStats[i][prop[x]];
						statsString[f++] = 	'</td>';   			 			   		
			    	}else if(this.dict[prop[x]]){
			    		statsTitlesString[n++] = '<td>';
						statsTitlesString[n++] = this.dict[prop[x]];   		
						statsTitlesString[n++] = '</td>';
						statsString[f++] = 	'<td>';
						statsString[f++] = 	(String(this.attr.homePlayerStats[i][prop[x]].made) === 'undefined')?  this.attr.homePlayerStats[i][prop[x]].total : this.attr.homePlayerStats[i][prop[x]].made;
						statsString[f++] = 	(String(this.attr.homePlayerStats[i][prop[x]].attempted)=== 'undefined')? '' : '/'
						statsString[f++] = 	(String(this.attr.homePlayerStats[i][prop[x]].attempted) === 'undefined')? '' : this.attr.homePlayerStats[i][prop[x]].attempted;
						statsString[f++] = 	'</td>';
			    	}
		    	}
		    	if(i === this.attr.homePlayerStats.length - 1)
		    		phome.find('tbody').append('<tr class="stat-titles"><td></td>'+statsTitlesString.join('')+'</tr>');	
		    	phome.find('tbody').append(mark.join(''));
		    	phome.find('tbody .player-'+ player.player.playerId).append(statsString.join(''));
			};
		}
    	player=null;
		if(typeof this.attr.awayPlayerStats !== 'undefined'){
			for (var i = this.attr.awayPlayerStats.length - 1; i >= 0; i--) {
				var firstFlag = true,
					player = Object.select(this.attr.awayPlayerStats[i], 'player'),
					state  = paway_states.find('.player-'+player.player.playerId+'-control').hasClass('row-open')? 'open' : 'closed',
					statsTitlesString = [],
					statsString = [],
					mark = [],
					n = 0,
					l = 0
					f = 0;

					mark[l++] = '<tr class="stats-';
					mark[l++] = player.player.playerId;
					mark[l++] = ' player-'+player.player.playerId+'"><td>';
					mark[l++] = player.player.firstName[0] + '. '+ player.player.lastName+'</td></tr>';

				for (var x = prop.length - 1; x >= 0; x--) {
					if( i === this.attr.awayPlayerStats.length - 1){
						paway.find('tbody').html('');
					}
			    	if(!Object.isObject(this.attr.awayPlayerStats[i][prop[x]]) && this.dict[prop[x]]){
						statsTitlesString[n++] = '<td>';
						statsTitlesString[n++] = this.dict[prop[x]];	 			   		
						statsTitlesString[n++] = '</td>';
						statsString[f++] = 	'<td>';
						statsString[f++] = 	this.attr.awayPlayerStats[i][prop[x]];
						statsString[f++] = 	'</td>';   			 			   		
			    	}else if(this.dict[prop[x]]){
			    		statsTitlesString[n++] = '<td>';
						statsTitlesString[n++] = this.dict[prop[x]];   		
						statsTitlesString[n++] = '</td>';
						statsString[f++] = 	'<td>';
						statsString[f++] = 	(String(this.attr.awayPlayerStats[i][prop[x]].made) === 'undefined')?  this.attr.awayPlayerStats[i][prop[x]].total : this.attr.awayPlayerStats[i][prop[x]].made;
						statsString[f++] = 	(String(this.attr.awayPlayerStats[i][prop[x]].attempted)=== 'undefined')? '' : '/'
						statsString[f++] = 	(String(this.attr.awayPlayerStats[i][prop[x]].attempted) === 'undefined')? '' : this.attr.awayPlayerStats[i][prop[x]].attempted;
						statsString[f++] = 	'</td>';
			    	}
		    	}
		    	if(i === this.attr.awayPlayerStats.length - 1)
		    		paway.find('tbody').append('<tr class="stat-titles"><td></td>'+statsTitlesString.join('')+'</tr>');	
		    	paway.find('tbody').append(mark.join(''));
		    	paway.find('tbody .player-'+ player.player.playerId).append(statsString.join(''));
			};
		}
	}

}
var HockeyStatsModel ={
	attr: {},
	_init: function(){
		//this.sub();
	},
	set: function(attr_name){
		if(Object.size(attr_name) > 0){
			var keys = Object.keys(attr_name);
			for (var i = keys.length - 1; i >= 0; i--) {
				if(!Object.equal(this.attr[ keys[i] ], attr_name[keys[i]])){
					this.attr[ keys[i] ] = attr_name[keys[i]];
		        	//this._binder.trigger( "game:change", [ attr_name, val, this ] );
		        	//this.display();
		        }
			};
		}
        this.display();
	},
	get: function( attr_name ) {
    	return this.attr[ attr_name ];
    },
    total: function(){},
    sub: function(){
    	
    },
    display: function(){
    	
    	var html = '',
    		home = $('#team-stats'),
    		phome = $('#player-stats1'),
    		paway = $('#player-stats2'),
    		state = 'closed';
    		team_states  = home.clone(),
    		phome_states = phome.clone(),
    		paway_states = paway.clone();//need a clone that does not have their html removed :(

    	var keys = Object.keys(this.attr.homeTeamStats);
		for (var i = keys.length - 1; i >= 0; i--) {
			state = (team_states.find('.stat-title.'+prop).hasClass('row-open'))? 'open' : 'closed';
			if(i === keys.length -1) 
				home.find('tbody').html('');
			if(this.attr.homeTeamStats[keys[i]] !== 0){
				home.find('tbody').append('<tr class="stat-title row-'+state+ ' ' +keys[i]+'"><td colspan="3">'+ keys[i].titleize() + '</td></tr>');
				home.find('tbody').append('<tr class="'+keys[i]+'-names '+ state +'"><td></td><td>'+ GameModel.get('home-team-short') + '</td><td>'+ GameModel.get('away-team-short') + '</td></tr>');
				if(!Object.isObject(this.attr.homeTeamStats[keys[i]])){
					
					home.find('tbody').append('<tr class="'+keys[i]+'-names '+ state +' single-row"><td></td><td>'+ this.attr.homeTeamStats[keys[i]] + '</td></tr>');
					if(!Object.isObject(this.attr.homeTeamStats[keys[i]])){
						
					}
				}else if(Object.isArray(this.attr.homeTeamStats[keys[i]])){
					// for (var i = this.attr.homeTeamStats[prop].length - 1; i >= 0; i--) {
						
					// };
				}else{
					var sub_prop = Object.keys(this.attr.homeTeamStats[keys[i]]);
					for (var x = sub_prop.length - 1; x >= 0; x--) {
						if(this.attr.homeTeamStats[keys[i]][sub_prop[x]] !== null)	
							home.find('tbody').append('<tr class="'+keys[i]+'-'+sub_prop[x]+' '+state+'"><td class="sub-prop"><div>' + sub_prop[x].titleize() + '</div></td><td><div>' + this.attr.homeTeamStats[keys[i]][sub_prop[x]] + '</div></td>');
					}						
				}
			}
			
    	};
    	var aprop = Object.keys(this.attr.awayTeamStats);
    	for (var n = aprop.length - 1; n >= 0; n--) {
    		if(home.find('tbody .' + aprop[n] ).length > 0)
				home.find('.'+aprop[n] + '-names.single-row').append('<td>'+this.attr.awayTeamStats[aprop[n]]+'</td>');
				if(Object.isObject(this.attr.awayTeamStats[aprop[n]])){
					var asub_prop = Object.keys(this.attr.awayTeamStats[aprop[n]]);
					for (var m = asub_prop.length - 1; m >= 0; m--) {
						if(home.find('tbody .'+aprop[n]+'-'+asub_prop[m]).length > 0 && this.attr.awayTeamStats[aprop[n]][asub_prop[m]] !== null)
							home.find('tbody .'+aprop[n]+'-'+sub_prop[m]).append('<td><div>' + this.attr.awayTeamStats[aprop[n]][asub_prop[m]].toString().replace(/false/g, "No").replace(/true/g, "Yes") + '</div></td>');
					};
				}
    	};
    	
    	if(typeof this.attr.homePlayerStats !== 'undefined'){
	    	for (var i = this.attr.homePlayerStats.playerGoaltenderStats.length - 1; i >= 0; i--) {
	    		if( i === this.attr.homePlayerStats.playerGoaltenderStats.length - 1){
					phome.find('tbody').html('');
				}
	    		var player = Object.select(this.attr.homePlayerStats.playerGoaltenderStats[i], 'player'),
					state  = phome_states.find('.player-'+player.player.playerId+'-control').hasClass('row-open')? 'open' : 'closed';
				phome.find('tbody').append('<tr class="player-'+player.player.playerId+'-control row-'+state+' stat-title"><td colspan="3">' + player.player.firstName + ' '+ player.player.lastName +'</td></tr>');
		    	for(var prop in this.attr.homePlayerStats.playerGoaltenderStats[i]){
			    	if(!Object.isObject(this.attr.homePlayerStats.playerGoaltenderStats[i][prop]))
			    		phome.find('tbody .player-'+ player.player.playerId+'-control').after('<tr class="player-'+player.player.playerId+' ' + state + '"><td class="prop"><div>'+prop.titleize().remove(/(Is\s)/g)+'</div></td><td><div>'+this.attr.homePlayerStats.playerGoaltenderStats[i][prop].toString().replace(/false/g, "No").replace(/true/g, "Yes").replace(/null/g, "n/a")+'</div></td></tr>');
		    	}
    		};
    		for (var x = this.attr.homePlayerStats.playerSkaterStats.length - 1; x >= 0; x--) {
	    		if( x === this.attr.homePlayerStats.playerSkaterStats.length - 1){
					phome.find('tbody').html('');
				}
	    		player = Object.select(this.attr.homePlayerStats.playerSkaterStats[x], 'player');
				state  = phome_states.find('.player-'+player.player.playerId+'-control').hasClass('row-open')? 'open' : 'closed';
				phome.find('tbody').append('<tr class="player-'+player.player.playerId+'-control row-'+state+' stat-title"><td colspan="3">' + player.player.firstName + ' '+ player.player.lastName +'</td></tr>');
		    	var skaterStatsKeys = Object.keys(this.attr.homePlayerStats.playerSkaterStats[x]);
		    	for (var p = skaterStatsKeys.length - 1; p >= 0; p--) {
			    	if(!Object.isObject(this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]]) && !Object.isArray(this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]]))
			    		phome.find('tbody .player-'+ player.player.playerId+'-control').after('<tr class="player-'+player.player.playerId+' ' + state + '"><td class="prop"><div>'+skaterStatsKeys[p].titleize().remove(/(Is\s)/g)+'</div></td><td><div>'+this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].toString().replace(/false/g, "No").replace(/true/g, "Yes").replace(/null/g, "n/a")+'</div></td></tr>');
			    	else if(Object.isObject(this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]])){
			    		if(typeof this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].minutes !== 'undefined'){
			    			//console.log(table);
			    			phome.find('tbody .player-'+ player.player.playerId+'-control')
			    				.after('<tr class="player-'+player.player.playerId+ ' ' + state + '"><td class="prop '+skaterStatsKeys[p]+'"><div>'+skaterStatsKeys[p].titleize().remove(/(Is\s)/g)+'</div></td><td class="'+skaterStatsKeys[p]+' stat"><ul class="table"></ul></td></tr>');
			    			phome.find('.player-'+ player.player.playerId + ' .stat.'+skaterStatsKeys[p] + ' .table')
			    				.append('<li>'+this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].minutes+':'+this.attr.homePlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].seconds+'</li>');
			    		}
			    	}else if(Object.isArray(this.attr.homePlayerStats.playerSkaterStats[x][prop])){ }
		    	}
    		};
    	}
    	if(typeof this.attr.awayPlayerStats !== 'undefined'){
			for (var i = this.attr.awayPlayerStats.playerGoaltenderStats.length - 1; i >= 0; i--) {
				if( i === this.attr.awayPlayerStats.playerGoaltenderStats.length - 1){
					paway.find('tbody').html('');
				}
				var player = Object.select(this.attr.awayPlayerStats.playerGoaltenderStats[i], 'player'),
					state  = paway_states.find('.player-'+player.player.playerId+'-control').hasClass('row-open')? 'open' : 'closed';
				paway.find('tbody').append('<tr class="player-'+player.player.playerId+'-control row-'+state+' stat-title"><td colspan="3">' + player.player.firstName + ' '+ player.player.lastName +'</td></tr>');
		    	for(var prop in this.attr.awayPlayerStats.playerGoaltenderStats[i]){
			    	if(!Object.isObject(this.attr.awayPlayerStats.playerGoaltenderStats[i][prop]))
			    		paway.find('tbody .player-'+ player.player.playerId+'-control').after('<tr class="player-'+player.player.playerId+' ' + state + '"><td class="prop"><div>'+prop.titleize().remove(/(Is\s)/g)+'</div></td><td><div>'+this.attr.awayPlayerStats.playerGoaltenderStats[i][prop].toString().replace(/false/g, "No").replace(/true/g, "Yes").replace(/null/g, "n/a")+'</div></td></tr>');
		    	}
			};
			for (var x = this.attr.awayPlayerStats.playerSkaterStats.length - 1; x >= 0; x--) {
				if( x === this.attr.awayPlayerStats.playerSkaterStats.length - 1){
					paway.find('tbody').html('');
				}
				player = Object.select(this.attr.awayPlayerStats.playerSkaterStats[x], 'player');
				state  = paway_states.find('.player-'+player.player.playerId+'-control').hasClass('row-open')? 'open' : 'closed';
				paway.find('tbody').append('<tr class="player-'+player.player.playerId+'-control row-'+state+' stat-title"><td colspan="3">' + player.player.firstName + ' '+ player.player.lastName +'</td></tr>');
		    	var skaterStatsKeys = Object.keys(this.attr.awayPlayerStats.playerSkaterStats[x]);
		    	for (var p = skaterStatsKeys.length - 1; p >= 0; p--) {
			    	if(!Object.isObject(this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]]) && !Object.isArray(this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]]))
			    		paway.find('tbody .player-'+ player.player.playerId+'-control').after('<tr class="player-'+player.player.playerId+' ' + state + '"><td class="prop"><div>'+skaterStatsKeys[p].titleize().remove(/(Is\s)/g)+'</div></td><td><div>'+this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].toString().replace(/false/g, "No").replace(/true/g, "Yes").replace(/null/g, "n/a")+'</div></td></tr>');
			    	else if(Object.isObject(this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]])){
			    		if(typeof this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].minutes !== 'undefined'){
			    			//console.log(table);
			    			paway.find('tbody .player-'+ player.player.playerId+'-control')
			    				.after('<tr class="player-'+player.player.playerId+ ' ' + state + '"><td class="prop '+skaterStatsKeys[p]+'"><div>'+skaterStatsKeys[p].titleize().remove(/(Is\s)/g)+'</div></td><td class="'+skaterStatsKeys[p]+' stat"><ul class="table"></ul></td></tr>');
			    			paway.find('.player-'+ player.player.playerId + ' .stat.'+skaterStatsKeys[p] + ' .table')
			    				.append('<li>'+this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].minutes+':'+this.attr.awayPlayerStats.playerSkaterStats[x][skaterStatsKeys[p]].seconds+'</li>');
			    		}
			    	}else if(Object.isArray(this.attr.awayPlayerStats.playerSkaterStats[x][prop])){ }
		    	}
			};
		}
    }

}
var GameUpdateModel ={
	attr: {},
	_binder: new DataBinder('game-update-messages', 'updates'),
	binder: this._binder,
	_init: function(){
		this.sub();
	},
	set: function(attr_name, val){
		
		// var sort = { periods: [], scores: [] };

		// for (var i = val.length-1; i >= 0;i--) {
		// 	for (var x=0; x < val[i].scores.length; x++) {
		// 		sort.periods.push(val[i].period);
		// 		sort.scores.push(val[i].scores[x]);
		// 	};
		// };
		if(this.attr[ attr_name ] != val){
			this.attr[ attr_name ] = val;
        	this._binder.trigger( "updates:change", [ attr_name, '-', this ] );
        	this.display();
        }
        

	},
	get: function( attr_name ) {
    	return this.attributes[ attr_name ];
    },
    total: function(){},
    sub: function(){
    	this._binder.on("updates:change", function( evt, attr_name, new_val, initiator ) {
		    if ( initiator !== GameUpdateModel ) {
		      GameUpdateModel.set( attr_name, new_val );
		    }
		 });
    },
    display: function(){
    	var html = '',
    		summary = this.attr['summary-updates'],
    		tbl = $('#game-update'),
    		markup = [],
    		n=0;

    	tbl.find('tbody').html('');
    	summary.map(function(periods) {
			for (var i = 0; i < periods.scores.length; i++) {
				markup[n++] = '<tr><td>'+GameModel.get(periods.scores[i].teamId.toString())+'</td>';
				markup[n++] = '<td>'+ (periods.period).ordinalize() +' Quarter</td><td>'+periods.scores[i].time.minutes+':'+periods.scores[i].time.seconds.pad(2)+'</td>';
				markup[n++] = '<td class="summary-text"> '+periods.scores[i].summaryText + '</td></tr>';
			};
		});
    	tbl.find('tbody').append(markup.join(''));
    	$('#game-update ul').html(html);
    }	
}
var Stats = {
	_live: false,
	_final: true,
	_env: ((_l = window.location.host.split('.')[0].split('-')).length > 1)? '-'+_l[1] : '',
	_init: function(){
		var mainContainer  = $('#stats-article-scoreboard');
		if (mainContainer.length > 0) {
			var self 	= this,
				test 	= Object.fromQueryString(window.location),
				league  = test.l || mainContainer.data('league'),
				gid 	= test.gid ||  mainContainer.data('game-id');
			mainContainer.html(this.markup());
			window.setInterval(function(){ if(!self._final) self.getData(league, gid); }, 15000);
			self.getData(league, gid);
			GameModel._init();
			ScoreModel._init();
			GameUpdateModel._init();
			StatsModel._init();
			this.ui();
			mainContainer.trigger('stats:init-done');
			//build loader
			//first pull of info
		}
	},
	setScore: function(teams){
		ScoreModel.set('scores', teams);
	},

	setGame: function(game, details, teams){
		var date = Date.create(game.date).format('{Dow} {Mon} {d}');
		GameModel.set('date', date.toString());
		GameModel.set('status', game.status);
		if(details.attendance){
			GameModel.set('attendance', details.attendance);
			$('.game-attendance').show();
			$('.game-period').hide();
		}else{
			$('.game-attendance').hide();
			$('.game-period').show();
			GameModel.set('period', game.period);
			GameModel.set('time', game.time);
		}
		GameModel.set('home-team', teams.home.location + ' ' + teams.home.name);
		GameModel.set('away-team', teams.away.location + ' ' + teams.away.name);
		GameModel.set('home-team-short', teams.home.short_name.toUpperCase());
		GameModel.set('away-team-short', teams.away.short_name.toUpperCase());
		GameModel.set(teams.home.id.toString(), teams.home.short_name.toUpperCase());
		GameModel.set(teams.away.id.toString(), teams.away.short_name.toUpperCase());
	},
	setGameUpdate: function(summaries){
		GameUpdateModel.set('summary-updates', summaries);
	},

	setStats: function(home, away, statModel) { // assuming this is always the patten.
		// check team id
		statModel.set({
			'homeTeamStats': home.teamStats,
			'awayTeamStats': away.teamStats,
			'homePlayerStats': home.playerStats || home.playerstats || home,
			'awayPlayerStats': away.playerStats || away.playerstats || away
		});
	},
	setData: function(data){
		//Called by JSONP callback
		var self = this;
		if(self._env === '-uat' || self._env === '-dev')
			console.log(data);
		if(data.scoreboard.status === "In-Progress" ){
			self._live = true;
			self._final = false;
			$('#game-desc').find('.game-attendance, span[data-bind-game="attendance"]').hide();
			$('#game-desc').find('span[data-bind-game="period"], span[data-bind-game="time"]').show();
		}else if(data.scoreboard.status === "Final" ){
			self._live = false;
			self._final = true;
			$('#game-desc').find('span[data-bind-game="period"], span[data-bind-game="time"], .game-period').hide();
			$('#game-desc').find('.game-attendance').show().attr('style', '');
			$('#game-desc').find('span[data-bind-game="attendance"]').show().attr('style', '');
		}
		//console.log(data);
		self.setGame(data.scoreboard, data.boxscore.gameDetail || {game: 'N/A', attendance: 'N/A'}, data.scoreboard.teams);
		self.setScore(data.scoreboard.teams);
		if(data.scoreboard.status !== "Pre-Game"){
			$('#stats-main .main-views-control > li[class!="no-game"]').show();
			$('#stats-main .main-views-control > .no-game').hide();
			if(self.league==='mlb'){ 
				// console.log('Baseball') 
			}else if((self.league==='nfl'|| self.league==='cfb')  && Object.has(data.boxscore, 'scoringSummaries')){
				$('.periods td').each(function(index, value){
					if(parseInt($(value).text()) > 4)
						$(value).text('OT');
				});
				if(self._live){
					self.setGameUpdate(data.boxscore.scoringSummaries.reverse());
				}
				else{
					self.setGameUpdate(data.boxscore.scoringSummaries);
				}
				self.setStats(data.boxscore.boxscores[0], data.boxscore.boxscores[1], StatsModel);
			}else if(self.league==='nba' || self.league ==="cbk"){
				if(self.league === "cbk"){
					$('span.game-period').text('Half: ');
				}
				$('.periods td').each(function(index, value){
					if(self.league === "cbk" && parseInt($(value).text()) > 2)
						$(value).text('OT');
					if(self.league === "nba" && parseInt($(value).text()) > 4)
						$(value).text('OT');
				});
				$('.scoring-summary-control').remove();
				//$('.stats-control').click();
				$('.team-controls').hide();
				if(typeof data.boxscore.boxscores !== 'undefined')
					self.setStats(data.boxscore.boxscores[0], data.boxscore.boxscores[1], BasketStatsModel);
			}else if(self.league==='nhl'){
				$('.scoring-summary-control').remove();
				//$('.stats-control').click();
				$('.team-controls').hide();
				if(typeof data.boxscore.boxscores !== 'undefined')
					self.setStats(data.boxscore.boxscores[0], data.boxscore.boxscores[1], HockeyStatsModel);
			}
		}else if(data.scoreboard.status === "Pre-Game"){
			self._final = false;
			$('#stats-main .main-views-control > li[class!="no-game"]').hide();
			$('#stats-main .main-views-control > .no-game').show();
		}
		self.responsify();
		$('.stats-loader').addClass('hidden');
		$('#stats-main').fadeIn(function(){
			$(this).removeClass('hidden').attr('style', '');
		});
		$('#stats-article-scoreboard').trigger('stats:loaded');
	},
	getData: function(league, gameId){
		var self = this;
			self.league = league;		
		$.ajax({
			url: 'http://scoreboard'+self._env+'.advance.net/'+league+'/boxscore/?gid='+ gameId,
			dataType: 'JSONP',
			//jsonp:false,
			jsonpCallback: encodeURIComponent('Stats["setData"]'),
			cache: true,
			complete: function(jqXHR, textStatus){
				if(jqXHR.status !== 200){
					console.log(x,y,z);
					$('#stats-article-scoreboard').html('<p>Could not fetch feed at this time</p>');
					$('img.stats-loader').hide();
				}
			},
		});
	},
	ui: function(){
		var self = this;
		
		$('#stats-main a').on('click', function(e){
			
		});
		$('#stats-main #team-stats').delegate('.stat-title','click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var name = $(this).attr('class')
						.remove('stat-title')
						.remove('row-closed')
						.remove('row-open').trim(),
				el = $('tr[class^="'+name+'"]');
			if(el.hasClass('closed')){
				$(this).removeClass('row-closed').addClass('row-open');
				el.removeClass('closed').addClass('open');
			}else{
				$(this).removeClass('row-open').addClass('row-closed');
				el.removeClass('open').addClass('closed');
			}
			 
		});
		$('.scoring-summary-control, .stats-control').on('click', function(e){
			e.preventDefault();
			//I don't like patching this file but it needs to be done so we can release:
			/////////////////////////////////////////////////////FIXTHIS////////////////////////////////////////////////////////////
			if(	$('#stats-article-scoreboard').data('league') === 'cbk' 
				|| $('#stats-article-scoreboard').data('league') === 'nba'
				|| $('#stats-article-scoreboard').data('league') === 'nhl'){
				if($(this).hasClass('active') && $(this).hasClass('stats-control')){
					$('.team-controls').addClass('hidden');
					$(this).removeClass('active');
				}else{
					$('#stats-main .main-views-control .active').removeClass('active');
					$(this).toggleClass('active');
				}
			}else{
				$('#stats-main .main-views-control .active').removeClass('active');
				$(this).toggleClass('active');
			}
			$('#game-update, #team-stats, #player-stats1, #player-stats2').fadeOut(function(){
				$(this).addClass('hidden').attr('style', '');	
			});
			if($(this).hasClass('stats-control') && $(this).hasClass('active')){
				$('.team-controls').fadeIn(function(){
					$(this).removeClass('hidden');
					$('#team-stats').removeClass('hidden');
					$('.team-controls .active').removeClass('active');
					$('.team-stats-control').parent().addClass('active');
				}).attr('style', '');
				
			}else{
				$('.team-controls').fadeOut(function(){
						$(this).addClass('hidden');
				}).attr('style', '');
				$('#game-update').fadeIn(function(){
					$(this).removeClass('hidden');
				}).attr('style', '');
				
				
			}
		});
		$('.team-controls li').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$('.team-controls .active').removeClass('active');
			$(this).addClass('active');
			$('#player-stats1, #team-stats, #player-stats2').addClass('hidden');
			if($(this).find('a').hasClass('team-stats-control')){
				$('#team-stats').removeClass('hidden');
			}else if($(this).find('a').hasClass('home-stats-control')){
				$('#player-stats1').removeClass('hidden');
			}else if($(this).find('a').hasClass('away-stats-control')){
				$('#player-stats2').removeClass('hidden');
			}
		});
		
		$('#player-stats1, #player-stats2').delegate('tr[class*="-control"]', 'click', function(){
			var name = $(this).attr('class').remove('-control').remove('row-open').remove('row-closed').remove('stat-title').trim(),
				el = $(this).parent().find('tr.'+name);
			if(el.hasClass('closed')){
				$(this).removeClass('row-closed').addClass('row-open');
				el.removeClass('closed').addClass('open');
			}else{
				$(this).removeClass('row-open').addClass('row-closed');
				el.removeClass('open').addClass('closed');
			}
		});

		//check resize to abbreviate teams
		$(window).resize(function(){
			self.responsify();
		}.throttle(1000));
	},

	responsify: function(){
		if(window.innerWidth <= 767){
			$('#score .away td').first().html(GameModel.get('away-team-short'));
			$('#score .home td').first().html(GameModel.get('home-team-short'));
			$('#score .periods td').last().text('TTL');
			GameModel.set('home-team', GameModel.get('home-team-short'));
			GameModel.set('away-team', GameModel.get('away-team-short'));
		}
	},
	markup: function(){
		return '<img class="stats-loader" src="/static/common/img/loading-150.gif" style="width:150px;left: 35%;position:relative;"><div id="stats-main" class="hidden"> <ul class="score-header table"> <li class="cell">Game Summary</li></ul> <table id="score"> <tbody> <tr> <td></td></tr></tbody> </table> <div id="game-desc"> <span data-bind-game="date"></span> <span> Status:</span> <span data-bind-game="status"></span> <span class="game-period"> Quarter: </span> <span data-bind-game="period"></span><span data-bind-game="time"></span> <span class="game-attendance"> Attendance: </span> <span data-bind-game="attendance"></span> </div><ul class="main-views-control table"> <li class="cell active scoring-summary-control"> <a href="#">Scoring Summary</a> </li><li class="cell stats-control"> <a href="#">Stats</a> </li><li class="cell no-game active"> <span>Game is not live yet.</span> </li></ul> </ul> <table id="game-update" class=""> <tbody> <tr> <td></td></tr></tbody> </table> <ul class="team-controls hidden"> <li class="active"><a class="team-stats-control" href="#">Team Stats</a> </li><li class=""> <a class="home-stats-control" href="#" data-bind-game="home-team"></a> </li><li class=""> <a class="away-stats-control" href="#" data-bind-game="away-team"></a> </li></ul> <div class="team-stats-outer"><table id="team-stats" class="hidden"> <tbody> <tr> <td></td></tr></tbody> </table></div><div class="player-stats1-outer"> <table id="player-stats1" class="hidden"> <tbody> <tr> <td></td></tr></tbody> </table></div> <div class="player-stats2-outer"><table id="player-stats2" class="hidden">  <tbody> <tr> <td></td></tr></tbody> </table></div></div>';
	}

}
$(document).ready(function(){
	Stats._init();
});;/**
 * adv_region.js
 *
 * Regional data for affiliates the utilize regional settings and cookies.
 * Copyright 2012 Advance Digital
 *
 * Requires jquery and plugins.js for cookie getting and setting.
 *
 * Only hash, default_region, weather_app, and cookie_domain should be edited with
 * region specific data. Functions should not!
 *
 * Including this file checks and sets region cookies and makes available the data
 * stored in the hash for other javascript functions.
 */

//------------------------------------------------------------------------------------
// ARCS namespace - Advance Region Cookies and Settings
//------------------------------------------------------------------------------------
(function($) {
	ARCS = {
		current: null,
		template: (typeof arcs_page_template == "string")?arcs_page_template:null,
		config: [],
		custom_vars: [],
		logo_suffix: (typeof arcs_logo_suffix == "string")?arcs_logo_suffix:'.png',
		subdomain: (function(){
				var hn = window.location.hostname.split('.');
				return hn.length >= 3 ? hn[0]:'';
			})(),
		env: (function(){
				var hn = window.location.hostname.split('.');
				var sub_d = hn.length >= 3 ? hn[0]:'';
				var sub_di = sub_d.indexOf('-');
				if (sub_d!='' && sub_di>0 && (sub_d.match("-dev") || sub_d.match("-uat") || sub_d.match("-stage"))) {
					return sub_d.substr(sub_di);
				} else {
					return '';
				}
			})(),
		device: (function(){
				if(document.documentElement.clientWidth < 600){
					return "phone";
				}else if(document.documentElement.clientWidth >= 600 && document.documentElement.clientWidth < 950){
					return "tablet";
				}else{
					return "desktop";
				}
			})(),
		loc_stor : (('localStorage' in window) && window['localStorage'] !== null)? window.localStorage: false,
		getLocalStorageVal: function (key) {
			var v = false;
			try {
				var tmp = JSON.parse(this.loc_stor.getItem('ARCS'+this.cookie_domain));
				v = tmp[key]
			} catch (e) {}
			return v;
		},
		setLocalStorageVal: function (key, val) {
			try {
				var tmp = JSON.parse(this.loc_stor.getItem('ARCS'+this.cookie_domain));
				if (tmp == null) tmp = {};
				tmp[key] = val;
				this.loc_stor.setItem('ARCS'+this.cookie_domain,JSON.stringify(tmp));
			} catch (e) {}
		},
		getRegionById: function (id) {
			var l = this.hash.length;
			for (i=0; i<l; i++) {
				if (this.hash[i].id == id) {
					return this.hash[i];
				}
			}
			return false;
		},
		normalizeRegionId: function (n) {
			var nn = n.toLowerCase();
			nn = nn.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");
			nn = nn.replace(/^\s+|\s+$/g, "");
			nn = nn.replace(/ /, "-");
			return nn;
		},
		checkRegionCookie: function () {
			if ($.cookie('edition') !== null) { //if new cookie set, use it
				this.current = this.getCookieRegion('edition');
			} else if($.cookie('region') !== null) { //if old cookie set, use it to set new cookie and delete old cookie
				this.current = this.getCookieRegion('region');
				$.cookie('edition', this.current.id, { expires: 365, path: '/', domain: this.cookie_domain });
			} else { // use default to	set new cookie
				$.cookie('edition', this.default_region.id, { expires: 365, path: '/', domain: this.cookie_domain });
			}
		},
		getCookieRegion: function (ck_name) {
			if ($.cookie(ck_name) !== null) {
				var id = this.normalizeRegionId($.cookie(ck_name));
				return this.getRegionById(id);
			}
			return this.default_region;
		},
		getRegionBlogs: function (id, bt) {
			if (bt != null && id != null) { // blog topic is set, get that blog
				var l = this.hash.length;
				for (i=0; i<l; i++) {
					if (this.hash[i].id == id) {
						for (key in this.hash[i].blogs) {
							if (key == bt) {
								return this.hash[i].blogs[key];
							}
						}
					}
				}
			} else if (id != null) { // return all blogs
				var l = this.hash.length;
				for (i=0; i<l; i++) {
					if (this.hash[i].id == id) {
						return this.hash[i].blogs;
					}
				}
			}
			return false;
		},
		initRegionSettings: function () {
			this.current = this.default_region;
			if (this.is_regionalized) {
				// if this is a "home page" set the default region based on that
				if (this.template=='homepage') {
					var tmp = window.location.pathname;
					var l = this.hash.length;
					for(i=0; i<l; i++){
						var re = new RegExp(this.hash[i].path, "gi");
						if (tmp.match(re)) {
							this.current = this.hash[i];
							break;
						}
					}
				} else { // set the region based on the cookie
					this.checkRegionCookie();
				}
			} else { // no regions, just set cookie
				$.cookie('edition', this.default_region.id, { expires: 365, path: '/', domain: this.cookie_domain });
			}
			this.setLocalStorageVal('region', this.current.id);
		}
	};
	ARCS.base_uri = 'http://www'+ARCS.env+'.oregonlive.com/';
	ARCS.hash = [
		{"id":"oregon", "display":"Oregon", "nameplate": "Oregon", "path":"/", "zip_code":"97204",
			"blogs": {
				"default": ARCS.base_uri + "olive_impact_top-stories/",
				"news": ARCS.base_uri + "olive_impact_news/",
				"sports": ARCS.base_uri + "olive_impact_sports/",
				"hssports": "http://highschoolsports.oregonlive.com/content/toprail_dropdown/region/statewide/",
				"entertainment": ARCS.base_uri + "olive_impact_entertainment/",
				"business": ARCS.base_uri + "olive_impact_business/",
				"opinion": ARCS.base_uri + "olive_impact_opinion/",
				"living": ARCS.base_uri + "olive_impact_living/",
				"local": ARCS.base_uri + "olive_impact_local/",
				"hs-sports": ARCS.base_uri + "olive_impact_highschool/"
			}
		},
		{"id":"default", "display":"Oregon", "nameplate": "Oregon", "path":"/", "zip_code":"97204",
			"blogs": {
				"default": ARCS.base_uri + "olive_impact_top-stories/",
				"news": ARCS.base_uri + "olive_impact_news/",
				"sports": ARCS.base_uri + "olive_impact_sports/",
				"hssports": "http://highschoolsports.oregonlive.com/content/toprail_dropdown/region/statewide/",
				"entertainment": ARCS.base_uri + "olive_impact_entertainment/",
				"business": ARCS.base_uri + "olive_impact_business/",
				"opinion": ARCS.base_uri + "olive_impact_opinion/",
				"living": ARCS.base_uri + "olive_impact_living/",
				"local": ARCS.base_uri + "olive_impact_local/",
				"hs-sports": ARCS.base_uri + "olive_impact_highschool/"
			}
		}
	];
	ARCS.default_region = ARCS.hash[0];
	ARCS.weather = {"app": "http://weather-report"+ARCS.env+".oregonlive.com/weather/hp/json/",
					    "forecast": "http://weather-report"+ARCS.env+".oregonlive.com/weather/jsonp/3day/zip=",
					    "links": ["http://www.oregonlive.com/weather/","http://www.oregonlive.com/roadreport/"]};
	ARCS.media_path = ARCS.base_uri + "static/olive/static/";
	ARCS.cookie_domain = ".oregonlive.com";
	ARCS.config.livefyre = {'siteid':{'prod':'352339','uat':'352515','dev':'304504'}};
	ARCS.is_regionalized = false;
	ARCS.custom_vars['QuerylyKey'] = '5d860805e17d4854';
	ARCS.custom_vars['css'] = {'mrf-port':'800','mrf-land':'800'};

	ARCS.initRegionSettings();
})(jQuery);
;/**
 * adv-tracker-h.js
 * Appends and attaches tracking hashes and scripts to DOM elements
 * requires jquery-1.2.3.js or higher
 *
 * This namespace, AdvTracker, provides a means to attach tracking to any DOM element.
 *
 * attachTracker is a function that assigns the tracking elements to a DOM element. This page does a load event
 * to call this for all non-deferred codes. Deferred elements (e.g. populated via ajax) must call this when they are envoked.
 * Parameters are el - string of jQuery selector for el in codes array and cav - string for optional override for ahash/ehash
 *
 * modJSONLinks is a function that assigns the ahash or inserts the ehash tracking elements to a JSON data key.
 * Parameters are d - json object to alter, el - string of jQuery selector, k - string key of data modify,
 * ct - string of code type (either ahash or ehash), cav - string for optional override for ahash/ehash.
 *
 * scTracker is a function for Site Catalyst tracking.  Currently used on Find Local and Community Center widgets on the homepage.
 *
 * codes values:
 *   el - string, the jQuery handle of the element to attach tracking options
 *   ahash - string, a value to be appended to the elements href attribute
 *   ehash - string, hash value to embed in href attribute after .html
 *   js - js function, javascript to be assigned to the elements onclick event
 *   defer - boolean, is the element loaded via when the script is loaded (false) or manually (true)
 *   
 * Copyright (c) Advance Digital. All rights reserved.
 */
var AdvTracker = {
	codes: [{"el":"#section-nav-inner div.sub h5 a","ahash":"#incart_flyout","ehash":"","js":"","defer":true},
            {"el":".alert[class!='alert breaking'] a","ahash":"#incart_std","ehash":"","js":"","defer":false},
            {"el":".alert.breaking a","ahash":"#incart_breaking","ehash":"","js":"","defer":false},
			{"el":".big-story.two .story a","ahash":"#incart_2box","ehash":"","js":"","defer":false},
			{"el":".three-col-promo h2 a, .three-col-promo h3 a, .three-col-promo div.tcp-item>a, .three-col-promo h3 a .three-col-promo li.view-none a, .three-col-promo li.view-video a, .three-col-promo li.view-gallery a","ahash":"#incart_m-rpt-1","ehash":"","js":"","defer":false},
			{"el":"#three-over-two h2 a, #three-over-two h3 a, #three-over-two div.tot-item>a, #three-over-two li.view-none a, #three-over-two li.view-video a, #three-over-two li.view-gallery a","ahash":"#incart_m-rpt-2","ehash":"","js":"","defer":false},
			{"el":".big-story.one h1 a, .big-story.one p a","ahash":"#incart_big-photo","ehash":"","js":"","defer":false},
			{"el":".big-story.topic-two a","ahash":"#incart_maj-story-1","ehash":"","js":"","defer":false},
			{"el":".big-story.topic-one a","ahash":"#incart_maj-story-2","ehash":"","js":"","defer":false},
			{"el":".gallery_embed_index .h2 a","ahash":"#incart_gallery","ehash":"","js":"","defer":false},
			{"el":".adv_election_mod a","ahash":"#incart_election","ehash":"","js":"","defer":false},
			{"el":"#adv-section-nav-inner div.adv-sub h5 a","ahash":"#incart_flyout","ehash":"","js":"","defer":true},
			{"el":"#river-container div.item-text div.h2 a","ahash":"#incart_river","ehash":"","js":"","defer":true},
			{"el":"#river-container-2 div.item-text div.h2 a","ahash":"#incart_river","ehash":"","js":"","defer":true},
			{"el":"#river-container-3 div.item-text div.h2 a","ahash":"#incart_river","ehash":"","js":"","defer":true},
			{"el":"#river-container div.item-photo a","ahash":"#incart_river","ehash":"","js":"","defer":true},
			{"el":"#river-container-2 div.item-photo a","ahash":"#incart_river","ehash":"","js":"","defer":true},
			{"el":"#river-container-3 div.item-photo a","ahash":"#incart_river","ehash":"","js":"","defer":true},
			{"el":"#more-hed-business li a","ahash":"#incart_more_business","ehash":"","js":"","defer":false},
			{"el":"#more-hed-sports li a","ahash":"#incart_more_sports","ehash":"","js":"","defer":false},
			{"el":"#more-hed-entertainment li a","ahash":"#incart_more_entertainment","ehash":"","js":"","defer":false},
			
			{"el":".ArticleSidebar #most-comments li a","ahash":"#incart_most-commented_" + $(location).attr('pathname').split("/")[1] + "_article","ehash":"","js":"","defer":true},		
			{"el":".IndexSidebar #most-comments li a","ahash":"#incart_most-commented_" + $(location).attr('pathname').split("/")[1],"ehash":"","js":"","defer":true},			
			{"el":"aside #most-comments li a","ahash":"#incart_most-comments","ehash":"","js":"","defer":true},
			{"el":".ArticleSidebar #most-read li a","ahash":"#incart_most-read_" + $(location).attr('pathname').split("/")[1] + "_article","ehash":"","js":"","defer":true},
			{"el":".IndexSidebar #most-read li a","ahash":"#incart_most-read" + $(location).attr('pathname').split("/")[1],"ehash":"","js":"","defer":true},
			{"el":"aside #most-read li a","ahash":"#incart_most-read_","ehash":"","js":"","defer":true},
			
			{"el":"#related .RelatedColumn a","ahash":"#incart_related_stories","ehash":"","js":"","defer":false},
			{"el":".special-report h2 a, .special-report li a","ahash":"#incart_special-report","ehash":"","js":"","defer":false},
			{"el":".photo-of-the-day .pod-photo a, .photo-of-the-day h2 a","ahash":"#incart_photo","ehash":"","js":"","defer":false},
			{"el":"#best_of div a","ahash":"#incart_best-of", "ehash":"","js":"","defer":false},
			{"el":"#news-river div.TeamFeature div.h2 a","ahash":"#incart_social_feature", "ehash":"","js":"","defer":false},
			{"el":"#news-river div.TeamFeature > a","ahash":"#incart_social_feature", "ehash":"","js":"","defer":false},
			{"el":"#news-river div.adi-feed-thread h2 a","ahash":"#incart_social_river", "ehash":"","js":"","defer":true},
			{"el":"#news-river div.adi-feed-thread div.content-body > a","ahash":"#incart_social_river", "ehash":"","js":"","defer":true},
			{"el":".cc-voices li.cc-voice a","ahash":"#incart_opinion","ehash":"","js":"","defer":false},
			{"el":"[id^=cc].selector h3","ahash":"","ehash":"","js":function(){AdvTracker.scTracker(this,"community_" + $(this).closest('.selector').attr('id').split('-')[1] + "_expand");},"defer":true},
			{"el":"[id^=cc].selector input[type='submit']","ahash":"","ehash":"","js":function(){AdvTracker.scTracker(this,"community_" + $(this).closest('.selector').attr('id').split('-')[1] + "_search");},"defer":true},
			{"el":"[id^=cc].selector p a[href*='#incart_cc']:first-child","ahash":"","ehash":"","js":function(){AdvTracker.scTracker(this,"community_" + $(this).closest('.selector').attr('id').split('-')[1] + "_clicklink");},"defer":true},
			{"el":"[id^=cc].selector .featured-ad a","ahash":"","ehash":"","js":function(){AdvTracker.scTracker(this,"community_" + $(this).closest('.selector').attr('id').split('-')[1] + "_clickfeatured");},"defer":true}],
	getCode: function (el) {
		var c;
		jQuery.grep(this.codes, function(n, i){
			if (n.el == el) {
				c = n;
			}
		});
		return c;
	},
	attachTracker: function (el, cav) {
		try {
			var c = this.getCode(el);
			var a = jQuery(el);
			var av = (typeof cav == 'undefined' || cav.match(/undefined/g))?'':cav;
			if (a.length > 0 && typeof c == 'object') {
				jQuery.each(a,function(n,t){
					if (c.ahash) t.href += c.ahash+av;
					if (c.js) {
						jQuery(t).bind("click",c.js);
					}
					if (c.ehash) {
						var e = encodeURI(c.ehash).replace(/\#/g,"%23");
						t.href = t.href.replace(/.html/g,".html"+e);
					}
				});
			}
		} catch (e) {;}
	},
	modJSONLinks: function (d, el, k, ct, cav) {
		try {
			var c = this.getCode(el);
			var av = (typeof cav == 'undefined')?'':cav;
			jQuery.each(d,function(n,t){
				if (ct == "ahash") {
					if (c.ahash) t[k] += c.ahash+av;
				}
				if (ct == "ehash") {
					var e = encodeURI(c.ehash).replace(/\#/g,"%23");
					t[k] = t[k].replace(/.html/g,".html"+e);
				}
			});
			return d;
		} catch (e) {
			return d;
		}
	},
	initTracker: function () {
		jQuery.each(this.codes,function(n,t){
			if (!t.defer)
				AdvTracker.attachTracker(t.el, '');
		});
	},
	scTracker: function(t,c) {
		try {
			s = s_gi(s_account);
			s.tl(t,'o',c);
		} catch(e) {;} 
	}
};

jQuery(document).ready(function() {
	
	AdvTracker.initTracker();
});
;/*
 Dependencies - ARCS (adv_region.js), jQuery, Modernizr, movabletype.js & adv_common.js (for signin)
 
More abstract finite state machine for toprail.
Not using key, but only indexes.
states and events can be customized for a variety of situations.
*/
if(!console){var console={'log':function(){}};}

(function($) {
	AdvTR = {
		domain: ARCS.cookie_domain.substr(1),
		aff_ui: {'bama':'AL.com','cleve':'Cleveland.com','gulf':'gulflive.com','lvlive':'lehighvalleylive.com','mass':'MassLive.com','mlive':'MLive','njo':'NJ.com','nola':'NOLA.com','olive':'OregonLive.com','penn':'PennLive','silive':'SILive.com','syr':'syracuse.com'},
		check_session: false, //for signin
		menu_context: null,
		/* generic geoloc and geocode function */
		getWeatherGeoLoc: function (cb, ecb) { //ecb -> error callback
			navigator.geolocation.getCurrentPosition(function(pos){
				//set some vars	  
				var ts = pos.timestamp;
				var lat = pos.coords.latitude;
				var lng = pos.coords.longitude;
				AdvTR.getGeoCodeData(''+lat + lng + AdvTR.domain + 'entertainment' + ts,'type=reverse&lat='+lat+'&lng='+lng+'&aff='+ AdvTR.domain +'&dstmp='+ts,cb);
			}, function(e){AdvTR.geoCodeError(e, ecb);}, {maximumAge:3000, timeout:5000, enableHighAccuracy:true});
		},
		getGeoCodeData: function (h, d, cb, ecb) {
			var err = '';
			if (typeof ecb === 'function') var err = ecb;
			var h_url = 'http://www.'+AdvTR.domain+'/cgi-bin/md5_hash_jsonp.cgi?h='+h;
			var rh = $.ajax({
				url: h_url,
				dataType: 'jsonp',
				jsonp: true,
				jsonpCallback: 'md5JSON'
			});
			rh.done(function(o, m){	 //got hash, now get geocode data
				var g_url = 'http://www.'+AdvTR.domain+'/cgi-bin/prxy/auth/nph-cache.cgi/cache=1800;timeout=30;host=geocode.advance.net;/geoparse?'+d+'&enc='+o.hash+'&jsonp=geoParseData';
				var rg = $.ajax({
						url: g_url,
						dataType: 'jsonp',
						jsonp: true,
						jsonpCallback: 'geoParseData'
				});
				rg.done(function(o,m){ //got something, handle with callback
					if (typeof cb === 'function') cb(o,m);
				});
				rg.fail(function(x,s){AdvTR.geoCodeError({message: "Location not determined",code: 4});},err);
			});
			rh.fail(function(x,s){AdvTR.geoCodeError({message: "Location not determined",code: 3});},err);
		},
		geoCodeError: function () {
			var msg = '';  // PositionError {message: "User denied Geolocation", code: 1, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3}
			try {
				msg = arguments[0].message;
			} catch (e) {
				msg = e;
			}
			if (typeof arguments[1] === 'function') arguments[1](arguments[0]); // handle additional error callback
		},
		/* weather functions */
		b_weather: true,
		weatherError: function (e) {
			if (arguments.length>0 && arguments[0].message) {
				$('#adv_wlocation_form .errorMsg').html(arguments[0].message);
				$('#adv_weather_main').addClass('openErr');
			}
		},
		getWeatherGeoData: function (o,m){
			if (o.zip != '') {
				o.zip = o.zip.substr(0,5);
				weatherUI(o);
			} else {						//no zip code
				if (o.city!='' && o.state!='') {
					$.ajax({
						url: ARCS.weather.app+o.city.toLowerCase().replace(/ /g, "-")+'-'+o.state.toLowerCase(),
						dataType: 'jsonp',
						jsonp: false,
						cache: true,
						jsonpCallback: 'weather'})
					.done(function(wo,wm){
						if (wo.zip_code!='') {
							o.zip = wo.zip_code;
							weatherUI(o);
						}
					})
					.fail(function(){AdvTR.geoCodeError({message: "Location not found",code: 1},AdvTR.weatherError);});
				} else {				  // show err
					AdvTR.geoCodeError({message: "Location not found",code: 1},AdvTR.weatherError);
				}
			}			
			function weatherUI (co) {
				if (AdvTR.b_weather) {
					delete co['mapUrl'];
					ARCS.setLocalStorageVal('weather_state', 'phase2');
					ARCS.setLocalStorageVal('location_data', co);
					$.cookie('gl-weather', co.zip, { expires: 365, path: '/', domain: ARCS.cookie_domain });
					$('.advGeoChoosen').html(co.city+', '+co.state);
					AdvTR.showWeatherData();
					$('#adv_weather_main').addClass('open');
					AdvTR.updateWeather(co.zip);
					$('[name=adv_location_input]').val('');
				} else {
					ARCS.setLocalStorageVal('weather_state', 'phase3');
					AdvTR.b_weather = true;
				}
			}
		},
		updateWeather: function (zc){ // writes weather data to dom
			$.ajax({
				url: ARCS.weather.forecast+zc+'/',
				dataType: 'jsonp',
				jsonp: false,
				cache: true,
				jsonpCallback: 'threeDayForecast'})
			.done(function (data) {
				var $w = $('.advConditions');
				$w.removeClass().addClass('advConditions ' + data.current.classname + '-' + data.current.icon_code);
				$w.find('.advTemp').html(data.current.temperature).parent().removeClass('advNoTemp');
				$('#adv_mobi_weather .advNoTemp').removeClass('advNoTemp');
				var $wd = $('#adv_weather_data');
				if (ARCS.device == 'phone') {
					$('#adv_mobi_weather .advGeoChoosen').html(data.current.location);
				}
				$('.advABtn', $wd).attr('href', ARCS.weather.links[0]+'?zipcode='+zc);
				var mk = '';
				$.each(data, function(n,v){
					mk += '<div class="'+n+'"><div class="inner '+this.classname+'-'+this.icon_code+'"><span class="day">'+n+'</span><span class="tempHiLo">'+this.temp_hilo+'</span><span class="temp">'+this.temperature+'</span><span>'+this.conditions_short+'</span></div></div>';
				});
				$('.title', $wd).html(data.current.location);
				$('.advWeatherInner', $wd).html(mk);
			})
			.fail(function(){ // could not get weather report
				console.log('update weather fail');
				$('#adv_weather_data .advWeatherInner').html('<span class="errorMsg">An error occured while retrieving weather information. Please update your current location.</span>')
				$('#adv_weather .advTemp, #adv_mobi_weather .advGeoChoosen').html('Set Weather').parent().addClass('advNoTemp');
			});
		},
		showWeatherData: function (s){ // handles which state to show in weather pane
			try{
				var tc = ARCS.getLocalStorageVal('weather_state');
				var c = 'phase1';
				if (s) c = s;
				else if (tc) c = tc;
				$('#adv_wlocation_form .errorMsg').html('');
				$('#adv_wlocation_input').attr('value', '');
			} catch (e) {}
			$('#adv_weather_main').removeClass().addClass('advDropdown advLayer '+c);
		},
		/* sign-in function */
		renderUserWidget: function (u) {
			try {
				var aff_domain = advEnvPrefix+"."+advDomain;
				$('#adv_pass_reset, #adv_toprail_register').each(function () {
					var h = this.href;
					this.href = h + "return_to="+encodeURIComponent(top.document.location.href);
				});
				$('#adv_signin_links a').each(function () {
					var h = this.href;
					this.href = h + "&return_to="+encodeURIComponent(top.document.location.href);
				});
				u = eval(u);
				if (u) {
					if (u && u.is_authenticated) {
						user = u;
						mtSaveUser();
					} else { 	// user really isn't logged in; so let's do this!
						return mtSignIn();
					}
				} else {
					u = mtGetUser();
				}
				if (u && u.name) {
					ARCS.setLocalStorageVal('username', u.name);
					var user_pic;
					if (u.userid && (typeof u.userpic == 'string')) {
						if (u.userpic.match(/http/)) {
							user_pic = u.userpic;
						} else {
							user_pic = 'http://media'+ aff_domain + u.userpic;
						}
					} else {
						user_pic = mediaURL + '/img/user_default.png';
					}
					var userName = u.name;
					if(userName.length > 20) {
						userName = userName.substr(0,16) + "...";
					}
					$('#adv_user_dropdown').addClass('signedIn');
					$('#adv_account').addClass('signedIn').css({'background-image':'url('+user_pic+')','filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+user_pic+'\',sizingMethod=\'scale\')'});
					$('#adv_profile_img').attr('src', user_pic);
					$('#adv_profile_nameplate h2').html(userName);
					$('#adv_profile_edit a').attr('href', 'https://signup' + aff_domain + '/dashboard/edit.html');
					$('#adv_profile_view a').attr('href', 'http://connect' + aff_domain + '/user/' + encodeURIComponent(u.profile) + '/index.html');
					$('#adv_profile_exit a').attr('href',"javascript:void(0)");
					if (u.is_author)
						$('#adv_profile_exit a').click(function () { AdvTR.dom_els.user.removeClass('open'); return mtSignOutOnClick();	});
					if (document.location.href.match(/\/dashboard\/edit\.html/)) {
						$('#adv_profile_exit a').click(function () { mtSignOutOnClick('https://signup' + aff_domain + '/sign-in/');	});
					}
				} else {
					$('#adv_user_dropdown').removeClass('signedIn');
					$('#adv_account').removeClass('signedIn').css({'background':'none','filter':'none'});
					$('#adv_profile_img').attr('src', 'http://www' + aff_domain + '/static/common/img/blank.gif');
					$('#adv_profile_nameplate h2').html('');
					$('#adv_profile_edit a, #adv_profile_view a').attr('href', '#');
					$('#adv_signin').attr('action','https://signup' + advBlogSettings.envPrefix + '.' + advBlogSettings.affiliateDomain + '/community/');
				}
			} catch (e) { }
			return false;
		},
		scTracker: function(t,c) { // s_code tracker
			try {
				s = s_gi(s_account);
				s.tl(t,'o',c);
			} catch(e) {;} 
		},
		/* finite state machine */
		states: [	[0,	    [0,1], 0,     0,     [6,4], [8,5], [10,6], [12,7], [14,8], [16,9]],	// 0 'default'- default, menu-open->menu, [NA]->subnav, [NA]->subnav2, weather-open->weather, user-open->user, search-open->search, edition-open->edition, -unused-, papers-open->papers
					[0,	    [1,0], [2,2], [4,3], [6,4], [8,5], [10,6], [12,7], [14,8], [16,9]], // 1 'menu'-    default, menu-close->default, subnav-open->subnav, subnav2-open->subnav2, weather-open->weather, user-open->user, search-open->search, edition-open->edition, -unused-, papers-open->papers
					[0,     [1,0], [3,1], [4,3], [6,4], [8,5], [10,6], [12,7], [14,8], [16,9]],	// 2 'subnav'-  default, menu-close->default, subnav-close->menu, subnav2-open->subnav2, weather-open->weather, user-open->user, search-open->search, edition-open->edition, -unused-, papers-open->papers
					[0,     [1,0], [3,1], [5,2], [6,4], [8,5], [10,6], [12,7], [14,8], [16,9]],	// 3 'subnav2'- default, menu-close->default, subnav-close->menu, subnav2-close->subnav, weather-open->weather, user-open->user, search-open->search, edition-open->edition, -unused-, papers-open->papers
					[[7,0], [0,1], [6,4], 0,     [7,0], [8,5], [10,6], [12,7], [14,8], [16,9]],	// 4 'weather'- weather-close->default, weather-open->weather, [NA]->submenu, [NA]->subnav2, weather-close->default, user-open->user, search-open->search, edition-open->edition, -unused-, papers-open->papers
					[0,	    [0,1], 0,     0,     [6,4], [9,0], [10,6], [12,7], [14,8], [16,9]],	// 5 'user'-    default, menu-open->menu, [NA]->subnav, [NA]->subnav2, weather-open->weather, user-close->default, search-open->search, edition-open->edition, -unused-, papers-open->papers
					[0,	    [0,1], 0,     0,     [6,4], [8,5], [11,0], [12,7], [14,8], [16,9]],	// 6 'search'-  default, menu-open->menu, [NA]->subnav, [NA]->subnav2, weather-open->weather, user-open->user, search-close->default, edition-open->edition, -unused-, papers-open->papers
					[[13,0],[0,1], 0,     0,     [6,4], [8,5], [10,6], [13,0], [14,8], [16,9]],	// 7 'edition'- edition-close->default, menu-open->menu, [NA]->subnav, [NA]->subnav2, weather-open->weather, user-open->user, search-open->search, edition-close->default, -unused-, papers-open->papers
					[0,	    [1,0], 0,     0,     [6,4], [8,5], [10,6], [12,7], [15,0], [16,9]],	// 8 -unused-
					[0,	    [0,1], 0,     0,     [6,4], [8,5], [10,6], [12,7], [14,8], [17,0]]	// 9 'papers'-  default, menu-open->menu, [NA]->subnav, [NA]->subnav2, weather-open->weather, user-open->user, search-open->search, edition-open->edition, -unused-, papers-close->default
				  ],
		events: [
					(function() {// 0 "menu-open",
							AdvTR.menuHelper.initHelper();
							AdvTR.resetStates();
							AdvTR.dom_els.menu_items.removeClass('active');
							function openMenuWithContext() {
								if (AdvTR.menu_context!='') {
									AdvTR.SMO.current = AdvTR.SMO.states[2];
									AdvTR.dom_els.menu_sub.removeClass('open');
									if (ARCS.device == 'phone') AdvTR.dom_els.menu_all.addClass('close');
									$('ul.advMenu span[data-key="'+AdvTR.menu_context+'"]').parent('li').addClass('active');
									$('ul.advMenuSub[data-key="'+AdvTR.menu_context+'"]').addClass('open');
									AdvTR.menuHelper.getThirdLevelMenu(AdvTR.menu_context);
								} else {
									if (ARCS.device == 'phone') AdvTR.dom_els.menu_all.removeClass('close');
								}
								try {
									if(AdManager.isDefined('SiteSponsor')==false) {
										AdManager.defineUnit(
											new AdManager.UnitOptions({
												id: 'SiteSponsor',
												container: 'SiteSponsor'
											})
										);
										var ad_ar = ['SiteSponsor', 'SiteSponsor']
                                        AdManager.injectUnit(ad_ar);
									} else {
										var ad_ar = new Array('SiteSponsor');
										AdManager.refreshUnits(ad_ar);
									}
								} catch (e) {;}
								//-------------- third level hack
								try {
									if (AdvTR.submenu_context) {
										AdvTR.cur_menu_state = 3;
										var pk = AdvTR.submenu_context[1];
										var k = AdvTR.submenu_context[0];
										console.log('pk='+pk+'   k='+k)
										if (ARCS.device == 'phone') {
											AdvTR.dom_els.menu_all.addClass('close');
											$('ul.advMenuSub[data-key="'+pk+'"]').removeClass('open');
											AdvTR.menuScroll();
										} else {
											AdvTR.dom_els.menu_sub2.removeClass('open');
											AdvTR.dom_els.menu_sub.find('li').removeClass('active');
											$('ul.advMenuSub span[data-sub-key="'+k+'"]').parent('li').addClass('active');
										}
										$('ul.advMenuSub2[data-sub-key="'+k+'"]').addClass('open');
									}
								} catch (e) {;}
								//---------------------------
								AdvTR.dom_els.menu.data('state',1).addClass('open');
								AdvTR.dom_els.menu_layer.addClass('open');
							}
							if (ARCS.subdomain.indexOf('highschool')>-1) {
								AdvTR.menu_context = 'hssports';
							} else {
								AdvTR.menu_context = getToprailMenuContext();
							}
							openMenuWithContext();
					}),
					(function() {// 1 "menu-close",
							AdvTR.dom_els.menu.removeClass('open');
							AdvTR.dom_els.menu_layer.removeClass('open');
					}),
					(function(s,t) {// 2 "subnav-open",
							AdvTR.cur_menu_state = 2;
							var k =$(t).data('key');
							AdvTR.menuHelper.getThirdLevelMenu(k);
							if (ARCS.device == 'phone') {
								AdvTR.dom_els.menu_all.addClass('close');
								AdvTR.menuScroll();
							} else {
								AdvTR.dom_els.menu_items.removeClass('active');
								AdvTR.dom_els.menu_sub.removeClass('open');
								$('ul.advMenu span.next[data-key="'+k+'"]').parent('li').addClass('active');
							}
							$('ul.advMenuSub[data-key="'+k+'"]').addClass('open');
					}),
					(function(s,t) {// 3 "subnav-close",
							AdvTR.dom_els.menu_sub.removeClass('open');
							if (ARCS.device == 'phone') {
								AdvTR.cur_menu_state = 1;
								AdvTR.dom_els.menu_all.removeClass('close');
							} else {
								var k =$(t).data('key');
								AdvTR.menuHelper.getThirdLevelMenu(k);
								AdvTR.dom_els.menu_items.removeClass('active');
								$('ul.advMenu span.next[data-key="'+k+'"]').parent('li').addClass('active');
								$('ul.advMenuSub[data-key="'+k+'"]').addClass('open');
							}
					}),
					(function(s,t) {// 4 "subnav2-open",
							AdvTR.cur_menu_state = 3;
							var pk = $(t).data('sub-parent');
							var k = $(t).data('sub-key');
							if (!pk) pk = k;
							if (ARCS.device == 'phone') {
								AdvTR.dom_els.menu_all.addClass('close');
								console.log($('ul.advMenuSub[data-key="'+pk+'"]'))
								$('ul.advMenuSub[data-key="'+pk+'"]').removeClass('open');
								AdvTR.menuScroll();
							} else {
								AdvTR.dom_els.menu_sub2.removeClass('open');
								AdvTR.dom_els.menu_sub.find('li').removeClass('active');
								$('ul.advMenuSub span[data-sub-key="'+k+'"]').parent('li').addClass('active');
							}
							$('ul.advMenuSub2[data-sub-key="'+k+'"]').addClass('open');
					}),
					(function(s,t) {// 5 "subnav2-close",
							var pk = $(t).data('sub-parent');
							var k = $(t).data('sub-key');
							if (!pk) pk = k;
							if (ARCS.device == 'phone') {
								AdvTR.cur_menu_state = 2;
								$('ul.advMenuSub[data-key="'+pk+'"]').addClass('open');
								$('ul.advMenuSub2[data-sub-key="'+k+'"]').removeClass('open');
							} else {
									AdvTR.dom_els.menu_sub2.removeClass('open');
									AdvTR.dom_els.menu_sub.find('li').removeClass('active');
									$('ul.advMenuSub2[data-sub-key="'+k+'"]').addClass('open');
									$('ul.advMenuSub span[data-sub-key="'+k+'"]').parent('li').addClass('active');
							}
					}),
					(function(s,t) {// 6 "weather-open",
							AdvTR.resetStates();
							var p = $(t).data('phase');
							if (typeof p == 'string') {
								ARCS.setLocalStorageVal('weather_state', p);
							}
							AdvTR.showWeatherData();
							if (ARCS.device == 'phone') {
								AdvTR.dom_els.menu.data('state',0).addClass('open');
							} else {
								AdvTR.dom_els.weather.addClass('open');
							}
							AdvTR.dom_els.weather_layer.addClass('open');
					}),
					(function(s,t) {// 7 "weather-close",
							var p = $(t).data('phase');
							if (typeof p == 'string') {
								ARCS.setLocalStorageVal('weather_state', p);
							}
							if (ARCS.device == 'phone') {
								AdvTR.dom_els.menu.data('state',1).removeClass('open');
							} else {
								AdvTR.dom_els.weather.removeClass('open');
							}
							AdvTR.dom_els.weather_layer.removeClass('open');
					}),
					(function() {// 8 "user-open",
							AdvTR.resetStates();
							Advance.MT.util.fireEvent('toprailuserinfo');
							AdvTR.dom_els.user.addClass('open');
					}),
					(function() {// 9: "user-close",
							AdvTR.dom_els.user.removeClass('open');
					}),
					(function() {// 10 "search-open",
							Advance.MT.util.fireEvent('toprailOpenSearch'); //for attaching events like queryly
							AdvTR.resetStates();
							AdvTR.dom_els.search.addClass('open');
					}),
					(function(s,t) {// 11 "search-close",
							if (t.id != 'adv_search') Advance.MT.util.fireEvent('toprailsearch');
							AdvTR.dom_els.search.removeClass('open');
					}),
					(function() {// 12 "edition-open",
							AdvTR.resetStates();
							if (ARCS.device == 'phone') {
								AdvTR.dom_els.edition_layer.css({'width': document.documentElement.clientWidth, 'left': ($('#adv_logo').offset().left*-1)});
							}
							AdvTR.dom_els.edition.addClass('open');
							AdvTR.dom_els.edition_layer.addClass('open');
					}),
					(function() {// 13 "edition-close",
							AdvTR.dom_els.edition.removeClass('open');
							AdvTR.dom_els.edition_layer.removeClass('open');
					}),
					(function() {// 14 "empty",
							console.log('empty');
					}),
					(function() {// 15 "empty",
							console.log('empty');
					}),
					(function(s,t) {// 16 "papers-open",
							AdvTR.resetStates();
							AdvTR.dom_els.subscribe.addClass('open');
							AdvTR.scTracker(t,'subscribe_showclick');
					}),
					(function(s,t) {// 17 "papers-close",
							AdvTR.dom_els.subscribe.removeClass('open');
							AdvTR.scTracker(t,'subscribe_hideclick');
					})
				  ],
		dom_els: {all: $('.advLayer, .advMenuSub, #adv_header [data-state], #adv_search_main'),
					 all_layers: $('#adv_menu_dropdown, #adv_weather_main, #adv_edition_dropdown, #adv_user_dropdown, #adv_subscribe_main, #adv_search_main'),
					 menu: $('#adv_menu'),
					 menu_all: $('#adv_menu_main, #adv_menu_classifieds, #adv_menu_top'),
					 menu_items: $('.advMenu li'),
					 menu_layer: $('#adv_menu_dropdown'),
					 menu_sub: $('.advMenuSub'),
					 menu_sub2: $('.advMenuSub2'),
					 weather: $('#adv_weather'),
					 weather_layer: $('#adv_weather_main'),
					 edition: $('#adv_header_text h3, #adv_mobi_edition span'),
					 edition_layer: $('#adv_edition_dropdown'),
					 user: $('#adv_user_dropdown'),
					 search: $('#adv_search, #adv_search_main'),
					 subscribe: $('#adv_subscribe, #adv_subscribe_main')
		},
		resetStates: function () {
			this.dom_els.all.removeClass('open');
		},
		menuScroll: function () {
			var y = $('#adv_network').outerHeight()
			if (window.pageYOffset > (y+54)) {
				window.scrollTo(0, y);
			}
		},
		cur_menu_state: 1,
		menuHelper: {
			parents: [],
			initHelper: function() {
				if (AdvTR.menuHelper.parents.length>0) return false; 
				var tp = AdvTR.dom_els.menu_sub.find('li[data-sub-parent]');
				var temp = new Array();
				$.each(tp, function(n, t){
					var pk = $(t).data('sub-parent');
					if (temp.indexOf(pk) < 0) {
						var $mc = $('#adv_menu_main span[data-key="'+pk+'"]');
						var a = $mc.prevUntil('li');
						var ahr = a.attr('href');
						try {
							AdvTR.menuHelper.parents.push({"key":pk, "context":ahr.substr(ARCS.cookie_domain.length+ahr.indexOf(ARCS.cookie_domain)), "loaded":false, "main_parent": a.html()});
							temp.push(pk);
						} catch (e) {;}
					}
				});
				return true;
			},
			getParentByKey: function(pk) {
				var len = AdvTR.menuHelper.parents.length;
				for (i=0; i<len; i++) {
					if (AdvTR.menuHelper.parents[i].key==pk) {
						return AdvTR.menuHelper.parents[i];
					}
				}
				return false;
			},
			getThirdLevelMenu: function(pk) {
				var po = AdvTR.menuHelper.getParentByKey(pk);
				if (po!=false && po.loaded==false) {
					var xhr = $.ajax({
						url: 'http://toprail.'+AdvTR.domain+'/toprailapp/third_level_menu/?toprail_uri='+po.context,
						dataType: 'jsonp',
						jsonp: true,
						cache: true,
						jsonpCallback: 'getThirdLevelMenu'
					});
					xhr.done(function(o,m){ //got something, handle with callback
						var $mul = $('ul.advMenuSub[data-key="'+pk+'"]');
						$.each($mul.children(),function(n,el){
							if ($(el).data('sub-parent') == pk) {
								var $ea = $(el).find('a,span').first();
								for (i=0; i<o.menus.length; i++) {
									var mkup = '';
									if (o.menus[i].title == $ea[0].innerHTML) {
										var mli = o.menus[i].items;
										var sk = $(el).data('sub-key');
										mkup = '<ul class="advMenuSub advMenu advMenuSub2" data-sub-key="'+sk+'">';
										mkup += '<li class="advMainMenuLink" data-state="3" data-sub-key="'+sk+'" data-sub-parent="'+po.key+'"><div class="prev"></div>Back to '+po.main_parent+' Menu</li>';
										for (j=0; j<mli.length; j++) {
											mkup += '<li><a href="'+mli[j].url+'">'+mli[j].name+'</a></li>';
										}
										mkup += '</ul>';
									}
									if (mkup != '') {
										$mul.after(mkup); //bind events to new DOM elements
										var newEl = $('ul.advMenuSub2[data-sub-key="'+sk+'"]');
										$('.advMainMenuLink', newEl).click(function(e){
											AdvTR.SMO.manageEvent($(this).data('state'), this);
										});
										// nav_t
										$('li a', newEl).click(function(e){
											var $p = $('#adv_menu_main span[data-key="'+po.key+'"]').siblings('a');
											document.cookie = 'nav_t=2:'+$p.text()+';expires=0;path=/;domain='+ARCS.cookie_domain;
											e.stopPropagation();
										});

										if (ARCS.device != 'phone') { // hover - desktop/tablet functionality
											var menuTimer;
											$('li', newEl).on({
												mouseenter: function(){
													var $nm = $(this).find('[data-state]');
													clearTimeout(menuTimer);
													menuTimer = setTimeout ( function(){
														if ($nm.length>0) {
															AdvTR.SMO.manageEvent($nm.data('state'), $nm);
														}
													}, 300 );
												},
												mouseleave: function(){
													clearTimeout(menuTimer);
												}
											});
										}
										if (ARCS.is_regionalized && typeof ARCS.custom_vars['menuRewrite'][1]=='object') {
											$.each($('li a', newEl), function() {
												var $this = $(this);
												var hr = $this.attr('href').replace(/\/$/,'');
												var p = hr.lastIndexOf('/');	
												if ((ARCS.custom_vars['menuRewrite'][1].vals.indexOf(hr.substr(p+1)))>-1)
													$this.attr('href', hr+ARCS.current.path);
											});
										}
										AdvTR.dom_els.all = $('.advLayer, .advMenuSub, #adv_header [data-state], #adv_search_main');
										AdvTR.dom_els.menu_items = $('.advMenu li');
										AdvTR.dom_els.menu_sub = $('.advMenuSub');
										AdvTR.dom_els.menu_sub2 = $('.advMenuSub2');
										po.loaded = true;
										//-------------- third level hack (show in specific context)
										try{
											if (subMenuContextKey() == sk) {
												AdvTR.submenu_context = [sk,po.key];
												newEl.addClass('open');
												$(el).addClass('active');
												// for first time - race condition
												AdvTR.cur_menu_state = 3;
												if (ARCS.device == 'phone') {
													AdvTR.dom_els.menu_all.addClass('close');
													$('ul.advMenuSub[data-key="'+po.key+'"]').removeClass('open');
													AdvTR.menuScroll();
												} else {
													AdvTR.dom_els.menu_sub2.removeClass('open');
													AdvTR.dom_els.menu_sub.find('li').removeClass('active');
													$('ul.advMenuSub span[data-sub-key="'+sk+'"]').parent('li').addClass('active');
												}
												$('ul.advMenuSub2[data-sub-key="'+sk+'"]').addClass('open');
											}
										} catch (e) {;}
										//----------------------------
									}
								}       
							}
						});
					});
					xhr.fail(function(x,s){console.log(x)});
				}
			}
		},
		StateMachine: function (obj) {
			this.states = obj.states;
			this.events = obj.events;
			this.current = this.states[0];
			this.manageEvent = function(s,t){
				var ar = this.current[s];
				var ev = ar[0];
				this.current = this.states[ar[1]];
				this.events[ev](s,t);
			};
			this.getStatus = function(){
				return this.current.name;
			};
		},
		SMO: null
	};
	AdvTR.SMO = new AdvTR.StateMachine(AdvTR);

	// set edition, if there
	$.elementReady( "adv_mobi_weather", function() {
		if (typeof ARCS == 'object') {
			if (ARCS.is_regionalized) {
				var reg = ARCS.getRegionById(ARCS.normalizeRegionId(ARCS.current.id)) || ARCS.default_region;
				if (reg.id != ARCS.default_region.id) {
					$('#adv_header_text h3 span, #adv_mobi_edition h3, #adv_menu_select_edition .nolink').text(reg.display);
				}
			}
		}
		if (ARCS.subdomain.indexOf('highschool')>-1) {
			$('#adv_header_text').append('<h2><a href="http://highschoolsports'+ARCS.cookie_domain+'/"><span>HIGH SCHOOL</span><br/>SPORTS</a></h2>');
		}
	});

	/* signin code - single sign-on */
	var refreshSigninWidget = function() {
		jQuery.elementReady( "adv_user_main", function() { AdvTR.renderUserWidget(); });
	};
	Advance.MT.util.attachEventHandler('sessionCreation', refreshSigninWidget);
	Advance.MT.util.attachEventHandler('sessionDestruction', refreshSigninWidget);
	var sessionID = jQuery.cookie( mtSessionCookieName ); 
	if ( sessionID ) {
		// validate and set user via session id from cookie
		AdvTR.check_session = true;
		Advance.MT.auth.doLogin({ sid: sessionID });
	} else {
		AdvTR.renderUserWidget();
	}

	/* personalization */
	getUserPersonalized = function getUserPersonalized() {
		if (ARCS.subdomain.indexOf('highschool')>-1) { // populate hssn favs
			var fav_schools = '',
				 fav_teams = '',
				 cdtf = null;
			try {
				cdtf = ARCS.hssnUserData.teamsFollowed;
				for (i=0; i < cdtf.length; i++) {
					if ((cdtf[i].school_followed == true)) { // school is favorite
						fav_schools += '<li><div><a href="/school/' +  cdtf[i].school_slug + '/">' + cdtf[i].name + '</a></div><span class="advFeedBtn ir" onclick="handleUserHssnFavs(this,\''+cdtf[i].school_slug+'\')">delete</span></li>';
					} else {
						if (typeof cdtf[i].sports == 'object') {
							for (j=0; j < cdtf[i].sports.length; j++) { // check for favorite teams
								fav_teams += '<li><div><span>' + cdtf[i].school_name + '</span><a href="/school/' + cdtf[i].school_slug + '/' + cdtf[i].sports[j].sport + '/">';
								for (k=0; k < sport_options.length; k++) {
									if (sport_options[k].slug == cdtf[i].sports[j].sport) {
										fav_teams += sport_options[k].name + '</a></div><span class="advFeedBtn ir" onclick="handleUserHssnFavs(this,\''+cdtf[i].school_slug+'\',\''+sport_options[k].slug+'\')">delete</span></li>';    
									}
								}
							}
						}
					}
				}
				if (fav_schools != '')
					$('#user_fav_schools ul').html(fav_schools);
				else
					$('#user_fav_schools ul').html('<li><strong>Go make some schools your favorites!</strong></li>');
				if (fav_teams != '')
					$('#user_fav_teams ul').html(fav_teams);
				else
					$('#user_fav_teams ul').html('<li><strong>Go make some teams your favorites!</strong></li>');
			} catch (e) {
				$('#user_fav_schools ul').html('<li><strong>Go make some schools your favorites!</strong></li>');
				$('#user_fav_teams ul').html('<li><strong>Go make some teams your favorites!</strong></li>');
			}
			$('#adv_user_favs').css('display', 'block');
		}
	};
	handleUserHssnFavs = function handleUserHssnFavs() {
		var args = Array.prototype.slice.call(arguments),
			 i = args.length,
			 s = '';
		if (i==2) {
			unfollowSchool(args[1]);
			s = 'schools';
		} else if (i==3) {
			unfollowTeam(args[1], args[2]);
			s = 'teams';
		}
		if (s!='') {
			var $p = $(args[0]).parent();
			var $l = $p.siblings('li');
			if ($l.length==0)
				$p.parent().html('<li><strong>Go make some '+s+' your favorites!</strong></li>');
			$p.remove();
		}
	};
	Advance.MT.util.attachEventHandler('personalizationInitialized', getUserPersonalized);
	Advance.MT.util.attachEventHandler('toprailuserinfo', getUserPersonalized);
	
	// fire on doc ready
	$(function() {
		// BDT use
		function navClickCookie () { $.cookie('nav_t', '2', { path: '/', domain: ARCS.cookie_domain }); }
		$('#adv_header').on('click', navClickCookie);
		$('#adv_menu_main li a').on('click', function(e){
			document.cookie = 'nav_t=2:'+$(this).text()+';expires=0;path=/;domain='+ARCS.cookie_domain;
			e.stopPropagation();
		});
		$('#adv_menu_container .advMenuSub li a').on('click', function(e){
			var pk = $(this).parents('ul').data('key');
			var $p = $('#adv_menu_main span[data-key="'+pk+'"]').siblings('a,span');
			document.cookie = 'nav_t=2:'+$p.text()+';expires=0;path=/;domain='+ARCS.cookie_domain;
			e.stopPropagation();
		});
	
	// double check this 
		if (typeof m_toprail_category2 != 'undefined' && (m_toprail_category2 == "Sports" || m_toprail_category2 == "High School Sports")) {
			var $a = $('#about-us > div:first-child');
			$a.prepend('<div>'+AdvTR.aff_ui[advAffiliate]+' '+m_toprail_category2+'</div>');
		};
		/***************************************************************************/

		// assign click event for toprail overlay states
		$('#adv_header [data-state]').click(function(e){
			if (typeof e.target != 'undefined' && e.target.nodeName == 'A' && e.target.href != '') {
				e.stopPropagation();
				window.top.location = e.srcElement.href;
			} else {
				navClickCookie();
				AdvTR.SMO.manageEvent($(this).data('state'), this);
			}
			return false;
		});
		
		// search
		$('#adv_search_main .advSearchLink').click(function (){
			var st = $.trim($('#adv_search_input').val());
			if (st.length < 1) {
				window.location = 'http://search.'+AdvTR.domain;
			} else {
				document.getElementById('adv_search_form').submit();
			}
		});
		
		// Weather
		if (typeof ARCS.loc_stor == "object") {
			var ls = ARCS.getLocalStorageVal('location_data');
			if (typeof ls == 'object' && ls.zip) {		// set - phase 3 - get set weather
			  AdvTR.updateWeather(ls.zip);
			  ARCS.setLocalStorageVal('weather_state', 'phase3');
			} else if ($.cookie('gl-weather') !== null) {
			  var wc = $.cookie('gl-weather');
			  AdvTR.updateWeather(wc);
			  AdvTR.b_weather = false;
			  var ts = new Date();
			  AdvTR.getGeoCodeData(wc+ advDomain + 'entertainment' + ts.valueOf(),'type=geocode&loc='+wc+'&aff='+ advDomain +'&dstmp='+ts.valueOf(),AdvTR.getWeatherGeoData);
			} else {												// not set  - phase 1
				ARCS.setLocalStorageVal('weather_state', 'phase1');
				if (ARCS.device == 'phone') {
					$('#adv_mobi_weather .next').addClass('advNoTemp').click(function(e){
						e.stopPropagation();
						e.preventDefault();
						AdvTR.getWeatherGeoLoc(AdvTR.getWeatherGeoData);
					});
				}
				$('#adv_weather .advTemp, #adv_mobi_weather .advGeoChoosen').html('Set Weather').parent().addClass('advNoTemp');
			}
		} else {
			AdvTR.updateWeather(ARCS.current.zip_code);
		}

		// location setting - form submit
		if (navigator.geolocation) $('#adv_wlocation_form [name=adv_wlocation_input]').attr('placeholder','Use My Current Location');
		$('#adv_wlocation_form').submit(function(){	// vaildate, get zip
			var $t = $('[name=adv_wlocation_input]', this)
			var f = $.trim($t.val());
			if (navigator.geolocation && f.length == 0) {		  //try and get zip on geo loc
			  AdvTR.getWeatherGeoLoc(AdvTR.getWeatherGeoData, AdvTR.weatherError);
			} else if (!navigator.geolocation && f.length == 0) {		  // no geoloc - error
			  AdvTR.geoCodeError({message: "Location not found",code: 2},AdvTR.weatherError);
			} else if (f.length > 0) {		  // try and get on string, get hash to use geocode ws
			  var ts = new Date();
			  AdvTR.getGeoCodeData(f+ AdvTR.domain + 'entertainment' + ts.valueOf(),'type=geocode&loc='+f+'&aff='+ AdvTR.domain +'&dstmp='+ts.valueOf(),AdvTR.getWeatherGeoData);
			}
			return false;
		});

		// mobile only functionality (prevent input scaling)
		if(typeof Modernizr != 'undefined' && Modernizr.touch) {
			(function(doc) {
				var addEvent = 'addEventListener',
				type = 'gesturestart',
				qsa = 'querySelectorAll',
				scales = [1, 1],
				meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
				var fix = function() {
					meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
					doc.removeEventListener(type, fix, true);
				};
				if ((meta = meta[meta.length - 1]) && addEvent in doc) {
				  fix();
				  scales = [.25, 1.6];
				  doc[addEvent](type, fix, true);
				}
			}(document));
		}

		if (ARCS.is_regionalized) {
			// switch nav links
			$.each(ARCS.custom_vars['menuRewrite'], function(n,t) {
				$.each($('li a', t.el), function() {
					var $this = $(this);
					var hr = $this.attr('href').replace(/\/$/,'');
					var p = hr.lastIndexOf('/');
					if ((t.vals.indexOf(hr.substr(p+1)))>-1)
						$this.attr('href', hr+ARCS.current.path);
				});
			});

			// edition selection
			$('#adv_edition_menu li,#adv_menu_edition li:not(.advMainMenuLink)').click(function(e){
				var reg = $(this).data('value'),
					 nr = ARCS.getRegionById(reg),
					 loc = ARCS.base_uri+nr.path.substr(1);
				try {
					var l = ARCS.edition_redirects.length-1;
					do {
						if (document.URL.match(ARCS.edition_redirects[l].regex)) {
							loc = ARCS.edition_redirects[l].loc(nr);
							console.log(loc)
							break;
						}
					} while( l-- );
				} catch (e) {;}
				$.cookie('edition', nr.id, { expires: 365, path: '/', domain: ARCS.cookie_domain });
				e.stopPropagation();
				top.document.location = loc;
			});
		}

		// reassign links for mobile
		if (ARCS.device == 'phone') {
			$.each($('.advMenu [data-mhref]'), function(n,t) {
				var $t = $(t);
				t.href = $t.data('mhref');
			});
		}

		if (ARCS.device != 'phone') {
			// hover - desktop/tablet functionality
			var menuTimer;
			var menuNav  = $('#adv_menu_main li, #adv_menu_top li, li.advMenuExpansion');
			menuNav.on({
				mouseenter: function(){
					var $nm = $(this).find('[data-state]');
					clearTimeout(menuTimer);
					menuTimer = setTimeout ( function(){
						if ($nm.length>0) {
							AdvTR.SMO.manageEvent($nm.data('state'), $nm);
						}
					}, 300 );
				},
				mouseleave: function(){
					clearTimeout(menuTimer);
				}
			});
			// close overlays on mouseleave
			var trTimer;
			AdvTR.dom_els.all_layers.on({
				mouseenter: function(){
					clearTimeout(trTimer);
				},
				mouseleave: function(){
					clearTimeout(trTimer);
					trTimer = setTimeout ( function(){
						AdvTR.resetStates();
						AdvTR.SMO.current = AdvTR.states[0];
					}, 300 );
				}
			});
		}

		handleSearchSubmit = function() {
			var st = $.trim($('#adv_search_input').attr('value'));
			if (st.length > 0 && st != 'Search') {   
				var f = $('#adv_search_form');
				f.submit();
			}
			return false;
		};
		/***************************************************************************/
		/* HSSN Specific */
		if (ARCS.subdomain.indexOf('highschool')>-1) {
			// search
			try {
				var qkey = false;
				if (typeof ARCS.custom_vars['QuerylyKey'] != "undefined" && ARCS.custom_vars['QuerylyKey'].length > 0) {
					qkey = ARCS.custom_vars['QuerylyKey'];
				}
			} catch (e) {}
			if (qkey == false) {
				var $hssn_search = $('#adv_search_input');
				$hssn_search.attr('placeholder', 'Search High School Sports');
				$('#adv_search_main .advSearchLink').click(function (){
					var st = $.trim($hssn_search.val());
					if (st.length < 1) {
						window.location = 'http://search.'+AdvTR.domain;
					} else {
						document.getElementById('adv_search_form').submit();
					}
				});
				handleSearchSubmit = function handleSearchSubmit() {
					var st = $.trim($hssn_search.attr('value'));
					var pl = $hssn_search.attr('placeholder');
					if (st.length > 0 && st != pl) {   
						var f = $('#adv_search_form');
						f.attr('action', '/search/');
						f.submit();
					}
					return false;
				};
			}
			// user favorites - state machine to show/hide
			var hssn_user = {
				states: [ [[0,0]] ],   // simple toggle state
				events: [
							(function(s,t) { // simple toggle function
								$(t).parent().toggleClass('open');
							})
				]
			};
			var hssn_user_sm = new AdvTR.StateMachine(hssn_user);
			var $hssn_user_ss = $('#adv_user_snapshot [data-state]');
			$hssn_user_ss.off('click');
			$hssn_user_ss.on('click', function(e){			
				hssn_user_sm.manageEvent($(this).data('state'), this);
				return false;
			});
		}
		/***************************************************************************/
		Advance.MT.util.attachEventHandler('toprailsearch', handleSearchSubmit);
	});
})(jQuery);
;/**
 * adv_queryly.js
 *
 * Asynchronously loads queryly when search icon is interacted with.
 *
 * Requires jquery, adv-js-loader.js and adv_region.js
 *
 * Works with v002 version of toprail.
 */

(function($) {
var AdvQuerylyHandler = {
    qjs: false,
    loadJs: function () {
        var $sf = $('#adv_search_input');
        if (AdvQuerylyHandler.qjs == false && ARCS.device=="desktop" && $sf.length>0 && typeof AdvAsyncLoader == "object" && (typeof ARCS.custom_vars['QuerylyKey'] != "undefined" && ARCS.custom_vars['QuerylyKey'].length > 0)){
            $sf.addClass('queryly');
            AdvAsyncLoader.require('http://www.queryly.com/js/queryly.js', function(){
                    $('.queryly').keydown(function(){ProcessEnterKey(event);})
                    queryly.QuerylyKey = ARCS.custom_vars['QuerylyKey'];
                    queryly.batchSize = 4;
                    queryly.enableScrolling = false;
                    queryly.QuerylyNoResultCallback = function(){
                        queryly.jquery('#queryly_result').hide();
                    }
                    queryly.QuerylyBind();
                    AdvQuerylyHandler.qjs = true;
            });
            var ProcessEnterKey = function (e){
                    var keyCode = e.keyCode || e.which;
                    if (keyCode == 13){ ForwardSearch(); }
            }
            var ForwardSearch = function (){
                    var searchterm = queryly.util.getFullSuggestion();
                    if (searchterm == ''){ searchterm = queryly.jquery('.queryly').val(); }
                    window.location = "http://search"+ARCS.cookie_domain+"/" + encodeURIComponent(searchterm);
            }
        }
    }
};
Advance.MT.util.attachEventHandler('toprailOpenSearch', AdvQuerylyHandler.loadJs);
})(jQuery);
;// find local widget
//------------------------------------------------------------------------------------
	
$(document).ready(function() {		
	
	// IE jquery patch for ajax crossdomain - http://bugs.jquery.com/ticket/8283#comment:30
	if ( window.XDomainRequest ) {
		jQuery.ajaxTransport(function( s ) {
			if ( s.crossDomain && s.async ) {
				if ( s.timeout ) {
					s.xdrTimeout = s.timeout;
					delete s.timeout;
				}
				var xdr;
				return {
					send: function( _, complete ) {
						function callback( status, statusText, responses, responseHeaders ) {
							xdr.onload = xdr.onerror = xdr.ontimeout = xdr.onprogress = jQuery.noop;
							xdr = undefined;
							complete( status, statusText, responses, responseHeaders );
						}
						xdr = new XDomainRequest();
						xdr.open( s.type, s.url );
						xdr.onload = function() {
							callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
						};
						xdr.onerror = function() {
							callback( 404, "Not Found" );
						};
						xdr.onprogress = function() {};
						if ( s.xdrTimeout ) {
							xdr.ontimeout = function() {
								callback( 0, "timeout" );
							};
							xdr.timeout = s.xdrTimeout;
						}
						xdr.send( ( s.hasContent && s.data ) || null );
					},
					abort: function() {
						if ( xdr ) {
							xdr.onerror = jQuery.noop();
							xdr.abort();
						}
					}
				};
			}
		});
	}

	
	// weighted random content
	function randomContent(r,w) {
		try {
			var total_weight = eval(w.join("+")), // get total weight
			    weighed_rc = new Array(), // new array to hold weighed objects  
			    current_rc = 0;			
			while (current_rc<r.length){ // step through each random object
				for (i=0; i<w[current_rc]; i++) {
					weighed_rc[weighed_rc.length]=r[current_rc];			
				}
				current_rc++;
			}			
			var random_rc = Math.floor(Math.random()*total_weight);
			return weighed_rc[random_rc];
		} catch(e) {;}	
	}
	
	//unique randomness
	
	var rand = function(max, amount){
		var list = [];
		for (var i = amount-1 ; i >= 0; i--) {
			var num = Math.floor(Math.random() * max);
			if (list.length > 0 && list.indexOf(num) > -1) {
			    do { num = Math.floor(Math.random() * max); } while(list.indexOf(num) > -1);
			}
			list.push(num);
		}
		return list;
	}

	function checkResponse(cars, fLocal, first, fl_county){
		if(cars.length > 2){
			buildVast(rand(cars.length-1,2), fLocal, cars);
		} else if(cars.length == 2){
			var list = [0,1];
			buildVast(list, fLocal, cars);
		}else if(first){
			if (fl_county !== '') {
				var list_all_url = "http://"+fLocal.vast_link+".fe-prod.vast.com/nowshowing/"+fl_county+"/list-all";
			} else {
				var list_all_url = "http://"+fLocal.vast_link+".fe-prod.vast.com/nowshowing/list-all";
			}
			$.ajax({
				dataType:'jsonp', 
				url: list_all_url,
				jsonpCallback: 'checkResponse',
				cache: true,
				success: function(res){ checkResponse(res, fLocal, false, fl_county); }
			});
		}
	}


	
	function buildVast(indexes, fLocal, cars){
		var template = '<div id="fl-autos">'
						+'<h3>Autos</h3>'
						+'<div class="fl-search"><a href="http://autos.'+fLocal.vast_link+'.com">SEARCH »</a></div>'
						+'<div class="clearfix"></div>'
					    +    '<div class="promo-box">' 
						+		'<div class="fl-ads">'
						+			'<ul>';				
		
		for(i=0; i < 2; i++){
			template	+=				'<li>'
						+					'<div class="fl-image" style="background-image: url(\''+cars[indexes[i]].images.original+' \');background-size:100%"></div>'
						+			 		'<div class="fl-overlay">'
						+						'<div class="fl-darkbg"></div>'
						+						'<a href="http://autos.'+fLocal.vast_link+'.com'+cars[indexes[i]].url+'" data-dealer_id="'+cars[indexes[i]].dealer.id+'" class="see-details"><span>See Details »</span></a>'
						+					'</div>'
						+					'<div class="fl-location">'
						+						'<p>'+ cars[indexes[i]].title +'</p>'
						+					'</div>'
						+				'</li>';
		}
		template		+=			'</ul>'
						+			'<div class="clearfix"></div>'
						+		'</div>'
						+	'</div>'
						+'</div>';

		$('.fl-content').append(template);
	}	
	
	// load find local	    	    
	function loadFindLocal() {
		
		var fLocal = {
			aff_region : {
				"al.com" : "al",
				"cleveland.com" : "oh",
				"gulflive.com" : "ms",
				"lehighvalleylive.com" : "pa",
				"masslive.com" : "ma",
				"mlive.com" : "mi",
				"nj.com" : "nj",
				"nola.com" : "la",
				"oregonlive.com" : "or",
				"pennlive.com" : "pa",
				"silive.com" : "ny",
				"syracuse.com" : "ny"
			}	
		};
		fLocal.fl_domain = ARCS.cookie_domain.substring(1);
		fLocal.state = fLocal.aff_region[fLocal.fl_domain];
		fLocal.gtc_url = "http://geoip."+fLocal.fl_domain+"/api";
		fLocal.vast_link = fLocal.fl_domain.split('.')[0];
		
		// random content
		fLocal.random_content = ["http://realestate."+fLocal.fl_domain+"/?tp=findlocal&category=results&temp_type=detail&aff="+fLocal.fl_domain+"&content=realestate"];
		if($.inArray(fLocal.fl_domain, ['oregonlive.com', 'masslive.com', 'syracuse.com',
										'silive.com', 'cleveland.com', 'pennlive.com', 
										'lehighvalleylive.com', 'nola.com', 'mlive.com',
										'al.com','gulflive.com', 'nj.com']) > -1){
			fLocal.random_content[1] = "http://"+fLocal.vast_link+".fe-prod.vast.com/nowshowing";
		}else{
			fLocal.random_content[1] = "http://autos."+fLocal.fl_domain+"/Autos?tp=findlocal&category=results&temp_type=detail&aff="+fLocal.fl_domain+"&content=autos";
		}
		fLocal.random_weight = [1,1];  // weight of each object above
		
		
		// get gtc codes		
		var gtc = $.ajax({
			url: fLocal.gtc_url
		});	
		gtc.done(function(d) {		
			var gtc_code = $.parseJSON(d),
			    fl_random_url = randomContent(fLocal.random_content,fLocal.random_weight), /*pick a URL from the fLocal.random_content array (real estate or autos)*/
			    vast = (fl_random_url.match(/(nowshowin)\w+/g))? true : false; /*decide if this URL is pulling autos from Vast*/
			
			if(vast !== true){    /*if the random URL is a real estate call or the old autos feed, pass these location parameters from the GeoIP api*/
			  var fl_county = gtc_code['county']&&gtc_code['region']==fLocal.state? "&county=" + gtc_code['county'] : "&";			    
			} else { /*if the random URL is the vast feed,setup the location parameters this way*/
			  if (gtc_code['county'] !== '') {
				var fl_county = gtc_code['county'] + "-county";
				fl_random_url = fl_random_url + "/" + fl_county;
			  } else {
				var fl_county = "";
			  }
			}
			 var ajaxCalltype = (typeof vast != 'undefined' && vast != false)? 'jsonp' : 'html';   
			// get morris content
			$.ajax({ 
				url: fl_random_url,
				cache: true, 
				dataType: ajaxCalltype,
				jsonpCallback: 'checkResponse',
				success: function(h) {
					if(!vast){ 
						var $flc = $('.fl-content');
						$flc.append(h); // load content
						$flc.find(".fl-ads li a").on('click', function(){
							processLink($(this).data());
						});
					}else {
						checkResponse(h, fLocal, true);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Unable to load Morris. error: " + errorThrown);
				}
			});			
		});
		gtc.fail(function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Unable to load geoip.  error: " + errorThrown);
		});
	}

	// load content
	if(document.getElementById('find-local') && ARCS.device!="phone") { loadFindLocal(); }

});
//----------------------------------------------------------------------------------
