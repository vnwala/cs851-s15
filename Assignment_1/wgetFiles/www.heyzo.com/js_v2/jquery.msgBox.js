/*
jQuery.msgBox plugin 
Copyright 2011, Halil İbrahim Kalyoncu
License: BSD
modified by Oliver Kopp, 2012.
 * added support for configurable image paths
 * a new msgBox can be shown within an existing msgBox
*/

// users may change this variable to fit their needs
var msgBoxImagePath = "Images/";

jQuery.msgBox = msg;
function msg (options) {
    var isShown = false;
    var typeOfValue = typeof options;
    var defaults = {
        content: (typeOfValue == "string" ? options : "Message"),
        title: "Warning",
        type: "alert",
        autoClose: false,
        timeOut: 0,
        showButtons: true,
        buttons: [{ value: "Ok"}],
        inputs: [{ type: "text", name:"userName", header: "User Name" }, { type: "password",name:"password", header: "Password"}],
        success: function (result) { },
        beforeShow: function () { },
        afterShow: function () { },
        beforeClose: function () { },
        afterClose: function () { },
        opacity: 0.1
    };
    options = typeOfValue == "string" ? defaults : options;
    if (options.type != null) {
        switch (options.type) {
            case "alert":
                options.title = options.title == null ? "Warning" : options.title;
                break;
            case "info":
                options.title = options.title == null ? "Information" : options.title;
                break;
            case "error":
                options.title = options.title == null ? "Error" : options.title;
                break;
            case "confirm":
                options.title = options.title == null ? "Confirmation" : options.title;
                options.buttons = options.buttons == null ? [{ value: "Yes" }, { value: "No" }, { value: "Cancel"}] : options.buttons;
                break;
            case "prompt":
                options.title = options.title == null ? "Log In" : options.title;
                options.buttons = options.buttons == null ? [{ value: "Login" }, { value: "Cancel"}] : options.buttons;
                break;
			case "ws":
                options.title = options.title == null ? "対象会員のみご利用できます。" : options.title;
                break;
			case "join":
                options.title = options.title == null ? "ログイン後にご利用できます。" : options.title;
                break;
            case "upgrade":
                options.title = options.title == null ? "" : options.title;
                options.buttons = [{ value: "アップグレード" }, { value: "しない"}];
                break;
			case "review":
                options.title = options.title == null ? "レビューに投稿" : options.title;
                options.buttons = options.buttons == null ? [{ value: "投稿" }, { value: "中止"}] : options.buttons;
                break;
			case "resister":
                options.title = options.title == null ? "無料メール登録" : options.title;
                //options.buttons = options.buttons == null ? [{ value: "登録" }, { value: "リセット"}] : options.buttons;
                break;
            default:
                image = "alert.png";
        }
    }
    options.timeOut = options.timeOut == null ? (options.content == null ? 500 : options.content.length * 70) : options.timeOut;
    options = $.extend(defaults, options);
    if (options.autoClose) {
        setTimeout(hide, options.timeOut);
    }
    var image = "";
    switch (options.type) {
        case "alert":
            image = "alert.png";
            break;
        case "info":
            image = "info.png";
            break;
        case "error":
            image = "error.png";
            break;
        case "confirm":
            image = "confirm.png";
            break;
        default:
            image = "alert.png";
    }
    
    var divId = "msgBox" + new Date().getTime();
    
    var divMsgBoxId = divId; 
    var divMsgBoxContentId = divId+"Content"; 
    var divMsgBoxImageId = divId+"Image";
    var divMsgBoxButtonsId = "post-review";
    var divMsgBoxBackGroundId = divId+"BackGround";
    
    var buttons = "";
    if(options.type == "upgrade"){
     $(options.buttons).each(function (index, button) {
        if(index == 0) buttons += "<input class=\"msgButton\" type=\"button\" name='' value=\"" + button.value + "\" onclick=\"location.href='http://www.heyzo.com/upgrade.html'\" />";
        else buttons += "<input class=\"msgButton\" type=\"button\" name='reset' value=\"" + button.value + "\" />";
    });
    }else if(options.type == "review"){
    $(options.buttons).each(function (index, button) {
        if(index == 0) buttons += "<input class=\"msgButton\" type=\"button\" name='_submit' value=\"" + button.value + "\" onclick='submit_review()' />";
		else buttons += "<input class=\"msgButton\" type=\"reset\" name='reset' value=\"" + button.value + "\" />"
    });
	}else if(options.type == "resister"){
		 $(options.buttons).each(function (index, button) {
		if(index == 0) buttons += "<input class=\"postFreeJoin\" type=\"button\" name='_submit' value=\"" + button.value + "\" onclick='postFreeJoin(this)' />";
		 else buttons += "<input class=\"msgButton\" type=\"reset\" name='reset' value=\"" + button.value + "\" />";
		});
	}else{
        $(options.buttons).each(function (index, button) {
            buttons += "<input class=\"msgButton\" type=\"button\" name=\"" + button.value + "\" value=\"" + button.value + "\" />";
        });
    }

    var inputs = "";
    $(options.inputs).each(function (index, input) {
        var type = input.type;
        if (type=="checkbox" || type =="radiobutton") {
            inputs += "<div class=\"msgInput\">" +
            "<input type=\"" + input.type + "\" name=\"" + input.name + "\" "+(input.checked == null ? "" : "checked ='"+input.checked+"'")+" value=\"" + (typeof input.value == "undefined" ? "" : input.value) + "\" />" +
            "<text>"+input.header +"</text>"+
            "</div>";
        }
        else {
            inputs += "<div class=\"msgInput\">" +
            "<span class=\"msgInputHeader\">" + input.header + "<span>" +
            "<input type=\"" + input.type + "\" name=\"" + input.name + "\" value=\"" + (typeof input.value == "undefined" ? "" : input.value) + "\" />" +
            "</div>";
        }
    });

    var divBackGround = "<div id=" + divMsgBoxBackGroundId + " class=\"msgBoxBackGround\"></div>";
    var divTitle = "<div class=\"msgBoxTitle\">" + options.title + "</div>";
    var divContainer = "<div class=\"msgBoxContainer\"><div id=" + divMsgBoxContentId + " class=\"msgBoxContent\"><p><span>" + options.content + "</span></p></div></div>";
    var divButtons = "<div id=" + divMsgBoxButtonsId + " class=\"msgBoxButtons\">" + buttons + "</div>";
    var divInputs = "<div class=\"msgBoxInputs\">" + inputs + "</div>";
	var divResister ="";
    divResister +='<div id="trial-player">';
    divResister +='<form  method="get" action="" name="form_freejoin" id="form_freejoin">';
    divResister +='<table border="0" cellspacing="0" cellpadding="0">';
    divResister +='<tr><th colspan="3"><p class="title">D2passの無料会員に登録しよう！</p>';
    divResister +='<p class="sub">ご登録されますと、無料公開中の作品の本編をご覧いただけます。</p></th></tr>';
    divResister +='<tr class="odd">';
    divResister +='<td width="125" valign="top">メールアドレス</td>';
    divResister +='<td colspan="2"><input id="email" class="fielder" type="text" name="q" maxlength="100" value="メールアドレスを記入ください。" ';
    divResister +=' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }"/><p>※携帯電話用のメールアドレスはご登録いただけません。</p></td>';
    divResister +='</tr>';
    divResister +='<tr>';
    divResister +='<td width="125" valign="top">メールアドレス<span>再確認</span></td>';

    divResister +='<td colspan="2"><input id="email2" class="fielder" width="280" type="text" name="q" maxlength="100" value="上と同じメールアドレスを記入ください"';
    divResister +=' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }" /><p>※当サイトより確認メールを送り致しますので連絡可能な<br />メールアドレスをご入力下さい。</p><br /></td>';
    divResister +='</tr>';
    divResister +='<tr class="odd">';
    divResister +='<td valign="top" width="125">キャプチャ画像</td>';
    divResister +='<td colspan="2"><img id="imgcapt" src="/freejoin/php/captcha.php">&nbsp;<a href="javascript:refresh_capt()">画像を更新する</a></td>';
    divResister +='<td>&nbsp;</td>';
    divResister +='</tr>';
    divResister +='<tr><td width="125"><td>';
    divResister +='<input id="c" class="fielder" width="280" type="text" name="q" maxlength="100" value="キャプチャ画像の文字を入力して下さい。"' ;
    divResister +=' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }"/></td><td></td>';
    divResister +='<tr><td colspan=3 style="color:red"><font color=red style="color:red"><b style="color:red"><div id="form_error" style="color:red"></div></b></font></td></tr>';
    divResister +='<tr>';
 	divResister +='<td> </td>';
    divResister +='<td colspan="2"><br /><input class="sender" type="button" value="登録する" onclick="postFreeJoin(this)" />    ';
    divResister +='<input class="sender2 msgButton" type="button" value="ご登録済みの方はこちらからログイン" onclick="gotoLogin()" /></td>';
    divResister +='</tr>';
    divResister +='</table>';
    divResister +='</form>';
    divResister +='</div>';

    var divMsgBox; 
    var divMsgBoxContent; 
    var divMsgBoxImage;
    var divMsgBoxButtons;
    var divMsgBoxBackGround;
    
    if (options.type == "prompt") {
        $("html").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"msgBox\">" + divTitle + "<div>" + divContainer + (options.showButtons ? divButtons + "</div>" : "</div>") + "</div>");
        divMsgBox = $("#"+divMsgBoxId); 
        divMsgBoxContent = $("#"+divMsgBoxContentId); 
        divMsgBoxImage = $("#"+divMsgBoxImageId);
        divMsgBoxButtons = $("#"+divMsgBoxButtonsId);
        divMsgBoxBackGround = $("#"+divMsgBoxBackGroundId);

        divMsgBoxImage.remove();
        divMsgBoxButtons.css({"text-align":"center","margin-top":"5px"});
        divMsgBoxContent.css({"width":"100%","height":"100%"});
        divMsgBoxContent.html(divInputs);
    }
	else if(options.type == "review"){
//$('html').append('<p>html</p>');

		$("body").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"msgBox\">" + divTitle + "<div>" + reviewForm + (options.showButtons ? divButtons + "</div>" : "</div>") + "</div>");
		 divMsgBox = $("#"+divMsgBoxId); 
        divMsgBoxContent = $("#"+divMsgBoxContentId); 
        divMsgBoxImage = $("#"+divMsgBoxImageId);
        divMsgBoxButtons = $("#"+divMsgBoxButtonsId);
        divMsgBoxBackGround = $("#"+divMsgBoxBackGroundId);
	}
	else if(options.type == "resister"){
//$('html').append('<p>html</p>');

		$("body").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"msgBox\">" + divTitle + "<div>" + divResister + (options.showButtons ? divButtons + "</div>" : "</div>") + "</div>");
		 divMsgBox = $("#"+divMsgBoxId); 
        divMsgBoxContent = $("#"+divMsgBoxContentId); 
        divMsgBoxImage = $("#"+divMsgBoxImageId);
        divMsgBoxButtons = $("#"+divMsgBoxButtonsId);
        divMsgBoxBackGround = $("#"+divMsgBoxBackGroundId);
	}
    else {
        $("body").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"msgBox\">" + divTitle + "<div>" + divContainer + (options.showButtons ? divButtons + "</div>" : "</div>") + "</div>");
        divMsgBox= $("#"+divMsgBoxId); 
        divMsgBoxContent = $("#"+divMsgBoxContentId); 
        divMsgBoxImage = $("#"+divMsgBoxImageId);
        divMsgBoxButtons = $("#"+divMsgBoxButtonsId);
        divMsgBoxBackGround = $("#"+divMsgBoxBackGroundId);
    }

    var width = divMsgBox.width();
    var height = divMsgBox.height();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var top = windowHeight / 2 - height / 2;
    var left = windowWidth / 2 - width / 2;

    show();

    function show() {
        if (isShown) {
            return;
        }
        divMsgBox.css({ opacity: 0, top: top - 50, left: left });
        divMsgBox.css("background-image", "url('"+msgBoxImagePath+"msgBoxBackGround.png')");
        divMsgBoxBackGround.css({ opacity: options.opacity });
        options.beforeShow();
        divMsgBoxBackGround.css({ "width": $(document).width(), "height": getDocHeight() });
        $(divMsgBoxId+","+divMsgBoxBackGroundId).fadeIn(0);
        divMsgBox.animate({ opacity: 1, "top": top, "left": left }, 200);
        setTimeout(options.afterShow, 200);
        isShown = true;
        $(window).bind("resize", function (e) {
            var width = divMsgBox.width();
            var height = divMsgBox.height();
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();

            var top = windowHeight / 2 - height / 2;
            var left = windowWidth / 2 - width / 2;

            divMsgBox.css({ "top": top, "left": left });
        });
    }

    function hide() {
        if (!isShown) {
            return;
        }
        options.beforeClose();
        divMsgBox.animate({ opacity: 0, "top": top - 50, "left": left }, 200);
        divMsgBoxBackGround.fadeOut(300);
        setTimeout(function () { divMsgBox.remove(); divMsgBoxBackGround.remove(); }, 300);
        setTimeout(options.afterClose, 300);
        isShown = false;
    }

    function getDocHeight() {
        var D = document;
        return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight));
    }

    function getFocus() {
    	divMsgBox.fadeOut(200).fadeIn(200);
    }

    $("input.msgButton").click(function (e) {
        e.preventDefault();
        var value = $(this).val();
        if (options.type != "prompt") {
            options.success(value);
        }
        else {
            var inputValues = [];
            $("div.msgInput input").each(function (index, domEle) {
                var name = $(this).attr("name");
                var value = $(this).val();
                var type = $(this).attr("type");
                if (type == "checkbox" || type == "radiobutton") {
                    inputValues.push({ name: name, value: value,checked: $(this).attr("checked")});
                }
                else {
                    inputValues.push({ name: name, value: value });
                }
            });
            options.success(value,inputValues);
        }
        hide();
    });

    divMsgBoxBackGround.click(function (e) {
        if (!options.showButtons || options.autoClose) {
            hide();
        }
        else {
            getFocus();
        }
    });
};
