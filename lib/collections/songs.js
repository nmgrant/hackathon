Songs = new Meteor.Collection('Songs');

Meteor.methods({
	addSong: function(song) {
		check(song, {
			name: String,
			user: String,
			location: String,
			url: String
		});
//		check(song.name, String);
//		check(song.user, String);
//		check(song.location, String);
//		check(song.url, String);
		Songs.insert(song)
	},
	removeSong: function(song) {
		Songs.remove({_id: song._id});
	}
})

Songs.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Songs.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

if (Meteor.isServer) {
	Meteor.publish('songs', function () {
		return Songs.find({});
	})

	if (Songs.find().count() === 0) {
		Songs.insert({
			'name': 'Flickermood',
			'user': 'forss',
			'url': 'http://soundcloud.com/forss/flickermood',
			'location': 'CSULB'
		});

		Songs.insert({
			'name': 'City Ports',
			'user': 'forss',
			'url': 'https://soundcloud.com/forss/city-ports',
			'location': 'UCLA'
		});
	}
}