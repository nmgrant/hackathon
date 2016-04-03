userLocation = null;
defaultLocation = Locations.findOne({
	name: 'CSULB'
});
nearestLocation = null;

Template.map.onCreated(function () {
	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('map', function (map) {
		if (!userLocation) {
			userLocation = Geolocation.latLng();
		}
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng({
				lat: userLocation.lat,
				lng: userLocation.lng
			}),
			draggable: true,
			map: map.instance
		});

		nearestLocation = getNearestLocation(userLocation)

		google.maps.event.addListener(marker, 'dragend', (function (marker) {
			return function () {
				var position = marker.getPosition();
				userLocation = {
					lat: position.lat(),
					lng: position.lng()
				};
				nearestLocation = getNearestLocation(userLocation);
			}
		})(marker));
	});
});

Template.map.helpers({
	geolocationError: function () {
		var error = Geolocation.error();
		return error && error.message;
	},
	mapOptions: function () {

		// Make sure the maps API has loaded
		if (GoogleMaps.loaded()) {
			var latLng = Geolocation.latLng();
			if (!latLng) {
				latLng = new google.maps.LatLng(-30.000,
					110.000);
			}
			userLocation = latLng;
			// Map initialization options
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.HYBRID,
				disableDefaultUI: true,
				zoomControl: true,
				maxZoom: 10
			};
		}
	}
});

var getNearestLocation = function (userLocation) {

	nearest = Locations.findOne({
		name: 'CSULB'
	});

	Locations.find().forEach(function (location) {
		var radians = Array.prototype.map.call([userLocation.lat,
			userLocation.lng, location.latLng.lat, location.latLng.lng],
			function (deg) {
				return deg / 180.0 * Math.PI;
			});

		var lat1 = radians[0],
			lon1 = radians[1],
			lat2 = radians[2],
			lon2 = radians[3];
		var R = 3961; // km
		var dLat = lat2 - lat1;
		var dLon = lon2 - lon1;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.asin(Math.sqrt(a));
		var d = R * c;

		if (d <= 5) {
			nearest = location;
		}
	});

	return nearest;
}