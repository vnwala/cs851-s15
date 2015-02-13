function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function set_divs(){
var type_check = '';


  var thumbnail_cookie = get_cookie ( "thumbsSortOrder3" );
  if(thumbnail_cookie){
    var sections = thumbnail_cookie.split(",");
    for(i=0;i<3;i++){
      var parts = sections[i].split(":");
      if(parts[0] == 'thumbsouter' && parts[1]== 'none'){
	if (document.all){
          document.all['thumbshere'].style.display="none";
	  document.all['thumbshere'].style.opacity='0';
	  document.all['thumbshere'].style.height='0px';
	} else {
          document.getElementById("thumbshere").setAttribute("style","display: none; opacity: 0; height: 0px;");
	}
      } else if(parts[0] == 'sessionouter' && parts[1]== 'none'){
        if (document.all){
          document.all['sessionhere'].style.display="none";
          document.all['sessionhere'].style.opacity='0';
          document.all['sessionhere'].style.height='0px';
        } else {
          document.getElementById("sessionhere").setAttribute("style","display: none; opacity: 0; height: 0px;");
	}
      } else if(parts[0] == 'twoshotouter' && parts[1]== 'none'){
        if (document.all){
          document.all['twoshothere3'].style.display="none";
          document.all['twoshothere3'].style.opacity='0';
          document.all['twoshothere3'].style.height='0px';
        } else {
          document.getElementById("twoshothere3").setAttribute("style","display: none; opacity: 0; height: 0px;");
	}
      } else if(parts[0] == 'thumbsouter' && parts[1]== 'block'){
	if (document.all){
          document.all['thumbshere'].removeAttribute('style');
        } else {
          document.getElementById("thumbshere").setAttribute("style","");
	}
      } else if(parts[0] == 'sessionouter' && parts[1]== 'block'){
        if (document.all){
          document.all['sessionhere'].removeAttribute('style');
        } else {
          document.getElementById("sessionhere").setAttribute("style","");
	}
      } else if(parts[0] == 'twoshotouter' && parts[1]== 'block'){
        if (document.all){
          document.all['twoshothere3'].removeAttribute('style');
        } else {
          document.getElementById("twoshothere3").setAttribute("style","")
	}
      }
    }
  }
}

function categoryView(cat, page, usertype) {
    var params = '';
    var all = 'false';


    if(!usertype){
      var usertype = '';
    }
	global_tab_cat = cat;
    if(cat == 'dxstudio'){
    }

    if(usertype == 'reg' || usertype == 'vip'){
    if(cat && cat != 'online_performers' && cat != 'favorite_performers' && cat != 'mygirl' && cat != 'moviethumbs'){
      if (document.all){
        document.all['twoshotouter3'].removeAttribute('style');
      } else {
        document.getElementById("twoshotouter3").setAttribute("style","");
      }

      if (document.all){
        document.all['twoshotouter1'].style.display="none";
        document.all['twoshotouter1'].style.opacity='0';
        document.all['twoshotouter1'].style.height='0px';
      } else {
        document.getElementById("twoshotouter1").setAttribute("style","display: none; opacity: 0; height: 0px;");
      }
    } else if(cat == 'online_performers'){
      $.get( '/search/twoshot_count?'+ $.now(), function(twoshot_count){
        if(twoshot_count > 0){
          if (document.all){
            document.all['twoshotouter1'].removeAttribute('style');
          } else {
            document.getElementById("twoshotouter1").setAttribute("style","");
          }
        }
        if(twoshot_count == 0){
          if (document.all){
            document.all['twoshotouter1'].style.display="none";
            document.all['twoshotouter1'].style.opacity='0';
            document.all['twoshotouter1'].style.height='0px';
          } else {
            document.getElementById("twoshotouter1").setAttribute("style","display: none; opacity: 0; height: 0px;");
          }
        }
        if(twoshot_count < 0){
          if (document.all){
            document.all['twoshotouter3'].removeAttribute('style');
          } else {
            document.getElementById("twoshotouter3").setAttribute("style","");
          }
        } else {
          if (document.all){
            document.all['twoshotouter3'].style.display="none";
            document.all['twoshotouter3'].style.opacity='0';
            document.all['twoshotouter3'].style.height='0px';
          } else {
            document.getElementById("twoshotouter3").setAttribute("style","display: none; opacity: 0; height: 0px;");
          }
        }
      });
    } else if(cat == 'favorite_performers' || (cat == 'mygirl' && isFreeUser()) || cat == 'moviethumbs'){
      if (document.all){
        document.all['twoshotouter1'].style.display="none";
        document.all['twoshotouter1'].style.opacity='0';
        document.all['twoshotouter1'].style.height='0px';
        document.all['twoshotouter3'].style.display="none";
        document.all['twoshotouter3'].style.opacity='0';
        document.all['twoshotouter3'].style.height='0px';
      } else {
        document.getElementById("twoshotouter1").setAttribute("style","display: none; opacity: 0; height: 0px;");
        document.getElementById("twoshotouter3").setAttribute("style","display: none; opacity: 0; height: 0px;");
      }
    } else if(cat == 'mygirl'){
      if (document.all){
        document.all['twoshotouter1'].style.display="none";
        document.all['twoshotouter1'].style.opacity='0';
        document.all['twoshotouter1'].style.height='0px';
      } else {
        document.getElementById("twoshotouter1").setAttribute("style","display: none; opacity: 0; height: 0px;");
      }
      if (document.all){
        document.all['twoshotouter3'].removeAttribute('style');
      } else {
        document.getElementById("twoshotouter3").setAttribute("style","");
      }
    }
    }

    switch(cat){
        case 'online_performers':
            //params = '&online=1&order_by=random';
	    if(usertype == 'guest'){
	      urchinTracker("/menuclick/guest/1online");
	    } else if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/1online");
	    } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/1online");
	    }
            params = '&online=1';
	    all='true';
            break;
        case 'global':
            params = '&online=1&order_by=random&en=1';
	    all='true';
            break;
        case 'vibeuse_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/guest/3toy");
              params = '&category=3406,3411&hide_mobile=1';
            } else if(usertype == 'reg'){
              urchinTracker("/menuclick/reg/2toy");
              params = '&category=3406,3411&order_by=popular&hide_mobile=1';
            } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/2toy");
              params = '&category=3406,3411&order_by=popular&hide_mobile=1';
            }
            break;
        case 'dxstudio':
            params = '&category=9101&hide_mobile=1';
            break;
        case 'voice_performers':
            params = '&category=3401';
            break;
        case 'recommended_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/guest/4recommended");
              params = '&recommendedGold=recommendedGold&hide_mobile=1';
            } else if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/3recomended");
              params = '&recommendedGold=recommendedGold&order_by=popular&hide_mobile=1';
            } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/3recomended");
              params = '&recommendedGold=recommendedGold&order_by=popular&hide_mobile=1';
            } else {
              params = '&recommendedGold=recommendedGold&hide_mobile=1'; //1&not_new=1';
		    }
            break;
/*        case 'has_hires_performers':
            params = '&category=3403';
            break;
*/
        case 'new_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/guest/5newgirl");
              params = '&active_days=60&hide_mobile=1';
            } else if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/4newgirl");
              params = '&active_days=60&order_by=popular&hide_mobile=1';
            } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/4newgirl");
              params = '&active_days=60&order_by=popular&hide_mobile=1';
            }
            break;
        case 'housewives_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/guest/6housewife");
            } else if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/5housewife");
	    }
            params = '&category=2003';
            break;
		case 'milf_performers':
            if(usertype == 'guest'){
                //urchinTracker("/menuclick/guest/6housewife");
            } else if(usertype == 'reg'){
                //urchinTracker("/menuclick/reg/5housewife");
            }
            params = '&milf=milf&hide_mobile=1';
            break;
	case 'big_tits_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/guest/2bigbreast");
            } 
	    params = '&big_breast=1&hide_mobile=1';
	    break;
        case 'birthmonth_performers':
            params = '&birth_month=1';
            break;
        case 'free_performers':
            params = '&session_type=110';
            break;
	case 'show_face_performers':
	    urchinTracker("/menuclick/guest/7faceok");
	    params = '&category=3801&order_by=popular&hide_mobile=1';
	    break;
        case 'moviethumbs':
            if (isVIP()) {
		urchinTracker("/menuclick/vip/7livepreview");
                params = '&session_type=110&moviethumbs=1&hide_mobile=1';
                total_limit = typeof(moviethumb) != 'undefined' ?moviethumb : '18';
                params += '&force_limit=1&limit='+total_limit+'&page=' + ( ( typeof( page ) != 'undefined' ) ? page : '1' );
            }
            break;
	case 'couponOK_performers':
            params = '&coupon=1&category=9902&order_by=coupon';
            break;
/*        case 'couponOK_performers':
            params = '&category=9902&not_hd=1&order_by=random';
            break;
*/
        case 'cosplay_campaign':
            params = '&category=9003&order_by=random';
            break;
        case 'has_hires_performers':
            params = '&category=3407&hd_chat=1&is_server_type=12&order_by=random';
            break;

        case 'document_order_performers':
            params = '&category=9003';
            break;
        case 'fc_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/guest/8fanclub");
            } else if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/7fanclub");
            } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/6fanclub");
            }
            params = '&fanclub=1&order_by=popular&hide_mobile=1';
            all = 'true';
            break;
	case 'favorite_performers':
            if(usertype == 'guest'){
              urchinTracker("/menuclick/reg/6favorite");
            } else if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/6favorite");	
            } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/5favorite");
            }
	    params = '/favorite?thumbnails=dx&hide_mobile=1';
	    all = 'true';
	    break;
	case 'dvr_performers':
	    params = '&dvr_ok=1';
	    all = 'true';
	    break;
	case 'mygirl':
            if(usertype == 'reg'){
	      urchinTracker("/menuclick/reg/8mygirl");
            } else if(usertype == 'vip'){
	      urchinTracker("/menuclick/vip/8mygirl");
            }

	    params = '&save_search=1&order_by=popular&hide_mobile=1';
	    break;

    }



//    params += ( cat == 'global' ) ? '&en=1' : '&not_en=1';
//    if(all == 'true'){
//    } else {
//      params += '&not_en=1';
//    }

    if(all == 'true'){
    } else {
        if (isAdmin() && location.pathname == '/admin'){
              params += '&not_en=0';
        }else {
              params += '&not_en=1';
        }
    }

    if( isFreeUser() && ( cat == 'mygirl' ) ){
      var thumbshere = document.getElementById('thumbshere');
      thumbshere.innerHTML = '<div align="center"><a href="/join.html">'
      + '<img src="/img/mygirl/msg2.jpg"></a></div>';	
					
      blocking_search("thumbstitle");
      blocking_search("sessiontitle");
      blocking_search("sessionhere");
      //blocking_search("twoshottitle");
      //blocking_search("twoshothere");
    } else if (isUser() || isVIP()) {
      display("sessionhere");
//      display("twoshothere");

      if(usertype != 'guest'){
 	    blocking_search("mygirltxt");
      }
      if (cat == 'favorite_performers'){
//        document.getElementById("thumbshere").setAttribute("style","");
        if (document.all){
          document.all['thumbshere'].removeAttribute("style");
        } else if (document.getElementById){
          document.getElementById("thumbshere").setAttribute("style","");
        }
	    xmlHttpGet(params, 'thumbshere');
        blocking_search("thumbstitle");
        blocking_search("sessiontitle");
        blocking_search("sessionhere");
//        blocking_search("twoshottitle");
//        blocking_search("twoshothere");
        blocking_search("barnav_description_hooker");
      } else if (cat == 'online_performers') {
	    set_divs();
        display("thumbstitle");
        display("sessiontitle");
        //display("sessionhere");
//        display("twoshottitle");
        //display("twoshothere");
        if (isFreeUser()) {
          //document.thumbs.src ="/img/member/freePerformers_bar.jpg";
          //document.session.src ="/img/member/busyPerformers_bar.jpg";
          xmlHttpGet('/search?online=1&session_type=110&order_by=recom_random&freechat=2'+params+'&rand='+Math.random(), 'thumbshere');
          xmlHttpGet('/search?online=1&session_type=115,120,135&order_by=jp_en_then_wait_time'+params+'&rand='+Math.random(), 'sessionhere');
        } else {
          display("barnav_description_hooker");
          if (isUser()) {
            //document.session.src ="/img/member/busyPerformers_bar.jpg";
            //document.thumbs.src ="/img/member/freePerformers_bar.jpg";
          } else {
            //document.session.a ="/img/member/vip/busyPerformers_bar.jpg";
            //document.thumbs.a ="/img/member/vip/freePerformers_bar.jpg";
          }
          xmlHttpGet('/search?online=1&session_type=110&order_by=recom_random&freechat=2'+params+'&rand='+ Math.random(), 'thumbshere');
          xmlHttpGet('/search?online=1&session_type=115,120,135&order_by=jp_en_then_wait_time'+params+'&rand='+ Math.random(), 'sessionhere');
        }
//	display("twoshottitle");
        xmlHttpGet('/search?online=1&session_type=125,130&order_by=two_shot_minutes'+params+'&rand='+ Math.random(), 'twoshothere1');
        xmlHttpGet('/search?online=1&session_type=125,130&order_by=two_shot_minutes'+params+'&rand='+ Math.random(), 'twoshothere3');
      } else if( cat == 'moviethumbs' ){
        if (document.all){
          document.all['thumbshere'].removeAttribute("style");
        } else if (document.getElementById){
          document.getElementById("thumbshere").setAttribute("style","");
        }
	xmlHttpGet('/search?online=1&gets_hits=0&order_by=login_date&freechat=3&hide_mobile=1'+params+'&rand='+ Math.random(), 'thumbshere');
	blocking_search("thumbstitle");
	blocking_search("sessiontitle");
	blocking_search("sessionhere");
//	blocking_search("twoshottitle");
//	blocking_search("twoshothere");
        blocking_search("barnav_description_hooker");
      } else {
        set_divs();
  	    //xmlHttpGet('/search?online=1&gets_hits=0&order_by=random'+params+'&rand='+ Math.random(), 'thumbshere');
	    display("thumbstitle");
	    display("sessiontitle");
	  //display("sessionhere");
   //	display("twoshottitle");
     	//display("twoshothere");
   	    if(cat=="mygirl")
 	      display("mygirltxt");

	    if (isFreeUser()) {
          //document.thumbs.src ="/img/member/freePerformers_bar.jpg";
          //document.session.src ="/img/member/busyPerformers_bar.jpg";
          xmlHttpGet('/search?online=1&session_type=110&order_by=recom_random&freechat=2&hide_mobile=1'+params+'&rand='+Math.random(), 'thumbshere');
          xmlHttpGet('/search?online=1&session_type=115,120,135&order_by=jp_en_then_wait_time&hide_mobile=1'+params+'&rand='+Math.random(), 'sessionhere');
   	    } else {
          display("barnav_description_hooker");
	      if (isUser()) {
	        //document.session.src ="/img/member/busyPerformers_bar.jpg";
	        //document.thumbs.src ="/img/member/freePerformers_bar.jpg";
	      } else {
	        //document.session.src ="/img/member/vip/busyPerformers_bar.jpg";
	        //document.thumbs.src ="/img/member/vip/freePerformers_bar.jpg";
	      }

	      xmlHttpGet('/search?online=1&session_type=110&order_by=recom_random&freechat=2'+params+'&rand='+ Math.random(), 'thumbshere');
	      xmlHttpGet('/search?online=1&session_type=115,120,135&order_by=jp_en_then_wait_time'+params+'&rand='+ Math.random(), 'sessionhere');
	    }
	    display("twoshottitle");
        xmlHttpGet('/search?online=1&session_type=125,130&order_by=two_shot_minutes'+params+'&rand='+ Math.random(), 'twoshothere1');
        xmlHttpGet('/search?online=1&session_type=125,130&order_by=two_shot_minutes'+params+'&rand='+ Math.random(), 'twoshothere3');
      }
    } else {  // for guest
      if(cat == 'mygirl'){
	    var thumbshere = document.getElementById('thumbshere');
	    thumbshere.innerHTML = '<div align="center"><a href="/join.html">'
          + '<img src="/img/mygirl/msg1.jpg"></a></div>';	
 	    blocking_search("thumbstitle");
	    blocking_search("sessiontitle");
	  //blocking_search("sessionhere");
      //blocking_search("twoshottitle");
	  //blocking_search("twoshothere");
      } else {
        //display("sessionhere");
        //display("twoshothere");
        //display("thumbstitle");
        //display("sessiontitle");
        //display("sessionhere");
        //display("twoshottitle");
        //display("twoshothere");
  //	xmlHttpGet('/search?online=1&session_type=110&order_by=recom_random&freechat=2'+params+'&rand='+ Math.random(), 'thumbshere');
  //	xmlHttpGet('/search?online=1&session_type=115,120&order_by=jp_en_then_wait_time'+params+'&rand='+ Math.random(), 'sessionhere');
        xmlHttpGet('/search?online=1&order_by=fav_count_only'+params+'&rand='+ Math.random(), 'sessionhere');
  //	xmlHttpGet('/search?online=1&session_type=125,130&order_by=jp_2shot'+params+'&rand='+ Math.random(), 'twoshothere');
      }
    }

//__chrome27issue();
}

function blocking_search(id_name){
	if($('#'+id_name).length == 1){ // && (document.layers[id_name] || document.all[id_name] || document.getElementById(id_name))){
		if (document.layers){
			document.layers[id_name].display = 'none';
		} else if (document.all){
			document.all[id_name].style.display = 'none';
		} else if (document.getElementById){
			document.getElementById(id_name).style.display = 'none';
		}
	}
}

function display(id_name){
	if($('#'+id_name).length == 1){ // && (document.layers[id_name] || document.all[id_name] || document.getElementById(id_name))){
		if (document.layers){
			document.layers[id_name].display = 'block';
		//} else if (document.all){
		//	document.all[id_name].style.display = 'block';
		} else if (document.getElementById){
			document.getElementById(id_name).style.display = 'block';
		}
	}
}

function set_cookie ( name, value, path, domain, secure ){
  var cookie_string = name + "=" + escape ( value );

  var expires = new Date();
	expires.setMonth(expires.getMonth()+12);
  cookie_string += "; expires=" + expires.toGMTString();

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}

function get_cookie( cookie_name ){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function saveSearch(user_type){
	var currentSearchParam = get_cookie( 'currentSearch' );
	set_cookie ( "saveSearch", currentSearchParam);
  
	// counting RT79621
	//xmlHttpGetRedirect('/search/updateSavedSearchCount/');
	var utm_source = 'girlssearch';
	var utm_medium = 'save' + user_type;
	_userv = 2;
	_ucmd = 'save' + user_type;
	_ucsr = 'girlssearch';
	_page = 'searchSave?';

	urchinTracker();
	window.location = "/member/?utm_source=girlssearch&utm_medium=save" + user_type;
}

function xmlHttpGetRedirect(strURL){
  var xmlhttp = false;
  if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest(); //Mozilla/Safari/IE7/Chrome/Opera
  } else if (window.ActiveXObject){ //IE6/IE5
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  if(!xmlhttp) return;
	strURL += (strURL.indexOf('?')>0?'&t=':'?t=') + Math.random();  
    xmlhttp.open('GET', strURL, true);
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			window.location="/member";
    }
  }
  xmlhttp.send(null);
  return;
}

function tabga(cat)
{
    //GA tracking for category tabs.
    if( cat == 'online_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_online','eventAction':'click_online','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'favorite_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_favorite','eventAction':'click_favorite','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'mygirl')
        ga('send',{'hitType':'event','eventCategory':'sort_mygirl','eventAction':'click_mygirl','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'dxstudio')
        ga('send',{'hitType':'event','eventCategory':'sort_dxstudio','eventAction':'click_dxstudio','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'new_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_new','eventAction':'click_new','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'big_tits_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_busty','eventAction':'click_busty','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'fc_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_fanclub','eventAction':'click_fanclub','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'show_face_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_face','eventAction':'click_face','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'milf_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_wife','eventAction':'click_wife','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'vibeuse_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_toy','eventAction':'click_toy','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'recommended_performers')
        ga('send',{'hitType':'event','eventCategory':'sort_popular','eventAction':'click_popular','eventLabel':'sort','eventValue':1,'nonInteraction':true});
    else if( cat == 'moviethumbs')
        ga('send',{'hitType':'event','eventCategory':'sort_live','eventAction':'click_live','eventLabel':'sort','eventValue':1,'nonInteraction':true});
	
}

