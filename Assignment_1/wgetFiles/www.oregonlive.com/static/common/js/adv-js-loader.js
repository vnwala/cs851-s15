/**
 * adv-js-loader.js
 *
 * Asynchronous js file loader.
 *
 * Injects js files asynchronously and executes an optional callback when done.
 * Callbacks can be used to load scripts with dependencies.
 * Only one instance of a script file can be loaded (i.e. exact file names). Callbacks
 * will be executed regardless of duplicate file injection requests.
 *
 * Simple Usage:
 * AdvAsyncLoader.require('myJSfile.js');
 * Injects js file.
 *
 * Dependency Usage:
 * AdvAsyncLoader.require('myFirstJSfile.js', function(){
 *		AdvAsyncLoader.require('mySecondJSfile.js');
 * });
 * Injects mySecondJSfile.js AFTER myFirstJSfile.js is done.
 *
 * Advanced Usage:
 * var inline_scripts = [{
 *						function() {//do something first},
 *						function() {//do something else}
 * }];
 * AdvAsyncLoader.require('myFirstJSfile.js', function(){
 *		AdvAsyncLoader.require('mySecondJSfile.js', function(){
 *				// after both dependencies have been loaded, execute inline calls:
 *				var i, max = scripts.length;
 *				for(var i = 0; i < max; i+=1){
 *					inline_scripts[i]();
 *				}
 *		});
 * });
 * Injects mySecondJSfile.js AFTER myFirstJSfile.js is done then executes.
**/
// thank you developer.mozilla.org for < ECMA-262 prototype
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		'use strict';
		if (this == null) throw new TypeError();
		var n, k, t = Object(this),
		    len = t.length >>> 0;
		if (len === 0) return -1;
		n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) return -1;
		for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
			if (k in t && t[k] === searchElement) return k;
		}
		return -1;
	};
}
//------------------------------------------------------------------------------------
// AdvAsyncLoader namespace - Advance Asynchronous javascript Loader
//------------------------------------------------------------------------------------
var AdvAsyncLoader = {
	inserts: [],
	require: function (file, callback) {
		if (!(this.inserts.indexOf(file) < 0)) {
			if (typeof callback === 'function') callback();
			return false;
		}
		var scriptEl = document.getElementsByTagName('script')[0],
			 newjs = document.createElement('script');
		
		newjs.src = file;
		newjs.async = 'true';
		newjs.type = 'text/javascript';
		var x = false;
		newjs.onload = newjs.onreadystatechange = function(){
			var rs = this.readyState;
			if (x || rs && rs != 'complete' && rs != 'loaded') return;
			x = true;
			if (typeof callback === 'function') callback();
		};
		scriptEl.parentNode.insertBefore(newjs, scriptEl);
		this.inserts.push(file);
		return true;
	}
}
var hn = window.location.hostname.split('.');
AdvAsyncLoader.kitId = (hn[hn.length-2]=='nola') ? 'lfc4zjg': 'iiu0uok';