




/*
     FILE ARCHIVED ON 11:01:15 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:58 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
"use strict";var MediaPlayer;var downloadText="Ladda ner ";var closeText="St�ng";var moreOptionsText="Visa fler alternativ";var lang=document.getElementsByTagName('html')[0].getAttribute('lang');if(lang=="en"){downloadText="Download ";closeText="Close";moreOptionsText="Show more options"}if(!MediaPlayer){MediaPlayer={mediaPlayer:"",player:"/web/20130606110115/http://dev.futurniture.se/regeringen/player2/flash/MediaPlayer.swf",seek:-1,minimumEmbedWidth:250,minimumEmbedHeight:161,iOS:false,android:false,IE:false,hasFlash:false,liveNoFlash:"<p><strong>H�r p�g�r just nu en livess�ndning.</strong><br /><br />F�r att se lives�ndningar p� regeringen.se kr�vs det att du har javascript aktiverat och flash installerat. Flash kan du h�mta h�r: <a href=\"/web/20130606110115/http://get.adobe.com/flashplayer/\">get.adobe.com/flashplayer/</a></p>",oldMovieNoFlash:"<p><strong>Du f�rs�ker spela en gammal fil som tyv�rr f�r n�rvarande inte finns i ett format som st�ds av din spelare.</strong><br /><br />V�lj en annan fil i listan nedan, eller installera flash h�r: <a href=\"/web/20130606110115/http://get.adobe.com/flashplayer/\">get.adobe.com/flashplayer/</a></p>",callOptions:function(option,id){var changeTo,mediaPlayerContainer="",flash=true;switch(option){case 1:changeTo="movies-listing";break;case 2:changeTo="share-movie";break;case 3:changeTo="embed-movie";break;case 4:changeTo="download-movie";break;default:changeTo=0}mediaPlayerContainer=$('#'+id).parents(".media-player").attr('id');MediaPlayer.changeOptionsSection(changeTo,mediaPlayerContainer,flash)},doPopup:function(url){var pop=window.open(url,'_blank','toolbar=no,status=no,resizable=yes,height=289,width=450,location=no, menubar=no');if(pop){return true}else{return false}},changeOptionsSection:function(changeTo,id){var downloadLink="",mediaPlayer,languageText="",info,player=MediaPlayer.player,xmlUrl;mediaPlayer=$('#'+id);if(!changeTo){mediaPlayer.find(".additionalOptions").slideToggle(300)}else{if(mediaPlayer.find('div.'+changeTo).is(':hidden')){mediaPlayer.find(".additionalOptions > div:visible").not('.optionMenu').slideUp(200);setTimeout(function(){if(mediaPlayer.find('.additionalOptions').is(':hidden')){mediaPlayer.find("div.movies-listing, div.share-movie, div.embed-movie, div.download-movie").hide();mediaPlayer.find('.additionalOptions').show()}mediaPlayer.find(".additionalOptions li, .optionMenu").removeClass('active');mediaPlayer.find("div.movies-listing, div.share-movie, div.embed-movie, div.download-movie").hide();switch(changeTo){case"share-movie":mediaPlayer.find(".optionMenu").find('li:nth-child(2)').addClass('active');mediaPlayer.find('.shareUrl').val(mediaPlayer.find('.movie.active').find('a').data('sharelink'));break;case"embed-movie":mediaPlayer.find(".optionMenu").find('li:nth-child(3)').addClass('active');xmlUrl=mediaPlayer.find('.movie.active').find('a').attr('data-xmlUrl');mediaPlayer.find('.embed-movie').find('textarea').text('<object width="'+mediaPlayer.find('.movieWidth').val()+'" height="'+mediaPlayer.find('.movieHeight').val()+'"><param name="movie" value="'+player+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="flashvars" value="xmlinfourl='+escape(xmlUrl)+'"></param><embed src="'+player+'" type="application/x-shockwave-flash" flashvars="xmlinfourl='+escape(xmlUrl)+'" allowscriptaccess="always" allowfullscreen="true" width="'+mediaPlayer.find('.movieWidth').val()+'" height="'+mediaPlayer.find('.movieHeight').val()+'"></embed></object>');break;case"download-movie":downloadLink=mediaPlayer.find(".download-movie").find('a');mediaPlayer.find(".optionMenu").find('li:nth-child(4)').addClass('active');info=mediaPlayer.find('.movie.active.active').find('.info');if(mediaPlayer.find('.movie.active').find('a').attr('href')==="#"){downloadLink.text("Den h�r filen finns inte tillg�nglig f�r nedladdning �nnu.")}else{downloadLink.text(downloadText+mediaPlayer.find('.movie.active').find('.info').find('h3').text()+languageText)}downloadLink.attr('href',mediaPlayer.find('.movie.active').find('a').attr('href'));break;default:mediaPlayer.find(".optionMenu").find('li:nth-child(1)').addClass('active')}mediaPlayer.find(".additionalOptions div."+changeTo).slideToggle(300)},250)}}},findPlayers:function(){if(swfobject.hasFlashPlayerVersion("10")){MediaPlayer.hasFlash=true}if(navigator.userAgent.match(/like Mac OS X/i)){MediaPlayer.iOS=true}else if(navigator.userAgent.search('Android')>-1){MediaPlayer.android=true}else if(navigator.userAgent.search('MSIE')>-1){MediaPlayer.IE=true}var movieDataContainer,mpid=0,mediaPlayerContainerID,movieWidth,movieHeight,poster,player=MediaPlayer.player,minimumEmbedWidth=MediaPlayer.minimumEmbedWidth,minimumEmbedHeight=MediaPlayer.minimumEmbedHeight,jwPlayerSetupObject;$('.media-player').each(function(){var movieRatio,mediaPlayerID="mediaPlayer_"+mpid,xmlUrl,customEmbedWidth=0,customEmbedHeight=0,movieLink,mediaPlayer,movieListing=$(this).find('.movies-listing'),isPopup=false,parentContainer,infoLayer=$(this).find('.infoLayer'),myScroll;$(this).removeClass('no-js');mediaPlayerContainerID="mediaPlayerContainer_"+mpid;$(this).attr('id',mediaPlayerContainerID).find('.mediaPlayer').attr('id','mediaPlayer_'+mpid).removeClass('.mediaPlayer');mediaPlayer=$(this).attr('id');parentContainer=$('#'+mediaPlayerID).parents('.media-player');if(MediaPlayer.iOS||MediaPlayer.android){if($(this).find('.additionalOptions div.movies-listing ul > li').size()>3){$(this).find('.additionalOptions').find('div.movies-listing ul').wrap('<div id="scrollWrapper'+mpid+'" style="position: relative; height: 300px; overflow: hidden;" />').css({'max-height':'2000px'});myScroll=new iScroll('scrollWrapper'+mpid,{hScrollbar:false,vScrollbar:true,hScroll:true,hideScrollbar:false,bounce:false})}}$(this).find('.additionalOptions').hide();mpid+=1;$(this).find('.movies-listing').find('li:first-child').find('.movie').addClass('active');movieDataContainer=$(this).find('.movies-listing').find('li:first-child').find('a:first-child');movieDataContainer.addClass('active');xmlUrl=movieDataContainer.attr('data-xmlUrl');movieWidth=movieDataContainer.attr('data-width');movieHeight=movieDataContainer.attr('data-height');movieRatio=movieWidth/movieHeight;poster=movieDataContainer.attr('data-poster');movieLink=movieDataContainer.attr('href');isPopup=($(this).hasClass('popup'))?true:false;if(MediaPlayer.iOS){movieLink=movieDataContainer.attr('data-iosMovieLink');if(movieLink===""){infoLayer.html(mediaPlayer.oldMovieNoFlash);infoLayer.show();parentContainer.append('<a href="#" class="moreOptionsNoFlash">'+moreOptionsText+'</a>')}else{infoLayer.hide()}}jwPlayerSetupObject={'width':movieWidth,'height':movieHeight,'image':poster,'xmlInfoUrl':xmlUrl,'controlbar':'bottom','controlbar.idlehide':false,'optionsFunc':'MediaPlayer.callOptions','popupFunc':'MediaPlayer.doPopup','screencolor':'000000','seamlesstabbing':true,'modes':[{type:'flash',src:player},{type:'html5',config:{'file':movieLink,'provider':'video'}},{type:'download',config:{'file':movieLink}}]};if(MediaPlayer.IE&&!MediaPlayer.hasFlash){jwPlayerSetupObject.modes=[{type:'html5',config:{'file':movieLink,'provider':'video'}},{type:'download',config:{'file':movieLink}}]}if(movieDataContainer.hasClass('live')){parentContainer.find('.optionMenu li:not(:nth-child(1), :nth-child(2))').addClass('inactive');if(MediaPlayer.iOS){jwPlayerSetupObject.modes=[{type:'html5',config:{'file':movieLink,provider:'video'}}]}else{jwPlayerSetupObject.modes=[{type:'flash',src:player}]}if(!MediaPlayer.hasFlash){infoLayer.html(MediaPlayer.liveNoFlash);infoLayer.show()}}else{parentContainer.find('.optionMenu li').show().width(112)}if(isPopup){jwPlayerSetupObject.ispopup=true;if(MediaPlayer.seek<0.1){MediaPlayer.seek=0.1}jwPlayerSetupObject.seek=MediaPlayer.seek;jwPlayerSetupObject.autostart=true;parentContainer.css('height','100%');$('html, body, #page').css('height','100%');jwPlayerSetupObject.events={onReady:function(){$('.media-player div:first-child').css({'height':'100%'});$('.media-player object').css({'height':'100%','width':'100%'})}}}else{if(parentContainer.find('.moreOptionsNoFlash').html()===null){parentContainer.append('<a href="#" class="moreOptionsNoFlash">'+moreOptionsText+'</a>')}jwPlayerSetupObject.events={onReady:function(){if(parentContainer.find('object').length===0&&movieLink==="#"){if(movieDataContainer.hasClass('live')){infoLayer.html(MediaPlayer.liveNoFlash)}else{infoLayer.html(MediaPlayer.oldMovieNoFlash)}infoLayer.show()}else{infoLayer.hide()}if(parentContainer.find('object').html()!=null){parentContainer.find('.moreOptionsNoFlash').remove();infoLayer.hide()}}}}jwplayer(mediaPlayerID).setup(jwPlayerSetupObject);$(this).find('.additionalOptions .optionMenu a').live('click',function(event){if(!$(this).parents('li').hasClass('inactive')){MediaPlayer.changeOptionsSection($(this).attr('class'),mediaPlayer)}event.preventDefault()});movieListing.find('li a').click(function(event){event.preventDefault()});movieListing.find('.movie').each(function(){$(this).click(function(event){movieDataContainer=$(this).find('a');if(movieDataContainer.hasClass('live')){parentContainer.find('.optionMenu li:not(:nth-child(1), :nth-child(2))').addClass('inactive')}else{parentContainer.find('.optionMenu li').removeClass('inactive')}movieListing.find('.movie').removeClass('active');movieListing.find('.movie').find('a').removeClass('active');$(this).parents('.movie').addClass('active');$(this).addClass('active');xmlUrl=movieDataContainer.attr('data-xmlUrl');movieWidth=movieDataContainer.attr('data-width');movieHeight=movieDataContainer.attr('data-height');movieRatio=movieWidth/movieHeight;poster=movieDataContainer.attr('data-poster');movieLink=movieDataContainer.attr('href');if(MediaPlayer.iOS){movieLink=movieDataContainer.attr('data-iosMovieLink');if(movieLink===""){infoLayer.html(mediaPlayer.oldMovieNoFlash);infoLayer.show()}else{infoLayer.hide()}}jwPlayerSetupObject={'width':movieWidth,'height':movieHeight,'image':poster,'xmlInfoUrl':xmlUrl,'controlbar':'bottom','optionsFunc':'MediaPlayer.callOptions','popupFunc':'MediaPlayer.doPopup','screencolor':'000000','seek':"0.01",'autostart':true,'seamlesstabbing':true,'modes':[{type:'flash',src:player},{type:'html5',config:{'file':movieLink,provider:'video'}},{type:'download',config:{'file':movieLink}}]};if(MediaPlayer.IE&&!MediaPlayer.hasFlash){jwPlayerSetupObject.modes=[{type:'html5',config:{'file':movieLink,'provider':'video'}},{type:'download',config:{'file':movieLink}}]}jwPlayerSetupObject.events={onReady:function(){if(MediaPlayer.hasFlash&&movieLink!="#"){infoLayer.hide()}}};jwplayer(mediaPlayerID).setup(jwPlayerSetupObject);if(!MediaPlayer.hasFlash&&movieLink==="#"){if(movieDataContainer.hasClass('live')){infoLayer.html(MediaPlayer.liveNoFlash)}else{infoLayer.html(MediaPlayer.oldMovieNoFlash)}infoLayer.show()}else{infoLayer.hide()}})});$(this).find(".shareUrl").live('click',function(event){$(this).select()});$(this).find(".embedChangeSize").live('click',function(event){var plusMinus=$(this).find('span');$(this).toggleClass('active');$(this).parents('.embed-movie').find('.proportions').toggle(0,function(){if($(this).is(':visible')){plusMinus.html('&ndash;')}else{plusMinus.html('+')}});event.preventDefault()});$(this).find(".embed-movie").find('textarea').live('click',function(event){$(this).select()});$(this).find('.movieWidth, .movieHeight').keyup(function(){var value=parseFloat($(this).val()),doEmbedChange=false,$theTextArea=$(this).parents('.embed-movie').find('textarea');if($(this).hasClass('movieWidth')){if(value>=minimumEmbedWidth){customEmbedWidth=value;customEmbedHeight=Math.round(value/movieRatio);$(this).parents('.embed-movie').find('.movieHeight').val(customEmbedHeight);doEmbedChange=true}}else{if(value>minimumEmbedHeight){customEmbedHeight=value;customEmbedWidth=Math.round(value*movieRatio);$(this).parents('.embed-movie').find('.movieWidth').val(customEmbedWidth);doEmbedChange=true}}if(doEmbedChange){$theTextArea.text('<object width="'+customEmbedWidth+'" height="'+customEmbedHeight+'"><param name="movie" value="'+player+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="flashvars" value="xmlinfourl='+escape(xmlUrl)+'"></param><embed src="'+player+'" type="application/x-shockwave-flash" flashvars="xmlinfourl='+escape(xmlUrl)+'" allowscriptaccess="always" allowfullscreen="true" width="'+customEmbedWidth+'" height="'+customEmbedHeight+'"></embed></object>');doEmbedChange=false}});$(this).find('.moreOptionsNoFlash').live('click',function(event){var toggleOptions=$(this).parents('.media-player').find(".additionalOptions");if((toggleOptions).is(':visible')){$(this).text(moreOptionsText).css("background-position","100% -182px !important;")}else{$(this).text(closeText).css("background-position","100% 11px !important;")}toggleOptions.slideToggle(300);event.preventDefault()})})}}}