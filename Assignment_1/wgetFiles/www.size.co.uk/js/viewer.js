/*
	STL Product Viewer
	v1.1.0 15/04/2014 Craig Roberts
*/
if (document.getElementById('productPage')) { //stop IE8 breaking...
	function imageViewer(id, config) {
		this.id = id;
		this.plu = config.plu; //product id
		this.fascia = config.fascia; //jd|bk|sz|sc|ck
		this.mainContainerId = config.mainContainerId; //Assets container
		this.showSpin = config.showSpin;
		this.showVideo = config.showVideo;
		this.showThumbs = config.showThumbs;
		this.showMoZoom = config.showMoZoom;
		this.showFsZoom = config.showFsZoom;

		this.existImages = config.existImages || false;
		this.existThumbs = config.existThumbs || false;

		this.mainDefault = config.mainDefault || 0; //Initial display (image number|video|spinset)

		this.mainImageContainerId = config.mainImageContainerId || 'image_' + id;
		this.mainImageWidth = config.mainImageWidth || '300';
		this.mainImageHeight = config.mainImageHeight || '300';
		this.mainImageClass = config.mainImageClass || 'mainImage';
		this.mainImageAlt = config.mainImageAlt || 'Click to zoom';
		this.mainImageId = config.mainImageId || 'mainImage_' + id;

		this.thumbContainerId = config.thumbContainerId;
		this.thumbImageWidth = config.thumbImageWidth || '50';
		this.thumbImageHeight = config.thumbImageHeight || '50';
		this.thumbImageClass = config.thumbImageClass || 'thumb';
		this.thumbImageCount = config.thumbImageCount;
		this.thumbImageAlt = config.thumbImageAlt || 'Click to view this image';
		this.thumbCurrentClass = config.thumbCurrentClass || 'current';

		this.spinContainerId = config.spinContainerId || 'spin_' + id;
		this.spinClass = config.spinClass || 'spin';
		this.spinImageWidth = config.spinImageWidth || this.mainImageWidth;
		this.spinImageHeight = config.spinImageHeight || this.mainImageHeight;
		this.spinImageAlt = config.spinImageAlt || 'Drag to spin';
		this.spinSliderContainerId = config.spinSliderContainerId || this.spinContainerId;
		this.spinSliderId = config.spinSliderId || 'spinSlider_' + id;
		this.spinSliderClass = config.spinSliderClass || 'slider';
		this.spinSliderAlt = config.spinSliderAlt || 'Drag to spin';
		this.spinButtonId = config.spinButtonId ||'spinButton_' + id;
		this.spinButtonImg = config.spinButtonImg || '';
		this.spinButtonClass = config.spinButtonClass || 'spinButton';
		this.spinButtonContainerId = config.spinButtonContainerId || this.thumbContainerId;
		this.spinButtonOrder = config.spinButtonOrder || 'append';
		this.spinButtonAlt = config.spinButtonAlt || 'View 360';
		this.spinAutoPlay = config.spinAutoPlay;
		this.spinAutoPlayInterval = config.spinAutoPlayInterval || 50;
		this.spinAutoPlayWait = config.spinAutoPlayWait || 600;
		this.spinDragSensitivity = config.spinDragSensitivity || 3;
		this.spinDefaultPos = config.spinDefaultPos || 0;
		this.spinOnImageClick = config.spinOnImageClick || false;
		this.spinCurrPos = 0;

		this.videoContainerId = config.videoContainerId || 'video_' + id;
		this.videoClass = config.videoClass || 'video';
		this.videoWidth = config.videoWidth  || this.mainImageWidth;
		this.videoHeight = config.videoHeight || this.mainImageHeight;
		this.videoButtonId = config.videoButtonId || 'videoButton_' + id;
		this.videoButtonImg = config.videoButtonImg || '';
		this.videoButtonClass = config.videoButtonClass || 'videoButton';
		this.videoButtonContainerId = config.videoButtonContainerId || this.thumbContainerId;
		this.videoButtonOrder = config.videoButtonOrder || 'append';
		this.videoButtonAlt = config.videoButtonAlt || 'View Video';

		this.moZoomContainerId = config.moZoomContainerId ;
		this.moZoomContainerClass = config.moZoomContainerClass || 'zoom';
		this.moZoomWidth = config.moZoomWidth || this.mainImageWidth;
		this.moZoomHeight = config.moZoomHeight || this.mainImageHeight;
		this.moZoomRatio = config.moZoomRatio || 5;
		this.moZoomOverId = config.moZoomOverId || 'zoomOver_' + id;
		this.moZoomOverClass = config.moZoomOverClass || 'zoomOver';

		this.fsZoomButtonId = config.fsZoomButtonId || 'fsZoomButton_' + id;
		this.fsZoomButtonImg = config.fsZoomButtonImg || '';
		this.fsZoomButtonClass = config.fsZoomButtonClass || 'fsZoomButton';
		this.fsZoomButtonContainer = config.fsZoomButtonContainer || this.thumbContainerId;
		this.fsZoomButtonOrder = config.fsZoomButtonOrder || 'append';
		this.fsZoomButtonAlt = config.fsZoomButtonAlt || 'View Fullscreen';

		this.fsZoomContainerId = config.fsZoomContainerId || null;
		this.fsZoomLightboxId = config.fsZoomLightboxId || 'fsZoomLightbox_' + id;
		this.fsZoomLightboxClass = config.fsZoomLightboxClass || 'fsZoomLightbox';
		this.fsZoomLightboxInnerId = config.fsZoomLightboxInnerId || 'fsZoomLightboxInner_' + id;
		this.fsZoomLightboxInnerClass = config.fsZoomLightboxInnerClass || 'fsZoomLightboxInner';
		this.fsZoomImageContainerId = config.fsZoomImageContainerId || 'fsZoomContainer_' + id;
		this.fsZoomImageContainerClass = config.fsZoomImageContainerClass || 'fsZoomContainer';
		this.fsZoomImageInnerContainerId = config.fsZoomImageInnerContainerId || 'fsZoomContainerInner_' + id;
		this.fsLightboxWidth = config.fsLightboxWidth;
		this.fsLightboxHeight = config.fsLightboxHeight;
		this.fsLightboxMaxWidth = config.fsLightboxMaxWidth || 980;
		this.fsLightboxMaxHeight = config.fsLightboxMaxHeight || 700;
		this.fsZoomImageWidth = config.fsZoomImageWidth;
		this.fsZoomImageHeight = config.fsZoomImageHeight;
		this.fsZoomImageMaxWidth = config.fsZoomImageMaxWidth || 980;
		this.fsZoomImageMaxHeight = config.fsZoomImageMaxHeight || 700;
		this.fsZoomImageClass = config.fsZoomImageClass || 'main';
		this.fsZoomImageAlt = config.fsZoomImageAlt || 'Click to zoom';
		this.fsZoomImageId = config.fsZoomImageId || 'fsZoomImage_' + id;

		this.fsZoomThumbContainerId = config.fsZoomThumbContainerId || this.fsZoomImageContainerId;
		this.fsZoomThumbContainerInnerId = config.fsZoomThumbContainerInnerId || 'fsZoomThumb' + id;
		this.fsZoomThumbContainerInnerClass = config.fsZoomThumbContainerInnerClass || 'fsZoomThumb';
		this.fsZoomThumbImageWidth = config.fsZoomThumbImageWidth || '50';
		this.fsZoomThumbImageHeight = config.fsZoomThumbImageHeight || '50';
		this.fsZoomThumbImageClass = config.fsZoomThumbImageClass || 'fsThumb';
		this.fsZoomThumbImageCount = config.fsZoomThumbImageCount;
		this.fsZoomThumbImageAlt = config.fsZoomThumbImageAlt || 'Click to view this image';
		this.fsZoomThumbCurrentClass = config.fsZoomThumbCurrentClass || 'current';

		this.fsZoomNavContainerId = config.fsZoomNavContainerId || this.fsZoomImageContainerId;
		this.fsZoomNavContainerInnerId = config.fsZoomNavContainerInnerId || 'fsZoomNav' + id;
		this.fsZoomNavContainerInnerClass = config.fsZoomNavContainerInnerClass || 'fsZoomNav';
		this.fsZoomInButtonId = config.fsZoomInButtonId ||'fsZoomInButton_' + id;
		this.fsZoomInButtonClass = config.fsZoomInButtonClass ||'fsZoomInButton';
		this.fsZoomOutButtonId = config.fsZoomOutButtonId ||'fsZoomOutButton_' + id;
		this.fsZoomOutButtonClass = config.fsZoomOutButtonClass ||'fsZoomOutButton';
		this.fsZoomResetButtonId = config.fsZoomResetButtonId ||'fsZoomResetButton' + id;
		this.fsZoomResetButtonClass = config.fsZoomResetButtonClass ||'fsZoomResetButton';

		this.fsZoomCloseButtonContainerId = config.fsZoomCloseButtonContainerId || this.fsZoomLightboxInnerId;
		this.fsZoomCloseButtonId = config.fsZoomCloseButtonId ||'fsZoomCloseButton' + id;
		this.fsZoomCloseButtonClass = config.fsZoomCloseButtonClass ||'fsZoomCloseButton';
		this.fsZoomOnImageClick = config.fsZoomOnImageClick || true;

		this.fsZoomBoxWidth = 0;
		this.fsZoomBoxHeight = 0;
		this.fsZoomStage = new Array(1,1.5,2);
		this.fsZoomStageCurr = 0;

		this.fsZoomDragFlag = false;
		this.fsZoomMoveFlag = false;
		this.fsZoomStartFlag = true;

		this.fsZoomImageXClickOffset = 0;
		this.fsZoomImageYClickOffset = 0;
		this.fsZoomImageCurrX = 0;
		this.fsZoomImageCurrY = 0;
		this.fsZoomImageCurrH = 0;
		this.fsZoomImageCurrW = 0;
		this.fsZoomStartX = 0;
		this.fsZoomStartY = 0;

		this.loadUiUrl = config.loadUiUrl || null;

		this.screenWidth = 0;
		this.screenHeight = 0;

		this.videoLoaded = false;
		this.inTransition = false;

		this.currAsset = this.mainDefault;
		this.imageArr = null;
		this.spinArr = null;
		this.videoName = null;

		this.divArr = new Array();
		this.divCount = 0;

		this.baseImageUrl = 'http://i1.adis.ws/i/jpl/';
		this.baseUrl = '#@IMAGE@#?qlt=80&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.mainUrl = '#@IMAGE@#?w=' + this.mainImageWidth + '&h=' + this.mainImageHeight + '&qlt=80&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.zoomUrl = '#@IMAGE@#?w=' + this.moZoomWidth*this.moZoomRatio + '&h=' + this.moZoomHeight*this.moZoomRatio + '&qlt=80&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.thumbUrl = '#@IMAGE@#?w=' + this.thumbImageWidth + '&h=' + this.thumbImageHeight + '&qlt=80&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.spinUrl = '#@IMAGE@#?w=' + this.spinImageWidth + '&h=' + this.spinImageHeight + '&qlt=80&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
		this.videoUrl = 'http://i1.adis.ws/v/jpl/#@VIDEO@#';//' + this.videoWidth + ',' + this.videoHeight;
		this.fsZoomThumbUrl = '#@IMAGE@#?w=' + this.fsZoomThumbImageWidth + '&h=' + this.fsZoomThumbImageHeight + '&qlt=80&unsharp=0,1,1,7&img404=' + this.fascia + '_imagemissing';
	};

	imageViewer.prototype = {
		init : function() {
			var assetReq = new assetRequest({plu:this.plu,fascia:this.fascia,reqImage:!this.existImages,reqSpin:this.showSpin,spinPos:this.spinDefaultPos,reqVideo:this.showVideo});
			var self = this;
			assetReq.load(function() {
				self.imageArr = assetReq.imageArr;
				self.spinArr = assetReq.spinArr;
				self.videoName = assetReq.videoName;
				jQuery(document).ready(function () {
					self.displayMain();

					if(self.loadUiUrl != null) {
						jQuery.getScript(self.loadUiUrl, function () {
							self.displaySpin();
						});
					} else {
						self.displaySpin();
					}

					self.displayVideo();
					self.displayMoZoom();
					self.fsZoomLoad();
					self.loadDiv();
					self.displayThumb();
					self.loadDefaultView();
					self.loadNav();
				});
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
			if(this.videoName != null) {
				jQuery('#' + this.videoButtonId).click(function () {
					self.changeAsset('video');
					self.playVideo();
				});
			}
			if(this.showFsZoom !== false) {
				jQuery('#' + this.fsZoomButtonId).click(function () {
					if(self.inTransition == false) {
						self.fsZoomInit();
					}
				});
			}
			if(this.fsZoomOnImageClick !== false && this.showMoZoom !== true) {
				jQuery('#' + this.mainImageId).click(function () {
					if(self.inTransition == false) {
						self.fsZoomInit();
					}
				});
			}
		},
		loadDefaultView : function() {
			if((this.mainDefault == 'spinset' && this.spinArr == null) || (this.mainDefault == 'video' && this.videoName == null)) {
				this.mainDefault = 0;
				this.currAsset = 0;
			}
			if(isNaN(this.mainDefault)) {
				jQuery('#' + this.mainImageContainerId).css('display','none');
			}
			if(this.mainDefault != 'spinset'){
				jQuery('#' + this.spinContainerId).css('display','none');
			}
			if(this.mainDefault != 'video'){
				jQuery('#' + this.videoContainerId).css('display','none');
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
				} else if (newAsset == 'spinset') {
					newAssetCon = jQuery('#' + this.spinContainerId);
					jQuery('#' + this.spinSliderId).fadeIn('fast');
				} else if (newAsset == 'video') {
					newAssetCon = jQuery('#' + this.videoContainerId);
				}

				if(!isNaN(this.currAsset)) {
					currAssetCon = jQuery('#' + this.mainImageContainerId);
				} else if (this.currAsset == 'spinset') {
					currAssetCon = jQuery('#' + this.spinContainerId);
					jQuery('#' + this.spinSliderId).fadeOut('fast');
				} else if (this.currAsset == 'video') {
					currAssetCon = jQuery('#' + this.videoContainerId);
				}

				this.assetTransition(currAsset, newAsset, currAssetCon, newAssetCon, mainImage, mainImageSrc);
				this.currentThumb(currAsset, newAsset);
				this.setMoZoomImage(currAsset, newAsset);
			}
		},
		currentThumb : function(currAsset, newAsset) {
			if(!isNaN(currAsset)) {
				jQuery('#' + this.thumbContainerId + ' .' + this.thumbImageClass + '[rel=' + currAsset + ']').removeClass(this.thumbCurrentClass);
			} else if (currAsset == 'spinset') {
				jQuery('#' + this.spinButtonId).removeClass(this.thumbCurrentClass);
			} else if (currAsset == 'video') {
				jQuery('#' + this.videoButtonId).removeClass(this.thumbCurrentClass);
			}

			if(!isNaN(newAsset)) {
				jQuery('#' + this.thumbContainerId + ' .' + this.thumbImageClass + '[rel=' + newAsset + ']').addClass(this.thumbCurrentClass);
			} else if (newAsset == 'spinset') {
				jQuery('#' + this.spinButtonId).addClass(this.thumbCurrentClass);
			} else if (newAsset == 'video') {
				jQuery('#' + this.videoButtonId).addClass(this.thumbCurrentClass);
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
				var maxDisplay = this.imageArr.length;
				if(this.thumbImageCount < this.imageArr.length) {
					maxDisplay = this.thumbImageCount;
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
			if(this.videoName != null) {
				var videoButtonContainer = jQuery('#'+this.videoButtonContainerId);
				if(this.videoButtonOrder == 'prepend') {
					videoButtonContainer.prepend('<img class="' + this.videoButtonClass + '" id="' + this.videoButtonId + '" src="' + this.videoButtonImg + '" alt="' + this.videoButtonAlt + '" title="' + this.videoButtonAlt + '" />');
				} else {
					videoButtonContainer.append('<img class="' + this.videoButtonClass + '" id="' + this.videoButtonId + '" src="' + this.videoButtonImg + '" alt="' + this.videoButtonAlt + '" title="' + this.videoButtonAlt + '" />');
				}

			}
			if(this.showFsZoom !== false) {
				var fsZoomButtonContainer = jQuery('#'+this.fsZoomButtonContainer);
				if(this.fsZoomButtonOrder == 'prepend') {
					fsZoomButtonContainer.prepend('<img class="' + this.fsZoomButtonClass + '" id="' + this.fsZoomButtonId + '" src="' + this.fsZoomButtonImg + '" alt="' + this.fsZoomButtonAlt + '" title="' + this.fsZoomButtonAlt + '" />');
				} else {
					fsZoomButtonContainer.append('<img class="' + this.fsZoomButtonClass + '" id="' + this.fsZoomButtonId + '" src="' + this.fsZoomButtonImg + '" alt="' + this.fsZoomButtonAlt + '" title="' + this.fsZoomButtonAlt + '" />');
				}
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
		},
		displaySpin : function() {
			if(this.spinArr != null) {
				var self = this;
				var mainContainer = jQuery('#'+this.mainContainerId);
				var spinContainer = jQuery('<div id="' + this.spinContainerId + '" class="' + this.spinClass + '" style="position:relative;width:' + this.spinImageWidth + 'px;height:' + this.spinImageHeight + 'px;overflow:hidden"></div>');
				var spinInnerContainer = jQuery('<div class="' + this.spinClass + 'Inner" style="position:relative;width:' + this.spinImageWidth + 'px;height:' + this.spinImageHeight + 'px;"></div>');
				var images = this.spinArr;
				for (var i = 0; i < images.length; i++) {
					spinInnerContainer.append('<img style="display:none;-moz-user-select:none;" class="' + this.spinClass + 'Image" rel="' + i + '" src="' + this.spinUrl.replace('#@IMAGE@#', images[i]) + '" alt="' + this.spinImageAlt + '" title="' + this.spinImageAlt + '" unselectable="on" />');
				}
				spinContainer.append(spinInnerContainer);
				mainContainer.prepend(spinContainer);

				var spinSliderContainer = jQuery('#'+self.spinSliderContainerId);
				jQuery(spinSliderContainer).prepend('<div id="' + self.spinSliderId + '" class="' + self.spinSliderClass + '" title="' + self.spinSliderAlt + '"></div>');
				jQuery('#' + self.spinSliderId).slider({
					min: 0,
					max: images.length - 1
				});

				jQuery('#' + self.spinSliderId).bind('slide', function (event, ui) {
					self.setSpinPos(ui.value);
				});
				self.setSpinPos(0);

				var i;

				if(self.spinAutoPlay == true && self.currAsset == 'spinset') {
					jQuery(window).load(function() {
						setTimeout(function(){
							var counter = 0;
							i = setInterval(function(){
								self.setSpinPos(counter);
								counter++;
								if(counter === images.length) {
									setTimeout(function(){
										self.setSpinPos(0);
									},self.spinAutoPlayInterval);
									clearInterval(i);
								}
							}, self.spinAutoPlayInterval);
							jQuery('#' + self.spinSliderId).mousedown(function() {
								clearInterval(i);
							});

						},self.spinAutoPlayWait);
					});
				}

				if(this.spinOnImageClick) {
					spinContainer.on("dragstart", function(e) {
						return false;
					});

					var drag = false;
					var lastX = 0;
					spinContainer.mousedown(function(e){
						lastX = (e.pageX);
						drag = true;
						clearInterval(i);
					});

					spinContainer.mousemove(function(e){
						if(!drag) return;
						var x = (e.pageX);
						var y = (e.pageY);

						if(lastX > x + self.spinDragSensitivity) {
							self.setSpinPos(self.spinCurrPos+1);
							lastX = x;
						} else if (lastX < x - self.spinDragSensitivity) {
							self.setSpinPos(self.spinCurrPos-1);
							lastX = x;
						}
					});

					spinContainer.mouseup(function(){
						drag = false;
					});
					spinContainer.mouseleave(function(){
						drag = false;
					});
				} else {
					jQuery('.' + this.spinClass + 'Image').click(function () {
						if(self.inTransition == false) {
							self.fsZoomInit();
						}
					});
				}

				var spinButtonContainer = jQuery('#'+this.spinButtonContainerId);
				if(this.spinButtonOrder == 'prepend') {
					spinButtonContainer.prepend('<img class="' + this.spinButtonClass + '" id="' + this.spinButtonId + '" src="' + this.spinButtonImg + '" alt="' + this.spinButtonAlt + '" title="' + this.spinButtonAlt + '" />');
				} else {
					spinButtonContainer.append('<img class="' + this.spinButtonClass + '" id="' + this.spinButtonId + '" src="' + this.spinButtonImg + '" alt="' + this.spinButtonAlt + '" title="' + this.spinButtonAlt + '" />');
				}

				jQuery('#' + this.spinButtonId).click(function () {
					self.changeAsset('spinset');
				});
			}
		},
		setSpinPos : function(newPos) {
			if(newPos < 0) {
				newPos = this.spinArr.length-1;
			} else if(newPos > this.spinArr.length-1) {
				newPos = 0;
			}
			jQuery('#' + this.spinContainerId + ' .' + this.spinClass + 'Image[rel=' + this.spinCurrPos + ']').css('display','none');
			jQuery('#' + this.spinContainerId + ' .' + this.spinClass + 'Image[rel=' + newPos + ']').css('display','inline');
			if(jQuery('#' + this.spinSliderId).slider('value') != newPos) {
				jQuery('#' + this.spinSliderId).slider('value', newPos);
			}
			this.spinCurrPos = newPos;
		},
		displayVideo : function() {
			if(this.displayVideo) {
				var mainContainer = jQuery('#'+this.mainContainerId);
				var videoContainer = jQuery('<div id="' + this.videoContainerId + '" class="' + this.videoClass + '" style="position:relative;width:' + this.videoWidth + 'px;height:' + this.videoHeight + 'px;overflow:hidden"></div>');
				mainContainer.prepend(videoContainer);
			}
		},
		playVideo : function() {
			if(!this.videoLoaded) {
				var videoContainer = jQuery('#' + this.videoContainerId);
				var iframe = jQuery('<iframe src="' + this.videoUrl.replace('#@VIDEO@#', this.videoName) + '" style="width:' + this.videoWidth + 'px;height:' + this.videoHeight + 'px;border:0" frameBorder="no"></iframe>');
				videoContainer.empty();
				videoContainer.prepend(iframe);
				this.videoLoaded = true;
			}
		},
		displayMoZoom : function() {
			if(this.showMoZoom !== false) {
				if(this.moZoomContainerId != null) {
					var moZoomWidth = this.moZoomWidth;
					var moZoomHeight = this.moZoomHeight;

					var hRatio = this.mainImageHeight * this.moZoomRatio / this.moZoomWidth;
					var wRatio = this.mainImageWidth * this.moZoomRatio / this.moZoomHeight;

					var overId = this.moZoomOverId;
					var overHeight = this.mainImageHeight / hRatio;
					var overWidth = this.mainImageWidth / wRatio;
					var moZoomContainerId = this.moZoomContainerId;
					var moZoomContainerClass = this.moZoomContainerClass;
					var moZoomDiv = jQuery('#' + this.moZoomContainerId);
					var mainImageContainer = jQuery('#' + this.mainImageContainerId);

					var moZoomContainer = jQuery('<div class="' + this.moZoomContainerClass + '" style="display:none;position:relative;overflow:hidden;width:' + this.moZoomWidth + 'px;height:' + this.moZoomHeight + 'px;"></div>');
					var moZoomOver = jQuery('<div id="' + this.moZoomOverId + '" class="' + this.moZoomOverClass + '" style="position:absolute;width:' + overWidth + 'px;height:' + overHeight + 'px;display:none;"></div>');

					if(this.imageArr !== null) {
						var imageToLoad = 0;
						if(!isNaN(this.currAsset)) {
							imageToLoad = this.currAsset;
						}
						var moZoomImage = jQuery('<img style="position:relative;" src="' + this.zoomUrl.replace('#@IMAGE@#', this.imageArr[imageToLoad]) + '" />');
					}
					moZoomDiv.append(moZoomContainer);
					mainImageContainer.append(moZoomOver);
					moZoomContainer.append(moZoomImage);

					mainImageContainer.mousemove(function(e){
						var offset = jQuery(this).offset();
						var x = (e.pageX - offset.left);
						var y = (e.pageY - offset.top);

						if(x < 0 + (overWidth/2)) {
							x = (overWidth/2);
						} else if (x > moZoomWidth - (overWidth/2)) {
							x = moZoomWidth - (overWidth/2);
						}

						if(y < 0 + (overHeight/2)) {
							y = (overHeight/2);
						} else if (y > moZoomWidth - (overHeight/2)) {
							y = moZoomHeight - (overHeight/2);
						}

						var x1 = x * wRatio - (moZoomWidth/2);
						var y1 = y * hRatio - (moZoomHeight/2);

						var x2 = x - (overWidth/2);
						var y2 = y - (overHeight/2);

						jQuery('#' + moZoomContainerId + ' .' + moZoomContainerClass).css('display', 'block');
						jQuery('#' + moZoomContainerId + ' img').css({
							left: -x1,
							top:  -y1
						});
						jQuery('#' + overId + '').css('display', 'block');
						jQuery('#' + overId).css({
							left: x2,
							top: y2
						});
					});

					mainImageContainer.mouseleave(function(e){
						jQuery('#' + moZoomContainerId + ' .' + moZoomContainerClass).css('display', 'none');
						jQuery('#' + overId + '').css('display', 'none');
					});
				}
			}
		},
		setMoZoomImage : function(currAsset, newAsset) {
			if(this.showMoZoom !== false) {
				if(!isNaN(newAsset)) {
					var moZoomImage = jQuery('#' + this.moZoomContainerId + ' img');
					var moZoomImageSrc = this.zoomUrl.replace('#@IMAGE@#', this.imageArr[newAsset]);
					moZoomImage.attr('src', moZoomImageSrc);
					moZoomImage.load(function () {

					});
				}
			}
		},
		fsZoomLoad : function() {
			if(this.showFsZoom) {

				this.fsZoomDisplayLightbox();
				this.fsZoomSetDimensions();
				this.fsZoomDisplayThumbs();
				this.fsZoomDisplayNav();
				this.fsZoomLoadNav();
			}
		},
		fsZoomInit : function() {
			this.fsZoomSetDimensions();
			this.fsZoomLoadImage();
			jQuery('#' + this.fsZoomLightboxId).fadeIn(300);
		},
		fsZoomSetDimensions : function() {
			var lightboxInner = jQuery('#' + this.fsZoomLightboxInnerId);
			var imageContainer = jQuery('#' + this.fsZoomImageContainerId);
			var ratio = this.mainImageWidth / this.mainImageHeight;
			this.screenWidth = (jQuery(window).width()).toFixed(0);
			this.screenHeight = (jQuery(window).height()).toFixed(0);

			if(this.screenWidth > this.fsLightboxMaxWidth) {
				this.fsLightboxWidth = this.fsLightboxMaxWidth;
			} else {
				this.fsLightboxWidth = this.screenWidth;
			}

			if(this.screenHeight > this.fsLightboxMaxHeight) {
				this.fsLightboxHeight = this.fsLightboxMaxHeight;
			} else {
				this.fsLightboxHeight = this.screenHeight;
			}

			if(this.screenWidth > this.fsZoomImageMaxWidth) {
				this.fsZoomBoxWidth = this.fsZoomImageMaxWidth;
			} else {
				this.fsZoomBoxWidth = this.screenWidth;
			}

			if(this.screenHeight > this.fsZoomImageMaxHeight) {
				this.fsZoomBoxHeight = this.fsZoomImageMaxHeight;
			} else {
				this.fsZoomBoxHeight = this.screenHeight;
			}

			if(ratio < 1) {
				this.fsZoomBoxWidth = this.fsZoomBoxHeight * ratio;
			} else {
				this.fsZoomBoxWidth = this.fsZoomBoxHeight / ratio;
			}

			this.fsZoomImageWidth = this.fsZoomBoxWidth;
			this.fsZoomImageHeight = this.fsZoomBoxHeight;

			this.fsZoomImageCurrH = this.fsZoomImageHeight;
			this.fsZoomImageCurrW = this.fsZoomImageWidth;

			lightboxInner.css({
				height: this.fsLightboxHeight,
				width:  this.fsLightboxWidth,
				'margin-top': (this.screenHeight-this.fsLightboxHeight)/2
			});

			imageContainer.css({
				height: this.fsZoomBoxHeight,
				width:  this.fsZoomBoxWidth
			});

			this.changeZoom('reset',null,null, false);
		},

		fsZoomLoadNav: function() {
			var self = this;
			var fsZoomImageContainer = jQuery('#' + self.fsZoomImageContainerId);
			var fsZoomImageInnerContainer = jQuery('#' + self.fsZoomImageInnerContainerId);
			var fsZoomImage = jQuery('#' + self.fsZoomImageId);

			jQuery('#' + this.fsZoomLightboxId).click(function(){
				if(self.fsZoomDragFlag != true) {
					jQuery('#' + self.fsZoomLightboxId).fadeOut('fast');
					self.changeZoom('reset',null,null, false);
				}
			}).children().click(function(e) {
				return false;
			});

			jQuery('#'+this.fsZoomCloseButtonId).click(function(){
				jQuery('#' + self.fsZoomLightboxId).fadeOut('fast');
				self.changeZoom('reset',null,null, false);
			});

			var thumbImages = this.imageArr;
			jQuery('#' + this.fsZoomThumbContainerId + ' .' + this.fsZoomThumbImageClass).click(function () {
				var thumbId = jQuery(this).attr('rel');
				if(self.currAsset != thumbId) {
					self.currAsset = thumbId;
					self.changeZoom('reset',null,null, true);
				}
			});

			jQuery('#' + this.fsZoomInButtonId).click(function () {
				self.changeZoom('in',null,null, false);
			});

			jQuery('#' + this.fsZoomOutButtonId).click(function () {
				self.changeZoom('out',null,null, false);
			});

			jQuery('#' + this.fsZoomResetButtonId).click(function () {
				self.changeZoom('reset',null,null, false);
			});

			fsZoomImageContainer.mousemove(function(e){
				if(self.fsZoomDragFlag)
				{
					var offset = jQuery(this).offset();
					var x = (e.pageX - offset.left);
					var y = (e.pageY - offset.top);

					if(self.fsZoomStartFlag) {
						self.fsZoomStartX = x;
						self.fsZoomStartY = y;
						self.fsZoomStartFlag = false;
					}

					var setX = (self.fsZoomImageXClickOffset) - (x) - ((self.fsZoomStartX-x)*2);
					var setY = (self.fsZoomImageYClickOffset) - (y) - ((self.fsZoomStartY-y)*2);

					self.fsZoomChangePosition(setX,setY,self.fsZoomImageCurrW,self.fsZoomImageCurrH,false);
					self.fsZoomMoveFlag = true;
				}
			});

			fsZoomImageContainer.mousedown(function (e) {
				e.preventDefault();

				var offset = jQuery(this).offset();
				self.fsZoomImageXClickOffset = (e.pageX - offset.left) + self.fsZoomImageCurrX;
				self.fsZoomImageYClickOffset = (e.pageY - offset.top) + self.fsZoomImageCurrY;
				self.fsZoomDragFlag = true;
			});

			fsZoomImageContainer.mouseup(function (e) {
				self.fsZoomDragFlag = false;
				self.fsZoomStartFlag = true;

				if(e.target.id == self.fsZoomInButtonId || e.target.id == self.fsZoomOutButtonId ||e.target.id == self.fsZoomResetButtonId || e.target.id == self.fsZoomCloseButtonId || e.target.className == self.fsZoomThumbImageClass) {
					self.fsZoomMoveFlag = true;
				}

				if(!self.fsZoomMoveFlag) {
					var offset = fsZoomImageInnerContainer.offset();
					var XClickEnd = (e.pageX - offset.left);
					var YClickEnd = (e.pageY - offset.top);

					self.changeZoom('in', XClickEnd, YClickEnd);
				}

				self.fsZoomMoveFlag = false;
			});

			fsZoomImageContainer.mouseout(function () {
				self.fsZoomDragFlag = false;
				self.fsZoomMoveFlag = false;
			});
		},
		fsZoomLoadImage: function() {
			var imageContainer = jQuery('#' + this.fsZoomImageInnerContainerId);
			var allImage = jQuery('#' + this.fsZoomImageInnerContainerId + ' img:not(#' + this.fsZoomImageId + '_' + this.currAsset + '_' + this.fsZoomStageCurr + ')');
			var newImage = jQuery('#' + this.fsZoomImageId + '_' + this.currAsset + '_' + this.fsZoomStageCurr);

			if(jQuery('#' + this.fsZoomImageId + '_' + this.currAsset + '_' + this.fsZoomStageCurr).length > 0) {
				allImage.fadeOut(0, function () {
					newImage.fadeIn(0, function () {

					});
				});
			} else {
				var imageToLoad = '';
				var assetToLoad = 0;
				if(!isNaN(this.currAsset)) {
					assetToLoad = this.currAsset;
				} else {
					this.changeAsset(0);
				}
				imageToLoad = this.baseUrl.replace('#@IMAGE@#', this.imageArr[this.currAsset]) + '&w=' + (this.fsZoomImageWidth*this.fsZoomStage[this.fsZoomStageCurr]).toFixed(0) + '&h=' + (this.fsZoomImageHeight*this.fsZoomStage[this.fsZoomStageCurr]).toFixed(0) + '';

				imageContainer.append('<img style="position:relative;width:100%;height:100%;-moz-user-select: none;-webkit-user-select: none;user-select: none;" id="' + this.fsZoomImageId + '_' + this.currAsset + '_' + this.fsZoomStageCurr + '" class="' + this.fsZoomImageClass + '" src="' + imageToLoad + '" alt="' + this.fsZoomImageAlt + '" title="' + this.fsZoomImageAlt + '" />');

				allImage = jQuery('#' + this.fsZoomImageInnerContainerId + ' img:not(#' + this.fsZoomImageId + '_' + this.currAsset + '_' + this.fsZoomStageCurr + ')');
				newImage = jQuery('#' + this.fsZoomImageId + '_' + this.currAsset + '_' + this.fsZoomStageCurr);

				newImage.load(function () {
					allImage.fadeOut(0, function () {
						newImage.fadeIn(0, function () {

						});
					});
				});
			}
		},
		fsZoomDisplayLightbox: function() {
			var lightbox =
			'<div id="' + this.fsZoomLightboxId + '" style="display:none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;//background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiYGBg2AwQYAAAuAC01qHx9QAAAABJRU5ErkJggg==) repeat;background: rgba(0, 0, 0, .8);z-index:9998;">' +
			'<div id="' + this.fsZoomLightboxInnerId + '" class="' + this.fsZoomLightboxInnerClass + '" style="position: relative;margin:auto;padding:0;background-color:#FFF;z-index:9998;" >' +
			'<div id="' + this.fsZoomLightboxInnerId + '2" class="' + this.fsZoomLightboxInnerClass + '2" style="position: relative;height:100%;width:100%;overflow:hidden;z-index:9998;" >' +
			'<div id="' + this.fsZoomImageContainerId + '" class="' + this.fsZoomImageContainerClass + '" style="position: relative;margin:auto;z-index:9998;" >' +
			'<div id="' + this.fsZoomImageInnerContainerId + '" style="position:relative;display:block;"></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';
			var mainContainer;
			if(this.fsZoomContainerId != null) {
				mainContainer = jQuery('#'+this.fsZoomContainerId);
			} else {
				mainContainer = jQuery('body');
			}
			mainContainer.prepend(lightbox);
		},
		fsZoomDisplayThumbs: function() {
			var thumbContainer = jQuery('#'+this.fsZoomThumbContainerId);
			var thumbContainerInner = jQuery('<div id="' + this.fsZoomThumbContainerInnerId + '" class="' + this.fsZoomThumbContainerInnerClass + '" style="z-index:9999;"></div>');
			var images = this.imageArr;
			if(images != null) {
				var maxDisplay = this.thumbImageCount || images.length;
				for (var i = 0; i < maxDisplay; i++) {
					thumbContainerInner.append('<img class="' + this.fsZoomThumbImageClass + '" rel="' + (i) + '" src="' + this.fsZoomThumbUrl.replace('#@IMAGE@#', images[i]) + '" alt="' + this.fsZoomThumbImageAlt + '" title="' + this.fsZoomThumbImageAlt + '" style="z-index:9999;" />');
				}
			}
			thumbContainer.prepend(thumbContainerInner);
		},
		fsZoomDisplayNav: function() {
			var navContainer = jQuery('#'+this.fsZoomNavContainerId);
			var navContainerInner = jQuery('<div id="' + this.fsZoomNavContainerInnerId + '" class="' + this.fsZoomNavContainerInnerClass + '" style="z-index:9999;"></div>');
			navContainerInner.append('<div id="' + this.fsZoomInButtonId + '" class="' + this.fsZoomInButtonClass + '" style="z-index:9999;">Zoom In</div>');
			navContainerInner.append('<div id="' + this.fsZoomOutButtonId + '" class="' + this.fsZoomOutButtonClass + '" style="z-index:9999;">Zoom Out</div>');
			navContainerInner.append('<div id="' + this.fsZoomResetButtonId + '" class="' + this.fsZoomResetButtonClass + '" style="z-index:9999;">Zoom Reset</div>');
			navContainer.append(navContainerInner);

			var closeButtonContainer = jQuery('#'+this.fsZoomCloseButtonContainerId);
			closeButtonContainer.append('<div id="' + this.fsZoomCloseButtonId + '" class="' + this.fsZoomCloseButtonClass + '">Close</div>');

		},
		changeZoom: function(direction, XClick, YClick, assetChange) {
			var stageChanged = false;

			if(direction == 'in' && ((this.fsZoomStage.length-1) > this.fsZoomStageCurr))
			{
				this.fsZoomStageCurr++;
				stageChanged = true;
			} else if(direction == 'out' && ((this.fsZoomStageCurr > 0)))
			{
				this.fsZoomStageCurr--;
				stageChanged = true;
			} else if(direction == 'reset' && (this.fsZoomStageCurr != 0 || assetChange)) {
				this.fsZoomStageCurr = 0;
				stageChanged = true;
			}

			if(stageChanged) {
				if(isNaN(XClick) || XClick === null) {
					XClick = (this.fsZoomBoxWidth/2).toFixed(0);
				}

				if(isNaN(YClick) || YClick === null) {
					YClick = (this.fsZoomBoxHeight/2).toFixed(0);
				}

				var newHeight = (this.fsZoomImageHeight * this.fsZoomStage[this.fsZoomStageCurr]).toFixed(0);
				var newWidth = (this.fsZoomImageWidth * this.fsZoomStage[this.fsZoomStageCurr]).toFixed(0);

				var newX = XClick - ((this.fsZoomBoxWidth/2) - ((newWidth - this.fsZoomImageWidth)/2)).toFixed(0);
				var newY = YClick - ((this.fsZoomBoxHeight/2) - ((newHeight - this.fsZoomImageHeight)/2)).toFixed(0);

				this.fsZoomChangePosition(-newX,-newY,newWidth,newHeight,true);
				this.fsZoomLoadImage();
			}
		},
		fsZoomChangePosition: function(newX, newY, newWidth, newHeight, animate) {
			var fsZoomImage = jQuery('#' + this.fsZoomImageInnerContainerId);

			if(newX < -(newWidth-this.fsZoomBoxWidth)) {
				newX = -(newWidth-this.fsZoomBoxWidth);
			} else if(newX > 0) {
				newX = 0;
			}

			if(newY < -(newHeight-this.fsZoomBoxHeight)) {
				newY = -(newHeight-this.fsZoomBoxHeight);
			} else if(newY > 0) {
				newY = 0;
			}

			if(animate) {
				fsZoomImage.animate({
					top: newY,
					left: newX,
					width: newWidth,
					height: newHeight
				},300);
			} else {
				fsZoomImage.css({
					left: newX,
					top:  newY
				});
			}
			this.fsZoomImageCurrX = newX;
			this.fsZoomImageCurrY = newY;
			this.fsZoomImageCurrH = newHeight;
			this.fsZoomImageCurrW = newWidth;
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
		this.reqSpin = config.reqSpin;
		this.reqVideo = config.reqVideo;
		this.dupSpinFirst = true;
		this.spinPos = config.spinPos

		this.imageArr = null;
		this.spinArr = null;
		this.videoArr = null;

		this.imageExt = '_is';
		this.spinExt = '_spin';
		this.videoExt = '_vid';
		this.imageReqType = 's';
		this.spinReqType = 's';
		this.videoReqType = 'v';
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
				self.createScript(plu, fascia, self.spinExt, self.spinReqType, self.reqSpin, function(inArg) {
					self.createSpinSet(inArg);
					self.createScript(plu, fascia, self.videoExt, self.videoReqType, self.reqVideo, function(inArg) {
						self.createVideoSet(inArg);
						callback();
					});
				});
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
		},
		createSpinSet: function(obj) {
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

			if(this.spinPos != 0) {
				var tempArr = assetArr.splice(0, this.spinPos-1);
				for(var i=0; i<tempArr.length; i++){
					assetArr.push(tempArr[i]);
				}
			}

			if(assetArr.length < 1) {
				assetArr = null;
			} else if(this.dupSpinFirst) {
				assetArr[assetArr.length] = assetArr[0];
			}
			this.spinArr = assetArr;
		},
		createVideoSet: function(obj) {
			var videoName = null;
			if(obj != null) {
				var assetArr = obj['id'];
				if(assetArr != null) {
					videoName = this.plu + this.videoExt
				}
			}
			this.videoName = videoName;
		}
	}

	jQuery('#scene7wrapper').empty();
	var config = {
		plu:plu,
		fascia:'sz',
		mainContainerId:'main',
		thumbContainerId:'thumbs',
		mainDefault:'spinset',
		showVideo:false,
		mainImageWidth:370,
		mainImageHeight:415,
		thumbImageWidth:61,
		thumbImageHeight:69,
		spinAutoPlay:true,
		showMoZoom:false,
		showFsZoom:true,
		fsZoomButtonId:'clicktozoom',
		fsZoomButtonContainer:'extraButtons',
		fsZoomButtonImg:'/images/button_clicktozoom.png',
		fsZoomThumbImageWidth:45,
		fsZoomThumbImageHeight:51,
		fsZoomThumbContainerId:'fsZoomLightboxInner_1',
		fsZoomNavContainerId:'fsZoomLightboxInner_1',
		videoButtonContainer:'extraButtons',
		videoButtonImg:'/images/button_watchvideo.png',
		spinButtonContainer:'thumbs',
		spinButtonImg:'/images/360-icon.png',
		spinButtonOrder:'prepend',
		spinSliderContainerId:'product',
		spinSliderId:'slider',
		spinContainerId:'spinContainer',
		spinDefaultPos:3,
		loadUiUrl:'/js/jquery-ui-1.8.12.custom.min.js'
	};
	var viewer = new imageViewer(1, config);
	var details = jQuery('#productName').html();
	details = details + jQuery('#ratingsReviewsWrapper').html();
	details = details + jQuery('.product-colour').html();
	viewer.addDiv('fsZoomThumb1','extraDetails','','prepend',details);
	viewer.init();

}
