point_purchase = function( )
{
    this.xmlHttpReq = false;
}

point_purchase.prototype.http_post = function( path, query_string, callback )
{

    httpReady = 0;

    var strURI = path + "?" + query_string, self = this;

    // Mozilla/Safari
    if (window.XMLHttpRequest) 
    {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) 
    {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    self.xmlHttpReq.open('POST', strURI, true);

    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    self.xmlHttpReq.onreadystatechange = function() 
　　{
        if (self.xmlHttpReq.readyState == 4) 
        {
            //alert(self.xmlHttpReq.responseText);
            httpReady = 1;
            return callback(self.xmlHttpReq.responseText);
             
        }
    }

    self.xmlHttpReq.send(strURI);

}

point_purchase.prototype.read_response = function( response )
{
   var success = (response.split(":"))[0];
   var error   = (response.split(":"))[1];
  

   if( 1 != parseInt(success) )
   {
       alert( error );
       return;
   }

   //alert("更新されました");

   window.location.reload();
}

function purchase_point( id )
{
   var path     = "/member/app/ppv/point_purchase/";
   var query    = "id=" + id;
   var purchase = new point_purchase( );

   purchase.http_post( path, query, purchase.read_response );

}


