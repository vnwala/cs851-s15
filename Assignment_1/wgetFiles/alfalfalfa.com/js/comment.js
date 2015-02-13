function ReplaceAnchor() {
	var anchor = new RegExp("(&gt;&gt;|>>|＞＞|※)([0-9]{4})","g");
	var cmntDiv = document.getElementById("commentbody");
	var aryDiv = cmntDiv.getElementsByTagName("div");
	var sHTML;
	
	for(var i = 0; i < aryDiv.length ; i++) {
		if(aryDiv[i].getAttribute("class") == "commenttext" || aryDiv[i].getAttribute("className") == "commenttext") {
			var cmntNum = aryDiv[i].getAttribute("id");
			cmntNum = cmntNum.replace(/ct/, "");
			sHTML = aryDiv[i].innerHTML;
			sHTML = sHTML.replace(anchor, '<a href="#c$2" onMouseOver="CommentIn($2, ' + cmntNum + ')" onMouseOut="CommentOut(' + cmntNum + ')">$1$2</a><div class="tooltip" id="cp' + cmntNum  + '"></div>');
			aryDiv[i].innerHTML = sHTML;
		}
	}

	(function(cash) {
		$(".kobetsucom").each(function(){
			$(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ') );
		});
	})(jQuery);
}

function CommentIn(CommentNumber, PopupNumber) {
	var cmntTTL = document.getElementById("c" + CommentNumber);
	var cmntTXT = document.getElementById("com" + CommentNumber);
	var cmntPOP = document.getElementById("cp" + PopupNumber);
	cmntPOP.innerHTML = cmntTTL.innerHTML + "<br />" + cmntTXT.innerHTML;
	cmntPOP.style.display = "inline";
}

function CommentOut(CommentNumber) {
	var cmntPOP = document.getElementById("cp" + CommentNumber);
	cmntPOP.style.display = "none";
}

function CommentAnchor(CommentNumber) {
	document.getElementById('text').value = ">>" + CommentNumber + "\n";
}

function CommentWarota(CommentNumber) {
	document.getElementById('text').value = ">>" + CommentNumber + "\nΣd(ﾟ∀ﾟd)ｵｳｲｴ!!\n";
	location.href='#write_comment02';
}

function vote(id,cid,sc){
	document.getElementById('btn_a_'+cid).disabled = true;
	document.getElementById('btn_b_'+cid).disabled = true;
	var votecomment = "&vc=" + document.getElementById('com'+cid).innerHTML.replace(/\n|<[^br][^>]+>/ig,"");
	votecomment = votecomment.replace(/&gt;/g,">").replace(/&nbsp;/g," ");

	if(votecomment.length > 1200) {
		votecomment = "";
	}
	newElm = document.createElement("script");
	newElm.type = "text/javascript";
	newElm.src = "http://nuko.s12.coreserver.jp/cvote/vote.php?id=" + id + "&cid=" + cid + "&sc=" + sc + votecomment;
	document.getElementById('result' + cid).appendChild(newElm);
}

function rS(id,score){
	var wid = 200;
	var bar = wid * (score / max);
	if(max <= 50) {
		bar = 4 * score;
	}
	if(id.indexOf("s_a") >= 0) {
		document.getElementById(id).innerHTML = "+" + score + " <img src='http://alfalfalfa.com/plusvote.jpg' width='" + bar + "' height='20'>";
	}
	if (id.indexOf("s_b") >= 0) {
		document.getElementById(id).innerHTML = "-" + score + " <img src='http://alfalfalfa.com/minusvote.jpg' width='" + bar + "' height='20'>";
	}
}


function cF(cid,total){
	var base = 14;
	var min = 9;
	var max = 30;
	var fs;
	
	var sc = base + parseInt(total / 2);
	if(sc < min) {
		sc = min;
	}
	if(sc > max) {
		sc = max;
	}
	
	/* color */
	if(sc < 10) { 
		document.getElementById("com" + cid).style.color = "#F5F5DB";
	} else if(sc >= 25) {
		document.getElementById("com" + cid).style.color = "#DC143C";
	}

	/* size */
	if(sc <= 16) {
		fs = 14;
	} else if(sc <= 20) {
		fs = 20;
	} else {
		fs = 20;
	}
	document.getElementById("com" + cid).style.fontSize = fs + "px";
}

window.onload = ReplaceAnchor;