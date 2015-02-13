function AffEmbed(){
var broser = navigator.userAgent;
var affiSiteIds ={
	heyzo:"450",
	heydouga:"352",
	"1000giri":"325",
	"nyoshin":"361"
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
		zipBtn.src = "http://heyzo.com/images/common/parts/zip-btn.gif"
		zipBtn.style.margin = "0 0 0 5px";
		zipBtn.style.verticalAlign = "middle";
		//zipBtn.style.cursor = "pointer";
		zipBtn.onclick = function(){
			galleryImg(emid)
		};
		
		var dtiLog = new Image();
		dtiLog.src = "http://heyzo.com/images/common/parts/dti_log.png";
		dtiLog.style.margin = "0 0 0 5px";
		dtiLog.style.verticalAlign = "middle";
		var makeCodeTag = document.createElement('a');
		makeCodeTag.appendChild(dtiLog);
		makeCodeTag.onclick = function(e){
		var o=(e)?e.target:event.srcElement;
		createEmbedBox(o);
		}
		
		var parentTag = affTag.parentNode;
		parentTag.insertBefore(makeCodeTag, affTag.nextSibling);
		parentTag.insertBefore(zipBtn, makeCodeTag.nextSibling);

		createEmbedBox = function(o){
			var oofsettop = o.offsetTop;
			var bgBox = document.createElement("div");
			var windowWidht = document.body.clientWidth;
			var windoHeight = document.body.clientHeight;
			bgBox.setAttribute("id","embedBg");
			bgBox.style.backgroundImage = 'url(http://heyzo.com/images/common/parts/opacity-75.png)';
			bgBox.style.width = windowWidht+"px";
			bgBox.style.height = windoHeight+"px";
			bgBox.style.position = "absolute";
			bgBox.style.color="white";
			bgBox.style.zIndex = "1000";
			bgBox.style.top = "0";
	
			var embedBox = document.createElement("div");
			embedBox.setAttribute("id","embedBox");
			embedBox.style.backgroundImage = 'url(http://heyzo.com/images/common/parts/opacity-75.png)';
			embedBox.style.width = "870px";
			embedBox.style.padding = "15px";
			embedBox.style.border = "1px solid";
			embedBox.style.margin = oofsettop-500+"px auto 0 auto";
	
			var h2 = document.createElement("h2");
			var h2Text = document.createTextNode("<embedタグ> 凄く簡単、コピペで使える貼り付けプレイヤー");
			floating(h2,'left');
			h2.style.fontSize = "20px";
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
			affidBox.style.width = "235px";
			var affidText = document.createTextNode("アフィリエイトID：");
			affidBox.style.clear = "both";
			affidBox.style.height = "50px";
			var affidFild = document.createElement("input");
			affidFild.setAttribute("id","affid");
			affidFild.style.width="80px";
			floating(affidFild,'right');
			affidBox.appendChild(affidText);
			affidBox.appendChild(affidFild);
			
			var playerSize = document.createElement("div");
			playerSize.style.width = "200px";
			var playerSizeText = document.createTextNode("プレイヤーサイズ:");
			var br = document.createElement("br");
			var widthText = document.createTextNode("width:");
			var heightText = document.createTextNode("height:");
			var brtwo = document.createElement("br");
			var playerWidth = document.createElement("input");
			floating(playerWidth,'right');
			playerWidth.setAttribute("id","playerWidth");
			playerWidth.setAttribute("value",w);
			var playerHeight = document.createElement("input");
			floating(playerHeight,'right');
			playerHeight.setAttribute("id","playerHeight");
			playerHeight.setAttribute("value",h);
			
			
			playerSize.appendChild(playerSizeText);
			playerSize.appendChild(br);
			playerSize.appendChild(widthText);
			playerSize.appendChild(playerWidth);
			playerSize.appendChild(brtwo);
			playerSize.appendChild(heightText);
			playerSize.appendChild(playerHeight);
			
			var embedCodeFild = document.createElement("input");
			embedCodeFild.setAttribute("id","embedCode");
			embedCodeFild.style.display = "none";
			embedCodeFild.style.width = "840px";
			embedCodeFild.onclick = function(){embedCodeFild.select();}
			
			var makeEmbedCode = document.createElement("p");
			var makeEmbedCodeText = document.createTextNode("embed コード作成");
			makeEmbedCode.appendChild(makeEmbedCodeText)	;
			makeEmbedCode.style.cursor = "pointer";
			makeEmbedCode.style.margin = "10px 0";
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
					var domain = location.hostname;
					var affsiteID;
					for(var s in affiSiteIds){
						if(domain.match(s)) affsiteID = affiSiteIds[s];
						}
					var embedCode = '<object width="'+ pWidth +'" height="'+ pHeight +'" ><param name="allowFullScreen" value="true"></param><param name="base" value="http://'+domain+'/"><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><param name="quality" value="hight"></param><embed width="'+ pWidth +'" height="'+ pHeight +'" name="movie1" id="movie1" base="'+domain+'/" src="http://'+domain+player+'?id='+ emid +'&affid='+affid+'&afsid='+affsiteID+'&site='+domain+'&img='+emimg+'&video='+emvideo+'" type="application/x-shockwave-flash"/></object>';
					embedviewBox.innerHTML = embedCode;
					var embedCodeInput = document.getElementById("embedCode");
					embedCodeInput.style.display = "inline-block";
					embedCodeInput.value = embedCode;
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
