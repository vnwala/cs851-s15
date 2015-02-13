(function($){

	var
		body = document.getElementsByTagName("body")
		,dt_script = "dt=9358821417722000531000"
		,dt_image = "dt=9358821417722000531000"
		,di = "di="
		,ui = "ui="+((document.cookie.match(/s_vi=\[CS\]v1\|([^;]+)\[CE\]/)) ? RegExp.$1 : 'unknown')
		,pi = ""
	;
	if( (parent === window) ){
		di += ((location.hostname.match(/(.*\.washingtonpost|wpost\.com)$/)) ? RegExp.$1 : 'www.washingtonpost.com' );
	} else {
		if( document.referrer.match(/https?\:\/\/([^\/]+)(\/|$)/) ){
			di += ((RegExp.$1.match(/(.*\.washingtonpost|wpost\.com)$/)) ? RegExp.$1 : 'www.washingtonpost.com' );
		}
	}
	if(!!window.wp_meta_data && !!wp_meta_data.page_id && !!wp_meta_data.page_id[0] ){
		pi = "pi="+wp_meta_data.page_id[0];
	}

	var params_script = "?"+di+"&"+ui+"&"+pi+"&"+dt_script;
	var params_image  = "?"+di+"&"+ui+"&"+pi+"&"+dt_script;

	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.async = true;
	sc.src = "http://s.update.wo.washingtonpost.com/2/935882/analytics.js"+params_script;
	// sc.onload = function(){console.log("WhiteOps: SCRIPT loaded");};

	var img = document.createElement("img");
	img.src = "http://post.update.wo.washingtonpost.com/2/935882/one.gif"+params_image;
	// img.onload = function(){console.log("WhiteOps: GIF loaded");};

 
	body[0].appendChild(sc);
	body[0].appendChild(img);

})(jQuery);
