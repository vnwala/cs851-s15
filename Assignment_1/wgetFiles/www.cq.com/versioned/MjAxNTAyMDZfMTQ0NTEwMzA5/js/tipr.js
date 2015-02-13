/*$(document).ready(function() {
    $('.follow-tip').tipr();
});*/


     $.fn.tipr = function(options) {
     
          var set = $.extend( {
          
               'speed'        : 200,
               'mode'         : 'top'
          
          }, options);

          return this.each(function() {
          
               var tipr_cont = '.tipr_container_' + set.mode;

               $(this).hover(
                    function ()
                    {
                         var out = '<div class="tipr_container_' + set.mode + '"><div class="tipr_point_' + set.mode + '"><div class="tipr_content">' + $(this).attr('data-tip') + '</div></div></div>';
                         
                         $(this).append(out);
                    
                         var w_t = $(tipr_cont).outerWidth();
                         var w_e = $(this).width();
                         var m_l = (w_e / 2) - (w_t / 2);
                    
                         $(tipr_cont).css('margin-left', m_l + 'px');
                         $(this).removeAttr('title');
                         $(tipr_cont).fadeIn(set.speed);              
                    },
                    function ()
                    {   
                         $(tipr_cont).remove();    
                    }     
               );
                              
          });
     };
     
