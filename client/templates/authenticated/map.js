Template.map.onCreated(function () {
	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('map', function (map) {
		var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
	});
});

Template.map.helpers({
	geolocationError: function () {
		var error = Geolocation.error();
		return error && error.message;
	},
	trendMapOptions: function () {

		// Make sure the maps API has loaded
		if (GoogleMaps.loaded()) {
			var latLng = Geolocation.latLng();
			if (!latLng) {
				latLng = new google.maps.LatLng(-30.000,
					110.000);
			}
			// Map initialization options
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.HYBRID,
				disableDefaultUI: true,
				zoomControl: true,
				maxZoom: 10
			};
		}
	}
});