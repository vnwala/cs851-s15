
/* 
 * HTML5 Audio
 */
var AudioPlayer = function(src){
	this.initialize();
	if (src){
		this.loadSound(src);
	}
};

AudioPlayer.prototype = {
	audioobj : false,
	initialize : function(){
		if (this.audioobj != false) return;
		try{
			this.audioobj = new Audio("");
		}catch(e){
			// do nothing
		}
	},
	loadSound : function(src){
		if (this.audioobj  && src.match(/^[a-z_]+$/)){
			src = "/wav/" + src;
			if (this.audioobj.canPlayType("audio/wav")){
				src += ".wav";
			}else if (this.audioobj.canPlayType("audio/mp3")){
				src += ".mp3";
			}else if (this.audioobj.canPlayType("audio/mpeg")){
				src += ".mp3";
			}else{
				src += ".wav";
			}
		}
		this.initialize();
		if (this.audioobj){
			this.audioobj.autoplay = true;
			this.audioobj.src = src;
			this.audioobj.load();
		}
	},
	setVolume : function(vol){
		if (this.audioobj){
			this.audioobj.volume = vol;
		}
	},
	play : function(src, loop){
		this.initialize();
		if (src){
			this.loadSound(src);
		}
		if (this.audioobj){
			if (loop){
				this.audioobj.loop = true;
			}else{
				this.audioobj.loop = false;
			}
			this.audioobj.play();
		}
	},
	stop : function(){
		if (this.audioobj){
			try{
				this.audioobj.pause();
				this.audioobj.currentTime = 0;
			}catch(e){
				this.audioobj.stop();
			};
		}
	}
}

/* 
 * Point Charger
 */
var PointChanger = function(to, sound){
	if ($("#point").length < 1) return; // no point
	from = parseInt($("#point").text());
	this.start(from, to, sound);
}

PointChanger.prototype = {
	start : 0,
	end : 0,
	from : 0,
	to : 0,
	player : false,
	start : function(from, to, sound){
		this.start = parseInt((new Date)/1);
		this.from = from;
		this.to = to;
		if (from < to){
			this.end = this.start + 2000; // increment 2sec
		}else{
			this.end = this.start + 1000; // decrement 1sec
		}
		if (sound){
			this.player = new AudioPlayer();
			this.player.setVolume(0.5);
			if (from < to){
				this.player.play("puhi", true);
			}else{
				this.player.play("shuiin", false);
			}
		}
		var thisobj = this;
		setTimeout(function(){thisobj.update();}, 10);
	},
	update : function(){
		var current = parseInt((new Date)/1);
		if (current > this.end){
			$("#point").text(this.to);
			if (this.player){
				this.player.stop();
				this.player = false;
			}
		}else{
			var val = this.from + (this.to - this.from) * (current - this.start) / (this.end - this.start);
			$("#point").text(parseInt(val));
			var thisobj = this;
			setTimeout(function(){thisobj.update();}, 10);
		}
	}
};


/* 
 * Image Loader
 */


var ImageLoader = function(id, url, s){
	var elm = document.getElementById(id);
	if (elm){
		this.elm = elm;
		this.url = url;
		if (s > 0) this.interval = s;
		var target = this;
		this.timer = setInterval(
				function(){
					target.start();
				}, this.interval);
		this.start();
	}
}

ImageLoader.prototype = {
	elm : null,
	url : null,
	num : 0,
	interval : 1000,
	timer: null,
	start : function(){
		var target = this;
		target.elm.src = this.url + "&" + parseInt((new Date)/1000);
	}
}

function auto_update_image(elm, src, interval){
	if (!src) src = elm.src;
	if (!elm.from){
		elm.from = parseInt((new Date)/1000);
	}else if (parseInt((new Date)/1000) - elm.from > interval){
		return;
	}
	setTimeout(function(){
			   var i = new Image();
			   i.onload = function(e){
				elm.onload = function(){
						auto_update_image(elm, src, interval);
				}
			   elm.src = i.src;
			  }
			  i.src = src + "?d=" + parseInt((new Date)/1);
			 }, 2000);
	
}



function start_uptimer(elementid, from){
	var d = new Date;
	return setInterval(
		function(){
			interval = parseInt((new Date)/1000) - parseInt(d/1000) + from;
			$(elementid).text(get_time_string(interval));
		}, 1000);
}

function start_downtimer(elementid, from){
	var d = new Date;
	return setInterval(
		function(){
			interval = from - (parseInt((new Date)/1000) - parseInt(d/1000));
			if (interval < 0) interval = 0;
			$(elementid).text(get_time_string(interval));
		}, 1000);
}

function get_time_string(sec){
	var s = "";
	if (sec > 3600){
		s = "" + parseInt(sec /3600) + ":";
		sec -= 3600 * parseInt(sec / 3600);
	}
	s += zeropad(parseInt(sec / 60), 2) + ":" + zeropad(sec % 60, 2);
	return s;
}

function zeropad(s, len){
	s = "" + s;
	while (s.length < len){
		s = "0" + s;
	}
	return s;
}


function get_string_width(str){
	var width = 0;
	for (var i = 0; i < str.length; i++){
		var chars = str.substr(i, 1);
		var code = chars.charCodeAt(0);
		width++;
		if (code > 127){
			width++;
		}
	}
	return width;
}

String.prototype.Trim =
function()
{
    return this.replace(/^\s+|\s+$/g, "");
}


function getFlashMovieaudioobj(movieName){
    if(document.embeds[movieName])
    return document.embeds[movieName];
    if(window.document[movieName])
    return window.document[movieName];
    if(window[movieName])
    return window[movieName];
    if(document[movieName])
    return document[movieName];
    return null;
}


var tfb={};tfb.allowedLabels=["follow-me","follow-us","follow","my-twitter"];tfb.defaultTop=78;tfb.defaultColor="#35ccff";tfb.isInArray=function(str,ar){if(ar.length<1)return;for(var i=0;i<ar.length;i++){if(ar[i]==str){return true;break;}}
return false;}
tfb.showbadge=function(){if(!window.XMLHttpRequest){return;}
if(document.getElementById('twitterFollowBadge')){document.body.removeChild(document.getElementById('twitterFollowBadge'));}
if(tfb.top<0||tfb.top>1000||isNaN(tfb.top)){tfb.top=tfb.defaultTop;}
if(!tfb.isInArray(tfb.label,tfb.allowedLabels)){tfb.label=tfb.allowedLabels[0];}
var validColorPattern=/^#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/;if(!validColorPattern.test(tfb.color)||(tfb.color.length!=4&&tfb.color.length!=7)){tfb.color=tfb.defaultColor;};if(tfb.side!='l'){tfb.side='r';}
tfb.tabStyleCode='position:fixed;'+'top:'+tfb.top+'px;'+'width:30px;'+'height:119px;'+'z-index:8765;'+'cursor:pointer;'+'background:'+tfb.color+' url(http://files.go2web20.net/twitterbadge/1.0/bg-badge/'+tfb.label+'.png);'+'background-repeat:no-repeat;';tfb.aboutStyleCode='position:absolute;'+'top:'+(parseInt(tfb.top)+107)+'px;'+'width:10px;'+'height:11px;'+'z-index:9876;'+'cursor:pointer;'+'background:url(http://files.go2web20.net/twitterbadge/1.0/icon-about.png);'+'background-repeat:no-repeat;';if(tfb.side=='l'){tfb.tabStyleCode+='left:0; background-position:right top;';tfb.aboutStyleCode+='left:0;';}else{tfb.tabStyleCode+='right:0; background-position:left top;';tfb.aboutStyleCode+='right:0;';}
tfbMainDiv=document.createElement('div');tfbMainDiv.setAttribute('id','twitterFollowBadge');document.body.appendChild(tfbMainDiv);tfbMainDiv.innerHTML='<div id="tfbTab" style="'+tfb.tabStyleCode+'"></div><div id="tfbAbout" style="'+tfb.aboutStyleCode+'"></div>'+'<style>#tfbAbout{visibility:hidden;} #twitterFollowBadge:hover #tfbAbout{visibility:visible;}</style>';document.getElementById('tfbTab').onclick=function(){window.open('http://twitter.com/'+tfb.account);}
document.getElementById('tfbAbout').onclick=function(){window.open('http://www.go2web20.net/twitterFollowBadge/');}}
