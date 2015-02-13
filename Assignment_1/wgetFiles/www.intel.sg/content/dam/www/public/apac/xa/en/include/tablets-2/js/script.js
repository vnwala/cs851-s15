(function($){
	// console.log($(window).width());
	window.ssiInit = function(){
		// console.log($(window).width());
		var query = (function(queryString) {
				var params = {},queries,temp,i,l;
				queries = queryString.split("&");
				if(queries.length) {
					queries[0] = queries[0].substring(1);
				}
				for(i=0,l=queries.length;i<l;i++) {
					temp = queries[i].split('=');
					params[temp[0]] = temp[1];
				}
				return params;
			})(location.search),
			debugWidth = query['debugWidth'],
			$content = $('#ssi-content'),
			$window = $(window),
			animations = {},
			isReady = false,
			readyTriggered = false,
			imageCache = {},
			breakpoints = [
				{width:1500,actual:1500},
				{width:1200,actual:1200},
				{width:768,actual:768},
				{width:360,actual:320}
			],
			setWidth = function(){
				var width = debugWidth || $window.width();
				// console.log('setWidth',width,isReady);
				if(!width) {
					return;
				}
				$.each(breakpoints,function(i,e){
					if(width >= e.actual) {
						width = e.width;
						return false;
					}
				});
				if(width < breakpoints[breakpoints.length-1].actual) {
					width = breakpoints[breakpoints.length-1].width;
				}
				var cls = 'w'+width;
				if(!$content.hasClass(cls)) {
					// console.log('setting width',width,debugWidth);
					if(typeof animations.current !== 'undefined') {
						animations.current.destroy();
					}
					$content.removeClass().addClass(cls);
					animations.current = animations[cls];
					animations.current.init();
					$('#ssi-content img[data-src]').each(function(i,e){
						var $this = $(this),
							src = $(this).data('src').split('/'),
							last = src.pop();
						src.push(width,last);
						src = src.join('/');
						if(!imageCache.hasOwnProperty(src)) {
							imageCache[src] = $('<img/>');
							imageCache[src].attr('src',src);
						}
						$this.attr('src',src);
					});
				}
				// console.log(isReady, readyTriggered);
				if(isReady){
					$content.addClass('ready');
				}
				if(isReady && !readyTriggered){
					readyTriggered = true;
					animations.current.ready();
					// console.log(isReady, readyTriggered);
				}
			};
			
		/***** 1500 *****/
		animations.w1500 = {
			ready:function(){
				// TweenMax.fromTo('#ssi-content .section-1 .clipping .device', 1, {css:{marginLeft:0}}, {css:{marginLeft:150}, delay:1});
				// TweenMax.fromTo('#ssi-content .section-1 .text', 1, {css:{autoAlpha:0}}, {css:{autoAlpha:1},delay:1});
			},
			init:function(){
				var a = animations.w1500.vars = {};
				a.controller = new ScrollMagic();
				/* a.section2Parallax = new ScrollScene({
					triggerElement:'#ssi-content .section-2', 
					duration:$('#ssi-content .section-2').height()
				}).setTween(TweenMax.fromTo('#ssi-content .section-2 .parallax', 0.5, {top:0}, {top:-177})).addTo(a.controller); */
				a.section2Parallax = new ScrollScene({
					triggerElement:'#ssi-content .section-2',
					triggerHook:1,
					duration:$(window).height()*2
				}).setPin('#ssi-content .section-2 .parallax').addTo(a.controller);
				a.section2FadeTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-2 .blurb-1', 165, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:0}),
						TweenMax.to('#ssi-content .section-2 .blurb-1', 30, {css:{autoAlpha:0},delay:245}),
						TweenMax.fromTo('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:275}),
						// TweenMax.to('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0},delay:385}),
						// TweenMax.fromTo('#ssi-content .section-2 .blurb-3', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:415})
					]);
				a.section2Fade = new ScrollScene({
					triggerElement:'#ssi-content .section-2',
					offset:150,
					duration:445
				}).setTween(a.section2FadeTimeline).addTo(a.controller);
				a.section3EffectsTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-3 .info-1', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:0}),
						TweenMax.fromTo('#ssi-content .section-3 .device-1', 200, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:300}),
						// TweenMax.fromTo('#ssi-content .section-3 .device-1 .device-1a', 20, {css:{rotation:0,top:90,marginLeft:0}}, {css:{top:70}, delay:500}),
						// TweenMax.to('#ssi-content .section-3 .device-1 .device-1a', 90, {css:{rotation:10,top:-20,marginLeft:-20}, delay:520}),
						TweenMax.fromTo('#ssi-content .section-3 .device-2', 150, {css:{autoAlpha:0,marginLeft:-150}}, {css:{autoAlpha:1,marginLeft:0},delay:870}),
						TweenMax.fromTo('#ssi-content .section-3 .info-2', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:1200}),
						TweenMax.fromTo('#ssi-content .section-3 .device-3', 150, {css:{autoAlpha:0,marginLeft:150}}, {css:{autoAlpha:1,marginLeft:0},delay:1760}),
						TweenMax.fromTo('#ssi-content .section-3 .info-3', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:2030})
					]);
				a.section3Effects = new ScrollScene({
					triggerElement:'#ssi-content .section-3',
					offset:-120,
					duration:2330
				}).setTween(a.section3EffectsTimeline).addTo(a.controller);
				/* a.section5Info4 = new ScrollScene({
					triggerElement:'#ssi-content .section-5 .info-4',
					offset:-300,
					duration:300
				}).setTween(TweenMax.fromTo('#ssi-content .section-5 .info-4', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:0})).addTo(a.controller); */
				a.section6EffectsTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-1', 200, {css:{left:200,autoAlpha:0}}, {css:{left:0,autoAlpha:1}, delay:0}),
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-2', 100, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:100}),
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-3', 200, {css:{right:200,autoAlpha:0}}, {css:{right:0,autoAlpha:1}, delay:0})
					]);
				a.section6Effects = new ScrollScene({
					triggerElement:'#ssi-content .section-6 .columns-1',
					offset:-100,
					duration:200
				}).setTween(a.section6EffectsTimeline).addTo(a.controller);
				a.section8Fade = new ScrollScene({
					triggerElement:'#ssi-content .section-8',
					duration:100
				}).setTween(TweenMax.fromTo('#ssi-content .section-8 .inner', 0.5, {css:{autoAlpha:0}}, {css:{autoAlpha:1}})).addTo(a.controller);
			},
			resize:function(){
				if(typeof animations.w1500.vars === 'undefined') {
					// console.log('animations.w1500.vars === undefined');
					return;
				}
				var a = animations.w1500.vars;
				if(typeof a.section2Parallax === 'undefined') {
					// console.log('animations.w1500.vars.section2Parallax === undefined');
					return;
				}
				if(typeof a.section8Fade === 'undefined') {
					// console.log('animations.w1500.vars.section2Parallax === undefined');
					return;
				}
				
				var imageWidth = 1619,
					imageHeight = 1079,
					windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					scale = Math.max(windowWidth/imageWidth,windowHeight/imageHeight);
				$('#ssi-content .section-2 .parallax').css({
					marginTop:-windowHeight
				});
				$('#ssi-content .section-2 .parallax img').css({
					width:imageWidth*scale,
					marginLeft:-imageWidth*scale/2,
					marginTop:-imageHeight*scale/2,
					left:windowWidth/2,
					top:windowHeight/2
				});
				a.section2Parallax
					.duration(windowHeight + $('#ssi-content .section-2').height());
				
				a.section8Fade
					.duration($('#ssi-content .section-8').height()/2);
			},
			destroy:function(){
				animations.w1500.vars.controller.destroy(true);
			}
		};
		
		/***** 1200 *****/
		animations.w1200 = {
			ready:function(){
				// TweenMax.fromTo('#ssi-content .section-1 .clipping .device', 1, {css:{marginLeft:0}}, {css:{marginLeft:120}, delay:1});
				// TweenMax.fromTo('#ssi-content .section-1 .text', 1, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:1});
			},
			init:function(){
				var a = animations.w1200.vars = {};
				a.controller = new ScrollMagic();
				/* a.section2Parallax = new ScrollScene({
					triggerElement:'#ssi-content .section-2', 
					duration:$('#ssi-content .section-2').height()
				}).setTween(TweenMax.fromTo('#ssi-content .section-2 .parallax', 0.5, {top:0}, {top:-177})).addTo(a.controller); */
				a.section2Parallax = new ScrollScene({
					triggerElement:'#ssi-content .section-2',
					triggerHook:1,
					duration:$(window).height()*2
				}).setPin('#ssi-content .section-2 .parallax').addTo(a.controller);
				/* a.section2FadeTimeline = new TimelineMax()
					.add(TweenMax.fromTo('#ssi-content .section-2 .blurb-1', 165, {css:{autoAlpha:0}}, {css:{autoAlpha:1}}))
					.add(TweenMax.to('#ssi-content .section-2 .blurb-1', 30, {css:{autoAlpha:0},delay:80}))
					.add(TweenMax.fromTo('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}}))
					.add(TweenMax.to('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0},delay:80}))
					.add(TweenMax.fromTo('#ssi-content .section-2 .blurb-3', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}})); */
				a.section2FadeTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-2 .blurb-1', 165, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:0}),
						TweenMax.to('#ssi-content .section-2 .blurb-1', 30, {css:{autoAlpha:0},delay:245}),
						TweenMax.fromTo('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:275})
					]);
				a.section2Fade = new ScrollScene({
					triggerElement:'#ssi-content .section-2',
					offset:150,
					duration:445
				}).setTween(a.section2FadeTimeline).addTo(a.controller);
				a.section3EffectsTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-3 .info-1', 240, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:0}),
						TweenMax.fromTo('#ssi-content .section-3 .device-1', 160, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:342}),
						TweenMax.fromTo('#ssi-content .section-3 .device-2', 120, {css:{autoAlpha:0,marginLeft:-150}}, {css:{autoAlpha:1,marginLeft:0},delay:1267}),
						TweenMax.fromTo('#ssi-content .section-3 .info-2', 240, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:1600}),
						TweenMax.fromTo('#ssi-content .section-3 .device-3', 120, {css:{autoAlpha:0,marginLeft:150}}, {css:{autoAlpha:1,marginLeft:0},delay:2102}),
						TweenMax.fromTo('#ssi-content .section-3 .info-3', 240, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:2450})
					]);
				a.section3Effects = new ScrollScene({
					triggerElement:'#ssi-content .section-3',
					offset:-212,
					duration:2690
				}).setTween(a.section3EffectsTimeline).addTo(a.controller);
				/* a.section5Info4 = new ScrollScene({
					triggerElement:'#ssi-content .section-5 .info-4-trigger',
					offset:-240,
					duration:240
				}).setTween(TweenMax.fromTo('#ssi-content .section-5 .info-4', 240, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:0})).addTo(a.controller); */
				a.section6EffectsTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-1', 150, {css:{left:200,autoAlpha:0}}, {css:{left:0,autoAlpha:1}, delay:0}),
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-2', 75, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:75}),
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-3', 150, {css:{right:200,autoAlpha:0}}, {css:{right:0,autoAlpha:1}, delay:0})
					]);
				a.section6Effects = new ScrollScene({
					triggerElement:'#ssi-content .section-6 .columns-1',
					offset:-75,
					duration:150
				}).setTween(a.section6EffectsTimeline).addTo(a.controller);
				a.section8Fade = new ScrollScene({
					triggerElement:'#ssi-content .section-8',
					duration:100
				}).setTween(TweenMax.fromTo('#ssi-content .section-8 .inner', 0.5, {css:{autoAlpha:0}}, {css:{autoAlpha:1}})).addTo(a.controller);
			},
			resize:function(){
				if(typeof animations.w1200.vars === 'undefined') {
					// console.log('animations.w1200.vars === undefined');
					return;
				}
				var a = animations.w1200.vars;
				if(typeof a.section2Parallax === 'undefined') {
					// console.log('animations.w1200.vars.section2Parallax === undefined');
					return;
				}
				if(typeof a.section8Fade === 'undefined') {
					// console.log('animations.w1200.vars.section2Parallax === undefined');
					return;
				}
				/* a.section2Parallax
					.offset(-$window.height()/2)
					.duration($('#ssi-content .section-2').height()+$window.height()-$content.offset().top); */
				var imageWidth = 1503,
					imageHeight = 934,
					windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					scale = Math.max(windowWidth/imageWidth,windowHeight/imageHeight);
				$('#ssi-content .section-2 .parallax').css({
					marginTop:-windowHeight
				});
				$('#ssi-content .section-2 .parallax img').css({
					width:imageWidth*scale,
					marginLeft:-imageWidth*scale/2,
					marginTop:-imageHeight*scale/2,
					left:windowWidth/2,
					top:windowHeight/2
				});
				a.section2Parallax
					.duration(windowHeight + $('#ssi-content .section-2').height());
				
				a.section8Fade
					.duration($('#ssi-content .section-8').height()/2);
			},
			destroy:function(){
				animations.w1200.vars.controller.destroy(true);
			}
		};
		
		/***** 768 *****/
		animations.w768 = {
			ready:function(){
				// TweenMax.fromTo('#ssi-content .section-1 .clipping .device', 1, {css:{marginLeft:0}}, {css:{marginLeft:150}, delay:1});
				// TweenMax.fromTo('#ssi-content .section-1 .text', 1, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:1});
			},
			init:function(){
				var a = animations.w768.vars = {};
				a.controller = new ScrollMagic();
				/* a.section2Parallax = new ScrollScene({
					triggerElement:'#ssi-content .section-2', 
					duration:$('#ssi-content .section-2').height()
				}).setTween(TweenMax.fromTo('#ssi-content .section-2 .parallax', 1, {top:0}, {top:-177})).addTo(a.controller); */
				a.section2Parallax = new ScrollScene({
					triggerElement:'#ssi-content .section-2',
					triggerHook:1,
					duration:$(window).height()*2
				}).setPin('#ssi-content .section-2 .parallax').addTo(a.controller);
				/* a.section2FadeTimeline = new TimelineMax()
					.add(TweenMax.fromTo('#ssi-content .section-2 .blurb-1', 165, {css:{autoAlpha:0}}, {css:{autoAlpha:1}}))
					.add(TweenMax.to('#ssi-content .section-2 .blurb-1', 30, {css:{autoAlpha:0},delay:80}))
					.add(TweenMax.fromTo('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}}))
					.add(TweenMax.to('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0},delay:80}))
					.add(TweenMax.fromTo('#ssi-content .section-2 .blurb-3', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}})); */
				a.section2FadeTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-2 .blurb-1', 165, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:0}),
						TweenMax.to('#ssi-content .section-2 .blurb-1', 30, {css:{autoAlpha:0},delay:245}),
						TweenMax.fromTo('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:275}),
						TweenMax.to('#ssi-content .section-2 .blurb-2', 30, {css:{autoAlpha:0},delay:385}),
						TweenMax.fromTo('#ssi-content .section-2 .blurb-3', 30, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:415})
					]);
				a.section2Fade = new ScrollScene({
					triggerElement:'#ssi-content .section-2',
					offset:150,
					duration:445
				}).setTween(a.section2FadeTimeline).addTo(a.controller);
				a.section3EffectsTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-3 .info-1', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:0}),
						TweenMax.fromTo('#ssi-content .section-3 .device-1', 200, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:0}),
						TweenMax.fromTo('#ssi-content .section-3 .device-1 .device-1a', 20, {css:{rotation:0,top:90,marginLeft:0}}, {css:{top:70}, delay:200}),
						TweenMax.to('#ssi-content .section-3 .device-1 .device-1a', 90, {css:{rotation:10,top:-20,marginLeft:-20}, delay:220}),
						TweenMax.fromTo('#ssi-content .section-3 .device-2', 150, {css:{autoAlpha:0,marginLeft:-150}}, {css:{autoAlpha:1,marginLeft:0}, delay:895}),
						TweenMax.fromTo('#ssi-content .section-3 .info-2', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:895}),
						TweenMax.fromTo('#ssi-content .section-3 .device-3', 150, {css:{autoAlpha:0,marginLeft:150}}, {css:{autoAlpha:1,marginLeft:0}, delay:1745}),
						TweenMax.fromTo('#ssi-content .section-3 .info-3', 300, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:1745})
					]);
				a.section3Effects = new ScrollScene({
					triggerElement:'#ssi-content .section-3',
					offset:-184,
					duration:2045
				}).setTween(a.section3EffectsTimeline).addTo(a.controller);
				/* a.section5Info4 = new ScrollScene({
					triggerElement:'#ssi-content .section-5 .info-4',
					offset:-150,
					duration:150
				}).setTween(TweenMax.fromTo('#ssi-content .section-5 .info-4', 150, {css:{scale:.7, autoAlpha:0}}, {css:{scale:1, autoAlpha:1}, ease:Elastic.easeOut, delay:0})).addTo(a.controller); */
				a.section6EffectsTimeline = new TimelineMax()
					.add([
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-1', 100, {css:{left:200,autoAlpha:0}}, {css:{left:0,autoAlpha:1}, delay:0}),
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-2', 50, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, delay:50}),
						TweenMax.fromTo('#ssi-content .section-6 .columns-1 .column-3', 100, {css:{right:200,autoAlpha:0}}, {css:{right:0,autoAlpha:1}, delay:0})
					]);
				a.section6Effects = new ScrollScene({
					triggerElement:'#ssi-content .section-6 .columns-1',
					offset:-50,
					duration:100
				}).setTween(a.section6EffectsTimeline).addTo(a.controller);
				a.section8Fade = new ScrollScene({
					triggerElement:'#ssi-content .section-8',
					duration:100
				}).setTween(TweenMax.fromTo('#ssi-content .section-8 .inner', 0.5, {css:{autoAlpha:0}}, {css:{autoAlpha:1}})).addTo(a.controller);
			},
			resize:function(){
				if(typeof animations.w768.vars === 'undefined') {
					// console.log('animations.w768.vars === undefined');
					return;
				}
				var a = animations.w768.vars;
				if(typeof a.section2Parallax === 'undefined') {
					// console.log('animations.w768.vars.section2Parallax === undefined');
					return;
				}
				if(typeof a.section8Fade === 'undefined') {
					// console.log('animations.w768.vars.section2Parallax === undefined');
					return;
				}
				/* a.section2Parallax
					.offset(-$window.height()/2)
					.duration($('#ssi-content .section-2').height()+$window.height()-$content.offset().top); */
				var imageWidth = 768,
					imageHeight = 1005,
					windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					scale = Math.max(windowWidth/imageWidth,windowHeight/imageHeight);
				$('#ssi-content .section-2 .parallax').css({
					marginTop:-windowHeight
				});
				$('#ssi-content .section-2 .parallax img').css({
					width:imageWidth*scale,
					marginLeft:-imageWidth*scale/2,
					marginTop:-imageHeight*scale/2,
					left:windowWidth/2,
					top:windowHeight/2
				});
				a.section2Parallax
					.duration(windowHeight + $('#ssi-content .section-2').height());
				a.section8Fade
					.duration($('#ssi-content .section-8').height()/2);
			},
			destroy:function(){
				animations.w768.vars.controller.destroy(true);
			}
		};
		
		/***** 360/320 *****/
		animations.w360 = {
			ready:function(){
			},
			init:function(){
				var a = animations.w360.vars = {};
				a.controller = new ScrollMagic();
				$('#ssi-content *').removeAttr('style');
				$('#ssi-content .section-1 .clipping .device').css({marginLeft:150});
				$('#ssi-content .section-1 .text').css({opacity:1,visibility:'visible'});
			},
			resize:function(){
			},
			destroy:function(){
				animations.w360.vars.controller.destroy(true);
			}
		};

		var cycleTimeout,
			doCycle = true;
		$('#ssi-content .section-4 .nav .item').each(function(i,e){
			$(e).data('idx',i);
		}).on('click zap',function(e){
			var idx = $(this).data('idx');
			$('#ssi-content .section-4 .nav .item').removeClass('active').eq(idx).addClass('active');
			$('#ssi-content .section-4 .slide').removeClass('active').eq(idx).addClass('active');
			clearTimeout(cycleTimeout);
			if(e.which) {
				doCycle = false;
			}
			if(doCycle){
				cycleTimeout = setTimeout(function(){
					var targets = $('#ssi-content .section-4 .nav .item');
					targets.eq((idx+1)%targets.length).trigger('zap');
				},8000);
			}
		}).eq(0).trigger('zap');
		
		// Pulser
		setInterval(function(){$('#ssi-content .section-4 .nav .item').toggleClass('anim');}, 1000);

		$window.on('resize',function(){
			// console.log($(window).width());
			setWidth();
			if(typeof animations.current !== 'undefined') {
				animations.current.resize();
			}
		});
		
		$('#ssi-content .section.disclaimers .accordian .title').on('click',function(e){
			$('#ssi-content .section.disclaimers .accordian').toggleClass('open');
		});
		
		$(function($){
			// console.log('ready');
			// console.log($(window).width());
			setTimeout(function(){
				// console.log($(window).width());
				$('#ssi-loading').hide();
				// console.log($(window).width());
				isReady = true;
				// console.log('resize trigger',isReady);
				$window.trigger('resize');
				// console.log($(window).width());
			},1000);
		});
		
		// debug
		$(function($){
			//console.log($(window).width());
			//animations.current.section2Fade.addIndicators();
			//animations.current.section3Effects.addIndicators();
			//animations.current.section5Info4.addIndicators();
			//animations.current.section8Fade.addIndicators();
			//$('.ScrollSceneIndicators').css({zIndex:9999});
			window.ssiDebug = {
				animations:animations,
			};
			//$window.trigger('resize');
		});
	};
})($.noConflict(true));
