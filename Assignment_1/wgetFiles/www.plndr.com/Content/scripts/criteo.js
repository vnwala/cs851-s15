function home_criteo(customerid) {
  var criteo_q = window.criteo_q || [];
  criteo_q.push(
    { event: "setAccount", account: [11110, 11111, 11112, 11114, 11115] },
    { event: "setCustomerId", id: customerid },
    { event: "setSiteType", type: getDevice() },
    { event: "viewHome" });
}

function product_browse_criteo(customerid, products, keywords) {
  var criteo_q = window.criteo_q || [];
  criteo_q.push(
    { event: "setAccount", account: [11110, 11111, 11112, 11114, 11115] },
    { event: "setCustomerId", id: customerid },
    { event: "setSiteType", type: getDevice() },
    { event: "viewList", product: products, keywords: keywords });
}

function product_details_criteo(customerid, productid) {
  var criteo_q = window.criteo_q || [];
  criteo_q.push(
    { event: "setAccount", account: [11110, 11111, 11112, 11114, 11115] },
    { event: "setCustomerId", id: customerid },
    { event: "setSiteType", type: getDevice() },
    { event: "viewItem", product: productid });
}

function carttracking_criteo(customerid, products) {
  var criteo_q = window.criteo_q || [];
  criteo_q.push(
    { event: "setAccount", account: [11110, 11111, 11112, 11114, 11115] },
    { event: "setCustomerId", id: customerid },
    { event: "setSiteType", type: getDevice() },
    { event: "viewBasket", product: products });
}

function ordertracking_criteo(customerid, products, transactionid, newcustomer) {
  var criteo_q = window.criteo_q || [];
  criteo_q.push(
    { event: "setAccount", account: [11110, 11111, 11112, 11114, 11115] },
    { event: "setCustomerId", id: customerid },
    { event: "setSiteType", type: getDevice() },
    {event: "trackTransaction" , id: transactionid, new_customer: newcustomer, product:products });
}

function getDevice() {
  if (/(android|bb\d+|meego).+mobile|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
    return "m";
  } else if (/android|tablet|kindle|ipad|playbook/i.test(navigator.userAgent.toLowerCase())) {
    return "t";
  } else {
    return "d";
  }
}