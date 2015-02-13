// "date":new Date(年, 月 - 1, 日, 時, 分, 秒),
var object = {
	0:{
		"date":new Date(2013, 2 - 1, 21, 00, 00, 00),
		"html":"<div class=fix_10x10_md2><a href=\"http://click.j-a-net.jp/1353361/498194/\" target=\"_blank\"><img src=\"http://image.j-a-net.jp/1353361/498194/\"width=\"500\" height=\"200\"  border=\"0\"></a></div>",
	},
	1:{
		"date":new Date(2013, 3 - 1, 19, 00, 00, 00),
		"html":"<div class=fix_10x10_md2>\r\n<SCRIPT language=\"JavaScript\">\r\n<!--\r\njmp = new Array();\r\nimg = new Array();\r\njmp[0] = \"http://ccrt.biz/3OMXofpk\";\r\njmp[1] = \"http://ccrt.biz/JrtpXakz\";\r\nimg[0] = \"http://alfalfalfa.com/adv/adways_D_2013-03-19_a2.gif\";\r\nimg[1] = \"http://alfalfalfa.com/adv/adways_D_2013-03-19_b.gif\";\r\nn = Math.floor(Math.random()*jmp.length);\r\ndocument.write(\"<a href='\"+jmp[n]+\"'>\");\r\ndocument.write(\"<img src='\"+img[n]+\"' border='0'>\");\r\ndocument.write(\"</a>\");\r\n//-->\r\n</SCRIPT>\r\n</div>",
	},
	2:{
		"date":new Date(2013, 4 - 1, 1, 00, 00, 00),
		"html":"",
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
