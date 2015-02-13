/*
	NAME:	
		$Id: menu.js,v 1.6 2013/02/15 16:19:37 bschlicht Exp $
	
	FUNCTION:
		Javascript to get user's browser information, as well
			  as all the scripts relevant to creating DHTML popOvers
*/


//this object provides information about user's browser
var BrowserDetect = 
{
	init: function () 
	{
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion)	|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) 
	{
		for (var i=0;i<data.length;i++) 
		{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) 
			{
				if (dataString.indexOf(data[i].subString) != -1) { return data[i].identity; }
			}
			else if (dataProp) { return data[i].identity; }
		}
	},
	searchVersion: function (dataString) 
	{
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) { return; }
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: 
	[
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{	// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{	// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : 
	[
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};//BrowserDetect


//always run these on page load
BrowserDetect.init();
if (BrowserDetect.browser == 'Explorer' ) { browserOffsetRight = 0; }
else { browserOffsetRight = 4; }

document.getElementById('popOverbrowse').style.height = 0;
document.getElementById('popOverbrowse').style.width = 0;
document.getElementById('popOverbrowse').style.visibility = "hidden";
document.getElementById('popOverbrowseTable').style.visibility = "hidden";
document.getElementById('popOvergames').style.height = 0;
document.getElementById('popOvergames').style.width = 0;
document.getElementById('popOvergames').style.visibility = "hidden";
document.getElementById('popOvergamesTable').style.visibility = "hidden";

var globalID = '';
var globalHeight = '';
var keepVisible = '';


//handles onmouseover for corresponding image and makes popover div visible
function slideElementIn(imgID, direction)
{
	//let's make sure the autosearch results div is hidden so not to appear on top of the browse popover
	//document.getElementById( "results" ).style.visibility = "hidden";
	//document.getElementById( "results" ).style.border = "0px";
	//document.getElementById( "results" ).innerHTML = '';
	//document.getElementById( "results" ).style.visibility = "hidden";
	//document.getElementById( "results" ).style.border = "0px";
	document.getElementById( "search" ).blur();

	//dial down z-index for the "Buy Previously Viewed" or "Buy New" buttons to keep them underneath the browse popover
	if ( document.getElementById( "buy_used_button" ) != null )
	{
		document.getElementById( "buy_used_button" ).style.zIndex = "-1";
	}//if a used buy button
	else if ( document.getElementById( "buy_new_button" ) != null )
	{
		document.getElementById( "buy_new_button" ).style.zIndex = "-1";
	}//if a new buy button

	//set values
	if ( imgID == 'browse' )
	{
		popupWidth = 500;
		globalHeight = 400;
	}
	else if ( imgID == 'games' )
	{	
		popupWidth = 120;
		globalHeight = 235;
	}
	globalID = imgID;
	divID = "popOver" + imgID;
	tableID = divID + "Table";

	//get positioning information for div
	myObject = document.getElementById(imgID);
	imgWidth = document.getElementById(imgID).width;
	imgHeight = document.getElementById(imgID).height;
	xPos = getAbsX(myObject);
	yPos = getAbsY(myObject);

	//turn on image mouseover
	if ( imgID == 'games' ) 
	{
		buttonOn('games', 'btn-video-games-on.jpg');
	}
	else if ( imgID == 'browse' ) 
	{
		buttonOn('browse', 'btn-browse-dvd-on.jpg');
	}
	//turnOn(imgID);
	document.getElementById('searchPulldown').style.visibility = "hidden";						 //%%% Display pulldown (IE 6 bug)
	 
	if (direction == 'l' )
	{
		//position div correctly
		finalPos = xPos + 1;
		document.getElementById(divID).style.left = finalPos;
		document.getElementById(divID).style.top = imgHeight + yPos;
		document.getElementById(divID).style.width = popupWidth;
		//document.getElementById(divID).style.height = 0;							 //%%% FOR ANIMATION

		//show div but hide contents
		document.getElementById(divID).style.visibility = "visible";
		//document.getElementById(tableID).style.visibility = "hidden";			//%%% FOR ANIMATION
		document.getElementById(tableID).style.visibility = "visible";			 //%%% FOR NON-ANIMATION

		//set height to 0 and begin slide animation
		//document.getElementById(divID).style.height = 0;							 //%%% FOR ANIMATION
		//increaseHeight();																	  //%%% FOR ANIMATION
		document.getElementById(divID).style.height = 'auto';				 //%%% FOR NON-ANIMATION
	}//if left align
	else if ( direction == 'r' )
	{
		//position div correctly
		finalPos = xPos + imgWidth - popupWidth - 1 - browserOffsetRight;
		//alert (xPos + '+' + imgWidth + '-' + popupWidth + '-' + browserOffsetRight);
		//alert(imgHeight + '+' + yPos);
		document.getElementById(divID).style.left = finalPos;
		document.getElementById(divID).style.top = imgHeight + yPos;
		document.getElementById(divID).style.width = popupWidth;
		//document.getElementById(divID).style.height = 0;							 //%%% FOR ANIMATION

		//show div but hide contents
		document.getElementById(divID).style.visibility = "visible";
		//document.getElementById(tableID).style.visibility = "hidden";			//%%% FOR ANIMATION
		document.getElementById(tableID).style.visibility = "visible";			 //%%% FOR NON-ANIMATION

		//set height to 0 and begin slide animation
		//document.getElementById(divID).style.height = 0;							 //%%% FOR ANIMATION
		//increaseHeight();																	  //%%% FOR ANIMATION
		document.getElementById(divID).style.height = 'auto';				 //%%% FOR NON-ANIMATION
	}//else if right align
}//slideElementIn()


//handles onmouseout for corresponding image and makes popover div hidden
function slideElementOut(imgID)
{
	//set values
	keepVisible = false;
	globalID = imgID;
	divID = "popOver" + imgID;
	tableID = divID + "Table";

	//dial down z-index for the "Buy Previously Viewed" or "Buy New" buttons to keep them underneath the browse popover
   if ( document.getElementById( "buy_used_button" ) != null )
   {
      document.getElementById( "buy_used_button" ).style.zIndex = "";
   }//if a used buy button
   else if ( document.getElementById( "buy_new_button" ) != null )
   {
      document.getElementById( "buy_new_button" ).style.zIndex = "";
   }//if a new buy button


	//get current height
	current = parseInt(document.getElementById(divID).style.height,10);

	//if ( current == globalHeight ) { setTimeout('decreaseHeight();',500); }		 //%%% FOR ANIMATION
	//else { decreaseHeight(); }																	 //%%% FOR ANIMATION
		  
	if ( imgID == 'games' ) 
	{
		buttonOn('games', 'btn-video-games-off.jpg');
	}
	else if ( imgID == 'browse' ) 
	{
		buttonOn('browse', 'btn-browse-dvd-off.jpg');
	}

	//turnOff(imgID);																					//%%% FOR NON-ANIMATION
	document.getElementById(divID).style.height = 0;										  //%%% FOR NON-ANIMATION
	document.getElementById(divID).style.visibility = "hidden";							//%%% FOR NON-ANIMATION
	document.getElementById(tableID).style.visibility = "hidden";						 //%%% FOR NON-ANIMATION
	document.getElementById('searchPulldown').style.visibility = "visible";			//%%% Display pulldown (IE 6 bug)

	//now lets make sure the autosearch results come back
	//if there's nothing in there yet, this won't matter/hurt
	//document.getElementById( "results" ).style.visibility = "visible";
	//document.getElementById( "results" ).style.border = "1px solid #888";
}//slideElementOut()


//makes sure popover div stays visible and at correct height
function showElement(imgID)
{
	//document.getElementById( "results" ).style.visibility = "hidden";
	//document.getElementById( "results" ).style.border = "0px";	

	//set values
	if ( imgID == 'browse' )
	{
		popupWidth = 400;
		myHeight = 400;
	}
	else if ( imgID == 'games' )
	{
		popupWidth = 120;
		myHeight = 235;
	}
	divID = "popOver" + imgID;
	tableID = divID + "Table";

	//turn on image mouseover, keep div and table visible
	//turn on image mouseover
	if ( imgID == 'games' ) 
	{
		buttonOn('games', 'btn-video-games-on.jpg');
	}
	else if ( imgID == 'browse' ) 
	{
		buttonOn('browse', 'btn-browse-dvd-on.jpg');
	}

	//turnOn(imgID);
	keepVisible = true;
	document.getElementById(divID).style.visibility = "visible";
	document.getElementById(divID).style.height = 'auto';
	document.getElementById(tableID).style.visibility = "visible";
	document.getElementById('searchPulldown').style.visibility = "hidden";
}//showElement()


//gradually increases height of element
function increaseHeight()
{
	//set values
	divID = "popOver" + globalID;
	tableID = divID + 'Table';
	step = 30;

	//get current height of div
	current = parseInt(document.getElementById(divID).style.height,10);

	if (current < globalHeight - step )
	{
		//increase height by step, rerun function
		increaseVal = current + step;
		document.getElementById(divID).style.height = increaseVal;
		setTimeout("increaseHeight()",1);
	}//if not at correct height yet
	else
	{
		//set to max height, make everything visible
		document.getElementById(divID).style.height = globalHeight;
		document.getElementById(divID).style.visibility = "visible";
		document.getElementById(tableID).style.visibility = "visible";
	}//else if at correct height
}//increaseHeight()


//gradually decreases height of element
function decreaseHeight()
{
	//set values
	divID = "popOver" + globalID;
	tableID = divID + "Table";
	step = 30;

	if ( keepVisible != true )
	{
		//get current height of div
		current = parseInt(document.getElementById(divID).style.height,10);

		if (current > 0 + step )
		{
			//increase height by step
			decreaseVal = current - step;
			document.getElementById(divID).style.height = decreaseVal;
			setTimeout("decreaseHeight()",1);
		}//if not at correct height yet
		else
		{
			//turn off image mouseover, hide div
			turnOff(globalID);
			document.getElementById(divID).style.height = 0;
			document.getElementById(divID).style.visibility = "hidden";
			document.getElementById(tableID).style.visibility = "hidden";
		}//else if at correct height
	}//if keepVisible false
}//decreaseHeight()


//gets horizontal/vertical offsets from left/top
function getAbsPos(elt,which)
{
	iPos = 0;
	while (elt != null)
	{
		iPos += elt["offset" + which];
		elt = elt.offsetParent;
	}
	return iPos;
}//getAbsPos()


//gets horizontal offset from left
function getAbsX(elt)
{
	//alert(elt);
	return (elt.x) ? elt.x : getAbsPos(elt,"Left");
}//getAbsX()


//gets vertical offset from top
function getAbsY(elt)
{
	return (elt.y) ? elt.y : getAbsPos(elt,"Top");
}//getAbsY()
