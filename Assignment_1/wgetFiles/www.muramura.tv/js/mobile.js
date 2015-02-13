// JavaScript Document

var ua = navigator.userAgent;
var checker = {
  iphone: ua.match(/(iPhone|iPod|iPad)/),
  blackberry: ua.match(/BlackBerry/),
  android: ua.match(/Android/)
};
