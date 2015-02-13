
$(function(){
    $("input[id^='checkbox0']").click(function()
    {
        var flag = $(this).attr('checked');
        $("input[id^='checkbox0']").attr('checked', false);
        if (flag) $(this).attr('checked', true);
    });
});

$(document).ready(function()
{
    var domain = location.hostname;
    var mid = window.movie_id;
   
if(window.has_zip == 1)
{
    $("div.footer-menu ul li a[href*='affiliate-dti.com']").after('<a href="/moviepages/'+ mid +'/images/gallery.zip" onClick=\'ga("send", "event", "affiliate", "zip", "'+ mid +'")\'><img src="/images/common/parts/zip-btn.gif" style="margin-left: 4px; vertical-align: middle;"></a>');
}

if(window.sample_flash_exists == 1)
{
    $("div.footer-menu ul li a[href*='affiliate-dti.com']").after("<a id='aff' href='#embedForm'><img src='/images/common/parts/dti_log.png' style='margin-left: 4px; vertical-align: middle;'></a>");
    if(window.sample_m_flash_exists == 1)
    {
        $("#sample_m_check").show();
    }

    $("#aff").fancybox(
        {
        'titleShow'     : false,
        'onClosed'      : function()
            {
            $("#id_error").hide();
        }
    });

    $("#getId").click(function ()
         {
        if ($("#aff_id").val().length < 1)
        {
            $("#id_error").show();
            return false;
        }
        if($("#checkbox02").is(":checked"))
        {
            var previewImage = "http://www.caribbeancompr.com/moviepages/" + mid + "/images/l_t.jpg";
            var mFlag = 1;
        }
        else
        {
            var previewImage = "http://www.caribbeancompr.com/moviepages/" + mid + "/images/l_l.jpg";
            var mFlag = 0;
        }

        var affid = $("#aff_id").val();
        var sampleFile = ($('#checkbox02').is(':checked')) ? window.sample_m_flash_url : window.sample_flash_url;
        var pWidth = ($("#pWidth").val().length > 1) ? $("#pWidth").val() : "450";
        var pHeight = ($("#pHeight").val().length > 1) ? $("#pHeight").val() : "273";
        var directid = ($('#checkbox02').is(':checked') ? "8881889" : "8881888" ) + "-290-" + affid;


        if( window.is_mp4 == 1 )
        {
            var html = '<object width="'+ pWidth +'" height="'+ pHeight +'" >'
                     + '<param name="allowFullScreen" value="true"></param>'
                     + '<param name="base" value="http://www.caribbeancompr.com/"></param>'
                     + '<param name="allowscriptaccess" value="always"></param>'
                     + '<param name="wmode" value="transparent"></param>'
                     + '<param name="quality" value="high"></param>'
                     + '<embed width="'+ pWidth +'"'
                     + 'height="'+ pHeight +'"'
                     + 'name="movie1" '
                     + 'id="movie1" '
                     + 'base="caribbeancompr.com" '
                     + 'src="http://www.caribbeancompr.com/assets/embedplayer.swf?'
                     + 'id='+ mid +'&clickID=http://click.dtiserv2.com/Direct/'+ directid +'/moviepages/'+ mid +'/index.html'
                     + '&site=www.caribbeancompr.com&img='+ previewImage +'&video='+ sampleFile +'&m_flag='+ mFlag +'" type="application/x-shockwave-flash"/></object>';

            var text = '<script name="setAffplayer' + mid +'" id="setAffplayer' + mid +'" type="text/javascript"'
                     + ' src="http://affiliate.dtiserv.com/js/setAffplayer.js?affid='+affid+'&siteid=290'
                     + '&video='+ sampleFile +' &img='+ previewImage +'&w='+ pWidth +'&h='+ pHeight +' &url='
                     + 'www.caribbeancompr.com&id='+ mid +'&m_flag='+ mFlag +'"></script>'
        }
        else
        {//for sample flv
            var html = '<object width="'+ pWidth +'" height="'+ pHeight +'" >'
                     + '<param name="allowFullScreen" value="true"></param>'
                     + '<param name="allowscriptaccess" value="always"></param>'
                     + '<param name="wmode" value="transparent"></param>'
                     + '<param name="quality" value="high"></param>'
                     + '<embed width="'+ pWidth +'"'
                     + ' height="'+ pHeight +'"'
                     + ' name="movie1"'
                     + ' id="movie1"'
                     + ' src="http://www.caribbeancompr.com/flash/player_4_6.swf?'
                     + 'file='+sampleFile+'&image='+previewImage+'&autostart=false&displayclick=link&'
                     + 'link=http://click.dtiserv2.com/Direct/'+directid+'/moviepages/'+ mid +'/index.html&linktarget=_blank"'
                     + ' type="application/x-shockwave-flash"/></object>';

            var text = '<object width="'+ pWidth +'" height="'+ pHeight +'" >'
                     + '<param name="allowFullScreen" value="true"></param>'
                     + '<param name="allowscriptaccess" value="always"></param>'
                     + '<param name="wmode" value="transparent"></param>'
                     + '<param name="quality" value="high"></param>'
                     + '<embed width="'+ pWidth +'"'
                     + ' height="'+ pHeight +'"'
                     + ' name="movie1"'
                     + ' id="movie1"'
                     + ' src="http://www.caribbeancompr.com/flash/player_4_6.swf?'
                     + 'file='+sampleFile+'&image='+previewImage+'&autostart=false&displayclick=link&'
                     + 'link=http://click.dtiserv2.com/Direct/'+directid+'/moviepages/'+ mid +'/index.html&linktarget=_blank"'
                     + ' type="application/x-shockwave-flash"/></object>';
                 
        }   

        var bann = '<a href="http://click.dtiserv2.com/Direct/'+ directid +'/moviepages/'+ mid +'/index.html" target="_blank">'
                 + '<img src="'+ previewImage +'" border="0" hight="'+ pHeight +'" width="'+ pWidth +'"></a>';

	$("#embedPlayer").show().html(html);
        $("#embedText").show();
        $("#embedCode").show().text(text);
        $("#embedImgText").show();
        $("#embedBann").show().text(bann);

        return false;
    });
}

});


































