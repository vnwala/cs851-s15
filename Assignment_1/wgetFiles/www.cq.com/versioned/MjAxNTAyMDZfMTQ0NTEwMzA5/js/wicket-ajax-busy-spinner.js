var needGlobalAjaxBusy = false;
var globalAjaxBusy = false;

function onAjaxBusy()
{
  needGlobalAjaxBusy = true;
  
  window.setTimeout(function(){
    if( needGlobalAjaxBusy )
    {
      globalAjaxBusy = true;
      $('body').addClass('ajax-busy');
    }
  },200);
  
}

function onAjaxDone()
{
  needGlobalAjaxBusy = false;
  if( globalAjaxBusy )
  {
    globalAjaxBusy = false;
    $('body').removeClass('ajax-busy');
  }
}

if( typeof Wicket != 'undefined' )
{
  Wicket.Event.subscribe('/ajax/call/beforeSend', function(jqEvent, attributes, jqXHR, errorThrown, textStatus) {
    onAjaxBusy();
  });
  
  Wicket.Event.subscribe('/ajax/call/success', function(jqEvent, attributes, jqXHR, errorThrown, textStatus) {
    onAjaxDone();
  });
  
  Wicket.Event.subscribe('/ajax/call/failure', function(jqEvent, attributes, jqXHR, errorThrown, textStatus) {
    onAjaxDone();
  });
  
  Wicket.Event.subscribe('/ajax/call/success', function(jqEvent, attributes, jqXHR, errorThrown, textStatus) {
    onAjaxDone();
  });
  
  Wicket.Event.subscribe('/ajax/call/complete', function(jqEvent, attributes, jqXHR, errorThrown, textStatus) {
    onAjaxDone();
  });
}
