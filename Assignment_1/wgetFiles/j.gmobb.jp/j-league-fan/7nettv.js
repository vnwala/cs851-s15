//パラメータ名
var pname="url=";
pl=pname.length;

//区切り文字
var cs="|_|_";
csl=cs.length;

//7net ValueCommerceのアフィリエイトID
var sid="3143122";
var pid="882864788";

//urlを取得しurlデコード
url=decodeURI(document.location);

//urlの文字数
l=url.length;

//パラメータ名より後の文字列を取得
s=url.indexOf(pname);
suburl=url.substring(s+pl,l);

//区切り文字の位置を取得
pc=suburl.indexOf(cs);

//httpを取得(urlエンコードしない)
http=suburl.substring(0,pc);
//http=encodeURI(suburl.substring(0,pc));

//titleを取得
title=suburl.substring(pc+csl,l);

//表示
document.write("<b><font color=orange size=+2>7</font><font color=#23518F size=+1>net にジャンプ!!</font></b><br>");
document.write("<font color=#23518F size=+3>↓</font><img src=image/clickblue.gif><font color=#23518F size=+3>↓</font><br>");
if (s<0 || pc<0 || http.indexOf("http")<0 || http.indexOf("7net")<0 || title.length==0 || url.toLowerCase().indexOf("src=")>=0){
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2F target=_blank><font size=+2><b>商品が見つかりませんでした。7netのトップページに移動します。</b></font></a><br><br>");
}
else{
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url="+http+" target=_blank><img src=http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid="+sid+"&pid="+pid+" height=1 width=0 border=0><font size=+3><b>"+title+"</b></font></a><br>");
}
document.write("<table><tr><td valign=middle><font size=+5 color=orange><b>7</b></font></td><td valign=middle><font size=+3 color=#23518F><b>net</b></font><br><font color=#23518F><b>shopping</b></font></td></tr></table>");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fbooks%2F target=_blank>本・コミック</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fmagazine%2F target=_blank>雑誌</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fdgbooks%2F target=_blank>電子書籍</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fcd%2F target=_blank>CD・グッズ</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fdvd%2F target=_blank>DVD・Blu-ray</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fgame%2F target=_blank>TV・携帯ゲーム</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fhobby%2F target=_blank>おもちゃ・ホビー</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fbeauty%2F target=_blank>コスメ＆ヘルスケア</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Fhome%2F target=_blank>生活雑貨・ペット用品</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Ffashion%2F target=_blank>ファッション＆雑貨</a>　");
document.write("<a href=http://ck.jp.ap.valuecommerce.com/servlet/referral?sid="+sid+"&pid="+pid+"&vc_url=http%3A%2F%2Fwww.7netshopping.jp%2Ffood%2F target=_blank>食品・お取り寄せ</a>");