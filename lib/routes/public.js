Router.route('/signup', {
    action: function() {
        this.render('signup');
    },
    name: 'signup'
});

Router.route('/login', {
    action: function() {
        this.render('login');
    },
    name: 'login'
});

Router.route('/recover-password', {
    action: function() {
        this.render('recoverPassword');
    },
    name: 'recover-password'
});

Router.route('/reset-password/:token', {
    action: function() {
        this.render('resetPassword');
    },
    name: 'reset-password'
});