function review_comment_input( review_comment_key_id, review_comment_tid, review_comment_pid, review_comment_count, review_comment_rate, review_comment_comment, review_caption ) {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        review_comment_input_form_display( review_comment_key_id, review_comment_tid, review_comment_pid, review_comment_count, review_comment_rate, review_comment_comment, review_caption );
    }
}
function review_comment_input_form_display( review_comment_key_id, review_comment_tid, review_comment_pid, review_comment_count, review_comment_rate, review_comment_comment, review_caption ) {
    document.getElementById("review_caption").innerHTML = review_caption;
    document.getElementById("review_key_id").value = review_comment_key_id;
    document.getElementById("review_tid").value = review_comment_tid;
    document.getElementById("review_pid").value = review_comment_pid;
    document.getElementById("review_count").value = review_comment_count;
    var review_rate_element = document.getElementById("review_rate_select");
    for ( var loop=0; loop<review_rate_element.options.length; loop++ ) {
        if ( review_rate_element.options[loop].value == review_comment_rate ) {
            review_rate_element.options[loop].selected = true;
            break;
        }
    }
    document.getElementById("reviewform_lightbox_formarea_textarea").value = review_comment_comment;
    if ( review_comment_rate == 0 ) {
        document.getElementById("tweetpost_check").checked = true;
    }

    display_reviewform_lightbox_on();
    document.getElementById("reviewform_lightbox_formarea_textarea").focus();
    document.getElementById("reviewform_lightbox_formarea_textarea").value += '';
    return ;
}

function display_reviewform_lightbox_on() {
    document.getElementById("reviewform_lightbox").style.display = "block";
}
function display_reviewform_lightbox_off() {
    document.getElementById("reviewform_lightbox").style.display = "none";
}
function update_review_comment() {
	var review_caption = document.getElementById("review_caption").innerHTML;
	var review_comment_key_id = document.getElementById("review_key_id").value;
	var review_comment_tid = document.getElementById("review_tid").value;
	var review_comment_pid = document.getElementById("review_pid").value;
	var review_comment_count = document.getElementById("review_count").value;
	var review_rate_element = document.getElementById("review_rate_select");
	var review_comment_rate = 0;
	for ( var loop=0; loop<review_rate_element.options.length; loop++ ) {
		if ( review_rate_element.options[loop].selected == true ) {
			review_comment_rate = review_rate_element.options[loop].value;
			break;
		}
	}
	var review_comment_comment = document.getElementById("reviewform_lightbox_formarea_textarea").value;
	var review_tweetpost_check = 0;
	if ( document.getElementById("tweetpost_check").checked == true ) { review_tweetpost_check = 1; }
	var review_ret_url = document.getElementById("review_ret_url").value;

	if ( review_comment_rate == 0 ) {
		alert( '評価を選択してください' );
	} else {
		if ( confirm( review_caption + 'レビューを保存しますか？' ) == true ) {
			$.ajaxSetup({ async: false, cache: false });
			var mark_api_url = '/api/user/review/add';
			$.post( mark_api_url, { "cmd": "user_review", "type": "add", "key_id": review_comment_key_id, "tid": review_comment_tid, "pid": review_comment_pid, "count": review_comment_count, "review_rate": review_comment_rate, "review_comment": review_comment_comment, "tweetpost_check": review_tweetpost_check, "actionticket": actionticket_tweetpost }, function(data, status){
				if ( data.result == 1 ) {
					alert( 'ありがとうございます！レビューを保存しました。\nページを読み直します' );
				} else {
					alert( 'レビューの保存に失敗しました。\nページを読み直します' );
				}
				location.href = review_ret_url;
			} );
		}
	}
}
function delete_review_comment( review_comment_key_id, review_comment_tid, review_comment_pid, review_comment_count, review_ret_url, review_caption ) {
	var delete_post_message = review_caption + '\nレビューを削除しますか？';
	var delete_post_done_message = '削除しました（ダミー）';
	if ( confirm( delete_post_message ) == true ) {
		$.ajaxSetup({ async: false, cache: false });
		var mark_api_url = '/api/user/review/delete';
		$.post( mark_api_url, { "cmd": "user_review", "type": "delete", "key_id": review_comment_key_id, "tid": review_comment_tid, "pid": review_comment_pid, "count": review_comment_count, "actionticket": actionticket_tweetpost }, function(data, status){
			if ( data.result == 1 ) {
				alert( 'レビューを削除しました。\nページを読み直します' );
			} else {
				alert( 'レビューの削除に失敗しました。\nページを読み直します' );
			}
			location.href = review_ret_url;
		} );
	}
}
