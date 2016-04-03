Router.route('/', {
	loadingTemplate: 'loading',
	action: function () {
		this.render('dashboard');
	},
	name: 'dashboard',
	subscriptions: function() {
		return Meteor.subscribe('results');
	},
	waitOn: function () {
		return [Meteor.subscribe('songs'), Meteor.subscribe('locations')];
	}
});

Router.route('/location', {
	loadingTemplate: 'loading',
	action: function () {
		this.render('location');
	},
	name: 'location',
	subscriptions: function() {
		return Meteor.subscribe('locations');
	}
//	waitOn: function () {
//		return Meteor.subscribe('locations');
//	}
});