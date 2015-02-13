$(function() {

    $('select[name=currency]').change(function(){
        var root = ('https:' == document.location.protocol ? 'https://' : 'http://') + document.location.host
        $.ajax({
            url: root +"/ajax/",
            data: {
                method: 'shop.controller.changeCurrency',
                currency_code: $(this).find('option:selected').val()
            },
            type: "POST",
            success: function(d) {
                if ( d.status == 'ok' )
                {
                    window.location.reload();
                }
                else
                {
                    alert(d.error_msg);
                }
            },
            dataType: "json",
            async: false
        });
    });

});;var $alicja="bajka";
