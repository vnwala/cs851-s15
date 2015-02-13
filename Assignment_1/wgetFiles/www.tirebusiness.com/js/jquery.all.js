/*
AnythingSlider v1.6.2 minified using Google Closure Compiler
Original by Chris Coyier: http://css-tricks.com
Get the latest version: https://github.com/ProLoser/AnythingSlider
*/

(function(d){d.anythingSlider=function(i,j){var a=this,b;a.$el=d(i).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');a.$el.data("AnythingSlider",a);a.init=function(){a.options=b=d.extend({},d.anythingSlider.defaults,j);a.initialized=!1;d.isFunction(b.onBeforeInitialize)&&a.$el.bind("before_initialize",b.onBeforeInitialize);a.$el.trigger("before_initialize",a);a.$wrapper=a.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-"+b.theme); a.$window=a.$el.closest("div.anythingWindow");a.$controls=d('<div class="anythingControls"></div>').appendTo(b.appendControlsTo!==null&&d(b.appendControlsTo).length?d(b.appendControlsTo):a.$wrapper);a.win=window;a.$win=d(a.win);a.$nav=d('<ul class="thumbNav" />').appendTo(a.$controls);a.flag=!1;a.playing=!1;a.slideshow=!1;a.hovered=!1;a.panelSize=[];a.currentPage=b.startPanel=parseInt(b.startPanel,10)||1;a.adj=b.infiniteSlides?0:1;a.outerPad=[a.$wrapper.innerWidth()-a.$wrapper.width(),a.$wrapper.innerHeight()- a.$wrapper.height()];b.playRtl&&a.$wrapper.addClass("rtl");a.original=[b.autoPlay,b.buildNavigation,b.buildArrows];if(b.expand)a.$outer=a.$wrapper.parent(),a.$window.css({width:"100%",height:"100%"}),a.outerDim=[a.$outer.width(),a.$outer.height()],a.checkResize();a.updateSlider();a.$lastPage=a.$currentPage;a.runTimes=d("div.anythingSlider").index(a.$wrapper)+1;a.regex=RegExp("panel"+a.runTimes+"-(\\d+)","i");if(!d.isFunction(d.easing[b.easing]))b.easing="swing";b.pauseOnHover&&a.$wrapper.hover(function(){a.playing&& (a.$el.trigger("slideshow_paused",a),a.clearTimer(!0))},function(){a.playing&&(a.$el.trigger("slideshow_unpaused",a),a.startStop(a.playing,!0))});var c,e=b.hashTags?a.gotoHash()||b.startPanel:b.startPanel;a.setCurrentPage(e,!1);a.slideControls(!1);a.$wrapper.bind("mouseenter mouseleave",function(b){a.hovered=b.type==="mouseenter"?!0:!1;a.slideControls(a.hovered,!1)});d(document).keyup(function(c){var e;e=a.$wrapper.is(".activeSlider")&&!c.target.tagName.match("TEXTAREA|INPUT|SELECT")&&b.showMultiple=== !1;switch(c.which){case 9:c=d(":focus");e=c.closest(".anythingSlider");e[0]===a.$wrapper[0]&&(a.makeActive(),a.$window.scrollLeft(0),a.gotoPage(c.closest(".panel").index()+a.adj));break;case 39:e&&b.enableKeyboard&&a.goForward();break;case 37:e&&b.enableKeyboard&&a.goBack()}});c="slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");d.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(e,f){d.isFunction(b[f])&&a.$el.bind(c[e],b[f])});d.isFunction(b.onSlideComplete)&&a.$el.bind("slide_complete",function(){setTimeout(function(){b.onSlideComplete(a)},0)});a.initialized=!0;a.$el.trigger("initialized",a)};a.updateSlider=function(){a.$el.children(".cloned").remove();a.$nav.empty();a.$items=a.$el.children();a.pages=a.$items.length;b.showMultiple=parseInt(b.showMultiple,10)||1;if(b.showMultiple>1){if(b.showMultiple>a.pages)b.showMultiple=a.pages;a.adjustMultiple=b.infiniteSlides&& a.pages>1?0:parseInt(b.showMultiple,10)-1;a.pages=a.$items.length-a.adjustMultiple}if(a.pages<=1)b.autoPlay=!1,b.buildNavigation=!1,b.buildArrows=!1,a.$controls.hide(),a.$nav.hide(),a.$forward&&a.$forward.add(a.$back).hide();else{b.autoPlay=a.original[0];b.buildNavigation=a.original[1];b.buildArrows=a.original[2];a.$controls.show();a.$nav.show();a.$forward&&a.$forward.add(a.$back).show();a.buildNavigation();if(b.autoPlay)a.playing=!b.startStopped,a.buildAutoPlay();b.buildArrows&&a.buildNextBackButtons()}b.infiniteSlides&& a.pages>1&&(a.$el.prepend(a.$items.filter(":last").clone().addClass("cloned").removeAttr("id")),b.showMultiple>1?a.$el.append(a.$items.filter(":lt("+b.showMultiple+")").clone().addClass("cloned").addClass("multiple").removeAttr("id")):a.$el.append(a.$items.filter(":first").clone().addClass("cloned").removeAttr("id")),a.$el.find(".cloned").each(function(){d(this).find("a,input,textarea,select").attr("disabled","disabled");d(this).find("[id]").removeAttr("id")}));a.$items=a.$el.children().addClass("panel"); a.setDimensions();b.resizeContents?(b.width&&(a.$items.css("width",b.width),a.$wrapper.css("width",a.getDim(a.currentPage)[0])),b.height&&a.$wrapper.add(a.$items).css("height",b.height)):a.$win.load(function(){a.setDimensions()});if(a.currentPage>a.pages)a.currentPage=a.pages;a.setCurrentPage(a.currentPage,!1);a.$nav.find("a").eq(a.currentPage-1).addClass("cur")};a.buildNavigation=function(){var c,e,g;b.buildNavigation&&a.pages>1&&a.$items.filter(":not(.cloned)").each(function(f){var h=f+1;e=(h=== 1?"first":"")+(h===a.pages?"last":"");g=d('<a href="#"></a>').addClass("panel"+h).wrap('<li class="'+e+'" />');a.$nav.append(g.parent());d.isFunction(b.navigationFormatter)?(c=b.navigationFormatter(h,d(this)),g.html("<span>"+c+"</span>"),parseInt(g.find("span").css("text-indent"),10)<0&&g.addClass(b.tooltipClass).attr("title",c)):g.html("<span>"+h+"</span>");g.bind(b.clickControls,function(c){if(!a.flag&&b.enableNavigation)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.gotoPage(h),b.hashTags&& a.setHash(h);c.preventDefault()})})};a.buildNextBackButtons=function(){if(!a.$forward)a.$forward=d('<span class="arrow forward"><a href="#"><span>'+b.forwardText+"</span></a></span>"),a.$back=d('<span class="arrow back"><a href="#"><span>'+b.backText+"</span></a></span>"),a.$back.bind(b.clickArrows,function(b){a.goBack();b.preventDefault()}),a.$forward.bind(b.clickArrows,function(b){a.goForward();b.preventDefault()}),a.$back.add(a.$forward).find("a").bind("focusin focusout",function(){d(this).toggleClass("hover")}), a.$wrapper.prepend(a.$forward).prepend(a.$back),a.$arrowWidth=a.$forward.width()};a.buildAutoPlay=function(){if(!(a.$startStop||a.pages<2))a.$startStop=d("<a href='#' class='start-stop'></a>").html("<span>"+(a.playing?b.stopText:b.startText)+"</span>"),a.$controls.prepend(a.$startStop),a.$startStop.bind(b.clickSlideshow,function(c){b.enablePlay&&(a.startStop(!a.playing),a.playing&&a.goForward(!0));c.preventDefault()}).bind("focusin focusout",function(){d(this).toggleClass("hover")}),a.startStop(a.playing)}; a.checkResize=function(b){clearTimeout(a.resizeTimer);a.resizeTimer=setTimeout(function(){var e=a.$outer.width(),d=a.$outer[0].tagName==="BODY"?a.$win.height():a.$outer.height(),f=a.outerDim;if(f[0]!==e||f[1]!==d)a.outerDim=[e,d],a.setDimensions(),a.gotoPage(a.currentPage,a.playing,null,1);typeof b==="undefined"&&a.checkResize()},500)};a.setDimensions=function(){var c,e,g,f,h,i=0,k=b.showMultiple>1?b.width||a.$window.width()/b.showMultiple:a.$window.width(),j=a.$win.width();b.expand&&(c=a.$outer.width()- a.outerPad[0],e=a.$outer.height()-a.outerPad[1],a.$wrapper.add(a.$window).add(a.$items).css({width:c,height:e}),k=b.showMultiple>1?c/b.showMultiple:c);a.$items.each(function(l){g=d(this).children("*");b.resizeContents?(c=parseInt(b.width,10)||k,e=parseInt(b.height,10)||a.$window.height(),d(this).css({width:c,height:e}),g.length&&g[0].tagName==="EMBED"&&g.attr({width:"100%",height:"100%"}),g.length===1&&g.css({width:"100%",height:"100%"})):(c=d(this).width(),h=c>=j?!0:!1,g.length===1&&h&&(f=g.width()>= j?k:g.width(),d(this).css("width",f),g.css("max-width",f),c=f),c=h?b.width||k:c,d(this).css("width",c),e=d(this).outerHeight(),d(this).css("height",e));a.panelSize[l]=[c,e,i];i+=c});a.$el.css("width",i<b.maxOverallWidth?i:b.maxOverallWidth)};a.getDim=function(c){var c=b.infiniteSlides&&a.pages>1?c:c-1,e,d=a.panelSize[c][0],f=a.panelSize[c][1];if(b.showMultiple>1)for(e=1;e<b.showMultiple;e++)d+=a.panelSize[(c+e)%b.showMultiple][0],f=Math.max(f,a.panelSize[c+e][1]);return[d,f]};a.goForward=function(c){a.gotoPage(a.currentPage+ parseInt(b.changeBy,10)*(b.playRtl?-1:1),c)};a.goBack=function(c){a.gotoPage(a.currentPage+parseInt(b.changeBy,10)*(b.playRtl?1:-1),c)};a.gotoPage=function(c,e,d,f){e!==!0&&(e=!1,a.startStop(!1));b.changeBy!==1&&(c<0&&(c+=a.pages),c>a.pages&&(c-=a.pages));if(!(a.pages<=1)){a.$lastPage=a.$currentPage;if(typeof c!=="number")c=b.startPanel,a.setCurrentPage(c);if(!e||!b.isVideoPlaying(a))c>a.pages+1-a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?1:a.pages),c<a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?a.pages: 1),a.currentPage=c>a.pages?a.pages:c<1?1:a.currentPage,a.$currentPage=a.$items.eq(a.currentPage-a.adj),a.exactPage=c,a.$targetPage=a.$items.eq(c===0?a.pages-a.adj:c>a.pages?1-a.adj:c-a.adj),a.$el.trigger("slide_init",a),a.slideControls(!0,!1),e!==!0&&(e=!1),(!e||b.stopAtEnd&&c===a.pages)&&a.startStop(!1),a.$el.trigger("slide_begin",a),b.resizeContents||(e=a.getDim(c),a.$wrapper.filter(":not(:animated)").animate({width:e[0],height:e[1]},{queue:!1,duration:f||b.animationTime,easing:b.easing})),a.$el.filter(":not(:animated)").animate({left:-a.panelSize[b.infiniteSlides&& a.pages>1?c:c-1][2]},{queue:!1,duration:f||b.animationTime,easing:b.easing,complete:function(){a.endAnimation(c,d)}})}};a.endAnimation=function(c,e){c===0?(a.$el.css("left",-a.panelSize[a.pages][2]),c=a.pages):c>a.pages&&(a.$el.css("left",-a.panelSize[1][2]),c=1);a.exactPage=c;a.setCurrentPage(c,!1);a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage");a.hovered||a.slideControls(!1);a.$el.trigger("slide_complete",a);typeof e==="function"&&e(a);b.autoPlayLocked&&!a.playing&&setTimeout(function(){a.startStop(!0)}, b.resumeDelay-b.delay)};a.setCurrentPage=function(c,e){c=parseInt(c,10);c>a.pages+1-a.adj&&(c=a.pages-a.adj);c<a.adj&&(c=1);b.buildNavigation&&a.$nav.find(".cur").removeClass("cur").end().find("a").eq(c-1).addClass("cur");!b.infiniteSlides&&b.stopAtEnd&&(a.$wrapper.find("span.forward")[c===a.pages?"addClass":"removeClass"]("disabled").end().find("span.back")[c===1?"addClass":"removeClass"]("disabled"),c===a.pages&&a.playing&&a.startStop());if(!e){var d=a.getDim(c);a.$wrapper.css({width:d[0],height:d[1]}).add(a.$window).scrollLeft(0); a.$el.css("left",-a.panelSize[b.infiniteSlides&&a.pages>1?c:c-1][2])}a.currentPage=c;a.$currentPage=a.$items.eq(c-a.adj).addClass("activePage");a.makeActive()};a.makeActive=function(){a.$wrapper.is(".activeSlider")||(d(".activeSlider").removeClass("activeSlider"),a.$wrapper.addClass("activeSlider"))};a.gotoHash=function(){var b=a.win.location.hash.match(a.regex);return b===null?"":parseInt(b[1],10)};a.setHash=function(b){var e="panel"+a.runTimes+"-",d=a.win.location.hash;if(typeof d!=="undefined")a.win.location.hash= d.indexOf(e)>0?d.replace(a.regex,e+b):d+"&"+e+b};a.slideControls=function(c){var d=c?0:b.animationTime,g=c?b.animationTime:0,f=c?1:0,h=c?0:1;b.toggleControls&&a.$controls.stop(!0,!0).delay(d)[c?"slideDown":"slideUp"](b.animationTime/2).delay(g);b.buildArrows&&b.toggleArrows&&(!a.hovered&&a.playing&&(h=1,f=0),a.$forward.stop(!0,!0).delay(d).animate({right:h*a.$arrowWidth,opacity:f},b.animationTime/2),a.$back.stop(!0,!0).delay(d).animate({left:h*a.$arrowWidth,opacity:f},b.animationTime/2))};a.clearTimer= function(b){if(a.timer&&(a.win.clearInterval(a.timer),!b&&a.slideshow))a.$el.trigger("slideshow_stop",a),a.slideshow=!1};a.startStop=function(c,d){c!==!0&&(c=!1);if(c&&!d)a.$el.trigger("slideshow_start",a),a.slideshow=!0;a.playing=c;b.autoPlay&&(a.$startStop.toggleClass("playing",c).html("<span>"+(c?b.stopText:b.startText)+"</span>"),parseInt(a.$startStop.find("span").css("text-indent"),10)<0&&a.$startStop.addClass(b.tooltipClass).attr("title",c?"Stop":"Start"));c&&b.resumeOnVideoEnd?(a.clearTimer(!0), a.timer=a.win.setInterval(function(){b.isVideoPlaying(a)||a.goForward(!0)},b.delay/2)):a.clearTimer()};a.init()};d.anythingSlider.defaults={width:null,height:null,expand:!1,resizeContents:!0,showMultiple:!1,tooltipClass:"tooltip",theme:"default",startPanel:1,changeBy:1,hashTags:!0,infiniteSlides:!0,enableKeyboard:!0,buildArrows:!0,toggleArrows:!1,buildNavigation:!0,enableNavigation:!0,toggleControls:!1,appendControlsTo:null,navigationFormatter:null,forwardText:"&raquo;",backText:"&laquo;",enablePlay:!0, autoPlay:!0,autoPlayLocked:!1,startStopped:!1,pauseOnHover:!0,stopAtEnd:!1,playRtl:!1,startText:"Start",stopText:"Stop",delay:3E3,resumeDelay:15E3,animationTime:600,easing:"swing",clickArrows:"click",clickControls:"click focusin",clickSlideshow:"click",resumeOnVideoEnd:!0,addWmodeToObject:"opaque",isVideoPlaying:function(){return!1},maxOverallWidth:32766};d.fn.anythingSlider=function(i,j){return this.each(function(){var a,b=d(this).data("AnythingSlider");(typeof i).match("object|undefined")?b?b.updateSlider(): new d.anythingSlider(this,i):/\d/.test(i)&&!isNaN(i)&&b&&(a=typeof i==="number"?i:parseInt(d.trim(i),10),a>=1&&a<=b.pages&&b.gotoPage(a,!1,j))})}})(jQuery);


/* --------------------------------------------------------------------------- */

(function($) {
    $.fn.extend({
        jsCarousel: function(options) {
            var settings = $.extend({
                scrollspeed: 1500,
                delay: 5000,
                itemstodisplay: 5,
                autoscroll: false,
                circular: false,
                masked: true,
                onthumbnailclick: null,
                orientation: 'h'
            }, options);
            return this.each(function() {
                var oclass = 'horizontal';
                if (settings.orientation == 'v')
                    oclass = 'vertical';
                var slidercontents = $(this).addClass('jscarousal-contents-' + oclass + '');
                var slider = $('<div/>').addClass('jscarousal-' + oclass + '').attr('id', slidercontents.attr('id'));
                var backbutton = $('<div/>').addClass('jscarousal-' + oclass + '-back');
                var forwardbutton = $('<div/>').addClass('jscarousal-' + oclass + '-forward');

                slidercontents.removeAttr('id');
                slidercontents.before(slider);
                slider.append(backbutton);
                slider.append(slidercontents);
                slider.append(forwardbutton);

                var total = $('> div', slidercontents).css('display', 'none').length;
                var index = 0;
                var start = 0;
                var current = $('<div/>');
                var noOfBlocks;
                var interval;
                var display = settings.itemstodisplay;
                var speed = settings.scrollspeed;
                var top;
                var left;
                var height;
                var containerHeight;
                var containerWidth;
                var direction = "forward";
                var scrolling = true;

                function initialize() {
                    index = -1;
                    noOfBlocks = parseInt(total / display);
                    if (total % display > 0) noOfBlocks++;
                    index = noOfBlocks - 1;
                    var startIndex = 0;
                    var endIndex = display;
                    var copy = false;
                    var allElements = $('> div', slidercontents);
                    $('> div', slidercontents).remove();
                    if (settings.masked)
                        allElements.addClass('thumbnail-inactive').hover(function() { $(this).removeClass('thumbnail-inactive').addClass('thumbnail-active'); }, function() { $(this).removeClass('thumbnail-active').addClass('thumbnail-inactive'); })
                    for (var i = 0; i < noOfBlocks; i++) {
                        if (total > display) {
                            startIndex = i * display;
                            endIndex = startIndex + display;
                            if (endIndex > total) {
                                startIndex -= (endIndex - total);
                                endIndex = startIndex + display;
                            }
                        }
                        else {
                            startIndex = 0;
                            endIndex = total;
                        }
                        var wrapper = $('<div/>')
                        allElements.slice(startIndex, endIndex).each(function(index, el) {
                            if (!copy)
                                wrapper.append(el);
                            else wrapper.append($(el).clone(true));
                        });
                        wrapper.find("img").click(
                         function() {
                             if (settings.onthumbnailclick != null) {
                                 settings.onthumbnailclick($(this).attr('src'));
                             }
                         });
                        slidercontents.append(wrapper);
                    }
                    if (settings.onthumbnailclick != null)
                        $('> div > div', slidercontents).css('cursor', 'pointer');

                    $('> div', slidercontents).addClass('hidden');
                    $('> div > div', slidercontents).css('display', '');

                    /*vertical*/
                    if (settings.orientation == 'v') {
                        top = $('> div:eq(' + index + ')', slidercontents).css('top');
                        if (top == 'auto') top = "0px";
                        containerHeight = slidercontents.height();
                        height = slidercontents.get(0).offsetHeight;
                        $('> div', slidercontents).css('top', '-' + containerHeight + 'px');
                        $('> div:eq(' + index + ')', slidercontents).stop(false, true).animate({ 'top': top }, speed, function() { scrolling = false; });
                    }

                    /*horizontal*/
                    if (settings.orientation == 'h') {
                        left = $('> div:eq(' + index + ')', slidercontents).css('left');
                        containerWidth = slidercontents.width();
                        height = slidercontents.get(0).offsetHeight;
                        $('> div', slidercontents).css('left', '-' + containerWidth + 'px');
                        $('> div:eq(' + index + ')', slidercontents).stop(false, true).animate({ left: 0 }, speed, function() { scrolling = false; });
                    }
                    $('> div:eq(' + index + ')', slidercontents).addClass('visible').removeClass('hidden');

                    slider.mouseenter(function() { if (settings.autoscroll) stopAnimate(); }).mouseleave(function() { if (settings.autoscroll) animate(); });
                    if (settings.autoscroll)
                        animate();
                    forwardbutton.click(function() {
                        if (!scrolling) {
                            direction = "forward";
                            if (settings.circular)
                                if (index <= 0) index = noOfBlocks;
                            showThumbs();
                        }
                    });
                    backbutton.click(function() {
                        if (!scrolling) {
                            direction = "backward";
                            if (settings.circular)
                                if (index >= noOfBlocks - 1) index = -1;
                            showThumbs();
                        }
                    });
                }
                initialize();
                function stopAnimate() {
                    scrolling = false;
                    clearTimeout(interval);
                    slider.children().clearQueue();
                    slider.children().stop(false, true);
                }
                function animate() {
                    clearTimeout(interval);
                    if (settings.autoscroll)
                        interval = setTimeout(changeSlide, settings.delay);
                }
                function changeSlide() {
                    if (direction == "forward") {
                        if (index <= 0) index = noOfBlocks;
                    } else {
                        if (index >= noOfBlocks - 1) { index = -1; }
                    }
                    showThumbs();
                    interval = setTimeout(changeSlide, settings.delay);
                }
                function getDimensions(value) {
                    return value + 'px';
                }
                function showThumbs() {
                    scrolling = true;
                    var current = $('.visible', slidercontents);
                    var scrollSpeed = speed;

                    if (direction == "forward") {
                        index--;
                        if (index >= 0) {
                            if (settings.orientation == 'v') {
                                $('>div:eq(' + index + ')', slidercontents).css('top', getDimensions(containerHeight)).removeClass('hidden').addClass('visible').stop(false, true).animate({ 'top': top }, scrollSpeed, function() { scrolling = false; });
                                current.stop(false, true).animate({ 'top': '-=' + getDimensions(containerHeight) }, scrollSpeed, function() {
                                    $(this).removeClass('visible').addClass('hidden');
                                    $(this).css('top', top);
                                    scrolling = false;
                                });
                            }
                            else {
                                $('>div:eq(' + index + ')', slidercontents).css('left', getDimensions(containerWidth)).removeClass('hidden').addClass('visible').stop(false, true).animate({ 'left': '-=' + getDimensions(containerWidth) }, scrollSpeed, function() { scrolling = false; });
                                current.stop(false, true).animate({ 'left': '-=' + getDimensions(containerWidth) }, scrollSpeed, function() {
                                    $(this).removeClass('visible').addClass('hidden');
                                    $(this).css('left', left);
                                    scrolling = false;
                                });
                            }
                        } else index = 0;

                    }
                    else if (direction == "backward") {
                        index++;
                        if (index < noOfBlocks) {
                            if (settings.orientation == 'v') {
                                $('>div:eq(' + index + ')', slidercontents).removeClass('hidden').addClass('visible').css({
                                    'top': getDimensions(-containerHeight)
                                }).stop(false, true).animate({ 'top': top }, scrollSpeed, function() { scrolling = false; });

                                current.stop(false, true).animate({ 'top': '+=' + getDimensions(containerHeight) }, scrollSpeed,
                            function() {
                                $(this).removeClass('visible').addClass('hidden');
                                $(this).css('top', getDimensions(-containerHeight));
                                scrolling = false;
                            });
                            }
                            else {
                                $('>div:eq(' + index + ')', slidercontents).removeClass('hidden').addClass('visible').css({
                                    'left': getDimensions(-containerWidth)
                                }).stop(false, true).animate({ 'left': '+=' + getDimensions(containerWidth) }, scrollSpeed, function() { scrolling = false; });

                                current.stop(false, true).animate({ 'left': '+=' + getDimensions(containerWidth) }, scrollSpeed,
                            function() {
                                $(this).removeClass('visible').addClass('hidden');
                                $(this).css('left', getDimensions(-containerWidth));
                                scrolling = false;
                            });
                            }

                        } else index = noOfBlocks - 1;
                    }

                }
            });
        }
    });
})(jQuery);

/* --------------------------------------------------------------------------- */
