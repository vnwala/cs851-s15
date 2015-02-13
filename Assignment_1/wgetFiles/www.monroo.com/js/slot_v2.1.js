var slot1,slot2,slot3,wheelA,wheelB,wheelC,reserve,awards,awardItem;
var del2,del3,int1,int2,int3,c,i,j,k,l,l1,l2,l3;
var slotPt=0;
var interval=50;
var delay=500;
c=0,i=0,j=0,k=0;
wheelA=[4,5,5,1,4,5,4,6,5,6,4,5,5,5,2,5,1,2,4,3,1,4,3,4,3,6,6,4,3,3,2,1,4,1,6,3,6,5,4,3,6,2,3,5,4,6,6,4,6,6,6,4,5,2,6,4,6,5,3,6,4,5,5,3,5];
wheelB=[1,4,5,4,5,6,1,2,3,6,6,4,3,5,5,3,3,1,4,3,6,4,4,3,1,6,4,5,4,2,3,6,5,6,6,2,4,5,6,5,4,3,4,6,3,4,5,6,1,3,6,5,6,3,5,6,4,3,5,6,4,5,5,4,5];
wheelC=[5,3,4,2,5,1,5,3,6,2,3,6,5,6,5,2,3,1,6,4,5,2,3,6,4,6,2,6,6,3,4,6,4,3,2,6,6,4,1,5,2,4,6,3,5,4,1,6,5,3,2,5,4,2,6,5,5,3,2,5,5,4,1,5,6];
awards=['はずれ','スリーセブン','スリー下着','スリー店長','スリーおっぱい','スリーおしり','スリーチェリー','チェリー1つ','チェリー2つ'];
reserve=[];
l1=wheelA.length;
l2=wheelB.length;
l3=wheelC.length;

$(function(){
	var spin=false;
	resetPos();
	$('.slotBtn').click(function(event){
		var target=event.currentTarget;
		if(target.id=='control'){
			spin=!spin;
			if(spin){
				startSpin();
			}else{
				stopSpin();
			}
		}else if(target.id=='points_buy'){
			alert('30日間ポイント購入がないため、ご利用頂けません。');
		}else{
			slotPurchase();
		}
	});
	$('#closer').click(function(){
		closeSlot();
	});
	
	function slotPurchase(){
        if(gender == 'f'){
            alert('スロットを回すには「エロいね！」が足りません。「エロいね！」をためて挑戦して下さい。');
            return;
        }
        var strURL = '/user/updateUserPoints/1?_rand' + Math.random();
        var xmlhttp = getXmlhttp();
        if(!xmlhttp){
            return;
        }
        xmlhttp.open('GET', strURL, true);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                strVal= xmlhttp.responseText;
                currentPT = strVal - 0;
                if(currentPT >= 200){
                    var re = confirm('200ポイントでスロットチケットを購入しますか？');
                    if(re){
                        var strURL2 = '/slotmachine/buy?_rand=' + Math.random();
                        var xmlhttp2 = getXmlhttp();
                        if(!xmlhttp2){
                            return;
                        }
                        xmlhttp2.open('GET', strURL2, true);
                        xmlhttp2.onreadystatechange = function(){
                            if(xmlhttp2.readyState == 4 && xmlhttp2.status == 200){
                                re_message = xmlhttp2.responseText;
                                if(re_message == 1){
                                    decrementSlot();
									spin=!spin;
									startSpin();
									$('.slotBtn').attr('id','control');
                                    setTimeout(completePurchase,100);
									$('#user_points').text(currentPT-200); 
                                    getCurPoints();
                                }else{
                                    alert(re_message);
                                }
                            }
                        }
                        xmlhttp2.send(null);
                    }
                }else{
                    alert("ポイントが足りません。");
                }
            }
        }
        xmlhttp.send(null);
    }

	function resetPos(){
		$('#slot1').html('<div class="itemImg s'+wheelA[i]+'"></div>');
		$('#slot2').html('<div class="itemImg s'+wheelB[i]+'"></div>');
		$('#slot3').html('<div class="itemImg s'+wheelC[i]+'"></div>');
	}
	
	function startSpin(){
		reserve.length = 0;
		$('#closer').attr('disabled', true).css('pointer-events','none');
		$('#closer .fa-times-circle').attr('title', '');
		$('.slotBtn').text('ストップ');
		$('#indTxt').html('モンロースロット！');
		del2=Math.round(Math.random()*(delay/2))+delay;
		del3=Math.round(Math.random()*(delay/2))+delay;
		int1=Math.round(Math.random()*9)+interval;
		int2=Math.round(Math.random()*9)+interval;
		int3=Math.round(Math.random()*9)+interval;
		
		decrementSlot();
		slot1=setInterval(spinWheelA,int1);
		$('.slotBtn').attr('disabled', true).css('pointer-events','none');
		setTimeout(function(){
			slot2=setInterval(spinWheelB,int2);
			setTimeout(function(){
				slot3=setInterval(spinWheelC,int3);
				setTimeout(function(){
					$('.slotBtn').attr('disabled', false).css('pointer-events','auto');
				},1000);
			},del3);
		},del2);
	    getCurPoints();	
	}
	
	function spinWheelA(){
		i++;
		if(i>l1-1){i=0};
		$('#slot1').html('<div class="itemImg s'+wheelA[i]+'b"></div>');
	}
	
	function spinWheelB(){
		j++;
		if(j>l2-1){j=0};
		$('#slot2').html('<div class="itemImg s'+wheelB[j]+'b"></div>');
	}
	
	function spinWheelC(){
		k++;
		if(k>l3-1){k=0};
		$('#slot3').html('<div class="itemImg s'+wheelC[k]+'b"></div>');
	}
	
	function stopSpin(){
		$('.slotBtn').attr('disabled', true).css('pointer-events','none');
		$('.slotBtn').text('スタート');
		clearInterval(slot1);
		$('#slot1').html('<div class="itemImg s'+wheelA[i]+'"></div>');
		setTimeout(function(){
			clearInterval(slot2);
			$('#slot2').html('<div class="itemImg s'+wheelB[j]+'"></div>');
			setTimeout(function(){
				clearInterval(slot3);
				$('#slot3').html('<div class="itemImg s'+wheelC[k]+'"></div>');
				reserve.push(wheelA[i]);reserve.push(wheelB[j]);reserve.push(wheelC[k]);
				printResult();
			},del3);
		},del2);
	}
	
	function printResult() {
        var url = '/slotmachine/result';
        var data = "a="+reserve[0]+"&b="+reserve[1]+"&c="+reserve[2];
        ajaxRequest('post', url, data, 1,  getResult);

	}
	
	function getResult(){
		$('.slotBtn').attr('disabled', true).css('pointer-events','none');
		if(wheelA[i]==wheelB[j] && wheelA[i]==wheelC[k]){
			switch(wheelA[i]){
				case wheelA[i]=1:
					slotPt=10000;
					awardItem=awards[1];
					break;
				case wheelA[i]=2:
					slotPt=5000;
					awardItem=awards[2];
					break;
				case wheelA[i]=3:
					slotPt=3000;
					awardItem=awards[3];
					break;
				case wheelA[i]=4:
					slotPt=1000;
					awardItem=awards[4];
					break;
				case wheelA[i]=5:
					slotPt=500;
					awardItem=awards[5];
					break;
				case wheelA[i]=6:
					slotPt=200;
					awardItem=awards[6];
					break;
			}
			blinker();
			$('.slotBtn').attr('disabled', true).css('pointer-events','none');
		}else{
			c=0;
			for(l=0;l<reserve.length;l++){
				if(reserve[l]=="6"){
					c++;
				}
			}
			if(c==2){
				slotPt=100;
				awardItem=awards[8];
				blinker();
				$('.slotBtn').attr('disabled', true).css('pointer-events','none');
			}else if(c==1){
				slotPt=30;
				awardItem=awards[7];
				blinker();
				$('.slotBtn').attr('disabled', true).css('pointer-events','none');
			}else{
				$('#indicator').addClass('hazure');
				$('#indTxt').css('color','#fcf');
				$('#indTxt').html('はずれ');
				setTimeout(function(){
					$('#indicator').removeClass('hazure');
					defaultIndicator();
				},2000);
				startAdd(current,0);
			}
		}
	}

	function blinker(){
		$('#indTxt').html(awardItem+': <span id="slotPts">'+slotPt+'</span>ポイント');
		$('#indicator').addClass('atari');
		var count=0;
		var display=false;
		var blinking=setInterval(function(){
			if(count<4){
				if(display){
					$('#indTxt').show();
					$('#indicator').addClass('atari');
				}else{
					$('#indTxt').hide();
					$('#indicator').removeClass('atari');
				}
				display=!display;
				count++;
			}else{
				clearInterval(blinking);
				startAdd(current, slotPt);
				adding=setInterval(function(){
					if(gender == 'm'){
	                	$('#'+points_class_name).css({'font-weight':'bold','background-color':'yellow'});
	            	}
					slotPt=slotPt-10;
					$('#indTxt').html(awardItem+': <span id="slotPts">'+slotPt+'</span>ポイント');
					if(slotPt<=0){
						clearInterval(adding);
						setTimeout(function(){
							$('#indicator').removeClass('atari');
							defaultIndicator();
							startAdd(current, slotPt);
						},500);
					}
				},100);
			}
		},500);
	}

	function defaultIndicator(){
		$('#indTxt').css('color','#fff');
		$('#indTxt').html('モンロースロット！');
		$('.slotBtn').attr('disabled', false).css('pointer-events','auto');
		$('#closer').attr('disabled', false).css('pointer-events','auto');
		$('#closer .fa-times-circle').attr('title', '閉じる');
	}
	
	function closeSlot(){
		var display=true;
		var blinking=setInterval(function(){
			if(display){
				$('#indTxt').css('color','#0f9');
				$('#indTxt').html('bye-bye');
			}else{
				$('#indTxt').html('');
			}
			display=!display;
		},50);
		setTimeout(function(){
			clearInterval(blinking);
			$('.slot_container, .slot_container_mobile').hide();
			defaultIndicator();
		},1000);
	}
	
	var getPoints = 0;
    var current = 0;
    if(gender == 'm'){
        var points_class_name = 'user_points';
    }else{
        var points_class_name = 'performer_earning';
    }

    function startAdd(currentVal, remain){
       remain = remain - 10;
        if(remain >= 0){
            currentVal = currentVal + 10;
            if(gender == 'm'){
                $('#'+points_class_name).text(currentVal);
            }
            setTimeout(function(){startAdd(currentVal, remain)},100);
        }else{
            var strURL = '/slotmachine/checkSlot?_rand=' + Math.random();
            var xmlhttp = getXmlhttp();
            if(!xmlhttp){
                return;
            }
            xmlhttp.open('GET', strURL, true);
            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    isslot = xmlhttp.responseText;
                    if(isslot == 1){
						$('.slotBtn').attr('id','control');
                    }else if(isslot == 2){
						$('.slotBtn').attr('id','points_buy');
                    }else{
						$('.slotBtn').attr('id','slot_buy');
                    }
                    countSlot(1);
                }
            }
            xmlhttp.send(null);
			setTimeout(function(){
				$('#'+points_class_name).css({'font-weight':'normal','background-color':'transparent'});
			},1500);
        }
    }
	
	function getCurPoints(){
        if(gender == 'm'){
            var strURL = '/user/updateUserPoints/1';
        }else{
            var strURL = '/user/performerEarningPoints';
        }
        var xmlhttp = getXmlhttp();
        if(!xmlhttp){
            return;
        }
        strURL += '?_rand' + Math.random();
        xmlhttp.open('GET', strURL, true);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                strVal=xmlhttp.responseText;
                current=strVal-0;
            }
        }
        xmlhttp.send(null);
        return;
    }
	
	function decrementSlot(){
        var strURL = '/slotmachine/decrementSlot';
        var xmlhttp = getXmlhttp();
        if(!xmlhttp) {
            return;
        }
        strURL += '?_rand' + Math.random();
        xmlhttp.open('GET', strURL, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                strVal= xmlhttp.responseText;
            }
        }
        xmlhttp.send(null);
        return;
    }
});