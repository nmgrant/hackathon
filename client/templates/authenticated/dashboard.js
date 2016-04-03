currentSong = function () {

	if (typeof nearestLocation == 'undefined' || !nearestLocation) {
		nearestLocation = Locations.findOne({
			name: 'CSULB'
		});
	}

	return Songs.findOne({
		location: nearestLocation.name
	}).url;
}

Template.dashboard.onCreated(function () {
	this.subscribe("locations");
	this.subscribe("songs");
	this.subscribe("results");
});

Template.dashboard.helpers({
	location: function () {
		if (typeof nearestLocation == 'undefined' || !nearestLocation) {
			nearestLocation = Locations.findOne({
				name: 'CSULB'
			});
		}
		return nearestLocation.name;
	},
	currentSong: function () {
		return currentSong();
	}
});

Template.dashboard.events({
	'click #add': function (e) {
		e.preventDefault();

		$('#songModal').modal('show');
	},
	'click #list': function (e) {
		e.preventDefault();

		$('#listModal').modal('show');
	}
});

Template.songModalTemplate.helpers({
	results: function () {
		return Results.find({});
	},
	songs: function () {
		if (typeof nearestLocation == 'undefined') {
			nearestLocation = Locations.findOne({
				name: 'CSULB'
			});
		}

		return Songs.find({
			location: nearestLocation.name
		});
	}
})

Template.songModalTemplate.events({
	'click #search': function (e) {
		e.preventDefault();
		
		var remove = Meteor.call('removeResults');

		var search = $('#songName').val();

		SC.initialize({
			client_id: '9bbeeece5fa49fd38fa64a94cd2e0d2a'
		});

		SC.get('/tracks', {
			q: search,
			license: 'cc-by-sa'
		}).then(function (tracks) {
			tracks.forEach(function (track) {
				Results.insert(track);
			});
		});
	},
	'click #cancel': function (e) {
		e.preventDefault();

		var remove = Meteor.call('removeResults');
		
		$('#songModal').modal('hide');
	}
});

Template.result.events({
	'click #result': function (e) {
		e.preventDefault();

		var song = Results.findOne({
			'user.username': this.user.username
		});

		if (typeof nearestLocation == 'undefined') {
			nearestLocation = Locations.findOne({
				name: 'CSULB'
			});
		}
		
		var add = Meteor.call('addSong', {
			name: song.title,
			user: song.user.username,
			location: nearestLocation.name,
			url: song.permalink_url
		});
		
		var remove = Meteor.call('removeResults');
		
		$('#songModal').modal('hide');
	}
})