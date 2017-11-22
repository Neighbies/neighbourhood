function startMap () {
  // Store Ironhack's coordinates
  const ironhackBCN = { lat: 41.3977381, lng: 2.190471916 };

  // Map initialization
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackBCN
  });

    // Add a marker for Ironhack Barcelona
  const IronHackBCNMarker = new google.maps.Marker({
    position: {
      lat: ironhackBCN.lat,
      lng: ironhackBCN.lng
    },
    map: map,
    title: 'Barcelona Campus'
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
      const ironHackBCNMarker = new google.maps.Marker({
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

  // Get things location
  // const geocoder = new google.maps.Geocoder();

  // Thing.find({}, {location: 1}, (err, thing, next) => {
  //   if (err) {
  //     throw next(err);
  //   } else {
  //     console.log(thing);
  //   }
  // });
  // function geocodeAddress(geocoder, resultsMap) {
  //   var address = document.getElementById('address').value;
  //   geocoder.geocode({'address': address}, function(results, status) {
  //     if (status === 'OK') {
  //       resultsMap.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //         map: resultsMap,
  //         position: results[0].geometry.location
  //       });
  //       document.getElementById('latitude').value = results[0].geometry.location.lat();
  //       document.getElementById('longitude').value = results[0].geometry.location.lng();
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' status);
  //     }
  //   });
  // }
}

startMap();

// module.exports = router;
