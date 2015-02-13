var animeradar_url_path = '/';
function set_cookie( name, value ) {
    var cookie_string = "";
    var nowdate = new Date();
    nowdate.setTime( nowdate.getTime() + (24*60*60*1000 * 365 * 1) );
    var expires_date = nowdate.toUTCString();
    cookie_string += name + '=' + escape( value ) + "; expires=" + expires_date + "; path=" + animeradar_url_path + ";";

    document.cookie=cookie_string;
}
function get_cookie( name ) {
    var st_idx = "";
    var ed_idx = "";
    var cookie_value = '';
    if ( document.cookie.length > 0 ) {
        st_idx = document.cookie.indexOf( name + '=' );
        if ( st_idx != -1 ){
            st_idx = st_idx + name.length + 1;
            ed_idx = document.cookie.indexOf( ";", st_idx );
            if ( ed_idx == -1 ) ed_idx = document.cookie.length;
            cookie_value = unescape( document.cookie.substring( st_idx, ed_idx ) );
        }
    }
    return cookie_value;
}
function init_title_check() {
    animeradar_cookie_string_my_key_list = get_cookie( 'animeradar_my_key_list' );
    my_key_list = animeradar_cookie_string_my_key_list.split( ':' );
    for ( i=0; i < my_key_list.length; i++ ) {
        if ( my_key_list[i] == '' ) continue;
        if ( document.getElementById( "titlebox_" + my_key_list[i] ) ) {
            $("#titlebox_" + my_key_list[i] ).addClass("watching");
            $("#title_check_button_" + my_key_list[i] ).val("視聴中");
        }
    }

}
function toggle_title_check( target_key_id ) {
    animeradar_cookie_string_my_key_list = get_cookie( 'animeradar_my_key_list' );
    my_key_list = animeradar_cookie_string_my_key_list.split( ':' );

    if ( animeradar_cookie_string_my_key_list.match( /^\s*$/ ) ) {
        if ( confirm( "twitterIDでログインしておくと、端末間で設定を共有することができます。\ntwitterIDでログインしますか？" ) == true ) {
            animeengine_signin();
            return ;
        }
    }

    my_key_list_new = new Array();
    if ( $("#titlebox_" + target_key_id ).hasClass("watching") == true ) {
        for ( i=0; i < my_key_list.length; i++ ) {
            if ( my_key_list[i] == '' ) continue;
            if ( my_key_list[i] == target_key_id ) {
                // このキーだけ追加しない。
            } else {
                my_key_list_new.push( my_key_list[i] );
            }
        }

        $("#titlebox_" + target_key_id ).removeClass("watching");
        $("#title_check_button_" + target_key_id ).val("未視聴");
    } else {
        for ( i=0; i < my_key_list.length; i++ ) {
            if ( my_key_list[i] == '' ) continue;
            my_key_list_new.push( my_key_list[i] );
        }
        my_key_list_new.push( target_key_id );    // このキーを追加。

        $("#titlebox_" + target_key_id ).addClass("watching");
        $("#title_check_button_" + target_key_id ).val("見てる");
    }
    set_cookie( 'animeradar_my_key_list', my_key_list_new.join( ":" ) );
}
function toggle_my_title_check( target_key_id ) {
    if ( $("#titlebox_" + target_key_id ).hasClass("watching") == false ) {
        $.ajaxSetup({ async: false, cache: false });
        var user_mytitle_api_url = '/api/user/mykey/add/' + target_key_id + '';
//        $.get( user_mytitle_api_url, {}, function(data, status) {
        $.post( user_mytitle_api_url, { "cmd": "user_mykey", "type": "add", "key_id": target_key_id, "actionticket": actionticket_togglecheck }, function(data, status) {
            if ( data.result == 0 ) {
                alert( '設定操作のエラーが発生しました。' );
            } else {
                $("#titlebox_" + target_key_id ).addClass("watching");
                $("#title_check_button_" + target_key_id ).val("視聴中");
            }
        } );
    } else {
        $.ajaxSetup({ async: false, cache: false });
        var user_mytitle_api_url = '/api/user/mykey/delete/' + target_key_id + '';
//        $.get( user_mytitle_api_url, {}, function(data, status) {
        $.post( user_mytitle_api_url, { "cmd": "user_mykey", "type": "delete", "key_id": target_key_id, "actionticket": actionticket_togglecheck }, function(data, status) {
            if ( data.result == 0 ) {
                alert( '設定操作のエラーが発生しました。' );
            } else {
                $("#titlebox_" + target_key_id ).removeClass("watching");
                $("#title_check_button_" + target_key_id ).val("未視聴");
            }
        } );
    }
}
function init_channel_check() {
    animeradar_cookie_string_my_channel_list = get_cookie( 'animeradar_my_channel_list' );
    my_channel_list = animeradar_cookie_string_my_channel_list.split( ':' );
    for ( i=0; i < my_channel_list.length; i++ ) {
        if ( my_channel_list[i] == '' ) continue;
        if ( document.getElementById( "channel_check_button_" + my_channel_list[i] ) ) {
            document.getElementById( "channel_check_button_" + my_channel_list[i]).checked = true;
        }
    }
}
function toggle_channel_check( target_channel_id ) {
    animeradar_cookie_string_my_channel_list = get_cookie( 'animeradar_my_channel_list' );
    my_channel_list = animeradar_cookie_string_my_channel_list.split( ':' );

    my_channel_list_new = new Array();
    if ( document.getElementById( "channel_check_button_" + target_channel_id ).checked == false ) {
        for ( i=0; i < my_channel_list.length; i++ ) {
            if ( my_channel_list[i] == '' ) continue;
            if ( my_channel_list[i] == target_channel_id ) {
                // このページのキーだけ追加しない。
            } else {
                my_channel_list_new.push( my_channel_list[i] );
            }
        }
    } else {
        for ( i=0; i < my_channel_list.length; i++ ) {
            if ( my_channel_list[i] == '' ) continue;
            my_channel_list_new.push( my_channel_list[i] );
        }
        my_channel_list_new.push( target_channel_id );    // このページのキーを追加。
    }
    set_cookie( 'animeradar_my_channel_list', my_channel_list_new.join( ":" ) );
}
function toggle_my_channel_check( target_channel_id ) {
    if ( document.getElementById( "channel_check_button_" + target_channel_id ).checked == true ) {
        $.ajaxSetup({ async: false, cache: false });
        var user_mychannel_api_url = '/api/user/mychannel/add/' + target_channel_id + '';
//        $.get( user_mychannel_api_url, {}, function(data, status) {
        $.post( user_mychannel_api_url, { "cmd": "user_mychannel", "type": "add", "channel_id": target_channel_id, "actionticket": actionticket_togglecheck }, function(data, status) {
            if ( data.result == 0 ) { alert( '設定操作のエラーが発生しました。' ); }
            document.getElementById( "channel_check_button_" + target_channel_id ).checked = true;
        } );
    } else {
        $.ajaxSetup({ async: false, cache: false });
        var user_mychannel_api_url = '/api/user/mychannel/delete/' + target_channel_id + '';
//        $.get( user_mychannel_api_url, {}, function(data, status) {
        $.post( user_mychannel_api_url, { "cmd": "user_mychannel", "type": "delete", "channel_id": target_channel_id, "actionticket": actionticket_togglecheck }, function(data, status) {
            if ( data.result == 0 ) { alert( '設定操作のエラーが発生しました。' ); }
            document.getElementById( "channel_check_button_" + target_channel_id ).checked = false;
        } );
    }
}
