Results = new Meteor.Collection('results');

Meteor.methods({
	addResult: function (result) {
		Results.insert(result)
	},
	removeResults: function() {
		Results.remove({});
	}
})

Results.allow({
	insert: () => true,
	update: () => false,
	remove: () => true
});

Results.deny({
	insert: () => false,
	update: () => true,
	remove: () => false
});

if (Meteor.isServer) {
	Meteor.publish('results', function () {
		return Results.find({});
	});
}