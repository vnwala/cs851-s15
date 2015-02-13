var fballoon,bballoon;
var searchItems=[];
var searchItemsV='';
var pfName='';
var searchKey='';
var balloons=['girlType','uInfo','groupNews'];//'avChat',
function ocBalloon(id){
	for(var i=0;i<balloons.length;i++){
		if(balloons[i]===id){
			fballoon=document.getElementById(balloons[i]);
			if(fballoon.opn==true){
				fballoon.style.display= 'none';
				fballoon.opn=false;
			}else{
				fballoon.style.display= 'block';
				fballoon.opn=true;
			}
		}else{
			bballoon=document.getElementById(balloons[i]);
			bballoon.style.display= 'none';
			bballoon.opn=false;
		}
	}
}
/*function filterPF(id,txt,btn){
	var filtername=document.getElementById('sortBtn');
	filtername.innerHTML=txt+'&nbsp;<i class="icon-caret-down"></i>';
	ocBalloon(btn);
}*/
function hlItems(id){
	var clickedItem=document.getElementById(id);
	if(clickedItem.hl==true){
		clickedItem.className=null;
		clickedItem.hl=false;
		for(var i=0; i<searchItems.length; i++){
			if(searchItems[i]==id){
				searchItems.splice(i,1);
			}
		}
	}else{
		clickedItem.className='hilitedItem';
		clickedItem.hl=true;
		searchItems.push(id);
		searchItems.sort();
	}
	searchKey='';
	for(var j=0;j<searchItems.length;j++){
		var words=document.getElementById(searchItems[j]).innerHTML;
		searchKey += words+'、';
	}

	if(searchKey==''){searchKey='&nbsp;'};
	document.getElementById('searchTxt').innerHTML=searchKey;
        searchItemsV = searchItems.join('.');
	document.getElementById('searchValue').value = searchItemsV;

}
function searchClear(){
	for(var i in searchItems){
		var clickedItem=document.getElementById(searchItems[i]);
		clickedItem.className=null;
		clickedItem.hl=false;
	}
	searchItems.length=0;
	searchKey='&nbsp;';
	document.getElementById('searchTxt').innerHTML=searchKey;
	$('input[name=q]').val('');
	$('.icon-delete').hide();
}
function iframeResize(){
	var PageHight = document.body.scrollHeight + 25;
	window.parent.document.getElementById('schedules').style.height = PageHight + 'px';
}
var dispTog=false;
function dispToggle(id){
	var obj=document.getElementById(id);
	if(obj.dispTog==undefined){obj.dispTog = false;}
	obj.dispTog = !obj.dispTog;
	if(obj.dispTog==true){
		obj.style.display='block';
	}else{
		obj.style.display='none';
	};
}