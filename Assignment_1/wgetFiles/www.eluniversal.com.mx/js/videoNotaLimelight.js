                 function delvePlayerCallback(playerId, eventName, data) 
                 {
                   var id = "limelight_player_348308";
                       if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) {
                               DelvePlayer.registerPlayer(id);
                         }
                     switch (eventName) 
                     {
                       case 'onPlayerLoad':
                       doOnChannelLoad();
                       break;
                       case 'onChannelLoad':
                       //doOnChannelLoad(data);
                 break;
                 case 'onMediaLoad':
                 //doOnMediaLoad(data);
                 break; 
              }
            }
            function doOnChannelLoad(e) 
            {
                 DelvePlayer.doSetAd('preroll', 'Dart', 'url=http://oasentrega.eluniversal.com.mx/RealMedia/ads/adstream_sx.ads/www.eluniversaltv.com.mx/'+e+'@x90');
                 DelvePlayer.doSetAdFrequency(1); 
                }
