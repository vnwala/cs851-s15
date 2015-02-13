/* http://blog.quusookagaku.com/wordpress/12799/ */
jQuery(window).load(function() {
    var contentHeight = $(document).height();
    var windowHeight = $(window).height();
    var main = $("#content");
    var mainHeight = main.outerHeight();
    var side = $(".container_r");
    var sideHeight = side.outerHeight();
    var target = $("#Sticky-Right");
    var targetHeight = target.outerHeight();
    var header = $(".Sticky-Right-header");
    var headerPosition = header.position();
    var footer = $("#outfooter");
    var footerHeight = footer.outerHeight();
    $(window).scroll(function(){
        sideHeight = side.outerHeight();
        mainHeight = main.outerHeight();
        if(sideHeight < mainHeight) {
            headerPosition = header.position();
            
            var scrollLeft = $(this).scrollLeft();
            var targetLeft = headerPosition.left;
            var cssLeft;
            if(scrollLeft > 0) {
                cssLeft =  targetLeft - scrollLeft;
            } else {
                cssLeft = "auto";
            }

            var scrollTop = $(this).scrollTop();
            var targetTop = headerPosition.top;
            if(scrollTop > targetTop) {
                windowHeight = $(window).height();
                contentHeight = $(document).height();
                footerHeight = footer.outerHeight();
                var visibleBottom = scrollTop + windowHeight;
                if(footerHeight > contentHeight - visibleBottom) {
                    target.css({position: "fixed", left: cssLeft, top: "auto", bottom: footerHeight - (contentHeight - visibleBottom)});
                } else {
                    target.css({position: "fixed", left: cssLeft, top: 0, bottom: "auto"});
                }
            } else {
                target.css({position: "static", left: cssLeft, top: "auto", bottom: "auto"});
            }
        }
    });
});