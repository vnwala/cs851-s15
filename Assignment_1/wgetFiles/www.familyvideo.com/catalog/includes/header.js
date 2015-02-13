/*
  $Id: header.js,v 1.3 2008/10/31 17:38:00 bschlicht Exp $

*/


/**********************************************************

  FILE: /catalog/includes/header.js
  
  FUNCTION:
    JS needed to submit search for correctly from the redesinged
    header. Sets hidden variables (title, person) with the keywords
    entered.

  MODIFICATION HISTORY:
    Date        Author        NOTES
    =======     =========     ====================
    07/21/2004  lg            Creation
    12/17/2004	lg		Dale Earnhardt hack added	  
    04/06/2006	bs		added "games" to whatType conditional
    04/12/2006	bs		added "movies" to whatType conditional, changed "title" to "all"


**********************************************************/


// preload images for header, 3/08 version
function MM_preloadImages() { //v3.0
    var d = document;
    if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
        for (i=0; i<a.length; i++)
        if (a[i].indexOf("#") != 0) {
            d.MM_p[j] = new Image;
            d.MM_p[j++].src = a[i];
        }
    }
}

// image swap for v3 header
// x = image name
// y = image file (unpathed)
function buttonOn(x,y) {
	var rh3path = '/catalog/images/rh3/header/';
	document.images[x].src = rh3path + y;
}
function buttonOff(x,y) {
	var rh3path = '/catalog/images/rh3/header/';
	document.images[x].src = rh3path + y;
}

// cart button (three elements) swasy v3 header
// no params necessary; hard-coded
function buttonCartOn() {
	var rh3path = '/catalog/images/rh3/header/';
	document.images['btn-cart-left'].src = rh3path + 'btn-cart-left-on.jpg';
	document.images['btn-cart-edge'].src = rh3path + 'btn-cart-edge-on.jpg';
	var myBackground = rh3path + "btn-cart-background-on.jpg";
	document.getElementById('btnCartBackground').style.background  = "url('/catalog/images/rh3/header/btn-cart-background-on.jpg')"; 

}
function buttonCartOff() {
	var rh3path = '/catalog/images/rh3/header/';
	document.images['btn-cart-left'].src = rh3path + 'btn-cart-left-off.jpg';
	document.images['btn-cart-edge'].src = rh3path + 'btn-cart-edge-off.jpg';
	document.getElementById('btnCartBackground').style.background  = "url('/catalog/images/rh3/header/btn-cart-background-off.jpg')"; 
}

  // hard code variables for image swap
  var path = "/catalog/images/rh/";
  var ext = ".gif";

  // swap images;
  // pass up image name sans "_on/off.gif" or path (x)

    function turnOn (x) {
      document.images[x].src = path + x + "_on" + ext;

    } // end turnOn ()
    function turnOff(x) {
      document.images[x].src = path + x + "_off" + ext;
    }


    // Function to submit form - assign keywords to correct (title or person)
    // hidden variable and then send to results page
    function submitMe() {
      var myForm = document.rhSearch;
      var myText = myForm.whatText.value;
      // delete leading, then trailing, white-space
      myText = myText.replace(/^\s+/, '');
      myText = myText.replace(/\s+$/, '');

      var searchType = myForm.whatType[myForm.whatType.selectedIndex].value;

	// hack for dale earnhardt movie ("3")
	if (myText == "3" && searchType == "title") {
		myText = "Dale Earnhardt";
	}
	
      // only do a submit if text is entered
      if (myText.length > 1) {
        if (searchType == "all" || searchType == "games" || searchType == "movies" || searchType == "accessories" ) {
          myForm.title.value = myText;
          myForm.person.value = "";
        }
        if (searchType == "person") {
          myForm.person.value = myText;
          myForm.title.value = "";
        }
        myForm.submit();
        return true;
      }
      else {
        myForm.whatText.value = "";
        myForm.whatText.focus(); // put focus on text box
        alert ("Please enter some text to search for");
        return false;
      }
    } // end submitMe()


