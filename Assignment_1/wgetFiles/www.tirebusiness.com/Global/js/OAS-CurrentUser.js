(function ()
{

    // First check to see if the CurrentUser and required parameters exist
    // and run the function if they do indeed exist.
    if(typeof CCI != "undefined" && typeof CCI.CurrentUser != "undefined" && CCI.CurrentUser !== null && CCI.CurrentUser.hasOwnProperty("OAS_SubscriptionMap") && CCI.CurrentUser.hasOwnProperty("OAS_ValidDaysLeft"))
    {
        CCI.CurrentUser.OASQuery = QueryAssignment();

        if(CCI.CurrentUser.OASQuery !== '')
        {
            try
            {
                OAS_query = (OAS_query == '') ? CCI.CurrentUser.OASQuery.slice(1) : OAS_query + CCI.CurrentUser.OASQuery;
            }
            catch(e)
            {};
        }
    }

    // ########################################################
    // Add query parameter if user is not logged in
    // ########################################################
    if( typeof CCI != "undefined" && typeof CCI.CurrentUser != "undefined" && CCI.CurrentUser === null )
    {
        CCI.CurrentUser = {};
        CCI.CurrentUser.OASQuery = '&q=cci_is_anonymous';
        
        if(CCI.CurrentUser.OASQuery !== '')
        {
            try
            {
                OAS_query = (OAS_query == '') ? CCI.CurrentUser.OASQuery.slice(1) : OAS_query + CCI.CurrentUser.OASQuery;
            }
            catch(e)
            {};
        }   
    }

    // ####################################################################

    function QueryAssignment()
    {
        
        var slug = '';

        // ########################################################
        // Get the type of subscriptions that are set to be valid for creating OAS 
        // queries and define the cases and slugs to use
        // ########################################################
        if( CCI.CurrentUser.hasOwnProperty("subscriptions") )
        {
            var subs = CCI.CurrentUser.OAS_SubscriptionMap,
                valid_days = ( CCI.CurrentUser.OAS_ValidDaysLeft !== 0 ) ? CCI.CurrentUser.OAS_ValidDaysLeft.split(',') : [],
                single_subs = [],
                single_slugs = [];

            // Build an array of products and corresponding slugs
            for(x in subs)
            {
                single_subs.push(x);
                single_slugs.push(subs[x]);
            }

            for(j = 0; j < CCI.CurrentUser.subscriptions.length; j++)
            {
                // Get the product name and days until expire
                var product = CCI.CurrentUser.subscriptions[j].CSSubscription.product,
                    daysLeft = CCI.CurrentUser.subscriptions[j].CSSubscription.daysUntilExpire;

                if(daysLeft > 0 && slug.indexOf('cci_is_subscriber') === -1 ) 
                {
                    // Add a parameter to indicate that user is a subscriber
                    slug += '&q=cci_is_subscriber';
                }

                // Make sure that the user has valid subscriptions to test before continuing
                if(single_subs.indexOf(product) > -1)
                {
                    slug += "&q=" + single_slugs[single_subs.indexOf(product)];

                    // Run through the valid expiry values to look for
                    // the closest value in days to the user's subscription expiry
                    for(k = 0; k < valid_days.length; k++)
                    {
                        if(daysLeft <= valid_days[k] && daysLeft > 0)
                        {
                            slug += valid_days[k];
                            break;
                        }
                        continue;
                    }

                    // Run through the same valid expiry values but look instead
                    // for closest value that have already expired ( negative days )
                    if(CCI.CurrentUser.OAS_AllowNegativeExpireDate)
                    {
                        for(k = 0; k < valid_days.length; k++)
                        {
                            if( daysLeft >= -Math.abs(valid_days[k+1]) && daysLeft < 0 )
                            {
                                slug += -Math.abs(valid_days[k]);
                                break;
                            }  
                            continue;      
                        }
                    }
                }
            }
        }

        // ########################################################
        // Add query parameter if user is logged in
        // ########################################################
        if( typeof CCI != "undefined" && typeof CCI.CurrentUser != "undefined" && CCI.CurrentUser !== null )
        {
            slug += "&q=cci_is_loggedin";
        }

        // ########################################################
        // Add query parameter if meter count exists
        // ########################################################
        var has_meter = function() {
            var key, obj = CCI.CurrentUser;

            for (key in obj) 
            {
                if (obj.hasOwnProperty(key) && key.match(/meter/i)) 
                {
                    return key;
                }
            }

            return '';
        }

        if( has_meter().length )
        {
            var meter = has_meter();

            slug += '&q=cci_meterleft_' + CCI.CurrentUser[meter].split('|')[0];
        }

        // ########################################################

        return slug;

    }

})();