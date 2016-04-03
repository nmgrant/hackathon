const handleRedirect = ( routes, redirect ) => {
	let currentRoute = Router.current().route.getName();
	if ( routes.indexOf( currentRoute ) > -1 ) {
		Router.go( redirect );
		return true;
	}
};

Template.default.helpers({
	loggingIn() {
		return Meteor.loggingIn();
	},
	authenticated() {
		return !Meteor.loggingIn() && Meteor.user();
	},
	redirectAuthenticated() {
	 	return handleRedirect([
			'login',
			'signup',
			'recover-password',
			'reset-password'
		], '/' );
	},
	redirectPublic() {
		return handleRedirect([
			'dashboard'
		], '/login' );
	}
});