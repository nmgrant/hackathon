chosenArea = null;
nearestArea = null;

Meteor.methods({
	'changeArea': function (latLng) {
		check(latLng, {
			lat: Number,
			lng: Number
		});
		chosenArea = latLng;
		nearestArea = getNearestLocation(chosenArea);
	}
});

