var app = app || {};

(function ($) {
    app.authheader = { "x-zumo-application": "QJyoUQYkWintjIWPbHWWkZaGjcBnGS30" };
    app.imageTemplate = '<div><div class="cardWrapper" style="width:<%= outerWidth %>px;height:<%= outerHeight %>px;"><div class="card"><div class="cardFace front" style="width:<%= outerWidth %>px;height:<%= outerHeight %>px;" id="imageFront"><span class="helper-valign"></span><img style="width:<%= outerWidth %>; height:auto; overflow:hidden;" class="cface" src="<%= imageUrl %>"  onError="this.onerror=null;onErrorFire(this);"><%= badge %></div><div class="cardFace back" style="width:<%= outerWidth %>px;height:<%= outerHeight %>px;"><h5 style="margin-bottom:5px;"><%= firstName %><br /><%= lastName %></h5><span>Raised: $<%= raised %><br />Views: <%= views %></span><div clear="both"></div><a class="btn small" href="<%= linkToProfile %>">View Profile</a></div></div></div></div>';

    app.baldieView = Backbone.View.extend({
        currentPage: 1,
        numPerPage: 10,
        currentBatch: null,
        el: $("body"),
        initialize: function () {
            var self = this;
            self.client = new WindowsAzure.MobileServiceClient('https://nohairselfie.azure-mobile.net/', 'QJyoUQYkWintjIWPbHWWkZaGjcBnGS30');
            self.participantsTable = self.client.getTable('participants');
            self.loadImage();
        },


        events: {
        },


        render: function () {

            var self = this;

            var template = _.template(app.imageTemplate);
         

            for (var i = 0; i < self.currentBatch.length; i++) {
                var curItem = self.currentBatch[i];
                var outerHeight = 190;
                var outerWidth = 165;
                var badge='';

                var width = Math.floor(curItem.imagewidth / (curItem.imageheight/215));
                var margin = 0;
                if (width > 180 )
                    margin = Math.floor((width - 180) / 2);

                // check if the images is of a challenger
                if (curItem.subeventid == "9659" || curItem.subeventid == "9674") {
                    badge = '<img class="yellowBadge" src="http://az681300.vo.msecnd.net/assets/hair-dare-overlay-badge.png" style="width:111px;height:39px;top:140px;position:absolute;">';    
                }

                var elem = $(template({ badge:badge, outerWidth:outerWidth, outerHeight: outerHeight, margin:margin, imageUrl: curItem.imageurl, firstName: curItem.firstname, lastName: curItem.lastname, raised: (curItem.confirmedachievedamount+curItem.unconfirmedachievedamount)?curItem.confirmedachievedamount+curItem.unconfirmedachievedamount:0, views: (curItem.count)?curItem.count:0, linkToProfile: curItem.participantpageurl }));


                $('#carousel').append(elem);    
            }

            /* Begin Carousel
            ------------------------------------------------------------*/
            $('.carousel').slick({
                autoplay: true,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 5,

                // Begin Responsive 
                responsive: [
                    {
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    },

                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },

                    {
                        breakpoint: 580,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },            

                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
                // End Responsive

            });
            //End Carousel
    
            var cardWrapperSelector = " .cardWrapper";
            var cardSelector = " .cardWrapper" + " .card";
            var backSelector = " .cardWrapper" + " .back";
            var frontSelector = " .cardWrapper" + " .front";

            // using TweenLite.set() takes care of all vendor-prefixes
            TweenLite.set(cardWrapperSelector, {perspective:800});
            // TweenLite.set(cardSelector, {transformStyle:"preserve-3d"});
            TweenLite.set(backSelector, {rotationY:-180});
            TweenLite.set([backSelector, frontSelector], {backfaceVisibility:"hidden"});
            // TweenLite.set([$('.yellowBadge')], {backfaceVisibility:"hidden"});

            $(cardWrapperSelector).hover(
              function() {
                TweenLite.to($(this).find('.front'), 1.2, {rotationY:180, ease:Back.easeOut});
                TweenLite.to($(this).find('.back'), 1.2, {rotationY:-0, ease:Back.easeOut});
                // TweenLite.to($(this).find('.card'), 1.2, {rotationY:180, ease:Back.easeOut});
                // TweenLite.to($(this).find('.yellowBadge'), 1.2, {rotationY:180, ease:Back.easeOut});
              },
              function() {
                TweenLite.to($(this).find('.front'), 1.2, {rotationY:0, ease:Back.easeOut});
                TweenLite.to($(this).find('.back'), 1.2, {rotationY:-180, ease:Back.easeOut});  
                // TweenLite.to($(this).find('.card'), 1.2, {rotationY:0, ease:Back.easeOut});
                // TweenLite.to($(this).find('.yellowBadge'), 1.2, {rotationY:0, ease:Back.easeOut});  
              }
            );

            //a nice little intro;)
            // TweenMax.staggerTo($(cardSelector), 1, {rotationY:-180, repeat:1, yoyo:true}, 0.1);

        
            
        },
        loadImage: function() {
            var self = this;
            self.participantsTable.where(function(){return (this.trending && this.imageurl.indexOf('im_participant_default.jpg') == -1 && this.imageurl.indexOf('participant.jpg') == -1)}).orderByDescending('registrationdate').read().done(function (results) {
                if (results.length == 0)
                {
                    // $(window).off('scroll', self.detectScroll);
                } else{
                    self.currentBatch = results;
                    
                    self.render();
                    
                }
                
            }, function (err) {
                alert("Error: " + err);
            });
        }
        

    });

    new app.baldieView();
})(jQuery);


function onErrorFire(i) {
    i.src='http://az681300.vo.msecnd.net/assets/avatar.jpg';
    //$(i).prev().css( "height", "215" );
}
