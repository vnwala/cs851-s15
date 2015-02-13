//
//-------------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (c) Copyright IBM Corp. 2006
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//-------------------------------------------------------------------
//

var busy = false;
//
// ***
// * This javascript function is used by the 'Add to Shopcart' button.  Since the HTML form is shared by both 'Add to Shopcart' and 'Add to Wish List' button,
// * appropriate values are set using this javascript before the form is submitted.
// * The variable 'busy' is used to avoid submitting the same forms multiple times when users click the button more than once.
// ***
//

function Add2ShopCart(form)
{
var display;
for(var i=0; i<form.elements.length;i++)
display=display+ ">>"+ form.elements[i].name + " = "+form.elements[i].value;

//alert(display);

       if (!busy) {
              busy = true;
              form.action="OrderItemAdd";
              form.URL.value='OrderCalculate?URL=OrderItemDisplay';
              form.submit();
       }
}
function Add2ShopCart(form, action)
{
var display;
for(var i=0; i<form.elements.length;i++)
display=display+ ">>"+ form.elements[i].name + " = "+form.elements[i].value;

//alert(display);

       if (!busy) {
              busy = true;
              form.action = action;
              form.URL.value='OrderCalculate?URL=OrderItemDisplay';
              //alert('form.URL.value: '+form.URL.value);
              form.submit();
       }
}
// This javascript function is used by the 'Add to Wish List' button to set appropriate values before the form is submitted
function Add2WishList(form)
{
       if (!busy) {
              busy = true;
              form.action="InterestItemAdd"
              form.URL.value='InterestItemDisplay'
              form.submit()
       }
}
