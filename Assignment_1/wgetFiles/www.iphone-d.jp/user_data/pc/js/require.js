(function(){
	var s = document.getElementsByTagName("script");
	var d = s[s.length-1].src.substring(0, s[s.length-1].src.lastIndexOf("/")+1);
	for(var i=0; i<arguments.length; i++){
		document.write('<script type="text/javascript" src="'+d+arguments[i]+'"></script>');
	}
})(
"jquery.js", 
"yuga.js",
"navi_b.js",
"navi_d.js",
"navi_e.js",
"navi_f.js",
"navi_g.js",
"navi_h.js",
"lightbox.js",
"tabulous/js.js",
"tabulous/tabulous.js",
"jquery.colorbox.js",
"test.js",
"jquery.xdomainajax.js",
"list.xdomainajax.js",
"jquery.tab.js",
"navi_c.js"
);