
var mesWi72="������å����ơ��оݤ�ե��������¸�ɤ�����ǲ�������";
var mesWi73="�ޤ���˥����󤷤Ƥ�������";
var mesWi74="����ư����İ����ˤϥݥ���Ȥ�Ȥäƹ�������ɬ�פ�����ޤ���\n" +
            "�ݥ���Ȥ���Ѥ���ˤϡإݥ���Ȥ�Ȥ��٥ܥ���򥯥�å����Ƥ���������";

var mesWi75="��ӥ塼��񤯤ˤ�ư����������ɬ�פ�����ޤ�";

var netiA = getCookie("NetiA");

if (document.all || document.getElementById || document.layers) 
{
    if (document.layers) document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown=moDownWi72;
}

function is_defined( v )
{
    return ( v != "undefined" );
}

function moDownWi72(e) 
{
    if(document.all) 
    {
        var na=event.srcElement.name;
    } 
    else if(document.getElementById || document.layers) 
    {
        var na=e.target.name;
    }
    
    if( na == "rightClick" || na == "leftClick" || na == "reviewClick" )
    {
        if( !netiA )
        {
            alert(mesWi73);
            return false;
        }
       
        is_point_movie = is_defined( typeof window.is_point_movie ) ? window.is_point_movie : 0;
        activeMovie    = is_defined( typeof window.activeMovie ) ? window.activeMovie : 0;
        point_remain   = is_defined( typeof window.point_remain ) ? window.point_remain : 0;
        
        if( is_point_movie == 1 && activeMovie == 0 )
        {
            if( na == "reviewClick" )
                alert(mesWi75);
            else
                alert(mesWi74); 

            return false;
        }
    }

        
    if( na == "rightClick" ) 
    {
        if( navigator.appName == "Microsoft Internet Explorer" && 
           (event.button==1 || event.button==3) || navigator.appName=="Netscape" && e.which==1 ) 
        {
            alert(mesWi72);
            return false;
        }
 

    } 

    return true;
}


function show_purchase_popup( point, movie_id )
{
    new $pop( '���� ' + point + ' pt <br>�ݥ���Ȥ�Ȥ��ޤ�����', { type: 'confirm', title: '', YES: function(){purchase_point(movie_id);},NO: function(){alert('��������ߤ��ޤ���');} } );
}

