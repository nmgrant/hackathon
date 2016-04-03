Template.header.helpers({
  brandLink() {
    let login = Router.path( 'login' ),
        dashboard = Router.path( 'dashboard' );
    return !Meteor.loggingIn() && !Meteor.userId() ? login : dashboard;
  }
});

Template.header.events({
  'click .logout' () {
    Meteor.logout( ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Bert.alert( 'Logged out!', 'success' );
      }
    });
  }
});
