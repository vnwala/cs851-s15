
function loadFile( filename, filetype )
{
    if (filetype == "js" )
    { //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
   }
   else if (filetype=="css")
   { //if filename is an external CSS file
       var fileref=document.createElement("link")
       fileref.setAttribute("rel", "stylesheet")
       fileref.setAttribute("type", "text/css")
       fileref.setAttribute("href", filename)
   }

  if (typeof fileref!="undefined")
      document.getElementsByTagName("head")[0].appendChild( fileref )
}

loadFile( "/js/ecl.js", "js" );
loadFile( "/js/libsuggest_v3.js", "js" );

window.onload = function () 
{
    if( document.getElementById("searchForm") && document.getElementById("searchForm").keyword )
    {
        var oTextbox = new AutoSuggestControl
                  (
                      document.getElementById("searchForm").keyword,
                      new SearchSuggestions(), 
                      $("#keywords")
                   );  
    }
}

var g_Suggestions;
var g_bTypeAhead;
var g_oAutoSuggestControl;
var g_TextboxValue;

SearchSuggestions = function(){};

SearchSuggestions.prototype.makeRequest = function (url, callback) 
{
    httpReady = 0;

    var xmlHttpReq = false, self = this;

    // Mozilla/Safari
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    self.xmlHttpReq.open('GET', url, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
            //alert(self.xmlHttpReq.responseText);
            httpReady = 1;
            return callback(self.xmlHttpReq.responseText);

        }
    }

    self.xmlHttpReq.send( url );
}


SearchSuggestions.prototype.setSearchSuggestions = function( response )
{
    eval( response );
//    var movie_titles = window.movie_titles;
    var title;

    g_Suggestions = [];

    if( movie_titles != null )
    {
        for( i = 0; i < movie_titles.length; i++ )
        {
            if( movie_titles[i].title.length  > 0 )
            {
                g_Suggestions.push(movie_titles[i].title);
            }
        }
    }
  
    g_oAutoSuggestControl.autosuggest(g_Suggestions, g_TypeAhead, movie_titles);
    g_oAutoSuggestControl.provider.callbackSelect( g_TextboxValue, movie_titles );
}

/**
 * Request suggestions for the given autosuggest control. 
 * @scope protected
 * @param oAutoSuggestControl The autosuggest control to provide suggestions for.
 */
SearchSuggestions.prototype.requestSuggestions = function (oAutoSuggestControl /*:AutoSuggestControl*/,
                                                          bTypeAhead /*:boolean*/) {
//    var aSuggestions = [];
    g_TextboxValue = oAutoSuggestControl.textbox.value;
    
    g_oAutoSuggestControl = oAutoSuggestControl;
    g_TypeAhead = bTypeAhead;

    oAutoSuggestControl.cur = -1;

    if( g_TextboxValue.length > 0 )
    {  
        var rootdir = (location.pathname.indexOf("gay") == -1) ? "" : "/gay";
        if( document.getElementById( 'provider_id' ) )
        {
            this.makeRequest( rootdir + "/app/suggest/?q="+EscapeEUCJP(g_TextboxValue)+"&provider_id=" +
            document.getElementById( 'provider_id' ).value, this.setSearchSuggestions );
        }
        else
        {
            this.makeRequest( rootdir + "/app/suggest/?q="+EscapeEUCJP(g_TextboxValue), this.setSearchSuggestions ); 
        }
    }
    else
    {
        g_oAutoSuggestControl.autosuggest(new Array(), g_TypeAhead);
    }

};

SearchSuggestions.prototype.callbackSelect = function( textValue, movie_titles )
{
    if( typeof( movie_title ) == 'undefined' ) return;

    for( i = 0; i < movie_titles.length; i++ )
    {
        if( movie_titles[i].title == textValue )
        {
             break;
        }
    }
}

