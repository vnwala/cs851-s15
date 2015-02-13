//get default page URL
var documentUrl = document.URL, loadContent = true, pageId = '';
//get default page title
var defaultTitle = document.title;

//method to get default page matas
function getDefaultMeta(propName) {
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == propName) {
            return metas[i].getAttribute("content");
        }
    }
    return "";
}


function xIndexOf(Val, Str, x){  
   if (x <= (Str.split(Val).length - 1)) {  
     Ot = Str.indexOf(Val);  
     if (x > 1) { for (var i = 1; i < x; i++) { var Ot = Str.indexOf(Val, Ot + 1) } }  
     return Ot;  
    } 
    else {console.log(Val + " Occurs less than " + x + " times"); return 0 }  
} 

function urlPushAnalytics(){
    var u = document.URL.split("/").slice(3).join("/");
    //console.log(u);
    ga('send', 'pageview', u);
    COMSCORE.beacon({
        c1:"2",
        c2: "9989804",
        c4 : u});
    /*_qevents.push({
        qacct: "p-SFE6CaGnHx1hE", 
        event: "refresh"
    });*/
}                


$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$.fn.scrollStopped = function(callback) {
    var $this = $(this), self = this;
    $this.scroll(function(){
        if ($this.data('scrollTimeout')) {
          clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,250,self));
    });
};

// Gamification Tabes
$(function() {
    $('.gamification_area .divTab').hide();
    $('.gamification_area .divTab:first').show();
    $('.gamification_area ul li:first a').addClass('active');

    $('.gamification_area ul li a').click(function() {
        $('.gamification_area ul li a').removeClass();
        $(this).addClass('active');
        var currentGamingTab = $(this).attr('href');
        $('.gamification_area .divTab').hide();
        $(currentGamingTab).show();
        return false;
    });

    $('#GamingTabBox_2 .divSubTab').hide();
    $('#GamingTabBox_2 #subTab2').show();
    $('.gamification_area #GamingTabBox_2').find('a').click(function() {
        $('#GamingTabBox_2').find('a').removeClass('active');
        $(this).addClass('active');

        var currentSubTab = $(this).attr('href');
        $('#GamingTabBox_2').find('.divSubTab').hide();
        $(currentSubTab).show();
        return false;
    });
});
// End Gamification Tabes

//content gallery function added my Mayank
/*(function ( $ ) {
    $.fn.contentGallery = function(){
        var galwrap = this.children('ul');
        var galitems = galwrap.children('li');
        //console.log(galitems.length);
        var galitemsfirst = galwrap.children('li:first');
        var galitemslast = galwrap.children('li:last');
        var nextBtn = this.find('.next');
        var prevBtn = this.find('.prev');

        
        var speed = 500;
        var liwidth = galitems.length;
        var item_width = galitems.width();
        var left_value = item_width * (-1);
        var ulWidth = liwidth * item_width;

        this.css('width', item_width);
        galwrap.css('width', ulWidth);
        galitems.css('width', item_width);
        galitemsfirst.before(galitemslast);
        galwrap.css({'left':left_value});
        
        prevBtn.click(function(){
            var left_indent = parseInt(galwrap.css('left')) + item_width;
            galwrap.animate({'left':left_indent},speed, function(){
                galitemsfirst.before(galitemslast);
                galwrap.css({'left':left_value});
                });
            return false;
        });
        
        nextBtn.click(function(){
            var left_indent = parseInt(galwrap.css('left')) - item_width;
            galwrap.animate({'left':left_indent},speed, function(){
                galitemslast.after(galitemsfirst);
                galwrap.css({'left':left_value});
                });
            return false;
        });

        return this;
    };
}( jQuery ));*/



 /* Site Capture Ad close**********************************************************/
 $(document).ready(function(){
     //console.log('ready');
     var htm = $('<div class="pageLoadAdBox" style="display:none"><div class="pageLoadAdBoxIn"><div class="pageLoadAdBoxCloseButton">X</div></div></div>');
     $('.main-holder').before(htm);

    $('.pageLoadAdBoxCloseButton, .pageLoadAdBox').on('click', function(){
        //$.cookie('siteCaptureDiv', 1, { path: '/' });
        sessionStorage.setItem("siteCaptureDiv", 1);
        //alert(sessionStorage.getItem("siteCaptureDiv"));
        $('.pageLoadAdBox').fadeOut(500);
    }); 
});

// Site Capture Ad close**********************************************************
/*alertBoxSmall *****************************************************************************/
$(function(){
    function launch() {
        $('#alertBoxSmall').lightbox_me({centered: true, onLoad: function() {
                $('#alertBoxSmall').find('input:first').focus()
            }});
    }
    $('.alertPrice').click(function() {
        $("#alertBoxSmall").lightbox_me({centered: true, onLoad: function() {
                $("#alertBoxSmall").find("input:first").focus();
                $('body').css('overflow', 'hidden');
            }});
        e.preventDefault();
    });
});
/*End alertBoxSmall *****************************************************************************/


/*commonForm *****************************************************************************/
$(function()
{
    function launch() {
        $('#commonForm').lightbox_me({clickentered: true, onLoad: function() {
                $('#commonForm').find('input:first').focus()
            }});
    }
    $('.setPrice').click(function() {
        $("#commonForm").lightbox_me({centered: true, onLoad: function() {
                $("#commonForm").find("input:first").focus();
                $('body').css('overflow', 'hidden');
            }});
        e.preventDefault();
    });
});
/*End commonForm *****************************************************************************/

// Top Search
$(function() {
    $('.top-search .icon').click(function() {
        if ($('.search-area-new').is(':hidden'))
        {
            $('.search-area-new').slideDown();
            $('.top-search .holder').addClass('active');

        } else {
            $('.search-area-new').slideUp();
            $('.top-search .holder').removeClass('active');
        }
    });
});
// End Top Search

// set character limit -------should be on homa page
$(function() {
    $(".carousel2 .block .area h3 a").each(function(i) {
        len = $(this).text().length;
        if (len > 41)
        {
            $(this).text($(this).text().substr(0, 41) + '...');
        }
    });
});
// End set character limit

// page init
jQuery(function() {
    initTabs();
    jcf.customForms.replaceAll();
    initGallery();
    initCycleCarousel();
    initDropDown();
    initOpenClose();
    initAccordion();
    initInputs();
    initSameHeight();
    initCustomHover();
    initSidebarLoading();
    initMobileNav();
    initCustomCycleGallery();
    initLoadContent();
    initSlideTable();
    initCompareSlider();
    initCustomPopup();
    initSlider();
    initFilterClear();
    initLightbox();
    initValidation();
    initAddItem();
    initFixedBlock();
    initImagesLoading();
});

jQuery(window).load(function() {
    initMasonry();
});

function initImagesLoading() {
    var win = jQuery(window);
    win.on('scroll resize orientationchange loadEvent', imgLoading);
    imgLoading();
    function getWindowHeight() {
        return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
    }
    function imgLoading() {
        jQuery('img[data-src]').each(function(ind) {
            var image = jQuery(this);
            if (image.offset().top <= win.scrollTop() + getWindowHeight()) {
                image.attr('src', image.attr('data-src')).removeAttr('data-src');
            }
        });
    }
}

// page layout init
function initFixedBlock() {
    var win = jQuery(window);
    jQuery('#content .content-holder').fixedSlideBlock({
        slideBlock: '#compare-target',
        extraHeight: 0,
        onInit: function(holder, fixedBlock, options) {
            var scrollBarWidth = 0;
            var self = this;
            var fakeBlock = jQuery('<div class="fake-fixed"></div>');
            fakeBlock.insertAfter(fixedBlock);
            win.bind('load', function() {
                if (($.browser.mozilla || $.browser.opera || $.browser.msie) && window.addEventListener) {
                    scrollBarWidth = window.innerWidth - jQuery('body').width();
                    resizeHandler();
                }
                win.bind('resize orientationchange', resizeHandler);
                resizeHandler();
            });
            function resizeHandler() {
                var winWidth = win.width() + scrollBarWidth;
                options.extraHeight = winWidth <= 1023 ? 0 : 0;
                fixedBlock.width(holder.width());
                fakeBlock.css({height: fixedBlock.outerHeight(true)});
            }
        }
    });
}

// add item init
function initAddItem() {
    jQuery('.compare-form').addItemToCompare({
        onChange: function(that) {
            jQuery(window).trigger('resize');
        }
    });
}

// form validation function
function initValidation() {
    var errorClass = 'error';
    var successClass = 'success';
    var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regPhone = /^[0-9]+$/;

    jQuery('form.validate-form').each(function() {
        var form = jQuery(this).attr('novalidate', 'novalidate');
        var successFlag = true;
        var inputs = form.find('input, textarea, select');

        // form validation function
        function validateForm(e) {
            successFlag = true;

            inputs.each(checkField);

            if (!successFlag) {
                e.preventDefault();
            }
        }

        // check field
        function checkField(i, obj) {
            var currentObject = jQuery(obj);
            var currentParent = currentObject.closest('.row');

            // not empty fields
            if (currentObject.hasClass('required')) {
                setState(currentParent, currentObject, !currentObject.val().length || currentObject.val() === currentObject.prop('defaultValue'));
            }
            // correct email fields
            if (currentObject.hasClass('required-email')) {
                setState(currentParent, currentObject, !regEmail.test(currentObject.val()));
            }
            // correct number fields
            if (currentObject.hasClass('required-number')) {
                setState(currentParent, currentObject, !regPhone.test(currentObject.val()));
            }
            // correct number fields
            if (currentObject.hasClass('required-phone')) {
                setState(currentParent, currentObject, checkPhone(currentObject));
            }
            // something selected
            if (currentObject.hasClass('required-select')) {
                setState(currentParent, currentObject, currentObject.get(0).selectedIndex === 0);
            }
        }

        function checkPhone(currentObject) {
            var currentParent = currentObject.closest('.row');
            var inputs = currentParent.find('.required-phone');
            for (var i = 0; i < inputs.length; i++) {
                if (!regPhone.test(inputs.eq(i).val())) {
                    return true;
                }
            }
            return false;
        }

        // set state
        function setState(hold, field, error) {
            hold.removeClass(errorClass).removeClass(successClass);
            if (error) {
                hold.addClass(errorClass);
                field.one('focus', function() {
                    hold.removeClass(errorClass).removeClass(successClass);
                });
                successFlag = false;
            } else {
                hold.addClass(successClass);
            }
        }

        // form event handlers
        form.submit(validateForm);
    });
}

function initFilterClear() {
    jQuery('.filter-clear').each(function() {
        var holder = jQuery(this);
        var btnclearAll = holder.find('.all');
        var categories = holder.find('.category');

        categories.each(function() {
            var category = jQuery(this);
            var subCategories = category.find('.filter-list a');
            subCategories.click(function(e) {
                e.preventDefault();
                removeCategory(jQuery(this), category);
            });

        });

        btnclearAll.click(function(e) {
            e.preventDefault();
            clearAll();
        });

        function removeCategory(subcategory, category) {
            var parentItem = subcategory.closest('li');
            var siblingsItems = parentItem.siblings();
            parentItem.remove();
            if (!siblingsItems.length)
                category.remove();
        }

        function clearAll() {
            holder.empty();
        }
    });
}

function initSlider() {
    jQuery('.price-slider').each(function() {
        var holder = jQuery(this);
        var fromField = holder.find('input.from');
        var toField = holder.find('input.to');
        var fromText = holder.find('.amount .from').text(formatText(fromField.val()));
        var toText = holder.find('.amount .to').text(formatText(toField.val()));

        var slider = holder.find('.slider');
        slider.slider({
            range: true,
            min: holder.data('min') || 0,
            step: holder.data('step') || 1,
            max: holder.data('max') || 100,
            values: [+fromField.val(), +toField.val()],
            slide: function(event, ui) {
                fromField.val(ui.values[0]);
                toField.val(ui.values[1]);
                fromText.text(formatText(fromField.val()));
                toText.text(formatText(toField.val()));
            },
            change: function(event, ui) {
                fromField.val(ui.values[0]);
                toField.val(ui.values[1]);
                fromText.text(formatText(fromField.val()));
                toText.text(formatText(toField.val()));
            }
        });
    });

    function formatText(text) {
        if (text.length > 3) {
            var newArray = [];
            var k = 0;
            var newStr = '';
            for (var i = text.length - 1; i >= 0; i--) {
                var strChar = text.substr(i, 1);
                if (k % 3 == 0 && k != 0)
                    newArray.push(',');
                newArray.push(strChar);
                k++;
            }
            for (var i = newArray.length - 1; i >= 0; i--) {
                newStr += newArray[i];
            }
            return newStr;
        }
        return text;
    }

    jQuery('.size-slider').each(function() {
        var holder = jQuery(this);
        var fromField = holder.find('input.from');
        var toField = holder.find('input.to');
        var fromText = holder.find('.amount .from').text(formatText(fromField.val()));
        var toText = holder.find('.amount .to').text(formatText(toField.val()));

        var slider = holder.find('.slider');
        slider.slider({
            range: true,
            min: holder.data('min') || 0,
            step: holder.data('step') || 1,
            max: holder.data('max') || 20,
            values: [+fromField.val(), +toField.val()],
            slide: function(event, ui) {
                fromField.val(ui.values[0]);
                toField.val(ui.values[1]);
                fromText.text(fromField.val());
                toText.text(toField.val());
            },
            change: function(event, ui) {
                fromField.val(ui.values[0]);
                toField.val(ui.values[1]);
                fromText.text(fromField.val());
                toText.text(toField.val());
            }
        });
        setTimeout(function() {
            holder.find('.amount').has('.from').eq(0).appendTo(slider.find('.ui-slider-handle').eq(0));
            holder.find('.amount').has('.to').eq(0).appendTo(slider.find('.ui-slider-handle').eq(1));
        }, 100);
    });

    jQuery('.slider-priority').each(function() {
        var holder = jQuery(this);
        var fromField = holder.find('input.from');

        var slider = holder.find('.slider');
        slider.slider({
            range: 'min',
            min: holder.data('min') || 0,
            step: holder.data('step') || 1,
            value: +fromField.val(),
            slide: function(event, ui) {
                fromField.val(ui.value);
            },
            change: function(event, ui) {
                fromField.val(ui.value);
            }
        });
    });
}

function initMasonry() {
    var win = jQuery(window);
    jQuery('.masonry-holder').each(function() {
        var holder = jQuery(this);
        var masonryTarget = holder.find('.masonry-target');
        var blockHolders = masonryTarget.find('.page-holder');
        holder.data('blockHolders', blockHolders);
        blockHolders.each(function() {
            var holder = jQuery(this);
            holder.data({
                'initFakeHeight': init,
                'destroyFakeHeight': destroy
            });
            function init() {
                refreshHeight();
                win.on('resize.masonry orientationchange.masonry', refreshHeight);
            }
            function destroy() {
                win.off('resize.masonry orientationchange.masonry', refreshHeight);
                holder.css({height: ''});
            }
            function refreshHeight() {
                var items = holder.find('.masonry-item');
                if (items.length) {
                    holder.css({height: items.eq(items.length - 1).offset().top + items.eq(items.length - 1).innerHeight() - items.eq(0).offset().top});
                }
            }
        });

        ResponsiveHelper.addRange({
            '..767': {
                on: function() {
                    if (masonryTarget.data('masonry')) {
                        masonryTarget.masonry('destroy');
                    }
                    holder.data('blockHolders').each(function() {
                        var holder = jQuery(this);
                        holder.data('destroyFakeHeight')();
                    });
                }
            },
            '768..': {
                on: function() {
                    masonryTarget.masonry({
                        columnWidth: 1,
                        itemSelector: '.masonry-item'
                    });
                    holder.data('blockHolders').each(function() {
                        var holder = jQuery(this);
                        holder.data('initFakeHeight')();
                    });
                }
            }
        });
        holder.infinityScrollContentMasonry({
            onLoad: function(newContent) {
                if (masonryTarget.data('masonry')) {
                    masonryTarget.masonry('appended', newContent);
                    win.trigger('resize.masonry loadEvent');
                }
            }
        });
    });
}

function initCustomPopup() {
    var win = jQuery(window);
    var body = jQuery('body');
    var hoverClass = 'hover';
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    var holders = jQuery('.compare-area .popup-holder, .compare-block .type-list .popup-holder');
    var hideFlag = true;
    var activeBlock = null;
    holders.each(function() {
        var holder = jQuery(this);
        var popup = holder.find('.custom-popup');
        holder.data('popup', popup);
        if (isTouchDevice) {
            holder.on(navigator.msPointerEnabled ? 'MSPointerDown' : 'touchstart', function() {
                hidePopup(holder);
                showPopup(holder);
            });
        } else {
            holder.on({
                'mouseenter': function() {
                    setTimeout(function() {
                        showPopup(holder);
                    }, 10);
                },
                'mouseleave': function() {
                    setTimeout(function() {
                        hidePopup();
                    }, 10);
                }
            });
        }

    });
    if (isTouchDevice) {
        body.bind(navigator.msPointerEnabled ? 'MSPointerDown' : 'touchstart', function(e) {
            var target = jQuery(e.target);
            if (activeBlock) {
                if (!target.is(activeBlock) && target.closest(activeBlock).length == 0) {
                    hidePopup();
                }
                ;
            }
        });
        win.on('resize orientationchange', function() {
            repositionPopup();
        });
    }


    function hidePopup() {
        if (hideFlag) {
            if (activeBlock) {
                activeBlock.removeClass(hoverClass);
                if (activeBlock.data('clonedPopup')) {
                    activeBlock.data('clonedPopup').remove();
                    activeBlock.removeData('clonedPopup');
                }
                activeBlock = null;
            }
        }
    }
    function showPopup(holder) {
        holder.addClass(hoverClass);
        activeBlock = holder;
        if (activeBlock.data('popup').length) {
            activeBlock.data('clonedPopup', activeBlock.data('popup').clone(true).appendTo(body));
            repositionPopup();
            activeBlock.data('clonedPopup').on({
                'mouseenter': function() {
                    hideFlag = false;
                },
                'mouseleave': function() {
                    hideFlag = true;
                    hidePopup(holder);
                }
            });
        }
    }
    function repositionPopup() {
        if (activeBlock) {
            if (activeBlock.data('clonedPopup')) {
                activeBlock.data('clonedPopup').css({
                    left: activeBlock.data('popup').offset().left,
                    top: activeBlock.data('popup').offset().top
                });
            }
        }
    }
}

function initCompareSlider() {
    jQuery('.compare-slider-holder').compareSlider();
}

function initSlideTable() {
    jQuery('.table-area').slideTable();
}

// init gallery
function initGallery() {
    var gallery = jQuery('.categories-list').eq(0);
    var galleryHTML = gallery.html();
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    ResponsiveHelper.addRange({
        '..767': {
            on: function() {
                var slideset = gallery.find('.mask > .slideset');
                slideset.carouFredSel({
                    width: '100%',
                    scroll: {
                        items: 1,
                        duration: 400
                    },
                    auto: false,
                    prev: {button: gallery.find('.btn-prev')},
                    next: {button: gallery.find('.btn-next')}
                });

                if (isTouchDevice) {
                    slideset.hammer({
                        drag_block_horizontal: true,
                        drag_min_distance: 1
                    }).on('swipeleft swiperight', function(ev) {
                        switch (ev.type) {
                            case 'swipeleft':
                                slideset.trigger('next');
                                ev.gesture.stopDetect();
                                break;
                            case 'swiperight':
                                slideset.trigger('prev');
                                ev.gesture.stopDetect();
                                break;
                        }
                    });
                }
            }
        },
        '768..': {
            on: function() {
                gallery.html(galleryHTML);
            }
        }
    });
}
function initLoadContent() {
    jQuery('.ajax-content').infinityScrollContent({
        onLoad: function(newContent) {
            initAjaxContent(newContent);
            jQuery(window).trigger('loadEvent');
//			$("img.lazy").lazyload({effect : "fadeIn"}); //line added by nazakat for image lazy load
        }
    });

    jQuery('.ajax-content-urlmeta').InfinityScrlUrlMeta({
        onLoad: function(newContent) {
            initAjaxContent2(newContent);
            jQuery(window).trigger('loadEvent');
            //$("img.lazy").lazyload({effect : "fadeIn"}); //line added by nazakat for image lazy load
        }
    });
//	$("img.lazy").lazyload({effect : "fadeIn"}); //line added by nazakat for image lazy load

    function initAjaxContent(newContent) {
        newContent.filter('.carousel2').add(newContent.find('.carousel2')).each(function() {
            block = jQuery(this);
            gallery2(block);
        });
        newContent.filter('.carousel3').add(newContent.find('.carousel2')).each(function() {
            block = jQuery(this);
            gallery3(block);
        })
        jQuery('div.videos-area').sameHeight({
            elements: 'div.box',
            flexible: true,
            multiLine: true
        });
        jQuery('div.deals-block').sameHeight({
            elements: 'div.deals-box',
            flexible: true,
            multiLine: true
        });
    }

    function initAjaxContent2(newContent) {
        newContent.filter('.carousel2').add(newContent.find('.carousel2')).each(function() {
            block = jQuery(this);
            gallery2(block);
        });
        newContent.filter('.carousel3').add(newContent.find('.carousel2')).each(function() {
            block = jQuery(this);
            gallery3(block);
        });
        
        /*var igareaid = newContent.find('.iGArea').attr('id');
        console.log(igareaid);
        newContent.find('.iGArea#' + igareaid).contentGallery();*/
        
    }


}
function gallery2(block) {
    ResponsiveHelper.addRange({
        '..767': {
            on: function() {
                if (block.data('CustomScrollGallery')) {
                    block.data('CustomScrollGallery').destroy();
                }
            }
        },
        '768..': {
            on: function() {
                block.customScrollGallery({
                    onInit: function(that) {
                        that.win = jQuery(window);
                        that.win.trigger('resize');
                    },
                    onResize: function(that) {
                        if (that.win.width() < 1024) {
                            that.slideInStep = 3;
                        } else {
                            that.slideInStep = that.options.slideInStep;
                        }
                    }
                });
            }
        }
    });
}
function gallery3(block) {
    ResponsiveHelper.addRange({
        '..767': {
            on: function() {
                if (block.data('CustomScrollGallery')) {
                    block.data('CustomScrollGallery').destroy();
                }
            }
        },
        '768..': {
            on: function() {
                block.customScrollGallery({slideInStep: 3});
            }
        }
    });
}
function initMobileNav() {
    var animSpeed = 400;
    var activeClass = 'active';

    var win = jQuery(window);
    var body = jQuery('body');
    var content = jQuery('.w1');

    jQuery('.menu-opener').each(function() {
        var opener = jQuery(this);
        if (opener.attr('href').indexOf('#') == 0) {
            var slide = jQuery(opener.attr('href'));
            function resizeHandler() {
                if (opener.hasClass(activeClass)) {
                    showSlide(true);
                } else {
                    hideSlide(true);
                }
            }
            function showSlide(noAnimFlag) {
                opener.addClass(activeClass);
                slide.stop()[noAnimFlag ? 'css' : 'animate']({marginLeft: 0}, animSpeed);
                content.stop()[noAnimFlag ? 'css' : 'animate']({marginLeft: slide.innerWidth()}, animSpeed);
            }
            function hideSlide(noAnimFlag) {
                opener.removeClass(activeClass);
                slide.stop()[noAnimFlag ? 'css' : 'animate']({marginLeft: -slide.innerWidth()}, animSpeed);
                content.stop()[noAnimFlag ? 'css' : 'animate']({marginLeft: 0}, animSpeed);
            }
            if (slide.length) {
                opener.click(function(e) {
                    e.preventDefault();
                    if (opener.hasClass(activeClass)) {
                        hideSlide();
                    } else {
                        showSlide();
                    }
                });
                body.click(function(e) {
                    var target = jQuery(e.target);
                    if (!target.is(opener) && target.closest(opener).length == 0 && !target.is(slide) && target.closest(slide).length == 0) {
                        hideSlide();
                    }
                });
                resizeHandler();
                win.on('resize orientationchange', resizeHandler);
            }
        }
    });
}
function initCustomCycleGallery() {
    jQuery('.carousel').customScrollGallery({
        onInit: function(that) {
            that.win = jQuery(window);
            that.win.trigger('resize');
        },
        onResize: function(that) {
            if (that.win.width() < 1024) {
                that.slideInStep = 3;
            } else {
                that.slideInStep = that.options.slideInStep;
            }
        }
    });
    gallery2(jQuery('.carousel2'));
    gallery3(jQuery('.carousel3'));
}
//load sidebar items content
function initSidebarLoading() {
    jQuery('.sidebar-loading').infinityContent({
        onLoad: function() {
            jQuery(window).trigger('loadEvent');
        }
    });
}
// cycle scroll gallery init
function initCycleCarousel() {
    jQuery('div.slides-gallery').scrollAbsoluteGallery({
        mask: '.large-carousel .mask',
        slider: '.slideset',
        slides: '.slide',
        btnPrev: 'a.prev-slide',
        btnNext: 'a.next-slide',
        pagerLinks: '.small-carousel .slide',
        btnPlayPause: '.btn-play-pause',
        btnPlay: '.play',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: false,
        switchTime: 5000,
        animSpeed: 500,
        onInit: function(that) {
            // init pager carousel
            that.pagerGallery = that.holder.find('.small-carousel');
            that.pagerGallery.scrollAbsoluteGallery({
                mask: '.mask',
                slider: '.slideset',
                slides: '.small-slide',
                btnPrev: 'a.btn-prev',
                btnNext: 'a.btn-next',
                btnPlay: '.play',
                stretchSlideToMask: true,
                maskAutoSize: true,
                autoRotation: false,
                switchTime: 3000,
                animSpeed: 500,
                onInit: function(self) {
                    that.pagerGallery = that.holder.find('.small-carousel');
                    that.pagerAPI = self;
                }
            });
            // small slides in step
            that.slidesInStep = that.pagerGallery.find('.small-slide').eq(0).find('.slide').length;
            // init first/last slides
            that.btnFirst = that.holder.find('.first');
            that.btnLast = that.holder.find('.last');
            that.btnFirst.on('click', function(e) {
                e.preventDefault();
                that.numSlide(0);
            });
            that.btnLast.on('click', function(e) {
                e.preventDefault();
                that.numSlide(that.slides.length - 1);
            });
        },
        onBeforeChange: function(that) {
            that.pagerAPI.numSlide(Math.floor(that.currentIndex / that.slidesInStep));
        },
        onChange: function(that) {

        },
        onStartRotation: function(that) {
            that.btnPlay.stop().fadeOut(300);
        },
        onStopRotation: function(that) {
            that.btnPlay.stop().fadeIn(300);
        }
    });
    jQuery('div.article-gallery').scrollAbsoluteGallery({
        mask: 'div.mask',
        slider: 'div.slideset',
        slides: 'div.slide',
        btnPrev: 'a.btn-prev',
        btnNext: 'a.btn-next',
        pagerLinks: '.pagination li',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: false,
        switchTime: 30,
        animSpeed: 30
    });
    jQuery('div.shops-gallery').scrollAbsoluteGallery({
        mask: 'div.mask',
        slider: 'div.slideset',
        slides: 'div.slide',
        btnPrev: 'a.btn-prev',
        btnNext: 'a.btn-next',
        pagerLinks: '.pagination li',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: false,
        switchTime: 3000,
        animSpeed: 500
    });
    jQuery('div.videos-gallery').scrollAbsoluteGallery({
        mask: 'div.mask',
        slider: 'div.slideset',
        slides: 'div.slide',
        btnPrev: 'a.btn-prev',
        btnNext: 'a.btn-next',
        pagerLinks: '.pagination li',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: false,
        switchTime: 3000,
        animSpeed: 500
    });
    jQuery('div.downloads-gallery').scrollAbsoluteGallery({
        mask: 'div.mask',
        slider: 'div.slideset',
        slides: 'div.slide',
        btnPrev: 'a.btn-prev',
        btnNext: 'a.btn-next',
        pagerLinks: '.pagination li',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: true,
        switchTime: 5000,
        animSpeed: 500
    });
    jQuery('div.apps-categories-gallery').scrollAbsoluteGallery({
        mask: 'div.mask',
        slider: 'div.slideset',
        slides: 'div.slide',
        btnPrev: 'a.btn-prev',
        btnNext: 'a.btn-next',
        pagerLinks: '.pagination li',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: false,
        switchTime: 5000,
        animSpeed: 500
    });
}
// content tabs init
function initTabs() {
    jQuery('ul.sub-nav').contentTabs({
        tabLinks: 'a',
        event: 'mouseenter'
    });
    jQuery('ul.tabset').contentTabs({
        addToParent: true,
        tabLinks: 'a'
    });
    jQuery('table.tabset').contentTabs({
        addToParent: true,
        tabLinks: 'a'
    });
}
// animated navigation init
function initDropDown() {
    jQuery('#nav ul').customAnimDropdown({
        items: 'li',
        drop: '>div',
        animSpeed: 400
    });
    jQuery('.top-search').animDropdown({
        items: 'div',
        drop: '.search-area',
        animSpeed: 400,
        effect: 'slide'
    });
    jQuery('.top-login').animDropdown({
        items: 'div',
        drop: '.top-login-area',
        animSpeed: 400,
        effect: 'slide'
    });
    jQuery('.promo-nav').animDropdown({
        items: '>li',
        drop: 'ul',
        animSpeed: 0,
        effect: 'slide'
    });
}

// open-close init
function initOpenClose() {
    jQuery('div.open-close').openClose({
        activeClass: 'active',
        opener: '.opener',
        slider: '.slide',
        animSpeed: 400,
        effect: 'slide'
    });
}

// accordion menu init
function initAccordion() {
    jQuery('ul.accordion').slideAccordion({
        opener: 'a.opener',
        slider: 'div.slide',
        animSpeed: 300
    });
}

// clear inputs on focus
function initInputs() {
    PlaceholderInput.replaceByOptions({
        // filter options
        clearInputs: true,
        clearTextareas: true,
        clearPasswords: true,
        skipClass: 'default',
        // input options
        wrapWithElement: true,
        showUntilTyping: false,
        getParentByClass: false,
        placeholderAttr: 'placeholder'
    });
}

// align blocks height
function initSameHeight() {
    jQuery('div.slideset').sameHeight({
        elements: 'div.txt',
        flexible: true,
        multiLine: true
    });
    jQuery('div.videos-area').sameHeight({
        elements: 'div.box',
        flexible: true,
        multiLine: true
    });
    jQuery('div.deals-block').sameHeight({
        elements: 'div.deals-box',
        flexible: true,
        multiLine: true
    });
}

// add classes on hover/touch
function initCustomHover() {
    jQuery('.carousel .box .visual a').touchHover();
    jQuery('.articles-box .article .visual a').touchHover();
    jQuery('.carousel2 .visual a').touchHover();
    jQuery('.carousel3 .visual a').touchHover();
    jQuery('.popular-list .visual a').touchHover();
    jQuery('.article-gallery a').touchHover();
    jQuery('.recommended-list .visual a').touchHover();
    jQuery('.other-list .visual a').touchHover();
    jQuery('.latest-videos-list .visual a').touchHover();
    jQuery('.resource-list .visual a').touchHover();
    jQuery('.article-block figure .visual').touchHover();
    jQuery('.featured-browse-nav>li').touchHover();
    jQuery('.deals-nav>li').touchHover();
    jQuery('.featured-block .visual a').touchHover();
    jQuery('.best-list li .visual a').touchHover();
    jQuery('.fight-list li .visual a').touchHover();
    jQuery('.featured-story-nav-holder').touchHover();
    jQuery('.category-browse-nav').touchHover();
    jQuery('.video-tools-nav>li').touchHover();
    jQuery('.videos-area .article .visual a').touchHover();
    jQuery('.videos-gallery a').touchHover();
    jQuery('.recommended-list2 .visual a').touchHover();
    jQuery('.compare-area .visual a').touchHover();
    jQuery('.compare-winner .visual a').touchHover();
    jQuery('.compare-panel .visual a').touchHover();
    jQuery('.side-image a').touchHover();
    jQuery('.deals-box .visual a').touchHover();
    jQuery('.downloads-gallery .visual a').touchHover();
    jQuery('.downloads-list2 .visual a').touchHover();
    jQuery('.download-story-box .visual a').touchHover();
    jQuery('.compare-panel2 .visual a').touchHover();
    jQuery('.filter-result .visual a').touchHover();
    jQuery('.category-filter-holder').touchHover();
    jQuery('.sort-filter-holder').touchHover();
    jQuery('.filter-holder').touchHover();
    jQuery('.recommended-list3 .visual a').touchHover();
    jQuery('.slides-gallery .large-carousel a').touchHover();
    jQuery('.top10-section .visual a').touchHover();
    jQuery('.about-list-holder').touchHover();
    jQuery('.app-box .visual a').touchHover();
    jQuery('.apps-category .box .visual a').touchHover();
    jQuery('.search-result .visual a').touchHover();
    jQuery('.search-result2 .visual a').touchHover();
    jQuery('.recommended-list4 .visual a').touchHover();
    jQuery('.profile-box .visual a').touchHover();
    jQuery('.reviews-tools-nav>li').touchHover();
    jQuery('.review-box .visual a').touchHover();
    jQuery('.questions-comments .comment .visual a').touchHover();
}

/*
 * Responsive Layout helper
 */
ResponsiveHelper = (function($) {
    // init variables
    var handlers = [];
    var win = $(window), prevWinWidth;
    var scrollBarWidth = 0;

    // prepare resize handler
    function resizeHandler() {
        var winWidth = win.width() + scrollBarWidth;
        if (winWidth !== prevWinWidth) {
            prevWinWidth = winWidth;

            // loop through range groups
            $.each(handlers, function(index, rangeObject) {
                // disable current active area if needed
                $.each(rangeObject.data, function(property, item) {
                    if ((winWidth < item.range[0] || winWidth > item.range[1]) && item.currentActive) {
                        item.currentActive = false;
                        if (typeof item.disableCallback === 'function') {
                            item.disableCallback();
                        }
                    }
                });

                // enable areas that match current width
                $.each(rangeObject.data, function(property, item) {
                    if (winWidth >= item.range[0] && winWidth <= item.range[1] && !item.currentActive) {
                        // make callback
                        item.currentActive = true;
                        if (typeof item.enableCallback === 'function') {
                            item.enableCallback();
                        }
                    }
                });
            });
        }
    }
    win.bind('load', function() {
        if (($.browser.mozilla || $.browser.opera || $.browser.msie) && window.addEventListener) {
            scrollBarWidth = window.innerWidth - $('body').width();
            resizeHandler();
        }
        win.bind('resize orientationchange', resizeHandler);
    });

    // range parser
    function parseRange(rangeStr) {
        var rangeData = rangeStr.split('..');
        var x1 = parseInt(rangeData[0], 10) || -Infinity;
        var x2 = parseInt(rangeData[1], 10) || Infinity;
        return [x1, x2].sort(function(a, b) {
            return a - b;
        });
    }

    // export public functions
    return {
        addRange: function(ranges) {
            // parse data and add items to collection
            var result = {data: {}};
            $.each(ranges, function(property, data) {
                result.data[property] = {
                    range: parseRange(property),
                    enableCallback: data.on,
                    disableCallback: data.off
                };
            });
            handlers.push(result);

            // call resizeHandler to recalculate all events
            prevWinWidth = null;
            resizeHandler();
        }
    };
}(jQuery));

// add block to compare plugin
;
(function($) {
    function AddItemToCompare(options) {
        this.options = $.extend({
            itmes: '.filter-result',
            targetHolder: '.boxes-holder',
            btnAdd: 'input:checkbox',
            btnClear: '.link-clear',
            btnClose: '.close',
            compareBtn: '.compare-btn',
            titleHolder: 'h2>a',
            imageHolder: '.visual>a>img',
            itemStructure: '<div class="box"><a class="close" href="#">Close</a><div class="row"><div class="visual"><a href="#"><img alt="image description"><span class="shadow"></span></a></div><div class="txt"><a href="#"></a></div></div></div>',
            maxCount: 4,
            extraClass: 'extra-space'
        }, options);
        this.init();
    }
    AddItemToCompare.prototype = {
        init: function() {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function() {
            // find structure elements
            var self = this;
            this.holder = $(this.options.holder);
            this.targetBlock = jQuery(this.holder.data('target'));

            this.compareButton = this.targetBlock.find(this.options.compareBtn).hide();
            this.clearButton = this.targetBlock.find(this.options.btnClear);
            this.targetRow = this.targetBlock.find(this.options.targetHolder);
            this.slide = this.targetBlock.find('.slide').hide();

            this.items = this.holder.find(this.options.itmes);
            this.addCheckbox = this.items.find(this.options.btnAdd);
            this.addCheckbox.each(function() {
                var checkbox = jQuery(this);
                checkbox.prop('checked', false);
                if (this.jcf) {
                    this.jcf.refreshState();
                }
            });
            this.extraBlock = this.targetBlock.siblings('.form-sort');
            this.currItemsCount = 0;
        },
        attachEvents: function() {
            var self = this;
            // checkbox click
            this.checkboxHandler = function() {
                var checkbox = jQuery(this);
                var item = checkbox.closest(self.items);
                if (checkbox.is(':checked')) {
                    self.addNewItem(item, checkbox);
                } else {
                    self.removeItem(item);
                }
            };
            this.addCheckbox.on('change', this.checkboxHandler);
            // remove all button click
            this.clearAllHandler = function(e) {
                e.preventDefault();
                self.removeAllItems();
            };
            this.clearButton.on('click', this.clearAllHandler);
        },
        addNewItem: function(item, checkbox) {
            this.currItemsCount = $('div.chk-checked').length-1;
            //alert(this.currItemsCount);
            if (this.currItemsCount < this.options.maxCount) {
                var self = this;
                var newItem = jQuery(this.options.itemStructure);
                var title = item.find(this.options.titleHolder).text();
                var image = item.find(this.options.imageHolder).attr('src');
                newItem.find('.txt > a').text(title);
                newItem.find('.visual > a > img').attr('src', image);

                item.data('newItem', newItem);
                newItem.appendTo(this.targetRow);

                var btnClose = newItem.find('.close');
                btnClose.click(function(e) {
                    e.preventDefault();
                    self.removeItem(item);
                });
                this.currItemsCount++;
                this.refreshButtonsState();
                this.makeCallback('onChange', this);
            } else {
                checkbox.prop('checked', false);
                if (checkbox[0].jcf) {
                    checkbox[0].jcf.refreshState();
                }
            }
        },
        removeItem: function(item) {
            var self = this;
            var checkbox = item.find(this.addCheckbox);
            checkbox.prop('checked', false)
            if (checkbox[0].jcf) {
                checkbox[0].jcf.refreshState();
            }
            if (item.data('newItem')) {
                item.data('newItem').stop().hide(300, function() {
                    item.data('newItem').remove();
                    item.removeData('newItem');
                    self.makeCallback('onChange', self);
                });
            }
            this.currItemsCount--;
            this.refreshButtonsState();
        },
        removeAllItems: function() {
            this.targetRow.empty();
            this.items.removeData('newItem');
            this.addCheckbox.each(function() {
                var checkbox = jQuery(this);
                if (checkbox.is(':checked')) {
                    checkbox.prop('checked', false);
                    if (this.jcf) {
                        this.jcf.refreshState();
                    }
                }
            });
            this.currItemsCount = 0;
            this.refreshButtonsState();
            this.makeCallback('onChange', this);
        },
        refreshButtonsState: function() {
            this.currItemsCount = $('div.chk-checked').length;
            if (this.currItemsCount > 1) {
                this.compareButton.show();
                this.extraBlock.addClass(this.options.extraClass);
            } else {
                this.compareButton.hide();
                this.extraBlock.removeClass(this.options.extraClass);
            }
            if (this.currItemsCount < 1) {
                this.slide.hide();
            } else {
                this.slide.show();
            }
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            this.addCheckbox.off('change', this.checkboxHandler);
            this.clearButton.off('click', this.clearAllHandler);
        }
    };

    // detect device type
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.addItemToCompare = function(opt) {
        return this.each(function() {
            $(this).data('AddItemToCompare', new AddItemToCompare($.extend(opt, {holder: this})));
        });
    };
}(jQuery));


// Fixed Slide Block plugin
;
(function() {
    jQuery.fn.fixedSlideBlock = function(options) {
        var options = jQuery.extend({
            slideBlock: '#sidebar',
            alwaysStick: true,
            animDelay: 100,
            animSpeed: 250,
            extraHeight: 0,
            positionType: 'auto' // 'fixed', 'absolute'
        }, options);

        return this.each(function() {
            var win = jQuery(window);
            var holder = jQuery(this);
            var fixedBlock = holder.find(options.slideBlock);
            var positionType = options.positionType, timer, d, stayStatic, prevHeight;

            // skip if block does not exists
            if (!fixedBlock.length) {
                return;
            }

            // detect positioning type
            if (positionType === 'auto') {
                positionType = !isFixedPositionSupported || isTouchDevice ? 'absolute' : 'fixed';
            }

            if (typeof options.onInit == 'function') {
                options.onInit(holder, fixedBlock, options);
            }

            // recalculate all values
            function recalculateDimensions() {
                var origStyle = fixedBlock.attr('style');
                fixedBlock.css({position: '', left: '', top: ''});
                d = {
                    winHeight: win.height(),
                    scrollTop: win.scrollTop(),
                    scrollLeft: win.scrollLeft(),
                    holderOffset: holder.offset(),
                    holderHeight: holder.height(),
                    blockPosition: fixedBlock.position(),
                    blockOffset: fixedBlock.offset(),
                    blockHeight: fixedBlock.outerHeight(true)
                };
                fixedBlock.attr('style', origStyle);

                // check for static position
                if (prevHeight !== d.holderHeight) {
                    prevHeight = d.holderHeight;
                    stayStatic = checkStaticPosition();
                }
            }

            // dont fix block if content too small
            function checkStaticPosition() {
                var origStyle = fixedBlock.attr('style');
                var origHeight = d.holderHeight;
                fixedBlock.css({position: 'absolute'});
                var newHeight = holder.height();
                if (newHeight < origHeight) {
                    fixedBlock.css({position: '', top: '', left: ''});
                    return true;
                } else {
                    fixedBlock.attr('style', origStyle);
                }
            }

            function positionFixed() {
                if (d.scrollTop > d.blockOffset.top - options.extraHeight) {
                    // check that block fits in holder
                    if (d.scrollTop + options.extraHeight - d.holderOffset.top + d.blockHeight > d.holderHeight) {
                        fixedBlock.css({position: 'absolute', left: d.blockPosition.left, top: d.blockPosition.top + d.holderHeight - d.blockHeight - (d.blockOffset.top - d.holderOffset.top)});
                    }
                    // set default fixed position
                    else {
                        fixedBlock.css({position: 'fixed', left: d.blockOffset.left - d.scrollLeft, top: options.extraHeight});
                    }
                } else {
                    // disable sticking
                    fixedBlock.css({position: '', top: '', left: ''});
                }
            }

            function positionAbsolute(noAnimation) {
                // default top position
                var top = d.blockPosition.top;
                if (d.scrollTop > d.blockOffset.top - options.extraHeight) {
                    // check that block fits in holder
                    if (d.scrollTop + options.extraHeight - d.holderOffset.top + d.blockHeight > d.holderHeight) {
                        top = d.blockPosition.top + d.holderHeight - d.blockHeight - (d.blockOffset.top - d.holderOffset.top);
                    }
                    // set fixed position
                    else {
                        top = d.blockPosition.top + d.scrollTop - d.blockOffset.top + options.extraHeight;
                    }
                }
                fixedBlock.stop().css({position: 'absolute', left: d.blockPosition.left});

                // change block position animation
                if (noAnimation === true) {
                    fixedBlock.css({top: top});
                } else {
                    fixedBlock.animate({top: top}, {duration: options.animSpeed});
                }
            }

            // reposition function
            function reposition(e) {
                // detect behavior
                var noAnimation = (e === true);

                // recalculate size and offsets
                recalculateDimensions();
                if (stayStatic) {
                    return;
                }

                // disable when window is smaller then fixed block
                if (!options.alwaysStick && d.winHeight < d.blockHeight) {
                    fixedBlock.css({position: '', top: '', left: ''});
                    return;
                }

                // call position handler
                if (positionType === 'fixed') {
                    positionFixed();
                } else {
                    if (noAnimation) {
                        positionAbsolute(noAnimation);
                    }
                    clearTimeout(timer);
                    timer = setTimeout(positionAbsolute, options.animDelay);
                }
            }

            // add event handlers
            setTimeout(function() {
                reposition(true);
                win.bind('scroll', reposition);
                win.bind('resize orientationchange', function() {
                    reposition(true);
                });
            }, 10);
        });
    };

    // detect device type
    var isTouchDevice = (function() {
        try {
            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        } catch (e) {
            return false;
        }
    }());

    // detect position fixed support
    var isFixedPositionSupported = (function() {
        var supported = false, container = document.createElement('div'), fixedBlock = document.createElement('div');
        container.style.cssText = 'position:absolute;top:9px;left:9px;width:100px;height:100px;background:red;';
        fixedBlock.style.cssText = 'position:fixed;top:7px;width:1px;height:1px;';
        container.appendChild(fixedBlock);
        document.documentElement.insertBefore(container, document.documentElement.childNodes[0]);
        supported = (fixedBlock.offsetTop == 7 || fixedBlock.offsetTop == -2 || (!fixedBlock.offsetWidth && typeof document.documentElement.style.maxHeight !== 'undefined'));
        document.documentElement.removeChild(container);
        fixedBlock = container = null;
        return supported;
    }());
}());

/*
 * Infinity Scroll Content Masonry
 */
;
(function($) {
    function InfinityScrollContentMasonry(options) {
        this.options = {
            items: '>*',
            loadingClass: 'loading',
            targetBlock: '.ajax-holder',
            loader: '.loading-box',
            loadBlocks: '.page-holder',
            loadedClass: 'loaded',
            ajaxData: 'ajax=1',
            prefix: 'ajax-',
            clickLoadinClass: 'click-loading',
            countScrollLoading: 3
        }
        $.extend(this.options, options);
        this.init();
    }
    InfinityScrollContentMasonry.prototype = {
        init: function() {
            this.findElements();
            this.addEvents();
            this.makeCallback('onInit', this);
            if (window.location.hash) {
                var block = jQuery('#' + this.options.prefix + window.location.hash.substr(1));
                if (block.length) {
                    this.loadHashBlocks(block);
                }
            }
        },
        findElements: function() {
            this.holder = $(this.options.holder);
            this.targetBlock = this.holder.find(this.options.targetBlock);
            this.loader = this.holder.find(this.options.loader);
            this.blocks = this.holder.find(this.options.loadBlocks);
            this.loadMore = this.loader.find('a');

            this.pageCounter = 0;
            this.loading = false;
            this.destroyedWindow = false;
            this.win = jQuery(window);
        },
        addEvents: function() {
            var that = this;
            var win = $(window);
            that.scrollHandler = function() {
            	if(($(window).scrollTop() + $(window).height() > ($(document).height() - 1000)) && !that.loading) {
            		that.pageScroll();
            	}
            }
            win.bind('scroll resize orientationchange', that.scrollHandler);
            this.clickHandler = function(e) {
                e.preventDefault();
                var block = that.blocks.eq(that.pageCounter);
                if (block.length) {
                    if (block.attr('data-url')) {
                        that.loadContent({
                            block: block,
                            url: block.attr('data-url'),
                            complete: function() {
                                win.trigger('resize');
                            }
                        });
                    }
                }
            }
            this.loadMore.bind('click', this.clickHandler);
        },
        getWindowHeight: function() {
            return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
        },
        pageScroll: function() {
            var that = this;
            var activeBlock = null;
            for (var i = 0; i < this.blocks.length; i++) {
                var block = this.blocks.eq(i);
                if (block.offset().top < that.win.scrollTop() + that.getWindowHeight() && !that.loading && !block.hasClass(this.options.clickLoadinClass)) {
                    if (block.attr('data-url')) {
                        if (!that.destroyedWindow && !that.loading) {
                            that.loadContent({
                                block: block,
                                url: block.attr('data-url')
                            });
                        }
                    }
                    activeBlock = block;
                }
            }
            var flag = false;
            if (activeBlock && pageId != activeBlock.attr('id')) {
                flag = true;
                pageId = activeBlock.attr('id');
            } else {
                if (pageId != '') {
                    flag = true;
                    pageId = '';
                }
            }
            if (activeBlock && flag) {
                //window.location.hash = activeBlock.attr('id').substr(that.options.prefix.length);
                var c = documentUrl.slice(-1);
                c = (c != '/') ? '/' : '';
                //console.log(activeBlock.attr('id'));
                if (documentUrl.indexOf('page') == -1)
                    window.history.replaceState(null, null, (documentUrl) + c + activeBlock.attr('id').substr(that.options.prefix.length));
                else {
                    window.history.replaceState(null, null, (documentUrl.substring(0, documentUrl.lastIndexOf('/') + 1)) + activeBlock.attr('id').substr(that.options.prefix.length));
                }
            } else if (flag) {
                if (isIE) {
                    window.history.replaceState(null, null, (documentUrl.replace(/page\d+/, '')));
                    if (window.location.hash !== '# ') {
                        var tempScrollTop = this.win.scrollTop();
                        //window.location.hash = ' ';
                        this.win.scrollTop(tempScrollTop);
                    }
                } else {
                    window.history.replaceState(null, null, (documentUrl.replace(/page\d+/, '')));
                    if (window.location.hash !== '') {
                        var tempScrollTop = this.win.scrollTop();
                        //window.location.hash = '';
                        this.win.scrollTop(tempScrollTop);
                    }
                }
            }
        },
        loadContent: function(obj) {
            var that = this;
            var win = $(window);
            obj.block.removeAttr('data-url');
            that.loader.hide();
            that.pageCounter++;
            that.loader.find('.page-num').text(that.pageCounter + 1);
            that.loading = true;
            that.holder.addClass(that.options.loadingClass);
            that.ajaxRequest = $.ajax({
                url: obj.url,
                data: that.options.ajaxData,
                cache: false,
                type: 'get',
                dataType: 'text',
                success: function(data) {
                    var newContent = jQuery('<div>', {html: data});
                    var newItems = newContent.find(that.options.items);
                    obj.block.removeClass(that.options.clickLoadinClass).append(newItems);
                    that.holder.removeClass(that.options.loadingClass);
                    //window.location.hash = obj.block.attr('id').substr(that.options.prefix.length);
                    
					var c = documentUrl.slice(-1);
                    c = (c != '/') ? '/' : '';

                    if (documentUrl.indexOf('page') == -1)
                        window.history.replaceState(null, null, (documentUrl) + c + obj.block.attr('id').substr(that.options.prefix.length));
                    else {
                        window.history.replaceState(null, null, (documentUrl.substring(0, documentUrl.lastIndexOf('/') + 1)) + obj.block.attr('id').substr(that.options.prefix.length));
                    }
                    var id = obj.block.attr('id').replace('ajax-page', '');

                    try {
                        moreContent(id);
                    }
                    catch (e) {

                    }


                    that.loader.hide();
                    that.loading = false;
                    that.makeCallback('onLoad', newItems);
                    if (typeof obj.complete == 'function') {
                        obj.complete();
                    }
                    if (that.pageCounter >= that.options.countScrollLoading) {
                        that.destroyedWindow = true;
                        that.loader.show();
                    }
                    if (that.blocks.eq(that.pageCounter).length == 0) {
                        that.loader.hide();
                    }
                },
                error: function() {
                    //alert('AJAX Error!');
                }
            });
        },
        destroy: function() {
            this.destroyedWindow = true;
        },
        loadHashBlocks: function(block) {
            var that = this;
            var blocks = block.add(block.prevAll(this.options.loadBlocks));
            blocks.each(function(ind) {
                var block = jQuery(this);
                that.loadContent({
                    block: block,
                    url: block.attr('data-url'),
                    complete: function() {
                        if (ind == blocks.length - 1) {
                            jQuery(window).scrollTop(block.offset().top);
                        }
                    }
                });
            });
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    }
    $.fn.infinityScrollContentMasonry = function(options) {
        var args = Array.prototype.slice.apply(arguments);
        return this.each(function() {
            var instance = $.data(this, 'InfinityScrollContentMasonry');
            var methodName = args[0];
            if (instance) {
                if (typeof methodName === 'string') {
                    instance[methodName].apply(instance, args.slice(1));
                }
            } else if (typeof methodName !== 'string') {
                $(this).data('IInfinityScrollContentMasonry', new InfinityScrollContentMasonry($.extend(options, {holder: this})));
            }
        });
    }
}(jQuery));

/*
 * jQuery Compare Slider plugin
 */
;
(function($) {
    function CompareSlider(options) {
        this.options = $.extend({
            btnNext: '.btn-next',
            btnPrev: '.btn-prev',
            mask: '.compare-slider .mask',
            slider: '.slideset',
            columnElement: '.box',
            animSpeed: 300
        }, options);
        this.init();
    }
    CompareSlider.prototype = {
        init: function() {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.resizeHandler();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function() {
            // find structure elements
            var self = this;
            this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.masks = this.holder.find(this.options.mask);
            this.columnCount = this.masks.eq(0).find(self.options.columnElement).length
            this.masks.each(function() {
                var mask = jQuery(this);
                mask.data('slider', mask.find(self.options.slider));
                var column = mask.find(self.options.columnElement).eq(0);
                mask.data('column', column);
            });
            this.btnNext = this.holder.find(this.options.btnNext).show();
            this.btnPrev = this.holder.find(this.options.btnPrev).show();
            this.isAnimation = false;
            this.setSliderWidth();
        },
        attachEvents: function() {
            var self = this;
            if (this.btnPrev.length) {
                this.btnPrevHandler = function(e) {
                    e.preventDefault();
                    self.prevSlide();
                };
                this.btnPrev.on(isTouchDevice ? 'touchstart' : 'click', this.btnPrevHandler);
            }
            if (this.btnNext.length) {
                this.btnNextHandler = function(e) {
                    e.preventDefault();
                    self.nextSlide();
                };
                this.btnNext.on(isTouchDevice ? 'touchstart' : 'click', this.btnNextHandler);
            }

            // swipe gestures handler
            // if(isTouchDevice) {
            // this.masks.hammer({
            // drag_block_horizontal: true,
            // drag_min_distance: 1
            // }).on('swipeleft swiperight', function(ev){
            // switch(ev.type) {
            // case 'swipeleft':
            // self.nextSlide();
            // ev.gesture.stopDetect();
            // break;
            // case 'swiperight':
            // self.prevSlide();
            // ev.gesture.stopDetect();
            // break;
            // }
            // });
            // }
            this.resizeHandler = function() {
                self.onWindowResize();
            };
            $(window).bind('load resize orientationchange', this.resizeHandler);
        },
        onWindowResize: function() {
            var self = this;
            this.makeCallback('onResize', this);
            this.setSliderWidth();
            this.masks.each(function(ind) {
                var mask = jQuery(this);
                var slider = mask.data('slider');
                var column = mask.data('column');
                if (slider.innerWidth() < mask.width() + 1) {
                    self.btnNext.add(self.btnPrev).hide();
                    slider.css({marginLeft: 0});
                } else {
                    self.btnNext.add(self.btnPrev).show();
                    var currMargin = parseInt(slider.css('marginLeft'));
                    slider.css({marginLeft: Math.min(Math.max(currMargin, mask.width() - slider.innerWidth()), 0)});
                }
            });
        },
        setSliderWidth: function() {
            var self = this;
            this.masks.each(function() {
                var mask = jQuery(this);
                mask.data('slider').css({width: mask.data('column').outerWidth(true) * self.columnCount});
            });
        },
        prevSlide: function() {
            if (!this.isAnimation) {
                this.switchSlide(1);
            }
        },
        nextSlide: function(fromAutoRotation) {
            if (!this.isAnimation) {
                this.switchSlide(-1);
            }
        },
        prepeare: function(direction) {

        },
        switchSlide: function(direction) {
            var self = this;
            this.masks.each(function() {
                var mask = jQuery(this);
                var slider = mask.data('slider');
                var column = mask.data('column');
                var stepWidth = column.outerWidth(true);
                if (slider.innerWidth() > mask.width()) {
                    var currMargin = parseInt(slider.css('marginLeft'));
                    var calcMargin = Math.min(Math.max(currMargin + direction * stepWidth, mask.width() - slider.innerWidth()), 0);
                    slider.stop().animate({marginLeft: calcMargin}, self.options.animSpeed);
                }
            });
            this.makeCallback('onBefore', this);
        },
        refreshState: function() {

        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            this.btnPrev.unbind('click', this.btnPrevHandler);
            this.btnNext.unbind('click', this.btnNextHandler);
            this.masks.hammer().off('swipeleft swiperight');
            $(window).unbind('load resize orientationchange', this.resizeHandler);
            this.holder.removeClass(this.options.galleryReadyClass);
        }
    };

    // detect device type
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.compareSlider = function(opt) {
        return this.each(function() {
            $(this).data('CompareSlider', new CompareSlider($.extend(opt, {holder: this})));
        });
    };
}(jQuery));

/*
 * jQuery Slide Table plugin
 */
;
(function($) {
    function SlideTable(options) {
        this.options = $.extend({
            btnNext: '.btn-next',
            btnPrev: '.btn-prev',
            mask: '.mask',
            slider: '.table-holder',
            columnElement: 'th',
            animSpeed: 200
        }, options);
        this.init();
    }
    SlideTable.prototype = {
        init: function() {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function() {
            // find structure elements
            this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.mask = this.holder.find(this.options.mask);
            this.slider = this.mask.find(this.options.slider);
            this.column = this.holder.find(this.options.columnElement).eq(0);

            this.stepWidth = this.column.outerWidth(true);
            this.btnNext = this.holder.find(this.options.btnNext).show();
            this.btnPrev = this.holder.find(this.options.btnPrev).show();
            this.isAnimation = false;
        },
        attachEvents: function() {
            var self = this;
            if (this.btnPrev.length) {
                this.btnPrevHandler = function(e) {
                    e.preventDefault();
                    self.prevSlide();
                };
                this.btnPrev.click(this.btnPrevHandler);
            }
            if (this.btnNext.length) {
                this.btnNextHandler = function(e) {
                    e.preventDefault();
                    self.nextSlide();
                };
                this.btnNext.click(this.btnNextHandler);
            }

            // swipe gestures handler
            if (isTouchDevice) {
                this.mask.hammer({
                    drag_block_horizontal: true,
                    drag_min_distance: 1
                }).on('release swipeleft swiperight', function(ev) {
                    switch (ev.type) {
                        case 'swipeleft':
                            self.nextSlide();
                            ev.gesture.stopDetect();
                            break;
                        case 'swiperight':
                            self.prevSlide();
                            ev.gesture.stopDetect();
                            break;
                    }
                });
            }
            this.resizeHandler = function() {
                self.onWindowResize();
            };
            $(window).bind('load resize orientationchange', this.resizeHandler);
        },
        onWindowResize: function() {
            this.makeCallback('onResize', this);
            if (this.slider.innerWidth() < this.mask.width()) {
                this.btnNext.add(this.btnPrev).hide();
                this.slider.css({marginLeft: 0});
            } else {
                this.btnNext.add(this.btnPrev).show();
                var currMargin = parseInt(this.slider.css('marginLeft'));
                this.slider.css({marginLeft: Math.min(Math.max(currMargin, this.mask.width() - this.slider.innerWidth()), 0)});
            }
            this.stepWidth = this.column.outerWidth(true);
        },
        prevSlide: function() {
            if (!this.isAnimation) {
                this.switchSlide(1);
            }
        },
        nextSlide: function(fromAutoRotation) {
            if (!this.isAnimation) {
                this.switchSlide(-1);
            }
        },
        prepeare: function(direction) {

        },
        switchSlide: function(direction) {
            var self = this;
            if (this.slider.innerWidth() > this.mask.width()) {
                var currMargin = parseInt(this.slider.css('marginLeft'));
                var calcMargin = Math.min(Math.max(currMargin + direction * this.stepWidth, this.mask.width() - this.slider.innerWidth()), 0);
                this.slider.stop().animate({marginLeft: calcMargin}, this.options.animSpeed);
                this.makeCallback('onBefore', this);
            }

        },
        refreshState: function() {

        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            clearTimeout(this.autoTimer);
            this.btnPrev.unbind('click', this.btnPrevHandler);
            this.btnNext.unbind('click', this.btnNextHandler);
            this.mask.hammer().off('swipeleft swiperight');
            $(window).unbind('load resize orientationchange', this.resizeHandler);
            this.holder.removeClass(this.options.galleryReadyClass);
            this.slider.add(this.slides).removeAttr('style');
            this.slider.html(this.sliderHTML);
        }
    };

    // detect device type
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.slideTable = function(opt) {
        return this.each(function() { 
            $(this).data('SlideTable', new SlideTable($.extend(opt, {holder: this})));
        });
    };
}(jQuery));

/*
 * Infinity Scroll Content
 */
;
(function($) {
    function InfinityScrollContent(options) {
        this.options = {
            items: '>*',
            loadingClass: 'loading',
            targetBlock: '.ajax-holder',
            loader: '.loading-box',
            loadBlocks: '.page-holder',
            loadedClass: 'loaded',
            ajaxData: 'ajax=1',
            prefix: 'ajax-',
            clickLoadinClass: 'click-loading',
            countScrollLoading: 3
        }
        $.extend(this.options, options);
        this.init();
    }
    InfinityScrollContent.prototype = {
        init: function() {
            this.findElements();
            this.addEvents();
            this.makeCallback('onInit', this);
            if (window.location.hash) {
                var block = jQuery('#' + this.options.prefix + window.location.hash.substr(1));
                if (block.length) {
                    this.loadHashBlocks(block);
                }
            }
        },
        findElements: function() {
            this.holder = $(this.options.holder);
            this.targetBlock = this.holder.find(this.options.targetBlock);
            this.loader = this.holder.find(this.options.loader);
            this.blocks = this.holder.find(this.options.loadBlocks);
            this.loadMore = this.loader.find('a');

            this.loading = false;
            this.destroyedWindow = false;
            this.win = jQuery(window);
            this.pageCounter = 0;
        },
        addEvents: function() {
            var that = this;
            var win = $(window);
            this.scrollHandler = function() {
                that.pageScroll();
            }
            win.bind('scroll resize orientationchange', that.scrollHandler);
            this.clickHandler = function(e) {
                e.preventDefault();
                var block = that.blocks.eq(that.pageCounter);
                if (block.length) {
                    if (block.attr('data-url')) {
                        that.loadContent({
                            block: block,
                            url: block.attr('data-url'),
                            complete: function() {
                                win.trigger('resize');
                            }
                        });
                    }
                }
            }
            this.loadMore.bind('click', this.clickHandler);
        },
        getWindowHeight: function() {
            return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
        },
        pageScroll: function() {
            var that = this;
            var activeBlock = null;
            for (var i = 0; i < this.blocks.length; i++) {
                var block = this.blocks.eq(i);
                if (block.offset().top < that.win.scrollTop() + that.getWindowHeight() && !that.loading && !block.hasClass(this.options.clickLoadinClass)) {
                    if (block.attr('data-url')) {
                        if (!that.destroyedWindow && !that.loading) {
                            that.loadContent({
                                block: block,
                                url: block.attr('data-url')
                            });
                        }
                    }
                    activeBlock = block;
                }
            }
            var flag = false;
            if (activeBlock) {
                if (pageId != activeBlock.attr('id')) {
                    flag = true;
                    pageId = activeBlock.attr('id');
                }
            } else {
                if (pageId != '') {
                    flag = true;
                    pageId = '';
                }
            }
            if (activeBlock && flag) {
                //window.location.hash = activeBlock.attr('id').substr(that.options.prefix.length);

                var c = documentUrl.slice(-1);
                c = (c != '/') ? '/' : '';
                // console.log(activeBlock.attr('id'));
                if (documentUrl.indexOf('page') == -1) {
                    //window.history.replaceState(null, null, (documentUrl) + c + activeBlock.attr('id').substr(that.options.prefix.length));
                    //check if url contain  top-products
                    if (documentUrl.indexOf('/top-products/') != -1) {
                        var activeblockcount = parseInt(activeBlock.attr('id').substr(that.options.prefix.length).replace('page',''));
                        //changes current url

                        //$(document).scrollStopped(function(){
                            //if(!activeBlock.hasClass(this.options.clickLoadinClass)){
                            //console.log(that.pageCounter ,that.options.countScrollLoading );
                            console.log(that.pageCounter , activeblockcount);
                            //if (that.pageCounter >= that.options.countScrollLoading) {
                            var it = that.loader;
                            if( activeblockcount > that.pageCounter){
                            //if(((it).is(":visible")) && (it.isOnScreen() == true)){
                            //if((it.isOnScreen()) == false){
                                console.log('url not change');
                            }
                            else{
                                console.log('url change'); 
                                window.history.replaceState(null, null, (documentUrl.substr(0, documentUrl.lastIndexOf('/') + 1)) + activeBlock.attr('data-nxturl'));
                            }      
                           
                        //});



                        
                        //document.title = activeBlock.attr('data-nxturlmeta');

                        //update current metas
                        var newTitle = activeBlock.find('.mtitle').data('title');
                        var newKey = activeBlock.find('.mkey').data('key');
                        var newDesc = activeBlock.find('.mdesc').data('desc');

                        //prevents undefined title    
                        if(typeof newTitle == 'undefined'){
                            newTitle = defaultTitle;
                        }
                        
                        document.title = newTitle;
                        $('meta[name=keywords]').attr('keywords', newKey);
                        $('meta[name=description]').attr('description', newDesc);
                        //console.log('not default');
                        //console.log($('meta[name=keywords]').attr('keywords'));
                        //console.log(newTitle); 

                        //turn first main h1 to h2 of page
                        var r = $('section.top10-intro h1');
                        var c = $('<h2 class=""></h2>').append(r.contents());
                        r.replaceWith(c);


                        //turn all heading h1 to h2 of ajax content
                        var p = $('h1.h2_heading#new_head');
                        var a = $('<h2 class="h2_heading" id="new_head"></h2>').append(p.contents());
                        p.replaceWith(a);

                        //turn current h2 to h1 of ajax content
                        var q = activeBlock.find('h2.h2_heading#new_head');
                        var b = $('<h1 class="h2_heading" id="new_head"></h1>').append(q.contents());
                        q.replaceWith(b);
                    } else {
                        window.history.replaceState(null, null, (documentUrl) + c + activeBlock.attr('id').substr(that.options.prefix.length));
                    }
                } else {
                    window.history.replaceState(null, null, (documentUrl.substring(0, documentUrl.lastIndexOf('/') + 1)) + activeBlock.attr('id').substr(that.options.prefix.length));

                }
            } else if (flag) {
                if (documentUrl.indexOf('/top-products/') != -1) {
                    //update the default metas
                    document.title = defaultTitle;
                    $('meta[name=keywords]').attr('keywords', getDefaultMeta('keywords'));
                    $('meta[name=description]').attr('description', getDefaultMeta('description'));
                    //console.log('default');
                    //console.log($('meta[name=keywords]').attr('keywords'));
                    //console.log();

                    //turn all heading h1 to h2 of ajax content
                    var p = $('h1.h2_heading#new_head');
                    var a = $('<h2 class="h2_heading" id="new_head"></h2>').append(p.contents());
                    p.replaceWith(a);

                    //turn first main h2 to h1 of page
                    var r = $('section.top10-intro h2');
                    var c = $('<h1 class=""></h1>').append(r.contents());
                    r.replaceWith(c);

                }
                if (isIE) {

                    window.history.replaceState(null, null, (documentUrl.replace(/page\d+/, '')));
                    if (window.location.hash !== '# ') {
                        var tempScrollTop = this.win.scrollTop();
                        //window.location.hash = ' ';
                        this.win.scrollTop(tempScrollTop);
                    }
                } else {


                    window.history.replaceState(null, null, (documentUrl.replace(/page\d+/, '')));
                    if (window.location.hash !== '') {
                        var tempScrollTop = this.win.scrollTop();
                        //window.location.hash = '';
                        this.win.scrollTop(tempScrollTop);
                    }
                }
            }
        },
        loadContent: function(obj) {
            var that = this;
            var win = $(window);
            obj.block.removeAttr('data-url');
            that.loader.hide();;
            that.pageCounter++;
            that.loader.find('.page-num').text(that.pageCounter + 1);
            that.loading = true;
            that.holder.addClass(that.options.loadingClass);
            that.ajaxRequest = $.ajax({
                url: obj.url,
                data: that.options.ajaxData,
                cache: false,
                type: 'get',
                dataType: 'text',
                success: function(data) {
                    //alert('ajax2');
                    var newContent = jQuery('<div>', {
                        html: data
                    });
                    var newItems = newContent.find(that.options.items);

                    //Change Url
                    var c = documentUrl.slice(-1);
                    c = (c != '/') ? '/' : '';




                    if (documentUrl.indexOf('page') == -1) {
                        //window.history.replaceState(null, null, (documentUrl) + c + obj.block.attr('id').substr(that.options.prefix.length));
                        //check if url contains  top-products
                        if (documentUrl.indexOf('/top-products/') != -1) {
                            window.history.replaceState(null, null, (documentUrl.substr(0, documentUrl.lastIndexOf('/') + 1)) + obj.block.attr('data-nxturl'));
                            var newTitle = obj.block.children('.mtitle').data('title');
                            var newKey = obj.block.children('.mkey').data('key');
                            var newDesc = obj.block.children('.mdesc').data('desc');
                            //console.log(obj.block.children('.mtitle').html);
                            //document.title = newTitle;
                            //$('meta[name=keywords]').attr('keywords', newKey);
                            //$('meta[name=description]').attr('keywords', newDesc);
                            //console.log(newTitle,newKey,newDesc);
                        } else {
                            window.history.replaceState(null, null, (documentUrl) + c + obj.block.attr('id').substr(that.options.prefix.length));
                        }
                    } else {
                        window.history.replaceState(null, null, (documentUrl.substring(0, documentUrl.lastIndexOf('/') + 1)) + obj.block.attr('id').substr(that.options.prefix.length));
                    }

                    // Load all images
                    var id = obj.block.attr('id').replace('ajax-page', '');

                    obj.block.removeClass(that.options.clickLoadinClass).append(newItems);
                    if (documentUrl.indexOf('/slideshows/') != -1 || documentUrl.indexOf('/videos/') != -1 || documentUrl.indexOf('/how-to/') != -1) {
                        var total_images = obj.block.find('img').length;
                        var images_loaded = 0;

                        obj.block.hide();
                        obj.block.find('img').one('load', function() {
                            images_loaded++;
                            if (images_loaded >= total_images) {
                                obj.block.show();

                                try {
                                    moreContent(id);
                                } catch (e) {

                                }


                            }

                        }).each(function() {
                            if (this.complete)
                                $(this).load();
                        });
                    } else {


                        try {
                            moreContent(id);
                        } catch (e) {

                        }

                    }
                    //setTimeout(function(){obj.block.show(), 1000});
                    that.holder.removeClass(that.options.loadingClass);
                    //window.location.hash = obj.block.attr('id').substr(that.options.prefix.length);



                    that.loading = false;
                    that.makeCallback('onLoad', newItems);
                    if (typeof obj.complete == 'function') {
                        obj.complete();
                    }
                    if (that.pageCounter >= that.options.countScrollLoading) {
                        that.destroyedWindow = true;
                        that.loader.show();
                    }
                    if (that.blocks.eq(that.pageCounter).length == 0) {
                        that.loader.hide();
                    }
                },
                error: function() {
                    //alert('AJAX Error!');
                }
            });
        },
        destroy: function() {
            this.destroyedWindow = true;
        },
        loadHashBlocks: function(block) {
            var that = this;
            var blocks = block.add(block.prevAll(this.options.loadBlocks));
            blocks.each(function(ind) {
                var block = jQuery(this);
                that.loadContent({
                    block: block,
                    url: block.attr('data-url'),
                    complete: function() {
                        if (ind == blocks.length - 1) {
                            jQuery(window).scrollTop(block.offset().top);
                        }
                    }
                });
            });
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    }
    $.fn.infinityScrollContent = function(options) {
        var args = Array.prototype.slice.apply(arguments);
        return this.each(function() {
            var instance = $.data(this, 'InfinityScrollContent');
            var methodName = args[0];
            if (instance) {
                if (typeof methodName === 'string') {
                    instance[methodName].apply(instance, args.slice(1));
                }
            } else if (typeof methodName !== 'string') {
                $(this).data('InfinityScrollContent', new InfinityScrollContent($.extend(options, {
                    holder: this
                })));
            }
        });
    }
}(jQuery));


/*
 * Infinity Scroll Content change url n meta update
 */

(function($) {
    function InfinityScrlUrlMeta(options) {
        this.options = {
            items: '>*',
            loadingClass: 'loading',
            targetBlock: '.ajax-holder',
            loader: '.loading-box',
            loadBlocks: '.page-holder',
            loadedClass: 'loaded',
            ajaxData: 'ajax=1',
            prefix: 'ajax-',
            clickLoadinClass: 'click-loading',
            countScrollLoading: 3
        }
        $.extend(this.options, options);
        this.init();
    }
    InfinityScrlUrlMeta.prototype = {
        init: function() {
            this.findElements();
            this.addEvents();
            this.makeCallback('onInit', this);
            if (window.location.hash) {
                var block = jQuery('#' + this.options.prefix + window.location.hash.substr(1));
                if (block.length) {
                    this.loadHashBlocks(block);
                }
            }
        },
        findElements: function() {
            this.holder = $(this.options.holder);
            this.targetBlock = this.holder.find(this.options.targetBlock);
            this.loader = this.holder.find(this.options.loader);
            this.blocks = this.holder.find(this.options.loadBlocks);
            this.loadMore = this.loader.find('a');

            this.loading = false;
            this.destroyedWindow = false;
            this.win = jQuery(window);
            this.pageCounter = 0;
        },
        addEvents: function() {
            var that = this;
            var win = $(window);
            this.scrollHandler = function() {
                that.pageScroll();
            }
            win.bind('scroll resize orientationchange', that.scrollHandler);
            this.clickHandler = function(e) {
                e.preventDefault();
                var block = that.blocks.eq(that.pageCounter);
                if (block.length) {
                    if (block.attr('data-url')) {
                        that.loadContent({
                            block: block,
                            url: block.attr('data-url'),
                            complete: function() {
                                win.trigger('resize');
                            }
                        });
                    }
                }
            }
            this.loadMore.bind('click', this.clickHandler);
        },
        getWindowHeight: function() {
            return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
        },
        pageScroll: function() {
            var that = this;
            var activeBlock = null;
            for (var i = 0; i < this.blocks.length; i++) {
                var block = this.blocks.eq(i);
                if (block.offset().top < that.win.scrollTop() + that.getWindowHeight() && !that.loading && !block.hasClass(this.options.clickLoadinClass)) {
                    if (block.attr('data-url')) {
                        if (!that.destroyedWindow && !that.loading) {
                            that.loadContent({
                                block: block,
                                url: block.attr('data-url')
                            });
                        }
                    }
                    activeBlock = block;
                }
            }
            var flag = false;
            if (activeBlock) {
                if (pageId != activeBlock.attr('id')) {
                    flag = true;
                    pageId = activeBlock.attr('id');
                }
            } else {
                if (pageId != '') {
                    flag = true;
                    pageId = '';
                }
            }

            

            if (activeBlock && flag) {
                var holder = that.holder;
                //console.log($(that.holder).data('urlRewriteLevel'));
                //console.log($('.ajax-content-urlmeta').data('urlRewriteLevel'));
                if(holder.hasClass('ajax-content-urlmeta') == true){
                    var urlRewriteLevel = holder.attr('data-urlRewriteLevel');
                }
                else{
                    var urlRewriteLevel = false;
                }

                //window.location.hash = activeBlock.attr('id').substr(that.options.prefix.length);

                var c = documentUrl.slice(-1);
                c = (c != '/') ? '/' : '';
                // console.log(activeBlock.attr('id'));
                if (documentUrl.indexOf('page') == -1) {
                        //window.history.replaceState(null, null, (documentUrl) + c + activeBlock.attr('id').substr(that.options.prefix.length));
                        //check if url contain  top-products
                        var activeblockcount = parseInt(activeBlock.attr('id').substr(that.options.prefix.length).replace('page',''));
                        //changes current url

                        //$(document).scrollStopped(function(){
                            //if(!activeBlock.hasClass(this.options.clickLoadinClass)){
                            //console.log(that.pageCounter ,that.options.countScrollLoading );
                            
                            console.log(that.pageCounter , activeblockcount);
                            //if (that.pageCounter >= that.options.countScrollLoading) {
                            var it = that.loader;
                            if( activeblockcount > that.pageCounter){
                            //if(((it).is(":visible")) && (it.isOnScreen() == true)){
                            //if((it.isOnScreen()) == false){
                                console.log('url not change');
                            }
                            else{
                                console.log('url change');
                                if(urlRewriteLevel){
                                    var second = xIndexOf('/', documentUrl, urlRewriteLevel);
                                   // console.log(xIndexOf('/', documentUrl, 2));
                                    //window.history.replaceState(null, null, (documentUrl.substr(0, documentUrl.lastIndexOf('/') + 1)) + activeBlock.attr('data-nxturl'));
                                    window.history.replaceState(null, null, (documentUrl.substr(0, second + 1)) + activeBlock.attr('data-nxturl'));

                                    urlPushAnalytics();

                                    }
                                    else{
                                        console.log('please confiure urlRewriteLevel from twig')
                                    }
                                }      
                               
                            //});



                        
                        //document.title = activeBlock.attr('data-nxturlmeta');

                        //update current metas
                        var newTitle = activeBlock.find('.mtitle').data('title');
                        var newKey = activeBlock.find('.mkey').data('key');
                        var newDesc = activeBlock.find('.mdesc').data('desc');

                        //prevents undefined title    
                        if(typeof newTitle == 'undefined'){
                            newTitle = defaultTitle;
                        }
                        
                        document.title = newTitle;
                        $('meta[name=keywords]').attr('keywords', newKey);
                        $('meta[name=description]').attr('description', newDesc);
                        //console.log('not default');
                        //console.log($('meta[name=keywords]').attr('keywords'));
                        //console.log(newTitle); 

                        //turn first main h1 to h2 of page
                        var r = $('section.top10-intro h1');
                        var c = $('<h2 class=""></h2>').append(r.contents());
                        r.replaceWith(c);


                        //turn all heading h1 to h2 of ajax content
                        var p = $('h1.h2_heading#new_head');
                        var a = $('<h2 class="h2_heading" id="new_head"></h2>').append(p.contents());
                        p.replaceWith(a);

                        //turn current h2 to h1 of ajax content
                        var q = activeBlock.find('h2.h2_heading#new_head');
                        var b = $('<h1 class="h2_heading" id="new_head"></h1>').append(q.contents());
                        q.replaceWith(b);
                    
                } else {
                    window.history.replaceState(null, null, (documentUrl.substring(0, documentUrl.lastIndexOf('/') + 1)) + activeBlock.attr('id').substr(that.options.prefix.length));

                }
            } else if (flag) {

                //update the default metas
                document.title = defaultTitle;
                $('meta[name=keywords]').attr('keywords', getDefaultMeta('keywords'));
                $('meta[name=description]').attr('description', getDefaultMeta('description'));
                //console.log('default');
                //console.log($('meta[name=keywords]').attr('keywords'));
                //console.log();

                //turn all heading h1 to h2 of ajax content
                var p = $('h1.h2_heading#new_head');
                var a = $('<h2 class="h2_heading" id="new_head"></h2>').append(p.contents());
                p.replaceWith(a);

                //turn first main h2 to h1 of page
                var r = $('section.top10-intro h2');
                var c = $('<h1 class=""></h1>').append(r.contents());
                r.replaceWith(c);

                urlPushAnalytics();

                
                if (isIE) {

                    window.history.replaceState(null, null, (documentUrl.replace(/page\d+/, '')));
                    if (window.location.hash !== '# ') {
                        var tempScrollTop = this.win.scrollTop();
                        //window.location.hash = ' ';
                        this.win.scrollTop(tempScrollTop);
                    }
                } else {


                    window.history.replaceState(null, null, (documentUrl.replace(/page\d+/, '')));
                    if (window.location.hash !== '') {
                        var tempScrollTop = this.win.scrollTop();
                        //window.location.hash = '';
                        this.win.scrollTop(tempScrollTop);
                    }
                }
            }
        },
        loadContent: function(obj) {
            var that = this;
            var win = $(window);
            obj.block.removeAttr('data-url');
            that.loader.hide();;
            that.pageCounter++;
            that.loader.find('.page-num').text(that.pageCounter + 1);
            that.loading = true;
            that.holder.addClass(that.options.loadingClass);
            that.ajaxRequest = $.ajax({
                url: obj.url,
                data: that.options.ajaxData,
                cache: false,
                type: 'get',
                dataType: 'text',
                success: function(data) {
                    //alert('ajax3');
                    var newContent = jQuery('<div>', {
                        html: data
                    });
                    var newItems = newContent.find(that.options.items);

                    newItems.find('.iGArea').attr('id', that.pageCounter);
                    //console.log(newItems);

                    //content gallery on autoload disabled temp

                    /*var igareaid = newItems.find('.iGArea').attr('id');
                    console.log(igareaid);
                    newItems.find('.iGArea#' + igareaid).contentGallery();*/
                    
                    //content gallery on auto load hidden temp
                    newItems.find('.contentGallery').hide();

                    //Change Url
                    var c = documentUrl.slice(-1);
                    c = (c != '/') ? '/' : '';

                    var holder = that.holder;
                    //console.log($(that.holder).data('urlRewriteLevel'));
                    //console.log($('.ajax-content-urlmeta').data('urlRewriteLevel'));
                    if(holder.hasClass('ajax-content-urlmeta') == true){
                        var urlRewriteLevel = holder.attr('data-urlRewriteLevel');
                    }
                    else{
                        var urlRewriteLevel = false;
                    }

                    if (documentUrl.indexOf('page') == -1) {
                        //window.history.replaceState(null, null, (documentUrl) + c + obj.block.attr('id').substr(that.options.prefix.length));

                        if(urlRewriteLevel){
                            var second = xIndexOf('/', documentUrl, urlRewriteLevel);
                           // console.log(xIndexOf('/', documentUrl, 2));
                            //window.history.replaceState(null, null, (documentUrl.substr(0, documentUrl.lastIndexOf('/') + 1)) + activeBlock.attr('data-nxturl'));
                            //window.history.replaceState(null, null, (documentUrl.substr(0, second + 1)) + activeBlock.attr('data-nxturl'));
                            window.history.replaceState(null, null, (documentUrl.substr(0, second + 1)) + obj.block.attr('data-nxturl'));
                            /*var u = document.URL.split("/").slice(3).join("/");
                            alert(u);
                            ga('send', 'pageview', u);
                            COMSCORE.beacon({
                                c1:"2",
                                c2: "9989804",
                                c4 : u});
                            _qevents.push({
                                qacct: "p-SFE6CaGnHx1hE", 
                                event: "refresh"
                            });*/

                        }
                        else{
                            console.log('please confiure urlRewriteLevel from twig')
                        }


                        

                        /*var newTitle = obj.block.children('.mtitle').data('title');
                        var newKey = obj.block.children('.mkey').data('key');
                        var newDesc = obj.block.children('.mdesc').data('desc');*/
                        //console.log(obj.block.children('.mtitle').html);
                        //document.title = newTitle;
                        //$('meta[name=keywords]').attr('keywords', newKey);
                        //$('meta[name=description]').attr('keywords', newDesc);
                        //console.log(newTitle,newKey,newDesc);
                        
                        /*DISQUS.reset({
                          reload: true,
                          config: function () {  
                            this.page.identifier = "newidentifier1";  
                            this.page.url = documentUrl;
                          }
                        });*/
                        // if(isDesktop()){    
                        //     /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                        //     var disqus_shortname = 'thinkdigittest'; // required: replace example with your forum shortname

                        //     /* * * DON'T EDIT BELOW THIS LINE * * */
                        //     (function() {
                        //     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                        //     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
                        //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                        //     })();
                        // }
                    
                    } else {
                        window.history.replaceState(null, null, (documentUrl.substring(0, documentUrl.lastIndexOf('/') + 1)) + obj.block.attr('id').substr(that.options.prefix.length));
                    }

                    // Load all images
                    var id = obj.block.attr('id').replace('ajax-page', '');

                    obj.block.removeClass(that.options.clickLoadinClass).append(newItems);
                    if (documentUrl.indexOf('/slideshows/') != -1 || documentUrl.indexOf('/videos/') != -1 || documentUrl.indexOf('/how-to/') != -1) {
                        var total_images = obj.block.find('img').length;
                        var images_loaded = 0;

                        obj.block.hide();
                        obj.block.find('img').one('load', function() {
                            images_loaded++;
                            if (images_loaded >= total_images) {
                                obj.block.show();

                                try {
                                    moreContent(id);
                                } catch (e) {

                                }


                            }

                        }).each(function() {
                            if (this.complete)
                                $(this).load();
                        });
                    } else {


                        try {
                            moreContent(id);
                        } catch (e) {

                        }

                    }
                    //setTimeout(function(){obj.block.show(), 1000});
                    that.holder.removeClass(that.options.loadingClass);
                    //window.location.hash = obj.block.attr('id').substr(that.options.prefix.length);



                    that.loading = false;
                    
                    that.makeCallback('onLoad', newItems);
                    if (typeof obj.complete == 'function') {
                        obj.complete();
                    }
                    if (that.pageCounter >= that.options.countScrollLoading) {
                        that.destroyedWindow = true;
                        that.loader.show();
                    }
                    if (that.blocks.eq(that.pageCounter).length == 0) {
                        that.loader.hide();
                    }
                },
                error: function() {
                    //alert('AJAX Error!');
                }
            });
        },
        destroy: function() {
            this.destroyedWindow = true;
        },
        loadHashBlocks: function(block) {
            var that = this;
            var blocks = block.add(block.prevAll(this.options.loadBlocks));
            blocks.each(function(ind) {
                var block = jQuery(this);
                that.loadContent({
                    block: block,
                    url: block.attr('data-url'),
                    complete: function() {
                        if (ind == blocks.length - 1) {
                            jQuery(window).scrollTop(block.offset().top);
                        }
                    }
                });
            });
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    }
    $.fn.InfinityScrlUrlMeta = function(options) {
        var args = Array.prototype.slice.apply(arguments);
        return this.each(function() {
            var instance = $.data(this, 'InfinityScrlUrlMeta');
            var methodName = args[0];
            if (instance) {
                if (typeof methodName === 'string') {
                    instance[methodName].apply(instance, args.slice(1));
                }
            } else if (typeof methodName !== 'string') {
                $(this).data('InfinityScrlUrlMeta', new InfinityScrlUrlMeta($.extend(options, {
                    holder: this
                })));
            }
        });
    }
}(jQuery));

/*
 * jQuery Custom Cycle Carousel plugin
 */
;
(function($) {
    function CustomScrollGallery(options) {
        this.options = $.extend({
            btnNext: '.btn-next',
            btnPrev: '.btn-prev',
            activeClass: 'active',
            mask: '.mask',
            slider: '.slideset',
            slides: '.slide',
            slideInStep: 4,
            animSpeed: 500,
            switchTime: 3000,
            autoRotation: false,
            galleryReadyClass: 'js-ready'
        }, options);
        this.init();
    }
    CustomScrollGallery.prototype = {
        init: function() {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.autoRotate();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function() {
            // find structure elements
            this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.mask = this.holder.find(this.options.mask);
            this.slider = this.mask.find(this.options.slider);
            this.sliderHTML = this.slider.html();
            this.slides = this.slider.find(this.options.slides);
            this.btnPrev = this.holder.find(this.options.btnPrev);
            this.btnNext = this.holder.find(this.options.btnNext);

            this.animateion = false;
            this.currentIndex = 0;
            this.slideInStep = this.options.slideInStep;
            this.step = this.setSizeSlides(this.slideInStep);

        },
        attachEvents: function() {
            var self = this;
            if (this.btnPrev.length) {
                this.btnPrevHandler = function(e) {
                    e.preventDefault();
                    self.prevSlide();
                };
                this.btnPrev.click(this.btnPrevHandler);
            }
            if (this.btnNext.length) {
                this.btnNextHandler = function(e) {
                    e.preventDefault();
                    self.nextSlide();
                };
                this.btnNext.click(this.btnNextHandler);
            }

            // swipe gestures handler
            if (isTouchDevice) {
                this.mask.hammer({
                    drag_block_horizontal: true,
                    drag_min_distance: 1
                }).on('release swipeleft swiperight', function(ev) {
                    switch (ev.type) {
                        case 'swipeleft':
                            self.nextSlide();
                            ev.gesture.stopDetect();
                            break;
                        case 'swiperight':
                            self.prevSlide();
                            ev.gesture.stopDetect();
                            break;
                    }
                });
            }

            this.resizeHandler = function() {
                self.onWindowResize();
            };
            $(window).bind('load resize orientationchange', this.resizeHandler);
        },
        onWindowResize: function() {
            this.makeCallback('onResize', this);
            this.step = this.setSizeSlides(this.slideInStep);
        },
        setSizeSlides: function(count) {
            this.slider.css({width: 9999});
            this.slides.css({width: Math.ceil(this.mask.width() / count)});
            this.slider.css({width: Math.ceil(this.slides.eq(0).width()) * this.slides.length});
            return Math.ceil(this.slides.eq(0).width())
        },
        prevSlide: function() {
            if (!this.isAnimation) {
                this.currentIndex++;
                this.switchSlide(1);
            }
        },
        nextSlide: function(fromAutoRotation) {
            if (!this.isAnimation) {
                this.currentIndex++;
                this.switchSlide(-1);
            }
        },
        prepeare: function(direction) {
            var self = this;
            if (direction > 0) {
                this.slider.css({marginLeft: -this.step});
                this.slider.prepend(this.slides.eq(this.slides.length - 1));
            }
            else {
                this.slider.append(this.slides.eq(0));
            }
        },
        switchSlide: function(direction) {
            var self = this;
            if (direction > 0) {
                this.prepeare(direction);
            }
            this.slider.stop().animate({
                marginLeft: direction > 0 ? 0 : direction * this.step
            }, {
                duration: this.options.animSpeed,
                complete: function() {
                    self.prepeare(direction);
                    self.resetSlider();
                    self.autoRotate();
                    self.makeCallback('onChange', self);
                }
            });
            this.makeCallback('onBefore', this);
        },
        autoRotate: function() {
            var self = this;
            if (this.options.autorotation) {
                clearTimeout(this.autoTimer);
                this.autoTimer = setTimeout(function() {
                    self.currentIndex++;
                    self.switchSlide(-1);
                    self.autoRotate();
                }, this.options.switchTime);
            }
        },
        resetSlider: function() {
            this.slider.css({marginLeft: ''});
            this.slides = this.slider.find(this.options.slides);
            this.refreshState();
        },
        refreshState: function() {
            this.slides.removeClass(this.options.activeClass).eq(0).addClass(this.options.activeClass);
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            clearTimeout(this.autoTimer);
            this.btnPrev.unbind('click', this.btnPrevHandler);
            this.btnNext.unbind('click', this.btnNextHandler);
            this.mask.hammer().off('swipeleft swiperight');
            $(window).unbind('load resize orientationchange', this.resizeHandler);
            this.holder.removeClass(this.options.galleryReadyClass);
            this.slider.add(this.slides).removeAttr('style');
            this.slider.html(this.sliderHTML);
        }
    };

    // detect device type
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.customScrollGallery = function(opt) {
        return this.each(function() {
            $(this).data('CustomScrollGallery', new CustomScrollGallery($.extend(opt, {holder: this})));
        });
    };
}(jQuery));

/*
 * Infinity Content
 */
;
(function($) {
    function InfinityContent(options) {
        this.options = {
            items: '>*',
            loadingClass: 'loading',
            targetBlock: '.loading-holder',
            loader: '.load-box',
            moreLink: '.more-link',
            ajaxData: 'ajax=1'
        }
        $.extend(this.options, options);
        this.init();
    }
    InfinityContent.prototype = {
        init: function() {
            this.findElements();
            this.addEvents();
            this.makeCallback('onInit', this);
        },
        findElements: function() {
            this.holder = $(this.options.holder);
            this.targetBlock = this.holder.find(this.options.targetBlock);
            this.loader = this.holder.find(this.options.loader);
            this.moreLink = this.holder.find(this.options.moreLink);
            this.loading = false;
            this.destroyed = false;
        },
        addEvents: function() {
            var that = this;
            this.clickHandler = function(e) {
                e.preventDefault();
                if (!that.destroyed && !that.loading) {
                    that.loadContent();
                }
            }
            this.moreLink.bind('click', this.clickHandler);
        },
        loadContent: function() {
            var that = this;
            that.loading = true;
            that.holder.addClass(that.options.loadingClass);
            if (that.ajaxRequest) {
                that.ajaxRequest.abort();
            }
            that.ajaxRequest = $.ajax({
                url: that.moreLink.attr('href'),
                data: that.options.ajaxData,
                cache: false,
                type: 'get',
                dataType: 'text',
                success: function(data) {
                    var newContent = jQuery('<div>', {
                        html: data
                    });
                    var newItems = newContent.find(that.options.items).not(that.options.moreLink);
                    var newMoreLink = newContent.find(that.options.moreLink);
                    that.targetBlock.append(newItems);
                    that.holder.removeClass(that.options.loadingClass);
                    if (newMoreLink.length) {
                        that.moreLink.attr('href', newMoreLink.attr('href'));
                        that.loading = false;
                    } else {
                        that.moreLink.unbind('click', that.clickHandler);
                        that.loader.hide();
                    }
                    that.makeCallback('onLoad', newItems);
                },
                error: function() {
                    //alert('AJAX Error!');
                }
            });
        },
        destroy: function() {
            this.destroyed = true;

        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    }
    $.fn.infinityContent = function(options) {
        var args = Array.prototype.slice.apply(arguments);
        return this.each(function() {
            var instance = $.data(this, 'InfinityContent');
            var methodName = args[0];
            if (instance) {
                if (typeof methodName === 'string') {
                    instance[methodName].apply(instance, args.slice(1));
                }
            } else if (typeof methodName !== 'string') {
                $(this).data('InfinityContent', new InfinityContent($.extend(options, {holder: this})));
            }
        });
    }
}(jQuery));

/*
 * jQuery Cycle Carousel plugin
 */
;
(function($) {
    function ScrollAbsoluteGallery(options) {
        this.options = $.extend({
            activeClass: 'active',
            mask: 'div.slides-mask',
            slider: '>ul',
            slides: '>li',
            btnPrev: '.btn-prev',
            btnNext: '.btn-next',
            pagerLinks: 'ul.pager > li',
            generatePagination: false,
            pagerList: '<ul>',
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: 'a',
            galleryReadyClass: 'gallery-js-ready',
            currentNumber: 'span.current-num',
            totalNumber: 'span.total-num',
            btnPlayPause: '.btn-play-pause',
            autorotationActiveClass: 'autorotate',
            btnPlay: '.btn-play',
            maskAutoSize: false,
            autoRotation: false,
            pauseOnHover: false,
            stretchSlideToMask: false,
            switchTime: 3000,
            animSpeed: 500,
            handleTouch: true,
            swipeThreshold: 15,
            vertical: false,
            event: 'click'
        }, options);
        this.init();
    }
    ScrollAbsoluteGallery.prototype = {
        init: function() {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function() {
            // find structure elements
            this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.mask = this.holder.find(this.options.mask);
            this.slider = this.mask.find(this.options.slider);
            this.slides = this.slider.find(this.options.slides);
            this.btnPrev = this.holder.find(this.options.btnPrev);
            this.btnNext = this.holder.find(this.options.btnNext);

            this.btnPlay = this.holder.find(this.options.btnPlay);
            this.btnPlayPause = this.holder.find(this.options.btnPlayPause);

            // slide count display
            this.currentNumber = this.holder.find(this.options.currentNumber);
            this.totalNumber = this.holder.find(this.options.totalNumber);

            // create gallery pagination
            if (typeof this.options.generatePagination === 'string') {
                this.pagerLinks = this.buildPagination();
            } else {
                this.pagerLinks = this.holder.find(this.options.pagerLinks);
            }

            // define index variables
            this.sizeProperty = this.options.vertical ? 'height' : 'width';
            this.positionProperty = this.options.vertical ? 'top' : 'left';
            this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';

            this.slideSize = this.slides[this.sizeProperty]();
            this.currentIndex = 0;
            this.prevIndex = 0;

            // reposition elements
            this.options.maskAutoSize = this.options.vertical ? false : this.options.maskAutoSize;
            if (this.options.vertical) {
                this.mask.css({
                    height: this.slides.innerHeight()
                });
            }
            if (this.options.maskAutoSize) {
                this.mask.css({
                    height: this.slider.height()
                });
            }
            this.slider.css({
                position: 'relative',
                height: this.options.vertical ? this.slideSize * this.slides.length : '100%'
            });
            this.slides.css({
                position: 'absolute'
            }).css(this.positionProperty, -9999).eq(this.currentIndex).css(this.positionProperty, 0);
            this.refreshState();
        },
        buildPagination: function() {
            var pagerLinks = $();
            if (!this.pagerHolder) {
                this.pagerHolder = this.holder.find(this.options.generatePagination);
            }
            if (this.pagerHolder.length) {
                this.pagerHolder.empty();
                this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
                for (var i = 0; i < this.slides.length; i++) {
                    $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i + 1);
                }
                pagerLinks = this.pagerList.children();
            }
            return pagerLinks;
        },
        attachEvents: function() {
            // attach handlers
            var self = this;
            if (this.btnPrev.length) {
                this.btnPrevHandler = function(e) {
                    e.preventDefault();
                    self.prevSlide();
                };
                this.btnPrev.click(this.btnPrevHandler);
            }
            if (this.btnNext.length) {
                this.btnNextHandler = function(e) {
                    e.preventDefault();
                    self.nextSlide();
                };
                this.btnNext.click(this.btnNextHandler);
            }
            if (this.pagerLinks.length) {
                this.pagerLinksHandler = function(e) {
                    e.preventDefault();
                    self.numSlide(self.pagerLinks.index(e.currentTarget));
                };
                this.pagerLinks.click(this.pagerLinksHandler);
            }

            // handle autorotation pause on hover
            if (this.options.pauseOnHover) {
                this.hoverHandler = function() {
                    clearTimeout(self.timer);
                };
                this.leaveHandler = function() {
                    self.autoRotate();
                };
                this.holder.bind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
            }

            // handle holder and slides dimensions
            this.resizeHandler = function() {
                if (!self.animating) {
                    if (self.options.stretchSlideToMask) {
                        self.resizeSlides();
                    }
                    self.resizeHolder();
                    self.setSlidesPosition(self.currentIndex);
                }
            };
            $(window).bind('load resize orientationchange', this.resizeHandler);
            if (self.options.stretchSlideToMask) {
                self.resizeSlides();
            }

            // handle swipe on mobile devices
            if (this.options.handleTouch && jQuery.fn.hammer && this.slides.length > 1 && isTouchDevice) {
                this.mask.hammer({
                    drag_block_horizontal: self.options.vertical ? false : true,
                    drag_block_vertical: self.options.vertical ? true : false,
                    drag_min_distance: 1
                }).on('touch release ' + (this.options.vertical ? 'swipeup swipedown dragup dragdown' : 'swipeleft swiperight dragleft dragright'), function(ev) {
                    switch (ev.type) {
                        case (self.options.vertical ? 'dragup' : 'dragright'):
                        case (self.options.vertical ? 'dragdown' : 'dragleft'):
                            if (!self.animating) {
                                self.swipeOffset = -self.slideSize + ev.gesture[self.options.vertical ? 'deltaY' : 'deltaX'];
                                self.slider.css(self.animProperty, self.swipeOffset);
                                clearTimeout(self.timer);
                            }
                            ev.gesture.preventDefault();
                            break;
                        case (self.options.vertical ? 'swipeup' : 'swipeleft'):
                            if (!self.animating) {
                                self.nextSlide();
                                self.swipeOffset = 0;
                            }
                            ev.gesture.stopDetect();
                            break;
                        case (self.options.vertical ? 'swipedown' : 'swiperight'):
                            if (!self.animating) {
                                self.prevSlide();
                                self.swipeOffset = 0;
                            }
                            ev.gesture.stopDetect();
                            break;
                        case 'release':
                            if (Math.abs(ev.gesture[self.options.vertical ? 'deltaY' : 'deltaX']) > self.options.swipeThreshold) {
                                if (self.options.vertical) {
                                    if (ev.gesture.direction == 'down') {
                                        self.prevSlide();
                                    } else if (ev.gesture.direction == 'up') {
                                        self.nextSlide();
                                    }
                                }
                                else {
                                    if (ev.gesture.direction == 'right') {
                                        self.prevSlide();
                                    } else if (ev.gesture.direction == 'left') {
                                        self.nextSlide();
                                    }
                                }
                            }
                            else {
                                var tmpObj = {};
                                tmpObj[self.animProperty] = -self.slideSize;
                                self.slider.animate(tmpObj, {duration: self.options.animSpeed});
                            }
                            self.swipeOffset = 0;
                            break;
                    }
                });
            }

            // autorotation buttons handler
            if (this.btnPlay.length) {
                this.btnPlayHandler = function(e) {
                    e.preventDefault();
                    self.startRotation();
                };
                this.btnPlay.bind(this.options.event, this.btnPlayHandler);
            }
            if (this.btnPlayPause.length) {
                this.btnPlayPauseHandler = function(e) {
                    e.preventDefault();
                    if (!self.holder.hasClass(self.options.autorotationActiveClass)) {
                        self.startRotation();
                    } else {
                        self.stopRotation();
                    }
                };
                this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
            }

            // start autorotation
            this.autoRotate();
            this.resizeHolder();
            this.setSlidesPosition(this.currentIndex);
        },
        resizeSlides: function() {
            this.slideSize = this.mask[this.options.vertical ? 'height' : 'width']();
            this.slides.css(this.sizeProperty, this.slideSize);
        },
        resizeHolder: function() {
            if (this.options.maskAutoSize) {
                this.mask.css({
                    height: this.slides.eq(this.currentIndex).outerHeight(true)
                });
            }
        },
        prevSlide: function() {
            if (typeof imageOffset != 'undefined') {
                if (!flag) {
                    if (imageOffset > 1)
                        imageOffset--;
                    else
                        imageOffset = len;
                    changeLocation(imageOffset);
                }
            }
            if (!this.animating && this.slides.length > 1) {
                this.direction = -1;
                this.prevIndex = this.currentIndex;
                if (this.currentIndex > 0)
                    this.currentIndex--;
                else
                    this.currentIndex = this.slides.length - 1;
                this.switchSlide();
            }
        },
        nextSlide: function(fromAutoRotation) {
            if (typeof imageOffset != 'undefined') {
                if (!flag) {
                    if (imageOffset < len)
                        imageOffset++;
                    else
                        imageOffset = 1;
                    changeLocation(imageOffset);
                }
            }
            if (!this.animating && this.slides.length > 1) {
                this.direction = 1;
                this.prevIndex = this.currentIndex;
                if (this.currentIndex < this.slides.length - 1)
                    this.currentIndex++;
                else
                    this.currentIndex = 0;
                this.switchSlide();
            }
        },
        numSlide: function(c) {
            if (!this.animating && this.currentIndex !== c && this.slides.length > 1) {
                this.direction = c > this.currentIndex ? 1 : -1;
                this.prevIndex = this.currentIndex;
                this.currentIndex = c;
                this.switchSlide();
            }
        },
        preparePosition: function() {
            // prepare slides position before animation
            this.setSlidesPosition(this.prevIndex, this.direction < 0 ? this.currentIndex : null, this.direction > 0 ? this.currentIndex : null, this.direction);
        },
        setSlidesPosition: function(index, slideLeft, slideRight, direction) {
            // reposition holder and nearest slides
            if (this.slides.length > 1) {
                var prevIndex = (typeof slideLeft === 'number' ? slideLeft : index > 0 ? index - 1 : this.slides.length - 1);
                var nextIndex = (typeof slideRight === 'number' ? slideRight : index < this.slides.length - 1 ? index + 1 : 0);

                this.slider.css(this.animProperty, this.swipeOffset ? this.swipeOffset : -this.slideSize);
                this.slides.css(this.positionProperty, -9999).eq(index).css(this.positionProperty, this.slideSize);
                if (prevIndex === nextIndex && typeof direction === 'number') {
                    var calcOffset = direction > 0 ? this.slideSize * 2 : 0;
                    this.slides.eq(nextIndex).css(this.positionProperty, calcOffset);
                } else {
                    this.slides.eq(prevIndex).css(this.positionProperty, 0);
                    this.slides.eq(nextIndex).css(this.positionProperty, this.slideSize * 2);
                }
            }
        },
        switchSlide: function() {
            // prepare positions and calculate offset
            var self = this;
            var oldSlide = this.slides.eq(this.prevIndex);
            var newSlide = this.slides.eq(this.currentIndex);
            this.animating = true;

            // resize mask to fit slide
            if (this.options.maskAutoSize) {
                this.mask.animate({
                    height: newSlide.outerHeight(true)
                }, {
                    duration: this.options.animSpeed
                });
            }

            // start animation
            var animProps = {};
            animProps[this.animProperty] = this.direction > 0 ? -this.slideSize * 2 : 0;
            this.preparePosition();
            this.slider.animate(animProps, {duration: this.options.animSpeed, complete: function() {
                    self.setSlidesPosition(self.currentIndex);

                    // start autorotation
                    self.animating = false;
                    self.makeCallback('onChange', self);
                    self.autoRotate();
                }});

            this.makeCallback('onBeforeChange', this);
            // refresh classes
            this.refreshState();
        },
        refreshState: function(initial) {
            // slide change function
            this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
            this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);

            // display current slide number
            this.currentNumber.html(this.currentIndex + 1);
            this.totalNumber.html(this.slides.length);
        },
        startRotation: function() {
            this.holder.addClass(this.options.autorotationActiveClass);
            this.options.autoRotation = true;
            this.autoRotate();
            this.makeCallback('onStartRotation', this);
        },
        stopRotation: function() {
            this.holder.removeClass(this.options.autorotationActiveClass);
            this.options.autoRotation = false;
            clearTimeout(this.timer);
            this.makeCallback('onStopRotation', this);
        },
        autoRotate: function() {
            var self = this;
            clearTimeout(this.timer);
            if (this.options.autoRotation) {
                this.timer = setTimeout(function() {
                    self.nextSlide();
                }, this.options.switchTime);
            }
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            // destroy handler
            this.btnPrev.unbind('click', this.btnPrevHandler);
            this.btnNext.unbind('click', this.btnNextHandler);
            this.pagerLinks.unbind('click', this.pagerLinksHandler);
            this.holder.unbind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
            $(window).unbind('load resize orientationchange', this.resizeHandler);
            clearTimeout(this.timer);

            // destroy swipe handler
            if (this.options.handleTouch && $.fn.hammer) {
                this.mask.hammer().off('touch release swipeleft swiperight swipeup swipedown dragup dragdown dragleft dragright');
            }

            // remove inline styles, classes and pagination
            this.holder.removeClass(this.options.galleryReadyClass);
            this.slider.add(this.slides).removeAttr('style');
            if (typeof this.options.generatePagination === 'string') {
                this.pagerHolder.empty();
            }
        }
    };

    // detect device type
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.scrollAbsoluteGallery = function(opt) {
        return this.each(function() {
            $(this).data('ScrollAbsoluteGallery', new ScrollAbsoluteGallery($.extend(opt, {holder: this})));
        });
    };
}(jQuery));

/*
 * jQuery Tabs plugin
 */
;
(function($) {
    $.fn.contentTabs = function(o) {
        // default options
        var options = $.extend({
            activeClass: 'active',
            addToParent: false,
            autoHeight: false,
            autoRotate: false,
            checkHash: false,
            animSpeed: 400,
            switchTime: 3000,
            effect: 'none', // "fade", "slide"
            tabLinks: 'a',
            attrib: 'href',
            event: 'click'
        }, o);

        return this.each(function() {
            var tabset = $(this), tabs = $();
            var tabLinks = tabset.find(options.tabLinks);
            var tabLinksParents = tabLinks.parent();
            var prevActiveLink = tabLinks.eq(0), currentTab, animating;
            var tabHolder;

            // handle location hash
            if (options.checkHash && tabLinks.filter('[' + options.attrib + '="' + location.hash + '"]').length) {
                (options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
                setTimeout(function() {
                    window.scrollTo(0, 0);
                }, 1);
            }

            // init tabLinks
            tabLinks.each(function() {
                var link = $(this);
                var href = link.attr(options.attrib);
                var parent = link.parent();
                href = href.substr(href.lastIndexOf('#'));

                // get elements
                var tab = $(href);
                tabs = tabs.add(tab);
                link.data('cparent', parent);
                link.data('ctab', tab);

                // find tab holder
                if (!tabHolder && tab.length) {
                    tabHolder = tab.parent();
                }

                // show only active tab
                var classOwner = options.addToParent ? parent : link;
                if (classOwner.hasClass(options.activeClass) || (options.checkHash && location.hash === href)) {
                    classOwner.addClass(options.activeClass);
                    prevActiveLink = link;
                    currentTab = tab;
                    tab.removeClass(tabHiddenClass).width('');
                    contentTabsEffect[options.effect].show({tab: tab, fast: true});
                } else {
                    var tabWidth = tab.width();
                    if (tabWidth) {
                        tab.width(tabWidth);
                    }
                    tab.addClass(tabHiddenClass);
                }

                // event handler
                link.bind(options.event, function(e) {
                    if (link != prevActiveLink && !animating) {
                        switchTab(prevActiveLink, link);
                        prevActiveLink = link;
                    }
                });
                if (options.attrib === 'href') {
                    link.bind('click', function(e) {
                        e.preventDefault();
                    });
                }
            });

            // tab switch function
            function switchTab(oldLink, newLink) {
                animating = true;
                var oldTab = oldLink.data('ctab');
                var newTab = newLink.data('ctab');
                prevActiveLink = newLink;
                currentTab = newTab;

                // refresh pagination links
                (options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
                (options.addToParent ? newLink.data('cparent') : newLink).addClass(options.activeClass);

                // hide old tab
                resizeHolder(oldTab, true);
                contentTabsEffect[options.effect].hide({
                    speed: options.animSpeed,
                    tab: oldTab,
                    complete: function() {
                        // show current tab
                        resizeHolder(newTab.removeClass(tabHiddenClass).width(''));
                        contentTabsEffect[options.effect].show({
                            speed: options.animSpeed,
                            tab: newTab,
                            complete: function() {
                                if (!oldTab.is(newTab)) {
                                    oldTab.width(oldTab.width()).addClass(tabHiddenClass);
                                }
                                animating = false;
                                resizeHolder(newTab, false);
                                autoRotate();
                            }
                        });
                    }
                });
            }

            // holder auto height
            function resizeHolder(block, state) {
                var curBlock = block && block.length ? block : currentTab;
                if (options.autoHeight && curBlock) {
                    tabHolder.stop();
                    if (state === false) {
                        tabHolder.css({height: ''});
                    } else {
                        var origStyles = curBlock.attr('style');
                        curBlock.show().css({width: curBlock.width()});
                        var tabHeight = curBlock.outerHeight(true);
                        if (!origStyles)
                            curBlock.removeAttr('style');
                        else
                            curBlock.attr('style', origStyles);
                        if (state === true) {
                            tabHolder.css({height: tabHeight});
                        } else {
                            tabHolder.animate({height: tabHeight}, {duration: options.animSpeed});
                        }
                    }
                }
            }
            if (options.autoHeight) {
                $(window).bind('resize orientationchange', function() {
                    tabs.not(currentTab).removeClass(tabHiddenClass).show().each(function() {
                        var tab = jQuery(this), tabWidth = tab.css({width: ''}).width();
                        if (tabWidth) {
                            tab.width(tabWidth);
                        }
                    }).hide().addClass(tabHiddenClass);

                    resizeHolder(currentTab, false);
                });
            }

            // autorotation handling
            var rotationTimer;
            function nextTab() {
                var activeItem = (options.addToParent ? tabLinksParents : tabLinks).filter('.' + options.activeClass);
                var activeIndex = (options.addToParent ? tabLinksParents : tabLinks).index(activeItem);
                var newLink = tabLinks.eq(activeIndex < tabLinks.length - 1 ? activeIndex + 1 : 0);
                prevActiveLink = tabLinks.eq(activeIndex);
                switchTab(prevActiveLink, newLink);
            }
            function autoRotate() {
                if (options.autoRotate && tabLinks.length > 1) {
                    clearTimeout(rotationTimer);
                    rotationTimer = setTimeout(function() {
                        if (!animating) {
                            nextTab();
                        } else {
                            autoRotate();
                        }
                    }, options.switchTime);
                }
            }
            autoRotate();
        });
    };

    // add stylesheet for tabs on DOMReady
    var tabHiddenClass = 'js-tab-hidden';
    $(function() {
        var tabStyleSheet = $('<style type="text/css">')[0];
        var tabStyleRule = '.' + tabHiddenClass;
        tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
        if (tabStyleSheet.styleSheet) {
            tabStyleSheet.styleSheet.cssText = tabStyleRule;
        } else {
            tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
        }
        $('head').append(tabStyleSheet);
    });

    // tab switch effects
    var contentTabsEffect = {
        none: {
            show: function(o) {
                o.tab.css({display: 'block'});
                if (o.complete)
                    o.complete();
            },
            hide: function(o) {
                o.tab.css({display: 'none'});
                if (o.complete)
                    o.complete();
            }
        },
        fade: {
            show: function(o) {
                if (o.fast)
                    o.speed = 1;
                o.tab.fadeIn(o.speed);
                if (o.complete)
                    setTimeout(o.complete, o.speed);
            },
            hide: function(o) {
                if (o.fast)
                    o.speed = 1;
                o.tab.fadeOut(o.speed);
                if (o.complete)
                    setTimeout(o.complete, o.speed);
            }
        },
        slide: {
            show: function(o) {
                var tabHeight = o.tab.show().css({width: o.tab.width()}).outerHeight(true);
                var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
                tmpWrap.css({width: '100%', overflow: 'hidden', position: 'relative'});
                o.tab.css({marginTop: -tabHeight, display: 'block'});
                if (o.fast)
                    o.speed = 1;
                o.tab.animate({marginTop: 0}, {duration: o.speed, complete: function() {
                        o.tab.css({marginTop: '', width: ''}).insertBefore(tmpWrap);
                        tmpWrap.remove();
                        if (o.complete)
                            o.complete();
                    }});
            },
            hide: function(o) {
                var tabHeight = o.tab.show().css({width: o.tab.width()}).outerHeight(true);
                var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
                tmpWrap.css({width: '100%', overflow: 'hidden', position: 'relative'});

                if (o.fast)
                    o.speed = 1;
                o.tab.animate({marginTop: -tabHeight}, {duration: o.speed, complete: function() {
                        o.tab.css({display: 'none', marginTop: '', width: ''}).insertBefore(tmpWrap);
                        tmpWrap.remove();
                        if (o.complete)
                            o.complete();
                    }});
            }
        }
    };
}(jQuery));

/*
 * jQuery Dropdown plugin
 */
;
(function($) {
    $.fn.customAnimDropdown = function(o) {
        // default options

        var options = $.extend({
            hoverClass: 'hover',
            dropClass: 'drop-active',
            items: 'li',
            drop: '>ul',
            delay: 100,
            animSpeed: 200

        }, o);

        return this.each(function() {
            // options
            var nav = $(this),
                    items = nav.find(options.items);
            var activeItem = jQuery();

            items.addClass(options.hoverClass).each(function() {
                var item = $(this), delayTimer;
                var drop = item.find(options.drop);
                item.data('drop', drop);
                if (drop.length) {
                    prepareDrop({item: item, drop: drop});
                }

                item.bind('mouseenter', function() {
                    activeItem = items.filter('.' + options.hoverClass);
                    hideAllDropdowns(item);
                    item.addClass(options.hoverClass);
                    if (activeItem.length) {
                        if (drop.length && item.hasClass(options.hoverClass)) {
                            item.addClass(options.dropClass);
                            animDrop({drop: drop, state: true, speed: activeItem.length ? 0 : options.animSpeed, complete: function() {
                                    // callback
                                }});
                        }
                    } else {
                        clearTimeout(delayTimer);
                        delayTimer = setTimeout(function() {
                            if (drop.length && item.hasClass(options.hoverClass)) {
                                item.addClass(options.dropClass);
                                animDrop({drop: drop, state: true, speed: activeItem.length ? 0 : options.animSpeed, complete: function() {
                                        // callback
                                    }});
                            }
                        }, options.delay);
                    }
                    item.data('timer', delayTimer);
                }).bind('mouseleave', function() {
                    if (!item.hasClass(options.dropClass)) {
                        item.removeClass(options.hoverClass);
                    }
                    clearTimeout(delayTimer);
                    delayTimer = setTimeout(function() {
                        if (drop.length && item.hasClass(options.dropClass)) {
                            animDrop({drop: drop, state: false, speed: options.animSpeed, complete: function() {
                                    // callback
                                    item.removeClass(options.hoverClass);
                                    item.removeClass(options.dropClass);
                                }});
                        }
                        activeItem = jQuery();
                    }, options.delay);
                    item.data('timer', delayTimer);
                });
            });

            // hide dropdowns
            items.removeClass(options.hoverClass);
            items.each(function() {
                postProcessDrop({item: $(this)});
            });

            // hide current level dropdowns
            function hideAllDropdowns(except) {
                var siblings = except.siblings();
                siblings.removeClass(options.hoverClass).each(function() {
                    var item = $(this);
                    clearTimeout(item.data('timer'));
                });
                siblings.filter('.' + options.dropClass).each(function() {
                    var item = jQuery(this).removeClass(options.dropClass);
                    if (item.data('drop').length) {
                        animDrop({drop: item.data('drop'), state: false, speed: activeItem.length ? 0 : options.animSpeed});
                    }
                });
            }
        });
    };

    function animDrop(o) {
        o.drop.data('wrap').show().css({overflow: 'hidden'});
        o.drop.stop().animate({marginTop: o.state ? 0 : -o.drop.data('height')}, {duration: o.speed || 0, complete: function() {
                if (o.state) {
                    o.drop.css({marginTop: ''});
                    o.drop.data('wrap').css({overflow: ''});
                } else {
                    o.drop.data('wrap').css({display: 'none'});
                }
                if (typeof o.complete === 'function') {
                    o.complete.call(o.drop);
                }
            }});
    }
    function prepareDrop(o) {
        var elementWrap = o.drop.wrap('<div class="drop-slide-wrapper">').show().parent();
        var elementHeight = o.drop.outerHeight(true);
        var elementWidth = o.drop.outerWidth(true);

        elementWrap.css({
            height: elementHeight,
            width: elementWidth,
            position: 'absolute',
            overflow: 'hidden',
            top: o.drop.css('top'),
            left: o.drop.css('left')
        });
        o.drop.css({
            position: 'static',
            display: 'block',
            top: 'auto',
            left: 'auto'
        });
        o.drop.data('height', elementHeight).data('wrap', elementWrap).css({marginTop: -elementHeight});
    }
    function postProcessDrop(o) {
        if (o.item.data('drop').length) {
            o.item.data('drop').data('wrap').css({display: 'none'});
        }
    }
}(jQuery));

/*
 * jQuery Dropdown plugin
 */
;
(function($) {
    $.fn.animDropdown = function(o) {
        // default options
        var options = $.extend({
            hoverClass: 'hover',
            dropClass: 'drop-active',
            items: 'li',
            drop: '>ul',
            delay: 500,
            animSpeed: 300,
            effect: 'fade'
        }, o);

        return this.each(function() {
            // options
            var nav = $(this),
                    items = nav.find(options.items);

            items.addClass(options.hoverClass).each(function() {
                var item = $(this), delayTimer;
                var drop = item.find(options.drop);
                item.data('drop', drop);
                if (drop.length) {
                    dropdownEffects[options.effect].prepare({item: item, drop: drop});
                }

                item.bind('mouseenter', function() {
                    hideAllDropdowns(item);
                    item.addClass(options.hoverClass);
                    clearTimeout(delayTimer);
                    delayTimer = setTimeout(function() {
                        if (drop.length && item.hasClass(options.hoverClass)) {
                            item.addClass(options.dropClass);
                            dropdownEffects[options.effect].animate({drop: drop, state: true, speed: options.animSpeed, complete: function() {
                                    // callback
                                }});
                        }
                    }, options.delay);
                    item.data('timer', delayTimer);
                }).bind('mouseleave', function() {
                    if (!item.hasClass(options.dropClass)) {
                        item.removeClass(options.hoverClass);
                    }
                    clearTimeout(delayTimer);
                    delayTimer = setTimeout(function() {
                        if (drop.length && item.hasClass(options.dropClass)) {
                            dropdownEffects[options.effect].animate({drop: drop, state: false, speed: options.animSpeed, complete: function() {
                                    // callback
                                    item.removeClass(options.hoverClass);
                                    item.removeClass(options.dropClass);
                                }});
                        }
                    }, options.delay);
                    item.data('timer', delayTimer);
                });
            });

            // hide dropdowns
            items.removeClass(options.hoverClass);
            if (dropdownEffects[options.effect].postProcess) {
                items.each(function() {
                    dropdownEffects[options.effect].postProcess({item: $(this)});
                });
            }

            // hide current level dropdowns
            function hideAllDropdowns(except) {
                var siblings = except.siblings();
                siblings.removeClass(options.hoverClass).each(function() {
                    var item = $(this);
                    clearTimeout(item.data('timer'));
                });
                siblings.filter('.' + options.dropClass).each(function() {
                    var item = jQuery(this).removeClass(options.dropClass);
                    if (item.data('drop').length) {
                        dropdownEffects[options.effect].animate({drop: item.data('drop'), state: false, speed: options.animSpeed});
                    }
                });
            }
        });
    };

    // dropdown effects
    var dropdownEffects = {
        fade: {
            prepare: function(o) {
                o.drop.css({opacity: 0, display: 'none'});
            },
            animate: function(o) {
                o.drop.stop().show().animate({opacity: o.state ? 1 : 0}, {duration: o.speed || 0, complete: function() {
                        if (o.state) {
                            o.drop.css({opacity: ''});
                        } else {
                            o.drop.css({opacity: 0, display: 'none'});
                        }
                        if (typeof o.complete === 'function') {
                            o.complete.call(o.drop);
                        }
                    }});
            }
        },
        slide: {
            prepare: function(o) {
                var elementWrap = o.drop.wrap('<div class="drop-slide-wrapper">').show().parent();
                var elementHeight = o.drop.outerHeight(true);
                var elementWidth = o.drop.outerWidth(true);
                elementWrap.css({
                    height: elementHeight,
                    width: elementWidth,
                    position: 'absolute',
                    overflow: 'hidden',
                    top: o.drop.css('top'),
                    left: o.drop.css('left')
                });
                o.drop.css({
                    position: 'static',
                    display: 'block',
                    top: 'auto',
                    left: 'auto'
                });
                o.drop.data('height', elementHeight).data('wrap', elementWrap).css({marginTop: -elementHeight});
            },
            animate: function(o) {
                o.drop.data('wrap').show().css({overflow: 'hidden'});
                o.drop.stop().animate({marginTop: o.state ? 0 : -o.drop.data('height')}, {duration: o.speed || 0, complete: function() {
                        if (o.state) {
                            o.drop.css({marginTop: ''});
                            o.drop.data('wrap').css({overflow: ''});
                        } else {
                            o.drop.data('wrap').css({display: 'none'});
                        }
                        if (typeof o.complete === 'function') {
                            o.complete.call(o.drop);
                        }
                    }});
            },
            postProcess: function(o) {
                if (o.item.data('drop').length) {
                    o.item.data('drop').data('wrap').css({display: 'none'});
                }
            }
        }
    };
}(jQuery));

/*
 * jQuery Open/Close plugin
 */
;
(function($) {
    function OpenClose(options) {
        this.options = $.extend({
            addClassBeforeAnimation: true,
            hideOnClickOutside: false,
            activeClass: 'active',
            opener: '.opener',
            slider: '.slide',
            animSpeed: 400,
            effect: 'fade',
            event: 'click'
        }, options);
        this.init();
    }
    OpenClose.prototype = {
        init: function() {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit');
            }
        },
        findElements: function() {
            this.holder = $(this.options.holder);
            this.opener = this.holder.find(this.options.opener);
            this.slider = this.holder.find(this.options.slider);
        },
        attachEvents: function() {
            // add handler
            var self = this;
            this.eventHandler = function(e) {
                e.preventDefault();
                if (self.slider.hasClass(slideHiddenClass)) {
                    self.showSlide();
                } else {
                    self.hideSlide();
                }
            };
            self.opener.bind(self.options.event, this.eventHandler);

            // hover mode handler
            if (self.options.event === 'over') {
                self.opener.bind('mouseenter', function() {
                    self.showSlide();
                });
                self.holder.bind('mouseleave', function() {
                    self.hideSlide();
                });
            }

            // outside click handler
            self.outsideClickHandler = function(e) {
                if (self.options.hideOnClickOutside) {
                    var target = $(e.target);
                    if (!target.is(self.holder) && !target.closest(self.holder).length) {
                        self.hideSlide();
                    }
                }
            };

            // set initial styles
            if (this.holder.hasClass(this.options.activeClass)) {
                $(document).bind('click touchstart', self.outsideClickHandler);
            } else {
                this.slider.addClass(slideHiddenClass);
            }
        },
        showSlide: function() {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.addClass(self.options.activeClass);
            }
            self.slider.removeClass(slideHiddenClass);
            $(document).bind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', true);
            toggleEffects[self.options.effect].show({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function() {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.addClass(self.options.activeClass);
                    }
                    self.makeCallback('animEnd', true);
                }
            });
        },
        hideSlide: function() {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.removeClass(self.options.activeClass);
            }
            $(document).unbind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', false);
            toggleEffects[self.options.effect].hide({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function() {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.removeClass(self.options.activeClass);
                    }
                    self.slider.addClass(slideHiddenClass);
                    self.makeCallback('animEnd', false);
                }
            });
        },
        destroy: function() {
            this.slider.removeClass(slideHiddenClass).css({display: ''});
            this.opener.unbind(this.options.event, this.eventHandler);
            this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
            $(document).unbind('click touchstart', this.outsideClickHandler);
        },
        makeCallback: function(name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    };

    // add stylesheet for slide on DOMReady
    var slideHiddenClass = 'js-slide-hidden';
    $(function() {
        var tabStyleSheet = $('<style type="text/css">')[0];
        var tabStyleRule = '.' + slideHiddenClass;
        tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
        if (tabStyleSheet.styleSheet) {
            tabStyleSheet.styleSheet.cssText = tabStyleRule;
        } else {
            tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
        }
        $('head').append(tabStyleSheet);
    });

    // animation effects
    var toggleEffects = {
        slide: {
            show: function(o) {
                o.box.stop(true).hide().slideDown(o.speed, o.complete);
            },
            hide: function(o) {
                o.box.stop(true).slideUp(o.speed, o.complete);
            }
        },
        fade: {
            show: function(o) {
                o.box.stop(true).hide().fadeIn(o.speed, o.complete);
            },
            hide: function(o) {
                o.box.stop(true).fadeOut(o.speed, o.complete);
            }
        },
        none: {
            show: function(o) {
                o.box.hide().show(0, o.complete);
            },
            hide: function(o) {
                o.box.hide(0, o.complete);
            }
        }
    };

    // jQuery plugin interface
    $.fn.openClose = function(opt) {
        return this.each(function() {
            jQuery(this).data('OpenClose', new OpenClose($.extend(opt, {holder: this})));
        });
    };
}(jQuery));

/*
 * jQuery Accordion plugin
 */
;
(function($) {
    $.fn.slideAccordion = function(opt) {
        // default options
        var options = $.extend({
            addClassBeforeAnimation: false,
            activeClass: 'active',
            opener: '.opener',
            slider: '.slide',
            animSpeed: 300,
            collapsible: true,
            event: 'click'
        }, opt);

        return this.each(function() {
            // options
            var accordion = $(this);
            var items = accordion.find(':has(' + options.slider + ')');

            items.each(function() {
                var item = $(this);
                var opener = item.find(options.opener);
                var slider = item.find(options.slider);
                opener.bind(options.event, function(e) {
                    if (!slider.is(':animated')) {
                        if (item.hasClass(options.activeClass)) {
                            if (options.collapsible) {
                                slider.slideUp(options.animSpeed, function() {
                                    hideSlide(slider);
                                    item.removeClass(options.activeClass);
                                });
                            }
                        } else {
                            // show active
                            var levelItems = item.siblings('.' + options.activeClass);
                            var sliderElements = levelItems.find(options.slider);
                            item.addClass(options.activeClass);
                            showSlide(slider).hide().slideDown(options.animSpeed);

                            // collapse others
                            sliderElements.slideUp(options.animSpeed, function() {
                                levelItems.removeClass(options.activeClass);
                                hideSlide(sliderElements);
                            });
                        }
                    }
                    e.preventDefault();
                });
                if (item.hasClass(options.activeClass))
                    showSlide(slider);
                else
                    hideSlide(slider);
            });
        });
    };

    // accordion slide visibility
    var showSlide = function(slide) {
        return slide.css({position: '', top: '', left: '', width: ''});
    };
    var hideSlide = function(slide) {
        return slide.show().css({position: 'absolute', top: -9999, left: -9999, width: slide.width()});
    };
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;
(function($) {
    $.fn.sameHeight = function(opt) {
        var options = $.extend({
            skipClass: 'same-height-ignore',
            leftEdgeClass: 'same-height-left',
            rightEdgeClass: 'same-height-right',
            elements: '>*',
            flexible: false,
            multiLine: false,
            useMinHeight: false,
            biggestHeight: false
        }, opt);
        return this.each(function() {
            var holder = $(this), postResizeTimer, ignoreResize;
            var elements = holder.find(options.elements).not('.' + options.skipClass);
            if (!elements.length)
                return;

            // resize handler
            function doResize() {
                elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
                if (options.multiLine) {
                    // resize elements row by row
                    resizeElementsByRows(elements, options);
                } else {
                    // resize elements by holder
                    resizeElements(elements, holder, options);
                }
            }
            doResize();

            // handle flexible layout / font resize
            var delayedResizeHandler = function() {
                if (!ignoreResize) {
                    ignoreResize = true;
                    doResize();
                    clearTimeout(postResizeTimer);
                    postResizeTimer = setTimeout(function() {
                        doResize();
                        setTimeout(function() {
                            ignoreResize = false;
                        }, 10);
                    }, 100);
                }
            };

            // handle flexible/responsive layout
            if (options.flexible) {
                $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
            }

            // handle complete page load including images and fonts
            $(window).bind('load', delayedResizeHandler);
        });
    };

    // detect css min-height support
    var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

    // get elements by rows
    function resizeElementsByRows(boxes, options) {
        var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
        boxes.each(function(ind) {
            var curItem = $(this);
            if (curItem.offset().top === firstOffset) {
                currentRow = currentRow.add(this);
            } else {
                maxHeight = getMaxHeight(currentRow);
                maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
                currentRow = curItem;
                firstOffset = curItem.offset().top;
            }
        });
        if (currentRow.length) {
            maxHeight = getMaxHeight(currentRow);
            maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        }
        if (options.biggestHeight) {
            boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
        }
    }

    // calculate max element height
    function getMaxHeight(boxes) {
        var maxHeight = 0;
        boxes.each(function() {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        return maxHeight;
    }

    // resize helper function
    function resizeElements(boxes, parent, options) {
        var calcHeight;
        var parentHeight = typeof parent === 'number' ? parent : parent.height();
        boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i) {
            var element = $(this);
            var depthDiffHeight = 0;
            var isBorderBox = element.css('boxSizing') === 'border-box';

            if (typeof parent !== 'number') {
                element.parents().each(function() {
                    var tmpParent = $(this);
                    if (parent.is(this)) {
                        return false;
                    } else {
                        depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
                    }
                });
            }
            calcHeight = parentHeight - depthDiffHeight;
            calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

            if (calcHeight > 0) {
                element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
            }
        });
        boxes.filter(':first').addClass(options.leftEdgeClass);
        boxes.filter(':last').addClass(options.rightEdgeClass);
        return calcHeight;
    }
}(jQuery));

/*
 * Mobile hover plugin
 */
;
(function($) {

    // detect device type
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            isWinPhoneDevice = navigator.msPointerEnabled && /MSIE 10.*Touch/.test(navigator.userAgent);

    // define events
    var eventOn = (isTouchDevice && 'touchstart') || (isWinPhoneDevice && 'MSPointerDown') || 'mouseenter',
            eventOff = (isTouchDevice && 'touchend') || (isWinPhoneDevice && 'MSPointerUp') || 'mouseleave';

    // event handlers
    var toggleOn, toggleOff, preventHandler;
    if (isTouchDevice || isWinPhoneDevice) {
        // prevent click handler
        preventHandler = function(e) {
            e.preventDefault();
        };

        // touch device handlers
        toggleOn = function(e) {
            var options = e.data, element = $(this);

            var toggleOff = function(e) {
                var target = $(e.target);
                if (!target.is(element) && !target.closest(element).length) {
                    element.removeClass(options.hoverClass);
                    element.off('click', preventHandler);
                    if (options.onLeave)
                        options.onLeave(element);
                    $(document).off(eventOn, toggleOff);
                }
            };

            if (!element.hasClass(options.hoverClass)) {
                element.addClass(options.hoverClass);
                element.one('click', preventHandler);
                $(document).on(eventOn, toggleOff);
                if (options.onHover)
                    options.onHover(element);
            }
        };
    } else {
        // desktop browser handlers
        toggleOn = function(e) {
            var options = e.data, element = $(this);
            element.addClass(options.hoverClass);
            $(options.context).on(eventOff, options.selector, options, toggleOff);
            if (options.onHover)
                options.onHover(element);
        };
        toggleOff = function(e) {
            var options = e.data, element = $(this);
            element.removeClass(options.hoverClass);
            $(options.context).off(eventOff, options.selector, toggleOff);
            if (options.onLeave)
                options.onLeave(element);
        };
    }

    // jQuery plugin
    $.fn.touchHover = function(opt) {
        var options = $.extend({
            context: this.context,
            selector: this.selector,
            hoverClass: 'hover'
        }, opt);

        $(this.context).on(eventOn, this.selector, options, toggleOn);
        return this;
    };
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
    $(function() {
        var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
        var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

        // required styles
        resizeFrame.css({
            width: '100em',
            height: '10px',
            position: 'absolute',
            borderWidth: 0,
            top: '-9999px',
            left: '-9999px'
        }).appendTo('body');

        // use native IE resize event if possible
        if (window.attachEvent && !window.addEventListener) {
            resizeFrame.bind('resize', function() {
                $.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
            });
        }
        // use script inside the iframe to detect resize for other browsers
        else {
            var doc = resizeFrame[0].contentWindow.document;
            doc.open();
            doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
            doc.close();
        }
        jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
    });
    return {
        // public method, so it can be called from within the iframe
        trigger: function(em) {
            $(window).trigger("fontresize", [em]);
        }
    };
}(jQuery));

/*
 * JavaScript Custom Forms Module
 */
jcf = {
    // global options
    modules: {},
    plugins: {},
    baseOptions: {
        unselectableClass: 'jcf-unselectable',
        labelActiveClass: 'jcf-label-active',
        labelDisabledClass: 'jcf-label-disabled',
        classPrefix: 'jcf-class-',
        hiddenClass: 'jcf-hidden',
        focusClass: 'jcf-focus',
        wrapperTag: 'div'
    },
    // replacer function
    customForms: {
        setOptions: function(obj) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p) && typeof obj[p] === 'object') {
                    jcf.lib.extend(jcf.modules[p].prototype.defaultOptions, obj[p]);
                }
            }
        },
        replaceAll: function(context) {
            for (var k in jcf.modules) {
                var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector, context);
                for (var i = 0; i < els.length; i++) {
                    if (els[i].jcf) {
                        // refresh form element state
                        els[i].jcf.refreshState();
                    } else {
                        // replace form element
                        if (!jcf.lib.hasClass(els[i], 'default') && jcf.modules[k].prototype.checkElement(els[i])) {
                            new jcf.modules[k]({
                                replaces: els[i]
                            });
                        }
                    }
                }
            }
        },
        refreshAll: function(context) {
            for (var k in jcf.modules) {
                var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector, context);
                for (var i = 0; i < els.length; i++) {
                    if (els[i].jcf) {
                        // refresh form element state
                        els[i].jcf.refreshState();
                    }
                }
            }
        },
        refreshElement: function(obj) {
            if (obj && obj.jcf) {
                obj.jcf.refreshState();
            }
        },
        destroyAll: function() {
            for (var k in jcf.modules) {
                var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
                for (var i = 0; i < els.length; i++) {
                    if (els[i].jcf) {
                        els[i].jcf.destroy();
                    }
                }
            }
        }
    },
    // detect device type
    isTouchDevice: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    isWinPhoneDevice: navigator.msPointerEnabled && /MSIE 10.*Touch/.test(navigator.userAgent),
    // define base module
    setBaseModule: function(obj) {
        jcf.customControl = function(opt) {
            this.options = jcf.lib.extend({}, jcf.baseOptions, this.defaultOptions, opt);
            this.init();
        };
        for (var p in obj) {
            jcf.customControl.prototype[p] = obj[p];
        }
    },
    // add module to jcf.modules
    addModule: function(obj) {
        if (obj.name) {
            // create new module proto class
            jcf.modules[obj.name] = function() {
                jcf.modules[obj.name].superclass.constructor.apply(this, arguments);
            }
            jcf.lib.inherit(jcf.modules[obj.name], jcf.customControl);
            for (var p in obj) {
                jcf.modules[obj.name].prototype[p] = obj[p]
            }
            // on create module
            jcf.modules[obj.name].prototype.onCreateModule();
            // make callback for exciting modules
            for (var mod in jcf.modules) {
                if (jcf.modules[mod] != jcf.modules[obj.name]) {
                    jcf.modules[mod].prototype.onModuleAdded(jcf.modules[obj.name]);
                }
            }
        }
    },
    // add plugin to jcf.plugins
    addPlugin: function(obj) {
        if (obj && obj.name) {
            jcf.plugins[obj.name] = function() {
                this.init.apply(this, arguments);
            }
            for (var p in obj) {
                jcf.plugins[obj.name].prototype[p] = obj[p];
            }
        }
    },
    // miscellaneous init
    init: function() {
        if (navigator.pointerEnabled) {
            this.eventPress = 'pointerdown';
            this.eventMove = 'pointermove';
            this.eventRelease = 'pointerup';
        } else if (navigator.msPointerEnabled) {
            this.eventPress = 'MSPointerDown';
            this.eventMove = 'MSPointerMove';
            this.eventRelease = 'MSPointerUp';
        } else {
            this.eventPress = this.isTouchDevice ? 'touchstart' : 'mousedown';
            this.eventMove = this.isTouchDevice ? 'touchmove' : 'mousemove';
            this.eventRelease = this.isTouchDevice ? 'touchend' : 'mouseup';
        }

        setTimeout(function() {
            jcf.lib.domReady(function() {
                jcf.initStyles();
            });
        }, 1);
        return this;
    },
    initStyles: function() {
        // create <style> element and rules
        var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                rules = document.createTextNode('.' + jcf.baseOptions.unselectableClass + '{' +
                        '-moz-user-select:none;' +
                        '-webkit-tap-highlight-color:rgba(255,255,255,0);' +
                        '-webkit-user-select:none;' +
                        'user-select:none;' +
                        '}');

        // append style element
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = rules.nodeValue;
        } else {
            style.appendChild(rules);
        }
        head.appendChild(style);
    }
}.init();

/*
 * Custom Form Control prototype
 */
jcf.setBaseModule({
    init: function() {
        if (this.options.replaces) {
            this.realElement = this.options.replaces;
            this.realElement.jcf = this;
            this.replaceObject();
        }
    },
    defaultOptions: {
        // default module options (will be merged with base options)
    },
    checkElement: function(el) {
        return true; // additional check for correct form element
    },
    replaceObject: function() {
        this.createWrapper();
        this.attachEvents();
        this.fixStyles();
        this.setupWrapper();
    },
    createWrapper: function() {
        this.fakeElement = jcf.lib.createElement(this.options.wrapperTag);
        this.labelFor = jcf.lib.getLabelFor(this.realElement);
        jcf.lib.disableTextSelection(this.fakeElement);
        jcf.lib.addClass(this.fakeElement, jcf.lib.getAllClasses(this.realElement.className, this.options.classPrefix));
        jcf.lib.addClass(this.realElement, jcf.baseOptions.hiddenClass);
    },
    attachEvents: function() {
        jcf.lib.event.add(this.realElement, 'focus', this.onFocusHandler, this);
        jcf.lib.event.add(this.realElement, 'blur', this.onBlurHandler, this);
        jcf.lib.event.add(this.fakeElement, 'click', this.onFakeClick, this);
        jcf.lib.event.add(this.fakeElement, jcf.eventPress, this.onFakePressed, this);
        jcf.lib.event.add(this.fakeElement, jcf.eventRelease, this.onFakeReleased, this);

        if (this.labelFor) {
            this.labelFor.jcf = this;
            jcf.lib.event.add(this.labelFor, 'click', this.onFakeClick, this);
            jcf.lib.event.add(this.labelFor, jcf.eventPress, this.onFakePressed, this);
            jcf.lib.event.add(this.labelFor, jcf.eventRelease, this.onFakeReleased, this);
        }
    },
    fixStyles: function() {
        // hide mobile webkit tap effect
        if (jcf.isTouchDevice) {
            var tapStyle = 'rgba(255,255,255,0)';
            this.realElement.style.webkitTapHighlightColor = tapStyle;
            this.fakeElement.style.webkitTapHighlightColor = tapStyle;
            if (this.labelFor) {
                this.labelFor.style.webkitTapHighlightColor = tapStyle;
            }
        }
    },
    setupWrapper: function() {
        // implement in subclass
    },
    refreshState: function() {
        // implement in subclass
    },
    destroy: function() {
        if (this.fakeElement && this.fakeElement.parentNode) {
            this.fakeElement.parentNode.removeChild(this.fakeElement);
        }
        jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
        this.realElement.jcf = null;
    },
    onFocus: function() {
        // emulated focus event
        jcf.lib.addClass(this.fakeElement, this.options.focusClass);
    },
    onBlur: function(cb) {
        // emulated blur event
        jcf.lib.removeClass(this.fakeElement, this.options.focusClass);
    },
    onFocusHandler: function() {
        // handle focus loses
        if (this.focused)
            return;
        this.focused = true;

        // handle touch devices also
        if (jcf.isTouchDevice) {
            if (jcf.focusedInstance && jcf.focusedInstance.realElement != this.realElement) {
                jcf.focusedInstance.onBlur();
                jcf.focusedInstance.realElement.blur();
            }
            jcf.focusedInstance = this;
        }
        this.onFocus.apply(this, arguments);
    },
    onBlurHandler: function() {
        // handle focus loses
        if (!this.pressedFlag) {
            this.focused = false;
            this.onBlur.apply(this, arguments);
        }
    },
    onFakeClick: function() {
        if (jcf.isTouchDevice) {
            this.onFocus();
        } else if (!this.realElement.disabled) {
            this.realElement.focus();
        }
    },
    onFakePressed: function(e) {
        this.pressedFlag = true;
    },
    onFakeReleased: function() {
        this.pressedFlag = false;
    },
    onCreateModule: function() {
        // implement in subclass
    },
    onModuleAdded: function(module) {
        // implement in subclass
    },
    onControlReady: function() {
        // implement in subclass
    }
});

/*
 * JCF Utility Library
 */
jcf.lib = {
    bind: function(func, scope) {
        return function() {
            return func.apply(scope, arguments);
        };
    },
    browser: (function() {
        var ua = navigator.userAgent.toLowerCase(), res = {},
                match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
        res[match[1]] = true;
        res.version = match[2] || "0";
        res.safariMac = ua.indexOf('mac') != -1 && ua.indexOf('safari') != -1;
        return res;
    })(),
    getOffset: function(obj) {
        if (obj.getBoundingClientRect && !jcf.isWinPhoneDevice) {
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
            var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
            return {
                top: Math.round(obj.getBoundingClientRect().top + scrollTop - clientTop),
                left: Math.round(obj.getBoundingClientRect().left + scrollLeft - clientLeft)
            };
        } else {
            var posLeft = 0, posTop = 0;
            while (obj.offsetParent) {
                posLeft += obj.offsetLeft;
                posTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return {top: posTop, left: posLeft};
        }
    },
    getScrollTop: function() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    getScrollLeft: function() {
        return window.pageXOffset || document.documentElement.scrollLeft;
    },
    getWindowWidth: function() {
        return document.compatMode == 'CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth;
    },
    getWindowHeight: function() {
        return document.compatMode == 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
    },
    getStyle: function(el, prop) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null)[prop];
        } else if (el.currentStyle) {
            return el.currentStyle[prop];
        } else {
            return el.style[prop];
        }
    },
    getParent: function(obj, selector) {
        while (obj.parentNode && obj.parentNode != document.body) {
            if (obj.parentNode.tagName.toLowerCase() == selector.toLowerCase()) {
                return obj.parentNode;
            }
            obj = obj.parentNode;
        }
        return false;
    },
    isParent: function(child, parent) {
        while (child.parentNode) {
            if (child.parentNode === parent) {
                return true;
            }
            child = child.parentNode;
        }
        return false;
    },
    getLabelFor: function(object) {
        var parentLabel = jcf.lib.getParent(object, 'label');
        if (parentLabel) {
            return parentLabel;
        } else if (object.id) {
            return jcf.lib.queryBySelector('label[for="' + object.id + '"]')[0];
        }
    },
    disableTextSelection: function(el) {
        if (typeof el.onselectstart !== 'undefined') {
            el.onselectstart = function() {
                return false;
            };
        } else if (window.opera) {
            el.setAttribute('unselectable', 'on');
        } else {
            jcf.lib.addClass(el, jcf.baseOptions.unselectableClass);
        }
    },
    enableTextSelection: function(el) {
        if (typeof el.onselectstart !== 'undefined') {
            el.onselectstart = null;
        } else if (window.opera) {
            el.removeAttribute('unselectable');
        } else {
            jcf.lib.removeClass(el, jcf.baseOptions.unselectableClass);
        }
    },
    queryBySelector: function(selector, scope) {
        if (typeof scope === 'string') {
            var result = [];
            var holders = this.getElementsBySelector(scope);
            for (var i = 0, contextNodes; i < holders.length; i++) {
                contextNodes = Array.prototype.slice.call(this.getElementsBySelector(selector, holders[i]));
                result = result.concat(contextNodes);
            }
            return result;
        } else {
            return this.getElementsBySelector(selector, scope);
        }
    },
    prevSibling: function(node) {
        while (node = node.previousSibling)
            if (node.nodeType == 1)
                break;
        return node;
    },
    nextSibling: function(node) {
        while (node = node.nextSibling)
            if (node.nodeType == 1)
                break;
        return node;
    },
    fireEvent: function(element, event) {
        if (element.dispatchEvent) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            return !element.dispatchEvent(evt);
        } else if (document.createEventObject) {
            var evt = document.createEventObject();
            return element.fireEvent('on' + event, evt);
        }
    },
    isParent: function(p, c) {
        while (c.parentNode) {
            if (p == c) {
                return true;
            }
            c = c.parentNode;
        }
        return false;
    },
            inherit: function(Child, Parent) {
                var F = function() {
                }
                F.prototype = Parent.prototype
                Child.prototype = new F()
                Child.prototype.constructor = Child
                Child.superclass = Parent.prototype
            },
    extend: function(obj) {
        for (var i = 1; i < arguments.length; i++) {
            for (var p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    obj[p] = arguments[i][p];
                }
            }
        }
        return obj;
    },
    hasClass: function(obj, cname) {
        return (obj.className ? obj.className.match(new RegExp('(\\s|^)' + cname + '(\\s|$)')) : false);
    },
    addClass: function(obj, cname) {
        if (!this.hasClass(obj, cname))
            obj.className += (!obj.className.length || obj.className.charAt(obj.className.length - 1) === ' ' ? '' : ' ') + cname;
    },
    removeClass: function(obj, cname) {
        if (this.hasClass(obj, cname))
            obj.className = obj.className.replace(new RegExp('(\\s|^)' + cname + '(\\s|$)'), ' ').replace(/\s+$/, '');
    },
    toggleClass: function(obj, cname, condition) {
        if (condition)
            this.addClass(obj, cname);
        else
            this.removeClass(obj, cname);
    },
    createElement: function(tagName, options) {
        var el = document.createElement(tagName);
        for (var p in options) {
            if (options.hasOwnProperty(p)) {
                switch (p) {
                    case 'class':
                        el.className = options[p];
                        break;
                    case 'html':
                        el.innerHTML = options[p];
                        break;
                    case 'style':
                        this.setStyles(el, options[p]);
                        break;
                    default:
                        el.setAttribute(p, options[p]);
                }
            }
        }
        return el;
    },
    setStyles: function(el, styles) {
        for (var p in styles) {
            if (styles.hasOwnProperty(p)) {
                switch (p) {
                    case 'float':
                        el.style.cssFloat = styles[p];
                        break;
                    case 'opacity':
                        el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + styles[p] * 100 + ')';
                        el.style.opacity = styles[p];
                        break;
                    default:
                        el.style[p] = (typeof styles[p] === 'undefined' ? 0 : styles[p]) + (typeof styles[p] === 'number' ? 'px' : '');
                }
            }
        }
        return el;
    },
    getInnerWidth: function(el) {
        return el.offsetWidth - (parseInt(this.getStyle(el, 'paddingLeft')) || 0) - (parseInt(this.getStyle(el, 'paddingRight')) || 0);
    },
    getInnerHeight: function(el) {
        return el.offsetHeight - (parseInt(this.getStyle(el, 'paddingTop')) || 0) - (parseInt(this.getStyle(el, 'paddingBottom')) || 0);
    },
    getAllClasses: function(cname, prefix, skip) {
        if (!skip)
            skip = '';
        if (!prefix)
            prefix = '';
        return cname ? cname.replace(new RegExp('(\\s|^)' + skip + '(\\s|$)'), ' ').replace(/[\s]*([\S]+)+[\s]*/gi, prefix + "$1 ") : '';
    },
    getElementsBySelector: function(selector, scope) {
        if (typeof document.querySelectorAll === 'function') {
            return (scope || document).querySelectorAll(selector);
        }
        var selectors = selector.split(',');
        var resultList = [];
        for (var s = 0; s < selectors.length; s++) {
            var currentContext = [scope || document];
            var tokens = selectors[s].replace(/^\s+/, '').replace(/\s+$/, '').split(' ');
            for (var i = 0; i < tokens.length; i++) {
                token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');
                if (token.indexOf('#') > -1) {
                    var bits = token.split('#'), tagName = bits[0], id = bits[1];
                    var element = document.getElementById(id);
                    if (tagName && element.nodeName.toLowerCase() != tagName) {
                        return [];
                    }
                    currentContext = [element];
                    continue;
                }
                if (token.indexOf('.') > -1) {
                    var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
                    for (var h = 0; h < currentContext.length; h++) {
                        var elements;
                        if (tagName == '*') {
                            elements = currentContext[h].getElementsByTagName('*');
                        } else {
                            elements = currentContext[h].getElementsByTagName(tagName);
                        }
                        for (var j = 0; j < elements.length; j++) {
                            found[foundCount++] = elements[j];
                        }
                    }
                    currentContext = [];
                    var currentContextIndex = 0;
                    for (var k = 0; k < found.length; k++) {
                        if (found[k].className && found[k].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
                            currentContext[currentContextIndex++] = found[k];
                        }
                    }
                    continue;
                }
                if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
                    var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
                    if (attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
                        attrName = 'htmlFor';
                    }
                    var found = [], foundCount = 0;
                    for (var h = 0; h < currentContext.length; h++) {
                        var elements;
                        if (tagName == '*') {
                            elements = currentContext[h].getElementsByTagName('*');
                        } else {
                            elements = currentContext[h].getElementsByTagName(tagName);
                        }
                        for (var j = 0; elements[j]; j++) {
                            found[foundCount++] = elements[j];
                        }
                    }
                    currentContext = [];
                    var currentContextIndex = 0, checkFunction;
                    switch (attrOperator) {
                        case '=':
                            checkFunction = function(e) {
                                return (e.getAttribute(attrName) == attrValue)
                            };
                            break;
                        case '~':
                            checkFunction = function(e) {
                                return (e.getAttribute(attrName).match(new RegExp('(\\s|^)' + attrValue + '(\\s|$)')))
                            };
                            break;
                        case '|':
                            checkFunction = function(e) {
                                return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?')))
                            };
                            break;
                        case '^':
                            checkFunction = function(e) {
                                return (e.getAttribute(attrName).indexOf(attrValue) == 0)
                            };
                            break;
                        case '$':
                            checkFunction = function(e) {
                                return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length)
                            };
                            break;
                        case '*':
                            checkFunction = function(e) {
                                return (e.getAttribute(attrName).indexOf(attrValue) > -1)
                            };
                            break;
                        default :
                            checkFunction = function(e) {
                                return e.getAttribute(attrName)
                            };
                    }
                    currentContext = [];
                    var currentContextIndex = 0;
                    for (var k = 0; k < found.length; k++) {
                        if (checkFunction(found[k])) {
                            currentContext[currentContextIndex++] = found[k];
                        }
                    }
                    continue;
                }
                tagName = token;
                var found = [], foundCount = 0;
                for (var h = 0; h < currentContext.length; h++) {
                    var elements = currentContext[h].getElementsByTagName(tagName);
                    for (var j = 0; j < elements.length; j++) {
                        found[foundCount++] = elements[j];
                    }
                }
                currentContext = found;
            }
            resultList = [].concat(resultList, currentContext);
        }
        return resultList;
    },
    scrollSize: (function() {
        var content, hold, sizeBefore, sizeAfter;
        function buildSizer() {
            if (hold)
                removeSizer();
            content = document.createElement('div');
            hold = document.createElement('div');
            hold.style.cssText = 'position:absolute;overflow:hidden;width:100px;height:100px';
            hold.appendChild(content);
            document.body.appendChild(hold);
        }
        function removeSizer() {
            document.body.removeChild(hold);
            hold = null;
        }
        function calcSize(vertical) {
            buildSizer();
            content.style.cssText = 'height:' + (vertical ? '100%' : '250px');
            sizeBefore = (vertical ? content.offsetHeight : content.offsetWidth);
            hold.style.overflow = 'scroll';
            content.innerHTML = 1;
            sizeAfter = (vertical ? content.offsetHeight : content.offsetWidth);
            if (vertical && hold.clientHeight)
                sizeAfter = hold.clientHeight;
            removeSizer();
            return sizeBefore - sizeAfter;
        }
        return {
            getWidth: function() {
                return calcSize(false);
            },
            getHeight: function() {
                return calcSize(true)
            }
        }
    }()),
    domReady: function(handler) {
        var called = false
        function ready() {
            if (called)
                return;
            called = true;
            handler();
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", ready, false);
        } else if (document.attachEvent) {
            if (document.documentElement.doScroll && window == window.top) {
                function tryScroll() {
                    if (called)
                        return
                    if (!document.body)
                        return
                    try {
                        document.documentElement.doScroll("left")
                        ready()
                    } catch (e) {
                        setTimeout(tryScroll, 0)
                    }
                }
                tryScroll()
            }
            document.attachEvent("onreadystatechange", function() {
                if (document.readyState === "complete") {
                    ready()
                }
            })
        }
        if (window.addEventListener)
            window.addEventListener('load', ready, false)
        else if (window.attachEvent)
            window.attachEvent('onload', ready)
    },
    event: (function() {
        var guid = 0;
        function fixEvent(e) {
            e = e || window.event;
            if (e.isFixed) {
                return e;
            }
            e.isFixed = true;
            e.preventDefault = e.preventDefault || function() {
                this.returnValue = false
            }
            e.stopPropagation = e.stopPropagaton || function() {
                this.cancelBubble = true
            }
            if (!e.target) {
                e.target = e.srcElement
            }
            if (!e.relatedTarget && e.fromElement) {
                e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement;
            }
            if (e.pageX == null && e.clientX != null) {
                var html = document.documentElement, body = document.body;
                e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
                e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
            }
            if (!e.which && e.button) {
                e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
            }
            if (e.type === "DOMMouseScroll" || e.type === 'mousewheel') {
                e.mWheelDelta = 0;
                if (e.wheelDelta) {
                    e.mWheelDelta = e.wheelDelta / 120;
                } else if (e.detail) {
                    e.mWheelDelta = -e.detail / 3;
                }
            }
            return e;
        }
        function commonHandle(event, customScope) {
            event = fixEvent(event);
            var handlers = this.events[event.type];
            for (var g in handlers) {
                var handler = handlers[g];
                var ret = handler.call(customScope || this, event);
                if (ret === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
            }
        }
        var publicAPI = {
            add: function(elem, type, handler, forcedScope) {
                if (elem.setInterval && (elem != window && !elem.frameElement)) {
                    elem = window;
                }
                if (!handler.guid) {
                    handler.guid = ++guid;
                }
                if (!elem.events) {
                    elem.events = {};
                    elem.handle = function(event) {
                        return commonHandle.call(elem, event);
                    }
                }
                if (!elem.events[type]) {
                    elem.events[type] = {};
                    if (elem.addEventListener)
                        elem.addEventListener(type, elem.handle, false);
                    else if (elem.attachEvent)
                        elem.attachEvent("on" + type, elem.handle);
                    if (type === 'mousewheel') {
                        publicAPI.add(elem, 'DOMMouseScroll', handler, forcedScope);
                    }
                }
                var fakeHandler = jcf.lib.bind(handler, forcedScope);
                fakeHandler.guid = handler.guid;
                elem.events[type][handler.guid] = forcedScope ? fakeHandler : handler;
            },
            remove: function(elem, type, handler) {
                var handlers = elem.events && elem.events[type];
                if (!handlers)
                    return;
                delete handlers[handler.guid];
                for (var any in handlers)
                    return;
                if (elem.removeEventListener)
                    elem.removeEventListener(type, elem.handle, false);
                else if (elem.detachEvent)
                    elem.detachEvent("on" + type, elem.handle);
                delete elem.events[type];
                for (var any in elem.events)
                    return;
                try {
                    delete elem.handle;
                    delete elem.events;
                } catch (e) {
                    if (elem.removeAttribute) {
                        elem.removeAttribute("handle");
                        elem.removeAttribute("events");
                    }
                }
                if (type === 'mousewheel') {
                    publicAPI.remove(elem, 'DOMMouseScroll', handler);
                }
            }
        }
        return publicAPI;
    }())
}

// custom select module
jcf.addModule({
    name: 'select',
    selector: 'select',
    defaultOptions: {
        useNativeDropOnMobileDevices: true,
        hideDropOnScroll: true,
        showNativeDrop: false,
        handleDropPosition: false,
        selectDropPosition: 'bottom', // or 'top'
        wrapperClass: 'select-area',
        focusClass: 'select-focus',
        dropActiveClass: 'select-active',
        selectedClass: 'item-selected',
        currentSelectedClass: 'current-selected',
        disabledClass: 'select-disabled',
        valueSelector: 'span.center',
        optGroupClass: 'optgroup',
        openerSelector: 'a.select-opener',
        selectStructure: '<span class="left"></span><span class="center"></span><a class="select-opener"></a>',
        wrapperTag: 'span',
        classPrefix: 'select-',
        dropMaxHeight: 200,
        dropFlippedClass: 'select-options-flipped',
        dropHiddenClass: 'options-hidden',
        dropScrollableClass: 'options-overflow',
        dropClass: 'select-options',
        dropClassPrefix: 'drop-',
        dropStructure: '<div class="drop-holder"><div class="drop-list"></div></div>',
        dropSelector: 'div.drop-list'
    },
    checkElement: function(el) {
        return (!el.size && !el.multiple);
    },
    setupWrapper: function() {
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        this.fakeElement.innerHTML = this.options.selectStructure;
        this.fakeElement.style.width = (this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + 'px' : 'auto');

        // show native drop if specified in options
        if (this.options.useNativeDropOnMobileDevices && (jcf.isTouchDevice || jcf.isWinPhoneDevice)) {
            this.options.showNativeDrop = true;
        }
        if (this.options.showNativeDrop) {
            this.fakeElement.appendChild(this.realElement);
            jcf.lib.removeClass(this.realElement, this.options.hiddenClass);
            jcf.lib.setStyles(this.realElement, {
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                opacity: 0,
                border: 'none',
                position: 'absolute',
                width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
                height: jcf.lib.getInnerHeight(this.fakeElement) - 1
            });
            jcf.lib.event.add(this.realElement, jcf.eventPress, function() {
                this.realElement.title = '';
            }, this)
        }

        // create select body
        this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0];
        this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0];
        jcf.lib.disableTextSelection(this.valueText);
        this.opener.jcf = this;

        if (!this.options.showNativeDrop) {
            this.createDropdown();
            this.refreshState();
            this.onControlReady(this);
            this.hideDropdown(true);
        } else {
            this.refreshState();
        }
        this.addEvents();
    },
    addEvents: function() {
        if (this.options.showNativeDrop) {
            jcf.lib.event.add(this.realElement, 'click', this.onChange, this);
        } else {
            jcf.lib.event.add(this.fakeElement, 'click', this.toggleDropdown, this);
        }
        jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
    },
    onFakeClick: function() {
        // do nothing (drop toggles by toggleDropdown method)
    },
    onFocus: function() {
        jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
        if (!this.options.showNativeDrop) {
            // Mac Safari Fix
            if (jcf.lib.browser.safariMac) {
                this.realElement.setAttribute('size', '2');
            }
            jcf.lib.event.add(this.realElement, 'keydown', this.onKeyDown, this);
            if (jcf.activeControl && jcf.activeControl != this) {
                jcf.activeControl.hideDropdown();
                jcf.activeControl = this;
            }
        }
    },
    onBlur: function() {
        if (!this.options.showNativeDrop) {
            // Mac Safari Fix
            if (jcf.lib.browser.safariMac) {
                this.realElement.removeAttribute('size');
            }
            if (!this.isActiveDrop() || !this.isOverDrop()) {
                jcf.modules[this.name].superclass.onBlur.apply(this);
                if (jcf.activeControl === this)
                    jcf.activeControl = null;
                if (!jcf.isTouchDevice) {
                    this.hideDropdown();
                }
            }
            jcf.lib.event.remove(this.realElement, 'keydown', this.onKeyDown);
        } else {
            jcf.modules[this.name].superclass.onBlur.apply(this);
        }
    },
    onChange: function() {
        this.refreshState();
    },
    onKeyDown: function(e) {
        this.dropOpened = true;
        jcf.tmpFlag = true;
        setTimeout(function() {
            jcf.tmpFlag = false
        }, 100);
        var context = this;
        context.keyboardFix = true;
        setTimeout(function() {
            context.refreshState();
        }, 10);
        if (e.keyCode == 13) {
            context.toggleDropdown.apply(context);
            return false;
        }
    },
    onResizeWindow: function(e) {
        if (this.isActiveDrop()) {
            this.hideDropdown();
        }
    },
    onScrollWindow: function(e) {
        if (this.options.hideDropOnScroll) {
            this.hideDropdown();
        } else if (this.isActiveDrop()) {
            this.positionDropdown();
        }
    },
    onOptionClick: function(e) {
        var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
        if (opener) {
            this.dropOpened = true;
            this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
            if (jcf.isTouchDevice) {
                this.onFocus();
            } else {
                this.realElement.focus();
            }
            this.refreshState();
            this.hideDropdown();
            jcf.lib.fireEvent(this.realElement, 'change');
        }
        return false;
    },
    onClickOutside: function(e) {
        if (jcf.tmpFlag) {
            jcf.tmpFlag = false;
            return;
        }
        if (!jcf.lib.isParent(this.fakeElement, e.target) && !jcf.lib.isParent(this.selectDrop, e.target)) {
            this.hideDropdown();
        }
    },
    onDropHover: function(e) {
        if (!this.keyboardFix) {
            this.hoverFlag = true;
            var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
            if (opener) {
                this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
                this.refreshSelectedClass(parseInt(opener.getAttribute('rel')));
            }
        } else {
            this.keyboardFix = false;
        }
    },
    onDropLeave: function() {
        this.hoverFlag = false;
    },
    isActiveDrop: function() {
        return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass);
    },
    isOverDrop: function() {
        return this.hoverFlag;
    },
    createDropdown: function() {
        // remove old dropdown if exists
        if (this.selectDrop) {
            this.selectDrop.parentNode.removeChild(this.selectDrop);
        }

        // create dropdown holder
        this.selectDrop = document.createElement('div');
        this.selectDrop.className = this.options.dropClass;
        this.selectDrop.innerHTML = this.options.dropStructure;
        jcf.lib.setStyles(this.selectDrop, {position: 'absolute'});
        this.selectList = jcf.lib.queryBySelector(this.options.dropSelector, this.selectDrop)[0];
        jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
        document.body.appendChild(this.selectDrop);
        this.selectDrop.jcf = this;
        jcf.lib.event.add(this.selectDrop, 'click', this.onOptionClick, this);
        jcf.lib.event.add(this.selectDrop, 'mouseover', this.onDropHover, this);
        jcf.lib.event.add(this.selectDrop, 'mouseout', this.onDropLeave, this);
        this.buildDropdown();
    },
    buildDropdown: function() {
        // build select options / optgroups
        this.buildDropdownOptions();

        // position and resize dropdown
        this.positionDropdown();

        // cut dropdown if height exceedes
        this.buildDropdownScroll();
    },
    buildDropdownOptions: function() {
        this.resStructure = '';
        this.optNum = 0;
        for (var i = 0; i < this.realElement.children.length; i++) {
            this.resStructure += this.buildElement(this.realElement.children[i], i) + '\n';
        }
        this.selectList.innerHTML = this.resStructure;
    },
    buildDropdownScroll: function() {
        jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass));
        if (this.options.dropMaxHeight) {
            if (this.selectDrop.offsetHeight > this.options.dropMaxHeight) {
                this.selectList.style.height = this.options.dropMaxHeight + 'px';
                this.selectList.style.overflow = 'auto';
                this.selectList.style.overflowX = 'hidden';
                jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass);
            }
        }
    },
    parseOptionTitle: function(optTitle) {
        return (typeof optTitle === 'string' && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(optTitle)) ? optTitle : '';
    },
    buildElement: function(obj, index) {
        // build option
        var res = '', optImage;
        if (obj.tagName.toLowerCase() == 'option') {
            if (!jcf.lib.prevSibling(obj) || jcf.lib.prevSibling(obj).tagName.toLowerCase() != 'option') {
                res += '<ul>';
            }

            optImage = this.parseOptionTitle(obj.title);
            res += '<li rel="' + (this.optNum++) + '" class="' + (obj.className ? obj.className + ' ' : '') + (index % 2 ? 'option-even ' : '') + 'jcfcalc"><a href="#">' + (optImage ? '<img src="' + optImage + '" alt="" />' : '') + '<span>' + obj.innerHTML + '</span></a></li>';
            if (!jcf.lib.nextSibling(obj) || jcf.lib.nextSibling(obj).tagName.toLowerCase() != 'option') {
                res += '</ul>';
            }
            return res;
        }
        // build option group with options
        else if (obj.tagName.toLowerCase() == 'optgroup' && obj.label) {
            res += '<div class="' + this.options.optGroupClass + '">';
            res += '<strong class="jcfcalc"><em>' + (obj.label) + '</em></strong>';
            for (var i = 0; i < obj.children.length; i++) {
                res += this.buildElement(obj.children[i], i);
            }
            res += '</div>';
            return res;
        }
    },
    positionDropdown: function() {
        var ofs = jcf.lib.getOffset(this.fakeElement), selectAreaHeight = this.fakeElement.offsetHeight, selectDropHeight = this.selectDrop.offsetHeight;
        var fitInTop = ofs.top - selectDropHeight >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < ofs.top + selectAreaHeight + selectDropHeight;


        if ((this.options.handleDropPosition && fitInTop) || this.options.selectDropPosition === 'top') {
            this.selectDrop.style.top = (ofs.top - selectDropHeight) + 'px';
            jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass);
            jcf.lib.addClass(this.fakeElement, this.options.dropFlippedClass);
        } else {
            this.selectDrop.style.top = (ofs.top + selectAreaHeight) + 'px';
            jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass);
            jcf.lib.removeClass(this.fakeElement, this.options.dropFlippedClass);
        }
        this.selectDrop.style.left = ofs.left + 'px';
        this.selectDrop.style.width = this.fakeElement.offsetWidth + 'px';
    },
    showDropdown: function() {
        document.body.appendChild(this.selectDrop);
        jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass);
        jcf.lib.addClass(this.fakeElement, this.options.dropActiveClass);
        this.positionDropdown();

        // highlight current active item
        var activeItem = this.getFakeActiveOption();
        this.removeClassFromItems(this.options.currentSelectedClass);
        jcf.lib.addClass(activeItem, this.options.currentSelectedClass);

        // show current dropdown
        jcf.lib.event.add(window, 'resize', this.onResizeWindow, this);
        jcf.lib.event.add(window, 'scroll', this.onScrollWindow, this);
        jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this);
        this.positionDropdown();
    },
    hideDropdown: function(partial) {
        if (this.selectDrop.parentNode) {
            if (this.selectDrop.offsetWidth) {
                this.selectDrop.parentNode.removeChild(this.selectDrop);
            }
            if (partial) {
                return;
            }
        }
        if (typeof this.origSelectedIndex === 'number') {
            this.realElement.selectedIndex = this.origSelectedIndex;
        }
        jcf.lib.removeClass(this.fakeElement, this.options.dropActiveClass);
        jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
        jcf.lib.event.remove(window, 'resize', this.onResizeWindow);
        jcf.lib.event.remove(window, 'scroll', this.onScrollWindow);
        jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside);
        if (jcf.isTouchDevice) {
            this.onBlur();
        }
    },
    toggleDropdown: function() {
        if (!this.realElement.disabled) {
            if (jcf.isTouchDevice) {
                this.onFocus();
            } else {
                this.realElement.focus();
            }
            if (this.isActiveDrop()) {
                this.hideDropdown();
            } else {
                this.showDropdown();
            }
            this.refreshState();
        }
    },
    scrollToItem: function() {
        if (this.isActiveDrop()) {
            var dropHeight = this.selectList.offsetHeight;
            var offsetTop = this.calcOptionOffset(this.getFakeActiveOption());
            var sTop = this.selectList.scrollTop;
            var oHeight = this.getFakeActiveOption().offsetHeight;
            //offsetTop+=sTop;

            if (offsetTop >= sTop + dropHeight) {
                this.selectList.scrollTop = offsetTop - dropHeight + oHeight;
            } else if (offsetTop < sTop) {
                this.selectList.scrollTop = offsetTop;
            }
        }
    },
    getFakeActiveOption: function(c) {
        return jcf.lib.queryBySelector('li[rel="' + (typeof c === 'number' ? c : this.realElement.selectedIndex) + '"]', this.selectList)[0];
    },
    calcOptionOffset: function(fake) {
        var h = 0;
        var els = jcf.lib.queryBySelector('.jcfcalc', this.selectList);
        for (var i = 0; i < els.length; i++) {
            if (els[i] == fake)
                break;
            h += els[i].offsetHeight;
        }
        return h;
    },
    childrenHasItem: function(hold, item) {
        var items = hold.getElementsByTagName('*');
        for (i = 0; i < items.length; i++) {
            if (items[i] == item)
                return true;
        }
        return false;
    },
    removeClassFromItems: function(className) {
        var children = jcf.lib.queryBySelector('li', this.selectList);
        for (var i = children.length - 1; i >= 0; i--) {
            jcf.lib.removeClass(children[i], className);
        }
    },
    setSelectedClass: function(c) {
        jcf.lib.addClass(this.getFakeActiveOption(c), this.options.selectedClass);
    },
    refreshSelectedClass: function(c) {
        if (!this.options.showNativeDrop) {
            this.removeClassFromItems(this.options.selectedClass);
            this.setSelectedClass(c);
        }
        if (this.realElement.disabled) {
            jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
            if (this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
            if (this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
            }
        }
    },
    refreshSelectedText: function() {
        if (!this.dropOpened && this.realElement.title) {
            this.valueText.innerHTML = this.realElement.title;
        } else {
            if (this.realElement.options[this.realElement.selectedIndex].title) {
                var optImage = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].title);
                this.valueText.innerHTML = (optImage ? '<img src="' + optImage + '" alt="" />' : '') + this.realElement.options[this.realElement.selectedIndex].innerHTML;
            } else {
                this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML;
            }
        }
    },
    refreshState: function() {
        this.origSelectedIndex = this.realElement.selectedIndex;
        this.refreshSelectedClass();
        this.refreshSelectedText();
        if (!this.options.showNativeDrop) {
            this.positionDropdown();
            if (this.selectDrop.offsetWidth) {
                this.scrollToItem();
            }
        }
    }
});

// custom radio module
jcf.addModule({
    name: 'radio',
    selector: 'input[type="radio"]',
    defaultOptions: {
        wrapperClass: 'rad-area',
        focusClass: 'rad-focus',
        checkedClass: 'rad-checked',
        uncheckedClass: 'rad-unchecked',
        disabledClass: 'rad-disabled',
        radStructure: '<span></span>'
    },
    getRadioGroup: function(item) {
        var name = item.getAttribute('name');
        if (name) {
            return jcf.lib.queryBySelector('input[name="' + name + '"]', jcf.lib.getParent('form'));
        } else {
            return [item];
        }
    },
    setupWrapper: function() {
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.fakeElement.innerHTML = this.options.radStructure;
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        this.refreshState();
        this.addEvents();
    },
    addEvents: function() {
        jcf.lib.event.add(this.fakeElement, 'click', this.toggleRadio, this);
        if (this.labelFor) {
            jcf.lib.event.add(this.labelFor, 'click', this.toggleRadio, this);
        }
    },
    onFocus: function(e) {
        jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
        setTimeout(jcf.lib.bind(function() {
            this.refreshState();
        }, this), 10);
    },
    toggleRadio: function() {
        if (!this.realElement.disabled && !this.realElement.checked) {
            this.realElement.checked = true;
            jcf.lib.fireEvent(this.realElement, 'change');
        }
        this.refreshState();
    },
    refreshState: function() {
        var els = this.getRadioGroup(this.realElement);
        for (var i = 0; i < els.length; i++) {
            var curEl = els[i].jcf;
            if (curEl) {
                if (curEl.realElement.checked) {
                    jcf.lib.addClass(curEl.fakeElement, curEl.options.checkedClass);
                    jcf.lib.removeClass(curEl.fakeElement, curEl.options.uncheckedClass);
                    if (curEl.labelFor) {
                        jcf.lib.addClass(curEl.labelFor, curEl.options.labelActiveClass);
                    }
                } else {
                    jcf.lib.removeClass(curEl.fakeElement, curEl.options.checkedClass);
                    jcf.lib.addClass(curEl.fakeElement, curEl.options.uncheckedClass);
                    if (curEl.labelFor) {
                        jcf.lib.removeClass(curEl.labelFor, curEl.options.labelActiveClass);
                    }
                }
                if (curEl.realElement.disabled) {
                    jcf.lib.addClass(curEl.fakeElement, curEl.options.disabledClass);
                    if (curEl.labelFor) {
                        jcf.lib.addClass(curEl.labelFor, curEl.options.labelDisabledClass);
                    }
                } else {
                    jcf.lib.removeClass(curEl.fakeElement, curEl.options.disabledClass);
                    if (curEl.labelFor) {
                        jcf.lib.removeClass(curEl.labelFor, curEl.options.labelDisabledClass);
                    }
                }
            }
        }
    }
});

// custom checkbox module
jcf.addModule({
    name: 'checkbox',
    selector: 'input[type="checkbox"]',
    defaultOptions: {
        wrapperClass: 'chk-area',
        focusClass: 'chk-focus',
        checkedClass: 'chk-checked',
        labelActiveClass: 'chk-label-active',
        uncheckedClass: 'chk-unchecked',
        disabledClass: 'chk-disabled',
        chkStructure: '<span></span>'
    },
    setupWrapper: function() {
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.fakeElement.innerHTML = this.options.chkStructure;
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        jcf.lib.event.add(this.realElement, 'click', this.onRealClick, this);
        this.refreshState();
    },
    isLinkTarget: function(target, limitParent) {
        while (target.parentNode || target === limitParent) {
            if (target.tagName.toLowerCase() === 'a') {
                return true;
            }
            target = target.parentNode;
        }
    },
    onFakePressed: function() {
        jcf.modules[this.name].superclass.onFakePressed.apply(this, arguments);
        if (!this.realElement.disabled) {
            this.realElement.focus();
        }
    },
    onFakeClick: function(e) {
        jcf.modules[this.name].superclass.onFakeClick.apply(this, arguments);
        this.tmpTimer = setTimeout(jcf.lib.bind(function() {
            this.toggle();
        }, this), 10);
        if (!this.isLinkTarget(e.target, this.labelFor)) {
            return false;
        }
    },
    onRealClick: function(e) {
        setTimeout(jcf.lib.bind(function() {
            this.refreshState();
        }, this), 10);
        e.stopPropagation();
    },
    toggle: function(e) {
        if (!this.realElement.disabled) {
            if (this.realElement.checked) {
                this.realElement.checked = false;
            } else {
                this.realElement.checked = true;
            }
        }
        this.refreshState();
        jcf.lib.fireEvent(this.realElement, 'change');
        return false;
    },
    refreshState: function() {
        if (this.realElement.checked) {
            jcf.lib.addClass(this.fakeElement, this.options.checkedClass);
            jcf.lib.removeClass(this.fakeElement, this.options.uncheckedClass);
            if (this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelActiveClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.checkedClass);
            jcf.lib.addClass(this.fakeElement, this.options.uncheckedClass);
            if (this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelActiveClass);
            }
        }
        if (this.realElement.disabled) {
            jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
            if (this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
            if (this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
            }
        }
    }
});

// custom scrollbars module
jcf.addModule({
    name: 'customscroll',
    selector: 'div.scrollable-area',
    defaultOptions: {
        alwaysPreventWheel: false,
        enableMouseWheel: true,
        captureFocus: false,
        handleNested: true,
        alwaysKeepScrollbars: false,
        autoDetectWidth: false,
        scrollbarOptions: {},
        focusClass: 'scrollable-focus',
        wrapperTag: 'div',
        autoDetectWidthClass: 'autodetect-width',
        noHorizontalBarClass: 'noscroll-horizontal',
        noVerticalBarClass: 'noscroll-vertical',
        innerWrapperClass: 'scrollable-inner-wrapper',
        outerWrapperClass: 'scrollable-area-wrapper',
        horizontalClass: 'hscrollable',
        verticalClass: 'vscrollable',
        bothClass: 'anyscrollable'
    },
    replaceObject: function() {
        this.initStructure();
        this.refreshState();
        this.addEvents();
    },
    initStructure: function() {
        // set scroll type
        this.realElement.jcf = this;
        if (jcf.lib.hasClass(this.realElement, this.options.bothClass) ||
                jcf.lib.hasClass(this.realElement, this.options.horizontalClass) && jcf.lib.hasClass(this.realElement, this.options.verticalClass)) {
            this.scrollType = 'both';
        } else if (jcf.lib.hasClass(this.realElement, this.options.horizontalClass)) {
            this.scrollType = 'horizontal';
        } else {
            this.scrollType = 'vertical';
        }

        // autodetect horizontal width
        if (jcf.lib.hasClass(this.realElement, this.options.autoDetectWidthClass)) {
            this.options.autoDetectWidth = true;
        }

        // init dimensions and build structure
        this.realElement.style.position = 'relative';
        this.realElement.style.overflow = 'hidden';

        // build content wrapper and scrollbar(s)
        this.buildWrapper();
        this.buildScrollbars();
    },
    buildWrapper: function() {
        this.outerWrapper = document.createElement(this.options.wrapperTag);
        this.outerWrapper.className = this.options.outerWrapperClass;
        this.realElement.parentNode.insertBefore(this.outerWrapper, this.realElement);
        this.outerWrapper.appendChild(this.realElement);

        // autosize content if single child
        if (this.options.autoDetectWidth && (this.scrollType === 'both' || this.scrollType === 'horizontal') && this.realElement.children.length === 1) {
            var tmpWidth = 0;
            this.realElement.style.width = '99999px';
            tmpWidth = this.realElement.children[0].offsetWidth;
            this.realElement.style.width = '';
            if (tmpWidth) {
                this.realElement.children[0].style.width = tmpWidth + 'px';
            }
        }
    },
    buildScrollbars: function() {
        if (this.scrollType === 'horizontal' || this.scrollType === 'both') {
            this.hScrollBar = new jcf.plugins.scrollbar(jcf.lib.extend(this.options.scrollbarOptions, {
                vertical: false,
                spawnClass: this,
                holder: this.outerWrapper,
                range: this.realElement.scrollWidth - this.realElement.offsetWidth,
                size: this.realElement.offsetWidth,
                onScroll: jcf.lib.bind(function(v) {
                    this.realElement.scrollLeft = v;
                }, this)
            }));
        }
        if (this.scrollType === 'vertical' || this.scrollType === 'both') {
            this.vScrollBar = new jcf.plugins.scrollbar(jcf.lib.extend(this.options.scrollbarOptions, {
                vertical: true,
                spawnClass: this,
                holder: this.outerWrapper,
                range: this.realElement.scrollHeight - this.realElement.offsetHeight,
                size: this.realElement.offsetHeight,
                onScroll: jcf.lib.bind(function(v) {
                    this.realElement.scrollTop = v;
                }, this)
            }));
        }
        this.outerWrapper.style.width = this.realElement.offsetWidth + 'px';
        this.outerWrapper.style.height = this.realElement.offsetHeight + 'px';
        this.resizeScrollContent();
    },
    resizeScrollContent: function() {
        var diffWidth = this.realElement.offsetWidth - jcf.lib.getInnerWidth(this.realElement);
        var diffHeight = this.realElement.offsetHeight - jcf.lib.getInnerHeight(this.realElement);
        this.realElement.style.width = Math.max(0, this.outerWrapper.offsetWidth - diffWidth - (this.vScrollBar ? this.vScrollBar.getScrollBarSize() : 0)) + 'px';
        this.realElement.style.height = Math.max(0, this.outerWrapper.offsetHeight - diffHeight - (this.hScrollBar ? this.hScrollBar.getScrollBarSize() : 0)) + 'px';
    },
    addEvents: function() {
        // enable mouse wheel handling
        if (!jcf.isTouchDevice && this.options.enableMouseWheel) {
            jcf.lib.event.add(this.outerWrapper, 'mousewheel', this.onMouseWheel, this);
        }
        // add touch scroll on block body
        if (jcf.isTouchDevice || navigator.msPointerEnabled) {
            this.outerWrapper.style.msTouchAction = 'none';
            jcf.lib.event.add(this.realElement, jcf.eventPress, this.onScrollablePress, this);
        }

        // handle nested scrollbars
        if (this.options.handleNested) {
            var el = this.realElement, name = this.name;
            while (el.parentNode) {
                if (el.parentNode.jcf && el.parentNode.jcf.name == name) {
                    el.parentNode.jcf.refreshState();
                }
                el = el.parentNode;
            }
        }
    },
    onMouseWheel: function(e) {
        if (this.scrollType === 'vertical' || this.scrollType === 'both') {
            return this.vScrollBar.doScrollWheelStep(e.mWheelDelta) === false ? false : !this.options.alwaysPreventWheel;
        } else {
            return this.hScrollBar.doScrollWheelStep(e.mWheelDelta) === false ? false : !this.options.alwaysPreventWheel;
        }
    },
    onScrollablePress: function(e) {
        if (e.pointerType !== e.MSPOINTER_TYPE_TOUCH)
            return;

        this.preventFlag = true;
        this.origWindowScrollTop = jcf.lib.getScrollTop();
        this.origWindowScrollLeft = jcf.lib.getScrollLeft();

        this.scrollableOffset = jcf.lib.getOffset(this.realElement);
        if (this.hScrollBar) {
            this.scrollableTouchX = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageX;
            this.origValueX = this.hScrollBar.getScrollValue();
        }
        if (this.vScrollBar) {
            this.scrollableTouchY = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageY;
            this.origValueY = this.vScrollBar.getScrollValue();
        }
        jcf.lib.event.add(this.realElement, jcf.eventMove, this.onScrollableMove, this);
        jcf.lib.event.add(this.realElement, jcf.eventRelease, this.onScrollableRelease, this);
    },
    onScrollableMove: function(e) {
        if (this.vScrollBar) {
            var difY = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageY - this.scrollableTouchY;
            var valY = this.origValueY - difY;
            this.vScrollBar.scrollTo(valY);
            if (valY < 0 || valY > this.vScrollBar.options.range) {
                this.preventFlag = false;
            }
        }
        if (this.hScrollBar) {
            var difX = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageX - this.scrollableTouchX;
            var valX = this.origValueX - difX;
            this.hScrollBar.scrollTo(valX);
            if (valX < 0 || valX > this.hScrollBar.options.range) {
                this.preventFlag = false;
            }
        }
        if (this.preventFlag) {
            e.preventDefault();
        }
    },
    onScrollableRelease: function() {
        jcf.lib.event.remove(this.realElement, jcf.eventMove, this.onScrollableMove);
        jcf.lib.event.remove(this.realElement, jcf.eventRelease, this.onScrollableRelease);
    },
    refreshState: function() {
        if (this.options.alwaysKeepScrollbars) {
            if (this.hScrollBar)
                this.hScrollBar.scrollBar.style.display = 'block';
            if (this.vScrollBar)
                this.vScrollBar.scrollBar.style.display = 'block';
        } else {
            if (this.hScrollBar) {
                if (this.getScrollRange(false)) {
                    this.hScrollBar.scrollBar.style.display = 'block';
                    this.resizeScrollContent();
                    this.hScrollBar.setRange(this.getScrollRange(false));
                } else {
                    this.hScrollBar.scrollBar.style.display = 'none';
                    this.realElement.style.width = this.outerWrapper.style.width;
                }
                jcf.lib.toggleClass(this.outerWrapper, this.options.noHorizontalBarClass, this.hScrollBar.options.range === 0);
            }
            if (this.vScrollBar) {
                if (this.getScrollRange(true) > 0) {
                    this.vScrollBar.scrollBar.style.display = 'block';
                    this.resizeScrollContent();
                    this.vScrollBar.setRange(this.getScrollRange(true));
                } else {
                    this.vScrollBar.scrollBar.style.display = 'none';
                    this.realElement.style.width = this.outerWrapper.style.width;
                }
                jcf.lib.toggleClass(this.outerWrapper, this.options.noVerticalBarClass, this.vScrollBar.options.range === 0);
            }
        }
        if (this.vScrollBar) {
            this.vScrollBar.setRange(this.realElement.scrollHeight - this.realElement.offsetHeight);
            this.vScrollBar.setSize(this.realElement.offsetHeight);
            this.vScrollBar.scrollTo(this.realElement.scrollTop);
        }
        if (this.hScrollBar) {
            this.hScrollBar.setRange(this.realElement.scrollWidth - this.realElement.offsetWidth);
            this.hScrollBar.setSize(this.realElement.offsetWidth);
            this.hScrollBar.scrollTo(this.realElement.scrollLeft);
        }
    },
    getScrollRange: function(isVertical) {
        if (isVertical) {
            return this.realElement.scrollHeight - this.realElement.offsetHeight;
        } else {
            return this.realElement.scrollWidth - this.realElement.offsetWidth;
        }
    },
    getCurrentRange: function(scrollInstance) {
        return this.getScrollRange(scrollInstance.isVertical);
    },
    onCreateModule: function() {
        if (jcf.modules.select) {
            this.extendSelect();
        }
        if (jcf.modules.selectmultiple) {
            this.extendSelectMultiple();
        }
        if (jcf.modules.textarea) {
            this.extendTextarea();
        }
    },
    onModuleAdded: function(module) {
        if (module.prototype.name == 'select') {
            this.extendSelect();
        }
        if (module.prototype.name == 'selectmultiple') {
            this.extendSelectMultiple();
        }
        if (module.prototype.name == 'textarea') {
            this.extendTextarea();
        }
    },
    extendSelect: function() {
        // add scrollable if needed on control ready
        jcf.modules.select.prototype.onControlReady = function(obj) {
            if (obj.selectList.scrollHeight > obj.selectList.offsetHeight) {
                obj.jcfScrollable = new jcf.modules.customscroll({
                    alwaysPreventWheel: true,
                    replaces: obj.selectList
                });
            }
        }
        // update scroll function
        var orig = jcf.modules.select.prototype.scrollToItem;
        jcf.modules.select.prototype.scrollToItem = function() {
            orig.apply(this);
            if (this.jcfScrollable) {
                this.jcfScrollable.refreshState();
            }
        }
    },
    extendTextarea: function() {
        // add scrollable if needed on control ready
        jcf.modules.textarea.prototype.onControlReady = function(obj) {
            obj.jcfScrollable = new jcf.modules.customscroll({
                alwaysKeepScrollbars: true,
                alwaysPreventWheel: true,
                replaces: obj.realElement
            });
        }
        // update scroll function
        var orig = jcf.modules.textarea.prototype.refreshState;
        jcf.modules.textarea.prototype.refreshState = function() {
            orig.apply(this);
            if (this.jcfScrollable) {
                this.jcfScrollable.refreshState();
            }
        }
    },
    extendSelectMultiple: function() {
        // add scrollable if needed on control ready
        jcf.modules.selectmultiple.prototype.onControlReady = function(obj) {
            //if(obj.optionsHolder.scrollHeight > obj.optionsHolder.offsetHeight) {
            obj.jcfScrollable = new jcf.modules.customscroll({
                alwaysPreventWheel: true,
                replaces: obj.optionsHolder
            });
            //}
        }
        // update scroll function
        var orig = jcf.modules.selectmultiple.prototype.scrollToItem;
        jcf.modules.selectmultiple.prototype.scrollToItem = function() {
            orig.apply(this);
            if (this.jcfScrollable) {
                this.jcfScrollable.refreshState();
            }
        }

        // update scroll size?
        var orig2 = jcf.modules.selectmultiple.prototype.rebuildOptions;
        jcf.modules.selectmultiple.prototype.rebuildOptions = function() {
            orig2.apply(this);
            if (this.jcfScrollable) {
                this.jcfScrollable.refreshState();
            }
        }

    }
});

// scrollbar plugin
jcf.addPlugin({
    name: 'scrollbar',
    defaultOptions: {
        size: 0,
        range: 0,
        moveStep: 6,
        moveDistance: 50,
        moveInterval: 10,
        trackHoldDelay: 900,
        holder: null,
        vertical: true,
        scrollTag: 'div',
        onScroll: function() {
        },
        onScrollEnd: function() {
        },
        onScrollStart: function() {
        },
        disabledClass: 'btn-disabled',
        VscrollBarClass: 'vscrollbar',
        VscrollStructure: '<div class="vscroll-up"></div><div class="vscroll-line"><div class="vscroll-slider"><div class="scroll-bar-top"></div><div class="scroll-bar-bottom"></div></div></div></div><div class="vscroll-down"></div>',
        VscrollTrack: 'div.vscroll-line',
        VscrollBtnDecClass: 'div.vscroll-up',
        VscrollBtnIncClass: 'div.vscroll-down',
        VscrollSliderClass: 'div.vscroll-slider',
        HscrollBarClass: 'hscrollbar',
        HscrollStructure: '<div class="hscroll-left"></div><div class="hscroll-line"><div class="hscroll-slider"><div class="scroll-bar-left"></div><div class="scroll-bar-right"></div></div></div></div><div class="hscroll-right"></div>',
        HscrollTrack: 'div.hscroll-line',
        HscrollBtnDecClass: 'div.hscroll-left',
        HscrollBtnIncClass: 'div.hscroll-right',
        HscrollSliderClass: 'div.hscroll-slider'
    },
    init: function(userOptions) {
        this.setOptions(userOptions);
        this.createScrollBar();
        this.attachEvents();
        this.setSize();
    },
    setOptions: function(extOptions) {
        // merge options
        this.options = jcf.lib.extend({}, this.defaultOptions, extOptions);
        this.isVertical = this.options.vertical;
        this.prefix = this.isVertical ? 'V' : 'H';
        this.eventPageOffsetProperty = this.isVertical ? 'pageY' : 'pageX';
        this.positionProperty = this.isVertical ? 'top' : 'left';
        this.sizeProperty = this.isVertical ? 'height' : 'width';
        this.dimenionsProperty = this.isVertical ? 'offsetHeight' : 'offsetWidth';
        this.invertedDimenionsProperty = !this.isVertical ? 'offsetHeight' : 'offsetWidth';

        // set corresponding classes
        for (var p in this.options) {
            if (p.indexOf(this.prefix) == 0) {
                this.options[p.substr(1)] = this.options[p];
            }
        }
    },
    createScrollBar: function() {
        // create dimensions
        this.scrollBar = document.createElement(this.options.scrollTag);
        this.scrollBar.className = this.options.scrollBarClass;
        this.scrollBar.innerHTML = this.options.scrollStructure;

        // get elements
        this.track = jcf.lib.queryBySelector(this.options.scrollTrack, this.scrollBar)[0];
        this.btnDec = jcf.lib.queryBySelector(this.options.scrollBtnDecClass, this.scrollBar)[0];
        this.btnInc = jcf.lib.queryBySelector(this.options.scrollBtnIncClass, this.scrollBar)[0];
        this.slider = jcf.lib.queryBySelector(this.options.scrollSliderClass, this.scrollBar)[0];
        this.slider.style.position = 'absolute';
        this.track.style.position = 'relative';
    },
    attachEvents: function() {
        // append scrollbar to holder if provided
        if (this.options.holder) {
            this.options.holder.appendChild(this.scrollBar);
        }

        // attach listeners for slider and buttons
        jcf.lib.event.add(this.slider, jcf.eventPress, this.onSliderPressed, this);
        jcf.lib.event.add(this.btnDec, jcf.eventPress, this.onBtnDecPressed, this);
        jcf.lib.event.add(this.btnInc, jcf.eventPress, this.onBtnIncPressed, this);
        jcf.lib.event.add(this.track, jcf.eventPress, this.onTrackPressed, this);
    },
    setSize: function(value) {
        if (typeof value === 'number') {
            this.options.size = value;
        }
        this.scrollOffset = this.scrollValue = this.sliderOffset = 0;
        this.scrollBar.style[this.sizeProperty] = this.options.size + 'px';
        this.resizeControls();
        this.refreshSlider();
    },
    setRange: function(r) {
        this.options.range = Math.max(r, 0);
        this.resizeControls();
    },
    doScrollWheelStep: function(direction) {
        // 1 - scroll up, -1 scroll down
        this.startScroll();
        if ((direction < 0 && !this.isEndPosition()) || (direction > 0 && !this.isStartPosition())) {
            this.scrollTo(this.getScrollValue() - this.options.moveDistance * direction);
            this.moveScroll();
            this.endScroll();
            return false;
        }
    },
    resizeControls: function() {
        // calculate dimensions
        this.barSize = this.scrollBar[this.dimenionsProperty];
        this.btnDecSize = this.btnDec[this.dimenionsProperty];
        this.btnIncSize = this.btnInc[this.dimenionsProperty];
        this.trackSize = Math.max(0, this.barSize - this.btnDecSize - this.btnIncSize);

        // resize and reposition elements
        this.track.style[this.sizeProperty] = this.trackSize + 'px';
        this.trackSize = this.track[this.dimenionsProperty];
        this.sliderSize = this.getSliderSize();
        this.slider.style[this.sizeProperty] = this.sliderSize + 'px';
        this.sliderSize = this.slider[this.dimenionsProperty];
    },
    refreshSlider: function(complete) {
        // refresh dimensions
        if (complete) {
            this.resizeControls();
        }
        // redraw slider and classes
        this.sliderOffset = isNaN(this.sliderOffset) ? 0 : this.sliderOffset;
        this.slider.style[this.positionProperty] = this.sliderOffset + 'px';
    },
    startScroll: function() {
        // refresh range if possible
        if (this.options.spawnClass && typeof this.options.spawnClass.getCurrentRange === 'function') {
            this.setRange(this.options.spawnClass.getCurrentRange(this));
        }
        this.resizeControls();
        this.scrollBarOffset = jcf.lib.getOffset(this.track)[this.positionProperty];
        this.options.onScrollStart();
    },
    moveScroll: function() {
        this.options.onScroll(this.scrollValue);

        // add disabled classes
        jcf.lib.removeClass(this.btnDec, this.options.disabledClass);
        jcf.lib.removeClass(this.btnInc, this.options.disabledClass);
        if (this.scrollValue === 0) {
            jcf.lib.addClass(this.btnDec, this.options.disabledClass);
        }
        if (this.scrollValue === this.options.range) {
            jcf.lib.addClass(this.btnInc, this.options.disabledClass);
        }
    },
    endScroll: function() {
        this.options.onScrollEnd();
    },
    startButtonMoveScroll: function(direction) {
        this.startScroll();
        clearInterval(this.buttonScrollTimer);
        this.buttonScrollTimer = setInterval(jcf.lib.bind(function() {
            this.scrollValue += this.options.moveStep * direction
            if (this.scrollValue > this.options.range) {
                this.scrollValue = this.options.range;
                this.endButtonMoveScroll();
            } else if (this.scrollValue < 0) {
                this.scrollValue = 0;
                this.endButtonMoveScroll();
            }
            this.scrollTo(this.scrollValue);

        }, this), this.options.moveInterval);
    },
    endButtonMoveScroll: function() {
        clearInterval(this.buttonScrollTimer);
        this.endScroll();
    },
    isStartPosition: function() {
        return this.scrollValue === 0;
    },
    isEndPosition: function() {
        return this.scrollValue === this.options.range;
    },
    getSliderSize: function() {
        return Math.round(this.getSliderSizePercent() * this.trackSize / 100);
    },
    getSliderSizePercent: function() {
        return this.options.range === 0 ? 0 : this.barSize * 100 / (this.barSize + this.options.range);
    },
    getSliderOffsetByScrollValue: function() {
        return (this.scrollValue * 100 / this.options.range) * (this.trackSize - this.sliderSize) / 100;
    },
    getSliderOffsetPercent: function() {
        return this.sliderOffset * 100 / (this.trackSize - this.sliderSize);
    },
    getScrollValueBySliderOffset: function() {
        return this.getSliderOffsetPercent() * this.options.range / 100;
    },
    getScrollBarSize: function() {
        return this.scrollBar[this.invertedDimenionsProperty];
    },
    getScrollValue: function() {
        return this.scrollValue || 0;
    },
    scrollOnePage: function(direction) {
        this.scrollTo(this.scrollValue + direction * this.barSize);
    },
    scrollTo: function(x) {
        this.scrollValue = x < 0 ? 0 : x > this.options.range ? this.options.range : x;
        this.sliderOffset = this.getSliderOffsetByScrollValue();
        this.refreshSlider();
        this.moveScroll();
    },
    onSliderPressed: function(e) {
        jcf.lib.event.add(document.body, jcf.eventRelease, this.onSliderRelease, this);
        jcf.lib.event.add(document.body, jcf.eventMove, this.onSliderMove, this);
        jcf.lib.disableTextSelection(this.slider);

        // calculate offsets once
        this.sliderInnerOffset = (jcf.isTouchDevice ? e.changedTouches[0] : e)[this.eventPageOffsetProperty] - jcf.lib.getOffset(this.slider)[this.positionProperty];
        this.startScroll();
        return false;
    },
    onSliderRelease: function() {
        jcf.lib.event.remove(document.body, jcf.eventRelease, this.onSliderRelease);
        jcf.lib.event.remove(document.body, jcf.eventMove, this.onSliderMove);
    },
    onSliderMove: function(e) {
        this.sliderOffset = (jcf.isTouchDevice ? e.changedTouches[0] : e)[this.eventPageOffsetProperty] - this.scrollBarOffset - this.sliderInnerOffset;
        if (this.sliderOffset < 0) {
            this.sliderOffset = 0;
        } else if (this.sliderOffset + this.sliderSize > this.trackSize) {
            this.sliderOffset = this.trackSize - this.sliderSize;
        }
        if (this.previousOffset != this.sliderOffset) {
            this.previousOffset = this.sliderOffset;
            this.scrollTo(this.getScrollValueBySliderOffset());
        }
    },
    onBtnIncPressed: function() {
        jcf.lib.event.add(document.body, jcf.eventRelease, this.onBtnIncRelease, this);
        jcf.lib.disableTextSelection(this.btnInc);
        this.startButtonMoveScroll(1);
        return false;
    },
    onBtnIncRelease: function() {
        jcf.lib.event.remove(document.body, jcf.eventRelease, this.onBtnIncRelease);
        this.endButtonMoveScroll();
    },
    onBtnDecPressed: function() {
        jcf.lib.event.add(document.body, jcf.eventRelease, this.onBtnDecRelease, this);
        jcf.lib.disableTextSelection(this.btnDec);
        this.startButtonMoveScroll(-1);
        return false;
    },
    onBtnDecRelease: function() {
        jcf.lib.event.remove(document.body, jcf.eventRelease, this.onBtnDecRelease);
        this.endButtonMoveScroll();
    },
    onTrackPressed: function(e) {
        var position = e[this.eventPageOffsetProperty] - jcf.lib.getOffset(this.track)[this.positionProperty];
        var direction = position < this.sliderOffset ? -1 : position > this.sliderOffset + this.sliderSize ? 1 : 0;
        if (direction) {
            this.scrollOnePage(direction);
        }
    }
});

// DOM ready handler
function bindReady(handler) {
    var called = false;
    var ready = function() {
        if (called)
            return;
        called = true;
        handler();
    };
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', ready, false);
    } else if (document.attachEvent) {
        if (document.documentElement.doScroll && window == window.top) {
            var tryScroll = function() {
                if (called)
                    return;
                if (!document.body)
                    return;
                try {
                    document.documentElement.doScroll('left');
                    ready();
                } catch (e) {
                    setTimeout(tryScroll, 0);
                }
            };
            tryScroll();
        }
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                ready();
            }
        });
    }
    if (window.addEventListener)
        window.addEventListener('load', ready, false);
    else if (window.attachEvent)
        window.attachEvent('onload', ready);
}

// placeholder class
;
(function() {
    var placeholderCollection = [];
    PlaceholderInput = function() {
        this.options = {
            element: null,
            showUntilTyping: false,
            wrapWithElement: false,
            getParentByClass: false,
            showPasswordBullets: false,
            placeholderAttr: 'value',
            inputFocusClass: 'focus',
            inputActiveClass: 'text-active',
            parentFocusClass: 'parent-focus',
            parentActiveClass: 'parent-active',
            labelFocusClass: 'label-focus',
            labelActiveClass: 'label-active',
            fakeElementClass: 'input-placeholder-text'
        };
        placeholderCollection.push(this);
        this.init.apply(this, arguments);
    };
    PlaceholderInput.refreshAllInputs = function(except) {
        for (var i = 0; i < placeholderCollection.length; i++) {
            if (except !== placeholderCollection[i]) {
                placeholderCollection[i].refreshState();
            }
        }
    };
    PlaceholderInput.replaceByOptions = function(opt) {
        var inputs = [].concat(
                convertToArray(document.getElementsByTagName('input')),
                convertToArray(document.getElementsByTagName('textarea'))
                );
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].className.indexOf(opt.skipClass) < 0) {
                var inputType = getInputType(inputs[i]);
                var placeholderValue = inputs[i].getAttribute('placeholder');
                if (opt.focusOnly || (opt.clearInputs && (inputType === 'text' || inputType === 'email' || placeholderValue)) ||
                        (opt.clearTextareas && inputType === 'textarea') ||
                        (opt.clearPasswords && inputType === 'password')
                        ) {
                    new PlaceholderInput({
                        element: inputs[i],
                        focusOnly: opt.focusOnly,
                        wrapWithElement: opt.wrapWithElement,
                        showUntilTyping: opt.showUntilTyping,
                        getParentByClass: opt.getParentByClass,
                        showPasswordBullets: opt.showPasswordBullets,
                        placeholderAttr: placeholderValue ? 'placeholder' : opt.placeholderAttr
                    });
                }
            }
        }
    };
    PlaceholderInput.prototype = {
        init: function(opt) {
            this.setOptions(opt);
            if (this.element && this.element.PlaceholderInst) {
                this.element.PlaceholderInst.refreshClasses();
            } else {
                this.element.PlaceholderInst = this;
                if (this.elementType !== 'radio' || this.elementType !== 'checkbox' || this.elementType !== 'file') {
                    this.initElements();
                    this.attachEvents();
                    this.refreshClasses();
                }
            }
        },
        setOptions: function(opt) {
            for (var p in opt) {
                if (opt.hasOwnProperty(p)) {
                    this.options[p] = opt[p];
                }
            }
            if (this.options.element) {
                this.element = this.options.element;
                this.elementType = getInputType(this.element);
                if (this.options.focusOnly) {
                    this.wrapWithElement = false;
                } else {
                    if (this.elementType === 'password' && this.options.showPasswordBullets) {
                        this.wrapWithElement = false;
                    } else {
                        this.wrapWithElement = this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement;
                    }
                }
                this.setPlaceholderValue(this.options.placeholderAttr);
            }
        },
        setPlaceholderValue: function(attr) {
            this.origValue = (attr === 'value' ? this.element.defaultValue : (this.element.getAttribute(attr) || ''));
            if (this.options.placeholderAttr !== 'value') {
                this.element.removeAttribute(this.options.placeholderAttr);
            }
        },
        initElements: function() {
            // create fake element if needed
            if (this.wrapWithElement) {
                this.fakeElement = document.createElement('span');
                this.fakeElement.className = this.options.fakeElementClass;
                this.fakeElement.innerHTML += this.origValue;
                this.fakeElement.style.color = getStyle(this.element, 'color');
                this.fakeElement.style.position = 'absolute';
                this.element.parentNode.insertBefore(this.fakeElement, this.element);

                if (this.element.value === this.origValue || !this.element.value) {
                    this.element.value = '';
                    this.togglePlaceholderText(true);
                } else {
                    this.togglePlaceholderText(false);
                }
            } else if (!this.element.value && this.origValue.length) {
                this.element.value = this.origValue;
            }
            // get input label
            if (this.element.id) {
                this.labels = document.getElementsByTagName('label');
                for (var i = 0; i < this.labels.length; i++) {
                    if (this.labels[i].htmlFor === this.element.id) {
                        this.labelFor = this.labels[i];
                        break;
                    }
                }
            }
            // get parent node (or parentNode by className)
            this.elementParent = this.element.parentNode;
            if (typeof this.options.getParentByClass === 'string') {
                var el = this.element;
                while (el.parentNode) {
                    if (hasClass(el.parentNode, this.options.getParentByClass)) {
                        this.elementParent = el.parentNode;
                        break;
                    } else {
                        el = el.parentNode;
                    }
                }
            }
        },
        attachEvents: function() {
            this.element.onfocus = bindScope(this.focusHandler, this);
            this.element.onblur = bindScope(this.blurHandler, this);
            if (this.options.showUntilTyping) {
                this.element.onkeydown = bindScope(this.typingHandler, this);
                this.element.onpaste = bindScope(this.typingHandler, this);
            }
            if (this.wrapWithElement)
                this.fakeElement.onclick = bindScope(this.focusSetter, this);
        },
        togglePlaceholderText: function(state) {
            if (!this.element.readOnly && !this.options.focusOnly) {
                if (this.wrapWithElement) {
                    this.fakeElement.style.display = state ? '' : 'none';
                } else {
                    this.element.value = state ? this.origValue : '';
                }
            }
        },
        focusSetter: function() {
            this.element.focus();
        },
        focusHandler: function() {
            clearInterval(this.checkerInterval);
            this.checkerInterval = setInterval(bindScope(this.intervalHandler, this), 1);
            this.focused = true;
            if (!this.element.value.length || this.element.value === this.origValue) {
                if (!this.options.showUntilTyping) {
                    this.togglePlaceholderText(false);
                }
            }
            this.refreshClasses();
        },
        blurHandler: function() {
            clearInterval(this.checkerInterval);
            this.focused = false;
            if (!this.element.value.length || this.element.value === this.origValue) {
                this.togglePlaceholderText(true);
            }
            this.refreshClasses();
            PlaceholderInput.refreshAllInputs(this);
        },
        typingHandler: function() {
            setTimeout(bindScope(function() {
                if (this.element.value.length) {
                    this.togglePlaceholderText(false);
                    this.refreshClasses();
                }
            }, this), 10);
        },
        intervalHandler: function() {
            if (typeof this.tmpValue === 'undefined') {
                this.tmpValue = this.element.value;
            }
            if (this.tmpValue != this.element.value) {
                PlaceholderInput.refreshAllInputs(this);
            }
        },
        refreshState: function() {
            if (this.wrapWithElement) {
                if (this.element.value.length && this.element.value !== this.origValue) {
                    this.togglePlaceholderText(false);
                } else if (!this.element.value.length) {
                    this.togglePlaceholderText(true);
                }
            }
            this.refreshClasses();
        },
        refreshClasses: function() {
            this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
            this.setStateClass(this.element, this.options.inputFocusClass, this.focused);
            this.setStateClass(this.elementParent, this.options.parentFocusClass, this.focused);
            this.setStateClass(this.labelFor, this.options.labelFocusClass, this.focused);
            this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
            this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
            this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
        },
        setStateClass: function(el, cls, state) {
            if (!el)
                return;
            else if (state)
                addClass(el, cls);
            else
                removeClass(el, cls);
        }
    };

    // utility functions
    function convertToArray(collection) {
        var arr = [];
        for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
            arr[i] = collection[i];
        }
        return arr;
    }
    function getInputType(input) {
        return (input.type ? input.type : input.tagName).toLowerCase();
    }
    function hasClass(el, cls) {
        return el.className ? el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : false;
    }
    function addClass(el, cls) {
        if (!hasClass(el, cls))
            el.className += " " + cls;
    }
    function removeClass(el, cls) {
        if (hasClass(el, cls)) {
            el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
        }
    }
    function bindScope(f, scope) {
        return function() {
            return f.apply(scope, arguments);
        };
    }
    function getStyle(el, prop) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null)[prop];
        } else if (el.currentStyle) {
            return el.currentStyle[prop];
        } else {
            return el.style[prop];
        }
    }
}());

/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
;
(function(t, e) {
    "use strict";
    function n() {
        if (!i.READY) {
            i.event.determineEventTypes();
            for (var t in i.gestures)
                i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
            i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect), i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect), i.READY = !0
        }
    }
    var i = function(t, e) {
        return new i.Instance(t, e || {})
    };
    i.defaults = {stop_browser_behavior: {userSelect: "none", touchAction: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)"}}, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, i.HAS_TOUCHEVENTS = "ontouchstart"in t, i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN = "down", i.DIRECTION_LEFT = "left", i.DIRECTION_UP = "up", i.DIRECTION_RIGHT = "right", i.POINTER_MOUSE = "mouse", i.POINTER_TOUCH = "touch", i.POINTER_PEN = "pen", i.EVENT_START = "start", i.EVENT_MOVE = "move", i.EVENT_END = "end", i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance = function(t, e) {
        var r = this;
        return n(), this.element = t, this.enabled = !0, this.options = i.utils.extend(i.utils.extend({}, i.defaults), e || {}), this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), i.event.onTouch(t, i.EVENT_START, function(t) {
            r.enabled && i.detection.startDetect(r, t)
        }), this
    }, i.Instance.prototype = {on: function(t, e) {
            for (var n = t.split(" "), i = 0; n.length > i; i++)
                this.element.addEventListener(n[i], e, !1);
            return this
        }, off: function(t, e) {
            for (var n = t.split(" "), i = 0; n.length > i; i++)
                this.element.removeEventListener(n[i], e, !1);
            return this
        }, trigger: function(t, e) {
            var n = i.DOCUMENT.createEvent("Event");
            n.initEvent(t, !0, !0), n.gesture = e;
            var r = this.element;
            return i.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(n), this
        }, enable: function(t) {
            return this.enabled = t, this
        }};
    var r = null, o = !1, s = !1;
    i.event = {bindDom: function(t, e, n) {
            for (var i = e.split(" "), r = 0; i.length > r; r++)
                t.addEventListener(i[r], n, !1)
        }, onTouch: function(t, e, n) {
            var a = this;
            this.bindDom(t, i.EVENT_TYPES[e], function(c) {
                var u = c.type.toLowerCase();
                if (!u.match(/mouse/) || !s) {
                    (u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which) && (o = !0), u.match(/touch|pointer/) && (s = !0);
                    var h = 0;
                    o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length : s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE : h || (e = i.EVENT_END), h || null === r ? r = c : c = r, n.call(i.detection, a.collectEventData(t, e, c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))), h || (r = null, o = !1, s = !1, i.PointerEvent.reset())
                }
            })
        }, determineEventTypes: function() {
            var t;
            t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] = t[2]
        }, getTouchList: function(t) {
            return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches : [{identifier: 1, pageX: t.pageX, pageY: t.pageY, target: t.target}]
        }, collectEventData: function(t, e, n) {
            var r = this.getTouchList(n, e), o = i.POINTER_TOUCH;
            return(n.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {center: i.utils.getCenter(r), timeStamp: (new Date).getTime(), target: n.target, touches: r, eventType: e, pointerType: o, srcEvent: n, preventDefault: function() {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                }, stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                }, stopDetect: function() {
                    return i.detection.stopDetect()
                }}
        }}, i.PointerEvent = {pointers: {}, getTouchList: function() {
            var t = this, e = [];
            return Object.keys(t.pointers).sort().forEach(function(n) {
                e.push(t.pointers[n])
            }), e
        }, updatePointer: function(t, e) {
            return t == i.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length
        }, matchType: function(t, e) {
            if (!e.pointerType)
                return!1;
            var n = {};
            return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN, n[t]
        }, getEvents: function() {
            return["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        }, reset: function() {
            this.pointers = {}
        }}, i.utils = {extend: function(t, n, i) {
            for (var r in n)
                t[r] !== e && i || (t[r] = n[r]);
            return t
        }, hasParent: function(t, e) {
            for (; t; ) {
                if (t == e)
                    return!0;
                t = t.parentNode
            }
            return!1
        }, getCenter: function(t) {
            for (var e = [], n = [], i = 0, r = t.length; r > i; i++)
                e.push(t[i].pageX), n.push(t[i].pageY);
            return{pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2, pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2}
        }, getVelocity: function(t, e, n) {
            return{x: Math.abs(e / t) || 0, y: Math.abs(n / t) || 0}
        }, getAngle: function(t, e) {
            var n = e.pageY - t.pageY, i = e.pageX - t.pageX;
            return 180 * Math.atan2(n, i) / Math.PI
        }, getDirection: function(t, e) {
            var n = Math.abs(t.pageX - e.pageX), r = Math.abs(t.pageY - e.pageY);
            return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN
        }, getDistance: function(t, e) {
            var n = e.pageX - t.pageX, i = e.pageY - t.pageY;
            return Math.sqrt(n * n + i * i)
        }, getScale: function(t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
        }, getRotation: function(t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
        }, isVertical: function(t) {
            return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
        }, stopDefaultBrowserBehavior: function(t, e) {
            var n, i = ["webkit", "khtml", "moz", "ms", "o", ""];
            if (e && t.style) {
                for (var r = 0; i.length > r; r++)
                    for (var o in e)
                        e.hasOwnProperty(o) && (n = o, i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
                "none" == e.userSelect && (t.onselectstart = function() {
                    return!1
                })
            }
        }}, i.detection = {gestures: [], current: null, previous: null, stopped: !1, startDetect: function(t, e) {
            this.current || (this.stopped = !1, this.current = {inst: t, startEvent: i.utils.extend({}, e), lastEvent: !1, name: ""}, this.detect(e))
        }, detect: function(t) {
            if (this.current && !this.stopped) {
                t = this.extendEventData(t);
                for (var e = this.current.inst.options, n = 0, r = this.gestures.length; r > n; n++) {
                    var o = this.gestures[n];
                    if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                        this.stopDetect();
                        break
                    }
                }
                return this.current && (this.current.lastEvent = t), t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
            }
        }, stopDetect: function() {
            this.previous = i.utils.extend({}, this.current), this.current = null, this.stopped = !0
        }, extendEventData: function(t) {
            var e = this.current.startEvent;
            if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
                e.touches = [];
                for (var n = 0, r = t.touches.length; r > n; n++)
                    e.touches.push(i.utils.extend({}, t.touches[n]))
            }
            var o = t.timeStamp - e.timeStamp, s = t.center.pageX - e.center.pageX, a = t.center.pageY - e.center.pageY, c = i.utils.getVelocity(o, s, a);
            return i.utils.extend(t, {deltaTime: o, deltaX: s, deltaY: a, velocityX: c.x, velocityY: c.y, distance: i.utils.getDistance(e.center, t.center), angle: i.utils.getAngle(e.center, t.center), direction: i.utils.getDirection(e.center, t.center), scale: i.utils.getScale(e.touches, t.touches), rotation: i.utils.getRotation(e.touches, t.touches), startEvent: e}), t
        }, register: function(t) {
            var n = t.defaults || {};
            return n[t.name] === e && (n[t.name] = !0), i.utils.extend(i.defaults, n, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function(t, e) {
                return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
            }), this.gestures
        }}, i.gestures = i.gestures || {}, i.gestures.Hold = {name: "hold", index: 10, defaults: {hold_timeout: 500, hold_threshold: 1}, timer: null, handler: function(t, e) {
            switch (t.eventType) {
                case i.EVENT_START:
                    clearTimeout(this.timer), i.detection.current.name = this.name, this.timer = setTimeout(function() {
                        "hold" == i.detection.current.name && e.trigger("hold", t)
                    }, e.options.hold_timeout);
                    break;
                case i.EVENT_MOVE:
                    t.distance > e.options.hold_threshold && clearTimeout(this.timer);
                    break;
                case i.EVENT_END:
                    clearTimeout(this.timer)
                }
        }}, i.gestures.Tap = {name: "tap", index: 100, defaults: {tap_max_touchtime: 250, tap_max_distance: 10, tap_always: !0, doubletap_distance: 20, doubletap_interval: 300}, handler: function(t, e) {
            if (t.eventType == i.EVENT_END) {
                var n = i.detection.previous, r = !1;
                if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance)
                    return;
                n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0), (!r || e.options.tap_always) && (i.detection.current.name = "tap", e.trigger(i.detection.current.name, t))
            }
        }}, i.gestures.Swipe = {name: "swipe", index: 40, defaults: {swipe_max_touches: 1, swipe_velocity: .7}, handler: function(t, e) {
            if (t.eventType == i.EVENT_END) {
                if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches)
                    return;
                (t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t))
            }
        }}, i.gestures.Drag = {name: "drag", index: 50, defaults: {drag_min_distance: 10, drag_max_touches: 1, drag_block_horizontal: !1, drag_block_vertical: !1, drag_lock_to_axis: !1, drag_lock_min_distance: 25}, triggered: !1, handler: function(t, n) {
            if (i.detection.current.name != this.name && this.triggered)
                return n.trigger(this.name + "end", t), this.triggered = !1, e;
            if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches))
                switch (t.eventType) {
                    case i.EVENT_START:
                        this.triggered = !1;
                        break;
                    case i.EVENT_MOVE:
                        if (t.distance < n.options.drag_min_distance && i.detection.current.name != this.name)
                            return;
                        i.detection.current.name = this.name, (i.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                        var r = i.detection.current.lastEvent.direction;
                        t.drag_locked_to_axis && r !== t.direction && (t.direction = i.utils.isVertical(r) ? 0 > t.deltaY ? i.DIRECTION_UP : i.DIRECTION_DOWN : 0 > t.deltaX ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && i.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
                        break;
                    case i.EVENT_END:
                        this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
                    }
        }}, i.gestures.Transform = {name: "transform", index: 45, defaults: {transform_min_scale: .01, transform_min_rotation: 1, transform_always_block: !1}, triggered: !1, handler: function(t, n) {
            if (i.detection.current.name != this.name && this.triggered)
                return n.trigger(this.name + "end", t), this.triggered = !1, e;
            if (!(2 > t.touches.length))
                switch (n.options.transform_always_block && t.preventDefault(), t.eventType) {
                    case i.EVENT_START:
                        this.triggered = !1;
                        break;
                    case i.EVENT_MOVE:
                        var r = Math.abs(1 - t.scale), o = Math.abs(t.rotation);
                        if (n.options.transform_min_scale > r && n.options.transform_min_rotation > o)
                            return;
                        i.detection.current.name = this.name, this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), o > n.options.transform_min_rotation && n.trigger("rotate", t), r > n.options.transform_min_scale && (n.trigger("pinch", t), n.trigger("pinch" + (1 > t.scale ? "in" : "out"), t));
                        break;
                    case i.EVENT_END:
                        this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
                    }
        }}, i.gestures.Touch = {name: "touch", index: -1 / 0, defaults: {prevent_default: !1, prevent_mouseevents: !1}, handler: function(t, n) {
            return n.options.prevent_mouseevents && t.pointerType == i.POINTER_MOUSE ? (t.stopDetect(), e) : (n.options.prevent_default && t.preventDefault(), t.eventType == i.EVENT_START && n.trigger(this.name, t), e)
        }}, i.gestures.Release = {name: "release", index: 1 / 0, handler: function(t, e) {
            t.eventType == i.EVENT_END && e.trigger(this.name, t)
        }}, "object" == typeof module && "object" == typeof module.exports ? module.exports = i : (t.Hammer = i, "function" == typeof t.define && t.define.amd && t.define("hammer", [], function() {
        return i
    }))
})(this), function(t, e) {
    "use strict";
    t !== e && (Hammer.event.bindDom = function(n, i, r) {
        t(n).on(i, function(t) {
            var n = t.originalEvent || t;
            n.pageX === e && (n.pageX = t.pageX, n.pageY = t.pageY), n.target || (n.target = t.target), n.which === e && (n.which = n.button), n.preventDefault || (n.preventDefault = t.preventDefault), n.stopPropagation || (n.stopPropagation = t.stopPropagation), r.call(this, n)
        })
    }, Hammer.Instance.prototype.on = function(e, n) {
        return t(this.element).on(e, n)
    }, Hammer.Instance.prototype.off = function(e, n) {
        return t(this.element).off(e, n)
    }, Hammer.Instance.prototype.trigger = function(e, n) {
        var i = t(this.element);
        return i.has(n.target).length && (i = t(n.target)), i.trigger({type: e, gesture: n})
    }, t.fn.hammer = function(e) {
        return this.each(function() {
            var n = t(this), i = n.data("hammer");
            i ? i && e && Hammer.utils.extend(i.options, e) : n.data("hammer", new Hammer(this, e || {}))
        })
    })
}(window.jQuery || window.Zepto);

/*
 * touchSwipe - jQuery Plugin
 * https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * http://labs.skinkers.com/touchSwipe/
 * http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson (www.skinkers.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * $version: 1.6.0
 */;
(function(d) {
    +"use strict";
    var n = "left", m = "right", c = "up", u = "down", b = "in", v = "out", k = "none", q = "auto", j = "swipe", r = "pinch", e = "click", x = "horizontal", s = "vertical", h = "all", f = "start", i = "move", g = "end", o = "cancel", a = "ontouchstart" in window, w = "TouchSwipe";
    var l = {fingers: 1, threshold: 75, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, triggerOnTouchEnd: true, triggerOnTouchLeave: false, allowPageScroll: "auto", fallbackToMouseEvents: true, excludedElements: "button, input, select, textarea, a, .noSwipe"};
    d.fn.swipe = function(A) {
        var z = d(this), y = z.data(w);
        if (y && typeof A === "string") {
            if (y[A]) {
                return y[A].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                d.error("Method " + A + " does not exist on jQuery.swipe")
            }
        } else {
            if (!y && (typeof A === "object" || !A)) {
                return t.apply(this, arguments)
            }
        }
        return z
    };
    d.fn.swipe.defaults = l;
    d.fn.swipe.phases = {PHASE_START: f, PHASE_MOVE: i, PHASE_END: g, PHASE_CANCEL: o};
    d.fn.swipe.directions = {LEFT: n, RIGHT: m, UP: c, DOWN: u, IN: b, OUT: v};
    d.fn.swipe.pageScroll = {NONE: k, HORIZONTAL: x, VERTICAL: s, AUTO: q};
    d.fn.swipe.fingers = {ONE: 1, TWO: 2, THREE: 3, ALL: h};
    function t(y) {
        if (y && (y.allowPageScroll === undefined && (y.swipe !== undefined || y.swipeStatus !== undefined))) {
            y.allowPageScroll = k
        }
        if (!y) {
            y = {}
        }
        y = d.extend({}, d.fn.swipe.defaults, y);
        return this.each(function() {
            var A = d(this);
            var z = A.data(w);
            if (!z) {
                z = new p(this, y);
                A.data(w, z)
            }
        })
    }
    function p(S, af) {
        var aF = (a || !af.fallbackToMouseEvents), ax = aF ? "touchstart" : "mousedown", U = aF ? "touchmove" : "mousemove", au = aF ? "touchend" : "mouseup", D = aF ? null : "mouseleave", R = "touchcancel";
        var ac = 0;
        var N = null;
        var ag = 0;
        var aB = 0;
        var A = 0;
        var ai = 1;
        var aH = 0;
        var H = d(S);
        var O = "start";
        var aE = 0;
        var ah = null;
        var I = 0;
        var Y = 0;
        var aA = 0;
        var aJ = 0;
        try {
            H.bind(ax, ar);
            H.bind(R, M)
        } catch (aC) {
            d.error("events not supported " + ax + "," + R + " on jQuery.swipe")
        }
        this.enable = function() {
            H.bind(ax, ar);
            H.bind(R, M);
            return H
        };
        this.disable = function() {
            Q();
            return H
        };
        this.destroy = function() {
            Q();
            H.data(w, null);
            return H
        };
        function ar(aM) {
            if (X()) {
                return
            }
            if (d(aM.target).closest(af.excludedElements, H).length > 0) {
                return
            }
            var aN = aM.originalEvent;
            var aL, aK = a ? aN.touches[0] : aN;
            O = f;
            if (a) {
                aE = aN.touches.length
            } else {
                aM.preventDefault()
            }
            ac = 0;
            N = null;
            aH = null;
            ag = 0;
            aB = 0;
            A = 0;
            ai = 1;
            pinchDistance = 0;
            ah = T();
            z();
            if (!a || (aE === af.fingers || af.fingers === h) || ao()) {
                aI(0, aK);
                I = B();
                if (aE == 2) {
                    aI(1, aN.touches[1]);
                    aB = A = Z(ah[0].start, ah[1].start)
                }
                if (af.swipeStatus || af.pinchStatus) {
                    aL = aD(aN, O)
                }
            } else {
                aL = false
            }
            if (aL === false) {
                O = o;
                aD(aN, O);
                return aL
            } else {
                aj(true)
            }
        }
        function P(aN) {
            var aQ = aN.originalEvent;
            if (O === g || O === o || ae()) {
                return
            }
            var aM, aL = a ? aQ.touches[0] : aQ;
            var aO = V(aL);
            Y = B();
            if (a) {
                aE = aQ.touches.length
            }
            O = i;
            if (aE == 2) {
                if (aB == 0) {
                    aI(1, aQ.touches[1]);
                    aB = A = Z(ah[0].start, ah[1].start)
                } else {
                    V(aQ.touches[1]);
                    A = Z(ah[0].end, ah[1].end);
                    aH = an(ah[0].end, ah[1].end)
                }
                ai = y(aB, A);
                pinchDistance = Math.abs(aB - A)
            }
            if ((aE === af.fingers || af.fingers === h) || !a || ao()) {
                N = aq(aO.start, aO.end);
                C(aN, N);
                ac = G(aO.start, aO.end);
                ag = L();
                if (af.swipeStatus || af.pinchStatus) {
                    aM = aD(aQ, O)
                }
                if (!af.triggerOnTouchEnd || af.triggerOnTouchLeave) {
                    var aK = true;
                    if (af.triggerOnTouchLeave) {
                        var aP = at(this);
                        aK = az(aO.end, aP)
                    }
                    if (!af.triggerOnTouchEnd && aK) {
                        O = aG(i)
                    } else {
                        if (af.triggerOnTouchLeave && !aK) {
                            O = aG(g)
                        }
                    }
                    if (O == o || O == g) {
                        aD(aQ, O)
                    }
                }
            } else {
                O = o;
                aD(aQ, O)
            }
            if (aM === false) {
                O = o;
                aD(aQ, O)
            }
        }
        function aa(aM) {
            var aO = aM.originalEvent;
            if (a) {
                if (aO.touches.length > 0) {
                    av();
                    return true
                }
            }
            if (ae()) {
                aE = aJ
            }
            aM.preventDefault();
            Y = B();
            if (af.triggerOnTouchEnd || (af.triggerOnTouchEnd == false && O === i)) {
                O = g;
                var aL = ((aE === af.fingers || af.fingers === h) || !a);
                var aK = ah[0].end.x !== 0;
                var aN = aL && aK && (am() || ay());
                if (aN) {
                    aD(aO, O)
                } else {
                    O = o;
                    aD(aO, O)
                }
            } else {
                if (O === i) {
                    O = o;
                    aD(aO, O)
                }
            }
            aj(false)
        }
        function M() {
            aE = 0;
            Y = 0;
            I = 0;
            aB = 0;
            A = 0;
            ai = 1;
            z();
            aj(false)
        }
        function W(aK) {
            var aL = aK.originalEvent;
            if (af.triggerOnTouchLeave) {
                O = aG(g);
                aD(aL, O)
            }
        }
        function Q() {
            H.unbind(ax, ar);
            H.unbind(R, M);
            H.unbind(U, P);
            H.unbind(au, aa);
            if (D) {
                H.unbind(D, W)
            }
            aj(false)
        }
        function aG(aN) {
            var aM = aN;
            var aL = ap();
            var aK = ad();
            if (!aL) {
                aM = o
            } else {
                if (aK && aN == i && (!af.triggerOnTouchEnd || af.triggerOnTouchLeave)) {
                    aM = g
                } else {
                    if (!aK && aN == g && af.triggerOnTouchLeave) {
                        aM = o
                    }
                }
            }
            return aM
        }
        function aD(aM, aK) {
            var aL = undefined;
            if (ab()) {
                aL = al(aM, aK, j)
            }
            if (ao() && aL !== false) {
                aL = al(aM, aK, r)
            }
            if (K() && aL !== false) {
                aL = al(aM, aK, e)
            }
            if (aK === o) {
                M(aM)
            }
            if (aK === g) {
                if (a) {
                    if (aM.touches.length == 0) {
                        M(aM)
                    }
                } else {
                    M(aM)
                }
            }
            return aL
        }
        function al(aN, aK, aM) {
            var aL = undefined;
            if (aM == j) {
                if (af.swipeStatus) {
                    aL = af.swipeStatus.call(H, aN, aK, N || null, ac || 0, ag || 0, aE);
                    if (aL === false) {
                        return false
                    }
                }
                if (aK == g && ay()) {
                    if (af.swipe) {
                        aL = af.swipe.call(H, aN, N, ac, ag, aE);
                        if (aL === false) {
                            return false
                        }
                    }
                    switch (N) {
                        case n:
                            if (af.swipeLeft) {
                                aL = af.swipeLeft.call(H, aN, N, ac, ag, aE)
                            }
                            break;
                        case m:
                            if (af.swipeRight) {
                                aL = af.swipeRight.call(H, aN, N, ac, ag, aE)
                            }
                            break;
                        case c:
                            if (af.swipeUp) {
                                aL = af.swipeUp.call(H, aN, N, ac, ag, aE)
                            }
                            break;
                        case u:
                            if (af.swipeDown) {
                                aL = af.swipeDown.call(H, aN, N, ac, ag, aE)
                            }
                            break
                        }
                }
            }
            if (aM == r) {
                if (af.pinchStatus) {
                    aL = af.pinchStatus.call(H, aN, aK, aH || null, pinchDistance || 0, ag || 0, aE, ai);
                    if (aL === false) {
                        return false
                    }
                }
                if (aK == g && am()) {
                    switch (aH) {
                        case b:
                            if (af.pinchIn) {
                                aL = af.pinchIn.call(H, aN, aH || null, pinchDistance || 0, ag || 0, aE, ai)
                            }
                            break;
                        case v:
                            if (af.pinchOut) {
                                aL = af.pinchOut.call(H, aN, aH || null, pinchDistance || 0, ag || 0, aE, ai)
                            }
                            break
                        }
                }
            }
            if (aM == e) {
                if (aK === o) {
                    if (af.click && (aE === 1 || !a) && (isNaN(ac) || ac === 0)) {
                        aL = af.click.call(H, aN, aN.target)
                    }
                }
            }
            return aL
        }
        function ad() {
            if (af.threshold !== null) {
                return ac >= af.threshold
            }
            return true
        }
        function ak() {
            if (af.pinchThreshold !== null) {
                return pinchDistance >= af.pinchThreshold
            }
            return true
        }
        function ap() {
            var aK;
            if (af.maxTimeThreshold) {
                if (ag >= af.maxTimeThreshold) {
                    aK = false
                } else {
                    aK = true
                }
            } else {
                aK = true
            }
            return aK
        }
        function C(aK, aL) {
            if (af.allowPageScroll === k || ao()) {
                aK.preventDefault()
            } else {
                var aM = af.allowPageScroll === q;
                switch (aL) {
                    case n:
                        if ((af.swipeLeft && aM) || (!aM && af.allowPageScroll != x)) {
                            aK.preventDefault()
                        }
                        break;
                    case m:
                        if ((af.swipeRight && aM) || (!aM && af.allowPageScroll != x)) {
                            aK.preventDefault()
                        }
                        break;
                    case c:
                        if ((af.swipeUp && aM) || (!aM && af.allowPageScroll != s)) {
                            aK.preventDefault()
                        }
                        break;
                    case u:
                        if ((af.swipeDown && aM) || (!aM && af.allowPageScroll != s)) {
                            aK.preventDefault()
                        }
                        break
                    }
            }
        }
        function am() {
            return ak()
        }
        function ao() {
            return !!(af.pinchStatus || af.pinchIn || af.pinchOut)
        }
        function aw() {
            return !!(am() && ao())
        }
        function ay() {
            var aK = ap();
            var aM = ad();
            var aL = aM && aK;
            return aL
        }
        function ab() {
            return !!(af.swipe || af.swipeStatus || af.swipeLeft || af.swipeRight || af.swipeUp || af.swipeDown)
        }
        function E() {
            return !!(ay() && ab())
        }
        function K() {
            return !!(af.click)
        }
        function av() {
            aA = B();
            aJ = event.touches.length + 1
        }
        function z() {
            aA = 0;
            aJ = 0
        }
        function ae() {
            var aK = false;
            if (aA) {
                var aL = B() - aA;
                if (aL <= af.fingerReleaseThreshold) {
                    aK = true
                }
            }
            return aK
        }
        function X() {
            return !!(H.data(w + "_intouch") === true)
        }
        function aj(aK) {
            if (aK === true) {
                H.bind(U, P);
                H.bind(au, aa);
                if (D) {
                    H.bind(D, W)
                }
            } else {
                H.unbind(U, P, false);
                H.unbind(au, aa, false);
                if (D) {
                    H.unbind(D, W, false)
                }
            }
            H.data(w + "_intouch", aK === true)
        }
        function aI(aL, aK) {
            var aM = aK.identifier !== undefined ? aK.identifier : 0;
            ah[aL].identifier = aM;
            ah[aL].start.x = ah[aL].end.x = aK.pageX;
            ah[aL].start.y = ah[aL].end.y = aK.pageY;
            return ah[aL]
        }
        function V(aK) {
            var aM = aK.identifier !== undefined ? aK.identifier : 0;
            var aL = J(aM);
            aL.end.x = aK.pageX;
            aL.end.y = aK.pageY;
            return aL
        }
        function J(aL) {
            for (var aK = 0; aK < ah.length; aK++) {
                if (ah[aK].identifier == aL) {
                    return ah[aK]
                }
            }
        }
        function T() {
            var aK = [];
            for (var aL = 0; aL <= 5; aL++) {
                aK.push({start: {x: 0, y: 0}, end: {x: 0, y: 0}, identifier: 0})
            }
            return aK
        }
        function L() {
            return Y - I
        }
        function Z(aN, aM) {
            var aL = Math.abs(aN.x - aM.x);
            var aK = Math.abs(aN.y - aM.y);
            return Math.round(Math.sqrt(aL * aL + aK * aK))
        }
        function y(aK, aL) {
            var aM = (aL / aK) * 1;
            return aM.toFixed(2)
        }
        function an() {
            if (ai < 1) {
                return v
            } else {
                return b
            }
        }
        function G(aL, aK) {
            return Math.round(Math.sqrt(Math.pow(aK.x - aL.x, 2) + Math.pow(aK.y - aL.y, 2)))
        }
        function F(aN, aL) {
            var aK = aN.x - aL.x;
            var aP = aL.y - aN.y;
            var aM = Math.atan2(aP, aK);
            var aO = Math.round(aM * 180 / Math.PI);
            if (aO < 0) {
                aO = 360 - Math.abs(aO)
            }
            return aO
        }
        function aq(aL, aK) {
            var aM = F(aL, aK);
            if ((aM <= 45) && (aM >= 0)) {
                return n
            } else {
                if ((aM <= 360) && (aM >= 315)) {
                    return n
                } else {
                    if ((aM >= 135) && (aM <= 225)) {
                        return m
                    } else {
                        if ((aM > 45) && (aM < 135)) {
                            return u
                        } else {
                            return c
                        }
                    }
                }
            }
        }
        function B() {
            var aK = new Date();
            return aK.getTime()
        }
        function at(aK) {
            aK = d(aK);
            var aM = aK.offset();
            var aL = {left: aM.left, right: aM.left + aK.outerWidth(), top: aM.top, bottom: aM.top + aK.outerHeight()};
            return aL
        }
        function az(aK, aL) {
            return(aK.x > aL.left && aK.x < aL.right && aK.y > aL.top && aK.y < aL.bottom)
        }}
}
)(jQuery);

/*
 *	jQuery carouFredSel 6.2.0
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return(c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--)
            r[e(c)] = k[c] || e(c);
        k = [function(e) {
                return r[e]
            }];
        e = function() {
            return'\\w+'
        };
        c = 1
    }
    ;
    while (c--)
        if (k[c])
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(D($){8($.1s.1v){H}$.1s.6i=$.1s.1v=D(u,w){8(1l.S==0){18(J,\'6j 55 6k 1j "\'+1l.4o+\'".\');H 1l}8(1l.S>1){H 1l.1W(D(){$(1l).1v(u,w)})}F y=1l,$12=1l[0],56=L;8(y.1q(\'57\')){56=y.1P(\'3o\',\'4p\');y.T(\'3o\',[\'4q\',J])}F z={};z.59=D(o,a,b){o=3S($12,o);o.E=6l($12,o.E);o.1K=6m($12,o.1K);o.N=6n($12,o.N);o.14=5a($12,o.14);o.16=5a($12,o.16);o.1b=6o($12,o.1b);o.1r=6p($12,o.1r);o.1Q=6q($12,o.1Q);8(a){31=$.1L(J,{},$.1s.1v.5b,o)}7=$.1L(J,{},$.1s.1v.5b,o);7.d=6r(7);A.2l=(7.2l==\'5c\'||7.2l==\'1m\')?\'16\':\'14\';F c=y.13(),2m=5d($1n,7,\'P\');8(3p(7.25)){7.25=\'7Q\'+G.3T}7.3U=5e(7,2m);7.E=6s(7.E,7,c,b);7[7.d[\'P\']]=6t(7[7.d[\'P\']],7,c);7[7.d[\'1e\']]=6u(7[7.d[\'1e\']],7,c);8(7.2H){8(!3V(7[7.d[\'P\']])){7[7.d[\'P\']]=\'2I%\'}}8(3V(7[7.d[\'P\']])){A.6v=J;A.4r=7[7.d[\'P\']];7[7.d[\'P\']]=4s(2m,A.4r);8(!7.E.M){7.E.U.1d=J}}8(7.2H){7.1R=L;7.1i=[0,0,0,0];7.1B=L;7.E.U.1d=L}O{8(!7.E.M){7=6w(7,2m)}8(!7[7.d[\'P\']]){8(!7.E.U.1d&&Y(7.E[7.d[\'P\']])&&7.E.1t==\'*\'){7[7.d[\'P\']]=7.E.M*7.E[7.d[\'P\']];7.1B=L}O{7[7.d[\'P\']]=\'1d\'}}8(1z(7.1B)){7.1B=(Y(7[7.d[\'P\']]))?\'5f\':L}8(7.E.U.1d){7.E.M=32(c,7,0)}}8(7.E.1t!=\'*\'&&!7.E.U.1d){7.E.U.4t=7.E.M;7.E.M=3W(c,7,0)}7.E.M=2x(7.E.M,7,7.E.U.2c,$12);7.E.U.20=7.E.M;8(7.2H){8(!7.E.U.34){7.E.U.34=7.E.M}8(!7.E.U.1X){7.E.U.1X=7.E.M}7=5g(7,c,2m)}O{7.1i=6x(7.1i);8(7.1B==\'3q\'){7.1B=\'1m\'}O 8(7.1B==\'5h\'){7.1B=\'35\'}1F(7.1B){R\'5f\':R\'1m\':R\'35\':8(7[7.d[\'P\']]!=\'1d\'){7=5i(7,c);7.1R=J}17;2J:7.1B=L;7.1R=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?L:J;17}}8(!Y(7.1K.1M)){7.1K.1M=6y}8(1z(7.1K.E)){7.1K.E=(7.2H||7.E.U.1d||7.E.1t!=\'*\')?\'M\':7.E.M}7.N=$.1L(J,{},7.1K,7.N);7.14=$.1L(J,{},7.1K,7.14);7.16=$.1L(J,{},7.1K,7.16);7.1b=$.1L(J,{},7.1K,7.1b);7.N=6z($12,7.N);7.14=5j($12,7.14);7.16=5j($12,7.16);7.1b=6A($12,7.1b);7.1r=6B($12,7.1r);7.1Q=6C($12,7.1Q);8(7.2n){7.2n=5k(7.2n)}8(7.N.5l){7.N.4u=7.N.5l;3X(\'N.5l\',\'N.4u\')}8(7.N.5m){7.N.4v=7.N.5m;3X(\'N.5m\',\'N.4v\')}8(7.N.5n){7.N.4w=7.N.5n;3X(\'N.5n\',\'N.4w\')}8(7.N.5o){7.N.2K=7.N.5o;3X(\'N.5o\',\'N.2K\')}};z.6D=D(){y.1q(\'57\',J);F a=y.13(),3Y=6E(y,[\'6F\',\'6G\',\'3r\',\'3q\',\'35\',\'5h\',\'1m\',\'3Z\',\'P\',\'1e\',\'6H\',\'1S\',\'5p\',\'6I\']),5q=\'7R\';1F(3Y.3r){R\'6J\':R\'7S\':5q=3Y.3r;17}8(G.3s==\'36\'){41($1n)}O{$1n.Z(3Y)}$1n.Z({\'7T\':\'3t\',\'3r\':5q});41(y);y.1q(\'6K\',3Y.3Z);y.Z({\'6F\':\'1m\',\'6G\':\'42\',\'3r\':\'6J\',\'3q\':0,\'35\':\'N\',\'5h\':\'N\',\'1m\':0,\'6H\':0,\'1S\':0,\'5p\':0,\'6I\':0});4x(a,7);41(a);8(7.2H){5r(7,a)}};z.6L=D(){z.5s();y.11(I(\'6M\',G),D(e,a){e.1g();8(!A.2d){8(7.N.W){7.N.W.3a(2y(\'4y\',G))}}A.2d=J;8(7.N.1G){7.N.1G=L;y.T(I(\'3b\',G),a)}H J});y.11(I(\'5t\',G),D(e){e.1g();8(A.26){43(V)}H J});y.11(I(\'3b\',G),D(e,a,b){e.1g();1u=3u(1u);8(a&&A.26){V.2d=J;F c=2o()-V.2L;V.1M-=c;8(V.4z){V.4z.1M-=c}8(V.4A){V.4A.1M-=c}43(V,L)}8(!A.27&&!A.26){8(b){1u.3v+=2o()-1u.2L}}8(!A.27){8(7.N.W){7.N.W.3a(2y(\'6N\',G))}}A.27=J;8(7.N.4v){F d=7.N.2K-1u.3v,3c=2I-1H.2z(d*2I/7.N.2K);7.N.4v.1h($12,3c,d)}H J});y.11(I(\'1G\',G),D(e,b,c,d){e.1g();1u=3u(1u);F v=[b,c,d],t=[\'2M\',\'28\',\'3d\'],a=3e(v,t);b=a[0];c=a[1];d=a[2];8(b!=\'14\'&&b!=\'16\'){b=A.2l}8(!Y(c)){c=0}8(!1k(d)){d=L}8(d){A.2d=L;7.N.1G=J}8(!7.N.1G){e.2e();H 18(G,\'3w 4y: 2p 3f.\')}8(A.27){8(7.N.W){7.N.W.2N(2y(\'4y\',G));7.N.W.2N(2y(\'6N\',G))}}A.27=L;1u.2L=2o();F f=7.N.2K+c;44=f-1u.3v;3c=2I-1H.2z(44*2I/f);8(7.N.1f){1u.1f=7U(D(){F a=2o()-1u.2L+1u.3v,3c=1H.2z(a*2I/f);7.N.1f.4B.1h(7.N.1f.2q[0],3c)},7.N.1f.5u)}1u.N=7V(D(){8(7.N.1f){7.N.1f.4B.1h(7.N.1f.2q[0],2I)}8(7.N.4w){7.N.4w.1h($12,3c,44)}8(A.26){y.T(I(\'1G\',G),b)}O{y.T(I(b,G),7.N)}},44);8(7.N.4u){7.N.4u.1h($12,3c,44)}H J});y.11(I(\'3g\',G),D(e){e.1g();8(V.2d){V.2d=L;A.27=L;A.26=J;V.2L=2o();3x(V,G)}O{y.T(I(\'1G\',G))}H J});y.11(I(\'14\',G)+\' \'+I(\'16\',G),D(e,b,f,g,h){e.1g();8(A.2d||y.2f(\':3t\')){e.2e();H 18(G,\'3w 4y 7W 3t: 2p 3f.\')}F i=(Y(7.E.4C))?7.E.4C:7.E.M+1;8(i>K.Q){e.2e();H 18(G,\'2p 6O E (\'+K.Q+\' Q, \'+i+\' 6P): 2p 3f.\')}F v=[b,f,g,h],t=[\'2A\',\'28/2M\',\'D\',\'3d\'],a=3e(v,t);b=a[0];f=a[1];g=a[2];h=a[3];F k=e.5v.19(G.3y.45.S);8(!1T(b)){b={}}8(1o(g)){b.3h=g}8(1k(h)){b.2O=h}b=$.1L(J,{},7[k],b);8(b.5w&&!b.5w.1h($12,k)){e.2e();H 18(G,\'7X "5w" 7Y L.\')}8(!Y(f)){8(7.E.1t!=\'*\'){f=\'M\'}O{F m=[f,b.E,7[k].E];1j(F a=0,l=m.S;a<l;a++){8(Y(m[a])||m[a]==\'6Q\'||m[a]==\'M\'){f=m[a];17}}}1F(f){R\'6Q\':e.2e();H y.1P(I(k+\'7Z\',G),[b,g]);17;R\'M\':8(!7.E.U.1d&&7.E.1t==\'*\'){f=7.E.M}17}}8(V.2d){y.T(I(\'3g\',G));y.T(I(\'2O\',G),[k,[b,f,g]]);e.2e();H 18(G,\'3w 80 3f.\')}8(b.1M>0){8(A.26){8(b.2O){8(b.2O==\'2P\'){2g=[]}8(b.2O!=\'X\'||2g.S==0){y.T(I(\'2O\',G),[k,[b,f,g]])}}e.2e();H 18(G,\'3w 81 3f.\')}}1u.3v=0;y.T(I(\'6R\'+k,G),[b,f]);8(7.2n){F s=7.2n,c=[b,f];1j(F j=0,l=s.S;j<l;j++){F d=k;8(!s[j][2]){d=(d==\'14\')?\'16\':\'14\'}8(!s[j][1]){c[0]=s[j][0].1P(\'3o\',[\'6S\',d])}c[1]=f+s[j][3];s[j][0].T(\'3o\',[\'6R\'+d,c])}}H J});y.11(I(\'82\',G),D(e,b,c){e.1g();F d=y.13();8(!7.1U){8(K.X==0){8(7.3z){y.T(I(\'16\',G),K.Q-1)}H e.2e()}}1Y(d,7);8(!Y(c)){8(7.E.U.1d){c=4D(d,7,K.Q-1)}O 8(7.E.1t!=\'*\'){F f=(Y(b.E))?b.E:5x(y,7);c=6T(d,7,K.Q-1,f)}O{c=7.E.M}c=4E(c,7,b.E,$12)}8(!7.1U){8(K.Q-c<K.X){c=K.Q-K.X}}7.E.U.20=7.E.M;8(7.E.U.1d){F g=2x(32(d,7,K.Q-c),7,7.E.U.2c,$12);8(7.E.M+c<=g&&c<K.Q){c++;g=2x(32(d,7,K.Q-c),7,7.E.U.2c,$12)}7.E.M=g}O 8(7.E.1t!=\'*\'){F g=3W(d,7,K.Q-c);7.E.M=2x(g,7,7.E.U.2c,$12)}1Y(d,7,J);8(c==0){e.2e();H 18(G,\'0 E 46 1K: 2p 3f.\')}18(G,\'6U \'+c+\' E 5y.\');K.X+=c;2h(K.X>=K.Q){K.X-=K.Q}8(!7.1U){8(K.X==0&&b.4F){b.4F.1h($12,\'14\')}8(!7.3z){3A(7,K.X,G)}}y.13().19(K.Q-c,K.Q).83(y);8(K.Q<7.E.M+c){y.13().19(0,(7.E.M+c)-K.Q).4G(J).47(y)}F d=y.13(),3i=6V(d,7,c),2i=6W(d,7),1Z=d.1N(c-1),21=3i.2P(),2r=2i.2P();1Y(d,7);F h=0,2B=0;8(7.1B){F p=4H(2i,7);h=p[0];2B=p[1]}F i=(h<0)?7.1i[7.d[3]]:0;F j=L,2Q=$();8(7.E.M<c){2Q=d.19(7.E.U.20,c);8(b.1V==\'6X\'){F k=7.E[7.d[\'P\']];j=2Q;1Z=2r;5z(j);7.E[7.d[\'P\']]=\'1d\'}}F l=L,3B=2R(d.19(0,c),7,\'P\'),2j=4I(4J(2i,7,J),7,!7.1R),3C=0,29={},4K={},2s={},2S={},4L={},2T={},5A={},2U=5B(b,7,c,3B);1F(b.1V){R\'1I\':R\'1I-1w\':3C=2R(d.19(0,7.E.M),7,\'P\');17}8(j){7.E[7.d[\'P\']]=k}1Y(d,7,J);8(2B>=0){1Y(21,7,7.1i[7.d[1]])}8(h>=0){1Y(1Z,7,7.1i[7.d[3]])}8(7.1B){7.1i[7.d[1]]=2B;7.1i[7.d[3]]=h}2T[7.d[\'1m\']]=-(3B-i);5A[7.d[\'1m\']]=-(3C-i);4K[7.d[\'1m\']]=2j[7.d[\'P\']];F m=D(){},1O=D(){},1C=D(){},3D=D(){},2C=D(){},5C=D(){},1D=D(){},3E=D(){},1x=D(){},1y=D(){},1J=D(){};1F(b.1V){R\'3j\':R\'1I\':R\'1I-1w\':R\'22\':R\'22-1w\':l=y.4G(J).47($1n);17}1F(b.1V){R\'3j\':R\'22\':R\'22-1w\':l.13().19(0,c).2t();l.13().19(7.E.U.20).2t();17;R\'1I\':R\'1I-1w\':l.13().19(7.E.M).2t();l.Z(5A);17}y.Z(2T);V=48(2U,b.2u,G);29[7.d[\'1m\']]=(7.1R)?7.1i[7.d[3]]:0;8(7[7.d[\'P\']]==\'1d\'||7[7.d[\'1e\']]==\'1d\'){m=D(){$1n.Z(2j)};1O=D(){V.1a.1c([$1n,2j])}}8(7.1R){8(2r.4M(1Z).S){2s[7.d[\'1S\']]=1Z.1q(\'2a\');8(h<0){1Z.Z(2s)}O{1D=D(){1Z.Z(2s)};3E=D(){V.1a.1c([1Z,2s])}}}1F(b.1V){R\'1I\':R\'1I-1w\':l.13().1N(c-1).Z(2s);17}8(2r.4M(21).S){2S[7.d[\'1S\']]=21.1q(\'2a\');1C=D(){21.Z(2S)};3D=D(){V.1a.1c([21,2S])}}8(2B>=0){4L[7.d[\'1S\']]=2r.1q(\'2a\')+7.1i[7.d[1]];2C=D(){2r.Z(4L)};5C=D(){V.1a.1c([2r,4L])}}}1J=D(){y.Z(29)};F n=7.E.M+c-K.Q;1y=D(){8(n>0){y.13().19(K.Q).2t();3i=$(y.13().19(K.Q-(7.E.M-n)).3F().6Y(y.13().19(0,n).3F()))}5D(j);8(7.1R){F a=y.13().1N(7.E.M+c-1);a.Z(7.d[\'1S\'],a.1q(\'2a\'))}};F o=5E(3i,2Q,2i,c,\'14\',2U,2j);1x=D(){5F(y,l,b);A.26=L;2b.3h=4a($12,b,\'3h\',o,2b);2g=5G(y,2g,G);8(!A.27){y.T(I(\'1G\',G))}};A.26=J;1u=3u(1u);2b.3G=4a($12,b,\'3G\',o,2b);1F(b.1V){R\'42\':y.Z(29);m();1C();2C();1D();1J();1y();1x();17;R\'1w\':V.1a.1c([y,{\'1E\':0},D(){m();1C();2C();1D();1J();1y();V=48(2U,b.2u,G);V.1a.1c([y,{\'1E\':1},1x]);3x(V,G)}]);17;R\'3j\':y.Z({\'1E\':0});V.1a.1c([l,{\'1E\':0}]);V.1a.1c([y,{\'1E\':1},1x]);1O();1C();2C();1D();1J();1y();17;R\'1I\':V.1a.1c([l,29,D(){1C();2C();1D();1J();1y();1x()}]);1O();17;R\'1I-1w\':V.1a.1c([y,{\'1E\':0}]);V.1a.1c([l,29,D(){y.Z({\'1E\':1});1C();2C();1D();1J();1y();1x()}]);1O();17;R\'22\':V.1a.1c([l,4K,1x]);1O();1C();2C();1D();1J();1y();17;R\'22-1w\':y.Z({\'1E\':0});V.1a.1c([y,{\'1E\':1}]);V.1a.1c([l,4K,1x]);1O();1C();2C();1D();1J();1y();17;2J:V.1a.1c([y,29,D(){1y();1x()}]);1O();3D();5C();3E();17}3x(V,G);5H(7.25,y,G);y.T(I(\'3H\',G),[L,2j]);H J});y.11(I(\'84\',G),D(e,c,d){e.1g();F f=y.13();8(!7.1U){8(K.X==7.E.M){8(7.3z){y.T(I(\'14\',G),K.Q-1)}H e.2e()}}1Y(f,7);8(!Y(d)){8(7.E.1t!=\'*\'){F g=(Y(c.E))?c.E:5x(y,7);d=6Z(f,7,0,g)}O{d=7.E.M}d=4E(d,7,c.E,$12)}F h=(K.X==0)?K.Q:K.X;8(!7.1U){8(7.E.U.1d){F i=32(f,7,d),g=4D(f,7,h-1)}O{F i=7.E.M,g=7.E.M}8(d+i>h){d=h-g}}7.E.U.20=7.E.M;8(7.E.U.1d){F i=2x(5I(f,7,d,h),7,7.E.U.2c,$12);2h(7.E.M-d>=i&&d<K.Q){d++;i=2x(5I(f,7,d,h),7,7.E.U.2c,$12)}7.E.M=i}O 8(7.E.1t!=\'*\'){F i=3W(f,7,d);7.E.M=2x(i,7,7.E.U.2c,$12)}1Y(f,7,J);8(d==0){e.2e();H 18(G,\'0 E 46 1K: 2p 3f.\')}18(G,\'6U \'+d+\' E 70.\');K.X-=d;2h(K.X<0){K.X+=K.Q}8(!7.1U){8(K.X==7.E.M&&c.4F){c.4F.1h($12,\'16\')}8(!7.3z){3A(7,K.X,G)}}8(K.Q<7.E.M+d){y.13().19(0,(7.E.M+d)-K.Q).4G(J).47(y)}F f=y.13(),3i=71(f,7),2i=72(f,7,d),1Z=f.1N(d-1),21=3i.2P(),2r=2i.2P();1Y(f,7);F j=0,2B=0;8(7.1B){F p=4H(2i,7);j=p[0];2B=p[1]}F k=L,2Q=$();8(7.E.U.20<d){2Q=f.19(7.E.U.20,d);8(c.1V==\'6X\'){F l=7.E[7.d[\'P\']];k=2Q;1Z=21;5z(k);7.E[7.d[\'P\']]=\'1d\'}}F m=L,3B=2R(f.19(0,d),7,\'P\'),2j=4I(4J(2i,7,J),7,!7.1R),3C=0,29={},4N={},2s={},2S={},2T={},2U=5B(c,7,d,3B);1F(c.1V){R\'22\':R\'22-1w\':3C=2R(f.19(0,7.E.U.20),7,\'P\');17}8(k){7.E[7.d[\'P\']]=l}8(7.1B){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}1Y(f,7,J);1Y(21,7,7.1i[7.d[1]]);8(7.1B){7.1i[7.d[1]]=2B;7.1i[7.d[3]]=j}2T[7.d[\'1m\']]=(7.1R)?7.1i[7.d[3]]:0;F n=D(){},1O=D(){},1C=D(){},3D=D(){},1D=D(){},3E=D(){},1x=D(){},1y=D(){},1J=D(){};1F(c.1V){R\'3j\':R\'1I\':R\'1I-1w\':R\'22\':R\'22-1w\':m=y.4G(J).47($1n);m.13().19(7.E.U.20).2t();17}1F(c.1V){R\'3j\':R\'1I\':R\'1I-1w\':y.Z(\'3Z\',1);m.Z(\'3Z\',0);17}V=48(2U,c.2u,G);29[7.d[\'1m\']]=-3B;4N[7.d[\'1m\']]=-3C;8(j<0){29[7.d[\'1m\']]+=j}8(7[7.d[\'P\']]==\'1d\'||7[7.d[\'1e\']]==\'1d\'){n=D(){$1n.Z(2j)};1O=D(){V.1a.1c([$1n,2j])}}8(7.1R){F o=2r.1q(\'2a\');8(2B>=0){o+=7.1i[7.d[1]]}2r.Z(7.d[\'1S\'],o);8(1Z.4M(21).S){2S[7.d[\'1S\']]=21.1q(\'2a\')}1C=D(){21.Z(2S)};3D=D(){V.1a.1c([21,2S])};F q=1Z.1q(\'2a\');8(j>0){q+=7.1i[7.d[3]]}2s[7.d[\'1S\']]=q;1D=D(){1Z.Z(2s)};3E=D(){V.1a.1c([1Z,2s])}}1J=D(){y.Z(2T)};F r=7.E.M+d-K.Q;1y=D(){8(r>0){y.13().19(K.Q).2t()}F a=y.13().19(0,d).47(y).2P();8(r>0){2i=3I(f,7)}5D(k);8(7.1R){8(K.Q<7.E.M+d){F b=y.13().1N(7.E.M-1);b.Z(7.d[\'1S\'],b.1q(\'2a\')+7.1i[7.d[1]])}a.Z(7.d[\'1S\'],a.1q(\'2a\'))}};F s=5E(3i,2Q,2i,d,\'16\',2U,2j);1x=D(){y.Z(\'3Z\',y.1q(\'6K\'));5F(y,m,c);A.26=L;2b.3h=4a($12,c,\'3h\',s,2b);2g=5G(y,2g,G);8(!A.27){y.T(I(\'1G\',G))}};A.26=J;1u=3u(1u);2b.3G=4a($12,c,\'3G\',s,2b);1F(c.1V){R\'42\':y.Z(29);n();1C();1D();1J();1y();1x();17;R\'1w\':V.1a.1c([y,{\'1E\':0},D(){n();1C();1D();1J();1y();V=48(2U,c.2u,G);V.1a.1c([y,{\'1E\':1},1x]);3x(V,G)}]);17;R\'3j\':y.Z({\'1E\':0});V.1a.1c([m,{\'1E\':0}]);V.1a.1c([y,{\'1E\':1},1x]);1O();1C();1D();1J();1y();17;R\'1I\':y.Z(7.d[\'1m\'],$1n[7.d[\'P\']]());V.1a.1c([y,2T,1x]);1O();1C();1D();1y();17;R\'1I-1w\':y.Z(7.d[\'1m\'],$1n[7.d[\'P\']]());V.1a.1c([m,{\'1E\':0}]);V.1a.1c([y,2T,1x]);1O();1C();1D();1y();17;R\'22\':V.1a.1c([m,4N,1x]);1O();1C();1D();1J();1y();17;R\'22-1w\':y.Z({\'1E\':0});V.1a.1c([y,{\'1E\':1}]);V.1a.1c([m,4N,1x]);1O();1C();1D();1J();1y();17;2J:V.1a.1c([y,29,D(){1J();1y();1x()}]);1O();3D();3E();17}3x(V,G);5H(7.25,y,G);y.T(I(\'3H\',G),[L,2j]);H J});y.11(I(\'3k\',G),D(e,b,c,d,f,g,h){e.1g();F v=[b,c,d,f,g,h],t=[\'2M/28/2A\',\'28\',\'3d\',\'2A\',\'2M\',\'D\'],a=3e(v,t);f=a[3];g=a[4];h=a[5];b=3J(a[0],a[1],a[2],K,y);8(b==0){H L}8(!1T(f)){f=L}8(g!=\'14\'&&g!=\'16\'){8(7.1U){g=(b<=K.Q/2)?\'16\':\'14\'}O{g=(K.X==0||K.X>b)?\'16\':\'14\'}}8(g==\'14\'){b=K.Q-b}y.T(I(g,G),[f,b,h]);H J});y.11(I(\'85\',G),D(e,a,b){e.1g();F c=y.1P(I(\'4b\',G));H y.1P(I(\'5J\',G),[c-1,a,\'14\',b])});y.11(I(\'86\',G),D(e,a,b){e.1g();F c=y.1P(I(\'4b\',G));H y.1P(I(\'5J\',G),[c+1,a,\'16\',b])});y.11(I(\'5J\',G),D(e,a,b,c,d){e.1g();8(!Y(a)){a=y.1P(I(\'4b\',G))}F f=7.1b.E||7.E.M,1X=1H.2z(K.Q/f)-1;8(a<0){a=1X}8(a>1X){a=0}H y.1P(I(\'3k\',G),[a*f,0,J,b,c,d])});y.11(I(\'73\',G),D(e,s){e.1g();8(s){s=3J(s,0,J,K,y)}O{s=0}s+=K.X;8(s!=0){8(K.Q>0){2h(s>K.Q){s-=K.Q}}y.87(y.13().19(s,K.Q))}H J});y.11(I(\'2n\',G),D(e,s){e.1g();8(s){s=5k(s)}O 8(7.2n){s=7.2n}O{H 18(G,\'6j 88 46 2n.\')}F n=y.1P(I(\'4p\',G)),x=J;1j(F j=0,l=s.S;j<l;j++){8(!s[j][0].1P(I(\'3k\',G),[n,s[j][3],J])){x=L}}H x});y.11(I(\'2O\',G),D(e,a,b){e.1g();8(1o(a)){a.1h($12,2g)}O 8(2V(a)){2g=a}O 8(!1z(a)){2g.1c([a,b])}H 2g});y.11(I(\'89\',G),D(e,b,c,d,f){e.1g();F v=[b,c,d,f],t=[\'2M/2A\',\'2M/28/2A\',\'3d\',\'28\'],a=3e(v,t);b=a[0];c=a[1];d=a[2];f=a[3];8(1T(b)&&!2v(b)){b=$(b)}O 8(1p(b)){b=$(b)}8(!2v(b)||b.S==0){H 18(G,\'2p a 5K 2A.\')}8(1z(c)){c=\'4c\'}4x(b,7);41(b);F g=c,4d=\'4d\';8(c==\'4c\'){8(d){8(K.X==0){c=K.Q-1;4d=\'74\'}O{c=K.X;K.X+=b.S}8(c<0){c=0}}O{c=K.Q-1;4d=\'74\'}}O{c=3J(c,f,d,K,y)}F h=y.13().1N(c);8(h.S){h[4d](b)}O{18(G,\'8a 8b-3r 4M 6k! 8c 8d 46 75 4c.\');y.76(b)}8(g!=\'4c\'&&!d){8(c<K.X){K.X+=b.S}}K.Q=y.13().S;8(K.X>=K.Q){K.X-=K.Q}y.T(I(\'4O\',G));y.T(I(\'5L\',G));H J});y.11(I(\'77\',G),D(e,c,d,f){e.1g();F v=[c,d,f],t=[\'2M/28/2A\',\'3d\',\'28\'],a=3e(v,t);c=a[0];d=a[1];f=a[2];F g=L;8(c 2W $&&c.S>1){h=$();c.1W(D(i,a){F b=y.T(I(\'77\',G),[$(1l),d,f]);8(b){h=h.8e(b)}});H h}8(1z(c)||c==\'4c\'){h=y.13().2P()}O{c=3J(c,f,d,K,y);F h=y.13().1N(c);8(h.S){8(c<K.X){K.X-=h.S}}}8(h&&h.S){h.8f();K.Q=y.13().S;y.T(I(\'4O\',G))}H h});y.11(I(\'3G\',G)+\' \'+I(\'3h\',G),D(e,a){e.1g();F b=e.5v.19(G.3y.45.S);8(2V(a)){2b[b]=a}8(1o(a)){2b[b].1c(a)}H 2b[b]});y.11(I(\'4p\',G),D(e,a){e.1g();8(K.X==0){F b=0}O{F b=K.Q-K.X}8(1o(a)){a.1h($12,b)}H b});y.11(I(\'4b\',G),D(e,a){e.1g();F b=7.1b.E||7.E.M,1X=1H.2z(K.Q/b-1),2k;8(K.X==0){2k=0}O 8(K.X<K.Q%b){2k=0}O 8(K.X==b&&!7.1U){2k=1X}O{2k=1H.78((K.Q-K.X)/b)}8(2k<0){2k=0}8(2k>1X){2k=1X}8(1o(a)){a.1h($12,2k)}H 2k});y.11(I(\'8g\',G),D(e,a){e.1g();F b=3I(y.13(),7);8(1o(a)){a.1h($12,b)}H b});y.11(I(\'19\',G),D(e,f,l,b){e.1g();8(K.Q==0){H L}F v=[f,l,b],t=[\'28\',\'28\',\'D\'],a=3e(v,t);f=(Y(a[0]))?a[0]:0;l=(Y(a[1]))?a[1]:K.Q;b=a[2];f+=K.X;l+=K.X;8(E.Q>0){2h(f>K.Q){f-=K.Q}2h(l>K.Q){l-=K.Q}2h(f<0){f+=K.Q}2h(l<0){l+=K.Q}}F c=y.13(),$i;8(l>f){$i=c.19(f,l)}O{$i=$(c.19(f,K.Q).3F().6Y(c.19(0,l).3F()))}8(1o(b)){b.1h($12,$i)}H $i});y.11(I(\'27\',G)+\' \'+I(\'2d\',G)+\' \'+I(\'26\',G),D(e,a){e.1g();F b=e.5v.19(G.3y.45.S),5M=A[b];8(1o(a)){a.1h($12,5M)}H 5M});y.11(I(\'6S\',G),D(e,a,b,c){e.1g();F d=L;8(1o(a)){a.1h($12,7)}O 8(1T(a)){31=$.1L(J,{},31,a);8(b!==L)d=J;O 7=$.1L(J,{},7,a)}O 8(!1z(a)){8(1o(b)){F f=4P(\'7.\'+a);8(1z(f)){f=\'\'}b.1h($12,f)}O 8(!1z(b)){8(2X c!==\'3d\')c=J;4P(\'31.\'+a+\' = b\');8(c!==L)d=J;O 4P(\'7.\'+a+\' = b\')}O{H 4P(\'7.\'+a)}}8(d){1Y(y.13(),7);z.59(31);z.5N();F g=4Q(y,7);y.T(I(\'3H\',G),[J,g])}H 7});y.11(I(\'5L\',G),D(e,a,b){e.1g();8(1z(a)){a=$(\'8h\')}O 8(1p(a)){a=$(a)}8(!2v(a)||a.S==0){H 18(G,\'2p a 5K 2A.\')}8(!1p(b)){b=\'a.6i\'}a.8i(b).1W(D(){F h=1l.79||\'\';8(h.S>0&&y.13().7a($(h))!=-1){$(1l).23(\'5O\').5O(D(e){e.2D();y.T(I(\'3k\',G),h)})}});H J});y.11(I(\'3H\',G),D(e,b,c){e.1g();8(!7.1b.1A){H}F d=7.1b.E||7.E.M,4R=1H.2z(K.Q/d);8(b){8(7.1b.3K){7.1b.1A.13().2t();7.1b.1A.1W(D(){1j(F a=0;a<4R;a++){F i=y.13().1N(3J(a*d,0,J,K,y));$(1l).76(7.1b.3K.1h(i[0],a+1))}})}7.1b.1A.1W(D(){$(1l).13().23(7.1b.3L).1W(D(a){$(1l).11(7.1b.3L,D(e){e.2D();y.T(I(\'3k\',G),[a*d,-7.1b.4S,J,7.1b])})})})}F f=y.1P(I(\'4b\',G))+7.1b.4S;8(f>=4R){f=0}8(f<0){f=4R-1}7.1b.1A.1W(D(){$(1l).13().2N(2y(\'7b\',G)).1N(f).3a(2y(\'7b\',G))});H J});y.11(I(\'4O\',G),D(e){F a=7.E.M,2E=y.13(),2m=5d($1n,7,\'P\');K.Q=2E.S;8(A.4r){7.3U=2m;7[7.d[\'P\']]=4s(2m,A.4r)}O{7.3U=5e(7,2m)}8(7.2H){7.E.P=7.E.3M.P;7.E.1e=7.E.3M.1e;7=5g(7,2E,2m);a=7.E.M;5r(7,2E)}O 8(7.E.U.1d){a=32(2E,7,0)}O 8(7.E.1t!=\'*\'){a=3W(2E,7,0)}8(!7.1U&&K.X!=0&&a>K.X){8(7.E.U.1d){F b=4D(2E,7,K.X)-K.X}O 8(7.E.1t!=\'*\'){F b=7c(2E,7,K.X)-K.X}O{F b=7.E.M-K.X}18(G,\'8j 8k-1U: 8l \'+b+\' E 5y.\');y.T(I(\'14\',G),b)}7.E.M=2x(a,7,7.E.U.2c,$12);7.E.U.20=7.E.M;7=5i(7,2E);F c=4Q(y,7);y.T(I(\'3H\',G),[J,c]);4T(7,K.Q,G);3A(7,K.X,G);H c});y.11(I(\'4q\',G),D(e,a){e.1g();1u=3u(1u);y.1q(\'57\',L);y.T(I(\'5t\',G));8(a){y.T(I(\'73\',G))}4U(y.13());4U(y);z.5s();z.5P();8(G.3s==\'36\'){4U($1n)}O{$1n.8m(y)}H J});y.11(I(\'18\',G),D(e){18(G,\'3w P: \'+7.P);18(G,\'3w 1e: \'+7.1e);18(G,\'7d 8n: \'+7.E.P);18(G,\'7d 8o: \'+7.E.1e);18(G,\'4e 4f E M: \'+7.E.M);8(7.N.1G){18(G,\'4e 4f E 5Q 8p: \'+7.N.E)}8(7.14.W){18(G,\'4e 4f E 5Q 5y: \'+7.14.E)}8(7.16.W){18(G,\'4e 4f E 5Q 70: \'+7.16.E)}H G.18});y.11(\'3o\',D(e,n,o){e.1g();H y.1P(I(n,G),o)})};z.5s=D(){y.23(I(\'\',G));y.23(I(\'\',G,L));y.23(\'3o\')};z.5N=D(){z.5P();4T(7,K.Q,G);3A(7,K.X,G);8(7.N.2F){F b=3N(7.N.2F);$1n.11(I(\'4V\',G,L),D(){y.T(I(\'3b\',G),b)}).11(I(\'4W\',G,L),D(){y.T(I(\'3g\',G))})}8(7.N.W){7.N.W.11(I(7.N.3L,G,L),D(e){e.2D();F a=L,b=3O;8(A.27){a=\'1G\'}O 8(7.N.4X){a=\'3b\';b=3N(7.N.4X)}8(a){y.T(I(a,G),b)}})}8(7.14.W){7.14.W.11(I(7.14.3L,G,L),D(e){e.2D();y.T(I(\'14\',G))});8(7.14.2F){F b=3N(7.14.2F);7.14.W.11(I(\'4V\',G,L),D(){y.T(I(\'3b\',G),b)}).11(I(\'4W\',G,L),D(){y.T(I(\'3g\',G))})}}8(7.16.W){7.16.W.11(I(7.16.3L,G,L),D(e){e.2D();y.T(I(\'16\',G))});8(7.16.2F){F b=3N(7.16.2F);7.16.W.11(I(\'4V\',G,L),D(){y.T(I(\'3b\',G),b)}).11(I(\'4W\',G,L),D(){y.T(I(\'3g\',G))})}}8(7.1b.1A){8(7.1b.2F){F b=3N(7.1b.2F);7.1b.1A.11(I(\'4V\',G,L),D(){y.T(I(\'3b\',G),b)}).11(I(\'4W\',G,L),D(){y.T(I(\'3g\',G))})}}8(7.14.2Y||7.16.2Y){$(4g).11(I(\'7e\',G,L,J,J),D(e){F k=e.7f;8(k==7.16.2Y){e.2D();y.T(I(\'16\',G))}8(k==7.14.2Y){e.2D();y.T(I(\'14\',G))}})}8(7.1b.4Y){$(4g).11(I(\'7e\',G,L,J,J),D(e){F k=e.7f;8(k>=49&&k<58){k=(k-49)*7.E.M;8(k<=K.Q){e.2D();y.T(I(\'3k\',G),[k,0,J,7.1b])}}})}8($.1s.1r){F c=\'8q\'8r 3l;8((c&&7.1r.4h)||(!c&&7.1r.5R)){F d=$.1L(J,{},7.14,7.1r),7g=$.1L(J,{},7.16,7.1r),5S=D(){y.T(I(\'14\',G),[d])},5T=D(){y.T(I(\'16\',G),[7g])};1F(7.2l){R\'5c\':R\'7h\':7.1r.2G.8s=5T;7.1r.2G.8t=5S;17;2J:7.1r.2G.8u=5T;7.1r.2G.8v=5S}8(A.1r){y.1r(\'4q\')}$1n.1r(7.1r.2G);$1n.Z(\'7i\',\'8w\');A.1r=J}}8($.1s.1Q){8(7.1Q){F f=$.1L(J,{},7.14,7.1Q),7j=$.1L(J,{},7.16,7.1Q);8(A.1Q){$1n.23(I(\'1Q\',G,L))}$1n.11(I(\'1Q\',G,L),D(e,a){e.2D();8(a>0){y.T(I(\'14\',G),[f])}O{y.T(I(\'16\',G),[7j])}});A.1Q=J}}8(7.N.1G){y.T(I(\'1G\',G),7.N.5U)}8(A.6v){F g=D(e){y.T(I(\'5t\',G));8(7.N.5V&&!A.27){y.T(I(\'1G\',G))}1Y(y.13(),7);y.T(I(\'4O\',G))};F h=$(3l),4i=3O;8($.5W&&G.5X==\'5W\'){4i=$.5W(8x,g)}O 8($.4Z&&G.5X==\'4Z\'){4i=$.4Z(8y,g)}O{F i=0,5Y=0;4i=D(){F a=h.P(),5Z=h.1e();8(a!=i||5Z!=5Y){g();i=a;5Y=5Z}}}h.11(I(\'8z\',G,L,J,J),4i)}};z.5P=D(){F a=I(\'\',G),3P=I(\'\',G,L);61=I(\'\',G,L,J,J);$(4g).23(61);$(3l).23(61);$1n.23(3P);8(7.N.W){7.N.W.23(3P)}8(7.14.W){7.14.W.23(3P)}8(7.16.W){7.16.W.23(3P)}8(7.1b.1A){7.1b.1A.23(3P);8(7.1b.3K){7.1b.1A.13().2t()}}8(A.1r){y.1r(\'4q\');$1n.Z(\'7i\',\'2J\');A.1r=L}8(A.1Q){A.1Q=L}4T(7,\'4j\',G);3A(7,\'2N\',G)};8(1k(w)){w={\'18\':w}}F A={\'2l\':\'16\',\'27\':J,\'26\':L,\'2d\':L,\'1Q\':L,\'1r\':L},K={\'Q\':y.13().S,\'X\':0},1u={\'N\':3O,\'1f\':3O,\'2L\':2o(),\'3v\':0},V={\'2d\':L,\'1M\':0,\'2L\':0,\'2u\':\'\',\'1a\':[]},2b={\'3G\':[],\'3h\':[]},2g=[],G=$.1L(J,{},$.1s.1v.7k,w),7={},31=$.1L(J,{},u),$1n=(G.3s==\'36\')?y.36():y.8A(\'<\'+G.3s.55+\' 8B="\'+G.3s.7l+\'" />\').36();G.4o=y.4o;G.3T=$.1s.1v.3T++;G.2Z=(G.2Z&&$.1s.2Z)?\'2Z\':\'8C\';z.59(31,J,56);z.6D();z.6L();z.5N();8(2V(7.E.3m)){F B=7.E.3m}O{F B=[];8(7.E.3m!=0){B.1c(7.E.3m)}}8(7.25){B.8D(4k(7m(7.25),10))}8(B.S>0){1j(F a=0,l=B.S;a<l;a++){F s=B[a];8(s==0){62}8(s===J){s=3l.8E.79;8(s.S<1){62}}O 8(s===\'7n\'){s=1H.4l(1H.7n()*K.Q)}8(y.1P(I(\'3k\',G),[s,0,J,{1V:\'42\'}])){17}}}F C=4Q(y,7),7o=3I(y.13(),7);8(7.7p){7.7p.1h($12,{\'P\':C.P,\'1e\':C.1e,\'E\':7o})}y.T(I(\'3H\',G),[J,C]);y.T(I(\'5L\',G));8(G.18){y.T(I(\'18\',G))}H y};$.1s.1v.3T=1;$.1s.1v.5b={\'2n\':L,\'3z\':J,\'1U\':J,\'2H\':L,\'2l\':\'1m\',\'E\':{\'3m\':0},\'1K\':{\'2u\':\'7q\',\'1M\':6y,\'2F\':L,\'3L\':\'5O\',\'2O\':L}};$.1s.1v.7k={\'18\':L,\'2Z\':L,\'5X\':\'4Z\',\'3y\':{\'45\':\'\',\'7r\':\'8F\'},\'3s\':{\'55\':\'8G\',\'7l\':\'8H\'},\'63\':{}};$.1s.1v.7s=D(a){H\'<a 8I="#"><7t>\'+a+\'</7t></a>\'};$.1s.1v.7u=D(a){$(1l).Z(\'P\',a+\'%\')};$.1s.1v.25={3F:D(n){n+=\'=\';F b=4g.25.3Q(\';\');1j(F a=0,l=b.S;a<l;a++){F c=b[a];2h(c.8J(0)==\' \'){c=c.19(1)}8(c.3R(n)==0){H c.19(n.S)}}H 0},64:D(n,v,d){F e="";8(d){F a=7v 7w();a.8K(a.2o()+(d*24*60*60*8L));e="; 8M="+a.8N()}4g.25=n+\'=\'+v+e+\'; 8O=/\'},2t:D(n){$.1s.1v.25.64(n,"",-1)}};D 48(d,e,c){8(c.2Z==\'2Z\'){8(e==\'7q\'){e=\'8P\'}}H{1a:[],1M:d,8Q:d,2u:e,2L:2o()}}D 3x(s,c){1j(F a=0,l=s.1a.S;a<l;a++){F b=s.1a[a];8(!b){62}b[0][c.2Z](b[1],s.1M,s.2u,b[2])}}D 43(s,c){8(!1k(c)){c=J}8(1T(s.4z)){43(s.4z,c)}1j(F a=0,l=s.1a.S;a<l;a++){F b=s.1a[a];b[0].6M(J);8(c){b[0].Z(b[1]);8(1o(b[2])){b[2]()}}}8(1T(s.4A)){43(s.4A,c)}}D 5F(a,b,o){8(b){b.2t()}1F(o.1V){R\'1w\':R\'3j\':R\'1I-1w\':R\'22-1w\':a.Z(\'1t\',\'\');a.Z(\'1E\',1);17}}D 4a(d,o,b,a,c){8(o[b]){o[b].1h(d,a)}8(c[b].S){1j(F i=0,l=c[b].S;i<l;i++){c[b][i].1h(d,a)}}H[]}D 5G(a,q,c){8(q.S){a.T(I(q[0][0],c),q[0][1]);q.8R()}H q}D 5z(b){b.1W(D(){F a=$(1l);a.1q(\'7x\',a.2f(\':3t\')).4j()})}D 5D(b){8(b){b.1W(D(){F a=$(1l);8(!a.1q(\'7x\')){a.4m()}})}}D 3u(t){8(t.N){8S(t.N)}8(t.1f){8T(t.1f)}H t}D 5E(a,b,c,d,e,f,g){H{\'P\':g.P,\'1e\':g.1e,\'E\':{\'20\':a,\'8U\':b,\'M\':c},\'1K\':{\'E\':d,\'2l\':e,\'1M\':f}}}D 5B(a,o,b,c){F d=a.1M;8(a.1V==\'42\'){H 0}8(d==\'N\'){d=o.1K.1M/o.1K.E*b}O 8(d<10){d=c/d}8(d<1){H 0}8(a.1V==\'1w\'){d=d/2}H 1H.78(d)}D 4T(o,t,c){F a=(Y(o.E.4C))?o.E.4C:o.E.M+1;8(t==\'4m\'||t==\'4j\'){F f=t}O 8(a>t){18(c,\'2p 6O E (\'+t+\' Q, \'+a+\' 6P): 8V 8W.\');F f=\'4j\'}O{F f=\'4m\'}F s=(f==\'4m\')?\'2N\':\'3a\',h=2y(\'3t\',c);8(o.N.W){o.N.W[f]()[s](h)}8(o.14.W){o.14.W[f]()[s](h)}8(o.16.W){o.16.W[f]()[s](h)}8(o.1b.1A){o.1b.1A[f]()[s](h)}}D 3A(o,f,c){8(o.1U||o.3z)H;F a=(f==\'2N\'||f==\'3a\')?f:L,51=2y(\'8X\',c);8(o.N.W&&a){o.N.W[a](51)}8(o.14.W){F b=a||(f==0)?\'3a\':\'2N\';o.14.W[b](51)}8(o.16.W){F b=a||(f==o.E.M)?\'3a\':\'2N\';o.16.W[b](51)}}D 3S(a,b){8(1o(b)){b=b.1h(a)}O 8(1z(b)){b={}}H b}D 6l(a,b){b=3S(a,b);8(Y(b)){b={\'M\':b}}O 8(b==\'1d\'){b={\'M\':b,\'P\':b,\'1e\':b}}O 8(!1T(b)){b={}}H b}D 6m(a,b){b=3S(a,b);8(Y(b)){8(b<=50){b={\'E\':b}}O{b={\'1M\':b}}}O 8(1p(b)){b={\'2u\':b}}O 8(!1T(b)){b={}}H b}D 52(a,b){b=3S(a,b);8(1p(b)){F c=65(b);8(c==-1){b=$(b)}O{b=c}}H b}D 6n(a,b){b=52(a,b);8(2v(b)){b={\'W\':b}}O 8(1k(b)){b={\'1G\':b}}O 8(Y(b)){b={\'2K\':b}}8(b.1f){8(1p(b.1f)||2v(b.1f)){b.1f={\'2q\':b.1f}}}H b}D 6z(a,b){8(1o(b.W)){b.W=b.W.1h(a)}8(1p(b.W)){b.W=$(b.W)}8(!1k(b.1G)){b.1G=J}8(!Y(b.5U)){b.5U=0}8(1z(b.4X)){b.4X=J}8(!1k(b.5V)){b.5V=J}8(!Y(b.2K)){b.2K=(b.1M<10)?8Y:b.1M*5}8(b.1f){8(1o(b.1f.2q)){b.1f.2q=b.1f.2q.1h(a)}8(1p(b.1f.2q)){b.1f.2q=$(b.1f.2q)}8(b.1f.2q){8(!1o(b.1f.4B)){b.1f.4B=$.1s.1v.7u}8(!Y(b.1f.5u)){b.1f.5u=50}}O{b.1f=L}}H b}D 5a(a,b){b=52(a,b);8(2v(b)){b={\'W\':b}}O 8(Y(b)){b={\'2Y\':b}}H b}D 5j(a,b){8(1o(b.W)){b.W=b.W.1h(a)}8(1p(b.W)){b.W=$(b.W)}8(1p(b.2Y)){b.2Y=65(b.2Y)}H b}D 6o(a,b){b=52(a,b);8(2v(b)){b={\'1A\':b}}O 8(1k(b)){b={\'4Y\':b}}H b}D 6A(a,b){8(1o(b.1A)){b.1A=b.1A.1h(a)}8(1p(b.1A)){b.1A=$(b.1A)}8(!Y(b.E)){b.E=L}8(!1k(b.4Y)){b.4Y=L}8(!1o(b.3K)&&!53(b.3K)){b.3K=$.1s.1v.7s}8(!Y(b.4S)){b.4S=0}H b}D 6p(a,b){8(1o(b)){b=b.1h(a)}8(1z(b)){b={\'4h\':L}}8(3p(b)){b={\'4h\':b}}O 8(Y(b)){b={\'E\':b}}H b}D 6B(a,b){8(!1k(b.4h)){b.4h=J}8(!1k(b.5R)){b.5R=L}8(!1T(b.2G)){b.2G={}}8(!1k(b.2G.7y)){b.2G.7y=L}H b}D 6q(a,b){8(1o(b)){b=b.1h(a)}8(3p(b)){b={}}O 8(Y(b)){b={\'E\':b}}O 8(1z(b)){b=L}H b}D 6C(a,b){H b}D 3J(a,b,c,d,e){8(1p(a)){a=$(a,e)}8(1T(a)){a=$(a,e)}8(2v(a)){a=e.13().7a(a);8(!1k(c)){c=L}}O{8(!1k(c)){c=J}}8(!Y(a)){a=0}8(!Y(b)){b=0}8(c){a+=d.X}a+=b;8(d.Q>0){2h(a>=d.Q){a-=d.Q}2h(a<0){a+=d.Q}}H a}D 4D(i,o,s){F t=0,x=0;1j(F a=s;a>=0;a--){F j=i.1N(a);t+=(j.2f(\':M\'))?j[o.d[\'2w\']](J):0;8(t>o.3U){H x}8(a==0){a=i.S}x++}}D 7c(i,o,s){H 66(i,o.E.1t,o.E.U.4t,s)}D 6T(i,o,s,m){H 66(i,o.E.1t,m,s)}D 66(i,f,m,s){F t=0,x=0;1j(F a=s,l=i.S;a>=0;a--){x++;8(x==l){H x}F j=i.1N(a);8(j.2f(f)){t++;8(t==m){H x}}8(a==0){a=l}}}D 5x(a,o){H o.E.U.4t||a.13().19(0,o.E.M).1t(o.E.1t).S}D 32(i,o,s){F t=0,x=0;1j(F a=s,l=i.S-1;a<=l;a++){F j=i.1N(a);t+=(j.2f(\':M\'))?j[o.d[\'2w\']](J):0;8(t>o.3U){H x}x++;8(x==l+1){H x}8(a==l){a=-1}}}D 5I(i,o,s,l){F v=32(i,o,s);8(!o.1U){8(s+v>l){v=l-s}}H v}D 3W(i,o,s){H 68(i,o.E.1t,o.E.U.4t,s,o.1U)}D 6Z(i,o,s,m){H 68(i,o.E.1t,m+1,s,o.1U)-1}D 68(i,f,m,s,c){F t=0,x=0;1j(F a=s,l=i.S-1;a<=l;a++){x++;8(x>=l){H x}F j=i.1N(a);8(j.2f(f)){t++;8(t==m){H x}}8(a==l){a=-1}}}D 3I(i,o){H i.19(0,o.E.M)}D 6V(i,o,n){H i.19(n,o.E.U.20+n)}D 6W(i,o){H i.19(0,o.E.M)}D 71(i,o){H i.19(0,o.E.U.20)}D 72(i,o,n){H i.19(n,o.E.M+n)}D 4x(i,o,d){8(o.1R){8(!1p(d)){d=\'2a\'}i.1W(D(){F j=$(1l),m=4k(j.Z(o.d[\'1S\']),10);8(!Y(m)){m=0}j.1q(d,m)})}}D 1Y(i,o,m){8(o.1R){F x=(1k(m))?m:L;8(!Y(m)){m=0}4x(i,o,\'7z\');i.1W(D(){F j=$(1l);j.Z(o.d[\'1S\'],((x)?j.1q(\'7z\'):m+j.1q(\'2a\')))})}}D 41(i){i.1W(D(){F j=$(1l);j.1q(\'7A\',j.7B(\'7C\')||\'\')})}D 4U(i){i.1W(D(){F j=$(1l);j.7B(\'7C\',j.1q(\'7A\')||\'\')})}D 5r(o,b){F c=o.E.M,7D=o.E[o.d[\'P\']],69=o[o.d[\'1e\']],7E=3V(69);b.1W(D(){F a=$(1l),6a=7D-7F(a,o,\'8Z\');a[o.d[\'P\']](6a);8(7E){a[o.d[\'1e\']](4s(6a,69))}})}D 4Q(a,o){F b=a.36(),$i=a.13(),$v=3I($i,o),54=4I(4J($v,o,J),o,L);b.Z(54);8(o.1R){F p=o.1i,r=p[o.d[1]];8(o.1B&&r<0){r=0}F c=$v.2P();c.Z(o.d[\'1S\'],c.1q(\'2a\')+r);a.Z(o.d[\'3q\'],p[o.d[0]]);a.Z(o.d[\'1m\'],p[o.d[3]])}a.Z(o.d[\'P\'],54[o.d[\'P\']]+(2R($i,o,\'P\')*2));a.Z(o.d[\'1e\'],6b($i,o,\'1e\'));H 54}D 4J(i,o,a){H[2R(i,o,\'P\',a),6b(i,o,\'1e\',a)]}D 6b(i,o,a,b){8(!1k(b)){b=L}8(Y(o[o.d[a]])&&b){H o[o.d[a]]}8(Y(o.E[o.d[a]])){H o.E[o.d[a]]}a=(a.6c().3R(\'P\')>-1)?\'2w\':\'3n\';H 4n(i,o,a)}D 4n(i,o,b){F s=0;1j(F a=0,l=i.S;a<l;a++){F j=i.1N(a);F m=(j.2f(\':M\'))?j[o.d[b]](J):0;8(s<m){s=m}}H s}D 2R(i,o,b,c){8(!1k(c)){c=L}8(Y(o[o.d[b]])&&c){H o[o.d[b]]}8(Y(o.E[o.d[b]])){H o.E[o.d[b]]*i.S}F d=(b.6c().3R(\'P\')>-1)?\'2w\':\'3n\',s=0;1j(F a=0,l=i.S;a<l;a++){F j=i.1N(a);s+=(j.2f(\':M\'))?j[o.d[d]](J):0}H s}D 5d(a,o,d){F b=a.2f(\':M\');8(b){a.4j()}F s=a.36()[o.d[d]]();8(b){a.4m()}H s}D 5e(o,a){H(Y(o[o.d[\'P\']]))?o[o.d[\'P\']]:a}D 6d(i,o,b){F s=L,v=L;1j(F a=0,l=i.S;a<l;a++){F j=i.1N(a);F c=(j.2f(\':M\'))?j[o.d[b]](J):0;8(s===L){s=c}O 8(s!=c){v=J}8(s==0){v=J}}H v}D 7F(i,o,d){H i[o.d[\'90\'+d]](J)-i[o.d[d.6c()]]()}D 4s(s,o){8(3V(o)){o=4k(o.19(0,-1),10);8(!Y(o)){H s}s*=o/2I}H s}D I(n,c,a,b,d){8(!1k(a)){a=J}8(!1k(b)){b=J}8(!1k(d)){d=L}8(a){n=c.3y.45+n}8(b){n=n+\'.\'+c.3y.7r}8(b&&d){n+=c.3T}H n}D 2y(n,c){H(1p(c.63[n]))?c.63[n]:n}D 4I(a,o,p){8(!1k(p)){p=J}F b=(o.1R&&p)?o.1i:[0,0,0,0];F c={};c[o.d[\'P\']]=a[0]+b[1]+b[3];c[o.d[\'1e\']]=a[1]+b[0]+b[2];H c}D 3e(c,d){F e=[];1j(F a=0,7G=c.S;a<7G;a++){1j(F b=0,7H=d.S;b<7H;b++){8(d[b].3R(2X c[a])>-1&&1z(e[b])){e[b]=c[a];17}}}H e}D 6x(p){8(1z(p)){H[0,0,0,0]}8(Y(p)){H[p,p,p,p]}8(1p(p)){p=p.3Q(\'91\').7I(\'\').3Q(\'92\').7I(\'\').3Q(\' \')}8(!2V(p)){H[0,0,0,0]}1j(F i=0;i<4;i++){p[i]=4k(p[i],10)}1F(p.S){R 0:H[0,0,0,0];R 1:H[p[0],p[0],p[0],p[0]];R 2:H[p[0],p[1],p[0],p[1]];R 3:H[p[0],p[1],p[2],p[1]];2J:H[p[0],p[1],p[2],p[3]]}}D 4H(a,o){F x=(Y(o[o.d[\'P\']]))?1H.2z(o[o.d[\'P\']]-2R(a,o,\'P\')):0;1F(o.1B){R\'1m\':H[0,x];R\'35\':H[x,0];R\'5f\':2J:H[1H.2z(x/2),1H.4l(x/2)]}}D 6r(o){F a=[[\'P\',\'7J\',\'2w\',\'1e\',\'7K\',\'3n\',\'1m\',\'3q\',\'1S\',0,1,2,3],[\'1e\',\'7K\',\'3n\',\'P\',\'7J\',\'2w\',\'3q\',\'1m\',\'5p\',3,2,1,0]];F b=a[0].S,7L=(o.2l==\'35\'||o.2l==\'1m\')?0:1;F c={};1j(F d=0;d<b;d++){c[a[0][d]]=a[7L][d]}H c}D 4E(x,o,a,b){F v=x;8(1o(a)){v=a.1h(b,v)}O 8(1p(a)){F p=a.3Q(\'+\'),m=a.3Q(\'-\');8(m.S>p.S){F c=J,6e=m[0],30=m[1]}O{F c=L,6e=p[0],30=p[1]}1F(6e){R\'93\':v=(x%2==1)?x-1:x;17;R\'94\':v=(x%2==0)?x-1:x;17;2J:v=x;17}30=4k(30,10);8(Y(30)){8(c){30=-30}v+=30}}8(!Y(v)||v<1){v=1}H v}D 2x(x,o,a,b){H 6f(4E(x,o,a,b),o.E.U)}D 6f(v,i){8(Y(i.34)&&v<i.34){v=i.34}8(Y(i.1X)&&v>i.1X){v=i.1X}8(v<1){v=1}H v}D 5k(s){8(!2V(s)){s=[[s]]}8(!2V(s[0])){s=[s]}1j(F j=0,l=s.S;j<l;j++){8(1p(s[j][0])){s[j][0]=$(s[j][0])}8(!1k(s[j][1])){s[j][1]=J}8(!1k(s[j][2])){s[j][2]=J}8(!Y(s[j][3])){s[j][3]=0}}H s}D 65(k){8(k==\'35\'){H 39}8(k==\'1m\'){H 37}8(k==\'5c\'){H 38}8(k==\'7h\'){H 40}H-1}D 5H(n,a,c){8(n){F v=a.1P(I(\'4p\',c));$.1s.1v.25.64(n,v)}}D 7m(n){F c=$.1s.1v.25.3F(n);H(c==\'\')?0:c}D 6E(a,b){F c={};1j(F p=0,l=b.S;p<l;p++){c[b[p]]=a.Z(b[p])}H c}D 6s(a,b,c,d){8(!1T(a.U)){a.U={}}8(!1T(a.3M)){a.3M={}}8(a.3m==0&&Y(d)){a.3m=d}8(1T(a.M)){a.U.34=a.M.34;a.U.1X=a.M.1X;a.M=L}O 8(1p(a.M)){8(a.M==\'1d\'){a.U.1d=J}O{a.U.2c=a.M}a.M=L}O 8(1o(a.M)){a.U.2c=a.M;a.M=L}8(!1p(a.1t)){a.1t=(c.1t(\':3t\').S>0)?\':M\':\'*\'}8(!a[b.d[\'P\']]){8(b.2H){18(J,\'7M a \'+b.d[\'P\']+\' 1j 75 E!\');a[b.d[\'P\']]=4n(c,b,\'2w\')}O{a[b.d[\'P\']]=(6d(c,b,\'2w\'))?\'1d\':c[b.d[\'2w\']](J)}}8(!a[b.d[\'1e\']]){a[b.d[\'1e\']]=(6d(c,b,\'3n\'))?\'1d\':c[b.d[\'3n\']](J)}a.3M.P=a.P;a.3M.1e=a.1e;H a}D 6w(a,b){8(a.E[a.d[\'P\']]==\'1d\'){a.E.U.1d=J}8(!a.E.U.1d){8(Y(a[a.d[\'P\']])){a.E.M=1H.4l(a[a.d[\'P\']]/a.E[a.d[\'P\']])}O{a.E.M=1H.4l(b/a.E[a.d[\'P\']]);a[a.d[\'P\']]=a.E.M*a.E[a.d[\'P\']];8(!a.E.U.2c){a.1B=L}}8(a.E.M==\'95\'||a.E.M<1){18(J,\'2p a 5K 28 4f M E: 7M 46 "1d".\');a.E.U.1d=J}}H a}D 6t(a,b,c){8(a==\'N\'){a=4n(c,b,\'2w\')}H a}D 6u(a,b,c){8(a==\'N\'){a=4n(c,b,\'3n\')}8(!a){a=b.E[b.d[\'1e\']]}H a}D 5i(o,a){F p=4H(3I(a,o),o);o.1i[o.d[1]]=p[1];o.1i[o.d[3]]=p[0];H o}D 5g(o,a,b){F c=6f(1H.2z(o[o.d[\'P\']]/o.E[o.d[\'P\']]),o.E.U);8(c>a.S){c=a.S}F d=1H.4l(o[o.d[\'P\']]/c);o.E.M=c;o.E[o.d[\'P\']]=d;o[o.d[\'P\']]=c*d;H o}D 3N(p){8(1p(p)){F i=(p.3R(\'96\')>-1)?J:L,r=(p.3R(\'3g\')>-1)?J:L}O{F i=r=L}H[i,r]}D 97(a){H(Y(a))?a:3O}D 6g(a){H(a===3O)}D 1z(a){H(6g(a)||2X a==\'7N\'||a===\'\'||a===\'7N\')}D 2V(a){H(a 2W 98)}D 2v(a){H(a 2W 7O)}D 1T(a){H((a 2W 99||2X a==\'2A\')&&!6g(a)&&!2v(a)&&!2V(a))}D Y(a){H((a 2W 4e||2X a==\'28\')&&!9a(a))}D 1p(a){H((a 2W 9b||2X a==\'2M\')&&!1z(a)&&!3p(a)&&!53(a))}D 1o(a){H(a 2W 9c||2X a==\'D\')}D 1k(a){H(a 2W 9d||2X a==\'3d\'||3p(a)||53(a))}D 3p(a){H(a===J||a===\'J\')}D 53(a){H(a===L||a===\'L\')}D 3V(x){H(1p(x)&&x.19(-1)==\'%\')}D 2o(){H 7v 7w().2o()}D 3X(o,n){18(J,o+\' 2f 9e, 9f 1j 9g 9h 9i 9j. 9k \'+n+\' 9l.\')}D 18(d,m){8(!1z(3l.6h)&&!1z(3l.6h.7P)){8(1T(d)){F s=\' (\'+d.4o+\')\';d=d.18}O{F s=\'\'}8(!d){H L}8(1p(m)){m=\'1v\'+s+\': \'+m}O{m=[\'1v\'+s+\':\',m]}3l.6h.7P(m)}H L}$.1L($.2u,{\'9m\':D(t){F a=t*t;H t*(-a*t+4*a-6*t+4)},\'9n\':D(t){H t*(4*t*t-9*t+6)},\'9o\':D(t){F a=t*t;H t*(33*a*a-9p*a*t+9q*a-67*t+15)}})})(7O);', 62, 585, '|||||||opts|if|||||||||||||||||||||||||||||||function|items|var|conf|return|cf_e|true|itms|false|visible|auto|else|width|total|case|length|trigger|visibleConf|scrl|button|first|is_number|css||bind|tt0|children|prev||next|break|debug|slice|anims|pagination|push|variable|height|progress|stopPropagation|call|padding|for|is_boolean|this|left|wrp|is_function|is_string|data|swipe|fn|filter|tmrs|carouFredSel|fade|_onafter|_moveitems|is_undefined|container|align|_s_paddingold|_s_paddingcur|opacity|switch|play|Math|cover|_position|scroll|extend|duration|eq|_a_wrapper|triggerHandler|mousewheel|usePadding|marginRight|is_object|circular|fx|each|max|sz_resetMargin|i_cur_l|old|i_old_l|uncover|unbind||cookie|isScrolling|isPaused|number|a_cfs|_cfs_origCssMargin|clbk|adjust|isStopped|stopImmediatePropagation|is|queu|while|i_new|w_siz|nr|direction|avail_primary|synchronise|getTime|Not|bar|i_new_l|a_cur|remove|easing|is_jquery|outerWidth|cf_getItemsAdjust|cf_c|ceil|object|pR|_s_paddingnew|preventDefault|a_itm|pauseOnHover|options|responsive|100|default|timeoutDuration|startTime|string|removeClass|queue|last|i_skp|ms_getTotalSize|a_old|a_lef|a_dur|is_array|instanceof|typeof|key|transition|adj|opts_orig|gn_getVisibleItemsNext||min|right|parent||||addClass|pause|perc|boolean|cf_sortParams|scrolling|resume|onAfter|i_old|crossfade|slideTo|window|start|outerHeight|_cfs_triggerEvent|is_true|top|position|wrapper|hidden|sc_clearTimers|timePassed|Carousel|sc_startScroll|events|infinite|nv_enableNavi|i_siz|i_siz_vis|_a_paddingold|_a_paddingcur|get|onBefore|updatePageStatus|gi_getCurrentItems|gn_getItemIndex|anchorBuilder|event|sizesConf|bt_pauseOnHoverConfig|null|ns2|split|indexOf|go_getObject|serialNumber|maxDimension|is_percentage|gn_getVisibleItemsNextFilter|deprecated|orgCSS|zIndex||sz_storeOrigCss|none|sc_stopScroll|dur2|prefix|to|appendTo|sc_setScroll||sc_fireCallbacks|currentPage|end|before|Number|of|document|onTouch|onResize|hide|parseInt|floor|show|ms_getTrueLargestSize|selector|currentPosition|destroy|primarySizePercentage|ms_getPercentage|org|onTimeoutStart|onTimeoutPause|onTimeoutEnd|sz_storeMargin|stopped|pre|post|updater|minimum|gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|cf_getAlignPadding|cf_mapWrapperSizes|ms_getSizes|a_wsz|a_new|not|a_cfs_vis|updateSizes|eval|sz_setSizes|pgs|deviation|nv_showNavi|sz_restoreOrigCss|mouseenter|mouseleave|pauseOnEvent|keys|throttle||di|go_getNaviObject|is_false|sz|element|starting_position|_cfs_isCarousel||_cfs_init|go_getPrevNextObject|defaults|up|ms_getParentSize|ms_getMaxDimension|center|in_getResponsiveValues|bottom|in_getAlignPadding|go_complementPrevNextObject|cf_getSynchArr|onPauseStart|onPausePause|onPauseEnd|pauseDuration|marginBottom|newPosition|sz_setResponsiveSizes|_cfs_unbind_events|finish|interval|type|conditions|gn_getVisibleOrg|backward|sc_hideHiddenItems|a_lef_vis|sc_getDuration|_a_paddingnew|sc_showHiddenItems|sc_mapCallbackArguments|sc_afterScroll|sc_fireQueue|cf_setCookie|gn_getVisibleItemsNextTestCircular|slideToPage|valid|linkAnchors|value|_cfs_bind_buttons|click|_cfs_unbind_buttons|scrolled|onMouse|swP|swN|delay|pauseOnResize|debounce|onWindowResize|_windowHeight|nh||ns3|continue|classnames|set|cf_getKeyCode|gn_getItemsPrevFilter||gn_getItemsNextFilter|seco|nw|ms_getLargestSize|toLowerCase|ms_hasVariableSizes|sta|cf_getItemAdjustMinMax|is_null|console|caroufredsel|No|found|go_getItemsObject|go_getScrollObject|go_getAutoObject|go_getPaginationObject|go_getSwipeObject|go_getMousewheelObject|cf_getDimensions|in_complementItems|in_complementPrimarySize|in_complementSecondarySize|upDateOnWindowResize|in_complementVisibleItems|cf_getPadding|500|go_complementAutoObject|go_complementPaginationObject|go_complementSwipeObject|go_complementMousewheelObject|_cfs_build|in_mapCss|textAlign|float|marginTop|marginLeft|absolute|_cfs_origCssZindex|_cfs_bind_events|stop|paused|enough|needed|page|slide_|configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|gn_getScrollItemsNextFilter|forward|gi_getOldItemsNext|gi_getNewItemsNext|jumpToStart|after|the|append|removeItem|round|hash|index|selected|gn_getVisibleItemsPrevFilter|Item|keyup|keyCode|scN|down|cursor|mcN|configs|classname|cf_getCookie|random|itm|onCreate|swing|namespace|pageAnchorBuilder|span|progressbarUpdater|new|Date|_cfs_isHidden|triggerOnTouchEnd|_cfs_tempCssMargin|_cfs_origCss|attr|style|newS|secp|ms_getPaddingBorderMargin|l1|l2|join|innerWidth|innerHeight|dx|Set|undefined|jQuery|log|caroufredsel_cookie_|relative|fixed|overflow|setInterval|setTimeout|or|Callback|returned|Page|resumed|currently|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|Correct|insert|Appending|item|add|detach|currentVisible|body|find|Preventing|non|sliding|replaceWith|widths|heights|automatically|ontouchstart|in|swipeUp|swipeDown|swipeLeft|swipeRight|move|200|300|resize|wrap|class|animate|unshift|location|cfs|div|caroufredsel_wrapper|href|charAt|setTime|1000|expires|toGMTString|path|ease|orgDuration|shift|clearTimeout|clearInterval|skipped|Hiding|navigation|disabled|2500|Width|outer|px|em|even|odd|Infinity|immediate|bt_mousesheelNumber|Array|Object|isNaN|String|Function|Boolean|DEPRECATED|support|it|will|be|removed|Use|instead|quadratic|cubic|elastic|106|126'.split('|'), 0, {}))

        /*!
         * Masonry PACKAGED v3.1.2
         * Cascading grid layout library
         * http://masonry.desandro.com
         * MIT License
         * by David DeSandro
         */

        ;
(function(t) {
    "use strict";
    function e() {
    }
    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }
        function o(e, i) {
            t.fn[e] = function(o) {
                if ("string" == typeof o) {
                    for (var s = n.call(arguments, 1), a = 0, h = this.length; h > a; a++) {
                        var p = this[a], u = t.data(p, e);
                        if (u)
                            if (t.isFunction(u[o]) && "_" !== o.charAt(0)) {
                                var f = u[o].apply(u, s);
                                if (void 0 !== f)
                                    return f
                            } else
                                r("no such method '" + o + "' for " + e + " instance");
                        else
                            r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var n = t.data(this, e);
                    n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
                })
            }
        }
        if (t) {
            var r = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            t.bridget = function(t, e) {
                i(e), o(t, e)
            }
        }
    }
    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery)
})(window), function(t) {
    var e = document.documentElement, i = function() {
    };
    e.addEventListener ? i = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : e.attachEvent && (i = function(e, i, n) {
        e[i + n] = n.handleEvent ? function() {
            var e = t.event;
            e.target = e.target || e.srcElement, n.handleEvent.call(n, e)
        } : function() {
            var i = t.event;
            i.target = i.target || i.srcElement, n.call(e, i)
        }, e.attachEvent("on" + i, e[i + n])
    });
    var n = function() {
    };
    e.removeEventListener ? n = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : e.detachEvent && (n = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (n) {
            t[e + i] = void 0
        }
    });
    var o = {bind: i, unbind: n};
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : t.eventie = o
}(this), function(t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }
    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== o.readyState;
        if (!e.isReady && !i) {
            e.isReady = !0;
            for (var n = 0, s = r.length; s > n; n++) {
                var a = r[n];
                a()
            }
        }
    }
    function n(n) {
        return n.bind(o, "DOMContentLoaded", i), n.bind(o, "readystatechange", i), n.bind(t, "load", i), e
    }
    var o = t.document, r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], n)) : t.docReady = n(t.eventie)
}(this), function() {
    function t() {
    }
    function e(t, e) {
        for (var i = t.length; i--; )
            if (t[i].listener === e)
                return i;
        return-1
    }
    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var n = t.prototype, o = this, r = o.EventEmitter;
    n.getListeners = function(t) {
        var e, i, n = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (i in n)
                n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else
            e = n[t] || (n[t] = []);
        return e
    }, n.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1)
            i.push(t[e].listener);
        return i
    }, n.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, n.addListener = function(t, i) {
        var n, o = this.getListenersAsObject(t), r = "object" == typeof i;
        for (n in o)
            o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : {listener: i, once: !1});
        return this
    }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
        return this.addListener(t, {listener: e, once: !0})
    }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
        return this.getListeners(t), this
    }, n.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1)
            this.defineEvent(t[e]);
        return this
    }, n.removeListener = function(t, i) {
        var n, o, r = this.getListenersAsObject(t);
        for (o in r)
            r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1));
        return this
    }, n.off = i("removeListener"), n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, n.manipulateListeners = function(t, e, i) {
        var n, o, r = t ? this.removeListener : this.addListener, s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--; )
                r.call(this, e, i[n]);
        else
            for (n in e)
                e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o));
        return this
    }, n.removeEvent = function(t) {
        var e, i = typeof t, n = this._getEvents();
        if ("string" === i)
            delete n[t];
        else if ("object" === i)
            for (e in n)
                n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else
            delete this._events;
        return this
    }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
        var i, n, o, r, s = this.getListenersAsObject(t);
        for (o in s)
            if (s.hasOwnProperty(o))
                for (n = s[o].length; n--; )
                    i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, n.trigger = i("emitEvent"), n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, n.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, n._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, n._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return o.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function(t) {
    function e(t) {
        if (t) {
            if ("string" == typeof n[t])
                return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, o = 0, r = i.length; r > o; o++)
                if (e = i[o] + t, "string" == typeof n[e])
                    return e
        }
    }
    var i = "Webkit Moz ms Ms O".split(" "), n = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window), function(t) {
    function e(t) {
        var e = parseFloat(t), i = -1 === t.indexOf("%") && !isNaN(e);
        return i && e
    }
    function i() {
        for (var t = {width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0}, e = 0, i = a.length; i > e; e++) {
            var n = a[e];
            t[n] = 0
        }
        return t
    }
    function n(t) {
        function n(t) {
            if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var n = s(t);
                if ("none" === n.display)
                    return i();
                var r = {};
                r.width = t.offsetWidth, r.height = t.offsetHeight;
                for (var u = r.isBorderBox = !(!p || !n[p] || "border-box" !== n[p]), f = 0, l = a.length; l > f; f++) {
                    var d = a[f], c = n[d];
                    c = o(t, c);
                    var m = parseFloat(c);
                    r[d] = isNaN(m) ? 0 : m
                }
                var y = r.paddingLeft + r.paddingRight, g = r.paddingTop + r.paddingBottom, v = r.marginLeft + r.marginRight, _ = r.marginTop + r.marginBottom, E = r.borderLeftWidth + r.borderRightWidth, b = r.borderTopWidth + r.borderBottomWidth, L = u && h, z = e(n.width);
                z !== !1 && (r.width = z + (L ? 0 : y + E));
                var S = e(n.height);
                return S !== !1 && (r.height = S + (L ? 0 : g + b)), r.innerWidth = r.width - (y + E), r.innerHeight = r.height - (g + b), r.outerWidth = r.width + v, r.outerHeight = r.height + _, r
            }
        }
        function o(t, e) {
            if (r || -1 === e.indexOf("%"))
                return e;
            var i = t.style, n = i.left, o = t.runtimeStyle, s = o && o.left;
            return s && (o.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = n, s && (o.left = s), e
        }
        var h, p = t("boxSizing");
        return function() {
            if (p) {
                var t = document.createElement("div");
                t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[p] = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(t);
                var n = s(t);
                h = 200 === e(n.width), i.removeChild(t)
            }
        }(), n
    }
    var o = document.defaultView, r = o && o.getComputedStyle, s = r ? function(t) {
        return o.getComputedStyle(t, null)
    } : function(t) {
        return t.currentStyle
    }, a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("get-style-property")) : t.getSize = n(t.getStyleProperty)
}(window), function(t, e) {
    function i(t, e) {
        return t[a](e)
    }
    function n(t) {
        if (!t.parentNode) {
            var e = document.createDocumentFragment();
            e.appendChild(t)
        }
    }
    function o(t, e) {
        n(t);
        for (var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length; r > o; o++)
            if (i[o] === t)
                return!0;
        return!1
    }
    function r(t, e) {
        return n(t), i(t, e)
    }
    var s, a = function() {
        if (e.matchesSelector)
            return"matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) {
            var o = t[i], r = o + "MatchesSelector";
            if (e[r])
                return r
        }
    }();
    if (a) {
        var h = document.createElement("div"), p = i(h, "div");
        s = p ? i : r
    } else
        s = o;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return s
    }) : window.matchesSelector = s
}(this, Element.prototype), function(t) {
    function e(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function i(t) {
        for (var e in t)
            return!1;
        return e = null, !0
    }
    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return"-" + t.toLowerCase()
        })
    }
    function o(t, o, r) {
        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
        }
        var h = r("transition"), p = r("transform"), u = h && p, f = !!r("perspective"), l = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend"}[h], d = ["transform", "transition", "transitionDuration", "transitionProperty"], c = function() {
            for (var t = {}, e = 0, i = d.length; i > e; e++) {
                var n = d[e], o = r(n);
                o && o !== n && (t[n] = o)
            }
            return t
        }();
        e(a.prototype, t.prototype), a.prototype._create = function() {
            this._transition = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.getSize = function() {
            this.size = o(this.element)
        }, a.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var n = c[i] || i;
                e[n] = t[i]
            }
        }, a.prototype.getPosition = function() {
            var t = s(this.element), e = this.layout.options, i = e.isOriginLeft, n = e.isOriginTop, o = parseInt(t[i ? "left" : "right"], 10), r = parseInt(t[n ? "top" : "bottom"], 10);
            o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r;
            var a = this.layout.size;
            o -= i ? a.paddingLeft : a.paddingRight, r -= n ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = r
        }, a.prototype.layoutPosition = function() {
            var t = this.layout.size, e = this.layout.options, i = {};
            e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
        };
        var m = f ? function(t, e) {
            return"translate3d(" + t + "px, " + e + "px, 0)"
        } : function(t, e) {
            return"translate(" + t + "px, " + e + "px)"
        };
        a.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y;
            if (this.setPosition(t, e), s && !this.isTransitioning)
                return this.layoutPosition(), void 0;
            var a = t - i, h = e - n, p = {}, u = this.layout.options;
            a = u.isOriginLeft ? a : -a, h = u.isOriginTop ? h : -h, p.transform = m(a, h), this.transition({to: p, onTransitionEnd: {transform: this.layoutPosition}, isCleaning: !0})
        }, a.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, a.prototype._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd)
                t.onTransitionEnd[e].call(this)
        }, a.prototype._transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration))
                return this._nonTransition(t), void 0;
            var e = this._transition;
            for (var i in t.onTransitionEnd)
                e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)
                e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var y = p && n(p) + ",opacity";
        a.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({transitionProperty: y, transitionDuration: this.layout.options.transitionDuration}), this.element.addEventListener(l, this, !1))
        }, a.prototype.transition = a.prototype[h ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, a.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var g = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
        a.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transition, n = g[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                    var o = e.onEnd[n];
                    o.call(this), delete e.onEnd[n]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function(t) {
            var e = {};
            for (var i in t)
                e[i] = "";
            this.css(e)
        };
        var v = {transitionProperty: "", transitionDuration: ""};
        return a.prototype.removeTransitionStyles = function() {
            this.css(v)
        }, a.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, a.prototype.remove = function() {
            if (!h || !parseFloat(this.layout.options.transitionDuration))
                return this.removeElem(), void 0;
            var t = this;
            this.on("transitionEnd", function() {
                return t.removeElem(), !0
            }), this.hide()
        }, a.prototype.reveal = function() {
            delete this.isHidden, this.css({display: ""});
            var t = this.layout.options;
            this.transition({from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0})
        }, a.prototype.hide = function() {
            this.isHidden = !0, this.css({display: ""});
            var t = this.layout.options;
            this.transition({from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: {opacity: function() {
                        this.isHidden && this.css({display: "none"})
                    }}})
        }, a.prototype.destroy = function() {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, a
    }
    var r = document.defaultView, s = r && r.getComputedStyle ? function(t) {
        return r.getComputedStyle(t, null)
    } : function(t) {
        return t.currentStyle
    };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : (t.Outlayer = {}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window), function(t) {
    function e(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function i(t) {
        return"[object Array]" === f.call(t)
    }
    function n(t) {
        var e = [];
        if (i(t))
            e = t;
        else if (t && "number" == typeof t.length)
            for (var n = 0, o = t.length; o > n; n++)
                e.push(t[n]);
        else
            e.push(t);
        return e
    }
    function o(t, e) {
        var i = d(e, t);
        -1 !== i && e.splice(i, 1)
    }
    function r(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    function s(i, s, f, d, c, m) {
        function y(t, i) {
            if ("string" == typeof t && (t = a.querySelector(t)), !t || !l(t))
                return h && h.error("Bad " + this.settings.namespace + " element: " + t), void 0;
            this.element = t, this.options = e({}, this.options), this.option(i);
            var n = ++v;
            this.element.outlayerGUID = n, _[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        function g(t, i) {
            t.prototype[i] = e({}, y.prototype[i])
        }
        var v = 0, _ = {};
        return y.prototype.settings = {namespace: "outlayer", item: m}, y.prototype.options = {containerStyle: {position: "relative"}, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, transitionDuration: "0.4s", hiddenStyle: {opacity: 0, transform: "scale(0.001)"}, visibleStyle: {opacity: 1, transform: "scale(1)"}}, e(y.prototype, f.prototype), y.prototype.option = function(t) {
            e(this.options, t)
        }, y.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, y.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, y.prototype._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.settings.item, n = [], o = 0, r = e.length; r > o; o++) {
                var s = e[o], a = new i(s, this);
                n.push(a)
            }
            return n
        }, y.prototype._filterFindItemElements = function(t) {
            t = n(t);
            for (var e = this.options.itemSelector, i = [], o = 0, r = t.length; r > o; o++) {
                var s = t[o];
                if (l(s))
                    if (e) {
                        c(s, e) && i.push(s);
                        for (var a = s.querySelectorAll(e), h = 0, p = a.length; p > h; h++)
                            i.push(a[h])
                    } else
                        i.push(s)
            }
            return i
        }, y.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++)
                t.push(this.items[e].element);
            return t
        }, y.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, y.prototype._init = y.prototype.layout, y.prototype._resetLayout = function() {
            this.getSize()
        }, y.prototype.getSize = function() {
            this.size = d(this.element)
        }, y.prototype._getMeasurement = function(t, e) {
            var i, n = this.options[t];
            n ? ("string" == typeof n ? i = this.element.querySelector(n) : l(n) && (i = n), this[t] = i ? d(i)[e] : n) : this[t] = 0
        }, y.prototype.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, y.prototype._getItemsForLayout = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i];
                o.isIgnored || e.push(o)
            }
            return e
        }, y.prototype._layoutItems = function(t, e) {
            if (!t || !t.length)
                return this.emitEvent("layoutComplete", [this, t]), void 0;
            this._itemsOn(t, "layout", function() {
                this.emitEvent("layoutComplete", [this, t])
            });
            for (var i = [], n = 0, o = t.length; o > n; n++) {
                var r = t[n], s = this._getItemLayoutPosition(r);
                s.item = r, s.isInstant = e, i.push(s)
            }
            this._processLayoutQueue(i)
        }, y.prototype._getItemLayoutPosition = function() {
            return{x: 0, y: 0}
        }, y.prototype._processLayoutQueue = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, y.prototype._positionItem = function(t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i)
        }, y.prototype._postLayout = function() {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }, y.prototype._getContainerSize = u, y.prototype._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, y.prototype._itemsOn = function(t, e, i) {
            function n() {
                return o++, o === r && i.call(s), !0
            }
            for (var o = 0, r = t.length, s = this, a = 0, h = t.length; h > a; a++) {
                var p = t[a];
                p.on(e, n)
            }
        }, y.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, y.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, y.prototype.stamp = function(t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this.ignore(n)
                }
            }
        }, y.prototype.unstamp = function(t) {
            if (t = this._find(t))
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    o(n, this.stamps), this.unignore(n)
                }
        }, y.prototype._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0
        }, y.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, y.prototype._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)}
        }, y.prototype._manageStamp = u, y.prototype._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(), i = this._boundingRect, n = d(t), o = {left: e.left - i.left - n.marginLeft, top: e.top - i.top - n.marginTop, right: i.right - e.right - n.marginRight, bottom: i.bottom - e.bottom - n.marginBottom};
            return o
        }, y.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, y.prototype.bindResize = function() {
            this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
        }, y.prototype.unbindResize = function() {
            i.unbind(t, "resize", this), this.isResizeBound = !1
        }, y.prototype.onresize = function() {
            function t() {
                e.resize(), delete e.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, y.prototype.resize = function() {
            var t = d(this.element), e = this.size && t;
            e && t.innerWidth === this.size.innerWidth || this.layout()
        }, y.prototype.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, y.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, y.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, y.prototype.reveal = function(t) {
            if (t && t.length)
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    n.reveal()
                }
        }, y.prototype.hide = function(t) {
            if (t && t.length)
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    n.hide()
                }
        }, y.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t)
                    return n
            }
        }, y.prototype.getItems = function(t) {
            if (t && t.length) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var o = t[i], r = this.getItem(o);
                    r && e.push(r)
                }
                return e
            }
        }, y.prototype.remove = function(t) {
            t = n(t);
            var e = this.getItems(t);
            if (e && e.length) {
                this._itemsOn(e, "remove", function() {
                    this.emitEvent("removeComplete", [this, e])
                });
                for (var i = 0, r = e.length; r > i; i++) {
                    var s = e[i];
                    s.remove(), o(s, this.items)
                }
            }
        }, y.prototype.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                n.destroy()
            }
            this.unbindResize(), delete this.element.outlayerGUID, p && p.removeData(this.element, this.settings.namespace)
        }, y.data = function(t) {
            var e = t && t.outlayerGUID;
            return e && _[e]
        }, y.create = function(t, i) {
            function n() {
                y.apply(this, arguments)
            }
            return e(n.prototype, y.prototype), g(n, "options"), g(n, "settings"), e(n.prototype.options, i), n.prototype.settings.namespace = t, n.data = y.data, n.Item = function() {
                m.apply(this, arguments)
            }, n.Item.prototype = new m, n.prototype.settings.item = n.Item, s(function() {
                for (var e = r(t), i = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", s = 0, u = i.length; u > s; s++) {
                    var f, l = i[s], d = l.getAttribute(o);
                    try {
                        f = d && JSON.parse(d)
                    } catch (c) {
                        h && h.error("Error parsing " + o + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + c);
                        continue
                    }
                    var m = new n(l, f);
                    p && p.data(l, t, m)
                }
            }), p && p.bridget && p.bridget(t, n), n
        }, y.Item = m, y
    }
    var a = t.document, h = t.console, p = t.jQuery, u = function() {
    }, f = Object.prototype.toString, l = "object" == typeof HTMLElement ? function(t) {
        return t instanceof HTMLElement
    } : function(t) {
        return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
    }, d = Array.prototype.indexOf ? function(t, e) {
        return t.indexOf(e)
    } : function(t, e) {
        for (var i = 0, n = t.length; n > i; i++)
            if (t[i] === e)
                return i;
        return-1
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window), function(t) {
    function e(t, e) {
        var n = t.create("masonry");
        return n.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--; )
                this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, n.prototype.getContainerWidth = function() {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element, i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = Math.ceil(t.size.outerWidth / this.columnWidth);
            e = Math.min(e, this.cols);
            for (var n = this._getColGroup(e), o = Math.min.apply(Math, n), r = i(n, o), s = {x: this.columnWidth * r, y: o}, a = o + t.size.outerHeight, h = this.cols + 1 - n.length, p = 0; h > p; p++)
                this.colYs[r + p] = a;
            return s
        }, n.prototype._getColGroup = function(t) {
            if (2 > t)
                return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, o)
            }
            return e
        }, n.prototype._manageStamp = function(t) {
            var i = e(t), n = this._getElementOffset(t), o = this.options.isOriginLeft ? n.left : n.right, r = o + i.outerWidth, s = Math.floor(o / this.columnWidth);
            s = Math.max(0, s);
            var a = Math.floor(r / this.columnWidth);
            a = Math.min(this.cols - 1, a);
            for (var h = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, p = s; a >= p; p++)
                this.colYs[p] = Math.max(h, this.colYs[p])
        }, n.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {height: this.maxY};
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, n.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; )
                t++;
            return(this.cols - t) * this.columnWidth - this.gutter
        }, n.prototype.resize = function() {
            var t = this.containerWidth;
            this.getContainerWidth(), t !== this.containerWidth && this.layout()
        }, n
    }
    var i = Array.prototype.indexOf ? function(t, e) {
        return t.indexOf(e)
    } : function(t, e) {
        for (var i = 0, n = t.length; n > i; i++) {
            var o = t[i];
            if (o === e)
                return i
        }
        return-1
    };
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
}(window);

/*! jQuery UI - v1.10.3 - 2013-12-03
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.slider.js
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */

;
(function(e, t) {
    function i(t, i) {
        var s, n, r, o = t.nodeName.toLowerCase();
        return"area" === o ? (s = t.parentNode, n = s.name, t.href && n && "map" === s.nodeName.toLowerCase() ? (r = e("img[usemap=#" + n + "]")[0], !!r && a(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && a(t)
    }
    function a(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return"hidden" === e.css(this, "visibility")
        }).length
    }
    var s = 0, n = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, {version: "1.10.3", keyCode: {BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38}}), e.fn.extend({focus: function(t) {
            return function(i, a) {
                return"number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), a && a.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus), scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return/(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return/(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        }, zIndex: function(i) {
            if (i !== t)
                return this.css("zIndex", i);
            if (this.length)
                for (var a, s, n = e(this[0]); n.length && n[0] !== document; ) {
                    if (a = n.css("position"), ("absolute" === a || "relative" === a || "fixed" === a) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s))
                        return s;
                    n = n.parent()
                }
            return 0
        }, uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++s)
            })
        }, removeUniqueId: function() {
            return this.each(function() {
                n.test(this.id) && e(this).removeAttr("id")
            })
        }}), e.extend(e.expr[":"], {data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return!!e.data(i, t)
            }
        }) : function(t, i, a) {
            return!!e.data(t, a[3])
        }, focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        }, tabbable: function(t) {
            var a = e.attr(t, "tabindex"), s = isNaN(a);
            return(s || a >= 0) && i(t, !s)
        }}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, a) {
        function s(t, i, a, s) {
            return e.each(n, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, a && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var n = "Width" === a ? ["Left", "Right"] : ["Top", "Bottom"], r = a.toLowerCase(), o = {innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight};
        e.fn["inner" + a] = function(i) {
            return i === t ? o["inner" + a].call(this) : this.each(function() {
                e(this).css(r, s(this, i) + "px")
            })
        }, e.fn["outer" + a] = function(t, i) {
            return"number" != typeof t ? o["outer" + a].call(this, t) : this.each(function() {
                e(this).css(r, s(this, t, !0, i) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart"in document.createElement("div"), e.fn.extend({disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        }, enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }}), e.extend(e.ui, {plugin: {add: function(t, i, a) {
                var s, n = e.ui[t].prototype;
                for (s in a)
                    n.plugins[s] = n.plugins[s] || [], n.plugins[s].push([i, a[s]])
            }, call: function(e, t, i) {
                var a, s = e.plugins[t];
                if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (a = 0; s.length > a; a++)
                        e.options[s[a][0]] && s[a][1].apply(e.element, i)
            }}, hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow"))
                return!1;
            var a = i && "left" === i ? "scrollLeft" : "scrollTop", s = !1;
            return t[a] > 0 ? !0 : (t[a] = 1, s = t[a] > 0, t[a] = 0, s)
        }})
})(jQuery);
(function(e, t) {
    var i = 0, s = Array.prototype.slice, a = e.cleanData;
    e.cleanData = function(t) {
        for (var i, s = 0; null != (i = t[s]); s++)
            try {
                e(i).triggerHandler("remove")
            } catch (n) {
            }
        a(t)
    }, e.widget = function(i, s, a) {
        var n, r, o, h, l = {}, u = i.split(".")[0];
        i = i.split(".")[1], n = u + "-" + i, a || (a = s, s = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) {
            return!!e.data(t, n)
        }, e[u] = e[u] || {}, r = e[u][i], o = e[u][i] = function(e, i) {
            return this._createWidget ? (arguments.length && this._createWidget(e, i), t) : new o(e, i)
        }, e.extend(o, r, {version: a.version, _proto: e.extend({}, a), _childConstructors: []}), h = new s, h.options = e.widget.extend({}, h.options), e.each(a, function(i, a) {
            return e.isFunction(a) ? (l[i] = function() {
                var e = function() {
                    return s.prototype[i].apply(this, arguments)
                }, t = function(e) {
                    return s.prototype[i].apply(this, e)
                };
                return function() {
                    var i, s = this._super, n = this._superApply;
                    return this._super = e, this._superApply = t, i = a.apply(this, arguments), this._super = s, this._superApply = n, i
                }
            }(), t) : (l[i] = a, t)
        }), o.prototype = e.widget.extend(h, {widgetEventPrefix: r ? h.widgetEventPrefix : i}, l, {constructor: o, namespace: u, widgetName: i, widgetFullName: n}), r ? (e.each(r._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete r._childConstructors) : s._childConstructors.push(o), e.widget.bridge(i, o)
    }, e.widget.extend = function(i) {
        for (var a, n, r = s.call(arguments, 1), o = 0, h = r.length; h > o; o++)
            for (a in r[o])
                n = r[o][a], r[o].hasOwnProperty(a) && n !== t && (i[a] = e.isPlainObject(n) ? e.isPlainObject(i[a]) ? e.widget.extend({}, i[a], n) : e.widget.extend({}, n) : n);
        return i
    }, e.widget.bridge = function(i, a) {
        var n = a.prototype.widgetFullName || i;
        e.fn[i] = function(r) {
            var o = "string" == typeof r, h = s.call(arguments, 1), l = this;
            return r = !o && h.length ? e.widget.extend.apply(null, [r].concat(h)) : r, o ? this.each(function() {
                var s, a = e.data(this, n);
                return a ? e.isFunction(a[r]) && "_" !== r.charAt(0) ? (s = a[r].apply(a, h), s !== a && s !== t ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : t) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'")
            }) : this.each(function() {
                var t = e.data(this, n);
                t ? t.option(r || {})._init() : e.data(this, n, new a(r, this))
            }), l
        }
    }, e.Widget = function() {
    }, e.Widget._childConstructors = [], e.Widget.prototype = {widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: {disabled: !1, create: null}, _createWidget: function(t, s) {
            s = e(s || this.defaultElement || this)[0], this.element = e(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, {remove: function(e) {
                    e.target === s && this.destroy()
                }}), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        }, _getCreateOptions: e.noop, _getCreateEventData: e.noop, _create: e.noop, _init: e.noop, destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        }, _destroy: e.noop, widget: function() {
            return this.element
        }, option: function(i, s) {
            var a, n, r, o = i;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, a = i.split("."), i = a.shift(), a.length) {
                    for (n = o[i] = e.widget.extend({}, this.options[i]), r = 0; a.length - 1 > r; r++)
                        n[a[r]] = n[a[r]] || {}, n = n[a[r]];
                    if (i = a.pop(), s === t)
                        return n[i] === t ? null : n[i];
                    n[i] = s
                } else {
                    if (s === t)
                        return this.options[i] === t ? null : this.options[i];
                    o[i] = s
                }
            return this._setOptions(o), this
        }, _setOptions: function(e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        }, _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        }, enable: function() {
            return this._setOption("disabled", !1)
        }, disable: function() {
            return this._setOption("disabled", !0)
        }, _on: function(i, s, a) {
            var n, r = this;
            "boolean" != typeof i && (a = s, s = i, i = !1), a ? (s = n = e(s), this.bindings = this.bindings.add(s)) : (a = s, s = this.element, n = this.widget()), e.each(a, function(a, o) {
                function h() {
                    return i || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : t
                }
                "string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++);
                var l = a.match(/^(\w+)\s*(.*)$/), u = l[1] + r.eventNamespace, c = l[2];
                c ? n.delegate(c, u, h) : s.bind(u, h)
            })
        }, _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        }, _delay: function(e, t) {
            function i() {
                return("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        }, _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }})
        }, _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                }, focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }})
        }, _trigger: function(t, i, s) {
            var a, n, r = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], n = i.originalEvent)
                for (a in n)
                    a in i || (i[a] = n[a]);
            return this.element.trigger(i, s), !(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }}, e.each({show: "fadeIn", hide: "fadeOut"}, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, a, n) {
            "string" == typeof a && (a = {effect: a});
            var r, o = a ? a === !0 || "number" == typeof a ? i : a.effect || i : t;
            a = a || {}, "number" == typeof a && (a = {duration: a}), r = !e.isEmptyObject(a), a.complete = n, a.delay && s.delay(a.delay), r && e.effects && e.effects.effect[o] ? s[t](a) : o !== t && s[o] ? s[o](a.duration, a.easing, n) : s.queue(function(i) {
                e(this)[t](), n && n.call(s[0]), i()
            })
        }
    })
})(jQuery);
(function(e) {
    var t = !1;
    e(document).mouseup(function() {
        t = !1
    }), e.widget("ui.mouse", {version: "1.10.3", options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0}, _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return!0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
            }), this.started = !1
        }, _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        }, _mouseDown: function(i) {
            if (!t) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var s = this, a = 1 === i.which, n = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
                return a && !n && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                    return s._mouseMove(e)
                }, this._mouseUpDelegate = function(e) {
                    return s._mouseUp(e)
                }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0
            }
        }, _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        }, _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        }, _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        }, _mouseDelayMet: function() {
            return this.mouseDelayMet
        }, _mouseStart: function() {
        }, _mouseDrag: function() {
        }, _mouseStop: function() {
        }, _mouseCapture: function() {
            return!0
        }})
})(jQuery);
(function(e, t) {
    function i(e, t, i) {
        return[parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
    }
    function s(t, i) {
        return parseInt(e.css(t, i), 10) || 0
    }
    function a(t) {
        var i = t[0];
        return 9 === i.nodeType ? {width: t.width(), height: t.height(), offset: {top: 0, left: 0}} : e.isWindow(i) ? {width: t.width(), height: t.height(), offset: {top: t.scrollTop(), left: t.scrollLeft()}} : i.preventDefault ? {width: 0, height: 0, offset: {top: i.pageY, left: i.pageX}} : {width: t.outerWidth(), height: t.outerHeight(), offset: t.offset()}
    }
    e.ui = e.ui || {};
    var n, r = Math.max, o = Math.abs, h = Math.round, l = /left|center|right/, u = /top|center|bottom/, c = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = e.fn.position;
    e.position = {scrollbarWidth: function() {
            if (n !== t)
                return n;
            var i, s, a = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), r = a.children()[0];
            return e("body").append(a), i = r.offsetWidth, a.css("overflow", "scroll"), s = r.offsetWidth, i === s && (s = a[0].clientWidth), a.remove(), n = i - s
        }, getScrollInfo: function(t) {
            var i = t.isWindow ? "" : t.element.css("overflow-x"), s = t.isWindow ? "" : t.element.css("overflow-y"), a = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth, n = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
            return{width: n ? e.position.scrollbarWidth() : 0, height: a ? e.position.scrollbarWidth() : 0}
        }, getWithinInfo: function(t) {
            var i = e(t || window), s = e.isWindow(i[0]);
            return{element: i, isWindow: s, offset: i.offset() || {left: 0, top: 0}, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: s ? i.width() : i.outerWidth(), height: s ? i.height() : i.outerHeight()}
        }}, e.fn.position = function(t) {
        if (!t || !t.of)
            return f.apply(this, arguments);
        t = e.extend({}, t);
        var n, p, m, g, v, y, b = e(t.of), _ = e.position.getWithinInfo(t.within), x = e.position.getScrollInfo(_), k = (t.collision || "flip").split(" "), w = {};
        return y = a(b), b[0].preventDefault && (t.at = "left top"), p = y.width, m = y.height, g = y.offset, v = e.extend({}, g), e.each(["my", "at"], function() {
            var e, i, s = (t[this] || "").split(" ");
            1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : u.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = l.test(s[0]) ? s[0] : "center", s[1] = u.test(s[1]) ? s[1] : "center", e = c.exec(s[0]), i = c.exec(s[1]), w[this] = [e ? e[0] : 0, i ? i[0] : 0], t[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]
        }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? v.left += p : "center" === t.at[0] && (v.left += p / 2), "bottom" === t.at[1] ? v.top += m : "center" === t.at[1] && (v.top += m / 2), n = i(w.at, p, m), v.left += n[0], v.top += n[1], this.each(function() {
            var a, l, u = e(this), c = u.outerWidth(), d = u.outerHeight(), f = s(this, "marginLeft"), y = s(this, "marginTop"), D = c + f + s(this, "marginRight") + x.width, T = d + y + s(this, "marginBottom") + x.height, M = e.extend({}, v), S = i(w.my, u.outerWidth(), u.outerHeight());
            "right" === t.my[0] ? M.left -= c : "center" === t.my[0] && (M.left -= c / 2), "bottom" === t.my[1] ? M.top -= d : "center" === t.my[1] && (M.top -= d / 2), M.left += S[0], M.top += S[1], e.support.offsetFractions || (M.left = h(M.left), M.top = h(M.top)), a = {marginLeft: f, marginTop: y}, e.each(["left", "top"], function(i, s) {
                e.ui.position[k[i]] && e.ui.position[k[i]][s](M, {targetWidth: p, targetHeight: m, elemWidth: c, elemHeight: d, collisionPosition: a, collisionWidth: D, collisionHeight: T, offset: [n[0] + S[0], n[1] + S[1]], my: t.my, at: t.at, within: _, elem: u})
            }), t.using && (l = function(e) {
                var i = g.left - M.left, s = i + p - c, a = g.top - M.top, n = a + m - d, h = {target: {element: b, left: g.left, top: g.top, width: p, height: m}, element: {element: u, left: M.left, top: M.top, width: c, height: d}, horizontal: 0 > s ? "left" : i > 0 ? "right" : "center", vertical: 0 > n ? "top" : a > 0 ? "bottom" : "middle"};
                c > p && p > o(i + s) && (h.horizontal = "center"), d > m && m > o(a + n) && (h.vertical = "middle"), h.important = r(o(i), o(s)) > r(o(a), o(n)) ? "horizontal" : "vertical", t.using.call(this, e, h)
            }), u.offset(e.extend(M, {using: l}))
        })
    }, e.ui.position = {fit: {left: function(e, t) {
                var i, s = t.within, a = s.isWindow ? s.scrollLeft : s.offset.left, n = s.width, o = e.left - t.collisionPosition.marginLeft, h = a - o, l = o + t.collisionWidth - n - a;
                t.collisionWidth > n ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - n - a, e.left += h - i) : e.left = l > 0 && 0 >= h ? a : h > l ? a + n - t.collisionWidth : a : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = r(e.left - o, e.left)
            }, top: function(e, t) {
                var i, s = t.within, a = s.isWindow ? s.scrollTop : s.offset.top, n = t.within.height, o = e.top - t.collisionPosition.marginTop, h = a - o, l = o + t.collisionHeight - n - a;
                t.collisionHeight > n ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - n - a, e.top += h - i) : e.top = l > 0 && 0 >= h ? a : h > l ? a + n - t.collisionHeight : a : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = r(e.top - o, e.top)
            }}, flip: {left: function(e, t) {
                var i, s, a = t.within, n = a.offset.left + a.scrollLeft, r = a.width, h = a.isWindow ? a.scrollLeft : a.offset.left, l = e.left - t.collisionPosition.marginLeft, u = l - h, c = l + t.collisionWidth - r - h, d = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, f = -2 * t.offset[0];
                0 > u ? (i = e.left + d + p + f + t.collisionWidth - r - n, (0 > i || o(u) > i) && (e.left += d + p + f)) : c > 0 && (s = e.left - t.collisionPosition.marginLeft + d + p + f - h, (s > 0 || c > o(s)) && (e.left += d + p + f))
            }, top: function(e, t) {
                var i, s, a = t.within, n = a.offset.top + a.scrollTop, r = a.height, h = a.isWindow ? a.scrollTop : a.offset.top, l = e.top - t.collisionPosition.marginTop, u = l - h, c = l + t.collisionHeight - r - h, d = "top" === t.my[1], p = d ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, m = -2 * t.offset[1];
                0 > u ? (s = e.top + p + f + m + t.collisionHeight - r - n, e.top + p + f + m > u && (0 > s || o(u) > s) && (e.top += p + f + m)) : c > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h, e.top + p + f + m > c && (i > 0 || c > o(i)) && (e.top += p + f + m))
            }}, flipfit: {left: function() {
                e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
            }, top: function() {
                e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
            }}}, function() {
        var t, i, s, a, n, r = document.getElementsByTagName("body")[0], o = document.createElement("div");
        t = document.createElement(r ? "div" : "body"), s = {visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none"}, r && e.extend(s, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (n in s)
            t.style[n] = s[n];
        t.appendChild(o), i = r || document.documentElement, i.insertBefore(t, i.firstChild), o.style.cssText = "position: absolute; left: 10.7432222px;", a = e(o).offset().left, e.support.offsetFractions = a > 10 && 11 > a, t.innerHTML = "", i.removeChild(t)
    }()
})(jQuery);
(function(e) {
    e.widget("ui.draggable", e.ui.mouse, {version: "1.10.3", widgetEventPrefix: "drag", options: {addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null}, _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        }, _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        }, _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3}).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        }, _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, this.offset.scroll = !1, e.extend(this.offset, {click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        }, _mouseDrag: function(t, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var a = this._uiHash();
                if (this._trigger("drag", t, a) === !1)
                    return this._mouseUp({}), !1;
                this.position = a.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        }, _mouseStop: function(t) {
            var i = this, a = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (a = e.ui.ddmanager.drop(this, t)), this.dropped && (a = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !a || "valid" === this.options.revert && a || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, a) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", t) !== !1 && i._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1
        }, _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
        }, cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        }, _getHandle: function(t) {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        }, _createHelper: function(t) {
            var i = this.options, a = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return a.parents("body").length || a.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), a[0] === this.element[0] || /(fixed|absolute)/.test(a.css("position")) || a.css("position", "absolute"), a
        }, _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {left: +t[0], top: +t[1] || 0}), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        }, _getParentOffset: function() {
            var t = this.offsetParent.offset();
            return"absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {top: 0, left: 0}), {top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        }, _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var e = this.element.position();
                return{top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return{top: 0, left: 0}
        }, _cacheMargins: function() {
            this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
        }, _cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        }, _setContainment: function() {
            var t, i, a, s = this.options;
            return s.containment ? "window" === s.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === s.containment ? (this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : s.containment.constructor === Array ? (this.containment = s.containment, undefined) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = e(s.containment), a = i[0], a && (t = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(a.scrollWidth, a.offsetWidth) : a.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(a.scrollHeight, a.offsetHeight) : a.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined)
        }, _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var a = "absolute" === t ? 1 : -1, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {top: s.scrollTop(), left: s.scrollLeft()}), {top: i.top + this.offset.relative.top * a + this.offset.parent.top * a - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * a, left: i.left + this.offset.relative.left * a + this.offset.parent.left * a - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * a}
        }, _generatePosition: function(t) {
            var i, a, s, n, r = this.options, o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = t.pageX, h = t.pageY;
            return this.offset.scroll || (this.offset.scroll = {top: o.scrollTop(), left: o.scrollLeft()}), this.originalPosition && (this.containment && (this.relative_container ? (a = this.relative_container.offset(), i = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), r.grid && (s = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1] : s, n = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, l = i ? n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - r.grid[0] : n + r.grid[0] : n)), {top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top), left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)}
        }, _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        }, _trigger: function(t, i, a) {
            return a = a || this._uiHash(), e.ui.plugin.call(this, t, [i, a]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, i, a)
        }, plugins: {}, _uiHash: function() {
            return{helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs}
        }}), e.ui.plugin.add("draggable", "connectToSortable", {start: function(t, i) {
            var a = e(this).data("ui-draggable"), s = a.options, n = e.extend({}, i, {item: a.element});
            a.sortables = [], e(s.connectToSortable).each(function() {
                var i = e.data(this, "ui-sortable");
                i && !i.options.disabled && (a.sortables.push({instance: i, shouldRevert: i.options.revert}), i.refreshPositions(), i._trigger("activate", t, n))
            })
        }, stop: function(t, i) {
            var a = e(this).data("ui-draggable"), s = e.extend({}, i, {item: a.element});
            e.each(a.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, a.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === a.options.helper && this.instance.currentItem.css({top: "auto", left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, s))
            })
        }, drag: function(t, i) {
            var a = e(this).data("ui-draggable"), s = this;
            e.each(a.sortables, function() {
                var n = !1, r = this;
                this.instance.positionAbs = a.positionAbs, this.instance.helperProportions = a.helperProportions, this.instance.offset.click = a.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (n = !0, e.each(a.sortables, function() {
                    return this.instance.positionAbs = a.positionAbs, this.instance.helperProportions = a.helperProportions, this.instance.offset.click = a.offset.click, this !== r && this.instance._intersectsWith(this.instance.containerCache) && e.contains(r.instance.element[0], this.instance.element[0]) && (n = !1), n
                })), n ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = a.offset.click.top, this.instance.offset.click.left = a.offset.click.left, this.instance.offset.parent.left -= a.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= a.offset.parent.top - this.instance.offset.parent.top, a._trigger("toSortable", t), a.dropped = this.instance.element, a.currentItem = a.element, this.instance.fromOutside = a), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), a._trigger("fromSortable", t), a.dropped = !1)
            })
        }}), e.ui.plugin.add("draggable", "cursor", {start: function() {
            var t = e("body"), i = e(this).data("ui-draggable").options;
            t.css("cursor") && (i._cursor = t.css("cursor")), t.css("cursor", i.cursor)
        }, stop: function() {
            var t = e(this).data("ui-draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }}), e.ui.plugin.add("draggable", "opacity", {start: function(t, i) {
            var a = e(i.helper), s = e(this).data("ui-draggable").options;
            a.css("opacity") && (s._opacity = a.css("opacity")), a.css("opacity", s.opacity)
        }, stop: function(t, i) {
            var a = e(this).data("ui-draggable").options;
            a._opacity && e(i.helper).css("opacity", a._opacity)
        }}), e.ui.plugin.add("draggable", "scroll", {start: function() {
            var t = e(this).data("ui-draggable");
            t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
        }, drag: function(t) {
            var i = e(this).data("ui-draggable"), a = i.options, s = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (a.axis && "x" === a.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < a.scrollSensitivity ? i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop + a.scrollSpeed : t.pageY - i.overflowOffset.top < a.scrollSensitivity && (i.scrollParent[0].scrollTop = s = i.scrollParent[0].scrollTop - a.scrollSpeed)), a.axis && "y" === a.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < a.scrollSensitivity ? i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft + a.scrollSpeed : t.pageX - i.overflowOffset.left < a.scrollSensitivity && (i.scrollParent[0].scrollLeft = s = i.scrollParent[0].scrollLeft - a.scrollSpeed))) : (a.axis && "x" === a.axis || (t.pageY - e(document).scrollTop() < a.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - a.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < a.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + a.scrollSpeed))), a.axis && "y" === a.axis || (t.pageX - e(document).scrollLeft() < a.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - a.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < a.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + a.scrollSpeed)))), s !== !1 && e.ui.ddmanager && !a.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t)
        }}), e.ui.plugin.add("draggable", "snap", {start: function() {
            var t = e(this).data("ui-draggable"), i = t.options;
            t.snapElements = [], e(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = e(this), a = i.offset();
                this !== t.element[0] && t.snapElements.push({item: this, width: i.outerWidth(), height: i.outerHeight(), top: a.top, left: a.left})
            })
        }, drag: function(t, i) {
            var a, s, n, r, o, l, h, u, d, c, p = e(this).data("ui-draggable"), f = p.options, m = f.snapTolerance, g = i.offset.left, v = g + p.helperProportions.width, y = i.offset.top, b = y + p.helperProportions.height;
            for (d = p.snapElements.length - 1; d >= 0; d--)
                o = p.snapElements[d].left, l = o + p.snapElements[d].width, h = p.snapElements[d].top, u = h + p.snapElements[d].height, o - m > v || g > l + m || h - m > b || y > u + m || !e.contains(p.snapElements[d].item.ownerDocument, p.snapElements[d].item) ? (p.snapElements[d].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {snapItem: p.snapElements[d].item})), p.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (a = m >= Math.abs(h - b), s = m >= Math.abs(u - y), n = m >= Math.abs(o - v), r = m >= Math.abs(l - g), a && (i.position.top = p._convertPositionTo("relative", {top: h - p.helperProportions.height, left: 0}).top - p.margins.top), s && (i.position.top = p._convertPositionTo("relative", {top: u, left: 0}).top - p.margins.top), n && (i.position.left = p._convertPositionTo("relative", {top: 0, left: o - p.helperProportions.width}).left - p.margins.left), r && (i.position.left = p._convertPositionTo("relative", {top: 0, left: l}).left - p.margins.left)), c = a || s || n || r, "outer" !== f.snapMode && (a = m >= Math.abs(h - y), s = m >= Math.abs(u - b), n = m >= Math.abs(o - g), r = m >= Math.abs(l - v), a && (i.position.top = p._convertPositionTo("relative", {top: h, left: 0}).top - p.margins.top), s && (i.position.top = p._convertPositionTo("relative", {top: u - p.helperProportions.height, left: 0}).top - p.margins.top), n && (i.position.left = p._convertPositionTo("relative", {top: 0, left: o}).left - p.margins.left), r && (i.position.left = p._convertPositionTo("relative", {top: 0, left: l - p.helperProportions.width}).left - p.margins.left)), !p.snapElements[d].snapping && (a || s || n || r || c) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {snapItem: p.snapElements[d].item})), p.snapElements[d].snapping = a || s || n || r || c)
        }}), e.ui.plugin.add("draggable", "stack", {start: function() {
            var t, i = this.data("ui-draggable").options, a = e.makeArray(e(i.stack)).sort(function(t, i) {
                return(parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
            });
            a.length && (t = parseInt(e(a[0]).css("zIndex"), 10) || 0, e(a).each(function(i) {
                e(this).css("zIndex", t + i)
            }), this.css("zIndex", t + a.length))
        }}), e.ui.plugin.add("draggable", "zIndex", {start: function(t, i) {
            var a = e(i.helper), s = e(this).data("ui-draggable").options;
            a.css("zIndex") && (s._zIndex = a.css("zIndex")), a.css("zIndex", s.zIndex)
        }, stop: function(t, i) {
            var a = e(this).data("ui-draggable").options;
            a._zIndex && e(i.helper).css("zIndex", a._zIndex)
        }})
})(jQuery);
(function(e) {
    function t(e, t, i) {
        return e > t && t + i > e
    }
    e.widget("ui.droppable", {version: "1.10.3", widgetEventPrefix: "drop", options: {accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null}, _create: function() {
            var t = this.options, i = t.accept;
            this.isover = !1, this.isout = !0, this.accept = e.isFunction(i) ? i : function(e) {
                return e.is(i)
            }, this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight}, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
        }, _destroy: function() {
            for (var t = 0, i = e.ui.ddmanager.droppables[this.options.scope]; i.length > t; t++)
                i[t] === this && i.splice(t, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        }, _setOption: function(t, i) {
            "accept" === t && (this.accept = e.isFunction(i) ? i : function(e) {
                return e.is(i)
            }), e.Widget.prototype._setOption.apply(this, arguments)
        }, _activate: function(t) {
            var i = e.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i))
        }, _deactivate: function(t) {
            var i = e.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i))
        }, _over: function(t) {
            var i = e.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
        }, _out: function(t) {
            var i = e.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
        }, _drop: function(t, i) {
            var a = i || e.ui.ddmanager.current, s = !1;
            return a && (a.currentItem || a.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = e.data(this, "ui-droppable");
                return t.options.greedy && !t.options.disabled && t.options.scope === a.options.scope && t.accept.call(t.element[0], a.currentItem || a.element) && e.ui.intersect(a, e.extend(t, {offset: t.element.offset()}), t.options.tolerance) ? (s = !0, !1) : undefined
            }), s ? !1 : this.accept.call(this.element[0], a.currentItem || a.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(a)), this.element) : !1) : !1
        }, ui: function(e) {
            return{draggable: e.currentItem || e.element, helper: e.helper, position: e.position, offset: e.positionAbs}
        }}), e.ui.intersect = function(e, i, a) {
        if (!i.offset)
            return!1;
        var s, n, r = (e.positionAbs || e.position.absolute).left, o = r + e.helperProportions.width, l = (e.positionAbs || e.position.absolute).top, h = l + e.helperProportions.height, u = i.offset.left, d = u + i.proportions.width, c = i.offset.top, p = c + i.proportions.height;
        switch (a) {
            case"fit":
                return r >= u && d >= o && l >= c && p >= h;
            case"intersect":
                return r + e.helperProportions.width / 2 > u && d > o - e.helperProportions.width / 2 && l + e.helperProportions.height / 2 > c && p > h - e.helperProportions.height / 2;
            case"pointer":
                return s = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left, n = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top, t(n, c, i.proportions.height) && t(s, u, i.proportions.width);
            case"touch":
                return(l >= c && p >= l || h >= c && p >= h || c > l && h > p) && (r >= u && d >= r || o >= u && d >= o || u > r && o > d);
            default:
                return!1
            }
    }, e.ui.ddmanager = {current: null, droppables: {"default": []}, prepareOffsets: function(t, i) {
            var a, s, n = e.ui.ddmanager.droppables[t.options.scope] || [], r = i ? i.type : null, o = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            e:for (a = 0; n.length > a; a++)
                if (!(n[a].options.disabled || t && !n[a].accept.call(n[a].element[0], t.currentItem || t.element))) {
                    for (s = 0; o.length > s; s++)
                        if (o[s] === n[a].element[0]) {
                            n[a].proportions.height = 0;
                            continue e
                        }
                    n[a].visible = "none" !== n[a].element.css("display"), n[a].visible && ("mousedown" === r && n[a]._activate.call(n[a], i), n[a].offset = n[a].element.offset(), n[a].proportions = {width: n[a].element[0].offsetWidth, height: n[a].element[0].offsetHeight})
                }
        }, drop: function(t, i) {
            var a = !1;
            return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (a = this._drop.call(this, i) || a), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), a
        }, dragStart: function(t, i) {
            t.element.parentsUntil("body").bind("scroll.droppable", function() {
                t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
            })
        }, drag: function(t, i) {
            t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var a, s, n, r = e.ui.intersect(t, this, this.options.tolerance), o = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                    o && (this.options.greedy && (s = this.options.scope, n = this.element.parents(":data(ui-droppable)").filter(function() {
                        return e.data(this, "ui-droppable").options.scope === s
                    }), n.length && (a = e.data(n[0], "ui-droppable"), a.greedyChild = "isover" === o)), a && "isover" === o && (a.isover = !1, a.isout = !0, a._out.call(a, i)), this[o] = !0, this["isout" === o ? "isover" : "isout"] = !1, this["isover" === o ? "_over" : "_out"].call(this, i), a && "isout" === o && (a.isout = !1, a.isover = !0, a._over.call(a, i)))
                }
            })
        }, dragStop: function(t, i) {
            t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
        }}
})(jQuery);
(function(e) {
    function t(e) {
        return parseInt(e, 10) || 0
    }
    function i(e) {
        return!isNaN(parseInt(e, 10))
    }
    e.widget("ui.resizable", e.ui.mouse, {version: "1.10.3", widgetEventPrefix: "resize", options: {alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null}, _create: function() {
            var t, i, s, a, n, r = this, o = this.options;
            if (this.element.addClass("ui-resizable"), e.extend(this, {_aspectRatio: !!o.aspectRatio, aspectRatio: o.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left")})), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position: "static", zoom: 1, display: "block"})), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = o.handles || (e(".ui-resizable-handle", this.element).length ? {n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw"} : "e,s,se"), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++)
                    s = e.trim(t[i]), n = "ui-resizable-" + s, a = e("<div class='ui-resizable-handle " + n + "'></div>"), a.css({zIndex: o.zIndex}), "se" === s && a.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(a);
            this._renderAxis = function(t) {
                var i, s, a, n;
                t = t || this.element;
                for (i in this.handles)
                    this.handles[i].constructor === String && (this.handles[i] = e(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = e(this.handles[i], this.element), n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), a = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(a, n), this._proportionallyResize()), e(this.handles[i]).length
            }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                r.resizing || (this.className && (a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = a && a[1] ? a[1] : "se")
            }), o.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                o.disabled || (e(this).removeClass("ui-resizable-autohide"), r._handles.show())
            }).mouseleave(function() {
                o.disabled || r.resizing || (e(this).addClass("ui-resizable-autohide"), r._handles.hide())
            })), this._mouseInit()
        }, _destroy: function() {
            this._mouseDestroy();
            var t, i = function(t) {
                e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({position: t.css("position"), width: t.outerWidth(), height: t.outerHeight(), top: t.css("top"), left: t.css("left")}).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        }, _mouseCapture: function(t) {
            var i, s, a = !1;
            for (i in this.handles)
                s = e(this.handles[i])[0], (s === t.target || e.contains(s, t.target)) && (a = !0);
            return!this.options.disabled && a
        }, _mouseStart: function(i) {
            var s, a, n, r = this.options, o = this.element.position(), h = this.element;
            return this.resizing = !0, /absolute/.test(h.css("position")) ? h.css({position: "absolute", top: h.css("top"), left: h.css("left")}) : h.is(".ui-draggable") && h.css({position: "absolute", top: o.top, left: o.left}), this._renderProxy(), s = t(this.helper.css("left")), a = t(this.helper.css("top")), r.containment && (s += e(r.containment).scrollLeft() || 0, a += e(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left: s, top: a}, this.size = this._helper ? {width: h.outerWidth(), height: h.outerHeight()} : {width: h.width(), height: h.height()}, this.originalSize = this._helper ? {width: h.outerWidth(), height: h.outerHeight()} : {width: h.width(), height: h.height()}, this.originalPosition = {left: s, top: a}, this.sizeDiff = {width: h.outerWidth() - h.width(), height: h.outerHeight() - h.height()}, this.originalMousePosition = {left: i.pageX, top: i.pageY}, this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), h.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
        }, _mouseDrag: function(t) {
            var i, s = this.helper, a = {}, n = this.originalMousePosition, r = this.axis, o = this.position.top, h = this.position.left, l = this.size.width, u = this.size.height, c = t.pageX - n.left || 0, d = t.pageY - n.top || 0, p = this._change[r];
            return p ? (i = p.apply(this, [t, c, d]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), this.position.top !== o && (a.top = this.position.top + "px"), this.position.left !== h && (a.left = this.position.left + "px"), this.size.width !== l && (a.width = this.size.width + "px"), this.size.height !== u && (a.height = this.size.height + "px"), s.css(a), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(a) || this._trigger("resize", t, this.ui()), !1) : !1
        }, _mouseStop: function(t) {
            this.resizing = !1;
            var i, s, a, n, r, o, h, l = this.options, u = this;
            return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), a = s && e.ui.hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, n = s ? 0 : u.sizeDiff.width, r = {width: u.helper.width() - n, height: u.helper.height() - a}, o = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(r, {top: h, left: o})), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
        }, _updateVirtualBoundaries: function(e) {
            var t, s, a, n, r, o = this.options;
            r = {minWidth: i(o.minWidth) ? o.minWidth : 0, maxWidth: i(o.maxWidth) ? o.maxWidth : 1 / 0, minHeight: i(o.minHeight) ? o.minHeight : 0, maxHeight: i(o.maxHeight) ? o.maxHeight : 1 / 0}, (this._aspectRatio || e) && (t = r.minHeight * this.aspectRatio, a = r.minWidth / this.aspectRatio, s = r.maxHeight * this.aspectRatio, n = r.maxWidth / this.aspectRatio, t > r.minWidth && (r.minWidth = t), a > r.minHeight && (r.minHeight = a), r.maxWidth > s && (r.maxWidth = s), r.maxHeight > n && (r.maxHeight = n)), this._vBoundaries = r
        }, _updateCache: function(e) {
            this.offset = this.helper.offset(), i(e.left) && (this.position.left = e.left), i(e.top) && (this.position.top = e.top), i(e.height) && (this.size.height = e.height), i(e.width) && (this.size.width = e.width)
        }, _updateRatio: function(e) {
            var t = this.position, s = this.size, a = this.axis;
            return i(e.height) ? e.width = e.height * this.aspectRatio : i(e.width) && (e.height = e.width / this.aspectRatio), "sw" === a && (e.left = t.left + (s.width - e.width), e.top = null), "nw" === a && (e.top = t.top + (s.height - e.height), e.left = t.left + (s.width - e.width)), e
        }, _respectSize: function(e) {
            var t = this._vBoundaries, s = this.axis, a = i(e.width) && t.maxWidth && t.maxWidth < e.width, n = i(e.height) && t.maxHeight && t.maxHeight < e.height, r = i(e.width) && t.minWidth && t.minWidth > e.width, o = i(e.height) && t.minHeight && t.minHeight > e.height, h = this.originalPosition.left + this.originalSize.width, l = this.position.top + this.size.height, u = /sw|nw|w/.test(s), c = /nw|ne|n/.test(s);
            return r && (e.width = t.minWidth), o && (e.height = t.minHeight), a && (e.width = t.maxWidth), n && (e.height = t.maxHeight), r && u && (e.left = h - t.minWidth), a && u && (e.left = h - t.maxWidth), o && c && (e.top = l - t.minHeight), n && c && (e.top = l - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
        }, _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var e, t, i, s, a, n = this.helper || this.element;
                for (e = 0; this._proportionallyResizeElements.length > e; e++) {
                    if (a = this._proportionallyResizeElements[e], !this.borderDif)
                        for (this.borderDif = [], i = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], s = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")], t = 0; i.length > t; t++)
                            this.borderDif[t] = (parseInt(i[t], 10) || 0) + (parseInt(s[t], 10) || 0);
                    a.css({height: n.height() - this.borderDif[0] - this.borderDif[2] || 0, width: n.width() - this.borderDif[1] - this.borderDif[3] || 0})
                }
            }
        }, _renderProxy: function() {
            var t = this.element, i = this.options;
            this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({width: this.element.outerWidth() - 1, height: this.element.outerHeight() - 1, position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        }, _change: {e: function(e, t) {
                return{width: this.originalSize.width + t}
            }, w: function(e, t) {
                var i = this.originalSize, s = this.originalPosition;
                return{left: s.left + t, width: i.width - t}
            }, n: function(e, t, i) {
                var s = this.originalSize, a = this.originalPosition;
                return{top: a.top + i, height: s.height - i}
            }, s: function(e, t, i) {
                return{height: this.originalSize.height + i}
            }, se: function(t, i, s) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
            }, sw: function(t, i, s) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
            }, ne: function(t, i, s) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
            }, nw: function(t, i, s) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
            }}, _propagate: function(t, i) {
            e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui())
        }, plugins: {}, ui: function() {
            return{originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition}
        }}), e.ui.plugin.add("resizable", "animate", {stop: function(t) {
            var i = e(this).data("ui-resizable"), s = i.options, a = i._proportionallyResizeElements, n = a.length && /textarea/i.test(a[0].nodeName), r = n && e.ui.hasScroll(a[0], "left") ? 0 : i.sizeDiff.height, o = n ? 0 : i.sizeDiff.width, h = {width: i.size.width - o, height: i.size.height - r}, l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(e.extend(h, u && l ? {top: u, left: l} : {}), {duration: s.animateDuration, easing: s.animateEasing, step: function() {
                    var s = {width: parseInt(i.element.css("width"), 10), height: parseInt(i.element.css("height"), 10), top: parseInt(i.element.css("top"), 10), left: parseInt(i.element.css("left"), 10)};
                    a && a.length && e(a[0]).css({width: s.width, height: s.height}), i._updateCache(s), i._propagate("resize", t)
                }})
        }}), e.ui.plugin.add("resizable", "containment", {start: function() {
            var i, s, a, n, r, o, h, l = e(this).data("ui-resizable"), u = l.options, c = l.element, d = u.containment, p = d instanceof e ? d.get(0) : /parent/.test(d) ? c.parent().get(0) : d;
            p && (l.containerElement = e(p), /document/.test(d) || d === document ? (l.containerOffset = {left: 0, top: 0}, l.containerPosition = {left: 0, top: 0}, l.parentData = {element: e(document), left: 0, top: 0, width: e(document).width(), height: e(document).height() || document.body.parentNode.scrollHeight}) : (i = e(p), s = [], e(["Top", "Right", "Left", "Bottom"]).each(function(e, a) {
                s[e] = t(i.css("padding" + a))
            }), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {height: i.innerHeight() - s[3], width: i.innerWidth() - s[1]}, a = l.containerOffset, n = l.containerSize.height, r = l.containerSize.width, o = e.ui.hasScroll(p, "left") ? p.scrollWidth : r, h = e.ui.hasScroll(p) ? p.scrollHeight : n, l.parentData = {element: p, left: a.left, top: a.top, width: o, height: h}))
        }, resize: function(t) {
            var i, s, a, n, r = e(this).data("ui-resizable"), o = r.options, h = r.containerOffset, l = r.position, u = r._aspectRatio || t.shiftKey, c = {top: 0, left: 0}, d = r.containerElement;
            d[0] !== document && /static/.test(d.css("position")) && (c = h), l.left < (r._helper ? h.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - h.left : r.position.left - c.left), u && (r.size.height = r.size.width / r.aspectRatio), r.position.left = o.helper ? h.left : 0), l.top < (r._helper ? h.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - h.top : r.position.top), u && (r.size.width = r.size.height * r.aspectRatio), r.position.top = r._helper ? h.top : 0), r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top, i = Math.abs((r._helper ? r.offset.left - c.left : r.offset.left - c.left) + r.sizeDiff.width), s = Math.abs((r._helper ? r.offset.top - c.top : r.offset.top - h.top) + r.sizeDiff.height), a = r.containerElement.get(0) === r.element.parent().get(0), n = /relative|absolute/.test(r.containerElement.css("position")), a && n && (i -= r.parentData.left), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, u && (r.size.height = r.size.width / r.aspectRatio)), s + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - s, u && (r.size.width = r.size.height * r.aspectRatio))
        }, stop: function() {
            var t = e(this).data("ui-resizable"), i = t.options, s = t.containerOffset, a = t.containerPosition, n = t.containerElement, r = e(t.helper), o = r.offset(), h = r.outerWidth() - t.sizeDiff.width, l = r.outerHeight() - t.sizeDiff.height;
            t._helper && !i.animate && /relative/.test(n.css("position")) && e(this).css({left: o.left - a.left - s.left, width: h, height: l}), t._helper && !i.animate && /static/.test(n.css("position")) && e(this).css({left: o.left - a.left - s.left, width: h, height: l})
        }}), e.ui.plugin.add("resizable", "alsoResize", {start: function() {
            var t = e(this).data("ui-resizable"), i = t.options, s = function(t) {
                e(t).each(function() {
                    var t = e(this);
                    t.data("ui-resizable-alsoresize", {width: parseInt(t.width(), 10), height: parseInt(t.height(), 10), left: parseInt(t.css("left"), 10), top: parseInt(t.css("top"), 10)})
                })
            };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : e.each(i.alsoResize, function(e) {
                s(e)
            })
        }, resize: function(t, i) {
            var s = e(this).data("ui-resizable"), a = s.options, n = s.originalSize, r = s.originalPosition, o = {height: s.size.height - n.height || 0, width: s.size.width - n.width || 0, top: s.position.top - r.top || 0, left: s.position.left - r.left || 0}, h = function(t, s) {
                e(t).each(function() {
                    var t = e(this), a = e(this).data("ui-resizable-alsoresize"), n = {}, r = s && s.length ? s : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    e.each(r, function(e, t) {
                        var i = (a[t] || 0) + (o[t] || 0);
                        i && i >= 0 && (n[t] = i || null)
                    }), t.css(n)
                })
            };
            "object" != typeof a.alsoResize || a.alsoResize.nodeType ? h(a.alsoResize) : e.each(a.alsoResize, function(e, t) {
                h(e, t)
            })
        }, stop: function() {
            e(this).removeData("resizable-alsoresize")
        }}), e.ui.plugin.add("resizable", "ghost", {start: function() {
            var t = e(this).data("ui-resizable"), i = t.options, s = t.size;
            t.ghost = t.originalElement.clone(), t.ghost.css({opacity: .25, display: "block", position: "relative", height: s.height, width: s.width, margin: 0, left: 0, top: 0}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper)
        }, resize: function() {
            var t = e(this).data("ui-resizable");
            t.ghost && t.ghost.css({position: "relative", height: t.size.height, width: t.size.width})
        }, stop: function() {
            var t = e(this).data("ui-resizable");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }}), e.ui.plugin.add("resizable", "grid", {resize: function() {
            var t = e(this).data("ui-resizable"), i = t.options, s = t.size, a = t.originalSize, n = t.originalPosition, r = t.axis, o = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid, h = o[0] || 1, l = o[1] || 1, u = Math.round((s.width - a.width) / h) * h, c = Math.round((s.height - a.height) / l) * l, d = a.width + u, p = a.height + c, f = i.maxWidth && d > i.maxWidth, m = i.maxHeight && p > i.maxHeight, g = i.minWidth && i.minWidth > d, v = i.minHeight && i.minHeight > p;
            i.grid = o, g && (d += h), v && (p += l), f && (d -= h), m && (p -= l), /^(se|s|e)$/.test(r) ? (t.size.width = d, t.size.height = p) : /^(ne)$/.test(r) ? (t.size.width = d, t.size.height = p, t.position.top = n.top - c) : /^(sw)$/.test(r) ? (t.size.width = d, t.size.height = p, t.position.left = n.left - u) : (t.size.width = d, t.size.height = p, t.position.top = n.top - c, t.position.left = n.left - u)
        }})
})(jQuery);
(function(e) {
    e.widget("ui.selectable", e.ui.mouse, {version: "1.10.3", options: {appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null}, _create: function() {
            var t, i = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                t = e(i.options.filter, i.element[0]), t.addClass("ui-selectee"), t.each(function() {
                    var t = e(this), i = t.offset();
                    e.data(this, "selectable-item", {element: this, $element: t, left: i.left, top: i.top, right: i.left + t.outerWidth(), bottom: i.top + t.outerHeight(), startselected: !1, selected: t.hasClass("ui-selected"), selecting: t.hasClass("ui-selecting"), unselecting: t.hasClass("ui-unselecting")})
                })
            }, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
        }, _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        }, _mouseStart: function(t) {
            var i = this, s = this.options;
            this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(s.filter, this.element[0]), this._trigger("start", t), e(s.appendTo).append(this.helper), this.helper.css({left: t.pageX, top: t.pageY, width: 0, height: 0}), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var s = e.data(this, "selectable-item");
                s.startselected = !0, t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", t, {unselecting: s.element}))
            }), e(t.target).parents().addBack().each(function() {
                var s, a = e.data(this, "selectable-item");
                return a ? (s = !t.metaKey && !t.ctrlKey || !a.$element.hasClass("ui-selected"), a.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), a.unselecting = !s, a.selecting = s, a.selected = s, s ? i._trigger("selecting", t, {selecting: a.element}) : i._trigger("unselecting", t, {unselecting: a.element}), !1) : undefined
            }))
        }, _mouseDrag: function(t) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, s = this, a = this.options, n = this.opos[0], r = this.opos[1], o = t.pageX, h = t.pageY;
                return n > o && (i = o, o = n, n = i), r > h && (i = h, h = r, r = i), this.helper.css({left: n, top: r, width: o - n, height: h - r}), this.selectees.each(function() {
                    var i = e.data(this, "selectable-item"), l = !1;
                    i && i.element !== s.element[0] && ("touch" === a.tolerance ? l = !(i.left > o || n > i.right || i.top > h || r > i.bottom) : "fit" === a.tolerance && (l = i.left > n && o > i.right && i.top > r && h > i.bottom), l ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", t, {selecting: i.element}))) : (i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", t, {unselecting: i.element}))), i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", t, {unselecting: i.element})))))
                }), !1
            }
        }, _mouseStop: function(t) {
            var i = this;
            return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function() {
                var s = e.data(this, "selectable-item");
                s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", t, {unselected: s.element})
            }), e(".ui-selecting", this.element[0]).each(function() {
                var s = e.data(this, "selectable-item");
                s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", t, {selected: s.element})
            }), this._trigger("stop", t), this.helper.remove(), !1
        }})
})(jQuery);
(function(e) {
    function t(e, t, i) {
        return e > t && t + i > e
    }
    function i(e) {
        return/left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
    }
    e.widget("ui.sortable", e.ui.mouse, {version: "1.10.3", widgetEventPrefix: "sort", ready: !1, options: {appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null}, _create: function() {
            var e = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === e.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        }, _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var e = this.items.length - 1; e >= 0; e--)
                this.items[e].item.removeData(this.widgetName + "-item");
            return this
        }, _setOption: function(t, i) {
            "disabled" === t ? (this.options[t] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : e.Widget.prototype._setOption.apply(this, arguments)
        }, _mouseCapture: function(t, i) {
            var s = null, a = !1, n = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function() {
                return e.data(this, n.widgetName + "-item") === n ? (s = e(this), !1) : undefined
            }), e.data(t.target, n.widgetName + "-item") === n && (s = e(t.target)), s ? !this.options.handle || i || (e(this.options.handle, s).find("*").addBack().each(function() {
                this === t.target && (a = !0)
            }), a) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
        }, _mouseStart: function(t, i, s) {
            var a, n, r = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, e.extend(this.offset, {click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (n = this.document.find("body"), this.storedCursor = n.css("cursor"), n.css("cursor", r.cursor), this.storedStylesheet = e("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(n)), r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                for (a = this.containers.length - 1; a >= 0; a--)
                    this.containers[a]._trigger("activate", t, this._uiHash(this));
            return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
        }, _mouseDrag: function(t) {
            var i, s, a, n, r = this.options, o = !1;
            for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName?(this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity?this.scrollParent[0].scrollTop = o = this.scrollParent[0].scrollTop + r.scrollSpeed:t.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = o = this.scrollParent[0].scrollTop - r.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity?this.scrollParent[0].scrollLeft = o = this.scrollParent[0].scrollLeft + r.scrollSpeed:t.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = o = this.scrollParent[0].scrollLeft - r.scrollSpeed)):(t.pageY - e(document).scrollTop() < r.scrollSensitivity?o = e(document).scrollTop(e(document).scrollTop() - r.scrollSpeed):e(window).height() - (t.pageY - e(document).scrollTop()) < r.scrollSensitivity && (o = e(document).scrollTop(e(document).scrollTop() + r.scrollSpeed)), t.pageX - e(document).scrollLeft() < r.scrollSensitivity?o = e(document).scrollLeft(e(document).scrollLeft() - r.scrollSpeed):e(window).width() - (t.pageX - e(document).scrollLeft()) < r.scrollSensitivity && (o = e(document).scrollLeft(e(document).scrollLeft() + r.scrollSpeed))), o !== !1 && e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                if (s = this.items[i], a = s.item[0], n = this._intersectsWithPointer(s), n && s.instance === this.currentContainer && a !== this.currentItem[0] && this.placeholder[1 === n ? "next" : "prev"]()[0] !== a && !e.contains(this.placeholder[0], a) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], a) : !0)) {
                    if (this.direction = 1 === n ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s))
                        break;
                    this._rearrange(t, s), this._trigger("change", t, this._uiHash());
                    break
                }
            return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        }, _mouseStop: function(t, i) {
            if (t) {
                if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
                    var s = this, a = this.placeholder.offset(), n = this.options.axis, r = {};
                    n && "x" !== n || (r.left = a.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), n && "y" !== n || (r.top = a.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                        s._clear(t)
                    })
                } else
                    this._clear(t, i);
                return!1
            }
        }, cancel: function() {
            if (this.dragging) {
                this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--)
                    this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {helper: null, dragging: !1, reverting: !1, _noFinalSort: null}), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
        }, serialize: function(t) {
            var i = this._getItemsAsjQuery(t && t.connected), s = [];
            return t = t || {}, e(i).each(function() {
                var i = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                i && s.push((t.key || i[1] + "[]") + "=" + (t.key && t.expression ? i[1] : i[2]))
            }), !s.length && t.key && s.push(t.key + "="), s.join("&")
        }, toArray: function(t) {
            var i = this._getItemsAsjQuery(t && t.connected), s = [];
            return t = t || {}, i.each(function() {
                s.push(e(t.item || this).attr(t.attribute || "id") || "")
            }), s
        }, _intersectsWith: function(e) {
            var t = this.positionAbs.left, i = t + this.helperProportions.width, s = this.positionAbs.top, a = s + this.helperProportions.height, n = e.left, r = n + e.width, o = e.top, h = o + e.height, l = this.offset.click.top, u = this.offset.click.left, c = "x" === this.options.axis || s + l > o && h > s + l, d = "y" === this.options.axis || t + u > n && r > t + u, p = c && d;
            return"pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? p : t + this.helperProportions.width / 2 > n && r > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > o && h > a - this.helperProportions.height / 2
        }, _intersectsWithPointer: function(e) {
            var i = "x" === this.options.axis || t(this.positionAbs.top + this.offset.click.top, e.top, e.height), s = "y" === this.options.axis || t(this.positionAbs.left + this.offset.click.left, e.left, e.width), a = i && s, n = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
            return a ? this.floating ? r && "right" === r || "down" === n ? 2 : 1 : n && ("down" === n ? 2 : 1) : !1
        }, _intersectsWithSides: function(e) {
            var i = t(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height), s = t(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width), a = this._getDragVerticalDirection(), n = this._getDragHorizontalDirection();
            return this.floating && n ? "right" === n && s || "left" === n && !s : a && ("down" === a && i || "up" === a && !i)
        }, _getDragVerticalDirection: function() {
            var e = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== e && (e > 0 ? "down" : "up")
        }, _getDragHorizontalDirection: function() {
            var e = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== e && (e > 0 ? "right" : "left")
        }, refresh: function(e) {
            return this._refreshItems(e), this.refreshPositions(), this
        }, _connectWith: function() {
            var e = this.options;
            return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
        }, _getItemsAsjQuery: function(t) {
            var i, s, a, n, r = [], o = [], h = this._connectWith();
            if (h && t)
                for (i = h.length - 1; i >= 0; i--)
                    for (a = e(h[i]), s = a.length - 1; s >= 0; s--)
                        n = e.data(a[s], this.widgetFullName), n && n !== this && !n.options.disabled && o.push([e.isFunction(n.options.items) ? n.options.items.call(n.element) : e(n.options.items, n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), n]);
            for (o.push([e.isFunction(this.options.items)?this.options.items.call(this.element, null, {options:this.options, item:this.currentItem}):e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = o.length - 1; i >= 0; i--)
                o[i][0].each(function() {
                    r.push(this)
                });
            return e(r)
        }, _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = e.grep(this.items, function(e) {
                for (var i = 0; t.length > i; i++)
                    if (t[i] === e.item[0])
                        return!1;
                return!0
            })
        }, _refreshItems: function(t) {
            this.items = [], this.containers = [this];
            var i, s, a, n, r, o, h, l, u = this.items, c = [[e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {item: this.currentItem}) : e(this.options.items, this.element), this]], d = this._connectWith();
            if (d && this.ready)
                for (i = d.length - 1; i >= 0; i--)
                    for (a = e(d[i]), s = a.length - 1; s >= 0; s--)
                        n = e.data(a[s], this.widgetFullName), n && n !== this && !n.options.disabled && (c.push([e.isFunction(n.options.items) ? n.options.items.call(n.element[0], t, {item: this.currentItem}) : e(n.options.items, n.element), n]), this.containers.push(n));
            for (i = c.length - 1; i >= 0; i--)
                for (r = c[i][1], o = c[i][0], s = 0, l = o.length; l > s; s++)
                    h = e(o[s]), h.data(this.widgetName + "-item", r), u.push({item: h, instance: r, width: 0, height: 0, left: 0, top: 0})
        }, refreshPositions: function(t) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, a, n;
            for (i = this.items.length - 1; i >= 0; i--)
                s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (a = this.options.toleranceElement ? e(this.options.toleranceElement, s.item) : s.item, t || (s.width = a.outerWidth(), s.height = a.outerHeight()), n = a.offset(), s.left = n.left, s.top = n.top);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--)
                    n = this.containers[i].element.offset(), this.containers[i].containerCache.left = n.left, this.containers[i].containerCache.top = n.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        }, _createPlaceholder: function(t) {
            t = t || this;
            var i, s = t.options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {element: function() {
                    var s = t.currentItem[0].nodeName.toLowerCase(), a = e("<" + s + ">", t.document[0]).addClass(i || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return"tr" === s ? t.currentItem.children().each(function() {
                        e("<td>&#160;</td>", t.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(a)
                    }) : "img" === s && a.attr("src", t.currentItem.attr("src")), i || a.css("visibility", "hidden"), a
                }, update: function(e, a) {
                    (!i || s.forcePlaceholderSize) && (a.height() || a.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), a.width() || a.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                }}), t.placeholder = e(s.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), s.placeholder.update(t, t.placeholder)
        }, _contactContainers: function(s) {
            var a, n, r, o, h, l, u, c, d, p, f = null, m = null;
            for (a = this.containers.length - 1; a >= 0; a--)
                if (!e.contains(this.currentItem[0], this.containers[a].element[0]))
                    if (this._intersectsWith(this.containers[a].containerCache)) {
                        if (f && e.contains(this.containers[a].element[0], f.element[0]))
                            continue;
                        f = this.containers[a], m = a
                    } else
                        this.containers[a].containerCache.over && (this.containers[a]._trigger("out", s, this._uiHash(this)), this.containers[a].containerCache.over = 0);
            if (f)
                if (1 === this.containers.length)
                    this.containers[m].containerCache.over || (this.containers[m]._trigger("over", s, this._uiHash(this)), this.containers[m].containerCache.over = 1);
                else {
                    for (r = 1e4, o = null, p = f.floating || i(this.currentItem), h = p?"left":"top", l = p?"width":"height", u = this.positionAbs[h] + this.offset.click[h], n = this.items.length - 1; n >= 0; n--)
                        e.contains(this.containers[m].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (!p || t(this.positionAbs.top + this.offset.click.top, this.items[n].top, this.items[n].height)) && (c = this.items[n].item.offset()[h], d = !1, Math.abs(c - u) > Math.abs(c + this.items[n][l] - u) && (d = !0, c += this.items[n][l]), r > Math.abs(c - u) && (r = Math.abs(c - u), o = this.items[n], this.direction = d ? "up" : "down"));
                    if (!o && !this.options.dropOnEmpty)
                        return;
                    if (this.currentContainer === this.containers[m])
                        return;
                    o ? this._rearrange(s, o, null, !0) : this._rearrange(s, null, this.containers[m].element, !0), this._trigger("change", s, this._uiHash()), this.containers[m]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", s, this._uiHash(this)), this.containers[m].containerCache.over = 1
                }
        }, _createHelper: function(t) {
            var i = this.options, s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || e("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left")}), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
        }, _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {left: +t[0], top: +t[1] || 0}), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        }, _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return"absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {top: 0, left: 0}), {top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        }, _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var e = this.currentItem.position();
                return{top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return{top: 0, left: 0}
        }, _cacheMargins: function() {
            this.margins = {left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0}
        }, _cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        }, _setContainment: function() {
            var t, i, s, a = this.options;
            "parent" === a.containment && (a.containment = this.helper[0].parentNode), ("document" === a.containment || "window" === a.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e("document" === a.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (e("document" === a.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(a.containment) || (t = e(a.containment)[0], i = e(a.containment).offset(), s = "hidden" !== e(t).css("overflow"), this.containment = [i.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        }, _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var s = "absolute" === t ? 1 : -1, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, n = /(html|body)/i.test(a[0].tagName);
            return{top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : a.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : a.scrollLeft()) * s}
        }, _generatePosition: function(t) {
            var i, s, a = this.options, n = t.pageX, r = t.pageY, o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(o[0].tagName);
            return"relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (n = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (n = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), a.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / a.grid[1]) * a.grid[1], r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - a.grid[1] : i + a.grid[1] : i, s = this.originalPageX + Math.round((n - this.originalPageX) / a.grid[0]) * a.grid[0], n = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - a.grid[0] : s + a.grid[0] : s)), {top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : o.scrollTop()), left: n - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : o.scrollLeft())}
        }, _rearrange: function(e, t, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var a = this.counter;
            this._delay(function() {
                a === this.counter && this.refreshPositions(!s)
            })
        }, _clear: function(e, t) {
            this.reverting = !1;
            var i, s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)
                    ("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else
                this.currentItem.show();
            for (this.fromOutside && !t && s.push(function(e) {
                this._trigger("receive", e, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || s.push(function(e) {
                this._trigger("update", e, this._uiHash())
            }), this !== this.currentContainer && (t || (s.push(function(e) {
                this._trigger("remove", e, this._uiHash())
            }), s.push(function(e) {
                return function(t) {
                    e._trigger("receive", t, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), s.push(function(e) {
                return function(t) {
                    e._trigger("update", t, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--)
                t || s.push(function(e) {
                    return function(t) {
                        e._trigger("deactivate", t, this._uiHash(this))
                    }
                }.call(this, this.containers[i])), this.containers[i].containerCache.over && (s.push(function(e) {
                    return function(t) {
                        e._trigger("out", t, this._uiHash(this))
                    }
                }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!t) {
                    for (this._trigger("beforeStop", e, this._uiHash()), i = 0; s.length > i; i++)
                        s[i].call(this, e);
                    this._trigger("stop", e, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !t) {
                for (i = 0; s.length > i; i++)
                    s[i].call(this, e);
                this._trigger("stop", e, this._uiHash())
            }
            return this.fromOutside = !1, !0
        }, _trigger: function() {
            e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        }, _uiHash: function(t) {
            var i = t || this;
            return{helper: i.helper, placeholder: i.placeholder || e([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: t ? t.element : null}
        }})
})(jQuery);
(function(e) {
    var t = 5;
    e.widget("ui.slider", e.ui.mouse, {version: "1.10.3", widgetEventPrefix: "slide", options: {animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null}, _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        }, _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        }, _createHandles: function() {
            var t, i, s = this.options, a = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), n = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", r = [];
            for (i = s.values && s.values.length || 1, a.length > i && (a.slice(i).remove(), a = a.slice(0, i)), t = a.length; i > t; t++)
                r.push(n);
            this.handles = a.add(e(r.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t) {
                e(this).data("ui-slider-handle-index", t)
            })
        }, _createRange: function() {
            var t = this.options, i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left: "", bottom: ""}) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : this.range = e([])
        }, _setupEvents: function() {
            var e = this.handles.add(this.range).filter("a");
            this._off(e), this._on(e, this._handleEvents), this._hoverable(e), this._focusable(e)
        }, _destroy: function() {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        }, _mouseCapture: function(t) {
            var i, s, a, n, r, o, h, l, u = this, c = this.options;
            return c.disabled ? !1 : (this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()}, this.elementOffset = this.element.offset(), i = {x: t.pageX, y: t.pageY}, s = this._normValueFromMouse(i), a = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var i = Math.abs(s - u.values(t));
                (a > i || a === i && (t === u._lastChangedValue || u.values(t) === c.min)) && (a = i, n = e(this), r = t)
            }), o = this._start(t, r), o === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = r, n.addClass("ui-state-active").focus(), h = n.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {left: 0, top: 0} : {left: t.pageX - h.left - n.width() / 2, top: t.pageY - h.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0)}, this.handles.hasClass("ui-state-hover") || this._slide(t, r, s), this._animateOff = !0, !0))
        }, _mouseStart: function() {
            return!0
        }, _mouseDrag: function(e) {
            var t = {x: e.pageX, y: e.pageY}, i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        }, _mouseStop: function(e) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        }, _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        }, _normValueFromMouse: function(e) {
            var t, i, s, a, n;
            return"horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), a = this._valueMax() - this._valueMin(), n = this._valueMin() + s * a, this._trimAlignValue(n)
        }, _start: function(e, t) {
            var i = {handle: this.handles[t], value: this.value()};
            return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
        }, _slide: function(e, t, i) {
            var s, a, n;
            this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (a = this.values(), a[t] = i, n = this._trigger("slide", e, {handle: this.handles[t], value: i, values: a}), s = this.values(t ? 0 : 1), n !== !1 && this.values(t, i, !0))) : i !== this.value() && (n = this._trigger("slide", e, {handle: this.handles[t], value: i}), n !== !1 && this.value(i))
        }, _stop: function(e, t) {
            var i = {handle: this.handles[t], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        }, _change: function(e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {handle: this.handles[t], value: this.value()};
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
            }
        }, value: function(e) {
            return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), undefined) : this._value()
        }, values: function(t, i) {
            var s, a, n;
            if (arguments.length > 1)
                return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), undefined;
            if (!arguments.length)
                return this._values();
            if (!e.isArray(arguments[0]))
                return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (s = this.options.values, a = arguments[0], n = 0; s.length > n; n += 1)
                s[n] = this._trimAlignValue(a[n]), this._change(null, n);
            this._refreshValue()
        }, _setOption: function(t, i) {
            var s, a = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (a = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments), t) {
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; a > s; s += 1)
                        this._change(null, s);
                    this._animateOff = !1;
                    break;
                case"min":
                case"max":
                    this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                    break;
                case"range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
        }, _value: function() {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        }, _values: function(e) {
            var t, i, s;
            if (arguments.length)
                return t = this.options.values[e], t = this._trimAlignValue(t);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
                    i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return[]
        }, _trimAlignValue: function(e) {
            if (this._valueMin() >= e)
                return this._valueMin();
            if (e >= this._valueMax())
                return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1, i = (e - this._valueMin()) % t, s = e - i;
            return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
        }, _valueMin: function() {
            return this.options.min
        }, _valueMax: function() {
            return this.options.max
        }, _refreshValue: function() {
            var t, i, s, a, n, r = this.options.range, o = this.options, h = this, l = this._animateOff ? !1 : o.animate, u = {};
            this.options.values && this.options.values.length ? this.handles.each(function(s) {
                i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[l ? "animate" : "css"](u, o.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({left: i + "%"}, o.animate), 1 === s && h.range[l ? "animate" : "css"]({width: i - t + "%"}, {queue: !1, duration: o.animate})) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({bottom: i + "%"}, o.animate), 1 === s && h.range[l ? "animate" : "css"]({height: i - t + "%"}, {queue: !1, duration: o.animate}))), t = i
            }) : (s = this.value(), a = this._valueMin(), n = this._valueMax(), i = n !== a ? 100 * ((s - a) / (n - a)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, o.animate), "min" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({width: i + "%"}, o.animate), "max" === r && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({width: 100 - i + "%"}, {queue: !1, duration: o.animate}), "min" === r && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({height: i + "%"}, o.animate), "max" === r && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({height: 100 - i + "%"}, {queue: !1, duration: o.animate}))
        }, _handleEvents: {keydown: function(i) {
                var s, a, n, r, o = e(i.target).data("ui-slider-handle-index");
                switch (i.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, e(i.target).addClass("ui-state-active"), s = this._start(i, o), s === !1))
                            return
                }
                switch (r = this.options.step, a = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), i.keyCode) {
                    case e.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(a + (this._valueMax() - this._valueMin()) / t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(a - (this._valueMax() - this._valueMin()) / t);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (a === this._valueMax())
                            return;
                        n = this._trimAlignValue(a + r);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (a === this._valueMin())
                            return;
                        n = this._trimAlignValue(a - r)
                }
                this._slide(i, o, n)
            }, click: function(e) {
                e.preventDefault()
            }, keyup: function(t) {
                var i = e(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
            }}})
})(jQuery);

/*
 * Browser Detect script
 */
BrowserDetect = (function() {
    // script settings
    var options = {
        osVersion: false,
        minorBrowserVersion: true
    };

    // browser data
    var browserData = {
        browsers: {
            chrome: uaMatch(/Chrome\/([0-9\.]*)/),
            firefox: uaMatch(/Firefox\/([0-9\.]*)/),
            safari: uaMatch(/Version\/([0-9\.]*).*Safari/),
            opera: uaMatch(/Opera\/.*Version\/([0-9\.]*)/, /Opera\/([0-9\.]*)/),
            msie: uaMatch(/MSIE ([0-9\.]*)/, /Trident.*rv:([0-9\.]*)/)
        },
        engines: {
            webkit: uaContains('AppleWebKit'),
            trident: uaMatch(/(MSIE|Trident)/),
            gecko: uaContains('Gecko'),
            presto: uaContains('Presto')
        },
        platforms: {
            win: uaMatch(/Windows NT ([0-9\.]*)/),
            mac: uaMatch(/Mac OS X ([0-9_\.]*)/),
            linux: uaContains('X11', 'Linux')
        }
    };

    // perform detection
    var ua = navigator.userAgent;
    var detectData = {
        platform: detectItem(browserData.platforms),
        browser: detectItem(browserData.browsers),
        engine: detectItem(browserData.engines)
    };

    // private functions
    function uaMatch(regExp, altReg) {
        return function() {
            var result = regExp.exec(ua) || altReg && altReg.exec(ua);
            return result && result[1];
        };
    }
    function uaContains(word) {
        var args = Array.prototype.slice.apply(arguments);
        return function() {
            for (var i = 0; i < args.length; i++) {
                if (ua.indexOf(args[i]) < 0) {
                    return;
                }
            }
            return true;
        };
    }
    function detectItem(items) {
        var detectedItem = null, itemName, detectValue;
        for (itemName in items) {
            if (items.hasOwnProperty(itemName)) {
                detectValue = items[itemName]();
                if (detectValue) {
                    return {
                        name: itemName,
                        value: detectValue
                    };
                }
            }
        }
    }

    // add classes to root element
    (function() {
        // helper functions
        var addClass = function(cls) {
            var html = document.documentElement;
            html.className += (html.className ? ' ' : '') + cls;
        };
        var getVersion = function(ver) {
            return typeof ver === 'string' ? ver.replace(/\./g, '_') : 'unknown';
        };

        // add classes
        if (detectData.platform) {
            addClass(detectData.platform.name);
            if (options.osVersion) {
                addClass(detectData.platform.name + '-' + getVersion(detectData.platform.value));
            }
        }
        if (detectData.engine) {
            addClass(detectData.engine.name);
        }
        if (detectData.browser) {
            addClass(detectData.browser.name);
            addClass(detectData.browser.name + '-' + parseInt(detectData.browser.value, 10));
            if (options.minorBrowserVersion) {
                addClass(detectData.browser.name + '-' + getVersion(detectData.browser.value));
            }
        }
    }());

    // export detection information
    return detectData;
}());
var isIE = jQuery('html').hasClass('msie');
/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b) {
    b.support.touch = "ontouchend" in document;
    if (!b.support.touch) {
        return;
    }
    var c = b.ui.mouse.prototype, e = c._mouseInit, a;
    function d(g, h) {
        if (g.originalEvent.touches.length > 1) {
            return;
        }
        g.preventDefault();
        var i = g.originalEvent.changedTouches[0], f = document.createEvent("MouseEvents");
        f.initMouseEvent(h, true, true, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, false, false, false, false, 0, null);
        g.target.dispatchEvent(f);
    }
    c._touchStart = function(g) {
        var f = this;
        if (a || !f._mouseCapture(g.originalEvent.changedTouches[0])) {
            return;
        }
        a = true;
        f._touchMoved = false;
        d(g, "mouseover");
        d(g, "mousemove");
        d(g, "mousedown");
    };
    c._touchMove = function(f) {
        if (!a) {
            return;
        }
        this._touchMoved = true;
        d(f, "mousemove");
    };
    c._touchEnd = function(f) {
        if (!a) {
            return;
        }
        d(f, "mouseup");
        d(f, "mouseout");
        if (!this._touchMoved) {
            d(f, "click");
        }
        a = false;
    };
    c._mouseInit = function() {
        var f = this;
        f.element.bind("touchstart", b.proxy(f, "_touchStart")).bind("touchmove", b.proxy(f, "_touchMove")).bind("touchend", b.proxy(f, "_touchEnd"));
        e.call(f);
    };
})(jQuery);



// fancybox modal popup init
function initLightbox() {
    jQuery('a.lightbox, a[rel*="lightbox"]').each(function() {
        var link = jQuery(this);
        link.fancybox({
            padding: 10,
            margin: 0,
            cyclic: false,
            autoScale: true,
            overlayShow: true,
            overlayOpacity: 0.8,
            overlayColor: '#000000',
            titlePosition: 'inside',
            onComplete: function(box) {
                if (link.attr('href').indexOf('#') === 0) {
                    jQuery('#fancybox-content').find('a.close').unbind('click.fb').bind('click.fb', function(e) {
                        jQuery.fancybox.close();
                        e.preventDefault();
                    });
                }
            }
        });
    });
}

/* Fancybox overlay fix */
jQuery(function() {
    // detect device type
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    var isWinPhoneDevice = navigator.msPointerEnabled && /MSIE 10.*Touch/.test(navigator.userAgent);

    if (!isTouchDevice && !isWinPhoneDevice) {
        // create <style> rules
        var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                rules = document.createTextNode('#fancybox-overlay' + '{' +
                        'position:fixed;' +
                        'top:0;' +
                        'left:0;' +
                        '}');

        // append style element
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = rules.nodeValue;
        } else {
            style.appendChild(rules);
        }
        head.appendChild(style);
    }
});

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;
(function(B) {
    var L, T, Q, M, d, m, J, A, O, z, C = 0, H = {}, j = [], e = 0, G = {}, y = [], f = null, o = new Image(), i = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, k = /[^\.]\.(swf)\s*$/i, p, N = 1, h = 0, t = "", b, c, P = false, s = B.extend(B("<div/>")[0], {prop: 0}), S = /MSIE 6/.test(navigator.userAgent) && B.browser.version < 7 && !window.XMLHttpRequest, r = function() {
        T.hide();
        o.onerror = o.onload = null;
        if (f) {
            f.abort()
        }
        L.empty()
    }, x = function() {
        if (false === H.onError(j, C, H)) {
            T.hide();
            P = false;
            return
        }
        H.titleShow = false;
        H.width = "auto";
        H.height = "auto";
        L.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
        n()
    }, w = function() {
        var Z = j[C], W, Y, ab, aa, V, X;
        r();
        H = B.extend({}, B.fn.fancybox.defaults, (typeof B(Z).data("fancybox") == "undefined" ? H : B(Z).data("fancybox")));
        X = H.onStart(j, C, H);
        if (X === false) {
            P = false;
            return
        } else {
            if (typeof X == "object") {
                H = B.extend(H, X)
            }
        }
        ab = H.title || (Z.nodeName ? B(Z).attr("title") : Z.title) || "";
        if (Z.nodeName && !H.orig) {
            H.orig = B(Z).children("img:first").length ? B(Z).children("img:first") : B(Z)
        }
        if (ab === "" && H.orig && H.titleFromAlt) {
            ab = H.orig.attr("alt")
        }
        W = H.href || (Z.nodeName ? B(Z).attr("href") : Z.href) || null;
        if ((/^(?:javascript)/i).test(W) || W == "#") {
            W = null
        }
        if (H.type) {
            Y = H.type;
            if (!W) {
                W = H.content
            }
        } else {
            if (H.content) {
                Y = "html"
            } else {
                if (W) {
                    if (W.match(i)) {
                        Y = "image"
                    } else {
                        if (W.match(k)) {
                            Y = "swf"
                        } else {
                            if (B(Z).hasClass("iframe")) {
                                Y = "iframe"
                            } else {
                                if (W.indexOf("#") === 0) {
                                    Y = "inline"
                                } else {
                                    Y = "ajax"
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!Y) {
            x();
            return
        }
        if (Y == "inline") {
            Z = W.substr(W.indexOf("#"));
            Y = B(Z).length > 0 ? "inline" : "ajax"
        }
        H.type = Y;
        H.href = W;
        H.title = ab;
        if (H.autoDimensions) {
            if (H.type == "html" || H.type == "inline" || H.type == "ajax") {
                H.width = "auto";
                H.height = "auto"
            } else {
                H.autoDimensions = false
            }
        }
        if (H.modal) {
            H.overlayShow = true;
            H.hideOnOverlayClick = false;
            H.hideOnContentClick = false;
            H.enableEscapeButton = false;
            H.showCloseButton = false
        }
        H.padding = parseInt(H.padding, 10);
        H.margin = parseInt(H.margin, 10);
        L.css("padding", (H.padding + H.margin));
        B(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
            B(this).replaceWith(m.children())
        });
        switch (Y) {
            case"html":
                L.html(H.content);
                n();
                break;
            case"inline":
                if (B(Z).parent().is("#fancybox-content") === true) {
                    P = false;
                    return
                }
                B('<div class="fancybox-inline-tmp" />').hide().insertBefore(B(Z)).bind("fancybox-cleanup", function() {
                    B(this).replaceWith(m.children())
                }).bind("fancybox-cancel", function() {
                    B(this).replaceWith(L.children())
                });
                B(Z).appendTo(L);
                n();
                break;
            case"image":
                P = false;
                B.fancybox.showActivity();
                o = new Image();
                o.onerror = function() {
                    x()
                };
                o.onload = function() {
                    P = true;
                    o.onerror = o.onload = null;
                    F()
                };
                o.src = W;
                break;
            case"swf":
                H.scrolling = "no";
                aa = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + H.width + '" height="' + H.height + '"><param name="movie" value="' + W + '"></param>';
                V = "";
                B.each(H.swf, function(ac, ad) {
                    aa += '<param name="' + ac + '" value="' + ad + '"></param>';
                    V += " " + ac + '="' + ad + '"'
                });
                aa += '<embed src="' + W + '" type="application/x-shockwave-flash" width="' + H.width + '" height="' + H.height + '"' + V + "></embed></object>";
                L.html(aa);
                n();
                break;
            case"ajax":
                P = false;
                B.fancybox.showActivity();
                H.ajax.win = H.ajax.success;
                f = B.ajax(B.extend({}, H.ajax, {url: W, data: H.ajax.data || {}, dataType: "text", error: function(ac, ae, ad) {
                        if (ac.status > 0) {
                            x()
                        }
                    }, success: function(ad, af, ac) {
                        var ae = typeof ac == "object" ? ac : f;
                        if (ae.status == 200 || ae.status === 0) {
                            if (typeof H.ajax.win == "function") {
                                X = H.ajax.win(W, ad, af, ac);
                                if (X === false) {
                                    T.hide();
                                    return
                                } else {
                                    if (typeof X == "string" || typeof X == "object") {
                                        ad = X
                                    }
                                }
                            }
                            L.html(ad);
                            n()
                        }
                    }}));
                break;
            case"iframe":
                E();
                break
            }
    }, n = function() {
        var V = H.width, W = H.height;
        if (V.toString().indexOf("%") > -1) {
            V = parseInt((B(window).width() - (H.margin * 2)) * parseFloat(V) / 100, 10) + "px"
        } else {
            V = V == "auto" ? "auto" : V + "px"
        }
        if (W.toString().indexOf("%") > -1) {
            W = parseInt((B(window).height() - (H.margin * 2)) * parseFloat(W) / 100, 10) + "px"
        } else {
            W = W == "auto" ? "auto" : W + "px"
        }
        L.wrapInner('<div style="width:' + V + ";height:" + W + ";overflow: " + (H.scrolling == "auto" ? "auto" : (H.scrolling == "yes" ? "scroll" : "hidden")) + ';position:relative;"></div>');
        H.width = L.width();
        H.height = L.height();
        E()
    }, F = function() {
        H.width = o.width;
        H.height = o.height;
        B("<img />").attr({id: "fancybox-img", src: o.src, alt: H.title}).appendTo(L);
        E()
    }, E = function() {
        var W, V;
        T.hide();
        if (M.is(":visible") && false === G.onCleanup(y, e, G)) {
            B('.fancybox-inline-tmp').trigger('fancybox-cancel');
            P = false;
            return
        }
        P = true;
        B(m.add(Q)).unbind();
        B(window).unbind("resize.fb scroll.fb");
        B(document).unbind("keydown.fb");
        if (M.is(":visible") && G.titlePosition !== "outside") {
            M.css("height", M.height())
        }
        y = j;
        e = C;
        G = H;
        if (G.overlayShow) {
            Q.css({"background-color": G.overlayColor, opacity: G.overlayOpacity, cursor: G.hideOnOverlayClick ? "pointer" : "auto", height: B(document).height()});
            if (!Q.is(":visible")) {
                if (S) {
                    B("select:not(#fancybox-tmp select)").filter(function() {
                        return this.style.visibility !== "hidden"
                    }).css({visibility: "hidden"}).one("fancybox-cleanup", function() {
                        this.style.visibility = "inherit"
                    })
                }
                Q.show()
            }
        } else {
            Q.hide()
        }
        c = R();
        l();
        if (M.is(":visible")) {
            B(J.add(O).add(z)).hide();
            W = M.position(), b = {top: W.top, left: W.left, width: M.width(), height: M.height()};
            V = (b.width == c.width && b.height == c.height);
            m.fadeTo(G.changeFade, 0.3, function() {
                var X = function() {
                    m.html(L.contents()).fadeTo(G.changeFade, 1, v)
                };
                B('.fancybox-inline-tmp').trigger('fancybox-change');
                m.empty().removeAttr("filter").css({"border-width": G.padding, width: c.width - G.padding * 2, height: H.autoDimensions ? "auto" : c.height - h - G.padding * 2});
                if (V) {
                    X()
                } else {
                    s.prop = 0;
                    B(s).animate({prop: 1}, {duration: G.changeSpeed, easing: G.easingChange, step: U, complete: X})
                }
            });
            return
        }
        M.removeAttr("style");
        m.css("border-width", G.padding);
        if (G.transitionIn == "elastic") {
            b = I();
            m.html(L.contents());
            M.show();
            if (G.opacity) {
                c.opacity = 0
            }
            s.prop = 0;
            B(s).animate({prop: 1}, {duration: G.speedIn, easing: G.easingIn, step: U, complete: v});
            return
        }
        if (G.titlePosition == "inside" && h > 0) {
            A.show()
        }
        m.css({width: c.width - G.padding * 2, height: H.autoDimensions ? "auto" : c.height - h - G.padding * 2}).html(L.contents());
        M.css(c).fadeIn(G.transitionIn == "none" ? 0 : G.speedIn, v)
    }, D = function(V) {
        if (V && V.length) {
            if (G.titlePosition == "float") {
                return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + V + '</td><td id="fancybox-title-float-right"></td></tr></table>'
            }
            return'<div id="fancybox-title-' + G.titlePosition + '">' + V + "</div>"
        }
        return false
    }, l = function() {
        t = G.title || "";
        h = 0;
        A.empty().removeAttr("style").removeClass();
        if (G.titleShow === false) {
            A.hide();
            return
        }
        t = B.isFunction(G.titleFormat) ? G.titleFormat(t, y, e, G) : D(t);
        if (!t || t === "") {
            A.hide();
            return
        }
        A.addClass("fancybox-title-" + G.titlePosition).html(t).appendTo("body").show();
        switch (G.titlePosition) {
            case"inside":
                A.css({width: c.width - (G.padding * 2), marginLeft: G.padding, marginRight: G.padding});
                h = A.outerHeight(true);
                A.appendTo(d);
                c.height += h;
                break;
            case"over":
                A.css({marginLeft: G.padding, width: c.width - (G.padding * 2), bottom: G.padding}).appendTo(d);
                break;
            case"float":
                A.css("left", parseInt((A.width() - c.width - 40) / 2, 10) * -1).appendTo(M);
                break;
            default:
                A.css({width: c.width - (G.padding * 2), paddingLeft: G.padding, paddingRight: G.padding}).appendTo(M);
                break
        }
        A.hide()
    }, g = function() {
        if (G.enableEscapeButton || G.enableKeyboardNav) {
            B(document).bind("keydown.fb", function(V) {
                if (V.keyCode == 27 && G.enableEscapeButton) {
                    V.preventDefault();
                    B.fancybox.close()
                } else {
                    if ((V.keyCode == 37 || V.keyCode == 39) && G.enableKeyboardNav && V.target.tagName !== "INPUT" && V.target.tagName !== "TEXTAREA" && V.target.tagName !== "SELECT") {
                        V.preventDefault();
                        B.fancybox[V.keyCode == 37 ? "prev" : "next"]()
                    }
                }
            })
        }
        if (!G.showNavArrows) {
            O.hide();
            z.hide();
            return
        }
        if ((G.cyclic && y.length > 1) || e !== 0) {
            O.show()
        }
        if ((G.cyclic && y.length > 1) || e != (y.length - 1)) {
            z.show()
        }
    }, v = function() {
        if (B.support.opacity === false) {
            m.get(0).style.removeAttribute("filter");
            M.get(0).style.removeAttribute("filter")
        }
        if (H.autoDimensions) {
            m.css("height", "auto")
        }
        M.css("height", "auto");
        if (t && t.length) {
            A.show()
        }
        if (G.showCloseButton) {
            J.show()
        }
        g();
        if (G.hideOnContentClick) {
            m.bind("click", B.fancybox.close)
        }
        if (G.hideOnOverlayClick) {
            Q.bind("click", B.fancybox.close)
        }
        B(window).bind("resize.fb", B.fancybox.resize);
        if (G.centerOnScroll) {
            B(window).bind("scroll.fb", B.fancybox.center)
        }
        if (G.type == "iframe") {
            B('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + (window.attachEvent ? 'allowtransparency="true""' : "") + ' scrolling="' + H.scrolling + '" src="' + G.href + '"></iframe>').appendTo(m)
        }
        M.show();
        P = false;
        B.fancybox.center();
        G.onComplete(y, e, G);
        K()
    }, K = function() {
        var V, W;
        if ((y.length - 1) > e) {
            V = y[e + 1].href;
            if (typeof V !== "undefined" && V.match(i)) {
                W = new Image();
                W.src = V
            }
        }
        if (e > 0) {
            V = y[e - 1].href;
            if (typeof V !== "undefined" && V.match(i)) {
                W = new Image();
                W.src = V
            }
        }
    }, U = function(W) {
        var V = {width: parseInt(b.width + (c.width - b.width) * W, 10), height: parseInt(b.height + (c.height - b.height) * W, 10), top: parseInt(b.top + (c.top - b.top) * W, 10), left: parseInt(b.left + (c.left - b.left) * W, 10)};
        if (typeof c.opacity !== "undefined") {
            V.opacity = W < 0.5 ? 0.5 : W
        }
        M.css(V);
        m.css({width: V.width - G.padding * 2, height: V.height - (h * W) - G.padding * 2})
    }, u = function() {
        return[B(window).width() - (G.margin * 2), B(window).height() - (G.margin * 2), B(document).scrollLeft() + G.margin, B(document).scrollTop() + G.margin]
    }, R = function() {
        var V = u(), Z = {}, W = G.autoScale, X = G.padding * 2, Y;
        if (G.width.toString().indexOf("%") > -1) {
            Z.width = parseInt((V[0] * parseFloat(G.width)) / 100, 10)
        } else {
            Z.width = G.width + X
        }
        if (G.height.toString().indexOf("%") > -1) {
            Z.height = parseInt((V[1] * parseFloat(G.height)) / 100, 10)
        } else {
            Z.height = G.height + X
        }
        if (W && (Z.width > V[0] || Z.height > V[1])) {
            if (H.type == "image" || H.type == "swf") {
                Y = (G.width) / (G.height);
                if ((Z.width) > V[0]) {
                    Z.width = V[0];
                    Z.height = parseInt(((Z.width - X) / Y) + X, 10)
                }
                if ((Z.height) > V[1]) {
                    Z.height = V[1];
                    Z.width = parseInt(((Z.height - X) * Y) + X, 10)
                }
            } else {
                Z.width = Math.min(Z.width, V[0]);
                Z.height = Math.min(Z.height, V[1])
            }
        }
        Z.top = parseInt(Math.max(V[3] - 20, V[3] + ((V[1] - Z.height - 40) * 0.5)), 10);
        Z.left = parseInt(Math.max(V[2] - 20, V[2] + ((V[0] - Z.width - 40) * 0.5)), 10);
        return Z
    }, q = function(V) {
        var W = V.offset();
        W.top += parseInt(V.css("paddingTop"), 10) || 0;
        W.left += parseInt(V.css("paddingLeft"), 10) || 0;
        W.top += parseInt(V.css("border-top-width"), 10) || 0;
        W.left += parseInt(V.css("border-left-width"), 10) || 0;
        W.width = V.width();
        W.height = V.height();
        return W
    }, I = function() {
        var Y = H.orig ? B(H.orig) : false, X = {}, W, V;
        if (Y && Y.length) {
            W = q(Y);
            X = {width: W.width + (G.padding * 2), height: W.height + (G.padding * 2), top: W.top - G.padding - 20, left: W.left - G.padding - 20}
        } else {
            V = u();
            X = {width: G.padding * 2, height: G.padding * 2, top: parseInt(V[3] + V[1] * 0.5, 10), left: parseInt(V[2] + V[0] * 0.5, 10)}
        }
        return X
    }, a = function() {
        if (!T.is(":visible")) {
            clearInterval(p);
            return
        }
        B("div", T).css("top", (N * -40) + "px");
        N = (N + 1) % 12
    };
    B.fn.fancybox = function(V) {
        if (!B(this).length) {
            return this
        }
        B(this).data("fancybox", B.extend({}, V, (B.metadata ? B(this).metadata() : {}))).unbind("click.fb").bind("click.fb", function(X) {
            X.preventDefault();
            if (P) {
                return
            }
            P = true;
            B(this).blur();
            j = [];
            C = 0;
            var W = B(this).attr("rel") || "";
            if (!W || W == "" || W === "nofollow") {
                j.push(this)
            } else {
                j = B('a[rel="' + W + '"], area[rel="' + W + '"]');
                C = j.index(this)
            }
            w();
            return
        });
        return this
    };
    B.fancybox = function(Y) {
        var X;
        if (P) {
            return
        }
        P = true;
        X = typeof arguments[1] !== "undefined" ? arguments[1] : {};
        j = [];
        C = parseInt(X.index, 10) || 0;
        if (B.isArray(Y)) {
            for (var W = 0, V = Y.length; W < V; W++) {
                if (typeof Y[W] == "object") {
                    B(Y[W]).data("fancybox", B.extend({}, X, Y[W]))
                } else {
                    Y[W] = B({}).data("fancybox", B.extend({content: Y[W]}, X))
                }
            }
            j = jQuery.merge(j, Y)
        } else {
            if (typeof Y == "object") {
                B(Y).data("fancybox", B.extend({}, X, Y))
            } else {
                Y = B({}).data("fancybox", B.extend({content: Y}, X))
            }
            j.push(Y)
        }
        if (C > j.length || C < 0) {
            C = 0
        }
        w()
    };
    B.fancybox.showActivity = function() {
        clearInterval(p);
        T.show();
        p = setInterval(a, 66)
    };
    B.fancybox.hideActivity = function() {
        T.hide()
    };
    B.fancybox.next = function() {
        return B.fancybox.pos(e + 1)
    };
    B.fancybox.prev = function() {
        return B.fancybox.pos(e - 1)
    };
    B.fancybox.pos = function(V) {
        if (P) {
            return
        }
        V = parseInt(V);
        j = y;
        if (V > -1 && V < y.length) {
            C = V;
            w()
        } else {
            if (G.cyclic && y.length > 1) {
                C = V >= y.length ? 0 : y.length - 1;
                w()
            }
        }
        return
    };
    B.fancybox.cancel = function() {
        if (P) {
            return
        }
        P = true;
        B('.fancybox-inline-tmp').trigger('fancybox-cancel');
        r();
        H.onCancel(j, C, H);
        P = false
    };
    B.fancybox.close = function() {
        if (P || M.is(":hidden")) {
            return
        }
        P = true;
        if (G && false === G.onCleanup(y, e, G)) {
            P = false;
            return
        }
        r();
        B(J.add(O).add(z)).hide();
        B(m.add(Q)).unbind();
        B(window).unbind("resize.fb scroll.fb");
        B(document).unbind("keydown.fb");
        if (G.type === "iframe") {
            m.find("iframe").attr("src", S && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank")
        }
        if (G.titlePosition !== "inside") {
            A.empty()
        }
        M.stop();
        function V() {
            Q.fadeOut("fast");
            A.empty().hide();
            M.hide();
            B('.fancybox-inline-tmp').trigger('fancybox-cleanup');
            m.empty();
            G.onClosed(y, e, G);
            y = H = [];
            e = C = 0;
            G = H = {};
            P = false
        }
        if (G.transitionOut == "elastic") {
            b = I();
            var W = M.position();
            c = {top: W.top, left: W.left, width: M.width(), height: M.height()};
            if (G.opacity) {
                c.opacity = 1
            }
            A.empty().hide();
            s.prop = 1;
            B(s).animate({prop: 0}, {duration: G.speedOut, easing: G.easingOut, step: U, complete: V})
        } else {
            M.fadeOut(G.transitionOut == "none" ? 0 : G.speedOut, V)
        }
    };
    B.fancybox.resize = function() {
        if (Q.is(":visible")) {
            Q.css("height", B(document).height())
        }
        B.fancybox.center(true)
    };
    B.fancybox.center = function() {
        var V, W;
        if (P) {
            return
        }
        W = arguments[0] === true ? 1 : 0;
        V = u();
        if (!W && (M.width() > V[0] || M.height() > V[1])) {
            return
        }
        M.stop().animate({top: parseInt(Math.max(V[3] - 20, V[3] + ((V[1] - m.height() - 40) * 0.5) - G.padding)), left: parseInt(Math.max(V[2] - 20, V[2] + ((V[0] - m.width() - 40) * 0.5) - G.padding))}, typeof arguments[0] == "number" ? arguments[0] : 200)
    };
    B.fancybox.init = function() {
        if (B("#fancybox-wrap").length) {
            return
        }
        B("body").append(L = B('<div id="fancybox-tmp"></div>'), T = B('<div id="fancybox-loading"><div></div></div>'), Q = B('<div id="fancybox-overlay"></div>'), M = B('<div id="fancybox-wrap"></div>'));
        d = B('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(M);
        d.append(m = B('<div id="fancybox-content"></div>'), J = B('<a id="fancybox-close"></a>'), A = B('<div id="fancybox-title"></div>'), O = B('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), z = B('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
        J.click(B.fancybox.close);
        T.click(B.fancybox.cancel);
        O.click(function(V) {
            V.preventDefault();
            B.fancybox.prev()
        });
        z.click(function(V) {
            V.preventDefault();
            B.fancybox.next()
        });
        if (B.fn.mousewheel) {
            M.bind("mousewheel.fb", function(V, W) {
                if (P) {
                    V.preventDefault()
                } else {
                    if (B(V.target).get(0).clientHeight == 0 || B(V.target).get(0).scrollHeight === B(V.target).get(0).clientHeight) {
                        V.preventDefault();
                        B.fancybox[W > 0 ? "prev" : "next"]()
                    }
                }
            })
        }
        if (B.support.opacity === false) {
            M.addClass("fancybox-ie")
        }
        if (S) {
            T.addClass("fancybox-ie6");
            M.addClass("fancybox-ie6");
            B('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(d)
        }
    };
    B.fn.fancybox.defaults = {padding: 10, margin: 40, opacity: false, modal: false, cyclic: false, scrolling: "auto", width: 560, height: 340, autoScale: true, autoDimensions: true, centerOnScroll: false, ajax: {}, swf: {wmode: "transparent"}, hideOnOverlayClick: true, hideOnContentClick: false, overlayShow: true, overlayOpacity: 0.7, overlayColor: "#777", titleShow: true, titlePosition: "float", titleFormat: null, titleFromAlt: false, transitionIn: "fade", transitionOut: "fade", speedIn: 300, speedOut: 300, changeSpeed: 300, changeFade: "fast", easingIn: "swing", easingOut: "swing", showCloseButton: true, showNavArrows: true, enableEscapeButton: true, enableKeyboardNav: true, onStart: function() {
        }, onCancel: function() {
        }, onComplete: function() {
        }, onCleanup: function() {
        }, onClosed: function() {
        }, onError: function() {
        }};
    B(document).ready(function() {
        B.fancybox.init()
    })
})(jQuery);

// if js active importance 
$(function() {
    $('#nav .nav-drop, .mobile-nav, .carousel, .search-area, .top-login-area, .top-promo').css({display: 'block'});
});



function ajaxindicatorstart(text)
{
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id="resultLoading" style="display:none"><div class="loadingImg"><img src="/bundles/thinkdigitfrontend/images/digit_move.gif"><div>' + text + '</div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'width': '100%',
        'height': '10%',
        'position': 'fixed',
        'z-index': '10000000',
        //'top':'0',
        'left': '0',
        'right': '0',
        'bottom': '1%',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        //'background':'#000000',
        'opacity': '0.7',
        'font-weight': 'bold',
        'width': '100%',
        'height': '10%',
        'position': 'absolute',
        'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '100px',
        'height': '100px',
        'text-align': 'center',
        'position': 'fixed',
        //'top':'0',
        'left': '0',
        'right': '0',
        'bottom': '25%',
        'margin': 'auto',
        'font-size': '16px',
        'z-index': '10',
        //'color':'#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}


function ajaxindicatorstop()
{
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}


jQuery(document).ajaxStart(function() {
    //show ajax indicator
    ajaxindicatorstart(''); // '' in loading text...
}).ajaxStop(function() {
//hide ajax indicator
    ajaxindicatorstop();
});



// fun

$(function(){
	$(window).scroll(function(){
		var scrollNew = $(this).scrollTop();
		if(scrollNew >= 350){
			$('#headerWhite').css('top', '0').slideDown('fast');
			$('a.menu-opener').css('background-position', '-540px -400px');
		}else{
			$('#headerWhite').css('top', '0').slideUp('fast');
			$('a.menu-opener').css('background-position', '-540px -440px');
		}
	});

    // sticky_footer_panel
    $('.sfc').show();
    $('.toggleBtn').click(function(){
    	$(this).text(function(i, text){
    		return text === "Hide"? "Show": "Hide";
    	});
    	$('.sfc').fadeToggle();
    });



    // content gallery
    var $contentGallery = function(){
    	var speed = 500;
    	var liwidth = $('.iGArea li').length;
    	var item_width = $('.iGArea li').width();
    	var left_value = item_width * (-1);
    	var ulWidth = liwidth * item_width;
    	$('.iGArea').css('width', item_width);
    	$('.iGArea ul').css('width', ulWidth);
    	$('.iGArea ul li').css('width', item_width);
    	$('.iGArea li:first').before($('.iGArea li:last'));
    	$('.iGArea ul').css({'left':left_value});
    	
    	$('.prev').click(function(){
    		var left_indent = parseInt($('.iGArea ul').css('left')) + item_width;
    		$('.iGArea ul').animate({'left':left_indent},speed, function(){
    			$('.iGArea li:first').before($('.iGArea li:last'));
    			$('.iGArea ul').css({'left':left_value});
    			});
    		return false;
    	});
    	
    	$('.next').click(function(){
    		var left_indent = parseInt($('.iGArea ul').css('left')) - item_width;
    		$('.iGArea ul').animate({'left':left_indent},speed, function(){
    			$('.iGArea li:last').after($('.iGArea li:first'));
    			$('.iGArea ul').css({'left':left_value});
    			});
    		return false;
    	});
    };
    $contentGallery();


});
// End fun
