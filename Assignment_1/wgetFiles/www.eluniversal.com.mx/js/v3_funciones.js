jQuery(document).ready(function(){

 // Reiniciar el tamaño de la fuente
 var tamOriginal = jQuery('html').css('font-size');
 jQuery(".reiFuente").click(function(){
 jQuery('html').css('font-size', tamOriginal);
 });

 // Incrementar el tamaño de la fuente
 jQuery(".aumFuente").click(function(){
 jQuery('.noteText *').each(function(){
 var tamActual = jQuery(this).css('font-size');
 var tamActualNum = parseFloat(tamActual, 10);
 var nuevaFuente = tamActualNum*1.2;
 jQuery(this).css('font-size', nuevaFuente);
 });
 return false;
 });

 // Disminuir el tamaño de la fuente
 /*jQuery(".disFuente").click(function(){
 var tamActual = jQuery('html').css('font-size');
 var tamActualNum = parseFloat(currentFontSize, 10);
 var nuevaFuente = tamActualNum*0.8;
 jQuery('html').css('font-size', nuevaFuente);
 return false;
 });
 */
 
 
  jQuery(".disFuente").click(function(){
 jQuery('.noteText *').each(function(){
 var tamActual = jQuery(this).css('font-size');
 var tamActualNum = parseFloat(tamActual, 10);
 var nuevaFuente = tamActualNum*0.8;
 jQuery(this).css('font-size', nuevaFuente);
 });
 return false;
 });

});


//inserta codigo html en un selector de una pagina
function insertahtmlEnSelector(url,selector){
        //alert(url);
        jQuery.ajax({
                  url: url,
                  cache: false,
                  success: function(html){
                        //$(document).ready(function(){
                                jQuery(selector,0).append(html);
                        //});
                  }
                });
}
