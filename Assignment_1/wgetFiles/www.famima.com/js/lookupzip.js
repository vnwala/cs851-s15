/// <reference path="jquery.js" />
jQuery.noConflict();

var timerId_lookupzip_ = null;
var zipcache_lookupzip_ = "";

function init(zip, pref, addr, addr2, cnt, offset) {
    var defaultXOffset = 90;
    var timerOffset = 300;

    var zip_id = "#" + zip + cnt;
    var pref_id = "#" + pref + cnt;
    var addr_id = "#" + addr + cnt;
    var addr2_id = "#" + addr2 + cnt;
   
    offset = offset + defaultXOffset;
    jQuery(zip_id).bind("keyup", function() {
        jQuery("ul.ziplist_").remove();

        if (zipcache_lookupzip_ == jQuery(zip_id).val()) {
            zipcache_lookupzip_ = jQuery(zip_id).val();
            return false;
        }
        zipcache_lookupzip_ = jQuery(zip_id).val();

        clearTimeout(timerId_lookupzip_);
        timerId_lookupzip_ = setTimeout(function() {
            if (!jQuery(zip_id).val().match(/^[0-9]{3}[\-]{0,1}[0-9]{0,4}$/)) {
                return true;
            }
            jQuery.get("../search/lookupzipjson.aspx",
                  {
                      zip: jQuery(zip_id).val(),
                      charset: "shift_jis"
                  },
                function(data, status) {
                    var of = jQuery(zip_id).offset();
                    var ul = jQuery("<ul></ul>").addClass("ziplist_");
                    ul.css("top", of.top);
                    ul.css("left", of.left + offset);

                    var searchCount = 0;
                    var tempzip, temppref, tempaddr, tempaddr2;
                    jQuery.each(data, function(key, item) {
                        searchCount++;
                        tempzip = item.zip;
                        temppref = item.pref;
                        tempaddr = item.addr;
                        tempaddr2 = item.addr2;

                        var li = jQuery("<li>" + key + " " + item.pref + " " + item.addr + " " + item.addr2 + "</li>");
                        li.bind("click", function() {
                            jQuery(zip_id).val(item.zip);
                            jQuery(pref_id).val(item.pref);
                            jQuery(addr_id).val(item.addr);
                            jQuery(addr2_id).val(item.addr2);
                            jQuery("ul.ziplist_").remove();
                            jQuery(zip_id).blur();
                            jQuery(addr2_id).focus();

                            return false;
                        });
                        li.bind("mouseover", function() {
                            li.addClass("hover");
                        });

                        li.bind("mouseleave", function() {
                            li.removeClass("hover");
                        });
                        ul.append(li);
                    });

                    if (searchCount == 1) {
                        jQuery(zip_id).val(tempzip);
                        jQuery(pref_id).val(temppref);
                        jQuery(addr_id).val(tempaddr);
                        jQuery(addr2_id).val(tempaddr2);
                        jQuery("ul.ziplist_").remove();
                        jQuery(zip_id).blur();
                        jQuery(addr2_id).focus();

                        return false;
                    }
                    else if (searchCount > 1) {
                        jQuery(document.body).append(ul);
                    }

                }, "json"
                );
        }, timerOffset);

    });
}
