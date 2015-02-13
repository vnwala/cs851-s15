
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
            location.href = "/freejoin/thankyou.html";
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
    params["url"]    = "/freejoin/postfreemail.php";
    params["qt"]     = "email=" + document.getElementById('email').value
                     + "&c="  + document.getElementById('c').value
                     + "&goto=http://www.10musume.com" + location.pathname;

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
    document.getElementById('imgcapt').src = "/freejoin/captcha.php?" + Math.random();
}

/*
function formFreeJoin( )
{
    document.write('<h5>D2Pass��������ϥ����󤷤Ƥ�������</h5>');
    document.write('<p class="btn"><input class="sender2" type="button" value="����Ͽ�Ѥߤ����Ϥ����餫�������" onclick="javascript:{location.href=\'/member/login.php\'}"/></p>');
    document.write('<h5>D2Pass��ID�򤪻����Ǥʤ����ϲ������̵����Ͽ���Ƥ�������</h5>');
    document.write('<form  method="get" action="">');
    document.write('<p>�᡼�륢�ɥ쥹: ');
    document.write('<input id="email" class="fielder" width="360" type="text" name="q" maxlength="100" value="�᡼�륢�ɥ쥹��������������" ');
    document.write(' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }"/><br>');
    document.write('<span class="sm">�����������ѤΥ᡼�륢�ɥ쥹�Ϥ���Ͽ���������ޤ���</span></p>');
    document.write('<p>�᡼�륢�ɥ쥹<span>�Ƴ�ǧ</span>: ');
    document.write('<input id="email2" class="fielder" width="360" type="text" name="q" maxlength="100" value="���Ʊ���᡼�륢�ɥ쥹������������"');
    document.write(' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }" /><br>');
    document.write('<span class="sm">���������Ȥ���ǧ�᡼������ꤷ�ޤ��Τ�Ϣ���ǽ�ʥ᡼�륢�ɥ쥹�����ϲ�������</span></p>');
    document.write('<p>����ץ������: ');
    document.write('<img id="imgcapt" src="/freejoin/captcha.php">&nbsp;<a href="javascript:refresh_capt()">�����򹹿�����</a><br>');
    document.write('<input id="c" class="fielder" width="360" type="text" name="q" maxlength="100" value="����ץ��������ʸ�������Ϥ��Ʋ�������"' );
    document.write(' onfocus="javascript:{ if (this.value == this.defaultValue) { this.value = \'\';} }" style="margin-top:5px;"/></p>');
    document.write('<div id="form_error"></div>');
    document.write('<p class="btn"><input class="sender" type="button" value="��Ͽ����" onclick="postFreeJoin(this)"/></p>');
    document.write('<p class="clese"><input type="button" name="cancel" value="Cancel" onClick="closebox()"></p>');
    document.write('</form>');
}
*/

function formFreeJoin( )
{
    document.write('<h5>D2Pass��������ϥ����󤷤Ƥ������� </h5>');
    document.write('<p class="btn"><input class="sender2" type="button" value="����Ͽ�Ѥߤ����Ϥ����餫�������" onclick="javascript:{location.href=\'/member/login.php?url='+document.URL+'\'}"/></p>');
    document.write('<h5>D2Pass��ID�򤪻����Ǥʤ����ϲ������̵����Ͽ���Ƥ�������</h5>');
    document.write('<p class="btn"><input class="sender2" type="button" value="D2Pass��̵����Ͽ�Ϥ����餫��" onclick="javascript:{location.href=\'https://secure.d2pass.com/shooter?package_id=20021337&from_site_id=20001557&source_page=1\'}"/></p>');
}
