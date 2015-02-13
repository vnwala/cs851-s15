var tarayici= navigator.appName;

function responseWeather(response)
{
		var delimiter = { 0: '' };
		delimiter   = response.split(";");				
		
		current_temp_c		 = delimiter[0];
		tomorrow_temp_low_c  = delimiter[1];
		tomorrow_temp_high_c = delimiter[2];
		
		document.getElementById('weather1').innerHTML = current_temp_c + '&deg; ';
		document.getElementById('weather2').innerHTML = tomorrow_temp_high_c + '&deg; ' + tomorrow_temp_low_c + '&deg;';
}

function showimage() 
{
	src_list = document.havaform.il;
	i = src_list.selectedIndex;
	document.images.preview1.src = '/cjs/weather_images/' + src_list.options[i].value + '_curr.gif';
	document.images.preview2.src = '/cjs/weather_images/' + src_list.options[i].value + '_tomorrow.gif';
	xmlhttpPost('/templates/include/weather_info.php?il='+src_list.options[i].value,'responseWeather');
}

function getSelectedValue( frmName, srcListName ) 
{
	var form = eval( 'document.' + frmName );
	var srcList = eval( 'form.' + srcListName );
	i = srcList.selectedIndex;
	if (i != null && i > -1) {
		return srcList.options[i].value;
	}
	else {
		return null;
	}
}

function MM_swapImgRestore() { //v3.0

  var i,x,a=document.MM_sr; 
  
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) 
  
  x.src=x.oSrc;
  
}

function MM_preloadImages() { //v3.0
  var d=document; 
  
  if(d.images)
  { 
  	if(!d.MM_p) 
  	
  	d.MM_p=new Array();
  	
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; 
	
	for(i=0; i<a.length; i++)
	
	if (a[i].indexOf("#")!=0)
	{ 
	
	d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];
	
	}
    }
}

function MM_findObj(n, d) { //v4.01

  var p,i,x;  
  
  if(!d) 
  
  d=document; 
  
  if((p=n.indexOf("?"))>0&&parent.frames.length) 
  {
  
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
    
  }
    
  if(!(x=d[n])&&d.all) x=d.all[n]; 
  
  for (i=0;!x&&i<d.forms.length;i++) 
  
  x=d.forms[i][n];
  
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) 
  
  x=MM_findObj(n,d.layers[i].document);
  
  if(!x && d.getElementById) 
  
  x=d.getElementById(n); 
  
  return x;
}

function MM_swapImage() { //v3.0

  var i,j=0,x,a=MM_swapImage.arguments; 
  
  document.MM_sr=new Array; 
  
  for(i=0;i<(a.length-2);i+=3)
  
   if ((x=MM_findObj(a[i]))!=null)
   {
   
	document.MM_sr[j++]=x; 
	
	if(!x.oSrc) 
	
	x.oSrc=x.src; 
	x.src=a[i+2];
   
   }
}

var popUpWin=0;

function mClick(URLStr,sayfaname,left,top,width,height)
{
	var lleft = (screen.width/2)-(width/2);
	var ltop = (screen.height/2)-(height/2);
	
	if(popUpWin)
	{
	  	var tarayici= navigator.appName;
	
	    if(!popUpWin.closed)
	    {	
			if (tarayici=="Netscape") 
				popUpWin.close();
			if (tarayici=="Microsoft Internet Explorer") 
				popUpWin.Close();	
	    }
     
	}
	popUpWin = open(URLStr, sayfaname,'scrollbars=yes,width='+width+',height='+height+',left='+lleft+', top='+ltop+',screenX='+left+',screenY='+top);
}

function findPosX(obj)
{
    var curleft = 0;
    
    if(obj.offsetParent)
    
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
        
    else if(obj.x)
        curleft += obj.x;
        
    return curleft;
}


function findPosY(obj)
{
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
}


function Hand(src)
{ 	
	if (tarayici=="Netscape") 
		src.style.cursor="pointer";
	if (tarayici=="Microsoft Internet Explorer") 
		src.style.cursor="hand";
}

function menubarOvr(src)
{ 	
	src.className="MenuBarOver";				
	Hand(src);
}

function menubarOut(src)
{ 	
	src.className = "MenuBar";
}

function textCounter(field,cntfield,maxlimit) 
{
 if (field.value.length > maxlimit)
  field.value = field.value.substring(0, maxlimit);
 else
  cntfield.value = maxlimit - field.value.length;
 if (field.value.length == 0)
 cntfield.value = ""; 
}
/*****************************  XmlHttpRequest  *****************************

Author:	        Luke Breuer, labreuer+xmlhttprequest@gmail.com
Created:        4/19/05
Modified:       11/14/06
Documentation:  http://luke.breuer.com/xmlhttprequest.aspx
*/

function xmlhttpPost(strURL, func_name) 
{
	var xmlHttpReq = false;
	// Mozilla/Safari
	if (window.XMLHttpRequest) 
	{
	
	xmlHttpReq = new XMLHttpRequest();
	
	if (xmlHttpReq.overrideMimeType) 
	{
		xmlHttpReq.overrideMimeType('text/xml');
		// See note below about this line
	}
	// IE
	} else if (window.ActiveXObject) { // IE
	
		try {
			
			xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
		
		} catch (e) {
		
			try {
				
				xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			
			} catch (e) {}
		
		}
	}
	
	if (!xmlHttpReq) 
	{			
		return false;
	}   
	
	xmlHttpReq.open('GET', strURL, true);
	
	xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');        
	
	xmlHttpReq.onreadystatechange = function() 
	{ 
		callBackFunction(xmlHttpReq, func_name); 
	};
	
	xmlHttpReq.send("");
}
		
function callBackFunction(http_request, func_name) 
{
	if (http_request.readyState == 4) 
	{	
		if (http_request.status == 200) 
		{							
			eval(func_name+"(http_request.responseText)");                                               
			
		}		
	}
}
	
