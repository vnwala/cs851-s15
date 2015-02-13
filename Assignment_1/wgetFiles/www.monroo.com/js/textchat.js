var windowFocus = true;
var username;   
var chatHeartbeatCount = 0;
var minChatHeartbeat = 2000;
var maxChatHeartbeat = 3000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;
var maxChatBoxes = 3;
var chatBoxWidth = 300;
var defaultRightMargin;
var naviWidth = 40;
var chatSpace = 2;
var limitNum = 15;
var onlineMin = 60;
if(mobile){
	defaultRightMargin = 0;
}else{
	defaultRightMargin = 250;
}

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var newMessagesClass = new Array();
var chatBoxes = new Array();
var rightNaviBoxes = new Array();
var leftNaviBoxes = new Array();

$(document).ready(function(){
    originalTitle = document.title;
    createChatList();
    if(isLogin()){
        startChatSession();
    }else{
        startGuestChatSession();
    }    
    $([window, document]).blur(function(){
        windowFocus = false;
    }).focus(function(){
        windowFocus = true;
        document.title = originalTitle;
    });
});

//{{{ startTextChat startGuestTextChat
function startTextChat(to_profile_id,location_id){
    if(isLogin()){
        $.post('/textchat/start', {to_profile_id:to_profile_id, location_id:location_id}, function(data){
            $.each(data.items, function(i,item){
            if (item){
                to_profile_id   = item.to_profile_id;
                to_gender       = item.to_gender;
                to_profile_name = item.to_profile_name;
                message         = item.message;
                if(message === 1 || message === '1'){
                    createChatBox(to_profile_id,to_gender,to_profile_name,1,0);
                    $("#chatbox_"+to_profile_id+" .chatboxtextarea").focus();
                }else{
                    alert(message);
                }
            }});
        }, "json"); 
    }else{
        alert("会員様専用機能です。");
    }   
}
function startGuestTextChat(to_profile_id,location_id){
    if(isLogin()){
        $.post('/textchat/startGuest', {to_profile_id:to_profile_id,location_id:location_id}, function(data){
            $.each(data.items, function(i,item){
            if (item){
                to_profile_id   = item.to_profile_id;
                to_gender       = item.to_gender;
                to_profile_name = item.to_profile_name;
                message         = item.message;
                if(message === 1 || message === '1'){
                    createChatBox(to_profile_id,to_gender,to_profile_name,1,1);
                    $("#chatbox_"+to_profile_id+" .chatboxtextarea").focus();
                }else{
                    alert(message);
                }
            }});
        }, "json");
    }else{   
        alert("会員様専用機能です。");
    }
} 
//}}}

//{{{ startChatSession startGuestChatSession
function startChatSession(){
    $.ajax({
      url: "/textchat/startChat",
      cache: false,
      dataType: "json",
      success: function(data) {
        username = data.username;
        textchat_flag = data.textchat_flag;
        if(textchat_flag == 1 || textchat_flag == '1'){
            $.each(data.items, function(i,item){
                if (item)   { // fix strange ie bug
                    to_profile_id   = item.f;
                    to_gender       = item.g;
                    to_profile_name = item.f = item.p;
                    guest_flag = 0;
                    if(to_gender == 'n'){
                        guest_flag = 1;
                        to_gender = 'm';
                    }
                    if ($("#chatbox_"+to_profile_id).length <= 0) {
                        createChatBox(to_profile_id,to_gender,to_profile_name,1,guest_flag);
                    }
                    if (item.s == 1) {
                        item.f = username;
                        item.i = item.ti;
                    }
                    if (item.s == 2) {
                        $("#chatbox_"+to_profile_id+" .chatboxcontent")
                        .append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
                    } else {
                        $("#chatbox_"+to_profile_id+" .chatboxcontent")
                        .append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.i+'&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
                    }
                }
            });
            for (i=0;i<chatBoxes.length;i++) {
                to_profile_id = chatBoxes[i];
                $("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);
                setTimeout('$("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);', 100); 
            }
            setTimeout('checkNew();',chatHeartbeatTime);
        }
    }});
}
function startGuestChatSession(){
    $.ajax({
      url: "/textchat/startGuestChat",
      cache: false,
      dataType: "json",
      success: function(data) {
        username = data.username;
        textchat_flag = data.textchat_flag;
        if(textchat_flag == 1 || textchat_flag == '1'){
            $.each(data.items, function(i,item){
                if (item)   { // fix strange ie bug
                    to_profile_id   = item.f;
                    to_gender       = item.g;
                    to_profile_name = item.f = item.p;
                    if ($("#chatbox_"+to_profile_id).length <= 0) {
                        createChatBox(to_profile_id,to_gender,to_profile_name,1,2);
                    }
                    if (item.s == 1) {
                        item.f = username;
                        item.i = item.ti;
                    }
                    if (item.s == 2) {
                        $("#chatbox_"+to_profile_id+" .chatboxcontent")
                        .append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
                    } else {
                        $("#chatbox_"+to_profile_id+" .chatboxcontent")
                        .append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.i+'&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
                    }
                }
            });
            for (i=0;i<chatBoxes.length;i++) {
                to_profile_id = chatBoxes[i];
                $("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);
                setTimeout('$("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);', 100);
            }
            setTimeout('checkNewGuest();',chatHeartbeatTime);
        }
    }});
} 
//}}}

//{{{ createChatBox
function createChatBox(to_profile_id,to_gender,to_profile_name,minimizeChatBox,is_guest){
    if ($("#chatbox_"+to_profile_id).length > 0) {
        if ($("#chatbox_"+to_profile_id).css('display') == 'none') {
            $("#chatbox_"+to_profile_id).css('display','block');
            focusChatBox(to_profile_id);
            restructureChatBoxes();
        }
        $("#chatbox_"+to_profile_id+" .chatboxtextarea").focus();
        return;
    } 
    var head_class = 'chatboxhead_m';
    var textareaselected_class = 'chatboxtextareaselected_m'; 
    var blink_class = 'chatboxblink_m';
    if(to_gender == 'f'){
        var head_class = 'chatboxhead_f';
        var textareaselected_class = 'chatboxtextareaselected_f';
        var blink_class = 'chatboxblink_f';
    }
    if(is_guest == 1){
        $('<div class="textchatbox"></div>')
        .attr("id","chatbox_"+to_profile_id)
        .addClass("chatbox")

        .html('<div class="'+head_class+'"><div class="chatboxtitle">'+to_profile_name+'</div><div class="chatboxoptions">&nbsp;<a href="javascript:void(0)" onclick="javascript:toggleChatBox(\''+to_profile_id+'\')"><span class="tojiru"><img src="/img/txtchat/mini.png" /><span class="tips"><span class="balloon">最小化する</span></span></span></a>&nbsp;<a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+to_profile_id+'\')"><img src="/img/txtchat/x.png" /><span class="tips"><span class="balloon">閉じる</span></span></a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="sendpicbox"><div class="'+head_class+'_pic"><div class="picsendarea"><div class="ttps"><form action="/textchat/add" id="picform_'+to_profile_id+'" name="picform_'+to_profile_id+'" method="post" enctype="multipart/form-data"><input type="hidden" name="to" value="'+to_profile_id+'"><input type="hidden" name="to_guest" value="'+is_guest+'"><input type="file" onChange="addPic('+to_profile_id+')" name="chatpic_'+to_profile_id+'" id="chatpic_'+to_profile_id+'"></form><span class="tips"><span class="balloon">写真を添付する</span></span></div></div><textarea id="input-message_'+to_profile_id+'" class="chatboxtextarea" onkeydown="javascript:return addTxtChat(event,this,\''+to_profile_id+'\','+is_guest+');"></textarea><div class="chatboxoptions"><div class="picinput"><i class="fa fa-camera"></i></div><p id="ploader_'+to_profile_id+'"><span id="imgLoaded_'+to_profile_id+'">0</span>%</p></div></div></div>')

        .appendTo($( "body" ));

    }else if(is_guest == 2){
        $('<div class="textchatbox"></div>')
        .attr("id","chatbox_"+to_profile_id)
        .addClass("chatbox")

        .html('<div class="'+head_class+'"><div class="chatboxtitle"><a href="/profile/'+to_profile_id+'">'+to_profile_name+'<span class="tips"><span class="balloon">プロフィールを見る</span></span></a></div><div class="chatboxoptions">&nbsp;<a href="javascript:void(0)" onclick="javascript:toggleChatBox(\''+to_profile_id+'\')"><span class="tojiru"><img src="/img/txtchat/mini.png" /><span class="tips"><span class="balloon">最小化する</span></span></span></a>&nbsp;<a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+to_profile_id+'\')"><img src="/img/txtchat/x.png" /><span class="tips"><span class="balloon">閉じる</span></span></a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="sendpicbox"><div class="'+head_class+'_pic"><div class="picsendarea"><div class="ttps"><form action="/textchat/add" id="picform_'+to_profile_id+'" name="picform_'+to_profile_id+'" method="post" enctype="multipart/form-data"><input type="hidden" name="to" value="'+to_profile_id+'"><input type="hidden" name="to_guest" value="'+is_guest+'"><input type="file" onChange="addPic('+to_profile_id+')" name="chatpic_'+to_profile_id+'" id="chatpic_'+to_profile_id+'"></form><span class="tips"><span class="balloon">写真を添付する</span></span></div></div><textarea id="input-message_'+to_profile_id+'" class="chatboxtextarea" onkeydown="javascript:return addTxtChat(event,this,\''+to_profile_id+'\','+is_guest+');"></textarea><div class="chatboxoptions"><div class="picinput"><i class="fa fa-camera"></i></div><p id="ploader_'+to_profile_id+'"><span id="imgLoaded_'+to_profile_id+'">0</span>%</p></div></div></div>')

        .appendTo($( "body" ));
		
    }else{
        $('<div class="textchatbox"></div>')
        .attr("id","chatbox_"+to_profile_id)
        .addClass("chatbox")    

        .html('<div class="'+head_class+'"><div class="chatboxtitle"><a href="/profile/'+to_profile_id+'">'+to_profile_name+'<span class="tips"><span class="balloon">プロフィールを見る</span></span></a></div><div class="chatboxoptions"><a href="/favorite/add/'+to_profile_id+'?type=favorite" class="addFavT"><img src="/img/txtchat/fav.png" /><span class="tips"><span class="balloon">お気に入りに登録する</span></span></a>&nbsp;<a href="/textchat?to_profile_id='+to_profile_id+'"><img src="/img/txtchat/log.png" /><span class="tips"><span class="balloon">過去のチャット履歴を見る</span></span></a>&nbsp;<a href="javascript:void(0)" onclick="javascript:toggleChatBox(\''+to_profile_id+'\')"><span class="tojiru"><img src="/img/txtchat/mini.png" /><span class="tips"><span class="balloon">最小化する</span></span></span></a>&nbsp;<a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+to_profile_id+'\')"><img src="/img/txtchat/x.png" /><span class="tips"><span class="balloon">閉じる</span></span></a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="sendpicbox"><div class="'+head_class+'_pic"><div class="picsendarea"><div class="ttps"><form action="/textchat/add" id="picform_'+to_profile_id+'" name="picform_'+to_profile_id+'" method="post" enctype="multipart/form-data"><input type="hidden" name="to" value="'+to_profile_id+'"><input type="hidden" name="to_guest" value="'+is_guest+'"><input type="file" onChange="addPic('+to_profile_id+')" name="chatpic_'+to_profile_id+'" id="chatpic_'+to_profile_id+'"></form><span class="tips"><span class="balloon">写真を添付する</span></span></div></div><textarea id="input-message_'+to_profile_id+'" class="chatboxtextarea" onkeydown="javascript:return addTxtChat(event,this,\''+to_profile_id+'\','+is_guest+');"></textarea><div class="chatboxoptions"><div class="picinput"><i class="fa fa-camera"></i></div><p id="ploader_'+to_profile_id+'"><span id="imgLoaded_'+to_profile_id+'">0</span>%</p></div></div></div>')

        .appendTo($( "body" ));

    }
    $('#ploader_'+to_profile_id).hide();
    $('.addFavT').colorbox({iframe:true, width:'80%', maxWidth:'380px', height:'240px'});
    $("#chatbox_"+to_profile_id).css('bottom', '0px');
    chatBoxeslength = 0;
    for (x in chatBoxes) {
        if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
            chatBoxeslength++;
        }
    }
    var rightMargin = defaultRightMargin;
    if (chatBoxeslength == 0) {
        $("#chatbox_"+to_profile_id).css('right', rightMargin+'px');
    } else {
        if(chatBoxeslength > maxChatBoxes){
            rightMargin = naviWidth + rightMargin;
        }
        width = (chatBoxeslength)*(chatBoxWidth+chatSpace)+rightMargin;
        $("#chatbox_"+to_profile_id).css('right', width+'px');
    }
    chatBoxes.push(to_profile_id);
    if (minimizeChatBox == 1) {
        minimizedChatBoxes = new Array();
        if (getCookie('chatbox_minimized')) {
            minimizedChatBoxes = getCookie('chatbox_minimized').split(/\|/);
        }
        minimize = 0;
        for (j=0;j<minimizedChatBoxes.length;j++) {
            if (minimizedChatBoxes[j] == to_profile_id) {
                minimize = 1;
            }
        }
        if (minimize == 1) {
            $('#chatbox_'+to_profile_id+' .chatboxcontent').css('display','none');
            $('#chatbox_'+to_profile_id+' .chatboxinput').css('display','none');
            $('#chatbox_'+to_profile_id+' .sendpicbox').css('display','none');
            $('#chatbox_'+to_profile_id+' .tojiru').html('<img src="/img/txtchat/big.png" /><span class="tips"><span class="balloon">最大化する</span></span>');
        }
    }
    chatboxFocus[to_profile_id] = false;
    $("#chatbox_"+to_profile_id+" .chatboxtextarea").blur(function(){
        chatboxFocus[to_profile_id] = false;
        $("#chatbox_"+to_profile_id+" .chatboxtextarea").removeClass(textareaselected_class);
    }).focus(function(){
        chatboxFocus[to_profile_id] = true;
        newMessages[to_profile_id] = false;
        $('#chatbox_'+to_profile_id+' .'+head_class).removeClass(blink_class);
        $("#chatbox_"+to_profile_id+" .chatboxtextarea").addClass(textareaselected_class);
    });
    $("#chatbox_"+to_profile_id).click(function() {
        if ($('#chatbox_'+to_profile_id+' .chatboxcontent').css('display') != 'none') {
            $("#chatbox_"+to_profile_id+" .chatboxtextarea").focus();
        }
    });
    createNavi();
    $("#chatbox_"+to_profile_id).show();
    restructureChatBoxes();
}
//}}}

//{{{ addPic
function addPic(to_p_id){
    $('#ploader_'+to_p_id).hide();
    var fname = $('#chatpic_'+to_p_id).val();
    if(fname == ''){
        return false;
    }
    var _profile_id = to_p_id;
    $.ajax({
    type: "POST",
    url: "/textchat/picValidUser",
    }).done(function(data) {
        if(data == 1 || data == '1'){
            sendPic(_profile_id);
        }else if(data == 2 || data == '2'){
            var re = confirm('写真をアップするには１００ポイントかかります');
            if(re){
                sendPic(_profile_id);
            }
        }else{
            alert('写真をアップするには身分証明書を提出下さい');
        }
    });
}
function sendPic(to_p_id){   
    var fname = $('#chatpic_'+to_p_id).val();
    if(fname == ''){
        return false;
    }
    if (!fname.match(/\.(jpg|jpeg|gif)$/i)) {
        alert('ファイルをご確認ください。\r\njpgまたはgifファイルでお願いします。');
    } else {
        var percent = $('#imgLoaded_'+to_p_id);
        $('#ploader_'+to_p_id).show();
        $('#picform_'+to_p_id).ajaxForm({
            dataType:  'json',
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete;
                percent.html(percentVal);
            },
            success: function(data){
                var to_pro_id = data.to_profile_id;
                var image_id = data.image_id;
                var pic_image = data.pic_image;
                attachImage(to_pro_id,image_id,pic_image);
                $('#chatpic_'+to_pro_id).val('');
            }
        }).submit();
    }
    return true;
}
//}}}

//{{{ createNavi
function createNavi(){
    var chatBoxeslength = 0;
    for (x in chatBoxes) {
        if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
            chatBoxeslength++;
        }
    }
    if(chatBoxeslength >= maxChatBoxes){
        var num = 0;
        for(x in chatBoxes){
            if(num==0){
                var id = chatBoxes[x];
                if ($("#chatbox_"+id).css('display') != 'none'){
                    rightNaviBoxes.push(id);
                    $('#chatbox_'+id).css('display','none');
                    num++;
                }
            }
        }
        $('<div class="textchatbox"></div>')
            .attr("id","chatbox_right_navi")
            .addClass("rightnavi")
            .html('<div class="chatboxhead"><div class="chatboxtitle"><a href="javascript:void(0)" onclick="javascript:moveRight()" title="右へ移動">右</a></div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:moveRight()"><span class="numrightbox"></span></a></div><br clear="all"/></div>')
            .appendTo($( "body" ));
        $("#chatbox_right_navi").css('bottom', '0px');
        $("#chatbox_right_navi").css('right', defaultRightMargin+'px');
    }
}
//}}}

//{{{ moveright
function moveRight(){
    var id = rightNaviBoxes.pop();
    $('#chatbox_'+id).css('display','block');
    var chatBoxeslength = 0;
    for (x in chatBoxes) {
        if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
            chatBoxeslength++;
        }
    }
    if(chatBoxeslength >= maxChatBoxes){
        var last_id =0;
        for(x in chatBoxes){
            if($("#chatbox_"+chatBoxes[x]).css('display') != 'none'){
                last_id = chatBoxes[x];
            }
        }
        if(last_id){
            leftNaviBoxes.push(last_id);
            $('#chatbox_'+last_id).css('display','none');
        }
        $('<div class="textchatbox"></div>')
            .attr("id","chatbox_left_navi")
            .addClass("leftnavi")
            .html('<div class="chatboxhead"><div class="chatboxtitle"><a href="javascript:void(0)" onclick="javascript:moveLeft()" title="左へ移動">左</a></div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:moveLeft()"><span class="numleftbox"></span></a></div><br clear="all"/></div>')
            .appendTo($( "body" ));
        $("#chatbox_left_navi").css('bottom', '0px');
    }
    restructureChatBoxes();
}
//}}}

//{{{ moveLeft
function moveLeft(){
    var id = leftNaviBoxes.pop();
    $('#chatbox_'+id).css('display','block');
    var chatBoxeslength = 0;
    for (x in chatBoxes) {
        if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
            chatBoxeslength++;
        }
    }
    if(chatBoxeslength >= maxChatBoxes){
        var last_id =0;
        var done = 0;
        for(x in chatBoxes){
            if(done==0){
                if($("#chatbox_"+chatBoxes[x]).css('display') != 'none'){
                    last_id = chatBoxes[x];
                    done++;
                }
            }
        }
        if(last_id){
            rightNaviBoxes.push(last_id);
            $('#chatbox_'+last_id).css('display','none');
        }
    }
    restructureChatBoxes();
}
//}}}

//{{{ focusChatBox
function focusChatBox(to_profile_id){
    var num_box = 0;
    for(x in chatBoxes){
         if($("#chatbox_"+chatBoxes[x]).css('display') != 'none'){
            num_box++;
         }
    }
    for(var i=0;i<leftNaviBoxes.length;i++){
        if(leftNaviBoxes[i] == to_profile_id){
            leftNaviBoxes.splice(i,1);
        }
    }
    for(var j=0;j<rightNaviBoxes.length;j++){
        if(rightNaviBoxes[j] == to_profile_id){
            rightNaviBoxes.splice(j,1);
        }
    }
    if(num_box > maxChatBoxes){ 
        var id = 0;
        var find = 0;
        for(x in chatBoxes){
            id = chatBoxes[x];
            if(find == 0 && id != to_profile_id && $("#chatbox_"+id).css('display') != 'none'){        
                rightNaviBoxes.push(id);
                $('#chatbox_'+id).css('display','none');                
                find++;
            }
        }
    }
}
//}}}

//{{{ checkNew checkNewGuest
function checkNew(){
    var itemsfound = 0;
    if (windowFocus == false) {
        var blinkNumber = 0;
        var titleChanged = 0;
        for (x in newMessagesWin) {
            if (newMessagesWin[x] == true) {
                ++blinkNumber;
                if (blinkNumber >= blinkOrder) {
                    document.title = 'メッセージが来ました。';
                    titleChanged = 1;
                    break;
                }
            }
        }
        if (titleChanged == 0) {
            document.title = originalTitle;
            blinkOrder = 0;
        } else {
            ++blinkOrder;
        }
    } else {
        for (x in newMessagesWin) {
            newMessagesWin[x] = false;
        }
    }
    for (x in newMessages) {
        if (newMessages[x] == true) {
            if (chatboxFocus[x] == false) {
                var head_class = 'chatboxhead_m';
                var blink_class = 'chatboxblink_m';
                if(newMessagesClass[x] == 'f'){
                    var head_class = 'chatboxhead_f';
                    var blink_class = 'chatboxblink_f';
                }
                $('#chatbox_'+x+' .'+head_class).toggleClass(blink_class);
            }   
        }   
    }   
    $.ajax({
      url: "/textchat/checkNew",
      cache: false,
      dataType: "json",
      success: function(data) {
        $.each(data.items, function(i,item){
            if (item)   { 
                to_profile_id   = item.f;
                to_gender       = item.g;
                to_profile_name = item.f = item.p;
                guest_flag = 0;
                if(to_gender == 'n'){
                    guest_flag = 1;
                    to_gender = 'm';
                }
                if ($("#chatbox_"+to_profile_id).length <= 0) {
                    createChatBox(to_profile_id,to_gender,to_profile_name,1,guest_flag);
                }
                if ($("#chatbox_"+to_profile_id).css('display') == 'none') {
                    $("#chatbox_"+to_profile_id).css('display','block');
                    focusChatBox(to_profile_id);
                    restructureChatBoxes();
                }
                if (item.s == 1) {
                    item.f = username;
                    item.i = item.ti;
                }
                if (item.s == 2) {
                    $("#chatbox_"+to_profile_id+" .chatboxcontent")
                    .append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
                } else {
                    newMessages[to_profile_id] = true;
                    newMessagesWin[to_profile_id] = true;
                    newMessagesClass[to_profile_id] = to_gender;
                    $("#chatbox_"+to_profile_id+" .chatboxcontent")
                    .append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.i+'&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
                }
                $("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);
                itemsfound += 1;
            }
        });
        chatHeartbeatCount++;
        if (itemsfound > 0) {
            chatHeartbeatTime = minChatHeartbeat;
            chatHeartbeatCount = 1;
        } else if (chatHeartbeatCount >= 10) {
            chatHeartbeatTime *= 1.2;
            chatHeartbeatCount = 1;
            if (chatHeartbeatTime > maxChatHeartbeat) {
                chatHeartbeatTime = maxChatHeartbeat;
            }
        }
        setTimeout('checkNew();',chatHeartbeatTime);
    }});
}
function checkNewGuest(){
    var itemsfound = 0;
    if (windowFocus == false) {
        var blinkNumber = 0;
        var titleChanged = 0;
        for (x in newMessagesWin) {
            if (newMessagesWin[x] == true) {
                ++blinkNumber;
                if (blinkNumber >= blinkOrder) {
                    document.title = 'メッセージが来ました。';
                    titleChanged = 1;
                    break;
                }
            }   
        }
        if (titleChanged == 0) {
            document.title = originalTitle;
            blinkOrder = 0;
        } else {
            ++blinkOrder;
        }
    } else {
        for (x in newMessagesWin) {
            newMessagesWin[x] = false;
        }
    }
    for (x in newMessages) {
        if (newMessages[x] == true) {
            if (chatboxFocus[x] == false) {
                var head_class = 'chatboxhead_m';
                var blink_class = 'chatboxblink_m';
                if(newMessagesClass[x] == 'f'){
                    var head_class = 'chatboxhead_f';
                    var blink_class = 'chatboxblink_f';
                } 
                $('#chatbox_'+x+' .'+head_class).toggleClass(blink_class);
            }   
        }   
    }
    $.ajax({
      url: "/textchat/checkNewGuest",
      cache: false,
      dataType: "json",
      success: function(data) {
        $.each(data.items, function(i,item){
            if (item)   {
                to_profile_id   = item.f;
                to_gender       = item.g;
                to_profile_name = item.f = item.p;
                if ($("#chatbox_"+to_profile_id).length <= 0) {
                    createChatBox(to_profile_id,to_gender,to_profile_name,1,2);
                }
                if ($("#chatbox_"+to_profile_id).css('display') == 'none') {
                    $("#chatbox_"+to_profile_id).css('display','block');
                    focusChatBox(to_profile_id);
                    restructureChatBoxes();
                }
                if (item.s == 1) {
                    item.f = username;
                    item.i = item.ti;
                }
                if (item.s == 2) {
                    $("#chatbox_"+to_profile_id+" .chatboxcontent")
                    .append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
                } else {
                    newMessages[to_profile_id] = true;
                    newMessagesWin[to_profile_id] = true;
                    newMessagesClass[to_profile_id] = to_gender;
                    $("#chatbox_"+to_profile_id+" .chatboxcontent")
                    .append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.i+'&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
                }
                $("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);
                itemsfound += 1;
            }
        });
        chatHeartbeatCount++;
        if (itemsfound > 0) {
            chatHeartbeatTime = minChatHeartbeat;
            chatHeartbeatCount = 1;
        } else if (chatHeartbeatCount >= 10) {
            chatHeartbeatTime *= 1.2;
            chatHeartbeatCount = 1;
            if (chatHeartbeatTime > maxChatHeartbeat) {
                chatHeartbeatTime = maxChatHeartbeat;
            }
        }
        setTimeout('checkNewGuest();',chatHeartbeatTime);
    }});
}
//}}}

//{{{ addTxtChat
function addTxtChat(event,chatboxtextarea,to_profile_id,is_guest) {
    if((event.keyCode == 13 && event.shiftKey == 0) || event == 'txt_submit_btn')  {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g,"");
        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(chatboxtextarea).css('height','44px');
        if (message != '') {
            $.post("/textchat/add", {to: to_profile_id, message: message, to_guest: is_guest} , function(data){
                var pic_image = data;
                message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
                $("#chatbox_"+to_profile_id+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+pic_image+'&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+message+'</span></div>');
                $("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);
                updateUserPoints(1); 
                updateUserMileage(1);
            });
        }
        chatHeartbeatTime = minChatHeartbeat;
        chatHeartbeatCount = 1;
        return false;
    }
    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 94;
    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height',adjustedHeight+8 +'px');
    } else {
        $(chatboxtextarea).css('overflow','auto');
    }
}
//}}}

//{{{ attachImage
function attachImage(to_pro_id,image_id,pic_image){
    var image_url = "<a href='/image/"+image_id+"/o' target='_blank'><img src='/image/"+image_id+"/s' align='absmiddle'></a>";
    $("#chatbox_"+to_pro_id+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+pic_image+'&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+image_url+'</span></div>');
    $("#chatbox_"+to_pro_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_pro_id+" .chatboxcontent")[0].scrollHeight);
    chatHeartbeatTime = minChatHeartbeat;
    chatHeartbeatCount = 1;
    updateUserPoints(1);
    updateUserMileage(1);
}
//}}}

//{{{ openSendPic closeSendPic
function openSendPic(to_profile_id,is_guest,to_gender){
    if (to_gender == 'f') {
        alert('写真の添付には200pt必要です。');
    }   
}
function closeSendPic(to_profile_id,is_guest){}
//}}}

//{{{ toggleChatBox
function toggleChatBox(to_profile_id) {
    if ($('#chatbox_'+to_profile_id+' .chatboxcontent').css('display') == 'none') {
        var minimizedChatBoxes = new Array();
        if (getCookie('chatbox_minimized')) {
            minimizedChatBoxes = getCookie('chatbox_minimized').split(/\|/);
        }
        var newCookie = '';
        for (i=0;i<minimizedChatBoxes.length;i++) {
            if (minimizedChatBoxes[i] != to_profile_id) {
                newCookie += to_profile_id+'|';
            }
        }
        newCookie = newCookie.slice(0, -1)
        setCookie('chatbox_minimized', newCookie);
        $('#chatbox_'+to_profile_id+' .chatboxcontent').css('display','block');
        $('#chatbox_'+to_profile_id+' .chatboxinput').css('display','block');
        $('#chatbox_'+to_profile_id+' .sendpicbox').css('display','block');
        $('#chatbox_'+to_profile_id+' .tojiru').html('<img src="/img/txtchat/mini.png" /><span class="tips"><span class="balloon">最小化する</span></span>');
        //$('#chatbox_'+to_profile_id+' .tojiru').attr('title','最小');
        $("#chatbox_"+to_profile_id+" .chatboxcontent").scrollTop($("#chatbox_"+to_profile_id+" .chatboxcontent")[0].scrollHeight);
    } else {
        var newCookie = to_profile_id;
        if (getCookie('chatbox_minimized')) {
            newCookie += '|'+getCookie('chatbox_minimized');
        }
        setCookie('chatbox_minimized',newCookie);
        $('#chatbox_'+to_profile_id+' .chatboxcontent').css('display','none');
        $('#chatbox_'+to_profile_id+' .chatboxinput').css('display','none');
        $('#chatbox_'+to_profile_id+' .sendpicbox').css('display','none');
        $('#chatbox_'+to_profile_id+' .tojiru').html('<img src="/img/txtchat/big.png" /><span class="tips"><span class="balloon">最大化する</span></span>');
        //$('#chatbox_'+to_profile_id+' .tojiru').attr('title','最大');
    }
}
//}}}

//{{{ restructureChatBoxes
function restructureChatBoxes() {
    align = 0;
    var rightMargin = defaultRightMargin;
    if(rightNaviBoxes.length > 0){
        rightMargin = naviWidth + defaultRightMargin;
        $("#chatbox_right_navi").css('display','block');
        $("#chatbox_right_navi .numrightbox").html(rightNaviBoxes.length);
    }else{
        $("#chatbox_right_navi").css('display','none');
    }
    for (x in chatBoxes) {
        to_profile_id = chatBoxes[x];
        if ($("#chatbox_"+to_profile_id).css('display') != 'none') {
            if (align == 0) {
                $("#chatbox_"+to_profile_id).css('right', rightMargin+'px');
            } else {
                width = (align)*(chatBoxWidth+chatSpace)+rightMargin;
                $("#chatbox_"+to_profile_id).css('right', width+'px');
            }
            align++;
        }
    }
    if(leftNaviBoxes.length > 0){
        var rightMargin = defaultRightMargin;
        if(rightNaviBoxes.length > 0){
            rightMargin = naviWidth + defaultRightMargin;
        }else{
            $("#chatbox_right_navi").css('display','none');
        }
        var width = (align)*(chatBoxWidth+chatSpace)+rightMargin-chatSpace;
        $("#chatbox_left_navi").css('right', width+'px');
        $("#chatbox_left_navi").css('display','block');
        $("#chatbox_left_navi .numleftbox").html(leftNaviBoxes.length);
    }else{
        $("#chatbox_left_navi").css('display','none');
    }
}
//}}}

//{{{ closeChatBox
function closeChatBox(to_profile_id) {
    $('#chatbox_'+to_profile_id).css('display','none');
    var box_num = 0;
    for(x in chatBoxes){
        var id = chatBoxes[x];
        if($('#chatbox_'+id).css('display') != 'none'){
            box_num++;
        }
    }
    var pop_id = 0;
    if(box_num < maxChatBoxes){
        if(leftNaviBoxes.length > 0){    
            var pop_id = leftNaviBoxes.pop();
            $('#chatbox_'+pop_id).css('display','block');
        }
        if(pop_id == 0 && rightNaviBoxes.length > 0){
            var pop_id = rightNaviBoxes.pop();
            $('#chatbox_'+pop_id).css('display','block');
        }
    }
    restructureChatBoxes();
    $.post("/textchat/closeChat", { chatbox: to_profile_id} , function(data){
    });
}
//}}}

//{{{ createChatList
function createChatList(){
    $('<div class="textchatbox"></div>').appendTo('body');
}
//}}}

//{{{ toggleChatList
function toggleChatList(){
    if ($('.textchatlist').css('display') == 'none') {
        setCookie('textchatlist', 1);
        $('.textchatlist').css('display','block');
        $('#togglebar').html('−');
    } else {
        setCookie('textchatlist', 0);
        $('.textchatlist').css('display','none');
        $('#togglebar').html('＋');
    }
}   
//}}}

//{{{ getChatList
function getChatList(to_gender){
    if(to_gender == 'f' || to_gender == 'm'){
        $.get('/webonline/4', {limit:limitNum, min:onlineMin, gender:to_gender, text_chat:"1"}, 
            function(data) {
                $('#textchatlist').html(data);
            });
    }else{
        $.get('/webonline/4',{limit:limitNum, min:onlineMin, text_chat:"1"}, 
            function(data) {
                $('#textchatlist').html(data);
            });
    }
}
//}}}

//{{{ deleteDefault
function textChatDeleteDefault(){
    $('#textchat_profile_name').val('');
    $('.textchatsearchbox').css('color','#111111');
}
//}}}

//{{{ textChatSearch
function textChatSearch(event){

    if(event.keyCode == 13 && event.shiftKey == 0)  {
        var profile_name = $('#textchat_profile_name').val();
        $.get('/webonline/4', {limit:limitNum, min:onlineMin, profile_name:profile_name, text_chat:"1"}, 
            function(data) {
                $('#textchatlist').html(data);
            });
        return false;
    }
}
//}}}

//{{{ textchatPicPurchase
function textchatPicPurchase(image_id,is_guest){
    var mess = '１００ポイントで購入しますか？';
    if(is_guest){
        mess = '写真を見るには会員登録が必要です。';
    }
    var re = confirm(mess);
    if(re){
        if(is_guest){
            window.open(secure_url+'/viewerRegister','viewerRegister','height=900, width=800');
        }
        $.get('/textchat/buy/'+image_id+'/'+is_guest, 
            function(data) {
                $('#textpic_'+image_id).html(data);
            });
        updateUserPoints(1);
        updateUserMileage(1);
    }
}
//}}}

//{{{ checkPic
function checkPic(image_id,is_guest){
    $.get('/textchat/checkPic/'+image_id+'/'+is_guest, 
        function(data) {
            $('#textpic_'+image_id).html(data);
        });
}
//}}}

//{{{ updateChatUser
function updateChatUser(){
    $.get('/textchat/getChatUser', 
        function(data) {
            $('#people').html(data);
        });
}
//}}}

//{{{ chatView
function chatView(id,date_start,elem_id){
    $('.select_date').removeClass('select_date');
    $.get('/textchat/view/'+id+'/'+date_start, 
        function(data) {
            $('#chatView_elem').html(data);
        }); 
    $('#list_date_'+elem_id).addClass('select_date');
}   
//}}}
