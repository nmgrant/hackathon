Locations = new Meteor.Collection('locations');

Locations.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Locations.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

if (Meteor.isServer) {
	Meteor.publish('locations', function () {
		return Locations.find({});
	})

	if (Locations.find().count() === 0) {
		Locations.insert({
			'name': 'CSULB',
			'latLng': {
				'lat': 33.7838,
				'lng': -118.1141
			}
		});

		Locations.insert({
			'name': 'UCLA',
			'latLng': {
				'lat': 34.0689,
				'lng': -118.4452
			}
		});
	}
}