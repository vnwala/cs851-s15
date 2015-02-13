$(function(){

    // Check if there is already an interstitial showing
    var has_conflict = function()
    {
        return (typeof CCI.Ads.Interstitial.isShowing !== undefined && CCI.Ads.Interstitial.isShowing === true) ? true : false;
    }

    // Check to see if the user is logged in so we can
    // determine if they are a subscriber or not
    var is_logged_in = CCI.CurrentUser || false;

    // If the user is logged in, then proceed to check if they are indeed a subscriber
    if(is_logged_in)
    {
        // ################################################################
        // Determine which offer to show, if any
        // ################################################################

        var expDateTB    = ( CCI.CurrentUser.finExpRPN ) ? TBHelpers.calculateDaysLeft( CCI.CurrentUser.finExpRPN ) : false,
            postalCode   = CCI.CurrentUser.postalCode || '',
            advCode      = ( CCI.CurrentUser.advRPN || CCI.CurrentUser.advRPW ) || '',
            is_qualified = false,
            campaign;

        // Requal Offer
        if( CCI.CurrentUser.circStatusRPN == "Q" && (expDateRPN && expDateRPN < 840) )
        {
            is_qualified = true;
            campaign = 'sub_requal';
        }

        // Paid Sub Offer
        if( /^E|undefined$/.test(CCI.CurrentUser.circStatusRPW) && /^E|undefined$/.test(CCI.CurrentUser.circStatusRPN) )
        {
            is_qualified = true;
            campaign = 'sub_paidsub';
        }

        // E-Newsletter Offer
        if( ( /^N|undefined$/.test(CCI.CurrentUser.DailyNewsletter) || /^N|undefined$/.test(CCI.CurrentUser.serviceZone) || /^N|undefined$/.test(CCI.CurrentUser.mostRead)) && ( /^R$/.test(CCI.CurrentUser.circStatusRPW) && /^R$/.test(CCI.CurrentUser.circStatusRPN) || CCI.CurrentUser.circStatusRPN == "Q" && (expDateRPN && expDateRPN > 840) ) )
        {
            is_qualified = true;
            campaign = 'sub_newsletters';
        }

        // ################################################################

        var has_cookie       = CCI.util.readCookie({ name: 'cci_slideInInterstitial' }) || false,
            oas_call         = 'http://oascentral.tirebusiness.com/RealMedia/ads/adstream_dx.ads/json/www.tirebusiness.com/custom_interstitial//1'+ Math.floor(Math.random() * 1000000000) +'@x89?q=' + campaign,
            has_creative;

        if( ! has_conflict() && ! has_cookie && is_qualified )
        {
            // First check to see if there is a creative for the custom interstitial
            $.get(oas_call, function(data){
                has_creative = (typeof data == 'object' && data['Ad'].length) ? true : false;
                $(document).trigger('call_interstitial');
            });
        }

        $(document).on('call_interstitial', function() 
        {

            if( has_creative )
            {
                window.setTimeout(function() 
                {

                    $.ajax({
                        url: '/section/custom-interstitial',
                        method: 'get',
                        data: { 
                            CIS_Campaign: campaign,
                            CIS_PostalCode: postalCode,
                            CIS_AdvCode: advCode
                        },
                        success: function(data) {

                            $('body').append(data);

                            $('#cci_modal .ui_modal').animate({
                                'left': '100'
                            });

                            $(".ui_modal_close").click(function(e){
                                e.preventDefault();
                                CCI.util.createCookie({ name: "cci_slideInInterstitial", value: 1, days: 7 });
                                $('#cci_modal .ui_modal').animate({
                                    'left': '-500'
                                });
                            });
                        }
                    });
                }, 5000);
            }
        });
    }
});
