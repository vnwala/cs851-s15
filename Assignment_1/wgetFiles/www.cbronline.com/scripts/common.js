// JavaScript Document
$(document).ready(function() {

    function resizeContainer() {
        var windowHeight = $(window).height();
        $('#container').css('min-height', windowHeight);
    }

    resizeContainer();
    $(window).resize(function() {
        resizeContainer()
    });

    //clear header search input field when clicked + animate it
    //	$(".searchInput").click(function(){
    //		$(this).animate({
    //			width: 240
    //		},300 ).val("");
    //		$("#menu .left ul li a").animate({
    //			'padding-right' : 15,
    //			'padding-left' : 15,
    //		},300 );
    //	});

    //return header search input field to original state with clicked anywhere else in the document
    //	$(document).mouseup(function (e){
    //		var container = $(".searchInput");		
    //		if (container.has(e.target).length === 0){
    //			container.animate({
    //				width: 240
    //			}, 300, function(){
    //			});
    //			$("#menu .left ul li a").animate({
    //			'padding-right' : 25,
    //			'padding-left' : 25,
    //			},300 );
    //		}
    //	});


    //dropdown menu	
    $('#nav li').hover(
        function() {
            //show its submenu           
            $('.submenu1', this).toggle();
        },
        function() {
            //hide its submenu
            $('.submenu1', this).toggle();
        }
    );
    //dropdown positioning
//    debugger;
    var menuHeight = $('#menu').height();
    $('#menu .submenu1').css('top', (menuHeight));

    //dropdown submenu2	
    $('.submenu1 li').hover(
        function() {
            //show its submenu
            $('.submenu2', this).toggle();
        },
        function() {
            //hide its submenu
            $('.submenu2', this).toggle();
        }
    );
    //dropdown2 height
    var dropdrown2Height = $('#menu .submenu1').height();
    $('#menu .submenu1 .submenu2').css('min-height', dropdrown2Height);


    //makes #bodyLeftRight the height of the #mainBody so the border-left goes all the way down
    //    debugger;
    //    var mainBodyHeight = $('#mainBody').height() - $('#carouselContainer').height() - 40; // 40=margin x 2
    //    $('#bodyLeftRight').height(mainBodyHeight);


    //append arrow_h1.png to all h1 tags
    $('#bodyLeftLeft h1').append('<img src="/Content/images/arrow_h1.png" style="position:absolute; margin-left:10px; top:15px;">');
    $('#bodyLeftRight h1').append('<img src="/Content/images/arrow_h1.png" style="position:absolute; margin-left:10px; top:15px;">');
    $('#bodyMiddle h1').append('<img src="/Content/images/arrow_h1.png" style="position:absolute; margin-left:10px; bottom:2px;">');
    $('.box6 h1, .box9 h1, .box10 h1, .box11 h1, .bodyDiningClub h1, .thankYou h1').append('<img src="/Content/images/arrow_h1.png" style="position:absolute; margin-left:10px; top:5px;">');
    $('#channelHeadline h1').append('<img src="/Content/images/arrow_h1.png" style="position:absolute; margin-left:10px; top:15px;">');
    $('#headForm h1').append('<img src="/Content/images/arrow_h1.png" style="position:absolute; margin-left:10px; top:15px;">');



    //box1 style
    $('.box1').append('<div class="footer"></div>');
    $('.box1 ul li:first-child').css('border-top', 'none');
    $('.box1 ul li:last-child').css('border-bottom', 'none');

    //box2 style
    $('.box2 ul li:last-child').css('border-bottom', 'none');
    //box4 style
    $('.box4 ul li:last-child').css('border-bottom', 'none');
    //box5 style
    $('.box5 ul li:last-child').css('border-bottom', 'none');

    //box7,box8 style
    $('.box7, .box8').append('<div class="footer"></div>');

    //box54 style
    $('.box54 ul li:last-child').css('border-bottom', 'none')

    //box64 style
    $('.box64 ul li:last-child').css('border-bottom', 'none')


    $(function() {
        var tabContainers = $('div.box4 > div');
        tabContainers.hide().filter(':first').show();
        $('div.box4 ul.box4Header a').click(function() {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $('div.box4 ul.box4Header a').removeClass('selected');
            $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });

    $(function() {
        var tabContainers = $('div.box54 > div');
        tabContainers.hide().filter(':first').show();
        $('div.box54 ul.box54Header a').click(function() {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $('div.box54 ul.box54Header a').removeClass('selected');
            $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });

    $(function() {
        var tabContainers = $('div.box64 > div');
        tabContainers.hide().filter(':first').show();
        $('div.box64 ul.box64Header a').click(function() {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $('div.box64 ul.box64Header a').removeClass('selected');
            $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });



    $(function() {
        var tabContainers = $('div.box41 > div');
        tabContainers.hide().filter(':first').show();

        $('div.box41 ul.box41Header a').click(function() {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $('div.box41 ul.box41Header a').removeClass('selected');
            $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });

    $(function() {
        var tabContainers = $('div.box42 > div');
        tabContainers.hide().filter(':first').show();

        $('div.box42 ul.box42Header a').click(function() {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $('div.box42 ul.box42Header a').removeClass('selected');
            $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });

    $(function() {
        var tabContainers = $('div.box74 > div');
        tabContainers.hide().filter(':first').show();
        $('div.box74 ul.box74Header a').click(function() {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            $('div.box74 ul.box74Header a').removeClass('selected');
            $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });



    //carousel/////////////////////////////////
    //carousel buttons
    $("#carousel").append('<div class="carouselBTN"><ul><li><p>1</p></li><li><p>2</p></li><li><p>3</p></li><li><p>4</p></li></ul></div>');
    $("#carouselButtons li").hover(function() {
        colour.stop().fadeTo(500, .7);
    });

    //carousel motion
    function runCarousel(newMarginLeft) {
        //debugger ;
        var carouselWidth = parseInt($("#carousel").css("width"));
        var ulWidth = parseInt($("#carouselElements").css("width"));
        var currentMarginLeft = $("#carouselElements").css("margin-left");

        if (typeof newMarginLeft === "undefined") { //if newMarginLeft has not been passed as an argument
            newMarginLeft = parseInt(currentMarginLeft) - parseInt($("#carousel").css("width"));
        } else { //here the user clicked on the li element to request a particular slide
            newMarginLeft = newMarginLeft;
        }

        if (newMarginLeft <= (-ulWidth)) { //in case the new margin is minor than the width of the carousel, we set it to 0px
            newMarginLeft = "0px";
        }

        $("#carouselElements").animate({ marginLeft: newMarginLeft }, 500);
        var liPosition = Math.abs(newMarginLeft / carouselWidth);
        if (isNaN(liPosition)) { liPosition = 0; } //makes sure it's a number and not NaN
        $(".carouselBTN li").removeClass(); //removes all classes from li elements
        $(".carouselBTN li").eq(liPosition).addClass("carouselBTNpressed"); //adds the button pressed class
    }

    $(".carouselBTN li").click(function() {
        //debugger ;
        var position = $(".carouselBTN li").index(this); //gets the position of the clicked li element
        var newMarginLeft = -(position * parseInt($("#carousel").css("width"))); //calculates the margin to be passed as an argument	
        runCarousel(newMarginLeft); //run the carousel
        $(".carouselBTN li").removeClass(); //removes all classes from li elements
        $(this).addClass("carouselBTNpressed"); //adds the button pressed class
        clearInterval(carouselInterval); //stops the interval
    });

    $(".carouselBTN li").eq(0).addClass("carouselBTNpressed"); //initial state, adds the button pressed class to the first li element
    var carouselInterval = setInterval(runCarousel, 5000); //starts the interval every 5 seconds



    //remove cookies message
    $(".cookies").click(function() {
        $(this).animate({ bottom: -100 }, 900, 'linear', function() { /*completed*/$(this).hide(); });
    });

    $('head').append('<script src="http://business-review-webinars.com/cbrjs/CBRonlineJS.js" type="text/javascript"></script>');

});
var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-35820749-1']); _gaq.push(['_setDomainName', 'cbronline.com']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();

