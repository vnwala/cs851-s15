(function($){

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

var gallery_zip = ( window.gallery_zip ) ? window.gallery_zip : '/moviepages/'+ mid +'/images.zip';

if( window.has_gallery == 1 )
{
    $("div#footer ul li a[href*='affiliate-dti.com']").after('<a href="'+gallery_zip+'" onClick=\'ga("send", "event", "affiliate", "zip", "'+ mid +'")\'><img src="/images/common/parts/zip-btn.gif" style="margin-left: 4px; vertical-align: middle;"></a>');
}

if( window.is_mp4 == 1 )
{
    $("div#footer ul li a[href*='affiliate-dti.com']").after('<a id="aff" href="#embedForm"><img src="/images/common/parts/dti_log.png" style="margin-left: 4px; vertical-align: middle;"></a>');
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
            var previewImage = "http://www.muramura.tv/moviepages/" + mid + "/images/str_m.jpg";
            var mFlag = 1;
        }
        else
        {
            var previewImage = "http://www.muramura.tv/moviepages/" + mid + "/images/str.jpg";
            var mFlag = 0;
        }


        var affid = $("#aff_id").val();
        var sampleFile = ($('#checkbox02').is(':checked')) ? window.sample_m_flash_url : streaming_sample;
        var pWidth = ($("#pWidth").val().length > 1) ? $("#pWidth").val() : "450";
        var pHeight = ($("#pHeight").val().length > 1) ? $("#pHeight").val() : "273";
        var directid = ($('#checkbox02').is(':checked') ? "8881889" : "8881888" ) + "-365-" + affid;

        var html = '<object width="'+ pWidth +'" height="'+ pHeight +'" >'
                     + '<param name="allowFullScreen" value="true"></param>'
                     + '<param name="base" value="http://www.muramura.tv/"></param>'
                     + '<param name="allowscriptaccess" value="always"></param>'
                     + '<param name="wmode" value="transparent"></param>'
                     + '<param name="quality" value="high"></param>'
                     + '<embed width="'+ pWidth +'"'
                     + 'height="'+ pHeight +'"'
                     + 'name="movie1" '
                     + 'id="movie1" '
                     + 'base="muramura.tv"'
                     + ' src="http://www.muramura.tv/assets/embedplayer.swf?'
                     + 'id='+ mid +'&clickID=http://click.dtiserv2.com/Direct/'+ directid +'/moviepages/'+ mid +'/index.html'
                     + '&site=www.muramura.tv&img='+ previewImage +'&video='+ sampleFile +'&m_flag='+ mFlag +'" type="application/x-shockwave-flash"/></object>';

        var text = '<script name="setAffplayer' + mid +'" id="setAffplayer' + mid +'" type="text/javascript"'
                     + ' src="http://affiliate.dtiserv.com/js/setAffplayer.js?affid='+affid+'&siteid=365'
                     + '&video='+ sampleFile +'&img='+ previewImage +'&w='+ pWidth +'&h='+ pHeight +'&url='
                     + 'www.muramura.tv&id='+ mid +'&m_flag='+mFlag+'"></script>'
                     
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

})(ga$)

