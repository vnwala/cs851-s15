	//Name: $Id: ajax.js,v 1.6 2008/06/03 22:11:12 bschlicht Exp $
	//Purpose: These are the functions that are necessary to run AJAX scripts on a page.

	function getAJAXObject()
	/*
		getAJAXObject()
		This creates the AJAX object for the page, specific to the user's browser type/version
	*/
	{
        	var xmlHttp = null;

	        //Create AJAX object for the specific browser
        	try
	        {
        	        xmlHttp = new XMLHttpRequest();
	        }//try the firefox/opera/safari method
        	catch (e)
	        {
        	        // Internet Explorer
                	try
	                {
        	                xmlHttp = new ActiveXObject( "Msxml2.XMLHTTP" );
                	}//try the IE 6+ method
	                catch (e)
        	        {
                	        try
                        	{
                                	xmlHttp = new ActiveXObject( "Microsoft.XMLHTTP" );
                	        }//try the IE 5.5+ method
        	                catch (e)
	                        {
                                	alert( "Your browser does not support AJAX!" );
                        	        return false;
                	        }//catch NON-ajax browser
        	        }//catch IE 5.5+
	        }//catch IE browser

        	return xmlHttp;
	}//getAJAXObject()


	function AJAXWrapper( url, target_script )
	/*
		AJAXWrapper()
              	This is the wrapper function for all of our AJAX needs
              	url = the URL of the PHP script doing the AJAX work
		target_script = the name of the javascript function we use to display the output on the given page
        */
        {
                //create the AJAX object based on browser type and version
                request = getAJAXObject();

                if ( request == null )
                {
                        alert ( "Your browser does not support AJAX!" );
                        return;
                }//if browser doesn't support AJAX

		//We need to add a random number to the end of the URL as a cache-buster to keep IE happy
		var randomnumber = Math.random() * 101; 
		url += "&rando=" + randomnumber;
		
                //send request out
                //alert(url);
                request.open( "GET", url, true );
                request.onreadystatechange = eval( target_script ); 
                request.send( null );
        }//AJAXWrapper()

