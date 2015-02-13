var photomarkKeyId;
var photomarkUserName;

function display_lightbox_on( thumbnail_url, media_url, large_url, link_url, permalink, text_summary ) {
    if ( media_url != '' ) { document.getElementById("photo_lightbox_img").setAttribute( "src", media_url ); }
    else if ( link_url != '' ) { document.getElementById("photo_lightbox_img").setAttribute( "src", link_url ); }
    else                   { document.getElementById("photo_lightbox_img").setAttribute( "src", thumbnail_url ); }
    if ( permalink != '' ) { document.getElementById("photo_lightbox_weblink").setAttribute( "href", permalink ); }
//    if ( permalink != '' ) { document.getElementById("photo_lightbox_imgweblink").setAttribute( "href", permalink ); }
    if ( large_url != '' ) { document.getElementById("photo_lightbox_imgweblink").setAttribute( "href", large_url ); }
    document.getElementById("photo_lightbox").style.display = "block";
    var photo_lightbox_textbox_element = document.getElementById("photo_lightbox_textbox");
    if ( photo_lightbox_textbox_element.hasChildNodes() ) { photo_lightbox_textbox_element.removeChild( photo_lightbox_textbox_element.lastChild ); }
    photo_lightbox_textbox_element.appendChild( document.createTextNode( text_summary ) );
}
function display_lightbox_off() {
    document.getElementById("photo_lightbox").style.display = "none";
    document.getElementById("photo_lightbox_img").setAttribute( "src", "" );

    var textbox_element = document.getElementById("photo_lightbox_textbox");
    while ( textbox_element.childNodes.length  >= 1  ) {
        textbox_element.removeChild( textbox_element.firstChild );
    }
}
function display_lightbox_detail_on( thumbnail_url, media_url, large_url, original_url, link_url, permalink, text_full, user_name, user_screen_name, user_profile_image_url ) {
    if ( media_url != '' ) { document.getElementById("photo_lightbox_img").setAttribute( "src", media_url ); }
    else if ( link_url != '' ) { document.getElementById("photo_lightbox_img").setAttribute( "src", link_url ); }
    else                   { document.getElementById("photo_lightbox_img").setAttribute( "src", thumbnail_url ); }
    if ( permalink != '' ) { document.getElementById("photo_lightbox_weblink").setAttribute( "href", permalink ); }
//    if ( permalink != '' ) { document.getElementById("photo_lightbox_imgweblink").setAttribute( "href", permalink ); }
    if ( original_url != '' ) { document.getElementById("photo_lightbox_imgweblink").setAttribute( "href", original_url ); }
    else if ( large_url != '' ) { document.getElementById("photo_lightbox_imgweblink").setAttribute( "href", large_url ); }
    if ( permalink != '' ) { document.getElementById("photo_lightbox_datetime").setAttribute( "href", permalink ); }

    if ( user_name != '' ) { document.getElementById("photo_lightbox_user_name").appendChild( document.createTextNode( user_name ) ); }
    if ( user_screen_name != '' ) { document.getElementById("photo_lightbox_user_screen_name").appendChild( document.createTextNode( user_screen_name ) ); }
    if ( user_screen_name != '' ) { document.getElementById("photo_lightbox_user_profile_url").setAttribute( "href", "https://twitter.com/"+user_screen_name ); }
    if ( user_profile_image_url != '' ) { document.getElementById("photo_lightbox_user_profile_image_url").setAttribute( "src", user_profile_image_url ); }

    document.getElementById("photo_lightbox").style.display = "block";
    var photo_lightbox_textbox_element = document.getElementById("photo_lightbox_textbox");
    if ( photo_lightbox_textbox_element.hasChildNodes() ) { photo_lightbox_textbox_element.removeChild( photo_lightbox_textbox_element.lastChild ); }
    photo_lightbox_textbox_element.appendChild( document.createTextNode( text_full ) );
}
function display_lightbox_detail_off() {
    document.getElementById("photo_lightbox").style.display = "none";
    document.getElementById("photo_lightbox_img").setAttribute( "src", "" );

    var textbox_element = document.getElementById("photo_lightbox_textbox");
    while ( textbox_element.childNodes.length  >= 1  ) { textbox_element.removeChild( textbox_element.firstChild ); }
    var user_name_element = document.getElementById("photo_lightbox_user_name");
    while ( user_name_element.childNodes.length  >= 1  ) { user_name_element.removeChild( user_name_element.firstChild ); }
    var user_screen_name_element = document.getElementById("photo_lightbox_user_screen_name");
    while ( user_screen_name_element.childNodes.length  >= 1  ) { user_screen_name_element.removeChild( user_screen_name_element.firstChild ); }
}
function lightbox_initvalue( photomark_key_id, photomark_user_name ) {
    photomarkKeyId = photomark_key_id;
    photomarkUserName = photomark_user_name;
}


