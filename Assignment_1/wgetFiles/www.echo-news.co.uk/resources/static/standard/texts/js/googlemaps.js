var infowindows = [];
var markers = [];
var maps = [];

function addMarker(mapId, location, description, iconText) {
    var marker;
    if(iconText.length > 0){
        var shadowImage = new google.maps.MarkerImage("http://www.google.com/mapfiles/shadow50.png");
        shadowImage.anchor = new google.maps.Point(9, 34);
        marker = new google.maps.Marker({
            position: location,
            icon: iconText,
            flat: false,
            shadow: shadowImage,
            map: maps[mapId]
        });
    } else {
        marker = new google.maps.Marker({
            position: location,
            flat: false,
            map: maps[mapId]
        });
    }
    var infowindow = new google.maps.InfoWindow({
        content: description
    });
    markers[mapId].push(marker);
    infowindows[mapId].push(infowindow);
    google.maps.event.addListener(marker, "click", 
    function(){
        closeInfoWindows(mapId);
        infowindow.open(maps[mapId], marker);
    });
}

function closeInfoWindows(mapId){
    for(i in infowindows[mapId]){
        infowindows[mapId][i].close();
    }
}

