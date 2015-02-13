<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="msvalidate.01" content="1142CBB7B4C5DDC25B414ADC44648012" /><meta name="google-site-verification" content="dsv0J2JvJZKdK841gJjEeOtbj370FSZkOEVdD7gacUY" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Monitor website traffic at Real time for free."><title>True Realtime Website Tracker and Traffic Monitor</title><link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/css/bootstrap.min.css"><link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"><link rel="stylesheet" href="css/rtws.apps.css"><script>(window && !window.rtw) ? (function() {var rtw = {domain: "www.realtimewebsite.com",port: "9090"};window.rtw = rtw;})() : null;</script></head><body><header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner"><div class="container"><div class="navbar-header"><button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation"><ul class="nav navbar-nav"><li><a href="http://www.realtimewebsite.com/"><i class="fa fa-bar-chart-o"></i> Home</a></li><li><a href="http://www.realtimewebsite.com/getting-started"><i class="fa fa-flag-checkered"></i> Get Started</a></li><li><a href="http://www.realtimewebsite.com/sites-using-realtimewebsite"><i class="fa fa-trophy"></i> Who's Using</a></li><li><a href="http://www.realtimewebsite.com/www.freewebsitereport.org"><i class="fa fa-youtube-play"></i> Demo</a></li></ul><ul class="nav navbar-nav pull-right"><li><a id="active-site" href="www.reviewhape.com"></a></li></ul></nav></div></header><div class="container main"><div class="row"><h1>Reviewhape.com  - Realtime Website Traffic Stats!</h1></div><div class="row"><h2><i class="fa fa-refresh fa-spin"></i> Live Hits - <code><span class="online-counter">loading..</span></code> Users Online!</h2><div class="col-lg-12"><div id="agent_container" class="hummingbird_agent"><div class="agent_data"><h3><i class="fa fa-info-circle"></i> Quick Setup Instructions:</h3><div class="row"><div class="col-md-12"><h4> <i class="fa fa-bullhorn"></i> Owner/Admin of this website can setup the realtime webstats using <a href="http://www.realtimewebsite.com/getting-started"> "This simple step! (click here)"</a></h4></div></div></div></div></div></div><div class="row"><h2>Live Traffic Charts</h2><div class="col-lg-12"><div class="row"><div class="col-lg-12"><h3>Now ( This Hour )</h3><div id="minutely-stats"></div></div></div><div class="row"><div class="col-lg-12"><h3>Hourly ( Today )</h3><div id="hourly-stats"></div></div></div><div class="row"><div class="col-lg-12"><h3>Daily ( This Month )</h3><div id="daily-stats"></div></div></div><div class="row"><div class="col-lg-12"><h3>Monthly ( This Year )</h3><div id="monthly-stats"></div></div></div><div class="row"><div class="col-lg-12"><h3>Yearly</h3><div id="yearly-stats"></div></div></div></div></div><div class="row"><h2>Live Device & Browser Charts</h2><div class="col-lg-4"><h3>Devices</h3><div id="device-used"></div></div><div class="col-lg-4"><h3>Browsers</h3><div id="browser-used"></div></div><div class="col-lg-4"><h3>OSs</h3><div id="os-used"></div></div></div><div class="row"><h2>Live Daily Organic Visits Charts</h2><div class="col-lg-12"><h3>Direct VS. Referrals VS. Organic Traffic</h3><div id="organic-stats"></div></div></div><div class="row"><h2>Live Daily Referrals Chart</h2><div class="col-lg-12"><h3>Referrals Traffic</h3><div id="referrals-stats"></div></div></div><div class="row"><h2>Live Users Map</h2><div class="col-lg-12"><div id="map_container" class="hummingbird_map"></div></div></div><div class="row"><div class="col-lg-12"><div class="rtws-footer"></div></div></div></div><script type='text/javascript'>(function() {var rt = document.createElement('script');rt.type = 'text/javascript';rt.async = true;rt.src = '/js/rtws.js';var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(rt, s);})();</script><script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js"></script><style>.navbar {min-height: 40px;}.navbar-nav>li>a {line-height: 10px;}</style><script src="http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.0.0/dust-core.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/d3/2.10.0/d3.v2.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/polymaps/2.5.1/polymaps.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/highcharts/3.0.2/highcharts.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r68/three.min.js"></script><script src="js/rtws.apps.js"></script></body></html>