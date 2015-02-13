var $stylesheets_not_for_printing;
function print_preview(restore) {
    var $toRemove = jQuery("link[rel=stylesheet]");

    var $toStyleFont = jQuery("body, a");
    var $toStyleDecoration = jQuery("a");
    var $pictures = jQuery(".extraMedia");

    var $toHide = jQuery(".cscomments,.brNoteIntro,#topbanner,#header,#navigation,#tlogosearch form,#breadcrumb,.extraOptions,#noteSidebar,#publiVideos,#extraRelated,#pieNotas,.carruselDestacamos,.clear,#tm_box,.noteFooter,#comments,.commentText,.cscomments,.extraRelated,.clearLeft,.carousel,#utilities, #tcadstop, #bg, #bg2, .noteFooter_comFB");
    var $toHideMobile = jQuery("#menuMobile, #divFooter"); //Se agrego
    var toPrepend = "<div id=\"print_prepend\"><h1 style=\"text-align:center\"><img src=\"http://www.eluniversal.com.mx/imag/logo-euol-imprimir.gif\" alt=\"El Universal: Noticias de M&eacute;xico y el Mundo.\" /></h1><hr width=\"550pt\" size=\"1\"></div>";
    var toAppend = "<div id=\"print_append\"><p class=\"hide_for_print\" style=\"text-align:center\"><a href=\"javascript:back_print_preview()\" class=\"master_sprite optionPrint\">Regresar</a><br /><a href=\"javascript:print()\">Imprimir</a></p><p style=\"text-align:center; font-size: x-small; color: #333;\">&copy; Queda expresamente prohibida la republicaci&oacute;n o redistribuci&oacute;n, parcial o total, de todos los contenidos de EL UNIVERSAL</p></div>";

    if(restore) {
        jQuery("#print_prepend").remove();
        jQuery("#print_append").remove();
    
        $toStyleFont.removeAttr("style");
        $toStyleDecoration.removeAttr("style");
        $pictures.removeAttr("style");
        
        jQuery("head").append($stylesheets_not_for_printing);
        
        $toHide.show();
		
		jQuery("#noteContent").attr("style", "border-right:1px solid #D6DBE0; float:left; padding-left:10px; padding-right:5px; width:624px;");
		jQuery(".noteIntro").attr("style", "font-weight: normal;");
    
    } else {
        $stylesheets_not_for_printing = $toRemove.clone();
        $toRemove.remove();
        $toHide.hide();
        $toHideMobile.hide(); //Se agrego
    
        $toStyleFont.attr("style", "font-family: Trebuchet MS, Verdana, sans-serif; color: black;");
        $toStyleDecoration.attr("style", "text-decoration: none;");
        $pictures.attr("style", "float: right; width: 310px; margin: 20px 0pt 20px 20px;");
		
        jQuery(".noteInfo").attr("style", "display:block;");
        
        jQuery("#noteContent").attr("style", "margin:0px 100px;");
        jQuery(".noteIntro").attr("style", "font-weight:bold;");
        
        jQuery("body").prepend(toPrepend);
        jQuery("body").append(toAppend);
    }
}

function back_print_preview() {
   print_preview(1);
}
