function photo_official_reply() {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( 'この画像ツイートに返信しますか？ (ツイートフォームを開きます)' ) == true ) {
            var photo_official_reply_permalink = document.getElementById("photo_lightbox_weblink").getAttribute( "href" );
            official_reply_with_permalink( photo_official_reply_permalink );
        }
    }
}
function photo_official_retweet() {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( "この画像ツイートを公式リツイートしますか？" ) == true ) {
            var photo_official_retweet_permalink = document.getElementById("photo_lightbox_weblink").getAttribute( "href" );
            official_retweet_with_permalink( photo_official_retweet_permalink );
        }
    }
}
function photo_official_favorite() {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( "この画像ツイートを公式お気に入り登録しますか？" ) == true ) {
            var photo_official_favorite_permalink = document.getElementById("photo_lightbox_weblink").getAttribute( "href" );
            official_favorite_with_permalink( photo_official_favorite_permalink );
        }
    }
}

function photo_mark( key_id, user_name ) {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        var photo_mark_permalink = document.getElementById("photo_lightbox_weblink").getAttribute( "href" );
        if ( photo_mark_check_with_permalink( photo_mark_permalink ) == 1 ) {
            if ( confirm( "<< この画像ツイートはマーク済みです ! >>\nマークを取り消しますか？" ) == true ) {
                photo_mark_delete_with_permalink( photo_mark_permalink );
            }
        } else {
            if ( confirm( "この画像ツイートをマークしておきますか？" ) == true ) {
                photo_mark_with_permalink( key_id, user_name, photo_mark_permalink );
            }
        }
    }
}

function tweet_official_reply( tweet_official_reply_permalink ) {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( 'このツイートに返信しますか？ (ツイートフォームを開きます)' ) == true ) {
            official_reply_with_permalink( tweet_official_reply_permalink );
        }
    }
}
function tweet_official_retweet( tweet_official_retweet_permalink ) {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( "このツイートを公式リツイートしますか？" ) == true ) {
            official_retweet_with_permalink( tweet_official_retweet_permalink );
        }
    }
}
function tweet_official_favorite( tweet_official_favorite_permalink ) {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( "このツイートを公式お気に入り登録しますか？" ) == true ) {
            official_favorite_with_permalink( tweet_official_favorite_permalink );
        }
    }
}
function official_reply_form_post() {
    if ( LOGIN_FLAG == 0 ) {
        if ( confirm( 'この機能を使うにはtwitterIDでログインする必要があります。ログインしますか？' ) == true ) {
            animeengine_signin();
        }
    } else {
        if ( confirm( "返信ツイートを送信しますか？" ) == true ) {
            reply_form_post();
        }
    }
}
function official_reply_with_permalink( official_reply_permalink ) {
    var official_reply_id = '';
    var official_reply_id_array = official_reply_permalink.match( /\/statuses\/(\d+)/ );
    if ( official_reply_id_array[0] ) { official_reply_id = official_reply_id_array[1]; }
    var official_reply_screen_name = '';
    var official_reply_screen_name_array = official_reply_permalink.match( /twitter.com\/(.*?)\/statuses\// );
    if ( official_reply_screen_name_array[0] ) { official_reply_screen_name = official_reply_screen_name_array[1]; }
    document.getElementById("tweetform_lightbox_formarea_textarea").value = "@" + official_reply_screen_name + " ";
    document.getElementById("in_reply_to_status_id").value = official_reply_id;

    display_tweetform_lightbox_on( official_reply_permalink );
    document.getElementById("tweetform_lightbox_formarea_textarea").focus();
    document.getElementById("tweetform_lightbox_formarea_textarea").value += '';
    return ;
}
function reply_form_post() {
    var official_reply_id = document.getElementById("in_reply_to_status_id").value;
    var official_reply_text = document.getElementById("tweetform_lightbox_formarea_textarea").value;

    if ( ( official_reply_text != '' ) && ( official_reply_id != '' ) ) {
        $.ajaxSetup({ async: false, cache: false });
        var official_tweet_api_url = '/api/user_post_tweet';
        $.post( official_tweet_api_url, { "cmd": "user_post_tweet", "text": official_reply_text, "in_reply_to_status_id": official_reply_id, "actionticket": actionticket_tweetpost }, function(data, status){
            if ( data.result == 1 ) {
                alert( '返信が完了しました。' );
                display_tweetform_lightbox_off();
            } else {
                alert( '返信に失敗しました。' );
            }
        } );
    }
    return ;
}

function official_retweet_with_permalink( official_retweet_permalink ) {

    var official_retweet_id = '';
    var official_retweet_id_array = official_retweet_permalink.match( /\/statuses\/(\d+)/ );
    if ( official_retweet_id_array[0] ) { official_retweet_id = official_retweet_id_array[1]; }

    if ( official_retweet_id != '' ) {
        $.ajaxSetup({ async: false, cache: false });
        var official_retweet_api_url = '/api/user_post_retweet/' + official_retweet_id + '';
        $.post( official_retweet_api_url, { "cmd": "user_post_retweet", "id": official_retweet_id, "actionticket": actionticket_tweetpost }, function(data, status){
            if ( data.result == 1 ) {
                alert( 'リツイートが完了しました。' );
                display_lightbox_off();
            } else {
                alert( 'リツイートに失敗しました。' );
            }
        } );
    }
    return ;
}
function official_favorite_with_permalink( official_favorite_permalink ) {
    var official_favorite_id = '';
    var official_favorite_id_array = official_favorite_permalink.match( /\/statuses\/(\d+)/ );
    if ( official_favorite_id_array[0] ) { official_favorite_id = official_favorite_id_array[1]; }

    if ( official_favorite_id != '' ) {
        $.ajaxSetup({ async: false, cache: false });
        var official_favorite_api_url = '/api/user_post_favorites/' + official_favorite_id + '';
        $.post( official_favorite_api_url, { "cmd": "user_post_favorites", "id": official_favorite_id, "actionticket": actionticket_tweetpost }, function(data, status){
            if ( data.result == 1 ) {
                alert( 'お気に入り登録が完了しました。' );
                display_lightbox_off();
            } else {
                alert( 'お気に入り登録に失敗しました。' );
            }
        } );
    }
    return ;
}
function photo_mark_with_permalink( key_id, user_name, mark_permalink ) {
    var mark_id = '';
    var mark_id_array = mark_permalink.match( /\/statuses\/(\d+)/ );
    if ( mark_id_array[0] ) { mark_id = mark_id_array[1]; }

    if ( mark_id != '' ) {
        $.ajaxSetup({ async: false, cache: false });
        var mark_api_url = '/api/user_post_photomark/' + mark_id + '';
        $.post( mark_api_url, { "cmd": "user_post_photomark", "id": mark_id, "key_id": key_id, "user_name": user_name, "actionticket": actionticket_tweetpost }, function(data, status){
            if ( data.result == 1 ) {
                alert( '画像をマークしました。' );
                display_lightbox_off();
            } else {
                alert( '画像のマークに失敗しました。\n画像データがすでにマーク済みか、利用不能データの可能性があります。' );
            }
        } );
    }
    return ;
}
function photo_mark_delete_with_permalink( mark_permalink ) {
    var mark_id = '';
    var mark_id_array = mark_permalink.match( /\/statuses\/(\d+)/ );
    if ( mark_id_array[0] ) { mark_id = mark_id_array[1]; }

    if ( mark_id != '' ) {
        $.ajaxSetup({ async: false, cache: false });
        var mark_api_url = '/api/user_delete_photomark/' + mark_id + '';
        $.post( mark_api_url, { "cmd": "user_delete_photomark", "id": mark_id, "actionticket": actionticket_tweetpost }, function(data, status){
            if ( data.result == 1 ) {
                alert( '画像マークを取り消しました。' );
                display_lightbox_off();
            } else {
                alert( '画像マークの取り消しに失敗しました。\nすでにマーク取り消し済みの可能性があります。' );
            }
        } );
    }
    return ;
}
function photo_mark_check_with_permalink( photomark_permalink ) {
    var photomark_status_id = '';
    var photomark_status_id_array = photomark_permalink.match( /\/statuses\/(\d+)/ );
    if ( photomark_status_id_array[0] ) { photomark_status_id = photomark_status_id_array[1]; }

    var photo_mark_check_flag = 0;
    if ( photomark_status_id != '' ) {
        $.ajaxSetup({ async: false, cache: false });
        var photomark_check_api_url = '/api/user_check_photomark/' + photomark_status_id + '';
        $.post( photomark_check_api_url, { "cmd": "user_check_photomark", "id": photomark_status_id, "actionticket": actionticket_tweetpost }, function(data, status){
            if ( data.result == 1 ) {
                photo_mark_check_flag = 1;
            } else {
                photo_mark_check_flag = 0;
            }
        } );
    }
    return photo_mark_check_flag;
}

function display_tweetform_lightbox_on( permalink ) {
    document.getElementById("tweetform_lightbox").style.display = "block";
}
function display_tweetform_lightbox_off() {
    document.getElementById("tweetform_lightbox").style.display = "none";
}



