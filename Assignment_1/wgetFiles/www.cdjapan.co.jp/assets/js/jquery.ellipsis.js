// http://d.hatena.ne.jp/bi_na/20120303/1330742523
(function($) {
        $.fn.ellipsis = function()
        {
                return this.each(function()
                {
                        var el = $(this);

                        if(el.css("overflow") == "hidden")
                        {
                                var text = el.html();
                                var multiline = true;
                                var t = $(this.cloneNode(true))
                                        .hide()
                                        .css('position', 'absolute')
                                        .css('overflow', 'visible')
                                        .width(multiline ? el.width() : 'auto')
                                        .height(multiline ? 'auto' : el.height())
                                        ;

                                el.after(t);

                                function height() { return t.height() > el.height(); };
                                function width() { return t.width() > el.width(); };

                                var func = multiline ? height : width;

                                while (text.length > 0 && func())
                                {
                                        text = text.substr(0, text.length - 1);
                                        t.html(text + "...");
                                }

                                el.html(t.html());
                                t.remove();
                        }
                });
        };
})(jQuery);
