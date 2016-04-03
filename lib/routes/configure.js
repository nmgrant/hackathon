Router.configure({
    layoutTemplate: 'default'
});

Router.plugin('dataNotFound', {
    notFoundTemplate: 'notFound'
});

Accounts.onLogin(() => {
    if (Meteor.isClient && ['signup', 'login', 'recoverPassword', 'resetPassword'].includes(Router.current().route.getName())) {
        Router.go('dashboard');
    }
});

Router.onBeforeAction(function() {
    if (Meteor.userId()) {
        this.redirect('dashboard');
    } else {
        this.next();
    }
}, {
    only: ['signup', 'login', 'recoverPassword', 'resetPassword']
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.redirect('login');
    } else {
        this.next();
    }
}, {
    except: ['signup', 'login', 'recoverPassword', 'resetPassword']
});

Router.onBeforeAction('bodyClass');