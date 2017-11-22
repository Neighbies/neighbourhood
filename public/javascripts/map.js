function startMap () {
  // const barcelona = { lat: 41.3818, lng: 2.1685 };

  // Map initialization
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14
    // center: 'Barcelona'
  });

  // Get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const userMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: 'You are here'
      });
    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }

  // Get Thing's location
  var geocoder = new google.maps.Geocoder();

  geocodeAddress(geocoder, map);

  function geocodeAddress (geocoder, resultsMap) {
    things.forEach(thing => {
      console.log(thing.localitzation);
      var address = thing.localitzation;
      geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            label: String(thing.price + '$'),
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ', status);
        }
      });
    });
  }
}
console.log(things);
startMap();
