/*v2015.01.06.1048*/
var resimg = {};
	resimg.imgset;
	resimg.debug = false; //!!!!!!!!!!!!!!!!!!!!!!!! switch this to true to output debug info
	resimg.cb = "?cb="+Math.round(new Date().getTime() / 1000);

/*
		resimg.js
		this file contains the functions required to take a given MT image path and output an appropriate imgick/resized image path based on the image position on the type of page required
		https://wiki.advance.net/display/FED/Resimg.js

*/

resimg.d = function(msg){
	if (window.resimg.debug === true) console.log("RESIMG DEBUG: "+msg);
}

resimg.sizecheck = function() {
/*
		this function creates the image set GLOBAL to be used when determining what imgick profile should be used for a given image position
*/
	resimg.d('*****running resimg.sizecheck()*****');
    var key = $(window).width(),
		imgset = null;
	resimg.d('key is set to '+key);
	
	if (key > 768){
		resimg.d('we are using the largest imgset');
		imgset = {
			 'article':{'main':620,'related':140},'index':{'2story':430,'more':140,'best':140,'morning1':380,'major2':300,'major1':748,'bigphoto':748},'homepage':{'2box':140} //backwards compatible set of values
			,'major_story_1':{'main':700,'video':219}
			,'major_story_2':{'main':380,'video':216}
			,'big_photo':{'main':633}
			,'two_box':{'left':140,'right':140}
			,'index_two_box':{'left':298,'right':298}
			,'special_report':{'main':262}
			,'morning_report_1':{'main':288,'add':109}
			,'morning_report_2':{'main':283,'add':181}
			,'river':{'item':180}
			,'event_box':{'main':262}
			,'opinion':{'item':60}
			,'blog_promo':{'item':60}
			,'highlight':{'main':280}
			,'best_of':{'item':140}
			,'byline':{'avatar':40}
			,'social_icons':{'icon':60}
			,'potd':{'item':280}
			,'hssn':{'slider':620,'river':180,'article':480,'photovid':280} // hssn
			,'hssn_slider':{'item':620} // hssn
			,'hssn_river':{'item':180} // hssn
			,'hssn_article':{'inline':480} // hssn
			,'hssn_photo_vid':{'item':280} // hssn
			,'events':{'slideshow_small':'eSlideshow-f', 'slideshow_large':'eGallery-f', 'results':'eResults-f'}//constrain by height values on events page
			,'gallery': {'photo' : 960}
		}
	}else if(key <= 768 && key > 600){
		resimg.d('we are using the medium large imgset');
		imgset = {

			 'article':{'main':430,'related':262},'index':{'2story':270,'more':120,'best':170,'morning1':300,'major2':300,'major1':748,'bigphoto':748},'homepage':{'2box':140} //backwards compatible set of values
			,'major_story_1':{'main':524,'video':161}
			,'major_story_2':{'main':288,'video':160}
			,'big_photo':{'main':479}
			,'two_box':{'left':140,'right':140}
			,'index_two_box':{'left':328,'right':328}
			,'special_report':{'main':262}
			,'morning_report_1':{'main':216,'add':119}
			,'morning_report_2':{'main':197,'add':394}
			,'river':{'item':180}
			,'event_box':{'main':262}
			,'opinion':{'item':60}
			,'blog_promo':{'item':60}
			,'highlight':{'main':280}
			,'best_of':{'item':140}
			,'byline':{'avatar':40}
			,'social_icons':{'icon':60}
			,'potd':{'item':280}
			,'hssn':{'slider':620,'river':180,'article':480,'photovid':280} // hssn
			,'hssn_slider':{'item':620} // hssn
			,'hssn_river':{'item':180} // hssn
			,'hssn_article':{'inline':480} // hssn
			,'hssn_photo_vid':{'item':280} // hssn
			,'events':{'slideshow_small':'eSlideshow-t', 'slideshow_large':'eGallery-t', 'results':'eResults-t'}//constrain by height values on events page
			,'gallery': {'photo' : 768}
		}
	}else if(key <= 600 && key > 480){
		resimg.d('we are using the medium small imgset');
		imgset = {
			 'article':{'main':460,'related':210},'index':{'2story':210,'more':120,'best':210,'morning1':580,'major2':580,'major1':580,'bigphoto':580},'homepage':{'2box':140} //backwards compatible set of values
			,'major_story_1':{'main':553,'video':161}
			,'major_story_2':{'main':553,'video':160}
			,'big_photo':{'main':579}
			,'two_box':{'left':220,'right':328}
			,'index_two_box':{'left':610,'right':610}
			,'special_report':{'main':262}
			,'morning_report_1':{'main':547,'add':140}
			,'morning_report_2':{'main':274,'add':140}
			,'river':{'item':180}
			,'event_box':{'main':262}
			,'opinion':{'item':60}
			,'blog_promo':{'item':60}
			,'highlight':{'main':280}
			,'best_of':{'item':140}
			,'byline':{'avatar':40}
			,'social_icons':{'icon':60}
			,'potd':{'item':280}
			,'hssn':{'slider':620,'river':180,'article':480,'photovid':280} // hssn
			,'hssn_slider':{'item':620} // hssn
			,'hssn_river':{'item':180} // hssn
			,'hssn_article':{'inline':480} // hssn
			,'hssn_photo_vid':{'item':280} // hssn
			,'events':{'slideshow_small':'eSlideshow-s', 'slideshow_large':'eGallery-s', 'results':'eResults-s'}//constrain by height values on events page
			,'gallery': {'photo' : 600}
		}
	}else if(key <= 480){
		resimg.d('we are using the smallest imgset');
		imgset = {
			 'article':{'main':300,'related':140},'index':{'2story':300,'more':200,'best':260,'morning1':300,'major2':300,'major1':300,'bigphoto':300},'homepage':{'2box':140} //backwards compatible set of values
			,'major_story_1':{'main':432,'video':161}
			,'major_story_2':{'main':432,'video':160}
			,'big_photo':{'main':458}
			,'two_box':{'left':220,'right':328}
			,'index_two_box':{'left':359,'right':359}
			,'special_report':{'main':262}
			,'morning_report_1':{'main':426,'add':140}
			,'morning_report_2':{'main':213,'add':140}
			,'river':{'item':180}
			,'event_box':{'main':262}
			,'opinion':{'item':60}
			,'blog_promo':{'item':60}
			,'highlight':{'main':280}
			,'best_of':{'item':140}
			,'byline':{'avatar':40}
			,'social_icons':{'icon':60}
			,'potd':{'item':280}
			,'hssn':{'slider':320,'river':120,'article':320,'photovid':280} // hssn
			,'hssn_slider':{'item':320} // hssn
			,'hssn_river':{'item':120} // hssn
			,'hssn_article':{'inline':320} // hssn
			,'hssn_photo_vid':{'item':280} // hssn
			,'events':{'slideshow_small':'eSlideshow-p', 'slideshow_large':'eGallery-p', 'results':'eResults-p'}//constrain by height values on events page
			,'gallery': {'photo' : 480}
		}
	}
	//setting the vars so they are global and can be accessed by other functions
		window.resimg.imgset = imgset;
		//resimg.d('This is the full set used:\n'+JSON.stringify(imgset)+'\n\n');
}

resimg.getAffil = function(affil) {
/*   
		this function is for getting the affil shortname/server directory based on the domain name
*/
	resimg.d('*******running resimg.getAffil('+affil+')*******');
	try{
    //create affil map if it doesn't already exist
	    if (!window.resimg.affilMap) {
			resimg.d('The affilMap did not exist so we are creating it now');
	        affilMap = new Object();
	        affilMap.al = "bama",
	        affilMap.cleveland = "cleve",
	        affilMap.fed = "fed",
	        affilMap.gulflive = "gulf",
	        affilMap.lehighvalleylive = "lvlive",
	        affilMap.masslive = "mass",
	        affilMap.mlive = "mlive",
	        affilMap.nj = "njo",
	        affilMap.nola = "nola",
	        affilMap.oregonlive = "olive",
	        affilMap.pennlive = "penn",
	        affilMap.silive = "silive",
	        affilMap.syracuse = "syr",
			affilMap.annarbor = "aa",
			affilMap.brightcove = "b",
			affilMap.advance = "adv";
			affilMap['media'] = "tumblr";
	        window.resimg.affilMap = affilMap;
	    }
		resimg.d('The output is: '+window.resimg.affilMap[affil.toLowerCase()]);
	    return window.resimg.affilMap[affil.toLowerCase()];
	}catch(e){
		resimg.d('The following error occured: '+e.message);
		return false;
	}
}

resimg.respath = function(position, path){
/*
	this function takes the image position and the path and spits back out the imgick path
*/
	resimg.d('########## running resimg.respath('+position+', '+path+')');
	if (position === undefined){
		resimg.d('the position was undefined so we are returning the path unaltered');
		return path;
	}else if(path.indexOf('https') !== -1){
		resimg.d('image is on a secure server so we are returning the path unaltered');
		return path;
	}else{
		try{
			var imgPath = path.replace('http://','')
				//,imgPath = imgPath.replace('https://','')
				,cdom = ARCS.cookie_domain.substring(1) //this is the current site domain as defined in the ARCS object from adv_region.js
				;
			//check if we are using a relative path or not
			if (imgPath.charAt(0)==="/"){
				imgPath = "media."+cdom+imgPath;
				resimg.d("imgPath is relative so we've changed it to: "+imgPath);
			}
			var imgHost = imgPath.split('/')[0]
				,imgD = imgHost.split('.')
					,subDom = imgD[0]
					,affil = imgD[1]
					,dompro = imgD[2]
					,affilKey
				
				,alias = resimg.getAffil(affil)
				,imgP = position.split('-')
					,imgPg = imgP[0]
					,imgPlace = imgP[1]
					,imgdir = (!isNaN(window.resimg.imgset[imgPg][imgPlace]))? "width" : ""
				,imgickkey = (window.resimg.imgset != null)? imgdir+window.resimg.imgset[imgPg][imgPlace] : 0;
				resimg.d('altering image path using these vars:\n subDom:'+subDom+'\n affil:'+affil+'\n cdom:'+cdom+'\n domain protocol:'+dompro+'\n imgickkey:'+imgickkey+' (position: '+position+')');
			
			if (alias&&subDom !== 'imgick'){
				var strippedPath = imgPath.replace(imgHost, '');
					strippedPath = strippedPath.replace(/\ |\%20/g,'%2520');
					strippedPath = strippedPath.replace(/hssn-media\.advance\.net/g,'');
			//!!exceptions:
				subDom = (imgD[0].indexOf('uat') !== -1)? 'uat' : imgD[0]; //this is a catch incase a uat testing domain is in use
				var devCheck = window.location.host.split('.')[0];
				//check if on dev
				var onDev = (devCheck.indexOf('dev') !== -1 || devCheck.indexOf('uat') !== -1)? true : false;
				var imgick = (onDev)? 'imgick.dev.advance.net' : 'imgick.'+cdom;
				if (imgHost.indexOf("tumblr") !== -1) affilKey = 'tumblr';
				else if ((subDom == 'brightcove01')||(subDom == 'brightcove01-secure')) affilKey = 'brightcove01';
				else if (subDom == "hssn-media-stage" || devCheck.indexOf("highschoolsports-uat") !== -1 ) affilKey = "adv-hssn-uat";
				else affilKey = alias+"-"+subDom;
			//!!
				imgPath = imgick + "/home/" + affilKey + "/" + imgickkey + "/img" + strippedPath; //this is the real one
				imgPath = (onDev && (resimg.debug == true))? imgPath+resimg.cb : imgPath;
				resimg.d('image path altered successfully');
			
			}else if (alias&&subDom === 'imgick') {
				if (imgPath.indexOf('tumblr') !== -1) {
					affilkey = 'tumblr'
				} else if (imgPath.indexOf('hssn-media') !== -1) {
					affilkey = 'hssn-media';
				} else if (imgPath.indexOf('adv-media') !== -1) {
					affilkey = 'adv-media';
				} else if (imgPath.indexOf('advance-media') !== -1) {
					affilkey = 'advance-media';
				} else if (imgPath.indexOf('advance-media') !== -1) {
					affilkey = 'advance-media';
				} else if ((imgPath.indexOf('brightcove01') !== -1)||(imgPath.indexOf('brightcove01-secure') !== -1)) {
					affilkey = 'brightcove01'
				} else {
					affilkey = alias+'-media';
				}	
				imgPath = imgPath.replace(/\/home\/(.*)\/(.*)\/img/g, '/home/'+affilkey+'/'+imgickkey+'/img');
				resimg.d('affilkey == '+affilkey+'\nimgickkey == '+imgickkey+'\nimgPath == '+imgPath);
			}else{
				resimg.d('image cannot be imgicked, will use original image path');
			}
			
			resimg.d('returned image path: '+imgPath+'\n');
			return 'http://'+imgPath;
		}catch(e){
			resimg.d('The following error occured: '+e.message);
		}
	}
};


resimg.resimf = function() {
/*
	this function loops through all instances of resimg class and replaces them with <img> tags using the given parameters
*/
	$('.resimg').each(function (index, element) {
	    resimg.d('***resimf loop: '+index+' ***');
	    //extract the data from the element
	    var $el = $(this);
	    var imgID = (typeof $el.attr('id') === 'string')? $el.attr('id'): '',
	        imgClass = $el.attr('class').replace('resimg', ''),
	        imgAlt = $el.html().replace(/(["])/g, "&quot;"),
	        imgPath = $el.data('image').replace('http://',''),
		imgPath = resimg.respath($el.data('position'),imgPath);
		//swap out the previous element w/ the new one	
		if ($el.attr('data-big') == undefined) {
	        $el.replaceWith("<img id=\"" + imgID + "\" class=\"" + imgClass + "\" alt=\"" + imgAlt + "\" src=\"" + imgPath + "\" />"); 
		} else {
		 $el.replaceWith("<a href=\""
				 + imgPath + "\"><img id=\""
				 + imgID + "\" class=\""
				 + imgClass + "\" alt=\""
				 + imgAlt + "\" src=\""
				 + $el.attr("data-thumb") + "\""
				 + " data-big=\"" + $el.attr("data-big") + "\""
                                 + " data-title=\"" + $el.attr("data-title").replace(/(["])/g, "&quot;") + "\""
                                 + " data-titleurl=\"" + $el.attr("data-titleurl") + "\""
                                 + " data-description=\"" + $el.attr("data-description").replace(/(["])/g, "&quot;") + "\""
                                 + " data-credit=\"" + $el.attr("data-credit").replace(/(["])/g, "&quot;") + "\""
                                 + " data-author=\"" + $el.attr("data-author").replace(/(["])/g, "&quot;") + "\""
                                 + " data-author-username=\"" + $el.attr("data-author-username").replace(/(["])/g, "&quot;") + "\""
                                 + " data-tags=\"" + $el.attr("data-tags") + "\""
                                 + " data-keywords=\"" + $el.attr("data-keywords") + "\""
                                 + " data-moderate=\"" + $el.attr("data-moderate") + "\""
                                 + " data-authorlink=\"" + $el.attr("data-authorlink") + "\""
                                 + " data-buy=\"" + $el.attr("data-buy") + "\" /></a>");
;
		}
		resimg.d('original markup replaced with img tag\n\n\n');
		
	});
}



