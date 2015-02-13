var emBoxWidth = 840; // heydouga.com/common/css/embed.style body #embedBox{width:840px}
function AffEmbed(){
var broser = navigator.userAgent;
var affiSiteIds ={
	"heyzo":"450",
	"heydouga":"352",
	"av9898":"363",
	"girldaisuki":"371",
	"takaradajyo":"426",
	"aquarium":"263",
	"honnamatv":"440",
	"nukennoka":"461",
	"1000giri":"325",
	"mesubuta":"317",
	"nyoshin":"361",
	"kinpatu86":"481",
	"tokyo-douga":"470",
	"tousatsudou":"415",
	"akibahonpo":"259",
	"h4610":"262",
	"h0930":"286",
	"c0930":"318",
	"h0930w":"425",
	"h0230":"367",
	"unkotare":"378",
	"xxxjg":"44",
	"xxxjw":"373",
	"xxxjs":"377",
	"kin8tengoku":"356",
	"asiatengoku":"427",
	"gachinco":"357",
	"manholejp":"453",
	"a-vod":"503"
	}
this.findAffiBtn = function(player,w,h){
		var affTag;
		var tag = document.getElementsByTagName('a');
		for(var i= 0, l=tag.length; i<l; i++){
			if(tag[i].href.match(/affiliate-dti/)){
				affTag = tag[i];
			}
		}
		var zipBtn = new Image();
		zipBtn.setAttribute("id","zipBtn");
		zipBtn.src = "http://www.heydouga.com/common/images/zip-btn.gif"
		zipBtn.style.margin = "0 0 0 5px";
		zipBtn.style.verticalAlign = "middle";
		//zipBtn.style.cursor = "pointer";
		zipBtn.onclick = function(){
			galleryImg(emzip)
		};

		var dtiLog = new Image();
		dtiLog.src = "http://www.heydouga.com/common/images/dti_log.png";
		dtiLog.style.margin = "0 0 0 5px";
		dtiLog.style.verticalAlign = "top";
		var makeCodeTag = document.createElement('a');
		makeCodeTag.setAttribute("id","makeCodeTag");
		makeCodeTag.appendChild(dtiLog);
		makeCodeTag.onclick = function(e){
		var o=(e)?e.target:event.srcElement;
		createEmbedBox(o);
		}
		
		var parentTag = affTag.parentNode;
		parentTag.insertBefore(makeCodeTag, affTag.nextSibling);
		if(typeof emzip !== "undefined") parentTag.insertBefore(zipBtn, makeCodeTag.nextSibling);
		
		createEmbedBox = function(o){
			var oofsettop = document.documentElement.scrollTop || document.body.scrollTop;;
			var bgBox = document.createElement("div");
			var windowWidht = document.body.clientWidth;
			var windoHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			bgBox.setAttribute("id","embedBg");
			bgBox.style.backgroundImage = 'url(http://www.heydouga.com/common/images1209/opacity85_black.png)';
			bgBox.style.width = windowWidht+"px";
			bgBox.style.height = windoHeight+"px";
			bgBox.style.position = "absolute";
			bgBox.style.color="white";
			bgBox.style.zIndex = "1000";
			bgBox.style.top = "0";
	
			var embedBox = document.createElement("div");
			embedBox.setAttribute("id","embedBox");
			embedBox.style.backgroundImage = 'url(http://www.heydouga.com/common/images1209/opacity85_black.png)';
			var emBoxPos = (windowWidht - emBoxWidth)/2;
			embedBox.style.marginLeft = emBoxPos+"px";
			embedBox.style.top = oofsettop+"px";
	
			var h2 = document.createElement("h2");
			var h2Text = document.createTextNode("<embedタグ>　コピペで使える貼り付けプレイヤー");
			floating(h2,'left');
			h2.appendChild(h2Text);
	
			var closBtn = document.createElement("span");
			closBtnText = document.createTextNode("閉じる");
			floating(closBtn,'right');
			closBtn.style.cursor = "pointer";
			closBtn.style.padding = "2px";
			closBtn.style.fontSize = "20px";
			closBtn.appendChild(closBtnText);
			closBtn.onclick = function(){
				var embedBg = document.getElementById("embedBg");
				 embedBg.parentNode.removeChild(embedBg);
				}

			var affidBox = document.createElement("div");
			affidBox.setAttribute("id","affidBox");
			//affidBox.style.width = "235px";
			var affidText = document.createTextNode("アフィリエイトID：");
			//affidBox.style.clear = "both";
			//affidBox.style.height = "50px";
			var affidFild = document.createElement("input");
			affidFild.setAttribute("id","affid");
			//affidFild.style.width="80px";
			//floating(affidFild,'right');
			affidBox.appendChild(affidText);
			affidBox.appendChild(affidFild);
			
			var playerSize = document.createElement("div");
			playerSize.setAttribute("id","playerSize");
			var pPlayerSize = document.createElement("p");
			pPlayerSize.setAttribute("id","pPlayerSize");
			var playerSizeText = document.createTextNode("プレイヤーサイズ:");

			var pwidth = document.createElement("p");
			var widthText = document.createTextNode("width:");
			
			var heightText = document.createTextNode("height:");
			var pheight = document.createElement("p");
			var playerWidth = document.createElement("input");
			pwidth.appendChild(widthText);
			pwidth.appendChild(playerWidth);

			playerWidth.setAttribute("id","playerWidth");
			playerWidth.setAttribute("value",w);
			var playerHeight = document.createElement("input");
			
			playerHeight.setAttribute("id","playerHeight");
			playerHeight.setAttribute("value",h);

			pPlayerSize.appendChild(playerSizeText);
			pheight.appendChild(heightText);
			pheight.appendChild(playerHeight);
			
			
			playerSize.appendChild(pPlayerSize);
			playerSize.appendChild(pwidth);
			playerSize.appendChild(pheight);
			
			
			var embedCodeFild = document.createElement("input");
			embedCodeFild.setAttribute("id","embedCode");
			embedCodeFild.onclick = function(){embedCodeFild.select();}
			
			var makeEmbedCode = document.createElement("p");
			var makeEmbedCodeText = document.createTextNode("embed コード作成");
			makeEmbedCode.setAttribute('id','makeEmbedCode');
			makeEmbedCode.appendChild(makeEmbedCodeText)	;
			makeEmbedCode.onclick = function(){
				var affid = document.getElementById("affid").value;
				if(!affid.match(/^[0-9]+$/)){
					alert('アフィリエイトID に番号をいれてください。');
				}else{
					var embedview = document.getElementById('embedview');
					if(embedview != null){embedview.parentNode.removeChild(embedview);}
					var embedviewBox = document.createElement("div");
					var pWidth = document.getElementById("playerWidth").value;
					var pHeight = document.getElementById("playerHeight").value;
						embedviewBox.style.width = pWidth+"px";
						embedviewBox.style.margin = "10px auto";
						embedviewBox.setAttribute("id","embedview");
						embedBox.appendChild(embedviewBox);


					var domain = location.hostname.replace(/members/,'www');
					var switchDomain = domain;
					var affsiteID;
					
					for(var s in affiSiteIds){
						if(domain.match(s)) affsiteID = affiSiteIds[s];
						}

					
					if((affsiteID == '363') || (affsiteID == '371') || (affsiteID == '426') || (affsiteID == '263') || (affsiteID == '440') || (affsiteID == '461')){/*HEY動画月額　D2P　ID*/
						//switchDomain = "www.heydouga.com"
						var heydougaMonthly = domain.replace(/www.|.heydouga.com/g,'');
						var clickID = "http://click.dtiserv2.com/Direct/8881888-"+affsiteID+"-"+affid+"/monthly/"+heydougaMonthly+"/moviepages/"+emid+"/index.html";
					}else{
					
					var clickID = "http://click.dtiserv2.com/Direct/8881888-"+affsiteID+"-"+affid+"/moviepages/"+emid+"/index.html";
					}
					//
					var embedScript = "<script name='setAffplayer"+emid+"' id='setAffplayer"+emid+"' type='text/javascript' src='http://affiliate.dtiserv.com/js/setAffplayer.js?affid="+affid+"&siteid="+affsiteID+"&video="+emvideo+"&img="+emimg+"&w="+pWidth+"&h="+ pHeight +"&url="+switchDomain+"&id="+ emid +"'></script>";
					var embedCode = '<object width="'+ pWidth +'" height="'+ pHeight +'" ><param name="allowFullScreen" value="true"></param><param name="base" value="http://'+domain+'/"><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><param name="quality" value="hight"></param><embed width="'+ pWidth +'" height="'+ pHeight +'" name="movie1" id="movie1" base="'+domain+'/" src="http://'+switchDomain+player+'?id='+ emid +'&clickID='+clickID+'&site='+domain+'&img='+emimg+'&video='+emvideo+'" type="application/x-shockwave-flash"/></object>';
					embedviewBox.innerHTML = embedCode;
					var embedCodeInput = document.getElementById("embedCode");
					embedCodeInput.style.display = "inline-block";
					embedCodeInput.value = embedScript;
					}
				
				}
							
			embedBox.appendChild(h2);
			embedBox.appendChild(closBtn);
			embedBox.appendChild(affidBox);
			embedBox.appendChild(playerSize);
			embedBox.appendChild(makeEmbedCode);
			embedBox.appendChild(embedCodeFild);
			bgBox.appendChild(embedBox);
			document.body.appendChild(bgBox);

		}
		function floating(o,d){
			return (broser.match(/MSIE/))?o.style.styleFloat=d:o.style.cssFloat = d;
			}
	}
}

document.write('<link rel="stylesheet" type="text/css" href="http://www.heydouga.com/common/css/embed.css" />');


if(typeof emid !== "undefined"){
        if(typeof playerLink == "undefined") {var playerLink = "/assets/embedplayer.swf";}
        if(typeof playerwidht == "undefined") {var playerwidht = "450";}
        if(typeof playerheight == "undefined") {var playerheight = "283";}
         
        affi = new AffEmbed;

        affi.findAffiBtn(playerLink,playerwidht,playerheight);
}

window.onresize = function() {
	if(document.getElementById('embedBox')){
	windowWidht = document.body.clientWidth;
	//windoHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
	emBoxPos = (windowWidht - emBoxWidth)/2;
	document.getElementById('embedBox').style.marginLeft = emBoxPos+"px";
	document.getElementById('embedBg').style.width = windowWidht+"px";
	//document.getElementById('embedBg').style.height = windoHeight+"px";
	}
}

function galleryImg(link){document.location.href =link;}