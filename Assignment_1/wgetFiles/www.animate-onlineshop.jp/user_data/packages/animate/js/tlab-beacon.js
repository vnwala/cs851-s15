//  ========================================================
//  tlab-beacon.js ---- beacon tag class
//  Copyright 2010 TEAM-LAB
//  ========================================================

if ( typeof(TLAB) == 'undefined' ) TLAB = function() {};

TLAB.Beacon = function (arg1, arg2) {
	this.divtag = arg1;
	this.itemid = escape(arg2);
	this.url = "https://www.teamlab-recommend.jp/animate/beacon.gif?item=" + this.itemid;
	return this;
}

TLAB.Beacon.prototype.sendRequest = function () {
	document.getElementById(this.divtag).innerHTML = "<img src='" + this.url + "'>";
}

