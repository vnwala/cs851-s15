/* Source and licensing information for the line(s) below can be found at http://www.weather.com/sites/all/modules/contrib/admin_menu/admin_devel/admin_devel.js. */
(function($){jQuery.extend({debug:function(){window.debug=window.debug||[];args=jQuery.makeArray(arguments);if(typeof this=='object'){var name=(args.length?args[0]:window.debug.length),data=this}else{var name=(args.length>1?args.pop():window.debug.length),data=args[0]};window.debug[name]=data;if(typeof console!='undefined')console.log(name,data);return this}});jQuery.fn.debug=jQuery.debug})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://www.weather.com/sites/all/modules/contrib/admin_menu/admin_devel/admin_devel.js. */
(function($){
/*
  Drupal.behaviors.tf_full_html = {
    attach: function(context, settings) {
      if (typeof(CKEDITOR) != 'undefined') {
        CKEDITOR.config.scayt_autoStartup = true;
        CKEDITOR.on( 'dialogDefinition', function( ev ) {
          // Take the dialog name and its definition from the event data.
          var dialogName = ev.data.name;
          var dialogDefinition = ev.data.definition;

          // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
          if ( dialogName == 'table' ) {
            // Get a reference to the "Link Info" tab.
            var infoTab = dialogDefinition.getContents( 'info' );
            var tableWidth = infoTab.get('txtWidth');
            tableWidth['default'] = 650;
          }
        });
      }
    }
  }
*/
})(jQuery);
;/**/
