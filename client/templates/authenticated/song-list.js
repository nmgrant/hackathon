//if (typeof nearestLocation == 'undefined') {
//	nearestLocation = Locations.findOne({
//		name: 'CSULB'
//	});
//}
//
//Template.songList.helpers({
//	songs: function (location) {
//
//		if (typeof nearestLocation == 'undefined') {
//			nearestLocation = Locations.findOne({
//				name: 'CSULB'
//			});
//		}
//		return Songs.find({
//			location: nearestLocation.name
//		});
//	}
//})