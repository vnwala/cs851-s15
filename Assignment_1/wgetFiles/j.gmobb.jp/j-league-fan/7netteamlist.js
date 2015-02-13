//Yahoo!Pipes ID
var ypid="2f43735215b7f2df50f48feaaddfae12";

//7netValueCommerceのアフィリエイトID
var sid="3143122";
var pid="882864788";

//JSONロード時に起動される関数
function jsonCallback(data){
	for (var i in data.value.items) {
	var item = data.value.items[i];
	document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fall%2Fsearch_result%2F%3Fkword_in%3D"+item.title+" target=_blank>"+item.title+"</a>　");
	}
}

//JSONロード
document.write("<script type=\"text/javascript\" src=\"http://pipes.yahoo.com/pipes/pipe.run?_id="+ypid+"&_render=json&_callback=jsonCallback\"></script>");