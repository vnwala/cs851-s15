var utag_data;

function tealium_mainscript(srclocation) {
  (function (a, b, c, d) {
    a = srclocation;
    b = document;
    c = 'script';
    d = b.createElement(c);
    d.src = a;
    d.type = 'text/java' + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
  })();
}

function tealium_pagetracking(dataPost, pageName, pageType) {
  var loggedInUser = $.cookie('eid');
  var cartQuantity = $.cookie('klCartQ');
  if (cartQuantity == null) {
    cartQuantity = "0";
  }
  utag_data = {
    site_region: "usa",
    site_currency: "USD",
    language_code: "en",
    js_file_version: "1.0",
    country_code: "us",
    currency_code: "USD",
    num_items_in_cart: cartQuantity,
    visitor_id: loggedInUser,
    page_name: pageName,
    page_type: pageType
  };
  $.each(dataPost, function (key, value) {
    utag_data[key]= value;
  });
}