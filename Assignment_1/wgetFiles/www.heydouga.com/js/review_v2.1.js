var review_page_type = '';
var review_provider_name = '';
var review_vote_redirect = '';

function reviews_get( params )
{
   movie_seq     = params.movie_seq;
   page          = params.page;
   type          = params.type;
   provider_name = params.provider_name;
  
   if( typeof( params.vote_redirect ) != 'undefined' )
   { 
       window.review_vote_redirect = params.vote_redirect;   
   }

   if( review_page_type == "" && review_provider_name == "" )
   {
       if( !type ) 
       {
           window.review_page_type = 'ppv';
       } 
       else
       {
           window.review_page_type = type;
           window.review_provider_name = provider_name;
       }
   }
 
   if( page > 0 )
   {
       makeRequest( "/app/review_getjs/?id="+movie_seq+"&page="+page+"&r="+Math.random(), reviews_set ); 
   }
   else
   {
       makeRequest( "/app/review_getjs/?id="+movie_seq+"&showall=1&r="+Math.random(), reviews_set );
   }
}

function review_vote( review_id, vote )
{
    if( !getCookie('NetiA') )
    {
        alert('先にログインしてください');
        return 0;
    }

    vote = ( vote != 0 ) ? 1 : 0;

    makeRequest( "/member/app/review_vote/?review_id="+review_id+"&vote="+vote, review_vote_callback );
}

function review_vote_callback( response )
{
    ok = response.split(":")[0];
    error = response.split(":")[1];

    if( ok == '1' )
    {
        if( window.review_vote_redirect != '' )
        {
            window.location.href = window.review_vote_redirect;
        }
        else
        {
            window.location.reload( );
        }

        return;
    }

    alert( error );
    
}

function __(id){ return document.getElementById(id); }

function reviews_set( response )
{
    eval( response );

    var data = 
    {
        reviews                  : reviews,
        review_page_type         : window.review_page_type,
        review_error             : decodeURI( querySt('review_error') ),
        provider_name            : window.review_provider_name,
        _MODIFIERS               : 
        {
            review_score : function( score )
            {
                if( !score || 0 > score || score > 5 ) return 0;

                return score;
            },

            review_csspos : function( score, basepos )
            {
                if( !score || 0 > score || score > 5 ) return 0;

                return ( score * basepos );
            }

        }
    }; 

    __("movie-comment").innerHTML = TrimPath.parseTemplate(review_template.html).process(data);
    if(data['review_error'] != "" && data['review_error'] != "null" ) {
        $(".errorText").html(data['review_error']);
        show_review_form();
    }
}
