__RequestSend__ = function( params )
{

    var __r__ = null;

    if (window.XMLHttpRequest)
    {
        __r__ = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        __r__ = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if( __r__ ) 
    {
        __r__.onreadystatechange = 
        function()
        { 
            params.callback( this, params.btn );
        };

        __r__.open( params.method, params.url, true );
        __r__.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        if( typeof( params.qt ) != "undefined" && params.qt != null )
        {
            __r__.send( params.qt );   
        }
        else
        {
            __r__.send(null);
        }

    }
}

function handleLoading(XHRobj, btn) 
{
    if( XHRobj.readyState == 4  && XHRobj.responseText.length > 0 ) 
    {
        if( parseInt( XHRobj.responseText ) == 1 )
        {
            location.href = "/freejoin_thankyou.html";
        }
        else
        {
            btn.disabled = false;
            btn.style.opacity = 1;
            btn.style.filter = "alpha(opacity=100)";
//            alert( XHRobj.responseText );
            document.getElementById('form_error').innerHTML = XHRobj.responseText;
            refresh_capt();
        }
    }
}

function postFreeJoin( btn )
{
    if( document.getElementById('email').value.length == 0 ||
        document.getElementById('email').value !=
        document.getElementById('email2').value )
    {
//        alert("�������ť᡼������Ϥ��Ƥ�������"); return;
        document.getElementById('form_error').innerHTML
        = "�������ť᡼������Ϥ��Ƥ�������"; 
        return;
    }

    params = new Object( );
    params["method"] = "POST";
    params["url"]    = "/postfreemail.php";
    params["qt"]     = "email=" + document.getElementById('email').value
                     + "&c="  + document.getElementById('c').value
                     + "&goto=http://www.muramura.tv" + location.pathname;

    params["callback"]  = handleLoading;
    params["btn"] = btn;

    btn.disabled = true;
    btn.style.opacity = 0.3;
    btn.style.filter = "alpha(opacity=30)";

    document.getElementById('form_error').innerHTML = "";

    __RequestSend__( params );

//    alert( document.getElementById('email').value ); 
}

function refresh_capt()
{
    document.getElementById('imgcapt').src = "/captcha.php?" + Math.random();
}

function formFreeJoin( )
{
    document.write('<link href="/css/freejoin.css" rel="stylesheet" type="text/css">');
    document.write('<div id="trial-player">');
    document.write('<form  method="get" action="">');
    document.write('<table width="400" border="0" cellspacing="0" cellpadding="0">');
    document.write('<tr><th colspan="3">D2pass��̵���������Ͽ���ƥ���ץ�ư���ڤ��⤦��<span>');
    document.write('����Ͽ����ޤ��ȡ�����ץ�ư�褬�����ꡪ���ˤ����ʾ���⤴�Ҳ𤷤Ƥ���ޤ���</span></th></tr>');
    document.write('<!--<tr><td colspan="3"><a href="#">������/̵�������Ͽ</a></td></tr>-->');
    document.write('<tr class="odd">');
    document.write('<td width="100">�᡼�륢�ɥ쥹</td>');
    document.write('<td><input id="email" class="fielder" width="280" type="text" name="q" maxlength="100" value="�᡼�륢�ɥ쥹��������������" ');
    document.write(' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }"/></td>');
    document.write('<td class="sm">�����������ѤΥ᡼�륢�ɥ쥹��<br />����Ͽ���������ޤ���<br /></td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td width="100">�᡼�륢�ɥ쥹<span>�Ƴ�ǧ</span></td>');
    document.write('<td><input id="email2" class="fielder" width="280" type="text" name="q" maxlength="100" value="���Ʊ���᡼�륢�ɥ쥹������������"');
    document.write(' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }" /></td>');
    document.write('<td class="sm">���������Ȥ���ǧ�᡼������ꤷ�ޤ��Τ�Ϣ���ǽ�ʥ᡼�륢�ɥ쥹�����ϲ�������</td>');
    document.write('</tr>');
    document.write('<tr class="odd">');
    document.write('<td>����ץ������</td>');
    document.write('<td colspan="2"><img id="imgcapt" src="/captcha.php">&nbsp;<a href="javascript:refresh_capt()">�����򹹿�����</a></td>');
    document.write('<td>&nbsp;</td>');
    document.write('</tr>');
    document.write('<tr><td width="100"><td>');
    document.write('<input id="c" class="fielder" width="280" type="text" name="q" maxlength="100" value="����ץ��������ʸ�������Ϥ��Ʋ�������"' );
    document.write(' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }"/></td><td></td>');
    document.write('<tr><td colspan=3><font color=red><b><div id="form_error"></div></b></font></td></tr>');
    document.write('<tr>');
    document.write('<td colspan="3"><input class="sender" type="button" value="��Ͽ����" onclick="postFreeJoin(this)"/>');
    document.write('<input class="sender2" type="button" value="����Ͽ�Ѥߤ����Ϥ����餫�������" onclick="javascript:{location.href=\'/login/login.php?url='+document.URL+'\'}"/></td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</form>');
//    document.write('<img src="/images/freejoin.jpg" width="716" height="20" class="barbar" />');
    document.write('</div>');
}
