$(document).ready(function(){

    $('.hairspiring-clip').bind('click', function(event) {
        event.preventDefault();
     
        $.iLightBox([
          {
            URL: "//www.youtube.com/embed/GMkUJaczZ38?list=PLRCzL8uBPC7MS4XfUlLHVUx9okbqCSOjo&autoplay=1",
            options: {
              width: 638,
              height: 360,
              type: 'iframe'
            }
          }
        ]);
      });

    $('.commercial-clip').bind('click', function(event) {
        event.preventDefault();
     
        $.iLightBox([
          {
            URL: "//www.youtube.com/embed/DusgcFnglD8?list=PLRCzL8uBPC7MS4XfUlLHVUx9okbqCSOjo&autoplay=1",
            options: {
              width: 638,
              height: 360,
              type: 'iframe'
            }
          }
        ]);
      });

    $(function() {
      $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').parents().eq(2).addClass('active');
      $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    });

//CLEAR INPUT VALUE ON CLICK

        $("input:text").each(function ()
        {
            // store default value
            var v = this.value;

            $(this).blur(function ()
            {
                // if input is empty, reset value to default 
                if (this.value.length == 0) this.value = v;
            }).focus(function ()
            {
                // when input is focused, clear its contents
                if (this.value == v) this.value = '';
            }); 
        });
        // Alan: textarea doesn't have 'value' attribute, treated seperately here
        $("#message").blur(function() {
            // if input is empty, reset value to default 
            if (this.value.length == 0) this.value = "your message*";
        }).focus(function(){
            if (this.value == "your message*") this.value = '';
        });


// Accordion
    /*$('.panel-collapse').on('shown.bs.collapse', function () {
      $(".expand").text("Collapse All");
    });

    $('.panel-collapse').on('hidden.bs.collapse', function () {
      $(".expand").text("Expand All");
    });*/

    $('.expand').on("click", function (e) {
        e.preventDefault();
        if(!$(".expand").hasClass("expanded")){
            $(".panel-collapse").collapse('show');
            $(".expand").addClass("expanded");
            $(".expand").text("Collapse All");
            $(".panel-title a").removeClass("collapsed");
            /*$(".panel-title a").addClass("collapsed");
            $(".panel-collapse.in").collapse('hide');
            $('.panel-collapse.in').on('hidden.bs.collapse', function () {
              
            });*/
        }

        else{
             $(".panel-collapse").collapse('hide');
             $(".expand").removeClass("expanded");
             $(".expand").text("Expand All");
             $(".panel-title a").addClass("collapsed");
            /*$(".panel-title a").removeClass("collapsed");
            $(".panel-collapse").collapse('show');
            $('.panel-collapse').on('shown.bs.collapse', function () {
              $(".expand").text("Collapse All");
            });*/
        }
    });

// Download teaser
    $(".download-app").mouseover(function(){
        $(".download-app-details").stop().slideDown("fast");
    });

    $(".download-app").mouseout(function(){
        $(".download-app-details").stop().slideUp("fast");
    });
    
// Header logo resize on scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 60){
            $('.navbar-brand').removeClass('long');
            $('.navbar-brand').addClass('short');
        } else if ($(window).scrollTop() <= 60 ){
            $('.navbar-brand').removeClass('short');
            $('.navbar-brand').addClass('long');
        }
        
    });

// Carousel
    $('#carousel-1').slick({
        vertical: true,
        autoplay: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $( ".slick-prev" ).trigger( "click" );

/* Count Down Script
    ---------------------------------------------------------------*/
    $("#getting-started").countdown("2015/02/05", function(event) {
        $(this).html(
            //event.strftime('<span>%D</span> <span>days</span> <span>%H</span><span>%M</span><span>%S</span>')
            event.strftime('<span>%H</span><span>%M</span><span>%S</span>')
        );
    });

    $(".newWindow").click(function(e){
        (e.preventDefault) ? e.preventDefault() : e.returnValue = false; 
        var url = $(e.currentTarget).attr("href") + document.URL;
        window.open(url, "", "width=500,height=500");
    });

    $(".fb-Share").click(function(e) {
        (e.preventDefault) ? e.preventDefault() : e.returnValue = false; 
        var url = window.location.href;
        // var image = "http://" + window.location.hostname + 'http://az681300.vo.msecnd.net/assets/Facebook_OG_Image.jpg';
        // var title = "TEST SHARING";
        // var desc = "TEST DESC";
        var obj = {method: 'feed',link: url};
        function callback(response){}
        FB.ui(obj, callback);   
    })

    $( window ).load(function() {

        $( ".ytlist" ).wrap( "<div class='ytlist-holder'></div>" );
        $( ".ytlist table td:last-child" ).css('display','none');
        $( ".ytlist table td:last-child" ).prev('td').find('span').css('display','none');
        var offsetYt = 0; // current scrolling "amount"

        $(".ytPrev").on( "click", function() {
            if (offsetYt >= 0) {
                offsetYt = 0; // don't exceed this limit
            }
            else{
                offsetYt += $(".ytlist-holder").height() +15; // add a total width of 5 items to the scrolling amount
            }
            

            $('.ytlist').animate({
                'margin-top': offsetYt + 'px'
            });
            console.log(offsetYt);
        });

        $(".ytNext").on( "click", function() {

            if (offsetYt <= -($(".ytlist").height() - $(".ytlist-holder").height())) {
                offsetYt = - 1035; // don't exceed this limit
            }
            else{
                offsetYt -= $(".ytlist-holder").height() +15; // add a total width of 5 items to the scrolling amount
            }

            $('.ytlist').animate({
                'margin-top': offsetYt + 'px'
            });
            console.log(offsetYt);
        });

        




        $('.download-app > a').on("click", function (e) {
            e.preventDefault();
        });

        if ($(window).height() > $('#wrap').height()){
            $("html").addClass("sticky-footer-page");
        }
        
        /*NEW STICKY FOOTER*/
           if (!$("html").hasClass("sticky-footer-page")){
                function checkOffset() {
                    if($(window).scrollTop() + $(window).height() > $('#wrap').height()+$('.footer-bar').height()) {
                       $('.footer-bar').addClass("footer-reached");
                   }
                   else{
                        $('.footer-bar').removeClass("footer-reached");
                   }
                }

                checkOffset();

                $(window).scroll(function() {
                    checkOffset();
                });
            }

        /*END of NEW STICKY FOOTER*/

        //Off-Canvas Menu      
            $("#my-menu").mmenu({
                
            });

            /*Close button*/
            $("#close-my-menu").click(function() {
                 $("#my-menu").trigger("close.mm");
            });

        /*Close menu if html width > 750px*/
            // var delay = (function(){
            //   var timer = 0;
            //   return function(callback, ms){
            //     clearTimeout (timer);
            //     timer = setTimeout(callback, ms);
            //   };
            // })();

            // $(window).resize(function() {
            //     delay(function(){
            //       if ($(window).width()>750){
            //          $("#my-menu").trigger("close.mm");
            //       }
            //       //...
            //     }, 500);

            // });

        /* Vieport animation
        ------------------------------------------------------------------------*/
        // Block 1
            jQuery('.block-1').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeInDown',
                offset: 150
            });

            // Block 2
            jQuery('.block-2 h2').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeInDown',
                offset: 150
            });

            jQuery('.block-2 .subtitle-2').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeInUp',
                offset: 150
            });

            // Block 3
            jQuery('.block-3 img').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeInRight',
                offset: 150
            });

            // Block 4
            jQuery('.block-4 .bubble').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated zoomIn',
                offset: 150
            });

            // Block 5
            jQuery('.block-5 .shave img, .block-5 .support img').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeInRight',
                offset: 150
            });

            // Block 6
            jQuery('.block-6 .carousel1').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeIn',
                offset: 250
            });

            //  jQuery('.block-6-content > p').addClass("cover").viewportChecker({
            //     classToAdd: 'reveal animated fadeInDown',
            //     offset: 250
            // });

            jQuery('.block-6 .bubble').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated zoomIn',
                offset: 250
            });

            jQuery('.block-6 h2').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated fadeInDown',
                offset: 250
            });    

            // Block 7
            jQuery('.block-7.type-2 .bubble').addClass("cover").viewportChecker({
                classToAdd: 'reveal animated zoomIn',
                offset: 250
            });

        // Sticky Footer bar
           /* var wwidth = $(window).width();

            // if ( $.browser.webkit && wwidth > 750 ) {

            //  $('.footer-bar').scrollToFixed( { 
            //      bottom: 0, 
            //      limit: $('.footer-content').offset().top - 48
            //  });
            // }

            if ( wwidth > 750 ) {
                $('.xx').scrollToFixed( { 
                    bottom: 0, 
                    limit: $('.xx').offset().top
                    //limit: $('.xx').offset().top + 110  //for home page
                });
            }*/
            // end if

            /*if ( $.browser.msie && wwidth > 750 ) {
                $('.footer .footer-bar').scrollToFixed( { 
                    bottom: 0, 
                    limit: $('.footer .footer-content').offset().top - 100
                });
            }*/ //UNDEFINED FUNCTION ON LINE 182
        // end if


        // using TweenLite.set() takes care of all vendor-prefixes
            // TweenLite.set(".cardWrapper", {perspective:800});
            // TweenLite.set(".card", {transformStyle:"preserve-3d"});
            // TweenLite.set(".back", {rotationY:-180});
            // TweenLite.set([".back", ".front"], {backfaceVisibility:"hidden"});

            // $(".cardWrapper").hover(
            //   function() {
            //     TweenLite.to($(this).find(".card"), 1.2, {rotationY:180, ease:Back.easeOut});
            //   },
            //   function() {
            //     TweenLite.to($(this).find(".card"), 1.2, {rotationY:0, ease:Back.easeOut});  
            //   }
            // );

            // //a nice little intro;)
            // TweenMax.staggerTo($(".card"), 1, {rotationY:-180, repeat:1, yoyo:true}, 0.1);

            /* Isotope

            -------------------------------------------------------------*/
            // var $container = $('#isotope-container');
            // // init
            // $container.isotope({
            //   // options
            //   itemSelector: '.item',
            //   layoutMode: 'masonry'
            // });


            // //Isotope filter functions
            // var filterFns = {
            //     // show if number is greater than 50
            //     numberGreaterThan50: function() {
            //         var number = $(this).find('.number').text();
            //         return parseInt( number, 10 ) > 50;
            //     },

            //     // show if name ends with -ium
            //     ium: function() {
            //         var name = $(this).find('.name').text();
            //         return name.match( /ium$/ );
            //     }
            // };

            // // bind filter on select change
            // $('#filters').on( 'change', function() {
            //     // get filter value from option value
            //     var filterValue = this.value;
            
            //     // use filterFn if matches value
            //     filterValue = filterFns[ filterValue ] || filterValue;
            //     $container.isotope({ filter: filterValue });
            // });


        /* Uniform */
            $('input[type="radio"],select').uniform({selectAutoWidth:true});


        /* Faces
        -------------------------------------------------------------*/
            var num = getRandomInt(1, 5);
            $('.table-cell-face-left img').attr('src', 'http://az681300.vo.msecnd.net/assets/shave/home-'+ num + '-real-shave-' + 'off' + '.png');
            $('.table-cell-face-right img').attr('src', 'http://az681300.vo.msecnd.net/assets/shave/home-'+ num + '-app-shave-' + 'off' + '.png');

            $('.btn-actual, .table-cell-face-left .face').hover(function(){
                var old = $('.table-cell-face-left img').attr('src');
                $('.table-cell-face-left img').attr('src', old.replace('off', 'on'));
            }, function() {
                var old = $('.table-cell-face-left img').attr('src');
                $('.table-cell-face-left img').attr('src', old.replace('on', 'off'));
            });
            
            $('.btn-virtual, .table-cell-face-right .face').hover(function(){
                var old = $('.table-cell-face-right img').attr('src');
                $('.table-cell-face-right img').attr('src', old.replace('off', 'on'));
            }, function() {
                var old = $('.table-cell-face-right img').attr('src');
                $('.table-cell-face-right img').attr('src', old.replace('on', 'off'));
            });



        /*Login & register switch buttons
             -------------------------------------------------------------
            $( '.switch-1' ).click(function() {
                login_register_switch1_animate();
            });

            $( '.switch-2' ).click(function() {
                login_register_switch2_animate();
            });*/

            var scrollIndicator = 0;
            $(window).scroll(function(){
                
                
                if(!scrollIndicator){
                    $( ".slick-prev" ).trigger( "click" );
                }
                scrollIndicator = 1;
            });

    });/*Window load*/
});
// End Document Ready



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* to be removed ---- DRU
function login_register_switch1_animate() {
    $( '.switch-3' ).animate({
        top: "45px"
    }, 200, function() {
        // Animation complete.
        $( '#usLoginBtn' ).attr('href','javascript:gotoLoginChallengerUSD();');
        $( '#cadLoginBtn' ).attr('href','javascript:gotoLoginChallengerCAD();');
        $( '#usRegisterBtn' ).attr('href','javascript:gotoRegisterChallengerUSD();');
        $( '#cadRegisterBtn' ).attr('href','javascript:gotoRegisterChallengerCAD();');
    });

    $( '.switch-2' ).animate({
        top: "115px"
    }, 200, function() {
        // Animation complete.
    });
}

function login_register_switch2_animate() {
    $( '.switch-2' ).animate({
        top: "45px"
    }, 200, function() {
        // Animation complete.
        $( '#usLoginBtn' ).attr('href','javascript:gotoLoginParticipantUSD();');
        $( '#cadLoginBtn' ).attr('href','javascript:gotoLoginParticipantCAD();');
        $( '#usRegisterBtn' ).attr('href','javascript:gotoRegisterParticipantUSD();');
        $( '#cadRegisterBtn' ).attr('href','javascript:gotoRegisterParticipantCAD();');
    });

    $( '.switch-3' ).animate({
        top: "90px"
    }, 200, function() {
        // Animation complete.
    });
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}  */

