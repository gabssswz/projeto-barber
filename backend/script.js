function initMap(){

    var options = {
        zoom: 18,
        center: {lat: -21.37437180145707, lng: -45.51088139840124}

    }

    var map = new google.maps.Map(document.getElementById('map'),options);

    var marker = new google.maps.Marker({
        position: {lat: -21.37437180145707, lng: -45.51088139840124},
        map: map,
    })

    var infoWindow = new google.maps.infoWindow({
        content: '<h1> Elite Barbearia </h1>'
    })

    marker.addListener('click', () => {
        infoWindow.open(map,marker)
    })
}

initMap()