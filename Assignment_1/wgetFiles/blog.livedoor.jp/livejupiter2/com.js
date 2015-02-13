function ReplaceAnchor() {
    var anchor = new RegExp("(&gt;&gt;|>>|＞＞|※)([0-9]{1,4})","g");
    var cmntDiv = document.getElementById("comment_list");
    var aryDd = cmntDiv.getElementsByTagName("dd");
    var sHTML;
    
    for(var i = 0; i < aryDd.length; i++) {
        var cmntNum = aryDd[i].getAttribute('id');
        cmntNum = cmntNum.replace(/commenttext_/, '');
        sHTML = aryDd[i].innerHTML;
        sHTML = sHTML.replace(anchor, '<a href="#commentttl_$2" onMouseOver="CommentShow($2, ' + cmntNum + ')" onMouseOut="CommentHide(' + cmntNum + ')">$1$2</a><div class="tooltip" id="commentpopup_' + cmntNum + '"></div>');
        aryDd[i].innerHTML = sHTML;
    }
}

function CommentShow(PopupNumber, CommentNumber) {
    var cmntTTL = document.getElementById("commentttl_" + PopupNumber);
    var cmntTXT = document.getElementById("commenttext_" + PopupNumber);
    var cmntPOP = document.getElementById("commentpopup_" + CommentNumber);
    cmntPOP.innerHTML = cmntTTL.innerHTML + "<br />" + cmntTXT.innerHTML;
    cmntPOP.style.display = "inline";
}

function CommentHide(CommentNumber) {
    var cmntPOP = document.getElementById("commentpopup_" + CommentNumber);
    cmntPOP.style.display = "none";
}

function CommentAnchor(CommentNumber) {
    document.getElementById('text2').value = ">>" + CommentNumber + "\n";
}