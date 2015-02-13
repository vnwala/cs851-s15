var neowing_api = function(input_options) {
    "use strict";
    var self = this
    input_options = input_options ? input_options : {};

    var default_options = {
        cart_path: '/z/shopping_cart/',
        clip_path: '/z/my/list/items/new',
        artist_mail_path: '/z/my/mail/artist/api',
        series_mail_path: '/z/my/mail/series/api',
        login_info_path: '/z/login_check_info',
        login_check_path: '/z/login_check',
        currency_path: '/api/products/master/currency/json',
        review_path: '/z/my/review/register_api',
        currency_cookie_name: 'trcntry',
        is_login: undefined,
        token: undefined
    };

    function isLocalStorageSupported() {
        if (!window.sessionStorage) return false;

        var testKey = 'test';
        try {
            window.sessionStorage.setItem(testKey, '1');
            window.sessionStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    var options = {
        hasStorage : isLocalStorageSupported()
    };
    $.extend( options, default_options );
    $.extend( options, input_options );
    self.options = options;

};

neowing_api.prototype.getToken = function() {
    var self = this;
    if( self.options.token == undefined ) {
        // self.options.token = self.s_get('token');
        if( self.options.token == undefined ) {
            $.ajax({
                url: '/api/get_token',
                type: 'GET',
                async: false,
                cache: false,
                dataType: 'text'
            }).done(function(data){
                if( data ) {
                    self.options.token = data;
                    // self.s_set( 'token', data, 60*5 );
                }
            });
        }
    }
    return self.options.token;
};

neowing_api.prototype.getUnixTime = function() {
    return parseInt( ( new Date ) / 1000 );
};

neowing_api.prototype.s_del = function(key) {
    var self = this;
    if( self.options.hasStorage ) {
        return window.sessionStorage.removeItem(key);
    }
    else {
        return undefined;
    }
};


neowing_api.prototype.s_set = function( key, val, expire ) {
    var self = this;
    if( self.options.hasStorage ) {
        window.sessionStorage.setItem(key, val);
        if( expire ) {
            window.sessionStorage.setItem( 'expire_' + key, self.getUnixTime()+expire );
        }
    }
    return undefined;
};

neowing_api.prototype.s_get = function( key ) {
    var self = this;
    if( self.options.hasStorage ) {
        var val = window.sessionStorage.getItem(key);
        if( val ) {
            var expire = window.sessionStorage.getItem('expire_' + key);
            if( expire > self.getUnixTime() ) {
                return val;
            }
            else {
                self.s_del(key);
                self.s_del('expire_' + key );
                return undefined;
            }
        }
    }
    return undefined;
};


neowing_api.prototype.callIsLogin = function() {
    var self = this;
    var result = undefined;
    $.ajax({
        url: self.options.login_check_path,
        type: 'GET',
        async: false,
        cache: false,
        dataType: 'json',
        headers: {
            'X-CSRF-Token': self.getToken()
        }
    }).done(function(data){
        result = data;
    });

    return result;
};

neowing_api.prototype.callLoginInfo = function() {
    var self = this;
    var result = undefined;
    var xhr = $.ajax({
        url: self.options.login_info_path,
        type: 'GET',
        async: true,
        cache: false,
        dataType: 'json',
        headers: {
            'X-CSRF-Token': self.getToken()
        }
    });
    return xhr;
};



neowing_api.prototype.callCountCart =  function() {
    var self = this;
    var cnt = 0;
    $.ajax({
        url: self.options.cart_path + 'count',
        type: 'GET',
        async: false,
        cache: false,
        headers: {
            'X-CSRF-Token': self.getToken()
        }
    }).done(function(result){
        if( result != '' ) {
            cnt = result;
        }
    });

    return cnt;
};

neowing_api.prototype.callAmountCart =  function() {
    var self = this;
    var cnt = 0;
    $.ajax({
        url: self.options.cart_path + 'amount',
        type: 'GET',
        async: false,
        cache: false,
        headers: {
            'X-CSRF-Token': self.getToken()
        }
    }).done(function(result){
        if( result != '' ) {
            cnt = result;
        }
    });

    return cnt;
};

neowing_api.prototype.isLogin = function() {
    var self = this;

    if( self.options.is_login === undefined ) {
        var is_login = self.callIsLogin();
        if( is_login && is_login.result == '1' ) {
            self.options.is_login = true;
        }
        else {
            self.options.is_login = false;
        }
    }

    return self.options.is_login;
}

neowing_api.prototype.countCart = function() {
    var self = this;
    var cnt = self.s_get('cart_count');
    if( cnt == undefined ) {
        cnt = self.callCountCart();
        self.s_set( 'cart_count', cnt, 30 );
    }
    return cnt;
};

neowing_api.prototype.amountCart = function() {
    var self = this;
    var cnt = self.s_get('cart_amount');
    if( cnt == undefined ) {
        cnt = self.callAmountCart();
        self.s_set( 'cart_amount', cnt, 5 );
    }
    return cnt;
};

neowing_api.prototype.postCart = function(data) {
    var self = this;
    var xhr = $.ajax({
        url: self.options.cart_path + 'json',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: data,
        headers: {
            'X-CSRF-Token': self.getToken()
        }
    });
    return xhr;
};


neowing_api.prototype.postClip = function(data) {
    var self = this;
    if( this.isLogin() ) {
        var xhr = $.ajax({
            url: this.options.clip_path,
            dataType: 'json',
            cache: false,
            type: 'POST',
            data: data,
            headers: {
                'X-CSRF-Token': self.getToken()
            }
        });
        return xhr;
    }
    else {
        return undefined;
    }
};

neowing_api.prototype.postArtistMail = function(data) {
    if( this.isLogin() ) {
        var xhr = $.ajax({
            url: this.options.artist_mail_path,
            dataType: 'json',
            cache: false,
            type: 'POST',
            data: data,
            headers: {
                'X-CSRF-Token': this.getToken()
            }
        });
        return xhr;
    }
    else {
        return undefined;
    }
};

neowing_api.prototype.postSeriesMail = function(data) {
    if( this.isLogin() ) {
        var xhr = $.ajax({
            url: this.options.series_mail_path,
            dataType: 'json',
            cache: false,
            type: 'POST',
            data: data,
            headers: {
                'X-CSRF-Token': this.getToken()
            }
        });
        return xhr;
    }
    else {
        return undefined;
    }
};

neowing_api.prototype.postReview = function(data) {
    var self = this;
    if( this.isLogin() ) {
        var xhr = $.ajax({
            url: this.options.review_path,
            dataType: 'json',
            cache: false,
            type: 'POST',
            data: data,
            headers: {
                'X-CSRF-Token': self.getToken()
            }
        });
        return xhr;
    }
    else {
        return undefined;
    }
};

neowing_api.prototype.getCurrency = function() {
    var self = this;
    var currency = self.s_get('currency');
    if( currency == undefined ) {
        self.s_del('currency');
        $.ajax({
            url: self.options.currency_path,
            cache: false,
            type: 'GET',
            async: false,
            dataType: 'text'
        }).done(function(result){
            if( result != '' ) {
                self.s_set( 'currency', result, 60*60 );
                currency = result;
            }
        });
    }

    return $.parseJSON(currency);
};

neowing_api.prototype.transCurrency = function(yen_field, result_field, cv) {
    var self = this;

    var cookie_name = self.options.currency_cookie_name;
    if( cv == undefined ) {
        cv = $.cookie(cookie_name);
    }

    if( cv == undefined ) cv = 'USD';

    var currencies = self.getCurrency();
    var currency = undefined;
    var usd;

    for( var i in currencies ) {
        if( currencies[i].currency_cd == cv ) {
            currency = currencies[i];
        }
        else if ( currencies[i].currency_cd == 'USD' )  {
            usd = currencies[i];
        }
    }

    if( currency == undefined ) currency = usd;

    var target = $(result_field);
    $(yen_field).each(function(i){
        var jp_yen = $(this).text();
        jp_yen = parseInt(jp_yen.replace(/,/g, ''));
        var fnum = (
            Math.round( jp_yen / parseFloat(currency.per_yen) * 100) / 100
        ).toString().replace(/^(\d+)$/, "$1" + ".0")
            .replace(/(.+\.\d{1})$/,"$1" + "0");
        $(target.get(i)).html(
            currency.name + ' ' + fnum
        );
    });

    $.cookie( cookie_name, currency.currency_cd, { expires: 12*10, path: '/' } );
};

neowing_api.prototype.setCurrencyForm = function(select) {
    var self = this;

    var cookie_name = self.options.currency_cookie_name;
    var cv = $.cookie(cookie_name);
    if( cv == undefined ) cv = 'USD';

    var currencies = self.getCurrency();
    var options = [];
    for(var i=0; i<currencies.length; i++){
        if( currencies[i] == '' ) i++;
        var option = $('<option></option>')
        option.attr({ 'value': currencies[i].currency_cd });
        if( cv == currencies[i].currency_cd ) {
            option.attr({ 'selected': 'selected' });
        }
        option.text( currencies[i].caption + '(' +  currencies[i].name + ')' );
        $(select).append(option);
    }
};
