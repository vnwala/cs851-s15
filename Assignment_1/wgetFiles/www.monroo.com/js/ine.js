function check_ine(product_id, type, iine, elem){
    
    var url = '/rating/check';
    var data = 'product_id='+product_id+'&type='+type+'&ine='+iine;

    ajaxRequest('post', url, data, true, function(xmlhttp){show_eroine_button(xmlhttp,product_id,type,elem)}); 

}

function show_eroine_button(xmlhttp, product_id, type, elem){

    re = xmlhttp.responseText;
    var ero_message = ' エロいね！';
    var message = ' いいね！';

    if(re == 'I' || re == 'E'){

        var ero_img  = '<img src="/image/eroine.png" align="absmiddle" title="'+ero_message+'済みです。">'+ero_message;
        var iine_img = '<img src="/image/iine.png" align="absmiddle" title="'+message+'済みです。">'+message;

        var ero  = '<span class="iine" title="'+ero_message+'済です">'+ero_img+'</span>';
        var iine = '<span class="iine" title="'+message+'済です">'+iine_img+'</span>';

        if(elem == 'prof_'){
            ero  = '<span class="blackBtn" title="'+ero_message+'済です"><a>' + ero_img + '</a></span>';            
            iine = '<span class="blackBtn" title="'+message+'済です"><a>' + iine_img + '</a></span>';
        }

        $('#'+elem+product_id).html(ero+' '+iine);

    }else{

        var ero_img  = '<img src="/image/eroine.png" align="absmiddle" title="'+ero_message+'">'+ero_message;
        var iine_img = '<img src="/image/iine.png" align="absmiddle" title="'+message+'">'+message;

        var ero  = '<a href="javascript:;" class="iine" onclick="rate_eroine('+product_id+','+type+',\'E\',\''+elem+'\')" title="'+ero_message+'">'+ero_img+'</a>';
        var iine = '<a href="javascript:;" class="iine" onclick="rate_eroine('+product_id+','+type+',\'I\',\''+elem+'\')" title="'+message+'">'+iine_img+'</a>';

        if(elem == 'prof_'){
            ero  = '<a href="javascript:;" onclick="rate_eroine('+product_id+','+type+',\'E\',\''+elem+'\')" title="'+ero_message+'">'+ero_img+'</a>';
            iine = '<a href="javascript:;" onclick="rate_eroine('+product_id+','+type+',\'I\',\''+elem+'\')" title="'+message+'">'+iine_img+'</a>';
        }

        $('#'+elem+product_id).html(ero+' '+iine);

    }
}

function rate_eroine(product_id, type, iine, elem){

    if(!isLogin()){
        alert('会員専用機能です。');
        return false;
    }else if(userType == 204){
        alert("※こちらは正規会員限定の機能となります。");
        return false;
    }else{

        var url = '/rating/add';
        var data = 'product_id='+product_id+'&type='+type+'&ine='+iine;
        ajaxRequest('post', url, data, true, function(xmlhttp){show_eroine_result(xmlhttp,product_id,iine,elem)});

    }

}

function show_eroine_result(xmlhttp, product_id, iine, elem){

    re = xmlhttp.responseText;
    var message = ' いいねしました ';
    var iine_img = '<img src="/image/iinex.png" align="absmiddle" title="'+message+' 有難うございます">' + message;
    if(iine == 'E'){
        message = ' エロいねしました ';
        var iine_img = '<img src="/img/common/eroinex.png" align="absmiddle" title="'+message+' 有難うございます">' + message;
    }

    if(re == 1 || re == '1'){
        if(elem == 'prof_'){
            iine_img = '<a>' + iine_img + '</a>';
        }else{
            iine_img = '<span class="iine" style="padding:2px 5px 2px 5px; margin-right:5px;">' + iine_img + '</span>';
        }
        $('#'+elem+product_id).html(iine_img);
    }else{
        $('#'+elem+product_id).html('出来ませんでした');
    }        

    $('#eroine_num_update').html('');
    $('#prof_eroine_num_update').html('');
}
