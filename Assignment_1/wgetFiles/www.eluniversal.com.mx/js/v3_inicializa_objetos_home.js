/* inicializa objetos 
Autor. Cesar Saavedra
Couch: Rub�n Schaffer 

Mod. por: Luca Lauretta
UFM. 10.43 a.m. 20/11/2010
*/

jQuery(function() {
	var ini_caruseles = {
		horizontal_carousel: 0,
		middhorizontal_carousel: 0,
		gallhorizontal_carousel: 0,
		rephorizontal_carousel: 0,
		blogs_carousel: 0,
		chat_carousel: 0,
		autorCartonBlock: 0,
		cajaExclusivas_carousel: 0 
	};
	for(var c in ini_caruseles)
		// evita errores cuando los elementos est�n vacios (by Luca Lauretta)
		if(jQuery.trim(jQuery('#'+c+' ul').html()) != '')
			ini_caruseles[c] = new UI.Carousel(c);
	/*
	hCarousel1 = new UI.Carousel("horizontal_carousel");
	hCarousel2 = new UI.Carousel("middhorizontal_carousel");
	hCarousel3 = new UI.Carousel("gallhorizontal_carousel");
	hCarousel3 = new UI.Carousel("rephorizontal_carousel");
	// hCarousel4 = new UI.Carousel("adshorizontal_carousel");
	hCarousel6 = new UI.Carousel("blogs_carousel");
	hCarousel7 = new UI.Carousel("chat_carousel");
	// hCarousel8 = new UI.Carousel("rcmashorizontal_carousel");
	*/
	
	// TransitionTabs({delay:0.7});
    window.onload = function () {  
          TransitionTabs({delay:0.1});  
    }

	
					//Clase para popups 040312
					 var windowSizeArray = [ "width=500,height=500",
                                    		 "width=500,height=500,scrollbars=yes" ];
	                jQuery('.newWindow').click(function (event){
	                    var url = jQuery(this).attr("href");
	                    var windowName = "popUp";//jQuery(this).attr("name");
	                    var windowSize = windowSizeArray[jQuery(this).attr("rel")];
	                    window.open(url, windowName, windowSize);
	                    event.preventDefault();
                	});
});


