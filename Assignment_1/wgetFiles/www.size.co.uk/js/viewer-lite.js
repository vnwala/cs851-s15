/*
	STL Product Viewer
	v1.1.0 15/04/2014 Craig Roberts

	***

	THIS IS A BUTCHERED VERSION OF THE VIEWER.JS SCRIPT
	IT'S USED FOR THE IMAGES WITHIN QUICKVIEW
	REMOVED THE SPINNER, VIDEO AND CLICK TO ZOOM FUNCTIONALITY

	TO: NEW DEV - HAVE FUN! ~ John Healey.

	***
*/
if (!document.getElementById('scene7wrapper')) { //stop IE8 breaking...
	function imageViewer(id, config) {
		this.id = id;
		this.plu = config.plu; //product id
		this.fascia = config.fascia; //jd|bk|sz|sc|ck
		this.mainContainerId = config.mainContainerId; //Assets container

		this.existImages = config.existImages || false;
		this.existThumbs = config.existThumbs || false;

		this.mainDefault = config.mainDefault || 0; //Initial display (image number|video|spinset)

		this.mainImageContainerId = config.mainImageContainerId || 'image_' + id;
		this.mainImageWidth = config.mainImageWidth || '300';
		this.mainImageHeight = config.mainImageHeight || '300';
		this.mainImageClass = config.mainImageClass || 'mainImage';
		this.mainImageAlt = config.mainImageAlt || '';
		this.mainImageId = config.mainImageId || 'mainImage_' + id;

		this.thumbContainerId = config.thumbContainerId;
		this.thumbImageWidth = config.thumbImageWidth || '50';
		this.thumbImageHeight = config.thumbImageHeight || '50';
		this.thumbImageClass = config.thumbImageClass || 'thumb';
		this.thumbImageCount = config.thumbImageCount;
		this.thumbImageAlt = config.thumbImageAlt || 'Click to view this image';
		this.thumbCurrentClass = config.thumbCurrentClass || 'current';

		this.screenWidth = 0;
		this.screenHeight = 0;

		this.inTransition = false;

		this.currAsset = this.mainDefault;
		this.imageArr = null;

		this.divArr = new Array();
		this.divCount = 0;

		this.baseImageUrl = 'http://i1.adis.ws/i/jpl/';
		this.baseUrl = '#@IMAGE@#?qlt=100&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.mainUrl = '#@IMAGE@#?w=' + this.mainImageWidth + '&h=' + this.mainImageHeight + '&qlt=100&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.thumbUrl = '#@IMAGE@#?w=' + this.thumbImageWidth + '&h=' + this.thumbImageHeight + '&qlt=100&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
	};

	imageViewer.prototype = {
		init : function() {
			var assetReq = new assetRequest({
				plu: this.plu,
				fascia: this.fascia,
				reqImage: !this.existImages
			});
			var self = this;
			assetReq.load(function() {
				self.imageArr = assetReq.imageArr;
				self.displayMain();

				self.loadDiv();
				self.displayThumb();
				self.loadDefaultView();
				self.loadNav();
			});
		},
		addDiv: function(divId, newDivId, newDivClass, newDivOrder, content) {
			this.divArr[this.divCount] = new Array(divId, newDivId, newDivClass, newDivOrder, content);
			this.divCount = this.divCount + 1;
		},
		loadDiv: function() {
			for (var i = 0; i < this.divArr.length; i++) {
				var divContainer = jQuery('#' + this.divArr[i][0]);
				if(this.divArr[i][3] == 'prepend') {
					divContainer.prepend('<div id="' + this.divArr[i][1] + '" class="' + this.divArr[i][2] + '"></div>');
				} else {
					divContainer.append('<div id="' + this.divArr[i][1] + '" class="' + this.divArr[i][2] + '"></div>');
				}
				if(this.divArr[i][4] != null && this.divArr[i][4] != '') {
					jQuery('#' + this.divArr[i][1]).append(this.divArr[i][4]);
				}
			}
		},
		loadNav : function() {
			var thumbImages = this.imageArr;
			var self = this;
			jQuery('#' + this.thumbContainerId + ' .' + this.thumbImageClass).click(function () {
				var thumbId = jQuery(this).attr('rel');
				self.changeAsset(thumbId);
			});
		},
		loadDefaultView : function() {
			if((this.mainDefault == 'spinset' && this.spinArr == null) || (this.mainDefault == 'video' && this.videoName == null)) {
				this.mainDefault = 0;
				this.currAsset = 0;
			}
			if(isNaN(this.mainDefault)) {
				jQuery('#' + this.mainImageContainerId).css('display','none');
			}
			this.currentThumb(null, this.currAsset);
		},
		changeAsset : function(asset) {
			var currAsset = this.currAsset;
			var newAsset = asset;
			var newAssetCon = null;
			var currAssetCon = null;
			var mainUrl = this.mainUrl;
			var mainImage = jQuery('#' + this.mainImageId);
			var mainImageSrc = null;
			if(this.currAsset != newAsset && this.inTransition == false) {
				this.inTransition = true;
				if(!isNaN(newAsset)) {
					newAssetCon = jQuery('#' + this.mainImageContainerId);
					if(this.imageArr != null) {
						mainImageSrc = mainUrl.replace('#@IMAGE@#', this.imageArr[newAsset]);
					}
				}

				if(!isNaN(this.currAsset)) {
					currAssetCon = jQuery('#' + this.mainImageContainerId);
				}

				this.assetTransition(currAsset, newAsset, currAssetCon, newAssetCon, mainImage, mainImageSrc);
				this.currentThumb(currAsset, newAsset);
			}
		},
		currentThumb : function(currAsset, newAsset) {
			if(!isNaN(currAsset)) {
				jQuery('#' + this.thumbContainerId + ' .' + this.thumbImageClass + '[rel=' + currAsset + ']').removeClass(this.thumbCurrentClass);
			}

			if(!isNaN(newAsset)) {
				jQuery('#' + this.thumbContainerId + ' .' + this.thumbImageClass + '[rel=' + newAsset + ']').addClass(this.thumbCurrentClass);
			}
		},
		assetTransition : function(currAsset, newAsset, currAssetCon, newAssetCon, mainImage, mainImageSrc) {
			var self = this;
			self.currAsset = newAsset;
			//try {
			currAssetCon.fadeOut('fast', function () {
				if(!isNaN(newAsset) && self.existImages !== true) {
					if(mainImage.attr('src') == mainImageSrc) {
						newAssetCon.fadeIn('fast', function () {
							self.inTransition = false;
						});
					} else {
						mainImage.attr('src', mainImageSrc);
						mainImage.load(function () {
							newAssetCon.fadeIn('fast', function () {
								self.inTransition = false;
							});
						});
					}
				} else {
					newAssetCon.fadeIn('fast', function () {
						self.inTransition = false;
					});
				}
			});
			//}catch(e){}
		},
		displayThumb : function() {
			if(this.showThumbs !== false && this.existThumbs !== true && this.imageArr != null) {
				var thumbContainer = jQuery('#'+this.thumbContainerId);
				var maxDisplay = 5;
				if(this.imageArr.length < maxDisplay) {
					maxDisplay = this.imageArr.length;
				} else {
				}
				for (var i = 0; i < maxDisplay; i++) {
					thumbContainer.append('<img class="' + this.thumbImageClass + '" rel="' + (i) + '" src="' + this.thumbUrl.replace('#@IMAGE@#', this.imageArr[i]) + '" alt="' + this.thumbImageAlt + '" title="' + this.thumbImageAlt + '" />');
				}
			} else {
				var i = 0;
				jQuery('#'+this.thumbContainerId + ' .' + this.thumbImageClass).each(function() {
					jQuery(this).attr('rel', i);
					i++;
				});
			}
		},
		displayMain : function() {
			if(this.existImages !== true && (jQuery('#' + this.mainImageContainerId).length < 1)) {
				var mainContainer = jQuery('#'+this.mainContainerId);
				var imageContainer = jQuery('<div id="' + this.mainImageContainerId + '" style="position:relative;width:' + this.mainImageWidth + 'px;height:' + this.mainImageHeight + 'px;"></div>');
				mainContainer.prepend(imageContainer);
				var imageToLoad = '';
				if(this.imageArr != null) {
					imageToLoad = this.mainUrl.replace('#@IMAGE@#', this.imageArr[0])
					if(!isNaN(this.currAsset)) {
						imageToLoad = this.mainUrl.replace('#@IMAGE@#', this.imageArr[this.currAsset]);
					}
				} else {
					imageToLoad = this.baseImageUrl + this.mainUrl.replace('#@IMAGE@#', this.fascia + '_' + this.plu + '_a');
				}

				imageContainer.append('<img id="' + this.mainImageId + '" class="' + this.mainImageClass + '" src="' + imageToLoad + '" alt="' + this.mainImageAlt + '" title="' + this.mainImageAlt + '" />');
			}
		}
	}

	window.ampCallbacks=new Object();
	window.callbackArr = new Array();

	function ampCall(inArg) {
		var callmade = false;
		var name = inArg['name'];

		if(name == '' || name == null) {
			name = inArg;
		}

		for(var i=0; i<window.callbackArr.length; i++){
			if(window.callbackArr[i] == name) {
				callmade = true;
			}
		}

		if(!callmade) {
			window.ampCallbacks[name](inArg);
			window.callbackArr.push(name);
		}
	}

	function assetRequest(config) {
		this.plu = config.plu;
		this.fascia = config.fascia;
		this.reqImage = config.reqImage;

		this.imageArr = null;

		this.imageExt = '_is';
		this.imageReqType = 's';
		this.jsonUrl = 'http://i1.adis.ws/#@REQ@#/jpl/#@ID@#.js?func=ampCall';
	};

	assetRequest.prototype = {
		load: function(callback) {
			this.loadAsset(this.plu, this.fascia, function() {
				callback();
			});
		},
		loadAsset: function(plu, fascia, callback) {
			var self = this;
			self.createScript(plu, fascia, self.imageExt, self.imageReqType, self.reqImage, function(inArg) {
				self.createImageSet(inArg);
						callback();
			});
		},
		createScript: function(plu, fascia, ext, req, call, callback) {
			if(call != false) {
				var jsonUrl = this.jsonUrl.replace('#@ID@#',fascia + '_' + plu + ext).replace('#@REQ@#',req);
				if (typeof callback != 'undefined'){
					window.ampCallbacks[fascia + '_' + plu + ext] = callback;
				}
				var script_tag = document.createElement('script');
				script_tag.setAttribute('type', 'text/javascript');
				script_tag.setAttribute('src', jsonUrl);
				script_tag.setAttribute('onerror', 'javascript:ampCall(\'' + fascia + '_' + plu + ext + '\')');
				script_tag.setAttribute('onload', 'javascript:ampCall(\'' + fascia + '_' + plu + ext + '\')');
				document.getElementsByTagName('head')[0].appendChild(script_tag);
				setTimeout(function(){
					ampCall(fascia + '_' + plu + ext);
				},3000);
			} else {
				callback();
			}
		},
		createImageSet: function(obj) {
			var assetArr = new Array();
			if(obj != null) {
				var assetArrTemp = obj['items'];
				if(typeof assetArrTemp !== 'undefined') {
					for(var i=0; i<assetArrTemp.length; i++){
						if(assetArrTemp[i]['src'] !== null && assetArrTemp[i]['src'] != "" ) {
							assetArr[i] = assetArrTemp[i]['src'];
						}
					}
				}
			}
			if(assetArr.length < 1) {
				assetArr = null;
			}
			this.imageArr = assetArr;
		}
	}

	var config = {
		plu:plu,
		fascia:'sz',
		mainContainerId:'main',
		thumbContainerId:'thumbs',
		mainImageWidth:476,
		mainImageHeight:535,
		thumbImageWidth:72,
		thumbImageHeight:81
	};

	var viewer = new imageViewer(1, config);
	viewer.init();
}
