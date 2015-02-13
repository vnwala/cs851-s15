/**
 * Login Button
 *
 */

function headerLoginBtn() {
	var root = "http://members.nyoshin.com";
	var button='<a href='+root+'/login.php?url='+encodeURI(decodeURI(location.href))+'>ログイン</a>';
  	document.write(button);
}

function headerLoginBtnEn() {
	var root = "http://en.nyoshin.com/en";
	var button='<a href="http://en.nyoshin.com/login/login.php?url='+encodeURI(decodeURI(location.href))+'">LOGIN</a>';
  	document.write(button);
}
