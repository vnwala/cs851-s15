;(function ($) {

var processEmbeds = function(){
    var envDomain = 'www.washingtonpost.com',
        envPath = 'posttv',
        w,
        thisw,
        $thisw,
        params = [],
        paramStr = '',
        t,
        e,
        au,
        src,
        srcHost,
        srcPb,
        uuid,
        objectId,
        contentId,
        context,
        autoplay = false,
        truthTeller = false,
        isLiveVideo = false,
        isLiveBlog = false,
        initTime = new Date().getTime(),
        waitForjQueryTimeout = 5000,
        ua = window.navigator.userAgent,
        iosUA = ua && ua.match(/(iPhone|iPad).*Version\/([0-9]*)(\.[0-9]*).*Safari/),
        isOldIos = iosUA && iosUA[2] && typeof parseInt(iosUA[2]) === 'number' ? parseInt(iosUA[2]) < 6 : false,
        isMobileOrTablet = ua && ua.match(/(iPhone|iPad|Android)/),
        doLinkoff = false,
        doIframeOnLoad = false,
        truthTellerHeight = 243,
        offsetTop,
        nthVideoOnPage,
        liveUuids = ['92d280a2-7d90-11e0-b6cc-e4e4a8a38cf0', 'cbf7a484-7d90-11e0-b6cc-e4e4a8a38cf0'],
        tmplCss = '<link rel="stylesheet" class="posttv-video-embed-css" href="http://' + envDomain + '/' + envPath + '/resources/css/posttv/posttv-video-embed.v3.css" />',
        tmplPromo = function(strings, truthTeller){
            var html = '<div class="ptv-promo" data-promo-size="' + strings.promoSize + '" style="background-image: url(' + strings.imrsUrl + ')">' +
                            '<div class="ptv-start-button video-promo absolute-center"></div>' +
                            '<div class="ptv-promo-info">' +
                                '<div class="ptv-promo-video-headline-container">' +
                                    '<span class="ptv-promo-video-headline">' + strings.headline + '</span>' +
                                    '<span class="ptv-promo-video-duration">' + strings.duration + '</span>' +
                                '</div>' +
                                '<span class="ptv-promo-logo"></span>' +
                            '</div>' +
                        '</div>';
            html += !truthTeller ? '' :
                        '<div class="tt-holder">' +
                            '<div class="truthteller tt-embed dkgrbg">' +
                                '<div class="teller-title-div column">' +
                                    '<h1 class="teller-title">' + strings.headline + '</h1>' +
                                    '<h5 class="teller-title-date">' + strings.duration + '</h5>' +
                                '</div>' +
                            '</div>' +
                            '<div class="tt-links medgrbg">' +
                                '<a href="http://truthteller.washingtonpost.com/" id="tt-how-it-works" target="_blank">Truth Teller</a>' +
                                '<a class="wapo-logo-white right" target="_blank" href="/posttv/c/video/' + strings.uuid + '"> </a>' +
                            '</div>' +
                        '</div>';
            return html;
        },
        tmplIframe = function(strings){
            return '<iframe frameborder="0" scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen src="' + strings.src + '"></iframe>';
        },
        getImrsUrl = function(src, width) {
            var widthBreakpoints = [300, 360, 400, 480, 540, 600, 650, 750, 800, 1024], // This array MUST be in ascending order for the rest of the fn to work
                imgWidth,
                imgHeight;
            for (var i=1; i<widthBreakpoints.length; i++) {
                if (width >= widthBreakpoints[i-1]) {
                    imgWidth = widthBreakpoints[i];
                } else {
                    break;
                }
            }
            if (width > imgWidth || !imgWidth) imgWidth = width;
            imgHeight = Math.ceil(imgWidth * .5625);
            return 'http://www.washingtonpost.com/wp-apps/imrs.php?src=' + encodeURIComponent(src) + '&w=' + imgWidth + '&h=' + imgHeight;
        },
        getSizeClass = function(width) {
            var oneEm = parseFloat($("body").css("font-size"));

            if (width <= 400) {
                return 'xs';
            } else if (width <= 480) {
                return 's';
            } else if (width <= 36.625 * oneEm) {
                return 'm';
            } else if (width <= 47.938 * oneEm) {
                return 'l';
            } else {
                return 'xl';
            }
        },
        getNiceDuration = function(ms) {
            var min, sec, toReturn;
            ms = (typeof ms != 'undefined') ? ms/1000 : 0;
            min = Math.floor(ms / 60);
            sec = Math.floor(ms % 60);
            sec = (sec < 10) ? '0' + sec : sec;
            toReturn = (ms != 0) ? '(' + min + ':' + sec + ')' : '';
            return toReturn;
        },
        sendEventToSplunk = function(evtType, evtName, errorCode, videoId, iframeSrc){
            var browser = '', browserOS = '', browserVersion = '';
            if (window.TWP && TWP.PostTV && TWP.PostTV.BrowserInfo) {
                browser = TWP.PostTV.BrowserInfo.browser;
                browserOS = TWP.PostTV.BrowserInfo.OS;
                browserVersion = TWP.PostTV.BrowserInfo.version;
            }

            document.domain == 'washingtonpost.com' && typeof window != "undefined" && window.jQuery && jQuery.ajax( {
                url: "http://videotracker.washingtonpost.com/index.html",
                dataType: 'jsonp',
                cache: false,
                data: {
                    page: document.title.replace('\"', '\\\"'),
                    channel: "wp - posttv",
                    type: "video",
                    browser: browser,
                    browserOS: browserOS,
                    browserVersion: browserVersion,
                    url: (evtType === 'event6_3' && iframeSrc) ? iframeSrc : document.URL,
                    HTTP_REFERER: document.referrer,
                    evtName: evtName,
                    evtType: evtType,
                    evtTime: new Date().getTime(),
                    errorCode: errorCode,
                    vendor: (isMobileOrTablet || truthTeller || isLiveVideo) ? 'oo' : 'jw',
                    offsetTop: offsetTop,
                    nthVideoOnPage: nthVideoOnPage,
                    videoId: videoId ? videoId : '',
                    sessionId: ((document.cookie.match(/s_vi=([^;]+)/) ? RegExp.$1 : '')),
                    playerType: 'posttv-embed'
                }
            } );
        },
        queueEventToSplunk = function(evtType, evtName, errorCode, videoId, iframeSrc) {
            if (window.jQuery) {
                sendEventToSplunk(evtType, evtName, errorCode, videoId, iframeSrc);
            } else if ((new Date().getTime() - initTime) < waitForjQueryTimeout) {
                setTimeout(function () {
                    queueEventToSplunk(evtType, evtName, errorCode, videoId, iframeSrc)
                }, 500);
            }
        }
        ;

    // Find the embeds
    w = $('.posttv-video-embed');

    // See if we're on a liveblog so as to avoid auto-initing anything
    isLiveBlog = $('.pb-f-liveblog-story-list').length > 0;

    // Load dependent CSS if needed
    if ($('.posttv-video-embed-css').length === 0) {
        $('head').append(tmplCss);
    }

    // For old browsers that struggle with iframe embeds e.g. iPad v1, open in a new page/tab instead of iframe
    if (isOldIos) {
        doLinkoff = true;
    }

    // Always preload the first embed's iframe on the page unless it is explicitly disabled
    if (w[0] && w[0].getAttribute('data-iframe-on-load') !== '0' && !doLinkoff && !isLiveBlog) {
        w[0].setAttribute('data-iframe-on-load', 1);
    }

    for (var i=0; i< w.length; i++){
        if (w[i].tagName.toLowerCase() == 'div' && w[i].getAttribute('data-processed')===null){

            thisw = w[i];
            $thisw = $(w[i]);

            // 0. Set up tracking data for later
            $thisw.attr('data-offset-top', Math.floor($thisw.offset().top));
            $thisw.attr('data-nth-video-on-page', i+1);

            // 1. Draw the promo template, and associated resize event handler for responsiveness
            truthTeller = thisw.getAttribute('data-is-truth-teller');
            truthTeller = truthTeller === 'true' || truthTeller == '1' ? true : false;

            thisw.innerHTML = tmplPromo({ 
                promoSize: getSizeClass($thisw.width()),
                imrsUrl: getImrsUrl(thisw.getAttribute('data-show-promo'), $thisw.width()),
                headline: thisw.getAttribute('data-headline'),
                duration: getNiceDuration(thisw.getAttribute('data-duration')),
                uuid: thisw.getAttribute('data-uuid')
            }, truthTeller);

            $(window).on('resize.ptv-promo.' + thisw.getAttribute('data-uuid'), (function(el, truthTeller){
                var $thisEmbed = $(el),
                    thisPromo = $thisEmbed.find('.ptv-promo')[0];
                return function() {
                    var newPromoSize = getSizeClass($thisEmbed.width());
                    if (thisPromo.getAttribute('data-promo-size') !== newPromoSize) {
                        thisPromo.setAttribute('data-promo-size', newPromoSize);
                    }
                }
            })(thisw, truthTeller));

            // 2. Figure out the src url
            uuid = thisw.getAttribute('data-uuid');
            objectId = thisw.getAttribute('data-object-id');
            autoplay = thisw.getAttribute('data-autoplay');
            t = thisw.getAttribute('data-initial-time');
            if (t) params.push('t=' + t);
            e = thisw.getAttribute('data-show-endscreen');
            if (!isNaN(e) && e) params.push('e=' + e);
            au = thisw.getAttribute('data-auto-init');
            if (au == 1 || au == "true") params.push('autoinit=true');

            for (var j = 0; j < liveUuids.length; j++) {
                if (liveUuids[j] === uuid) {
                    isLiveVideo = true;
                    break;
                }
            }

            if (!uuid) {
                isLiveVideo = true; // This assumes live events have their uuids removed after finished, so we can't tell if they are live with the above for-loop
            }

            if (isLiveVideo) {
                context = doLinkoff ? 'live' : 'embed-live';
                contentId = (objectId) ? objectId : uuid;
            } else {
                context = doLinkoff ? 'video' : 'embed';
                contentId = uuid;
            }

            params.push('autoplay=1'); // Signal the external player to autoinit and autoplay where possible

            if (params.length>0 && !doLinkoff) {
                paramStr = "?" + params.join("&");
            }

            srcHost = envDomain;
            srcPb = '/' + envPath + '/c/';
            src = (!contentId) ? 'about:blank' : 'http://' + srcHost + srcPb + context + '/' + contentId + paramStr;

            // 2.5 Start loading iframe in background if needed
            if (thisw.getAttribute('data-iframe-on-load') === '1') {
                doIframeOnLoad = true;
                $thisw.find('.ptv-promo').after(tmplIframe({src:src.replace('autoplay=1', '')}));
            }

            // 3. Set up the click handler
            $thisw.on('click.ptv-promo', '.ptv-promo', (function(contentId, el, truthTeller, src, doIframeOnLoad){
                return function() {
                    var $el = $(el),
                        $iframe = $el.find('iframe');
                    offsetTop = $el.data('offsetTop');
                    nthVideoOnPage = $el.data('nthVideoOnPage');
                    if (doLinkoff) {
                        window.open(src, '_blank');
                    } else {
                        if (!doIframeOnLoad || $iframe.data('ptvPromoReady') !== 1) {
                            $el.addClass('ptv-iframe-loading');
                            el.innerHTML = tmplIframe({src:src});
                            $iframe = $el.find('iframe');
                        }
                        $(el).off('click.ptv-promo');
                        $(window).off('resize.ptv-promo.' + el.getAttribute('data-uuid'));
                        if (el.offsetWidth / el.offsetHeight < 1.3) {
                            el.style.height = (el.offsetWidth * 9 / 16 + 10) + "px";
                            el.style.paddingBottom = "0";
                        }
                        if (truthTeller) {
                            var iframeHeight = el.offsetHeight;
                            el.style.height = iframeHeight + truthTellerHeight + "px";
                            el.style.paddingBottom = "0";
                        }
                        // If iframe is loaded in background, try to trigger a click on it
                        if (doIframeOnLoad) {
                            try {
                                if ($iframe[0]) {
                                    $iframe.css('z-index', 0);
                                    $iframe[0].contentWindow.jQuery('.ptv-promo').trigger('click');
                                    $(this).remove();
                                }
                            } catch(e) {
                                console.log(e, arguments);
                            }
                        }

                    }
                    queueEventToSplunk('event6_3', 'PostTV Promo Clicked', '', contentId, src);
                }
            })(contentId, thisw, truthTeller, src, doIframeOnLoad));

            // 4. Housekeeping
            thisw.setAttribute('data-processed', 1); // mark this embed wrapper as processed to avoid duplicate video embed
            if (!contentId) queueEventToSplunk('event996', 'Embed Script Missing Content ID', 'ptv_embedMissingContentID');

            // empty the flags to avoid issues when processing multiple videos
            uuid = '';
            objectId = '';
            contentId = '';
            context = 'embed';
            autoplay = false;
            truthTeller = false;
            isLiveVideo = false;
            params = [];
            paramStr = '';
            e = '';
            au = '';
            t = '';
            doIframeOnLoad = false;
        }
    }

};
processEmbeds();
window.postTvProcessEmbeds = window.postTvProcessEmbeds || processEmbeds;
})(window.jQuery);
