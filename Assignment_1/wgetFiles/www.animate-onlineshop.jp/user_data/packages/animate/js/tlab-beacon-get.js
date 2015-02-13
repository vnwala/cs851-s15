(function(){

var recommendWidth = 1;
var recommendHeight = 1;



var tlabRecItemId = getitemId();
//var tlabRecCatId = '';

var recommendDivIdName = 'beacon_divid';

var reccomendObjectName = 'TLAB';

var reccomendMethodName = 'Beacon';


if(tlabRecItemId){
	var recommendDivAttribute =
		'style="' + 
		'width:' + recommendWidth + 'px;' +
		'height:' + recommendHeight + 'px"';

	document.write(
		'<div id="' + recommendDivIdName + '" ' +
		recommendDivAttribute + '></div>'
	);



	var secondArg = '';
	if(
		reccomendMethodName == 'Beacon' ||
		reccomendMethodName == 'Recommend'
	){
		secondArg = ', tlabRecItemId';
	}
	if(
		reccomendMethodName == 'RankingCategory'
	){
		secondArg = ', "1", tlabRecCatId';
	}
	(
		eval(
			'new ' + 
			reccomendObjectName + '.' + reccomendMethodName +
			'(recommendDivIdName' + secondArg + ')'
		)
	).sendRequest();

	var myObjectName =
		(
			eval(
				'new ' + 
				reccomendObjectName + '.' + reccomendMethodName +
				'(recommendDivIdName' + secondArg + ')'
			)
		);
	myObjectName.width = recommendWidth;
	myObjectName.height = recommendHeight;
	myObjectName.sendRequest();
	delete myObjectName;
}

function getitemId(){
	var currentPathname_ary = window.location.pathname.split('/');
	if(currentPathname_ary.length >= 4){
		if(
			currentPathname_ary[1] == 'pn' &&
			currentPathname_ary[3] == 'pd'
		){
			return currentPathname_ary[4];
		}
	}
	return '';
}

})();


