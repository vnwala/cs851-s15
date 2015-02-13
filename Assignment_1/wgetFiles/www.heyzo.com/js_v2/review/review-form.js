function submit_review( )
{
    if( getCookie('NetiA') )
    {
        document.getElementById("reviewformV3").action = "/member/app_v2/review_post/";
		
    }
    else
    {
        document.getElementById("reviewformV3").action = "/app_v2/review_post/";
    }
    document.reviewformV3.submit();
}

function write_review_radiobutton( radio_name )
{
    var score = '';
    var stars = '★★★★★';
	var tag ='';
    
    for( var i = 5; i > 0; i-- )
    {
        tag += '<input type="radio" name="'+radio_name+'" value="'+ i + '"';
    
        if( i == score )
        {
            tag += ' checked ';
        }
    
        tag += '> ' + stars.substring( 0, i );
    }
	return tag;  
}

function show_review_form( )
{
    if( !document.URL.match( /#reviewformV3$/ ) && !getCookie('NetiA') )
    {
        if( true == 
            confirm("<{$globals.SITE.site_tagname}>の会員の場合は\nログイン後にレビューをご投稿ください。" + 
                    "\n「OK」でログイン画面に移動します。" +
                    "\nゲストで投稿する場合は「キャンセル」を選択してください") )
        {
            window.location.href = "/member/php/login.php?url=" + document.URL;
            return;
        }
    }

    document.getElementById('divReviewformV3').style.display='block';
    window.location.href = '#reviewformV3';
}

var usernamae = "";


if (document.cookie) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var str = cookies[i].split("=");
        if (str[0] == 'rvusername') {
            usernamae = str[1];
            break;
        }
    }
}
usernamae = decodeURIComponent(usernamae);

var reviewForm = "";
reviewForm += '<form id="reviewformV3" method="POST" name="reviewformV3">';
reviewForm += '<input type="hidden" name="__action" value="post">';
reviewForm += '<input type="hidden" name="emb" value=1>';
reviewForm += '<input type="hidden" name="review" value=1>';
reviewForm += '<input type="hidden" name="is_monthly" value="1">';
reviewForm += '<input type="hidden" name="score" value="5">';
reviewForm += '<input type="hidden" name="movie_id" value="'+movieId+'">';
reviewForm += '<input type="hidden" name="provider_id" value="'+siteID+'">';
reviewForm += '<p class="forlabel" style="border:none"><label class="sub" for="name">お名前：</label><input type="text" maxlength="16" name="username" value="'+usernamae+'"></p>';
reviewForm += '<p class="error" style="border:none">※お名前は16文字以内でお願いします</p>';
reviewForm += '<p class="forlabelMain">';
reviewForm += '<label class="main" for="review">満足度(総合評価)：</label>';
reviewForm += eval('write_review_radiobutton( "score" )');
reviewForm += '</p>';
/*reviewForm += '<p class="forlabel"><label class="sub" for="review">エロさ：</label>';
reviewForm += eval('write_review_radiobutton("score_ero")');
reviewForm += '</p>';*/
//reviewForm += '<p class="forlabel"><label class="sub" for="review">ルックス：</label>';
//reviewForm += eval('write_review_radiobutton("score_looks")');
//reviewForm += '</p>';
/*reviewForm += '<p class="forlabel"><label class="sub" for="review">女優感度：</label>';
reviewForm += eval('write_review_radiobutton("score_sensitivity")');
reviewForm += '</p>';*/
//reviewForm += '<p class="forlabel"><label class="sub" for="review">プレイ内容：</label>';
//reviewForm += eval('write_review_radiobutton("score_play")');
//reviewForm += '</p>';
reviewForm += '<input type="hidden" name="ref" value="'+base64encode(location.pathname)+'">';
reviewForm += '<p class="forlabel" style="border:none"><label class="sub" for="comments">コメント：</label><textarea name="comment" id="comment"></textarea></p>';
reviewForm += '</form>';