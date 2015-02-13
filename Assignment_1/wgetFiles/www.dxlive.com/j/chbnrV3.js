/*
 * change log:07/10/2014 
 * thumbnail is always image, as opposed to being iframe, even tho banner itself is iframe
 * due to layout being broken inside thumbnail iframe when iframe src is image file. wito2009
 */
var type=[],src=[],thumb=[],linkURL=[],popup=[],duration=[];
var timer,bannerListURL;
var banNum=0;
var totalWidth=998, totalHeight=188;
var unitWidth=totalHeight/2;
var fadeSpeed=200;
var currentBannerId=0;

$(window).load(function(){		
	$.getJSON(bannerListURL, function(data){
		$(data.myJsonTest).each(function(){
			type.push(this.type);
			src.push(this.src);
			thumb.push(this.thumb);
			linkURL.push(this.linkURL);
			popup.push(this.popup);
			duration.push(this.duration);
			banNum++;		
		})		
		for(var i=0; i<banNum; i++){
			if(type[i]=='image'){
				var bannerImg=document.createElement('img');
				bannerImg.setAttribute('src',src[i]);
				var bannerLink=document.createElement('a');
				if(linkURL[i]){
					bannerLink.href=linkURL[i];
					bannerLink.target=popup[i];
				}
				bannerLink.id='b'+i;
				bannerLink.appendChild(bannerImg);
				$('#channelBanners').append(bannerLink);
				var thumbImg=document.createElement('img');
				thumbImg.setAttribute('src',thumb[i]);
				thumbImg.setAttribute('style','border:#666 1px solid;float:left;');
				var thumbLink=document.createElement('a');
				if(linkURL[i]){
					thumbLink.href=linkURL[i];
					thumbLink.target=popup[i];
				}
				thumbLink.id='t'+i;
				thumbLink.className='bannerThumb';
				thumbLink.appendChild(thumbImg);
				$('.bannerThumbs').append(thumbLink);
			}else if(type[i]=='iframe'){
				var bannerImg=document.createElement('iframe');
				bannerImg.setAttribute('id','b'+i);
				bannerImg.setAttribute('src',src[i]);
				bannerImg.setAttribute('scrolling','no');
				if(i>0){
				 bannerImg.setAttribute('style','display:none');
				} 
				$('#channelBanners').append(bannerImg);
				//change log:07/10/2014 
				/*var thumbImg=document.createElement('iframe');
				thumbImg.setAttribute('id','t'+i);
				thumbImg.setAttribute('src',thumb[i]);
				thumbImg.setAttribute('style','border:#666 1px solid;float:left;');*/
				var thumbImg=document.createElement('img');
				thumbImg.setAttribute('src',thumb[i]);
				thumbImg.setAttribute('style','border:#666 1px solid;float:left;');
				var thumbLink=document.createElement('a');
				if(linkURL[i]){
					thumbLink.href=linkURL[i];
					thumbLink.target=popup[i];
				}
				thumbLink.id='t'+i;
				thumbLink.className='bannerThumb';
				thumbLink.appendChild(thumbImg);
				$('.bannerThumbs').append(thumbLink);
			}else{
				console.log('none');
			}
		}
		if(banNum==4){
			$('.bannerThumbs').css({'width':unitWidth*2+'px','display':'block'});
			$('#channelBanners').css('width',(totalWidth-unitWidth*2)+'px');
			$('#channelBanners a').css('left',-unitWidth*1+'px');
			$('#channelBanners iframe').css({'left':-unitWidth*1+'px','width':totalWidth+'px'});
		}else if(banNum==1){	
			$('.bannerThumbs').css({'width':unitWidth*0+'px','display':'none'});
			$('#channelBanners').css('width',(totalWidth-unitWidth*0)+'px');
			$('#channelBanners a').css('left',-unitWidth*0+'px');
			$('#channelBanners iframe').css({'left':-unitWidth*0+'px','width':totalWidth+'px'});
		}else{
			$('.bannerThumbs').css({'width':unitWidth*1+'px','display':'block'});
			$('#channelBanners').css('width',(totalWidth-unitWidth*1)+'px');
			$('#channelBanners a').css('left',-unitWidth*(1/2)+'px');
			$('#channelBanners iframe').css({'left':-unitWidth*(1/2)+'px','width':totalWidth+'px'});
		}
		function hiLiteThumb(){
			for(var i=0; i<banNum; i++){
				$('#t'+i+' img').css('opacity','0.5');
				$('#t'+i).css('opacity','0.5');
			}
			$('#t'+currentBannerId+' img').css('opacity','1');
			$('#t'+currentBannerId).css('opacity','1');
		}
		$('#channelBanners').mouseover(function(event){
			clearTimeout(timer);
		});
		$('#channelBanners').mouseout(function(event){
			rotateBanners(duration[currentBannerId]);
		});
		$('.bannerThumb, .bannerThumbs iframe').mouseover(function(event){
			clearTimeout(timer);
			var tmb=event.currentTarget;
			var targetBannerId=(tmb.id.toString()).substring(1);
			if(targetBannerId != currentBannerId){
				currentBannerId=targetBannerId;
				for(var i=0; i<banNum; i++){
					//$('#b'+i+':not(:animated)').fadeOut(fadeSpeed);
					$('#b'+i).hide();
				}
				hiLiteThumb();
				//$('#b'+targetBannerId+':not(:animated)').fadeIn(fadeSpeed);
				$('#b'+targetBannerId).show();
			}
		});
		$('.bannerThumb, .bannerThumbs iframe').mouseout(function(event){
			var tmb=event.currentTarget;
			var targetBannerId=(tmb.id.toString()).substring(1);
			rotateBanners(duration[targetBannerId]);
		});
		$('#b'+currentBannerId).show();
		hiLiteThumb();
		if(banNum>1){
			rotateBanners(duration[0]);
		}
		function rotateBanners(t){
			timer=setTimeout(function fadeInOut(){
				//$('#b'+currentBannerId+':not(:animated)').fadeOut(fadeSpeed);
				$('#b'+currentBannerId).hide();
				if(currentBannerId<banNum-1){
					currentBannerId++;
				}else{
					currentBannerId=0;
				}
				//$('#b'+currentBannerId+':not(:animated)').fadeIn(fadeSpeed);
				$('#b'+currentBannerId).show();
				hiLiteThumb();
				rotateBanners(duration[currentBannerId]);
			},t);
		}
	})
});
