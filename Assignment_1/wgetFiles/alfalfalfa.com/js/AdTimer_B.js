// "date":new Date(年, 月 - 1, 日, 時, 分, 秒),
var object = {
	0:{
		"date":new Date(2013, 2 - 1, 21, 00, 00, 00),
		"html":"<iframe id='a6534ab6' name='a6534ab6' src='http://vsc.send.microad.jp/delivery/afr.php?zoneid=8312&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;ct0=INSERT_CLICKURL_HERE&amp;snr=1' frameborder='0' scrolling='no' width='200' height='200'><a href='http://vsc.send.microad.jp/delivery/ck.php?n=afd0c2a3&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://vsc.send.microad.jp/delivery/avw.php?zoneid=8312&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=afd0c2a3&amp;ct0=INSERT_CLICKURL_HERE&amp;snr=1' border='0' alt='' /></a></iframe>",
	},
	1:{
		"date":new Date(2014, 1 - 1, 14, 23, 59, 59),
		"html":"<iframe id=\"a5178a82\" name=\"a5178a82\" src=\"http://vsc.send.microad.jp/delivery/afr.php?zoneid=15697&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;ct0=INSERT_CLICKURL_HERE&amp;snr=1\" frameborder=\"0\" scrolling=\"no\" width=\"300\" height=\"250\"><a href=\"http://vsc.send.microad.jp/delivery/ck.php?n=a518566e&amp;cb=INSERT_RANDOM_NUMBER_HERE\" target=\"_blank\"><img src=\"http://vsc.send.microad.jp/delivery/avw.php?zoneid=15697&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a518566e&amp;ct0=INSERT_CLICKURL_HERE&amp;snr=1\" border=\"0\" alt=\"\" /></a></iframe>",
	},
	2:{
		"date":new Date(2014, 2 - 1, 18, 00, 00, 00),
		"html":"<a href=\"http://ccrt.biz/7tOVoWs0\" target=\"_blank\" rel=\"nofollow\"><img src=\"http://alfalfalfa.com/adv/alfa_300x250_20140306.jpg\" alt=\"\" border=\"0\" /></a>",
	},
	3:{
		"date":new Date(2014, 3 - 1, 19, 23, 59, 59),
		"html":"<iframe id=\"a5178a82\" name=\"a5178a82\" src=\"http://vsc.send.microad.jp/delivery/afr.php?zoneid=15697&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;ct0=INSERT_CLICKURL_HERE&amp;snr=1\" frameborder=\"0\" scrolling=\"no\" width=\"300\" height=\"250\"><a href=\"http://vsc.send.microad.jp/delivery/ck.php?n=a518566e&amp;cb=INSERT_RANDOM_NUMBER_HERE\" target=\"_blank\"><img src=\"http://vsc.send.microad.jp/delivery/avw.php?zoneid=15697&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a518566e&amp;ct0=INSERT_CLICKURL_HERE&amp;snr=1\" border=\"0\" alt=\"\" /></a></iframe>",
	},
}

var now = new Date();
var tmp_date = "";
var tmp_html = "";

for (var i in object){
	if(now >= object[i]["date"]) {
		if(tmp_date == "" || object[i]["date"] >= tmp_date) {
			tmp_date = object[i]["date"];
			tmp_html = object[i]["html"];
		}
	}
}
document.write(tmp_html);
