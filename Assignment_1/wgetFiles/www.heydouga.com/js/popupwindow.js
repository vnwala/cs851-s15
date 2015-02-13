/*
	popup window Library JS with jQuery.
							ver1.0
	cteated by edo.
*/

/*
aaaa = function(selector, context)
{
  return new jQuery.fn.init(selector,context);
}
*/

(function() {
	//ポップアップ関数共有変数
	var _obj;
	var _curObj;
	var _dType;
	var _offsetX;
	var _offsetY;
	var _dOffsetX;
	var _dOffsetY;
	var _zindex = 1050;
	var _isIE = /*@cc_on!@*/false;
	var _isOpera = ( navigator.userAgent.toLowerCase().indexOf( 'opera' ) != -1 ) ? true : false;
	var _cnt = 0;
	
	//共通関数
	function _counter() {
			return ++_cnt;
	}
	
	function _getScrollTop() {
		return ( document.body.scrollTop > document.documentElement.scrollTop ) ? document.body.scrollTop : document.documentElement.scrollTop;
	}
	
	function _getClientHeight() {
		if( document.documentElement.clientHeight == 0 ) {
			var dh = document.body.clientHeight;
		} else if( !_isIE ) {
			var dh = ( document.body.clientHeight > document.documentElement.clientHeight ) ? document.body.clientHeight : document.documentElement.clientHeight;
			if( window.innerHeight ) dh = ( dh > window.innerHeight ) ? window.innerHeight : dh;
		} else {
			var dh = document.documentElement.clientHeight;
		}
		return dh;
	}
	
	function _getCoverHeight() {
		var h = ( document.body.clientHeight > document.body.scrollHeight ) ? document.body.clientHeight : document.body.scrollHeight;
		h = ( h > document.documentElement.scrollHeight ) ? h : document.documentElement.scrollHeight;
		h = ( h > document.documentElement.clientHeight ) ? h : document.documentElement.clientHeight;
		return h;
	}

	
	_dragEnd = function() {
		if( _obj ) {
			_curObj.hideMoveCover();
			var ifr = _obj.getElementsByTagName( 'iframe' );
			if( ifr.item( 0 ) ) {
				jQuery( ifr.item(0).nextSibling ).remove();
			}
			
			if( _dType == 'resize' ) {
				_curObj.originalWidth = _obj.clientWidth;
				_curObj.originalHeight = _obj.clientHeight;
			}
			_obj = null;
			_curObj = null;
			_dType = null;
		}
	}
	
	_dragMove = function( evt ) {
		if( _obj && _curObj ) {
			if( evt.preventDefault ) evt.preventDefault();
			else evt.returnValue = false;
			if( window.getSelection ) window.getSelection().removeAllRanges();
			
			if( _dType == 'move' ) {
				var top = evt.pageY - _offsetY;
				var left = evt.pageX - _offsetX;
				_obj.style.left = _curObj.originalLeft = ( left < 0 ) ? 0 : left + 'px';
				_obj.style.top = _curObj.originalTop = ( top < 0 ) ? 0 : top + 'px';
			} else if( _dType == 'resize' ) {
				_obj.style.width = ( _curObj.originalWidth + ( evt.pageX - _dOffsetX ) ) + 'px';
				_obj.style.height = ( _curObj.originalHeight + ( evt.pageY - _dOffsetY ) ) + 'px';
			}
		}
	}
	
	jQuery( document ).mousemove( _dragMove );
	jQuery( document ).mouseup( _dragEnd );
	
	//defined popup function.
	window.$pop= function( c, opt ) {
		this.win;
		this.end = function() {}
		this.originalHeight;
		this.originalWidth;
		this.originalLeft;
		this.originalTop;
		this.state;
		this.pwID;
		this.varName;
		
		if( !opt ) opt = {};
		this.pop( c, opt );
		window[this.pwID] = this;
	}
		
	window.$pop.prototype = {
		//定数宣言
		w: 'auto',
		h: 'auto',
		type: '',
		title: '',
		pwIDNumber: '',
		effect: '',
		modalFlg: false,
		
		pop: function( c, opt ) {
			//ポップアップウィンドウパラメータ初期化
			var content = c;
			this.type = opt.type ? opt.type : 'alert';
			this.title = opt.title ? opt.title : '&nbsp;';
			this.effect = opt.effect ? opt.effect : '';
			this.modalFlg = ( opt.modal == true ) ? true : false;
			this.YESEND = ( typeof opt.YES == 'function' ) ? opt.YES : '';
			this.NOEND = ( typeof opt.NO == 'function' ) ? opt.NO : '';
			this.varName = opt.varName ? opt.varName : '';
			var width = opt.width ? opt.width : this.w;
			var height = opt.height ? opt.height : this.h;
			var closeFlg = ( opt.close == false ) ? false : true;
			var windowmode = ( opt.windowmode == true ) ? true : false;
			var nomove = ( opt.nomove == true ) ? true : false;
			var resize = ( opt.resize == true ) ? true : false;
			
			//IDのカウントアップ
			_counter();
			
			//ポップアップウィンドウの生成
			var win = this.createWindow( width, height );
			win.container.appendTo( document.body );
			if( !nomove ) jQuery( '#pwbar' + _cnt ).mousedown( (function( obj ) { return function() { obj.dragStart.apply( obj, arguments ); } } )( this ) );
			else jQuery( '#pwbar' + _cnt ).css( 'cursor', 'default' );
			if( closeFlg ) jQuery( '#pwClose' + _cnt ).click( ( function( obj ) { return function(){ obj.close.apply( obj, arguments ); } } )( this ) );
			else jQuery( '#pwClose' + _cnt ).css( 'display', 'none' );
			if( resize ) {
				jQuery( '#pwResizer' + _cnt ).mousedown( ( function( obj ) { return function(){ obj.dragResize.apply( obj, arguments ); } } )( this ) );
				jQuery( '#pwResizer' + _cnt ).css( 'cursor', 'nw-resize' ).addClass( 'resizable' );
			}
			if( windowmode ) {
				jQuery( '#pwMinimum' + _cnt ).click( ( function( obj ) { return function(){ obj.minimum.apply( obj, arguments ); } } )( this ) );
				jQuery( '#pwMaximum' + _cnt ).click( ( function( obj ) { return function(){ obj.maximum.apply( obj, arguments ); } } )( this ) );
				jQuery( '#pwbar' + _cnt ).dblclick( ( function( obj ) { return function(){ obj.maximum.apply( obj, arguments ); } } )( this ) );
			} else {
				jQuery( '#pwMinimum' + _cnt + ', #pwMaximum' + _cnt ).css( 'display', 'none' );
			}
			
			//表示モードの選択
			switch( this.type ) {
				case 'confirm':
					content = this.getTextContent( content );
					jQuery( content ).appendTo( jQuery( '#pwbody' + _cnt ) );
					jQuery( '<p class="pwBtn"><a href="javascript:;" id="pwYES' + _cnt + '" class="pwYes confirm"></a><a href="javascript:;" id="pwNO' + _cnt + '" class="pwNo"></a></p>' ).appendTo( jQuery( '#pwBtnArea' + _cnt ) );
					jQuery( '#pwYES' + _cnt ).click( ( function( obj ) { return function() { obj.YES.apply( obj, arguments ); } } )( this ) );
					jQuery( '#pwNO' + _cnt ).click( ( function( obj ) { return function() { obj.NO.apply( obj, arguments ); } } )( this ) );
					break;
				case 'alert':
					content = this.getTextContent( content );
					jQuery( content ).appendTo( jQuery( '#pwbody' + _cnt ) );
					jQuery( '<p class="pwBtn"><a href="javascript:;" id="pwYES' + _cnt + '" class="pwYes"></a></p>' ).appendTo( jQuery( '#pwBtnArea' + _cnt ) );
					jQuery( '#pwYES' + _cnt ).click( ( function( obj ) { return function() { obj.YES.apply( obj, arguments ); } } )( this ) );
					break;
				case 'image':
					content = this.getImage( content );
					jQuery( content ).appendTo( jQuery( '#pwbody' + _cnt ) );
					jQuery( '#pwContentsBtn' + _cnt ).css( 'display', 'none' );
					break;
				case 'inline':
					content = this.getInline( content );
					jQuery( content ).appendTo( jQuery( '#pwbody' + _cnt ) );
					jQuery( '#pwContentsBtn' + _cnt ).css( 'display', 'none' );
					break;
				case 'iframe':
					var ifr = document.createElement( 'iframe' );
					ifr.frameBorder = 0;
					jQuery( ifr ).appendTo( jQuery( '#pwbody' + _cnt ) );
					jQuery( '#pwContentsBtn' + _cnt ).css( 'display', 'none' );
					ifr.src = content;
					break;
			}
			
			//モーダルモードのチェック
			if( this.modalFlg ) this.modalCover();
			
			//表示位置の決定
			var sc = _getScrollTop();
			var dh = _getClientHeight();
			var dw = document.body.clientWidth;
			var width = this.originalWidth = win.container.width();
			var height = this.originalHeight = win.container.height();
			var left = ( ( dw / 2 ) - ( parseInt( width ) / 2 ) );
			var top = ( ( dh / 2 ) - ( parseInt( height ) / 2 ) + sc -50 );
			
			left = this.originalLeft = ( left < 0 ) ? 0 : left + 'px';
			top = this.originalTop = ( top < 0 ) ? 0 : top + 'px';
			win.container.css( { 'width': width + 'px', 'left': left, 'top': top } );
			win.content.css( 'width', '100%' );
			
			if( this.effect ) win.container.fadeIn( this.effect );
			else win.container.show();
			
			this.win = win.container;
			
			return this;
		},
		
		getTextContent: function( c ) {
			var d = jQuery( '<div></div>' ).html( '<p class="pwAlertContent">' + c + '</p>' );
			return d;
		},
		
		getInline: function( c ) {
			if( document.getElementById( c ) ) return document.getElementById( c ).cloneNode( true );
			else return c;
		},
		
		getImage: function( c ) {
			var img = new Image();
			img.src = c;
			return img;
		},
		
		getIframe: function( c ) {
			var ifr = document.createElement( 'iframe' );
			ifr.src = c;
			ifr.frameBorder = 0;
			return ifr;
		},
		
		createWindow: function( w, h ) {
			if( w != 'auto' && String( w ).match( /(px|em|%|pt)/i ) == null ) w += 'px';
			if( h != 'auto' && String( h ).match( /(px|em|%|pt)/i ) == null ) h += 'px';
			var tdAddClass = ( _isIE || _isOpera ) ? ' contentsMain' : '';
			var win = jQuery(
				'<div class="pWindow" style="background-color:#333; display: none; position: absolute; z-index:' + (++_zindex) + '; width:' + w + '; height:' + h + '" id="pWindow' + _cnt + '">' +
					'<a class="closeBtn" href="javascript:;" title="閉じる" id="pwClose' + _cnt + '">x</a>' +
					'<a class="minimumBtn" href="javascript:;" title="最小化" id="pwMinimum' + _cnt + '">_</a>' +
					'<a class="maximumBtn" href="javascript:;" title="最大化" id="pwMaximum' + _cnt + '">□</a>' +
				'</div>' );
			var winTbl = jQuery(
				'<table class="pwContainer" id="pwContainer' + _cnt + '" style="height: 100%;">' +
					'<tr class="titleBar"><td class="pwBarL">&nbsp;</td><td class="pwBarCenter" id="pwbar' + _cnt + '">' + this.title + '</td><td class="pwBarR">&nbsp;</td></tr>' +
					'<tr class="contentsBox" id="pwContents' + _cnt + '" align=center><td class="contentsL"></td><td class="contentsBody' + tdAddClass + '" id="pwbody' + _cnt +'" style="position: relative;"></td><td class="contentsR"></td></tr>' +
					'<tr class="contentsBox btnArea" id="pwContentsBtn' + _cnt + '"><td class="contentsL"></td><td class="contentsBody" id="pwBtnArea' + _cnt +'"></td><td class="contentsR"></td></tr>' +
					'<tr class="contentsFooter"><td class="cfL"></td><td class="cfC"></td><td class="cfR" id="pwResizer' + _cnt + '"></td></tr>' +
				'</table>' );
					
			win.append( winTbl );
			this.pwIDNumber = _cnt;
			this.pwID = this.varName ? this.varName : 'pWindow' + _cnt;
			return { container: win, content: winTbl };
		},
		
		dragStart: function( evt ) {
			if( evt.preventDefault ) evt.preventDefault;
			else evt.returnValue = false;
			
			if( this.state == 'maximum' ) return false;
			_obj = document.getElementById( 'pWindow' + this.pwIDNumber );
			_curObj = this;
			_dType = 'move';
			this.moveCover();
			
			var ifr = _obj.getElementsByTagName( 'iframe' );
			if( ifr.item( 0 ) ) {
				var cvh = ifr.item( 0 ).clientHeight + 20;
				var d = ifr.item( 0 );
				var ot = 0;
				if( !_isIE ) {
					do {
						if( d.nodeName.match( /(tr|td|table|iframe)/i ) ) ot += parseInt( d.offsetTop );
						d = d.offsetParent;
					} while( d )
				}
				var cvDiv = jQuery( '<div>&nbsp;</div>' ).css( { 'position': 'absolute', 'top': ot + 'px', 'left': 0, 'width': '100%', 'height': cvh + 'px' } );
				jQuery( '#pwbody' + this.pwIDNumber ).append( cvDiv );
			}
			if( _isIE ) {
				_offsetX = event.offsetX + 2;
				_offsetY = event.offsetY + 2;
			} else {
				_offsetX = evt.pageX - _obj.offsetLeft;
				_offsetY = evt.pageY - _obj.offsetTop;
			}
			_obj.style.zIndex = ++_zindex;
		},
		
		dragResize: function( evt ) {
			if( evt.preventDefault ) evt.preventDefault;
			else evt.returnValue = false;
			
			if( this.state == 'minimum' ) return false;
			
			_obj = document.getElementById( 'pWindow' + this.pwIDNumber );
			_curObj = this;
			_dType = 'resize';
			this.moveCover();
			_dOffsetX = evt.pageX;
			_dOffsetY = evt.pageY;
			
			var ifr = _obj.getElementsByTagName( 'iframe' );
			if( ifr.item( 0 ) ) {
				var cvh = ifr.item( 0 ).clientHeight + 20;
				var d = ifr.item( 0 );
				var ot = 0;
				if( !_isIE ) {
					do {
						if( d.nodeName.match( /(tr|td|table|iframe)/i ) ) ot += parseInt( d.offsetTop );
						d = d.offsetParent;
					} while( d )
				}
				var cvDiv = jQuery( '<div>&nbsp;</div>' ).css( { 'position': 'absolute', 'top': ot + 'px', 'left': 0, 'width': '100%', 'height': cvh + 'px' } );
				jQuery( '#pwbody' + this.pwIDNumber ).append( cvDiv );
			}
			
			_offsetX = evt.pageX - _obj.offsetLeft;
			_offsetY = evt.pageY - _obj.offsetTop;
			_obj.style.zIndex = ++_zindex;
		},
		
		YES: function() {
			this.close( this.YESEND );
		},
		
		YESEND: '',
		
		setYESEND: function( func ) {
			if( typeof func == 'function' ) this.YESEND = func;
		},
		
		NO: function() {
			this.close( this.NOEND );
		},
		
		NOEND: '',
		
		setNOEND: function( func ) {
			if( typeof func == 'function' ) this.NOEND = func;
		},
		
		getID: function() {
			return 'pWindow' + this.pwIDNumber;
		},
		
		modalCover: function() {
			var h = _getCoverHeight();
			var m = jQuery( '<div></div>' )
			.css( { 'display': 'none', 'width': '100%', 'height': h + 'px', 'position': 'absolute', 'top': 0, 'left': 0, 'z-index': ( _zindex - 1 ), 'opacity': 0.7, '-moz-opacity': 0.7, 'filter': 'alpha( opacity=70 )' } )
			.attr( 'id', 'pwCover' );
			m.appendTo( jQuery( document.body ) );
			if( this.effect ) m.fadeIn( this.effect );
			else m.show();
			
			jQuery( window ).resize( ( function( obj ) { return function() { obj.resizeCover.apply( obj, arguments ); } } )( this ) );
		},
		
		resizeCover: function() {
			var h = _getCoverHeight();
			jQuery( '#pwCover' ).css( 'height', h + 'px' );
		},
		
		hideCover: function() {
			if( this.effect ) jQuery( '#pwCover' ).fadeOut( this.effect, function() {
				jQuery( '#pwCover' ).remove();
			});
			else jQuery( '#pwCover' ).remove();
		},
		
		moveCover: function() {
			var h = _getCoverHeight();
			var mc = jQuery( '<div></div>' )
			.css( { 'width': '100%', 'height': h + 'px', 'position': 'absolute', 'top': 0, 'left': 0, 'z-index': 10000 } )
			.attr( 'id', 'pwMoveCover' );
			mc.appendTo( jQuery( document.body ) );
		},
		
		hideMoveCover: function() {
			jQuery( '#pwMoveCover' ).remove();
		},
		
		minimum: function( evt ) {
			if( this.state == 'maximum' ) this.maximum( evt );
			if( this.state != 'minimum' ) {
				jQuery( '#pWindow' + this.pwIDNumber ).css( 'height', 'auto' );
				jQuery( '#pwContentsBtn' + this.pwIDNumber + ':visible, #pwContents' + this.pwIDNumber + ':visible' ).hide();
				this.state = 'minimum';
			} else {
				jQuery( '#pWindow' + this.pwIDNumber ).css( 'height', this.originalHeight );
				jQuery( '#pwContents' + this.pwIDNumber + ':hidden' ).show();
				if( this.type.match(/(alert|confirm)/) ) jQuery( '#pwContentsBtn' + this.pwIDNumber + ':hidden' ).show();
				this.state = 'normal';
			}
		},
		
		maximum: function( evt ) {
			if( evt.preventDefault ) evt.preventDefault();
			else evt.returnValue = false;
			if( window.getSelection ) window.getSelection().removeAllRanges();
			
			if( this.state == 'minimum' ) this.minimum();
			if( this.state != 'maximum' ) {
				var sc = _getScrollTop();
				var ch = _getClientHeight();
				jQuery( '#pWindow' + this.pwIDNumber ).css( { 'width': '100%', 'height': ch + 'px', 'left': 0, 'top': sc + 'px' } );
				this.state = 'maximum';
			} else {
				jQuery( '#pWindow' + this.pwIDNumber ).css( { 'width': this.originalWidth, 'height': this.originalHeight, 'top': this.originalTop, 'left': this.originalLeft } );
				this.state = 'normal';
			}
		},
		
		close: function( func ) {
			var d = '#pWindow' + this.pwIDNumber;
			if( this.effect ) {
				if( this.modalFlg ) this.hideCover();
				jQuery( d ).fadeOut( 'normal', function() {
					jQuery( d ).remove();
					if( typeof func == 'function' ) func();
				});
			} else {
				if( this.modalFlg ) this.hideCover();
				jQuery( d ).remove();
				if( typeof func == 'function' ) func();
			}
			
			this.delVar();
		},
		
		delVar: function() {
			try {
				delete window[this.pwID];
			} catch( e ) {
				window[this.pwID] = null;
			}
		}
	}// end $pop prototype.
})();
