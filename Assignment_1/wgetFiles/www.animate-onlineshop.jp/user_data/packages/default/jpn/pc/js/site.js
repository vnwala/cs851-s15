/*
 * This file is part of EC-CUBE
 *
 * Copyright(c) 2000-2007 LOCKON CO.,LTD. All Rights Reserved.
 *
 * http://www.lockon.co.jp/
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
// 親ウィンドウの存在確認.

var url = location.pathname;
var directory = url.split("/");
if(directory[2]=='html') {
    // テスト環境
    var currentDirectory = "/animate/html/";
} else if(-1 != location.hostname.indexOf("wahtcomu",0)) {
    // テスト環境
    var currentDirectory = "/animate/html/";
} else {
    // 本番環境
    var currentDirectory = "/";
}

var API_CART_DISP_REQUEST_URL = currentDirectory + 'products/cart_api.php'; //
var API_REQUEST_URL = currentDirectory + 'products/detail.php'; //
var API_REQUEST_URL2 = currentDirectory + 'products/bulk_purchase_detail.php'; //
var IMAGE_DISPLAY_URL = currentDirectory + 'resize_image.php?width=68&height=68&age_limit=0&sex_characteristic=0&image_display_restriction=0&warning_restriction=0&image='; //
var API_PRODUCT_DETAIL_URL = currentDirectory + 'pn/pd/'; //

function fnIsopener() {
    var ua = navigator.userAgent;
    if( !!window.opener ) {
        if( ua.indexOf('MSIE 4')!=-1 && ua.indexOf('Win')!=-1 ) {
            return !window.opener.closed;
        } else {
            return typeof window.opener.document == 'object';
        }
    } else {
        return false;
    }
}

// 郵便番号入力呼び出し.
function fnCallAddress(php_url, tagname1, tagname2, input1, input2) {
    zip1 = document.form1[tagname1].value;
    zip2 = document.form1[tagname2].value;

    if(zip1.length == 3 && zip2.length == 4) {
        url = php_url + "?zip1=" + zip1 + "&zip2=" + zip2 + "&input1=" + input1 + "&input2=" + input2;
        window.open(url,"nomenu","width=500,height=350,scrollbars=yes,resizable=yes,toolbar=no,location=no,directories=no,status=no");
    } else {
        alert("郵便番号を正しく入力して下さい。");
    }
}

// 郵便番号から検索した住所を渡す.
function fnPutAddress(input1, input2) {
    // 親ウィンドウの存在確認。.
    if(fnIsopener()) {
        if(document.form1['state'].value != "") {
            // 項目に値を入力する.
            state_id = document.form1['state'].value;
            town = document.form1['city'].value + document.form1['town'].value;
            window.opener.document.form1[input1].selectedIndex = state_id;
            window.opener.document.form1[input2].value = town;
        }
    } else {
        window.close();
    }
}

function fnOpenNoMenu(URL) {
    window.open(URL,"nomenu","scrollbars=yes,resizable=yes,toolbar=no,location=no,directories=no,status=no");
}

function fnOpenWindow(URL,name,width,height) {
    window.open(URL,name,"width="+width+",height="+height+",scrollbars=yes,resizable=no,toolbar=no,location=no,directories=no,status=no");
}

function fnSetFocus(name) {
    if(document.form1[name]) {
        document.form1[name].focus();
    }
}

// セレクトボックスに項目を割り当てる.
function fnSetSelect(name1, name2, val) {
    sele1 = document.form1[name1];
    sele2 = document.form1[name2];

    if(sele1 && sele2) {
        index=sele1.selectedIndex;

        // セレクトボックスのクリア
        count=sele2.options.length;
        for(i = count; i >= 0; i--) {
            sele2.options[i]=null;
        }

        // セレクトボックスに値を割り当てる。
        len = lists[index].length;
        for(i = 0; i < len; i++) {
            sele2.options[i]=new Option(lists[index][i], vals[index][i]);
            if(val != "" && vals[index][i] == val) {
                sele2.options[i].selected = true;
            }
        }
    }
}

// Enterキー入力をキャンセルする。(IEに対応)
function fnCancelEnter()
{
    if (gCssUA.indexOf("WIN") != -1 && gCssUA.indexOf("MSIE") != -1) {
        if (window.event.keyCode == 13)
        {
            return false;
        }
    }
    return true;
}

// モードとキーを指定してSUBMITを行う。
function fnModeSubmit(mode, keyname, keyid) {
    switch(mode) {
    case 'delete_category':
        if(!window.confirm('選択したカテゴリとカテゴリ内のすべてのカテゴリを削除します')){
            return false;
        }
        break;
    case 'delete':
    case 'class_delete':
        if(!window.confirm('一度削除したデータは、元に戻せません。\n削除しても宜しいですか？')){
            return false;
        }
        break;
    case 'confirm':
    case 'class_edit':
        if(!window.confirm('登録しても宜しいですか')){
            return false;
        }
        break;
    case 'delete_all':
        if(!window.confirm('検索結果をすべて削除しても宜しいですか')){
            return false;
        }
        break;
    case 'clear_inadequacy':
        if(!window.confirm('不適切報告を一括クリアします。よろしいですか？')){
            return false;
        }
        break;
    case 'cancel_download_status_1':
        if(!window.confirm('ステータスを「未処理」に変更します。\nよろしいですか？')){
            return false;
        }
        break;
    case 'cancel_download_status_0':
        if(!window.confirm('ステータスを「処理済」に変更します。\nよろしいですか？')){
            return false;
        }
        break;
    case 'yahoo_point_cancel':
        if(!window.confirm('Ｔポイントのキャンセル処理を行います。\nよろしいですか？')){
            return false;
        }
        break;
    case 'yahoo_point_decide':
        if(!window.confirm('Ｔポイントの確定処理を行います。\nよろしいですか？')){
            return false;
        }
        break;
    default:
        break;
    }
    document.form1['mode'].value = mode;
    if(keyname != "" && keyid != "") {
        document.form1[keyname].value = keyid;
    }
    document.form1.submit();
}

function fnFormModeSubmit(form, mode, keyname, keyid) {
    switch(mode) {
    case 'delete':
        if(!window.confirm('一度削除したデータは、元に戻せません。\n削除しても宜しいですか？')){
            return;
        }
        break;
    case 'confirm':
        if(!window.confirm('登録しても宜しいですか')){
            return;
        }
        break;
    case 'regist':
        if(!window.confirm('登録しても宜しいですか')){
            return;
        }
        break;
    default:
        break;
    }
    document.forms[form]['mode'].value = mode;
    if(keyname != "" && keyid != "") {
        document.forms[form][keyname].value = keyid;
    }
    document.forms[form].submit();
}

function fnSetFormSubmit(form, key, val) {
    document.forms[form][key].value = val;
    document.forms[form].submit();
    return false;
}

function fnSetFormVal(form, key, val) {
    document.forms[form][key].value = val;
}

function fnChangeAction(url) {
    document.form1.action = url;
}

// ページナビで使用する。
function fnNaviPage(pageno) {
    document.form1['pageno'].value = pageno;
    document.form1.submit();
}

function fnNaviPageProducts(pageno) {
 document.form1['pageno_products'].value = pageno;
 document.form1.submit();
}

//ページナビで使用する。(アニメイ語タグ用)
function fnNaviPageAnimeWord(pageno) {
 document.form1['pageno_anime_word'].value = pageno;
 document.form1.submit();
}

function fnSearchPageNavi(pageno) {
    document.form1['pageno'].value = pageno;
    document.form1['mode'].value = 'search';
    document.form1.submit();
    }

    function fnSubmit(){
    document.form1.submit();
}

// ポイント入力制限。
function fnCheckInputPoint() {
    if(document.form1['point_check']) {
        list = new Array(
                        'use_point'
                        );

        if(!document.form1['point_check'][1].checked) {
            color = "#dddddd";
            flag = true;
        } else {
            color = "";
            flag = false;
        }

        len = list.length;
        for(i = 0; i < len; i++) {
            if(document.form1[list[i]]) {
                document.form1[list[i]].disabled = flag;
                document.form1[list[i]].style.backgroundColor = color;
            }
        }
    }
}

// 別のお届け先入力制限。
function fnCheckInputDeliv() {
    if(!document.form1) {
        return;
    }
    if(document.form1['deliv_check']) {
        list = new Array(
                        'deliv_name01',
                        'deliv_name02',
                        'deliv_kana01',
                        'deliv_kana02',
                        'deliv_pref',
                        'deliv_zip01',
                        'deliv_zip02',
                        'deliv_addr01',
                        'deliv_addr02',
                        'deliv_tel01',
                        'deliv_tel02',
                        'deliv_tel03'
                        );

        if(!document.form1['deliv_check'].checked) {
            fnChangeDisabled(list, '#dddddd');
        } else {
            fnChangeDisabled(list, '');
        }
    }
}


// 購入時会員登録入力制限。
function fnCheckInputMember() {
    if(document.form1['member_check']) {
        list = new Array(
                        'password',
                        'password_confirm',
                        'reminder',
                        'reminder_answer'
                        );

        if(!document.form1['member_check'].checked) {
            fnChangeDisabled(list, '#dddddd');
        } else {
            fnChangeDisabled(list, '');
        }
    }
}

// 最初に設定されていた色を保存しておく。
var g_savecolor = new Array();

function fnChangeDisabled(list, color) {
    len = list.length;

    for(i = 0; i < len; i++) {
        if(document.form1[list[i]]) {
            if(color == "") {
                // 有効にする。
                document.form1[list[i]].disabled = false;
                document.form1[list[i]].style.backgroundColor = g_savecolor[list[i]];
            } else {
                // 無効にする。
                document.form1[list[i]].disabled = true;
                g_savecolor[list[i]] = document.form1[list[i]].style.backgroundColor;
                document.form1[list[i]].style.backgroundColor = color;//"#f0f0f0";
            }
        }
    }
}


// ログイン時の入力チェック
function fnCheckLogin(formname) {
    var lstitem = new Array();

    if(formname == 'login_mypage'){
    lstitem[0] = 'mypage_login_email';
    lstitem[1] = 'mypage_login_pass';
    }else{
    lstitem[0] = 'login_email';
    lstitem[1] = 'login_pass';
    }
    var max = lstitem.length;
    var errflg = false;
    var cnt = 0;

    //　必須項目のチェック
    for(cnt = 0; cnt < max; cnt++) {
        if(document.forms[formname][lstitem[cnt]].value == "") {
            errflg = true;
            break;
        }
    }

    // 必須項目が入力されていない場合
    if(errflg == true) {
        alert('メールアドレス/パスワードを入力して下さい。');
        return false;
    }
}

// 時間の計測.
function fnPassTime(){
    end_time = new Date();
    time = end_time.getTime() - start_time.getTime();
    alert((time/1000));
}
start_time = new Date();

//親ウィンドウのページを変更する.
function fnUpdateParent(url) {
    // 親ウィンドウの存在確認
    if(fnIsopener()) {
        window.opener.location.href = url;
    } else {
        window.close();
    }
}

//特定のキーをSUBMITする.
function fnKeySubmit(keyname, keyid) {
    if(keyname != "" && keyid != "") {
        document.form1[keyname].value = keyid;
    }
    document.form1.submit();
}

//文字数をカウントする。
//引数1：フォーム名称
//引数2：文字数カウント対象
//引数3：カウント結果格納対象
function fnCharCount(form,sch,cnt) {
    document.forms[form][cnt].value= document.forms[form][sch].value.length;
}


// テキストエリアのサイズを変更する.
function ChangeSize(button, TextArea, Max, Min, row_tmp){

    if(TextArea.rows <= Min){
        TextArea.rows=Max; button.value="小さくする"; row_tmp.value=Max;
    }else{
        TextArea.rows =Min; button.value="大きくする"; row_tmp.value=Min;
    }
}

//カート内容の設定
function fnSetCartPrice(newcartquantity, newcartprice, newcartproductscount, newtotaladdpoint, newcartobj) {

//    var CartPriceSetStr = newcartquantity + '/' + newcartprice;
//    alert(CartPriceSetStr);

    cartquantity_object = document.getElementById("cartquantity_header");
    if (cartquantity_object) {
    cartquantity_object.innerHTML = newcartquantity;
    }
    cartprice_object = document.getElementById("cartprice_header");
    if (cartprice_object) {
    cartprice_object.innerHTML = newcartprice;
    }

    cartquantity_object = document.getElementById("cartquantity");
    if (cartquantity_object) {
    cartquantity_object.innerHTML = newcartquantity;
    }
    cartprice_object = document.getElementById("cartprice");
    if (cartprice_object) {
    cartprice_object.innerHTML = newcartprice;
    }
    cartpoint_object = document.getElementById("cartpoint");
    if (cartpoint_object) {
      if (newtotaladdpoint) {
        cartpoint_object.innerHTML = newtotaladdpoint;
      } else {
        cartpoint_object.innerHTML = '0';
      }
    }

    cartquantityleft_object = document.getElementById("cartquantityleft");
    if (cartquantityleft_object) {
      if (newcartproductscount > 3) {
         cartquantityleft_object.innerHTML = '<span">他' + (newcartproductscount -3) + '</span>点';
      } else { cartquantityleft_object.innerHTML = ''; }
    }
    if (newcartproductscount) {
    if (newcartobj) {
      cartprice_object = document.getElementById("newcartproductscount");
      if (cartprice_object) {
        if (newcartproductscount  > 3) { newcartproductscount = 3; }
        var tmpStr1 = '';
        for(i = 0; i < newcartproductscount; i=i+1) {
            tmpStr1 = tmpStr1 +
                      '<li>' +
                      '<a href="' + API_PRODUCT_DETAIL_URL + newcartobj.CartInProducts[i] + '/" title="' + newcartobj.CartInProductsName[i] + '"><img src="' + IMAGE_DISPLAY_URL + newcartobj.CartInProductsImage[i] + '" /></a>' +
                      '<p><a href="' + API_PRODUCT_DETAIL_URL + newcartobj.CartInProducts[i] + '/" title="' + newcartobj.CartInProductsName[i] + '">' + newcartobj.CartInProductsName[i] + '</a></p>' +
                      '</li>';
        }
        cartprice_object.innerHTML = tmpStr1;
      }
    }
    }
}


//XMLHttpRequestオブジェクト生成
function AddProductCartAjax_createHttpRequest(){
    //Win ie用
    if(window.ActiveXObject){
        try {
            //MSXML2以降用
            return new ActiveXObject("Msxml2.XMLHTTP"); //[1]'
        } catch (e) {
            try {
                //旧MSXML用
                return new ActiveXObject("Microsoft.XMLHTTP"); //[1]'
            } catch (e2) {
                return null;
            }
         }
    } else if(window.XMLHttpRequest){
        //Win ie以外のXMLHttpRequestオブジェクト実装ブラウザ用
        return new XMLHttpRequest(); //[1]'
    } else {
        return null;
    }
}

function ProductCartinCallOver(oj){
    // alert(oj.responseText);

    var ResultData = eval( '(' + oj.responseText + ')' );

    // console.log(ResultData);

    fnSetCartPrice(ResultData.CartTotalCount, ResultData.CartTotalPrice, ResultData.CartTotalProductsCount, ResultData.CartTotalAddPoint, ResultData);
    document.body.style.cursor = "default";
}

//AJaxカート空読み
function DisplayCartRequest() {

    //XMLHttpRequestオブジェクト生成
    var httpoj = AddProductCartAjax_createHttpRequest();
    var Request_URL = API_CART_DISP_REQUEST_URL; //
    var SendData = 'mode=cart&ajk=2';

    // alert(Request_URL);

    //open メソッド
    httpoj.open('POST' ,Request_URL , true);
    httpoj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    //受信時に起動するイベント
    httpoj.onreadystatechange = function(){
      if (httpoj.readyState == 4 && httpoj.status == 200) {
        ProductCartinCallOver(httpoj);
      }
    };
    //send メソッド

    document.body.style.cursor = "wait";
    fnSetCartPrice(' … ', '計算中♪');
    httpoj.send(SendData);

    return false;
}


//AJaxカートイン 今のところproduct_class(category)_idには未対応
function AddProductToCartRequest(product_id, quantity, lot) {
    //XMLHttpRequestオブジェクト生成
    var httpoj = AddProductCartAjax_createHttpRequest();
    var Request_URL = API_REQUEST_URL + '?product_id=' + product_id;
    var SendData = 'mode=cart&ajk=1&product_id=' + product_id + '&quantity=' + quantity + '&lot=' + lot;

    //open メソッド
    httpoj.open('POST' ,Request_URL , true);
    httpoj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    //受信時に起動するイベント
    httpoj.onreadystatechange = function(){
    if (httpoj.readyState == 4 && httpoj.status == 200) {
        ProductCartinCallOver(httpoj);
    }
    };
    //send メソッド

    document.body.style.cursor = "wait";
    fnSetCartPrice(' … ', '計算中♪');
    httpoj.send(SendData);

    return false;
}

function AddProductToCart(product_id_object, quantity_object, lot_object) {
    AddProductToCartRequest(product_id_object.value, quantity_object.value, lot_object.value);

}

function AddBulkPurchaseProductToCartRequest(bulk_purchase_products_id) {

    //XMLHttpRequestオブジェクト生成
    var httpoj = AddProductCartAjax_createHttpRequest();
    var Request_URL = API_REQUEST_URL2 + '?id=' + bulk_purchase_products_id;
    var SendData = 'mode=cart&ajk=1&id=' + bulk_purchase_products_id;

    //open メソッド
    httpoj.open('POST' ,Request_URL , true);
    httpoj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    //受信時に起動するイベント
    httpoj.onreadystatechange = function(){
    if (httpoj.readyState == 4 && httpoj.status == 200) {
        ProductCartinCallOver(httpoj);
    }
    };
    //send メソッド

    document.body.style.cursor = "wait";
    fnSetCartPrice(' … ', '計算中♪');
    httpoj.send(SendData);

    return false;
}

function AddBulkPurchaseProductToCart(bulk_purchase_products_id) {
    AddBulkPurchaseProductToCartRequest(bulk_purchase_products_id);

}
